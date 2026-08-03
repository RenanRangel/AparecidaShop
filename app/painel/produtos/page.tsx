import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { productRepository } from '@/lib/repositories';
import { Container } from '@/components/shared/Container';
import { formatPriceBRL } from '@/lib/utils';
import { DeleteProductButton } from '@/components/painel/DeleteProductButton';
import { PainelTabs } from '@/components/painel/PainelTabs';


export const dynamic = 'force-dynamic';

export default async function PainelProdutosPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const membership = await prisma.storeMember.findFirst({ where: { userId: session.user.id } });
  if (!membership) redirect('/painel');

  const products = await productRepository.getByStoreId(membership.storeId);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-[28px] font-semibold text-ink">Meus produtos</h1>
          <Link
            href="/painel/produtos/novo"
            className="inline-flex items-center gap-1.5 rounded-full bg-pine px-5 py-2.5 text-[13.5px] font-semibold text-bg"
          >
            <Plus size={15} />
            Novo produto
          </Link>
        </div>

        <PainelTabs />

        {products.length === 0 ? (
          <p className="mt-8 text-[14.5px] text-ink-soft">
            Você ainda não cadastrou nenhum produto.
          </p>
        ) : (
          <div className="mt-8 flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-sand bg-white p-4"
              >
                <div>
                  <p className="font-display text-[15px] font-semibold text-ink">{product.name}</p>
                  <p className="text-[13px] text-ink-soft">
                    {product.category} · {formatPriceBRL(product.price)}
                    {product.status === 'INACTIVE' && (
                      <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-[11px] font-semibold text-ink-soft">
                        Inativo
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/painel/produtos/${product.id}/editar`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-sand text-ink-soft hover:border-pine hover:text-pine"
                    aria-label={`Editar ${product.name}`}
                  >
                    <Pencil size={15} />
                  </Link>
                  <DeleteProductButton productId={product.id} productName={product.name} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}