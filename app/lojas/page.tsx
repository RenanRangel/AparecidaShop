import { Container } from '@/components/shared/Container';
import { CategoryFilter } from '@/components/lojas/CategoryFilter';
import { storeRepository } from '@/lib/repositories';

export default async function LojasPage() {
  const stores = await storeRepository.getAll();

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

        <CategoryFilter stores={stores} />
      </Container>
    </section>
  );
}
