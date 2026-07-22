'use client';

import { useFormState, useFormStatus } from 'react-dom';
import type { Category } from '@prisma/client';
import { createStore, type CreateStoreState } from '@/app/painel/cadastrar-loja/actions';

const initialState: CreateStoreState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-pine py-3.5 text-[14.5px] font-semibold text-bg disabled:opacity-70 sm:w-auto sm:px-8"
    >
      {pending ? 'Enviando...' : 'Cadastrar loja'}
    </button>
  );
}

export function StoreCreateForm({ categories }: { categories: Category[] }) {
  const [state, formAction] = useFormState(createStore, initialState);
  const errors = state?.errors ?? {};

  return (
    <form
      action={formAction}
      className="mt-8 flex flex-col gap-5 rounded-2xl border border-sand bg-white p-6 sm:p-8"
    >
      <Field label="Nome da loja" required error={errors.name}>
        <input name="name" required className="form-input" placeholder="Ex: Loja São Francisco" />
      </Field>
      <Field label="Descrição" required error={errors.description}>
        <textarea name="description" required rows={4} className="form-input" />
      </Field>
      <Field label="Endereço" required error={errors.location}>
        <input name="location" required className="form-input" placeholder="Rua, número, bairro" />
      </Field>
      <Field label="Categorias" required error={errors.categoryIds}>
        {categories.length === 0 ? (
          <p className="text-[13px] text-ink-soft">
            Nenhuma categoria cadastrada ainda — rode o seed do Prisma.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <label
                key={c.id}
                className="flex items-center gap-1.5 rounded-full border border-sand px-3 py-1.5 text-[13px] has-[:checked]:border-pine has-[:checked]:text-pine"
              >
                <input type="checkbox" name="categoryIds" value={c.id} className="accent-pine" />
                {c.name}
              </label>
            ))}
          </div>
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefone" required error={errors.phone}>
          <input name="phone" required className="form-input" placeholder="(12) 0000-0000" />
        </Field>
        <Field label="WhatsApp" required error={errors.whatsapp}>
          <input name="whatsapp" required className="form-input" placeholder="(12) 90000-0000" />
        </Field>
        <Field label="E-mail" error={errors.email}>
          <input name="email" type="email" className="form-input" />
        </Field>
        <Field label="CNPJ" error={errors.cnpj}>
          <input name="cnpj" className="form-input" placeholder="00.000.000/0000-00" />
        </Field>
        <Field label="Instagram">
          <input name="instagram" className="form-input" placeholder="@sualoja" />
        </Field>
        <Field label="Galeria / centro comercial">
          <input name="gallery" className="form-input" />
        </Field>
      </div>

      <SubmitButton />
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