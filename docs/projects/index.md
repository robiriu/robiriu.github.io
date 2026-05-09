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

## GenAI & LLM Systems

### [Enterprise Agentic RAG Chatbot](enterprise-agentic-rag.md)

Agentic RAG system with LangGraph multi-agent orchestration, self-reflective retrieval, hybrid search, and streaming responses. Deployed in production for enterprise documentation Q&A.

**Technologies:** LangGraph, LangChain, FastAPI, React, pgvector, Langfuse, Prometheus

**Highlights:** Self-reflection loop, 14 specialized agents, multilingual (ID + EN), production-deployed

[View Project →](enterprise-agentic-rag.md)

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

**Highlights:** Auto-generates blog + LinkedIn posts from commits, human approval workflow, powers this portfolio's blog

[View Project →](porto-agent.md)

---

### [ForceX AI Chat](forcex-ai-chat.md)

Conversational AI chatbot using Mistral 7B open-source model from Hugging Face.

**Technologies:** Mistral 7B, Hugging Face, NLP, Python

[View Project →](forcex-ai-chat.md)

---

## MLOps & Infrastructure

### [Broadcast Analytics — MLOps Platform](broadcast-analytics.md)

Enterprise MLOps platform with 24 trained models (6 algorithms × 4 targets), LLM-powered analytics chat, genetic algorithm schedule optimization, and full monitoring stack.

**Technologies:** FastAPI, scikit-learn, XGBoost, CatBoost, LangChain, Redis, Prometheus, Grafana, Docker, Kubernetes, GitHub Actions

**Highlights:** 24 models, genetic algorithm optimizer, Prometheus + Grafana + Alertmanager + Loki monitoring, full CI/CD

[View Project →](broadcast-analytics.md)

---

### [Media Platform — Ad Campaign Management](media-platform.md)

Comprehensive enterprise media platform with OTT streaming, broadcast management, media asset management, and multimodal AI (NLP + Vision + Audio). Microservices architecture with event-driven design.

**Technologies:** NestJS, Next.js 14, Kafka, PostgreSQL + pgvector, MinIO, CLIP, Whisper, spaCy, Docker, Kubernetes, Terraform

**Highlights:** 8+ microservices, multimodal AI pipeline, 350+ pages documentation, event-driven architecture

[View Project →](media-platform.md)

---

## Developer Tools

### [Automation Testing Platform (ATP)](ai-testing-framework.md)

Playwright-like testing framework specialized for AI platforms — LLM APIs, AI chat UIs, and intelligent applications. Published on npm with full TypeScript support.

**Technologies:** TypeScript, Node.js, Playwright, Fastify, Next.js, pnpm + Turborepo

**Highlights:** Published on npm (@robi-atp/*), semantic similarity testing, hallucination detection, AI-aware browser selectors

[View Project →](ai-testing-framework.md)

---

## Computer Vision

### [Palm Tree Detection Web App](palm-tree-detection.md)

Custom YOLOv8 model for automated palm tree detection and counting in aerial/satellite images.

**Technologies:** YOLOv8, Roboflow, FastAPI, OpenCV

[View Project →](palm-tree-detection.md)

---

### [Pneumonia Detection System](pneumonia-detection.md)

CNN-based chest X-ray analysis for automated pneumonia diagnosis.

**Technologies:** TensorFlow/Keras, CNN, Medical Imaging

[View Project →](pneumonia-detection.md)

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
| **GenAI & LLM** | ForceX AI, Agentic RAG, Help QnA, Porto Agent, ForceX Chat | LangGraph, RAG, multi-agent, LLM fallback chains |
| **MLOps** | Broadcast Analytics, Media Platform | ML pipelines, model registry, CI/CD, monitoring |
| **Computer Vision** | Palm Tree Detection, Pneumonia Detection, Media Platform (CLIP) | YOLOv8, CNN, CLIP, medical imaging |
| **Developer Tools** | ATP | npm publishing, TypeScript frameworks, AI testing |
| **Physics-Informed ML** | ForceX AI, GeoForce | PINNs, CNN surrogates, simulation |
| **Research** | Recommendation Systems | PyTorch, FAISS, Transformers |
