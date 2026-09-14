# CV — Software Engineer
*Variant built from Career Facts, Skills & Technologies, Projects, and Professional Experience. Trim/adjust per specific JD.*

---

**Elvis Muchiri**
Nairobi, Kenya
Email: muchirielvis375@gmail.com
Phone: +254745843685
LinkedIn: https://www.linkedin.com/in/elvis-muchiri-737135309/
GitHub: https://github.com/Much1r1
Portfolio: https://elvis-os.vercel.app/

## Summary
Software Engineer with full-stack range — React/Vite frontends, Convex/Supabase/FastAPI backends, and systems-level work in Rust and Python. Comfortable owning a feature end-to-end: architecture, implementation, debugging production issues, and shipping to real stakeholders. Background spans internal tooling, GenAI-integrated products, and infrastructure-focused research work.

## Core Skills
**Languages:** Python · TypeScript/JavaScript · Rust
**Frontend:** React · Vite · D3
**Backend/Infra:** FastAPI · Convex · Supabase · Tinybird · Docker · GitHub Actions
**Testing:** Playwright · pytest · CI-driven test automation
**Other:** Rust↔Python interop, cross-platform build debugging (Windows/Cargo toolchains)

## Experience

### QA Engineer & AI Engineer — VettedAI
*January 05, 2026 – Present*
- Built and shipped two production internal tools end-to-end: an autonomous test-automation crawler (Vetted Scout) and a real-time Incident Response Dashboard, both on React/Vite + Convex
- Root-caused and fixed multiple production bugs: a global state leak causing cross-flow data corruption, a stale-vs-canonical backend deployment mix-up silently serving wrong data, and a silently-failing third-party API dependency
- Own QA verification and sign-off process across a 4-repo, multi-environment (prod/staging/Congrats) codebase, including catching migrations that were correct in git but never applied to live environments
- Collaborate directly with engineering lead and backend/infra engineer on a fast-moving product under continuous active development

### Full-Stack Developer — Generous Circle
*January 2025 – April 2025*
- Developed and maintained core features across frontend UI applications and backend microservices in a multi-repo fundraising/crowdfunding platform
- Designed, built, and deployed responsive user-facing components for donor onboarding, campaign creation, and transaction management
- Integrated RESTful APIs, payment service providers, and database schemas to ensure transactional data consistency across high-volume donation flows
- Diagnosed and resolved cross-repo integration bottlenecks and API state synchronization issues, improving platform stability

## Selected Projects

### Vetted Scout
Playwright/TypeScript crawler dogfooding a live product across 8 user flows, reporting structured incidents to Convex. Fixed a global array-scoping bug causing incident misattribution; migrated a vision-analysis dependency after diagnosing a silent model deprecation; solved an edge-case UI flow using `Promise.race()`.

### AI-Powered Incident Response Dashboard
React/Vite on Vercel, Convex-backed, `ConvexHttpClient` polling architecture. Full CRUD team management, live service health cards with MTTR calculation, analytics charts. Presented directly to CTO.

### Project Kijiji
Full-stack systems project: Rust detection engine, Python ML pipeline (PyTorch/GraphSAGE), Tinybird real-time data infrastructure, React/D3 dashboard. Migrated a stalled real-time pipeline to fully live; solved a cross-platform (Windows/MSVC vs. GNU toolchain) build issue; implemented production hygiene (log rotation) for an unbounded 547MB+ log file.

### AI-Augmented PR Review Bot
Python + tree-sitter/libCST diff parser, GitHub Actions integration, LLM-based review layer. Verified end-to-end on real PRs; iteratively fixed false-positive behavior through prompt refinement.

## Education
BBIT (Bachelor of Business Information Technology) — completed, Strathmore University, 12/08/2026

---
*Adjust Summary and Experience ordering toward frontend, backend, or generalist emphasis depending on the JD.*