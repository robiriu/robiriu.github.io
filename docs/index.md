# Production-Ready AI & Software Engineer

!!! tip "What's New"
    **A privacy-first code interpreter for data analysis (local-model experiment)** - A privacy-first code interpreter for data analysis (local-model experiment)
    [Read more ->](blog/2026-06-22-a-privacy-first-code-interpreter-for-data-analysis.md)











!!! success "Now Live in Production"
    **[Agentic ERP Automation Platform](projects/erp-automation-platform.md)** (ongoing) - An agentic automation layer on a **live commercial cloud ERP**, running the full procure-to-pay chain for a multi-entity manufacturing group: AI vision extraction of vendor invoices, statistical invoice-to-receipt matching, automated purchase orders and purchase invoices written into the ERP, and a three-gate payment flow with enforced separation of duties that **executes real bank transfers**. Built with no ERP sandbox, so every safety property is engineered: GET-only mirror for all reads, a seven-layer write-guard with idempotency and read-back verification, dry-run by default, canaried one document at a time. **43 read-only AI tools** on an in-app assistant. [Read the deep dive ->](projects/erp-automation-platform.md)

!!! tip "In Progress"
    **[EnergyLM-7B — LLM Fine-Tuning & Alignment](projects/energylm-finetune.md)** — End-to-end LLM fine-tuning pipeline: QLoRA SFT on Qwen2.5-7B, DPO vs ORPO alignment comparison, CoT distillation, 10-benchmark evaluation, AWQ/GGUF quantization. 20K synthetic energy-domain dataset. $0 budget — 100% free compute. [View project →](projects/energylm-finetune.md)

