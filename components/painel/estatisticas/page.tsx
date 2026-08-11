import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/shared/Container';
import { PainelTabs } from '@/components/painel/PainelTabs';
import { PeriodSelector } from '@/components/painel/PeriodSelector';
import { MetricCard } from '@/components/painel/MetricCard';
import { getStoreAnalyticsSummary, type PeriodKey } from '@/lib/analytics/query';

export const dynamic = 'force-dynamic';

const VALID_PERIODS: PeriodKey[] = ['today', '7d', '30d', 'all'];

export default async function EstatisticasPage({
  searchParams,
}: {
  searchParams: { period?: string };
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const membership = await prisma.storeMember.findFirst({ where: { userId: session.user.id } });
  if (!membership) redirect('/painel');

  const period: PeriodKey = VALID_PERIODS.includes(searchParams.period as PeriodKey)
    ? (searchParams.period as PeriodKey)
    : '30d';

  const summary = await getStoreAnalyticsSummary(membership.storeId, period);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <h1 className="font-display text-[28px] font-semibold text-ink">Estatísticas</h1>
        <PainelTabs />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[13.5px] text-ink-soft">
            Interesse e contato — não representa vendas confirmadas.
          </p>
          <PeriodSelector current={period} />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Visualizações da loja" metric={summary.storeViews} />
          <MetricCard label="Visualizações de produtos" metric={summary.productViews} />
          <MetricCard label="Cliques no WhatsApp" metric={summary.whatsappClicks} />
          <MetricCard label="Produtos adicionados à lista" metric={summary.addToList} />
          <MetricCard label="Listas enviadas" metric={summary.listsSent} />
          <MetricCard
            label="Conversão para contato"
            suffix="%"
            metric={{
              current: summary.conversionRate.current ?? 0,
              previous: summary.conversionRate.previous,
              changePercent:
                summary.conversionRate.current !== null && summary.conversionRate.previous !== null
                  ? summary.conversionRate.current - summary.conversionRate.previous
                  : null,
            }}
            context={
              summary.conversionRate.current === null
                ? 'Sem dados suficientes para este período.'
                : 'dos visitantes chegaram ao WhatsApp'
            }
          />
        </div>
      </Container>
    </section>
  );
}