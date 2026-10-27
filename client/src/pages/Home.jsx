import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import {
  FiArrowUpRight,
  FiArrowDown,
  FiExternalLink,
  FiLinkedin,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiCheck,
  FiPlus,
  FiArrowRight
} from 'react-icons/fi';
import SEO from '../components/SEO.jsx';
import { ROUTE_META, SITE_URL } from '../seo/routes.js';
import StructuredData from '../components/StructuredData.jsx';
import ContactForm from '../components/ContactForm.jsx';
import OffersSection from '../components/OffersSection.jsx';
import Magnetic from '../components/Magnetic.jsx';

const Page = styled.div`
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  z-index: 1;
`;

const Hero = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: calc(var(--nav-h) + env(safe-area-inset-top, 0px) + 1.25rem) var(--page-pad-x) 0;
  padding-right: var(--page-pad-r);
  max-width: var(--max);
  margin: 0 auto;

  @media (min-width: 880px) {
    min-height: 100dvh;
    justify-content: center;
    padding-bottom: 0;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 4rem);
  align-items: end;
  width: 100%;
  padding-bottom: 1.25rem;

  @media (min-width: 880px) {
    grid-template-columns: minmax(0, 1fr) minmax(340px, 1fr);
    align-items: center;
    min-height: calc(100dvh - var(--nav-h) - 5.5rem);
    padding-bottom: 0;
  }
`;

const Status = styled(motion.p)`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 1.5rem;
`;

const OfferPill = styled(motion.a)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.6rem;
  width: fit-content;
  margin: -0.5rem 0 1.5rem;
  padding: 0.45rem 0.9rem 0.45rem 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(200, 242, 74, 0.35);
  background: var(--color-accent-muted);
  font-size: 0.85rem;
  color: var(--color-text);

  strong {
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    background: var(--color-accent);
    color: var(--color-accent-ink);
    font-size: 0.75rem;
  }

  svg {
    color: var(--color-accent);
    transition: transform 0.25s var(--ease-out);
  }

  &:hover {
    color: var(--color-text);
    border-color: var(--color-accent);
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.35); opacity: 0.45; }
`;

const Dot = styled.span`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: var(--color-accent);
    opacity: 0.35;
    animation: ${pulse} 2.2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

const Headline = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6.2vw, 4.85rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.055em;
  color: var(--color-text);
  margin-bottom: 1.4rem;
`;

const Clip = styled.span`
  display: block;
  overflow: hidden;
`;

const Line = styled(motion.span)`
  display: block;
`;

const Accent = styled.em`
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.03em;
  color: var(--color-accent);
`;

const Subhead = styled(motion.p)`
  font-size: clamp(1.02rem, 2vw, 1.2rem);
  line-height: 1.65;
  color: var(--color-muted);
  max-width: 34rem;
  margin-bottom: 1.75rem;
`;

const CtaRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;

    /* Le wrapper Magnetic doit aussi prendre toute la largeur. */
    & > div,
    & > div > div {
      width: 100%;
    }
  }
`;

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 1.45rem;
  min-height: 52px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  font-weight: 700;
  font-size: 0.98rem;
  transition: filter 0.2s ease, transform 0.25s var(--ease-out);

  &:hover {
    color: var(--color-accent-ink);
    filter: brightness(1.06);
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
  padding: 0.95rem 1.45rem;
  min-height: 52px;
  border-radius: 999px;
  border: 1px solid var(--color-line);
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.98rem;
  transition: border-color 0.25s ease, background 0.25s ease;

  &:hover {
    border-color: rgba(200, 242, 74, 0.45);
    background: var(--color-accent-muted);
    color: var(--color-text);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const TrustList = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin-top: 1.5rem;
  font-size: 0.88rem;
  color: var(--color-muted);

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  svg {
    color: var(--color-accent);
    flex-shrink: 0;
  }
`;

const floatA = keyframes`
  0%, 100% { transform: rotate(-7deg) translateY(0); }
  50% { transform: rotate(-7deg) translateY(-8px); }
`;

