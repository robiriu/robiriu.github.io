# Recommendation Systems Research & Exploration

**Status:** Completed | Research & Implementation
**Repository:** [github.com/robiriu/AdCP-media-platform-v2](https://github.com/robiriu/AdCP-media-platform-v2) (services/recommendation/research)

## Executive Summary

A comprehensive research and hands-on exploration of recommendation system architectures used by YouTube and Netflix. This project implements three interactive exploration apps to test and compare different approaches, culminating in a systematic Grid Search optimization to find optimal hyperparameters for precision, diversity, and balanced recommendations.

### Key Achievements

- **3 Fully Functional Recommendation Systems** built from scratch
- **108 Hyperparameter Configurations** tested via Grid Search
- **0.744 Best Combined Score** achieved with YouTube Two-Tower model
- **100% Diversity Score** achieved with Hybrid system
- **Enterprise-Grade Data Models** aligned with real OTT platforms

---

## Research Overview

### Systems Studied

```mermaid
flowchart TB
    subgraph YouTube["YouTube Two-Tower Model"]
        YT1["User Tower"] <--> YT2["Item Tower"]
        YT1 --> YT3["Embedding Space"]
        YT2 --> YT3
        YT3 --> YT4["ANN Retrieval"]
        YT4 --> YT5["Watch Time Ranking"]
    end

    subgraph Netflix["Netflix Foundation Model"]
        NF1["User History<br/>(as 'sentence')"] --> NF2["Transformer<br/>Self-Attention"]
        NF2 --> NF3["Multi-Task Heads"]
        NF3 --> NF4["Homepage"]
        NF3 --> NF5["Search"]
        NF3 --> NF6["Similar"]
    end

    subgraph Hybrid["Hybrid System"]
        HY1["Two-Tower<br/>Retrieval"] --> HY2["Transformer<br/>Re-ranking"]
        HY2 --> HY3["Multi-Task<br/>Scoring"]
        HY3 --> HY4["CF Ensemble"]
    end
```

### Architecture Comparison

| Aspect | YouTube | Netflix | Hybrid |
|--------|---------|---------|--------|
| **Retrieval** | Two-Tower + ANN | Foundation Model | Two-Tower |
| **User Model** | History avg + MLP | Transformer | Transformer + MLP |
| **Ranking** | Watch time prediction | Multi-task heads | Multi-task scoring |
| **CF Training** | - | Yes (trainable) | Yes (trainable) |
| **Ensemble** | - | CF blend | CF blend |
| **Best For** | Scale (billions) | Personalization | Both |

---

## System Architectures

### YouTube Two-Tower Model

The Two-Tower architecture is designed for massive scale, processing billions of videos efficiently.

```mermaid
flowchart TB
    subgraph UserTower["User Tower"]
        U1["User Features<br/>• Watch history<br/>• Demographics<br/>• Device info"]
        U2["Dense Layers"]
        U3["User Embedding<br/>(128-dim)"]
        U1 --> U2 --> U3
    end

    subgraph ItemTower["Item Tower"]
        I1["Item Features<br/>• Content metadata<br/>• Genre/tags<br/>• Statistics"]
        I2["Dense Layers"]
        I3["Item Embedding<br/>(128-dim)"]
        I1 --> I2 --> I3
    end

    subgraph Retrieval["Candidate Retrieval"]
        R1["Cosine Similarity"]
        R2["ANN Index<br/>(FAISS)"]
        R3["Top-K Candidates"]
    end

    U3 --> R1
    I3 --> R2
    R1 --> R2 --> R3

    subgraph Ranking["Final Ranking"]
        RK1["Watch Time<br/>Prediction"]
        RK2["Engagement<br/>Scoring"]
        RK3["Final<br/>Recommendations"]
    end

    R3 --> RK1 --> RK2 --> RK3
```

**Key Characteristics:**
- Pre-computed item embeddings for fast retrieval
- Approximate Nearest Neighbor (ANN) search for O(log n) complexity
- Separate training for towers enables offline updates
- Optimized for watch time prediction

### Netflix Foundation Model

Netflix treats user history as a "sentence" where interactions are "tokens", applying LLM-inspired architectures.

```mermaid
flowchart TB
    subgraph Input["Member Interaction History"]
        IN1["play → browse → rate → search → pause → play → complete"]
        IN2["(Treated as 'sentence' where interactions are 'tokens')"]
    end

    subgraph Foundation["Foundation Model"]
        FM1["Token Embedding<br/>• Heterogeneous types<br/>• Position encoding"]
        FM2["Transformer Layers<br/>• Self-Attention<br/>• Sparse attention"]
        FM3["Sequence Representation"]
        FM1 --> FM2 --> FM3
    end

    subgraph Output["Multi-Task Outputs"]
        O1["Embeddings Service<br/>• Member emb<br/>• Title emb"]
        O2["Predictions<br/>• Homepage<br/>• Search"]
        O3["Fine-tuning<br/>• Games<br/>• Kids"]
    end

    Input --> Foundation
    FM3 --> O1
    FM3 --> O2
    FM3 --> O3

    subgraph CF["Collaborative Filtering"]
        CF1["User-Item Matrix"]
        CF2["Matrix Factorization"]
        CF3["CF Scores"]
        CF1 --> CF2 --> CF3
    end

    O1 --> Blend["Hybrid Blend"]
    CF3 --> Blend
    Blend --> Final["Final Recommendations"]
```

**Key Characteristics:**
- Sequential modeling captures temporal patterns
- Multi-task learning shares representations across surfaces
- Embeddings-as-a-Service enables organization-wide reuse
- Hybrid approach combines Foundation with CF

### Hybrid System

Combines the best of both approaches for optimal results.

```mermaid
flowchart LR
    subgraph Stage1["Stage 1: Retrieval"]
        S1A["Two-Tower Model"]
        S1B["Generate Candidates<br/>(50-200 items)"]
        S1A --> S1B
    end

    subgraph Stage2["Stage 2: Re-ranking"]
        S2A["Transformer<br/>Sequential Features"]
        S2B["Multi-Task Scoring<br/>• Relevance<br/>• Engagement"]
        S2A --> S2B
    end

    subgraph Stage3["Stage 3: Ensemble"]
        S3A["CF Component"]
        S3B["Score Blending<br/>cf_weight parameter"]
        S3C["Final Top-K"]
        S3A --> S3B --> S3C
    end

    Stage1 --> Stage2 --> Stage3
```

---

## Interactive Exploration Apps

Three Gradio-based web applications for hands-on testing:

| App | Port | Model | Key Features |
|-----|------|-------|--------------|
| YouTube | 7860 | Two-Tower | Embedding dims, ANN retrieval, candidate tuning |
| Netflix | 7861 | Foundation + CF | Sequential modeling, Foundation weight tuning |
| Hybrid | 7862 | Combined | Full pipeline, CF weight tuning |

### App Workflow

```mermaid
flowchart LR
    T1["1. Generate<br/>Data"] --> T2["2. Initialize<br/>Model"]
    T2 --> T3["3. Train CF<br/>(if applicable)"]
    T3 --> T4["4. Get<br/>Recommendations"]
    T4 --> T5["5. Compare<br/>Methods"]
    T5 --> T6["6. Grid<br/>Search"]
```

### Data Generation Features

All apps include enterprise-grade synthetic data generation:

| Feature Category | Fields | Description |
|------------------|--------|-------------|
| **User Segments** | `lifecycle`, `engagement_tier`, `subscription_type` | new/active/at_risk/churned users |
| **Device Context** | `device_type`, `platform`, `primary_device` | Mobile/tablet/TV/web patterns |
| **Content Availability** | `content_tier`, `available_regions` | Regional licensing support |
| **Series Relationships** | `series_id`, `season`, `episode` | Episode-level binge tracking |
| **A/B Testing** | `experiment_id`, `variant` | Built-in experimentation |
| **Playback Quality** | `bitrate`, `buffering`, `quality_switches` | QoE metrics |

---

## Grid Search Optimization

### Methodology

Systematic hyperparameter optimization across all three systems to find optimal configurations.

```mermaid
flowchart TB
    subgraph DataPrep["Data Preparation"]
        D1["2,000 Content Items"]
        D2["1,000 Users"]
        D3["50,000 Interactions"]
        D4["10% Cold Start Users"]
    end

    subgraph GridSearch["Grid Search Process"]
        G1["Define Parameter Grid"]
        G2["Test All Combinations"]
        G3["Evaluate Metrics<br/>• Precision<br/>• Diversity<br/>• Combined"]
        G4["Rank Configurations"]
        G1 --> G2 --> G3 --> G4
    end

    subgraph Results["Results Analysis"]
        R1["Best Precision Config"]
        R2["Best Diversity Config"]
        R3["Best Combined Config"]
    end

    DataPrep --> GridSearch --> Results
```

### Metrics Definition

| Metric | Formula | Description |
|--------|---------|-------------|
| **Precision** | `matched_genres / total_recs` | Relevance - genre match rate |
| **Diversity** | `unique_genres / possible_genres` | Variety - genre spread |
| **Combined** | `2 × (P × D) / (P + D)` | Harmonic mean for balance |

### Test Parameters

#### YouTube Two-Tower
| Parameter | Values Tested |
|-----------|---------------|
| Embedding Dimensions | 32, 64, 128, 256 |
| Candidate Pool Size | 50, 100, 200 |
| K (Final Results) | 5, 10, 20 |
| **Total Configurations** | **36** |

#### Netflix Foundation
| Parameter | Values Tested |
|-----------|---------------|
| Embedding Dimensions | 64, 128 |
| K (Final Results) | 5, 10, 20 |
| Foundation Weight | 0.3, 0.5, 0.7, 0.9, 1.0 |
| **Total Configurations** | **36** |

#### Hybrid System
| Parameter | Values Tested |
|-----------|---------------|
| Embedding Dimensions | 64, 128 |
| Candidate Pool Size | 50, 100, 200 |
| K (Final Results) | 5, 10, 20 |
| CF Weight | 0.2, 0.4, 0.6, 0.8 |
| **Total Configurations** | **36** |

---

## Results

### Best Configurations Summary

| System | Combined | Precision | Diversity | Configuration |
|--------|----------|-----------|-----------|---------------|
| **YouTube** | **0.744** | 0.860 | 0.655 | Emb: 128, Candidates: 100, K: 5 |
| Hybrid | 0.688 | 0.524 | **1.000** | Candidates: 50, K: 5, CF: 0.2 |
| Netflix | 0.625 | 0.542 | 0.738 | Emb: 64, K: 5, Foundation: 0.3 |

### Performance Visualization

```mermaid
xychart-beta
    title "Combined Score Comparison"
    x-axis ["YouTube", "Hybrid", "Netflix"]
    y-axis "Score" 0 --> 1
    bar [0.744, 0.688, 0.625]
```

### Detailed Results by System

#### YouTube Two-Tower Results

| Rank | Emb Dim | Candidates | K | Precision | Diversity | Combined |
|------|---------|------------|---|-----------|-----------|----------|
| 1 | 128 | 100 | 5 | 0.860 | 0.655 | **0.744** |
| 2 | 64 | 50 | 5 | 0.671 | 0.802 | 0.731 |
| 3 | 256 | 100 | 5 | **0.931** | 0.600 | 0.730 |
| 4 | 32 | 50 | 5 | 0.485 | **0.892** | 0.628 |

**YouTube Insights:**
- **256-dim achieves highest precision (0.931)** - captures nuanced preferences
- **32-dim achieves highest diversity (0.892)** - fuzzier matches explore more
- **128-dim is the sweet spot** - best balance of both
- **Candidate pool size has NO impact** - 50 = 100 = 200 when K is fixed

#### Netflix Foundation Results

| Rank | Emb Dim | K | Foundation Wt | Precision | Diversity | Combined |
|------|---------|---|---------------|-----------|-----------|----------|
| 1 | 64 | 5 | 0.3 | **0.542** | 0.738 | **0.625** |
| 2 | 128 | 5 | 0.5 | 0.492 | 0.834 | 0.619 |
| 3 | 64 | 5 | 0.7 | 0.458 | **0.852** | 0.596 |

**Netflix Insights:**
- **Lower Foundation weight (0.3) wins** - CF improves precision
- **Higher Foundation weight increases diversity** - explores more
- **Embedding dimension has minimal impact** - transformer compresses well
- **Hybrid approach beats pure Foundation**

#### Hybrid System Results

| Rank | Candidates | K | CF Weight | Precision | Diversity | Combined |
|------|------------|---|-----------|-----------|-----------|----------|
| 1 | 50 | 5 | 0.2 | 0.524 | **1.000** | **0.688** |
| 2 | 100 | 10 | 0.2 | **0.528** | 0.835 | 0.647 |
| 3 | 50 | 20 | 0.2 | 0.502 | 0.611 | 0.551 |

**Hybrid Insights:**
- **Achieves PERFECT diversity (1.000)** at K=5
- **CF weight has NO impact at K=5** - Two-Tower dominates small K
- **K is the ONLY parameter that matters**
- **50 candidates is sufficient**

---

## Key Findings

### Universal Insights

```mermaid
flowchart TB
    subgraph Finding1["Finding 1: K=5 Wins"]
        F1A["Smaller K = Higher Quality"]
        F1B["Selection Effect:<br/>Only best items chosen"]
        F1C["Diversity Paradox:<br/>Easier to maintain variety"]
    end

    subgraph Finding2["Finding 2: Candidates Don't Matter"]
        F2A["50 = 100 = 200"]
        F2B["Bottleneck is embedding quality"]
        F2C["Use 50 for 4x faster retrieval"]
    end

    subgraph Finding3["Finding 3: Embedding Trade-off"]
        F3A["Higher dim → Better precision"]
        F3B["Lower dim → Better diversity"]
        F3C["128-dim is the sweet spot"]
    end
```

### Precision vs Diversity Trade-off

```mermaid
flowchart LR
    subgraph Precision["Maximize Precision"]
        P1["YouTube 256-dim: 0.931"]
        P2["More specific matching"]
        P3["Narrower recommendations"]
    end

    subgraph Balance["Best Balance"]
        B1["YouTube 128-dim: 0.744"]
        B2["Harmonic mean optimization"]
        B3["Production recommended"]
    end

    subgraph Diversity["Maximize Diversity"]
        D1["Hybrid K=5: 1.000"]
        D2["Maximum exploration"]
        D3["All genres represented"]
    end

    Precision <--> Balance <--> Diversity
```

### System Selection Guide

| Use Case | Recommended | Configuration | Why |
|----------|-------------|---------------|-----|
| Maximum Relevance | YouTube | Emb: 256, K: 5 | Highest precision (0.931) |
| Maximum Variety | Hybrid | K: 5 | Perfect diversity (1.000) |
| Best Balance | YouTube | Emb: 128, K: 5 | Highest combined (0.744) |
| Sequential Patterns | Netflix | Foundation: 0.3 | Captures temporal behavior |
| New Users (Cold Start) | Hybrid | K: 5, CF: 0.2 | Leverages both approaches |

---

## Production Recommendations

### Recommended Configurations

```python
# YouTube Two-Tower (Best Overall)
youtube_config = {
    "embedding_dim": 128,      # Best balance
    "num_candidates": 100,     # Sufficient for quality
    "k": 5,                    # Critical parameter
}

# Netflix Foundation
netflix_config = {
    "embedding_dim": 64,       # Efficient
    "k": 5,                    # Critical
    "foundation_weight": 0.3,  # More CF influence
}

# Hybrid System (Maximum Diversity)
hybrid_config = {
    "num_candidates": 50,      # Sufficient
    "k": 5,                    # Critical
    "cf_weight": 0.2,          # Two-Tower dominant
}
```

### Implementation Priority

```mermaid
flowchart LR
    subgraph Phase1["Phase 1"]
        P1A["Embedding Infrastructure"]
        P1B["EmbeddingStoreService"]
        P1C["Batch generation pipeline"]
    end

    subgraph Phase2["Phase 2"]
        P2A["Two-Tower Model"]
        P2B["User/Item towers"]
        P2C["ANN retrieval"]
    end

    subgraph Phase3["Phase 3"]
        P3A["Advanced Features"]
        P3B["Watch time prediction"]
        P3C["Multi-task ranking"]
    end

    Phase1 --> Phase2 --> Phase3
```

---

## Technologies Used

### Core Stack

| Category | Technology |
|----------|------------|
| **Language** | Python 3.12 |
| **Deep Learning** | PyTorch |
| **Vector Search** | FAISS |
| **Embeddings** | Sentence Transformers |
| **Web UI** | Gradio |
| **Data Processing** | Pandas, NumPy |

### Architecture Components

```mermaid
flowchart TB
    subgraph DataLayer["Data Layer"]
        DL1["Synthetic Data Generator"]
        DL2["Enterprise-Grade Models"]
        DL3["CSV Export"]
    end

    subgraph ModelLayer["Model Layer"]
        ML1["Two-Tower Networks"]
        ML2["Transformer Encoder"]
        ML3["Collaborative Filtering"]
    end

    subgraph AppLayer["Application Layer"]
        AL1["Gradio Web UI"]
        AL2["Grid Search Engine"]
        AL3["Visualization"]
    end

    DataLayer --> ModelLayer --> AppLayer
```

---

## Project Structure

```
research/
├── docs/                        # Documentation
│   ├── youtube/                 # YouTube research notes
│   │   └── code-examples/       # TypeScript implementations
│   ├── netflix/                 # Netflix research notes
│   │   └── code-examples/       # TypeScript implementations
│   ├── comparison/              # Side-by-side analysis
│   ├── implementation/          # Production recommendations
│   └── testing-results/         # Grid Search results
│
└── explorations/                # Interactive apps
    ├── youtube/                 # Port 7860
    │   ├── app.py              # Gradio interface
    │   ├── data.py             # Data generation
    │   └── models.py           # Two-Tower model
    ├── netflix/                 # Port 7861
    │   ├── app.py              # Gradio interface
    │   ├── data.py             # Data generation
    │   └── models.py           # Foundation + CF
    ├── hybrid/                  # Port 7862
    │   ├── app.py              # Gradio interface
    │   ├── data.py             # Data generation
    │   └── models.py           # Combined approach
    ├── run_grid_search_tests.py # Automated testing
    └── grid_search_results.json # Raw results
```

---

## Running the Project

### Prerequisites

```bash
# Python 3.10+
python --version

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
.\venv\Scripts\activate   # Windows
```

### Installation

```bash
cd services/recommendation/research/explorations
pip install -r requirements.txt
```

### Running Apps

```bash
# YouTube Two-Tower (Port 7860)
cd youtube && python app.py

# Netflix Foundation (Port 7861)
cd netflix && python app.py

# Hybrid System (Port 7862)
cd hybrid && python app.py
```

### Running Grid Search

```bash
cd explorations
python run_grid_search_tests.py
# Results saved to grid_search_results.json
```

---

## Future Enhancements

- [ ] Real-time A/B testing integration
- [ ] Contextual bandits for exploration
- [ ] Deep learning ranking models
- [ ] User embedding clustering analysis
- [ ] Cold start strategy comparison
- [ ] Multi-objective optimization
- [ ] Production deployment guides

---

## References

### Research Papers
- YouTube: "Deep Neural Networks for YouTube Recommendations" (2016)
- Netflix: "Foundation Models for Recommendations" (2024)
- Two-Tower: "Sampling-Bias-Corrected Neural Modeling" (2019)

### Documentation
- [YouTube Research Notes](https://github.com/robiriu/AdCP-media-platform-v2/tree/main/services/recommendation/research/docs/youtube)
- [Netflix Research Notes](https://github.com/robiriu/AdCP-media-platform-v2/tree/main/services/recommendation/research/docs/netflix)
- [Grid Search Results](https://github.com/robiriu/AdCP-media-platform-v2/tree/main/services/recommendation/research/docs/testing-results)

---

*Created: January 2026*

[← Back to Projects](index.md) | [View Repository →](https://github.com/robiriu/AdCP-media-platform-v2)
