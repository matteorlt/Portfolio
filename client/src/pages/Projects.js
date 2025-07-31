import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiEye } from 'react-icons/fi';

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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;

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
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #aaaaaa;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
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
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
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

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'java', label: 'Java' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'wordpress', label: 'WordPress' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Task-Manager',
      description: 'Application de gestion de tâches développée en TypeScript avec authentification et interface moderne. Gestion complète des tâches avec Docker.',
      image: '📋',
      tech: ['TypeScript', 'React', 'Docker'],
      category: ['typescript'],
      demo: '#',
      code: 'https://github.com/matteorlt/Task-Manager'
    },
    {
      id: 2,
      title: 'ENI-Enchère',
      description: 'Projet ENI - Système d\'enchères développé en Java. Application complète avec gestion des utilisateurs et des enchères.',
      image: '🏷️',
      tech: ['Java', 'JSP', 'Servlet'],
      category: ['java'],
      demo: '#',
      code: 'https://github.com/matteorlt/ENI-Enchere'
    },
    {
      id: 3,
      title: 'Auth',
      description: 'Système d\'authentification sécurisé développé en JavaScript. Gestion des sessions et protection des routes.',
      image: '🔐',
      tech: ['JavaScript', 'Node.js', 'Express'],
      category: ['javascript'],
      demo: '#',
      code: 'https://github.com/matteorlt/Auth'
    },
    {
      id: 4,
      title: 'Ticket Support App',
      description: 'Application de support client avec système de tickets. Interface intuitive pour la gestion des demandes.',
      image: '🎫',
      tech: ['JavaScript', 'React', 'Node.js'],
      category: ['javascript'],
      demo: '#',
      code: 'https://github.com/matteorlt/ticket-support-app'
    },
    {
      id: 5,
      title: 'Site React (OpenClassroom)',
      description: 'Projet Fils Rouge OpenClassroom - Site web moderne développé avec React et animations fluides.',
      image: '⚛️',
      tech: ['React', 'JavaScript', 'CSS'],
      category: ['javascript'],
      demo: '#',
      code: 'https://github.com/matteorlt'
    },
    {
      id: 6,
      title: 'Jeu Memory',
      description: 'Jeu Memory interactif développé en JavaScript. Interface moderne avec animations et système de score.',
      image: '🧠',
      tech: ['JavaScript', 'HTML', 'CSS'],
      category: ['javascript'],
      demo: '#',
      code: 'https://github.com/matteorlt'
    },
    {
      id: 7,
      title: 'Gym Phys',
      description: 'Site vitrine pour une association sportif de gym, développé en Wordpress.',
      image: '🛠️',
      tech: ['Wordpress', 'PHP'],
      category: ['wordpress'],
      demo: 'https://www.gym-phys-ploermel.fr/',
      code: 'https://github.com/matteorlt'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter));

  return (
    <ProjectsContainer>
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
              {project.image}
            </ProjectImage>
            
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <ProjectTech>
                {project.tech.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </ProjectTech>
              
              <ProjectLinks>
                <ProjectLink href={project.demo} className="demo" target="_blank" rel="noopener noreferrer">
                  <FiEye />
                  Demo
                </ProjectLink>
                <ProjectLink href={project.code} className="code" target="_blank" rel="noopener noreferrer">
                  <FiGithub />
                  Code
                </ProjectLink>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects; 