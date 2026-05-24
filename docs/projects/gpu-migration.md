# AI Service Migration: CPU to GPU (NVIDIA RTX 5060)

**Status:** Production | Completed
**Repository:** Private Company Repository

## Overview

Migrated a multimodal AI inference pipeline — Whisper (speech-to-text), CLIP (visual embeddings), and YOLO (object detection) — from CPU-only virtual machines to a dedicated NVIDIA RTX 5060 GPU server. Achieved an **8.7x end-to-end speedup** with zero downtime using a rolling cutover strategy.

## The Problem

The AI pipeline processed media files through three extraction services: audio transcription (Whisper large-v3), visual analysis (CLIP ViT-B/32 + YOLOv8), and NLP (DistilBERT + spaCy). On CPU (AMD EPYC 7542), a 51-minute video took **81 minutes** to process — slower than real-time. Editors were blocked waiting on metadata extraction before they could work.

## GPU Server Specification

| Component | Specification |
|-----------|--------------|
| CPU | Intel Core i7-6700 @ 3.40 GHz (4C/8T) |
| RAM | 16 GB DDR4 |
| GPU | NVIDIA GeForce RTX 5060 (8 GB VRAM) |
| Architecture | Blackwell (sm_120) |
| NVIDIA Driver | 595.71.05 |
| CUDA | 13.2 (driver-level) |
| OS | Ubuntu 22.04 LTS |
| Docker | 29.4.3 with Compose 5.1.3 |

## GPU Environment Setup

### 1. NVIDIA Container Toolkit Installation

Enabling Docker containers to access the host GPU:

```bash
# Add NVIDIA package repository
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \
  | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit

# Configure Docker runtime and verify
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
docker run --rm --gpus all nvidia/cuda:12.6.3-base-ubuntu22.04 nvidia-smi
```

**Issue encountered:** Installing the toolkit updated NVIDIA userspace libraries (595.58.03 to 595.71.05) but the kernel module stayed at the old version. `nvidia-smi` failed with "Driver/library version mismatch". Required a full server reboot. After reboot, 18+ existing containers restarted simultaneously, spiking the load average to 27 on 8 threads.

### 2. GPU-Accelerated Docker Images

Used `nvidia/cuda:12.6.3-runtime-ubuntu22.04` as base — the **runtime** variant (not `devel`) since we run pre-compiled models, not compile CUDA code.

```yaml
services:
  audio-extraction:
    image: audio-extraction-gpu
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    environment:
      - DEVICE=cuda
      - COMPUTE_TYPE=float16
      - WHISPER_MODEL=large-v3
```

Key configuration: `DEVICE=cuda` and `COMPUTE_TYPE=float16` instead of the CPU defaults (`cpu` / `int8`). The Python services auto-detect CUDA availability at startup.

### 3. Model Pre-Baking in Docker Images

Whisper large-v3 is 3+ GB. Downloading on first container start means 3+ minutes of cold start on HDD. Models are baked into the image during build:

```dockerfile
FROM nvidia/cuda:12.6.3-runtime-ubuntu22.04

# Pre-download Whisper model at build time
RUN python -c "from faster_whisper import WhisperModel; \
    WhisperModel('large-v3', device='cpu', compute_type='int8')"
```

## Issue Solved: Blackwell sm_120 Compatibility

The trickiest problem. The RTX 5060 uses NVIDIA's **Blackwell architecture (compute capability sm_120)**. The initial vision-extraction image used PyTorch with CUDA 12.4 wheels (`cu124`), which only supports up to sm_90 (Ada Lovelace).

### Symptoms

- CLIP and YOLO models loaded without errors
- All CUDA kernels **silently failed** — no crash, no warning
- Models fell back to CPU-like performance inside the GPU container
- `nvidia-smi` showed only 806 MiB VRAM (model weights only, no CUDA kernel context)

### Diagnosis

```python
import torch
print(torch.cuda.get_device_capability())  # Expected (12, 0), but kernels not compiled for it
print(torch.cuda.is_available())            # True — misleading, driver works but kernels don't
```

### Fix

