import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { StoreCard } from '@/components/shared/StoreCard';
import { storeRepository } from '@/lib/repositories';

export async function FeaturedStores() {
  const stores = await storeRepository.getFeatured(3);

  return (
    <section className="bg-pine-50/50 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </Container>
    </section>
  );
}
