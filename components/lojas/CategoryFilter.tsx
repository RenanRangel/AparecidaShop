'use client';

import { useState } from 'react';
import { StoreCard } from '@/components/shared/StoreCard';
import { STORE_CATEGORIES } from '@/lib/constants/categories';
import type { Store, StoreCategory } from '@/types';

type CategoryOption = StoreCategory | 'Todas';

/**
 * Único pedaço interativo da página de lojas.
 *
 * Recebe a lista completa de lojas já carregada pelo Server Component
 * (`app/lojas/page.tsx`) e filtra no cliente — sem precisar de uma nova
 * busca ao servidor a cada clique.
 */
export function CategoryFilter({ stores }: { stores: Store[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('Todas');

  const filtered =
    activeCategory === 'Todas' ? stores : stores.filter((store) => store.category === activeCategory);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {(['Todas', ...STORE_CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
              activeCategory === cat
                ? 'border-pine bg-pine text-bg'
                : 'border-sand bg-white text-ink-soft hover:border-pine hover:text-pine'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-[14px] text-ink-soft">
          Nenhuma loja encontrada nesta categoria ainda.
        </p>
      )}
    </>
  );
}
