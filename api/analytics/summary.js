import prisma from '../_lib/db';
import { getSession } from '../_lib/session';

export default async function handler(req, res) {
  // Auth admin requise
  const session = await getSession(req);
  const user = session.get('user');
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const since = parseInt(req.query.since || '0', 10);
    const where = since ? { ts: { gt: BigInt(since) } } : {};

    const [totalEvents, pageViews, buttonClicks, latest] = await Promise.all([
      prisma.event.count({ where }),
      prisma.event.count({ where: { ...where, type: 'page_view' } }),
      prisma.event.count({ where: { ...where, type: 'button_click' } }),
      prisma.event.findMany({ where, orderBy: { ts: 'desc' }, take: 20 })
    ]);

    const topPagesAgg = await prisma.$queryRawUnsafe(
      `SELECT page, COUNT(*)::int as c FROM "Event" WHERE ${since ? `ts > ${since}` : '1=1'} AND type = 'page_view' GROUP BY page ORDER BY c DESC LIMIT 10`
    );

    return res.status(200).json({
      totalEvents,
      pageViews,
      buttonClicks,
      topPages: topPagesAgg,
      latest
    });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}


