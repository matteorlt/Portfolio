import { getSession } from '../_lib/session';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getSession(req);
  session.destroy();
  return res.status(200).json({ ok: true });
}


