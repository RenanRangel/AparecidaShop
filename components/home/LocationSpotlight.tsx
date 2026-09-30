import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { STORE_ZONES, STORE_ZONE_LABELS, type StoreZoneValue } from '@/lib/constants/zones';

const ZONE_TONE: Record<StoreZoneValue, string> = {
  AV_ITAGUACU: 'bg-pine-50 text-pine',
  PORTO_ITAGUACU: 'bg-marigold-light text-marigold-dark',
  GALERIA: 'bg-sand-light text-ink-soft',
  SHOPPING: 'bg-pine-100 text-pine-deep',
  LADEIRA: 'bg-marigold-light text-marigold-dark',
  RADIO_TV: 'bg-pine-50 text-pine',
  AV_JULIO_PRESTES: 'bg-sand-light text-ink-soft',
};

export function LocationSpotlight() {
  return (
    <div>
      <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
        Onde estamos
      </span>
      <h2 className="mt-2 font-display text-[28px] font-semibold tracking-tight text-ink sm:text-[34px]">
        Encontre lojas por região de Aparecida
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {STORE_ZONES.map((zone) => (
          <Link
            key={zone}
            href={`/lojas?zone=${zone}`}
            className={`group flex items-center justify-between gap-4 rounded-2xl border border-sand p-5 transition-shadow hover:shadow-card ${ZONE_TONE[zone]}`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70">
                <MapPin size={18} />
              </span>
              <span className="font-display text-[16px] font-semibold">
                {STORE_ZONE_LABELS[zone]}
              </span>
            </div>
            <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}