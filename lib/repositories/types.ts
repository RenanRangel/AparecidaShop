import type { Store, ProductWithStore } from '@/types';

/**
 * Contrato de acesso a dados de lojas.
 *
 * Componentes dependem desta interface, nunca da implementação concreta.
 * Isso permite trocar `MockStoreRepository` por algo como
 * `PostgresStoreRepository` (usando Prisma) sem tocar em nenhum componente.
 */
export interface StoreRepository {
  getAll(): Promise<Store[]>;
  getById(id: string): Promise<Store | null>;
  getFeatured(limit?: number): Promise<Store[]>;
}

/**
 * Contrato de acesso a dados de produtos.
 *
 * Os métodos retornam `ProductWithStore` (produto + nome da loja resolvido),
 * equivalente ao resultado de um JOIN entre `products` e `stores`.
 */
export interface ProductRepository {
  getAll(): Promise<ProductWithStore[]>;
  getById(id: string): Promise<ProductWithStore | null>;
  getByStoreId(storeId: string): Promise<ProductWithStore[]>;
  getPopular(limit?: number): Promise<ProductWithStore[]>;
  search(query: string): Promise<ProductWithStore[]>;
}
