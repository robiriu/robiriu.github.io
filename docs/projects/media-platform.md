# Media Platform - Advertising Context Protocol (AdCP)

**Status:** Production-Ready | In Development
**Repository:** Private Company Repository

## Executive Summary

A comprehensive media platform with AdCP integration for OTT streaming, broadcast management, content management, media asset management, and out-of-home advertising systems. Built with a microservices architecture, event-driven design, and multimodal AI capabilities.

## System Architecture

The platform consists of multiple integrated systems:

- **OTT Streaming Platform**: Full-featured Netflix-like streaming application
- **Broadcast Management System (BMS)**: Linear TV scheduling and ad placement
- **Content Management System (CMS)**: Strapi v4 as single source of truth
- **Media Asset Management (MAM)**: AI-powered semantic search for media assets
- **Out-of-Home (OOH)**: Digital signage ad delivery
- **AdCP Integration**: Unified advertising protocol layer

## Technology Stack

### Backend Services

- **Framework**: NestJS with TypeScript
- **Runtime**: Node.js 22+
- **Microservices**: 8+ independent services
- **Communication**: RESTful APIs + Kafka event streaming
- **Testing**: Jest, E2E testing

### Frontend Applications

- **OTT Web App**: Next.js 14 with Server-Side Rendering
- **Video Player**: Video.js with adaptive bitrate streaming
- **UI Framework**: React 18 with server components
- **Build Tool**: Webpack with optimization
- **Responsive**: Mobile-first design (2-6 column grids)

### Databases & Caching

- **Primary Database**: PostgreSQL 16 with pgvector extension
- **Vector Search**: pgvector for semantic similarity (1536-dim embeddings)
- **Caching Layer**: Redis 7 for performance optimization
- **Connection Pooling**: Optimized for high concurrency

### Content Management

- **CMS**: Strapi v4 (headless CMS)
- **API**: RESTful API with JWT authentication
- **Content Types**: Video, audio, images, text metadata
- **Workflows**: Editorial approval and publishing pipelines

### Event Streaming & Messaging

- **Event Bus**: Apache Kafka
- **Topics**: Content uploads, metadata extraction, system events
- **Management**: Kafka UI for monitoring and debugging
- **Event Sourcing**: Full audit trail of all events

### Storage & CDN

- **Origin Storage**: MinIO S3-compatible storage
- **Buckets**: content-originals, content-processed, extraction-artifacts, strapi-uploads
- **CDN**: Cloudflare R2 / BunnyCDN for global delivery
- **Streaming**: HLS/DASH adaptive bitrate protocols

### Multimodal AI & Machine Learning

#### NLP Service (Text Analysis)
- **Framework**: spaCy, Hugging Face Transformers
- **Capabilities**:
  - Named Entity Recognition (NER)
  - Topic modeling and classification
  - Sentiment analysis
  - Keyword extraction
  - Text summarization

#### Vision Service (Image/Video Analysis)
- **Framework**: OpenAI CLIP, OpenCV
- **Capabilities**:
  - CLIP embeddings for semantic image search
  - Scene detection and segmentation
  - Object recognition
  - Logo and brand detection
  - Frame-by-frame video analysis
  - Visual similarity search

#### Audio Service (Audio Processing)
- **Framework**: OpenAI Whisper, pyannote
- **Capabilities**:
  - Speech-to-text transcription (90+ languages)
  - Speaker diarization (who spoke when)
  - Audio feature extraction
  - Music/speech classification
  - Acoustic scene detection

#### Media Processor
- **Tool**: FFmpeg
- **Functions**:
  - Video frame extraction (1 frame/second, max 60 frames)
  - Audio track extraction (16kHz mono WAV for Whisper)
  - Metadata extraction (duration, resolution, codecs)
  - Format conversion and transcoding

#### Feature Store
- **Database**: PostgreSQL + pgvector
- **Storage**: Centralized repository of all extracted features
- **Search**: Semantic similarity search across all modalities
- **Versioning**: Track extraction model versions for reproducibility

### Infrastructure & Deployment

#### Containerization
- **Docker**: Multi-stage Dockerfile builds
- **Docker Compose**: Full stack orchestration
- **Services**: 10+ containerized services
- **Networking**: Custom bridge networks

#### Orchestration
- **Kubernetes**: Production-ready manifests
- **Resources**: Deployments, StatefulSets, Services, Ingress
- **Scaling**: Horizontal Pod Autoscaling (HPA)
- **Secrets**: Kubernetes Secrets management

#### Infrastructure as Code
- **Terraform**: Cloud infrastructure provisioning
- **Modules**: Reusable infrastructure components
- **State Management**: Remote state backend

