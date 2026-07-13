'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MapPin } from 'lucide-react';
import { Container } from '@/components/shared/Container';

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/lojas', label: 'Lojas' },
  { href: '/sobre', label: 'Sobre Mim' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

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

        <div className="hidden md:block">
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
