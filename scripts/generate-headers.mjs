// Computes CSP hash-source values for every inline <script> Astro emits in
// the production build, and injects them into dist/_headers.
//
// Astro inlines several <script> blocks directly into the HTML in
// production (they're separate module files in dev), and their exact
// content can change with any edit to a component's script — so the hash
// allowlist is generated fresh on every build rather than hand-maintained
// in public/_headers, which only holds the static, placeholder-bearing
// parts of the policy.
import { readFile, writeFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const SCRIPT_TAG = /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;

async function main() {
  const hashes = new Set();

  for await (const file of glob('dist/**/*.html')) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(SCRIPT_TAG)) {
      const content = match[1];
      if (!content.trim()) continue; // e.g. <script src="..."></script> already excluded, but be defensive
      const hash = createHash('sha256').update(content, 'utf8').digest('base64');
      hashes.add(`'sha256-${hash}'`);
    }
  }

  if (hashes.size === 0) {
    console.warn('[headers] no inline scripts found — is dist/ built?');
    return;
  }

  const headersPath = 'dist/_headers';
  const headers = await readFile(headersPath, 'utf8');
  const withHashes = headers.replace('__INLINE_SCRIPT_HASHES__', [...hashes].sort().join(' '));
  if (withHashes === headers) {
    console.warn('[headers] __INLINE_SCRIPT_HASHES__ placeholder not found in dist/_headers');
    return;
  }
  await writeFile(headersPath, withHashes);
  console.log(`[headers] injected ${hashes.size} inline script hash(es) into ${headersPath}`);
}

main();
