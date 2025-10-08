import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const QuoteContainer = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;

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
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: #4a90e2;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
`;

const PackageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const PackagePrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const PackagePriceNote = styled.div`
  font-size: 0.8rem;
  color: #aaaaaa;
  font-style: italic;
  margin-bottom: 1rem;
`;

const PackagePeriod = styled.div`
  color: #aaaaaa;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #cccccc;
  font-size: 0.9rem;
`;

const SelectButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: ${props => props.popular ? '#4a90e2' : 'transparent'};
  color: ${props => props.popular ? 'white' : '#4a90e2'};
  border: 1px solid #4a90e2;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

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
    price: '300',
    period: 'Site vitrine simple',
    features: [
      'Site WordPress (facile à utiliser)',
      'Jusqu\'à 4 pages',
      'Formulaire de contact',
      'Référencement Google de base',
      'Hébergement inclus (1 an)',
      'Formation pour utiliser votre site',
      'Site adapté mobile et ordinateur'
    ],
    popular: false
  },
  {
    id: 'professional',
    title: 'Professional',
    price: '600',
    period: 'Site professionnel',
    features: [
      'Design personnalisé selon vos goûts',
      'Jusqu\'à 10 pages',
      'Interface d\'administration simple',
      'Référencement Google avancé',
      'Liens vers vos réseaux sociaux',
      'Hébergement inclus (1 an)',
      'Support prioritaire',
      'Formation pour utiliser votre site'
    ],
    popular: true
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '1 100',
    period: 'Boutique en ligne ou application web',
    features: [
      'Design haut de gamme personnalisé',
      'Nombre de pages illimité',
      'Boutique en ligne complète',
      'Paiements sécurisés en ligne',
      'Gestion des stocks automatique',
      'Statistiques détaillées de visiteurs',
      'Hébergement premium (1 an)',
      'Support 24h/24 et 7j/7',
      'Maintenance et mises à jour incluses'
    ],
    popular: false
  }
];

const Quote = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePackageSelect = (packageId) => {
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

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedPackage: selectedPackage,
          packageDetails: packages.find(p => p.id === selectedPackage)
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        setSelectedPackage(null);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi du devis. Veuillez réessayer.');
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
        Choisissez la formule qui correspond à vos besoins et obtenez un devis personnalisé
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
          Pour obtenir un devis précis et personnalisé, veuillez remplir le formulaire ci-dessous.
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
            <PackagePrice>€{pkg.price}</PackagePrice>
            <PackagePriceNote>Prix approximatif</PackagePriceNote>
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CloseButton onClick={closeForm}>×</CloseButton>
          
          {!isSubmitted ? (
            <>
              <FormTitle>
                Demande de devis - {packages.find(p => p.id === selectedPackage)?.title}
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
                    📞 Téléphone
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
                    🏢 Entreprise
                  </Label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nom de votre entreprise"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Message (optionnel)</Label>
                  <TextArea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Décrivez vos besoins spécifiques..."
                  />
                </FormGroup>

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
                Merci pour votre demande. Je vous recontacterai dans les plus brefs délais.
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