import { StoreCard } from '@/components/shared/StoreCard';
import type { Store } from '@/types';

export function StoreTicker({ stores }: { stores: Store[] }) {
  if (stores.length === 0) return null;

  // Lista duplicada para o loop ficar contínuo, sem "pulo" perceptível.
  const loopedStores = [...stores, ...stores];

  return (
    <div className="mt-10 overflow-hidden">
      <div
        className="flex w-max gap-5 hover:[animation-play-state:paused]"
        style={{ animation: `ticker-scroll ${stores.length * 7}s linear infinite` }}
      >
        {loopedStores.map((store, index) => (
          <div
            key={`${store.id}-${index}`}
            className="w-[300px] shrink-0 sm:w-[320px]"
            aria-hidden={index >= stores.length ? 'true' : undefined}
          >
            <StoreCard store={store} />
          </div>
        ))}
      </div>
    </div>
  );
}