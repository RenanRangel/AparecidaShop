import { Trophy } from 'lucide-react';
import type { ProductRankingEntry } from '@/lib/analytics/query';

export function ProductRanking({ entries }: { entries: ProductRankingEntry[] }) {
  return (
    <div className="rounded-2xl border border-sand bg-white p-6">
      <h2 className="font-display text-[17px] font-semibold text-ink">Ranking de produtos</h2>
      <p className="mt-1 text-[13px] text-ink-soft">
        Por visualizações e adições à lista. Não inclui cliques de WhatsApp (registrados por loja, não por produto).
      </p>

      {entries.length === 0 ? (
        <p className="mt-6 text-[13.5px] text-ink-soft">
          Ainda não existem dados suficientes para gerar este ranking.
        </p>
      ) : (
        <div className="mt-5 flex flex-col gap-2">
          {entries.map((entry, index) => (
            <div
              key={entry.productId}
              className="flex items-center justify-between gap-3 rounded-xl border border-sand p-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand-light text-[12.5px] font-bold text-ink-soft">
                  {index === 0 ? <Trophy size={13} className="text-marigold-dark" /> : index + 1}
                </span>
                <span className="text-[13.5px] font-medium text-ink">{entry.name}</span>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-[12px] text-ink-soft">
                <span>{entry.views} visualizações</span>
                <span>{entry.addToListCount} na lista</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}