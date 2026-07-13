import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  MessageCircle,
  Instagram,
  ExternalLink,
} from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { ProductCard } from '@/components/shared/ProductCard';
import { storeRepository, productRepository } from '@/lib/repositories';
import { cn, formatPhoneDisplay } from '@/lib/utils';

const TONE_STYLES = {
  pine: 'bg-pine text-bg',
  marigold: 'bg-marigold text-ink',
  sand: 'bg-sand text-ink',
} as const;

export async function generateStaticParams() {
  const stores = await storeRepository.getAll();
  return stores.map((store) => ({ storeId: store.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { storeId: string };
}): Promise<Metadata> {
  const store = await storeRepository.getById(params.storeId);
  if (!store) return { title: 'Loja não encontrada — AparecidaShop' };
  return {
    title: `${store.name} — AparecidaShop`,
    description: store.description,
  };
}

export default async function StorePage({ params }: { params: { storeId: string } }) {
  const store = await storeRepository.getById(params.storeId);
  if (!store) notFound();

  const products = await productRepository.getByStoreId(store.id);
  const mapQuery = encodeURIComponent(`${store.name}, ${store.location}`);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Link
          href="/lojas"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:text-pine"
        >
          <ArrowLeft size={15} />
          Voltar para lojas
        </Link>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div
            className={cn(
              'flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl',
              TONE_STYLES[store.coverTone],
            )}
          >
            <span className="font-display text-[30px] font-bold tracking-tight">
              {store.logoInitials}
            </span>
          </div>

          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-pine-deep">
              {store.category}
            </span>
            <h1 className="mt-1 flex flex-wrap items-center gap-2 font-display text-[30px] font-semibold tracking-tight text-ink sm:text-[36px]">
              {store.name}
              {store.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-pine-50 px-3 py-1 text-[12px] font-semibold text-pine">
                  <BadgeCheck size={14} />
                  Loja verificada
                </span>
              )}
            </h1>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-[16px] font-semibold text-ink">Descrição</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{store.description}</p>

            <h2 className="mt-10 font-display text-[16px] font-semibold text-ink">Produtos</h2>
            {products.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-[14px] text-ink-soft">
                Esta loja ainda não cadastrou produtos.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-sand bg-white p-5">
              <h2 className="font-display text-[15px] font-semibold text-ink">Contato</h2>

              <p className="mt-3 flex items-start gap-2 text-[13.5px] text-ink-soft">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {store.location}
              </p>

              {store.whatsapp && (
                <a
                  href={`https://wa.me/${store.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-[13.5px] font-semibold text-pine hover:underline"
                >
                  <MessageCircle size={15} />
                  {formatPhoneDisplay(store.whatsapp)}
                </a>
              )}

              {store.instagram && (
                <a
                  href={`https://instagram.com/${store.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 text-[13.5px] font-semibold text-pine hover:underline"
                >
                  <Instagram size={15} />@{store.instagram}
                </a>
              )}
            </div>

            <div className="rounded-2xl border border-sand bg-white p-5">
              <h2 className="font-display text-[15px] font-semibold text-ink">Como chegar</h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-sand">
                <iframe
                  title={`Mapa de ${store.name}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  className="h-56 w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-pine hover:underline"
              >
                Abrir no Google Maps
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
