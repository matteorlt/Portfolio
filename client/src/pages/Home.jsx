import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiLayout,
  FiLayers,
  FiShoppingCart,
  FiArrowRight,
  FiExternalLink,
  FiLinkedin,
  FiMail,
  FiGlobe,
  FiClock
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import StructuredData from '../components/StructuredData.jsx';
import ContactForm from '../components/ContactForm.jsx';

const ACCENT = 'var(--color-accent)';
const MUTED = 'var(--color-muted)';

const Page = styled.div`
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  background: var(--color-bg);
`;

const Hero = styled.section`
  position: relative;
  min-height: min(88dvh, 900px);
  display: flex;
  align-items: center;
  padding: 6.5rem var(--page-pad-x) 2.5rem;
  padding-right: var(--page-pad-r);
  max-width: 1120px;
  margin: 0 auto;
  padding-top: max(6.5rem, calc(var(--nav-h) + 1.5rem + env(safe-area-inset-top, 0px)));

  @media (min-width: 768px) {
    min-height: min(92vh, 900px);
    padding: 8rem 2rem 5rem;
    padding-top: max(8rem, calc(var(--nav-h) + 2rem));
  }
`;

const HeroGrid = styled.div`
  display: grid;
  gap: clamp(1.75rem, 5vw, 2.75rem);
  align-items: center;
  width: 100%;
  padding-bottom: max(1.5rem, var(--page-pad-b));

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(260px, 0.95fr);
    gap: 2.5rem 3rem;
    padding-bottom: 0;
  }
`;

const HeroInner = styled.div`
  min-width: 0;
  max-width: 640px;

  @media (min-width: 960px) {
    max-width: none;
  }
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 960px) {
    max-width: none;
    margin: 0;
  }
`;

const ArtGlow = styled.div`
  position: absolute;
  inset: -22% -25% -15% -30%;
  background: radial-gradient(
    ellipse 60% 55% at 55% 45%,
    rgba(96, 165, 250, 0.18),
    transparent 68%
  );
  pointer-events: none;
  z-index: 0;
`;

const ArtBento = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.28fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 11px;
  width: 100%;
  min-height: 280px;
  max-height: 340px;

  @media (max-width: 639px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    min-height: auto;
    max-height: none;
  }
`;

const ArtCellMain = styled.div`
  grid-row: 1 / span 2;
  position: relative;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background:
    radial-gradient(ellipse 90% 80% at 15% 85%, rgba(96, 165, 250, 0.14), transparent 52%),
    linear-gradient(168deg, #151515 0%, #0a0a0a 100%);
  overflow: hidden;
  padding: 1.15rem 1.15rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 639px) {
    grid-column: 1 / -1;
    grid-row: 1;
    padding: 1rem 0.85rem 0.9rem;
  }
`;

const ArtJourney = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 0.2rem 0 0.25rem;
  width: 100%;

  svg {
    width: 100%;
    max-width: 300px;
    height: auto;
    overflow: visible;
  }

  @media (max-width: 420px) {
    transform: scale(0.92);
    transform-origin: top center;
  }

  @media (max-width: 360px) {
    transform: scale(0.86);
  }
`;

const ArtCaption = styled.p`
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--color-muted);
  margin: 0;
  font-weight: 500;
`;

const ArtCellSmall = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.028);
  padding: 0.95rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  transition: border-color 0.2s ease, background 0.2s ease;
  min-height: 92px;

  &:hover {
    border-color: rgba(96, 165, 250, 0.22);
    background: rgba(96, 165, 250, 0.04);
  }

  @media (max-width: 639px) {
    grid-row: 2;
    padding: 0.75rem 0.65rem;
    min-height: 0;
  }

  @media (max-width: 380px) {
    padding: 0.65rem 0.5rem;
  }
`;

const ArtCellIcon = styled.div`
  color: var(--color-accent);
  font-size: 1.3rem;
  line-height: 1;
`;

const ArtCellTitle = styled.span`
  font-size: 0.88rem;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--color-text);
  letter-spacing: -0.02em;
`;

const ArtCellHint = styled.span`
  font-size: 0.72rem;
  color: var(--color-muted);
  line-height: 1.35;
