'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { productRepository } from '@/lib/repositories';

export interface ProductFormState {
  errors?: Record<string, string>;
}

async function getOwnedStoreId(userId: string): Promise<string | null> {
  const membership = await prisma.storeMember.findFirst({ where: { userId } });
  return membership?.storeId ?? null;
}

/** "25,00" ou "25.00" -> 2500 (centavos). Campo vazio = "sob consulta" (null). */
function parsePriceToCents(raw: string): { value: number | null; error?: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { value: null };

  const normalized = trimmed.replace(/\./g, '').replace(',', '.');
  const asNumber = Number(normalized);

  if (Number.isNaN(asNumber) || asNumber < 0) {
    return { value: null, error: 'Preço inválido.' };
  }

  return { value: Math.round(asNumber * 100) };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const storeId = await getOwnedStoreId(session.user.id);
  if (!storeId) redirect('/painel');

  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const categoryId = String(formData.get('categoryId') ?? '').trim();
  const priceRaw = String(formData.get('price') ?? '');

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Informe o nome do produto.';
  if (!categoryId) errors.categoryId = 'Selecione uma categoria.';

  const { value: price, error: priceError } = parsePriceToCents(priceRaw);
  if (priceError) errors.price = priceError;

  if (Object.keys(errors).length > 0) return { errors };

  await productRepository.create({
    storeId,
    categoryId,
    name,
    description: description || undefined,
    price,
  });

  revalidatePath('/painel/produtos');
  redirect('/painel/produtos');
}

export async function updateProduct(
  productId: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const storeId = await getOwnedStoreId(session.user.id);
  if (!storeId) redirect('/painel');

  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const categoryId = String(formData.get('categoryId') ?? '').trim();
  const priceRaw = String(formData.get('price') ?? '');
  const status = String(formData.get('status') ?? 'ACTIVE') as 'ACTIVE' | 'INACTIVE';

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Informe o nome do produto.';
  if (!categoryId) errors.categoryId = 'Selecione uma categoria.';

  const { value: price, error: priceError } = parsePriceToCents(priceRaw);
  if (priceError) errors.price = priceError;

  if (Object.keys(errors).length > 0) return { errors };

  const updated = await productRepository.update(productId, storeId, {
    name,
    description: description || undefined,
    categoryId,
    price,
    status,
  });

  if (!updated) {
    return { errors: { _form: 'Produto não encontrado ou não pertence à sua loja.' } };
  }

  revalidatePath('/painel/produtos');
  redirect('/painel/produtos');
}

export async function deleteProduct(productId: string): Promise<void> {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const storeId = await getOwnedStoreId(session.user.id);
  if (!storeId) redirect('/painel');

  await productRepository.delete(productId, storeId);
  revalidatePath('/painel/produtos');
}