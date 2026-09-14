# Professional Experience
*Source-of-truth doc — CV "Experience" sections and STAR/Achievement Bank entries all pull from here. Written in expandable bullets so you can trim per-CV without rewriting.*

---

## VettedAI
**Title:** QA Engineer & AI Engineer
**Product:** Recruiter-facing audition/hiring platform, plus companion candidate-facing app ("Congrats")
**Dates:** January 05, 2026 – Present
**Team:** Multi-repo codebase, working alongside an engineering lead ([[tobi-lafinhan]]) and backend/infra colleague ([[oussama]])

### Scope of Role
Dual-hat role spanning QA engineering (verification, test automation, sign-off authority) and AI engineering (building AI-powered internal tools) across VettedAI's four core repos.

### QA Engineering
- Own end-to-end QA verification across recruiter-facing and candidate-facing product surfaces, running structured sign-off on every ticket (PASS/FAIL with documented reasoning, not informal spot-checks)
- Built a repeatable, evidence-first QA methodology: batched `git grep`/SQL verification commands, raw output captured, then translated into structured sign-off tables — designed to be auditable, not just "looks fine to me"
- Identified and escalated two recurring process-level failure modes to the engineering lead rather than patching symptoms repeatedly:
  - Migrations correct in source control but never actually applied to staging/prod
  - QA guides referencing deployment states that no longer matched reality
- Manage environment hygiene across three separate Supabase instances (prod, staging, Congrats prod) — a real risk area given how easily environments get mixed up, handled via explicit labeling discipline
- Built out QA automation infrastructure over an extended period: Playwright test suites, a GitHub Actions CI pipeline, and Fizzy/Discord integration for surfacing results

### AI Engineering / Internal Tooling
- Designed and shipped **Vetted Scout**, an autonomous Playwright crawler that continuously dogfoods the staging environment across 8 user-story flows and reports structured incidents to a Convex backend (see [[vetted-scout]] in Projects for full technical detail)
- Root-caused and fixed several production-grade bugs in Scout: a global state leak causing incident misattribution across flows, a silent LLM provider deprecation that broke every flow's reporting, and a sandbox flow edge case (missing Submit button) via `Promise.race()`
- Designed and shipped an **AI-powered Incident Response Dashboard**, presented directly to the CTO — real-time service health, MTTR calculation, and incident management built on live Convex data (see [[incident-dashboard]] in Projects)
- Diagnosed and resolved a stale-vs-canonical backend deployment confusion that was silently causing the dashboard to show wrong data — the kind of bug that looks fine until someone checks the numbers against reality
- Set direction for Phase 2 of both QA tools: moving from brittle hardcoded Playwright selectors to vision/AI-based element detection, justified by how frequently the underlying product changes under active development

### Collaboration & Process
- Works cross-functionally with engineering lead and backend/infra colleague on a fast-moving, actively-developed product — QA findings and tooling decisions routinely feed back into engineering process, not just bug tickets
- Presented AI tooling work (Scout + Incident Dashboard) directly to CTO-level stakeholders

### Impact Summary (for CV headline bullets)
- Reduced reliance on manual QA spot-checks by building automated, self-reporting test infrastructure that runs continuously against staging
- Surfaced and fixed silent failure modes (deployment drift, LLM provider deprecation, state leaks) that would otherwise have gone undetected until they hit production
- Elevated QA from a checklist function to a source of AI-tooling innovation within the team

---

## Generous Circle
**Title:** Full-Stack Developer
**Product:** Fundraising web application and crowdfunding platform
**Dates:** January 2025 – April 2025
**Team:** Multi-repo environment, collaborating with cross-functional team members

### Scope of Role
Full-stack engineering across frontend user experience, backend service integration, and API management for a multi-repo fundraising platform.

### Key Responsibilities & Engineering Highlights
- **Multi-Repo Architecture:** Developed and maintained core features across frontend UI applications and backend microservices within a multi-repo ecosystem
- **End-to-End Feature Development:** Designed, built, and deployed responsive user-facing components for donor onboarding, campaign creation, and transaction management
- **API & Database Integration:** Integrated RESTful APIs, payment service providers, and database schemas to ensure transactional data consistency across high-volume donation flows
- **Cross-Functional Collaboration:** Partnered with team leads and product management to translate fundraising workflow requirements into production-ready full-stack implementations

### Impact Summary (CV Headline Bullets)
- Streamlined campaign management and donor conversion by shipping high-reliability frontend components and optimized API endpoints across a multi-repo codebase
- Enhanced platform stability by diagnosing and resolving cross-repo integration bottlenecks and API state synchronization issues

---

*Cross-reference: full technical build detail for Scout and the Incident Dashboard lives in Projects — don't duplicate it here, just reference and summarize for the "at work" framing.*

*Last updated: September 7, 2026*