import { PrismaStoreRepository } from './prisma/store.repository'; // ou o caminho que você usou
import { PrismaProductRepository } from './prisma/product.repository';

export const storeRepository = new PrismaStoreRepository();
export const productRepository = new PrismaProductRepository();

export type { StoreRepository, ProductRepository } from './types';