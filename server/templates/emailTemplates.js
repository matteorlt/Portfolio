function baseLayout(title, body) {
  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#0e1220;color:#e8eef6;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:rgba(74,144,226,0.08);border:1px solid rgba(74,144,226,0.22);border-radius:12px;">
      <div style="padding:20px 24px;border-bottom:1px solid rgba(74,144,226,0.2);">
        <h2 style="margin:0;color:#66b0ff;font-size:20px;">${title}</h2>
      </div>
      <div style="padding:24px;line-height:1.65;color:#e8eef6;">${body}</div>
      <div style="padding:16px 24px;border-top:1px solid rgba(74,144,226,0.2);font-size:12px;color:#b7c2d0;">
        <div>Envoyé automatiquement • ${new Date().toLocaleString('fr-FR')}</div>
        <div style="margin-top:6px;">Mattéo Rannou‑Le Texier • matteo-rlt.fr</div>
      </div>
    </div>
  </div>`;
}

function list(items) {
  if (!items || !items.length) return '';
  return `<ul style="padding-left:20px;margin:8px 0;">${items
    .map((i) => `<li>${i}</li>`)
    .join('')}</ul>`;
}

exports.buildQuoteNotificationEmail = function buildQuoteNotificationEmail(payload) {
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    message,
    packageDetails,
  } = payload;

  const body = `
    <p style="margin:0 0 10px;">Nouvelle demande de devis reçue.</p>
    <h3 style="color:#66b0ff;margin:16px 0 6px;">Formule</h3>
    <div><strong>${packageDetails?.title || 'Non spécifiée'}</strong> • €${packageDetails?.price || 'N/A'} (${packageDetails?.period || 'N/A'})</div>
    ${list(packageDetails?.features)}

    <h3 style="color:#66b0ff;margin:16px 0 6px;">Client</h3>
    <div><strong>Nom:</strong> ${firstName} ${lastName}</div>
    <div><strong>Email:</strong> ${email}</div>
    <div><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</div>
    <div><strong>Entreprise:</strong> ${company || 'Non renseignée'}</div>

    <h3 style="color:#66b0ff;margin:16px 0 6px;">Message</h3>
    <div>${(message || 'Aucun message').replace(/\n/g, '<br>')}</div>
  `;

  return baseLayout('Nouvelle demande de devis', body);
};

exports.buildQuoteConfirmationEmail = function buildQuoteConfirmationEmail(payload) {
  const { firstName, packageDetails } = payload;
  const body = `
    <p>Bonjour ${firstName},</p>
    <p>Merci pour votre demande de devis. Voici un récapitulatif&nbsp;:</p>
    <div><strong>Formule:</strong> ${packageDetails?.title} • €${packageDetails?.price}</div>
    <div><strong>Période:</strong> ${packageDetails?.period}</div>
    <h3 style="color:#66b0ff;margin:16px 0 6px;">Fonctionnalités</h3>
    ${list(packageDetails?.features)}
    <p style="margin-top:12px;">Je reviens vers vous très rapidement.</p>
    <p style="margin:0;">Cordialement,<br/>Mattéo Rannou‑Le Texier</p>
  `;
  return baseLayout('Confirmation de votre demande de devis', body);
};

exports.buildContactNotificationEmail = function buildContactNotificationEmail(payload) {
  const { name, email, subject, message } = payload;
  const body = `
    <p style="margin:0 0 10px;">Nouveau message de contact.</p>
    <div><strong>Nom:</strong> ${name}</div>
    <div><strong>Email:</strong> ${email}</div>
    <div><strong>Sujet:</strong> ${subject}</div>
    <h3 style="color:#66b0ff;margin:16px 0 6px;">Message</h3>
    <div>${message.replace(/\n/g, '<br>')}</div>
  `;
  return baseLayout('Nouveau message de contact', body);
};


