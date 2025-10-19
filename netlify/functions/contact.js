const nodemailer = require('nodemailer');
const { buildContactNotificationEmail } = require('./templates');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, email, subject, message } = JSON.parse(event.body || '{}');
    if (!name || !email || !subject || !message) {
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


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nouveau message de contact: ${subject}`,
      replyTo: email,
      text: `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
      html: buildContactNotificationEmail({ name, email, subject, message }),
    };

    await transporter.sendMail(mailOptions);

    return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Message envoyé avec succès' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ success: false, message: error.message, code: error.code }) };
  }
};


