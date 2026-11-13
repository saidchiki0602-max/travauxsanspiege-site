// Aperçu (artefact) : réécrit les liens absolus (/guides/x/) en liens relatifs vers les fichiers plats (../guides/x.html).
import fs from 'node:fs'; import path from 'node:path';
const dir = process.argv[2] || 'dist-preview';
const walk = (b = '') => fs.readdirSync(path.join(dir, b), { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(b, e.name)) : e.name.endsWith('.html') ? [path.join(b, e.name)] : []);
for (const f of walk()) {
  const up = '../'.repeat(f.split('/').length - 1);
  let h = fs.readFileSync(path.join(dir, f), 'utf8');
  h = h.replace(/href="\/(?!\/)([^"#]*)(#[^"]*)?"/g, (_, p, hash = '') => {
    const clean = p.replace(/\/$/, '');
    if (/\.(svg|txt|xml|png|webmanifest|css|js)$/.test(clean)) return `href="${up}${clean}"`;
    return `href="${up}${clean ? clean + '.html' : 'index.html'}${hash}"`;
  });
  h = h.replace(/url\(\/_astro\//g, `url(${up}_astro/`).replace(/(src|href)="\/_astro\//g, `$1="${up}_astro/`);
  fs.writeFileSync(path.join(dir, f), h);
}
console.log('liens d\'aperçu réécrits');
