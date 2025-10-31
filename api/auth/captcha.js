import crypto from 'crypto';

export default async function handler(req, res) {
  const secret = process.env.CAPTCHA_SECRET;
  if (!secret) return res.status(500).json({ message: 'captcha not configured' });
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const payload = `${a}|${b}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return res.status(200).json({ a, b, signature });
}


