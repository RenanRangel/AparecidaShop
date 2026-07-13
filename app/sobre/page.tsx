import { User, Sparkles, Target, Telescope } from 'lucide-react';
import { Container } from '@/components/shared/Container';

export default function SobrePage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
            Sobre mim
          </span>
          <h1 className="mt-2 font-display text-[32px] font-semibold tracking-tight text-ink sm:text-[40px]">
            A pessoa por trás do AparecidaShop
          </h1>

          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-sand bg-white text-ink-soft">
              <User size={32} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-display text-[20px] font-semibold text-ink">
                [Nome do fundador — a preencher]
              </p>
              <p className="mt-1 text-[14px] text-ink-soft">
                [Cargo / breve identificação — a preencher]
              </p>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-ink-soft">
                [Espaço reservado para foto do fundador e uma apresentação curta em primeira
                pessoa.]
              </p>
            </div>
          </div>

          <div className="mt-14 space-y-10">
            <div>
              <div className="flex items-center gap-2.5">
                <Sparkles size={18} className="text-marigold-dark" />
                <h2 className="font-display text-[19px] font-semibold text-ink">
                  Como surgiu a ideia
                </h2>
              </div>
              <p className="mt-3 rounded-xl border border-dashed border-sand bg-white p-5 text-[14.5px] leading-relaxed text-ink-soft">
                [Espaço reservado. Conte aqui a história real: o contato com o comércio local de
                Aparecida, a observação que originou o projeto e o momento em que a ideia
                nasceu.]
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <Target size={18} className="text-pine" />
                <h2 className="font-display text-[19px] font-semibold text-ink">
                  Missão do projeto
                </h2>
              </div>
              <p className="mt-3 rounded-xl border border-dashed border-sand bg-white p-5 text-[14.5px] leading-relaxed text-ink-soft">
                [Espaço reservado para descrever, com suas próprias palavras, o propósito do
                AparecidaShop para os lojistas e para os visitantes da cidade.]
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <Telescope size={18} className="text-pine" />
                <h2 className="font-display text-[19px] font-semibold text-ink">
                  Visão para o futuro
                </h2>
              </div>
              <p className="mt-3 rounded-xl border border-dashed border-sand bg-white p-5 text-[14.5px] leading-relaxed text-ink-soft">
                [Espaço reservado para descrever os próximos passos: novas funcionalidades,
                expansão para outras cidades turísticas, parcerias com o comércio local.]
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
