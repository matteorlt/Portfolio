// api/quote.js - Fonction Vercel pour les demandes de devis
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, company, message, selectedPackage, packageDetails } = req.body;

  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE || 'true') === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email notification pour vous
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Nouvelle demande de devis - ${packageDetails?.title || 'Formule inconnue'}`,
      replyTo: email,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <h3>Formule: ${packageDetails?.title || 'Non spécifiée'} - €${packageDetails?.price || 'N/A'}</h3>
        
        <h4>Informations client:</h4>
        <ul>
          <li><strong>Nom:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</li>
          <li><strong>Entreprise:</strong> ${company || 'Non renseignée'}</li>
        </ul>
        
        <h4>Message:</h4>
        <p>${message || 'Aucun message'}</p>
        
        ${packageDetails?.features ? `
        <h4>Fonctionnalités incluses:</h4>
        <ul>
          ${packageDetails.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        ` : ''}
      `
    };

    // Email de confirmation pour le client
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de votre demande de devis',
      html: `
        <h2>Merci pour votre demande de devis !</h2>
        <p>Bonjour ${firstName},</p>
        <p>Nous avons bien reçu votre demande de devis pour la formule <strong>${packageDetails?.title}</strong>.</p>
        
        <h3>Récapitulatif:</h3>
        <ul>
          <li><strong>Formule:</strong> ${packageDetails?.title} (€${packageDetails?.price})</li>
          <li><strong>Période:</strong> ${packageDetails?.period}</li>
        </ul>
        
        <p>Nous vous recontacterons rapidement.</p>
        <p>Cordialement,<br>Mattéo Rannou-Le Texier</p>
      `
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMailOptions);

    res.json({ success: true, message: 'Devis envoyé avec succès' });
  } catch (error) {
    console.error('Erreur devis:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi' });
  }
}
