import { Hero } from '@/components/home/Hero';
import { SearchSection } from '@/components/home/SearchSection';
import { FeaturedStores } from '@/components/home/FeaturedStores';
import { productRepository } from '@/lib/repositories';

export default async function HomePage() {
  const popularProducts = await productRepository.getPopular(4);

  return (
    <>
      <Hero />
      <SearchSection initialPopularProducts={popularProducts} />
      <FeaturedStores />
    </>
  );
}
