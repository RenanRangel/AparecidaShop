import type { MetadataRoute } from 'next';

const BASE_URL = 'https://aparecida-shop.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/painel', '/admin', '/login', '/cadastro', '/lista', '/api'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}