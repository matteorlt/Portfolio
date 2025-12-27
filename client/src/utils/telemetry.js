export async function sendEvent(event) {
  try {
    if (typeof window !== 'undefined' && window.__consentGranted !== true) return;
    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: event.type,
        page: event.page || window.location.pathname,
        label: event.label,
        metadata: event.metadata || {},
        ts: Date.now()
      })
    });
    // Ne pas afficher d'erreur si la réponse n'est pas OK (évite les erreurs 500 dans la console)
    if (!response.ok) {
      return;
    }
  } catch (_) {
    // Erreur silencieuse pour éviter le bruit dans la console
  }
}

export function trackButtonClick(label, metadata = {}) {
  return sendEvent({ type: 'button_click', label, metadata });
}

export function trackPageViewServer(page) {
  return sendEvent({ type: 'page_view', page });
}


