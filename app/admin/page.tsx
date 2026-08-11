import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BarChart3, ClipboardCheck } from 'lucide-react';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/shared/Container';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/painel');

  const pendingCount = await prisma.store.count({ where: { status: 'PENDING' } });

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <h1 className="font-display text-[28px] font-semibold text-ink">
          Painel administrativo
        </h1>
        <p className="mt-2 text-[14.5px] text-ink-soft">
          Olá, {session.user.name}.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {/* Estatísticas — placeholder, sem link real ainda */}
          <div className="rounded-2xl border border-dashed border-sand bg-white p-6 opacity-60">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-light text-ink-soft">
              <BarChart3 size={18} />
            </span>
            <h2 className="mt-4 font-display text-[17px] font-semibold text-ink">
              Estatísticas do site
            </h2>
            <p className="mt-1.5 text-[13.5px] text-ink-soft">
              Em breve.
            </p>
          </div>

          <Link
            href="/admin/lojas"
            className="rounded-2xl border border-sand bg-white p-6 transition-colors hover:border-pine"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pine-50 text-pine">
              <ClipboardCheck size={18} />
            </span>
            <h2 className="mt-4 font-display text-[17px] font-semibold text-ink">
              Aprovar lojas
            </h2>
            <p className="mt-1.5 text-[13.5px] text-ink-soft">
              {pendingCount === 0
                ? 'Nenhuma loja aguardando análise.'
                : `${pendingCount} loja(s) aguardando análise.`}
            </p>
          </Link>
        </div>
      </Container>
    </section>
  );
}