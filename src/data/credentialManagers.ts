export type ScoreValue = 5 | 3 | 1;
export type Weight = 'core' | 'lower';
export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface Criterion {
  id: string;
  weight: Weight;
}

// Order matches the published scoring rubric. The five "core" criteria carry
// more weight toward the final score than the two "lower"-weight criteria.
// Display labels are localized — see cm.scoring.criteria in src/i18n/en.json.
export const criteria: Criterion[] = [
  { id: 'ecosystemAvailability', weight: 'core' },
  { id: 'nativePlatformIntegration', weight: 'core' },
  { id: 'e2eeVaultSecurity', weight: 'core' },
  { id: 'credentialExchange', weight: 'core' },
  { id: 'specCompliance', weight: 'core' },
  { id: 'digitalInheritance', weight: 'lower' },
  { id: 'familySharing', weight: 'lower' },
];

export interface ManagerScore {
  key: string;
  scores: Record<string, ScoreValue>;
  weightedScore: number;
  grade: Grade;
}

// Pre-sorted by weightedScore descending — this order drives the on-page ranking.
// weightedScore/grade are the published values, not derived, since the scoring
// methodology combines core/lower weighting with editorial judgment.
export const managerScores: ManagerScore[] = [
  {
    key: 'bitwarden',
    scores: { ecosystemAvailability: 5, nativePlatformIntegration: 3, e2eeVaultSecurity: 5, credentialExchange: 5, specCompliance: 3, digitalInheritance: 5, familySharing: 5 },
    weightedScore: 86,
    grade: 'A',
  },
  {
    key: '1password',
    scores: { ecosystemAvailability: 5, nativePlatformIntegration: 5, e2eeVaultSecurity: 3, credentialExchange: 5, specCompliance: 3, digitalInheritance: 3, familySharing: 5 },
    weightedScore: 84,
    grade: 'B',
  },
  {
    key: 'nordpass',
    scores: { ecosystemAvailability: 5, nativePlatformIntegration: 3, e2eeVaultSecurity: 5, credentialExchange: 1, specCompliance: 3, digitalInheritance: 3, familySharing: 5 },
    weightedScore: 69,
    grade: 'C',
  },
  {
    key: 'dashlane',
    scores: { ecosystemAvailability: 3, nativePlatformIntegration: 3, e2eeVaultSecurity: 3, credentialExchange: 5, specCompliance: 3, digitalInheritance: 3, familySharing: 1 },
    weightedScore: 65,
    grade: 'C',
  },
  {
    key: 'keeper',
    scores: { ecosystemAvailability: 5, nativePlatformIntegration: 3, e2eeVaultSecurity: 3, credentialExchange: 3, specCompliance: 1, digitalInheritance: 5, familySharing: 5 },
    weightedScore: 64,
    grade: 'C',
  },
  {
    key: 'apple',
    scores: { ecosystemAvailability: 1, nativePlatformIntegration: 3, e2eeVaultSecurity: 3, credentialExchange: 5, specCompliance: 3, digitalInheritance: 1, familySharing: 5 },
    weightedScore: 60,
    grade: 'C',
  },
  {
    key: 'protonpass',
    scores: { ecosystemAvailability: 5, nativePlatformIntegration: 3, e2eeVaultSecurity: 3, credentialExchange: 1, specCompliance: 1, digitalInheritance: 5, familySharing: 5 },
    weightedScore: 57,
    grade: 'C',
  },
  {
    key: 'google',
    scores: { ecosystemAvailability: 1, nativePlatformIntegration: 3, e2eeVaultSecurity: 3, credentialExchange: 5, specCompliance: 3, digitalInheritance: 1, familySharing: 1 },
    weightedScore: 56,
    grade: 'C',
  },
  {
    key: 'lastpass',
    scores: { ecosystemAvailability: 3, nativePlatformIntegration: 3, e2eeVaultSecurity: 3, credentialExchange: 1, specCompliance: 1, digitalInheritance: 1, familySharing: 1 },
    weightedScore: 42,
    grade: 'D',
  },
  {
    key: 'microsoft',
    scores: { ecosystemAvailability: 1, nativePlatformIntegration: 3, e2eeVaultSecurity: 1, credentialExchange: 1, specCompliance: 1, digitalInheritance: 1, familySharing: 1 },
    weightedScore: 27,
    grade: 'F',
  },
];
