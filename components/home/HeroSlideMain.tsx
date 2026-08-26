import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
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
          Encontre as lojas e produtos que fazem parte da sua experiência em Aparecida.
        </h1>
        <p className="mt-5 max-w-[480px] text-[16.5px] leading-relaxed text-ink-soft">
          Descubra comércios locais, encontre seus produtos favoritos e conecte-se diretamente
          com as lojas da cidade.
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
      </div>

      <HeroStoreShowcase stores={stores} />
    </>
  );
}