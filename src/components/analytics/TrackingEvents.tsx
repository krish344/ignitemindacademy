'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function track(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

export default function TrackingEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest('a,button') as HTMLElement | null;
      if (!el) return;

      const text = (el.textContent || '').trim().toLowerCase();
      const href = (el as HTMLAnchorElement).href || '';
      const path = window.location.pathname;

      // Generic click event
      track('button_click', {
        button_name: text.slice(0, 120) || 'unknown',
        page_name: path,
        target_url: href || null,
      });

      if (href.startsWith('tel:')) {
        track('call_click', { page_name: path, target_url: href });
      }

      if (href.includes('wa.me') || href.includes('whatsapp')) {
        track('whatsapp_click', { page_name: path, target_url: href });
      }

      if (href.includes('/book') || text.includes('diagnostic') || text.includes('book a free')) {
        track('book_diagnostic_click', { page_name: path, target_url: href || '/book' });
      }

      if (href.includes('/pricing')) {
        track('pricing_click', { page_name: path, target_url: href });
      }

      if (href.includes('/kit') || text.includes('send me the kit') || text.includes('download pdf')) {
        track('kit_download_click', { page_name: path, target_url: href || '/kit' });
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