`;

const Eyebrow = styled.p`
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${ACCENT};
  margin-bottom: 1.25rem;
`;

const Headline = styled(motion.h1)`
  font-family: var(--font-hero);
  font-size: clamp(1.65rem, 5.5vw, 3.2rem);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.038em;
  color: var(--color-text);
  margin-bottom: 1.35rem;
  text-wrap: balance;
`;

const HeadlineLead = styled.span`
  display: block;
  font-weight: 600;
  color: #e8e8e4;
`;

const HeadlineAccent = styled.span`
  display: block;
  margin-top: 0.12em;
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.05;
  background: linear-gradient(
    115deg,
    #f0f9ff 0%,
    #7dd3fc 28%,
    #60a5fa 52%,
    #38bdf8 85%,
    #bae6fd 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 28px rgba(96, 165, 250, 0.22));

  @media (max-width: 480px) {
    margin-top: 0.18em;
  }
`;

const Subhead = styled(motion.p)`
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  line-height: 1.65;
  color: ${MUTED};
  margin-bottom: 2rem;
  max-width: 560px;
`;

const CtaRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.65rem;
  }
`;

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 1.5rem;
  min-height: 48px;
  border-radius: 10px;
  background: ${ACCENT};
  color: #0a0a0a;
  font-weight: 600;
  font-size: 1rem;
  transition: filter 0.2s ease, transform 0.2s ease;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    color: #0a0a0a;
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const BtnGhost = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 1.5rem;
  min-height: 48px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-text);
  font-weight: 500;
  font-size: 1rem;
  transition: border-color 0.2s ease, background 0.2s ease;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    border-color: rgba(96, 165, 250, 0.45);
    background: rgba(96, 165, 250, 0.06);
    color: var(--color-text);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const Section = styled.section`
  padding: clamp(3rem, 10vw, 5.5rem) var(--page-pad-x);
  padding-right: var(--page-pad-r);
  max-width: 1120px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 5.5rem 2rem;
  }
`;

const SectionHeader = styled.div`
  max-width: 640px;
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled(motion.h2)`
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.65rem;
`;

const SectionLead = styled(motion.p)`
  font-size: 1.05rem;
  color: ${MUTED};
  line-height: 1.6;
`;

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
};

const ServicesGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;

const ServiceCard = styled(motion.article)`
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(96, 165, 250, 0.25);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
  }
`;

const ServiceIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-muted);
  color: ${ACCENT};
  font-size: 1.35rem;
  margin-bottom: 1.25rem;
`;

const ServiceTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.65rem;
  color: var(--color-text);
`;

const ServiceText = styled.p`
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${MUTED};
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProjectCard = styled(motion.article)`
  border-radius: 14px;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(96, 165, 250, 0.22);
    transform: translateY(-3px);
  }
`;

const ProjectThumb = styled.div`
  height: min(200px, 42vw);
  min-height: 140px;
  background: linear-gradient(145deg, #1a1a1a 0%, #252525 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 640px) {
    height: 160px;
    min-height: 0;
  }
`;

const ProjectImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProjectBody = styled.div`
  padding: 1.35rem 1.35rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProjectName = styled.h3`
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ProjectOutcome = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${MUTED};
  margin-bottom: 1rem;
  flex: 1;
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
`;

const Badge = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  background: rgba(96, 165, 250, 0.12);
  color: ${ACCENT};
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${ACCENT};
  margin-top: auto;

  &:hover {
    color: #93c5fd;
  }
`;

const ProjectLinkRouter = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${ACCENT};
  margin-top: auto;

  &:hover {
    color: #93c5fd;
  }
`;

const WhyGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const WhyCard = styled(motion.div)`
  padding: 1.5rem;
  border-radius: 14px;
  background: var(--color-surface-elevated);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

const WhyIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.85rem;
  color: ${ACCENT};
`;

const WhyTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const WhyText = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: ${MUTED};
`;

const ContactSection = styled(Section)`
  padding-bottom: max(3.5rem, calc(2.5rem + var(--page-pad-b)));

  @media (min-width: 768px) {
    padding-bottom: 5rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: start;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1.1fr;
    gap: 3rem;
  }
`;

