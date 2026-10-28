import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Band, Container, Eyebrow, SectionHead, SectionTitle, SectionLead, Mark, darkTokens, reveal, revealDelay } from './ui.jsx';
import { trackFormEvent, trackConversion } from '../utils/analytics';
import { sendViaEmailJs } from '../utils/emailjsSend.js';
import {
  FiCheckCircle,
  FiCheck,
  FiUser,
  FiMail,
  FiBriefcase,
  FiPhone,
  FiGlobe,
  FiClock,
  FiTarget,
  FiUsers,
  FiAward,
  FiLayout,
  FiLayers,
  FiShoppingCart,
  FiRefreshCw,
  FiTool,
  FiX,
  FiZap,
  FiChevronDown,
  FiArrowUpRight,
  FiGift,
} from 'react-icons/fi';

const OffersRoot = styled(Band)`
  scroll-margin-top: calc(var(--nav-h) + 0.75rem);
`;

const Anchor = styled.span`
  display: block;
  scroll-margin-top: var(--scroll-margin);
`;

const Launch = styled(motion.article)`
  ${darkTokens}
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 2rem 3.5rem;
  margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
  padding: clamp(1.6rem, 4.5vw, 3.25rem);
  border-radius: calc(var(--radius) + 6px);
  background: var(--color-bg);
  color: var(--color-text);
  scroll-margin-top: var(--scroll-margin);

  /* Halo citron discret dans l’angle. */
  &::after {
    content: '';
    position: absolute;
    right: -12%;
    top: -40%;
    width: 60%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212, 255, 63, 0.18), transparent 65%);
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    align-items: end;
  }
`;

const LaunchBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1.4rem;
  border-radius: 999px;
  background: var(--lime);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const LaunchTitle = styled.h3`
  font-size: clamp(2.2rem, 5.4vw, 4.2rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 0.92;
  margin-bottom: 1.75rem;
`;

const CardPoints = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.65rem 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  li {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 0.6rem;
    font-size: 0.95rem;
    line-height: 1.45;
    color: var(--color-text);
  }

  svg {
    margin-top: 0.05rem;
    padding: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-accent-muted);
    color: var(--lime);
  }
`;

const PriceBox = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-line);

  @media (min-width: 900px) {
    padding: 0 0 0 2.5rem;
    border-top: none;
    border-left: 1px solid var(--color-line);
  }
`;

const Price = styled.p`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem 0.9rem;
  margin-bottom: 0.75rem;

  s {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-muted);
    text-decoration-thickness: 2px;
  }

  strong {
    font-family: var(--font-display);
    font-size: clamp(4.5rem, 11vw, 7.5rem);
    font-weight: 800;
    letter-spacing: -0.07em;
    line-height: 0.85;
    color: var(--lime);
  }

  span {
    font-size: 0.95rem;
    color: var(--color-text);
  }
`;

const FinePrint = styled.p`
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--color-muted);
  margin-bottom: 1.5rem;
  max-width: 26rem;
`;

const DevisOpenButton = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 54px;
  padding: 0 1.55rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  font-family: var(--font-body);
  color: var(--color-accent-ink);
  background: var(--color-accent);
  overflow: hidden;
  isolation: isolate;
  transition: color 0.35s var(--ease-out);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--lime);
    transform: translateY(101%);
    transition: transform 0.45s var(--ease-out);
  }

  &:hover {
    color: var(--ink);
  }

  &:hover::before {
    transform: translateY(0);
  }
`;

const LaunchCta = styled(DevisOpenButton)`
  width: 100%;

  &::before {
    background: var(--paper);
  }
