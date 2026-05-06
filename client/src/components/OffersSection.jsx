import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { trackFormEvent, trackConversion } from '../utils/analytics';
import { sendViaEmailJs } from '../utils/emailjsSend.js';
import {
  FiCheckCircle,
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
  FiSearch,
  FiSmartphone,
  FiBookOpen,
  FiLayers,
  FiShield,
  FiShoppingCart,
  FiCreditCard,
  FiTrendingUp,
  FiRefreshCw,
  FiEdit3,
  FiDatabase,
  FiTool,
  FiActivity,
  FiPackage,
  FiX,
  FiZap,
  FiChevronDown,
} from 'react-icons/fi';

const OffersRoot = styled.section`
  scroll-margin-top: calc(var(--nav-h) + 0.75rem);
  padding: clamp(2.5rem, 6vw, 4rem) var(--page-pad-x) 2rem;
  padding-right: var(--page-pad-r);
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.85rem, 4.5vw, 2.65rem);
  font-weight: 700;
  color: var(--color-accent);
  text-align: center;
  margin-bottom: 0.75rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.05rem;
  line-height: 1.55;
  color: var(--color-muted);
  text-align: center;
  margin-bottom: 1.5rem;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
`;

const FreeBanner = styled(motion.div)`
  text-align: center;
  padding: 1rem 1.25rem;
  margin-bottom: 2.25rem;
  border-radius: 12px;
  background: var(--color-accent-muted);
  border: 1px solid rgba(91, 122, 173, 0.35);
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`;

const FreeBannerLead = styled.p`
  margin: 0 0 0.35rem;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--color-text);
`;

const FreeBannerText = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--color-muted);
`;

const OffersSingleBlock = styled(motion.div)`
  margin-bottom: 2.75rem;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: clamp(1.35rem, 3.5vw, 2rem);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
`;

const OfferItemsGrid = styled.ul`
  display: grid;
  gap: 0.25rem 1.5rem;
  grid-template-columns: 1fr;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OfferItem = styled(motion.li)`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  column-gap: 0.85rem;
  align-items: center;
  padding: 0.55rem 0;
  min-width: 0;
`;

const OfferIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: var(--color-accent-muted);
  color: var(--color-accent);
`;

const OfferItemText = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--color-muted);
`;

const OffersBlockFooter = styled.div`
  margin-top: 1.35rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
`;

const TarifNote = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-muted);
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
`;

const DevisCtaBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0;
  text-align: center;
`;

const DevisCtaHint = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: var(--color-muted);
  max-width: 420px;
  line-height: 1.45;
`;

const DevisOpenButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 1.5rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-body);
  color: #0a0a0a;
  background: var(--color-accent);
  box-shadow: 0 12px 36px rgba(91, 122, 173, 0.28);

  &:hover {
    filter: brightness(1.07);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
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
  border: 1px solid rgba(91, 122, 173, 0.35);
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: rgba(91, 122, 173, 0.55);
    background: rgba(255, 255, 255, 0.08);
  }

  &[aria-expanded='true'] {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(91, 122, 173, 0.28);
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
    background: rgba(91, 122, 173, 0.2);
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -2px;
  }

  &[data-selected='true'] {
    background: rgba(91, 122, 173, 0.28);
    color: #f0f4ff;
    font-weight: 600;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(91, 122, 173, 0.25);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(91, 122, 173, 0.2);
  }

  &::placeholder {
    color: #666666;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(91, 122, 173, 0.25);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(91, 122, 173, 0.2);
  }

  &::placeholder {
    color: #666666;
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
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
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
  border: 1px solid rgba(91, 122, 173, 0.35);
  cursor: pointer;
  font-weight: 600;
  margin: 0.5rem 0 1rem;
  &:hover {
    background: rgba(91, 122, 173, 0.22);
  }
`;

