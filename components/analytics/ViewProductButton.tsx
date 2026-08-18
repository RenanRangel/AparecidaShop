'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics/track-client';
import type { ProductWithStore } from '@/types';

export function ViewProductButton({ product }: { product: ProductWithStore }) {
  return (
    <Link
      href={`/produto/${product.id}`}
      onClick={() => track({ type: 'PRODUCT_VIEW', storeId: product.storeId, productId: product.id })}
      className="rounded-full border border-sand px-3.5 py-1.5 text-[12.5px] font-semibold text-ink transition-colors group-hover:border-pine group-hover:text-pine"
    >
      Ver produto
    </Link>
  );
}