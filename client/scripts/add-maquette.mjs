/**
 * Ajoute une maquette partageable : copie un export (dossier ou .zip) dans public/maquettes/<slug>/
 * pour qu’elle soit servie à l’adresse https://matteo-rlt.fr/maquettes/<slug>/.
 *
 *   npm run maquette -- <dossier-ou-zip> <slug> ["Titre affiché"]
 *   ex. : npm run maquette -- ~/Downloads/Accueil-html.zip an-menuiseries "A&N Menuiseries"
 *
 * - la page principale (*.html, en priorité *.dc.html) devient index.html ;
 * - une balise <base> rend les chemins relatifs (./assets, ./vendor) valides avec ou sans « / » final ;
 * - la page est marquée noindex et reçoit un petit badge « Maquette » refermable ;
 * - la liste des maquettes est tenue à jour dans maquettes.json (hors de public/ : jamais publiée).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const maquettesDir = path.join(root, 'public', 'maquettes');

const [source, rawSlug, title] = process.argv.slice(2);
if (!source || !rawSlug) {
  console.error('Usage : npm run maquette -- <dossier-ou-zip> <slug> ["Titre affiché"]');
  process.exit(1);
}

// Slug sûr pour une URL : minuscules, chiffres et tirets (« A&N Menuiseries » → « an-menuiseries »).
const slug = rawSlug
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/&/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
if (!slug) {
  console.error('Slug invalide.');
  process.exit(1);
}

let srcDir = path.resolve(source);
if (!fs.existsSync(srcDir)) {
  console.error(`Introuvable : ${srcDir}`);
  process.exit(1);
}
if (srcDir.toLowerCase().endsWith('.zip')) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'maquette-'));
  // Windows : Expand-Archive (le tar de Git Bash lit « C: » comme un hôte distant). Ailleurs : unzip.
  const res =
    process.platform === 'win32'
      ? spawnSync('powershell', ['-NoProfile', '-Command', 'Expand-Archive -LiteralPath $env:MQ_SRC -DestinationPath $env:MQ_DST -Force'], {
          stdio: 'inherit',
          env: { ...process.env, MQ_SRC: srcDir, MQ_DST: tmp }
        })
      : spawnSync('unzip', ['-q', srcDir, '-d', tmp], { stdio: 'inherit' });
  if (res.status !== 0) {
    console.error('Impossible d’extraire le zip.');
    process.exit(1);
  }
  srcDir = tmp;
}

// Si l’archive contient un unique dossier, on descend dedans.
const entries = fs.readdirSync(srcDir);
if (entries.length === 1 && fs.statSync(path.join(srcDir, entries[0])).isDirectory()) {
  srcDir = path.join(srcDir, entries[0]);
}

const htmlFiles = fs.readdirSync(srcDir).filter((f) => /\.html?$/i.test(f));
const main = htmlFiles.find((f) => /\.dc\.html?$/i.test(f)) || htmlFiles.find((f) => /^index\.html?$/i.test(f)) || htmlFiles[0];
if (!main) {
  console.error('Aucune page HTML trouvée dans la maquette.');
  process.exit(1);
}

const dest = path.join(maquettesDir, slug);
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(srcDir, dest, {
  recursive: true,
  filter: (p) => !/(^|[\\/])(README\.md|\.DS_Store|__MACOSX)$/i.test(p)
});

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
let html = fs.readFileSync(path.join(dest, main), 'utf8');
const pageTitle = title || (html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? slug).trim();

const head = `
<base href="/maquettes/${slug}/">
<meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1">`;

// Badge discret : indique que c’est une maquette et renvoie vers le site ; refermable.
const badge = `
<div id="mrlt-badge" style="position:fixed;left:16px;bottom:16px;z-index:2147483647;display:flex;align-items:center;gap:10px;padding:8px 8px 8px 14px;border-radius:999px;background:#0f0f0d;color:#f3f1ec;font:500 13px/1.2 system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 12px 30px -12px rgba(0,0,0,.5)">
  <span style="width:8px;height:8px;border-radius:50%;background:#d4ff3f"></span>
  <span>Maquette ${esc(pageTitle)} — <a href="https://matteo-rlt.fr/" target="_blank" rel="noopener" style="color:#d4ff3f;text-decoration:none">matteo-rlt.fr</a></span>
  <button type="button" aria-label="Masquer" onclick="this.parentNode.remove()" style="all:unset;cursor:pointer;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:rgba(243,241,236,.12)">×</button>
</div>`;

html = html.replace(/<head([^>]*)>/i, (m) => `${m}${head}`);
html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${badge}\n</body>`) : `${html}${badge}`;

fs.writeFileSync(path.join(dest, 'index.html'), html);
if (main.toLowerCase() !== 'index.html') fs.rmSync(path.join(dest, main));

// Registre des maquettes, gardé hors de public/ pour ne pas exposer la liste des clients.
const registryPath = path.join(root, 'maquettes.json');
const registry = fs.existsSync(registryPath) ? JSON.parse(fs.readFileSync(registryPath, 'utf8')) : [];
const entry = { slug, title: pageTitle, url: `https://matteo-rlt.fr/maquettes/${slug}/`, updated: new Date().toISOString().slice(0, 10) };
const next = [...registry.filter((m) => m.slug !== slug), entry].sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(registryPath, `${JSON.stringify(next, null, 2)}\n`);

console.log(`✓ Maquette « ${pageTitle} » → public/maquettes/${slug}/`);
console.log(`  Lien à partager : ${entry.url}`);