`;

const CardsGrid = styled.ul`
  list-style: none;
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.5rem);

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled(motion.li)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  padding: 1.6rem 1.6rem 1.4rem;
  border-radius: var(--radius);
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  transition: background 0.45s var(--ease-out), color 0.45s var(--ease-out), border-color 0.45s var(--ease-out);

  &:hover {
    ${darkTokens}
    background: var(--color-bg);
    color: var(--color-text);
    border-color: var(--color-bg);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: auto;
  padding-bottom: 2.5rem;
`;

const CardNum = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--color-muted);
`;

const CardIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-muted);
  color: var(--color-text);
  transition: background 0.45s var(--ease-out), color 0.45s var(--ease-out), transform 0.5s var(--ease-out);

  ${Card}:hover & {
    background: var(--lime);
    color: var(--ink);
    transform: rotate(-8deg);
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.45rem, 2.4vw, 1.75rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.02;
  margin-bottom: 0.55rem;
`;

const CardAudience = styled.p`
  font-size: 0.93rem;
  line-height: 1.55;
  color: var(--color-muted);
  margin-bottom: 1.4rem;
`;

const CardPrice = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2rem 0.45rem;
  margin: -0.4rem 0 1.25rem;

  small {
    flex-basis: 100%;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  strong {
    font-family: var(--font-display);
    font-size: clamp(1.7rem, 2.6vw, 2.1rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1;
    color: var(--color-text);
    transition: color 0.45s var(--ease-out);
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-muted);
  }

  /* Rappel de l’offre de lancement. */
  em {
    align-self: center;
    margin-left: 0.3rem;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    background: var(--lime);
    color: var(--ink);
    font-style: normal;
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
  }

  ${Card}:hover & strong {
    color: var(--lime);
  }
`;

const CardCta = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.4rem;
  padding: 1rem 0 0.2rem;
  border-top: 1px solid var(--color-line) !important;
  background: none;
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: 600;

  /* Toute la carte est cliquable. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  svg {
    transition: transform 0.35s var(--ease-out);
  }

  ${Card}:hover & svg {
    transform: translate(3px, -3px);
    color: var(--lime);
  }
`;

const HelpCard = styled(motion.li)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 300px;
  padding: 1.6rem;
  border-radius: var(--radius);
  background: var(--lime);
  color: var(--ink);

  ${CardTitle} {
    font-size: clamp(1.7rem, 3vw, 2.2rem);
  }

  ${CardAudience} {
    color: rgba(15, 15, 13, 0.72);
    margin-bottom: 0;
  }

  ${DevisOpenButton} {
    --color-accent: var(--ink);
    --color-accent-ink: var(--paper);

    &::before {
      background: var(--paper);
    }
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom))
    max(1rem, env(safe-area-inset-left));
  background: rgba(15, 15, 13, 0.6);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
`;

const ModalPanel = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 620px;
  max-height: min(90dvh, 880px);
  /* visible : sinon le menu natif du <select> peut être clippé par l’ancêtre */
  overflow: visible;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius);
  background: #fff;
  color: var(--ink);
  box-shadow: 0 40px 120px -30px rgba(15, 15, 13, 0.7);
`;

const ModalBody = styled.div`
  flex: 1;
  min-height: 0;
  max-height: min(85dvh, 820px);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--radius);
`;

const ModalClose = styled.button`
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: var(--ink);
  background: var(--paper);
  transition: background 0.25s ease, transform 0.35s var(--ease-out);

  &:hover {
    background: var(--lime);
    transform: rotate(90deg);
  }
`;

const QuoteForm = styled.div`
  padding: 2.25rem 2rem 2rem;

  @media (max-width: 520px) {
    padding: 2rem 1.25rem 1.5rem;
  }
