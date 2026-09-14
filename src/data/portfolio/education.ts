import type { EducationRecord, CVVariant } from '../../types/portfolio';

export const EDUCATION_DATA: EducationRecord = {
  degree: 'Bachelor of Business Information Technology (BBIT)',
  institution: 'Strathmore University',
  graduation: 'August 2026',
  status: 'Coursework Completed / Degree In Progress',
  details:
    'Focused on software engineering, algorithms, database systems, distributed architectures, and AI systems. Undergraduate thesis centered on Graph Neural Networks for BGP routing optimization in African internet infrastructure (Project Kijiji).',
  ambitions: {
    program: 'M.Sc. / Graduate Research in AI Engineering & Distributed Systems',
    target: 'Germany (DAAD Scholarship Program)',
    status: 'Application In Progress — Targeting AI Research Labs in Europe'
  },
  referees: [
    {
      name: 'Tobi Lafinhan',
      role: 'CTO, VettedAI',
      relationship: 'Direct Line Manager / Work Supervisor',
      contact: 'tobi@ventureforafrica.com'
    },
    {
      name: 'Lemuel Abishua',
      role: 'Co-founder, VettedAI',
      relationship: 'Secondary Work Supervisor',
      contact: 'lemuel@africaproductpeers.org'
    },
    {
      name: 'Academic Project Supervisor',
      role: 'Lecturer / Project Advisor, Strathmore University',
      relationship: 'Primary Academic Advisor (Project Kijiji Advisor)'
    }
  ]
};

export const CV_VARIANTS: CVVariant[] = [
  {
    id: 'ai_engineer',
    title: 'AI Engineering Profile',
    code: 'CV.AI.01',
    description: 'Highlights GNN architectures, LLM prompt engineering, RAG pipelines, PyTorch, Groq, and Gemini integration.',
    tags: ['PyTorch', 'GNN', 'LLM Agents', 'Groq', 'RAG'],
    filename: 'Elvis_Muchiri_AI_Engineer_CV.txt'
  },
  {
    id: 'software_engineer',
    title: 'Software Engineering Profile',
    code: 'CV.SWE.02',
    description: 'Emphasizes full-stack microservices, TypeScript, Node.js, FastAPI, Convex, Docker, and distributed systems.',
    tags: ['TypeScript', 'Node.js', 'FastAPI', 'Convex', 'Docker'],
    filename: 'Elvis_Muchiri_Software_Engineer_CV.txt'
  },
  {
    id: 'full_stack',
    title: 'Full-Stack Developer Profile',
    code: 'CV.FS.03',
    description: 'Focuses on React, Vite, Tailwind CSS, REST/GraphQL APIs, Supabase, and responsive user web applications.',
    tags: ['React', 'Next.js', 'Vite', 'Tailwind', 'Supabase'],
    filename: 'Elvis_Muchiri_FullStack_CV.txt'
  },
  {
    id: 'qa_sdet',
    title: 'QA / SDET Profile',
    code: 'CV.QA.04',
    description: 'Focuses on Playwright automation, E2E crawlers, CI/CD pipelines, read-only DB verification, and AI-driven vision testing.',
    tags: ['Playwright', 'E2E Testing', 'CI/CD', 'QA-Ops', 'Vision QA'],
    filename: 'Elvis_Muchiri_QA_SDET_CV.txt'
  },
  {
    id: 'ai_ml',
    title: 'AI / ML Research Profile',
    code: 'CV.ML.05',
    description: 'Tailored for graduate research and ML labs: BGP trombone detection, GraphSAGE, temporal walk-forward CV, and SEAL baselines.',
    tags: ['GraphSAGE', 'Temporal GNN', 'Walk-Forward CV', 'PyTorch'],
    filename: 'Elvis_Muchiri_AIML_CV.txt'
  }
];
