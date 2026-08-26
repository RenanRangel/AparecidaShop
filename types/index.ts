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

  shopeeUrl?: string;     
  mercadoLivreUrl?: string; 
  tiktokShopUrl?: string;   
}

export interface Product {
  id: string;

  name: string;
  description?: string;
  externalUrl?: string;

  storeId: string;
  categoryId: string;

  price: number | null;

  imageTone: "pine" | "marigold" | "sand";

  category: string;
  status: "ACTIVE" | "INACTIVE";

  images: { id: string; url: string; isCover: boolean }[];
}

export interface ProductWithStore extends Product {
  storeName: string;
  storeWhatsapp?: string;
  storeSlug: string;
}