const floatB = keyframes`
  0%, 100% { transform: rotate(5deg) translateY(0); }
  50% { transform: rotate(5deg) translateY(7px); }
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 460px;
  margin: 1.25rem auto 0;
  min-height: 280px;
  aspect-ratio: 5 / 4;

  @media (min-width: 880px) {
    max-width: 540px;
    min-height: 380px;
    margin: 0 0 0 auto;
    aspect-ratio: 4 / 3.2;
  }
`;

const Shot = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid var(--color-line);
  background: #141414;
  box-shadow:
    0 22px 50px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.04);

  img {
    width: 100%;
    height: auto;
    display: block;
    vertical-align: top;
  }
`;

const HeroChrome = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 0.65rem;
  background: #1c1c1c;
  border-bottom: 1px solid var(--color-line);

  i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: block;
    background: #3a3a3a;

    &:first-child { background: #ff5f57; }
    &:nth-child(2) { background: #febc2e; }
    &:nth-child(3) { background: #28c840; }
  }
`;

const ShotBack = styled(Shot)`
  inset: 4% 18% 28% 0;
  z-index: 1;
  animation: ${floatA} 7s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(-7deg);
  }
`;

const ShotFront = styled(Shot)`
  inset: 22% 0 0 14%;
  z-index: 2;
  animation: ${floatB} 8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(5deg);
  }
`;

const HeroMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 0 1.35rem;
  border-top: 1px solid var(--color-line);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-top: auto;

  @media (max-width: 520px) {
    flex-wrap: wrap;
    row-gap: 0.65rem;
  }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
`;

const ScrollHint = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--color-muted);

  &:hover {
    color: var(--color-accent);
  }

  svg {
    animation: ${bob} 1.6s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      animation: none;
    }
  }
`;

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const MarqueeWrap = styled.div`
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
  overflow: hidden;
  padding: 1.05rem 0;
  margin-top: 0.25rem;
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 32s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const MarqueeItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0 0.4rem;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2.4vw, 1.35rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text);
  white-space: nowrap;

  i {
    font-style: normal;
    color: var(--color-accent);
    font-size: 0.7em;
  }
`;

const Section = styled.section`
  padding: clamp(4rem, 11vw, 7.5rem) var(--page-pad-x);
  padding-right: var(--page-pad-r);
  max-width: var(--max);
  margin: 0 auto;
`;

const SectionHead = styled.div`
  display: grid;
  gap: 1rem 3rem;
  margin-bottom: clamp(2rem, 5vw, 3.25rem);

  @media (min-width: 800px) {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: end;
  }
`;

const Index = styled.span`
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.7rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.02;
  color: var(--color-text);
`;

const SectionLead = styled(motion.p)`
  font-size: 1.05rem;
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 38rem;
`;

const LeadLine = styled.span`
  display: block;

  & + & {
    margin-top: 0.45rem;
  }
`;

const ResponseTimeMark = styled.span`
  display: inline-block;
  margin: 0 0.15em;
  padding: 0.12em 0.5em;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  font-weight: 700;
  font-size: 0.92em;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
`;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 3.25rem);
`;

const ProjectRow = styled(motion.article)`
  display: grid;
  gap: 1.35rem 2.25rem;
  align-items: center;
  padding-bottom: clamp(1.5rem, 4vw, 2.25rem);
  border-bottom: 1px solid var(--color-line);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (min-width: 840px) {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: 2rem 3rem;

    &:nth-child(even) {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);

      .project-frame {
        order: 2;
      }
    }
  }
`;

const Browser = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  border-radius: 12px;
  border: 1px solid var(--color-line);
  background: #101010;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
`;

const BrowserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  background: #171717;
  border-bottom: 1px solid var(--color-line);
`;

const Dots = styled.span`
  display: flex;
  gap: 5px;
  flex-shrink: 0;

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: block;
    background: #3a3a3a;

    &:first-child {
      background: #ff5f57;
    }
    &:nth-child(2) {
      background: #febc2e;
    }
    &:nth-child(3) {
      background: #28c840;
    }
  }
