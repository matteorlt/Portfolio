import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFoundContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: max(6rem, calc(var(--nav-h) + 1.5rem + env(safe-area-inset-top, 0px))) var(--page-pad-x)
    max(2rem, var(--page-pad-b));
  padding-right: var(--page-pad-r);
`;

const NotFoundContent = styled(motion.div)`
  max-width: 640px;
  width: 100%;
`;

const Code = styled(motion.p)`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(5rem, 18vw, 9rem);
  line-height: 0.85;
  color: var(--color-accent);
  margin-bottom: 1rem;
`;

const NotFoundTitle = styled(motion.h1)`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 0.75rem;
`;

const NotFoundMessage = styled(motion.p)`
  font-size: 1.05rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 2rem;
  max-width: 28rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2.25rem;
`;

const ActionButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  min-height: 48px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;

  &.primary {
    background: var(--color-accent);
    color: var(--color-accent-ink);
  }

  &.secondary {
    background: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-line);
  }
`;

const LinksList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1.25rem;
`;

const LinkItem = styled.a`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
`;

const NotFound = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/#services', label: 'Services' },
    { path: '/#realisations', label: 'Réalisations' },
    { path: '/#offres', label: 'Offres' },
    { path: '/#contact', label: 'Contact' }
  ];

  return (
    <NotFoundContainer>
      <NotFoundContent initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <Code>404</Code>
        <NotFoundTitle>Page introuvable</NotFoundTitle>
        <NotFoundMessage>
          Cette page n’existe pas — ou elle a changé d’adresse. Revenez à l’accueil, ou sautez directement à une
          section.
        </NotFoundMessage>

        <ButtonGroup>
          <ActionButton className="primary" onClick={() => navigate('/')} whileTap={{ scale: 0.98 }}>
            <FiHome aria-hidden />
            Accueil
          </ActionButton>
          <ActionButton className="secondary" onClick={() => navigate(-1)} whileTap={{ scale: 0.98 }}>
            <FiArrowLeft aria-hidden />
            Retour
          </ActionButton>
        </ButtonGroup>

        <LinksList>
          {quickLinks.map((link) => (
            <LinkItem
              key={link.path}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(link.path);
              }}
            >
              {link.label}
            </LinkItem>
          ))}
        </LinksList>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;
