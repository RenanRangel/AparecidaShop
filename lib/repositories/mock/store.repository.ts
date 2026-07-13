import { storesFixture } from '@/data/fixtures/stores.fixtures';
import type { Store } from '@/types';
import type { StoreRepository } from '../types';

/**
 * Implementação do `StoreRepository` sobre os dados mockados em memória.
 *
 * As assinaturas já são assíncronas (`Promise`) mesmo sem I/O real, para que
 * trocar esta classe por uma implementação que consulta o Postgres não exija
 * nenhuma mudança nos componentes que a utilizam.
 */
export class MockStoreRepository implements StoreRepository {
  async getAll(): Promise<Store[]> {
    return [...storesFixture];
  }

  async getById(id: string): Promise<Store | null> {
    return storesFixture.find((store) => store.id === id) ?? null;
  }

  async getFeatured(limit = 3): Promise<Store[]> {
    const featured = storesFixture.filter((store) => store.featured);
    const rest = storesFixture.filter((store) => !store.featured);
    return [...featured, ...rest].slice(0, limit);
  }
}
