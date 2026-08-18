import { Container } from '@/components/shared/Container';

export const metadata = {
  title: 'Política de Privacidade — AparecidaShop',
};

export default function PrivacidadePage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <h1 className="font-display text-[28px] font-semibold text-ink">Política de Privacidade</h1>
        <p className="mt-2 text-[13px] text-ink-soft">Última atualização: agosto de 2026.</p>

        <div className="mt-8 flex flex-col gap-7 text-[14.5px] leading-relaxed text-ink-soft">
          <div>
            <h2 className="font-display text-[16px] font-semibold text-ink">O que este site é</h2>
            <p className="mt-2">
              O AparecidaShop é um diretório de lojas do comércio local de Aparecida-SP. Não vendemos
              produtos diretamente — conectamos visitantes às lojas, que atendem por WhatsApp e
              presencialmente. Não há checkout, pagamento ou carrinho de compras nesta plataforma.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[16px] font-semibold text-ink">Dados de quem cadastra uma loja</h2>
            <p className="mt-2">
              Se você cria uma conta como lojista, coletamos nome, e-mail e uma senha (armazenada de
              forma criptografada, nunca em texto simples). Os dados da loja em si — nome, endereço,
              WhatsApp, Instagram, categoria e descrição — são fornecidos por você e exibidos
              publicamente na página da loja, pois essa visibilidade é o propósito do cadastro.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[16px] font-semibold text-ink">Dados de quem apenas visita o site</h2>
            <p className="mt-2">
              Você não precisa criar conta para navegar, pesquisar produtos ou usar a lista de
              interesse. A lista de interesse fica salva apenas no seu próprio navegador
              (armazenamento local) — não enviamos essa lista para nossos servidores. Ela só é
              compartilhada quando você mesmo clica em &quot;Enviar para o WhatsApp&quot;, momento em que o
              conteúdo vai direto para a conversa entre você e a loja, fora do nosso controle.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[16px] font-semibold text-ink">Cookies e estatísticas anônimas</h2>
            <p className="mt-2">
              Usamos um cookie técnico (chamado <code className="text-[13px]">asid</code>) que
              identifica sua visita de forma anônima, sem nome, e-mail ou qualquer dado pessoal
              associado. Ele existe para que os lojistas possam ver estatísticas agregadas de
              interesse na própria loja — por exemplo, quantas vezes a página foi vista, ou quantos
              cliques o botão de WhatsApp recebeu. Esse cookie expira em até 180 dias e não é
              compartilhado entre sites diferentes.
            </p>
            <p className="mt-2">
              Não vendemos, alugamos ou compartilhamos esses dados com terceiros para fins
              publicitários.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[16px] font-semibold text-ink">Onde os dados ficam armazenados</h2>
            <p className="mt-2">
              As informações de contas e lojas ficam num banco de dados hospedado pela Neon; imagens
              de produtos ficam hospedadas pela Vercel. Ambos são provedores de infraestrutura — não
              têm acesso ao conteúdo além de armazená-lo tecnicamente.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[16px] font-semibold text-ink">Seus direitos</h2>
            <p className="mt-2">
              Você pode solicitar a exclusão da sua conta e dos dados da sua loja a qualquer momento,
              entrando em contato pelo e-mail abaixo. Como visitante sem conta, você pode limpar sua
              lista de interesse e o cookie de sessão diretamente nas configurações do seu navegador,
              a qualquer momento.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[16px] font-semibold text-ink">Contato</h2>
            <p className="mt-2">
              Dúvidas sobre privacidade ou pedidos relacionados aos seus dados:{' '}
              <a href="mailto:contato@aparecidashop.com.br" className="font-semibold text-pine hover:underline">
                contato@aparecidashop.com.br
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}