#### CI/CD Pipeline
- **Platform**: GitHub Actions
- **Workflows**: Build, test, deploy
- **Stages**: Lint → Test → Build → Deploy
- **Environments**: Development, staging, production

#### Monitoring & Observability (Planned)
- **Metrics**: Prometheus for time-series data
- **Visualization**: Grafana dashboards
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Tracing**: Distributed tracing for microservices

## Key Features

### Event-Driven Metadata Extraction

Content uploads automatically trigger a sophisticated extraction pipeline:

1. **S3 Event**: Content uploaded to MinIO triggers S3 event
2. **Kafka Topic**: Event published to metadata-extraction topic
3. **Orchestrator**: Routes job to appropriate extraction services
4. **Parallel Processing**: NLP, Vision, and Audio services process simultaneously
5. **Feature Store**: Results stored with vector embeddings
6. **Indexing**: Content becomes searchable across all modalities

### Semantic Content Discovery

- Vector similarity search using CLIP embeddings
- "Find similar videos" based on visual content
- Text-to-video search ("show me videos about technology")
- Audio-based search (speaker identification, topic matching)
- Multi-modal fusion (combine text, visual, and audio signals)

### Recommendation Engine

Three recommendation strategies:

1. **Popular Content**: Trending content based on view counts and engagement
2. **Continue Watching**: Resume watching from last position
3. **Similar Content**: Vector similarity using content embeddings

### Real-Time OTT Streaming

- **Adaptive Bitrate**: Automatically adjusts quality based on bandwidth
- **Video Player**: Video.js with custom controls and playlists
- **DRM Support**: Content protection (planned)
- **Analytics**: Real-time playback telemetry
- **Session Management**: User authentication and watch history

### Production-Grade Infrastructure

- **High Availability**: Redundant services with load balancing
- **Scalability**: Horizontal scaling for all stateless services
- **Performance**: Redis caching, database connection pooling
- **Security**: JWT authentication, input validation, CORS configuration
- **Monitoring**: Health checks, metrics collection, alerting

## Documentation

The project includes extensive documentation (350+ pages):

- **Architecture Overview** (95KB): System design and component relationships
- **Metadata Extraction Layer** (39KB): Detailed AI/ML pipeline documentation
- **Service Specifications**: Individual docs for all 8 microservices
- **API Documentation**: OpenAPI 3.0 specifications
- **Deployment Guides**: Docker Compose, Kubernetes, Terraform
- **Technology Decisions**: Rationale for tech stack choices
- **Mermaid Diagrams**: Visual architecture and workflow diagrams

## Development Workflow

### Local Development

```bash
# Start infrastructure services
cd infrastructure
docker-compose up -d

# Start development servers
npm run dev

# Or start individual services
npm run dev:recommendation
npm run dev:ott-web
```

### Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Deployment

