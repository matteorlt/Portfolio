// Templates d'email pour le portfolio
// Fichier: server/templates/emailTemplates.js

const buildQuoteNotificationEmail = ({ firstName, lastName, email, phone, company, message, packageDetails }) => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle demande de devis</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .package-info { background: #e8f4fd; padding: 15px; border-left: 4px solid #3498db; margin: 15px 0; }
            .client-info { background: #f0f8ff; padding: 15px; margin: 15px 0; }
            .footer { background: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
            ul { padding-left: 20px; }
            li { margin: 5px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>📧 Nouvelle demande de devis</h2>
            </div>
            
            <div class="content">
                <div class="package-info">
                    <h3>📦 Formule sélectionnée</h3>
                    <p><strong>${packageDetails?.title || 'Non spécifiée'}</strong> - €${packageDetails?.price || 'N/A'}</p>
                    <p><strong>Période:</strong> ${packageDetails?.period || 'Non spécifiée'}</p>
                </div>
                
                <div class="client-info">
                    <h3>👤 Informations client</h3>
                    <ul>
                        <li><strong>Nom:</strong> ${firstName} ${lastName}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</li>
                        <li><strong>Entreprise:</strong> ${company || 'Non renseignée'}</li>
                    </ul>
                </div>
                
                <h3>💬 Message du client</h3>
                <p>${message || 'Aucun message'}</p>
                
                ${packageDetails?.features ? `
                <h3>✨ Fonctionnalités incluses</h3>
                <ul>
                    ${packageDetails.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                ` : ''}
            </div>
            
            <div class="footer">
                <p>Demande envoyée le ${new Date().toLocaleString('fr-FR')}</p>
                <p>Portfolio Mattéo Rannou-Le Texier</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const buildQuoteConfirmationEmail = ({ firstName, packageDetails }) => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de devis</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #27ae60; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .package-summary { background: #e8f5e8; padding: 15px; border-left: 4px solid #27ae60; margin: 15px 0; }
            .features { background: #f0fff0; padding: 15px; margin: 15px 0; }
            .footer { background: #2c3e50; color: white; padding: 15px; text-align: center; font-size: 12px; }
            ul { padding-left: 20px; }
            li { margin: 5px 0; }
            .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>✅ Confirmation de votre demande de devis</h2>
            </div>
            
            <div class="content">
                <p>Bonjour <strong>${firstName}</strong>,</p>
                
                <p>Merci pour votre demande de devis ! Nous avons bien reçu votre demande et nous l'étudions actuellement.</p>
                
                <div class="package-summary">
                    <h3>📋 Récapitulatif de votre demande</h3>
                    <ul>
                        <li><strong>Formule:</strong> ${packageDetails?.title || 'Non spécifiée'}</li>
                        <li><strong>Prix:</strong> €${packageDetails?.price || 'N/A'}</li>
                        <li><strong>Période:</strong> ${packageDetails?.period || 'Non spécifiée'}</li>
                    </ul>
                </div>
                
                ${packageDetails?.features ? `
                <div class="features">
                    <h3>✨ Fonctionnalités incluses</h3>
                    <ul>
                        ${packageDetails.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                <p>Nous étudions votre demande et vous recontacterons dans les plus brefs délais pour discuter de votre projet en détail.</p>
                
                <div class="signature">
                    <p>Cordialement,<br>
                    <strong>Mattéo Rannou-Le Texier</strong><br>
                    Développeur Web</p>
                </div>
            </div>
            
            <div class="footer">
                <p>Email envoyé automatiquement le ${new Date().toLocaleString('fr-FR')}</p>
                <p>Portfolio Mattéo Rannou-Le Texier</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const buildContactNotificationEmail = ({ name, email, subject, message }) => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau message de contact</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e74c3c; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .contact-info { background: #ffe8e8; padding: 15px; border-left: 4px solid #e74c3c; margin: 15px 0; }
            .message-content { background: #f0f0f0; padding: 15px; margin: 15px 0; }
            .footer { background: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>📬 Nouveau message de contact</h2>
            </div>
            
            <div class="content">
                <div class="contact-info">
                    <h3>👤 Informations de contact</h3>
                    <ul>
                        <li><strong>Nom:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Sujet:</strong> ${subject}</li>
                    </ul>
                </div>
                
                <div class="message-content">
                    <h3>💬 Message</h3>
                    <p>${message}</p>
                </div>
            </div>
            
            <div class="footer">
                <p>Message reçu le ${new Date().toLocaleString('fr-FR')}</p>
                <p>Portfolio Mattéo Rannou-Le Texier</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = {
  buildQuoteNotificationEmail,
  buildQuoteConfirmationEmail,
  buildContactNotificationEmail,
};