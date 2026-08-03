'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/painel', label: 'Visão geral' },
  { href: '/painel/produtos', label: 'Meus produtos' },
];

export function PainelTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-b border-sand">
      {TABS.map((tab) => {
        const isActive =
          tab.href === '/painel' ? pathname === '/painel' : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`border-b-2 px-4 py-3 text-[14px] font-semibold transition-colors ${
              isActive ? 'border-pine text-pine' : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}