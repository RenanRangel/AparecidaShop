'use client';

import Link from 'next/link';
import { Trash2, MessageCircle } from 'lucide-react';
import { useProductList, type ListItem } from '@/components/list/ListProvider';
import { Container } from '@/components/shared/Container';
import { formatPriceBRL, normalizePhoneDigits } from '@/lib/utils';
import { track } from '@/lib/analytics/track-client';

type StoreGroup = {
  storeId: string;
  storeName: string;
  storeWhatsapp?: string;
  items: ListItem[];
};

function groupByStore(items: ListItem[]): StoreGroup[] {
  const map = new Map<string, StoreGroup>();

  for (const item of items) {
    if (!map.has(item.storeId)) {
      map.set(item.storeId, {
        storeId: item.storeId,
        storeName: item.storeName,
        storeWhatsapp: item.storeWhatsapp,
        items: [],
      });
    }
    map.get(item.storeId)!.items.push(item);
  }

  return Array.from(map.values());
}

function buildWhatsAppMessage(storeName: string, items: ListItem[]): string {
  const lines = items.map(
    (item: ListItem) =>
      `• ${item.name}${item.price !== null ? ` — ${formatPriceBRL(item.price)}` : ''}`,
  );
  return [
    `Olá! Vi esses produtos da ${storeName} no AparecidaShop e gostaria de saber mais:`,
    '',
    ...lines,
  ].join('\n');
}
export default function ListaPage() {
  const { items, removeItem, clearStore } = useProductList();
  const groups = groupByStore(items);

  function handleSend(storeName: string, whatsapp: string | undefined, storeItems: ListItem[]) {
    if (!whatsapp) return;
    track({ type: 'LIST_WHATSAPP_SENT', storeId: storeItems[0].storeId });
    const message = buildWhatsAppMessage(storeName, storeItems);
    const url = `https://wa.me/${normalizePhoneDigits(whatsapp)}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  if (items.length === 0) {
    return (
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl text-center">
          <h1 className="font-display text-[28px] font-semibold text-ink">Minha lista</h1>
          <p className="mt-3 text-[14.5px] text-ink-soft">
            Sua lista está vazia. Navegue pelas lojas e adicione produtos que tiver interesse.
          </p>
          <Link
            href="/lojas"
            className="mt-6 inline-flex rounded-full bg-pine px-6 py-3 text-[14px] font-semibold text-bg"
          >
            Ver lojas
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="font-display text-[28px] font-semibold text-ink">Minha lista</h1>
        <p className="mt-2 text-[14.5px] text-ink-soft">
          Produtos separados por loja — cada loja recebe sua própria mensagem no WhatsApp.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.storeId} className="rounded-2xl border border-sand bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-[17px] font-semibold text-ink">{group.storeName}</h2>
                <button
                  type="button"
                  onClick={() => clearStore(group.storeId)}
                  className="text-[12.5px] font-medium text-ink-soft hover:text-red-600"
                >
                  Limpar
                </button>
              </div>

              <ul className="mt-4 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.productId} className="flex items-center justify-between gap-3 text-[14px]">
                    <span className="text-ink">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-ink-soft">{formatPriceBRL(item.price)}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remover ${item.name}`}
                        className="text-ink-soft hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleSend(group.storeName, group.storeWhatsapp, group.items)}
                disabled={!group.storeWhatsapp}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-[13.5px] font-semibold text-bg disabled:opacity-50"
              >
                <MessageCircle size={15} />
                Enviar para {group.storeName} no WhatsApp
              </button>
              {!group.storeWhatsapp && (
                <p className="mt-2 text-[12px] text-ink-soft">Esta loja não tem WhatsApp cadastrado.</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}