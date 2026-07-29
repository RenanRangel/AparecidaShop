import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { HeroStoreShowcase } from './HeroStoreShowcase';
import { storeRepository } from '@/lib/repositories';

export async function Hero() {
  // getAll() já filtra status: "APPROVED" no repositório.
  const stores = await storeRepository.getAll();

  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
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

        {/* Elemento-assinatura: mural de placas do comércio local */}
        <HeroStoreShowcase stores={stores} />
      </Container>
    </section>
  );
}