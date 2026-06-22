# Projects

A portfolio of production-grade AI systems, from physics-informed energy platforms to agentic RAG chatbots, MLOps pipelines, and developer tools.

---

## Flagship — ForceX AI

### [ForceX AI — AI-for-Energy Platform](forcex-ai.md)

Indonesia's first AI-for-energy platform — 12 physics-informed AI products for nuclear, geothermal, oil & gas, and renewables. Multi-agent orchestration with LangGraph, CNN/PINN/GNN/LSTM models, and production deployment.

**Technologies:** PyTorch, LangGraph, PINNs, GNNs, CNN, LSTM, RL (PPO), FastAPI, React, Docker

**Highlights:** 12 products, 484 tests, GeoForce deployed (R²=0.997), published on HuggingFace

[View Project →](forcex-ai.md) | [Visit forcex-ai.com →](https://forcex-ai.com)

---

### [GeoForce — CNN Geothermal Reservoir Surrogate](geoforce.md)

Standalone production version of the GeoForce CNN surrogate model. Replaces hours of TOUGH2 geothermal simulation with sub-second inference at R²=0.997 accuracy.

**Technologies:** PyTorch, CNN, TOUGH2, FastAPI, HuggingFace Hub

**Highlights:** 57K params, R²=0.997, model + dataset published on HuggingFace

[View Project →](geoforce.md)

---

## LLM Fine-Tuning & Alignment

### [EnergyLM-7B — LLM Fine-Tuning & Alignment Pipeline](energylm-finetune.md) `IN PROGRESS`

End-to-end LLM training pipeline for a domain-adapted energy model. Fine-tunes Qwen2.5-7B using QLoRA SFT on 20K synthetic instructions, compares DPO vs ORPO alignment, trains a reward model, and evaluates across 10 benchmarks. Multi-teacher data generation, dedup/filter pipeline, AWQ/GGUF quantization, vLLM serving. $0 budget — 100% free compute.

**Technologies:** PyTorch, Transformers, TRL, PEFT, QLoRA, DPO, ORPO, lm-eval-harness, vLLM, AutoAWQ, llama.cpp, Kaggle T4

**Highlights:** 20K synthetic dataset, DPO vs ORPO comparison, 10-benchmark evaluation, CoT distillation, reward modeling, AWQ + GGUF quantization, $0 compute cost

[View Project →](energylm-finetune.md) | [ForceX-AI on HuggingFace →](https://huggingface.co/ForceX-AI)

---

## GenAI & LLM Systems

### [Enterprise Agentic RAG Chatbot](enterprise-agentic-rag.md)

Agentic RAG system with LangGraph multi-agent orchestration, self-reflective retrieval, hybrid search, and streaming responses. Deployed in production for enterprise documentation Q&A.

**Technologies:** LangGraph, LangChain, FastAPI, React, pgvector, Langfuse, Prometheus

**Highlights:** Self-reflection loop, 14 specialized agents, multilingual (ID + EN), production-deployed

[View Project →](enterprise-agentic-rag.md)

---

### [Agentic HR Intelligence Platform](agentic-hr-platform.md)

Full-stack AI-powered HR platform that transforms raw employee and attendance data into workforce intelligence. Features an agentic AI chat with 5 specialized tools (Gemini 2.5 Flash), interactive analytics dashboards, turnover risk scoring, anomaly detection, and AI-driven contract renewal recommendations.

**Technologies:** Next.js 16, React 19, FastAPI, PostgreSQL, Google Gemini 2.5 Flash, Recharts, Tailwind CSS 4

**Highlights:** 5 agent tools with 10-iteration tool calling, 5-factor risk scoring (0-100), 5-type anomaly detection, bilingual (ID + EN), PDF report generation

[View Project →](agentic-hr-platform.md)

---

### [AI-Powered Help & QnA System](ai-help-qna.md)

Production-ready RAG system with hybrid retrieval (dense + BM25 + RRF fusion), multi-provider LLM fallback chain (5 providers), cross-encoder reranking, and voice assistant.

**Technologies:** FastAPI, pgvector, BGE embeddings, Redis, React, Docker, Kubernetes

**Highlights:** 40K+ docs indexed, 75%+ cache hit rate, ≤5% hallucination rate, 100% free-tier LLMs

[View Project →](ai-help-qna.md)

---

### [Porto Agent — AI Content Marketing Platform](porto-agent.md)

AI-powered platform that generates technical blog posts and LinkedIn content from git commit history. LangGraph orchestration with human-in-the-loop approval via dashboard and Telegram.

**Technologies:** Gemini 2.5 Flash, LangGraph, FastAPI, Next.js, PostgreSQL, Telegram Bot API

**Highlights:** Auto-generates blog + LinkedIn posts from commits, human-in-the-loop approval workflow

[View Project →](porto-agent.md)

---

## AI Applications

Deployable AI product builds, each a live, working demo grounded on Gemini 2.5 Flash (Vertex AI), built with Next.js and deployed on a VPS with automatic HTTPS.

### [AI Sales & Lead-Gen Chatbot (WhatsApp / Instagram)](ai-sales-chatbot.md)

A 24/7 sales assistant that answers pricing/schedule questions, handles objections, captures every lead, classifies status, and saves to a CRM with hot-lead alerts. Web chat plus WhatsApp/Instagram channels.

**Technologies:** Gemini 2.5 Flash, Next.js, JSON-mode extraction, file CRM, Telegram alerts

**Highlights:** Two-call architecture (reply + structured lead extraction), status classification, live admin dashboard

[View Project →](ai-sales-chatbot.md) | [Live demo →](https://mathbot.robiriu-dev.my.id)

---

### [Automated LinkedIn Carousel Generator (RAG)](linkedin-carousel-rag.md)

Upload documents and a RAG pipeline writes a fresh 8-10 slide LinkedIn carousel grounded in the content, with a topic-dedup log, exportable as a LinkedIn-ready PDF.

**Technologies:** Gemini 2.5 Flash, Vertex `text-embedding-004`, vector retrieval, jsPDF + html-to-image, Next.js

**Highlights:** Grounded slide generation, topic dedup, native carousel rendering (no Canva API), isolated PDF parsing

[View Project →](linkedin-carousel-rag.md) | [Live demo →](https://linkedin.robiriu-dev.my.id)

---

### [Self-Correcting Document Pipeline (LangGraph)](agentic-doc-pipeline.md)

A supervisor-worker LangGraph agent that extracts invoice data, validates the arithmetic deterministically, self-corrects on mismatches (capped retries), and writes a report — with a live graph, streamed steps, and an eval panel.

**Technologies:** LangGraph (`@langchain/langgraph`), Gemini 2.5 Flash, React Flow, SSE, Next.js

**Highlights:** Real StateGraph with conditional self-correction loop, deterministic validation, per-run token/latency/loop evaluation

[View Project →](agentic-doc-pipeline.md) | [Live demo →](https://agentic.robiriu-dev.my.id)

---

### [AI Assistant Embedded on a Portfolio Site](portfolio-assistant.md)

A floating AI chatbot embedded on a personal site that answers visitors' free-form questions about skills, projects and availability, grounded in the site content so it never invents facts.

**Technologies:** Gemini 2.5 Flash, Next.js, knowledge-base grounding, embeddable widget

**Highlights:** Anti-hallucination grounding, hire-intent nudging, drops into any existing site

[View Project →](portfolio-assistant.md) | [Live demo →](https://portfolio.robiriu-dev.my.id)

---

### [WhatsApp Lead Bot with Photo-on-Demand (Real Estate)](whatsapp-realestate-bot.md)

An always-on WhatsApp assistant for studio rentals that answers questions, sends a property photo gallery on request, captures leads, and books viewings, with editable galleries.

**Technologies:** Gemini 2.5 Flash, Next.js, token-driven photo delivery, file CRM

**Highlights:** Text-plus-photos via model-emitted tokens, grounded answers, lead capture and status

[View Project →](whatsapp-realestate-bot.md) | [Live demo →](https://studiobot.robiriu-dev.my.id)

---

### [WhatsApp AI Chatbot with Product Compatibility (Automotive)](automotive-chatbot.md)

A WhatsApp chatbot for an automotive electronics business: KB-grounded answers, product compatibility by car model with upgrade suggestions, rule-based human handoff, and lead capture.

**Technologies:** Gemini 2.5 Flash, Next.js, compatibility rules + KB grounding, file CRM

**Highlights:** Model-aware product recommendation, deterministic premium-brand handoff, editable knowledge base and rules

[View Project →](automotive-chatbot.md) | [Live demo →](https://autobot.robiriu-dev.my.id)

---

### [InsightFlow -- AI Analytics Workspace](ai-analytics.md)

Upload a CSV and the workspace auto-builds a dashboard: KPIs, anomaly detection across every metric, a trend chart, AI-written insights, and a natural-language layer to ask questions about the data. Deterministic stats in code, LLM for narration only.

**Technologies:** Gemini 2.5 Flash, Next.js, Recharts, PapaParse, TypeScript analytics engine

**Highlights:** IQR anomaly detection, grounded AI insights and Q&A (no hallucinated numbers), BI-style workspace UI

[View Project →](ai-analytics.md) | [Live demo →](https://analytics.robiriu-dev.my.id)

---

### [MarketMind -- AI Crypto & Stock Market Intelligence](marketmind.md)

A market-intelligence SaaS: live crypto prices, technical indicators (SMA, RSI, volatility), a Bullish/Bearish/Neutral signal, AI-written analysis grounded on the indicators, and a chat to ask about any asset. Polished dark trading terminal.

**Technologies:** Gemini 2.5 Flash, Next.js, Recharts, CoinGecko, TypeScript indicators engine

**Highlights:** Live data, technical analysis in code, grounded AI analysis + Q&A (no hallucinated numbers), signal generation

[View Project →](marketmind.md) | [Live demo →](https://market.robiriu-dev.my.id)

---

### [DataPilot -- Private AI Data Analyst](datapilot.md)

A self-hostable "code interpreter": describe an analysis in plain English, the AI writes the Python, runs it in a sandbox, and returns a report (charts + results + the code), refined by prompting. Privacy-first -- the model only sees the schema, and it runs on a local model (Ollama) so data never leaves the machine.

**Technologies:** Next.js, Gemini / local Ollama (Qwen2.5-Coder), Python sandbox (pandas, matplotlib, scikit-learn), Docker

**Highlights:** Live streaming code-gen, self-correction loop, switchable cloud/local model, sandboxed execution, fully on-premise/air-gappable

[View Project →](datapilot.md) | [Live demo →](https://datapilot.robiriu-dev.my.id)

---

## Web & Business Systems

### [LeadFlow -- Sales & Lead Management System](leadflow-crm.md)

A full-stack CRM: multi-source lead capture, a visual deal pipeline (New -> Contacted -> Quoted -> Won/Lost) with per-stage value totals, overdue follow-up reminders, and conversion analytics. REST API with a swappable data store.

**Technologies:** Next.js, TypeScript, Tailwind, Recharts, REST API, file/Airtable/Supabase/MySQL store

**Highlights:** Kanban pipeline, multi-source capture form, follow-up reminders, funnel + value-by-stage analytics

[View Project →](leadflow-crm.md) | [Live demo →](https://crm.robiriu-dev.my.id)

---

## MLOps & Infrastructure

### [Broadcast Analytics — MLOps Platform](broadcast-analytics.md)

Enterprise MLOps platform with 24 trained models (6 algorithms × 4 targets), LLM-powered analytics chat, genetic algorithm schedule optimization, and full monitoring stack.

**Technologies:** FastAPI, scikit-learn, XGBoost, CatBoost, LangChain, Redis, Prometheus, Grafana, Docker, Kubernetes, GitHub Actions

**Highlights:** 24 models, genetic algorithm optimizer, Prometheus + Grafana + Alertmanager + Loki monitoring, full CI/CD

[View Project →](broadcast-analytics.md)

---

### [Media Platform — Ad Campaign Management](media-platform.md)

Comprehensive enterprise media platform with OTT streaming, broadcast management, media asset management, and multimodal AI (NLP + Vision + Audio). Microservices architecture deployed on **Google Cloud Platform**.

**Technologies:** NestJS, Next.js 14, Kafka, PostgreSQL + pgvector, MinIO, CLIP, Whisper, spaCy, Docker, Kubernetes, **GCP (Cloud Run, Cloud SQL, Artifact Registry, Secret Manager)**

**Highlights:** 5 Cloud Run microservices in production, managed PostgreSQL with private networking, MediaMTX streaming on Compute Engine, 350+ pages documentation

[View Project →](media-platform.md)

---

## GPU Computing

### [AI Service Migration: CPU to GPU (RTX 5060)](gpu-migration.md)

Migrated a multimodal AI inference pipeline (Whisper, CLIP, YOLO) from CPU-only VMs to a dedicated NVIDIA RTX 5060 GPU server. Solved Blackwell sm_120 compatibility issues, managed VRAM constraints on 8 GB, and achieved zero-downtime rolling cutover.

**Technologies:** NVIDIA CUDA, PyTorch 2.11.0+cu128, faster-whisper (CTranslate2), CLIP, YOLOv8, Docker + nvidia-container-toolkit, Bull/Redis

**Highlights:** 8.7x pipeline speedup, Blackwell sm_120 CUDA fix, VRAM budgeting (67% of 8 GB), zero-downtime rolling migration with instant rollback

[View Project →](gpu-migration.md)

---

## Developer Tools

### [Automation Testing Platform (ATP)](ai-testing-framework.md)

Playwright-like testing framework specialized for AI platforms — LLM APIs, AI chat UIs, and intelligent applications. Published on npm with full TypeScript support.

**Technologies:** TypeScript, Node.js, Playwright, Fastify, Next.js, pnpm + Turborepo

**Highlights:** Published on npm (@robi-atp/*), semantic similarity testing, hallucination detection, AI-aware browser selectors

[View Project →](ai-testing-framework.md)

---

## Research

### [Recommendation Systems Research](recommendation-systems-research.md)

Comprehensive comparison of YouTube Two-Tower, Netflix Foundation, and Hybrid recommendation architectures with 108 hyperparameter configurations tested.

**Technologies:** PyTorch, FAISS, Transformers, Gradio

**Highlights:** 0.744 best combined score, 3 architectures, interactive Gradio apps

[View Project →](recommendation-systems-research.md)

---

## Project Categories at a Glance

| Category | Projects | Key Skills |
|----------|----------|------------|
| **LLM Fine-Tuning** | EnergyLM-7B | QLoRA SFT, DPO, ORPO, CoT distillation, reward modeling, quantization |
| **Physics-Informed ML** | ForceX AI, GeoForce | PINNs, CNN surrogates, simulation, HuggingFace |
| **GenAI & LLM** | Agentic RAG, HR Intelligence, Help QnA, Porto Agent | LangGraph, RAG, multi-agent, agentic tool calling, LLM fallback chains |
| **MLOps** | Broadcast Analytics, Media Platform | ML pipelines, model registry, CI/CD, monitoring |
| **GPU Computing** | AI Service Migration (CPU to GPU) | NVIDIA CUDA, PyTorch cu128, Docker GPU, VRAM budgeting, Blackwell sm_120 |
| **Developer Tools** | ATP | npm publishing, TypeScript frameworks, AI testing |
| **Cloud & Infrastructure** | Media Platform | GCP Cloud Run, Cloud SQL, Kubernetes, Terraform |
| **Research** | Recommendation Systems | PyTorch, FAISS, Transformers |
