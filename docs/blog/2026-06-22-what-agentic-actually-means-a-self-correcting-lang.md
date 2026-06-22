---
title: "What 'agentic' actually means: a self-correcting LangGraph document pipeline"
date: 2026-06-22T02:38:41.571467
category: general
---

![Agentic Document Pipeline](../images/agentic-doc-pipeline.png)

A multi-agent document-processing pipeline built on a real LangGraph state machine - an experiment in genuine agentic behaviour.

## What I was exploring

"Agent" is an overloaded word. I wanted real autonomous routing and self-correction, with guardrails and monitoring, rather than one LLM call wearing a costume.

## How it works

Drop in an invoice or purchase order and a supervisor-worker graph extracts the structured data, validates the arithmetic deterministically, and loops back to self-correct when something does not reconcile (capped-retry guardrail), then writes an operations report. The graph renders live, every step is streamed to the UI, and an evaluation panel tracks token cost, latency, correction loops and validation outcome per run.

## What was interesting

The deterministic validation feeding the self-correction loop - and the cap that stops it spinning forever - is what made it feel trustworthy.

A prototype; thoughts welcome.

Live demo: https://agentic.robiriu-dev.my.id

Project page: https://robiriu.github.io/projects/agentic-doc-pipeline/