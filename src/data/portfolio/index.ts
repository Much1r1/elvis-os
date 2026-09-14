import type { WorldNode, WorldTopologyEdge, RegionEnvironmentConfig, RegionId, KnowledgeQA } from '../../types/portfolio';
import { IDENTITY_DATA } from './identity';
import { SKILLS_DATA } from './skills';
import { EXPERIENCE_DATA } from './experience';
import { PROJECTS_DATA } from './projects';
import { EDUCATION_DATA, CV_VARIANTS } from './education';
import { ACHIEVEMENTS_DATA } from './achievements';
import { CONTACT_LINKS } from './links';

export { IDENTITY_DATA } from './identity';
export { SKILLS_DATA } from './skills';
export { EXPERIENCE_DATA } from './experience';
export { PROJECTS_DATA } from './projects';
export { EDUCATION_DATA, CV_VARIANTS } from './education';
export { ACHIEVEMENTS_DATA } from './achievements';
export { CONTACT_LINKS } from './links';

export const REGION_ENVIRONMENTS: Record<RegionId, RegionEnvironmentConfig> = {
  identity: {
    geometryType: 'organic_core',
    particleDensity: 120,
    connectionDensity: 0.3,
    motionSpeed: 0.5,
    atmosphereFogDensity: 0.035,
    atmosphereColorHex: 0x031322,
    structuralScale: 1.2,
    accentColorHex: 0x00e5ff
  },
  systems: {
    geometryType: 'architectural_cube',
    particleDensity: 200,
    connectionDensity: 0.8,
    motionSpeed: 1.0,
    atmosphereFogDensity: 0.045,
    atmosphereColorHex: 0x020d20,
    structuralScale: 1.4,
    accentColorHex: 0x3b82f6
  },
  neural_core: {
    geometryType: 'neural_network',
    particleDensity: 320,
    connectionDensity: 1.5,
    motionSpeed: 1.6,
    atmosphereFogDensity: 0.05,
    atmosphereColorHex: 0x140520,
    structuralScale: 1.5,
    accentColorHex: 0xa855f7
  },
  project_labs: {
    geometryType: 'modular_labs',
    particleDensity: 240,
    connectionDensity: 1.0,
    motionSpeed: 1.2,
    atmosphereFogDensity: 0.04,
    atmosphereColorHex: 0x021f15,
    structuralScale: 1.3,
    accentColorHex: 0x10b981
  },
  workstation: {
    geometryType: 'operational_gear',
    particleDensity: 180,
    connectionDensity: 0.7,
    motionSpeed: 0.9,
    atmosphereFogDensity: 0.042,
    atmosphereColorHex: 0x1f1402,
    structuralScale: 1.35,
    accentColorHex: 0xf59e0b
  },
  archive: {
    geometryType: 'data_monolith',
    particleDensity: 160,
    connectionDensity: 0.5,
    motionSpeed: 0.6,
    atmosphereFogDensity: 0.045,
    atmosphereColorHex: 0x1d0515,
    structuralScale: 1.25,
    accentColorHex: 0xec4899
  },
  communication_hub: {
    geometryType: 'beacon_gateway',
    particleDensity: 220,
    connectionDensity: 1.2,
    motionSpeed: 1.4,
    atmosphereFogDensity: 0.038,
    atmosphereColorHex: 0x021b18,
    structuralScale: 1.4,
    accentColorHex: 0x14b8a6
  }
};

export const WORLD_TOPOLOGY_EDGES: WorldTopologyEdge[] = [
  { from: 'communication_hub', to: 'identity', pulseSpeed: 1.2 },
  { from: 'communication_hub', to: 'systems', pulseSpeed: 1.4 },
  { from: 'identity', to: 'systems', pulseSpeed: 1.0 },
  { from: 'identity', to: 'neural_core', pulseSpeed: 1.5 },
  { from: 'systems', to: 'neural_core', pulseSpeed: 1.3 },
  { from: 'neural_core', to: 'project_labs', pulseSpeed: 1.6 },
  { from: 'neural_core', to: 'workstation', pulseSpeed: 1.2 },
  { from: 'project_labs', to: 'workstation', pulseSpeed: 0.9 },
  { from: 'project_labs', to: 'archive', pulseSpeed: 1.1 },
  { from: 'workstation', to: 'archive', pulseSpeed: 1.0 },
];

