/**
 * Ponto de extensão para autenticação.
 *
 * Não há autenticação implementada nesta etapa do projeto. Este módulo
 * existe apenas para dar um lugar organizacional único onde a integração
 * futura (ex: NextAuth/Auth.js, Clerk) deve entrar, evitando que checagens
 * de sessão se espalhem pelos componentes de forma ad-hoc.
 *
 * `getCurrentSession` reflete o estado real de hoje (ninguém está
 * autenticado) — não é um mock de usuário logado.
 */
export interface AuthSession {
  userId: string;
  email: string;
}

export async function getCurrentSession(): Promise<AuthSession | null> {
  // TODO (próxima etapa): integrar com um provedor de autenticação real.
  return null;
}
