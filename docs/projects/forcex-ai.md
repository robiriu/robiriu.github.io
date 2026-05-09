# ForceX AI — AI-for-Energy Platform

**Status:** Active Development | GeoForce v1.1 Deployed
**Website:** [forcex-ai.com](https://forcex-ai.com)
**Platform:** [platform.forcex-ai.com](https://platform.forcex-ai.com)

## Executive Summary

Indonesia's first AI-for-energy platform — physics-informed AI agents for nuclear reactors, geothermal reservoirs, oil & gas operations, power grids, and renewable energy. Built for Southeast Asia's energy transition.

ForceX AI combines traditional physics simulation engines (OpenMC, TOUGH2, OpenFOAM) with physics-informed machine learning (PINNs, GNNs, FNOs) and LLM-powered agent orchestration via LangGraph.

**Core value proposition:** Collapse hours of physics simulation into seconds while maintaining the accuracy and auditability that regulators require.

## Products (12)

| Product | Domain | Type | What It Does | Status |
|---------|--------|------|-------------|--------|
| **GeoForce** | Geothermal | Surrogate | CNN reservoir surrogate (57K params, R²=0.997) | **Deployed v1.1** |
| **GridForce** | Power Systems | Data-Driven | LSTM load forecasting + PPO RL microgrid dispatch | MVP |
| **StorageForce** | Energy Storage | Data-Driven | PPO RL battery dispatch + degradation prediction | MVP |
| **PipeGuard** | Oil & Gas | Data-Driven | Autoencoder anomaly detection + corrosion physics | MVP |
| **WindForce** | Renewables | Data-Driven | PINN wake model + PPO layout optimization | MVP |
| **DrillAgent** | Oil & Gas | Data-Driven | LSTM formation prediction + ROP optimization | MVP |
| **SubsurfaceAI** | Oil & Gas | Data-Driven | CNN seismic fault detection + horizon tracking | MVP |
| **NeutronX** | Nuclear | Surrogate | UNet neutron flux surrogate | MVP |
| **SimForce** | Nuclear | Agent | LangGraph + real OpenMC simulation orchestration | MVP |
| **ReactorMind** | Nuclear | Surrogate | GNN digital twin + anomaly detection | MVP |
| **PhysicsForce** | General | Solver | PINN multi-PDE solver (self-supervised) | MVP |
| **PlasmaForce** | Fusion | Surrogate | NN scaling-law validator for plasma confinement | MVP |

All 12 products have working MVPs with CLI, FastAPI API, 484 passing tests, and Docker support.

## Live Deployments

| App | URL | Description |
|-----|-----|-------------|
| **Landing Page** | [forcex-ai.com](https://forcex-ai.com) | Company landing page (Cloudflare + VPS) |
| **Product Platform** | [platform.forcex-ai.com](https://platform.forcex-ai.com) | Unified dashboard for all 12 products |
| **GeoForce API** | `platform.forcex-ai.com/api/v1/geoforce/` | Real model API (Pro tier) |
| **HuggingFace** | GeoForce-CNN-v1.1 | Published model + dataset |

## Technology Stack

### AI & Machine Learning

| Category | Technologies |
|----------|-------------|
| **Physics-Informed ML** | PINNs (Physics-Informed Neural Networks), GNNs (Graph Neural Networks), FNOs (Fourier Neural Operators) |
| **Deep Learning** | CNN surrogates, UNet, LSTM, Autoencoders |
| **Reinforcement Learning** | PPO (Proximal Policy Optimization) for dispatch and optimization |
| **Agent Orchestration** | LangGraph for multi-step simulation workflows |
| **Simulation Engines** | OpenMC (nuclear), TOUGH2 (geothermal), OpenFOAM (CFD) |
| **Frameworks** | PyTorch, scikit-learn, DEAP (genetic algorithms) |

### Platform Architecture

| Layer | Technology |
|-------|-----------|
| **Frontend (Landing)** | React + Vite + TypeScript |
| **Frontend (Platform)** | React + Vite + TypeScript |
| **Backend** | FastAPI, Python 3.11+ |
| **Database** | PostgreSQL, SQLite |
| **Auth** | Firebase Authentication |
| **Deployment** | Docker, Docker Compose, VPS |
| **CDN** | Cloudflare |
| **Model Registry** | HuggingFace Hub |
| **Testing** | pytest (484 passing tests) |

### Multi-Agent Architecture

```
User Query
    │
    ▼
┌─────────────────────────────────────────┐
│          LangGraph Orchestrator          │
│  ┌─────────┐  ┌─────────┐  ┌────────┐ │
│  │ Physics │  │   ML    │  │  Data  │ │
│  │  Agent  │  │  Agent  │  │ Agent  │ │
│  └────┬────┘  └────┬────┘  └───┬────┘ │
│       │            │           │       │
│  ┌────┴────┐  ┌────┴────┐  ┌──┴────┐  │
│  │OpenMC/  │  │CNN/PINN/│  │ Data  │  │
│  │TOUGH2   │  │GNN/LSTM │  │ Store │  │
│  └─────────┘  └─────────┘  └───────┘  │
└─────────────────────────────────────────┘
```

## Key Technical Achievements

- **GeoForce CNN**: 57K parameters, R²=0.997 accuracy on reservoir simulation
- **12 Product MVPs**: All with CLI + API + tests + Docker
- **484 passing tests** across the entire platform
- **Physics-informed approach**: Models respect physical laws (conservation, boundary conditions)
- **Published on HuggingFace**: Model weights and geothermal dataset publicly available
- **Production deployment**: Landing page + platform running on VPS with Cloudflare CDN

## Repository Structure

```
ForceX-AI/
├── pages/                  # Landing page (React + Vite + TypeScript)
├── platform/               # Unified product portal (React + Vite + TypeScript)
├── products/               # 12 AI products
│   ├── geoforce/           # Geothermal CNN surrogate
│   ├── gridforce/          # Power grid LSTM + RL
│   ├── storageforce/       # Battery dispatch RL
│   ├── pipeguard/          # Anomaly detection
│   ├── windforce/          # Wind PINN + optimization
│   ├── drillagent/         # Drilling LSTM + ROP
│   ├── subsurfaceai/       # Seismic CNN
│   ├── neutronx/           # Nuclear UNet
│   ├── simforce/           # LangGraph + OpenMC
│   ├── reactormind/        # GNN digital twin
│   ├── physicsforce/       # PINN multi-PDE solver
│   └── plasmaforce/        # Plasma NN validator
├── mvp/                    # Shared MVP infrastructure
├── scripts/                # Deployment and utility scripts
├── docs/                   # Documentation
└── tests/                  # Test suite
```

## Skills Demonstrated

- Physics-Informed Machine Learning (PINNs, GNNs, FNOs)
- Deep Learning (CNN, UNet, LSTM, Autoencoders)
- Reinforcement Learning (PPO)
- Multi-Agent Orchestration (LangGraph)
- Full-Stack Development (React + FastAPI)
- Model Deployment & Publishing (HuggingFace, Docker)
- Domain Expertise (Energy sector: nuclear, geothermal, oil & gas, renewables)

[← Back to Projects](index.md) | [Visit ForceX AI →](https://forcex-ai.com)
