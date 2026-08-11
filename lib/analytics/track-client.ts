'use client';

export type TrackableEvent =
  | 'STORE_VIEW'
  | 'PRODUCT_VIEW'
  | 'WHATSAPP_CLICK'
  | 'ADD_TO_LIST'
  | 'LIST_WHATSAPP_SENT';

interface TrackPayload {
  type: TrackableEvent;
  storeId: string;
  productId?: string;
  origin?: string;
}

/**
 * Dispara um evento sem bloquear a interação do usuário. Usa sendBeacon
 * quando disponível (mais confiável em navegação/fechamento de aba).
 */
export function track(payload: TrackPayload): void {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
      return;
    }
    fetch('/api/track', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    });
  } catch {
    // Nunca deixa analytics quebrar a UI.
  }
}

/** Classifica de onde o visitante veio, sem precisar de parâmetro em cada link interno. */
export function classifyOrigin(): string {
  if (typeof document === 'undefined') return 'direto';
  const ref = document.referrer;
  if (!ref) return 'direto';

  try {
    const refUrl = new URL(ref);
    if (refUrl.origin !== window.location.origin) return 'link externo';
    if (refUrl.pathname === '/') return 'página inicial';
    if (refUrl.pathname === '/lojas') return 'diretório de lojas';
    if (refUrl.pathname.startsWith('/lojas/')) return 'outra loja';
    return 'outro';
  } catch {
    return 'direto';
  }
}