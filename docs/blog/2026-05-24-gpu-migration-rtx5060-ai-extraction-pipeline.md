# GPU Migration: Accelerating AI Extraction Pipeline with RTX 5060

**Date:** 2026-05-24
**Category:** Infrastructure, GPU Computing, MLOps
**Tags:** NVIDIA, CUDA, Docker, Whisper, CLIP, YOLO, PyTorch

---

## The Problem: CPU Inference Too Slow for Production

Our media platform runs a multimodal AI extraction pipeline — Whisper for audio transcription, CLIP for visual embeddings, and YOLO for object detection. On our production VM (AMD EPYC 7542, 32 GB RAM), a 51-minute video took **75+ minutes** to transcribe. That's slower than real-time — the system took longer to process the video than to watch it.

For a content management workflow where editors are waiting on metadata before they can work, this was a blocker.

## The Hardware: RTX 5060 on a Dedicated AI Server

We identified a dedicated machine with an **NVIDIA GeForce RTX 5060 (8 GB VRAM)** running Ubuntu 22.04. The challenge: it was already hosting 18 Docker containers for other projects, plus a systemd-managed GPU worker service consuming up to 3.6 GB VRAM.

| Component | Specification |
|-----------|--------------|
| CPU | Intel Core i7-6700 @ 3.40 GHz (4C/8T) |
| RAM | 16 GB DDR4 |
| GPU | NVIDIA GeForce RTX 5060 (8 GB VRAM) |
| NVIDIA Driver | 595.71.05 |
| CUDA | 13.2 (driver-level) |
| Docker | 29.4.3 with Compose 5.1.3 |

## Step 1: Enabling Docker GPU Access

By default, Docker containers can't see the host GPU. The `nvidia-container-toolkit` bridges this gap:

```bash
# Add NVIDIA package repository
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \
  | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit

# Configure Docker runtime
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Verify GPU passthrough
docker run --rm --gpus all nvidia/cuda:12.6.3-base-ubuntu22.04 nvidia-smi
```

**Lesson learned:** Installing the toolkit updated NVIDIA userspace libraries (595.58.03 to 595.71.05) but the kernel module stayed at the old version. `nvidia-smi` failed with "Driver/library version mismatch". A **full server reboot** was required. After reboot, all 18+ containers plus the GPU worker restarted simultaneously, spiking the load average to 27 on 8 threads.

## Step 2: Building GPU-Accelerated Docker Images

We used `nvidia/cuda:12.6.3-runtime-ubuntu22.04` as our base image — the **runtime** variant, not `devel`, because we run pre-compiled models (no CUDA compilation needed).

Docker Compose requests GPU access through the `deploy` section:

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

The key configuration change: `DEVICE=cuda` and `COMPUTE_TYPE=float16` instead of the CPU defaults (`cpu` / `int8`). The Python services already had auto-detection — if CUDA is available, they use it. The Whisper service uses faster-whisper with CTranslate2, while vision uses PyTorch with CLIP and YOLO.

## Step 3: Solving the Blackwell sm_120 Compatibility Issue

This was the trickiest problem. The RTX 5060 uses NVIDIA's **Blackwell architecture (sm_120)** — a brand-new compute capability. The initial vision-extraction image used PyTorch with CUDA 12.4 wheels (`cu124`), which only supports up to sm_90 (Ada Lovelace).

**Symptoms:** CLIP and YOLO models loaded without errors, but all CUDA kernels silently failed. The models fell back to CPU-like performance inside the GPU container. VRAM showed only model weights loaded (806 MiB) instead of full CUDA context.

**The fix:** Upgrade to PyTorch 2.11.0 with **CUDA 12.8 wheels (`cu128`)**, which includes sm_120 Blackwell kernels:

```dockerfile
RUN pip install torch==2.11.0+cu128 torchvision==0.22.0+cu128 \
    --index-url https://download.pytorch.org/whl/cu128
```

After this fix, VRAM usage jumped from 806 MiB to 4,170 MiB — confirming that CUDA kernels were now running properly. CLIP embeddings dropped from 138 ms to **53 ms per frame**.

**Why audio-extraction wasn't affected:** The Whisper service uses faster-whisper built on CTranslate2, which has its own CUDA backend independent of PyTorch. It worked with cu124 out of the box.

## Step 4: Managing VRAM Constraints (8 GB Budget)

With only 8 GB VRAM, every megabyte counts. We discovered a pre-existing `gpu_worker.service` (Whisper, BLIP, BART, NLLB, Gemma models) that consumed up to **3,600 MiB** when fully loaded.

**The conflict:** The extraction services needed ~5,368 MiB. Combined with the gpu_worker: 8,968 MiB — exceeding the 8,151 MiB available.

**Resolution:** Stopped `gpu_worker.service` by team agreement. Final VRAM allocation:

