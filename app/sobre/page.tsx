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
                [Renan Rangel]
              </p>
              <p className="mt-1 text-[14px] text-ink-soft">
                [CEO e fundador do AparecidaShop]
              </p>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-ink-soft">
                [Graduando em ADS e apaixonado por tecnologia.]
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
                [Ao perceber a dificuldade dos visitantes de encontrar lojas específicas na cidade, surgiu a ideia de criar uma plataforma que conectasse lojas e visitantes, para que os mesmos pudessem encontrar facilmente os estabelecimentos que já visitaram e conhecer novos lugares.]
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
                [Com uma visão voltada para a inovação e o desenvolvimento do comércio local, buscamos conectar lojistas e visitantes de forma eficiente e prática.]
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
                [Hoje a plataforma conecta o visitante e as lojas, divulgando a localização e redes de contato, e no futuro, pretendemos tornar o AparecidaShop seu novo site de compras preferido e expandir para outras cidades turísticas, criando parcerias com o comércio local e oferecendo uma experiência ainda mais completa para os visitantes.]
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
