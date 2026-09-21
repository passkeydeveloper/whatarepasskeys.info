// Converts an existing English, locale-invariant camelCase key (e.g. a data
// loop key like 'staysWithYou') into a kebab-case id fragment ('stays-with-you').
// Used to build stable heading `id`s from keys that are already stable
// identifiers in the code, rather than from translated visible text (which
// would produce different, drifting ids per locale and per copy edit).
export function camelToKebab(key: string): string {
  return key.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
}
