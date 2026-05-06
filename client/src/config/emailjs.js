// Configuration EmailJS (pilotée par les variables d'environnement Vite)
export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  contactTemplateId:
    import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  quoteTemplateId:
    import.meta.env.VITE_EMAILJS_TEMPLATE_DEVIS_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};
