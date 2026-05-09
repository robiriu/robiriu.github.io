# Enterprise Agentic RAG Chatbot

**Status:** Production — Deployed on VPS
**Type:** Company Project (Private Repository)

## Executive Summary

An AI-powered help assistant for an enterprise advertising management platform, built with **Agentic RAG** — combining LangGraph multi-agent orchestration with self-reflective retrieval for accurate, citation-backed answers from internal documentation.

Unlike traditional RAG systems, this chatbot uses autonomous agents that reason about query intent, evaluate retrieval quality, and retry with refined strategies when initial results are insufficient.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Agentic RAG Stack                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────┐  │
│  │ Frontend │───▶│ Backend  │───▶│ RAG Pipeline         │  │
│  │ (React)  │    │ (FastAPI)│    │ ├─ Query Analyzer    │  │
│  │ :3100    │    │ :8000    │    │ ├─ Query Router      │  │
│  └──────────┘    └────┬─────┘    │ ├─ Hybrid Retriever  │  │
│                       │          │ ├─ Self-Reflection    │  │
│                       │          │ ├─ Reranker           │  │
│                       │          │ └─ LLM Generator      │  │
│                       │          └──────────────────────┘  │
│                       │                    │               │
│              ┌────────┼────────────────────┤               │
│              ▼        ▼                    ▼               │
│         ┌────────┐ ┌────────┐      ┌────────────┐         │
│         │ Redis  │ │Postgres│      │ LLM APIs   │         │
│         │ Cache  │ │pgvector│      │ (fallback) │         │
│         └────────┘ └────────┘      └────────────┘         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Observability                       │  │
│  │  ┌─────────┐  ┌───────────┐  ┌─────────┐            │  │
│  │  │Langfuse │  │Prometheus │  │ Grafana │            │  │
│  │  └─────────┘  └───────────┘  └─────────┘            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## What Makes It "Agentic"

Traditional RAG follows a fixed retrieve → generate pipeline. This system uses **LangGraph** to create autonomous agents that:

1. **Query Analysis** — Classifies intent, extracts entities, detects language (Indonesian + English)
2. **Query Routing** — Determines optimal retrieval strategy based on query type
3. **Hybrid Retrieval** — Dense vector search (pgvector) + BM25 keyword search with RRF fusion
4. **Self-Reflection** — Evaluates retrieval quality and automatically retries with refined queries if results are insufficient
5. **Reranking** — Cross-encoder reranking for precision
6. **Generation** — Streaming response with source citations

The self-reflection loop is the key differentiator — the agent can recognize when retrieved context doesn't adequately answer the question and autonomously refine its search strategy.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 5, TypeScript, shadcn/ui, Tailwind CSS, Zustand |
| **Backend** | Python 3.11+, FastAPI, Pydantic v2 |
| **Agent Framework** | LangChain, LangGraph |
| **Database** | PostgreSQL 16 + pgvector (HNSW index) |
| **Vector Store** | pgvector / Qdrant |
| **Embeddings** | BAAI/bge-m3 (1024-dim, multilingual) |
| **Cache** | Redis 7 (semantic caching) |
| **LLM Providers** | Multi-provider fallback: Groq → Cerebras → Gemini → Ollama |
| **Observability** | Langfuse (RAG tracing), Prometheus, Grafana |
| **Deployment** | Docker Compose, production VPS |

## Key Features

### Multi-Agent System (14 Specialized Agents)

The project uses a team of 14 specialized Claude Code agents for development, each with distinct responsibilities:

- **Implementation agents**: RAG architect, backend dev, frontend dev, chatbot developer, vector DB engineer, document processor, API designer, database architect, DevOps
- **Quality agents**: Test engineer, RAG evaluator, security auditor, code reviewer
- **Coordination**: Project lead

### Hybrid Search with Self-Correction

- Dense vector search captures semantic meaning
- BM25 keyword search catches exact terminology
- RRF fusion combines both for 10-15% accuracy improvement
- Self-reflection agent evaluates and retries when needed

### Multilingual Support

- Indonesian and English language detection
- BGE-m3 multilingual embeddings (1024-dim)
- Language-aware prompt templates

### Production Observability

- **Langfuse**: Full RAG pipeline tracing (query → retrieval → generation)
- **Prometheus**: System and application metrics
- **Grafana**: Real-time dashboards and alerting

### Streaming Responses

- Server-Sent Events (SSE) for real-time token streaming
- Responsive UI with incremental rendering

## Performance

| Metric | Target |
|--------|--------|
| Health check | <50ms |
| End-to-end RAG | 2-5s |
| Cache hit rate | 75%+ |
| Retrieval accuracy | ≥75% top-1 |
| Citation coverage | ≥90% |
| Hallucination rate | ≤5% |

## Evaluation System

- Golden dataset with curated Q&A pairs
- Automated retrieval evaluation (Recall, MRR, Faithfulness)
- Nightly regression testing
- Human evaluation sampling

## Skills Demonstrated

- Agentic RAG with LangGraph (multi-step reasoning, self-reflection)
- Hybrid retrieval (dense + sparse + RRF fusion)
- Multi-provider LLM fallback chains
- Production observability (Langfuse, Prometheus, Grafana)
- Multilingual NLP (Indonesian + English)
- Streaming API design (SSE)
- Multi-agent development workflows

[← Back to Projects](index.md)
