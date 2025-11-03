import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-radius: 12px;
  padding: 1rem;
`;

export default function Admin() {
  const [me, setMe] = useState(null);
  const [summary, setSummary] = useState(null);
  const [offers, setOffers] = useState({ starter: '700', professional: '1500', premium: '2600' });
  const [code, setCode] = useState(new URLSearchParams(window.location.search).get('code') || '');
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(setMe).catch(() => setMe({ authenticated: false }));
  }, []);

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
    const r = await fetch('/api/analytics/summary');
    if (r.ok) setSummary(await r.json());
  };

  const loadOffers = async () => {
    const r = await fetch('/api/settings/get?keys=offers');
    if (r.ok) {
      const data = await r.json();
      if (data.offers) setOffers(data.offers);
    }
  };

  const saveOffers = async () => {
    const r = await fetch('/api/settings/set', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ updates: { offers } }) });
    if (r.ok) alert('Enregistré');
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

  return (
    <Container>
      <h1>Admin</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <h3>Statistiques</h3>
          <button onClick={loadSummary}>Charger</button>
          {summary && (
            <div style={{ marginTop: 12 }}>
              <div>Total events: {summary.totalEvents}</div>
              <div>Pages vues: {summary.pageViews}</div>
              <div>Clicks boutons: {summary.buttonClicks}</div>
              <div style={{ marginTop: 8 }}>
                <strong>Top pages</strong>
                <ul>
                  {summary.topPages?.map((p, i) => (
                    <li key={i}>{p.page}: {p.c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h3>Offres (prix)</h3>
          <button onClick={loadOffers}>Charger</button>
          <div style={{ marginTop: 12 }}>
            <label>Starter (€)</label>
            <input value={offers.starter} onChange={e => setOffers(o => ({ ...o, starter: e.target.value }))} style={{ display: 'block', marginBottom: 8 }} />
            <label>Professional (€)</label>
            <input value={offers.professional} onChange={e => setOffers(o => ({ ...o, professional: e.target.value }))} style={{ display: 'block', marginBottom: 8 }} />
            <label>Premium (€)</label>
            <input value={offers.premium} onChange={e => setOffers(o => ({ ...o, premium: e.target.value }))} style={{ display: 'block', marginBottom: 12 }} />
            <button onClick={saveOffers}>Enregistrer</button>
          </div>
        </Card>
      </div>
    </Container>
  );
}


