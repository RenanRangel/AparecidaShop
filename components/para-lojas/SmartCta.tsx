import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { auth } from '@/auth';
import { storeRepository } from '@/lib/repositories';

export async function SmartCta() {
  const session = await auth();

  let href = '/cadastro';
  let label = 'Criar minha conta';

  if (session?.user) {
    const store = await storeRepository.getStoreForUser(session.user.id);
    if (store != null) {
      href = '/painel';
      label = 'Ir para o meu painel';
    } else {
      href = '/painel';
      label = 'Cadastrar minha loja';
    }
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-pine px-8 py-3.5 text-[14.5px] font-semibold text-bg shadow-card transition-transform hover:-translate-y-0.5"
    >
      {label}
      <ArrowRight size={16} />
    </Link>
  );
}