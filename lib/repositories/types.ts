import type { Store, ProductWithStore } from '@/types';

export interface StoreRepository {
  getAll(): Promise<Store[]>;
  getStoreForUser(userId: string): Promise<Store | null>;
  getById(id: string): Promise<Store | null>;
  getBySlug(slug: string): Promise<Store | null>;
  getFeatured(limit?: number): Promise<Store[]>;
}

export interface CreateProductInput {
  storeId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number | null; 
  externalUrl?: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  categoryId?: string;
  price?: number | null;
  status?: 'ACTIVE' | 'INACTIVE';
  externalUrl?: string;
}

export interface ProductRepository {
  getAll(): Promise<ProductWithStore[]>;
  getById(id: string): Promise<ProductWithStore | null>;
  getByStoreId(storeId: string): Promise<ProductWithStore[]>;
  getPopular(limit?: number): Promise<ProductWithStore[]>;
  search(query: string): Promise<ProductWithStore[]>;

  // Escrita — sempre escopada por storeId (ownership), nunca só por id.
  create(input: CreateProductInput): Promise<ProductWithStore>;
  update(id: string, storeId: string, input: UpdateProductInput): Promise<ProductWithStore | null>;
  delete(id: string, storeId: string): Promise<boolean>;
}