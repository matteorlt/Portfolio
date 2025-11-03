const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const {
  buildQuoteNotificationEmail,
  buildQuoteConfirmationEmail,
  buildContactNotificationEmail,
} = require('./templates/emailTemplates');


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.SMTP_PORT || 465), // 465 SSL, 587 STARTTLS
  secure: (process.env.SMTP_SECURE || 'true') === 'true', // true pour 465
  auth: {
    user: process.env.EMAIL_USER || 'contact@matteo-rlt.fr',
    pass: process.env.EMAIL_PASS // DOIT être un mot de passe d'application
  }
});

// Test de la configuration email au démarrage
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Erreur configuration email:', error.message);
    console.log('💡 Vérifiez vos identifiants dans le fichier .env');
  } else {
    console.log('✅ Configuration email validée');
  }
});

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes API
app.get('/api/health', (req, res) => {
  res.json({ message: 'Portfolio API is running!' });
});

// Routes API d'authentification - Implémentation directe pour Express
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

// Initialiser Prisma
let db;
try {
  db = new PrismaClient();
  console.log('✅ Prisma Client initialisé');
} catch (error) {
  console.error('❌ Erreur initialisation Prisma:', error);
  db = null;
}

// Tester la connexion à la base de données au démarrage
if (db) {
  db.$connect()
    .then(() => console.log('✅ Connexion à la base de données réussie'))
    .catch((err) => {
      console.error('❌ Erreur de connexion à la base de données:', err.message);
      console.error('💡 Vérifiez votre DATABASE_URL dans .env');
    });
}

// Session simple en mémoire (pour développement local)
const sessions = new Map(); // cookieId -> user data

// Fonction getSession simplifiée pour Express
function getSession(req, res) {
  const cookieId = req.cookies && req.cookies.sessionId ? req.cookies.sessionId : (req.headers['x-session-id'] || null);
  
  return {
    get: (key) => {
      if (!cookieId || !sessions.has(cookieId)) return null;
      const sessionData = sessions.get(cookieId);
      return sessionData && sessionData[key] ? sessionData[key] : null;
    },
    set: (key, value) => {
      if (!cookieId) {
        const newId = crypto.randomBytes(16).toString('hex');
        sessions.set(newId, { [key]: value });
        res.cookie('sessionId', newId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
        });
      } else {
        const sessionData = sessions.get(cookieId) || {};
        sessionData[key] = value;
        sessions.set(cookieId, sessionData);
      }
    },
    user: null, // Pour compatibilité
    save: async () => {
      // Session déjà sauvegardée dans set()
    },
    destroy: async () => {
      const currentCookieId = req.cookies && req.cookies.sessionId ? req.cookies.sessionId : (req.headers['x-session-id'] || null);
      if (currentCookieId) {
        sessions.delete(currentCookieId);
        res.clearCookie('sessionId');
      }
    }
  };
}

// Rate limiting simple
const rateLimit = new Map();

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || 'unknown';
}

function generateCode() {
  return crypto.randomBytes(24).toString('base64url');
}

async function sendEmail(to, code) {
  // Utiliser les variables d'environnement du .env
  const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  
  if (!smtpUser || !smtpPass) {
    throw new Error('Configuration SMTP manquante: EMAIL_USER et EMAIL_PASS requis');
  }
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
  const link = `${process.env.DOMAIN || 'http://localhost:3000'}/admin?code=${encodeURIComponent(code)}`;
  await transporter.sendMail({
    from: smtpUser,
    to,
    subject: 'Code d\'accès Admin',
    text: `Voici votre code d'accès: ${code}\nOu cliquez: ${link}\nValable 15 minutes.`,
    html: `
      <h2>Code d'accès Admin</h2>
      <p>Voici votre code d'accès: <strong>${code}</strong></p>
      <p>Ou <a href="${link}">cliquez ici</a> pour accéder directement.</p>
      <p><em>Ce code est valable 15 minutes.</em></p>
    `
  });
}

