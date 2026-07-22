import type { Metadata } from 'next';
// @ts-ignore: allow side-effect CSS import when no type declarations are present
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: 'AparecidaShop — comércio local de Aparecida-SP',
  description:
    'Encontre lojas e produtos do comércio local de Aparecida-SP e conecte-se diretamente com os estabelecimentos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>
          <Providers>{children}</Providers>
          </main>
        <Footer />
      </body>
    </html>
  );
}