Upgrade to PyTorch 2.11.0 with **CUDA 12.8 wheels (`cu128`)**, which includes sm_120 Blackwell kernels:

```dockerfile
RUN pip install torch==2.11.0+cu128 torchvision==0.22.0+cu128 \
    --index-url https://download.pytorch.org/whl/cu128
```

After fix: VRAM usage jumped from 806 MiB to **4,170 MiB** — confirming CUDA kernels were executing on GPU. CLIP inference dropped from 138 ms to **53 ms per frame**.

**Why audio-extraction wasn't affected:** faster-whisper uses CTranslate2 with its own CUDA backend, independent of PyTorch. It worked with cu124 out of the box.

## VRAM Management (8 GB Budget)

With only 8 GB VRAM, every megabyte counts.

### VRAM Conflict Discovery

A pre-existing `gpu_worker.service` (running Whisper, BLIP, BART, NLLB, Gemma models) consumed up to **3,600 MiB** when fully loaded. Our extraction services needed ~5,368 MiB. Combined: 8,968 MiB — exceeding the 8,151 MiB available.

**Resolution:** Stopped the conflicting GPU worker by team agreement.

### Final VRAM Allocation

| Service | Model | VRAM Usage | When Active |
|---------|-------|-----------|-------------|
| Audio extraction | Whisper large-v3 (float16) | 3,856 MiB | During audio transcription |
| Vision extraction | CLIP ViT-B/32 + YOLOv8 | 746–4,170 MiB | During visual analysis |
| **Combined peak** | | **5,470 MiB / 8,151 MiB (67%)** | Concurrent audio + vision |

A Bull/Redis task queue serializes heavy inference jobs, naturally preventing VRAM overflow from concurrent processing.

## Rolling Migration Strategy

Zero-downtime migration — GPU services deployed alongside existing CPU services, then switched one at a time:

```
Orchestrator (VM2) ─── audio ── VM2 CPU (fallback, still running)
    switches one          │
    URL at a time        └── GPU server (active)    <- switch first
                        ── vision ── VM2 CPU (fallback, still running)
                              │
                              └── GPU server (active) <- switch second
                        ── nlp ──── VM2 CPU (stays, no GPU benefit)
```

Each cutover is a single environment variable change:

```env
# Before (CPU on same VM)
AUDIO_SERVICE_URL=http://audio-extraction:3008

# After (GPU on dedicated server, cross-subnet)
AUDIO_SERVICE_URL=http://192.168.22.111:3008
```

**Rollback:** Change the URL back. Under 1 minute per service. CPU version stays running at all times.

## Production Benchmarks

### Audio Transcription (Whisper large-v3)

Tested on a 51-minute video, end-to-end through the full consumer pipeline:

| Phase | CPU (EPYC 7542) | GPU (RTX 5060) | Speedup |
|-------|-----------------|---------------|---------|
| Audio load + VAD | 18.5s | 8.4s | 2.2x |
| Language detection | 29.3s | 6.0s | 4.9x |
| Whisper transcription | **2,940.8s (49.0 min)** | **546.8s (9.1 min)** | **5.4x** |
| **Total pipeline** | **4,866.0s (81.1 min)** | **561.4s (9.4 min)** | **8.7x** |

On CPU: **slower than real-time** (0.6x). On GPU: **5.4x faster than real-time**.

### Vision Analysis (CLIP + YOLO)

Tested on 10 frames of 1920x1080 video:

| Metric | CPU (EPYC 7542) | GPU (RTX 5060) | Speedup |
|--------|-----------------|---------------|---------|
| CLIP embedding (inference) | 138 ms | **53 ms** | **2.7x** |
| Full vision pipeline | 1,588 ms | 1,924 ms | 0.8x |

The full vision pipeline is slower on GPU server because CPU-bound OpenCV operations (color, brightness, sharpness analysis) bottleneck on the i7-6700. But the AI inference part — CLIP embeddings — is 2.7x faster.

### Full Extraction Pipeline

