import type { AchievementRecord } from '../../types/portfolio';

export const ACHIEVEMENTS_DATA: AchievementRecord[] = [
  {
    id: 'ach_01',
    category: 'hard_numbers',
    text: 'Built a GraphSAGE model (Project Kijiji) achieving 0.1434 test loss vs. 0.6931 random baseline — a 79% reduction — with a +0.0496 separation score on a fully reproducible run.',
    quantified: true,
    relatedEntityId: 'project_kijiji'
  },
  {
    id: 'ach_02',
    category: 'hard_numbers',
    text: 'Quantified the African internet peering capacity gap: DE-CIX Frankfurt (1,224 connected networks, 108.1M Mbps capacity) vs. KIXP Nairobi (154 networks, 2.9M Mbps) — an 8x network and 37x capacity gap.',
    quantified: true,
    relatedEntityId: 'project_kijiji'
  },
  {
    id: 'ach_03',
    category: 'hard_numbers',
    text: 'Detected and confirmed a live "trombone routing" event against real RIPE RIS BGP traffic — a Nairobi-to-Lusaka route detouring through Stockholm at a detour ratio of 8.37x.',
    quantified: true,
    relatedEntityId: 'project_kijiji'
  },
  {
    id: 'ach_04',
    category: 'hard_numbers',
    text: 'Fixed an unbounded log file that had grown past 547MB by implementing size-based rotation (50MB threshold, 5 backups retained).',
    quantified: true,
    relatedEntityId: 'project_kijiji'
  },
  {
    id: 'ach_05',
    category: 'framed_outcome',
    text: 'Designed and shipped Vetted Scout, an autonomous Playwright test crawler covering 8 distinct user flows, feeding structured incident data into a live Convex dashboard presented directly to the CTO.',
    quantified: false,
    relatedEntityId: 'vetted_scout'
  },
  {
    id: 'ach_06',
    category: 'ai_reliability',
    text: 'Root-caused a silent third-party model deprecation that was causing automated incident reports to fail undetected, migrating screenshot vision analysis to Gemini.',
    quantified: false,
    relatedEntityId: 'vetted_scout'
  },
  {
    id: 'ach_07',
    category: 'framed_outcome',
    text: 'Diagnosed a stale-vs-canonical backend deployment mix-up (elated-marmot-893 vs useful-gnat-782) that was silently serving wrong data through a CTO-facing dashboard.',
    quantified: false,
    relatedEntityId: 'incident_dashboard'
  },
  {
    id: 'ach_08',
    category: 'ai_reliability',
    text: 'Caught a timing-attack password comparison vulnerability in a code review using an LLM-based review layer that regex-based static analysis missed.',
    quantified: false,
    relatedEntityId: 'pr_review_bot'
  },
  {
    id: 'ach_09',
    category: 'integrity',
    text: 'Audited every claim in a graduate scholarship research proposal against actual run logs, explicitly retracting two previously-cited results after confirming they were unverifiable.',
    quantified: false,
    relatedEntityId: 'project_kijiji'
  },
  {
    id: 'ach_10',
    category: 'integrity',
    text: 'Enforced a golden test spec for a temporal graph network reproduction, catching an out-of-order timestamp handling correctness bug before propagation.',
    quantified: false,
    relatedEntityId: 'tgn_reproduction'
  }
];