`;

const FormTitle = styled.h3`
  font-size: clamp(1.7rem, 4vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  margin-bottom: 0.5rem;
  padding-right: 3rem;
`;

const FormLead = styled.p`
  font-size: 0.93rem;
  color: #5d5a53;
  line-height: 1.55;
  margin-bottom: 1.75rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: #5d5a53;
  margin-bottom: 0.45rem;
`;

const LabelRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  svg {
    flex-shrink: 0;
  }
`;

const NeedTypeGroup = styled(FormGroup)`
  position: relative;
  z-index: 10;
`;

const NeedTypeCustomWrap = styled.div`
  position: relative;
  width: 100%;
`;

const fieldBase = `
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--paper);
  border: 1px solid transparent;
  border-radius: 12px;
  color: var(--ink);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:focus {
    outline: none;
    background: #fff;
    border-color: var(--ink);
    box-shadow: 0 0 0 4px rgba(212, 255, 63, 0.6);
  }

  &::placeholder {
    color: #8d897f;
  }
`;

const NeedTypeTrigger = styled.button`
  ${fieldBase}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 50px;
  text-align: left;

  &[aria-expanded='true'] {
    background: #fff;
    border-color: var(--ink);
    box-shadow: 0 0 0 4px rgba(212, 255, 63, 0.6);
  }
`;

const NeedTypeTriggerLabel = styled.span`
  flex: 1;
  min-width: 0;
  line-height: 1.35;
`;

const NeedTypeList = styled(motion.ul)`
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  max-height: min(280px, 46vh);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(15, 15, 13, 0.12);
  box-shadow: 0 24px 60px -20px rgba(15, 15, 13, 0.45);
`;

const NeedTypeOption = styled.li`
  margin: 0;
  padding: 0;
`;

const NeedTypeOptionBtn = styled.button`
  display: block;
  width: 100%;
  padding: 0.7rem 0.8rem;
  text-align: left;
  font-size: 0.94rem;
  line-height: 1.45;
  color: var(--ink);
  background: transparent;
  border-radius: 9px;
  font-family: inherit;

  &:hover {
    background: var(--paper);
  }

  &[data-selected='true'] {
    background: var(--lime);
    font-weight: 600;
  }
`;

const Input = styled.input`
  ${fieldBase}
`;

const TextArea = styled.textarea`
  ${fieldBase}
  min-height: 110px;
  resize: vertical;
`;

const FormErrorBox = styled.div`
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: #fdecea;
  border: 1px solid #f3b5ae;
  color: #8a1c10;
  font-size: 0.9rem;
  line-height: 1.45;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  min-height: 56px;
  background: var(--ink);
  color: var(--paper);
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover:not(:disabled) {
    background: var(--lime);
    color: var(--ink);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const OptionalToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  border: 1px dashed rgba(15, 15, 13, 0.35) !important;
  font-size: 0.88rem;
  font-weight: 600;
  margin: 0.25rem 0 1rem;

  &:hover {
    background: var(--paper);
  }
`;

const OptionalSection = styled(motion.div)`
  overflow: hidden;
`;

const Toast = styled(motion.div)`
  position: fixed;
  top: calc(var(--nav-h) + 12px);
  right: 1rem;
  z-index: 2600;
  max-width: min(400px, calc(100vw - 2rem));
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  border-radius: 16px;
  background: var(--ink);
  color: var(--paper);
  box-shadow: 0 24px 60px -20px rgba(15, 15, 13, 0.6);

  > svg {
    flex-shrink: 0;
    color: var(--lime);
  }

  strong {
    display: block;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #c9c5bb;
  }

  button {
    margin-left: auto;
    background: none;
    color: inherit;
    font-size: 1.3rem;
    line-height: 1;
    opacity: 0.7;
  }
`;

const OFFER_CATEGORIES = [
  {
    id: 'vitrine',
    Icon: FiLayout,
    title: 'Sites vitrine',
    audience: 'Artisans, indépendants, associations et PME qui veulent être trouvés et contactés.',
    price: { prefix: 'À partir de', amount: '400 €', suffix: 'HT', tag: '0 € pour les 10 premiers clients' },
  },
  {
    id: 'sur-mesure',
    Icon: FiLayers,
    title: 'Applications web sur-mesure',
    audience: 'Outils métier, plateformes avec comptes utilisateurs, SaaS.',
    price: { prefix: 'À partir de', amount: '1 000 €', suffix: 'HT' },
  },
  {
    id: 'ecommerce',
    Icon: FiShoppingCart,
    title: 'E-commerce',
    audience: 'Commerçants et marques qui veulent vendre en ligne.',
    price: { prefix: 'À partir de', amount: '700 €', suffix: '/ mois' },
  },
  {
    id: 'refonte',
    Icon: FiRefreshCw,
    title: 'Refonte & migration',
    audience: 'Sites vieillissants, lents ou difficiles à mettre à jour.',
    price: { prefix: 'Tarif', amount: 'Sur devis' },
  },
  {
    id: 'maintenance',
    Icon: FiTool,
    title: 'Maintenance & évolutions',
    audience: 'Sites existants à sécuriser et à faire grandir.',
    price: { prefix: 'Entre', amount: '100 et 200 €', suffix: '/ an' },
  },
];


/** Offre de lancement : site vitrine offert aux 10 premiers clients. */
const LAUNCH_OFFER = {
  id: 'offre-lancement',
  label: 'Offre de lancement — site vitrine offert',
  regularPrice: '400 €',
  price: '0 €',
  yearly: '50 € / an',
  includes: [
    'Jusqu’à 5 pages : accueil, services, à propos, contact…',
    'Design sur-mesure, adapté au mobile',
    'Formulaire de contact et mentions légales',
    'Référencement Google de base',
    'Mise en ligne incluse',
  ],
};

/** Tarif lisible d’une catégorie, pour l’e-mail de demande de devis. */
const priceLabel = (price) =>
  price ? [price.prefix, price.amount, price.suffix].filter(Boolean).join(' ') : 'Sur devis personnalisé';

const NEED_OPTIONS = [
  { value: '', label: 'Indifférent / à définir ensemble' },
  { value: LAUNCH_OFFER.id, label: LAUNCH_OFFER.label },
  ...OFFER_CATEGORIES.map((c) => ({ value: c.id, label: c.title })),
  { value: 'autre', label: 'Autre besoin (précisez dans le message)' },
];

const OffersSection = () => {
  const needTypeWrapRef = useRef(null);
  const needTypeListRef = useRef(null);
  const devisOpenerRef = useRef(null);
  const [needTypeOpen, setNeedTypeOpen] = useState(false);
  const [needListRect, setNeedListRect] = useState(null);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    needType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    timeline: '',
    projectType: '',
    targetAudience: '',
    competitors: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [isDevisOpen, setIsDevisOpen] = useState(false);

  const openDevis = (opener, needType) => {
    devisOpenerRef.current = opener;
    setFormData((prev) => ({ ...prev, needType }));
    setIsDevisOpen(true);
  };

  const closeDevisModal = () => {
    setNeedTypeOpen(false);
    setFormError('');
    setIsDevisOpen(false);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    if (!isDevisOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Tab') {
        /* Garde le focus clavier dans la modale. */
        const panel = document.getElementById('offres-form');
        const focusables = panel?.querySelectorAll('button:not([disabled]), input, textarea, a[href]');
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (e.key !== 'Escape') return;
      if (needTypeOpen) {
        e.stopPropagation();
        setNeedTypeOpen(false);
      } else {
        setIsDevisOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isDevisOpen, needTypeOpen]);

  /* Rend le focus au bouton d’ouverture quand la modale se ferme. */
  useEffect(() => {
    if (!isDevisOpen) return undefined;
    return () => devisOpenerRef.current?.focus({ preventScroll: true });
  }, [isDevisOpen]);

  useLayoutEffect(() => {
    if (!needTypeOpen) {
      setNeedListRect(null);
      return undefined;
    }
    const update = () => {
      const el = needTypeWrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setNeedListRect({
        top: r.bottom + 6,
        left: r.left,
        width: r.width,
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [needTypeOpen]);

  useEffect(() => {
    if (!needTypeOpen) return undefined;
    const onDown = (e) => {
      const t = e.target;
      if (needTypeWrapRef.current?.contains(t) || needTypeListRef.current?.contains(t)) return;
      setNeedTypeOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [needTypeOpen]);

  useEffect(() => {
    if (!isDevisOpen) return undefined;
    const id = requestAnimationFrame(() => {
      document.getElementById('needType-trigger')?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [isDevisOpen]);

  const resolveNeedLabel = () => {
    const opt = NEED_OPTIONS.find((o) => o.value === formData.needType);
    return opt?.label || 'Non précisé';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormError('');
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const focusField = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el?.focus({ preventScroll: true });
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    /* Validation explicite + message visible (noValidate sur le form). */
    if (!formData.firstName.trim()) {
      setFormError('Indiquez votre prénom.');
      focusField('offer-firstName');
      return;
    }
    if (!formData.lastName.trim()) {
      setFormError('Indiquez votre nom.');
      focusField('offer-lastName');
      return;
    }
    if (!formData.email.trim()) {
      setFormError('Indiquez une adresse e-mail.');
      focusField('offer-email');
      return;
    }
    if (!EMAIL_RE.test(formData.email.trim())) {
      setFormError('L’adresse e-mail ne semble pas valide (ex. : vous@domaine.fr).');
      focusField('offer-email');
      return;
    }
    if (!formData.message.trim()) {
      setFormError('Décrivez votre projet en quelques mots.');
      focusField('offer-message');
      return;
    }

    setIsSubmitting(true);

    trackFormEvent('Offer Form', 'submit', {
      package_id: formData.needType || 'unspecified',
    });

    const SEND_TIMEOUT_MS = 35000;
    const withTimeout = (promise, ms) =>
      Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Délai dépassé. Vérifiez votre connexion ou réessayez.')), ms)
        ),
      ]);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const dash = (v) => (v && String(v).trim() ? String(v).trim() : '—');
    const quoteTs = new Date().toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
      dateStyle: 'long',
      timeStyle: 'short',
    });

    try {
      await withTimeout(
        sendViaEmailJs(
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: fullName,
          from_name: fullName,
          email: formData.email.trim(),
          from_email: formData.email.trim(),
          reply_to: formData.email.trim(),
          phone: dash(formData.phone),
          company: dash(formData.company),
          website: dash(formData.website),
          timeline: dash(formData.timeline),
          project_type: dash(formData.projectType),
          target_audience: dash(formData.targetAudience),
          competitors: dash(formData.competitors),
          message: formData.message.trim(),
          package_id: formData.needType || '',
          package_title: resolveNeedLabel(),
          package_price:
            formData.needType === LAUNCH_OFFER.id
              ? `${LAUNCH_OFFER.price} au lieu de ${LAUNCH_OFFER.regularPrice}, puis ${LAUNCH_OFFER.yearly}`
              : priceLabel(OFFER_CATEGORIES.find((c) => c.id === formData.needType)?.price),
          package_period:
            formData.needType === LAUNCH_OFFER.id ? 'Abonnement annuel sans engagement' : 'Selon périmètre (à préciser)',
          package_features: `Besoin indiqué : ${resolveNeedLabel()}. Estimation et planification après échange sur le périmètre fonctionnel et la stack.`,
          budget: 'Non communiqué sur le formulaire — devis sur mesure',
          timestamp: quoteTs,
        },
        'quote'
      ),
        SEND_TIMEOUT_MS
      );

      setShowNotification(true);
      trackConversion('Offer Request', 1, 'EUR');

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17634174804/6HasCOPNoqkbENTO0NhB',
          value: 1.0,
          currency: 'EUR',
        });
      }

      setFormData({
        needType: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        timeline: '',
        projectType: '',
        targetAudience: '',
        competitors: '',
        message: '',
      });
      setIsDevisOpen(false);
      setShowOptional(false);
      setFormError('');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      const msg = error?.message || error?.text || 'Erreur inconnue';
      setFormError(
        'L’envoi n’a pas abouti. Réessayez dans un instant ou écrivez-moi directement à contact@matteo-rlt.fr.'
      );
      trackFormEvent('Offer Form', 'error', {
        error_message: typeof msg === 'string' ? msg : String(msg),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OffersRoot id="services" aria-labelledby="offres-title">
      <AnimatePresence>
        {showNotification && (
          <Toast
            role="status"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <FiCheckCircle size={24} aria-hidden strokeWidth={2.25} />
            <div>
              <strong>Demande envoyée !</strong>
              <p>Je vous réponds sous 24 h ouvrées.</p>
            </div>
            <button type="button" onClick={() => setShowNotification(false)} aria-label="Fermer la notification">
              ×
            </button>
          </Toast>
        )}
      </AnimatePresence>

      <Anchor id="offres" aria-hidden />
      <Container>
        <SectionHead>
          <div>
            <Eyebrow>02 — Services</Eyebrow>
            <SectionTitle id="offres-title" {...reveal}>
              Ce que je peux <Mark>faire pour vous.</Mark>
            </SectionTitle>
          </div>
          <SectionLead {...revealDelay(0.08)}>
            Du site vitrine à l’application sur-mesure, chaque projet commence par un devis gratuit et sans
            engagement.
          </SectionLead>
        </SectionHead>

        <Launch id="offre" {...reveal} aria-labelledby="offre-title">
          <div>
            <LaunchBadge>
              <FiGift aria-hidden size={14} />
              Offre de lancement — 10 premiers clients
            </LaunchBadge>
            <LaunchTitle id="offre-title">Votre site vitrine, offert.</LaunchTitle>
            <CardPoints>
              {LAUNCH_OFFER.includes.map((pt) => (
                <li key={pt}>
                  <FiCheck aria-hidden strokeWidth={3} />
                  {pt}
                </li>
              ))}
            </CardPoints>
          </div>
          <PriceBox>
            <Price>
              <s aria-label={`Prix habituel ${LAUNCH_OFFER.regularPrice}`}>{LAUNCH_OFFER.regularPrice}</s>
              <strong>{LAUNCH_OFFER.price}</strong>
              <span>de création</span>
            </Price>
            <FinePrint>
              Puis {LAUNCH_OFFER.yearly} pour l’hébergement, le nom de domaine et la maintenance. Sans engagement :
              sans renouvellement, le site est mis hors ligne.
            </FinePrint>
            <LaunchCta type="button" onClick={(e) => openDevis(e.currentTarget, LAUNCH_OFFER.id)} whileTap={{ scale: 0.98 }}>
              <FiZap size={18} strokeWidth={2.25} aria-hidden />
              Profiter de l’offre
            </LaunchCta>
          </PriceBox>
        </Launch>

        <CardsGrid>
          {OFFER_CATEGORIES.map(({ id, Icon, title, audience, price }, i) => (
            <Card key={id} {...revealDelay(0.05 * (i % 3))}>
              <CardTop>
                <CardIcon aria-hidden>
                  <Icon size={22} strokeWidth={2} />
                </CardIcon>
                <CardNum aria-hidden>{String(i + 1).padStart(2, '0')}</CardNum>
              </CardTop>
              <CardTitle>{title}</CardTitle>
              <CardAudience>{audience}</CardAudience>
              <CardPrice>
                {price.prefix ? <small>{price.prefix}</small> : null}
                <strong>{price.amount}</strong>
                {price.suffix ? <span>{price.suffix}</span> : null}
                {price.tag ? <em>{price.tag}</em> : null}
              </CardPrice>
              <CardCta type="button" onClick={(e) => openDevis(e.currentTarget, id)}>
                <span>
                  Demander un devis
                  <span className="sr-only"> — {title}</span>
                </span>
                <FiArrowUpRight aria-hidden size={18} />
              </CardCta>
            </Card>
          ))}
          <HelpCard {...revealDelay(0.1)}>
            <div>
              <CardTitle>Pas sûr de ce qu’il vous faut ?</CardTitle>
              <CardAudience>Décrivez votre projet en une phrase, je vous oriente vers la bonne solution.</CardAudience>
            </div>
            <DevisOpenButton type="button" onClick={(e) => openDevis(e.currentTarget, '')} whileTap={{ scale: 0.98 }}>
              <FiZap size={18} strokeWidth={2.25} aria-hidden />
              Devis gratuit en 30 secondes
            </DevisOpenButton>
          </HelpCard>
        </CardsGrid>
      </Container>

      <AnimatePresence>
        {isDevisOpen && (
          <ModalOverlay
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDevisModal}
          >
            <ModalPanel
              id="offres-form"
              role="dialog"
              aria-modal="true"
              aria-labelledby="devis-modal-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ModalClose type="button" onClick={closeDevisModal} aria-label="Fermer le formulaire de devis">
                <FiX size={22} aria-hidden />
              </ModalClose>
              <ModalBody>
                <QuoteForm>
        <FormTitle id="devis-modal-title">Demander un devis gratuit</FormTitle>
        <FormLead>
          Une ligne suffit pour démarrer — vous pouvez préciser votre besoin principal et compléter les champs
          optionnels si vous le souhaitez.
        </FormLead>

        <form onSubmit={handleSubmit} noValidate>
          <NeedTypeGroup>
            <Label id="needType-label">Votre besoin principal</Label>
            <NeedTypeCustomWrap ref={needTypeWrapRef}>
              <NeedTypeTrigger
                type="button"
                id="needType-trigger"
                aria-labelledby="needType-label"
                aria-haspopup="listbox"
                aria-expanded={needTypeOpen}
                aria-controls="needType-listbox"
                onClick={() => setNeedTypeOpen((open) => !open)}
              >
                <NeedTypeTriggerLabel>
                  {NEED_OPTIONS.find((o) => o.value === formData.needType)?.label ?? NEED_OPTIONS[0].label}
                </NeedTypeTriggerLabel>
                <FiChevronDown
                  size={20}
                  strokeWidth={2.25}
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    opacity: 0.9,
                    transform: needTypeOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </NeedTypeTrigger>
            </NeedTypeCustomWrap>
            {typeof document !== 'undefined' &&
              createPortal(
                <AnimatePresence>
                  {needTypeOpen && needListRect ? (
                    <NeedTypeList
                      ref={needTypeListRef}
                      key="need-type-listbox"
                      id="needType-listbox"
                      role="listbox"
                      aria-labelledby="needType-label"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: 'fixed',
                        top: needListRect.top,
                        left: needListRect.left,
                        width: needListRect.width,
                        zIndex: 10050,
                      }}
                    >
                      {NEED_OPTIONS.map((o) => (
                        <NeedTypeOption key={o.value || 'empty'} role="presentation">
                          <NeedTypeOptionBtn
                            type="button"
                            role="option"
                            data-selected={formData.needType === o.value}
                            aria-selected={formData.needType === o.value}
                            onClick={() => {
                              setFormError('');
                              setFormData((prev) => ({ ...prev, needType: o.value }));
                              setNeedTypeOpen(false);
                            }}
                          >
                            {o.label}
                          </NeedTypeOptionBtn>
                        </NeedTypeOption>
                      ))}
                    </NeedTypeList>
                  ) : null}
                </AnimatePresence>,
                document.body
              )}
          </NeedTypeGroup>

          <FormGrid>
            <FormGroup>
              <Label htmlFor="offer-firstName">
                <LabelRow>
                  <FiUser size={16} aria-hidden />
                  Prénom *
                </LabelRow>
              </Label>
              <Input
                id="offer-firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Votre prénom"
                required
                autoComplete="given-name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="offer-lastName">
                <LabelRow>
                  <FiUser size={16} aria-hidden />
                  Nom *
                </LabelRow>
              </Label>
              <Input
                id="offer-lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Votre nom"
                required
                autoComplete="family-name"
              />
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label htmlFor="offer-email">
              <LabelRow>
                <FiMail size={16} aria-hidden />
                Email *
              </LabelRow>
            </Label>
            <Input
              id="offer-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="vous@email.com"
              required
              autoComplete="email"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="offer-company">
              <LabelRow>
                <FiBriefcase size={16} aria-hidden />
                Entreprise / association
              </LabelRow>
            </Label>
            <Input
              id="offer-company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Facultatif"
              autoComplete="organization"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="offer-message">Votre projet en quelques mots *</Label>
            <TextArea
              id="offer-message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Objectif, contraintes, délais souhaités…"
              required
            />
          </FormGroup>

          <OptionalToggle
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            aria-expanded={showOptional}
          >
            {showOptional ? '− Masquer les détails' : '+ Ajouter des détails (facultatif)'}
          </OptionalToggle>

          <OptionalSection
            initial={{ height: 0, opacity: 0 }}
            animate={showOptional ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            aria-hidden={!showOptional}
          >
            <FormGroup>
              <Label htmlFor="offer-phone">
                <LabelRow>
                  <FiPhone size={16} aria-hidden />
                  Téléphone
                </LabelRow>
              </Label>
              <Input
                id="offer-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="06 12 34 56 78"
                autoComplete="tel"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="offer-website">
                <LabelRow>
                  <FiGlobe size={16} aria-hidden />
                  Site existant
                </LabelRow>
              </Label>
              <Input
                id="offer-website"
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="offer-timeline">
                <LabelRow>
                  <FiClock size={16} aria-hidden />
                  Délai souhaité
                </LabelRow>
              </Label>
              <Input
                id="offer-timeline"
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                placeholder="Ex. : lancement fin d’année"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="offer-projectType">
                <LabelRow>
                  <FiTarget size={16} aria-hidden />
                  Type de projet
                </LabelRow>
              </Label>
              <Input
                id="offer-projectType"
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                placeholder="Ex. : refonte, MVP, module métier…"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="offer-audience">
                <LabelRow>
                  <FiUsers size={16} aria-hidden />
                  Public cible
                </LabelRow>
              </Label>
              <Input
                id="offer-audience"
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Ex. : B2B, adhérents, particuliers…"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="offer-competitors">
                <LabelRow>
                  <FiAward size={16} aria-hidden />
                  Références / exemples aimés
                </LabelRow>
              </Label>
              <Input
                id="offer-competitors"
                type="text"
                name="competitors"
                value={formData.competitors}
                onChange={handleInputChange}
                placeholder="Sites ou produits qui vous inspirent"
              />
            </FormGroup>
          </OptionalSection>

          {formError ? (
            <FormErrorBox role="alert" aria-live="assertive">
              {formError}
            </FormErrorBox>
          ) : null}

          <SubmitButton type="submit" disabled={isSubmitting} whileTap={{ scale: 0.99 }}>
            {isSubmitting ? 'Envoi…' : 'Envoyer ma demande de devis gratuit'}
          </SubmitButton>
        </form>
                </QuoteForm>
              </ModalBody>
            </ModalPanel>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </OffersRoot>
  );
};

export default OffersSection;
