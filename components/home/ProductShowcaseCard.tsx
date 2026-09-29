import Image from 'next/image';
import { Package } from 'lucide-react';
import type { ProductWithStore } from '@/types';
import { cn, formatPriceBRL } from '@/lib/utils';
import { AddToListButton } from '@/components/list/AddToListButton';
import { ViewProductButton } from '@/components/analytics/ViewProductButton';

const TONE_BG: Record<ProductWithStore['imageTone'], string> = {
  pine: 'bg-pine-100',
  marigold: 'bg-marigold-light',
  sand: 'bg-sand-light',
};

export function ProductShowcaseCard({ product }: { product: ProductWithStore }) {
  const coverImage = product.images.find((img) => img.isCover) ?? product.images[0];

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-sand bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className={cn('relative aspect-square overflow-hidden', TONE_BG[product.imageTone])}>
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package size={22} className="text-ink-soft" strokeWidth={1.6} />
          </div>
        )}

        <span className="absolute left-2 top-2 max-w-[80%] truncate rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-semibold text-bg backdrop-blur-sm">
          {product.storeName}
        </span>

        <div className="absolute right-2 top-2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <AddToListButton product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3
          className="font-display text-[13px] font-semibold leading-snug text-ink"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-mono text-[12.5px] font-semibold text-pine-deep">
            {formatPriceBRL(product.price)}
          </span>
          <ViewProductButton product={product} />
        </div>
      </div>
    </div>
  );
}