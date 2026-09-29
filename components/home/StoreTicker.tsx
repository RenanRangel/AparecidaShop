'use client';

import { useState } from 'react';
import { StoreCard } from '@/components/shared/StoreCard';
import type { Store } from '@/types';

export function StoreTicker({ stores }: { stores: Store[] }) {
  const [isPaused, setIsPaused] = useState(false);

  if (stores.length === 0) return null;

  const loopedStores = [...stores, ...stores];

  return (
    <div
      className="mt-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-max gap-5"
        style={{
          animation: `ticker-scroll ${stores.length * 7}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
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