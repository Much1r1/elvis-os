import type { ProjectRecord } from '../../types/portfolio';

export const PROJECTS_DATA: ProjectRecord[] = [
  {
    id: 'project_kijiji',
    name: 'Project Kijiji',
    slug: 'project-kijiji',
    category: 'Infrastructure & AI',
    oneLiner:
      'Graph neural network system for detecting and correcting "trombone routing" in African internet infrastructure — flagship research project underpinning graduate scholarship applications.',
    description:
      'African internet traffic frequently takes inefficient "trombone" routes (e.g. routing through Europe between two African endpoints), driving up latency and cost. Kijiji detects and corrects this using graph learning, weighted toward regions with lower GDP (technical-equity framing). Features a Rust engine streaming live BGP telemetry from RIPE RIS, a GraphSAGE model with walk-forward CV, a Tinybird real-time data pipeline, and a D3-force graph visualizer.',
    problem:
      'Inefficient BGP trombone routes force intra-African network traffic to travel through European exchange points (e.g., Frankfurt or Stockholm) before returning to neighboring African countries, creating an 8x-37x peering infrastructure capacity gap.',
    approach:
      'Built a Rust engine for streaming BGP trombone detection, combined with a PyTorch GraphSAGE model using inverse-GDP loss weighting. Real-time BGP streams feed a Tinybird pipeline and a React/D3 force-directed network topology canvas.',
    technologies: [
      'Python',
      'PyTorch',
      'GraphSAGE',
      'Rust',
      'FastAPI',
      'Tinybird',
      'React',
      'Vite',
      'D3.js',
      'RIPE RIS Telemetry',
      'PeeringDB API'
    ],
    keyContributions: [
      'Wired Rust engine into live BGP path via Python↔Rust subprocess bridge (EngineClient, asyncio.Lock-serialized).',
      'Migrated a stalled Tinybird real-time data pipeline (blocked on CLI auth/token rotation) to fully live and verified via row counts.',
      'Solved Windows/MSVC linker conflict with MSYS2 coreutils by migrating Cargo toolchain to GNU.',
      'Implemented self-managed size-based log rotation (50MB threshold, 5 backups retained) on an unbounded 547MB+ bridge log file.',
      'Audited every claim against run logs, removing unverified figures to maintain 100% claim-hygiene.'
    ],
    results: [
      { label: 'GraphSAGE Test Loss', value: '0.1434 vs 0.6931 baseline' },
      { label: 'Loss Reduction', value: '79% Reduction' },
      { label: 'Separation Score', value: '+0.0496' },
      { label: 'Confirmed Live Detour', value: 'Nairobi→Lusaka via Stockholm (8.37x ratio)' },
      { label: 'Peering Gap Quantified', value: 'DE-CIX 108.1M Mbps vs KIXP 2.9M Mbps' }
    ],
    status: 'Active / Core Roadmap Complete',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Much1r1/project_kijiji', external: true },
      { label: 'Interactive Mesh Topology', url: '#kijiji-graph', external: false }
    ],
    featured: true,
    region: 'project_labs'
  },
  {
    id: 'pr_review_bot',
    name: 'AI-Augmented PR Review Bot',
    slug: 'pr-review-bot',
    category: 'GenAI & Automation',
    oneLiner:
      'GenAI-powered code review and security scanner that runs as a GitHub Action, catching issues regex-based linters miss.',
    description:
      'Static analysis tools catch known regex patterns but miss semantic/security issues that need actual reasoning about code behavior. Built using Python, tree-sitter, and libCST for diff parsing, integrated into GitHub Actions with a cost-conscious LLM review layer powered by Groq (Llama 3.3 70B).',
    problem:
      'Traditional regex-based static analysis misses subtle semantic vulnerabilities, timing attacks, and behavioral logic flaws during PR code review.',
    approach:
      'Combined structural AST diff parsing (tree-sitter / libCST) with a zero-cost Groq Llama 3.3 70B inference pipeline, using tightly constrained system prompts to eliminate LLM hallucinations.',
    technologies: [
      'Python',
      'Groq (Llama 3.3 70B)',
      'GitHub Actions',
      'tree-sitter',
      'libCST',
      'REST API'
    ],
    keyContributions: [
      'Diagnosed and eliminated LLM false positives (flagging logging statements, hallucinating un-shown SSL flaws) by tightening prompt scope.',
      'Scoped diff analysis to exclude bot source files and prevent self-referential review noise.',
      'Built inline comment generation and summary PR markdown reports triggered directly on pull_request events.'
    ],
    results: [
      { label: 'Security Discovery', value: 'Caught timing-attack password flaw missed by regex' },
      { label: 'Inference Cost', value: '$0.00 (Groq Llama 3.3 70B)' },
      { label: 'Execution', value: 'Automated GitHub Action' }
    ],
    status: 'Active',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Much1r1/pr-review-bot', external: true }
    ],
    featured: true,
    region: 'neural_core'
  },
  {
    id: 'tgn_reproduction',
    name: 'TGN Reproduction (Temporal Graph Networks)',
    slug: 'tgn-reproduction',
    category: 'Infrastructure & AI',
    oneLiner:
      'Productionized reproduction of Temporal Graph Networks (Rossi et al. 2020) as a tested inference/training service to de-risk the Kijiji thesis architecture.',
    description:
      'Kijiji\'s temporal GraphSAGE/TGN-style architecture needed its academic ancestor reproduced rigorously, with proper unit tests, to validate the approach and eliminate seed-variance bugs found in early run logs.',
    problem:
      'Academic ML notebooks lack test suites, modular interfaces, and reproducible training pipelines required for production infrastructure deployment.',
    approach:
      'Built a tested, CLI-driven PyTorch pipeline (`tgn train --config configs/wikipedia.yaml`) enforcing golden test specs for timestamp correctness and memory module state isolation.',
    technologies: [
      'Python',
      'PyTorch',
      'pytest',
      'CLI (Config-driven)',
      'Temporal Link Prediction',
      'Wikipedia/Reddit Benchmarks'
    ],
    keyContributions: [
      'Enforced golden test spec: memory aggregation must correctly pick max-timestamp message under out-of-order input.',
      'Ensured memory updates on one node do not leak state into adjacent nodes.',
      'Evaluated async coding agent (Jules) output and hardened memory module isolation.'
    ],
    results: [
      { label: 'Test Coverage', value: 'Memory, Message-Passing & Temporal Embeddings' },
      { label: 'Correctness', value: 'Validated on Wikipedia & Reddit benchmarks' },
      { label: 'Architecture', value: 'De-risked Kijiji GNN thesis' }
    ],
    status: 'In Progress',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Much1r1/Temporal-Graph-Networks', external: true }
    ],
    featured: false,
    region: 'neural_core'
  },
  {
    id: 'incident_dashboard',
    name: 'AI-Powered Incident Response Dashboard',
    slug: 'incident-dashboard',
    category: 'Systems & QA',
    oneLiner:
      'Real-time incident dashboard for VettedAI\'s staging environment, built on Convex, presented directly to the CTO.',
    description:
      'Real-time incident response platform for VettedAI staging services. Uses React/Vite on Vercel with a ConvexHttpClient polling pattern feeding live scout_status data into dynamic health cards and MTTR analytics.',
    problem:
      'Lack of centralized real-time visibility into staging service incidents and MTTR trends across microservices.',
    approach:
      'Engineered a live Convex-backed dashboard with real-time incident rule management, team assignee CRUD, and automated service health tracking.',
    technologies: [
      'React',
      'Vite',
      'TypeScript',
      'Convex',
      'Tailwind CSS',
      'Vercel'
    ],
    keyContributions: [
      'Migrated dashboard from static mock data to live Convex backend data.',
      'Diagnosed and resolved a stale-vs-canonical backend deployment confusion (elated-marmot-893 vs. useful-gnat-782).',
      'Presented live system directly to CTO Tobi Lafinhan.'
    ],
    results: [
      { label: 'Stakeholder Visibility', value: 'Presented directly to CTO' },
      { label: 'Telemetry Source', value: 'Live Convex scout_status' },
      { label: 'Metrics Calculated', value: 'Real-time MTTR & Service Health' }
    ],
    status: 'Production / Live',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Much1r1/AI_powered_incidence_response_dashboard', external: true }
    ],
    featured: true,
    region: 'workstation'
  },
  {
    id: 'vetted_scout',
    name: 'Vetted Scout',
    slug: 'vetted-scout',
    category: 'GenAI & Automation',
    oneLiner:
      'Autonomous Playwright crawler continuously dogfooding VettedAI\'s staging environment across 8 user flows with LLM vision analysis.',
    description:
      'Continuous E2E test crawler covering 8 distinct user flows on VettedAI staging. Uses Playwright/TypeScript, Convex backend, Render deployment, and Gemini vision models for automated incident diagnosis.',
    problem:
      'Manual regression testing on staging is slow and fails to detect subtle UI regression bugs during fast-paced feature releases.',
    approach:
      'Architected an autonomous Playwright crawler running cron-scheduled E2E flows, combining Convex incident reporting with Gemini vision analysis on failure screenshots.',
    technologies: [
      'TypeScript',
      'Playwright',
      'Convex',
      'Gemini Vision',
      'Groq',
      'Render',
      'Node.js'
    ],
    keyContributions: [
      'Root-caused global state leak (crawler.steps array bleeding across flows) using scoped step tracking.',
      'Migrated vision analysis from deprecated Groq model to Gemini while keeping text summarization on Groq.',
      'Solved missing Submit button sandbox flow edge case using Promise.race().'
    ],
    results: [
      { label: 'Flow Coverage', value: '8 End-to-End User Flows' },
      { label: 'Analysis Engine', value: 'Gemini Vision Screenshot Analysis' },
      { label: 'Deployment', value: 'Render Crons + Convex Backend' }
    ],
    status: 'Production / Live',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Much1r1/Vetted_scout', external: true }
    ],
    featured: true,
    region: 'project_labs'
  },
  {
    id: 'vetted_automation',
    name: 'Vetted Automation & QA-Ops Orchestration',
    slug: 'vetted-automation',
    category: 'Systems & QA',
    oneLiner:
      'Automated QA-Ops orchestration workflow connecting Fizzy card status changes, GitHub webhooks, Discord alerts, and Playwright suites.',
    description:
      'Trigger-based test execution system that triggers targeted Playwright test suites upon board status changes, delivering instant Discord alerts and non-destructive read-only DB verification.',
    problem:
      'Disconnect between project management board card status updates and automated QA test verification.',
    approach:
      'Designed a Node.js webhook bridge connecting status events directly to Playwright triggers with read-only DB assertions.',
    technologies: [
      'TypeScript',
      'Playwright',
      'Node.js',
      'Webhooks (Fizzy / GitHub)',
      'Discord API',
      'PostgreSQL'
    ],
    keyContributions: [
      'Implemented read-only DB-level verification layer to validate data integrity across staging pipelines without state corruption.',
      'Built automated Discord notification channel for instant regression summaries.'
    ],
    results: [
      { label: 'Trigger Speed', value: 'Instant on card status movement' },
      { label: 'DB Assertion', value: 'Read-only non-destructive verification' }
    ],
    status: 'Production / Live',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Much1r1/Vetted_automation', external: true }
    ],
    featured: false,
    region: 'systems'
  }
];
