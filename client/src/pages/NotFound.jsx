import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 2rem 2rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%);
`;

const NotFoundContent = styled(motion.div)`
  max-width: 600px;
  text-align: center;
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 16px;
  padding: 3rem 2rem;
`;

const NotFoundIcon = styled.div`
  font-size: 6rem;
  color: #4a90e2;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  opacity: 0.8;
`;

const NotFoundTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NotFoundSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const NotFoundMessage = styled(motion.p)`
  font-size: 1.1rem;
  color: #aaaaaa;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.primary {
    background: #4a90e2;
    color: white;

    &:hover {
      background: #357abd;
    }
  }

  &.secondary {
    background: transparent;
    color: #4a90e2;
    border: 1px solid #4a90e2;

    &:hover {
      background: rgba(74, 144, 226, 0.1);
    }
  }
`;

const LinksSection = styled(motion.div)`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(74, 144, 226, 0.1);
`;

const LinksTitle = styled.h3`
  font-size: 1.2rem;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

const LinkItem = styled(motion.a)`
  color: #cccccc;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #4a90e2;
    transform: translateX(5px);
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/projects', label: 'Projets' },
    { path: '/about', label: 'À propos' },
    { path: '/skills', label: 'Compétences' },
    { path: '/contact', label: 'Contact' },
    { path: '/offres', label: 'Offres' }
  ];

  return (
    <NotFoundContainer>
      <NotFoundContent
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <NotFoundIcon>
          <FiSearch />
        </NotFoundIcon>

        <NotFoundTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          404
        </NotFoundTitle>

        <NotFoundSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Page non trouvée
        </NotFoundSubtitle>

        <NotFoundMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          Vous pouvez retourner à l'accueil ou explorer nos autres pages.
        </NotFoundMessage>

        <ButtonGroup>
          <ActionButton
            className="primary"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHome />
            Retour à l'accueil
          </ActionButton>

          <ActionButton
            className="secondary"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft />
            Page précédente
          </ActionButton>
        </ButtonGroup>

        <LinksSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <LinksTitle>Pages disponibles</LinksTitle>
          <LinksList>
            {quickLinks.map((link, index) => (
              <LinkItem
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.path);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                {link.label}
              </LinkItem>
            ))}
          </LinksList>
        </LinksSection>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;

