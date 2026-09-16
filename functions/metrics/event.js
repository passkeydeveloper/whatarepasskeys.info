// Proxies Plausible event submissions through our own domain. Cloudflare
// forwards the visitor's real IP to the upstream fetch automatically.
// See: https://plausible.io/docs/proxy/guides/cloudflare
export async function onRequest(context) {
  const request = new Request(context.request);
  request.headers.delete('cookie');
  return fetch('https://plausible.io/api/event', request);
}
