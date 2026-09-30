export function PageHeader({
    eyebrow,
    title,
    description,
  }: {
    eyebrow: string;
    title: string;
    description?: string;
  }) {
    return (
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-pine">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-display text-[30px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[36px]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{description}</p>
        )}
      </div>
    );
  }