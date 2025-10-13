import React, { useRef, useState, useCallback } from 'react';
import ParticlesBackground from '../components/ParticlesBackground.jsx';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import StructuredData from '../components/StructuredData.jsx';

// Fond 3D Three.js retiré: tsParticles est utilisé en arrière-plan global

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: auto;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 100vh;
  pointer-events: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-top: 100px;
  }
`;

const TextContent = styled(motion.div)`
  color: #ffffff;
  pointer-events: auto;
`;

const Greeting = styled(motion.h2)`
  font-size: 1.2rem;
  color: #4a90e2;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled(motion.h3)`
  font-size: 1.5rem;
  color: #cccccc;
  margin-bottom: 2rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #aaaaaa;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  outline: none;
  pointer-events: auto;

  &.primary {
    background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
    }
  }

  &.secondary {
    background: transparent;
    color: #4a90e2;
    border: 2px solid #4a90e2;
    
    &:hover {
      background: rgba(74, 144, 226, 0.1);
      transform: translateY(-2px);
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(74, 144, 226, 0.2);
  pointer-events: auto;

  &:hover {
    background: #4a90e2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
  }
`;

const CanvasContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;



const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <SEO 
        title="Mattéo Rannou Le Texier - Développeur Web & Web Mobile | Portfolio"
        description="Portfolio de Mattéo Rannou Le Texier - Développeur Web & Web Mobile spécialisé en React, Java, PHP et JavaScript. Découvrez mes projets et compétences en développement."
        keywords="développeur web, React, JavaScript, Java, PHP, portfolio, Mattéo Rannou Le Texier, développement web, développement mobile"
        url="https://matteo-rlt.fr"
      />
      <StructuredData />
    <HomeContainer>
      <BackgroundCanvas>
        <ParticlesBackground />
      </BackgroundCanvas>

      <Content>
        <TextContent>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Bonjour, je suis
          </Greeting>
          
          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Mattéo
          </Name>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Développeur Web & Web Mobile
          </Title>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Passionné par le développement web et mobile. 
            Spécialisé en React et JS/TS/Node.js pour créer 
            des applications modernes et performantes.
          </Description>
          
          <ButtonsContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button className="primary" as="a" href="/cv/matteo-rannou-le-texier-cv.pdf" download>
              <FiDownload style={{ marginRight: '0.5rem' }} />
              Télécharger mon CV (PDF)
            </Button>
            <Button className="secondary" onClick={() => navigate('/projects')}>
              Voir mes projets
            </Button>
          </ButtonsContainer>
          
          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <SocialLink href="https://github.com/matteorlt" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/matteo-rlt" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </SocialLink>
            <SocialLink href="mailto:rannouletexiermatteo@gmail.com">
              <FiMail />
            </SocialLink>
          </SocialLinks>
        </TextContent>
      </Content>
    </HomeContainer>
    </>
  );
};

export default Home; 