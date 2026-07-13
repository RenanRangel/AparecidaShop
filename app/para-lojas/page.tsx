import { Eye, Megaphone, Globe, MessageCircle } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { StoreRegistrationForm } from '@/components/forms/StoreRegistrationForm';

const BENEFITS = [
  {
    icon: Eye,
    title: 'Seja encontrado depois da viagem',
    text: 'O turista lembra da experiência, mas esquece o caminho até a loja. O AparecidaShop resolve isso.',
  },
  {
    icon: Megaphone,
    title: 'Divulgue seus produtos',
    text: 'Mostre o que você vende para quem já esteve na cidade e para quem está planejando visitar.',
  },
  {
    icon: Globe,
    title: 'Fortaleça sua presença digital',
    text: 'Tenha uma vitrine própria, sem precisar manter um site ou e-commerce completo.',
  },
  {
    icon: MessageCircle,
    title: 'Conecte-se direto com o cliente',
    text: 'Sem intermediários: o contato acontece direto pelo seu WhatsApp ou Instagram.',
  },
];

export default function ParaLojasPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
              Para lojistas
            </span>
            <h1 className="mt-2 font-display text-[32px] font-semibold tracking-tight text-ink sm:text-[42px]">
              Coloque sua loja na vitrine digital de Aparecida
            </h1>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              O AparecidaShop conecta sua loja física a quem já visitou — ou ainda vai visitar —
              a cidade. Sem taxas de cadastro, sem comissão por venda nesta primeira fase.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-sand bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pine-50 text-pine">
                  <Icon size={19} />
                </span>
                <h3 className="mt-4 font-display text-[16px] font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-pine-50/50 py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[26px] font-semibold tracking-tight text-ink sm:text-[30px]">
              Solicite o cadastro da sua loja
            </h2>
            <p className="mt-3 text-[15px] text-ink-soft">
              Preencha o formulário abaixo. Nossa equipe entra em contato para concluir o
              cadastro e publicar sua vitrine.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <StoreRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}
