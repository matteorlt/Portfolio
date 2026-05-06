import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import SEO from '../components/SEO.jsx';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled(motion.section)`
  margin-bottom: 4rem;
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled(motion.div)`
  color: #ffffff;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #aaaaaa;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
`;

const SkillsSection = styled(motion.div)`
  margin-top: 3rem;
`;

const SkillsTitle = styled.h3`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-bottom: 1.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SkillItem = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.1);
    transform: translateX(5px);
  }
`;

const SkillIcon = styled.div`
  color: #4a90e2;
  font-size: 1.2rem;
`;

const SkillName = styled.span`
  color: #ffffff;
  font-weight: 500;
`;

const About = () => {
  const skills = [
    { name: 'Node.js', icon: '🟢' },
    { name: 'Java', icon: '☕' },
    { name: 'PHP', icon: '🐘' },
    { name: 'JavaScript', icon: '📜' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'HTML/CSS', icon: '🎨' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Git', icon: '📦' },
    { name: 'Symfony', icon: '🧩' },
    { name: 'Spring Boot', icon: '🍃' },
    { name: 'SQL', icon: '🛢️' },
    { name: 'WordPress', icon: '📝' },
    { name: 'SEO', icon: '🔍' },
    { name: 'API REST', icon: '🌐' },
    { name: 'XML/JSON', icon: '📄' }
  ];

  return (
    <AboutContainer>
      <SEO
        title="À propos | Portfolio Mattéo Rannou Le Texier"
        description="Développeur web freelance indépendant, diplômé d'un Bac+2 en développement web. Spécialisé dans des applications web modernes (TypeScript, Node.js, et plus)."
        url="https://matteo-rlt.fr/about"
        image="/logos/og-image.jpg"
      />
      <Section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>À propos de moi</Title>
        <Subtitle>
          Développeur web freelance spécialisé dans la création d'applications modernes et performantes
        </Subtitle>
      </Section>

      <ContentGrid>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Paragraph>
            Je m'appelle Mattéo Rannou Le Texier, développeur web freelance indépendant, diplômé d'un Bac+2 en développement web de L'ENI Rennes. 
            Spécialisé dans la création d'applications web modernes et performantes, je transforme vos idées en solutions numériques concrètes.
          </Paragraph>
          
          <Paragraph>
            Fort d'une expérience variée sur des projets professionnels et personnels, j'ai développé des compétences solides dans la création 
            d'applications web complètes : systèmes d'authentification sécurisés, plateformes de gestion, interfaces utilisateur intuitives, 
            et intégration de services tiers. Chaque projet est l'occasion d'appliquer les meilleures pratiques du développement web moderne.
          </Paragraph>
          
          <Paragraph>
            En tant que développeur freelance, je privilégie une approche personnalisée et un suivi rigoureux de chaque projet. 
            Mon expertise couvre l'ensemble de la stack web, du frontend au backend, en passant par la gestion de bases de données et le déploiement. 
            Je m'engage à livrer des solutions de qualité, maintenables et évolutives, adaptées aux besoins spécifiques de chaque client.
          </Paragraph>
        </TextContent>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StatsGrid>
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StatIcon>
                <FiTrendingUp />
              </StatIcon>
              <StatNumber>7</StatNumber>
              <StatLabel>Projets réalisés</StatLabel>
            </StatCard>
            
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StatIcon>
                <FiUsers />
              </StatIcon>
              <StatNumber>100%</StatNumber>
              <StatLabel>Clients satisfaits</StatLabel>
            </StatCard>
            
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StatIcon>
                <FiAward />
              </StatIcon>
              <StatNumber>2+</StatNumber>
              <StatLabel>Années d'expérience</StatLabel>
            </StatCard>
            
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StatIcon>
                <FiCode />
              </StatIcon>
              <StatNumber>10+</StatNumber>
              <StatLabel>Technologies maîtrisées</StatLabel>
            </StatCard>
          </StatsGrid>
        </motion.div>
      </ContentGrid>

      <SkillsSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <SkillsTitle>Technologies maîtrisées</SkillsTitle>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillItem
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <SkillIcon>{skill.icon}</SkillIcon>
              <SkillName>{skill.name}</SkillName>
            </SkillItem>
          ))}
        </SkillsGrid>
      </SkillsSection>
    </AboutContainer>
  );
};

export default About; 