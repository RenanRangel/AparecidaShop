import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/shared/Container';
import { StoreApprovalActions } from '@/components/admin/StoreApprovalActions';

export const dynamic = 'force-dynamic';

export default async function AdminLojasPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/painel');

  const pendingStores = await prisma.store.findMany({
    where: { status: 'PENDING' },
    include: {
      members: { include: { user: true } },
      categories: { include: { category: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <h1 className="font-display text-[28px] font-semibold text-ink">
          Lojas aguardando aprovação
        </h1>
        <p className="mt-2 text-[14.5px] text-ink-soft">
          {pendingStores.length === 0
            ? 'Nenhuma loja pendente no momento.'
            : `${pendingStores.length} loja(s) aguardando análise.`}
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {pendingStores.map((store) => {
            const owner = store.members.find((m) => m.role === 'OWNER')?.user;

            return (
              <div key={store.id} className="rounded-2xl border border-sand bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-[17px] font-semibold text-ink">
                      {store.name}
                    </h2>
                    <p className="mt-1 text-[13px] text-ink-soft">{store.location}</p>
                    <p className="mt-1 text-[13px] text-ink-soft">
                      {store.categories.map((c) => c.category.name).join(', ') || 'Sem categoria'}
                    </p>
                    {owner && (
                      <p className="mt-2 text-[13px] text-ink-soft">
                        Solicitado por <strong>{owner.name}</strong> ({owner.email})
                      </p>
                    )}
                    <p className="mt-2 max-w-xl text-[13.5px] text-ink-soft">{store.description}</p>
                  </div>

                  <StoreApprovalActions storeId={store.id} />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}