!!! tip "Currently Building"
    **[ForceX AI](https://forcex-ai.com)** — Indonesia's first AI-for-energy platform. 12 physics-informed AI products for nuclear, geothermal, oil & gas, and renewables. GeoForce v1.1 deployed with R²=0.997 accuracy. [Explore the platform →](https://platform.forcex-ai.com)

---

## Overview

I am **Robi Dany Riupassa**, a software engineer and AI specialist building production-grade AI systems — from physics-informed energy platforms to agentic RAG chatbots and enterprise MLOps pipelines.

My work spans:

- **Agentic Enterprise Automation** - Production ERP integration, guarded and idempotent write-back into live financial systems, human-in-the-loop approval flows, AI document extraction, MCP tool servers
- **LLM Fine-Tuning & Alignment** — QLoRA SFT, DPO, ORPO, CoT distillation, reward modeling, synthetic data generation, AWQ/GGUF quantization, lm-evaluation-harness
- **Agentic AI & RAG** — LangGraph multi-agent orchestration, self-reflective retrieval, hybrid search, multi-provider LLM fallback chains
- **Physics-Informed ML** — PINNs, CNN surrogates, GNNs for energy sector simulation (ForceX AI, 12 products)
- **MLOps & Model Deployment** — Automated training pipelines, model registry, 24 production models, CI/CD with GitHub Actions
- **GPU Computing** — NVIDIA CUDA, PyTorch cu128, Docker GPU passthrough, VRAM budgeting, Blackwell sm_120 compatibility
- **Cloud & Infrastructure** — Google Cloud Platform (Cloud Run, Cloud SQL, Secret Manager), Docker, Kubernetes, Kafka, Terraform
- **Multimodal AI** — NLP (spaCy, Transformers), Vision (CLIP, YOLOv8), Audio (Whisper), Vector Search (pgvector)
- **Published Work** — Models and datasets on HuggingFace, AI testing framework on npm (@robi-atp/cli)

---

## Featured Projects

### Now Live — Agentic ERP Automation Platform

**[Agentic ERP Automation Platform](projects/erp-automation-platform.md)** | Ongoing, live in production

An agentic automation platform layered on a live commercial cloud **ERP platform**, automating the full procure-to-pay chain for a multi-entity food manufacturing and hospitality group. Four connected pillars (purchasing, production, sales, payment), **87 API endpoints**, **43 read-only AI tools**, **15 containerized services**, and **5 guarded ERP write capabilities** that create purchase orders, goods receipts, purchase invoices, vendor masters, and payments in a live financial system.

The engineering constraint that shaped everything: **no ERP sandbox and no test tenant**, with real company money behind every write. The answer was a GET-only nightly mirror serving all reads, a **seven-layer write-guard** (host guard, mirror refusal, per-capability flag, dry-run shadow mode, deterministic idempotency codes, pre-check with sanity caps, read-back verification), and a rollout that canaried each capability on a single real document before enabling it. The AI proposes; a human commits; the execution layer holds every safeguard.

**Stack:** FastAPI · Next.js · PostgreSQL · Claude (headless CLI + vision) · MCP · Docker Compose · Alembic · Nginx

[View Project →](projects/erp-automation-platform.md)

### AI-Native Applications — TransForce & CutForce

**[TransForce](projects/transforce.md)** | **[CutForce](projects/cutforce.md)** | both deployed

Two applications on one architectural bet: **a human and an AI agent editing the same live state**, through an MCP tool layer rather than code generation, driven by a headless Claude Code agent on a subscription.

**TransForce** does chat-driven Monte Carlo radiation transport on OpenMC: describe a reactor problem, and the agent builds the CSG geometry, materials, source and tallies, runs it, and reports k-eff with uncertainty. It reproduces published papers end to end and reports the bias in **pcm**. The agent never writes Python, only a typed `ModelSpec` that a deterministic driver translates. **27 simulation tools**, depletion, weight-window variance reduction, MGXS.

**CutForce** is a browser video editor where the agent is a second cursor on the timeline: **43 MCP tools**, live WebSocket sync, undo that works across both editors, an embedded terminal, and an ffmpeg export engine that compiles keyframes into ffmpeg expressions.

[TransForce →](projects/transforce.md) | [CutForce →](projects/cutforce.md)

### Flagship — ForceX AI

**[ForceX AI — AI-for-Energy Platform](projects/forcex-ai.md)** | [forcex-ai.com](https://forcex-ai.com)

12 physics-informed AI products (PINNs, CNN, GNN, LSTM, RL) with LangGraph agent orchestration. GeoForce CNN surrogate deployed at R²=0.997. Model and dataset published on HuggingFace. 484 passing tests.

### In Progress — EnergyLM-7B: LLM Fine-Tuning & Alignment

**[EnergyLM-7B — LLM Fine-Tuning & Alignment Pipeline](projects/energylm-finetune.md)**

End-to-end LLM training pipeline: fine-tunes **Qwen2.5-7B** on 20K synthetic energy-domain instructions using **QLoRA SFT**, aligns with **DPO vs ORPO** comparison study, trains a reward model, and benchmarks across **10 evaluation dimensions**. Multi-teacher data generation (Gemini + Groq + OpenRouter), MinHash + semantic dedup, LLM-as-judge quality filtering, AWQ/GGUF quantization, vLLM serving. **$0 budget** — entirely on free-tier compute.

**Stack:** PyTorch · Transformers · TRL · PEFT · QLoRA · DPO · ORPO · lm-eval-harness · vLLM · Kaggle T4

[View Project →](projects/energylm-finetune.md) | [ForceX-AI on HuggingFace →](https://huggingface.co/ForceX-AI)

### Latest — Agentic HR Intelligence Platform

**[Agentic HR Intelligence Platform](projects/agentic-hr-platform.md)**

Full-stack AI-powered HR platform that turns raw employee and attendance data into workforce intelligence. Gemini 2.5 Flash agentic chat with **5 specialized tools** and up to **10-iteration tool calling**, 6 interactive analytics dashboards, multi-factor turnover risk scoring (0-100), automated anomaly detection, and AI-driven contract renewal recommendations with PDF report generation.

**Stack:** Next.js 16 · React 19 · FastAPI · PostgreSQL · Gemini 2.5 Flash · Recharts · Tailwind CSS 4

[View Project →](projects/agentic-hr-platform.md)

### Enterprise Systems (Private Company)

**[AI Service Migration: CPU to GPU (RTX 5060)](projects/gpu-migration.md)** — Migrated multimodal AI inference (Whisper, CLIP, YOLO) to NVIDIA RTX 5060 GPU. **8.7x pipeline speedup**, Blackwell sm_120 CUDA fix, VRAM budgeting on 8 GB, zero-downtime rolling cutover.

**[Enterprise Agentic RAG Chatbot](projects/enterprise-agentic-rag.md)** — LangGraph multi-agent RAG with self-reflection, hybrid search (dense + BM25 + RRF), multilingual, Langfuse observability. Production-deployed.

**[Media Platform with OTT Streaming](projects/media-platform.md)** — 8+ NestJS microservices, multimodal AI (NLP/Vision/Audio), Kafka event streaming. OTT deployed on Google Cloud Platform (5 Cloud Run services, Cloud SQL, Compute Engine).

**[Broadcast Analytics — MLOps Platform](projects/broadcast-analytics.md)** — 24 trained models (6 algorithms x 4 targets), LangChain agent with 7 tools, genetic algorithm optimizer, Prometheus/Grafana/Alertmanager monitoring stack.

**[AI-Powered Help & QnA System](projects/ai-help-qna.md)** — Production RAG with hybrid retrieval, 5-provider LLM fallback chain, cross-encoder reranking, voice assistant. 75%+ cache hit rate, ≤5% hallucination rate.

### Independent Projects

**[GeoForce — CNN Reservoir Surrogate](projects/geoforce.md)** — Standalone production model replacing TOUGH2 simulation. R²=0.997, 57K params. Published on HuggingFace.

**[Porto Agent](projects/porto-agent.md)** — AI content marketing platform. Generates blog posts from git commits using Gemini AI + LangGraph, with human-in-the-loop approval via dashboard and Telegram.

**[AI Testing Framework (ATP)](projects/ai-testing-framework.md)** — Playwright-like testing for AI apps. Semantic similarity, hallucination detection. Published on npm as @robi-atp/cli.

**[Recommendation Systems Research](projects/recommendation-systems-research.md)** — YouTube Two-Tower, Netflix Foundation, and Hybrid architectures compared across 108 hyperparameter configurations.

[Browse all projects →](projects/index.md)

---

## Professional Experience

**Developer & Researcher — [ForceX AI](https://forcex-ai.com)** | Current

Building Indonesia's first AI-for-energy platform — 12 physics-informed AI products, GeoForce deployed, models published on HuggingFace.

**AI Engineer (Enterprise Automation) — A Multi-Entity Manufacturing & Hospitality Group** | Current

Sole engineer on a production agentic automation platform integrated with the group's live cloud ERP: procure-to-pay automation, AI document extraction, guarded ERP write-back, and a multi-gate payment approval flow executing real vendor transfers.

**Software Developer & AI Specialist — A Leading ICT Solutions Provider** | Current

Enterprise AI systems for media and broadcast — agentic RAG chatbots, MLOps pipelines, multimodal AI, cloud-native deployment on GCP.

**Training Instructor — Government Transformation Academy, BPPTIK KOMINFO**

Delivered Fundamentals of Data Science training for government professionals.

[View full experience →](about/experience.md)

---

## Education

**Doctoral Research in Physics** — Bandung Institute of Technology, Indonesia
Passive safety systems for Generation IV Molten Salt Reactors, combining CFD simulation with deep learning. [ITB Digital Library →](https://digilib.itb.ac.id/gdl/view_data/optimasi-desain-freeze-valve-untuk-sistem-keselamatan-pasif-pada-molten-salt-reactor/robi-dany-riupassa)

**Master of Science (MSc) in Physics** — Bandung Institute of Technology, Indonesia

[View education details →](about/education.md)

---

## Publications

Published research in physics, computational science, and AI. [Google Scholar](https://scholar.google.com/citations?user=3EyaaoUAAAAJ&sortby=pubdate) | [Scopus](https://www.scopus.com/authid/detail.uri?authorId=57190936273)

[View publications →](about/publications.md)

---

## Contact

- **Email:** [robiriu@gmail.com](mailto:robiriu@gmail.com)
- **GitHub:** [github.com/robiriu](https://github.com/robiriu)
- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/robi-dany-riupassa-48946086/)
