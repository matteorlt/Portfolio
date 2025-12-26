import React from 'react';
// Chargement dynamique pour éviter de charger @tsparticles sur mobile
let ParticlesBackground = null;
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiCode, FiServer, FiSmartphone, FiTrendingUp, FiUsers, FiAward, FiArrowRight, FiEye, FiZap, FiStar, FiCheckCircle, FiHelpCircle, FiChevronDown, FiChevronUp, FiLayers } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import StructuredData from '../components/StructuredData.jsx';
import CustomCursor from '../components/CustomCursor.jsx';

// Styles globaux
const PageContainer = styled.div`
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
`;

const BackgroundCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const Section = styled.section`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// Hero Section
const HeroSection = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 4rem;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled(motion.div)`
  color: #ffffff;
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 20px;
  color: #4a90e2;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
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

const Title = styled(motion.h2)`
  font-size: 1.8rem;
  color: #cccccc;
  margin-bottom: 1.5rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #aaaaaa;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 550px;
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const Button = styled(motion.button)`
  padding: 0.9rem 2rem;
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
  text-decoration: none;

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

  &:hover {
    background: #4a90e2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
    border-color: rgba(74, 144, 226, 0.3);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
`;

// Services Section
const ServicesSection = styled(Section)`
  padding: 6rem 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #cccccc;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(74, 144, 226, 0.2);
    border-color: rgba(74, 144, 226, 0.3);
  }
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: #aaaaaa;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServicePrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const ServiceLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    gap: 0.75rem;
    color: #357abd;
  }
`;

// Projects Section
const ProjectsSection = styled(Section)`
  padding: 6rem 2rem;
  background: rgba(74, 144, 226, 0.02);
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;

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
`;

const ProjectImgTag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #aaaaaa;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  padding: 0.2rem 0.6rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProjectLinkStyled = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    gap: 0.75rem;
    color: #357abd;
  }
`;

const ProjectLinkRouter = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    gap: 0.75rem;
    color: #357abd;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  padding: 6rem 2rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(74, 144, 226, 0.2);
    border-color: rgba(74, 144, 226, 0.3);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  font-size: 2rem;
  color: #4a90e2;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SkillItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 8px;
`;

const SkillName = styled.span`
  color: #ffffff;
  font-weight: 500;
`;

const SkillLevel = styled.span`
  color: #4a90e2;
  font-size: 0.9rem;
  font-weight: 600;
`;

// About Section
const AboutSection = styled(Section)`
  padding: 6rem 2rem;
  background: rgba(74, 144, 226, 0.02);
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled(motion.div)`
  color: #ffffff;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #aaaaaa;
  margin-bottom: 1.5rem;
`;

// CTA Section
const CTASection = styled(Section)`
  padding: 6rem 2rem;
  text-align: center;
`;

const CTACard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(53, 122, 189, 0.1) 100%);
  border: 2px solid rgba(74, 144, 226, 0.3);
  border-radius: 20px;
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

// FAQ Section
const FAQSection = styled(Section)`
  padding: 6rem 2rem;
  background: rgba(74, 144, 226, 0.02);
`;

const FAQItem = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    border-color: rgba(74, 144, 226, 0.3);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: transparent;
  border: none;
  text-align: left;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #4a90e2;
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #aaaaaa;
  line-height: 1.6;
  font-size: 1rem;
