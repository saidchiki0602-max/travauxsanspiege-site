# Travaux Sans Piège — site travauxsanspiege.fr

Même gabarit « usine à sites » que kaertgroupe.com : **gabarit + données + agents**.

## Où sont les choses
- `src/data/pages/*.json` — balises Google (`title`, `description`) et FAQ de chaque page. **On modifie ici, pas dans les `.astro`.**
- `src/pages/guides/*.md` — les guides, un fichier par requête visée. L'agent Contenu écrit un `.md`, un humain relit avant publication.
- `src/data/guides.json` — la liste des guides (titre, accroche) affichée sur l'accueil, le sommaire et en pied de page.
- `src/data/seo.json` — l'étude de pertinence : pour chaque page, la requête visée, les variantes, l'intention et le pourquoi.
- `public/llms.txt`, `public/sitemap.xml`, `public/robots.txt` — ce que lisent les robots et les IA. **Ajouter chaque nouveau guide dans les deux premiers.**
- `scripts/audit.mjs` — l'agent d'audit SEO/GEO, lancé à chaque déploiement ; bloque la mise en ligne sur erreur et génère la page cachée `/audit/`.
- `scripts/indexnow.mjs` — prévient Bing (qui alimente ChatGPT et Copilot) après chaque déploiement.

## Commandes
- `npm run preview` — aperçu en fichiers plats, liens relatifs, pour relecture.
- `npm run check` — build de production + audit, comme GitHub Actions.

## Mise en ligne (une fois)
1. Dépôt GitHub `travauxsanspiege-site`, pousser ce dossier sur `main`.
2. Settings › Pages › Source : GitHub Actions. Domaine personnalisé : `travauxsanspiege.fr`, cocher « Enforce HTTPS ».
3. Chez Namecheap (DNS du domaine) : 4 enregistrements A vers 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, et un CNAME `www` vers `saidchiki0602-max.github.io`.
4. Search Console : ajouter la propriété, choisir « balise HTML », mettre le code dans le secret GitHub `PUBLIC_GSC_TOKEN`, republier, valider, puis soumettre `sitemap.xml`.
5. Bing Webmaster Tools : « Importer depuis Google Search Console ».

## Règles du gabarit
1. Chaque page répond à la question principale dans ses deux premières lignes.
2. Chaque page a une FAQ balisée (3 à 6 questions formulées comme on les tape).
3. Titres ≤ 60 caractères, descriptions ≤ 155, un seul h1, canonical, sitemap et llms.txt complets.
4. Les agents produisent, mesurent et proposent ; un humain publie et dépense.
5. Chaque guide cite ses sources officielles : champ `sources` de l'en-tête (liste `[libellé, adresse]`), affiché en fin de guide et repris dans les données structurées (`citation`). Uniquement des sites publics (Service-Public, Légifrance, DGCCRF, impots.gouv.fr, Assemblée nationale, Caisse des Dépôts), chaque adresse ouverte et lue avant d'être citée. Le champ `published` garde la date de première publication ; `updated` porte la date de dernière vérification.
