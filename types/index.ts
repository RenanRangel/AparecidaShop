export type { StoreCategory } from "@/lib/constants/categories";

export interface Store {
  id: string;
  slug: string;

  name: string;
  category: string;

  location: string;
  description: string;

  logoInitials: string;
  coverTone: "pine" | "marigold" | "sand";

  verified?: boolean;

  whatsapp?: string;
  instagram?: string;

  featured?: boolean;
}

export interface Product {
  id: string;

  name: string;
  description?: string;

  storeId: string;

  price: number | null;

  imageTone: "pine" | "marigold" | "sand";

  category: string;
}

export interface ProductWithStore extends Product {
  storeName: string;
}