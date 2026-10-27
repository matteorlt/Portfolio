import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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

const OffersRoot = styled.section`
  scroll-margin-top: calc(var(--nav-h) + 0.75rem);
  padding: clamp(4rem, 11vw, 7.5rem) var(--page-pad-x) clamp(2.5rem, 6vw, 4rem);
  padding-right: var(--page-pad-r);
  max-width: var(--max);
  margin: 0 auto;
  width: 100%;
`;

const Index = styled.span`
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.7rem;
  text-align: left;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.02;
  color: var(--color-text);
  text-align: left;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-muted);
  text-align: left;
  margin-bottom: 1.75rem;
  max-width: 38rem;
`;

const Anchor = styled.span`
  display: block;
  scroll-margin-top: var(--scroll-margin);
`;

const CardsGrid = styled.ul`
  list-style: none;
  display: grid;
  gap: 1rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.li)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 1.5rem 1.4rem;
  border-radius: 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  transition: border-color 0.3s ease, transform 0.35s var(--ease-out);

  &:hover {
    border-color: rgba(200, 242, 74, 0.35);
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-muted);
  color: var(--color-accent);
  margin-bottom: 1.1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
`;

const CardAudience = styled.p`
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
`;

const CardPoints = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.4rem;

  li {
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 0.55rem;
    font-size: 0.9rem;
    line-height: 1.45;
    color: var(--color-text);
  }

  svg {
    margin-top: 0.15rem;
    color: var(--color-accent);
  }
`;

const CardCta = styled.button`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  padding: 0.4rem 0;
  background: none;
  color: var(--color-accent);
  font-size: 0.92rem;
  font-weight: 600;

  svg {
    transition: transform 0.25s var(--ease-out);
  }

  &:hover svg {
    transform: translate(2px, -2px);
  }
`;

const HelpCard = styled(Card)`
  justify-content: center;
  align-items: flex-start;
  background: var(--color-accent-muted);
  border-color: rgba(200, 242, 74, 0.28);

  ${CardTitle} {
    font-size: 1.35rem;
  }

  ${CardAudience} {
    margin-bottom: 1.35rem;
  }
`;

const Launch = styled(motion.article)`
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 1.75rem 3rem;
  margin-bottom: 1rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: 22px;
  border: 1px solid rgba(200, 242, 74, 0.4);
  background:
    radial-gradient(ellipse 70% 90% at 100% 0%, rgba(200, 242, 74, 0.14), transparent 60%),
    var(--color-surface);
  scroll-margin-top: var(--scroll-margin);

  @media (min-width: 860px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    align-items: center;
  }
`;

const LaunchBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  margin-bottom: 1rem;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const LaunchTitle = styled.h3`
  font-size: clamp(1.5rem, 3.2vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: 0.6rem;
`;

const Price = styled.p`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem 0.85rem;
  margin-bottom: 0.4rem;

  s {
    font-size: 1.35rem;
    color: var(--color-muted);
    text-decoration-thickness: 2px;
  }

  strong {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 4.25rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1;
    color: var(--color-accent);
  }

  span {
    font-size: 0.95rem;
    color: var(--color-text);
  }
`;

const FinePrint = styled.p`
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--color-muted);
  margin-bottom: 1.35rem;
  max-width: 30rem;
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

const DevisOpenButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 1.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-body);
  color: var(--color-accent-ink);
  background: var(--color-accent);
  box-shadow: 0 12px 36px rgba(200, 242, 74, 0.18);

  &:hover {
    filter: brightness(1.07);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }
`;

const LaunchCta = styled(DevisOpenButton)`
  min-height: 52px;
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
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
`;

const ModalPanel = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: min(90dvh, 880px);
  /* visible : sinon le menu natif du <select> peut être clippé par l’ancêtre */
  overflow: visible;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--color-surface-elevated);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
`;

const ModalBody = styled.div`
  flex: 1;
  min-height: 0;
  max-height: min(85dvh, 820px);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  border-radius: 0 0 16px 16px;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--color-muted);
  background: rgba(255, 255, 255, 0.06);

  &:hover {
    color: var(--color-text);
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

const QuoteForm = styled.div`
  background: transparent;
  padding: 2rem;
  padding-top: 2.75rem;
  position: relative;

  @media (max-width: 520px) {
    padding: 1.5rem;
    padding-top: 2.5rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-accent);
  text-align: center;
  margin-bottom: 0.5rem;
`;

const FormLead = styled.p`
  text-align: center;
  font-size: 0.92rem;
  color: var(--color-muted);
  line-height: 1.5;
  margin-bottom: 1.75rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: var(--color-muted);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const LabelRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  svg {
    flex-shrink: 0;
    color: var(--color-accent);
    opacity: 0.95;
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

const NeedTypeTrigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 48px;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(200, 242, 74, 0.35);
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: rgba(200, 242, 74, 0.55);
    background: rgba(255, 255, 255, 0.08);
  }

  &[aria-expanded='true'] {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(200, 242, 74, 0.28);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
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
  border-radius: 12px;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(0, 0, 0, 0.2);
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
  color: #eaeaea;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: rgba(200, 242, 74, 0.2);
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -2px;
  }

  &[data-selected='true'] {
    background: rgba(200, 242, 74, 0.28);
    color: #f0f4ff;
    font-weight: 600;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(200, 242, 74, 0.25);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(200, 242, 74, 0.2);
  }

  &::placeholder {
    color: #8a867e;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(200, 242, 74, 0.25);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(200, 242, 74, 0.2);
  }

  &::placeholder {
    color: #8a867e;
  }
`;

const FormErrorBox = styled.div`
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.38);
  color: #fecaca;
  font-size: 0.9rem;
  line-height: 1.45;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.06);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }
`;

const OptionalToggle = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  background: var(--color-accent-muted);
  color: var(--color-accent);
  border: 1px solid rgba(200, 242, 74, 0.35);
  cursor: pointer;
  font-weight: 600;
  margin: 0.5rem 0 1rem;
  &:hover {
    background: rgba(200, 242, 74, 0.22);
  }
`;

const OptionalSection = styled(motion.div)`
  overflow: hidden;
  border: 1px dashed rgba(200, 242, 74, 0.25);
  border-radius: 12px;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const ResponseTimeMark = styled.span`
  display: inline-block;
  margin: 0 0.12em;
  padding: 0.12em 0.45em;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.28);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
`;

const OFFER_CATEGORIES = [
  {
    id: 'vitrine',
    Icon: FiLayout,
    title: 'Sites vitrine & WordPress',
    audience: 'Artisans, indépendants, associations et PME qui veulent être trouvés et contactés.',
  },
  {
    id: 'sur-mesure',
    Icon: FiLayers,
    title: 'Applications web sur-mesure',
    audience: 'Outils métier, plateformes avec comptes utilisateurs, SaaS.',
  },
  {
    id: 'ecommerce',
    Icon: FiShoppingCart,
    title: 'E-commerce',
    audience: 'Commerçants et marques qui veulent vendre en ligne.',
  },
  {
    id: 'refonte',
    Icon: FiRefreshCw,
    title: 'Refonte & migration',
    audience: 'Sites vieillissants, lents ou difficiles à mettre à jour.',
  },
  {
    id: 'maintenance',
    Icon: FiTool,
    title: 'Maintenance & évolutions',
    audience: 'Sites existants à sécuriser et à faire grandir.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

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
              : 'Sur devis personnalisé',
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
      {showNotification && (
        <motion.div
          role="status"
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(40, 167, 69, 0.3)',
            zIndex: 2600,
            maxWidth: '400px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <FiCheckCircle size={28} style={{ flexShrink: 0 }} aria-hidden strokeWidth={2.25} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Demande envoyée !</div>
            <div
              style={{
                display: 'block',
                marginTop: '0.3rem',
                fontSize: '0.9rem',
                opacity: 0.95,
                lineHeight: 1.5,
              }}
            >
              Je vous réponds sous <ResponseTimeMark>48 h ouvrées</ResponseTimeMark>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowNotification(false)}
            aria-label="Fermer la notification"
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: 0,
              opacity: 0.7,
            }}
          >
            ×
          </button>
        </motion.div>
      )}

      <Anchor id="offres" aria-hidden />
      <Index>02 — Services</Index>
      <Title id="offres-title" {...reveal}>
        Ce que je peux faire pour vous
      </Title>

      <Subtitle {...reveal} transition={{ ...reveal.transition, delay: 0.06 }}>
        Devis gratuit et sans engagement.
      </Subtitle>

      <Launch id="offre" {...reveal} aria-labelledby="offre-title">
        <div>
          <LaunchBadge>
            <FiGift aria-hidden size={14} />
            Offre de lancement — 10 premiers clients
          </LaunchBadge>
          <LaunchTitle id="offre-title">Votre site vitrine offert</LaunchTitle>
          <CardPoints>
            {LAUNCH_OFFER.includes.map((pt) => (
              <li key={pt}>
                <FiCheck aria-hidden size={15} strokeWidth={2.5} />
                {pt}
              </li>
            ))}
          </CardPoints>
        </div>
        <div>
          <Price>
            <s aria-label={`Prix habituel ${LAUNCH_OFFER.regularPrice}`}>{LAUNCH_OFFER.regularPrice}</s>
            <strong>{LAUNCH_OFFER.price}</strong>
            <span>de création</span>
          </Price>
          <FinePrint>
            Puis {LAUNCH_OFFER.yearly} pour l’hébergement, le nom de domaine et la maintenance. Sans engagement :
            sans renouvellement, le site est mis hors ligne.
          </FinePrint>
          <LaunchCta
            type="button"
            onClick={(e) => openDevis(e.currentTarget, LAUNCH_OFFER.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiZap size={18} strokeWidth={2.25} aria-hidden />
            Profiter de l’offre
          </LaunchCta>
        </div>
      </Launch>

      <CardsGrid>
        {OFFER_CATEGORIES.map(({ id, Icon, title, audience }, i) => (
          <Card key={id} {...reveal} transition={{ ...reveal.transition, delay: 0.05 * i }}>
            <CardIcon aria-hidden>
              <Icon size={21} strokeWidth={2.1} />
            </CardIcon>
            <CardTitle>{title}</CardTitle>
            <CardAudience>{audience}</CardAudience>
            <CardCta type="button" onClick={(e) => openDevis(e.currentTarget, id)}>
              Demander un devis
              <SrOnly> — {title}</SrOnly>
              <FiArrowUpRight aria-hidden size={16} />
            </CardCta>
          </Card>
        ))}
        <HelpCard {...reveal} transition={{ ...reveal.transition, delay: 0.25 }}>
          <CardTitle>Pas sûr de ce qu’il vous faut ?</CardTitle>
          <CardAudience>
            Décrivez votre projet, je vous oriente.
          </CardAudience>
          <DevisOpenButton
            type="button"
            onClick={(e) => openDevis(e.currentTarget, '')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiZap size={18} strokeWidth={2.25} aria-hidden />
            Devis gratuit en 30 secondes
          </DevisOpenButton>
        </HelpCard>
      </CardsGrid>

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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showOptional ? '− Masquer les options' : '+ Plus de détails (facultatif)'}
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

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
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
