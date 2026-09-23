'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductCard } from '@/components/shared/ProductCard';
import type { ProductWithStore, Store } from '@/types';

export function StoreContentTabs({
  products,
  galleryImages,
  storeName,
}: {
  products: ProductWithStore[];
  galleryImages: Store['galleryImages'];
  storeName: string;
}) {
  const hasGallery = galleryImages.length > 0;
  const [tab, setTab] = useState<'produtos' | 'galeria'>('produtos');

  return (
    <div>
      {hasGallery && (
        <div className="flex gap-1 border-b border-sand">
          <button
            type="button"
            onClick={() => setTab('produtos')}
            className={`border-b-2 px-1 py-2.5 text-[14px] font-semibold transition-colors ${
              tab === 'produtos' ? 'border-pine text-pine' : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            Produtos
          </button>
          <button
            type="button"
            onClick={() => setTab('galeria')}
            className={`ml-4 border-b-2 px-1 py-2.5 text-[14px] font-semibold transition-colors ${
              tab === 'galeria' ? 'border-pine text-pine' : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            Galeria
          </button>
        </div>
      )}

      {(!hasGallery || tab === 'produtos') &&
        (products.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-[14px] text-ink-soft">Esta loja ainda não cadastrou produtos.</p>
        ))}

      {hasGallery && tab === 'galeria' && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative aspect-square overflow-hidden rounded-xl border border-sand">
              <Image src={image.url} alt={`Foto da ${storeName}`} fill className="object-cover" sizes="200px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}