import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { trackFormEvent } from '../utils/analytics';
import { sendViaEmailJs } from '../utils/emailjsSend.js';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-muted);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
  }

  &::placeholder {
    color: #737373;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  min-height: 140px;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
  }

  &::placeholder {
    color: #737373;
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 1.75rem;
  min-height: 48px;
  width: 100%;

  @media (min-width: 480px) {
    width: auto;
  }
  background: var(--color-accent);
  color: #0a0a0a;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.05);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Toast = styled(motion.div)`
  position: fixed;
  top: 88px;
  right: 1rem;
  z-index: 2000;
  max-width: min(400px, calc(100vw - 2rem));
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #86efac;
  font-size: 0.95rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
`;

const ToastClose = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  opacity: 0.75;
  padding: 0;

  &:hover {
    opacity: 1;
  }
`;

const DEFAULT_SUBJECT = 'Message depuis matteo-rlt.fr';

/**
 * Formulaire minimaliste nom / email / message.
 * L’API attend un sujet : valeur fixe côté client.
 */
export default function ContactForm({ idPrefix = 'contact' }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!showNotification) return undefined;
    const t = setTimeout(() => setShowNotification(false), 5000);
    return () => clearTimeout(t);
  }, [showNotification]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackFormEvent('Contact Form', 'submit');

    try {
      await sendViaEmailJs(
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          subject: DEFAULT_SUBJECT,
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
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact:', error);
      trackFormEvent('Contact Form', 'error', { error_message: error.message });
      alert(`Erreur lors de l'envoi : ${error.message}`);
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
            <span aria-hidden>✅</span>
            <div>
              <strong>Message envoyé</strong>
              <div style={{ opacity: 0.9, marginTop: '0.25rem', fontSize: '0.9rem' }}>
                Je vous réponds sous 48 h ouvrées.
              </div>
            </div>
            <ToastClose type="button" onClick={() => setShowNotification(false)} aria-label="Fermer">
              ×
            </ToastClose>
          </Toast>
        )}
      </AnimatePresence>

      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label htmlFor={pid('name')}>Nom</Label>
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
          <Label htmlFor={pid('email')}>Email</Label>
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
        <FormGroup>
          <Label htmlFor={pid('message')}>Message</Label>
          <TextArea
            id={pid('message')}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre projet, vos délais et votre objectif…"
            required
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={isSubmitting} whileTap={{ scale: 0.98 }}>
          <FiSend aria-hidden />
          {isSubmitting ? 'Envoi…' : 'Envoyer'}
        </SubmitButton>
      </Form>
    </>
  );
}