| Service | VRAM Usage | When Active |
|---------|-----------|-------------|
| Whisper large-v3 (float16) | 3,856 MiB | During audio transcription |
| CLIP ViT-B/32 + YOLO v8 | 746-4,170 MiB | During visual analysis |
| **Combined peak** | **5,470 MiB / 8,151 MiB (67%)** | Concurrent audio + vision |

A Bull/Redis task queue serializes jobs, naturally preventing VRAM overflow from concurrent heavy inference.

## Step 5: Rolling Migration Strategy

The CPU services were never stopped. The migration was a **rolling cutover** — deploy GPU version alongside, test, then switch one URL at a time:

```
orchestrator (VM2) ─── audio ── VM2 CPU (fallback)
    switches one URL     |
    at a time           └── GPU server (active)  <- switch first
                        ── vision ── VM2 CPU (fallback)
                            |
                            └── GPU server (active)  <- switch second
                        ── nlp ──── VM2 CPU (stays, no GPU benefit)
```

Each cutover was a single environment variable change:

```env
# Before (CPU)
AUDIO_SERVICE_URL=http://audio-extraction:3008

# After (GPU)
AUDIO_SERVICE_URL=http://192.168.22.111:3008
```

**Rollback:** Change the URL back. Under 1 minute per service. The CPU version is still running.

## Results: Production Benchmarks

### Audio Transcription (Whisper large-v3)

Tested on a 51-minute video, end-to-end through the full consumer pipeline:

| Phase | CPU (EPYC 7542) | GPU (RTX 5060) | Speedup |
|-------|-----------------|---------------|---------|
| Audio load + VAD | 18.5s | 8.4s | 2.2x |
| Language detection | 29.3s | 6.0s | 4.9x |
| Whisper transcription | **2,940.8s (49.0 min)** | **546.8s (9.1 min)** | **5.4x** |
| **Total pipeline** | **4,866.0s (81.1 min)** | **561.4s (9.4 min)** | **8.7x** |

On CPU, the video took longer to transcribe than to watch (0.6x real-time). On GPU, it finishes **5.4x faster than real-time**.

### Vision Analysis (CLIP + YOLO)

Tested on 10 frames of 1920x1080 video:

| Metric | CPU (EPYC 7542) | GPU (RTX 5060) | Speedup |
|--------|-----------------|---------------|---------|
| CLIP embedding (pure inference) | 138 ms | **53 ms** | **2.7x** |
| Full vision pipeline | 1,588 ms | 1,924 ms | 0.8x (CPU-bound OpenCV) |

The full vision pipeline is actually slower on the GPU server because it's dominated by CPU-bound OpenCV operations (color analysis, brightness, sharpness). The i7-6700 is slower than the EPYC for these tasks. But CLIP inference — the AI part — is 2.7x faster. At scale across a content library, this matters.

### Full Extraction Pipeline

| Extractor | Model | Time | Confidence |
|-----------|-------|------|------------|
| Audio (GPU) | Whisper large-v3 | 11 min 47 sec | 0.93 |
| Vision (GPU) | CLIP ViT-B/32 | 18.7 sec | 0.84 |
| NLP (CPU) | DistilBERT | 2.6 sec | 0.78 |
| Media | FFmpeg | <1 sec | 1.00 |
| **Total** | | **~13 min** | |

Down from 90-120 minutes on CPU. A **7-9x improvement**.

## Architecture: Before and After

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

## Key Takeaways

1. **Match CUDA wheels to your GPU architecture.** The RTX 5060 (Blackwell, sm_120) needs PyTorch cu128. cu124 loads models but silently falls back to non-accelerated kernels. Check `torch.cuda.get_device_capability()` — it should return `(12, 0)` for Blackwell.

2. **VRAM is the bottleneck, not compute.** With 8 GB, you can run Whisper large-v3 (3.8 GB) and CLIP+YOLO (4.2 GB) concurrently at 67% utilization. Serialize heavy jobs via a task queue to prevent OOM.

3. **Rolling migration beats big-bang.** Deploy GPU alongside CPU, test through the full consumer path, switch one service at a time. Rollback is a 1-minute URL change.

4. **Not everything benefits from GPU.** NLP (spaCy, DistilBERT) at our scale uses 0.13% CPU and 1.19 GB RAM — moving it to GPU adds complexity with zero benefit. Vision's OpenCV pipeline is CPU-bound. Know where your bottleneck actually is.

5. **nvidia-container-toolkit installation may require a reboot.** Driver/library version mismatches after install are common. Plan for downtime.

6. **Pre-bake models in Docker images.** Whisper large-v3 is 3+ GB. Downloading on first container start means a 3+ minute cold start on HDD. Bake it into the image during build.

---

*This migration was executed on production enterprise infrastructure, processing real media content.*

[View the full project page →](../projects/gpu-migration.md) | [Back to Blog](index.md)
