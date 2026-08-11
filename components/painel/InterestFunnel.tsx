import type { FunnelStage } from '@/lib/analytics/query';

export function InterestFunnel({ stages }: { stages: FunnelStage[] }) {
  const maxValue = Math.max(...stages.map((s) => s.value), 1);

  return (
    <div className="rounded-2xl border border-sand bg-white p-6">
      <h2 className="font-display text-[17px] font-semibold text-ink">Funil de interesse</h2>
      <p className="mt-1 text-[13px] text-ink-soft">
        Jornada do visitante — não representa vendas confirmadas.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {stages.map((stage, index) => {
          const widthPercent = Math.max((stage.value / maxValue) * 100, stage.value > 0 ? 6 : 2);

          return (
            <div key={stage.label}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-medium text-ink-soft">{stage.label}</span>
                <span className="font-display text-[16px] font-semibold text-ink">
                  {stage.value.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-sand-light">
                <div
                  className="h-2.5 rounded-full bg-pine transition-all"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              {index > 0 && (
                <p className="mt-1 text-[11.5px] text-ink-soft">
                  {stage.percentOfPrevious === null
                    ? 'Sem dados suficientes para taxa de conversão.'
                    : `${stage.percentOfPrevious.toFixed(1)}% da etapa anterior`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}