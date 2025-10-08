const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Vérifier que c'est une requête POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parser le body de la requête
    const data = JSON.parse(event.body);
    const { firstName, lastName, email, phone, company, message, selectedPackage, packageDetails } = data;

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email pour vous (notification)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
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
      from: process.env.EMAIL_USER,
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

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ success: true, message: 'Devis envoyé avec succès' })
    };

  } catch (error) {
    console.error('Erreur lors de l\'envoi du devis:', error);
    
    let errorMessage = 'Erreur lors de l\'envoi du devis';
    if (error.code === 'EAUTH') {
      errorMessage = 'Erreur d\'authentification email. Vérifiez vos identifiants.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Erreur de connexion au serveur email.';
    } else if (error.message.includes('Invalid login')) {
      errorMessage = 'Identifiants email incorrects.';
    }
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: false, 
        message: errorMessage
      })
    };
  }
};
