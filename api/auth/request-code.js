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

// Rate limiting simple : limite à 3 demandes par heure par IP
const rateLimit = new Map(); // IP -> { count: number, resetAt: Date }

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         'unknown';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    // Rate limiting simple
    const clientIP = getClientIP(req);
    const now = new Date();
    const limit = rateLimit.get(clientIP);
    
    if (limit) {
      if (now < limit.resetAt) {
        if (limit.count >= 3) {
          return res.status(429).json({ 
            message: 'Trop de demandes. Veuillez réessayer dans quelques minutes.' 
          });
        }
        limit.count++;
      } else {
        // Reset après 1 heure
        rateLimit.set(clientIP, { count: 1, resetAt: new Date(now.getTime() + 60 * 60 * 1000) });
      }
    } else {
      rateLimit.set(clientIP, { count: 1, resetAt: new Date(now.getTime() + 60 * 60 * 1000) });
    }

    // Nettoyer les anciennes entrées (garbage collection simple)
    if (Math.random() < 0.1) { // 10% de chance de nettoyer
      for (const [ip, data] of rateLimit.entries()) {
        if (now >= data.resetAt) {
          rateLimit.delete(ip);
        }
      }
    }

    const email = 'contact@matteo-rlt.fr';
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await prisma.magicCode.create({ data: { email, code, expiresAt } });
    await sendEmail(email, code);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Erreur request-code:', e);
    return res.status(500).json({ message: 'Server error' });
  }
}


