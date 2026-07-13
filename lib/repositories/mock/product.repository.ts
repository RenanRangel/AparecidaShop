import { productsFixture } from '@/data/fixtures/products.fixtures';
import type { Product, ProductWithStore } from '@/types';
import type { ProductRepository, StoreRepository } from '../types';

/**
 * Implementação do `ProductRepository` sobre os dados mockados em memória.
 *
 * Recebe um `StoreRepository` por injeção para resolver `storeName` a partir
 * de `storeId` — o mesmo papel que um JOIN faria numa query SQL real.
 */
export class MockProductRepository implements ProductRepository {
  constructor(private readonly storeRepository: StoreRepository) {}

  private async withStoreName(product: Product): Promise<ProductWithStore> {
    const store = await this.storeRepository.getById(product.storeId);
    return { ...product, storeName: store?.name ?? 'Loja não encontrada' };
  }

  async getAll(): Promise<ProductWithStore[]> {
    return Promise.all(productsFixture.map((product) => this.withStoreName(product)));
  }

  async getById(id: string): Promise<ProductWithStore | null> {
    const product = productsFixture.find((p) => p.id === id);
    if (!product) return null;
    return this.withStoreName(product);
  }

  async getByStoreId(storeId: string): Promise<ProductWithStore[]> {
    const fromStore = productsFixture.filter((p) => p.storeId === storeId);
    return Promise.all(fromStore.map((product) => this.withStoreName(product)));
  }

  async getPopular(limit = 4): Promise<ProductWithStore[]> {
    return Promise.all(productsFixture.slice(0, limit).map((product) => this.withStoreName(product)));
  }

  async search(query: string): Promise<ProductWithStore[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const enriched = await this.getAll();
    return enriched.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.storeName.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q),
    );
  }
}
