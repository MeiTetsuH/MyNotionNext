// Keep public articles discoverable without indexing templates or app endpoints.
const TEMPLATE_ID = '1a11766ba90a81089a14f61243f05d0a'

export function normalizeSearchPath(value = '') {
  let path = String(value).split(/[?#]/)[0]
  try {
    path = decodeURIComponent(path)
  } catch (_) {
    // Treat malformed escapes as non-indexable below.
  }
  return '/' + path.replace(/^\/+|\/+$/g, '')
}

export function isMalformedSearchPath(value) {
  const path = normalizeSearchPath(value)
  return /https?:\//i.test(path) || /\[(prefix|slug|\.\.\.suffix)\]/i.test(path)
}

export function shouldNoIndexPath(value) {
  const path = normalizeSearchPath(value)
  return isMalformedSearchPath(path) ||
    /^\/(links|search|rss|api|auth|sign-in|sign-up|dashboard|admin)(\/|$)/.test(path) ||
    /^\/article\/example-\d+(\/|$)/.test(path) ||
    path.replace(/-/g, '').split('/').includes(TEMPLATE_ID) ||
    /^\/(404|500)$/.test(path)
}
