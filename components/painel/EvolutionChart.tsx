'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { METRIC_LABELS, type MetricKey, type TimeSeriesPoint } from '@/lib/analytics/query';

const METRIC_KEYS: MetricKey[] = ['storeViews', 'whatsappClicks', 'addToList', 'listsSent'];

export function EvolutionChart({ series }: { series: Record<MetricKey, TimeSeriesPoint[]> }) {
  const [active, setActive] = useState<MetricKey>('storeViews');
  const data = series[active];
  const hasData = data.some((point) => point.value > 0);

  return (
    <div className="rounded-2xl border border-sand bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-[17px] font-semibold text-ink">Evolução</h2>
        <div className="flex flex-wrap gap-1.5">
          {METRIC_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                active === key
                  ? 'bg-pine text-bg'
                  : 'border border-sand text-ink-soft hover:border-pine hover:text-pine'
              }`}
            >
              {METRIC_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {!hasData ? (
        <p className="mt-8 py-10 text-center text-[13.5px] text-ink-soft">
          Ainda não existem dados suficientes para gerar este gráfico.
        </p>
      ) : (
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E1D2" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#4B5A50' }}
                axisLine={{ stroke: '#E7E1D2' }}
                tickLine={false}
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#4B5A50' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7E1D2', fontSize: 12.5 }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1F5C4A"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#1F5C4A' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}