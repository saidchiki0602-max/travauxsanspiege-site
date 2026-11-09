// En aperçu (artefact), les liens sont relatifs et en .html ; en production, absolus.
// `from` = Astro.url.pathname de la page qui fait le lien (pour remonter depuis /guides/…).
const PREVIEW = import.meta.env.PUBLIC_PREVIEW === '1';
export const L = (p: string, from = '/'): string => {
  if (!PREVIEW) return p;
  const depth = Math.max(0, (from.replace(/\.html$/, '').replace(/\/$/, '').match(/\//g) || []).length - 1);
  const up = '../'.repeat(depth);
  if (p === '/' || p.startsWith('/#')) return up + 'index.html' + (p.includes('#') ? p.slice(1) : '');
  const [path, hash] = p.split('#');
  const clean = path.replace(/^\//, '').replace(/\/$/, '');
  return up + (clean ? clean + '.html' : 'index.html') + (hash ? '#' + hash : '');
};
