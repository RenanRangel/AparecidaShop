import type { Store } from '@/types';

/**
 * Dados mockados de lojas.
 *
 * Este arquivo contém APENAS dados, sem funções de consulta. A lógica de
 * acesso (buscar por id, destacar lojas, etc.) vive em
 * `lib/repositories/mock/store.repository.ts`. Quando o Postgres entrar,
 * este arquivo deixa de ser importado — só a implementação do repositório
 * muda.
 */
export const storesFixture: Store[] = [
  {
    id: 'loja-sao-francisco',
    name: 'Loja São Francisco',
    category: 'Artigos religiosos',
    location: 'Galeria Recreio, Centro, Aparecida - SP',
    description:
      'Terços, imagens e medalhas com entrega para todo o Brasil. Uma das lojas mais tradicionais do comércio local.',
    logoInitials: 'SF',
    coverTone: 'pine',
    featured: true,
    verified: true,
    whatsapp: '5512991234001',
    instagram: 'lojasaofrancisco',
  },
  {
    id: 'casa-do-romeiro',
    name: 'Casa do Romeiro',
    category: 'Lembranças e souvenirs',
    location: 'Av. Bom Jesus, Centro, Aparecida - SP',
    description: 'Lembranças, ímãs, chaveiros e presentes para levar um pedaço de Aparecida para casa.',
    logoInitials: 'CR',
    coverTone: 'marigold',
    verified: true,
    whatsapp: '5512991234002',
    instagram: 'casadoromeiro',
  },
  {
    id: 'atelie-mantiqueira',
    name: 'Ateliê Mantiqueira',
    category: 'Decoração',
    location: 'Rua Manoel Alves, Centro, Aparecida - SP',
    description: 'Peças de decoração artesanal inspiradas na Serra da Mantiqueira e no Vale do Paraíba.',
    logoInitials: 'AM',
    coverTone: 'sand',
    whatsapp: '5512991234003',
    instagram: 'ateliemantiqueira',
  },
  {
    id: 'doceria-vale',
    name: 'Doceria do Vale',
    category: 'Alimentação',
    location: 'Rua Marechal Deodoro, Centro, Aparecida - SP',
    description: 'Doces caseiros, café e quitutes típicos da região do Vale do Paraíba.',
    logoInitials: 'DV',
    coverTone: 'marigold',
    verified: true,
    whatsapp: '5512991234004',
    instagram: 'docariadovale',
  },
  {
    id: 'bazar-caminho-luz',
    name: 'Bazar Caminho de Luz',
    category: 'Acessórios',
    location: 'Galeria Pátio Aparecida, Centro, Aparecida - SP',
    description: 'Bijuterias, bolsas e acessórios variados a preços acessíveis para todos os públicos.',
    logoInitials: 'BC',
    coverTone: 'pine',
    whatsapp: '5512991234005',
    instagram: 'bazarcaminhodeluz',
  },
  {
    id: 'moda-serra',
    name: 'Moda Serra',
    category: 'Vestuário',
    location: 'Rua Direita, Centro, Aparecida - SP',
    description: 'Roupas, camisetas personalizadas e moda casual para o dia a dia e para levar de lembrança.',
    logoInitials: 'MS',
    coverTone: 'sand',
    whatsapp: '5512991234006',
    instagram: 'modaserraoficial',
  },
];
