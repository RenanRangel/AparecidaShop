import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um telefone/WhatsApp guardado apenas como dígitos
 * (DDI + DDD + número, ex: "5512991234001") para exibição:
 * "+55 (12) 99123-4001".
 */
export function formatPhoneDisplay(digits: string): string {
  const clean = digits.replace(/\D/g, '');
  if (clean.length < 10) return digits;

  const ddi = clean.slice(0, 2);
  const ddd = clean.slice(2, 4);
  const number = clean.slice(4);
  const firstPart = number.slice(0, number.length - 4);
  const lastPart = number.slice(-4);

  return `+${ddi} (${ddd}) ${firstPart}-${lastPart}`;
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
