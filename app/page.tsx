import { Hero } from '@/components/home/Hero';
import { BannerCarousel } from '@/components/home/BannerCarousel';
import { SearchSection } from '@/components/home/SearchSection';
import { FeaturedStores } from '@/components/home/FeaturedStores';
import { productRepository } from '@/lib/repositories';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const popularProducts = await productRepository.getPopular(4);

  return (
    <>
      <Hero />
      <BannerCarousel />
      <SearchSection initialPopularProducts={popularProducts} />
      <FeaturedStores />
    </>
  );
}