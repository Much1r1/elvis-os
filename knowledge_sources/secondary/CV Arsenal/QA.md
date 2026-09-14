# CV — QA Automation Engineer
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
QA Automation Engineer with an evidence-first methodology and a track record of building AI-augmented test infrastructure, not just running it. Experience owning verification and sign-off across a multi-repo, multi-environment production codebase, plus designing autonomous testing systems that self-report and self-heal using vision/LLM-based detection.

## Core Skills
**Test Automation:** Playwright (TypeScript) · pytest · GitHub Actions CI pipelines
**QA Methodology:** Evidence-first verification (batched `git grep`/SQL checks, structured PASS/FAIL sign-off tables) · Migration/deployment drift detection · Multi-environment hygiene (prod/staging isolation)
**AI-Augmented QA:** Vision/LLM-based incident analysis and element detection · LLM provider migration/debugging
**Supporting Stack:** Python · TypeScript · Convex · Supabase · FastAPI

## Experience

### QA Engineer & AI Engineer — VettedAI
*January 05, 2026 – Present*
- Own QA verification and sign-off across VettedAI's four core repos (recruiter-facing and candidate-facing), using a consistent, auditable evidence-first workflow: batched verification commands → raw output → structured sign-off tables
- Identified and escalated two recurring process-level failure modes rather than firefighting symptoms: migrations correct in source control but never applied to staging/prod, and QA guides describing deployment states that no longer matched reality
- Manage QA across three isolated Supabase environments (prod, staging, Congrats prod) with strict environment-labeling discipline to prevent cross-environment mistakes
- Designed and built **Vetted Scout**, an autonomous Playwright crawler covering 8 user-story flows against live staging, using LLM vision analysis (screenshot-based) to detect and report incidents automatically to Convex
- Root-caused three distinct classes of automation failure: a global state leak causing cross-flow incident misattribution, a silent third-party model deprecation that had been failing incident reporting undetected, and a sandbox edge-case flow with no visible Submit button (solved via `Promise.race()`)
- Made a deliberate architectural call to stop patching brittle Playwright selectors piecemeal, scoping that debt into a proper Phase 2 (vision/AI-based, resilient element detection) instead
- Built supporting QA automation infrastructure: GitHub Actions CI pipeline, Fizzy/Discord result integration
- Designed and shipped **Vetted Automation & QA-Ops Orchestration**, a webhook-driven system connecting Fizzy board status changes, GitHub, and Discord to trigger targeted Playwright E2E test runs on demand, including a read-only DB-level verification layer for non-destructive staging assertions

## Selected Projects

### Vetted Scout (full detail)
Playwright/TypeScript autonomous crawler, Convex-backed, Render-deployed, cron-scheduled. Per-flow pass/fail reporting. Migrated vision-analysis dependency from a deprecated Groq model to Gemini after root-causing a silent failure; text summarization deliberately kept on Groq (no unnecessary migration).

### Vetted Automation & QA-Ops Orchestration
Webhook bridge (Fizzy, GitHub, Discord) triggering scoped Playwright test runs directly from project-board card status changes, with a read-only DB verification layer for non-destructive staging assertions and automated Discord regression alerts — reduced manual regression-testing overhead.

### AI-Powered Incident Response Dashboard
Built as the consumption layer for Scout's incident data; real-time service health, MTTR calculation, incident CRUD, presented directly to CTO. Diagnosed a stale-vs-canonical backend deployment bug that was silently serving wrong data to the dashboard.

### AI-Augmented PR Review Bot
Applied automated-verification mindset to code review: built rule-based static checks plus an LLM review layer, then rigorously tested the LLM layer against real PRs to find and fix false positives (hallucinated vulnerabilities, self-flagging) via prompt tightening rather than accepting noisy output.

## Education
BBIT (Bachelor of Business Information Technology) — completed, Strathmore University, 12/08/2026

---
*This variant leads hardest with QA methodology and rigor — the evidence-first framing and the "stopped patching piecemeal, scoped it properly" decisions are your strongest differentiators for SDET-style roles. Keep those in even when trimming for length.*