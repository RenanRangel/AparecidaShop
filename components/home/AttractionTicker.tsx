'use client';

import { useState } from 'react';
import { attractionsFixture } from '@/data/fixtures/attractions.fixtures';

const GRADIENTS = [
  'bg-gradient-to-br from-pine via-pine-deep to-[#0D2A21]',
  'bg-gradient-to-br from-marigold-dark via-marigold to-[#8C5A16]',
];

export function AttractionTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const looped = [...attractionsFixture, ...attractionsFixture];

  return (
    <div
      className="mt-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-max gap-4"
        style={{
          animation: `ticker-scroll ${attractionsFixture.length * 3}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {looped.map((attraction, index) => (
          <div
            key={`${attraction.id}-${index}`}
            aria-hidden={index >= attractionsFixture.length ? 'true' : undefined}
            className={`flex h-28 w-[190px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl px-4 text-center shadow-soft ${
              GRADIENTS[index % GRADIENTS.length]
            }`}
          >
            <span className="text-[26px] leading-none">{attraction.emoji}</span>
            <span className="text-[13px] font-semibold leading-snug text-bg">{attraction.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}