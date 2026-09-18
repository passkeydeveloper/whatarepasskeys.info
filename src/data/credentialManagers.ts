import raw from './credentialManagers.json';

export type ScoreValue = 5 | 3 | 1;
export type Weight = 'core' | 'lower';
export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface Criterion {
  id: string;
  weight: Weight;
}

// Sentinel id for a caveat about the manager's overall grade/score, as
// opposed to one tied to a specific criterion. Must match the literal
// "general" caveat entries in credentialManagers.json.
export const GENERAL_CAVEAT_ID = 'general';

export interface ManagerScore {
  key: string;
  scores: Record<string, ScoreValue>;
  weightedScore: number;
  grade: Grade;
  // Optional footnotes. Each entry is either GENERAL_CAVEAT_ID (annotates
  // the overall grade badge) or a criterion id (annotates that score).
  // Text for each lives in i18n at cm.managers.<key>.caveats.<id>; presence
  // here just flags which entries exist and triggers the info badges plus
  // the caveats list below the table.
  caveats?: string[];
}

// The actual scoring values live in credentialManagers.json (plain numbers
// and letters, not localized) so they're easy to update without touching
// TypeScript. Order matches the published scoring rubric — the five "core"
// criteria carry more weight toward the final score than the two
// "lower"-weight criteria. Display labels are localized — see
// cm.scoring.criteria in src/i18n/en.json.
export const criteria: Criterion[] = raw.criteria as Criterion[];

// Pre-sorted by weightedScore descending — this order drives the on-page ranking.
// weightedScore/grade are the published values, not derived, since the scoring
// methodology combines core/lower weighting with editorial judgment.
export const managerScores: ManagerScore[] = raw.managerScores as ManagerScore[];
