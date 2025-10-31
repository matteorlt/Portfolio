import prisma from '../_lib/db';
import { getSession } from '../_lib/session';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const session = await getSession(req);
    session.set('user', { id: user.id, email: user.email });
    await session.save();
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}


