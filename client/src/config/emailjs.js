// Configuration EmailJS
export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xxxxxxx',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key_here'
};
