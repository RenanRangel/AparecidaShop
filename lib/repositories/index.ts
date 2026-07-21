import { PrismaStoreRepository } from './prisma/store.repository';
import { PrismaProductRepository } from './prisma/product.repository';
import type { StoreRepository, ProductRepository } from './types';


export const storeRepository: StoreRepository =
  new PrismaStoreRepository();


export const productRepository: ProductRepository =
  new PrismaProductRepository();


export type {
  StoreRepository,
  ProductRepository
} from './types';