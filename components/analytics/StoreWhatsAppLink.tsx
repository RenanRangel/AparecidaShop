'use client';

import { MessageCircle } from 'lucide-react';
import { track } from '@/lib/analytics/track-client';
import { formatPhoneDisplay, normalizePhoneDigits } from '@/lib/utils';

export function StoreWhatsAppLink({ storeId, whatsapp }: { storeId: string; whatsapp: string }) {
  return (
    <a
      href={`https://wa.me/${normalizePhoneDigits(whatsapp)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track({ type: 'WHATSAPP_CLICK', storeId })}
      className="mt-3 flex items-center gap-2 text-[13.5px] font-semibold text-pine hover:underline"
    >
      <MessageCircle size={15} />
      {formatPhoneDisplay(whatsapp)}
    </a>
  );
}