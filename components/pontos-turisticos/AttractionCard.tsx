import type { Attraction } from '@/types/attractions';

const CATEGORY_STYLE: Record<Attraction['category'], string> = {
  Religioso: 'bg-pine-50 text-pine',
  História: 'bg-sand-light text-ink-soft',
  Mirante: 'bg-marigold-light text-marigold-dark',
  Passeio: 'bg-pine-100 text-pine-deep',
  Família: 'bg-marigold-light text-marigold-dark',
  Compras: 'bg-pine-50 text-pine',
};

export function AttractionCard({ attraction }: { attraction: Attraction }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-sand bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[28px] leading-none">{attraction.emoji}</span>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${CATEGORY_STYLE[attraction.category]}`}
        >
          {attraction.category}
        </span>
      </div>
      <h3 className="font-display text-[15.5px] font-semibold leading-snug text-ink">
        {attraction.name}
      </h3>
      <p className="text-[13px] leading-relaxed text-ink-soft">{attraction.description}</p>
    </div>
  );
}