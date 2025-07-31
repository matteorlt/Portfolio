import { Helmet } from 'react-helmet';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mattéo Rannou Le Texier",
    "jobTitle": "Développeur Web & Web Mobile",
    "description": "Développeur Web & Web Mobile spécialisé en React, Java, PHP et JavaScript",
    "url": "https://votre-domaine.com",
    "sameAs": [
      "https://github.com/matteorlt",
      "https://linkedin.com/in/matteo-rlt"
    ],
    "knowsAbout": [
      "React",
      "JavaScript",
      "Java",
      "PHP",
      "Développement Web",
      "Développement Mobile"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "email": "rannouletexiermatteo@gmail.com"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData; 