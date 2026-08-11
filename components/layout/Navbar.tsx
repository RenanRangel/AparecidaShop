'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MapPin, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react'; // ← novo import
import { Container } from '@/components/shared/Container';
import { Heart } from 'lucide-react'; // ← junto dos outros ícones já importados
import { useProductList } from '@/components/list/ListProvider'; // ← novo

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/lojas', label: 'Lojas' },
  { href: '/sobre', label: 'Sobre' }, // ← "Sobre Mim" → "Sobre"
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const { items } = useProductList();

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-bg/90 backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pine text-bg">
            <MapPin size={17} strokeWidth={2.4} />
          </span>
          <span className="font-display text-[18px] font-semibold tracking-tight">
            Aparecida<span className="text-pine">Shop</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ← bloco desktop trocado */}
        <div className="hidden items-center gap-4 md:flex">
          {status === 'authenticated' ? (
            <>
            <Link
  href="/lista"
  className="relative flex items-center gap-1.5 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
>
  <Heart size={15} />
  Minha lista
  {items.length > 0 && (
    <span className="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-marigold text-[10px] font-bold text-ink">
      {items.length}
    </span>
  )}
</Link>
             <Link
              href={session?.user?.role === 'ADMIN' ? '/admin' : '/painel'}
              className="flex items-center gap-1.5 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
               <User size={15} />
              Painel
            </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Sair
              </button>
            </>
          ) : status === 'unauthenticated' ? (
            <Link
              href="/login"
              className="text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Entrar
            </Link>
          ) : null /* status === 'loading': não mostra nada pra evitar piscar */}

          <Link
            href="/para-lojas"
            className="inline-flex items-center rounded-full bg-marigold px-5 py-2.5 text-[13.5px] font-semibold text-ink shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Para lojas
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-sand md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-sand bg-bg md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-sand-light hover:text-ink"
              >
                {link.label}
              </Link>
            ))}

            {/* ← bloco mobile trocado */}
            {status === 'authenticated' ? (
              <>
              <Link
  href="/lista"
  onClick={() => setOpen(false)}
  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-sand-light hover:text-ink"
>
  <Heart size={16} />
  Minha lista {items.length > 0 && `(${items.length})`}
</Link>
                <Link
                  href={session?.user?.role === 'ADMIN' ? '/admin' : '/painel'}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-sand-light hover:text-ink"
                >
                  Painel
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-[15px] font-medium text-ink-soft hover:bg-sand-light hover:text-ink"
                >
                  Sair
                </button>
              </>
            ) : status === 'unauthenticated' ? (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-sand-light hover:text-ink"
              >
                Entrar
              </Link>
            ) : null}

            <Link
              href="/para-lojas"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-marigold px-5 py-2.5 text-[14px] font-semibold text-ink"
            >
              Para lojas
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}