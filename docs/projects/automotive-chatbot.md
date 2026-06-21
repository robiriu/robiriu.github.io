# WhatsApp AI Chatbot with Product Compatibility (Automotive)

**Status:** Live demo
**Demo:** [autobot.robiriu-dev.my.id](https://autobot.robiriu-dev.my.id) (dashboard at `/admin`)

![Automotive WhatsApp Chatbot](../images/automotive-chatbot.png)

## Executive Summary

A WhatsApp AI chatbot for an automotive electronics business that answers product, warranty, replacement, shipping, COD and FAQ questions from a knowledge base, checks **product compatibility by car model** and recommends the right product with an upgrade suggestion, transfers premium brands to a human agent, and captures every lead into a dashboard. The knowledge base and compatibility rules are editable without code.

## How It Works

1. **Knowledge-base answers** — Gemini answers warranty, replacement, shipping, COD and FAQ questions strictly from the business knowledge base.
2. **Compatibility logic** — when a customer names a car (brand and/or model), the assistant checks the catalogue's fitment rules, recommends the products that fit, quotes the price, and suggests an upgrade where one exists.
3. **Human handoff** — premium brands (BMW, Mercedes, Audi, and similar) and explicit "talk to a human" requests are not answered with a product; the bot transfers the customer to a human agent and a handoff notification fires.
4. **Lead capture** — a separate extraction call records name, mobile, city, car brand, car model, and the product of interest, with a status (Interested / Recommended / Human Handoff).

## Key Features

- **Compatibility by car model** — the distinctive requirement: model-aware product recommendation plus upselling, driven by editable fitment rules.
- **Knowledge-base grounding** — warranty, shipping, COD and FAQ answers come only from the configurable KB (uploadable PDFs/text in the full build).
- **Rule-based human handoff** — premium brands and complex cases route to a human with a notification.
- **Lead capture and dashboard** — leads plus an editable view of products, compatibility rules, and the knowledge base; the bot picks up changes without code.
- **Channel-agnostic** — connects to the client's WhatsApp Business number (Cloud API, QR connect).

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **LLM** | Gemini 2.5 Flash via Vertex AI |
| **Grounding** | Catalogue + compatibility rules + knowledge base in the system context |
| **Routing** | Rule-based human-handoff brand list |
| **Lead extraction** | Separate JSON-mode call with schema and merge |
| **Frontend / API** | Next.js 15 (App Router), TypeScript, Tailwind CSS (WhatsApp-styled UI) |
| **CRM store** | File-backed JSON (swappable for the client's CRM) |
| **Deployment** | pm2 + nginx, Let's Encrypt SSL on a VPS |

## Skills Demonstrated

- Domain-specific conversational AI (product recommendation with compatibility rules)
- Hybrid rule-based plus LLM routing (deterministic human handoff)
- Knowledge-base grounding and lead capture
- WhatsApp Cloud API chatbot architecture
- Vertex AI integration via a GCP service account

[← Back to Projects](index.md)
