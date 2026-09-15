import type { MetadataRoute } from 'next';
import { storeRepository, productRepository } from '@/lib/repositories';

const BASE_URL = 'https://aparecida-shop.vercel.app'; // trocar quando o domínio próprio existir

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [stores, products] = await Promise.all([
    storeRepository.getAll(),
    productRepository.getAll(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/lojas`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/pontos-turisticos`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/missas`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/para-lojas`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacidade`, changeFrequency: 'yearly', priority: 0.1 },
  ];

  const storePages: MetadataRoute.Sitemap = stores.map((store) => ({
    url: `${BASE_URL}/lojas/${store.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => product.status === 'ACTIVE')
    .map((product) => ({
      url: `${BASE_URL}/produto/${product.id}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

  return [...staticPages, ...storePages, ...productPages];
}