import type { ExperienceRecord } from '../../types/portfolio';

export const EXPERIENCE_DATA: ExperienceRecord[] = [
  {
    id: 'vetted_ai',
    company: 'VettedAI',
    role: 'QA Engineer & AI Engineer',
    period: 'January 2026 – Present',
    location: 'Remote (EAT / UTC+3)',
    product: 'Recruiter-facing audition/hiring platform & candidate-facing app ("Congrats")',
    scope:
      'Dual-hat role spanning QA engineering (verification, test automation, sign-off authority) and AI engineering (building AI-powered internal tools) across VettedAI\'s four core repos.',
    responsibilities: [
      'Own end-to-end QA verification across recruiter and candidate product surfaces, running structured sign-off on every ticket (PASS/FAIL with documented reasoning).',
      'Built an evidence-first QA methodology: batched git grep / SQL verification commands, raw output captured, and translated into structured sign-off tables.',
      'Designed and shipped Vetted Scout, an autonomous Playwright crawler continuously dogfooding staging across 8 user flows and reporting structured incidents into Convex.',
      'Designed and shipped an AI-powered Incident Response Dashboard presented directly to the CTO, tracking MTTR and real-time service health from live Convex data.',
      'Escalated recurring process-level failure modes (unapplied migrations, stale QA docs) to engineering leads rather than patching symptoms repeatedly.',
      'Managed environment hygiene across three separate Supabase instances (prod, staging, Congrats prod) to prevent environment cross-contamination.'
    ],
    achievements: [
      'Designed and shipped an autonomous test crawler covering 8 distinct user flows, feeding structured incident data into a dashboard presented directly to the CTO.',
      'Root-caused a silent third-party model deprecation that was causing every automated incident report to fail undetected, migrating vision analysis to Gemini.',
      'Diagnosed a stale-vs-canonical backend deployment mix-up that was silently serving wrong data through a CTO-facing dashboard.',
      'Root-caused and fixed a global state leak array bleeding across crawler flows using a scoped step pattern.',
      'Implemented a read-only DB-level verification layer to validate data integrity across staging pipelines without state corruption.'
    ],
    technologies: [
      'TypeScript',
      'Playwright',
      'React',
      'Convex',
      'Supabase',
      'Groq (Llama 3.3)',
      'Gemini Vision',
      'Node.js',
      'GitHub Actions',
      'Render'
    ],
    publicSystems: [
      'Vetted Scout (Autonomous QA Crawler)',
      'AI Incident Response Dashboard',
      'QA-Ops Webhook Integration & Discord Alerts'
    ]
  },
  {
    id: 'generous_circle',
    company: 'Generous Circle',
    role: 'Full-Stack Developer',
    period: 'January 2025 – April 2025',
    location: 'Remote',
    product: 'Fundraising web application & crowdfunding platform',
    scope:
      'Full-stack engineering across frontend user experience, backend service integration, and API management for a multi-repo fundraising platform.',
    responsibilities: [
      'Developed and maintained core features across frontend UI applications and backend microservices within a multi-repo ecosystem.',
      'Designed, built, and deployed responsive user-facing components for donor onboarding, campaign creation, and transaction management.',
      'Integrated RESTful APIs, payment service providers, and database schemas to ensure transactional data consistency across high-volume donation flows.',
      'Partnered with team leads and product management to translate fundraising workflow requirements into production-ready full-stack implementations.'
    ],
    achievements: [
      'Streamlined campaign management and donor conversion by shipping high-reliability frontend components and optimized API endpoints across a multi-repo codebase.',
      'Enhanced platform stability by diagnosing and resolving cross-repo integration bottlenecks and API state synchronization issues.'
    ],
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'REST APIs',
      'Payment Gateways',
      'SQL / PostgreSQL',
      'Tailwind CSS'
    ],
    publicSystems: [
      'Donor Onboarding & Campaign Workflows',
      'Payment Integration & Transaction Ledger API'
    ]
  }
];
