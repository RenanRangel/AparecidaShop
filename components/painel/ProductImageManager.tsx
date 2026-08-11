'use client';

import { useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import { Star, Trash2, Upload } from 'lucide-react';
import { uploadImage, deleteImage, setCoverImage } from '@/app/painel/produtos/actions';

interface ProductImage {
  id: string;
  url: string;
  isCover: boolean;
}

export function ProductImageManager({ productId, images }: { productId: string; images: ProductImage[] }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setError(null);

    startTransition(async () => {
      const result = await uploadImage(productId, formData);
      if (result.error) setError(result.error);
      if (fileInputRef.current) fileInputRef.current.value = '';
    });
  }

  return (
    <div>
      <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">Fotos</span>

      {images.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="group relative aspect-square overflow-hidden rounded-xl border border-sand">
              <Image src={image.url} alt="" fill className="object-cover" sizes="120px" />
              {image.isCover && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-pine px-2 py-0.5 text-[10px] font-bold text-bg">
                  Capa
                </span>
              )}
              <div className="absolute inset-0 flex items-end justify-end gap-1 bg-ink/0 p-1.5 opacity-0 transition-opacity group-hover:bg-ink/20 group-hover:opacity-100">
                {!image.isCover && (
                  <button
                    type="button"
                    onClick={() => startTransition(() => setCoverImage(image.id))}
                    disabled={isPending}
                    aria-label="Tornar capa"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink-soft hover:text-marigold-dark"
                  >
                    <Star size={13} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Remover esta foto?')) startTransition(() => deleteImage(image.id));
                  }}
                  disabled={isPending}
                  aria-label="Remover foto"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink-soft hover:text-red-600"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-sand py-4 text-[13px] font-semibold text-ink-soft transition-colors hover:border-pine hover:text-pine">
        <Upload size={15} />
        {isPending ? 'Enviando...' : 'Adicionar foto (JPG, PNG ou WEBP, até 4MB)'}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={isPending}
          className="hidden"
        />
      </label>

      {error && <p className="mt-2 text-[12px] font-medium text-red-600">{error}</p>}
    </div>
  );
}