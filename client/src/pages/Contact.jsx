import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import ContactForm from '../components/ContactForm.jsx';

const ContactContainer = styled.div`
  min-height: 100dvh;
  padding: 6.5rem var(--page-pad-x) max(2.5rem, var(--page-pad-b));
  padding-right: var(--page-pad-r);
  padding-top: max(6.5rem, calc(var(--nav-h) + 1.5rem + env(safe-area-inset-top, 0px)));
  max-width: 1120px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 7.5rem 2rem 4rem;
    padding-top: 7.5rem;
  }
`;

const Title = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 0.75rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.05rem;
  color: var(--color-muted);
  margin-bottom: 2.5rem;
  max-width: 520px;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: start;

  @media (min-width: 900px) {
    grid-template-columns: 0.9fr 1.15fr;
    gap: 3rem;
  }
`;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const AsideCard = styled.div`
  padding: 1.25rem 1.35rem;
  border-radius: 14px;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

const AsideLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1rem;
  color: var(--color-text);

  svg {
    color: var(--color-accent);
    flex-shrink: 0;
  }

  &:hover {
    color: var(--color-accent);
  }
`;

const FormPanel = styled.div`
  padding: 2rem;
  border-radius: 16px;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const BackLink = styled(Link)`
  display: inline-block;
  font-size: 0.9rem;
  color: var(--color-muted);
  margin-bottom: 1.5rem;

  &:hover {
    color: var(--color-accent);
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <SEO
        title="Contact | Mattéo Rannou Le Texier — Développeur freelance"
        description="Écrivez-moi pour votre projet web : vitrine, e-commerce ou application. Réponse sous 48 h ouvrées."
        url="https://matteo-rlt.fr/contact"
        image="/logos/og-image.jpg"
      />
      <BackLink to="/">← Retour à l’accueil</BackLink>
      <Title initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        Contact
      </Title>
      <Subtitle initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
        Un brief, une question sur une mission ou un partenariat long terme — envoyez un message.
      </Subtitle>

      <Grid>
        <Aside>
          <AsideCard>
            <AsideLink href="mailto:contact@matteo-rlt.fr">
              <FiMail aria-hidden size={20} />
              contact@matteo-rlt.fr
            </AsideLink>
          </AsideCard>
          <AsideCard>
            <AsideLink href="https://linkedin.com/in/matteo-rlt" target="_blank" rel="noopener noreferrer">
              <FiLinkedin aria-hidden size={20} />
              Profil LinkedIn
            </AsideLink>
          </AsideCard>
        </Aside>
        <FormPanel>
          <ContactForm idPrefix="page-contact" />
        </FormPanel>
      </Grid>
    </ContactContainer>
  );
};

export default Contact;
