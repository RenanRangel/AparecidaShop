import type { StoreCategory } from '@/lib/constants/categories';

/**
 * Formato dos dados do formulário de cadastro de loja.
 *
 * Reutilizável entre o componente de formulário e, futuramente, o schema de
 * validação de servidor (ex: Prisma/zod) quando a API existir.
 */
export interface StoreRegistrationFormData {
  storeName: string;
  ownerName: string;
  cnpj: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  category: StoreCategory | '';
  address: string;
  gallery: string;
  description: string;
}

export type StoreRegistrationFormErrors = Partial<Record<keyof StoreRegistrationFormData, string>>;
