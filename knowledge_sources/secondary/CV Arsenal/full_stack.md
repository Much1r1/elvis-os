# CV — Full-Stack Engineer
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
Full-stack engineer who ships complete products end-to-end — React/Vite frontends wired to real-time backends (Convex, Supabase, FastAPI), with systems-level work in Rust and Python underneath when needed. Track record of taking internal tools from mock data to live, stakeholder-facing products, including direct CTO presentations.

## Core Skills
**Frontend:** React · Vite · D3 (force-directed rendering) · Vercel deployment
**Backend:** FastAPI · Convex (schema design, crons, real-time polling) · Supabase · Tinybird (real-time pipelines)
**Languages:** TypeScript/JavaScript · Python · Rust
**Testing/CI:** Playwright · pytest · GitHub Actions
**Other:** Rust↔Python interop, LLM API integration (Claude, OpenAI, Groq, Gemini)

## Experience

### QA Engineer & AI Engineer — VettedAI
*January 05, 2026 – Present*
- Built two full-stack internal products end-to-end: an AI-powered Incident Response Dashboard and an autonomous test-automation crawler, both React/Vite + Convex, both presented to/used by leadership
- Migrated the Incident Dashboard from mock data to live Convex data; diagnosed and fixed a stale-vs-canonical deployment bug that was silently serving wrong data to the frontend
- Built full CRUD team management, live service health cards with MTTR calculation, and analytics charts — all backend-driven, no hardcoded state
- Own environment hygiene across 3 separate Supabase instances (prod, staging, Congrats prod) in a 4-repo codebase, catching migration drift between git and live environments
- Collaborate directly with engineering lead and backend/infra engineer on a continuously-changing production product

### Full-Stack Developer — Generous Circle
*January 2025 – April 2025*
- Developed and maintained core features across frontend UI applications and backend microservices in a multi-repo fundraising/crowdfunding platform
- Designed, built, and deployed responsive user-facing components for donor onboarding, campaign creation, and transaction management
- Integrated RESTful APIs, payment service providers, and database schemas to ensure transactional data consistency across high-volume donation flows
- Diagnosed and resolved cross-repo integration bottlenecks and API state synchronization issues, improving platform stability

## Selected Projects

### Project Kijiji
Full-stack systems project spanning the entire stack: Rust real-time detection engine → Python/PyTorch ML pipeline → Tinybird real-time data infrastructure → React/D3 live dashboard (FragilityRank, PeeringSimulator, TopologyMap, TrombonePanel, all wired to live data via a custom `useTinybird` hook). Migrated a stalled real-time pipeline (blocked on CLI auth/token issues) to fully live and verified. Solved a cross-platform Windows/Cargo linker conflict blocking the Rust build.

### AI-Powered Incident Response Dashboard
React/Vite on Vercel, `ConvexHttpClient` polling architecture (no websocket). Settings page with real Convex-backed rules, full CRUD team page, live service-health cards. Presented directly to CTO.

### Vetted Scout
Playwright/TypeScript crawler reporting structured incident data into Convex, the backend data source the Incident Dashboard consumes. Fixed a cross-flow state leak and a silent LLM-provider deprecation that had broken automated reporting.

### AI-Augmented PR Review Bot
Full pipeline from GitHub Action trigger → Python diff parser → LLM review layer → inline PR comments, with a planned React/Convex results dashboard. Verified end-to-end on real PRs.

## Education
BBIT (Bachelor of Business Information Technology) — completed, Strathmore University, 12/08/2026

---
*This variant should lead with whichever side (frontend polish vs. backend/data plumbing) the JD emphasizes more — the Kijiji project alone can be framed either way.*