`;

const BrowserUrl = styled.span`
  min-width: 0;
  flex: 1;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.02em;
  color: var(--color-muted);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  padding: 0.28rem 0.55rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BrowserScreen = styled.div`
  background: #fff;
  line-height: 0;
`;

const ProjectImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  image-rendering: auto;
`;

const ProjectBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`;

const ProjectKicker = styled.span`
  display: block;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
`;

const ProjectName = styled.h3`
  font-size: clamp(1.2rem, 2.2vw, 1.7rem);
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const ProjectStatus = styled.span`
  display: inline-block;
  margin-left: 0.6rem;
  vertical-align: middle;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  color: ${({ $concept }) => ($concept ? 'var(--color-muted)' : 'var(--color-accent-ink)')};
  background: ${({ $concept }) => ($concept ? 'rgba(255, 255, 255, 0.06)' : 'var(--color-accent)')};
`;

const ProjectOutcome = styled.p`
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-muted);
  margin: 0.25rem 0 0.35rem;
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.9rem;
`;

const Badge = styled.span`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.28rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(200, 242, 74, 0.28);
  color: var(--color-accent);
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: 0.45rem;
  width: fit-content;

  &:hover {
    color: var(--color-accent);
  }
`;

const ProjectLinkRouter = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: 0.45rem;
  width: fit-content;

  &:hover {
    color: var(--color-accent);
  }
`;

const MethodGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1040px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }
`;

const MethodCard = styled(motion.article)`
  padding: 1.75rem 1.5rem;
  border: 1px solid var(--color-line);
  background: rgba(255, 255, 255, 0.02);
  position: relative;

  @media (min-width: 1040px) {
    padding: 2.25rem 1.75rem;
    border-right: none;

    &:last-child {
      border-right: 1px solid var(--color-line);
    }
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 2px;
    background: var(--color-accent);
    transition: width 0.5s var(--ease-out);
  }

  &:hover::after {
    width: 100%;
  }
`;

const MethodNum = styled.span`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 2.4rem;
  color: var(--color-accent);
  line-height: 1;
  display: block;
  margin-bottom: 1.1rem;
`;

const MethodTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.55rem;
`;

const MethodText = styled.p`
  color: var(--color-muted);
  line-height: 1.6;
  font-size: 0.95rem;
`;

const WhyGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const WhyCard = styled(motion.article)`
  padding: 1.75rem 1.5rem;
  border-radius: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  transition: border-color 0.3s ease, transform 0.35s var(--ease-out);

  &:hover {
    border-color: rgba(200, 242, 74, 0.35);
    transform: translateY(-4px);
  }
`;

const WhyIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-muted);
  color: var(--color-accent);
  margin-bottom: 1.1rem;
`;

const WhyTitle = styled.h3`
  font-size: 1.12rem;
  margin-bottom: 0.5rem;
`;

const WhyText = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-muted);
`;

const FaqList = styled.div`
  border-top: 1px solid var(--color-line);
  max-width: 56rem;
`;

const FaqItem = styled.details`
  border-bottom: 1px solid var(--color-line);

  summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.35rem 0.25rem;
    cursor: pointer;
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 2vw, 1.3rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    transition: color 0.25s var(--ease-out);

    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      color: var(--color-accent);
    }

    svg {
      flex-shrink: 0;
      color: var(--color-accent);
      transition: transform 0.3s var(--ease-out);
    }
  }

  &[open] summary svg {
    transform: rotate(45deg);
  }

  p {
    padding: 0 0.25rem 1.5rem;
    max-width: 44rem;
    color: var(--color-muted);
    line-height: 1.7;
  }
`;

const ContactSection = styled(Section)`
  padding-bottom: max(4rem, calc(3rem + var(--page-pad-b)));
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 2.25rem;

  @media (min-width: 900px) {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 3.5rem;
    align-items: start;
  }
`;

