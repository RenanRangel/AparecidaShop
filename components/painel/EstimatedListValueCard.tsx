import { formatPriceBRL } from '@/lib/utils';

export function EstimatedListValueCard({ cents }: { cents: number }) {
  return (
    <div className="rounded-2xl border border-sand bg-white p-6">
      <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-soft">
        Valor estimado das listas
      </span>
      <p className="mt-2 font-display text-[26px] font-semibold text-ink">{formatPriceBRL(cents)}</p>
      <p className="mt-1.5 text-[12px] text-ink-soft">
        Estimativa baseada nos preços dos produtos presentes em listas enviadas. Não representa vendas
        realizadas.
      </p>
    </div>
  );
}