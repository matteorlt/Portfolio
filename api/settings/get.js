import prisma from '../_lib/db';

export default async function handler(req, res) {
  const keys = (req.query.keys || '').split(',').filter(Boolean);
  if (!keys.length) {
    const all = await prisma.setting.findMany();
    return res.status(200).json(Object.fromEntries(all.map(s => [s.key, s.value])));
  }
  const found = await prisma.setting.findMany({ where: { key: { in: keys } } });
  return res.status(200).json(Object.fromEntries(found.map(s => [s.key, s.value])));
}


