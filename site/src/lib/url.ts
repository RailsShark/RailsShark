/**
 * Prefixes an internal path with the deploy base, so the same code works at the
 * domain root (Cloudflare) and under /RailsShark/ (GitHub Pages).
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path}`;
