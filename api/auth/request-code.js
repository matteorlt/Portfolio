import prisma from '../_lib/db';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

function generateCode() {
  return crypto.randomBytes(24).toString('base64url');
}

async function sendEmail(to, code) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL } = process.env;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: false,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
  });
  const link = `https://matteo-rlt.fr/admin?code=${encodeURIComponent(code)}`;
  await transporter.sendMail({
    from: FROM_EMAIL || SMTP_USER,
    to,
    subject: 'Code d\'accès Admin',
    text: `Voici votre code d'accès: ${code}\nOu cliquez: ${link}\nValable 15 minutes.`
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { token } = req.body || {};
    if (!token) return res.status(400).json({ message: 'missing token' });

    const tsSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!tsSecret) return res.status(500).json({ message: 'turnstile not configured' });

    const verifyResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: tsSecret, response: token })
    });
    const verifyJson = await verifyResp.json().catch(() => ({}));
    if (!verifyJson.success) return res.status(400).json({ message: 'captcha failed' });

    const email = 'contact@matteo-rlt.fr';
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.magicCode.create({ data: { email, code, expiresAt } });
    await sendEmail(email, code);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}


