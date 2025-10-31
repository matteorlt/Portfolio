import prisma from '../_lib/db';
import { getSession } from '../_lib/session';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getSession(req);
  const user = session.get('user');
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { updates } = req.body || {};
  if (!updates || typeof updates !== 'object') return res.status(400).json({ message: 'Invalid payload' });

  const ops = Object.entries(updates).map(([key, value]) =>
    prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    })
  );
  await Promise.all(ops);
  return res.status(200).json({ ok: true });
}


