import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/shared/Container';
import { StoreCreateForm } from '@/components/painel/StoreCreateForm';

export default async function CadastrarLojaPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const existing = await prisma.storeMember.findFirst({ where: { userId: session.user.id } });
  if (existing) redirect('/painel');

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <h1 className="font-display text-[28px] font-semibold text-ink">Cadastrar minha loja</h1>
        <p className="mt-2 text-[14.5px] text-ink-soft">
          Sua loja entra com status <strong>Em análise</strong> até ser aprovada.
        </p>
        <StoreCreateForm categories={categories} />
      </Container>
    </section>
  );
}