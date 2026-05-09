# Automation Testing Platform (ATP)

**Status:** Published on npm
**Package:** [@robi-atp/cli](https://www.npmjs.com/package/@robi-atp/cli)
**License:** MIT

## Executive Summary

A Playwright-like automation testing framework specialized for AI platforms — LLM APIs, AI chat interfaces, and intelligent applications. Published as a suite of npm packages with full TypeScript support, supporting API testing (REST, GraphQL, WebSocket, SSE), browser automation, and AI-specific validation including semantic similarity and hallucination detection.

## Key Differentiators

Unlike general-purpose testing tools, ATP is purpose-built for AI:

- **LLM Provider Testing**: Native clients for OpenAI and Anthropic APIs
- **Streaming Support**: First-class support for SSE and streaming responses
- **AI Validation**: Semantic similarity scoring, hallucination detection, quality metrics
- **AI-Aware Selectors**: Browser automation helpers for chat UIs and AI interfaces

## Package Architecture

```
@robi-atp (npm scope)
├── @robi-atp/core       — Test runner, assertions, fixtures, config loader
├── @robi-atp/api        — HTTP client (REST/GraphQL/WebSocket/SSE) + LLM clients
├── @robi-atp/ai         — Semantic similarity, hallucination detection, quality scoring
├── @robi-atp/browser    — Playwright wrapper with AI-UI helpers
├── @robi-atp/reporter   — HTML, JUnit XML, JSON, console reporters
└── @robi-atp/cli        — CLI tool (`atp` command)
```

### Internal Packages (Dashboard)

```
├── @robidany/server     — Fastify backend (Prisma, Redis, BullMQ, JWT, WebSocket)
└── @robidany/web        — Next.js 14 dashboard (App Router, React 18, Tailwind)
```

## Quick Start

```bash
# Install
npm install -g @robi-atp/cli

# Initialize a test project
atp init my-ai-tests
cd my-ai-tests

# Run tests
atp run
```

## Features

### API Testing
- REST, GraphQL, WebSocket, and Server-Sent Events (SSE)
- Request/response validation with JSON Schema
- Authentication helpers (JWT, API key, OAuth)
- Response time assertions

### LLM Testing
- Native OpenAI and Anthropic SDK clients
- Streaming response validation
- Token usage tracking
- Model response quality assertions

### AI Validation Matchers

```typescript
// Semantic similarity
expect(response).toBeSemanticallySimilarTo(expected, { threshold: 0.85 });

// Hallucination detection
expect(response).not.toContainHallucinations(groundTruth);

// Quality scoring
expect(response).toHaveQualityScore({ min: 0.7 });
```

### Browser Automation
- Playwright-based browser testing
- AI-specific selectors for chat UIs
- Screenshot capture and comparison
- Network interception for API mocking

### Reporting
- HTML reports with visual test results
- JUnit XML for CI/CD integration
- JSON output for programmatic analysis
- Console reporter for local development

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript (strict mode, ESM-only) |
| **Runtime** | Node.js 20+ |
| **Monorepo** | pnpm + Turborepo |
| **Testing** | Vitest (internal tests) |
| **Browser** | Playwright |
| **Backend** | Fastify, Prisma, BullMQ |
| **Dashboard** | Next.js 14, React 18, Tailwind CSS |
| **Auth** | JWT |
| **Queue** | Redis + BullMQ |
| **CI/CD** | GitHub Actions, Jenkins, GitLab CI compatible |

## CI/CD Integration

```yaml
# GitHub Actions example
- name: Run AI Tests
  run: |
    npm install -g @robi-atp/cli
    atp run --reporter junit --output results.xml
```

## Skills Demonstrated

- npm Package Publishing (monorepo, scoped packages)
- TypeScript Framework Design (strict ESM)
- AI/LLM Testing Methodology
- Semantic Similarity and NLP Evaluation
- Playwright Browser Automation
- Monorepo Management (pnpm + Turborepo)
- Developer Tooling and CLI Design

[← Back to Projects](index.md) | [View on npm →](https://www.npmjs.com/package/@robi-atp/cli)
