import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const FooterContainer = styled.footer`
  position: relative;
  overflow: hidden;
  background: var(--color-bg-2);
  border-top: 1px solid var(--color-line);
  padding: clamp(3.5rem, 8vw, 5.5rem) 0 max(2rem, env(safe-area-inset-bottom));
`;

const Inner = styled.div`
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--page-pad-x) 0 var(--page-pad-r);
`;

const Giant = styled(motion.a)`
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 8vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 0.95;
  color: var(--color-text);
  margin-bottom: 0.35rem;

  span {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    color: var(--color-accent);
  }

  &:hover {
    color: var(--color-text);
  }
`;

const Mail = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: clamp(1.05rem, 2.4vw, 1.45rem);
  color: var(--color-muted);
  margin-bottom: clamp(2.5rem, 6vw, 4rem);

  &:hover {
    color: var(--color-accent);
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem 1.5rem;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--color-line);

  @media (min-width: 800px) {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
`;

const Col = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const Label = styled.p`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.4rem;
`;

const FooterLink = styled(Link)`
  color: var(--color-muted);
  font-size: 0.92rem;
`;

const FooterAnchor = styled.a`
  color: var(--color-muted);
  font-size: 0.92rem;
`;

const Text = styled.p`
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.55;
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 1.35rem;
  color: #6e6b64;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
`;

const Watermark = styled.p`
  pointer-events: none;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(4.5rem, 18vw, 14rem);
  letter-spacing: -0.07em;
  line-height: 0.8;
  color: transparent;
  -webkit-text-stroke: 1px rgba(242, 238, 230, 0.06);
  position: absolute;
  bottom: -0.22em;
  left: var(--page-pad-x);
  white-space: nowrap;
  user-select: none;
`;

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
};

const Footer = () => {
  return (
    <FooterContainer>
      <Inner>
        <Giant href="/#contact" {...fade}>
          Un projet <span>en tête ?</span>
        </Giant>
        <Mail href="mailto:contact@matteo-rlt.fr" {...fade}>
          contact@matteo-rlt.fr
          <FiArrowUpRight aria-hidden />
        </Mail>

        <Grid>
          <Col {...fade}>
            <Label>Studio</Label>
            <Text>Mattéo Rannou Le Texier</Text>
            <Text>Développeur web freelance — sites & applications</Text>
            <Text>Entrepreneur individuel · SIREN 932 455 504</Text>
          </Col>
          <Col {...fade} transition={{ ...fade.transition, delay: 0.06 }}>
            <Label>Navigation</Label>
            <FooterAnchor href="/#services">Services</FooterAnchor>
            <FooterAnchor href="/#realisations">Réalisations</FooterAnchor>
            <FooterAnchor href="/#offres">Devis & offres</FooterAnchor>
            <FooterAnchor href="/#contact">Contact</FooterAnchor>
          </Col>
          <Col {...fade} transition={{ ...fade.transition, delay: 0.1 }}>
            <Label>Légal</Label>
            <FooterLink to="/privacy-policy">Confidentialité</FooterLink>
            <FooterLink to="/legal-notices">Mentions légales</FooterLink>
          </Col>
          <Col {...fade} transition={{ ...fade.transition, delay: 0.14 }}>
            <Label>Contact</Label>
            <FooterAnchor href="mailto:contact@matteo-rlt.fr">contact@matteo-rlt.fr</FooterAnchor>
            <FooterAnchor href="https://linkedin.com/in/matteo-rlt" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </FooterAnchor>
            <Text>Vannes, France</Text>
          </Col>
        </Grid>

        <Bottom>
          <span>© {new Date().getFullYear()} Mattéo Rannou Le Texier</span>
          <span>Tous droits réservés</span>
        </Bottom>
      </Inner>
      <Watermark aria-hidden>MATTÉO</Watermark>
    </FooterContainer>
  );
};

export default Footer;
