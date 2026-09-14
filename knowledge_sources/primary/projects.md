# Projects
*Source-of-truth doc — CV bullets, portfolio descriptions, and STAR stories all get pulled/trimmed from here. Write these once, in full, with real numbers. Trim down per-CV later; don't re-write from scratch each time.*

---

## 1. Project Kijiji
**One-liner:** Graph neural network system for detecting and correcting "trombone routing" (inefficient detour paths) in African internet infrastructure — flagship research project underpinning graduate scholarship applications.

- **Status:** Active, core roadmap items complete as of Sept 2026
- **Repo:** github.com/Much1r1/project_kijiji
- **Problem:** African internet traffic frequently takes inefficient "trombone" routes (e.g. routing through Europe between two African endpoints), driving up latency and cost. Kijiji detects and corrects this using graph learning, weighted toward regions with lower GDP (technical-equity framing).
- **Architecture:**
  - Rust engine for real-time trombone detection, streaming (not batch) against live BGP data
  - GraphSAGE model with temporal walk-forward cross-validation, benchmarked against a SEAL baseline and classical Valley-Free/Dijkstra routing
  - Inverse-GDP weighted loss function — the core technical-equity contribution
  - Tinybird real-time data pipeline (4 live datasources: nodes, edges, proposed peers, trombone events)
  - React/Vite dashboard with D3-force canvas rendering, polling live data (FragilityRank, PeeringSimulator, TopologyMap, TrombonePanel)
- **Validated results:**
  - GraphSAGE test loss 0.1434 vs. 0.6931 random baseline; separation score +0.0496 (run `20260517_200452`)
  - Confirmed live TROMBONE event detected against real RIPE RIS traffic: Nairobi→Lusaka routed via Stockholm/Telia Carrier, detour ratio 8.37
  - PeeringDB comparative benchmark: DE-CIX Frankfurt (1,224 networks / 108.1M Mbps) vs. KIXP Nairobi (154 networks / 2.9M Mbps) — quantifies the African peering infrastructure gap
- **Engineering highlights:**
  - Migrated a stalled Tinybird pipeline (auth/CLI blockers) to fully live, verified via row counts
  - Wired Rust engine into the live BGP path via a Python↔Rust subprocess bridge (`EngineClient`, `asyncio.Lock`-serialized), replacing prior pure-Python heuristic classification
  - Fixed a schema bug where the bridge was silently receiving the wrong event shape, causing false-empty trombone fields
  - Solved a Windows/MSVC vs. MSYS2 linker conflict by switching Cargo to the GNU toolchain
  - Added self-managed log rotation (bridge was unbounded, hit 547MB+) — rotates at 50MB, keeps 5 backups
  - Rigorous claim-hygiene practice: every README/proposal claim checked against actual run logs; two previously-cited results (a 51.3%→37.0% routing-reduction figure, a DE-CIX reference) were found unverifiable and explicitly dropped rather than left in
- **Why it matters for CVs:** Strongest evidence of end-to-end systems thinking — ML modeling, systems/infra engineering, and a real domain thesis (African infrastructure) in one project. Central to DAAD scholarship narrative.

---

## 2. AI-Augmented PR Review Bot
**One-liner:** GenAI-powered code review and security scanner that runs as a GitHub Action, catching issues regex-based linters miss.

- **Status:** Weeks 1–2 of planned 4-week MVP complete, ahead of schedule
- **Repo:** github.com/Much1r1/pr-review-bot
- **Problem:** Static analysis tools catch known patterns but miss semantic/security issues that need actual reasoning about code behavior.
- **Architecture:**
  - Python + tree-sitter/libCST for diff parsing
  - GitHub Actions trigger, posts inline + summary PR comments
  - LLM review layer using Groq (Llama 3.3 70B, free tier) instead of paid Claude/OpenAI APIs — deliberate cost-conscious architecture choice
  - Planned: React/Vite + Convex dashboard (Week 4)
- **Validated results:**
  - Verified end-to-end on a real test PR: diff parsing, rule-based checks (hardcoded secrets, TODO/FIXME), and comment posting all confirmed working
  - LLM layer caught a timing-attack password comparison vulnerability that regex-based rules could not detect
- **Engineering highlights:**
  - Diagnosed and fixed LLM false positives (flagging its own logging as debug leftovers, hallucinating a non-existent SSL/MITM issue) by tightening the system prompt to forbid assuming un-shown library behavior
  - Excluded bot's own source files from its review scope to prevent self-referential noise
- **Why it matters for CVs:** Demonstrates practical, cost-aware GenAI application engineering — not just calling an API, but debugging and constraining LLM behavior in production.

---

## 3. TGN Reproduction (Temporal Graph Networks)
**One-liner:** Productionized reproduction of Temporal Graph Networks (Rossi et al. 2020) as a real inference/training service — not a research notebook — built to de-risk the Kijiji thesis architecture.