| Extractor | Model | Time | Confidence |
|-----------|-------|------|------------|
| Audio (GPU) | Whisper large-v3 | 11 min 47 sec | 0.93 |
| Vision (GPU) | CLIP ViT-B/32 + YOLOv8 | 18.7 sec | 0.84 |
| NLP (CPU) | DistilBERT + spaCy | 2.6 sec | 0.78 |
| Media processor | FFmpeg | <1 sec | 1.00 |
| **Total** | | **~13 min** | |

Down from **90–120 minutes on CPU**. A **7–9x improvement**.

## Architecture

```
    Application VMs (192.168.12.x)           GPU Server (192.168.22.x)

    VM1 (Database)                           AI Server
    +-----------------+                      +------------------------+
    | PostgreSQL      |                      | audio-extraction (GPU) |
    | Redis           |<---- network ---->   | vision-extraction (GPU)|
    | MinIO / Kafka   |                      | NVIDIA RTX 5060        |
    +--------+--------+                      +-----------+------------+
             |                                           |
    VM2 (Services)                                       |
    +--------+--------+                                  |
    | orchestrator  --+---- HTTP extraction calls ------+
    | api-gateway     |
    | auth, content   |
    | audio (CPU)     | <- fallback, still running
    | vision (CPU)    | <- fallback, still running
    | nlp (CPU)       | <- stays here (no GPU benefit)
    +-----------------+
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| GPU Hardware | NVIDIA GeForce RTX 5060 (8 GB VRAM, Blackwell sm_120) |
| NVIDIA Driver | 595.71.05 |
| CUDA | 13.2 (driver) / 12.8 (PyTorch wheels) |
| Container Runtime | Docker 29.4.3 + nvidia-container-toolkit |
| Base Image | nvidia/cuda:12.6.3-runtime-ubuntu22.04 |
| Audio Inference | faster-whisper (CTranslate2), Whisper large-v3, float16 |
| Vision Inference | PyTorch 2.11.0+cu128, CLIP ViT-B/32, YOLOv8, EasyOCR |
| NLP (CPU) | spaCy, DistilBERT, Hugging Face Transformers |
| Task Queue | Bull + Redis (VRAM-aware job serialization) |
| Orchestration | Docker Compose with GPU device reservations |
| Media Processing | FFmpeg (frame/audio extraction) |

## Skills Demonstrated

- **NVIDIA driver and container toolkit** setup on bare-metal Ubuntu
- **CUDA architecture debugging** — diagnosing silent sm_120/Blackwell kernel fallback in PyTorch
- **GPU-accelerated Docker builds** — CUDA runtime base images, model pre-baking, device reservations
- **VRAM budgeting** — profiling and resolving memory conflicts across multiple GPU workloads on 8 GB
- **PyTorch CUDA wheel management** — matching cu124/cu128 to GPU compute capability
- **Production GPU benchmarking** — end-to-end measurement through full pipeline, not just model inference
- **Zero-downtime rolling migration** — cross-subnet GPU deployment with instant CPU fallback
- **Pragmatic GPU decisions** — identifying which services benefit from GPU and which don't (NLP stays on CPU)

## Key Takeaways

1. **Match CUDA wheels to GPU architecture.** RTX 5060 (Blackwell, sm_120) needs PyTorch cu128. cu124 loads models but silently falls back. Always verify with `torch.cuda.get_device_capability()`.

2. **VRAM is the bottleneck, not compute.** 8 GB is tight. Serialize heavy jobs via a task queue to prevent OOM. Profile actual VRAM usage with `nvidia-smi` under load.

3. **Not everything benefits from GPU.** NLP at our scale uses 0.13% CPU. Vision's OpenCV pipeline is CPU-bound. Only move what actually bottlenecks on tensor computation.

4. **Rolling migration beats big-bang.** Deploy GPU alongside CPU, switch one service at a time. Rollback is a 1-minute config change.

5. **Pre-bake models in Docker images.** Avoids 3+ minute cold starts from model downloads on first container start.

---

*This migration was executed on production enterprise infrastructure, processing real media content for broadcast operations.*

[Read the full technical deep-dive on the blog →](../blog/2026-05-24-gpu-migration-rtx5060-ai-extraction-pipeline.md)

[← Back to Projects](index.md)