const ContactCard = styled.div`
  padding: clamp(1.25rem, 4vw, 2rem);
  border-radius: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
`;

const ContactAside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const ContactLinkRow = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  color: var(--color-text);
  width: fit-content;

  svg {
    color: var(--color-accent);
  }

  &:hover {
    color: var(--color-accent);
  }
`;

const TRUST = ['Devis gratuit sous 48 h ouvrées', 'Un seul interlocuteur', 'Partout en France, à distance'];

const TECH = [
  'Next.js',
  'React',
  'TypeScript',
  'Vue',
  'Node.js',
  'PostgreSQL',
  'WordPress',
  'Docker',
  'Vite',
  'Framer Motion'
];

const FAQ = [
  {
    q: 'Combien coûte un site internet ?',
    a: 'Pour un site vitrine classique (jusqu’à 5 pages), la création est offerte à mes 10 premiers clients au lieu de 400 € ; il reste 50 € par an pour l’hébergement, le nom de domaine et la maintenance, sans engagement. Les autres projets sont chiffrés sur mesure, avec un devis gratuit sous 48 h ouvrées.'
  },
  {
    q: 'Combien de temps faut-il pour créer mon site ?',
    a: 'Cela dépend du périmètre et du rythme des échanges (contenus, validations). Le planning est fixé ensemble dès le devis, avec des étapes claires jusqu’à la mise en ligne.'
  },
  {
    q: 'Pourrai-je modifier mon site moi-même ?',
    a: 'Oui. Selon le projet, je mets en place un outil d’édition adapté (WordPress par exemple) et je vous forme pour que vous restiez autonome sur vos textes, images et actualités.'
  },
  {
    q: 'Mon site sera-t-il bien référencé sur Google ?',
    a: 'Le référencement est pris en compte dès le départ : structure des pages, vitesse, balises, affichage mobile. Personne ne peut honnêtement promettre la première place, mais votre site partira sur des bases solides.'
  },
  {
    q: 'Travaillez-vous uniquement en Bretagne ?',
    a: 'Je suis basé près de Vannes, mais je travaille à distance avec des clients partout en France : visio, e-mail et téléphone suffisent pour mener un projet de bout en bout.'
  },
  {
    q: 'Que se passe-t-il après la mise en ligne ?',
    a: 'Vous n’êtes pas laissé seul : je propose un accompagnement pour les mises à jour, sauvegardes, corrections et évolutions, selon vos besoins.'
  }
];

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
};

function projectHost(project) {
  if (project.host) return project.host;
  if (!project.external) return 'matteo-rlt.fr';
  try {
    return new URL(project.link).hostname.replace(/^www\./, '');
  } catch {
    return 'preview';
  }
}

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash?.replace(/^#/, '');
    if (!id) return undefined;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  const projects = [
    {
      id: 'driva',
      title: 'Driva',
      kicker: '01 — Produit métier',
      status: 'Mon produit',
      outcome:
        'Outil métier pour auto-écoles : planning, réservations et suivi des élèves centralisés pour gagner du temps au quotidien.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
      preview: '/preview/driva-preview-2026.webp',
      previewMobile: '/preview/driva-preview-2026-sm.webp',
      previewWidth: 1007,
      previewHeight: 708,
      previewMobileWidth: 800,
      link: 'https://driva-auto.fr/',
      external: true
    },
    {
      id: 'birdie-golf-club',
      title: 'Le Birdie Golf Club',
      kicker: '02 — Vitrine',
      status: 'Concept',
      outcome:
        'Vitrine pour un golf imaginaire : ambiance club-house, lecture claire du site et des adhésions, navigation fluide sur mobile comme sur grand écran.',
      tech: ['Vue 3', 'Vite', 'HTML', 'CSS'],
      preview: '/preview/birdie-golf-club-preview.webp',
      previewMobile: '/preview/birdie-golf-club-preview-sm.webp',
      previewWidth: 1007,
      previewMobileWidth: 800,
      link: 'https://golf-club-zeta.vercel.app',
      external: true
    },
    {
      id: 'aume',
      title: 'Aume',
      kicker: '03 — Marque',
      status: 'Concept',
      outcome:
        'Vitrine pour une marque fictive de mobilier et décoration durables : univers éditorial, collection et démarche mis en scène pour habiter plus lentement.',
      tech: ['React', 'Vite'],
      preview: '/preview/aume-preview.webp',
      previewMobile: '/preview/aume-preview-sm.webp',
      previewWidth: 1014,
      previewMobileWidth: 800,
      link: 'https://aumewebsite.vercel.app/',
      external: true
    },
    {
      id: 'noya',
      title: 'Noya',
      kicker: '04 — Mode',
      status: 'Concept',
      outcome:
        'Boutique en ligne pour une marque fictive de streetwear épuré : collection, lookbook et parcours d’achat mis en scène autour d’une silhouette oversize.',
      tech: ['React', 'Vite'],
      preview: '/preview/noya-preview.webp',
      previewMobile: '/preview/noya-preview-sm.webp',
      previewWidth: 1014,
      previewMobileWidth: 800,
      link: 'https://noya-website-eight.vercel.app/',
      external: true
    },
    {
      id: 'gym',
      title: 'Gym Phys',
      kicker: '05 — Association',
      status: 'Client',
      outcome:
        'Site vitrine pour une association sportive : informations, actualités et prise de contact accessibles sur mobile.',
      tech: ['WordPress', 'PHP'],
      preview: '/preview/gym-phys-preview.webp',
      previewMobile: '/preview/gym-phys-preview-sm.webp',
      previewWidth: 1007,
      previewMobileWidth: 800,
      link: 'https://www.gym-phys-ploermel.fr/',
      external: true
    }
  ];

  const method = [
    {
      n: '01',
      title: 'Échange',
      text: 'On parle de votre activité, de vos objectifs et de votre budget. Vous recevez un devis gratuit et détaillé.'
    },
    {
      n: '02',
      title: 'Maquette',
      text: 'Je propose une structure et un design que l’on ajuste ensemble, avant d’écrire la moindre ligne de code.'
    },
    {
      n: '03',
      title: 'Développement',
      text: 'Un site rapide, adapté au mobile et optimisé pour Google, avec des points d’étape réguliers.'
    },
    {
      n: '04',
      title: 'Mise en ligne',
      text: 'Déploiement, prise en main de vos contenus, puis suivi et maintenance si vous le souhaitez.'
    }
  ];

  const why = [
    {
      icon: <FiCheckCircle aria-hidden size={20} strokeWidth={2} />,
      title: 'Code propre et maintenable',
      text: 'Architecture lisible, bonnes pratiques et documentation pour que votre produit reste évolutif.'
    },
    {
      icon: <FiClock aria-hidden size={20} strokeWidth={2} />,
      title: 'Livraison dans les délais',
      text: 'Roadmap claire, points réguliers et priorités alignées sur votre calendrier business.'
    },
    {
      icon: <FiUser aria-hidden size={20} strokeWidth={2} />,
      title: 'Un seul interlocuteur',
      text: 'Du brief au déploiement : même personne pour le cadrage, le développement et la mise en ligne.'
    }
  ];

  const lineAnim = (delay) => ({
    initial: { y: '110%' },
    animate: { y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
  });

  return (
    <>
      <SEO {...ROUTE_META['/']} url={`${SITE_URL}/`} />
      <StructuredData />
      <Page>
        <Hero id="top">
          <HeroGrid>
            <div>
              <Status initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Dot aria-hidden />
                Disponible — Bretagne, missions France entière
              </Status>
              <OfferPill
                href="#offre"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <strong>Offre de lancement</strong>
                Site vitrine offert aux 10 premiers clients
                <FiArrowRight aria-hidden size={14} />
              </OfferPill>
              <Headline>
                <Clip>
                  <Line {...lineAnim(0.08)}>Je construis</Line>
                </Clip>
                <Clip>
                  <Line {...lineAnim(0.16)}>des sites & apps</Line>
                </Clip>
                <Clip>
                  <Line {...lineAnim(0.24)}>
                    <Accent>qui convertissent.</Accent>
                  </Line>
                </Clip>
              </Headline>
              <Subhead
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                Développeur web freelance près de Vannes. Je conçois des sites vitrine, boutiques en ligne et
                applications web rapides, bien référencés et pensés pour vous amener des clients.
              </Subhead>
              <CtaRow
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Magnetic>
                  <BtnPrimary href="#contact">
                    Demander un devis gratuit
                    <FiArrowUpRight aria-hidden />
                  </BtnPrimary>
                </Magnetic>
                <BtnGhost href="#realisations">Voir mes réalisations</BtnGhost>
              </CtaRow>
              <TrustList
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {TRUST.map((t) => (
                  <li key={t}>
                    <FiCheck aria-hidden size={15} strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </TrustList>
            </div>

            <HeroVisual
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              <ShotBack>
                <HeroChrome>
                  <i />
                  <i />
                  <i />
                </HeroChrome>
                <img
                  src="/preview/birdie-golf-club-preview.webp"
                  srcSet="/preview/birdie-golf-club-preview-sm.webp 800w, /preview/birdie-golf-club-preview.webp 1007w"
                  sizes="(min-width: 880px) 36vw, 70vw"
                  alt=""
                  decoding="async"
                />
              </ShotBack>
              <ShotFront>
                <HeroChrome>
                  <i />
                  <i />
                  <i />
                </HeroChrome>
                <img
                  src="/preview/driva-preview-2026.webp"
                  srcSet="/preview/driva-preview-2026-sm.webp 800w, /preview/driva-preview-2026.webp 1007w"
                  sizes="(min-width: 880px) 40vw, 75vw"
                  alt=""
                  decoding="async"
                />
              </ShotFront>
            </HeroVisual>
          </HeroGrid>

          <HeroMeta>
            <ScrollHint href="#realisations">
              Scroll
              <FiArrowDown aria-hidden size={14} />
            </ScrollHint>
            <span>Vannes · France</span>
            <span>Freelance · 2026</span>
          </HeroMeta>
        </Hero>

        <MarqueeWrap aria-hidden>
          <MarqueeTrack>
            {[...TECH, ...TECH].map((t, i) => (
              <MarqueeItem key={`${t}-${i}`}>
                {t} <i>✦</i>
              </MarqueeItem>
            ))}
          </MarqueeTrack>
        </MarqueeWrap>

        <Section id="realisations">
          <SectionHead>
            <div>
              <Index>01 — Réalisations</Index>
              <SectionTitle {...fadeUp}>Réalisations & concepts</SectionTitle>
            </div>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
              Projets clients, produit maison et concepts de marque conçus de A à Z pour montrer ce que je peux
              faire pour vous.
            </SectionLead>
          </SectionHead>
          <ProjectsList>
            {projects.map((p, i) => (
              <ProjectRow key={p.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 * i }}>
                <Browser className="project-frame">
                  <BrowserBar>
                    <Dots aria-hidden>
                      <i />
                      <i />
                      <i />
                    </Dots>
                    <BrowserUrl>{projectHost(p)}</BrowserUrl>
                  </BrowserBar>
                  <BrowserScreen>
                    {p.preview ? (
                      <ProjectImg
                        src={p.preview}
                        srcSet={[
                          `${p.previewMobile} ${p.previewMobileWidth}w`,
                          p.previewMd ? `${p.previewMd} ${p.previewMdWidth}w` : null,
                          `${p.preview} ${p.previewWidth}w`
                        ]
                          .filter(Boolean)
                          .join(', ')}
                        sizes="(max-width: 839px) min(100vw, 520px), min(42vw, 520px)"
                        alt={`Aperçu ${p.title}`}
                        width={p.previewWidth}
                        height={p.previewHeight || Math.round(p.previewWidth * 0.606)}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    ) : null}
                  </BrowserScreen>
                </Browser>
                <ProjectBody>
                  <ProjectKicker>{p.kicker}</ProjectKicker>
                  <ProjectName>
                    {p.title}
                    <ProjectStatus $concept={p.status === 'Concept'}>{p.status}</ProjectStatus>
                  </ProjectName>
                  <Badges>
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </Badges>
                  <ProjectOutcome>{p.outcome}</ProjectOutcome>
                  {p.external ? (
                    <ProjectLink href={p.link} target="_blank" rel="noopener noreferrer">
                      Voir le projet <FiExternalLink aria-hidden size={15} />
                    </ProjectLink>
                  ) : (
                    <ProjectLinkRouter to={p.link}>
                      Voir la démo <FiArrowUpRight aria-hidden size={15} />
                    </ProjectLinkRouter>
                  )}
                </ProjectBody>
              </ProjectRow>
            ))}
          </ProjectsList>
        </Section>

        <OffersSection />

        <Section id="methode">
          <SectionHead>
            <div>
              <Index>03 — Méthode</Index>
              <SectionTitle {...fadeUp}>
                Quatre étapes, <Accent>zéro surprise</Accent>
              </SectionTitle>
            </div>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
              Vous savez à chaque instant où en est votre projet, ce qui reste à faire et ce que ça coûte.
            </SectionLead>
          </SectionHead>
          <MethodGrid>
            {method.map((m, i) => (
              <MethodCard key={m.n} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 * i }}>
                <MethodNum>{m.n}</MethodNum>
                <MethodTitle>{m.title}</MethodTitle>
                <MethodText>{m.text}</MethodText>
              </MethodCard>
            ))}
          </MethodGrid>
        </Section>

        <Section id="pourquoi-moi">
          <SectionHead>
            <div>
              <Index>04 — Engagements</Index>
              <SectionTitle {...fadeUp}>Pourquoi moi</SectionTitle>
            </div>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
              À distance depuis la Bretagne, partout en France — avec des jalons définis ensemble.
            </SectionLead>
          </SectionHead>
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

        <Section id="faq">
          <SectionHead>
            <div>
              <Index>05 — Questions</Index>
              <SectionTitle {...fadeUp}>Questions fréquentes</SectionTitle>
            </div>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
              Ce qu’on me demande le plus souvent avant de démarrer. Une autre question ? Écrivez-moi.
            </SectionLead>
          </SectionHead>
          <FaqList>
            {FAQ.map(({ q, a }) => (
              <FaqItem key={q}>
                <summary>
                  {q}
                  <FiPlus aria-hidden size={20} />
                </summary>
                <p>{a}</p>
              </FaqItem>
            ))}
          </FaqList>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
        </Section>

        <ContactSection id="contact">
          <SectionHead>
            <div>
              <Index>06 — Contact</Index>
              <SectionTitle {...fadeUp}>Parlons de votre projet</SectionTitle>
            </div>
            <SectionLead {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
              <LeadLine>Décrivez votre besoin en quelques lignes.</LeadLine>
              <LeadLine>
                Je vous réponds sous <ResponseTimeMark>48 h ouvrées</ResponseTimeMark>
              </LeadLine>
            </SectionLead>
          </SectionHead>
          <ContactGrid>
            <ContactAside>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.7, fontSize: '1.02rem' }}>
                Idée de produit, refonte ou nouveau site : parlez-moi de votre contexte et de votre échéance. Pas de
                jargon inutile — on valide l’essentiel puis on enchaîne.
              </p>
              <ContactLinks>
                <ContactLinkRow href="mailto:contact@matteo-rlt.fr">
                  <FiMail aria-hidden size={18} />
                  contact@matteo-rlt.fr
                </ContactLinkRow>
                <ContactLinkRow href="https://linkedin.com/in/matteo-rlt" target="_blank" rel="noopener noreferrer">
                  <FiLinkedin aria-hidden size={18} />
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
