import { SITE_URL, DEFAULT_IMAGE } from '../seo/routes.js';

const PERSON_ID = `${SITE_URL}/#person`;
const BUSINESS_ID = `${SITE_URL}/#business`;

// [nom, description, prix minimum en € (null = sur devis), unité de facturation]
const SERVICES = [
  ['Création de site vitrine', 'Site vitrine sur-mesure, adapté au mobile et optimisé pour Google.', 400],
  ['Développement d’application web', 'Outils métier, plateformes avec comptes utilisateurs et SaaS.', 1000],
  ['Création de site e-commerce', 'Boutique en ligne pour vendre vos produits sur internet.', 700, 'MON'],
  ['Refonte de site internet', 'Modernisation de sites lents, vieillissants ou difficiles à mettre à jour.', null],
  ['Maintenance de site internet', 'Mises à jour, sauvegardes, corrections et évolutions.', 100, 'ANN']
];

/**
 * Données structurées de l’accueil : un graphe reliant le site, la personne et l’activité
 * (ProfessionalService) pour les résultats enrichis et la recherche locale.
 */
const StructuredData = () => {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Mattéo Rannou Le Texier — Développeur web',
        inLanguage: 'fr-FR',
        publisher: { '@id': BUSINESS_ID }
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Mattéo Rannou Le Texier',
        jobTitle: 'Développeur web freelance',
        url: `${SITE_URL}/`,
        email: 'mailto:contact@matteo-rlt.fr',
        sameAs: ['https://github.com/matteorlt', 'https://linkedin.com/in/matteo-rlt'],
        knowsAbout: ['Développement web', 'React', 'Next.js', 'TypeScript', 'E-commerce', 'Référencement naturel'],
        worksFor: { '@id': BUSINESS_ID }
      },
      {
        '@type': 'ProfessionalService',
        '@id': BUSINESS_ID,
        name: 'Mattéo Rannou Le Texier — Création de sites internet',
        description:
          'Développeur web freelance à Vannes : création de sites vitrine, e-commerce et applications web rapides et bien référencés.',
        url: `${SITE_URL}/`,
        image: DEFAULT_IMAGE,
        logo: `${SITE_URL}/logos/logo_black-192.webp`,
        email: 'contact@matteo-rlt.fr',
        founder: { '@id': PERSON_ID },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vannes',
          addressRegion: 'Bretagne',
          addressCountry: 'FR'
        },
        areaServed: [
          { '@type': 'City', name: 'Vannes' },
          { '@type': 'AdministrativeArea', name: 'Morbihan' },
          { '@type': 'AdministrativeArea', name: 'Bretagne' },
          { '@type': 'Country', name: 'France' }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services de développement web',
          itemListElement: SERVICES.map(([name, description, minPrice, unit]) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name, description },
            ...(minPrice != null && {
              priceSpecification: {
                '@type': unit ? 'UnitPriceSpecification' : 'PriceSpecification',
                minPrice,
                priceCurrency: 'EUR',
                ...(unit && { unitCode: unit })
              }
            })
          }))
        },
        makesOffer: {
          '@type': 'Offer',
          name: 'Offre de lancement — site vitrine offert',
          description:
            'Site vitrine jusqu’à 5 pages offert aux 10 premiers clients, puis 50 € par an pour l’hébergement, le nom de domaine et la maintenance.',
          price: '0',
          priceCurrency: 'EUR',
          url: `${SITE_URL}/#offre`
        }
      }
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
};

export default StructuredData;