```bash
# Docker Compose deployment
docker-compose -f infrastructure/docker-compose.yml up -d

# Kubernetes deployment
kubectl apply -f infrastructure/kubernetes/

# Terraform infrastructure
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

## Modules & Services

### Module 0: OTT Web Frontend (Port 3100)
- Next.js 14 streaming platform
- Video.js player with fluid 16:9 aspect ratio
- Responsive grids (2-6 columns)
- My List and search functionality

### Module 1: Recommendation Service (Port 3001)
- 3 recommendation strategies
- Real-time content fetching from Strapi
- Caching layer for performance
- RESTful API with OpenAPI documentation

### Module 2: Auth Service (Port 3002)
- JWT-based authentication
- User session management
- OAuth2/OIDC integration (planned)

### Module 3: Metadata Extraction (Ports 3005-3008)
- NLP Service: Text analysis and entity extraction
- Vision Service: Image/video analysis with CLIP
- Audio Service: Transcription and diarization
- Orchestrator: Job scheduling and coordination

### Module 4: MAM Backend (Port 4000)
- Media Asset Management API
- AI-powered semantic search
- Asset metadata management
- Version control for media assets

### Module 5: MAM Frontend (Port 3000)
- Web interface for media management
- Asset browser and search
- Metadata editing
- Preview and playback

### Modules 6-9 (Planned)
- Content Enrichment Service
- Brand Safety & Compliance
- AdCP Context Builder
- AdCP Gateway

## Performance Characteristics

- **API Response Time**: <100ms for cached requests
- **Video Playback Start**: <2s time to first frame
- **Metadata Extraction**: 2-5 minutes per video (depending on length)
- **Search Query**: <500ms for vector similarity search
- **Concurrent Users**: Tested up to 100+ simultaneous streams

## Cloud Deployment (Google Cloud Platform)

The OTT streaming platform is deployed on **Google Cloud Platform** in a production microservices architecture across multiple GCP services:

### Cloud Run — Serverless Microservices

5 containerized services deployed as Cloud Run instances in `asia-southeast1` (Singapore):

| Service | Role | Resources | Auto-scaling |
|---------|------|-----------|--------------|
| **ott-web** | Next.js OTT frontend with SSR | 1 vCPU, 1Gi RAM | Up to 3 instances |
| **auth-service** | JWT authentication and user management | 1 vCPU, 512Mi RAM | Auto |
| **rec-service** | ML recommendation engine | 1 vCPU, 1Gi RAM | Auto |
| **mam-service** | Media asset management API | 1 vCPU, 512Mi RAM | Auto |
| **ml-service** | ML inference and content analysis | 2 vCPU, 2Gi RAM | Auto |

### Cloud SQL — Managed PostgreSQL

- **Engine**: PostgreSQL 16
- **Networking**: Private IP (VPC peering) for secure service-to-service communication
- **Access**: Only reachable from Cloud Run via VPC connector

### Compute Engine — Media Streaming Server

- **Instance**: `e2-small` VM running MediaMTX
- **Purpose**: Live media streaming and transcoding
- **Public IP**: Directly accessible for stream ingest

### Artifact Registry — Container Management

- **Repository**: Docker registry in `asia-southeast1`
- **Images**: 5 production container images (~3.3GB total)
- **Pipeline**: Build locally → Push to Artifact Registry → Deploy to Cloud Run

### Secret Manager

10 managed secrets for secure credential handling:

- Database passwords (auth, MAM, ML, recommendation, Strapi)
- JWT and playback secrets
- Payment gateway keys (Midtrans)
- Email service credentials (Resend API, SMTP)

### GCP Architecture Diagram

```
                        ┌─────────────────────┐
                        │   Custom Domain      │
                        │   (Cloud Run Mapping) │
                        └─────────┬───────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │     Cloud Run (5 svc)      │
                    │  ┌───────┐  ┌───────────┐  │
                    │  │ott-web│  │auth-service│  │
                    │  └───┬───┘  └─────┬─────┘  │
                    │  ┌───┴───┐  ┌─────┴─────┐  │
                    │  │rec-svc│  │ mam-service│  │
                    │  └───────┘  └───────────┘  │
                    │  ┌──────────┐               │
                    │  │ml-service│               │
                    │  └──────────┘               │
                    └─────────────┬──────────────┘
                                  │ VPC Connector
                    ┌─────────────▼──────────────┐
                    │      Cloud SQL (PG 16)      │
                    │      Private IP only        │
                    └────────────────────────────┘

    ┌────────────────┐    ┌─────────────────────┐
    │ Compute Engine │    │  Artifact Registry   │
    │   MediaMTX     │    │  Docker images (5)   │
    │  (streaming)   │    │  ~3.3GB total        │
    └────────────────┘    └─────────────────────┘

    ┌─────────────────────────────────────────┐
    │         Secret Manager (10 secrets)      │
    │  DB passwords, JWT, API keys, SMTP       │
    └─────────────────────────────────────────┘
```

### Cloud Skills Demonstrated

- Serverless container deployment (Cloud Run)
- Managed database with private networking (Cloud SQL + VPC)
- Container registry management (Artifact Registry)
- Secret management (Secret Manager)
- Domain mapping with managed SSL
- Cost-optimized architecture (serverless auto-scaling)

---

## Security Features

- **Authentication**: JWT tokens with expiration
- **Authorization**: Role-based access control (RBAC)
- **Input Validation**: class-validator for all inputs
- **CORS**: Configured per environment
- **Rate Limiting**: Protection against abuse
- **SQL Injection**: Parameterized queries with TypeORM
- **XSS Protection**: Input sanitization
- **Secrets Management**: Environment variables, never committed

## Scalability Considerations

- **Stateless Services**: Easy horizontal scaling
- **Database Connection Pooling**: Efficient resource usage
- **Caching Strategy**: Redis for frequently accessed data
- **CDN Integration**: Global content delivery
- **Async Processing**: Background jobs for heavy tasks
- **Microservices**: Independent scaling per service
- **Event-Driven**: Decoupled components via Kafka

## Future Enhancements

- Multi-language support for UI
- Advanced personalization with ML models
- Real-time collaborative features
- Enhanced analytics and business intelligence
- Mobile native applications (iOS/Android)
- Voice search and voice commands
- Advanced DRM and watermarking
- Live streaming capabilities

## Links

- **Repository**: Private Company Repository
- **Documentation**: 350+ pages including architecture, service specs, and deployment guides

[← Back to Projects](index.md)
