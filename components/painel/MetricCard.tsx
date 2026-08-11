import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import type { MetricValue } from '@/lib/analytics/query';

export function MetricCard({
  label,
  metric,
  context,
  suffix,
}: {
  label: string;
  metric: MetricValue;
  context?: string;
  suffix?: string; // ex: "%" pra taxa de conversão
}) {
  const { current, changePercent } = metric;

  return (
    <div className="rounded-2xl border border-sand bg-white p-6">
      <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      <p className="mt-2 font-display text-[26px] font-semibold text-ink">
        {current.toLocaleString('pt-BR')}
        {suffix}
      </p>

      {changePercent === null ? (
        context && <p className="mt-1.5 text-[12px] text-ink-soft">{context}</p>
      ) : (
        <p
          className={`mt-1.5 flex items-center gap-1 text-[12.5px] font-semibold ${
            changePercent > 0 ? 'text-pine' : changePercent < 0 ? 'text-red-600' : 'text-ink-soft'
          }`}
        >
          {changePercent > 0 ? (
            <ArrowUpRight size={13} />
          ) : changePercent < 0 ? (
            <ArrowDownRight size={13} />
          ) : (
            <Minus size={13} />
          )}
          {Math.abs(changePercent).toFixed(1)}% vs. período anterior
        </p>
      )}
    </div>
  );
}