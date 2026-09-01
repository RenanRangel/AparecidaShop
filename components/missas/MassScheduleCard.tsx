import { Clock } from 'lucide-react';
import type { MassSchedule } from '@/types/mass-schedule';

export function MassScheduleCard({ schedule }: { schedule: MassSchedule }) {
  return (
    <div className="rounded-2xl border border-sand bg-white p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine-50 text-pine">
          <Clock size={16} />
        </span>
        <h2 className="font-display text-[17px] font-semibold text-ink">{schedule.churchName}</h2>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {schedule.slots.map((slot) => (
          <div key={slot.days}>
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-soft">
              {slot.days}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {slot.times.map((time) => (
                <span
                  key={time}
                  className="rounded-full border border-sand px-3 py-1 font-mono text-[13px] text-ink"
                >
                  {time}
                </span>
              ))}
            </div>
            {slot.note && <p className="mt-1.5 text-[12px] text-ink-soft">{slot.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}