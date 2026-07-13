import { Package } from 'lucide-react';
import type { ProductWithStore } from '@/types';
import { cn } from '@/lib/utils';

const TONE_BG: Record<ProductWithStore['imageTone'], string> = {
  pine: 'bg-pine-100',
  marigold: 'bg-marigold-light',
  sand: 'bg-sand-light',
};

const TONE_ICON: Record<ProductWithStore['imageTone'], string> = {
  pine: 'text-pine-deep',
  marigold: 'text-marigold-dark',
  sand: 'text-ink-soft',
};

export function ProductCard({ product }: { product: ProductWithStore }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-white transition-shadow hover:shadow-card">
      <div className={cn('flex aspect-square items-center justify-center', TONE_BG[product.imageTone])}>
        <Package size={30} className={TONE_ICON[product.imageTone]} strokeWidth={1.6} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wide text-ink-soft">
          {product.category}
        </span>
        <h3 className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-1 text-[13px] text-ink-soft">{product.storeName}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[14px] font-semibold text-pine-deep">
            {product.price !== null ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}
          </span>
          <button
            type="button"
            className="rounded-full border border-sand px-3.5 py-1.5 text-[12.5px] font-semibold text-ink transition-colors group-hover:border-pine group-hover:text-pine"
          >
            Ver produto
          </button>
        </div>
      </div>
    </div>
  );
}