`;

const Home = () => {
  const navigate = useNavigate();
  const [showParticles, setShowParticles] = React.useState(false);
  const [openFAQ, setOpenFAQ] = React.useState(null);

  React.useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isDesktop && !prefersReduced) {
      import('../components/ParticlesBackground.jsx').then(mod => {
        ParticlesBackground = mod.default;
        setShowParticles(true);
      }).catch(() => setShowParticles(false));
    }
  }, []);

  const services = [
    {
      icon: <FiCode />,
      title: 'Site Vitrine',
      description: 'Site web professionnel sur-mesure avec design moderne et responsive. Parfait pour présenter votre activité.',
      price: 'À partir de 700€',
      link: '/offres'
    },
    {
      icon: <FiLayers />,
      title: 'Site sur-mesure',
      description: 'Site web professionnel avec design personnalisé, interface d\'administration et fonctionnalités avancées.',
      price: 'À partir de 1500€',
      link: '/offres'
    },
    {
      icon: <FiServer />,
      title: 'Application Web',
      description: 'Développement d\'applications web sur-mesure avec React, Node.js et technologies modernes.',
      price: 'À partir de 2600€',
      link: '/offres'
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'Task-Manager',
      description: 'Application de gestion de tâches développée en TypeScript avec authentification et interface moderne.',
      preview: '/preview/task-manager-preview.webp',
      tech: ['TypeScript', 'React', 'Docker'],
      link: '/demo/task-manager'
    },
    {
      id: 7,
      title: 'Gym Phys',
      description: 'Site vitrine pour une association sportive de gym, développé en WordPress.',
      preview: '/preview/gym-phys-preview.webp',
      tech: ['WordPress', 'PHP'],
      link: 'https://www.gym-phys-ploermel.fr/'
    },
    {
      id: 8,
      title: 'Driva',
      description: 'SaaS moderne pour auto-écoles qui simplifie la gestion quotidienne : planning, réservations, suivi des heures et paiements.',
      preview: '/preview/driva-preview.webp',
      tech: ['Next.js 14', 'TypeScript', 'PostgreSQL'],
      link: '/projects'
    }
  ];

  const skillCategories = [
    {
      title: 'Frontend',
      icon: <FiCode />,
      skills: [
        { name: 'React', level: '75%' },
        { name: 'JavaScript', level: '75%' },
        { name: 'TypeScript', level: '55%' },
        { name: 'HTML/CSS', level: '80%' }
      ]
    },
    {
      title: 'Backend',
      icon: <FiServer />,
      skills: [
        { name: 'Java', level: '70%' },
        { name: 'PHP', level: '75%' },
        { name: 'Node.js', level: '75%' },
        { name: 'Express', level: '70%' }
      ]
    },
    {
      title: 'Outils & DevOps',
      icon: <FiSmartphone />,
      skills: [
        { name: 'Git', level: '85%' },
        { name: 'Docker', level: '70%' },
        { name: 'VS Code', level: '85%' },
        { name: 'Linux', level: '75%' }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Mattéo Rannou Le Texier - Développeur Web Freelance | Services & Portfolio"
        description="Développeur web freelance spécialisé en React, TypeScript, Node.js. Création de sites web, applications sur-mesure et solutions e-commerce. Basé à Rennes."
        keywords="développeur web freelance, React, TypeScript, Node.js, création site web, application web, e-commerce, Rennes"
        url="https://matteo-rlt.fr"
      />
      <StructuredData />
      <PageContainer>
        <CustomCursor />
        <BackgroundCanvas>
          {showParticles && ParticlesBackground && <ParticlesBackground />}
        </BackgroundCanvas>

        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <TextContent>
              <Badge
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <FiZap style={{ marginRight: '0.5rem', fontSize: '1rem', display: 'inline-flex' }} />
                Développeur Freelance Indépendant
              </Badge>
              
              <Name
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Mattéo Rannou Le Texier
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
                Je crée des solutions web modernes et performantes pour votre entreprise. 
                Spécialisé en React, TypeScript et Node.js, je transforme vos idées en 
                applications web professionnelles.
              </Description>
              
              <ButtonsContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Button className="primary" onClick={() => navigate('/offres')}>
                  Demander un devis
                  <FiArrowRight />
                </Button>
                <Button className="secondary" onClick={() => navigate('/projects')}>
                  <FiEye />
                  Voir mes projets
                </Button>
              </ButtonsContainer>
              
              <SocialLinks
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <SocialLink href="https://github.com/matteorlt" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FiGithub />
                </SocialLink>
                <SocialLink href="https://linkedin.com/in/matteo-rlt" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FiLinkedin />
                </SocialLink>
                <SocialLink href="mailto:contact@matteo-rlt.fr" aria-label="Email">
                  <FiMail />
                </SocialLink>
              </SocialLinks>
            </TextContent>

            <StatsGrid
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <StatCard whileHover={{ scale: 1.05 }}>
                <FiAward style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#4a90e2' }} />
                <StatNumber>7+</StatNumber>
                <StatLabel>Projets réalisés</StatLabel>
              </StatCard>
              <StatCard whileHover={{ scale: 1.05 }}>
                <FiStar style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#4a90e2' }} />
                <StatNumber>100%</StatNumber>
                <StatLabel>Clients satisfaits</StatLabel>
              </StatCard>
              <StatCard whileHover={{ scale: 1.05 }}>
                <FiTrendingUp style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#4a90e2' }} />
                <StatNumber>2+</StatNumber>
                <StatLabel>Années d'expérience</StatLabel>
              </StatCard>
            </StatsGrid>
          </HeroContent>
        </HeroSection>

        {/* Services Section */}
        <ServicesSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FiCode style={{ marginRight: '0.75rem', fontSize: '2rem', display: 'inline-flex', verticalAlign: 'middle', color: '#4a90e2' }} />
            Mes Services
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Des solutions web adaptées à vos besoins
          </SectionSubtitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ServiceIcon>
                  {service.icon}
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServicePrice>{service.price}</ServicePrice>
                <ServiceLink to={service.link}>
                  En savoir plus <FiArrowRight />
                </ServiceLink>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesSection>

        {/* Projects Section */}
        <ProjectsSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FiStar style={{ marginRight: '0.75rem', fontSize: '2rem', display: 'inline-flex', verticalAlign: 'middle', color: '#4a90e2' }} />
            Projets Réalisés
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Découvrez quelques-unes de mes réalisations
          </SectionSubtitle>
          <ProjectsGrid>
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ProjectImage>
                  {project.preview ? (
                    <ProjectImgTag src={project.preview} alt={project.title} loading="lazy" />
                  ) : (
                    '📋'
                  )}
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTech>
                    {project.tech.map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </ProjectTech>
                  {project.link.startsWith('http') ? (
                    <ProjectLinkStyled href={project.link} target="_blank" rel="noopener noreferrer">
                      Voir le projet <FiArrowRight />
                    </ProjectLinkStyled>
                  ) : (
                    <ProjectLinkRouter to={project.link}>
                      Voir le projet <FiArrowRight />
                    </ProjectLinkRouter>
                  )}
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
          <motion.div
            style={{ textAlign: 'center', marginTop: '3rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button className="secondary" onClick={() => navigate('/projects')}>
              Voir tous mes projets <FiArrowRight />
            </Button>
          </motion.div>
        </ProjectsSection>

        {/* Skills Section */}
        <SkillsSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FiZap style={{ marginRight: '0.75rem', fontSize: '2rem', display: 'inline-flex', verticalAlign: 'middle', color: '#4a90e2' }} />
            Compétences Techniques
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Technologies et outils que je maîtrise
          </SectionSubtitle>
          <SkillsGrid>
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <CategoryHeader>
                  <CategoryIcon>{category.icon}</CategoryIcon>
                  <CategoryTitle>{category.title}</CategoryTitle>
                </CategoryHeader>
                <SkillList>
                  {category.skills.map((skill) => (
                    <SkillItem key={skill.name}>
                      <SkillName>{skill.name}</SkillName>
                      <SkillLevel>{skill.level}</SkillLevel>
                    </SkillItem>
                  ))}
                </SkillList>
              </SkillCategory>
            ))}
          </SkillsGrid>
          <motion.div
            style={{ textAlign: 'center', marginTop: '3rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button className="secondary" onClick={() => navigate('/skills')}>
              Voir toutes mes compétences <FiArrowRight />
            </Button>
          </motion.div>
        </SkillsSection>

        {/* About Section */}
        <AboutSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FiUsers style={{ marginRight: '0.75rem', fontSize: '2rem', display: 'inline-flex', verticalAlign: 'middle', color: '#4a90e2' }} />
            À Propos
          </SectionTitle>
          <AboutContent>
            <AboutText
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Paragraph>
                Je m'appelle Mattéo Rannou Le Texier, développeur web freelance indépendant basé à Ploërmel. 
                Passionné par le code et les technologies modernes, je transforme vos idées en solutions web performantes.
              </Paragraph>
              <Paragraph>
                J'ai déjà eu l'occasion de travailler sur plusieurs projets concrets : Task-Manager, 
                Gym-Phys, un système d'authentification, un système de ticket support et d'autres projets créatifs. 
                J'accorde une grande importance à la qualité du code et à l'expérience utilisateur.
              </Paragraph>
              <Paragraph>
                Autonome, mais aussi à l'aise en collaboration, je suis toujours à la recherche de nouveaux défis et 
                d'opportunités pour progresser et construire des projets utiles, clairs, bien structurés.
              </Paragraph>
            </AboutText>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <StatsGrid>
                <StatCard whileHover={{ scale: 1.05 }}>
                  <FiAward style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#4a90e2' }} />
                  <StatNumber>7</StatNumber>
                  <StatLabel>Projets réalisés</StatLabel>
                </StatCard>
                <StatCard whileHover={{ scale: 1.05 }}>
                  <FiStar style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#4a90e2' }} />
                  <StatNumber>100%</StatNumber>
                  <StatLabel>Clients satisfaits</StatLabel>
                </StatCard>
                <StatCard whileHover={{ scale: 1.05 }}>
                  <FiTrendingUp style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#4a90e2' }} />
                  <StatNumber>2+</StatNumber>
                  <StatLabel>Années d'expérience</StatLabel>
                </StatCard>
                <StatCard whileHover={{ scale: 1.05 }}>
                  <FiZap style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#4a90e2' }} />
                  <StatNumber>10+</StatNumber>
                  <StatLabel>Technologies maîtrisées</StatLabel>
                </StatCard>
              </StatsGrid>
            </motion.div>
          </AboutContent>
          <motion.div
            style={{ textAlign: 'center', marginTop: '3rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="secondary" onClick={() => navigate('/about')}>
              En savoir plus sur moi <FiArrowRight />
            </Button>
          </motion.div>
        </AboutSection>

        {/* CTA Section */}
        <CTASection>
          <CTACard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>
              <FiZap style={{ marginRight: '0.75rem', fontSize: '2.5rem', display: 'inline-flex', verticalAlign: 'middle', color: '#4a90e2' }} />
              Prêt à démarrer votre projet ?
            </CTATitle>
            <CTADescription>
              <FiCheckCircle style={{ marginRight: '0.5rem', fontSize: '1.2rem', display: 'inline-flex', verticalAlign: 'middle', color: '#4a90e2' }} />
              Discutons de vos besoins et créons ensemble une solution web qui correspond à vos objectifs.
              Je réponds à toutes vos questions et vous propose un devis personnalisé gratuit.
            </CTADescription>
            <ButtonsContainer style={{ justifyContent: 'center' }}>
              <Button className="primary" onClick={() => navigate('/offres')}>
                Demander un devis gratuit
                <FiArrowRight />
              </Button>
              <Button className="secondary" onClick={() => navigate('/contact')}>
                <FiMail />
                Me contacter
              </Button>
            </ButtonsContainer>
          </CTACard>
        </CTASection>

        {/* FAQ Section */}
        <FAQSection>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FiHelpCircle style={{ marginRight: '0.75rem', fontSize: '2rem', display: 'inline-flex', verticalAlign: 'middle', color: '#4a90e2' }} />
            Questions Fréquentes
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tout ce que vous devez savoir avant de démarrer votre projet
          </SectionSubtitle>
          
          {[
            {
              question: "Pourquoi avoir un site web est-il important pour mon entreprise ?",
              answer: "Un site web est votre vitrine digitale 24/7. Il permet d'établir votre crédibilité, d'atteindre un public plus large, de présenter vos services et produits, et d'augmenter votre visibilité en ligne. Aujourd'hui, plus de 80% des clients recherchent une entreprise en ligne avant de prendre contact. Sans site web, vous perdez des opportunités commerciales importantes."
            },
            {
              question: "Pourquoi choisir un freelance plutôt qu'une agence ?",
              answer: "En tant que freelance, je vous offre plusieurs avantages : des tarifs plus compétitifs (pas de frais de structure), une communication directe et réactive, une approche personnalisée de votre projet, et une flexibilité accrue. Vous travaillez directement avec le développeur, ce qui garantit une meilleure compréhension de vos besoins et une réactivité optimale."
            },
            {
              question: "Pourquoi me choisir moi ?",
              answer: "Je combine expertise technique et approche personnalisée. Avec plus de 2 ans d'expérience et 7+ projets réalisés, je maîtrise les technologies modernes (React, Node.js, TypeScript) tout en restant accessible et à l'écoute. Je m'engage à livrer des projets de qualité, dans les délais convenus, avec un suivi personnalisé et un code propre et maintenable."
            },
            {
              question: "Combien de temps prend la création d'un site web ?",
              answer: "Le délai dépend de la complexité de votre projet. Un site vitrine simple peut être livré en 2-3 semaines, tandis qu'un site sur-mesure avec fonctionnalités avancées peut prendre 4-8 semaines. Pour une application web complète, comptez 8-12 semaines. Je vous fournis un planning détaillé dès la validation du projet."
            },
            {
              question: "Quels sont les tarifs et comment fonctionne le paiement ?",
              answer: "Mes tarifs démarrent à partir de 700€ pour un site vitrine, 1500€ pour un site sur-mesure, et 2600€ pour une application web. Le paiement se fait généralement en plusieurs étapes : un acompte à la commande (30-50%), puis des versements selon l'avancement du projet. Je propose toujours un devis détaillé et gratuit avant tout engagement."
            },
            {
              question: "Proposez-vous un accompagnement après la livraison ?",
              answer: "Oui, je propose un accompagnement complet après la livraison : formation à l'utilisation de votre site, documentation technique, support technique pour les corrections mineures, et possibilité de maintenance et d'évolutions futures. Je reste disponible pour répondre à vos questions et vous aider à faire évoluer votre projet."
            },
            {
              question: "Mon site sera-t-il responsive (adapté mobile) ?",
              answer: "Absolument ! Tous mes sites sont développés avec une approche 'mobile-first', garantissant une expérience optimale sur tous les appareils (smartphone, tablette, ordinateur). C'est essentiel aujourd'hui car plus de 60% du trafic web provient des mobiles."
            },
            {
              question: "Quelle est la différence entre un site vitrine et un site sur-mesure ?",
              answer: "Un site vitrine présente votre activité avec des pages statiques (accueil, services, contact). Un site sur-mesure inclut des fonctionnalités dynamiques comme une interface d'administration, un système de gestion de contenu, des formulaires avancés, ou des fonctionnalités spécifiques à votre métier. L'application web est encore plus complexe avec des fonctionnalités interactives et une base de données."
            }
          ].map((faq, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQQuestion onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
                {faq.question}
                {openFAQ === index ? <FiChevronUp style={{ color: '#4a90e2' }} /> : <FiChevronDown style={{ color: '#4a90e2' }} />}
              </FAQQuestion>
              {openFAQ === index && (
                <FAQAnswer
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </FAQAnswer>
              )}
            </FAQItem>
          ))}
        </FAQSection>
      </PageContainer>
    </>
  );
};

export default Home; 