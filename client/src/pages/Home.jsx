import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  FiArrowUpRight,
  FiArrowDown,
  FiLinkedin,
  FiMail,
  FiPlus,
  FiZap,
  FiSearch,
  FiSmartphone,
  FiUser
} from 'react-icons/fi';
import SEO from '../components/SEO.jsx';
import { ROUTE_META, SITE_URL } from '../seo/routes.js';
import StructuredData from '../components/StructuredData.jsx';
import ContactForm from '../components/ContactForm.jsx';
import OffersSection from '../components/OffersSection.jsx';
import Magnetic from '../components/Magnetic.jsx';
import Showreel from '../components/Showreel.jsx';
import {
  Band,
  Container,
  Eyebrow,
  SectionHead,
  SectionTitle,
  SectionLead,
  Mark,
  ButtonPrimary,
  ButtonGhost,
  reveal,
  revealDelay
} from '../components/ui.jsx';

const EASE = [0.22, 1, 0.36, 1];

/* ———————————————————————————— Hero ———————————————————————————— */

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  /* Le bas du hero passe à l’encre : le bandeau incliné fait la jonction avec les réalisations. */
  background: linear-gradient(to bottom, var(--paper) calc(100% - 2.75rem), var(--ink) calc(100% - 2.75rem));

  /* Quadrillage « plan d’architecte » qui s’efface vers le bas. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(to right, rgba(15, 15, 13, 0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(15, 15, 13, 0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    background-position: -1px -1px;
    -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 30%, transparent 78%);
    mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 30%, transparent 78%);
  }
`;

const HeroInner = styled.div`
  position: relative;
  max-width: var(--max);
  margin: 0 auto;
  padding: calc(var(--nav-h) + env(safe-area-inset-top, 0px) + clamp(2rem, 6vw, 4.5rem)) var(--page-pad-r) 0
    var(--page-pad-x);
`;

const HeroTop = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 0.75rem;
  margin-bottom: clamp(1.5rem, 4vw, 2.25rem);
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(120, 170, 0, 0.45); }
  70% { box-shadow: 0 0 0 9px rgba(120, 170, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(120, 170, 0, 0); }
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 36px;
  padding: 0 0.95rem 0 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--color-line-strong);
  background: rgba(255, 255, 255, 0.55);
  font-size: 0.85rem;
  font-weight: 500;

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #7cb500;
    animation: ${pulse} 2s infinite;
  }
`;

const OfferPill = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 36px;
  padding: 0 0.6rem 0 0.35rem;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.85rem;
  font-weight: 500;

  strong {
    padding: 0.22rem 0.6rem;
    border-radius: 999px;
    background: var(--lime);
    color: var(--ink);
    font-size: 0.74rem;
    font-weight: 700;
  }

  svg {
    transition: transform 0.3s var(--ease-out);
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const Headline = styled.h1`
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.9;
  font-size: clamp(2.8rem, 14vw, 6.5rem);
  color: var(--color-text);
  margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
  text-wrap: initial;

  @media (min-width: 960px) {
    font-size: clamp(4.5rem, 7.4vw, 7.6rem);
  }
`;

/* Le mot-clé SEO principal vit dans le h1, en petit au-dessus du slogan. */
const HeadlineKicker = styled(motion.span)`
  display: block;
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 1.3vw, 0.85rem);
  font-weight: 500;
  letter-spacing: 0.16em;
  line-height: 1.4;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 1.1rem;
`;

const Clip = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
  margin-bottom: -0.06em;
`;

const Line = styled(motion.span)`
  display: block;
`;

const HeroGrid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(2.5rem, 4vw, 4.5rem);
  }
`;

const HeroCopy = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const Subhead = styled.p`
  font-size: clamp(1.05rem, 1.7vw, 1.22rem);
  line-height: 1.6;
  color: var(--color-muted);
  max-width: 30rem;

  strong {
    color: var(--color-text);
    font-weight: 600;
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 520px) {
    flex-direction: column;

    & > div,
    & > div > div {
      width: 100%;
    }
  }
`;

