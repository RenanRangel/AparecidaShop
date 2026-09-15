'use server';

import { productRepository } from '@/lib/repositories';
import type { ProductWithStore } from '@/types';

export async function searchProductsAction(query: string): Promise<ProductWithStore[]> {
  return productRepository.search(query);
}