/**
 * Test d’envoi EmailJS (même API que le site — sans passer par le navigateur).
 *
 * Prérequis : Node.js 18+ (fetch intégré).
 *
 * Si vous recevez une erreur 403 « non-browser » : EmailJS → Account → Security
 * → activer « Allow EmailJS API for non-browser applications » (nécessaire pour ce script).
 *
 * Mode strict (clé privée) : renseignez EMAILJS_PRIVATE_KEY dans .env (sans préfixe VITE_,
 * elle ne doit jamais être dans le bundle JavaScript). L’API attend le champ accessToken.
 *
 * Usage :
 *   cd client
 *   npm run test:email              → template contact
 *   npm run test:email:quote        → template devis / offres
 *
 * Variables lues dans client/.env, client/.env.local ou .env à la racine du dépôt.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(clientDir, '..');

/* Ordre : les derniers fichiers écrasent les précédents (.env.local en dernier). */
const ENV_FILES = [
  path.join(rootDir, '.env'),
  path.join(clientDir, '.env'),
  path.join(clientDir, '.env.local'),
];

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return null;
  const eq = trimmed.indexOf('=');
  if (eq <= 0) return null;
  const key = trimmed.slice(0, eq).trim();
  let val = trimmed.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  return { key, val };
}

function loadEnvFiles() {
  const merged = {};
  for (const filePath of ENV_FILES) {
    if (!fs.existsSync(filePath)) continue;
    const text = fs.readFileSync(filePath, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const parsed = parseEnvLine(line);
      if (parsed) merged[parsed.key] = parsed.val;
    }
  }
  return merged;
}

const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send';

async function sendEmailJs({ serviceId, templateId, userId, accessToken, templateParams }) {
  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: userId,
    template_params: templateParams,
  };
  if (accessToken) {
    payload.accessToken = accessToken;
  }

  const res = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let detail = text;
  try {
    detail = JSON.parse(text);
  } catch {
    /* texte brut type "OK" */
  }

  if (!res.ok) {
    const err = new Error(
      typeof detail === 'object' ? JSON.stringify(detail) : detail || res.statusText
    );
    err.status = res.status;
    throw err;
  }

  return detail;
}

function isoTimestamp() {
  return new Date().toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'long',
    timeStyle: 'short',
  });
}

const args = process.argv.slice(2);
const isQuote = args.includes('--quote');

const fileEnv = loadEnvFiles();
const e = (k) => process.env[k] ?? fileEnv[k] ?? '';

const serviceId = e('VITE_EMAILJS_SERVICE_ID').trim();
const publicKey = e('VITE_EMAILJS_PUBLIC_KEY').trim();
const privateKey = e('EMAILJS_PRIVATE_KEY').trim();
const templateContact = e('VITE_EMAILJS_TEMPLATE_CONTACT_ID').trim();
const templateDevis = e('VITE_EMAILJS_TEMPLATE_DEVIS_ID').trim();
const templateFallback = e('VITE_EMAILJS_TEMPLATE_ID').trim();

const templateId = isQuote
  ? templateDevis || templateFallback || templateContact
  : templateContact || templateFallback || templateDevis;

async function main() {
  if (!serviceId || !publicKey) {
    console.error(
      '❌ VITE_EMAILJS_SERVICE_ID et VITE_EMAILJS_PUBLIC_KEY sont requis (client/.env).'
    );
    process.exit(1);
  }
  if (!templateId) {
    console.error(
      '❌ Template manquant : pour le contact VITE_EMAILJS_TEMPLATE_CONTACT_ID ; pour le devis VITE_EMAILJS_TEMPLATE_DEVIS_ID ou VITE_EMAILJS_TEMPLATE_ID.'
    );
    process.exit(1);
  }

  const mode = isQuote ? 'devis (quote)' : 'contact';
  console.log(`📧 Test EmailJS — mode : ${mode}`);
  console.log(`   service_id  : ${serviceId}`);
  console.log(`   template_id : ${templateId}`);
  console.log(`   private key : ${privateKey ? '*** (EMAILJS_PRIVATE_KEY)' : '— (ajoutez-la si mode strict)'}\n`);

  const templateParams = isQuote
    ? {
        first_name: 'Test',
        last_name: 'Script',
        full_name: 'Test Script',
        from_name: 'Test Script',
        email: 'test@example.com',
        from_email: 'test@example.com',
        reply_to: 'test@example.com',
        phone: '06 00 00 00 00',
        company: '— test —',
        website: 'https://example.com',
        timeline: '1 mois',
        project_type: 'Vitrine',
        target_audience: 'B2B',
        competitors: '—',
        message: "Message généré par npm run test:email:quote — si vous recevez ceci, l'envoi fonctionne.",
        package_id: 'starter',
        package_title: 'Starter (test)',
        package_price: 'Sur devis personnalisé',
        package_period: 'Selon périmètre (à préciser)',
        package_features:
          'Besoin indiqué : Starter (test). Estimation et planification après échange sur le périmètre fonctionnel et la stack.',
        budget: 'Non communiqué sur le formulaire — devis sur mesure',
        timestamp: isoTimestamp(),
      }
    : {
        from_name: 'Test Script',
        from_email: 'test@example.com',
        reply_to: 'test@example.com',
        subject: 'Test EmailJS (npm run test:email)',
        message:
          "Ceci est un message de test envoyé depuis client/scripts/test-emailjs.mjs.\nSi vous recevez cet e-mail, la configuration EmailJS est correcte.",
        timestamp: isoTimestamp(),
      };

  try {
    const result = await sendEmailJs({
      serviceId,
      templateId,
      userId: publicKey,
      accessToken: privateKey || undefined,
      templateParams,
    });
    console.log('✅ Envoi accepté par EmailJS :', result ?? '(réponse vide)');
    console.log('   Vérifiez la boîte de réception configurée pour le service EmailJS.');
  } catch (err) {
    console.error('❌ Échec :', err.message || err);
    if (err.status) console.error('   HTTP', err.status);
    const msg = String(err.message || '');
    if (err.status === 403 && /non-browser/i.test(msg)) {
      console.error(
        '\n   → Activez « Allow EmailJS API for non-browser applications » dans :\n' +
          '     https://dashboard.emailjs.com/admin/account/security\n'
      );
    }
    if (/strict mode/i.test(msg) && /Private Key|private key/i.test(msg)) {
      console.error(
        '\n   → Mode strict EmailJS : ajoutez votre clé privée dans client/.env ou .env :\n' +
          '     EMAILJS_PRIVATE_KEY=...\n' +
          '     (Dashboard → Account → API keys → Private Key — ne jamais la mettre en VITE_.)\n'
      );
    }
    process.exit(1);
  }
}

main();
