import type { SkillCategoryGroup } from '../../types/portfolio';

export const SKILLS_DATA: SkillCategoryGroup[] = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', context: 'Advanced: PyTorch, FastAPI, data pipelines, ML/GNN workflows, automation' },
      { name: 'TypeScript / JavaScript', context: 'Advanced: React, Node.js, Playwright automation, Convex schemas' },
      { name: 'SQL', context: 'Intermediate: DB-level QA verification, query optimization, PostgreSQL / Supabase' },
      { name: 'Rust', context: 'Basic to Intermediate: Python↔Rust interop, async locks, Cargo toolchain' }
    ]
  },
  {
    category: 'AI / ML & LLM Engineering',
    skills: [
      { name: 'Graph Neural Networks', context: 'GraphSAGE, temporal GNNs / TGN-style architectures, walk-forward CV' },
      { name: 'ML Evaluation & Baselines', context: 'SEAL baseline comparison, temporal walk-forward cross-validation' },
      { name: 'LLM Infrastructure', context: 'Groq (Llama 3.3 70B), Gemini, OpenAI API, Claude API' },
      { name: 'Prompt Engineering & Reliability', context: 'System prompt tightening, context window management, few-shot structuring' },
      { name: 'AI Workflows & Agents', context: 'Jules async task delegation, Cursor AI workflows, vision-assisted QA' }
    ]
  },
  {
    category: 'Backend & Infrastructure',
    skills: [
      { name: 'FastAPI & Node.js', context: 'REST APIs, microservice design, async endpoints' },
      { name: 'Convex & Supabase', context: 'BaaS schema design, crons, real-time data synchronization' },
      { name: 'Real-Time Data Pipelines', context: 'Tinybird CLI/workspaces, live BGP telemetry streaming' },
      { name: 'DevOps & CI/CD', context: 'Docker, GitHub Actions, Render, Vercel, uvicorn server patterns' }
    ]
  },
  {
    category: 'Frontend & Data Visualization',
    skills: [
      { name: 'React & Vite', context: 'Reactive component design, strict state management' },
      { name: 'Tailwind CSS', context: 'Responsive layout systems, modern design systems' },
      { name: 'D3.js & Canvas', context: 'Force-directed canvas rendering for complex network topologies' }
    ]
  },
  {
    category: 'QA Engineering & Automation',
    skills: [
      { name: 'Playwright (TypeScript)', context: 'Autonomous crawlers, webhook-triggered E2E test suites' },
      { name: 'pytest', context: 'Unit testing algorithmic logic, memory modules, message-passing steps' },
      { name: 'QA-Ops & Verification', context: 'Read-only DB-level verification, golden test specs, audit trails' },
      { name: 'Vision / AI QA', context: 'Transitioning from brittle CSS selectors to Gemini vision element analysis' }
    ]
  },
  {
    category: 'Networking & Telemetry',
    skills: [
      { name: 'BGP Routing Analysis', context: 'RIPE RIS live telemetry streaming, African BGP trombone detection' },
      { name: 'PeeringDB API Integration', context: 'Peering capacity benchmarks (e.g. DE-CIX vs KIXP)' }
    ]
  }
];
