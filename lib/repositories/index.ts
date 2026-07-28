import { PrismaStoreRepository } from './prisma/store.repository';
import { PrismaProductRepository } from './prisma/product.repository';
import type { StoreRepository, ProductRepository } from './types';


export const storeRepository =
  new PrismaStoreRepository() as StoreRepository;


export const productRepository = 
  new PrismaProductRepository() as ProductRepository;


export type {
  StoreRepository,
  ProductRepository
} from './types';