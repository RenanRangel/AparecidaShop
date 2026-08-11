'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { PERIOD_LABELS, type PeriodKey } from '@/lib/analytics/query';

const OPTIONS: PeriodKey[] = ['today', '7d', '30d', 'all'];

export function PeriodSelector({ current }: { current: PeriodKey }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSelect(period: PeriodKey) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('period', period);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleSelect(option)}
          className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
            current === option ? 'bg-pine text-bg' : 'border border-sand text-ink-soft hover:border-pine hover:text-pine'
          }`}
        >
          {PERIOD_LABELS[option]}
        </button>
      ))}
    </div>
  );
}