'use client';

import { useFormState, useFormStatus } from 'react-dom';
import type { Category } from '@prisma/client';
import type { ProductWithStore } from '@/types';
import { createProduct, updateProduct, type ProductFormState } from '@/app/painel/produtos/actions';
import { ProductImageManager } from '@/components/painel/ProductImageManager'; 

const initialState: ProductFormState = {};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-pine py-3.5 text-[14.5px] font-semibold text-bg disabled:opacity-70 sm:w-auto sm:px-8"
    >
      {pending ? 'Salvando...' : label}
    </button>
  );
}

/** 2500 (centavos) -> "25,00" (texto do input). */
function centsToInputValue(cents: number | null): string {
  if (cents === null) return '';
  return (cents / 100).toFixed(2).replace('.', ',');
}

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductWithStore;
}) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct;
  const [state, formAction] = useFormState(action, initialState);
  const errors = state?.errors ?? {};

  return (
    <form
      action={formAction}
      className="mt-8 flex flex-col gap-5 rounded-2xl border border-sand bg-white p-6 sm:p-8"
    >
      <Field label="Nome do produto" required error={errors.name}>
        <input
          name="name"
          required
          defaultValue={product?.name}
          className="form-input"
          placeholder="Ex: Terço em madeira"
        />
      </Field>

      <Field label="Descrição">
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description}
          className="form-input"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Categoria" required error={errors.categoryId}>
          <select name="categoryId" required defaultValue={product?.categoryId ?? ''} className="form-input">
            <option value="" disabled>Selecione</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Field>

        <Field label="Preço (R$)" error={errors.price}>
          <input
            name="price"
            defaultValue={centsToInputValue(product?.price ?? null)}
            className="form-input"
            placeholder="Vazio = sob consulta"
          />
        </Field>
      </div>

      {product && (
        <ProductImageManager productId={product.id} images={product.images} />
      )}

      {product && (
        <Field label="Status">
          <select name="status" defaultValue={product.status} className="form-input">
            <option value="ACTIVE">Ativo (visível na loja)</option>
            <option value="INACTIVE">Inativo (oculto)</option>
          </select>
        </Field>
      )}

      {errors._form && <p className="text-[13px] text-red-600">{errors._form}</p>}

      <SubmitButton label={product ? 'Salvar alterações' : 'Cadastrar produto'} />
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">
        {label} {required && <span className="text-marigold-dark">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[12px] font-medium text-red-600">{error}</span>}
    </label>
  );
}