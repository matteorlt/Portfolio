// Configuration EmailJS (pilotée par les variables d'environnement Vite)
export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template devis
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  // Template contact (fallback sur le template principal si non défini)
  contactTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID
};
