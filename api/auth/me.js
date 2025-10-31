import { getSession } from '../_lib/session';

export default async function handler(req, res) {
  const session = await getSession(req);
  const user = session.get('user');
  if (!user) return res.status(401).json({ authenticated: false });
  return res.status(200).json({ authenticated: true, user });
}


