// Typographie française : espaces insécables (fine) avant ; : ! ? » et après «, entre chiffre et unité,
// et dans les milliers. Ne touche que le texte visible (hors script/style/pre/code/textarea et attributs).
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dir = process.argv[2] || 'dist';
const NB = ' ';
const fix = t => t
  .replace(/[  ]+([;:!?»])/g, NB + '$1')
  .replace(/«[  ]+/g, '«' + NB)
  .replace(/(\d)[  ]+(\d{3})(?!\d)/g, '$1' + NB + '$2')
  .replace(/(\d)[  ]+(\d{3})(?!\d)/g, '$1' + NB + '$2')
  .replace(/(\d)[  ]+(%|€|m²|m³|ans?\b|mois\b|jours?\b|h\b)/g, '$1' + NB + '$2');
function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) {
      const src = readFileSync(p, 'utf8');
      let out = '', i = 0, skip = null;
      const re = /<\/?([a-zA-Z0-9]+)[^>]*>|<!--[\s\S]*?-->/g; let m;
      while ((m = re.exec(src))) {
        const text = src.slice(i, m.index);
        out += skip ? text : fix(text);
        out += m[0];
        const tag = (m[1] || '').toLowerCase();
        if (['script', 'style', 'pre', 'code', 'textarea'].includes(tag)) skip = m[0][1] === '/' ? null : tag;
        i = re.lastIndex;
      }
      out += fix(src.slice(i));
      if (out !== src) writeFileSync(p, out);
    }
  }
}
walk(dir);
console.log('typo-fr ok :', dir);
