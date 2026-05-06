import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: var(--color-surface);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 2.5rem 0 max(2rem, env(safe-area-inset-bottom));
  margin-top: 0;
`;

const FooterContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  align-items: start;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    text-align: center;
    justify-items: center;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const FooterTitle = styled.h3`
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
`;

const FooterLink = styled(Link)`
  color: var(--color-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent);
  }
`;

const FooterAnchor = styled.a`
  color: var(--color-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent);
  }
`;

const FooterText = styled.p`
  color: var(--color-muted);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
`;

const FooterBottom = styled(motion.div)`
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 2rem;
  padding-top: 1.25rem;
  text-align: center;
`;

const Copyright = styled.p`
  color: #737373;
  font-size: 0.8rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Mattéo Rannou Le Texier</FooterTitle>
          <FooterText>Développeur web freelance — sites & applications</FooterText>
          <FooterText>Entrepreneur individuel · SIREN 932 455 504</FooterText>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Navigation</FooterTitle>
          <FooterAnchor href="/#services">Services</FooterAnchor>
          <FooterAnchor href="/#realisations">Réalisations</FooterAnchor>
          <FooterAnchor href="/#contact">Contact</FooterAnchor>
          <FooterLink to="/offres">Devis & offres</FooterLink>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Légal</FooterTitle>
          <FooterLink to="/privacy-policy">Politique de confidentialité</FooterLink>
          <FooterLink to="/legal-notices">Mentions légales</FooterLink>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Contact</FooterTitle>
          <FooterText>
            <FooterAnchor href="mailto:contact@matteo-rlt.fr">contact@matteo-rlt.fr</FooterAnchor>
          </FooterText>
          <FooterText>Vannes, France</FooterText>
        </FooterSection>
      </FooterContent>

      <FooterBottom
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        viewport={{ once: true }}
      >
        <Copyright>© {new Date().getFullYear()} Mattéo Rannou Le Texier. Tous droits réservés.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
