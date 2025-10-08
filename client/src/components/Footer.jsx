import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: rgba(15, 15, 35, 0.95);
  border-top: 1px solid rgba(74, 144, 226, 0.1);
  padding: 2rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: #4a90e2;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: #cccccc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    color: #4a90e2;
    transform: translateX(5px);
  }
`;

const FooterText = styled.p`
  color: #aaaaaa;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(74, 144, 226, 0.1);
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
`;

const Copyright = styled.p`
  color: #666666;
  font-size: 0.8rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Mattéo RANNOU-LE TEXIER</FooterTitle>
          <FooterText>Développeur Web & Web Mobile</FooterText>
          <FooterText>Entrepreneur individuel</FooterText>
          <FooterText>SIREN : 932 455 504</FooterText>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Services</FooterTitle>
          <FooterLink to="/quote">Demander un devis</FooterLink>
          <FooterLink to="/projects">Mes projets</FooterLink>
          <FooterLink to="/skills">Compétences</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Informations légales</FooterTitle>
          <FooterLink to="/privacy-policy">Politique de confidentialité</FooterLink>
          <FooterLink to="/legal-notices">Mentions légales</FooterLink>
          <FooterText>Conformité RGPD</FooterText>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Contact</FooterTitle>
          <FooterText>📧 contact@matteo-rlt.fr</FooterText>
          <FooterText>🌐 matteo-rlt.fr</FooterText>
          <FooterText>📍 Rennes, France</FooterText>
        </FooterSection>
      </FooterContent>

      <FooterBottom
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Copyright>
          © {new Date().getFullYear()} Mattéo RANNOU-LE TEXIER. Tous droits réservés.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
