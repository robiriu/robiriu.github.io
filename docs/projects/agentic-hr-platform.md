# Agentic HR Intelligence Platform

**Status:** Completed | Deployed on VPS (Nginx + Ubuntu)

## Executive Summary

A full-stack, AI-powered Human Resource management platform that transforms raw HR data into actionable workforce intelligence. The system ingests employee master data from PDF and attendance records from Excel, then provides an **agentic AI chat interface** with 5 specialized tools, interactive analytics dashboards, and AI-driven insights including turnover risk scoring, anomaly detection, and contract renewal recommendations.

Built with **Next.js 16 + React 19** on the frontend and **FastAPI** on the backend, powered by **Google Gemini 2.5 Flash** for agentic AI capabilities with multi-turn tool calling.

---

## Key Results

| Metric | Value |
|--------|-------|
| AI Agent Tools | 5 specialized HR tools |
| Tool-Calling Iterations | Up to 10 per query |
| Analytics Visualizations | 6 interactive dashboards |
| API Endpoints | 17 RESTful endpoints |
| Risk Scoring Dimensions | 5-factor model (0-100 scale) |
| Anomaly Detection Types | 5 automated checks |
| Language Support | Bilingual (Indonesian & English) |
| Responsive Breakpoints | Desktop, Tablet, Mobile |

---

## Core Features

### Phase 1 — Data Ingestion & Management

- **PDF Parser** — Automatically extracts employee master data (ID, name, position, contract type, dates, business unit) from structured PDF documents using pdfplumber
- **Excel Parser** — Ingests attendance records with clock-in/out timestamps, shift assignments, lateness, and overtime data using openpyxl
- **Dashboard KPIs** — Real-time cards showing total employees, active contracts, resignations, and expiring contracts with business unit breakdown

### Phase 2 — Agentic AI Chat

An intelligent chat interface powered by Google Gemini 2.5 Flash with **function calling** and up to **10 tool-calling iterations** per query:

| Tool | Capability |
|------|------------|
| `query_employees` | Search and filter employee database with complex criteria |
| `query_attendance` | Query attendance records with date ranges, status filters |
| `contract_alerts` | Find contracts expiring within N days |
| `analyze_patterns` | Compute workforce metrics — lateness rate, overtime, turnover, attendance rate, headcount |
| `get_employee_detail` | Retrieve full employee profile with attendance history |

- Bilingual support (Indonesian & English)
- Real-time streaming responses with tool call transparency
- Context-aware multi-turn conversations

### Phase 3 — Analytics Dashboard

Six interactive visualization sections built with **Recharts**:

- **AI Daily Briefing** — LLM-generated executive summary with 3-5 actionable items
- **Contract Expiry Timeline** — 6-month interactive bar chart for workforce planning
- **Attendance by Day of Week** — Composed chart with attendance status breakdown
- **Turnover Analysis** — Dual visualization by business unit and role
- **Lateness Leaderboard** — Top 20 employees ranked by lateness percentage
- **Overtime Monitor** — Top 20 employees by overtime frequency, filterable by business unit

### Phase 4 — AI-Powered Insights

#### Turnover Risk Assessment

Multi-factor scoring engine (0-100) evaluating employees across 5 dimensions:

- **Contract Level** (10-80 pts) — Contract type and stability
- **Lateness Rate** (0-30 pts) — Punctuality patterns
- **Absence Rate** (0-20 pts) — Attendance reliability
- **Contract Expiry** (0-15 pts) — Proximity to contract end
- **Business Unit Turnover** (0-10 pts) — Historical unit-level trends

#### Anomaly Detection

Automated data quality checks across 5 anomaly types:

- Ghost Employees — Active contracts with zero attendance records
- Chronic Lateness — Employees exceeding 50% late rate threshold
- Clock-in Gaps — Present status but missing timestamps
- Orphaned Records — Attendance entries without matching employee records
- Data Inconsistencies — Cross-table validation failures

#### Contract Renewal Recommendations

AI-driven renewal decisions for contracts expiring within 60 days, outputting actionable recommendations (Renew, Do Not Renew, Review, Promote to Permanent) with reasoning justification for each employee.