// Route /api/auth/request-code
app.post('/api/auth/request-code', async (req, res) => {
  console.log('📨 Requête reçue pour /api/auth/request-code');
  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    console.log('📍 IP client:', clientIP);
    const now = new Date();
    const limit = rateLimit.get(clientIP);
    
    if (limit) {
      if (now < limit.resetAt) {
        if (limit.count >= 3) {
          console.log('⛔ Rate limit atteint pour', clientIP);
          return res.status(429).json({ 
            message: 'Trop de demandes. Veuillez réessayer dans quelques minutes.' 
          });
        }
        limit.count++;
      } else {
        rateLimit.set(clientIP, { count: 1, resetAt: new Date(now.getTime() + 60 * 60 * 1000) });
      }
    } else {
      rateLimit.set(clientIP, { count: 1, resetAt: new Date(now.getTime() + 60 * 60 * 1000) });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Variables email manquantes');
      console.error('EMAIL_USER:', process.env.EMAIL_USER ? '✅' : '❌');
      console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅' : '❌');
      return res.status(500).json({ 
        message: 'Configuration email manquante. Vérifiez EMAIL_USER et EMAIL_PASS dans .env' 
      });
    }
    
    console.log('📧 Configuration SMTP:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS
    });

    const email = 'contact@matteo-rlt.fr';
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    
    if (!db) {
      console.error('❌ Base de données non initialisée');
      return res.status(500).json({ 
        message: 'Base de données non disponible. Vérifiez DATABASE_URL dans .env' 
      });
    }
    
    console.log('💾 Création du code dans la base de données...');
    try {
      await db.magicCode.create({ data: { email, code, expiresAt } });
      console.log('✅ Code créé dans la DB:', code);
    } catch (dbError) {
      console.error('❌ Erreur base de données:', dbError);
      console.error('❌ Message:', dbError.message);
      console.error('❌ Code:', dbError.code);
      return res.status(500).json({ 
        message: 'Erreur lors de la création du code: ' + (dbError.message || 'Erreur inconnue'),
        hint: dbError.code === 'P1001' ? 'Vérifiez que la base de données est accessible et que DATABASE_URL est correct' : undefined
      });
    }
    
    console.log('📧 Envoi de l\'email...');
    try {
      await sendEmail(email, code);
      console.log('✅ Email envoyé avec succès');
    } catch (emailError) {
      console.error('❌ Erreur envoi email:', emailError);
      // Supprimer le code créé si l'email échoue
      try {
        await db.magicCode.delete({ where: { code } });
      } catch {}
      return res.status(500).json({ 
        message: 'Erreur lors de l\'envoi de l\'email: ' + emailError.message 
      });
    }
    
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('❌ Erreur request-code:', e);
    console.error('❌ Message:', e.message);
    console.error('❌ Stack:', e.stack);
    return res.status(500).json({ 
      message: 'Erreur serveur: ' + (e.message || 'Erreur inconnue'),
      errorType: e.constructor.name,
      ...(process.env.NODE_ENV === 'development' && { stack: e.stack })
    });
  }
});

// Route /api/auth/verify-code
app.post('/api/auth/verify-code', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ message: 'Base de données non disponible' });
    }
    
    const { code } = req.body || {};
    if (!code) return res.status(400).json({ message: 'missing code' });
    
    const record = await db.magicCode.findUnique({ where: { code } });
    if (!record) return res.status(400).json({ message: 'invalid code' });
    if (record.used) return res.status(400).json({ message: 'code used' });
    if (new Date() > record.expiresAt) return res.status(400).json({ message: 'code expired' });

    await db.magicCode.update({ where: { code }, data: { used: true } });
    const session = getSession(req, res);
    session.set('user', { email: record.email });
    await session.save();
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Erreur verify-code:', e);
    return res.status(500).json({ message: 'Server error: ' + e.message });
  }
});

