import Link from 'next/link';
import { MapPin, ArrowUpRight, BadgeCheck } from 'lucide-react';
import type { Store } from '@/types';
import { cn } from '@/lib/utils';

const TONE_STYLES: Record<Store['coverTone'], string> = {
  pine: 'bg-pine text-bg',
  marigold: 'bg-marigold text-ink',
  sand: 'bg-sand text-ink',
};

export function StoreCard({ store }: { store: Store }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-sand bg-white transition-shadow hover:shadow-card">
      <div className={cn('flex h-28 items-center justify-center', TONE_STYLES[store.coverTone])}>
        <span className="font-display text-[26px] font-bold tracking-tight">{store.logoInitials}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wide text-pine-deep">
          {store.category}
        </span>
        <h3 className="mt-1.5 flex items-center gap-1.5 font-display text-[17px] font-semibold text-ink">
          {store.name}
          {store.verified && <BadgeCheck size={16} className="shrink-0 text-pine" aria-label="Loja verificada" />}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-soft">
          <MapPin size={13} />
          {store.location}
        </p>
        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-soft">{store.description}</p>
        <Link
          href={`/lojas/${store.id}`}
          className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-sand px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
        >
          Ver loja
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