export const KNOWLEDGE_BASE_QA: KnowledgeQA[] = [
  {
    question: 'Who is Elvis Muchiri?',
    answer: `${IDENTITY_DATA.name} (${IDENTITY_DATA.alias}) is a ${IDENTITY_DATA.title} based in ${IDENTITY_DATA.location}. ${IDENTITY_DATA.oneLiner}`,
    tags: ['bio', 'identity', 'overview']
  },
  {
    question: 'What is Elvis\'s engineering philosophy?',
    answer: IDENTITY_DATA.philosophy.join(' '),
    tags: ['philosophy', 'values', 'principles']
  },
  {
    question: 'What AI projects has Elvis built?',
    answer: 'Elvis built Project Kijiji (GNN for African BGP trombone routing), AI-Augmented PR Review Bot (Llama 3.3 70B via Groq), TGN Reproduction (Temporal Graph Networks), and Vetted Scout (LLM vision-based E2E QA crawler).',
    tags: ['ai', 'projects', 'llm', 'gnn']
  },
  {
    question: 'Tell me about Project Kijiji.',
    answer: 'Project Kijiji is Elvis\'s flagship AI research project: a Graph Neural Network system (PyTorch GraphSAGE with inverse-GDP loss weighting) paired with a Rust engine and Tinybird pipeline to detect and correct BGP trombone routing detours across African internet infrastructure.',
    tags: ['kijiji', 'flagship', 'gnn', 'bgp']
  },
  {
    question: 'What technologies does Elvis use?',
    answer: 'Core stack includes Python (PyTorch, FastAPI), TypeScript (React, Next.js, Node.js, Playwright, Convex), Rust, SQL (PostgreSQL/Supabase), Docker, and LLM APIs (Groq, Gemini, Claude, OpenAI).',
    tags: ['tech', 'stack', 'languages', 'frameworks']
  },
  {
    question: 'What professional experience does Elvis have?',
    answer: 'Elvis is currently a QA Engineer & AI Engineer at VettedAI building recruiter candidate evaluation tools, autonomous QA crawlers (Vetted Scout), and real-time incident dashboards. Previously, he was a Full-Stack Developer at Generous Circle.',
    tags: ['experience', 'vettedai', 'work', 'generous_circle']
  },
  {
    question: 'Show me his QA automation work.',
    answer: 'Elvis built Vetted Scout (an autonomous Playwright crawler with Gemini vision analysis covering 8 user flows) and Vetted Automation (webhook-driven E2E Playwright execution on Fizzy board status changes with read-only DB verification).',
    tags: ['qa', 'sdet', 'playwright', 'automation', 'testing']
  },
  {
    question: 'What makes Elvis different from a typical software engineer?',
    answer: `${IDENTITY_DATA.positioning} He combines production full-stack engineering with graph machine learning research, system debugging, and a strict claim-hygiene practice.`,
    tags: ['differentiator', 'skills', 'research']
  },
  {
    question: 'How can I download Elvis\'s CV?',
    answer: 'CVs across 5 specialized profiles (AI Engineering, Software Engineering, Full-Stack, QA/SDET, AI/ML) can be downloaded directly from the ARCHIVE node or via the top-right HUD / Command Palette shortcut.',
    tags: ['cv', 'resume', 'download']
  },
  {
    question: 'How do I contact Elvis?',
    answer: `Reach Elvis directly via email at ${IDENTITY_DATA.email}, on LinkedIn at ${IDENTITY_DATA.linkedin}, or inspect his open-source work on GitHub at ${IDENTITY_DATA.github}.`,
    tags: ['contact', 'email', 'linkedin', 'github']
  }
];

