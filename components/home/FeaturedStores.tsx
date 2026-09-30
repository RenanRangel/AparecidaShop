import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { StoreTicker } from '@/components/home/StoreTicker';
import { LocationSpotlight } from '@/components/home/LocationSpotlight';
import { AttractionTicker } from '@/components/home/AttractionTicker';
import { storeRepository } from '@/lib/repositories';

export async function FeaturedStores() {
  const stores = await storeRepository.getRandom(10);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
              Turismo
            </span>
            <h2 className="mt-2 font-display text-[28px] font-semibold tracking-tight text-ink sm:text-[34px]">
              Descubra Aparecida além das compras
            </h2>
          </div>
          <Link
            href="/pontos-turisticos"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-pine hover:underline"
          >
            <Compass size={15} />
            Ver pontos turísticos
          </Link>
        </div>

        <AttractionTicker />

        <div className="mt-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
              Comércio local
            </span>
            <h2 className="mt-2 font-display text-[28px] font-semibold tracking-tight text-ink sm:text-[34px]">
              Conheça algumas lojas
            </h2>
          </div>
          <Link
            href="/lojas"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-pine hover:underline"
          >
            Ver todas as lojas
            <ArrowRight size={15} />
          </Link>
        </div>

        <StoreTicker stores={stores} />

        <div className="mt-16">
          <LocationSpotlight />
        </div>
      </Container>
    </section>
  );
}