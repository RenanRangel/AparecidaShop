'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/shared/ProductCard';
import type { ProductWithStore } from '@/types';

export function ProductTicker({ products }: { products: ProductWithStore[] }) {
  const [isPaused, setIsPaused] = useState(false);

  if (products.length === 0) return null;

  const loopedProducts = [...products, ...products];

  return (
    <div
      className="mt-6 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-max gap-4"
        style={{
          animation: `ticker-scroll ${products.length * 6}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {loopedProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="w-[220px] shrink-0 sm:w-[240px]"
            aria-hidden={index >= products.length ? 'true' : undefined}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}