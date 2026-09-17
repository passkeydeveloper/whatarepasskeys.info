export async function onRequest(context) {
  const request = new Request(context.request);
  request.headers.delete('cookie');
  return fetch('https://plausible.io/api/event', request);
}
