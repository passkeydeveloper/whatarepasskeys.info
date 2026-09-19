// Notifies IndexNow (a shared protocol consumed by Bing and Yandex) that
// this site's pages exist/changed, so they can be crawled faster than
// waiting for a routine re-crawl. Runs as a "postbuild" step, so it fires
// automatically on every Cloudflare Pages build. Only submits for the
// production deploy (CF_PAGES_BRANCH === 'main') — see isProductionDeploy
// in src/layouts/Layout.astro for the same pattern used for analytics.
//
// The key here must match the key file's name/content in public/. It's
// not a secret — IndexNow keys only prove domain ownership, comparable to
// a Search Console verification token.
const INDEXNOW_KEY = '52e6f151d45203110950345b90ec3be8';
const SITE = 'https://whatarepasskeys.info';

async function main() {
  if (process.env.CF_PAGES_BRANCH !== 'main') {
    console.log('[indexnow] skipping: not the production branch');
    return;
  }

  let sitemapXml;
  try {
    sitemapXml = await import('node:fs/promises').then((fs) => fs.readFile('dist/sitemap-0.xml', 'utf8'));
  } catch {
    console.warn('[indexnow] skipping: dist/sitemap-0.xml not found');
    return;
  }

  const urlList = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    console.warn('[indexnow] skipping: no URLs found in sitemap');
    return;
  }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(SITE).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    // IndexNow returns 200 or 202 on success; don't fail the build either way.
    console.log(`[indexnow] submitted ${urlList.length} URL(s), status ${res.status}`);
  } catch (err) {
    console.warn('[indexnow] submission failed (non-fatal):', err.message);
  }
}

main();
