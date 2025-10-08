import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(74, 144, 226, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4a90e2;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #357abd;
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  transition: all 0.3s ease;
  
  ${Logo}:hover & {
    transform: scale(1.05);
  }
`;

const LogoText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  &:hover {
    color: #4a90e2;
    background: rgba(74, 144, 226, 0.1);
  }

  &.active {
    color: #4a90e2;
    background: rgba(74, 144, 226, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #4a90e2;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after,
  &.active::after {
    width: 80%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(15, 15, 35, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(74, 144, 226, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  gap: 1rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover,
  &.active {
    color: #4a90e2;
    background: rgba(74, 144, 226, 0.1);
  }
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/projects', label: 'Projets' },
    { path: '/skills', label: 'Compétences' },
    { path: '/quote', label: 'Devis' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: scrolled 
          ? 'rgba(15, 15, 35, 0.98)' 
          : 'rgba(15, 15, 35, 0.95)'
      }}
    >
      <NavContent>
        <Logo to="/">
          <LogoImage 
            src="/logos/logo_dark.png" 
            alt="Logo Mattéo Rannou Le Texier"
          />
          <LogoText>Portfolio</LogoText>
        </Logo>
        
        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </NavContent>

      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </MobileNavLink>
          ))}
        </MobileMenu>
      )}
    </NavContainer>
  );
};

export default Navbar; 