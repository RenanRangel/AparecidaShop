'use client';

import { useEffect, useState } from 'react';
import { HeroSlideMain } from './HeroSlideMain';
import { HeroSlidePromo } from './HeroSlidePromo';
import type { Store } from '@/types';

const AUTOPLAY_MS = 7000;
const TRANSITION_MS = 300;

export function HeroCarousel({ stores }: { stores: Store[] }) {
  const [active, setActive] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % 2);
        setIsFading(false);
      }, TRANSITION_MS);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, []);

  function goTo(index: number) {
    if (index === active) return;
    setIsFading(true);
    setTimeout(() => {
      setActive(index);
      setIsFading(false);
    }, TRANSITION_MS);
  }

  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div
          className={`grid items-center gap-14 transition-opacity duration-300 lg:grid-cols-[1.05fr_0.95fr] ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {active === 0 ? <HeroSlideMain stores={stores} /> : <HeroSlidePromo />}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {[0, 1].map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir para o slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                active === index ? 'w-6 bg-pine' : 'w-1.5 bg-sand hover:bg-pine/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}