import { Helmet } from 'react-helmet';

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
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    email: 'contact@matteo-rlt.fr'
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default StructuredData;