export const WORLD_NODES: WorldNode[] = [
  {
    id: 'identity',
    title: 'IDENTITY',
    code: 'SYS.ID.01',
    shortDesc: 'Engineering philosophy, career narrative, and digital identity core.',
    position: { x: -2.6, y: 1.2, z: 0 },
    color: '#00e5ff',
    iconName: 'User',
    landmarkType: 'organic_core',
    items: [
      {
        title: IDENTITY_DATA.name,
        subtitle: IDENTITY_DATA.title,
        description: IDENTITY_DATA.narrative,
        tags: IDENTITY_DATA.domainsOfInterest,
        metrics: [
          { label: 'Primary Focus', value: 'Systems & AI' },
          { label: 'Location', value: IDENTITY_DATA.location },
          { label: 'Status', value: 'Active Engineer & Researcher' }
        ]
      },
      {
        title: 'Engineering Positioning',
        description: IDENTITY_DATA.positioning,
        tags: ['Production Engineering', 'System Debugging', 'Claim Hygiene']
      },
      {
        title: 'Engineering Philosophy',
        description: IDENTITY_DATA.philosophy.map((p, i) => `${i + 1}. ${p}`).join('\n'),
        tags: ['Manifesto', 'Architecture', 'DX', 'Rigor']
      }
    ],
    knowledge: KNOWLEDGE_BASE_QA.filter(k => k.tags.includes('bio') || k.tags.includes('philosophy') || k.tags.includes('differentiator'))
  },
  {
    id: 'systems',
    title: 'SYSTEMS',
    code: 'SYS.ENG.02',
    shortDesc: 'Backend microservices, reactive frontends, DB architecture, and QA-Ops infrastructure.',
    position: { x: 2.6, y: 1.2, z: -0.5 },
    color: '#3b82f6',
    iconName: 'Cpu',
    landmarkType: 'architectural_cube',
    items: SKILLS_DATA.map(cat => ({
      title: cat.category,
      description: cat.skills.map(s => `• ${s.name}: ${s.context || ''}`).join('\n'),
      tags: cat.skills.map(s => s.name.split(' ')[0]),
      metrics: [
        { label: 'Category', value: cat.category },
        { label: 'Verified Capabilities', value: `${cat.skills.length} Technical Primitives` }
      ]
    })),
    knowledge: KNOWLEDGE_BASE_QA.filter(k => k.tags.includes('tech') || k.tags.includes('stack'))
  },
  {
    id: 'neural_core',
    title: 'NEURAL CORE',
    code: 'SYS.AI.03',
    shortDesc: 'Graph neural networks, LLM agent pipelines, prompt tightening, and ML evaluation baselines.',
    position: { x: 0, y: 0.2, z: 0.5 },
    color: '#a855f7',
    iconName: 'Brain',
    landmarkType: 'neural_network',
    items: [
      {
        title: 'Production AI vs Academic Research Distinction',
        description:
          'Clear separation between production systems (Vetted Scout, AI Incident Dashboard, PR Review Bot) and academic/research pipelines (Project Kijiji GNN, TGN Reproduction). Applied AI engineering strictly bounded by evaluation metrics and claim hygiene.',
        tags: ['Production AI', 'Research GNN', 'Prompt Tightening', 'Evaluation Baselines'],
        metrics: [
          { label: 'Production AI', value: 'Vetted Scout & PR Review Bot' },
          { label: 'Academic AI', value: 'Kijiji GNN & TGN Reproduction' }
        ]
      },
      ...PROJECTS_DATA.filter(p => p.region === 'neural_core' || p.category.includes('AI')).map(p => ({
        title: p.name,
        subtitle: p.category,
        description: `${p.oneLiner}\n\nPROBLEM: ${p.problem}\n\nAPPROACH: ${p.approach}`,
        tags: p.technologies,
        metrics: p.results,
        links: p.links
      }))
    ],
    knowledge: KNOWLEDGE_BASE_QA.filter(k => k.tags.includes('ai') || k.tags.includes('gnn') || k.tags.includes('llm'))
  },
  {
    id: 'project_labs',
    title: 'PROJECT LABS',
    code: 'SYS.LAB.04',
    shortDesc: 'Interactive software environments, Project Kijiji flagship mesh, and system demonstrations.',
    position: { x: -2.8, y: -1.8, z: 1.0 },
    color: '#10b981',
    iconName: 'Layers',
    landmarkType: 'modular_labs',
    items: PROJECTS_DATA.map(p => ({
      title: p.name,
      subtitle: `${p.category} • Status: ${p.status}`,
      description: `${p.oneLiner}\n\nPROBLEM: ${p.problem}\n\nAPPROACH: ${p.approach}\n\nKEY CONTRIBUTIONS:\n${p.keyContributions.map(c => `• ${c}`).join('\n')}`,
      tags: p.technologies,
      metrics: p.results,
      featured: p.featured,
      links: p.links
    })),
    knowledge: KNOWLEDGE_BASE_QA.filter(k => k.tags.includes('projects') || k.tags.includes('kijiji')),
    interactiveData: {
      kijijiGraph: [
        { id: 'gateway', label: 'BGP Telemetry Streamer', type: 'service', status: 'active', description: 'Live RIPE RIS BGP route collector and WebSocket feed', connections: ['rust_engine', 'tinybird_pipe'] },
        { id: 'rust_engine', label: 'Rust Trombone Engine', type: 'service', status: 'active', description: 'Async asyncio.Lock serialized Rust subprocess bridge detecting detour ratios > 1.5x', connections: ['gnn_model', 'event_log'] },
        { id: 'gnn_model', label: 'GraphSAGE Neural Core', type: 'ai_agent', status: 'syncing', description: 'PyTorch GraphSAGE model trained with inverse-GDP weighted loss (Test Loss 0.1434)', connections: ['peering_db'] },
        { id: 'tinybird_pipe', label: 'Tinybird Real-Time Pipe', type: 'queue', status: 'active', description: 'Live telemetry data workspace streaming FragilityRank and Trombone events', connections: ['d3_canvas'] },
        { id: 'peering_db', label: 'PeeringDB API Benchmark', type: 'database', status: 'active', description: 'Quantifies African IXP peering capacity gaps (DE-CIX 108.1M Mbps vs KIXP 2.9M Mbps)', connections: [] },
        { id: 'event_log', label: 'Log Rotator (50MB)', type: 'database', status: 'idle', description: 'Self-managed log rotation preventing bounded log overflows', connections: [] },
        { id: 'd3_canvas', label: 'D3 Force Topology Canvas', type: 'client', status: 'active', description: 'Interactive React/Vite D3 force-directed network topology visualizer', connections: [] }
      ]
    }
  },
  {
    id: 'workstation',
    title: 'WORKSTATION',
    code: 'SYS.EXP.05',
    shortDesc: 'Professional experience timeline, production achievements, and systems built.',
    position: { x: 2.8, y: -1.8, z: 0.8 },
    color: '#f59e0b',
    iconName: 'Briefcase',
    landmarkType: 'operational_gear',
    items: EXPERIENCE_DATA.map(exp => ({
      title: exp.company,
      role: exp.role,
      period: exp.period,
      subtitle: `${exp.product} (${exp.location})`,
      description: `${exp.scope}\n\nRESPONSIBILITIES:\n${exp.responsibilities.map(r => `• ${r}`).join('\n')}\n\nVERIFIED ACHIEVEMENTS:\n${exp.achievements.map(a => `• ${a}`).join('\n')}`,
      tags: exp.technologies,
      metrics: exp.publicSystems ? exp.publicSystems.map(sys => ({ label: 'Public System', value: sys })) : []
    })),
    knowledge: KNOWLEDGE_BASE_QA.filter(k => k.tags.includes('experience') || k.tags.includes('vettedai') || k.tags.includes('work'))
  },
  {
    id: 'archive',
    title: 'ARCHIVE',
    code: 'SYS.DOC.06',
    shortDesc: 'CV profiles, academic credentials, Strathmore degree, and graduate research tracking.',
    position: { x: 0, y: -2.8, z: -1.0 },
    color: '#ec4899',
    iconName: 'FileText',
    landmarkType: 'data_monolith',
    items: [
      {
        title: 'Curriculum Vitae Download Center',
        subtitle: '5 Specialized Professional Profiles',
        description:
          'Download tailored professional CV profiles in plain text / markdown format matching specific role requirements:',
        tags: CV_VARIANTS.map(v => v.title),
        links: CV_VARIANTS.map(v => ({
          label: `Download ${v.title} [PDF/TXT]`,
          url: `#download-cv-${v.id}`,
          external: false
        }))
      },
      {
        title: EDUCATION_DATA.degree,
        subtitle: `${EDUCATION_DATA.institution} (${EDUCATION_DATA.graduation})`,
        description: `${EDUCATION_DATA.status}\n\n${EDUCATION_DATA.details}\n\nGRADUATE AMBITIONS:\n• Program: ${EDUCATION_DATA.ambitions.program}\n• Target: ${EDUCATION_DATA.ambitions.target}\n• Status: ${EDUCATION_DATA.ambitions.status}`,
        tags: ['Strathmore University', 'BBIT', 'Computer Science', 'DAAD Scholarship']
      },
      {
        title: 'Quantified Achievement Bank Highlights',
        description: ACHIEVEMENTS_DATA.map(a => `• [${a.category.toUpperCase()}] ${a.text}`).join('\n\n'),
        tags: ['Quantified Outcomes', 'Verified Benchmarks', 'Integrity']
      }
    ],
    knowledge: KNOWLEDGE_BASE_QA.filter(k => k.tags.includes('cv') || k.tags.includes('resume'))
  },
  {
    id: 'communication_hub',
    title: 'COMMUNICATION HUB',
    code: 'SYS.COM.07',
    shortDesc: 'Verified contact channels, GitHub repositories, and network connections.',
    position: { x: 0, y: 3.2, z: -2.0 },
    color: '#14b8a6',
    iconName: 'Share2',
    landmarkType: 'beacon_gateway',
    items: [
      {
        title: 'Direct Verified Communication Pathways',
        description:
          'Open to high-impact software engineering, AI system architecture, and QA automation opportunities, as well as graduate research collaboration.',
        tags: CONTACT_LINKS.map(l => l.platform),
        metrics: [
          { label: 'Location', value: IDENTITY_DATA.location },
          { label: 'Timezone', value: 'EAT (UTC+3)' },
          { label: 'Response Time', value: '< 24 hours' }
        ],
        links: CONTACT_LINKS.map(l => ({
          label: `${l.platform}: ${l.value}`,
          url: l.url,
          external: true
        }))
      }
    ],
    knowledge: KNOWLEDGE_BASE_QA.filter(k => k.tags.includes('contact') || k.tags.includes('email') || k.tags.includes('social'))
  }
];
