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
  links?: { label: string; url: string; external?: boolean }[];
}

export interface KnowledgeQA {
  question: string;
  answer: string;
  tags: string[];
}

export interface WorldNode {
  id: RegionId;
  title: string;
  code: string;
  shortDesc: string;
  position: SpatialCoordinates;
  color: string; // HEX or RGB string
  iconName: string;
  items: PortfolioItem[];
  knowledge: KnowledgeQA[];
  // Special interactive dataset for nodes like PROJECT LABS
  interactiveData?: {
    kijijiGraph?: KijijiNode[];
    terminalCommands?: Record<string, string>;
  };
}

export interface SystemStatus {
  activeNode: RegionId | null;
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
