export type RegionId =
  | 'identity'
  | 'systems'
  | 'neural_core'
  | 'project_labs'
  | 'workstation'
  | 'archive'
  | 'communication_hub';

export interface SpatialCoordinates {
  x: number;
  y: number;
  z: number;
}

export interface KijijiNode {
  id: string;
  label: string;
  type: 'service' | 'database' | 'ai_agent' | 'client' | 'queue';
  status: 'active' | 'syncing' | 'idle';
  description: string;
  connections: string[];
}

export interface PortfolioItem {
  title: string;
  subtitle?: string;
  period?: string;
  role?: string;
  description: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  codeSnippet?: string;
  problem?: string;
  approach?: string;
  keyContributions?: string[];
  featured?: boolean;
  links?: { label: string; url: string; external?: boolean }[];
}

export interface KnowledgeQA {
  question: string;
  answer: string;
  tags: string[];
}

export type RegionLandmarkType =
  | 'organic_core'
  | 'architectural_cube'
  | 'neural_network'
  | 'modular_labs'
  | 'operational_gear'
  | 'data_monolith'
  | 'beacon_gateway';

export interface WorldTopologyEdge {
  from: RegionId;
  to: RegionId;
  pulseSpeed?: number;
}

export interface WorldNode {
  id: RegionId;
  title: string;
  code: string;
  shortDesc: string;
  position: SpatialCoordinates;
  color: string; // HEX string
  iconName: string;
  landmarkType: RegionLandmarkType;
  items: PortfolioItem[];
  knowledge: KnowledgeQA[];
  // Special interactive dataset for nodes like PROJECT LABS
  interactiveData?: {
    kijijiGraph?: KijijiNode[];
    terminalCommands?: Record<string, string>;
  };
}

export type TravelPhase = 'idle' | 'traveling' | 'entered';

export interface RegionEnvironmentConfig {
  geometryType: string;
  particleDensity: number;
  connectionDensity: number;
  motionSpeed: number;
  atmosphereFogDensity: number;
  atmosphereColorHex: number;
  structuralScale: number;
  accentColorHex: number;
}

export interface SystemStatus {
  activeNode: RegionId | null;
  travelPhase: TravelPhase;
  bootSequenceComplete: boolean;
  audioMuted: boolean;
  commandPaletteOpen: boolean;
  terminalOpen: boolean;
  systemMetrics: {
    fps: number;
    memoryAllocated: string;
    activeThreads: number;
    uptime: string;
  };
}

// Extended Structured Knowledge Layer Interfaces for Phase 3
export interface IdentityProfile {
  name: string;
  alias: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  title: string;
  oneLiner: string;
  narrative: string;
  positioning: string;
  philosophy: string[];
  domainsOfInterest: string[];
}

export interface SkillCategoryGroup {
  category: string;
  skills: {
    name: string;
    context?: string;
  }[];
}

export interface ProjectRecord {
  id: string;
  name: string;
  slug: string;
  category: string;
  oneLiner: string;
  description: string;
  problem: string;
  approach: string;
  technologies: string[];
  keyContributions: string[];
  results: { label: string; value: string }[];
  status: string;
  links: { label: string; url: string; external?: boolean }[];
  featured: boolean;
  region: RegionId;
}

export interface ExperienceRecord {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  team?: string;
  product?: string;
  scope: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  publicSystems?: string[];
}

export interface EducationRecord {
  degree: string;
  institution: string;
  graduation: string;
  status: string;
  details: string;
  ambitions: {
    program: string;
    target: string;
    status: string;
  };
  referees: {
    name: string;
    role: string;
    relationship: string;
    contact?: string;
  }[];
}

export interface AchievementRecord {
  id: string;
  category: 'hard_numbers' | 'framed_outcome' | 'integrity' | 'ai_reliability';
  text: string;
  quantified: boolean;
  relatedEntityId?: string;
}

export interface CVVariant {
  id: string;
  title: string;
  code: string;
  description: string;
  tags: string[];
  filename: string;
}

export interface ContactLink {
  platform: string;
  label: string;
  url: string;
  value: string;
  iconName: string;
}
