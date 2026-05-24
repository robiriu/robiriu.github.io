# EnergyLM-7B — LLM Fine-Tuning & Alignment Pipeline

**Status:** In Progress (Week 1 Complete)
**Organization:** [ForceX-AI on HuggingFace](https://huggingface.co/ForceX-AI)
**Budget:** $0 — 100% free-tier compute

## Executive Summary

End-to-end LLM training, alignment, and serving pipeline for **EnergyLM-7B** — a domain-adapted language model for energy systems and scientific reasoning. Fine-tunes Qwen2.5-7B using QLoRA SFT on 20K synthetic instruction samples, aligns with both DPO and ORPO for a controlled comparison, and benchmarks across 10 evaluation dimensions including domain-specific physics calculations, safety, and bilingual (Indonesian) capability.

The entire project runs on **$0 budget** — Kaggle T4 for training, free-tier LLM APIs for data generation, and HuggingFace Spaces for deployment.

## Key Capabilities

| Capability | Implementation |
|------------|---------------|
| **LLM Fine-Tuning** | QLoRA SFT on Qwen2.5-7B (4-bit NF4, LoRA r=64) |
| **Alignment Methods** | DPO vs ORPO controlled comparison study |
| **Chain-of-Thought** | CoT distillation with `<think>` tag reasoning |
| **Reward Modeling** | DeBERTa-v3-base binary classifier on preference pairs |
| **Synthetic Data** | 20K+ samples via multi-teacher round-robin (Gemini, Groq, OpenRouter) |
| **Data Quality** | MinHash + semantic dedup, LLM-as-judge filtering, n-gram contamination check |
| **Evaluation** | 10-benchmark suite: MMLU, GPQA, MATH, MBPP, IFEval + 4 custom domain evals |
| **Quantization** | AWQ 4-bit + GGUF (Q3/Q4/Q5/Q8) with quality retention benchmarks |
| **Serving** | vLLM inference benchmarking, HuggingFace Spaces deployment |
| **Cost** | $0 — Kaggle T4, Colab Free, free API tiers only |

## Pipeline Architecture

```mermaid
flowchart TB
    subgraph DATA["Data Engineering"]
        T1["Gemini 2.5 Flash"]
        T2["Groq Llama 3.3 70B"]
        T3["OpenRouter gpt-oss-120b"]
        T1 & T2 & T3 -->|"Round-Robin"| GEN["Instruction Generator<br/>20K samples"]
        GEN --> MH["MinHash Dedup<br/>Jaccard 0.85"]
        MH --> SEM["Semantic Dedup<br/>Cosine 0.92"]
        SEM --> QF["LLM-as-Judge<br/>Quality Filter"]
        QF --> CC["Contamination Check<br/>13-gram vs MMLU/GPQA/MATH"]
        CC --> SPLIT["Stratified Split<br/>80/10/10"]
    end

    subgraph TRAIN["Training Pipeline"]
        SPLIT -->|"Train Set"| SFT["QLoRA SFT<br/>Qwen2.5-7B<br/>3 epochs, r=64"]
        SFT --> COT["CoT Distillation<br/>3K reasoning samples"]
        SFT -->|"+ Preference Pairs"| DPO["DPO Alignment<br/>beta=0.1, sigmoid"]
        SFT -->|"+ Preference Pairs"| ORPO["ORPO Alignment<br/>odds-ratio, lr=5e-6"]
        SPLIT -->|"Preferences"| RM["Reward Model<br/>DeBERTa-v3-base"]
    end

    subgraph EVAL["Evaluation & Deployment"]
        DPO & ORPO & COT --> BENCH["10-Benchmark Suite<br/>+ Bootstrap CIs"]
        BENCH --> QUANT["AWQ + GGUF<br/>Quantization"]
        QUANT --> SERVE["vLLM Serving<br/>+ HF Spaces Demo"]
    end

    style DATA fill:#e3f2fd,stroke:#1565c0
    style TRAIN fill:#e8f5e9,stroke:#2e7d32
    style EVAL fill:#fff3e0,stroke:#e65100
```

## Training Configuration

### QLoRA SFT Setup

```
Base Model:      Qwen/Qwen2.5-7B
Quantization:    4-bit NF4 (double quantization)
LoRA Rank:       64 (alpha=128)
Target Modules:  q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj
Effective Batch: 16 (4 x 4 gradient accumulation)
Learning Rate:   2e-4 (cosine schedule)
Max Seq Length:  2048
Compute:         Kaggle T4 (16GB VRAM, free)
```

### Alignment Comparison

| Parameter | DPO | ORPO |
|-----------|-----|------|
| **Loss Function** | Sigmoid | Odds-Ratio |
| **Learning Rate** | 5e-5 | 5e-6 |
| **Beta** | 0.1 | 0.1 |
| **LoRA Rank** | 32 | 32 |
| **Starting Point** | SFT model | Base model |
| **Reference Model** | Implicit (PEFT) | Not needed |

## Data Engineering Pipeline

```mermaid
flowchart LR
    subgraph TEACHERS["Multi-Teacher Generation"]
        direction TB
        G["Gemini 2.5 Flash<br/>Free Tier"]
        Q["Groq Llama 3.3 70B<br/>Free Tier"]
        O["OpenRouter gpt-oss-120b<br/>Free Tier"]
    end

    subgraph QUALITY["Quality Pipeline"]
        direction TB
        D1["MinHash LSH<br/>128 permutations"]
        D2["Semantic Dedup<br/>all-MiniLM-L6-v2"]
        D3["LLM Judge<br/>4-criteria scoring"]
        D4["N-gram Check<br/>vs benchmarks"]
        D1 --> D2 --> D3 --> D4
    end

    subgraph OUTPUT["Datasets"]
        direction TB
        I["energy-instruct-20k<br/>ChatML format"]
        P["energy-preferences-5k<br/>chosen/rejected pairs"]
        C["energy-cot-3k<br/>think tag reasoning"]
    end

    TEACHERS -->|"20 energy topics<br/>4 prompt templates"| QUALITY
    QUALITY --> OUTPUT

    style TEACHERS fill:#fce4ec,stroke:#c62828
    style QUALITY fill:#f3e5f5,stroke:#6a1b9a
    style OUTPUT fill:#e0f2f1,stroke:#00695c
```

**20 Domain Topics:** Geothermal systems, nuclear reactor physics, solar PV engineering, wind turbine aerodynamics, reservoir engineering, thermodynamics, fluid dynamics, heat transfer, reactor safety, grid integration, molten salt reactors, well drilling, power plant optimization, energy storage, carbon capture, hydrogen fuel cells, thermal hydraulics, radiation shielding, seismic analysis, CFD for energy.

## Evaluation Framework

10-benchmark evaluation with bootstrap confidence intervals:

| Benchmark | Type | Metric | Purpose |
|-----------|------|--------|---------|
| **Energy QA** | Custom | Accuracy | Domain knowledge |
| **Physics Calculations** | Custom | Numerical tolerance (5%) | Quantitative reasoning |
| **Indonesian Energy** | Custom | BLEU + Accuracy | Bilingual capability |
| **Safety Prompts** | Custom | Refusal rate | Safety alignment |
| **MMLU (STEM)** | Standard | 5-shot accuracy | General knowledge |
| **GPQA Diamond** | Standard | 0-shot accuracy | Hard science reasoning |
| **MATH** | Standard | 4-shot accuracy | Mathematical reasoning |
| **MBPP** | Standard | pass@1 | Code generation |
| **IFEval** | Standard | Strict accuracy | Instruction following |
| **LLM-as-Judge** | Gemini | 4-criteria (1-5) | Overall quality |

## Model Variants

```mermaid
flowchart LR
    BASE["Qwen2.5-7B<br/>Base Model"] --> SFT["EnergyLM-7B<br/>SFT"]
    SFT --> COT["EnergyLM-7B<br/>SFT + CoT"]
    SFT --> DPO["EnergyLM-7B<br/>DPO"]
    BASE --> ORPO["EnergyLM-7B<br/>ORPO"]

    DPO & ORPO --> BEST{{"Best Variant"}}
    BEST --> AWQ["AWQ 4-bit"]
    BEST --> Q4["GGUF Q4_K_M"]
    BEST --> Q8["GGUF Q8_0"]

    AWQ -->|"vLLM"| API["API Endpoint"]
    Q4 -->|"llama.cpp"| SPACES["HF Spaces<br/>Demo"]

    style BASE fill:#f5f5f5,stroke:#616161
    style SFT fill:#c8e6c9,stroke:#2e7d32
    style COT fill:#a5d6a7,stroke:#1b5e20
    style DPO fill:#bbdefb,stroke:#1565c0
    style ORPO fill:#b3e5fc,stroke:#0277bd
    style BEST fill:#fff9c4,stroke:#f57f17
    style AWQ fill:#ffe0b2,stroke:#e65100
    style Q4 fill:#ffe0b2,stroke:#e65100
    style Q8 fill:#ffe0b2,stroke:#e65100
```

## Free Compute Strategy

| Resource | Purpose | Quota |
|----------|---------|-------|
| **Kaggle T4** | SFT, DPO, ORPO training | 30 GPU-hrs/week |
| **Colab Free T4** | Reward model, eval runs | ~4 hrs/session |
| **Gemini Free** | Data generation, quality judge | 1500 req/day |
| **Groq Free** | Data generation (Llama 3.3 70B) | 30 req/min |
| **OpenRouter Free** | Data generation (gpt-oss-120b) | 10 req/min |
| **HuggingFace Spaces** | Model demo deployment | Free CPU/GPU |

## Project Timeline

```mermaid
gantt
    title EnergyLM-7B Development Timeline
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Data
    Foundation & Scripts        :done, w1, 2026-05-19, 7d
    Data Generation (20K)       :active, w1b, 2026-05-24, 7d
    CoT + Preferences           :w2b, after w1b, 5d
    Dedup + Filter + Publish    :w2c, after w2b, 2d

    section Training
    SFT QLoRA (3 epochs)        :w3a, 2026-06-02, 3d
    Ablation Studies (3 runs)   :w3b, after w3a, 3d
    CoT Distillation            :w3c, after w3b, 1d
    DPO Training                :w4a, 2026-06-09, 2d
    ORPO Training               :w4b, after w4a, 2d
    Reward Model (DeBERTa)      :w4c, after w4b, 1d

    section Eval & Deploy
    Full Benchmark Suite        :w4d, after w4c, 2d
    Quantization (AWQ + GGUF)   :w5a, 2026-06-16, 2d
    vLLM Benchmarks             :w5b, after w5a, 2d
    HF Spaces Deployment        :w5c, after w5b, 1d

    section Documentation
    Blog Post + Model Cards     :w6a, 2026-06-23, 3d
    OSS Contribution            :w6b, after w6a, 2d
    Public Release              :milestone, after w6b, 0d
```

## Planned HuggingFace Artifacts

All published under the [ForceX-AI](https://huggingface.co/ForceX-AI) organization:

| Artifact | Type | Description |
|----------|------|-------------|
| `ForceX-AI/energy-instruct-20k` | Dataset | 20K energy-domain instruction pairs (ChatML) |
| `ForceX-AI/energy-preferences-5k` | Dataset | 5K chosen/rejected preference pairs for DPO |
| `ForceX-AI/EnergyLM-7B-SFT` | Model | QLoRA SFT adapter + merged model |
| `ForceX-AI/EnergyLM-7B-DPO` | Model | DPO-aligned variant |
| `ForceX-AI/EnergyLM-7B-ORPO` | Model | ORPO-aligned variant |
| `ForceX-AI/EnergyLM-7B-GGUF` | Model | Quantized GGUF files (Q3/Q4/Q5/Q8) |
| `ForceX-AI/EnergyLM-RewardModel` | Model | DeBERTa-v3-base reward classifier |

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Base Model** | Qwen/Qwen2.5-7B |
| **Training** | PyTorch, Transformers, TRL, PEFT, bitsandbytes |
| **Data** | datasketch, sentence-transformers, Gemini/Groq/OpenRouter APIs |
| **Evaluation** | lm-evaluation-harness, custom benchmarks, Gemini judge |
| **Quantization** | AutoAWQ, llama.cpp (GGUF) |
| **Serving** | vLLM, Gradio, HuggingFace Spaces |
| **Tracking** | Weights & Biases, HuggingFace Hub |
| **CI/CD** | GitHub Actions (lint, test, data-validate) |
| **Compute** | Kaggle T4, Colab Free, free LLM API tiers |

## Current Status

**Week 1: COMPLETE** — All foundation code, scripts, notebooks, eval framework, and infrastructure configured. Data generation running across 3 free-tier API backends.

Next: Complete data generation, run quality pipeline, begin SFT training on Kaggle T4.
