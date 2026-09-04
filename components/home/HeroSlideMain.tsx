import Link from 'next/link';
import { ArrowRight, Search, Compass } from 'lucide-react';
import { HeroStoreShowcase } from './HeroStoreShowcase';
import type { Store } from '@/types';

export function HeroSlideMain({ stores }: { stores: Store[] }) {
  return (
    <>
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-pine">
          Comércio local de Aparecida-SP
        </span>
        <h1 className="mt-5 font-display text-[38px] font-semibold leading-[1.06] tracking-tight text-ink sm:text-[48px] lg:text-[54px]">
          Tudo o que você procura em Aparecida, em um só lugar.
        </h1>
        <p className="mt-5 max-w-[480px] text-[16.5px] leading-relaxed text-ink-soft">
          Lojas, produtos e comércio local — encontre onde comprar e fale direto com quem vende.
          E, se ainda sobrar tempo, descubra os pontos turísticos e religiosos da cidade.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <Link
            href="/lojas"
            className="inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 text-[14.5px] font-semibold text-bg shadow-card transition-transform hover:-translate-y-0.5"
          >
            Ver lojas cadastradas
            <ArrowRight size={16} />
          </Link>
          <a
            href="#busca"
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
          >
            <Search size={16} />
            Pesquisar produtos
          </a>
        </div>
        <Link
          href="/pontos-turisticos"
          className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:text-pine"
        >
          <Compass size={14} />
          Explorar pontos turísticos de Aparecida
        </Link>
      </div>

      <HeroStoreShowcase stores={stores} />
    </>
  );
}