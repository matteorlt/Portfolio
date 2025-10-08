import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiPause, FiVolume2, FiMaximize } from 'react-icons/fi';

const DemoContainer = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  border: 1px solid #4a90e2;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  align-self: flex-start;

  &:hover {
    background: #4a90e2;
    color: white;
    transform: translateY(-2px);
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #cccccc;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
`;

const VideoContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const PlayIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const PlaceholderText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const PlaceholderSubtext = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${VideoContainer}:hover & {
    opacity: 1;
  }
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.progress || 0}%;
    background: #4a90e2;
    border-radius: 2px;
    transition: width 0.1s ease;
  }
`;

const TimeDisplay = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ProjectInfo = styled(motion.div)`
  margin-top: 3rem;
  text-align: center;
  max-width: 600px;
`;

const ProjectDescription = styled.p`
  color: #aaaaaa;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TechTag = styled.span`
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &.primary {
    background: #4a90e2;
    color: white;

    &:hover {
      background: #357abd;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: transparent;
    color: #4a90e2;
    border: 1px solid #4a90e2;

    &:hover {
      background: rgba(74, 144, 226, 0.1);
      transform: translateY(-2px);
    }
  }
`;

// Données des projets
const projectsData = {
  'task-manager': {
    title: 'Task-Manager',
    description: 'Application de gestion de tâches développée en TypeScript avec authentification et interface moderne. Gestion complète des tâches avec Docker.',
    tech: ['TypeScript', 'React', 'Docker'],
    videoUrl: '/videos/Task Manager.mp4',
    codeUrl: 'https://github.com/matteorlt/Task-Manager'
  },
  'gym-phys': {
    title: 'Gym Phys',
    description: 'Site vitrine pour une association sportif de gym, développé en Wordpress.',
    tech: ['Wordpress', 'PHP'],
    videoUrl: null,
    codeUrl: 'https://github.com/matteorlt',
    demoUrl: 'https://www.gym-phys-ploermel.fr/'
  },
  'eni-enchere': {
    title: 'ENI-Enchère',
    description: 'Projet ENI - Système d\'enchères développé en Java. Application complète avec gestion des utilisateurs et des enchères.',
    tech: ['Java', 'JSP', 'Servlet'],
    videoUrl: null,
    codeUrl: 'https://github.com/matteorlt/ENI-Enchere'
  },
  'auth': {
    title: 'Auth',
    description: 'Système d\'authentification sécurisé développé en JavaScript. Gestion des sessions et protection des routes.',
    tech: ['JavaScript', 'Node.js', 'Express'],
    videoUrl: null,
    codeUrl: 'https://github.com/matteorlt/Auth'
  },
  'ticket-support-app': {
    title: 'Ticket Support App',
    description: 'Application de support client avec système de tickets. Interface intuitive pour la gestion des demandes.',
    tech: ['JavaScript', 'React', 'Node.js'],
    videoUrl: null,
    codeUrl: 'https://github.com/matteorlt/ticket-support-app'
  },
  'site-react-openclassroom': {
    title: 'Site React (OpenClassroom)',
    description: 'Projet Fils Rouge OpenClassroom - Site web moderne développé avec React et animations fluides.',
    tech: ['React', 'JavaScript', 'CSS'],
    videoUrl: null,
    codeUrl: 'https://github.com/matteorlt'
  },
  'jeu-memory': {
    title: 'Jeu Memory',
    description: 'Jeu Memory interactif développé en JavaScript. Interface moderne avec animations et système de score.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    videoUrl: null,
    codeUrl: 'https://github.com/matteorlt'
  }
};

const ProjectDemo = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData[projectId];

  if (!project) {
    return (
      <DemoContainer>
        <Title>Projet non trouvé</Title>
        <BackButton onClick={() => navigate('/projects')}>
          <FiArrowLeft />
          Retour aux projets
        </BackButton>
      </DemoContainer>
    );
  }

  return (
    <DemoContainer>
      <BackButton
        onClick={() => navigate('/projects')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiArrowLeft />
        Retour aux projets
      </BackButton>

      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {project.title}
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Démonstration du projet
      </Subtitle>

      <VideoContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {project.videoUrl ? (
          <Video controls muted>
            <source src={project.videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </Video>
        ) : (
          <VideoPlaceholder>
            <PlayIcon>
              <FiPlay />
            </PlayIcon>
            <PlaceholderText>Vidéo de démonstration</PlaceholderText>
            <PlaceholderSubtext>
              Ajoutez votre vidéo de démonstration ici
            </PlaceholderSubtext>
          </VideoPlaceholder>
        )}
      </VideoContainer>

      <ProjectInfo
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <ProjectDescription>{project.description}</ProjectDescription>
        
        <TechStack>
          {project.tech.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </TechStack>

        <ActionButtons>
          {project.demoUrl && (
            <ActionButton
              href={project.demoUrl}
              className="primary"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlay />
              Voir le projet
            </ActionButton>
          )}
          <ActionButton
            href={project.codeUrl}
            className="secondary"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft />
            Voir le code
          </ActionButton>
        </ActionButtons>
      </ProjectInfo>
    </DemoContainer>
  );
};

export default ProjectDemo;
