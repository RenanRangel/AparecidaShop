import { put, del } from '@vercel/blob';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

type UploadResult = { url: string; error?: never } | { url?: never; error: string };

export async function uploadProductImage(file: File, productId: string): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: 'Formato inválido. Use JPG, PNG ou WEBP.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { error: 'Imagem muito grande (máximo 4MB).' };
  }

  const extension = file.type.split('/')[1];
  const blob = await put(`produtos/${productId}/${Date.now()}.${extension}`, file, {
    access: 'public',
  });

  return { url: blob.url };
}

export async function deleteBlobImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    // Se a imagem já não existir no Blob por algum motivo, não trava o fluxo.
    console.error('Falha ao remover imagem do Blob:', error);
  }
}