import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiSmartphone, FiServer } from 'react-icons/fi';
import SEO from '../components/SEO.jsx';

const SkillsContainer = styled.div`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
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
  gap: 1rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(74, 144, 226, 0.1);
`;

const SkillName = styled.span`
  color: #ffffff;
  font-weight: 500;
`;

const SkillLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillBar = styled.div`
  width: 100px;
  height: 6px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #4a90e2 0%, #357abd 100%);
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
`;

const SkillPercentage = styled.span`
  color: #4a90e2;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 35px;
`;

const ExperienceSection = styled(motion.div)`
  margin-top: 3rem;
`;

const ExperienceSectionTitle = styled.h2`
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 2rem;
  text-align: center;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  }
`;

const ExperienceIcon = styled.div`
  font-size: 2.5rem;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const ExperienceCardTitle = styled.h3`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const ExperienceDescription = styled.p`
  color: #aaaaaa;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const FooterNote = styled(motion.div)`
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  text-align: center;
`;

const FooterNoteTitle = styled.h4`
  color: #4a90e2;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FooterNoteText = styled.p`
  color: #cccccc;
  font-size: 0.9rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <FiCode />,
      skills: [
        { name: 'JavaScript', level: 80 },
        { name: 'TypeScript', level: 55 },
        { name: 'HTML/CSS', level: 80 },
        { name: 'Responsive Design', level: 70 }
      ]
    },
    {
      title: 'Backend',
      icon: <FiServer />,
      skills: [
        { name: 'Java', level: 70 },
        { name: 'PHP', level: 75 },
        { name: 'Node.js', level: 75 },
        { name: 'Express', level: 70 },
        { name: 'REST APIs', level: 60 }
      ]
    },
    {
      title: 'Outils & DevOps',
      icon: <FiDatabase />,
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'VS Code', level: 85 },
        { name: 'Linux', level: 75 },
        { name: 'Testing', level: 65 }
      ]
    }
  ];

  const experiences = [
    {
      icon: '💼',
      title: 'Développement Full Stack',
      description: '2+ années d\'expérience dans le développement d\'applications web modernes'
    },
    {
      icon: '🎨',
      title: 'Design UI/UX',
      description: 'Création d\'interfaces utilisateur intuitives et esthétiques'
    },
    {
      icon: '🚀',
      title: 'Performance & SEO',
      description: 'Optimisation des performances et référencement naturel'
    },
    {
      icon: '🔒',
      title: 'Sécurité Web',
      description: 'Implémentation de bonnes pratiques de sécurité'
    }
  ];

  return (
    <SkillsContainer>
      <SEO
        title="Compétences | Portfolio Mattéo Rannou Le Texier"
        description="Compétences frontend, backend et DevOps : JavaScript, TypeScript, Node.js, Java, PHP, Docker, Git."
        url="https://matteo-rlt.fr/skills"
        image="/logos/og-image.jpg"
      />
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mes Compétences
      </Title>
      
      <Subtitle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Expertise technique et domaines de spécialisation* 
      </Subtitle>

      <SkillsGrid>
        {skillCategories.map((category, categoryIndex) => (
          <SkillCategory
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + categoryIndex * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <CategoryHeader>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryHeader>
            
            <SkillList>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.1 }}
                >
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel>
                    <SkillBar>
                      <SkillProgress
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 1 + categoryIndex * 0.1 + skillIndex * 0.1 }}
                      />
                    </SkillBar>
                    <SkillPercentage>{skill.level}%</SkillPercentage>
                  </SkillLevel>
                </SkillItem>
              ))}
            </SkillList>
          </SkillCategory>
        ))}
      </SkillsGrid>

      <ExperienceSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <ExperienceSectionTitle>Domaines d'Expertise</ExperienceSectionTitle>
        
        <ExperienceGrid>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <ExperienceIcon>{experience.icon}</ExperienceIcon>
                             <ExperienceCardTitle>{experience.title}</ExperienceCardTitle>
              <ExperienceDescription>{experience.description}</ExperienceDescription>
            </ExperienceCard>
          ))}
        </ExperienceGrid>
      </ExperienceSection>

      <FooterNote
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <FooterNoteTitle>Note importante</FooterNoteTitle>
        <FooterNoteText>
          * Les pourcentages représentent ma propre estimation de mon niveau de maîtrise dans chaque technologie.
          Ils ne reflètent pas une évaluation objective, mais servent à indiquer les outils avec lesquels je suis le plus à l'aise.
        </FooterNoteText>
      </FooterNote>
    </SkillsContainer>
  );
};

export default Skills; 