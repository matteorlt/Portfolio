import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import { ROUTE_META, SITE_URL } from '../seo/routes.js';

const LegalContainer = styled.div`
  min-height: 100dvh;
  padding: max(6.25rem, calc(var(--nav-h) + 2rem + env(safe-area-inset-top, 0px))) var(--page-pad-x) max(2rem, var(--page-pad-b));
  padding-right: var(--page-pad-r);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;

  @media (min-width: 768px) {
    padding: 100px 2rem 2rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 2rem 0 1rem 0;
`;

const Paragraph = styled(motion.p)`
  color: var(--color-muted);
  margin-bottom: 1rem;
  text-align: justify;
`;

const List = styled(motion.ul)`
  color: var(--color-muted);
  margin-bottom: 1rem;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const CompanyInfo = styled(motion.div)`
  background: var(--color-accent-muted);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const InfoTitle = styled.h3`
  color: var(--color-text);
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  color: var(--color-muted);
  margin-bottom: 0.5rem;
`;

const LastUpdate = styled(motion.p)`
  color: var(--color-muted);
  font-style: italic;
  text-align: center;
  margin-top: 3rem;
`;

const LegalNotices = () => {
  return (
    <LegalContainer>
      <SEO {...ROUTE_META['/legal-notices']} url={`${SITE_URL}/legal-notices`} />
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mentions légales
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        1. Éditeur du site
      </Subtitle>

      <CompanyInfo
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InfoTitle>Informations sur l'entreprise :</InfoTitle>
        <InfoText><strong>Raison sociale :</strong> RANNOU--LE TEXIER Mattéo</InfoText>
        <InfoText><strong>Forme juridique :</strong> Entrepreneur individuel</InfoText>
        <InfoText><strong>SIREN :</strong> 932 455 504</InfoText>
        <InfoText><strong>SIRET :</strong> 93245550400013</InfoText>
        <InfoText><strong>Code APE :</strong> 6201Z - Programmation informatique</InfoText>
        <InfoText><strong>Date d'immatriculation :</strong> 04/09/2024</InfoText>
        <InfoText><strong>Début d'activité :</strong> 30/08/2024</InfoText>
      </CompanyInfo>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        2. Coordonnées
      </Subtitle>

      <CompanyInfo
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InfoTitle>Adresse du siège :</InfoTitle>
        <InfoText>15 RUE Jules Ferry</InfoText>
        <InfoText>56460 Val d'Oust</InfoText>
        <InfoText>FRANCE</InfoText>
        <InfoText><strong>Email :</strong> contact@matteo-rlt.fr</InfoText>
        <InfoText><strong>Site web :</strong> matteo-rlt.fr</InfoText>
      </CompanyInfo>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        3. Activité
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <strong>Activité principale :</strong> développement web — création, design, programmation et maintenance de sites internet
      </Paragraph>


      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        4. Hébergement
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        5. Propriété intellectuelle
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) est la propriété exclusive de Mattéo Rannou Le Texier ou de ses partenaires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord exprès par écrit de Mattéo Rannou Le Texier.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        6. Responsabilité
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Les informations contenues sur ce site sont aussi précises que possible et le site est mis à jour régulièrement, mais il peut toutefois contenir des inexactitudes ou des omissions.
      </Paragraph>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Si vous constatez une lacune, une erreur ou ce qui paraît être un dysfonctionnement, merci de bien vouloir le signaler par email, à l'adresse contact@matteo-rlt.fr, en décrivant le problème de la manière la plus précise possible.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        7. Liens hypertextes
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Ce site peut contenir des liens vers d'autres sites web. Je ne suis pas responsable du contenu de ces sites externes et ne peux garantir leur exactitude ou leur sécurité.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        8. Cookies
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Les cookies de mesure d'audience et de publicité ne sont déposés qu'après votre accord via le bandeau cookies. Vous pouvez modifier votre choix à tout moment grâce au lien « Gérer les cookies » en bas de page. Plus de détails dans la politique de confidentialité.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        9. Droit applicable
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Le présent site et les modalités et conditions de son utilisation sont régis par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        10. Contact
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pour toute question concernant ces mentions légales, vous pouvez me contacter à l'adresse e-mail : contact@matteo-rlt.fr
      </Paragraph>

      <LastUpdate
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dernière mise à jour : 27 octobre 2026
      </LastUpdate>
    </LegalContainer>
  );
};

export default LegalNotices;
