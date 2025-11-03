import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const Card = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(74, 144, 226, 0.3);
    box-shadow: 0 8px 24px rgba(74, 144, 226, 0.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a90e2;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(74, 144, 226, 0.05) 100%);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.2);
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TopPagesList = styled.div`
  margin-top: 1.5rem;
`;

const TopPagesTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const PageItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 8px;
  border-left: 3px solid #4a90e2;
`;

const PageName = styled.span`
  color: #ffffff;
  font-weight: 500;
`;

const PageCount = styled.span`
  color: #4a90e2;
  font-weight: 700;
  font-size: 1.1rem;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(74, 144, 226, 0.3);
  border-radius: 50%;
  border-top-color: #4a90e2;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#4a90e2' : 'rgba(74, 144, 226, 0.1)'};
  color: ${props => props.active ? 'white' : '#4a90e2'};
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#357abd' : 'rgba(74, 144, 226, 0.2)'};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Label = styled.label`
  display: block;
  color: #cccccc;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 8px;
  color: #ff6b6b;
  margin-top: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #888888;
  font-style: italic;
`;

export default function Admin() {
  const [me, setMe] = useState(null);
  const [summary, setSummary] = useState(null);
  const [offers, setOffers] = useState({ starter: '700', professional: '1500', premium: '2600' });
  const [code, setCode] = useState(new URLSearchParams(window.location.search).get('code') || '');
  const [isRequesting, setIsRequesting] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(setMe).catch(() => setMe({ authenticated: false }));
  }, []);

  // Charger les stats automatiquement après connexion
  useEffect(() => {
    if (me && me.authenticated) {
      loadSummary();
      loadOffers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  const requestCode = async () => {
    setIsRequesting(true);
    try {
      const r = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      if (r.ok) {
        alert('Code envoyé par e-mail ! Vérifiez votre boîte de réception.');
      } else {
        const err = await r.json().catch(() => ({}));
        alert(err.message || 'Erreur lors de l\'envoi du code');
      }
    } catch (error) {
      alert('Erreur lors de la demande de code');
    } finally {
      setIsRequesting(false);
    }
  };

  const verifyCode = async () => {
    if (!code) return;
    const r = await fetch('/api/auth/verify-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
    if (r.ok) {
      const m = await fetch('/api/auth/me').then(r => r.json());
      setMe(m);
    } else {
      alert('Code invalide/expiré');
    }
  };

  const loadSummary = async () => {
    setIsLoadingStats(true);
    setError(null);
    try {
      const now = Date.now();
      let since = 0;
      
      if (timeFilter === 'today') {
        since = now - 24 * 60 * 60 * 1000;
      } else if (timeFilter === 'week') {
        since = now - 7 * 24 * 60 * 60 * 1000;
      } else if (timeFilter === 'month') {
        since = now - 30 * 24 * 60 * 60 * 1000;
      }

      const url = since > 0 ? `/api/analytics/summary?since=${since}` : '/api/analytics/summary';
      const r = await fetch(url);
      
      if (r.ok) {
        const data = await r.json();
        setSummary(data);
      } else {
        const err = await r.json().catch(() => ({}));
        setError(err.message || 'Erreur lors du chargement des statistiques');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error('Erreur loadSummary:', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const loadOffers = async () => {
    const r = await fetch('/api/settings/get?keys=offers');
    if (r.ok) {
      const data = await r.json();
      if (data.offers) setOffers(data.offers);
    }
  };

  const saveOffers = async () => {
    try {
      const r = await fetch('/api/settings/set', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ updates: { offers } }) 
      });
      if (r.ok) {
        alert('✅ Prix enregistrés avec succès !');
      } else {
        const err = await r.json().catch(() => ({}));
        alert('❌ Erreur: ' + (err.message || 'Impossible d\'enregistrer'));
      }
    } catch (error) {
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setMe({ authenticated: false });
    } catch (error) {
      console.error('Erreur logout:', error);
    }
  };

  if (!me || !me.authenticated) {
    return (
      <Container>
        <Card>
          <h2>Accès Admin</h2>
          <p style={{ color: '#cccccc', marginBottom: '1rem' }}>
            Un code d'accès vous sera envoyé par e-mail à <strong>contact@matteo-rlt.fr</strong>
          </p>
          <button 
            onClick={requestCode} 
            disabled={isRequesting}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isRequesting ? 'not-allowed' : 'pointer',
              opacity: isRequesting ? 0.6 : 1,
              marginBottom: '1rem'
            }}
          >
            {isRequesting ? 'Envoi en cours...' : 'Envoyer le code par e-mail'}
          </button>
          <div style={{ marginTop: '1rem' }}>
            <input 
              placeholder="Entrez le code reçu" 
              value={code} 
              onChange={e => setCode(e.target.value)} 
              style={{ 
                display: 'block', 
                width: '100%',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(74, 144, 226, 0.2)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem'
              }} 
            />
            <button 
              onClick={verifyCode}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#4a90e2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Valider le code
            </button>
          </div>
        </Card>
      </Container>
    );
  }

  const formatNumber = (num) => {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Title style={{ marginBottom: 0 }}>Tableau de bord Admin</Title>
        <Button 
          onClick={handleLogout}
          style={{ background: '#dc3545', marginBottom: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🚪 Déconnexion
        </Button>
      </div>

      <Grid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle>
            📊 Statistiques
            {isLoadingStats && <LoadingSpinner />}
          </CardTitle>

          <FilterButtons>
            <FilterButton 
              active={timeFilter === 'all'} 
              onClick={() => { setTimeFilter('all'); loadSummary(); }}
            >
              Tout
            </FilterButton>
            <FilterButton 
              active={timeFilter === 'today'} 
              onClick={() => { setTimeFilter('today'); loadSummary(); }}
            >
              Aujourd'hui
            </FilterButton>
            <FilterButton 
              active={timeFilter === 'week'} 
              onClick={() => { setTimeFilter('week'); loadSummary(); }}
            >
              7 jours
            </FilterButton>
            <FilterButton 
              active={timeFilter === 'month'} 
              onClick={() => { setTimeFilter('month'); loadSummary(); }}
            >
              30 jours
            </FilterButton>
          </FilterButtons>

          <Button 
            onClick={loadSummary}
            disabled={isLoadingStats}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoadingStats ? 'Chargement...' : '🔄 Actualiser'}
          </Button>

          {error && <ErrorMessage>❌ {error}</ErrorMessage>}

          {summary && (
            <>
              <StatsGrid>
                <StatCard
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <StatValue>{formatNumber(summary.totalEvents)}</StatValue>
                  <StatLabel>Événements totaux</StatLabel>
                </StatCard>

                <StatCard
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <StatValue>{formatNumber(summary.pageViews)}</StatValue>
                  <StatLabel>Pages vues</StatLabel>
                </StatCard>

                <StatCard
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <StatValue>{formatNumber(summary.buttonClicks)}</StatValue>
                  <StatLabel>Clics boutons</StatLabel>
                </StatCard>
              </StatsGrid>

              {summary.topPages && summary.topPages.length > 0 && (
                <TopPagesList>
                  <TopPagesTitle>📈 Pages les plus visitées</TopPagesTitle>
                  {summary.topPages.map((page, index) => (
                    <PageItem
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <PageName>{page.page || '(Page inconnue)'}</PageName>
                      <PageCount>{formatNumber(page.c)}</PageCount>
                    </PageItem>
                  ))}
                </TopPagesList>
              )}

              {(!summary.topPages || summary.topPages.length === 0) && (
                <EmptyState>Aucune donnée de page disponible</EmptyState>
              )}
            </>
          )}

          {!summary && !isLoadingStats && !error && (
            <EmptyState>Cliquez sur "Actualiser" pour charger les statistiques</EmptyState>
          )}
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardTitle>💰 Gestion des offres</CardTitle>
          
          <Button 
            onClick={loadOffers}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📥 Charger les prix
          </Button>

          <div>
            <Label>Starter (€)</Label>
            <Input 
              type="text"
              value={offers.starter} 
              onChange={e => setOffers(o => ({ ...o, starter: e.target.value }))} 
            />
            
            <Label>Professional (€)</Label>
            <Input 
              type="text"
              value={offers.professional} 
              onChange={e => setOffers(o => ({ ...o, professional: e.target.value }))} 
            />
            
            <Label>Premium (€)</Label>
            <Input 
              type="text"
              value={offers.premium} 
              onChange={e => setOffers(o => ({ ...o, premium: e.target.value }))} 
            />
            
            <Button 
              onClick={saveOffers}
              style={{ marginTop: '1rem', width: '100%' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              💾 Enregistrer
            </Button>
          </div>
        </Card>
      </Grid>
    </Container>
  );
}


