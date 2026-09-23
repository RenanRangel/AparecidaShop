'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

import {
  createStore,
  type CreateStoreState,
} from '@/app/painel/cadastrar-loja/actions';

import { STORE_ZONES, STORE_ZONE_LABELS } from '@/lib/constants/zones';

interface Category {
  id: string;
  name: string;
}

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

export function StoreCreateForm({
  categories,
}: {
  categories: Category[];
}) {
  const [state, formAction] = useFormState(createStore, initialState);
  const errors = state?.errors ?? {};

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreview(null);
      return;
    }

    setImageError(null);

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError('Formato inválido. Use JPG, PNG ou WEBP.');
      event.target.value = '';
      setPreview(null);
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setImageError('Imagem muito grande. O tamanho máximo é 4MB.');
      event.target.value = '';
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  }

  function removeImage() {
    setPreview(null);
    setImageError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <form
      action={formAction}
      className="mt-8 flex flex-col gap-5 rounded-2xl border border-sand bg-white p-6 sm:p-8"
    >
      {/* FOTO DA LOJA */}
      <div>
        <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">
          Foto da loja
        </span>

        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-sand p-5 sm:flex-row">
          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-sand">
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Pré-visualização da foto da loja"
                  fill
                  className="object-cover"
                  sizes="112px"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-sm"
                  aria-label="Remover foto selecionada"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <Upload size={28} className="text-ink-soft" />
            )}
          </div>

          <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
            <label
              htmlFor="store-image"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-sand px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
            >
              <Upload size={15} />
              {preview ? 'Trocar foto' : 'Adicionar foto'}
            </label>

            <input
              ref={fileInputRef}
              id="store-image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            <p className="mt-2 text-[12px] text-ink-soft">
              JPG, PNG ou WEBP. Tamanho máximo: 4MB.
            </p>

            {imageError && (
              <p className="mt-1 text-[12px] font-medium text-red-600">
                {imageError}
              </p>
            )}

            {errors.image && (
              <p className="mt-1 text-[12px] font-medium text-red-600">
                {errors.image}
              </p>
            )}
          </div>
        </div>
      </div>

      <Field label="Nome da loja" required error={errors.name}>
        <input
          name="name"
          required
          className="form-input"
          placeholder="Ex: Loja São Francisco"
        />
      </Field>

      <Field label="Descrição" required error={errors.description}>
        <textarea
          name="description"
          required
          rows={4}
          className="form-input"
        />
      </Field>

      <Field label="Endereço" required error={errors.location}>
        <input
          name="location"
          required
          className="form-input"
          placeholder="Rua, número, bairro"
        />
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
                <input
                  type="checkbox"
                  name="categoryIds"
                  value={c.id}
                  className="accent-pine"
                />
                {c.name}
              </label>
            ))}
          </div>
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefone" required error={errors.phone}>
          <input
            name="phone"
            required
            className="form-input"
            placeholder="(12) 0000-0000"
          />
        </Field>

        <Field label="WhatsApp" required error={errors.whatsapp}>
          <input
            name="whatsapp"
            required
            className="form-input"
            placeholder="(12) 90000-0000"
          />
        </Field>

        <Field label="Região da loja" required error={errors.zone}>
          <select
            name="zone"
            required
            defaultValue=""
            className="form-input"
          >
            <option value="" disabled>
              Selecione
            </option>

            {STORE_ZONES.map((z) => (
              <option key={z} value={z}>
                {STORE_ZONE_LABELS[z]}
              </option>
            ))}
          </select>
        </Field>

        <Field label="E-mail" error={errors.email}>
          <input
            name="email"
            type="email"
            className="form-input"
          />
        </Field>

        <Field label="CNPJ" required error={errors.cnpj}>
          <input
            name="cnpj"
            required
            className="form-input"
            placeholder="00.000.000/0000-00"
          />
        </Field>

        <Field label="Instagram">
          <input
            name="instagram"
            className="form-input"
            placeholder="@sualoja"
          />
        </Field>

        <Field label="Galeria / centro comercial">
          <input
            name="gallery"
            className="form-input"
          />
        </Field>

        <Field label="Horário de funcionamento">
          <input
            name="openingHours"
            className="form-input"
            placeholder="Ex: Seg a Sex, 9h às 18h"
          />
        </Field>
      </div>

      <div>
        <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">
          Links de venda externa (opcional)
        </span>

        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Shopee" error={errors.shopeeUrl}>
            <input
              name="shopeeUrl"
              className="form-input"
              placeholder="https://shopee.com.br/..."
            />
          </Field>

          <Field label="Mercado Livre" error={errors.mercadoLivreUrl}>
            <input
              name="mercadoLivreUrl"
              className="form-input"
              placeholder="https://mercadolivre.com.br/..."
            />
          </Field>

          <Field label="TikTok Shop" error={errors.tiktokShopUrl}>
            <input
              name="tiktokShopUrl"
              className="form-input"
              placeholder="https://tiktok.com/shop/..."
            />
          </Field>
        </div>
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
        {label}{' '}
        {required && (
          <span className="text-marigold-dark">*</span>
        )}
      </span>

      {children}

      {error && (
        <span className="mt-1 block text-[12px] font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}