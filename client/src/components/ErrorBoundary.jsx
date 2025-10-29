import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%);
`;

const ErrorContent = styled(motion.div)`
  max-width: 600px;
  text-align: center;
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 16px;
  padding: 3rem 2rem;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: #ff6b6b;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: #aaaaaa;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ErrorDetails = styled.details`
  margin-bottom: 2rem;
  text-align: left;
  
  summary {
    color: #4a90e2;
    cursor: pointer;
    margin-bottom: 1rem;
    font-weight: 500;
    
    &:hover {
      color: #357abd;
    }
  }
  
  pre {
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    color: #ff6b6b;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.primary {
    background: #4a90e2;
    color: white;

    &:hover {
      background: #357abd;
    }
  }

  &.secondary {
    background: transparent;
    color: #4a90e2;
    border: 1px solid #4a90e2;

    &:hover {
      background: rgba(74, 144, 226, 0.1);
    }
  }
`;

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Tracker l'erreur si disponible
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return this.props.renderError(
        this.state.error,
        this.state.errorInfo,
        this.handleReset
      );
    }

    return this.props.children;
  }
}

// Wrapper pour utiliser ErrorBoundary avec hooks
const ErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundaryWrapper>
      {({ renderError }) => (
        <ErrorBoundaryClass renderError={renderError}>
          {children}
        </ErrorBoundaryClass>
      )}
    </ErrorBoundaryWrapper>
  );
};

const ErrorBoundaryWrapper = ({ children }) => {
  return children({
    renderError: (error, errorInfo, onReset) => (
      <ErrorBoundaryContent 
        error={error}
        errorInfo={errorInfo}
        onReset={onReset}
      />
    )
  });
};

const ErrorBoundaryContent = ({ error, errorInfo, onReset }) => {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <ErrorContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ErrorIcon>
          <FiAlertTriangle />
        </ErrorIcon>
        
        <ErrorTitle>Une erreur est survenue</ErrorTitle>
        
        <ErrorMessage>
          Désolé, quelque chose s'est mal passé. L'erreur a été enregistrée et sera corrigée prochainement.
          Vous pouvez essayer de rafraîchir la page ou retourner à l'accueil.
        </ErrorMessage>

        {error && (
          <ErrorDetails>
            <summary>Détails techniques de l'erreur</summary>
            <pre>
              {error.toString()}
              {errorInfo && errorInfo.componentStack}
            </pre>
          </ErrorDetails>
        )}

        <ButtonGroup>
          <ActionButton
            className="primary"
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw />
            Rafraîchir la page
          </ActionButton>
          
          <ActionButton
            className="secondary"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHome />
            Retour à l'accueil
          </ActionButton>
        </ButtonGroup>
      </ErrorContent>
    </ErrorContainer>
  );
};

export default ErrorBoundary;

