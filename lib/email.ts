import { Resend } from 'resend';
import { env } from '@/lib/env';

const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null;

// Enquanto não houver domínio verificado, o Resend só entrega e-mails
// enviados a partir deste remetente de teste, e só para o endereço
// cadastrado na sua conta Resend. Trocar para "notificacoes@aparecidashop.com.br"
// (ou domínio equivalente) assim que o domínio for verificado no painel.
const FROM_ADDRESS = 'AparecidaShop <onboarding@resend.dev>';

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<void> {
  if (!resend) {
    console.warn('RESEND_API_KEY não configurada — e-mail não enviado:', subject);
    return;
  }

  try {
    await resend.emails.send({ from: FROM_ADDRESS, to, subject, html });
  } catch (error) {
    // E-mail nunca pode derrubar o fluxo de aprovação/rejeição em si.
    console.error('Falha ao enviar e-mail:', error);
  }
}