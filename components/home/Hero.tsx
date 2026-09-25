import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { HeroSlideMain } from './HeroSlideMain';
import { storeRepository } from '@/lib/repositories';

export async function Hero() {
  const stores = await storeRepository.getAll();

  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Image
        src="/images/aparecida-hero.jpg"
        alt="Vista do Santuário Nacional de Aparecida"
        fill
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-pine-deep/95 via-pine-deep/80 to-pine-deep/45"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-pine-deep/70 via-transparent to-transparent"
        aria-hidden
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <HeroSlideMain stores={stores} />
      </Container>
    </section>
  );
}