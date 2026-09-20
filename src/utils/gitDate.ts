import { execFileSync } from 'node:child_process';

// The ISO 8601 commit date of the last commit that touched `path` (relative
// to the repo root), or null if that history isn't available — e.g. a
// shallow clone that never fetched this file's history, or no .git
// directory at all (some deploy environments only ship the working tree).
// Used to derive real "last updated" signals (visible dates + schema
// dateModified) from actual content changes instead of a hand-maintained
// string that quietly goes stale. Must never throw and fail the build.
export function lastGitCommitDate(path: string): string | null {
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', path], {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return output || null;
  } catch {
    return null;
  }
}