// Route /api/auth/me
app.get('/api/auth/me', async (req, res) => {
  try {
    const session = getSession(req, res);
    const user = session.get('user');
    if (!user) {
      return res.status(401).json({ authenticated: false });
    }
    return res.status(200).json({ authenticated: true, user });
  } catch (e) {
    console.error('❌ Erreur me:', e);
    console.error('❌ Stack:', e.stack);
    return res.status(500).json({ 
      authenticated: false,
      error: process.env.NODE_ENV === 'development' ? e.message : undefined
    });
  }
});

// Route /api/auth/logout
app.post('/api/auth/logout', async (req, res) => {
  try {
    const session = getSession(req, res);
    await session.destroy();
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Erreur logout:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route /api/analytics/summary
app.get('/api/analytics/summary', async (req, res) => {
  try {
    // Vérifier l'authentification
    const session = getSession(req, res);
    const user = session.get('user');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!db) {
      return res.status(500).json({ message: 'Base de données non disponible' });
    }

    const since = parseInt(req.query.since || '0', 10);
    const where = since ? { ts: { gt: BigInt(since) } } : {};

    const [totalEvents, pageViews, buttonClicks] = await Promise.all([
      db.event.count({ where }),
      db.event.count({ where: { ...where, type: 'page_view' } }),
      db.event.count({ where: { ...where, type: 'button_click' } })
    ]);

    // Top pages avec requête SQL brute (plus performant pour GROUP BY)
    let topPages = [];
    try {
      const topPagesRaw = await db.$queryRawUnsafe(
        `SELECT page, COUNT(*)::int as c FROM "Event" WHERE ${since ? `ts > ${since}` : '1=1'} AND type = 'page_view' AND page IS NOT NULL GROUP BY page ORDER BY c DESC LIMIT 10`
      );
      topPages = topPagesRaw || [];
    } catch (err) {
      console.error('Erreur top pages:', err);
      // Fallback: utiliser Prisma normal si la requête SQL échoue
      const allPageViews = await db.event.findMany({
        where: { ...where, type: 'page_view', page: { not: null } },
        select: { page: true }
      });
      
      const pageCounts = {};
      allPageViews.forEach(event => {
        if (event.page) {
          pageCounts[event.page] = (pageCounts[event.page] || 0) + 1;
        }
      });
      
      topPages = Object.entries(pageCounts)
        .map(([page, c]) => ({ page, c }))
        .sort((a, b) => b.c - a.c)
        .slice(0, 10);
    }

    return res.status(200).json({
      totalEvents,
      pageViews,
      buttonClicks,
      topPages
    });
  } catch (e) {
    console.error('Erreur /api/analytics/summary:', e);
    return res.status(500).json({ message: 'Server error: ' + (e.message || 'Erreur inconnue') });
  }
});

// Route /api/settings/get
app.get('/api/settings/get', async (req, res) => {
  try {
    const session = getSession(req, res);
    const user = session.get('user');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!db) {
      return res.status(500).json({ message: 'Base de données non disponible' });
    }

    const keys = req.query.keys?.split(',') || [];
    const result = {};

    for (const key of keys) {
      const setting = await db.setting.findUnique({ where: { key } });
      if (setting) {
        result[key] = setting.value;
      }
    }

    return res.status(200).json(result);
  } catch (e) {
    console.error('Erreur /api/settings/get:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route /api/settings/set
app.post('/api/settings/set', async (req, res) => {
  try {
    const session = getSession(req, res);
    const user = session.get('user');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!db) {
      return res.status(500).json({ message: 'Base de données non disponible' });
    }

    const { updates } = req.body || {};
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    for (const [key, value] of Object.entries(updates)) {
      await db.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Erreur /api/settings/set:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route pour envoyer les messages de contact via SMTP
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Champs requis manquants' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'contact@matteo-rlt.fr',
      to: process.env.EMAIL_TO || 'contact@matteo-rlt.fr',
      subject: `Nouveau message de contact: ${subject}`,
      replyTo: email,
      text: `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
      html: buildContactNotificationEmail({ name, email, subject, message })
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('❌ Erreur contact:', error);
    res.status(500).json({ success: false, message: error.message, code: error.code });
  }
});
// Endpoint de test pour vérifier l'envoi d'email côté serveur
app.post('/api/test-email', async (req, res) => {
  try {
    const testTo = process.env.EMAIL_TO || 'contact@matteo-rlt.fr';
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'contact@matteo-rlt.fr',
      to: testTo,
      subject: '✅ Test SMTP - Portfolio',
      text: 'Ceci est un email de test envoyé via l\'endpoint /api/test-email.',
      html: '<p>Ceci est un email de <strong>test</strong> envoyé via l\'endpoint <code>/api/test-email</code>.</p>'
    });
    res.json({ success: true, message: 'Test envoyé', envelope: info.envelope, response: info.response });
  } catch (error) {
    console.error('❌ Test email error:', error);
    res.status(500).json({ success: false, message: error.message, code: error.code });
  }
});

// Route pour envoyer les devis
app.post('/api/quote', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, message, selectedPackage, packageDetails } = req.body;

    // Email pour vous (notification)
    const mailOptions = {
      from: process.env.EMAIL_USER || 'contact@matteo-rlt.fr',
      to: process.env.EMAIL_TO || 'contact@matteo-rlt.fr',
      subject: `Nouvelle demande de devis - ${packageDetails?.title || 'Formule inconnue'}`,
      replyTo: email,
      text: `Nouvelle demande de devis\n\nFormule: ${packageDetails?.title || 'Non spécifiée'} (EUR ${packageDetails?.price || 'N/A'})\nPériode: ${packageDetails?.period || 'N/A'}\n\nClient: ${firstName} ${lastName}\nEmail: ${email}\nTéléphone: ${phone || 'Non renseigné'}\nEntreprise: ${company || 'Non renseignée'}\n\nMessage:\n${message || 'Aucun message'}`,
      html: buildQuoteNotificationEmail({
        firstName,
        lastName,
        email,
        phone,
        company,
        message,
        packageDetails,
      }),
    };

    // Email de confirmation pour le client
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER || 'contact@matteo-rlt.fr',
      to: email,
      subject: 'Confirmation de votre demande de devis',
      replyTo: process.env.EMAIL_USER || 'contact@matteo-rlt.fr',
      text: `Bonjour ${firstName},\n\nMerci pour votre demande de devis.\nFormule: ${packageDetails?.title}\nPrix: EUR ${packageDetails?.price}\nPériode: ${packageDetails?.period}\n\nJe reviens vers vous rapidement.\n\nCordialement,\nMattéo Rannou-Le Texier`,
      html: buildQuoteConfirmationEmail({ firstName, packageDetails }),
    };

    // Envoi des emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMailOptions);

    res.json({ success: true, message: 'Devis envoyé avec succès' });
  } catch (error) {
    console.error('❌ Erreur détaillée lors de l\'envoi du devis:', error);
    
    // Messages d'erreur plus spécifiques
    let errorMessage = 'Erreur lors de l\'envoi du devis';
    if (error.code === 'EAUTH') {
      errorMessage = 'Erreur d\'authentification email. Vérifiez vos identifiants.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Erreur de connexion au serveur email.';
    } else if (error.message.includes('Invalid login')) {
      errorMessage = 'Identifiants email incorrects.';
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Route pour servir l'app React en production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('❌ Erreur globale:', err);
  console.error('Stack:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Une erreur interne est survenue.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 Application disponible sur: http://localhost:${PORT}`);
  console.log(`📧 API Email configurée: ${process.env.EMAIL_USER ? '✅' : '❌'}`);
  console.log(`🔧 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Session password: ${process.env.SESSION_PASSWORD ? '✅ Configuré' : '❌ Manquant'}`);
}); 