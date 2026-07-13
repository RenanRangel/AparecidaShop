import { MockStoreRepository } from './mock/store.repository';
import { MockProductRepository } from './mock/product.repository';
import type { StoreRepository, ProductRepository } from './types';

/**
 * Ponto único de composição dos repositórios.
 *
 * Componentes e páginas importam `storeRepository` / `productRepository`
 * DAQUI — nunca diretamente das implementações mock ou dos fixtures.
 *
 * Quando o Postgres/Prisma entrar, basta trocar as classes instanciadas
 * abaixo (ex: `new PostgresStoreRepository()`), sem alterar nenhum
 * componente que já dependa apenas das interfaces em `./types`.
 */
export const storeRepository: StoreRepository = new MockStoreRepository();
export const productRepository: ProductRepository = new MockProductRepository(storeRepository);

export type { StoreRepository, ProductRepository } from './types';
