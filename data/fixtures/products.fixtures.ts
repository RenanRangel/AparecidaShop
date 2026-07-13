import type { Product } from '@/types';

/**
 * Dados mockados de produtos.
 *
 * Este arquivo contém APENAS dados, sem funções de consulta. Note que não
 * existe `storeName` aqui — o nome da loja é resolvido pelo repositório a
 * partir de `storeId`, exatamente como aconteceria com uma junção (JOIN)
 * numa tabela relacional no Postgres.
 */
export const productsFixture: Product[] = [
  {
    id: 'terco-madeira',
    name: 'Terço em madeira',
    storeId: 'loja-sao-francisco',
    price: 25,
    imageTone: 'pine',
    category: 'Artigos religiosos',
  },
  {
    id: 'imagem-nsa',
    name: 'Imagem de Nossa Senhora Aparecida',
    storeId: 'loja-sao-francisco',
    price: 89,
    imageTone: 'sand',
    category: 'Artigos religiosos',
  },
  {
    id: 'medalha-prateada',
    name: 'Medalha prateada',
    storeId: 'loja-sao-francisco',
    price: 18,
    imageTone: 'marigold',
    category: 'Artigos religiosos',
  },
  {
    id: 'ima-geladeira',
    name: 'Ímã de geladeira Aparecida',
    storeId: 'casa-do-romeiro',
    price: 12,
    imageTone: 'marigold',
    category: 'Lembranças e souvenirs',
  },
  {
    id: 'chaveiro-basilica',
    name: 'Chaveiro Basílica',
    storeId: 'casa-do-romeiro',
    price: 9,
    imageTone: 'pine',
    category: 'Lembranças e souvenirs',
  },
  {
    id: 'camiseta-devocao',
    name: 'Camiseta estampada',
    storeId: 'moda-serra',
    price: 45,
    imageTone: 'sand',
    category: 'Vestuário',
  },
  {
    id: 'vaso-ceramica',
    name: 'Vaso de cerâmica artesanal',
    storeId: 'atelie-mantiqueira',
    price: 65,
    imageTone: 'sand',
    category: 'Decoração',
  },
  {
    id: 'doce-leite',
    name: 'Doce de leite artesanal',
    storeId: 'doceria-vale',
    price: 22,
    imageTone: 'marigold',
    category: 'Alimentação',
  },
  {
    id: 'brinco-artesanal',
    name: 'Brinco artesanal',
    storeId: 'bazar-caminho-luz',
    price: 15,
    imageTone: 'pine',
    category: 'Acessórios',
  },
  {
    id: 'porta-retrato',
    name: 'Porta-retrato rústico',
    storeId: 'atelie-mantiqueira',
    price: null,
    imageTone: 'pine',
    category: 'Decoração',
  },
];
