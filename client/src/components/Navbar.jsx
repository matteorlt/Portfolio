import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding-top: env(safe-area-inset-top, 0px);
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const NavContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 max(1.25rem, env(safe-area-inset-left, 0px)) 0 max(1.25rem, env(safe-area-inset-right, 0px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 72px;
  height: auto;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 3.5vw, 1.15rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent);
  }

  @media (max-width: 360px) {
    gap: 0.4rem;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 10px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const navItemStyles = `
  position: relative;
  color: var(--color-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--color-text);
    background: rgba(255, 255, 255, 0.04);
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
  gap: 0.4rem;
  margin-left: 0.75rem;
  padding: 0.55rem 1.1rem;
  border-radius: 9px;
  background: var(--color-accent);
  color: #0a0a0a;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: filter 0.2s ease;

  &:hover {
    color: #0a0a0a;
    filter: brightness(1.06);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: calc(72px + env(safe-area-inset-top, 0px));
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  padding: 1rem max(1.25rem, env(safe-area-inset-left)) max(1.25rem, env(safe-area-inset-bottom)) max(1.25rem, env(safe-area-inset-right));
  gap: 0.35rem;
  max-height: min(
    calc(100dvh - 72px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)),
    420px
  );
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.05rem;
  padding: 0.85rem 1rem;
  min-height: 48px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  transition: background 0.2s ease;

  &:hover,
  &:active {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const MobileCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin-top: 0.5rem;
  padding: 0.9rem 1rem;
  min-height: 50px;
  border-radius: 10px;
  background: var(--color-accent);
  color: #0a0a0a;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;

  &:hover {
    color: #0a0a0a;
    filter: brightness(1.05);
  }
`;

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
      return undefined;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const handleAnchor = (e, id) => {
    if (isHome) {
      e.preventDefault();
      scrollToId(id);
    }
  };

  const servicesHref = isHome ? '#services' : '/#services';
  const realHref = isHome ? '#realisations' : '/#realisations';
  const contactHref = isHome ? '#contact' : '/#contact';

  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'rgba(10, 10, 10, 0.85)'
      }}
    >
      <NavContent>
        <Logo to="/" aria-label="Accueil Mattéo Rannou Le Texier">
          <LogoImage
            src="/logos/logo_black.jpg"
            alt=""
            width={40}
            height={40}
            loading="eager"
            decoding="async"
          />
          Mattéo RLT
        </Logo>

        <NavLinks>
          {isHome ? (
            <>
              <NavLinkNative href="#services" onClick={(e) => handleAnchor(e, 'services')}>
                Services
              </NavLinkNative>
              <NavLinkNative href="#realisations" onClick={(e) => handleAnchor(e, 'realisations')}>
                Réalisations
              </NavLinkNative>
              <NavLinkNative href="#contact" onClick={(e) => handleAnchor(e, 'contact')}>
                Contact
              </NavLinkNative>
            </>
          ) : (
            <>
              <NavLinkRouter to="/#services">Services</NavLinkRouter>
              <NavLinkRouter to="/#realisations">Réalisations</NavLinkRouter>
              <NavLinkRouter to="/#contact">Contact</NavLinkRouter>
            </>
          )}
          <NavCta to={isHome ? '#contact' : '/#contact'} onClick={(e) => isHome && handleAnchor(e, 'contact')}>
            Discutons
            <FiArrowRight aria-hidden size={16} />
          </NavCta>
        </NavLinks>

        <MobileMenuButton type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-expanded={isMobileMenuOpen} aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </NavContent>

      {isMobileMenuOpen && (
        <MobileMenu initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <MobileNavLink href={servicesHref} onClick={(e) => { handleAnchor(e, 'services'); setIsMobileMenuOpen(false); }}>
            Services
          </MobileNavLink>
          <MobileNavLink href={realHref} onClick={(e) => { handleAnchor(e, 'realisations'); setIsMobileMenuOpen(false); }}>
            Réalisations
          </MobileNavLink>
          <MobileNavLink href={contactHref} onClick={(e) => { handleAnchor(e, 'contact'); setIsMobileMenuOpen(false); }}>
            Contact
          </MobileNavLink>
          <MobileCta to={contactHref} onClick={(e) => { handleAnchor(e, 'contact'); setIsMobileMenuOpen(false); }}>
            Me contacter
            <FiArrowRight aria-hidden size={16} />
          </MobileCta>
        </MobileMenu>
      )}
    </NavContainer>
  );
};

export default Navbar;
