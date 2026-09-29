import Link from 'next/link';
import type { Store } from '@/types';
import { cn } from '@/lib/utils';

const TONE_STYLES: Record<Store['coverTone'], string> = {
  pine: 'bg-pine text-bg',
  marigold: 'bg-marigold text-ink',
  sand: 'bg-sand text-ink',
};

function TickerCard({ store }: { store: Store }) {
  return (
    <Link
      href={`/lojas/${store.slug}`}
      className="flex w-[220px] shrink-0 items-center gap-3 rounded-2xl border border-sand bg-white px-4 py-3 transition-shadow hover:shadow-card"
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold',
          TONE_STYLES[store.coverTone],
        )}
      >
        {store.logoInitials}
      </span>
      <div className="min-w-0">
        <p className="truncate font-display text-[13.5px] font-semibold text-ink">{store.name}</p>
        <p className="truncate text-[11.5px] text-ink-soft">{store.category}</p>
      </div>
    </Link>
  );
}

export function StoreTicker({ stores }: { stores: Store[] }) {
  if (stores.length === 0) return null;

  // Lista duplicada para o loop ficar contínuo, sem "pulo" perceptível.
  const loopedStores = [...stores, ...stores];

  return (
    <div className="mt-10 overflow-hidden">
      <div
        className="flex w-max gap-4 hover:[animation-play-state:paused]"
        style={{ animation: `ticker-scroll ${stores.length * 4}s linear infinite` }}
      >
        {loopedStores.map((store, index) => (
          <div key={`${store.id}-${index}`} aria-hidden={index >= stores.length ? 'true' : undefined}>
            <TickerCard store={store} />
          </div>
        ))}
      </div>
    </div>
  );
}