import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { trackClick, trackFormEvent, trackConversion } from '../utils/analytics';
import SEO from '../components/SEO.jsx';
import { sendViaEmailJs } from '../utils/emailjsSend.js';

const QuoteContainer = styled.div`
  min-height: 100dvh;
  padding: max(6.25rem, calc(var(--nav-h) + 2rem + env(safe-area-inset-top, 0px))) var(--page-pad-x) max(2rem, var(--page-pad-b));
  padding-right: var(--page-pad-r);
  max-width: 100%;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 768px) {
    padding: 100px 2rem 2rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #cccccc;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 4rem;
  max-width: 95vw;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  justify-items: center;
  padding: 0 3rem;

  @media (min-width: 1200px) {
    /* Toutes les cartes sur une seule ligne - compact */
    grid-template-columns: repeat(5, 1fr);
    max-width: 95vw;
    gap: 1.5rem;
    padding: 0 4rem;
  }

  @media (min-width: 900px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 95vw;
    padding: 0 3rem;
  }

  @media (min-width: 600px) and (max-width: 899px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 95vw;
    padding: 0 2rem;
  }

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
    max-width: 95vw;
    padding: 0 1.5rem;
  }
`;

const PackageCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    border-color: #4a90e2;
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  }

  &.popular {
    border-color: #4a90e2;
    background: rgba(74, 144, 226, 0.1);
    
    &::before {
      content: 'Populaire';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      background: #4a90e2;
      color: white;
      padding: 0.3rem 0.7rem;
      border-radius: 15px;
      font-size: 0.65rem;
      font-weight: 600;
    }
  }
`;

const PackageTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a90e2;
  margin-bottom: 0.5rem;
`;

const PackagePrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const PackagePriceNote = styled.div`
  font-size: 0.65rem;
  color: #aaaaaa;
  font-style: italic;
  margin-bottom: 0.5rem;
`;

const PackagePeriod = styled.div`
  color: #aaaaaa;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 0.75rem;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
  color: #cccccc;
  font-size: 0.75rem;
  line-height: 1.3;
`;

const SelectButton = styled(motion.button)`
  width: 100%;
  padding: 0.6rem;
  background: ${props => props.popular ? '#4a90e2' : 'transparent'};
  color: ${props => props.popular ? 'white' : '#4a90e2'};
  border: 1px solid #4a90e2;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: #4a90e2;
    color: white;
    transform: translateY(-2px);
  }
`;

const QuoteForm = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #4a90e2;
  text-align: center;
  margin-bottom: 2rem;
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
  color: #cccccc;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  &::placeholder {
    color: #666666;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  &::placeholder {
    color: #666666;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #357abd;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666666;
    cursor: not-allowed;
    transform: none;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #aaaaaa;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

const packages = [
  {
    id: 'starter',
    title: 'Starter',
    price: '700',
    period: '1-2 semaines',
    features: [
      'Site WordPress (facile à utiliser)',
      'Jusqu\'à 4 pages',
      'Formulaire de contact',
      'Référencement Google de base',
      'Formation pour utiliser votre site',
      'Site adapté mobile et ordinateur'
    ],
    popular: false
  },
  {
    id: 'professional',
    title: 'Professional',
    price: '1 500',
    period: '3-4 semaines',
    features: [
      'Design personnalisé selon vos goûts',
      'Jusqu\'à 10 pages',
      'Interface d\'administration simple',
      'Référencement Google avancé',
      'Ajout d\'une fonctionnalité avancée',
      'Hébergement inclus (1 an)',
      'Nom de domaine inclus (1 an)',
      'Support prioritaire',
      'Les avantages du pack "Starter"'
    ],
    popular: true
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '2 600',
    period: '6-8 semaines',
    features: [
      'Design haut de gamme personnalisé',
      'Nombre de pages illimité',
      'Boutique en ligne complète',
      'Paiements sécurisés en ligne',
      'Gestion des stocks automatique',
      'Statistiques détaillées de visiteurs',
      'Fonctionnalités avancées',
      'Hébergement inclus (1 an)',
      'Support premium',
      'Maintenance et mises à jour incluses',
      'Les avantages du pack "Professional"'
    ],
    popular: false
  },
  {
    id: 'refonte',
    title: 'Refonte de site web',
    price: '800',
    period: 'Selon projet',
    features: [
      'Analyse complète de votre site actuel',
      'Modernisation du design',
      'Optimisation des performances',
      'Migration des données sécurisée',
      'Amélioration du référencement',
      'Formation à la nouvelle interface',
      'Support post-lancement',
      'Compatible mobile et tablette'
    ],
    popular: false
  },
  {
    id: 'maintenance',
    title: 'Maintenance (Abonnement)',
    price: '90',
    period: 'Par mois',
    subscription: true,
    features: [
      'Mises à jour régulières',
      'Sauvegardes automatiques hebdomadaires',
      'Support technique réactif',
      'Surveillance de la disponibilité',
      'Correction des bugs',
      'Optimisation continue',
      'Sécurité renforcée',
      'Rapport mensuel d\'activité'
    ],
    popular: false
  }
];

