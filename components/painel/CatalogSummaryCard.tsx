import Link from 'next/link';
import type { CatalogSummary } from '@/lib/analytics/query';

export function CatalogSummaryCard({ summary }: { summary: CatalogSummary }) {
  return (
    <div className="rounded-2xl border border-sand bg-white p-6">
      <h2 className="font-display text-[17px] font-semibold text-ink">Catálogo</h2>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="font-display text-[24px] font-semibold text-ink">{summary.total}</p>
          <p className="mt-1 text-[11.5px] text-ink-soft">Cadastrados</p>
        </div>
        <div>
          <p className="font-display text-[24px] font-semibold text-pine">{summary.active}</p>
          <p className="mt-1 text-[11.5px] text-ink-soft">Ativos</p>
        </div>
        <div>
          <p className="font-display text-[24px] font-semibold text-ink-soft">{summary.inactive}</p>
          <p className="mt-1 text-[11.5px] text-ink-soft">Inativos</p>
        </div>
      </div>

      <Link
        href="/painel/produtos"
        className="mt-5 inline-flex text-[12.5px] font-semibold text-pine hover:underline"
      >
        Ver produtos →
      </Link>
    </div>
  );
}