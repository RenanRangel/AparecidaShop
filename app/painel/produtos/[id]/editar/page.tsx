import { redirect, notFound } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { productRepository } from '@/lib/repositories';
import { Container } from '@/components/shared/Container';
import { ProductForm } from '@/components/painel/ProductForm';

export default async function EditarProdutoPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const membership = await prisma.storeMember.findFirst({ where: { userId: session.user.id } });
  if (!membership) redirect('/painel');

  const product = await productRepository.getById(params.id);
  if (!product || product.storeId !== membership.storeId) notFound();

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <h1 className="font-display text-[28px] font-semibold text-ink">Editar produto</h1>
        <ProductForm categories={categories} product={product} />
      </Container>
    </section>
  );
}