// Proxies the Plausible tracking script through our own domain so ad/tracker
// blockers that target plausible.io don't strip analytics. See:
// https://plausible.io/docs/proxy/guides/cloudflare
export async function onRequest(context) {
  const cache = caches.default;
  let response = await cache.match(context.request);
  if (!response) {
    response = await fetch('https://plausible.io/js/script.js');
    context.waitUntil(cache.put(context.request, response.clone()));
  }
  return response;
}
