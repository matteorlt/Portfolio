import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiCode } from 'react-icons/fi';
// Envoi via backend SMTP (Zoho)

const ContactContainer = styled.div`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled(motion.div)`
  color: #ffffff;
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-bottom: 2rem;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.1);
    transform: translateX(5px);
  }
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  color: #4a90e2;
  min-width: 24px;
`;

const InfoContent = styled.div``;

const InfoLabel = styled.div`
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  color: #aaaaaa;
  font-size: 0.9rem;
`;

const SocialLinks = styled(motion.div)`
  margin-top: 2rem;
`;

const SocialTitle = styled.h4`
  font-size: 1.2rem;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const SocialGrid = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(74, 144, 226, 0.2);

  &:hover {
    background: #4a90e2;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  padding: 2rem;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  background: rgba(74, 144, 226, 0.05);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #666666;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  background: rgba(74, 144, 226, 0.05);
  color: #ffffff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #666666;
  }
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Effet pour masquer la notification automatiquement
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Disparaît après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Envoi via API backend
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (res.ok) {
        // Afficher la notification de succès
        setShowNotification(true);
        
        // Déclencher la conversion Google Ads
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17634174804/6HasCOPNoqkbENTO0NhB',
            'value': 1.0,
            'currency': 'EUR'
          });
        }
        
        // Réinitialiser le formulaire
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Erreur lors de l\'envoi');
      }

    } catch (error) {
      console.error('Erreur détaillée Contact:', error);
      alert(`Erreur lors de l\'envoi du message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'contact@matteo-rlt.fr'
    },
    {
      icon: <FiMapPin />,
      label: 'Localisation',
      value: 'Rennes, France'
    },
    {
      icon: <FiCode />,
      label: 'Formation',
      value: 'ENI Rennes - Bac+2'
    }
  ];

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/matteorlt' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/matteo-rlt' }
  ];

  return (
    <ContactContainer>
      {/* Notification de succès */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(40, 167, 69, 0.3)',
            zIndex: 1000,
            maxWidth: '400px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>✅</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>
              Message envoyé !
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Merci ! Je vous répondrai dans les plus brefs délais.
            </div>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: 0,
              opacity: 0.7
            }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.7}
          >
            ×
          </button>
        </motion.div>
      )}

      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact
      </Title>
      
      <Subtitle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Parlons de votre projet et collaborons ensemble
      </Subtitle>

      <ContactGrid>
        <ContactInfo
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <InfoTitle>Informations de contact</InfoTitle>
          
          {contactInfo.map((info, index) => (
            <InfoItem
              key={info.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <InfoIcon>{info.icon}</InfoIcon>
              <InfoContent>
                <InfoLabel>{info.label}</InfoLabel>
                <InfoValue>{info.value}</InfoValue>
              </InfoContent>
            </InfoItem>
          ))}

          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <SocialTitle>Suivez-moi</SocialTitle>
            <SocialGrid>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialGrid>
          </SocialLinks>
        </ContactInfo>

        <ContactForm
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSubmit}
        >
          <FormTitle>Envoyez-moi un message</FormTitle>
          
          <FormGroup>
            <Label htmlFor="name">Nom complet</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Sujet</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Sujet de votre message"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Décrivez votre projet ou votre demande..."
              required
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSend />
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </SubmitButton>
        </ContactForm>
      </ContactGrid>
    </ContactContainer>
  );
};

export default Contact; 