import Link from 'next/link';
import { ArrowRight, Search, Gift, Shirt, Coffee, Gem, Palette, Store } from 'lucide-react';
import { Container } from '@/components/shared/Container';

const BOARD_TAGS = [
  { label: 'Loja São Francisco', icon: Store, rotate: '-rotate-2', tone: 'bg-pine text-bg' },
  { label: 'Casa do Romeiro', icon: Gift, rotate: 'rotate-1', tone: 'bg-marigold text-ink' },
  { label: 'Ateliê Mantiqueira', icon: Palette, rotate: '-rotate-1', tone: 'bg-bg text-ink border border-sand' },
  { label: 'Doceria do Vale', icon: Coffee, rotate: 'rotate-2', tone: 'bg-pine-deep text-bg' },
  { label: 'Moda Serra', icon: Shirt, rotate: '-rotate-1', tone: 'bg-bg text-ink border border-sand' },
  { label: 'Bazar Caminho de Luz', icon: Gem, rotate: 'rotate-1', tone: 'bg-marigold-light text-ink' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-pine">
            Comércio local de Aparecida-SP
          </span>
          <h1 className="mt-5 font-display text-[38px] font-semibold leading-[1.06] tracking-tight text-ink sm:text-[48px] lg:text-[54px]">
            Encontre as lojas e produtos que fazem parte da sua experiência em Aparecida.
          </h1>
          <p className="mt-5 max-w-[480px] text-[16.5px] leading-relaxed text-ink-soft">
            Descubra comércios locais, encontre seus produtos favoritos e conecte-se diretamente
            com as lojas da cidade.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/lojas"
              className="inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 text-[14.5px] font-semibold text-bg shadow-card transition-transform hover:-translate-y-0.5"
            >
              Ver lojas cadastradas
              <ArrowRight size={16} />
            </Link>
            <a
              href="#busca"
              className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
            >
              <Search size={16} />
              Pesquisar produtos
            </a>
          </div>
        </div>

        {/* Elemento-assinatura: mural de placas do comércio local */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-pine-50" aria-hidden />
          <div className="rounded-[1.75rem] border border-sand bg-white p-7 shadow-card sm:p-9">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Vitrine do comércio · Aparecida-SP
            </p>
            <div className="mt-6 flex flex-wrap gap-3.5">
              {BOARD_TAGS.map(({ label, icon: Icon, rotate, tone }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-[13px] font-semibold shadow-soft ${rotate} ${tone}`}
                >
                  <Icon size={15} />
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between border-t border-sand pt-5">
              <span className="text-[13px] text-ink-soft">+6 lojas já cadastradas</span>
              <span className="font-mono text-[12px] font-semibold text-pine">em crescimento</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
