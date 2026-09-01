import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { ProductGallery } from '@/components/shared/ProductGallery';
import { productRepository } from '@/lib/repositories';
import { getProductAddToListCount } from '@/lib/analytics/query';
import { formatPriceBRL, getMarketplaceLabel } from '@/lib/utils';
import { StoreWhatsAppLink } from '@/components/analytics/StoreWhatsAppLink';

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

  const storeMarketplaces = [
    product.storeShopeeUrl && { label: 'Shopee', url: product.storeShopeeUrl },
    product.storeMercadoLivreUrl && { label: 'Mercado Livre', url: product.storeMercadoLivreUrl },
    product.storeTiktokShopUrl && { label: 'TikTok Shop', url: product.storeTiktokShopUrl },
  ].filter(Boolean) as { label: string; url: string }[];

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

            {/* Contato direto com a loja */}
            {product.storeWhatsapp && (
              <div className="mt-8 rounded-2xl border border-sand bg-white p-5">
                <p className="text-[13px] text-ink-soft">Interessado? Fale direto com a loja:</p>
                <StoreWhatsAppLink storeId={product.storeId} whatsapp={product.storeWhatsapp} />
              </div>
            )}

            {/* Link de venda deste produto específico, se o lojista cadastrou */}
            {product.externalUrl && (
              <div className="mt-4 rounded-2xl border border-sand bg-white p-5">
                <p className="text-[13px] text-ink-soft">Prefere comprar direto pelo marketplace?</p>
                
                 <a href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-[13.5px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingBag size={15} />
                  Comprar na {getMarketplaceLabel(product.externalUrl)}
                </a>
              </div>
            )}

            {/* Links gerais da loja (perfil de venda), quando existirem */}
            {storeMarketplaces.length > 0 && (
              <div className="mt-4 rounded-2xl border border-sand bg-white p-5">
                <p className="text-[13px] text-ink-soft">A loja também vende em:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {storeMarketplaces.map((marketplace) => (
                    
                      <a key={marketplace.label}
                      href={marketplace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-sand px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-colors hover:border-pine hover:text-pine"
                    >
                      {marketplace.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Navegação de volta — isolada, não compete com os botões de compra */}
            <div className="mt-8 border-t border-sand pt-6">
              <Link
                href={`/lojas/${product.storeSlug}`}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-pine hover:underline"
              >
                <ArrowLeft size={14} />
                Ver mais produtos de {product.storeName}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}