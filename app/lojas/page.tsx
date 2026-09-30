import { Container } from '@/components/shared/Container';
import { StoreDirectoryFilters } from '@/components/lojas/StoreDirectoryFilters';
import { storeRepository } from '@/lib/repositories';
import { STORE_ZONES, type StoreZoneValue } from '@/lib/constants/zones';

export const dynamic = "force-dynamic";

export default async function LojasPage({
  searchParams,
}: {
  searchParams: { zone?: string };
}) {
  const stores = await storeRepository.getAll();

  const initialZone = STORE_ZONES.includes(searchParams.zone as StoreZoneValue)
    ? (searchParams.zone as StoreZoneValue)
    : undefined;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
          Diretório
        </span>
        <h1 className="mt-2 font-display text-[32px] font-semibold tracking-tight text-ink sm:text-[40px]">
          Lojas cadastradas em Aparecida
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-ink-soft">
          Navegue pelo comércio local por categoria e encontre a loja certa para o que você
          procura.
        </p>

        <StoreDirectoryFilters stores={stores} initialZone={initialZone} />
      </Container>
    </section>
  );
}