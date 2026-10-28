import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiArrowUp } from 'react-icons/fi';
import { darkTokens } from './ui.jsx';

const FooterContainer = styled.footer`
  ${darkTokens}
  position: relative;
  overflow: hidden;
  background: var(--color-bg);
  color: var(--color-text);
  padding: clamp(4rem, 9vw, 6.5rem) 0 max(1.75rem, env(safe-area-inset-bottom));
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--page-pad-r) 0 var(--page-pad-x);
`;

const Top = styled.div`
  display: grid;
  gap: 2rem;
  padding-bottom: clamp(3rem, 7vw, 4.5rem);
  border-bottom: 1px solid var(--color-line);

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }
`;

const Giant = styled(Link)`
  display: block;
  font-family: var(--font-display);
  font-size: clamp(3rem, 9.5vw, 8rem);
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: 0.88;
  color: var(--color-text);

  span {
    color: var(--lime);
  }

  &:hover span {
    text-decoration: underline;
    text-decoration-thickness: 0.06em;
    text-underline-offset: 0.08em;
  }
`;

const CtaCircle = styled(Link)`
  display: grid;
  place-items: center;
  width: clamp(120px, 14vw, 168px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--lime);
  color: var(--ink);
  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
  line-height: 1.2;
  transition: transform 0.5s var(--ease-out);

  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
  }

  &:hover {
    transform: scale(1.06) rotate(-6deg);
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2.25rem 1.5rem;
  grid-template-columns: 1fr 1fr;
  padding: clamp(2.5rem, 6vw, 3.5rem) 0;

  @media (min-width: 900px) {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;

  &:first-child {
    grid-column: 1 / -1;

    @media (min-width: 900px) {
      grid-column: auto;
    }
  }
`;

const Label = styled.p`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.45rem;
`;

const linkStyles = `
  color: var(--color-text);
  font-size: 0.95rem;
  background: none;
  padding: 0;
  text-align: left;
  background-image: linear-gradient(var(--lime), var(--lime));
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.4s var(--ease-out), color 0.3s var(--ease-out);

  &:hover {
    color: var(--lime);
    background-size: 100% 1px;
  }
`;

const FooterLink = styled(Link)`
  ${linkStyles}
`;

const FooterAnchor = styled.a`
  ${linkStyles}
`;

const CookieButton = styled.button`
  ${linkStyles}
`;

const Text = styled.p`
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 22rem;
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-line);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
`;

const BackTop = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--color-text);

  &:hover {
    color: var(--lime);
  }
`;

const Watermark = styled.p`
  pointer-events: none;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(5rem, 24vw, 22rem);
  letter-spacing: -0.08em;
  line-height: 0.75;
  color: transparent;
  -webkit-text-stroke: 1px rgba(243, 241, 236, 0.07);
  position: absolute;
  bottom: -0.12em;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  user-select: none;
`;

const Footer = () => {
  const { pathname } = useLocation();

  /* Sur l’accueil, on défile directement (le hash peut déjà être dans l’URL). */
  const onAnchor = (id) => (e) => {
    if (pathname !== '/') return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.history.replaceState(null, '', `#${id}`);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <FooterContainer>
      <Inner>
        <Top>
          <Giant to="/#contact" onClick={onAnchor('contact')}>
            Un projet
            <br />
            en tête <span>?</span>
          </Giant>
          <CtaCircle to="/#contact" onClick={onAnchor('contact')} aria-label="Demander un devis gratuit">
            <span>
              <FiArrowUpRight aria-hidden size={26} />
              Devis
              <br />
              gratuit
            </span>
          </CtaCircle>
        </Top>

        <Grid>
          <Col>
            <Label>Mattéo Rannou Le Texier</Label>
            <Text>
              Développeur web freelance à Vannes (Morbihan) : création de sites vitrine, e-commerce et applications
              web pour les entreprises de Bretagne et de toute la France.
            </Text>
            <Text>Entrepreneur individuel · SIREN 932 455 504</Text>
          </Col>
          <Col>
            <Label>Navigation</Label>
            <FooterLink to="/#realisations" onClick={onAnchor('realisations')}>Réalisations</FooterLink>
            <FooterLink to="/#services" onClick={onAnchor('services')}>Services</FooterLink>
            <FooterLink to="/#methode" onClick={onAnchor('methode')}>Méthode</FooterLink>
            <FooterLink to="/#faq" onClick={onAnchor('faq')}>Questions fréquentes</FooterLink>
            <FooterLink to="/#contact" onClick={onAnchor('contact')}>Contact</FooterLink>
          </Col>
          <Col>
            <Label>Contact</Label>
            <FooterAnchor href="mailto:contact@matteo-rlt.fr">contact@matteo-rlt.fr</FooterAnchor>
            <FooterAnchor href="https://linkedin.com/in/matteo-rlt" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </FooterAnchor>
            <FooterAnchor href="https://github.com/matteorlt" target="_blank" rel="noopener noreferrer">
              GitHub
            </FooterAnchor>
            <Text>Vannes, Bretagne</Text>
          </Col>
          <Col>
            <Label>Légal</Label>
            <FooterLink to="/legal-notices">Mentions légales</FooterLink>
            <FooterLink to="/privacy-policy">Confidentialité</FooterLink>
            <CookieButton type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-consent'))}>
              Gérer les cookies
            </CookieButton>
          </Col>
        </Grid>

        <Bottom>
          <span>© {new Date().getFullYear()} Mattéo Rannou Le Texier — Conçu et codé à la main, en Bretagne.</span>
          <BackTop href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Haut de page <FiArrowUp aria-hidden />
          </BackTop>
        </Bottom>
      </Inner>
      <Watermark aria-hidden>Mattéo</Watermark>
    </FooterContainer>
  );
};

export default Footer;
