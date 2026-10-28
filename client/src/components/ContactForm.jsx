import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { trackFormEvent } from '../utils/analytics';
import { sendViaEmailJs } from '../utils/emailjsSend.js';
import Dropdown from './Dropdown.jsx';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  color: var(--ink);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const Row = styled.div`
  display: grid;
  gap: 1.1rem;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: #5d5a53;
`;

const field = css`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  background: var(--paper);
  color: var(--ink);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:focus {
    outline: none;
    background: #fff;
    border-color: var(--ink);
    box-shadow: 0 0 0 4px rgba(212, 255, 63, 0.65);
  }

  &::placeholder {
    color: #8d897f;
  }
`;

const Input = styled.input`
  ${field}
`;

const TextArea = styled.textarea`
  ${field}
  min-height: 140px;
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 56px;
  width: 100%;
  margin-top: 0.35rem;
  background: var(--ink);
  color: var(--paper);
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 999px;
  transition: background 0.3s ease, color 0.3s ease, opacity 0.2s ease;

  svg {
    transition: transform 0.35s var(--ease-out);
  }

  &:hover:not(:disabled) {
    background: var(--lime);
    color: var(--ink);
  }

  &:hover:not(:disabled) svg {
    transform: translate(3px, -3px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Reassure = styled.p`
  font-size: 0.8rem;
  line-height: 1.5;
  color: #6b675f;
  text-align: center;
`;

const Toast = styled(motion.div)`
  position: fixed;
  top: calc(var(--nav-h) + 12px);
  right: 1rem;
  z-index: 2600;
  max-width: min(400px, calc(100vw - 2rem));
  padding: 1rem 1.15rem;
  border-radius: 16px;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.95rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  box-shadow: 0 24px 60px -20px rgba(15, 15, 13, 0.6);

  > svg {
    flex-shrink: 0;
    color: var(--lime);
  }

  p {
    margin-top: 0.2rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #c9c5bb;
  }
`;

const ToastClose = styled.button`
  margin-left: auto;
  background: none;
  color: inherit;
  font-size: 1.3rem;
  line-height: 1;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const FormError = styled.p`
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: #fdecea;
  border: 1px solid #f3b5ae;
  color: #8a1c10;
  font-size: 0.9rem;
  line-height: 1.45;
`;

const DEFAULT_SUBJECT = 'Message depuis matteo-rlt.fr';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROJECT_TYPE_OPTIONS = [
  { value: '', label: 'Choisir une option' },
  { value: 'vitrine', label: 'Site vitrine / landing' },
  { value: 'saas', label: 'Application web / SaaS' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'autre', label: 'Autre / je précise dans le message' }
];

function projectTypeLabel(value) {
  return PROJECT_TYPE_OPTIONS.find((o) => o.value === value)?.label || value || '—';
}

/**
 * Formulaire minimaliste nom / email / message.
 * L’API attend un sujet : valeur fixe côté client.
 */
export default function ContactForm({ idPrefix = 'contact' }) {
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!showNotification) return undefined;
    const t = setTimeout(() => setShowNotification(false), 5000);
    return () => clearTimeout(t);
  }, [showNotification]);

  const handleChange = (e) => {
    setFormError('');
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const fail = (msg, field) => {
      setFormError(msg);
      document.getElementById(pid(field))?.focus();
    };
    if (!formData.name.trim()) return fail('Indiquez votre nom.', 'name');
    if (!EMAIL_RE.test(formData.email.trim())) {
      return fail('Indiquez une adresse e-mail valide (ex. : vous@domaine.fr).', 'email');
    }
    if (!formData.projectType) return fail('Choisissez un type de projet.', 'projectType');
    if (!formData.message.trim()) return fail('Décrivez votre projet en quelques mots.', 'message');

    setIsSubmitting(true);
    trackFormEvent('Contact Form', 'submit');

    try {
      await sendViaEmailJs(
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          subject: DEFAULT_SUBJECT,
          project_type: projectTypeLabel(formData.projectType),
          project_type_key: formData.projectType,
          message: formData.message
        },
        'contact'
      );

      setShowNotification(true);
      trackFormEvent('Contact Form', 'success');
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17634174804/6HasCOPNoqkbENTO0NhB',
          value: 1.0,
          currency: 'EUR'
        });
      }
      setFormData({ name: '', email: '', projectType: '', message: '' });
    } catch (error) {
      console.error('Contact:', error);
      trackFormEvent('Contact Form', 'error', { error_message: error.message });
      setFormError(
        'L’envoi n’a pas abouti. Réessayez dans un instant ou écrivez-moi directement à contact@matteo-rlt.fr.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const pid = (name) => `${idPrefix}-${name}`;

  return (
    <>
      <AnimatePresence>
        {showNotification && (
          <Toast
            role="status"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <FiCheck aria-hidden size={22} strokeWidth={2.5} />
            <div>
              <strong>Message envoyé</strong>
              <p>Je vous réponds sous 24 h ouvrées.</p>
            </div>
            <ToastClose type="button" onClick={() => setShowNotification(false)} aria-label="Fermer">
              ×
            </ToastClose>
          </Toast>
        )}
      </AnimatePresence>

      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          <FormGroup>
            <Label htmlFor={pid('name')}>Nom *</Label>
            <Input
              type="text"
              id={pid('name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom ou société"
              autoComplete="name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={pid('email')}>Email *</Label>
            <Input
              type="email"
              id={pid('email')}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="vous@exemple.fr"
              autoComplete="email"
              required
            />
          </FormGroup>
        </Row>
        <FormGroup>
          <Label id={pid('projectType-label')} htmlFor={pid('projectType')}>
            Type de projet *
          </Label>
          <Dropdown
            id={pid('projectType')}
            labelId={pid('projectType-label')}
            value={formData.projectType}
            onChange={(projectType) => {
              setFormError('');
              setFormData((prev) => ({ ...prev, projectType }));
            }}
            options={PROJECT_TYPE_OPTIONS.filter((o) => o.value)}
            placeholder={PROJECT_TYPE_OPTIONS[0].label}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor={pid('message')}>Message *</Label>
          <TextArea
            id={pid('message')}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre projet, vos délais et votre objectif…"
            required
          />
        </FormGroup>
        {formError ? <FormError role="alert">{formError}</FormError> : null}
        <SubmitButton type="submit" disabled={isSubmitting} whileTap={{ scale: 0.98 }}>
          {isSubmitting ? 'Envoi…' : 'Envoyer ma demande'}
          <FiArrowUpRight aria-hidden size={18} />
        </SubmitButton>
        <Reassure>Gratuit et sans engagement — vos données servent uniquement à vous répondre.</Reassure>
      </Form>
    </>
  );
}