const VideoWrap = styled(motion.div)`
  position: relative;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Sticker = styled.a`
  position: absolute;
  z-index: 3;
  top: clamp(-3.2rem, -5vw, -2.4rem);
  left: clamp(-1rem, -2vw, -0.5rem);
  width: clamp(104px, 13vw, 138px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--lime);
  color: var(--ink);
  display: grid;
  place-items: center;
  box-shadow: 0 18px 40px -16px rgba(15, 15, 13, 0.55);
  transition: transform 0.45s var(--ease-out);

  svg {
    position: absolute;
    inset: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    animation: ${spin} 16s linear infinite;
  }

  text {
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    fill: var(--ink);
  }

  strong {
    font-family: var(--font-display);
    font-size: clamp(1.45rem, 2.6vw, 1.95rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  &:hover {
    transform: rotate(-8deg) scale(1.05);
  }

  @media (max-width: 959px) {
    top: auto;
    left: auto;
    right: 0.75rem;
    bottom: -2.2rem;
  }
`;

const Facts = styled(motion.ul)`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: clamp(3.5rem, 8vw, 5.5rem);
  border-top: 1px solid var(--color-line-strong);

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  li {
    padding: 1.35rem 1.25rem 1.6rem 0;
    border-bottom: 1px solid var(--color-line);

    @media (min-width: 900px) {
      border-bottom: none;
      padding-right: 2rem;

      & + li {
        padding-left: 1.5rem;
        border-left: 1px solid var(--color-line);
      }
    }
  }

  strong {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1;
    margin-bottom: 0.45rem;
  }

  span {
    display: block;
    font-size: 0.9rem;
    line-height: 1.45;
    color: var(--color-muted);
  }
`;

const ScrollHint = styled.a`
  position: absolute;
  right: var(--page-pad-r);
  bottom: 1.6rem;
  display: none;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
  writing-mode: vertical-rl;

  &:hover {
    color: var(--color-text);
  }

  @media (min-width: 1400px) {
    display: inline-flex;
  }
`;

/* ———————————————————————————— Bandeau ———————————————————————————— */

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const MarqueeWrap = styled.div`
  position: relative;
  z-index: 2;
  overflow: hidden;
  background: var(--lime);
  color: var(--ink);
  padding: clamp(0.9rem, 2vw, 1.3rem) 0;
  margin: clamp(2.5rem, 6vw, 4.5rem) -2vw 0.5rem;
  transform: rotate(-1.6deg);
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 38s linear infinite;
`;

const MarqueeItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: clamp(1.25rem, 3vw, 2.25rem);
  padding-right: clamp(1.25rem, 3vw, 2.25rem);
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4.4vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  white-space: nowrap;

  svg {
    width: 0.62em;
    height: 0.62em;
  }
`;

/* ———————————————————————————— Réalisations ———————————————————————————— */

const ProjectsGrid = styled.div`
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.5rem);

  @media (min-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ProjectCard = styled(motion.a)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius);
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  overflow: hidden;
  color: var(--color-text);
  transition: border-color 0.4s var(--ease-out), transform 0.5s var(--ease-out);

  &:hover {
    border-color: var(--color-line-strong);
  }

  ${({ $featured }) =>
    $featured &&
    css`
      @media (min-width: 820px) {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
      }
    `}
`;

const Shot = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0.6rem 0.6rem 0;
  border-radius: calc(var(--radius) - 8px);
  background: var(--paper);
  aspect-ratio: 16 / 10;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.9s var(--ease-out);
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.045);
  }

  ${({ $featured }) =>
    $featured &&
    css`
      @media (min-width: 820px) {
        margin: 0.6rem;
        aspect-ratio: auto;
        min-height: 100%;
      }
    `}
`;

const ShotUrl = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(15, 15, 13, 0.82);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.04em;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--lime);
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  flex: 1;

  ${({ $featured }) =>
    $featured &&
    css`
      @media (min-width: 820px) {
        justify-content: flex-end;
        padding: 2.5rem 2.25rem 2.25rem 1.5rem;
      }
    `}
`;

const ProjectTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
`;

const Status = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  letter-spacing: 0.08em;
  ${({ $concept }) =>
    $concept
      ? css`
          border: 1px solid var(--color-line-strong);
          color: var(--color-muted);
        `
      : css`
          background: var(--lime);
          color: var(--ink);
          font-weight: 500;
        `}
`;

const ProjectTitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
`;

const ProjectName = styled.h3`
  font-size: ${({ $featured }) => ($featured ? 'clamp(2.2rem, 4.6vw, 3.6rem)' : 'clamp(1.6rem, 3vw, 2.2rem)')};
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.95;
`;

const Arrow = styled.span`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--color-line-strong);
  transition: background 0.4s var(--ease-out), color 0.4s var(--ease-out), transform 0.5s var(--ease-out),
    border-color 0.4s var(--ease-out);

  ${ProjectCard}:hover & {
    background: var(--lime);
    border-color: var(--lime);
    color: var(--ink);
    transform: rotate(45deg);
  }
`;

const ProjectOutcome = styled.p`
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--color-muted);
  max-width: 32rem;
`;

const Stack = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;

  li {
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
    background: var(--color-accent-muted);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    color: var(--color-text);
  }
`;

/* ———————————————————————————— Atouts ———————————————————————————— */

const PerksGrid = styled.ul`
  list-style: none;
  display: grid;
  border-top: 1px solid var(--color-line-strong);

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Perk = styled(motion.li)`
  position: relative;
  padding: 2rem 0 2.25rem;
  border-bottom: 1px solid var(--color-line);

  @media (min-width: 720px) {
    padding: 2.25rem 1.75rem 2.5rem;

    &:nth-child(odd) {
      padding-left: 0;
    }

    &:nth-child(even) {
      border-left: 1px solid var(--color-line);
    }
  }

  @media (min-width: 1100px) {
    border-bottom: none;
    padding: 2.5rem 1.75rem 0;

    &:nth-child(odd) {
      padding-left: 1.75rem;
    }

    &:first-child {
      padding-left: 0;
    }

    & + & {
      border-left: 1px solid var(--color-line);
    }
  }

  h3 {
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 1.4rem 0 0.6rem;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--color-muted);
  }
`;

const PerkIcon = styled.span`
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--ink);
  color: var(--lime);
  transition: transform 0.5s var(--ease-out);

  ${Perk}:hover & {
    transform: rotate(-8deg) scale(1.06);
  }
`;

const Local = styled(motion.div)`
  display: grid;
  gap: 1.25rem 3rem;
  margin-top: clamp(3rem, 7vw, 5rem);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: var(--radius);
  background: var(--color-surface);
  border: 1px solid var(--color-line);

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.045em;
  }

  p {
    color: var(--color-muted);
    line-height: 1.7;
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1rem;
  }

  li {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    border: 1px solid var(--color-line-strong);
    font-size: 0.85rem;
  }
`;

/* ———————————————————————————— Méthode ———————————————————————————— */

const Steps = styled.ol`
  position: relative;
  list-style: none;
  display: grid;
  gap: 2.25rem;
  padding-top: 2.75rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
  }
`;

const Rail = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background: var(--color-line);
  overflow: hidden;
`;

const RailFill = styled(motion.span)`
  position: absolute;
  inset: 0;
  background: var(--lime);
  transform-origin: left center;
`;

const Step = styled(motion.li)`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: calc(-2.75rem - 6px);
    left: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--color-bg);
    border: 2px solid var(--lime);
  }

  b {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(3.6rem, 7vw, 5.5rem);
    font-weight: 800;
    letter-spacing: -0.06em;
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--color-line-strong);
    margin-bottom: 1.25rem;
    transition: color 0.4s var(--ease-out), -webkit-text-stroke-color 0.4s var(--ease-out);
  }

  &:hover b {
    color: var(--lime);
    -webkit-text-stroke-color: var(--lime);
  }

  h3 {
    font-size: 1.45rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 0.6rem;
  }

  p {
    color: var(--color-muted);
    line-height: 1.65;
    font-size: 0.96rem;
    max-width: 22rem;
  }
`;

