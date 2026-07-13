/**
 * Validações de formato usadas no formulário de cadastro de loja.
 *
 * Importante: esta é validação de cliente, para UX (feedback imediato).
 * Ela NÃO substitui validação no servidor — quando a API existir, os mesmos
 * dados devem ser validados novamente lá, pois validação de cliente sempre
 * pode ser contornada.
 */

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Aceita telefone fixo (10 dígitos) ou celular (11 dígitos), com DDD. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

/** Valida CNPJ pelos dígitos verificadores (não consulta a Receita Federal). */
export function isValidCNPJ(value: string): boolean {
  const cnpj = value.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false; // todos os dígitos iguais

  const calcCheckDigit = (base: string, weights: number[]): number => {
    const sum = base
      .split('')
      .reduce((acc, digit, i) => acc + Number(digit) * weights[i], 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const base = cnpj.slice(0, 12);
  const digit1 = calcCheckDigit(base, weights1);
  const digit2 = calcCheckDigit(base + digit1, weights2);

  return cnpj === base + String(digit1) + String(digit2);
}
