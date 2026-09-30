import { Container } from '@/components/shared/Container';
import { AttractionCard } from '@/components/pontos-turisticos/AttractionCard';
import { attractionsFixture } from '@/data/fixtures/attractions.fixtures';
import { AttractionsMap } from '@/components/pontos-turisticos/AttractionsMap';
import { PageHeader } from '@/components/shared/PageHeader';

export const metadata = {
  title: 'Pontos turísticos de Aparecida — AparecidaShop',
  description:
    'Conheça os principais pontos turísticos e religiosos de Aparecida-SP.',
};



export default function PontosTuristicosPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
      <PageHeader
          eyebrow="Aparecida-SP"
          title="Pontos turísticos"
          description="Além do comércio local, Aparecida tem um roteiro rico de fé, história e passeios. Separamos os principais pontos pra você aproveitar sua visita."
        />

        <div className="mt-8">
          <AttractionsMap attractions={attractionsFixture} />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attractionsFixture.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}