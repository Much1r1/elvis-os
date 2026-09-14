# CV — AI Engineer
*Variant built from Career Facts, Skills & Technologies, Projects, and Professional Experience. Trim/adjust per specific JD — this is the strong default, not a final copy-paste.*

---

**Elvis Muchiri**
Nairobi, Kenya | muchirielvis375@gmail.com | +254745843685 | https://www.linkedin.com/in/elvis-muchiri-737135309/ | https://github.com/Much1r1 | https://elvis-os.vercel.app/

## Summary
AI Engineer building production-grade ML systems — not notebooks. Experience spans graph neural networks for network-infrastructure optimization, LLM-integrated developer tooling, and AI-powered internal products deployed and presented at CTO level. Strong emphasis on verification: every claim in my work is checked against logs and run data before it ships.

## Core Skills
**ML/AI:** PyTorch · Graph Neural Networks (GraphSAGE, temporal GNN/TGN architectures) · Model evaluation & baselining · LLM integration (Claude, OpenAI, Groq/Llama 3.3 70B, Gemini) · Prompt engineering
**Systems:** Python · Rust · TypeScript · FastAPI · Docker · GitHub Actions CI
**Data/Infra:** Convex · Tinybird (real-time pipelines) · Supabase
**Other:** Vision/AI-based automation · Rust↔Python interop

## Experience

### QA Engineer & AI Engineer — VettedAI
*January 05, 2026 – Present*
- Designed and shipped an autonomous AI-vision-assisted Playwright crawler (Vetted Scout) that dogfoods a live product across 8 flows, using LLM-based screenshot analysis to detect incidents
- Root-caused a silent LLM provider deprecation that had been failing every automated incident report undetected — migrated the vision pipeline to Gemini without disrupting the text-summarization path
- Built and presented an AI-powered Incident Response Dashboard directly to the CTO — live Convex-backed service health, MTTR calculation, incident analytics
- Set technical direction for migrating brittle rule-based automation to vision/AI-based element detection as the product's Phase 2

## Selected Projects

### Project Kijiji — GNN system for African internet routing optimization
Flagship research project (central to graduate AI Engineering applications). GraphSAGE model with temporal walk-forward cross-validation and an inverse-GDP weighted loss function — a technical-equity contribution to the model design itself. Validated: 0.1434 test loss vs. 0.6931 random baseline, +0.0496 separation score. Confirmed a live trombone-routing detection event against real RIPE RIS BGP traffic (detour ratio 8.37). Full pipeline: Rust detection engine → FastAPI bridge → Tinybird real-time datastore → React/D3 dashboard.

### TGN Reproduction — Temporal Graph Networks (Rossi et al. 2020)
Productionized reproduction of TGN as a tested system, not a notebook — built specifically to de-risk the Kijiji thesis architecture. Modular codebase with unit tests enforcing correctness on memory aggregation and message-passing (including out-of-order timestamp handling), CLI + config-driven training, planned FastAPI inference layer and CI.

### AI-Augmented PR Review Bot
GenAI code review/security scanner as a GitHub Action. LLM layer (Groq/Llama 3.3 70B) caught a timing-attack vulnerability that regex-based static analysis missed. Diagnosed and fixed LLM false-positive patterns by tightening system prompt constraints — practical experience constraining, not just calling, an LLM in production.

## Education
BBIT (Bachelor of Business Information Technology) — completed, Strathmore University, 12/08/2026
Pursuing graduate research portfolio in AI Engineering (DAAD scholarship application in progress)

---
*Adjust Summary and bullet order to match the specific JD's emphasis (research vs. applied, infra-heavy vs. modeling-heavy).*