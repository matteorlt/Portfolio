import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import Magnetic from './Magnetic.jsx';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2100;
  padding-top: env(safe-area-inset-top, 0px);
  transition: background 0.4s var(--ease-out), border-color 0.4s var(--ease-out);
  border-bottom: 1px solid transparent;
`;

const NavContent = styled.div`
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--page-pad-x) 0 var(--page-pad-r);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--nav-h);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--color-text);
  text-decoration: none;
  z-index: 2;

  &:hover {
    color: var(--color-text);
  }
`;

const LogoImage = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 9px;
`;

const LogoText = styled.span`
  font-family: var(--font-display);
  font-size: 1.02rem;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.15rem;
  align-items: center;

  @media (max-width: 980px) {
    display: none;
  }
`;

const navItemStyles = `
  position: relative;
  color: var(--color-muted);
  text-decoration: none;
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.55rem 0.8rem;
  transition: color 0.25s var(--ease-out);

  &:hover {
    color: var(--color-text);
  }
`;

const NavLinkNative = styled.a`
  ${navItemStyles}
`;

const NavLinkRouter = styled(Link)`
  ${navItemStyles}
`;

const NavCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: 0.7rem;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: -0.02em;
  text-decoration: none;
  transition: filter 0.2s ease, transform 0.2s ease;

  &:hover {
    color: var(--color-accent-ink);
    filter: brightness(1.05);
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

const Burger = styled.button`
  display: none;
  position: relative;
  z-index: 2;
  width: 48px;
  height: 48px;
  background: transparent;
  color: var(--color-text);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;

  span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: currentColor;
    transition: transform 0.35s var(--ease-out), opacity 0.25s ease;
    transform-origin: center;
  }

  &[aria-expanded='true'] span:first-child {
    transform: translateY(3.75px) rotate(45deg);
  }

  &[aria-expanded='true'] span:last-child {
    transform: translateY(-3.75px) rotate(-45deg);
  }

  @media (max-width: 980px) {
    display: flex;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: #070706;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: calc(var(--nav-h) + env(safe-area-inset-top, 0px) + 1rem) var(--page-pad-x)
    calc(2rem + env(safe-area-inset-bottom, 0px));

  @media (min-width: 981px) {
    display: none;
  }
`;

const OverlayLink = styled(motion.a)`
  font-family: var(--font-display);
  font-size: clamp(2rem, 10vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  color: var(--color-text);
  padding: 0.35rem 0;
  display: flex;
  align-items: baseline;
  gap: 0.85rem;

  em {
    font-family: var(--font-mono);
    font-style: normal;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    color: var(--color-accent);
  }
`;

const OverlayCta = styled(Link)`
  margin-top: 1.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: fit-content;
  padding: 0.95rem 1.35rem;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  font-weight: 700;
  font-size: 1rem;

  &:hover {
    color: var(--color-accent-ink);
  }
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: scrolled || open ? 'rgba(7, 7, 6, 0.78)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(18px)' : 'none',
        borderBottomColor: scrolled ? 'var(--color-line)' : 'transparent'
      }}
    >
      <NavContent>
        <Logo to="/" aria-label="Accueil Mattéo Rannou Le Texier">
          <LogoImage
            src="/logos/logo_black-80.webp"
            alt=""
            width={36}
            height={36}
            loading="eager"
            decoding="async"
          />
          <LogoText>Mattéo RLT</LogoText>
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
          <Magnetic strength={0.22}>
            <NavCta to={isHome ? '#contact' : '/#contact'} onClick={(e) => isHome && handleAnchor(e, 'contact')}>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                {LINKS.map((l, i) => (
                  <OverlayLink
                    key={l.id}
                    href={isHome ? `#${l.id}` : `/#${l.id}`}
                    onClick={(e) => handleAnchor(e, l.id)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <em aria-hidden>{l.index}</em>
                    {l.label}
                  </OverlayLink>
                ))}
                <OverlayCta to={isHome ? '#contact' : '/#contact'} onClick={(e) => handleAnchor(e, 'contact')}>
                  Demander un devis gratuit
                  <FiArrowUpRight aria-hidden size={18} />
                </OverlayCta>
              </Overlay>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </NavContainer>
  );
};

export default Navbar;
