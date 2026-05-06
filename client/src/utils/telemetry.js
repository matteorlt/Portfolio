export async function sendEvent(_event) {
  if (typeof window !== 'undefined' && window.__consentGranted !== true) return;
  /* Analytics serveur retiré — le tracking côté client reste dans analytics.js (GA / tags). */
}

export function trackButtonClick(label, metadata = {}) {
  return sendEvent({ type: 'button_click', label, metadata });
}

export function trackPageViewServer(page) {
  return sendEvent({ type: 'page_view', page });
}


