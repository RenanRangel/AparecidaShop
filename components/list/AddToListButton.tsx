'use client';

import { Heart, Check } from 'lucide-react';
import { useProductList } from '@/components/list/ListProvider';
import type { ProductWithStore } from '@/types';
import { track } from '@/lib/analytics/track-client';

export function AddToListButton({ product }: { product: ProductWithStore }) {
  const { addItem, removeItem, isInList } = useProductList();
  const inList = isInList(product.id);

  function handleClick() {
    if (inList) {
      removeItem(product.id);
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      storeId: product.storeId,
      storeName: product.storeName,
      storeWhatsapp: product.storeWhatsapp,
    });
    track({ type: 'ADD_TO_LIST', storeId: product.storeId, productId: product.id });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={inList}
      aria-label={inList ? `Remover ${product.name} da lista` : `Adicionar ${product.name} à lista`}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
        inList
          ? 'border-pine bg-pine text-bg'
          : 'border-sand text-ink-soft hover:border-pine hover:text-pine'
      }`}
    >
      {inList ? <Check size={14} /> : <Heart size={14} />}
    </button>
  );
}