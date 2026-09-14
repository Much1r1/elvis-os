# CV — AI/ML Engineer
*Variant built from Career Facts, Skills & Technologies, Projects, and Professional Experience. Trim/adjust per specific JD.*
*Note: distinct from the "AI Engineer" variant; this one leans harder into modeling/research rigor over applied product tooling.*

---

**Elvis Muchiri**
Nairobi, Kenya
Email: muchirielvis375@gmail.com
Phone: +254745843685
LinkedIn: https://www.linkedin.com/in/elvis-muchiri-737135309/
GitHub: https://github.com/Much1r1
Portfolio: https://elvis-os.vercel.app/

## Summary
ML engineer focused on graph-based learning systems, with a research discipline of verifying every claim against actual run logs before it ships or gets cited in a proposal. Core work: graph neural networks for network-infrastructure optimization (GraphSAGE, temporal architectures), reproduced academic baselines as production systems, and applied LLM integration in real tools.

## Core Skills
**ML/Modeling:** PyTorch · Graph Neural Networks (GraphSAGE, temporal GNN/TGN-style architectures) · Baseline comparison methodology (SEAL, classical routing algorithms) · Temporal walk-forward cross-validation · Custom loss function design (inverse-GDP weighted loss)
**LLMs:** Claude API · OpenAI API · Groq (Llama 3.3 70B) · Gemini · Prompt engineering for reliability (reducing hallucination/false-positive rates)
**Engineering:** Python · Rust · FastAPI · Docker · CI (GitHub Actions) · reproducible/seeded training pipelines
**Data Infra:** Tinybird (real-time pipelines) · Convex

## Experience

### QA Engineer & AI Engineer — VettedAI
*January 05, 2026 – Present*
- Applied LLM integration in production tooling: built vision-based incident detection (screenshot analysis via LLM) for an autonomous test crawler, and a code-review LLM layer that caught vulnerabilities static analysis missed
- Root-caused a silent LLM provider deprecation causing undetected reporting failures; migrated cleanly to a new provider without disrupting unaffected pipeline components
- Iteratively debugged LLM false-positive behavior (hallucinated vulnerabilities, self-referential flagging) via targeted prompt constraints — hands-on experience making LLM output reliable enough for production use, not just a demo

## Selected Projects

### Project Kijiji: Graph Neural Networks for African Internet Infrastructure
Flagship ML research project. Built and validated a GraphSAGE model with temporal walk-forward cross-validation for detecting inefficient "trombone" routing in internet infrastructure; test loss 0.1434 vs. 0.6931 random baseline, +0.0496 separation score (fully reproducible run, ID `20260517_200452`). Designed a custom inverse-GDP weighted loss function as a technical-equity contribution to the model itself, not just a post-hoc framing. Benchmarked against a SEAL baseline and classical Valley-Free/Dijkstra routing in a four-way comparison. Verified the model's real-world relevance by confirming a live trombone-routing event against actual RIPE RIS BGP traffic data. Maintained strict claim hygiene throughout: two previously-cited results were checked against all run logs, found unverifiable, and explicitly retracted from the proposal rather than left in.

### TGN Reproduction: Temporal Graph Networks (Rossi et al. 2020)
Reproduced TGN as a rigorously tested system specifically to de-risk and validate the Kijiji thesis architecture (TGN is the direct academic ancestor of Kijiji's temporal GraphSAGE design). Enforced a golden test spec on core correctness properties: memory aggregation must pick the maximum-timestamp message under out-of-order input (not simply the last array entry), and updating one node's memory must not leak into others. Config-driven, seeded/reproducible training pipeline; directly addressing a seed-variance issue identified in Kijiji's own run logs.

### AI-Augmented PR Review Bot
LLM-based code review layer (Groq/Llama 3.3 70B) that caught a timing-attack vulnerability regex rules missed. Systematically diagnosed and fixed false-positive patterns through prompt refinement — practical experience in the gap between "LLM demo works" and "LLM output is trustworthy enough to act on."

## Education
BBIT (Bachelor of Business Information Technology) — completed, Strathmore University, 12/08/2026
Pursuing graduate research portfolio in AI Engineering (DAAD scholarship application in progress) — Kijiji is the central proposal project

---
*This is your most research-coded variant — use it for roles that explicitly value modeling rigor, reproducibility, or research-adjacent work over pure product engineering.*