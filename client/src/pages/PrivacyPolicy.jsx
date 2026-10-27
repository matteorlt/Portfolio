import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import { ROUTE_META, SITE_URL } from '../seo/routes.js';

const PrivacyContainer = styled.div`
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

const ContactInfo = styled(motion.div)`
  background: var(--color-accent-muted);
  border: 1px solid rgba(200, 242, 74, 0.22);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const ContactTitle = styled.h3`
  color: var(--color-text);
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ContactText = styled.p`
  color: var(--color-muted);
  margin-bottom: 0.5rem;
`;

const LastUpdate = styled(motion.p)`
  color: #aaaaaa;
  font-style: italic;
  text-align: center;
  margin-top: 3rem;
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      <SEO {...ROUTE_META['/privacy-policy']} url={`${SITE_URL}/privacy-policy`} />
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Politique de confidentialité
      </Title>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cette politique de confidentialité décrit comment Mattéo Rannou Le Texier collecte, utilise et protège vos informations personnelles lorsque vous utilisez ce site web.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        1. Collecte d'informations
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Les informations suivantes peuvent être collectées :
      </Paragraph>

      <List
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ListItem>Informations que vous saisissez dans les formulaires de contact et de devis (nom, prénom, e-mail, téléphone, entreprise, site, description du projet)</ListItem>
        <ListItem>Données de navigation (pages visitées, type d’appareil et de navigateur, adresse IP anonymisée) — uniquement si vous acceptez les cookies</ListItem>
              </List>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        2. Utilisation des informations
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Ces informations servent à :
      </Paragraph>

      <List
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ListItem>Répondre à vos demandes de devis et de contact (base légale : mesures précontractuelles à votre demande)</ListItem>
        <ListItem>Mesurer l’audience et améliorer le site (base légale : votre consentement)</ListItem>
        <ListItem>Mesurer l’efficacité des campagnes publicitaires Google Ads (base légale : votre consentement)</ListItem>
        <ListItem>Respecter mes obligations légales (facturation, comptabilité)</ListItem>
      </List>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        3. Partage des informations
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Vos informations ne sont jamais vendues ni louées. Elles sont transmises uniquement aux prestataires nécessaires au fonctionnement du site :
      </Paragraph>

      <List
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ListItem>Vercel Inc. (hébergement du site, États-Unis)</ListItem>
        <ListItem>EmailJS (acheminement des messages envoyés via les formulaires)</ListItem>
        <ListItem>Google LLC — Google Analytics et Google Ads (si vous acceptez les cookies)</ListItem>
        <ListItem>Microsoft — Clarity (analyse de parcours, si vous acceptez les cookies)</ListItem>
        <ListItem>Les autorités compétentes, en cas d’obligation légale</ListItem>
      </List>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        4. Sécurité des données
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Des mesures de sécurité appropriées sont mises en place pour protéger vos informations contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        5. Cookies et durée de conservation
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Aucun cookie de mesure d’audience ou de publicité n’est déposé sans votre accord. Le bandeau affiché à votre première visite vous permet d’accepter ou de refuser ; vous pouvez changer d’avis à tout moment via le lien « Gérer les cookies » en bas de page. Votre choix est conservé dans votre navigateur. Les messages envoyés via les formulaires sont conservés au maximum 3 ans après notre dernier échange, sauf si une relation commerciale s’ensuit.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        6. Vos droits
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Conformément au RGPD, vous avez le droit de :
      </Paragraph>

      <List
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ListItem>Accéder à vos données personnelles</ListItem>
        <ListItem>Rectifier vos données inexactes</ListItem>
        <ListItem>Demander l'effacement de vos données</ListItem>
        <ListItem>Limiter le traitement de vos données</ListItem>
        <ListItem>Vous opposer au traitement de vos données</ListItem>
        <ListItem>Demander la portabilité de vos données</ListItem>
        <ListItem>Introduire une réclamation auprès de la CNIL (cnil.fr)</ListItem>
      </List>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        7. Contact
      </Subtitle>

      <ContactInfo
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ContactTitle>Responsable du traitement :</ContactTitle>
        <ContactText><strong>Mattéo Rannou Le Texier</strong></ContactText>
        <ContactText>Entrepreneur individuel - SIREN : 932 455 504</ContactText>
        <ContactText>Adresse : 15 RUE Jules Ferry, 56460 Val d'Oust, FRANCE</ContactText>
        <ContactText>E-mail : contact@matteo-rlt.fr</ContactText>
        <ContactText>Site web : matteo-rlt.fr</ContactText>
      </ContactInfo>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, écrivez-moi à l'adresse e-mail mentionnée ci-dessus. Je réponds sous un mois maximum.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        8. Modifications
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cette politique de confidentialité peut être mise à jour périodiquement. Tout changement significatif sera publié sur cette page.
      </Paragraph>

      <LastUpdate
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dernière mise à jour : 27 octobre 2026
      </LastUpdate>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;
