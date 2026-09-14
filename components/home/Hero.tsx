import { Container } from '@/components/shared/Container';
import { HeroSlideMain } from './HeroSlideMain';
import { storeRepository } from '@/lib/repositories';

export async function Hero() {
  // getAll() já filtra status: "APPROVED" no repositório.
  const stores = await storeRepository.getAll();

  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <HeroSlideMain stores={stores} />
      </Container>
    </section>
  );
}