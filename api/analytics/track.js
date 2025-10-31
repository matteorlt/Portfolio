import prisma from '../_lib/db';
import crypto from 'crypto';

function hashIp(ip) {
  if (!ip) return null;
  const salt = process.env.IP_SALT || 'default_salt';
  return crypto.createHash('sha256').update(ip + salt).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { type, page, label, metadata, ts } = req.body || {};
    if (!type) return res.status(400).json({ message: 'Missing type' });
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress;
    const ua = req.headers['user-agent'] || null;
    await prisma.event.create({
      data: {
        type,
        page,
        label,
        metadata,
        ts: BigInt(ts || Date.now()),
        ipHash: hashIp(ip),
        ua
      }
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}


