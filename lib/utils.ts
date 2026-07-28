import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizePhoneDigits(digits: string): string {
  const clean = digits.replace(/\D/g, '');
  return clean.length === 10 || clean.length === 11 ? `55${clean}` : clean;
}

export function formatPhoneDisplay(digits: string): string {
  const clean = normalizePhoneDigits(digits);
  if (clean.length < 12) return digits;

  const ddi = clean.slice(0, 2);
  const ddd = clean.slice(2, 4);
  const number = clean.slice(4);
  const firstPart = number.slice(0, number.length - 4);
  const lastPart = number.slice(-4);

  return `+${ddi} (${ddd}) ${firstPart}-${lastPart}`;
}

export function formatPriceBRL(cents: number | null): string {
  if (cents === null) return 'Sob consulta';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
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