#### PDF Report Generator

Downloadable monthly HR intelligence reports generated with fpdf2, consolidating all insights into a single document.

---

## Technical Architecture

```
                    +------------------+
                    |   Next.js 16     |
                    |   React 19       |
                    |   Tailwind CSS 4 |
                    +--------+---------+
                             |
                        REST API
                             |
                    +--------+---------+
                    |    FastAPI        |
                    |  (Async Python)   |
                    +--------+---------+
                             |
              +--------------+--------------+
              |              |              |
     +--------+--+   +------+------+  +----+-------+
     | PostgreSQL |   | Gemini 2.5  |  |  Parsers   |
     | (5 tables) |   | Flash Agent |  | PDF + XLSX |
     +------------+   +------+------+  +------------+
                             |
                    +--------+---------+
                    |   5 Agent Tools   |
                    | (Function Calling)|
                    +-------------------+
```

---

## Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4, Recharts 3.8, TanStack React Table 8, Zustand 5 |
| **Backend** | FastAPI (Python), SQLAlchemy ORM, Uvicorn (ASGI) |
| **AI/LLM** | Google Gemini 2.5 Flash, Agentic tool calling (up to 10 iterations) |
| **Database** | PostgreSQL (5 tables) |
| **Data Parsing** | pdfplumber (PDF), openpyxl (Excel) |
| **Report Generation** | fpdf2 (PDF export) |
| **Infrastructure** | Nginx (reverse proxy), Ubuntu VPS |
| **UI/UX** | Lucide React icons, Inter + JetBrains Mono fonts, fully responsive (mobile/tablet/desktop) |

---

## Repository Structure

```
agentic-hr-platform/
├── backend/
│   ├── main.py                  # FastAPI app with auto-ingest
│   ├── config.py                # Environment configuration
│   ├── database.py              # SQLAlchemy setup
│   ├── models/                  # 5 database models
│   ├── routers/
│   │   ├── upload.py            # PDF & Excel upload endpoints
│   │   ├── data.py              # Data & analytics endpoints
│   │   ├── chat.py              # Agentic AI chat endpoint
│   │   └── insights.py          # AI insights endpoints
│   ├── agents/
│   │   ├── hr_agent.py          # Gemini agent with 5 tools
│   │   └── prompts.py           # System prompts
│   ├── parsers/                 # PDF & Excel parsers
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── page.tsx             # Dashboard with KPIs
│   │   ├── analytics/page.tsx   # 6-section analytics
│   │   ├── chat/page.tsx        # AI chat interface
│   │   ├── insights/page.tsx    # Risk, anomalies, recommendations
│   │   └── data/                # Employee & attendance browsing
│   ├── components/              # Reusable UI components
│   └── lib/api.ts               # API client
└── data/                        # Source data files (PDF + XLSX)
```

---

## Database Schema

| Table | Purpose |
|-------|---------|
| `employees` | Employee master data — ID, name, position, contract type, dates, business unit |
| `attendance` | Daily attendance — clock in/out, status, shift, lateness, overtime |
| `outlets` | Location/branch directory |
| `employee_outlet` | Employee-to-outlet assignment with supervisor mapping |
| `shifts` | Shift definitions with start/end times per business unit |

---

## Key Technical Achievements

- **Agentic AI with Tool Calling** — Gemini 2.5 Flash agent autonomously selects and chains up to 5 specialized tools across 10 iterations to answer complex HR queries
- **Zero-Config Data Ingestion** — Drop a PDF and Excel file, the system auto-parses and populates the entire database with structured records
- **Multi-Factor Risk Scoring** — Deterministic 5-dimension scoring engine (0-100) for turnover risk, enabling proactive HR intervention
- **Automated Anomaly Detection** — 5 types of data quality checks that surface ghost employees, chronic lateness, and data inconsistencies
- **AI-Driven Contract Decisions** — LLM-powered renewal recommendations with transparent reasoning for each employee
- **Fully Responsive Design** — Desktop sidebar, tablet collapsible nav, mobile hamburger menu with slide-out drawer
- **Bilingual AI** — Seamless Indonesian and English language support in the agentic chat interface
