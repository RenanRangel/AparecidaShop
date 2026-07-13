'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Search, SearchX } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { ProductCard } from '@/components/shared/ProductCard';
import { productRepository } from '@/lib/repositories';
import type { ProductWithStore } from '@/types';

const SUGGESTIONS = ['terço', 'camiseta', 'lembrança', 'doce', 'imagem'];

export function SearchSection({
  initialPopularProducts,
}: {
  initialPopularProducts: ProductWithStore[];
}) {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [results, setResults] = useState<ProductWithStore[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const hasSearched = submitted.trim().length > 0;

  // Busca assíncrona: hoje resolve contra o array mockado, futuramente
  // pode virar uma chamada real à API/Postgres sem mudar este componente.
  useEffect(() => {
    if (!hasSearched) {
      setResults([]);
      return;
    }

    let isCurrent = true;
    setIsSearching(true);

    productRepository.search(submitted).then((found) => {
      if (isCurrent) {
        setResults(found);
        setIsSearching(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [submitted, hasSearched]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(query);
  }

  const showEmptyState = hasSearched && !isSearching && results.length === 0;
  const visibleProducts = hasSearched ? results : initialPopularProducts;

  return (
    <section id="busca" className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-ink sm:text-[34px]">
            O que você está procurando?
          </h2>
          <p className="mt-3 text-[15.5px] text-ink-soft">
            Pesquise produtos disponíveis nas lojas cadastradas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-sand bg-white px-5 py-3.5 shadow-soft focus-within:border-pine">
            <Search size={18} className="shrink-0 text-ink-soft" />
            <label htmlFor="product-search" className="sr-only">
              Buscar produtos
            </label>
            <input
              id="product-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: terço, imagem de Nossa Senhora, camiseta, lembrança..."
              className="w-full bg-transparent text-[14.5px] text-ink outline-none placeholder:text-ink-soft/70"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-pine px-7 py-3.5 text-[14.5px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            Pesquisar
          </button>
        </form>

        <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          <span className="text-[12.5px] text-ink-soft">Sugestões:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuery(s);
                setSubmitted(s);
              }}
              className="rounded-full border border-sand bg-white px-3 py-1 text-[12.5px] text-ink-soft transition-colors hover:border-pine hover:text-pine"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="font-display text-[15px] font-semibold text-ink">
            {hasSearched ? `Resultados para "${submitted}"` : 'Populares agora'}
          </h3>

          {showEmptyState ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sand py-16 text-center">
              <SearchX size={26} className="text-ink-soft" />
              <p className="text-[14.5px] text-ink-soft">
                Nenhum produto encontrado para &quot;{submitted}&quot;. Tente outro termo, como
                &quot;terço&quot; ou &quot;camiseta&quot;.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
