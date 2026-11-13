import { defineConfig } from 'astro/config';
// PUBLIC_PREVIEW=1 : build « aperçu » en fichiers plats (guides/acompte-artisan.html…) pour relecture hors ligne ; sinon dossiers propres (/guides/acompte-artisan/).
const preview = process.env.PUBLIC_PREVIEW === '1';
export default defineConfig({
  site: 'https://travauxsanspiege.fr',
  output: 'static',
  build: { inlineStylesheets: 'always', format: preview ? 'file' : 'directory', assets: 'assets' },
  compressHTML: true,
});
