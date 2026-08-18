'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  gradient: string; // classe Tailwind de background
}

const BANNERS: Banner[] = [
    {
      id: 'boas-vindas',
      eyebrow: 'AparecidaShop',
      title: 'O comércio local de Aparecida, num só lugar',
      description: 'Descubra lojas, produtos e fale direto com quem vende — sem sair da cidade.',
      ctaLabel: 'Ver lojas cadastradas',
      ctaHref: '/lojas',
      gradient: 'bg-gradient-to-br from-pine via-pine-deep to-[#0D2A21]',
    },
    {
      id: 'cadastre-loja',
      eyebrow: 'Para lojistas',
      title: 'Sua loja visível pra quem já está em Aparecida',
      description: 'Cadastro gratuito. Apareça pra visitantes buscando exatamente o que você vende.',
      ctaLabel: 'Cadastrar minha loja',
      ctaHref: '/cadastro',
      gradient: 'bg-gradient-to-br from-marigold-dark via-marigold to-[#8C5A16]',
    },
  ];
const AUTOPLAY_MS = 6000;

export function BannerCarousel() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive((index + BANNERS.length) % BANNERS.length);
  }, []);

  useEffect(() => {
    if (BANNERS.length <= 1) return;
    const id = setInterval(() => goTo(active + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active, goTo]);

  const banner = BANNERS[active];

  return (
    <section className="pt-6 sm:pt-8">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className={`relative overflow-hidden rounded-[1.75rem] ${banner.gradient} px-8 py-12 sm:px-14 sm:py-16`}>
          {/* Textura decorativa sutil, só pra não ficar uma cor lisa demais */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden
          />

          <div className="relative max-w-lg">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-bg">
              {banner.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight tracking-tight text-bg sm:text-[32px]">
              {banner.title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-bg/85">{banner.description}</p>
            <Link
              href={banner.ctaHref}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-bg px-6 py-3 text-[14px] font-semibold text-pine-deep transition-transform hover:-translate-y-0.5"
            >
              {banner.ctaLabel}
              <ArrowRight size={16} />
            </Link>
          </div>

          {BANNERS.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Banner anterior"
                className="absolute left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-bg backdrop-blur-sm transition-colors hover:bg-white/30 sm:flex"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Próximo banner"
                className="absolute right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-bg backdrop-blur-sm transition-colors hover:bg-white/30 sm:flex"
              >
                <ChevronRight size={18} />
              </button>

              <div className="relative mt-8 flex gap-2">
                {BANNERS.map((b, index) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Ir para o banner ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      index === active ? 'w-6 bg-bg' : 'w-1.5 bg-bg/40 hover:bg-bg/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}