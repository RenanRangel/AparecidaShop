'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';
import type { ProductWithStore } from '@/types';
import { AddToListButton } from '@/components/list/AddToListButton';

const TONE_BG = {
  pine: 'bg-pine-100',
  marigold: 'bg-marigold-light',
  sand: 'bg-sand-light',
} as const;

const TONE_ICON = {
  pine: 'text-pine-deep',
  marigold: 'text-marigold-dark',
  sand: 'text-ink-soft',
} as const;

export function ProductGallery({ product }: { product: ProductWithStore }) {
  const images = product.images;
  const cover = images.find((img) => img.isCover) ?? images[0];
  const [activeId, setActiveId] = useState(cover?.id ?? null);
  const activeImage = images.find((img) => img.id === activeId) ?? cover;

  return (
    <div>
      <div
        className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-sand ${TONE_BG[product.imageTone]}`}
      >
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <Package size={56} className={TONE_ICON[product.imageTone]} strokeWidth={1.4} />
        )}
        <div className="absolute right-3 top-3">
          <AddToListButton product={product} />
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2.5">
          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveId(image.id)}
              aria-label="Ver esta foto"
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                activeImage?.id === image.id ? 'border-pine' : 'border-sand hover:border-pine/50'
              }`}
            >
              <Image src={image.url} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}