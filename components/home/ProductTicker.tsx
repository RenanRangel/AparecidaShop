import { ProductCard } from '@/components/shared/ProductCard';
import type { ProductWithStore } from '@/types';

export function ProductTicker({ products }: { products: ProductWithStore[] }) {
  if (products.length === 0) return null;

  const loopedProducts = [...products, ...products];

  return (
    <div className="mt-6 overflow-hidden">
      <div
        className="flex w-max gap-4 hover:[animation-play-state:paused]"
        style={{ animation: `ticker-scroll ${products.length * 6}s linear infinite` }}
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