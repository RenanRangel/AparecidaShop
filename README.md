# AparecidaShop

Primeira versão da interface da AparecidaShop — plataforma para conectar turistas e
consumidores ao comércio local de Aparecida-SP. Sem carrinho, pagamento ou checkout nesta
fase: o foco é descoberta de lojas e produtos, com dados 100% mockados.

## Stack

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- lucide-react

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura

```
app/
  page.tsx              → Home (Hero + Busca rápida + Lojas em destaque)
  lojas/page.tsx         → Diretório de lojas com filtro por categoria
  para-lojas/page.tsx    → Página institucional + formulário de cadastro
  sobre/page.tsx         → Sobre o fundador (com placeholders)
components/
  layout/                → Navbar (com menu mobile) e Footer
  home/                  → Hero, SearchSection, FeaturedStores
  shared/                → ProductCard, StoreCard, Container
  forms/                 → StoreRegistrationForm
data/                    → products.ts e stores.ts (mocks)
types/                   → tipos Product e Store
lib/utils.ts             → helper cn()
```

## Decisões de identidade visual

- **Paleta**: verde-pinho (`#1F5C4A`) como cor de confiança/marca, marigold (`#E8A33D`) como
  cor de destaque comercial, fundo branco-sálvia (`#F1F4EF`) — evitando tanto o clichê azul e
  dourado "religioso" quanto o clichê bege+terracota "genérico de IA".
- **Tipografia**: Bricolage Grotesque (display) + Inter (corpo) + IBM Plex Mono (rótulos e
  preços).
- **Elemento de assinatura**: o "mural de placas" no Hero — chips de lojas com ícones de
  categoria, levemente rotacionados, simulando a fachada de um centro comercial.

## O que ainda não existe (por design, nesta fase)

- Backend real / persistência de dados — o formulário de `/para-lojas` simula o envio.
- Busca de produtos usa array em memória (`data/products.ts`); pronta para ser trocada por uma
  chamada de API no futuro.
- Sem autenticação, carrinho, pagamento ou frete.

## Próximos passos sugeridos

1. Conectar a uma API real (por exemplo, o back-end em NestJS já estruturado anteriormente)
   substituindo os arquivos em `data/` por chamadas `fetch`.
2. Página de detalhe de produto e de loja (`/lojas/[id]`, `/produtos/[id]`).
3. Upload de imagens reais para produtos e lojas.
4. Preparar a estrutura para múltiplas cidades (o texto e os componentes já não têm nenhuma
   referência hardcoded a "Aparecida" fora do conteúdo, então a expansão é só de dados).
