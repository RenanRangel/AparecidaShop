export function storeApprovedEmail(storeName: string): { subject: string; html: string } {
    return {
      subject: `Sua loja "${storeName}" foi aprovada!`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #1F5C4A; font-size: 22px;">Sua loja foi aprovada 🎉</h1>
          <p style="color: #16241D; font-size: 15px; line-height: 1.6;">
            A loja <strong>${storeName}</strong> já está visível publicamente no AparecidaShop.
            Visitantes já podem encontrá-la, ver seus produtos e entrar em contato pelo WhatsApp.
          </p>
          
            href="https://aparecida-shop.vercel.app/painel"
            style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #1F5C4A; color: #F1F4EF; text-decoration: none; border-radius: 999px; font-weight: 600; font-size: 14px;"
          >
            Ir para o painel
          </a>
        </div>
      `,
    };
  }
  
  export function storeRejectedEmail(storeName: string, reason?: string): { subject: string; html: string } {
    return {
      subject: `Sobre o cadastro da loja "${storeName}"`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #16241D; font-size: 22px;">Cadastro não aprovado</h1>
          <p style="color: #16241D; font-size: 15px; line-height: 1.6;">
            O cadastro da loja <strong>${storeName}</strong> não foi aprovado desta vez.
          </p>
          ${
            reason
              ? `<p style="color: #4B5A50; font-size: 14px; line-height: 1.6; background: #F2EFE6; padding: 12px 16px; border-radius: 12px;">
                  <strong>Motivo:</strong> ${reason}
                </p>`
              : ''
          }
          <p style="color: #4B5A50; font-size: 14px; line-height: 1.6;">
            Você pode ajustar as informações e enviar um novo cadastro pelo painel.
          </p>
          
            href="https://aparecida-shop.vercel.app/painel"
            style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #1F5C4A; color: #F1F4EF; text-decoration: none; border-radius: 999px; font-weight: 600; font-size: 14px;"
          >
            Ir para o painel
          </a>
        </div>
      `,
    };
  }