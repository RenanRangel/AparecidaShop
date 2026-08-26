import { storeRepository } from '@/lib/repositories';
import { HeroCarousel } from './HeroCarousel';

export async function Hero() {
  // getAll() já filtra status: "APPROVED" no repositório.
  const stores = await storeRepository.getAll();

  return <HeroCarousel stores={stores} />;
}