import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
  margin-left: auto;
  margin-right: auto;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  background: ${props => props.active ? '#4a90e2' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#4a90e2'};
  border: 2px solid #4a90e2;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: #4a90e2;
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  will-change: transform;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(74, 144, 226, 0.2);
    border-color: rgba(74, 144, 226, 0.3);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
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
    transition: transform 0.6s ease;
  }

  ${ProjectCard}:hover &::before {
    transform: translateX(100%);
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const ProjectImgTag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  image-rendering: auto;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

const ProjectContent = styled.div`
  padding: 1rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0;
`;

const ProjectDescription = styled.p`
  color: #aaaaaa;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectTypeBadge = styled.span`
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  background: ${props => (props.$type === 'pro' ? '#e67e22' : '#2ecc71')};
  white-space: nowrap;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  padding: 0.2rem 0.6rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &.demo {
    background: #4a90e2;
    color: white;

    &:hover {
      background: #357abd;
      transform: translateY(-2px);
    }
  }

  &.code {
    background: transparent;
    color: #4a90e2;
    border: 1px solid #4a90e2;

    &:hover {
      background: rgba(74, 144, 226, 0.1);
      transform: translateY(-2px);
    }
  }
`;

const ProjectLinkRouter = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &.demo {
    background: #4a90e2;
    color: white;

    &:hover {
      background: #357abd;
      transform: translateY(-2px);
    }
  }
`;

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'pro', label: 'Projet Pro' },
    { id: 'perso', label: 'Projet Perso' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'wordpress', label: 'WordPress' }
  ];

  const projects = [
    {
      id: 8,
      title: 'Driva',
      description: 'SaaS moderne pour auto-écoles qui simplifie la gestion quotidienne : planning des moniteurs, réservations des élèves, suivi des heures, paiements et communication automatique. Projet professionnel bientôt disponible au grand public.',
      image: '🚗',
      preview: '/preview/driva-preview.webp',
      tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth.js', 'Stripe', 'Tailwind CSS'],
      category: ['typescript'],
      projectType: 'pro',
      hideCode: true
    },
    {
      id: 1,
      title: 'Task-Manager',
      description: 'Application de gestion de tâches développée en TypeScript avec authentification et interface moderne. Gestion complète des tâches avec Docker.',
      image: '📋',
      preview: '/preview/task-manager-preview.webp',
      tech: ['TypeScript', 'React', 'Docker', 'CI/CD'],
      category: ['typescript'],
      projectType: 'perso',
      demo: '/demo/task-manager',
      code: 'https://github.com/matteorlt/Task-Manager'
    },
    {
      id: 7,
      title: 'Gym Phys',
      description: 'Site vitrine pour une association sportif de gym, développé en Wordpress.',
      image: '🏋️',
      preview: '/preview/gym-phys-preview.webp',
      tech: ['Wordpress', 'PHP'],
      category: ['wordpress'],
      projectType: 'pro',
      siteUrl: 'https://www.gym-phys-ploermel.fr/',
      code: 'https://github.com/matteorlt',
      hideCode: true
    },
    {
      id: 2,
      title: 'Live Chat',
      description: 'Application de chat en temps réel (React + Socket.IO) avec interface moderne et mode hors ligne.',
      image: '💬',
      preview: '/preview/live-chat-preview.webp',
      tech: ['JavaScript', 'React', 'Socket.IO', 'Node.js'],
      category: ['javascript'],
      projectType: 'perso',
      demo: '/demo/live-chat',
      code: 'https://github.com/matteorlt/live-chat'
    },
    {
      id: 3,
      title: 'Auth',
      description: 'Système d\'authentification sécurisé développé en JavaScript. Gestion des sessions et protection des routes.',
      image: '🔐',
      preview: '/preview/auth-preview.webp',
      tech: ['JavaScript', 'Node.js', 'Express'],
      category: ['javascript'],
      projectType: 'perso',
      demo: '/demo/auth',
      code: 'https://github.com/matteorlt/Auth'
    },
    {
      id: 4,
      title: 'Ticket Support App',
      description: 'Application de support client avec système de tickets. Interface intuitive pour la gestion des demandes.',
      image: '🎫',
      tech: ['JavaScript', 'React', 'Node.js'],
      category: ['javascript'],
      projectType: 'perso',
      demo: '/demo/ticket-support-app',
      code: 'https://github.com/matteorlt/ticket-support-app'
    },
    {
      id: 5,
      title: 'Site React (OpenClassroom)',
      description: 'Projet Fils Rouge OpenClassroom - Site web moderne développé avec React et animations fluides.',
      image: '⚛️',
      tech: ['React', 'JavaScript', 'CSS'],
      category: ['javascript'],
      projectType: 'perso',
      demo: '/demo/site-react-openclassroom',
      code: 'https://github.com/matteorlt'
    }
  ];

  const filteredProjects = (() => {
    if (activeFilter === 'all') {
      return projects;
    }
    if (activeFilter === 'pro' || activeFilter === 'perso') {
      return projects.filter(project => project.projectType === activeFilter);
    }
    return projects.filter(project => project.category.includes(activeFilter));
  })();

  return (
    <ProjectsContainer>
      <SEO
        title="Mes Projets | Portfolio Mattéo Rannou Le Texier"
        description="Découvrez mes réalisations: applications web modernes, TypeScript/React, WordPress et plus."
        url="https://matteo-rlt.fr/projects"
        image="/logos/og-image.jpg"
      />
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mes Projets
      </Title>
      
      <Subtitle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Découvrez mes réalisations et projets personnels
      </Subtitle>

      <FilterContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProjectsGrid>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <ProjectImage>
              {project.preview ? (
                <ProjectImgTag
                  src={project.preview}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  srcSet={project.preview2x ? `${project.preview} 1x, ${project.preview2x} 2x` : undefined}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              ) : (
                project.image
              )}
            </ProjectImage>
            
            <ProjectContent>
              <ProjectHeader>
                <ProjectTitle>{project.title}</ProjectTitle>
                {project.projectType && (
                  <ProjectTypeBadge $type={project.projectType} aria-label={`Type de projet: ${project.projectType}`}>
                    {project.projectType === 'pro' ? 'Projet Pro' : 'Projet Perso'}
                  </ProjectTypeBadge>
                )}
              </ProjectHeader>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <ProjectTech>
                {project.tech.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </ProjectTech>
              
              <ProjectLinks>
                {project.siteUrl ? (
                  <ProjectLink href={project.siteUrl} className="demo" target="_blank" rel="noopener noreferrer">
                    <FiEye />
                    Voir le site
                  </ProjectLink>
                ) : (
                  <ProjectLinkRouter to={project.demo} className="demo">
                    <FiEye />
                    Demo
                  </ProjectLinkRouter>
                )}
                {project.code && !project.hideCode && (
                  <ProjectLink href={project.code} className="code" target="_blank" rel="noopener noreferrer">
                    <FiGithub />
                    Code
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects; 