const OptionalToggle = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  border: 1px solid rgba(74, 144, 226, 0.3);
  cursor: pointer;
  font-weight: 600;
  margin: 0.5rem 0 1rem;
  &:hover { background: rgba(74, 144, 226, 0.2); }
`;

const OptionalSection = styled(motion.div)`
  overflow: hidden;
  border: 1px dashed rgba(74, 144, 226, 0.2);
  border-radius: 12px;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const Quote = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
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
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showOptional, setShowOptional] = useState(false);

  // Effet pour masquer la notification automatiquement
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Disparaît après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Scroll vers le formulaire lorsqu'une formule est sélectionnée
  useEffect(() => {
    if (selectedPackage) {
      // Laisser le temps au formulaire de se monter avant de scroller
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [selectedPackage]);


  const handlePackageSelect = (packageId) => {
    trackClick(`Offer Package - ${packageId}`, 'package_selection', 1);
    const packageDetails = packages.find(p => p.id === packageId);
    if (packageDetails) {
      trackClick(`Package: ${packageDetails.title}`, 'offers_page', packageDetails.price);
    }
    setSelectedPackage(packageId);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Tracker l'événement de soumission de formulaire
    trackFormEvent('Offer Form', 'submit', {
      package_id: selectedPackage
    });

    try {
      const packageDetails = packages.find(p => p.id === selectedPackage);

      await sendViaEmailJs(
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          reply_to: formData.email,
          phone: formData.phone || '-',
          company: formData.company || '-',
          website: formData.website || '-',
          timeline: formData.timeline || '-',
          project_type: formData.projectType || '-',
          target_audience: formData.targetAudience || '-',
          competitors: formData.competitors || '-',
          message: formData.message || '-',
          package_id: selectedPackage || '',
          package_title: packageDetails?.title || '',
          package_price: packageDetails?.price || '',
          package_period: packageDetails?.period || ''
        },
        'quote'
      );

      setShowNotification(true);
      trackConversion('Offer Request', packageDetails?.price || 0, 'EUR');

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17634174804/6HasCOPNoqkbENTO0NhB',
          value: 1.0,
          currency: 'EUR'
        });
      }

      setFormData({
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
        message: ''
      });
      setSelectedPackage(null);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      // Tracker l'erreur de soumission
      trackFormEvent('Offer Form', 'error', {
        error_message: error.message
      });
      alert(`Erreur lors de l\'envoi de l'offre: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setSelectedPackage(null);
    setIsSubmitted(false);
  };

  return (
    <QuoteContainer>
      <SEO
        title="Offres | Portfolio Mattéo Rannou Le Texier"
        description="Offres et services: sites vitrines, applications sur-mesure, optimisation performance & SEO."
        url="https://matteo-rlt.fr/offres"
        image="/logos/og-image.jpg"
      />
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
              Demande envoyée !
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Merci ! Je vous recontacterai dans les plus brefs délais.
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
        Devis Gratuit
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Choisissez la formule qui correspond à vos besoins et obtenez un devis personnalisée
      </Subtitle>

      <motion.div
        style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          padding: '1rem',
          background: 'rgba(74, 144, 226, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(74, 144, 226, 0.2)',
          maxWidth: '800px',
          margin: '0 auto 2rem'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p style={{ color: '#cccccc', margin: 0, fontSize: '0.9rem' }}>
          💡 <strong>Note importante :</strong> Les prix affichés sont approximatifs et peuvent varier selon la complexité de votre projet. 
          Pour obtenir un devis précise et personnalisée, veuillez remplir le formulaire ci-dessous.
        </p>
      </motion.div>

      <PackagesGrid>
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.id}
            className={pkg.popular ? 'popular' : ''}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
          >
            <PackageTitle>{pkg.title}</PackageTitle>
            <PackagePrice>
              {pkg.price === 'Sur devis' ? (
                pkg.price
              ) : (
                <>
                  €{pkg.price}
                  {pkg.subscription && <span style={{ fontSize: '1.2rem' }}>/mois</span>}
                </>
              )}
            </PackagePrice>
            <PackagePriceNote>
              {pkg.price === 'Sur devis' 
                ? 'Prix personnalisé selon votre projet'
                : pkg.subscription
                ? 'Abonnement mensuel'
                : 'Prix approximatif HT'}
            </PackagePriceNote>
            <PackagePeriod>{pkg.period}</PackagePeriod>
            
            <FeaturesList>
              {pkg.features.map((feature, idx) => (
                <FeatureItem key={idx}>
                  <span style={{ color: '#4a90e2', marginRight: '0.5rem' }}>✓</span>
                  {feature}
                </FeatureItem>
              ))}
            </FeaturesList>

            <SelectButton
              popular={pkg.popular}
              onClick={() => handlePackageSelect(pkg.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Demander un devis
            </SelectButton>
          </PackageCard>
        ))}
      </PackagesGrid>

      {selectedPackage && (
        <QuoteForm
          ref={formRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CloseButton onClick={closeForm}>×</CloseButton>
          
          {!isSubmitted ? (
            <>
              <FormTitle>
                Demande d'offre - {packages.find(p => p.id === selectedPackage)?.title}
              </FormTitle>
              
              <form onSubmit={handleSubmit}>
                <FormGrid>
                  <FormGroup>
                    <Label>
                      👤 Prénom *
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Votre prénom"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>
                      👤 Nom *
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      required
                    />
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <Label>
                    📧 Email *
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    🏢 Entreprise / Association
                  </Label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nom de votre entreprise ou association"
                  />
                </FormGroup>

                <OptionalToggle
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  aria-expanded={showOptional}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showOptional ? '− Masquer les options' : '+ Plus d\'options (facultatif)'}
                </OptionalToggle>

                <OptionalSection
                  initial={{ height: 0, opacity: 0 }}
                  animate={showOptional ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-hidden={!showOptional}
                >
                  <FormGroup>
                    <Label>
                      📞 Téléphone (optionnel)
                    </Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="06 12 34 56 78"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      🌐 Site web existant (optionnel)
                    </Label>
                    <Input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://votre-site.com"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      ⏰ Délai souhaité (optionnel)
                    </Label>
                    <Input
                      type="text"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      placeholder="Ex: 1 mois"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      🎯 Type de projet (optionnel)
                    </Label>
                    <Input
                      type="text"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      placeholder="Ex: Site vitrine, E-commerce, Application web..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      👥 Public cible (optionnel)
                    </Label>
                    <Input
                      type="text"
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                      placeholder="Ex: Particuliers, Professionnels, Étudiants..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      🏆 Sites d'exemple (optionnel)
                    </Label>
                    <Input
                      type="text"
                      name="competitors"
                      value={formData.competitors}
                      onChange={handleInputChange}
                      placeholder="Ex: site1.com, site2.com..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Message (optionnel)</Label>
                    <TextArea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez vos besoins spécifiques, vos objectifs, vos préférences..."
                    />
                  </FormGroup>
                </OptionalSection>

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                </SubmitButton>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '60px', color: '#4a90e2', marginBottom: '1rem' }}>✓</div>
              <h2 style={{ color: '#4a90e2', marginBottom: '1rem' }}>
                Demande envoyée !
              </h2>
              <p style={{ color: '#cccccc', marginBottom: '2rem' }}>
                Merci pour votre demande ! Je vous recontacterai dans les plus brefs délais.
              </p>
              <SubmitButton
                onClick={closeForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Fermer
              </SubmitButton>
            </div>
          )}
        </QuoteForm>
      )}
    </QuoteContainer>
  );
};

export default Quote;