import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PrivacyContainer = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a90e2;
  margin: 2rem 0 1rem 0;
`;

const Paragraph = styled(motion.p)`
  color: #cccccc;
  margin-bottom: 1rem;
  text-align: justify;
`;

const List = styled(motion.ul)`
  color: #cccccc;
  margin-bottom: 1rem;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ContactInfo = styled(motion.div)`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const ContactTitle = styled.h3`
  color: #4a90e2;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ContactText = styled.p`
  color: #cccccc;
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
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Politique de Confidentialité
      </Title>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Cette politique de confidentialité décrit comment Mattéo RANNOU-LE TEXIER collecte, utilise et protège vos informations personnelles lorsque vous utilisez ce site web.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        1. Collecte d'informations
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Nous collectons les informations suivantes :
      </Paragraph>

      <List
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <ListItem>Informations que vous nous fournissez directement (nom, prénom, email, téléphone, entreprise)</ListItem>
        <ListItem>Informations collectées automatiquement (adresse IP, type de navigateur, pages visitées)</ListItem>
        <ListItem>Cookies et technologies similaires pour améliorer votre expérience</ListItem>
      </List>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        2. Utilisation des informations
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Nous utilisons vos informations pour :
      </Paragraph>

      <List
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <ListItem>Répondre à vos demandes de devis et de contact</ListItem>
        <ListItem>Améliorer notre site web et nos services</ListItem>
        <ListItem>Vous envoyer des informations sur nos services (avec votre consentement)</ListItem>
        <ListItem>Respecter nos obligations légales</ListItem>
      </List>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        3. Partage des informations
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers, sauf dans les cas suivants :
      </Paragraph>

      <List
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <ListItem>Avec votre consentement explicite</ListItem>
        <ListItem>Pour respecter une obligation légale</ListItem>
        <ListItem>Pour protéger nos droits et notre sécurité</ListItem>
        <ListItem>Avec nos prestataires de services (hébergement, email) sous contrat de confidentialité</ListItem>
      </List>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        4. Sécurité des données
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        5. Cookies
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités du site.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        6. Vos droits
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.7 }}
      >
        Conformément au RGPD, vous avez le droit de :
      </Paragraph>

      <List
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <ListItem>Accéder à vos données personnelles</ListItem>
        <ListItem>Rectifier vos données inexactes</ListItem>
        <ListItem>Demander l'effacement de vos données</ListItem>
        <ListItem>Limiter le traitement de vos données</ListItem>
        <ListItem>Vous opposer au traitement de vos données</ListItem>
        <ListItem>Portabilité de vos données</ListItem>
      </List>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.9 }}
      >
        7. Contact
      </Subtitle>

      <ContactInfo
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        <ContactTitle>Responsable du traitement :</ContactTitle>
        <ContactText><strong>Mattéo RANNOU-LE TEXIER</strong></ContactText>
        <ContactText>Entrepreneur individuel - SIREN : 932 455 504</ContactText>
        <ContactText>Adresse : 15 RUE Jules Ferry, 56460 Val d'Oust, FRANCE</ContactText>
        <ContactText>Email : contact@matteo-rlt.fr</ContactText>
        <ContactText>Site web : matteo-rlt.fr</ContactText>
      </ContactInfo>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.1 }}
      >
        Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter à l'adresse email mentionnée ci-dessus.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        8. Modifications
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.3 }}
      >
        Cette politique de confidentialité peut être mise à jour périodiquement. Nous vous informerons de tout changement significatif en publiant la nouvelle politique sur cette page.
      </Paragraph>

      <LastUpdate
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.4 }}
      >
        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
      </LastUpdate>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;
