import { Container } from '@/components/shared/Container';
import { StoreDirectoryFilters } from '@/components/lojas/StoreDirectoryFilters';
import { PageHeader } from '@/components/shared/PageHeader';
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
        <PageHeader
          eyebrow="Diretório"
          title="Lojas cadastradas em Aparecida"
          description="Navegue pelo comércio local por categoria e encontre a loja certa para o que você procura."
        />

        <StoreDirectoryFilters stores={stores} initialZone={initialZone} />
      </Container>
    </section>
  );
}