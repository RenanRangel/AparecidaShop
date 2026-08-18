import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Package } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { AddToListButton } from '@/components/list/AddToListButton';
import { productRepository } from '@/lib/repositories';
import { formatPriceBRL, normalizePhoneDigits } from '@/lib/utils';
import { StoreWhatsAppLink } from '@/components/analytics/StoreWhatsAppLink';

export const dynamic = 'force-dynamic';

const TONE_BG = {
  pine: 'bg-pine-100',
  marigold: 'bg-marigold-light',
  sand: 'bg-sand-light',
} as const;

const TONE_ICON = {
  pine: 'text-pine-deep',
  marigold: 'text-marigold-dark',
  sand: 'text-ink-soft',
} as const;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await productRepository.getById(params.id);
  if (!product) return { title: 'Produto não encontrado — AparecidaShop' };

  return {
    title: `${product.name} — ${product.storeName} | AparecidaShop`,
    description: product.description || `${product.name}, disponível na ${product.storeName}.`,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await productRepository.getById(params.id);
  if (!product) notFound();

  const coverImage = product.images.find((img) => img.isCover) ?? product.images[0];

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Link
          href={`/lojas`}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:text-pine"
        >
          <ArrowLeft size={15} />
          Continuar navegando
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div
            className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-sand ${TONE_BG[product.imageTone]}`}
          >
            {coverImage ? (
              <Image
                src={coverImage.url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <Package size={56} className={TONE_ICON[product.imageTone]} strokeWidth={1.4} />
            )}
            <div className="absolute right-3 top-3">
              <AddToListButton product={product} />
            </div>
          </div>

          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-pine-deep">
              {product.category}
            </span>
            <h1 className="mt-2 font-display text-[28px] font-semibold tracking-tight text-ink sm:text-[34px]">
              {product.name}
            </h1>
            <p className="mt-1.5 inline-block text-[14px] font-medium text-ink-soft transition-colors hover:text-pine">
              {product.storeName}
            </p>

            <p className="mt-5 font-mono text-[24px] font-semibold text-pine-deep">
              {formatPriceBRL(product.price)}
            </p>

            {product.description && (
              <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft">{product.description}</p>
            )}

            {product.storeWhatsapp && (
              <div className="mt-8 rounded-2xl border border-sand bg-white p-5">
                <p className="text-[13px] text-ink-soft">Interessado? Fale direto com a loja:</p>
                <StoreWhatsAppLink storeId={product.storeId} whatsapp={product.storeWhatsapp} />
              </div>
            )}

            <Link
              href="/lojas"
              className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-pine hover:underline"
            >
              <ArrowLeft size={14} />
              Ver mais produtos
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}