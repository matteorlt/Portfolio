// Initialisation DB: crée un admin et des réglages par défaut
// Usage (PowerShell):
//   $env:DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
//   $env:ADMIN_EMAIL="admin@domaine.fr"
//   $env:ADMIN_PASSWORD="MotDePasseFortIci"
//   node scripts/init-db.js

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const { DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!DATABASE_URL) throw new Error('DATABASE_URL manquant');
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('ADMIN_EMAIL ou ADMIN_PASSWORD manquant');

  const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, 12);

  // Utilisateur admin (upsert)
  const user = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { password: passwordHash },
    create: { email: ADMIN_EMAIL, password: passwordHash }
  });

  // Réglages par défaut (offres)
  const defaultOffers = { starter: '700', professional: '1500', premium: '2600' };
  await prisma.setting.upsert({
    where: { key: 'offers' },
    update: { value: defaultOffers },
    create: { key: 'offers', value: defaultOffers }
  });

  console.log('✅ Admin et réglages initialisés:', user.email);
}

main()
  .catch((e) => {
    console.error('Erreur init DB:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

