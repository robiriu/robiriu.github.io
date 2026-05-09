# GeoForce — CNN Geothermal Reservoir Surrogate

**Status:** Deployed v1.1
**Platform:** [platform.forcex-ai.com](https://platform.forcex-ai.com)
**Model:** Published on HuggingFace (GeoForce-CNN-v1.1)
**Dataset:** Published on HuggingFace (geothermal-reservoir-dataset)

## Executive Summary

A CNN-based surrogate model that replaces hours of TOUGH2 geothermal reservoir simulation with sub-second inference — achieving R²=0.997 accuracy with only 57K parameters. GeoForce is the flagship deployed product of the ForceX AI platform, bridging the gap between physics simulation fidelity and real-time operational decision-making.

## Key Results

| Metric | Value |
|--------|-------|
| **Model Accuracy** | R² = 0.997 |
| **Parameters** | 57K (lightweight) |
| **Inference Time** | Sub-second (vs hours for TOUGH2) |
| **Training Data** | Synthetic TOUGH2 simulation outputs |
| **Version** | v1.1 (improved from initial ForceX prototype) |

## Technical Architecture

### Model Design

- **Architecture**: Convolutional Neural Network optimized for spatial reservoir data
- **Input**: Reservoir parameters (permeability, porosity, injection rates, boundary conditions)
- **Output**: Temperature and pressure field predictions across the reservoir grid
- **Training**: Supervised learning on TOUGH2 simulation outputs
- **Validation**: Cross-validated against held-out simulation scenarios

### Physics-Informed Approach

GeoForce maintains physical consistency by:

- Training on physics-simulator output (TOUGH2) ensuring conservation laws are respected
- Encoding spatial relationships through convolutional layers
- Validating predictions against known geothermal field behavior
- Monitoring physical plausibility metrics alongside ML accuracy

### Technology Stack

| Component | Technology |
|-----------|-----------|
| **ML Framework** | PyTorch |
| **Simulation Engine** | TOUGH2 (data generation) |
| **API** | FastAPI |
| **Frontend** | React + Vite + TypeScript (dashboard) |
| **Deployment** | Docker, VPS |
| **Model Registry** | HuggingFace Hub |
| **Dataset Hosting** | HuggingFace Datasets |
| **Testing** | pytest |

## Repository Structure

```
GeoForce/
├── surrogate/          # CNN model architecture and training
├── simulation/         # TOUGH2 simulation interface
├── solver/             # Physics solver utilities
├── agent/              # LangGraph agent for interactive queries
├── app/                # FastAPI backend
├── dashboard/          # React visualization dashboard
├── data/               # Training and validation datasets
├── notebooks/          # Exploration and analysis notebooks
├── demo/               # Demo scripts
├── tests/              # Test suite
├── docs/               # Documentation
└── tools/              # Utility scripts
```

## Evolution from ForceX AI

GeoForce started as one of 12 products inside the ForceX AI platform. The standalone repository represents the production-hardened version with:

- Improved CNN architecture (v1.0 → v1.1)
- Published model weights on HuggingFace for reproducibility
- Published training dataset for community use
- Dedicated LangGraph agent for interactive reservoir analysis
- Production API with monitoring and dashboards

## Use Cases

- **Geothermal Field Development**: Rapid scenario analysis for well placement
- **Operational Optimization**: Real-time reservoir monitoring and prediction
- **Exploration**: Quick screening of potential geothermal sites
- **Education**: Teaching reservoir physics with instant feedback

## Skills Demonstrated

- CNN Surrogate Modeling
- Physics-Informed Machine Learning
- Geothermal Reservoir Simulation (TOUGH2)
- Model Publishing (HuggingFace Hub)
- Dataset Curation and Publishing
- Production API Deployment

[← Back to Projects](index.md) | [View on ForceX Platform →](https://platform.forcex-ai.com)
