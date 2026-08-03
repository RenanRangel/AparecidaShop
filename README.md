#5 — README atualizado

Vou escrever um README que reflete o projeto real de hoje — Postgres, Prisma, autenticação, painel do lojista — em vez da versão "só mockado" que estava lá. Substitui o README.md inteiro por este:

markdown
# AparecidaShop

Vitrine digital para o comércio local de Aparecida-SP: visitantes descobrem lojas e produtos
por categoria ou busca; lojistas se cadastram, fazem login e gerenciam sua loja num painel
próprio. Next.js 14 (App Router) + TypeScript + Tailwind + PostgreSQL (Prisma) + Auth.js v5.

## Stack

- **Next.js 14** (App Router), React 18, TypeScript
- **PostgreSQL** (hospedado no [Neon](https://neon.tech)) via **Prisma ORM**
- **Auth.js v5** (NextAuth) — autenticação por credenciais (e-mail + senha), sessão JWT
- **Tailwind CSS** — paleta verde-pinho / marigold / areia
- `lucide-react` para ícones

## Como rodar localmente

```bash
npm install
npx prisma generate
npx prisma db seed   # popula categorias + uma loja de exemplo
npm run dev
```

Acesse `http://localhost:3000`. Copie `.env.example` para `.env` e preencha
`DATABASE_URL` (Postgres local ou Neon) e `AUTH_SECRET` (gere com `npx auth secret`).

## Arquitetura

Dados nunca são acessados diretamente pelos componentes — tudo passa por uma camada de
repositórios:

lib/repositories/types.ts → interfaces (StoreRepository, ProductRepository)
lib/repositories/prisma/*.ts → implementação real, contra o Postgres via Prisma
lib/repositories/index.ts → ponto único que instancia e exporta os repositórios
componentes/páginas → importam só de '@/lib/repositories'


Autenticação:

auth.config.ts → config "edge-safe" (sem Prisma/bcrypt) — usada pelo middleware
auth.ts → config completa (Credentials provider, bcrypt, Prisma)
middleware.ts → protege /painel/* e /admin/* usando auth.config.ts


Rotas principais:

app/
page.tsx → Home (Hero dinâmico, busca, lojas em destaque)
lojas/page.tsx → Diretório de lojas, filtro por categoria
lojas/[storeSlug]/page.tsx → Página pública da loja (produtos, contato, mapa)
(auth)/login/page.tsx → Login
(auth)/cadastro/page.tsx → Criação de conta (lojista)
painel/page.tsx → Painel do lojista (protegido)
painel/cadastrar-loja/ → Formulário de cadastro de loja (protegido)
para-lojas/page.tsx → Página institucional pra lojistas


## Banco de dados

Schema completo em `prisma/schema.prisma`. Já inclui suporte para funcionalidades futuras
mesmo não usadas no MVP ainda: múltiplos administradores por loja (`StoreMember`), aprovação
de loja (`StoreStatus` + `StoreStatusHistory`), múltiplas imagens por produto
(`ProductImage`), múltiplas categorias por loja, auditoria genérica (`AuditLog`), favoritos
e avaliações.

Convenção importante: **preço é sempre `Int` em centavos**, nunca `Float`/reais.

## O que já existe

- Cadastro de conta → login → painel do lojista → cadastro de loja (status `PENDING`)
- Diretório de lojas com filtro por categoria e busca de produtos
- Página pública por loja, com WhatsApp, Instagram e mapa incorporado

## O que ainda não existe (por design, nesta fase)

- Aprovação administrativa de lojas (hoje toda loja nova fica `PENDING` sem um painel de
  admin pra mudar isso — só via banco)
- CRUD de produtos pelo lojista (só existe o seed)
- Upload de imagens reais
- Carrinho, pagamento ou frete

## Próximos passos sugeridos

1. Painel admin para aprovar/rejeitar lojas (`StoreStatus`)
2. CRUD de produtos em `/painel/produtos`
3. Upload de imagens (`ProductImage`)
4. Contagem real de visualizações por loja