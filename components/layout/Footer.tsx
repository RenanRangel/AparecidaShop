import Link from 'next/link';
import { MapPin, Instagram, Mail } from 'lucide-react';
import { Container } from '@/components/shared/Container';

export function Footer() {
  return (
    <footer className="border-t border-sand bg-pine-50/60">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pine text-bg">
              <MapPin size={17} strokeWidth={2.4} />
            </span>
            <span className="font-display text-[17px] font-semibold">
              Aparecida<span className="text-pine">Shop</span>
            </span>
          </div>
          <p className="mt-4 max-w-[220px] text-[13.5px] leading-relaxed text-ink-soft">
            Uma vitrine digital para o comércio local de Aparecida-SP.
          </p>
        </div>

        <div>
          <h4 className="font-display text-[13px] font-semibold uppercase tracking-wide text-ink-soft">
            Navegação
          </h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-[14px] text-ink-soft">
            <li><Link href="/" className="hover:text-ink">Início</Link></li>
            <li><Link href="/lojas" className="hover:text-ink">Lojas</Link></li>
            <li><Link href="/sobre" className="hover:text-ink">Sobre Mim</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[13px] font-semibold uppercase tracking-wide text-ink-soft">
            Lojistas
          </h4>
          <ul className="mt-4 flex flex-col gap-2.5 text-[14px] text-ink-soft">
            <li><Link href="/para-lojas" className="hover:text-ink">Cadastre sua loja</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[13px] font-semibold uppercase tracking-wide text-ink-soft">
            Contato
          </h4>
          <ul className="mt-4 flex flex-col gap-3 text-[14px] text-ink-soft">
            <li className="flex items-center gap-2"><Mail size={15} /> contato@aparecidashop.com.br</li>
            <li className="flex items-center gap-2"><Instagram size={15} /> @aparecidashop</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-sand py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-[12.5px] text-ink-soft sm:flex-row">
          <span>© {new Date().getFullYear()} AparecidaShop. Todos os direitos reservados.</span>
          <span>Feito para o comércio local de Aparecida-SP.</span>
        </Container>
      </div>
    </footer>
  );
}
