export async function onRequest(context) {
  const cache = caches.default;
  let response = await cache.match(context.request);
  if (!response) {
    response = await fetch('https://plausible.io/js/script.js');
    context.waitUntil(cache.put(context.request, response.clone()));
  }
  return response;
}
