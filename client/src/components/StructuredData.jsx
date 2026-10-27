const StructuredData = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mattéo Rannou Le Texier',
    jobTitle: 'Développeur web freelance',
    description:
      'Développeur web freelance : sites vitrine, e-commerce et applications orientées conversion.',
    url: 'https://matteo-rlt.fr',
    sameAs: ['https://github.com/matteorlt', 'https://linkedin.com/in/matteo-rlt'],
    knowsAbout: ['Développement web', 'TypeScript', 'JavaScript', 'E-commerce', 'Applications web'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vannes',
      addressRegion: 'Bretagne',
      addressCountry: 'FR'
    },
    email: 'contact@matteo-rlt.fr'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
