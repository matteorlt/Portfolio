/**
 * Métadonnées des pages pré-rendues — source unique pour le composant SEO (client)
 * et pour le script de pré-rendu (HTML statique servi aux robots et réseaux sociaux).
 */
export const SITE_URL = 'https://matteo-rlt.fr';
export const DEFAULT_IMAGE = `${SITE_URL}/logos/og-image.jpg`;

export const ROUTE_META = {
  '/': {
    title: 'Création de site internet à Vannes — Mattéo RLT, développeur web',
    description:
      'Développeur web freelance à Vannes : sites vitrine, e-commerce et applications web rapides et bien référencés. Site vitrine offert aux 10 premiers clients, devis sous 24 h.',
    keywords:
      'création site internet Vannes, développeur web freelance, site vitrine, e-commerce, application web, référencement, Morbihan, Bretagne'
  },
  '/legal-notices': {
    title: 'Mentions légales — Mattéo Rannou Le Texier',
    description: 'Mentions légales du site matteo-rlt.fr : éditeur, hébergeur, propriété intellectuelle.'
  },
  '/privacy-policy': {
    title: 'Politique de confidentialité — Mattéo Rannou Le Texier',
    description: 'Données collectées, cookies, prestataires et droits RGPD sur matteo-rlt.fr.'
  },
  '/404': {
    title: 'Page introuvable — Mattéo Rannou Le Texier',
    description: 'Cette page n’existe pas.',
    noindex: true
  }
};
