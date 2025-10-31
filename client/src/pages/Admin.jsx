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
  const [captcha, setCaptcha] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [code, setCode] = useState(new URLSearchParams(window.location.search).get('code') || '');

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(setMe).catch(() => setMe({ authenticated: false }));
  }, []);

  useEffect(() => {
    if (!me || me.authenticated) return;
    fetch('/api/auth/captcha').then(r => r.json()).then(setCaptcha).catch(() => setCaptcha(null));
  }, [me]);

  const requestCode = async () => {
    if (!captcha) return;
    const r = await fetch('/api/auth/request-code', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: captcha.a, b: captcha.b, answer: Number(captchaAnswer), signature: captcha.signature })
    });
    if (r.ok) alert('Code envoyé par e-mail'); else alert('Échec captcha ou envoi');
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
          <h2>Accès Admin par Code</h2>
          {captcha ? (
            <div style={{ marginBottom: 12 }}>
              <div>Captcha: {captcha.a} + {captcha.b} = ?</div>
              <input placeholder="Réponse" value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} style={{ display: 'block', marginTop: 6, marginBottom: 10 }} />
              <button onClick={requestCode}>Envoyer le code par e‑mail</button>
            </div>
          ) : (
            <div>Chargement captcha…</div>
          )}
          <div style={{ marginTop: 12 }}>
            <input placeholder="Entrez le code reçu" value={code} onChange={e => setCode(e.target.value)} style={{ display: 'block', marginBottom: 8 }} />
            <button onClick={verifyCode}>Valider le code</button>
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


