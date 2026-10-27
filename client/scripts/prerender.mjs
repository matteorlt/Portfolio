/**
 * Pré-rendu statique : après `vite build` (client) et `vite build --ssr` (serveur),
 * génère un fichier HTML complet par route, avec contenu et balises meta propres à la page.
 *
 *   /               → dist/index.html
 *   /legal-notices  → dist/legal-notices.html   (servi sans extension via cleanUrls sur Vercel)
 *   /privacy-policy → dist/privacy-policy.html
 *   404             → dist/404.html
 *   dist/spa.html   → coquille vide pour les routes rendues côté client (/demo/*)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.mjs');

const { render } = await import(pathToFileURL(ssrEntry).href);
const { ROUTE_META, SITE_URL, DEFAULT_IMAGE } = await import(
  pathToFileURL(path.join(root, 'src', 'seo', 'routes.js')).href
);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
await fs.writeFile(path.join(dist, 'spa.html'), template);

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Remplace (ou ajoute) une balise du <head> identifiée par un attribut. */
function setTag(html, tag, keyAttr, keyValue, valueAttr, value) {
  const re = new RegExp(`<${tag}[^>]*${keyAttr}="${keyValue}"[^>]*>`, 'i');
  const el = `<${tag} ${keyAttr}="${keyValue}" ${valueAttr}="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, el) : html.replace('</head>', `    ${el}\n  </head>`);
}

function applyMeta(html, meta, url) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  out = setTag(out, 'meta', 'name', 'description', 'content', meta.description);
  if (meta.keywords) out = setTag(out, 'meta', 'name', 'keywords', 'content', meta.keywords);
  out = setTag(out, 'meta', 'name', 'robots', 'content', meta.noindex ? 'noindex, follow' : 'index, follow');
  out = setTag(out, 'meta', 'property', 'og:title', 'content', meta.title);
  out = setTag(out, 'meta', 'property', 'og:description', 'content', meta.description);
  out = setTag(out, 'meta', 'property', 'og:url', 'content', url);
  out = setTag(out, 'meta', 'property', 'og:image', 'content', DEFAULT_IMAGE);
  out = setTag(out, 'meta', 'name', 'twitter:title', 'content', meta.title);
  out = setTag(out, 'meta', 'name', 'twitter:description', 'content', meta.description);
  // Pas d’URL canonique pour une page non indexable (404).
  out = meta.noindex
    ? out.replace(/\s*<link rel="canonical"[^>]*>/, '')
    : setTag(out, 'link', 'rel', 'canonical', 'href', url);
  return out;
}

const pages = [
  { route: '/', file: 'index.html' },
  { route: '/legal-notices', file: 'legal-notices.html' },
  { route: '/privacy-policy', file: 'privacy-policy.html' },
  { route: '/404', file: '404.html' }
];

for (const { route, file } of pages) {
  const { html, styles } = await render(route);
  const url = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  let page = applyMeta(template, ROUTE_META[route], url);
  page = page.replace('</head>', `${styles}\n  </head>`);
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  await fs.writeFile(path.join(dist, file), page);
  console.log(`  ✓ ${route.padEnd(16)} → dist/${file} (${Math.round(page.length / 1024)} Ko)`);
}

await fs.rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
