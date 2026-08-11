import type { OriginBreakdown as OriginBreakdownType } from '@/lib/analytics/query';

export function OriginBreakdown({ origins }: { origins: OriginBreakdownType[] }) {
  return (
    <div className="rounded-2xl border border-sand bg-white p-6">
      <h2 className="font-display text-[17px] font-semibold text-ink">Origem dos visitantes</h2>

      {origins.length === 0 ? (
        <p className="mt-6 text-[13.5px] text-ink-soft">
          Ainda não existem dados suficientes para este período.
        </p>
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {origins.map((item) => (
            <div key={item.origin}>
              <div className="flex items-center justify-between text-[13px]">
                <span className="capitalize text-ink-soft">{item.origin}</span>
                <span className="font-semibold text-ink">{item.percent.toFixed(0)}%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-sand-light">
                <div className="h-2 rounded-full bg-pine" style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}