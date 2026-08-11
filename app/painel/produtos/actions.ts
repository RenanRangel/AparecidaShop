'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { productRepository } from '@/lib/repositories';
import { uploadProductImage, deleteBlobImage } from '@/lib/blob';

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

  const created = await productRepository.create({ storeId, categoryId, name, description: description || undefined, price });
  revalidatePath('/painel/produtos');
  redirect(`/painel/produtos/${created.id}/editar`);
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

export async function uploadImage(
  productId: string,
  formData: FormData,
): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const storeId = await getOwnedStoreId(session.user.id);
  if (!storeId) redirect('/painel');

  const product = await prisma.product.findFirst({ where: { id: productId, storeId } });
  if (!product) return { error: 'Produto não encontrado.' };

  const file = formData.get('image');
  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Selecione uma imagem.' };
  }
  const result = await uploadProductImage(file, productId);
  if (result.error || typeof result.url !== 'string') {
    return { error: result.error ?? 'Falha ao enviar imagem.' };
  }

  const existingCount = await prisma.productImage.count({ where: { productId } });

  await prisma.productImage.create({
    data: {
      productId,
      url: result.url,
      position: existingCount,
      isCover: existingCount === 0, // a primeira imagem já nasce como capa
    },
  });

  revalidatePath('/painel/produtos');
  revalidatePath(`/painel/produtos/${productId}/editar`);
  return {};
}

export async function deleteImage(imageId: string): Promise<void> {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const storeId = await getOwnedStoreId(session.user.id);
  if (!storeId) redirect('/painel');

  const image = await prisma.productImage.findFirst({
    where: { id: imageId, product: { storeId } },
  });
  if (!image) return;

  await prisma.productImage.delete({ where: { id: imageId } });
  await deleteBlobImage(image.url);

  // Se a imagem apagada era a capa, promove a próxima (se houver alguma) a capa.
  if (image.isCover) {
    const next = await prisma.productImage.findFirst({
      where: { productId: image.productId },
      orderBy: { position: 'asc' },
    });
    if (next) {
      await prisma.productImage.update({ where: { id: next.id }, data: { isCover: true } });
    }
  }

  revalidatePath('/painel/produtos');
  revalidatePath(`/painel/produtos/${image.productId}/editar`);
}

export async function setCoverImage(imageId: string): Promise<void> {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const storeId = await getOwnedStoreId(session.user.id);
  if (!storeId) redirect('/painel');

  const image = await prisma.productImage.findFirst({
    where: { id: imageId, product: { storeId } },
  });
  if (!image) return;

  await prisma.$transaction([
    prisma.productImage.updateMany({ where: { productId: image.productId }, data: { isCover: false } }),
    prisma.productImage.update({ where: { id: imageId }, data: { isCover: true } }),
  ]);

  revalidatePath(`/painel/produtos/${image.productId}/editar`);
}