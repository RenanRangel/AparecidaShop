import { Eye, Megaphone, Globe, MessageCircle, ShieldCheck, Clock3 } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { StoreRegistrationForm } from '@/components/forms/StoreRegistrationForm';
import { SmartCta } from '@/components/para-lojas/SmartCta';

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
  {
    icon: ShieldCheck,
    title: 'Sem custo nesta fase',
    text: 'Cadastro e presença na plataforma são gratuitos enquanto estamos construindo a base de lojas.',
  },
  {
    icon: Clock3,
    title: 'Sem compromisso',
    text: 'Você mantém total controle da sua vitrine e pode sair quando quiser, sem burocracia.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Você se cadastra',
    text: 'Crie sua conta e envie as informações da sua loja — leva poucos minutos.',
  },
  {
    step: '2',
    title: 'Analisamos o cadastro',
    text: 'Conferimos os dados pra manter o catálogo confiável pra quem visita a plataforma.',
  },
  {
    step: '3',
    title: 'Sua loja entra no ar',
    text: 'Com aprovação, sua vitrine aparece no catálogo e nas buscas — pronta pra receber contato.',
  },
];

const FAQ = [
  {
    q: 'Preciso pagar alguma coisa?',
    a: 'Não. Nesta fase, cadastro e presença na plataforma são totalmente gratuitos.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Não. O cadastro é um formulário simples — você preenche o que sua loja vende, e a gente cuida do resto.',
  },
  {
    q: 'A plataforma vende meus produtos por mim?',
    a: 'Não diretamente. A AparecidaShop conecta o visitante até sua loja — o contato e a venda acontecem direto com você, pelo WhatsApp ou Instagram.',
  },
  {
    q: 'Quanto tempo leva pra minha loja aparecer?',
    a: 'Depois do cadastro, sua loja passa por uma análise simples antes de entrar no catálogo, pra manter a confiabilidade da plataforma pros visitantes.',
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

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
              Como funciona
            </span>
            <h2 className="mt-2 font-display text-[26px] font-semibold tracking-tight text-ink sm:text-[30px]">
              Do cadastro até aparecer no catálogo
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, text }) => (
              <div key={step} className="text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-pine font-display text-[15px] font-semibold text-bg">
                  {step}
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
            <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
              Perguntas frequentes
            </span>
            <h2 className="mt-2 font-display text-[26px] font-semibold tracking-tight text-ink sm:text-[30px]">
              Antes de cadastrar, tire suas dúvidas
            </h2>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-sand bg-white p-5">
                <h3 className="font-display text-[15px] font-semibold text-ink">{q}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-2xl border border-sand bg-white p-10 text-center">
            <h2 className="font-display text-[24px] font-semibold tracking-tight text-ink sm:text-[28px]">
              Pronto para colocar sua loja no mapa?
            </h2>
            <p className="text-[14.5px] leading-relaxed text-ink-soft">
              Leva poucos minutos, e não custa nada nesta fase.
            </p>
            <SmartCta />
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