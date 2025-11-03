// Script de test de connexion à la base de données
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('🔍 Test de connexion à la base de données...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Définie' : '❌ Manquante');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL n\'est pas définie dans .env');
    process.exit(1);
  }
  
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    console.log('✅ Connexion réussie !');
    
    // Tester une requête simple
    const count = await prisma.magicCode.count();
    console.log(`✅ Base de données accessible. Nombre de codes: ${count}`);
    
    await prisma.$disconnect();
    console.log('✅ Déconnexion réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testConnection();

