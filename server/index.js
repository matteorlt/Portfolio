const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'contact@matteo-rlt.fr',
    pass: process.env.EMAIL_PASS || 'votre-mot-de-passe-app'
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
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes API
app.get('/api/health', (req, res) => {
  res.json({ message: 'Portfolio API is running!' });
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
      html: `
        <h2>Nouvelle demande de devis</h2>
        <h3>Formule sélectionnée: ${packageDetails?.title || 'Non spécifiée'} (€${packageDetails?.price || 'N/A'})</h3>
        
        <h4>Informations client:</h4>
        <ul>
          <li><strong>Nom:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</li>
          <li><strong>Entreprise:</strong> ${company || 'Non renseignée'}</li>
        </ul>
        
        <h4>Message:</h4>
        <p>${message || 'Aucun message'}</p>
        
        <h4>Détails de la formule:</h4>
        <ul>
          ${packageDetails?.features?.map(feature => `<li>${feature}</li>`).join('') || ''}
        </ul>
        
        <hr>
        <p><em>Demande envoyée le ${new Date().toLocaleString('fr-FR')}</em></p>
      `
    };

    // Email de confirmation pour le client
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER || 'votre-email@gmail.com',
      to: email,
      subject: 'Confirmation de votre demande de devis',
      html: `
        <h2>Merci pour votre demande de devis !</h2>
        
        <p>Bonjour ${firstName},</p>
        
        <p>Nous avons bien reçu votre demande de devis pour la formule <strong>${packageDetails?.title}</strong>.</p>
        
        <h3>Récapitulatif de votre demande:</h3>
        <ul>
          <li><strong>Formule:</strong> ${packageDetails?.title} (€${packageDetails?.price})</li>
          <li><strong>Période:</strong> ${packageDetails?.period}</li>
        </ul>
        
        <h3>Fonctionnalités incluses:</h3>
        <ul>
          ${packageDetails?.features?.map(feature => `<li>${feature}</li>`).join('') || ''}
        </ul>
        
        <p>Nous étudions votre demande et vous recontacterons dans les plus brefs délais pour discuter de votre projet.</p>
        
        <p>Cordialement,<br>
        Mattéo Rannou-Le Texier<br>
        Développeur Web</p>
        
        <hr>
        <p><em>Email envoyé automatiquement le ${new Date().toLocaleString('fr-FR')}</em></p>
      `
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
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:3000`);
  console.log(`🔧 Backend: http://localhost:${PORT}`);
}); 