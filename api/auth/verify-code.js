import prisma from '../_lib/db';
import { getSession } from '../_lib/session';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { code } = req.body || {};
    if (!code) return res.status(400).json({ message: 'missing code' });
    const record = await prisma.magicCode.findUnique({ where: { code } });
    if (!record) return res.status(400).json({ message: 'invalid code' });
    if (record.used) return res.status(400).json({ message: 'code used' });
    if (new Date() > record.expiresAt) return res.status(400).json({ message: 'code expired' });

    // Mark used and set session
    await prisma.magicCode.update({ where: { code }, data: { used: true } });
    const session = await getSession(req);
    session.set('user', { email: record.email });
    await session.save();
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}


