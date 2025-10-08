import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LegalContainer = styled.div`
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

const CompanyInfo = styled(motion.div)`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const InfoTitle = styled.h3`
  color: #4a90e2;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  color: #cccccc;
  margin-bottom: 0.5rem;
`;

const LastUpdate = styled(motion.p)`
  color: #aaaaaa;
  font-style: italic;
  text-align: center;
  margin-top: 3rem;
`;

const LegalNotices = () => {
  return (
    <LegalContainer>
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mentions Légales
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        1. Éditeur du site
      </Subtitle>

      <CompanyInfo
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        2. Coordonnées
      </Subtitle>

      <CompanyInfo
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
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
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        3. Activité
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <strong>Activité principale :</strong> Développeur web, Création de site internet, Design/Programmation/Maintenance des sites
      </Paragraph>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <strong>Autres activités :</strong> Influenceur, Publicités, Sponsors, Abonnement, Placement de Produits, Affiliation
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        4. Hébergement
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        Ce site est hébergé par un prestataire de services d'hébergement web professionnel. Les données sont stockées de manière sécurisée conformément aux standards de l'industrie.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        5. Propriété intellectuelle
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) est la propriété exclusive de Mattéo RANNOU-LE TEXIER ou de ses partenaires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord exprès par écrit de Mattéo RANNOU-LE TEXIER.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        6. Responsabilité
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
      </Paragraph>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, à l'adresse contact@matteo-rlt.fr, en décrivant le problème de la manière la plus précise possible.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        7. Liens hypertextes
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.7 }}
      >
        Ce site peut contenir des liens vers d'autres sites web. Nous ne sommes pas responsables du contenu de ces sites externes et ne pouvons garantir leur exactitude ou leur sécurité.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        8. Cookies
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.9 }}
      >
        Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant à utiliser ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        9. Droit applicable
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.1 }}
      >
        Le présent site et les modalités et conditions de son utilisation sont régis par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
      </Paragraph>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        10. Contact
      </Subtitle>

      <Paragraph
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.3 }}
      >
        Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse email : contact@matteo-rlt.fr
      </Paragraph>

      <LastUpdate
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.4 }}
      >
        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
      </LastUpdate>
    </LegalContainer>
  );
};

export default LegalNotices;
