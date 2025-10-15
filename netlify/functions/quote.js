const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const payload = JSON.parse(event.body || '{}');
    const { firstName, lastName, email, phone, company, message, packageDetails } = payload;
    if (!firstName || !lastName || !email || !packageDetails) {
      return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Champs requis manquants' }) };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE || 'true') === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const notify = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nouvelle demande de devis - ${packageDetails?.title || 'Formule inconnue'}`,
      replyTo: email,
      text: `Formule: ${packageDetails?.title} (EUR ${packageDetails?.price})\nPériode: ${packageDetails?.period}\n\nClient: ${firstName} ${lastName}\nEmail: ${email}\nTéléphone: ${phone || 'Non renseigné'}\nEntreprise: ${company || 'Non renseignée'}\n\nMessage:\n${message || 'Aucun message'}`,
      html: `
        <div style="font-family:Inter,Segoe UI,Arial,sans-serif;color:#111;">
          <h2>Nouvelle demande de devis</h2>
          <p><strong>Formule:</strong> ${packageDetails?.title} (€${packageDetails?.price})</p>
          <p><strong>Période:</strong> ${packageDetails?.period}</p>
          <h3>Client</h3>
          <p><strong>Nom:</strong> ${firstName} ${lastName}<br/>
          <strong>Email:</strong> ${email}<br/>
          <strong>Téléphone:</strong> ${phone || 'Non renseigné'}<br/>
          <strong>Entreprise:</strong> ${company || 'Non renseignée'}</p>
          <h3>Message</h3>
          <p>${String(message || 'Aucun message').replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    const confirm = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de votre demande de devis',
      replyTo: process.env.EMAIL_USER,
      text: `Bonjour ${firstName},\nMerci pour votre demande.\nFormule: ${packageDetails?.title}\nPrix: EUR ${packageDetails?.price}\nPériode: ${packageDetails?.period}\n\nJe reviens vers vous rapidement.`,
      html: `
        <div style="font-family:Inter,Segoe UI,Arial,sans-serif;color:#111;">
          <p>Bonjour ${firstName},</p>
          <p>Merci pour votre demande de devis. Voici un récapitulatif:</p>
          <p><strong>Formule:</strong> ${packageDetails?.title} (€${packageDetails?.price})<br/>
          <strong>Période:</strong> ${packageDetails?.period}</p>
          <p>Je reviens vers vous très rapidement.</p>
          <p>Cordialement,<br/>Mattéo Rannou‑Le Texier</p>
        </div>
      `,
    };

    await transporter.sendMail(notify);
    await transporter.sendMail(confirm);

    return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Devis envoyé avec succès' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ success: false, message: error.message, code: error.code }) };
  }
};


