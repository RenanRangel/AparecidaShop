import { env } from '@/lib/env';

/**
 * Ponto de extensão para acesso a uma API backend futura.
 *
 * Não é usado por nenhum componente ainda — hoje os dados vêm dos
 * repositórios mockados (`@/lib/repositories`). Quando uma API real existir,
 * uma implementação de repositório (ex: `HttpProductRepository`) pode usar
 * este helper para fazer as chamadas, mantendo os componentes inalterados.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!env.apiBaseUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL não configurada. Defina essa variável em .env.local quando a API existir.',
    );
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição para ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
