'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BadgeCheck,
  Store as StoreIcon,
  Gift,
  Shirt,
  Coffee,
  Gem,
  Palette,
} from 'lucide-react';
import type { Store } from '@/types';

const VISIBLE_COUNT = 6;
const ROTATION_INTERVAL_MS = 6000;
const TRANSITION_MS = 400;

// Mesmo ícone por categoria em qualquer lugar da vitrine — se a loja tiver
// uma categoria fora dessa lista, cai no ícone genérico (StoreIcon).
const CATEGORY_ICONS: Record<string, typeof StoreIcon> = {
  'Artigos religiosos': StoreIcon,
  'Lembranças e souvenirs': Gift,
  Vestuário: Shirt,
  Alimentação: Coffee,
  Acessórios: Gem,
  Decoração: Palette,
};

// As mesmas 6 combinações de cor/rotação que existiam fixas no BOARD_TAGS
// original — preservando a identidade visual, só que aplicadas por posição
// em vez de por loja específica.
const CHIP_VARIANTS = [
  { rotate: '-rotate-2', tone: 'bg-pine text-bg' },
  { rotate: 'rotate-1', tone: 'bg-marigold text-ink' },
  { rotate: '-rotate-1', tone: 'bg-bg text-ink border border-sand' },
  { rotate: 'rotate-2', tone: 'bg-pine-deep text-bg' },
  { rotate: '-rotate-1', tone: 'bg-bg text-ink border border-sand' },
  { rotate: 'rotate-1', tone: 'bg-marigold-light text-ink' },
];

/**
 * Ponto de extensão pra priorização futura (ex: plano premium com destaque
 * na rotação). Hoje só devolve a lista na ordem recebida do repositório
 * (mais recentes primeiro). Quando "destaque pago" existir, essa função
 * passa a reordenar priorizando essas lojas — sem precisar mexer em mais
 * nada no componente.
 */
function sortForRotation(stores: Store[]): Store[] {
  // TODO: priorizar lojas "destaque"/premium quando esse conceito existir.
  return stores;
}

function useRotatingWindow(allStores: Store[]) {
  // Congela a ordem uma única vez — não recalcula a cada re-render.
  const sorted = useRef(sortForRotation(allStores)).current;
  const [offset, setOffset] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const shouldRotate = sorted.length > VISIBLE_COUNT;

  useEffect(() => {
    if (!shouldRotate) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const intervalId = setInterval(() => {
      setIsFading(true);
      timeoutId = setTimeout(() => {
        setOffset((prev) => (prev + VISIBLE_COUNT) % sorted.length);
        setIsFading(false);
      }, TRANSITION_MS);
    }, ROTATION_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [shouldRotate, sorted.length]);

  const visible = shouldRotate
    ? Array.from({ length: VISIBLE_COUNT }, (_, i) => sorted[(offset + i) % sorted.length])
    : sorted.slice(0, VISIBLE_COUNT);

  return { visible, isFading };
}

export function HeroStoreShowcase({ stores }: { stores: Store[] }) {
  const { visible, isFading } = useRotatingWindow(stores);

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-pine-50" aria-hidden />
      <div className="rounded-[1.75rem] border border-sand bg-white p-7 shadow-card sm:p-9">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          Vitrine do comércio · Aparecida-SP
        </p>

        <div
          className={`mt-6 flex flex-wrap gap-3.5 transition-all duration-[400ms] ease-out ${
            isFading ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {visible.map((store, i) => {
            const Icon = CATEGORY_ICONS[store.category] ?? StoreIcon;
            const variant = CHIP_VARIANTS[i % CHIP_VARIANTS.length];

            return (
              <span
                key={store.id}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-[13px] font-semibold shadow-soft ${variant.rotate} ${variant.tone}`}
              >
                <Icon size={15} />
                {store.name}
                {store.verified && (
                  <BadgeCheck size={13} className="opacity-90" aria-label="Loja verificada" />
                )}
              </span>
            );
          })}
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-sand pt-5">
          <span className="text-[13px] text-ink-soft">
            +{stores.length} lojas cadastradas
          </span>
          <span className="font-mono text-[12px] font-semibold text-pine">em crescimento</span>
        </div>
      </div>
    </div>
  );
}