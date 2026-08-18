/**
 * Leitura centralizada de variáveis de ambiente.
 *
 * Nesta etapa do projeto nenhuma variável é obrigatória — não há banco de
 * dados, API externa ou autenticação implementados ainda. Este módulo existe
 * para que, quando essas integrações forem adicionadas, exista um único
 * lugar para ler e validar `process.env`, em vez de espalhar
 * `process.env.X` pelos componentes.
 *
 * TODO (próxima etapa): validar essas variáveis com um schema (ex: zod)
 * assim que forem obrigatórias, falhando o boot da aplicação se ausentes.
 */
function readOptionalEnv(key: string): string | undefined {
  const value = process.env[key];
  return value && value.length > 0 ? value : undefined;
}

export const env = {
  databaseUrl: readOptionalEnv('DATABASE_URL'),
  apiBaseUrl: readOptionalEnv('NEXT_PUBLIC_API_BASE_URL'),
  authSecret: readOptionalEnv('AUTH_SECRET'),
  resendApiKey: readOptionalEnv('RESEND_API_KEY'),
} as const;
