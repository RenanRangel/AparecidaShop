'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteProduct } from '@/app/painel/produtos/actions';

export function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Remover "${productName}"? Essa ação não pode ser desfeita.`)) return;
    startTransition(() => {
      deleteProduct(productId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-sand text-ink-soft transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50"
      aria-label={`Remover ${productName}`}
    >
      <Trash2 size={15} />
    </button>
  );
}