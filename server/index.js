const express = require('express');
const cors = require('cors');
const path = require('path');
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
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes API
app.get('/api/health', (req, res) => {
  res.json({ message: 'Portfolio API is running!' });
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

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 Application disponible sur: http://localhost:${PORT}`);
  console.log(`📧 API Email configurée: ${process.env.EMAIL_USER ? '✅' : '❌'}`);
  console.log(`🔧 Environnement: ${process.env.NODE_ENV || 'development'}`);
}); 