import { Hero } from '@/components/home/Hero';
import { SearchSection } from '@/components/home/SearchSection';
import { FeaturedStores } from '@/components/home/FeaturedStores';
import { productRepository } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const initialProducts = await productRepository.getRandomOnePerStore(8);

  return (
    <>
      <Hero />
      <SearchSection initialProducts={initialProducts} />
      <FeaturedStores />
    </>
  );
}