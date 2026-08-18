import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/app/providers';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aparecida-shop.vercel.app'), // ← trocar quando comprar domínio próprio
  title: 'AparecidaShop — comércio local de Aparecida-SP',
  description:
    'Encontre lojas e produtos do comércio local de Aparecida-SP e conecte-se diretamente com os estabelecimentos.',
  openGraph: {
    title: 'AparecidaShop — comércio local de Aparecida-SP',
    description:
      'Encontre lojas e produtos do comércio local de Aparecida-SP e conecte-se diretamente com os estabelecimentos.',
    url: 'https://aparecida-shop.vercel.app',
    siteName: 'AparecidaShop',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AparecidaShop — comércio local de Aparecida-SP',
    description:
      'Encontre lojas e produtos do comércio local de Aparecida-SP e conecte-se diretamente com os estabelecimentos.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <main>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}