/* ———————————————————————————— FAQ ———————————————————————————— */

const FaqGrid = styled.div`
  display: grid;
  gap: 2.5rem;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 5rem;
  }
`;

const FaqAside = styled.div`
  @media (min-width: 960px) {
    position: sticky;
    top: calc(var(--nav-h) + 2rem);
    align-self: start;
  }
`;

const AskCard = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: var(--radius);
  background: var(--ink);
  color: var(--paper);
  max-width: 24rem;

  p {
    font-size: 0.95rem;
    line-height: 1.55;
    color: #c9c5bb;
    margin-bottom: 1rem;
  }

  strong {
    display: block;
    font-family: var(--font-display);
    font-size: 1.3rem;
    letter-spacing: -0.03em;
    color: var(--paper);
    margin-bottom: 0.35rem;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    color: var(--lime);
  }
`;

const FaqList = styled.div`
  border-top: 1px solid var(--color-line-strong);
`;

const FaqItem = styled.details`
  border-bottom: 1px solid var(--color-line);

  summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.5rem 0;
    cursor: pointer;
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.25;

    &::-webkit-details-marker {
      display: none;
    }

    span {
      flex-shrink: 0;
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid var(--color-line-strong);
      transition: transform 0.4s var(--ease-out), background 0.3s var(--ease-out), border-color 0.3s;
    }

    &:hover span {
      border-color: var(--color-text);
    }
  }

  &[open] summary span {
    transform: rotate(45deg);
    background: var(--lime);
    border-color: var(--lime);
    color: var(--ink);
  }

  p {
    padding: 0 3.5rem 1.75rem 0;
    max-width: 44rem;
    color: var(--color-muted);
    line-height: 1.75;
  }
`;

/* ———————————————————————————— Contact ———————————————————————————— */

const ContactBand = styled(Band)`
  --color-bg: var(--lime);
  --color-text: var(--ink);
  --color-muted: rgba(15, 15, 13, 0.7);
  --color-line: rgba(15, 15, 13, 0.16);
  --color-line-strong: rgba(15, 15, 13, 0.4);
  overflow: hidden;
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 2.5rem;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 4.5rem;
    align-items: start;
  }
