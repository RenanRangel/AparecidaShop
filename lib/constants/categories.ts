/**
 * Fonte única das categorias de loja.
 *
 * Qualquer lugar do projeto que precise da lista de categorias (filtros,
 * formulários, tipos) deve importar a partir daqui. Isso evita que a lista
 * seja declarada em múltiplos lugares e possa divergir.
 */
export const STORE_CATEGORIES = [
  'Artigos religiosos',
  'Lembranças e souvenirs',
  'Vestuário',
  'Alimentação',
  'Acessórios',
  'Decoração',
] as const;

export type StoreCategory = (typeof STORE_CATEGORIES)[number];
