import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import Magnetic from './Magnetic.jsx';
import { darkTokens } from './ui.jsx';

const NavContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2100;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) var(--page-pad-r) 0 var(--page-pad-x);
  pointer-events: none;
`;

const NavContent = styled.nav`
  pointer-events: auto;
  max-width: var(--max);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  min-height: calc(var(--nav-h) - 20px);
  padding: 0 0.5rem 0 0.55rem;
  border-radius: 999px;
  border: 1px solid transparent;
  transition:
    background 0.45s var(--ease-out),
    border-color 0.45s var(--ease-out),
    box-shadow 0.45s var(--ease-out),
    padding 0.45s var(--ease-out);

  &[data-scrolled='true'] {
    background: rgba(243, 241, 236, 0.78);
    -webkit-backdrop-filter: blur(18px) saturate(1.4);
    backdrop-filter: blur(18px) saturate(1.4);
    border-color: var(--color-line);
    box-shadow: 0 10px 40px -18px rgba(15, 15, 13, 0.35);
  }

  &[data-open='true'] {
    ${darkTokens}
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--color-text);
  z-index: 2;
`;

const LogoImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: var(--ink);
`;

const LogoText = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.05;

  strong {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  small {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.1rem;
  align-items: center;

  @media (max-width: 980px) {
    display: none;
  }
`;

const navItemStyles = `
  position: relative;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  transition: background 0.25s var(--ease-out);

  &:hover {
    background: rgba(15, 15, 13, 0.06);
  }
`;

const NavLinkNative = styled.a`
  ${navItemStyles}
`;

const NavLinkRouter = styled(Link)`
  ${navItemStyles}
`;

const NavCta = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.5rem;
  min-height: 44px;
  padding: 0 1.15rem;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-weight: 600;
  font-size: 0.9rem;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--lime);
    transform: translateY(101%);
    transition: transform 0.4s var(--ease-out);
  }

  &:hover {
    color: var(--ink);
  }

  &:hover::before {
    transform: translateY(0);
  }
`;

const Live = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--lime);
  box-shadow: 0 0 0 3px rgba(212, 255, 63, 0.25);
`;

const Burger = styled.button`
  display: none;
  position: relative;
  z-index: 2;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;

  span {
    display: block;
    width: 18px;
    height: 1.5px;
    background: currentColor;
    transition: transform 0.35s var(--ease-out);
    transform-origin: center;
  }

  &[aria-expanded='true'] {
    background: var(--lime);
    color: var(--ink);
  }

  &[aria-expanded='true'] span:first-child {
    transform: translateY(3.25px) rotate(45deg);
  }

  &[aria-expanded='true'] span:last-child {
    transform: translateY(-3.25px) rotate(-45deg);
  }

  @media (max-width: 980px) {
    display: flex;
  }
`;

const Overlay = styled(motion.div)`
  ${darkTokens}
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: var(--color-bg);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: calc(var(--nav-h) + env(safe-area-inset-top, 0px) + 1.5rem) var(--page-pad-r)
    calc(2rem + env(safe-area-inset-bottom, 0px)) var(--page-pad-x);

  @media (min-width: 981px) {
    display: none;
  }
`;

const OverlayLink = styled(motion.a)`
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 12vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.02;
  color: var(--color-text);
  padding: 0.3rem 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-line);

  em {
    font-family: var(--font-mono);
    font-style: normal;
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: var(--color-muted);
  }
`;

const OverlayCta = styled(motion.create(Link))`
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 56px;
  border-radius: 999px;
  background: var(--lime);
  color: var(--ink);
  font-weight: 700;
  font-size: 1.05rem;
`;

const OverlayMeta = styled.p`
  margin-top: 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--color-muted);
`;

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const LINKS = [
  { id: 'realisations', label: 'Réalisations', index: '01' },
  { id: 'services', label: 'Services', index: '02' },
  { id: 'methode', label: 'Méthode', index: '03' },
  { id: 'faq', label: 'FAQ', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return undefined;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleAnchor = (e, id) => {
    if (isHome) {
      e.preventDefault();
      scrollToId(id);
    }
    setOpen(false);
  };

  return (
    <NavContainer
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <NavContent aria-label="Navigation principale" data-scrolled={scrolled && !open} data-open={open}>
        <Logo to="/" aria-label="Accueil — Mattéo Rannou Le Texier, développeur web">
          <LogoImage
            src="/logos/logo_black-80.webp"
            alt=""
            width={40}
            height={40}
            loading="eager"
            decoding="async"
          />
          <LogoText>
            <strong>Mattéo RLT</strong>
            <small>Développeur web · Vannes</small>
          </LogoText>
        </Logo>

        <NavLinks>
          {LINKS.map((l) =>
            isHome ? (
              <NavLinkNative key={l.id} href={`#${l.id}`} onClick={(e) => handleAnchor(e, l.id)}>
                {l.label}
              </NavLinkNative>
            ) : (
              <NavLinkRouter key={l.id} to={`/#${l.id}`}>
                {l.label}
              </NavLinkRouter>
            )
          )}
          <Magnetic strength={0.2}>
            <NavCta to={isHome ? '#contact' : '/#contact'} onClick={(e) => isHome && handleAnchor(e, 'contact')}>
              <Live aria-hidden />
              Devis gratuit
              <FiArrowUpRight aria-hidden size={15} />
            </NavCta>
          </Magnetic>
        </NavLinks>

        <Burger
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span />
          <span />
        </Burger>
      </NavContent>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open ? (
              <Overlay
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navigation"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                exit={{ clipPath: 'inset(0 0 100% 0)' }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              >
                {LINKS.map((l, i) => (
                  <OverlayLink
                    key={l.id}
                    href={isHome ? `#${l.id}` : `/#${l.id}`}
                    onClick={(e) => handleAnchor(e, l.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.18 + 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l.label}
                    <em aria-hidden>{l.index}</em>
                  </OverlayLink>
                ))}
                <OverlayCta
                  to={isHome ? '#contact' : '/#contact'}
                  onClick={(e) => handleAnchor(e, 'contact')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  Demander un devis gratuit
                  <FiArrowUpRight aria-hidden size={18} />
                </OverlayCta>
                <OverlayMeta>contact@matteo-rlt.fr — Réponse sous 24 h</OverlayMeta>
              </Overlay>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </NavContainer>
  );
};

export default Navbar;
