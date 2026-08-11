'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'aparecidashop:lista';

export interface ListItem {
  productId: string;
  name: string;
  price: number | null; // centavos
  storeId: string;
  storeName: string;
  storeWhatsapp?: string;
  addedAt: number;
}

interface ListContextValue {
  items: ListItem[];
  addItem: (item: Omit<ListItem, 'addedAt'>) => void;
  removeItem: (productId: string) => void;
  isInList: (productId: string) => boolean;
  clearStore: (storeId: string) => void;
}

const ListContext = createContext<ListContextValue | null>(null);

export function ListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ListItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Lê do localStorage só depois de montar (evita mismatch de SSR).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage indisponível (modo privado, etc.) — segue com lista vazia.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // sem espaço/permite — silenciosamente ignora, não é crítico.
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<ListItem, 'addedAt'>) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === item.productId)) return prev;
      return [...prev, { ...item, addedAt: Date.now() }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const isInList = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items],
  );

  const clearStore = useCallback((storeId: string) => {
    setItems((prev) => prev.filter((i) => i.storeId !== storeId));
  }, []);

  return (
    <ListContext.Provider value={{ items, addItem, removeItem, isInList, clearStore }}>
      {children}
    </ListContext.Provider>
  );
}

export function useProductList() {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error('useProductList precisa estar dentro de <ListProvider>');
  return ctx;
}