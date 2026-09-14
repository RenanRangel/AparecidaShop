import type { Store, ProductWithStore } from '@/types';

const BASE_URL = 'https://aparecida-shop.vercel.app';

/** Schema.org LocalBusiness — ajuda o Google a entender que é uma loja física real. */
export function buildStoreJsonLd(store: Store) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: store.name,
    description: store.description,
    url: `${BASE_URL}/lojas/${store.slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.location,
      addressLocality: 'Aparecida',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    ...(store.latitude && store.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: store.latitude, longitude: store.longitude } }
      : {}),
    ...(store.whatsapp ? { telephone: `+${store.whatsapp}` } : {}),
  };
}

/** Schema.org Product — habilita rich snippets de produto na busca do Google. */
export function buildProductJsonLd(product: ProductWithStore) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.name,
    category: product.category,
    ...(product.images.length > 0 ? { image: product.images.map((img) => img.url) } : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      ...(product.price !== null ? { price: (product.price / 100).toFixed(2) } : {}),
      availability:
        product.status === 'ACTIVE'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: { '@type': 'LocalBusiness', name: product.storeName },
    },
  };
}

export function buildBreadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}