import type { WorldNode } from '../types/portfolio';

export const WORLD_NODES: WorldNode[] = [
  {
    id: 'identity',
    title: 'IDENTITY',
    code: 'SYS.ID.01',
    shortDesc: 'Engineering philosophy, background, and digital identity core.',
    position: { x: 0, y: 1.2, z: 0 },
    color: '#00e5ff', // Ice Cyan
    iconName: 'User',
    items: [
      {
        title: 'Elvis Muchiri',
        subtitle: 'Software Engineer & AI Systems Architect',
        description:
          'Specializing in distributed systems, autonomous agent workflows, and reactive full-stack web applications. Believes technology is an immersive computational environment, not just static web pages.',
        tags: ['Distributed Systems', 'AI Infrastructure', 'Full-Stack Engineering', 'System Architecture'],
        metrics: [
          { label: 'Engineering Focus', value: 'Systems & AI' },
          { label: 'Philosophy', value: 'Deterministic Core, Adaptive Perimeter' },
          { label: 'Primary Language', value: 'TypeScript / Python / Rust' }
        ]
      },
      {
        title: 'Engineering Manifesto',
        description:
          '1. Build tools that feel like extensions of thought.\n2. Design resilient systems with clear boundaries and minimal friction.\n3. Integrate AI deeply into user workflows rather than attaching it as a gimmick.\n4. Optimize for clarity, performance, and long-term maintainability.',
        tags: ['Manifesto', 'Architecture', 'DX']
      }
    ],
    knowledge: [
      {
        question: 'Who is Elvis Muchiri?',
        answer: 'Elvis Muchiri is a Software and AI Engineer focused on distributed systems, modern web platforms, and intelligent agent architectures.',
        tags: ['bio', 'identity', 'overview']
      },
      {
        question: 'What is Elvis\'s engineering philosophy?',
        answer: 'He builds high-performance, resilient software systems where technology acts as an environment for problem-solving.',
        tags: ['philosophy', 'values']
      }
    ]
  },
  {
    id: 'systems',
    title: 'SYSTEMS',
    code: 'SYS.ENG.02',
    shortDesc: 'Backend architecture, reactive frontends, and cloud infrastructure.',
    position: { x: -3.2, y: 0.5, z: -1.5 },
    color: '#3b82f6', // Electric Blue
    iconName: 'Cpu',
    items: [
      {
        title: 'Core Stack & Frameworks',
        description: 'Engineered for high-concurrency, low-latency, and type-safe systems across the stack.',
        tags: ['TypeScript', 'React / Next.js', 'Node.js / Express', 'Python / FastApi', 'PostgreSQL', 'Redis', 'Docker'],
        metrics: [
          { label: 'Type Safety', value: '100% Strict TS' },
          { label: 'Async Throughput', value: 'High' },
          { label: 'Cloud Native', value: 'Docker & Microservices' }
        ]
      },
      {
        title: 'Architectural Patterns',
        description: 'Event-driven queues, micro-frontends, REST/gRPC API gateways, and real-time WebSocket pipelines.',
        tags: ['Event-Driven', 'Microservices', 'WebSockets', 'GraphQL', 'CI/CD Pipelines'],
        codeSnippet: `// Sample Event Gateway Pipe
export class SystemEventPipe<T> {
  private listeners: Map<string, Array<(payload: T) => void>> = new Map();

  dispatch(event: string, payload: T): void {
    this.listeners.get(event)?.forEach(fn => fn(payload));
  }
}`
      }
    ],
    knowledge: [
      {
        question: 'What languages does Elvis use for backend engineering?',
        answer: 'Elvis uses TypeScript (Node.js/Bun), Python (FastAPI/PyTorch), and Rust/Go for high-performance microservices.',
        tags: ['backend', 'languages', 'tech']
      },
      {
        question: 'How does Elvis structure frontend applications?',
        answer: 'Using modern React/Next.js with strict TypeScript, modular state primitives, and spatial canvas interfaces when appropriate.',
        tags: ['frontend', 'react', 'architecture']
      }
    ]
  },
  {
    id: 'neural_core',
    title: 'NEURAL CORE',
    code: 'SYS.AI.03',
    shortDesc: 'LLM agents, vector embeddings, fine-tuning, and ML pipelines.',
    position: { x: 3.2, y: 0.8, z: -1.2 },
    color: '#a855f7', // Deep Purple
    iconName: 'Brain',
    items: [
      {
        title: 'Autonomous AI Agents & RAG Architecture',
        description: 'Architecting dynamic context retrieval systems using vector databases (Pinecone, Qdrant, PGVector) combined with function-calling agentic frameworks.',
        tags: ['LangChain / LlamaIndex', 'Vector Databases', 'OpenAI API', 'Claude Tool Use', 'RAG Pipelines'],
        metrics: [
          { label: 'Context Retrieval', value: 'Hybrid Dense + Sparse' },
          { label: 'Agent Routing', value: 'Dynamic Intent Graph' }
        ]
      },
      {
        title: 'Machine Learning Experiments',
        description: 'Fine-tuning open weights models (Llama-3, Qwen) for domain-specific code execution and structured JSON outputs.',
        tags: ['PyTorch', 'HuggingFace', 'Model Quantization', 'LoRA / QLoRA'],
        codeSnippet: `async function executeAgentTask(prompt: string, tools: Tool[]) {
  const agent = new AutonomousAgent({ model: 'gpt-4o', tools });
  const plan = await agent.reason(prompt);
  return await agent.execute(plan);
}`
      }
    ],
    knowledge: [
      {
        question: 'What AI/ML work has Elvis done?',
        answer: 'Elvis works on LLM function-calling agents, retrieval-augmented generation (RAG) pipelines, and local LLM fine-tuning.',
        tags: ['ai', 'ml', 'agents', 'llm']
      }
    ]
  },
  {
    id: 'project_labs',
    title: 'PROJECT LABS',
    code: 'SYS.LAB.04',
    shortDesc: 'Interactive software environments and system demonstrations.',
    position: { x: -2.2, y: -2.0, z: 1.0 },
    color: '#10b981', // Emerald Green
    iconName: 'Layers',
    items: [
      {
        title: 'Project Kijiji',
        subtitle: 'Interactive Microservice Mesh & Network Graph',
        description:
          'A distributed community commerce ecosystem featuring resilient transaction pipelines, automated AI routing, and real-time inventory synchronization across decentralized nodes.',
        tags: ['Microservices', 'Network Graph', 'Real-time Sync', 'Distributed DB', 'AI Routing'],
        metrics: [
          { label: 'Node Count', value: '8 Core Microservices' },
          { label: 'Sync Latency', value: '< 20ms' },
          { label: 'Fault Tolerance', value: 'Circuit Breaker Enabled' }
        ],
        links: [
          { label: 'Interactive Mesh Demo', url: '#kijiji-graph', external: false }
        ]
      },
      {
        title: 'elvis-os',
        subtitle: 'Interactive Computational Portfolio Environment',
        description: 'Spatial 3D canvas portfolio built with Vite, React, TypeScript, and Three.js designed as an explorable digital world.',
        tags: ['React', 'Three.js', 'TypeScript', 'WebAudio API', 'Tailwind CSS']
      }
    ],
    knowledge: [
      {
        question: 'What is Project Kijiji?',
        answer: 'Project Kijiji is a distributed community commerce system represented as an interactive network graph connecting AI agents, databases, and microservices.',
        tags: ['kijiji', 'projects', 'mesh']
      }
    ],
    interactiveData: {
      kijijiGraph: [
        { id: 'gateway', label: 'API Gateway', type: 'service', status: 'active', description: 'Inbound TLS proxy and router', connections: ['auth_service', 'commerce_engine', 'ai_router'] },
        { id: 'auth_service', label: 'Auth & Identity Node', type: 'service', status: 'active', description: 'JWT & OAuth2 token validation', connections: ['user_db'] },
        { id: 'commerce_engine', label: 'Commerce Engine', type: 'service', status: 'active', description: 'Processes ledger transactions and orders', connections: ['trans_db', 'event_queue'] },
        { id: 'ai_router', label: 'Neural AI Recommender', type: 'ai_agent', status: 'syncing', description: 'Real-time embedding vector search for buyers', connections: ['vector_store'] },
        { id: 'event_queue', label: 'Redis Message Mesh', type: 'queue', status: 'active', description: 'Pub/Sub message broker for async jobs', connections: ['notification_agent'] },
        { id: 'notification_agent', label: 'Dispatch Agent', type: 'ai_agent', status: 'active', description: 'Autonomous agent managing vendor alerts', connections: [] },
        { id: 'user_db', label: 'User Store', type: 'database', status: 'idle', description: 'Encrypted relational storage', connections: [] },
        { id: 'vector_store', label: 'Qdrant Vector DB', type: 'database', status: 'active', description: 'Contains 50,000 product embeddings', connections: [] }
      ]
    }
  },
  {
    id: 'workstation',
    title: 'WORKSTATION',
    code: 'SYS.EXP.05',
    shortDesc: 'Professional experience, production achievements, and systems built.',
    position: { x: 2.2, y: -1.8, z: 0.8 },
    color: '#f59e0b', // Amber / Gold
    iconName: 'Briefcase',
    items: [
      {
        title: 'Vetted',
        role: 'Software Engineer',
        period: 'Professional Experience',
        description:
          'Engineered critical infrastructure and web applications at Vetted, delivering high-reliability systems and optimizing user product workflows.',
        tags: ['Full-Stack Engineering', 'System Architecture', 'Product Development', 'API Design'],
        metrics: [
          { label: 'Role Focus', value: 'Core Engineering' },
          { label: 'Environment', value: 'Production Scale' }
        ]
      },
      {
        title: 'System Delivery Highlights',
        description: 'Built production features, scalable database pipelines, automated monitoring, and responsive user interfaces.',
        tags: ['Scalable Architecture', 'Reliability', 'Performance Optimization']
      }
    ],
    knowledge: [
      {
        question: 'Where has Elvis worked?',
        answer: 'Elvis worked at Vetted as a Software Engineer building production web applications and core system infrastructure.',
        tags: ['work', 'vetted', 'experience']
      }
    ]
  },
  {
    id: 'archive',
    title: 'ARCHIVE',
    code: 'SYS.DOC.06',
    shortDesc: 'CV, credentials, education, and career documentation.',
    position: { x: 0, y: -2.8, z: -1.0 },
    color: '#ec4899', // Pink Accent
    iconName: 'FileText',
    items: [
      {
        title: 'Curriculum Vitae',
        subtitle: 'Official Career Documentation',
        description: 'Comprehensive overview of professional history, key accomplishments, technical proficiency, and education.',
        tags: ['PDF Available', 'Full History', 'Verified'],
        links: [
          { label: 'Download Elvis Muchiri CV [PDF]', url: '#download-cv', external: false }
        ]
      },
      {
        title: 'Education & Credentials',
        subtitle: 'Academic Foundations',
        description: 'Degree and coursework in Computer Science, Software Engineering, and AI Systems Architecture.',
        tags: ['Computer Science', 'Algorithms', 'Distributed Systems']
      }
    ],
    knowledge: [
      {
        question: 'How can I download Elvis\'s CV?',
        answer: 'You can download Elvis\'s CV directly from the ARCHIVE node or via the top-right Quick Access bar.',
        tags: ['cv', 'resume', 'download']
      }
    ]
  },
  {
    id: 'communication_hub',
    title: 'COMMUNICATION HUB',
    code: 'SYS.COM.07',
    shortDesc: 'Direct channels, GitHub repositories, and network connections.',
    position: { x: 0, y: 3.0, z: -2.0 },
    color: '#14b8a6', // Teal
    iconName: 'Share2',
    items: [
      {
        title: 'Direct Communication Pathways',
        description: 'Open to high-impact software engineering roles, AI system architecture opportunities, and technical collaboration.',
        tags: ['Email', 'LinkedIn', 'GitHub', 'X / Twitter'],
        links: [
          { label: 'GitHub Profile', url: 'https://github.com', external: true },
          { label: 'LinkedIn Network', url: 'https://linkedin.com', external: true },
          { label: 'Direct Email', url: 'mailto:contact@elvismuchiri.com', external: true }
        ]
      }
    ],
    knowledge: [
      {
        question: 'How do I contact Elvis?',
        answer: 'Connect with Elvis via email at contact@elvismuchiri.com or explore his open-source work on GitHub.',
        tags: ['contact', 'email', 'social']
      }
    ]
  }
];
