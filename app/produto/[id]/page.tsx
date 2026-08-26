import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Heart } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { ProductGallery } from '@/components/shared/ProductGallery';
import { productRepository } from '@/lib/repositories';
import { getProductAddToListCount } from '@/lib/analytics/query';
import { formatPriceBRL } from '@/lib/utils';
import { StoreWhatsAppLink } from '@/components/analytics/StoreWhatsAppLink';
import { ShoppingBag } from 'lucide-react';
import { getMarketplaceLabel } from '@/lib/utils';

export const dynamic = 'force-dynamic';

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

  const favoriteCount = await getProductAddToListCount(product.id);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Link
          href="/lojas"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:text-pine"
        >
          <ArrowLeft size={15} />
          Continuar navegando
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />

          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-pine-deep">
              {product.category}
            </span>
            <h1 className="mt-2 font-display text-[28px] font-semibold tracking-tight text-ink sm:text-[34px]">
              {product.name}
            </h1>
            <p className="mt-1.5 text-[14px] font-medium text-ink-soft">{product.storeName}</p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <span className="font-mono text-[24px] font-semibold text-pine-deep">
                {formatPriceBRL(product.price)}
              </span>
              {favoriteCount > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft">
                  <Heart size={14} className="text-marigold-dark" />
                  {favoriteCount} {favoriteCount === 1 ? 'pessoa adicionou' : 'pessoas adicionaram'} à lista
                </span>
              )}
            </div>

            {product.description && (
              <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft">{product.description}</p>
            )}

            {product.storeWhatsapp && (
              <div className="mt-8 rounded-2xl border border-sand bg-white p-5">
                <p className="text-[13px] text-ink-soft">Interessado? Fale direto com a loja:</p>
                <StoreWhatsAppLink storeId={product.storeId} whatsapp={product.storeWhatsapp} />
              </div>
            )}

{product.externalUrl && (
              <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-sand px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
            >
              <ShoppingBag size={16} />
              Comprar na {getMarketplaceLabel(product.externalUrl)}
            </a>
          )}
            <Link
              href={`/lojas/${product.storeSlug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-pine hover:underline"
            >
              <ArrowLeft size={14} />
              Ver mais produtos de {product.storeName}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}