- **Status:** In progress, targeting 1–2 week v1
- **Repo:** github.com/Much1r1/Temporal-Graph-Networks
- **Problem:** Kijiji's temporal GraphSAGE/TGN-style architecture (committed to in the DAAD thesis proposal) needed its academic ancestor reproduced rigorously, with proper tests, to validate the approach and address a seed-variance issue found in Kijiji's own run logs.
- **Architecture:**
  - Modular, tested codebase: unit tests on the memory module, message-passing step, temporal embedding
  - CLI + config-driven training (`tgn train --config configs/wikipedia.yaml`), seeded/reproducible
  - Planned FastAPI inference endpoint for live link prediction, reusing the Kijiji Rust-engine/FastAPI bridge pattern
  - Planned Docker + GitHub Actions CI (test suite + smoke-test training run on push)
  - Benchmarked on standard Wikipedia/Reddit temporal link-prediction datasets from the original paper
- **Engineering highlights:**
  - Enforced golden test spec for correctness: memory aggregation must correctly pick the max-timestamp message (not last array entry) under out-of-order input; updating one node's memory must not leak into others
  - Delegated initial build to an async coding agent (Jules) after a failed push left the repo empty; evaluated the resulting pipeline and made the deliberate call to keep and harden it rather than restart
- **Why it matters for CVs:** Shows rigor — reproducing a paper properly, as a tested system, to validate a real architectural decision elsewhere. Strong evidence for AI Engineering / research-adjacent roles.

---

## 4. AI-Powered Incident Response Dashboard
**One-liner:** Real-time incident dashboard for VettedAI's staging environment, built on Convex, presented directly to the CTO.

- **Status:** Live, presented to CTO (Tobi)
- **Repo:** github.com/Much1r1/AI_powered_incidence_response_dashboard
- **Stack:** React/Vite on Vercel, `ConvexHttpClient` polling pattern
- **Features:**
  - Settings page with real Convex-backed Incident Rules
  - Team page with full CRUD and assignee management
  - Service health cards driven from live `scout_status` data, with MTTR calculation and analytics charts
- **Engineering highlights:**
  - Migrated dashboard from mock data to real live Convex data
  - Diagnosed and resolved a stale-vs-canonical Convex deployment confusion (`elated-marmot-893` vs. `useful-gnat-782`) that was silently causing wrong-data bugs
  - Fixed live log timestamp and service-health status field bugs
- **Why it matters for CVs:** Demonstrates full-stack ownership of an internal tool that's actually used by leadership — real stakeholder visibility, not just a side project.

---

## 5. Vetted Scout
**One-liner:** Autonomous Playwright crawler that continuously dogfoods VettedAI's staging environment across 8 user flows and reports structured incidents — the data source that feeds the Incident Dashboard above.

- **Status:** Live, in active Phase 2 planning
- **Repo:** github.com/Much1r1/Vetted_scout
- **Stack:** Playwright/TypeScript, Convex backend, Render deployment, cron-scheduled runs
- **Features:**
  - Covers 8 distinct user-story flows end-to-end
  - Per-flow pass/fail incident reporting into Convex
  - Vision/screenshot-based incident analysis (LLM-driven)
- **Engineering highlights:**
  - Root-caused and fixed a global state leak (`crawler.steps` array bleeding across flows) using a scoped `startIdx`/`getFailuresSince` pattern
  - Root-caused a silent LLM model deprecation (Groq model retired) that was causing every flow's incident reporting to fail; migrated vision analysis to Gemini while keeping text summarization on Groq
  - Found and fixed an incident mislabeling bug where every flow's failure reports were attributed to the wrong flow, due to session-wide instead of per-flow step scoping
  - Solved the practice-audition sandbox's missing-Submit-button flow using `Promise.race()`
  - Deliberately chose not to keep patching brittle Playwright selectors piecemeal — scoped that work into a proper Phase 2 (vision/AI-based element detection) instead of accumulating technical debt
- **Why it matters for CVs:** Strong QA-engineering-meets-AI story — production test automation that self-heals via vision models, with real root-cause debugging under a live, constantly-changing product.

---

## 6. Vetted Automation & QA-Ops Orchestration
**One-liner:** Automated QA-Ops orchestration workflow connecting Fizzy board card status changes, GitHub webhooks, Discord alerts, and Playwright suites to execute targeted E2E tests on demand.

- **Status:** Live / Production
- **Repo:** github.com/Much1r1/Vetted_automation
- **Stack:** TypeScript, Playwright, Webhooks (Fizzy, GitHub, Discord), Node.js
- **Features:**
  - Trigger-based automated test suite execution tied to card movements on project management boards
  - Automated Discord notification channel for instant regression alerts and test execution summaries
  - Read-only database verification layer for non-destructive QA assertion on staging environments
- **Engineering highlights:**
  - Implemented read-only DB-level verification layer to validate data integrity across staging pipelines without state corruption
  - Designed webhook bridge connecting status changes directly to scoped Playwright test triggers, reducing manual regression testing overhead
- **Why it matters for CVs:** Highlights capability in developer tooling, CI/CD automation, and QA-Ops infrastructure that directly improves engineering speed and release stability.

---

*Add new projects here as they reach a stable, describable state. Keep the "Why it matters for CVs" line on every entry — that's what makes trimming for a specific CV variant fast.*

*Last updated: September 7, 2026*