# Achievement Bank
*Quantified, punchy accomplishment statements — one-liners for CV bullets, LinkedIn, or quick "give me an example" moments. Full narrative versions live in the STAR Bank. Every entry here should be defensible against a follow-up question.*

---

## Verified with hard numbers
- Built a GraphSAGE model (Project Kijiji) achieving 0.1434 test loss vs. 0.6931 random baseline — a 79% reduction — with a +0.0496 separation score, on a fully reproducible run
- Quantified the African internet peering infrastructure gap: DE-CIX Frankfurt (1,224 connected networks, 108.1M Mbps capacity) vs. KIXP Nairobi (154 networks, 2.9M Mbps) — an 8x network and 37x capacity gap, via a custom PeeringDB benchmark pipeline I built
- Detected and confirmed a live "trombone routing" event against real RIPE RIS BGP traffic — a Nairobi-to-Lusaka route detouring through Stockholm at a detour ratio of 8.37x
- Fixed an unbounded log file that had grown past 547MB by implementing size-based rotation (50MB threshold, 5 backups retained)
- Root-caused a bug spanning 3 layers (bridge, event schema, dashboard) that was silently causing incident fields to appear empty regardless of actual underlying data

## Verified without hard numbers (still strong, framed on outcome)
- Migrated a stalled real-time data pipeline (blocked on CLI auth and token rotation issues) to fully live and verified via row counts — unblocked a project that had stalled on infrastructure, not code
- Designed and shipped an autonomous test crawler covering 8 distinct user flows, feeding structured incident data into a dashboard presented directly to the CTO
- Root-caused a silent third-party model deprecation that had been causing every automated incident report to fail undetected — no errors, no alerts, just silent data loss until diagnosed
- Diagnosed a stale-vs-canonical backend deployment mix-up that was silently serving wrong data through a CTO-facing dashboard
- Solved a cross-platform build blocker (Windows/MSVC linker conflict with MSYS2 coreutils) by migrating the Rust toolchain to GNU — unblocked Windows builds entirely
- Found and fixed an incident-misattribution bug where automated reports were being attributed to the wrong test flow due to shared global state, via scoped per-flow state tracking
- Caught a timing-attack vulnerability in a code review, using an LLM-based review layer, that regex-based static analysis tools had missed entirely
- Identified two recurring organizational QA failure modes (unapplied migrations, stale QA documentation) and escalated them as process fixes rather than continuing to firefight the same symptoms repeatedly

## Integrity / rigor-based (differentiators, not just technical wins)
- Audited every claim in a graduate scholarship research proposal against actual run logs, and explicitly retracted two previously-cited results after confirming they were unverifiable — rather than let them stand unchecked
- Designed and enforced a "golden test spec" for a temporal graph network reproduction, catching a subtle but critical correctness bug class (out-of-order timestamp handling in memory aggregation) before it could propagate into a dependent thesis architecture
- Built an evidence-first QA methodology (batched verification commands → raw output → structured sign-off) specifically to make QA decisions auditable rather than "looks fine to me"

## LLM/AI reliability engineering (a distinct, in-demand skill — worth its own section)
- Diagnosed and fixed multiple classes of LLM false-positive behavior (hallucinated vulnerabilities, self-referential flagging) through targeted system prompt constraints, turning a noisy LLM review layer into a usable one
- Migrated a production vision-analysis pipeline from a deprecated model to a new provider (Groq → Gemini) without disrupting an unrelated, unaffected pipeline stage (text summarization stayed on Groq) — deliberate, scoped migration rather than a full rip-and-replace

---
*When asked "give me an example of X" in an application or interview, scan the section matching X (debugging, scale, leadership/process, AI reliability) rather than trying to recall from memory. Cross-reference the STAR Bank for the full story behind any of these.*