const ContactCard = styled.div`
  padding: clamp(1.25rem, 4vw, 2rem);
  border-radius: 16px;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const ContactAside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
`;

const ContactLinkRow = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1rem;
  color: var(--color-text);
  transition: color 0.2s ease;

  svg {
    color: ${ACCENT};
    flex-shrink: 0;
  }

  &:hover {
    color: ${ACCENT};
  }
`;

const surfaceBand = {
  background: 'linear-gradient(180deg, transparent 0%, rgba(96, 165, 250, 0.03) 50%, transparent 100%)'
};

const Home = () => {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return undefined;
    const id = hash.slice(1);
    const t = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(t);
  }, []);

  const services = [
    {
      icon: <FiLayout aria-hidden />,
      title: 'Sites vitrine & landing pages',
      text:
        'Pages rapides, SEO-friendly et pensées pour guider le visiteur vers l’action : contact, inscription ou achat.'
    },
    {
      icon: <FiLayers aria-hidden />,
      title: 'Applications web & SaaS',
      text:
        'Produits sur-mesure : tableaux de bord, comptes utilisateurs, automatisations — stack moderne et évolutive.'
    },
    {
      icon: <FiShoppingCart aria-hidden />,
      title: 'E-commerce',
      text:
        'Boutiques claires, tunnel d’achat fluide et intégrations paiement pour vendre en ligne sans friction.'
    }
  ];

  const projects = [
    {
      id: 'driva',
      title: 'Driva',
      outcome:
        'Outil métier pour auto-écoles : planning, réservations et suivi des élèves centralisés pour gagner du temps au quotidien.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
      preview: '/preview/driva-preview.webp',
      link: 'https://driva-auto.fr/',
      external: true
    },
    {
      id: 'task',
      title: 'Task Manager',
      outcome:
        'Application de gestion de tâches avec authentification : équipes qui voient clairement priorités et avancement.',
      tech: ['TypeScript', 'Node.js', 'Docker'],
      preview: '/preview/task-manager-preview.webp',
      link: '/demo/task-manager',
      external: false
    },
    {
      id: 'gym',
      title: 'Gym Phys',
      outcome:
        'Site vitrine pour une association sportive : informations, actualités et prise de contact accessibles sur mobile.',
      tech: ['WordPress', 'PHP'],
      preview: '/preview/gym-phys-preview.webp',
      link: 'https://www.gym-phys-ploermel.fr/',
      external: true
    },
    {
      id: 'chat',
      title: 'Live Chat',
      outcome:
        'Messagerie temps réel pour démontrer des interactions fluides côté utilisateur et robustesse côté serveur.',
      tech: ['JavaScript', 'Socket.IO', 'Node.js'],
      preview: '/preview/live-chat-preview.webp',
      link: '/demo/live-chat',
      external: false
    }
  ];

  const why = [
    {
      icon: '✓',
      title: 'Code propre et maintenable',
      text: 'Architecture lisible, bonnes pratiques et documentation pour que votre produit reste évolutif.'
    },
    {
      icon: '⏱',
      title: 'Livraison dans les délais',
      text: 'Roadmap claire, points réguliers et priorités alignées sur votre calendrier business.'
    },
    {
      icon: '◇',
      title: 'Un seul interlocuteur',
      text: 'Du brief au déploiement : même personne pour le cadrage, le développement et la mise en ligne.'
    }
  ];

  return (
    <>
      <SEO
        title="Mattéo Rannou Le Texier — Développeur web freelance | Sites & applications"
        description="Je construis des sites et applications web orientés conversion : vitrine, e-commerce, SaaS. Disponible pour vos projets — contactez-moi."
        keywords="développeur web freelance, création site internet, site vitrine, e-commerce, SaaS, applications web, France"
        url="https://matteo-rlt.fr"
      />
      <StructuredData />
      <Page>
        <Hero id="top">
          <HeroGrid>
            <HeroInner>
              <Eyebrow>Freelance — sites & applications web</Eyebrow>
              <Headline initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <HeadlineLead>Je construis des sites et apps web</HeadlineLead>
                <HeadlineAccent>qui convertissent.</HeadlineAccent>
              </Headline>
              <Subhead
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                Développeur web freelance — disponible pour vos projets vitrine, e-commerce et SaaS. Basé en
                Bretagne, j’interviens à distance partout en France.
              </Subhead>
              <CtaRow
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <BtnPrimary href="#contact">
                  Me contacter
                  <FiArrowRight aria-hidden />
                </BtnPrimary>
                <BtnGhost href="#realisations">Voir mes réalisations</BtnGhost>
              </CtaRow>
            </HeroInner>

            <HeroVisual
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              <ArtGlow />
              <ArtBento>
                <ArtCellMain>
                  <ArtJourney>
                    <svg viewBox="0 0 320 158" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <defs>
                        <linearGradient id="journeyPathGrad" x1="44" y1="56" x2="276" y2="56" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#60a5fa" stopOpacity="0.95" />
                          <stop offset="0.5" stopColor="#38bdf8" stopOpacity="0.9" />
                          <stop offset="1" stopColor="#7dd3fc" stopOpacity="0.95" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M 44 62 C 98 28 118 32 160 44 C 208 58 238 54 276 58"
                        stroke="url(#journeyPathGrad)"
                        strokeWidth="2.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        opacity="0.92"
                      />

                      <g>
                        <circle cx="44" cy="62" r="17" fill="#0f0f0f" stroke="#60a5fa" strokeWidth="2.2" />
                        <text x="44" y="67.5" textAnchor="middle" fill="#f4f4f0" fontSize="12" fontWeight="700" fontFamily="Syne, Outfit, system-ui, sans-serif">
                          1
                        </text>
                        <text x="44" y="106" textAnchor="middle" fill="#f4f4f0" fontSize="11.5" fontWeight="700" fontFamily="Syne, Outfit, system-ui, sans-serif">
                          Attention
                        </text>
                        <text x="44" y="122" textAnchor="middle" fill="#a3a3a3" fontSize="9" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
                          Message accrocheur
                        </text>
                      </g>

                      <g>
                        <circle cx="160" cy="44" r="17" fill="#0f0f0f" stroke="#38bdf8" strokeWidth="2.2" />
                        <text x="160" y="49.5" textAnchor="middle" fill="#f4f4f0" fontSize="12" fontWeight="700" fontFamily="Syne, Outfit, system-ui, sans-serif">
                          2
                        </text>
                        <text x="160" y="106" textAnchor="middle" fill="#f4f4f0" fontSize="11.5" fontWeight="700" fontFamily="Syne, Outfit, system-ui, sans-serif">
                          Intention
                        </text>
                        <text x="160" y="122" textAnchor="middle" fill="#a3a3a3" fontSize="9" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
                          Preuves &amp; bénéfices
                        </text>
                      </g>

                      <g>
                        <circle cx="276" cy="58" r="17" fill="#0f0f0f" stroke="#7dd3fc" strokeWidth="2.2" />
                        <text x="276" y="63.5" textAnchor="middle" fill="#f4f4f0" fontSize="12" fontWeight="700" fontFamily="Syne, Outfit, system-ui, sans-serif">
                          3
                        </text>
                        <text x="276" y="106" textAnchor="middle" fill="#f4f4f0" fontSize="11.5" fontWeight="700" fontFamily="Syne, Outfit, system-ui, sans-serif">
                          Action
                        </text>
                        <text x="276" y="122" textAnchor="middle" fill="#a3a3a3" fontSize="9" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
                          Contact ou achat
                        </text>
                      </g>
                    </svg>
                  </ArtJourney>
                  <ArtCaption>Trois jalons pour transformer un visiteur en prospect ou client.</ArtCaption>
                </ArtCellMain>
                <ArtCellSmall>
                  <ArtCellIcon>
                    <FiGlobe aria-hidden strokeWidth={2} />
                  </ArtCellIcon>
                  <ArtCellTitle>À distance</ArtCellTitle>
                  <ArtCellHint>Bretagne · missions France entière</ArtCellHint>
                </ArtCellSmall>
                <ArtCellSmall>
                  <ArtCellIcon>
                    <FiClock aria-hidden strokeWidth={2} />
                  </ArtCellIcon>
                  <ArtCellTitle>Délais maîtrisés</ArtCellTitle>
                  <ArtCellHint>Jalons définis avec vous</ArtCellHint>
                </ArtCellSmall>
              </ArtBento>
            </HeroVisual>
          </HeroGrid>
        </Hero>

        <Section id="services" style={surfaceBand}>
          <SectionHeader>
            <SectionTitle {...fadeUp}>Ce que je fais</SectionTitle>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 }}>
              Des livrables orientés business : clarté du message, performance, et un parcours utilisateur qui mène à
              l’action.
            </SectionLead>
          </SectionHeader>
          <ServicesGrid>
            {services.map((s, i) => (
              <ServiceCard
                key={s.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.05 * i }}
              >
                <ServiceIcon>{s.icon}</ServiceIcon>
                <ServiceTitle>{s.title}</ServiceTitle>
                <ServiceText>{s.text}</ServiceText>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Section>

        <Section id="realisations">
          <SectionHeader>
            <SectionTitle {...fadeUp}>Ce que j’ai livré</SectionTitle>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 }}>
              Quelques exemples concrets — résultat client avant tout.
            </SectionLead>
          </SectionHeader>
          <ProjectsGrid>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 * i }}>
                <ProjectThumb>
                  {p.preview ? (
                    <ProjectImg src={p.preview} alt={`Aperçu ${p.title}`} loading="lazy" decoding="async" />
                  ) : null}
                </ProjectThumb>
                <ProjectBody>
                  <ProjectName>{p.title}</ProjectName>
                  <Badges>
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </Badges>
                  <ProjectOutcome>{p.outcome}</ProjectOutcome>
                  {p.external ? (
                    <ProjectLink href={p.link} target="_blank" rel="noopener noreferrer">
                      Voir le projet <FiExternalLink aria-hidden size={16} />
                    </ProjectLink>
                  ) : (
                    <ProjectLinkRouter to={p.link}>
                      Voir la démo <FiArrowRight aria-hidden size={16} />
                    </ProjectLinkRouter>
                  )}
                </ProjectBody>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </Section>

        <Section id="pourquoi-moi" style={{ ...surfaceBand, paddingTop: '3rem' }}>
          <SectionHeader>
            <SectionTitle {...fadeUp}>Pourquoi moi</SectionTitle>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 }}>
              Trois engagements concrets pour avancer sereinement.
            </SectionLead>
          </SectionHeader>
          <WhyGrid>
            {why.map((w, i) => (
              <WhyCard key={w.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.07 * i }}>
                <WhyIcon aria-hidden>{w.icon}</WhyIcon>
                <WhyTitle>{w.title}</WhyTitle>
                <WhyText>{w.text}</WhyText>
              </WhyCard>
            ))}
          </WhyGrid>
        </Section>

        <ContactSection id="contact">
          <SectionHeader>
            <SectionTitle {...fadeUp}>Un projet en tête ?</SectionTitle>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 }}>
              Décrivez votre besoin en quelques lignes — je vous réponds sous 48 h ouvrées.
            </SectionLead>
          </SectionHeader>
          <ContactGrid>
            <ContactAside>
              <p style={{ color: MUTED, lineHeight: 1.65, fontSize: '1rem' }}>
                Idée de produit, refonte ou nouveau site : parlez-moi de votre contexte et de votre échéance. Pas de
                jargon inutile — on valide l’essentiel puis on enchaîne.
              </p>
              <ContactLinks>
                <ContactLinkRow href="mailto:contact@matteo-rlt.fr">
                  <FiMail aria-hidden size={20} />
                  contact@matteo-rlt.fr
                </ContactLinkRow>
                <ContactLinkRow href="https://linkedin.com/in/matteo-rlt" target="_blank" rel="noopener noreferrer">
                  <FiLinkedin aria-hidden size={20} />
                  LinkedIn — Mattéo Rannou Le Texier
                </ContactLinkRow>
              </ContactLinks>
            </ContactAside>
            <ContactCard>
              <ContactForm idPrefix="home" />
            </ContactCard>
          </ContactGrid>
        </ContactSection>
      </Page>
    </>
  );
};

export default Home;
