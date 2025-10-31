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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [summary, setSummary] = useState(null);
  const [offers, setOffers] = useState({ starter: '700', professional: '1500', premium: '2600' });

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(setMe).catch(() => setMe({ authenticated: false }));
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (r.ok) {
      const m = await fetch('/api/auth/me').then(r => r.json());
      setMe(m);
    } else {
      alert('Identifiants invalides');
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
          <h2>Connexion Admin</h2>
          <form onSubmit={login}>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', marginBottom: 8 }} />
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', marginBottom: 12 }} />
            <button type="submit">Se connecter</button>
          </form>
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


