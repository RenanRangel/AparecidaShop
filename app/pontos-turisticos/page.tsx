import { Container } from '@/components/shared/Container';
import { AttractionCard } from '@/components/pontos-turisticos/AttractionCard';
import { attractionsFixture } from '@/data/fixtures/attractions.fixtures';

export const metadata = {
  title: 'Pontos turísticos de Aparecida — AparecidaShop',
  description: 'Conheça os principais pontos turísticos e religiosos de Aparecida-SP.',
};

export default function PontosTuristicosPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
          Aparecida-SP
        </span>
        <h1 className="mt-2 font-display text-[32px] font-semibold tracking-tight text-ink sm:text-[40px]">
          Pontos turísticos
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-ink-soft">
          Além do comércio local, Aparecida tem um roteiro rico de fé, história e passeios. Separamos
          os principais pontos pra você aproveitar sua visita.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attractionsFixture.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      </Container>
    </section>
  );
}