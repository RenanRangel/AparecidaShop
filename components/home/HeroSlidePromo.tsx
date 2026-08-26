import Link from 'next/link';
import { ArrowRight, Store, BadgeCheck, MessageCircle } from 'lucide-react';

export function HeroSlidePromo() {
  return (
    <>
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-marigold-dark">
          Para lojistas
        </span>
        <h1 className="mt-5 font-display text-[38px] font-semibold leading-[1.06] tracking-tight text-ink sm:text-[48px] lg:text-[54px]">
          Sua loja visível pra quem já está em Aparecida.
        </h1>
        <p className="mt-5 max-w-[480px] text-[16.5px] leading-relaxed text-ink-soft">
          Cadastro gratuito. Apareça pra visitantes que já estão na cidade buscando exatamente o
          que você vende.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 text-[14.5px] font-semibold text-bg shadow-card transition-transform hover:-translate-y-0.5"
          >
            Cadastrar minha loja
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/para-lojas"
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
          >
            Saiba mais
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-marigold-light/50" aria-hidden />
        <div className="rounded-[1.75rem] border border-sand bg-white p-7 shadow-card sm:p-9">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Por que cadastrar sua loja
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marigold-light text-marigold-dark">
                <Store size={16} />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-ink">Visibilidade real</p>
                <p className="text-[13px] text-ink-soft">Apareça no diretório e na busca de produtos.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine-50 text-pine">
                <MessageCircle size={16} />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-ink">Contato direto</p>
                <p className="text-[13px] text-ink-soft">Cliente fala com você pelo WhatsApp, sem intermediário.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-light text-ink-soft">
                <BadgeCheck size={16} />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-ink">Sem custo</p>
                <p className="text-[13px] text-ink-soft">Cadastro e presença no diretório são gratuitos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}