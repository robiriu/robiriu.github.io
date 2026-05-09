# Porto Agent — AI Content Marketing Platform

**Status:** Production — Deployed on VPS
**Repository:** [github.com/robiriu/porto-agent](https://github.com/robiriu/porto-agent)

## Executive Summary

An AI-powered content marketing platform that automatically generates technical blog posts and LinkedIn content from git commit history. Built with Gemini AI for content generation, LangGraph for workflow orchestration, and a modern Next.js dashboard for content approval workflows.

Porto Agent bridges the gap between engineering work and content marketing — turning daily commits into publishable technical articles with zero manual writing.

## Architecture

```
Docker Compose
├── PostgreSQL    (port 5432)  — Content queue, repos, commits, topics
├── FastAPI API   (port 8000)  — REST API with full CRUD
├── Next.js UI    (port 3000)  — Dashboard with 5 tabs
└── Scheduler     (cron)       — Daily scans, scheduled publishing
```

### Workflow

```
Scan Repos → Analyze Commits → Generate Blog (Gemini AI)
    → Generate Mermaid Diagrams → Generate LinkedIn Summary
    → Telegram Notification → Approve in Dashboard
    → Publish to GitHub Pages + LinkedIn
```

## Key Features

### Multi-Repo Git Analysis
- Scans commits from multiple GitHub accounts (personal + company)
- Analyzes code changes, commit messages, and file diffs
- Identifies publishable topics from engineering work

### AI Content Generation
- **Gemini 2.5 Flash** for high-quality technical writing
- Auto-generates context-aware Mermaid diagrams (not placeholder images)
- Produces both long-form blog posts and LinkedIn summaries
- Content sanitization to automatically remove company-specific information

### Human-in-the-Loop Approval
- **Dashboard**: Review, edit, approve/reject content via web UI
- **Telegram Bot**: Inline approve/reject notifications on mobile
- Content queue with full status tracking (draft → approved → published)

### Automated Publishing
- **GitHub Pages**: Direct publishing to portfolio blog
- **LinkedIn API**: OAuth-authenticated posting to LinkedIn feed
- **Scheduled posting**: Calendar-based content scheduling via APScheduler

### Content Dashboard (Next.js)
- **Overview**: Stats, recent activity, quick actions
- **Queue**: Content queue with filters and status tracking
- **Generate**: Trigger repo scans, generate content on demand
- **Calendar**: Month view of scheduled and published posts
- **Settings**: LinkedIn OAuth, repo configuration, Telegram setup

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | FastAPI, Python, SQLAlchemy (async) |
| **Frontend** | Next.js 16, Tailwind CSS |
| **AI** | Gemini 2.5 Flash, LangGraph orchestration |
| **Database** | PostgreSQL (content queue, repos, commits) |
| **Scheduling** | APScheduler (daily scans, scheduled posting) |
| **Notifications** | Telegram Bot API (inline approve/reject) |
| **Publishing** | GitHub Pages API, LinkedIn API (OAuth) |
| **Diagrams** | LLM-powered Mermaid diagram generation |
| **Deployment** | Docker Compose, VPS |

## Skills Demonstrated

- LLM Application Development (Gemini AI)
- Agent Orchestration (LangGraph)
- Human-in-the-Loop AI Workflows
- Full-Stack Development (FastAPI + Next.js)
- API Integration (GitHub, LinkedIn, Telegram)
- Automated Content Pipelines
- Scheduling and Background Jobs

[← Back to Projects](index.md)
