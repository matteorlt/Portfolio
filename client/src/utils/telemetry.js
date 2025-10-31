export async function sendEvent(event) {
  try {
    if (typeof window !== 'undefined' && window.__consentGranted !== true) return;
    await fetch('/api/analytics/track', {
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
  } catch (_) {}
}

export function trackButtonClick(label, metadata = {}) {
  return sendEvent({ type: 'button_click', label, metadata });
}

export function trackPageViewServer(page) {
  return sendEvent({ type: 'page_view', page });
}