const OptionalSection = styled(motion.div)`
  overflow: hidden;
  border: 1px dashed rgba(91, 122, 173, 0.25);
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
    title: 'Sites vitrine & WordPress',
    points: [
      'Sites clairs, rapides et agréables à faire évoluer',
      'Référencement et structure pensés dès le départ',
      'Affichage optimal sur mobile, tablette et bureau',
      'Formation pour que vous restiez autonome sur le contenu',
    ],
  },
  {
    id: 'sur-mesure',
    title: 'Applications web & produits sur-mesure',
    points: [
      'Parcours utilisateur, comptes, règles métier — adapté à votre activité',
      'Stack moderne, code lisible et maintenable',
      'Performance, sécurité et évolutivité prises en compte',
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    points: [
      'Boutique en ligne avec tunnel d’achat adapté à votre catalogue',
      'Paiements sécurisés et gestion des commandes',
      'Accompagnement sur l’ergonomie et la conversion',
    ],
  },
  {
    id: 'refonte',
    title: 'Refonte & migration',
    points: [
      'Analyse de l’existant et plan de transition',
      'Design et technique modernisés sans tout repartir de zéro quand c’est possible',
      'Préservation du référencement et des données sensibles',
    ],
  },
  {
    id: 'maintenance',
    title: 'Accompagnement / maintenance',
    points: [
      'Mises à jour, sauvegardes et corrections',
      'Veille perf & sécurité',
      'Évolutions ponctuelles selon vos priorités',
    ],
  },
];

/** Une ligne = une prestation, avec icône dédiée (affichage en un seul bloc). */
const OFFER_ITEMS = [
  { Icon: FiLayout, text: 'Sites vitrine : clairs, rapides et agréables à faire évoluer' },
  { Icon: FiSearch, text: 'Référencement et structure de contenu pensés dès le départ' },
  { Icon: FiSmartphone, text: 'Affichage soigné sur mobile, tablette et bureau' },
  { Icon: FiBookOpen, text: 'Formation pour que vous restiez autonome sur vos contenus' },
  { Icon: FiUsers, text: 'Applications web & produits sur-mesure : parcours, comptes, règles métier' },
  { Icon: FiLayers, text: 'Stack moderne, code lisible et maintenable dans la durée' },
  { Icon: FiShield, text: 'Performance, sécurité et évolutivité prises en compte' },
  { Icon: FiShoppingCart, text: 'E-commerce : boutique et tunnel d’achat adaptés à votre catalogue' },
  { Icon: FiCreditCard, text: 'Paiements sécurisés et gestion des commandes' },
  { Icon: FiTrendingUp, text: 'Accompagnement sur l’ergonomie et la conversion' },
  { Icon: FiRefreshCw, text: 'Refonte : analyse de l’existant et plan de transition' },
  { Icon: FiEdit3, text: 'Design et technique modernisés sans tout repartir de zéro quand c’est pertinent' },
  { Icon: FiDatabase, text: 'Référencement et données : migration en limitant la casse' },
  { Icon: FiTool, text: 'Maintenance : mises à jour, sauvegardes et corrections' },
  { Icon: FiActivity, text: 'Veille performances et sécurité' },
  { Icon: FiPackage, text: 'Évolutions ponctuelles selon vos priorités' },
];

const NEED_OPTIONS = [
  { value: '', label: 'Indifférent / à définir ensemble' },
  ...OFFER_CATEGORIES.map((c) => ({ value: c.id, label: c.title })),
  { value: 'autre', label: 'Autre besoin (précisez dans le message)' },
];

const OffersSection = () => {
  const needTypeWrapRef = useRef(null);
  const needTypeListRef = useRef(null);
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
          package_price: 'Sur devis personnalisé',
          package_period: 'Selon périmètre (à préciser)',
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
      const msg =
        error?.message ||
        error?.text ||
        'Envoi impossible. Vérifiez la configuration e-mail (EmailJS) ou réessayez plus tard.';
      setFormError(`Envoi impossible : ${msg}`);
      trackFormEvent('Offer Form', 'error', {
        error_message: typeof msg === 'string' ? msg : String(msg),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OffersRoot id="offres" aria-labelledby="offres-title">
      {showNotification && (
        <motion.div
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

      <Title
        id="offres-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        Ce que je propose
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06 }}
      >
        Chaque projet est différent : pas de grille tarifaire figée ici — on cadrera le périmètre ensemble, et je vous
        transmettrai une proposition claire après échange.
      </Subtitle>

      <FreeBanner initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
        <FreeBannerLead>Devis gratuit, sans engagement</FreeBannerLead>
        <FreeBannerText>
          L’estimation et le devis sont toujours gratuits : ouvrez le formulaire, décrivez votre contexte — je reviens vers
          vous avec des pistes concrètes et, si besoin, une fourchette ou un montant après analyse.
        </FreeBannerText>
      </FreeBanner>

      <OffersSingleBlock
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
      >
        <OfferItemsGrid>
          {OFFER_ITEMS.map(({ Icon, text }, index) => (
            <OfferItem key={text} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.02 * index }}>
              <OfferIconWrap aria-hidden>
                <Icon size={20} strokeWidth={2.25} />
              </OfferIconWrap>
              <OfferItemText>{text}</OfferItemText>
            </OfferItem>
          ))}
        </OfferItemsGrid>
        <OffersBlockFooter>
          <TarifNote>Tarification sur devis — chaque mission est chiffrée après échange</TarifNote>
        </OffersBlockFooter>
      </OffersSingleBlock>

      <DevisCtaBlock>
        <DevisOpenButton
          type="button"
          onClick={() => setIsDevisOpen(true)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiZap size={20} strokeWidth={2.25} aria-hidden />
          Demander un devis en 30 secondes
        </DevisOpenButton>
        <DevisCtaHint>Devis gratuit, sans engagement — vos infos servent uniquement à vous recontacter.</DevisCtaHint>
      </DevisCtaBlock>

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
            type="button"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => void handleSubmit({ preventDefault: () => {} })}
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