`;

const ContactTitle = styled(motion.h2)`
  font-size: clamp(2.8rem, 8vw, 6.4rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.9;
  margin-bottom: 1.5rem;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.25rem;
  border-top: 1px solid var(--color-line-strong);
`;

const ContactLinkRow = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--color-line-strong);
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 600;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
  }

  > svg {
    transition: transform 0.35s var(--ease-out);
  }

  &:hover > svg {
    transform: translate(3px, -3px);
  }
`;

const ContactCard = styled(motion.div)`
  padding: clamp(1.35rem, 4vw, 2.25rem);
  border-radius: var(--radius);
  background: #fff;
  box-shadow: 0 30px 80px -40px rgba(15, 15, 13, 0.6);
`;

/* ———————————————————————————— Données ———————————————————————————— */

const FACTS = [
  { value: '24 h', label: 'pour recevoir votre devis gratuit' },
  { value: '1', label: 'seul interlocuteur, du brief au suivi' },
  { value: '0 €', label: 'le site vitrine pour mes 10 premiers clients' },
  { value: '5', label: 'projets en ligne, à tester juste en dessous' }
];

const SERVICES_MARQUEE = [
  'Site vitrine',
  'E-commerce',
  'Application web',
  'Refonte',
  'Référencement',
  'Maintenance'
];

const PROJECTS = [
  {
    id: 'driva',
    title: 'Driva',
    type: 'Logiciel SaaS',
    status: 'Mon produit',
    outcome:
      'Logiciel de gestion pour auto-écoles : planning des moniteurs, réservations en ligne et suivi des élèves réunis au même endroit.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
    preview: '/preview/driva-preview-2026-10.webp',
    previewSm: '/preview/driva-preview-2026-10-sm.webp',
    previewWidth: 1600,
    previewHeight: 1000,
    link: 'https://driva-auto.fr/'
  },
  {
    id: 'gym',
    title: 'Gym Phys',
    type: 'Site vitrine',
    status: 'Client',
    outcome: 'Site d’une association sportive de Ploërmel : activités, actualités et formulaire de contact.',
    tech: ['WordPress', 'PHP'],
    preview: '/preview/gym-phys-preview.webp',
    previewSm: '/preview/gym-phys-preview-sm.webp',
    previewWidth: 1007,
    link: 'https://www.gym-phys-ploermel.fr/'
  },
  {
    id: 'birdie-golf-club',
    title: 'Le Birdie Golf Club',
    type: 'Site vitrine',
    status: 'Concept',
    outcome: 'Site vitrine pour un golf : ambiance club-house et parcours d’adhésion en quelques clics.',
    tech: ['Vue 3', 'Vite'],
    preview: '/preview/birdie-golf-club-preview.webp',
    previewSm: '/preview/birdie-golf-club-preview-sm.webp',
    previewWidth: 1007,
    link: 'https://golf-club-zeta.vercel.app'
  },
  {
    id: 'noya',
    title: 'Noya',
    type: 'E-commerce',
    status: 'Concept',
    outcome: 'Boutique en ligne pour une marque de streetwear : collection, lookbook et tunnel d’achat.',
    tech: ['React', 'Vite'],
    preview: '/preview/noya-preview.webp',
    previewSm: '/preview/noya-preview-sm.webp',
    previewWidth: 1014,
    link: 'https://noya-website-eight.vercel.app/'
  },
  {
    id: 'aume',
    title: 'Aume',
    type: 'Site de marque',
    status: 'Concept',
    outcome: 'Site éditorial pour une marque de mobilier durable, pensé comme un magazine.',
    tech: ['React', 'Vite'],
    preview: '/preview/aume-preview.webp',
    previewSm: '/preview/aume-preview-sm.webp',
    previewWidth: 1014,
    link: 'https://aumewebsite.vercel.app/'
  }
];

const PERKS = [
  {
    Icon: FiZap,
    title: 'Rapide à charger',
    text: 'Pages légères, images optimisées, pré-rendu : vos visiteurs n’attendent pas, et Google le remarque.'
  },
  {
    Icon: FiSearch,
    title: 'Pensé pour Google',
    text: 'Structure, balises, données structurées et contenu local : les bases du référencement naturel sont posées dès le départ.'
  },
  {
    Icon: FiSmartphone,
    title: 'Parfait sur mobile',
    text: 'La plupart de vos visiteurs arrivent depuis leur téléphone : chaque page est conçue d’abord pour eux.'
  },
  {
    Icon: FiUser,
    title: 'Un seul interlocuteur',
    text: 'Vous échangez directement avec la personne qui conçoit et code votre site, du devis jusqu’au suivi.'
  }
];

const AREAS = ['Vannes', 'Auray', 'Lorient', 'Ploërmel', 'Morbihan', 'Bretagne', 'Toute la France'];

const METHOD = [
  {
    n: '01',
    title: 'Échange',
    text: 'On parle de vos objectifs, de vos clients et de votre budget. Vous recevez un devis clair sous 24 h.'
  },
  {
    n: '02',
    title: 'Maquette',
    text: 'Je conçois le design de votre site. On l’ajuste ensemble jusqu’à validation, avant d’écrire une ligne de code.'
  },
  {
    n: '03',
    title: 'Développement',
    text: 'Un site rapide, adapté au mobile et optimisé pour Google, que vous suivez au fil de l’avancement.'
  },
  {
    n: '04',
    title: 'Mise en ligne',
    text: 'Je publie le site, vous forme à sa prise en main, puis j’assure le suivi et la maintenance.'
  }
];

const FAQ = [
  {
    q: 'Combien coûte un site internet ?',
    a: 'Un site vitrine (jusqu’à 5 pages) est offert à mes 10 premiers clients, puis 50 € par an pour l’hébergement, le nom de domaine et la maintenance. Ensuite, un site vitrine démarre à 400 € HT, une application web sur-mesure à 1 000 € HT et un site e-commerce à 700 € par mois ; la maintenance coûte entre 100 et 200 € par an, et les refontes sont sur devis gratuit.'
  },
  {
    q: 'Combien de temps faut-il pour créer mon site ?',
    a: 'Le délai dépend surtout du nombre de pages et de la disponibilité de vos contenus (textes, photos). Il est fixé noir sur blanc dans le devis, avec les grandes étapes du projet.'
  },
  {
    q: 'Pourrai-je modifier mon site moi-même ?',
    a: 'Oui : je vous forme pour que vous restiez autonome sur vos textes, images et actualités. Et je reste disponible si vous préférez me confier les modifications.'
  },
  {
    q: 'Mon site sera-t-il bien référencé sur Google ?',
    a: 'Structure, vitesse, affichage mobile et balises sont optimisés dès le départ, avec un travail sur les mots-clés de votre activité et de votre ville. Personne ne peut promettre la première place, mais votre site part sur de bonnes bases.'
  },
  {
    q: 'Travaillez-vous uniquement autour de Vannes ?',
    a: 'Non. Je suis basé près de Vannes, dans le Morbihan, et je travaille avec des clients partout en France : les échanges se font en visio, par téléphone ou par e-mail.'
  },
  {
    q: 'Que se passe-t-il après la mise en ligne ?',
    a: 'Je m’occupe des mises à jour, des sauvegardes et des corrections, et je fais évoluer le site selon vos besoins.'
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

const host = (url) => new URL(url).hostname.replace(/^www\./, '');

const lineAnim = (delay) => ({
  initial: { y: '105%' },
  animate: { y: 0 },
  transition: { duration: 1, delay, ease: EASE }
});

/** Le rail se remplit d’une étape à l’autre quand la section entre à l’écran. */
function Method() {
  return (
    <Steps>
      <Rail aria-hidden>
        <RailFill
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
        />
      </Rail>
      {METHOD.map((m, i) => (
        <Step key={m.n} {...revealDelay(0.2 + 0.35 * i)}>
          <b aria-hidden>{m.n}</b>
          <h3>{m.title}</h3>
          <p>{m.text}</p>
        </Step>
      ))}
    </Steps>
  );
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

  return (
    <>
      <SEO {...ROUTE_META['/']} url={`${SITE_URL}/`} />
      <StructuredData />

      <Hero id="top" aria-labelledby="hero-title">
        <HeroInner>
          <HeroTop initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <Pill>
              <i aria-hidden />
              Disponible pour de nouveaux projets
            </Pill>
            <OfferPill href="#offre">
              <strong>Offre</strong>
              Site vitrine offert aux 10 premiers clients
              <FiArrowUpRight aria-hidden size={14} />
            </OfferPill>
          </HeroTop>


          <HeroGrid>
            <div>
              <Headline id="hero-title">
                <HeadlineKicker initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.05 }}>
                  Développeur web freelance · Vannes, Morbihan
                </HeadlineKicker>
                <Clip>
                  <Line {...lineAnim(0.1)}>Des sites qui</Line>
                </Clip>
                <Clip>
                  <Line {...lineAnim(0.18)}>font venir</Line>
                </Clip>
                <Clip>
                  <Line {...lineAnim(0.26)}>
                    des <Mark>clients.</Mark>
                  </Line>
                </Clip>
              </Headline>
              <HeroCopy initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease: EASE }}>
                <Subhead>
                  Je conçois et développe des <strong>sites vitrine</strong>, des <strong>boutiques en ligne</strong> et
                  des <strong>applications web</strong> rapides, faciles à trouver sur Google et pensés pour transformer
                  vos visiteurs en clients.
                </Subhead>
                <CtaRow>
                  <Magnetic>
                    <ButtonPrimary href="#contact">
                      Demander un devis gratuit
                      <FiArrowUpRight aria-hidden size={18} />
                    </ButtonPrimary>
                  </Magnetic>
                  <ButtonGhost href="#realisations">Voir mes réalisations</ButtonGhost>
                </CtaRow>
              </HeroCopy>
            </div>

            <VideoWrap initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.55, ease: EASE }}>
              <Sticker href="#offre" aria-label="Offre de lancement : site vitrine offert aux 10 premiers clients">
                <svg viewBox="0 0 100 100" aria-hidden>
                  <defs>
                    <path id="sticker-circle" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
                  </defs>
                  <text>
                    <textPath href="#sticker-circle" textLength="244" lengthAdjust="spacing">Offre de lancement · site offert · </textPath>
                  </text>
                </svg>
                <strong aria-hidden>0 €</strong>
              </Sticker>
              <Showreel />
            </VideoWrap>
          </HeroGrid>

          <Facts {...revealDelay(0.1)}>
            {FACTS.map((f) => (
              <li key={f.value}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </Facts>
        </HeroInner>

        <ScrollHint href="#realisations">
          Défiler
          <FiArrowDown aria-hidden size={14} />
        </ScrollHint>

        <MarqueeWrap aria-hidden>
          <MarqueeTrack>
            {[0, 1].map((k) => (
              <React.Fragment key={k}>
                {SERVICES_MARQUEE.map((t) => (
                  <MarqueeItem key={`${k}-${t}`}>
                    {t}
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                    </svg>
                  </MarqueeItem>
                ))}
              </React.Fragment>
            ))}
          </MarqueeTrack>
        </MarqueeWrap>
      </Hero>

      <Band $dark id="realisations" aria-labelledby="realisations-title">
        <Container>
          <SectionHead>
            <div>
              <Eyebrow>01 — Réalisations</Eyebrow>
              <SectionTitle id="realisations-title" {...reveal}>
                Des projets <Mark>en ligne</Mark>, à tester.
              </SectionTitle>
            </div>
            <SectionLead {...revealDelay(0.08)}>
              Logiciel métier, sites vitrine, e-commerce : chaque projet est en ligne. Cliquez pour le parcourir comme
              le feraient vos clients.
            </SectionLead>
          </SectionHead>

          <ProjectsGrid>
            {PROJECTS.map((p, i) => {
              const featured = i === 0;
              return (
                <ProjectCard
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  $featured={featured}
                  {...revealDelay(0.05 * (i % 2))}
                >
                  <Shot $featured={featured}>
                    <img
                      src={p.preview}
                      srcSet={`${p.previewSm} 800w, ${p.preview} ${p.previewWidth}w`}
                      sizes={featured ? '(max-width: 819px) 100vw, 60vw' : '(max-width: 819px) 100vw, 48vw'}
                      alt={`Capture d’écran du site ${p.title} (${p.type.toLowerCase()})`}
                      width={p.previewWidth}
                      height={p.previewHeight || Math.round(p.previewWidth * 0.625)}
                      loading={featured ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <ShotUrl>{host(p.link)}</ShotUrl>
                  </Shot>
                  <ProjectInfo $featured={featured}>
                    <ProjectTop>
                      <span>
                        {String(i + 1).padStart(2, '0')} — {p.type}
                      </span>
                      <Status $concept={p.status === 'Concept'}>{p.status}</Status>
                    </ProjectTop>
                    <ProjectTitleRow>
                      <ProjectName $featured={featured}>{p.title}</ProjectName>
                      <Arrow aria-hidden>
                        <FiArrowUpRight size={20} />
                      </Arrow>
                    </ProjectTitleRow>
                    <ProjectOutcome>{p.outcome}</ProjectOutcome>
                    <Stack aria-label="Technologies">
                      {p.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </Stack>
                    <span className="sr-only">(ouvre le site dans un nouvel onglet)</span>
                  </ProjectInfo>
                </ProjectCard>
              );
            })}
          </ProjectsGrid>
        </Container>
      </Band>

      <OffersSection />

      <Band id="atouts" aria-labelledby="atouts-title" style={{ background: 'var(--paper-2)' }}>
        <Container>
          <SectionHead>
            <div>
              <Eyebrow>03 — Pourquoi moi</Eyebrow>
              <SectionTitle id="atouts-title" {...reveal}>
                Beau, rapide et <Mark>rentable.</Mark>
              </SectionTitle>
            </div>
            <SectionLead {...revealDelay(0.08)}>
              Chaque site est construit pour être trouvé, compris en quelques secondes et donner envie de vous
              contacter.
            </SectionLead>
          </SectionHead>

          <PerksGrid>
            {PERKS.map(({ Icon, title, text }, i) => (
              <Perk key={title} {...revealDelay(0.07 * i)}>
                <PerkIcon aria-hidden>
                  <Icon size={22} />
                </PerkIcon>
                <h3>{title}</h3>
                <p>{text}</p>
              </Perk>
            ))}
          </PerksGrid>

          <Local {...reveal}>
            <h3>Création de site internet à Vannes et dans le Morbihan</h3>
            <div>
              <p>
                Basé près de Vannes, j’accompagne les artisans, commerçants, indépendants, associations et PME de
                Bretagne qui veulent une vraie présence en ligne. Rendez-vous possible dans le Morbihan, et
                collaboration à distance partout en France.
              </p>
              <ul aria-label="Zone d’intervention">
                {AREAS.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </Local>
        </Container>
      </Band>

      <Band $dark id="methode" aria-labelledby="methode-title">
        <Container>
          <SectionHead>
            <div>
              <Eyebrow>04 — Méthode</Eyebrow>
              <SectionTitle id="methode-title" {...reveal}>
                Quatre étapes, <Mark>zéro surprise.</Mark>
              </SectionTitle>
            </div>
            <SectionLead {...revealDelay(0.08)}>
              Vous savez à chaque instant où en est votre projet, ce qu’il coûte et ce qui vient ensuite.
            </SectionLead>
          </SectionHead>
          <Method />
        </Container>
      </Band>

      <Band id="faq" aria-labelledby="faq-title">
        <Container>
          <FaqGrid>
            <FaqAside>
              <Eyebrow>05 — Questions</Eyebrow>
              <SectionTitle id="faq-title" {...reveal}>
                Questions fréquentes
              </SectionTitle>
              <AskCard>
                <strong>Une autre question ?</strong>
                <p>Écrivez-moi, je réponds personnellement à chaque message.</p>
                <a href="mailto:contact@matteo-rlt.fr">
                  contact@matteo-rlt.fr <FiArrowUpRight aria-hidden />
                </a>
              </AskCard>
            </FaqAside>
            <FaqList>
              {FAQ.map(({ q, a }, i) => (
                <FaqItem key={q} open={i === 0}>
                  <summary>
                    {q}
                    <span aria-hidden>
                      <FiPlus size={18} />
                    </span>
                  </summary>
                  <p>{a}</p>
                </FaqItem>
              ))}
            </FaqList>
          </FaqGrid>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
        </Container>
      </Band>

      <ContactBand id="contact" aria-labelledby="contact-title">
        <Container>
          <ContactGrid>
            <div>
              <Eyebrow>06 — Contact</Eyebrow>
              <ContactTitle id="contact-title" {...reveal}>
                Parlons de votre projet.
              </ContactTitle>
              <SectionLead {...revealDelay(0.08)}>
                Décrivez votre activité et votre besoin en quelques lignes : je vous réponds sous 24 h ouvrées avec
                une première proposition, gratuitement et sans engagement.
              </SectionLead>
              <ContactLinks>
                <ContactLinkRow href="mailto:contact@matteo-rlt.fr">
                  <span>
                    <FiMail aria-hidden size={20} />
                    contact@matteo-rlt.fr
                  </span>
                  <FiArrowUpRight aria-hidden size={20} />
                </ContactLinkRow>
                <ContactLinkRow href="https://linkedin.com/in/matteo-rlt" target="_blank" rel="noopener noreferrer">
                  <span>
                    <FiLinkedin aria-hidden size={20} />
                    LinkedIn
                  </span>
                  <FiArrowUpRight aria-hidden size={20} />
                </ContactLinkRow>
              </ContactLinks>
            </div>
            <ContactCard {...revealDelay(0.12)}>
              <ContactForm idPrefix="home" />
            </ContactCard>
          </ContactGrid>
        </Container>
      </ContactBand>
    </>
  );
};

export default Home;
