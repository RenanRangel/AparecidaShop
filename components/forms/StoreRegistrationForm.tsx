'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { STORE_CATEGORIES } from '@/lib/constants/categories';
import { isValidCNPJ, isValidEmail, isValidPhone } from '@/lib/validation';
import type { StoreRegistrationFormData, StoreRegistrationFormErrors } from '@/types/forms';

const initialForm: StoreRegistrationFormData = {
  storeName: '',
  ownerName: '',
  cnpj: '',
  phone: '',
  whatsapp: '',
  email: '',
  instagram: '',
  category: '',
  address: '',
  gallery: '',
  description: '',
};

/**
 * Validação de cliente (UX). A validação definitiva deve ser repetida no
 * servidor quando a API existir — ver `lib/validation.ts`.
 */
function validate(form: StoreRegistrationFormData): StoreRegistrationFormErrors {
  const errors: StoreRegistrationFormErrors = {};

  if (!form.storeName.trim()) errors.storeName = 'Informe o nome da loja.';
  if (!form.ownerName.trim()) errors.ownerName = 'Informe o nome do responsável.';
  if (!form.category) errors.category = 'Selecione uma categoria.';
  if (!form.address.trim()) errors.address = 'Informe o endereço da loja.';
  if (!form.description.trim()) errors.description = 'Descreva brevemente a loja.';

  if (!form.email.trim()) {
    errors.email = 'Informe um e-mail.';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Informe um telefone.';
  } else if (!isValidPhone(form.phone)) {
    errors.phone = 'Telefone inválido. Inclua o DDD.';
  }

  if (!form.whatsapp.trim()) {
    errors.whatsapp = 'Informe um WhatsApp.';
  } else if (!isValidPhone(form.whatsapp)) {
    errors.whatsapp = 'WhatsApp inválido. Inclua o DDD.';
  }

  // CNPJ é opcional no formulário, mas se preenchido precisa ser válido.
  if (form.cnpj.trim() && !isValidCNPJ(form.cnpj)) {
    errors.cnpj = 'CNPJ inválido.';
  }

  return errors;
}

export function StoreRegistrationForm() {
  const [form, setForm] = useState<StoreRegistrationFormData>(initialForm);
  const [errors, setErrors] = useState<StoreRegistrationFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof StoreRegistrationFormData>(field: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // Nesta versão não há backend: o envio é simulado.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-sand bg-white px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pine-50 text-pine">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="font-display text-[20px] font-semibold text-ink">Solicitação enviada!</h3>
        <p className="max-w-md text-[14.5px] text-ink-soft">
          Recebemos os dados de <strong>{form.storeName || 'sua loja'}</strong>. Nossa equipe vai
          entrar em contato em breve para concluir o cadastro.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initialForm);
            setErrors({});
            setSubmitted(false);
          }}
          className="mt-2 text-[13.5px] font-semibold text-pine hover:underline"
        >
          Cadastrar outra loja
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome da loja" required error={errors.storeName}>
          <input className="form-input" value={form.storeName} onChange={update('storeName')} placeholder="Ex: Loja São Francisco" />
        </Field>
        <Field label="Nome do responsável" required error={errors.ownerName}>
          <input className="form-input" value={form.ownerName} onChange={update('ownerName')} placeholder="Seu nome completo" />
        </Field>
        <Field label="CNPJ" error={errors.cnpj}>
          <input className="form-input" value={form.cnpj} onChange={update('cnpj')} placeholder="00.000.000/0000-00" />
        </Field>
        <Field label="Categoria da loja" required error={errors.category}>
          <select className="form-input" value={form.category} onChange={update('category')}>
            <option value="" disabled>Selecione uma categoria</option>
            {STORE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Telefone" required error={errors.phone}>
          <input className="form-input" value={form.phone} onChange={update('phone')} placeholder="(12) 0000-0000" />
        </Field>
        <Field label="WhatsApp" required error={errors.whatsapp}>
          <input className="form-input" value={form.whatsapp} onChange={update('whatsapp')} placeholder="(12) 90000-0000" />
        </Field>
        <Field label="E-mail" required error={errors.email}>
          <input className="form-input" type="email" value={form.email} onChange={update('email')} placeholder="contato@sualoja.com.br" />
        </Field>
        <Field label="Instagram">
          <input className="form-input" value={form.instagram} onChange={update('instagram')} placeholder="@sualoja" />
        </Field>
        <Field label="Endereço" required className="sm:col-span-2" error={errors.address}>
          <input className="form-input" value={form.address} onChange={update('address')} placeholder="Rua, número, bairro" />
        </Field>
        <Field label="Galeria ou centro comercial (se houver)" className="sm:col-span-2">
          <input className="form-input" value={form.gallery} onChange={update('gallery')} placeholder="Ex: Galeria Recreio" />
        </Field>
        <Field label="Descrição da loja" required className="sm:col-span-2" error={errors.description}>
          <textarea
            className="form-input"
            rows={4}
            value={form.description}
            onChange={update('description')}
            placeholder="Conte um pouco sobre o que sua loja vende e o que a torna especial."
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-pine py-3.5 text-[14.5px] font-semibold text-bg transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-8"
      >
        Solicitar cadastro
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  className,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-soft">
        {label} {required && <span className="text-marigold-dark">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[12px] font-medium text-red-600">{error}</span>}
    </label>
  );
}
