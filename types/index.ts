import type { StoreCategory } from '@/lib/constants/categories';

export type { StoreCategory } from '@/lib/constants/categories';

export interface Store {
  id: string;
  name: string;
  category: StoreCategory;
  location: string; // ex: "Galeria Recreio, Centro"
  description: string;
  logoInitials: string;
  coverTone: 'pine' | 'marigold' | 'sand';
  featured?: boolean;
  /** Selo de "loja verificada" exibido na página da loja. */
  verified?: boolean;
  /** Apenas dígitos, com DDI e DDD, ex: "5512999999999". */
  whatsapp?: string;
  /** Handle do Instagram, sem o "@". */
  instagram?: string;
}

export interface Product {
  id: string;
  name: string;
  storeId: string;
  price: number | null; // null = "sob consulta"
  imageTone: 'pine' | 'marigold' | 'sand';
  category: StoreCategory;
}

/**
 * Visão de leitura de um produto já com o nome da loja resolvido.
 *
 * `Product` guarda apenas a relação (`storeId`), como faria uma tabela
 * relacional. `ProductWithStore` representa o resultado de um "join" entre
 * produto e loja — hoje feito em memória pelo repositório, futuramente uma
 * query SQL. Componentes de exibição usam este tipo, não `Product`.
 */
export interface ProductWithStore extends Product {
  storeName: string;
}
