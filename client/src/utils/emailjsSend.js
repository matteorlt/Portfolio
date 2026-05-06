import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.js';

export function assertEmailJsConfigured() {
  const { serviceId, publicKey } = EMAILJS_CONFIG;
  if (!serviceId?.trim() || !publicKey?.trim()) {
    throw new Error(
      'Configuration EmailJS manquante : définissez VITE_EMAILJS_SERVICE_ID et VITE_EMAILJS_PUBLIC_KEY dans client/.env'
    );
  }
}

/**
 * @param {Record<string, unknown>} templateParams Champs attendus par le template EmailJS
 * @param {'contact' | 'quote'} which Quel template utiliser
 */
export async function sendViaEmailJs(templateParams, which) {
  assertEmailJsConfigured();
  const templateId =
    which === 'contact'
      ? EMAILJS_CONFIG.contactTemplateId || EMAILJS_CONFIG.templateId
      : EMAILJS_CONFIG.quoteTemplateId || EMAILJS_CONFIG.templateId || EMAILJS_CONFIG.contactTemplateId;
  if (!templateId?.trim()) {
    throw new Error(
      'Template EmailJS manquant : pour le devis utilisez VITE_EMAILJS_TEMPLATE_DEVIS_ID ou VITE_EMAILJS_TEMPLATE_ID ; pour le contact VITE_EMAILJS_TEMPLATE_CONTACT_ID.'
    );
  }
  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    templateId,
    templateParams,
    { publicKey: EMAILJS_CONFIG.publicKey }
  );
}
