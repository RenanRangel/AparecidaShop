# AparecidaShop

AparecidaShop é uma plataforma web desenvolvida para conectar turistas e consumidores ao comércio local de Aparecida-SP.

O projeto nasceu como um catálogo digital de lojas e produtos, permitindo que comerciantes tenham uma presença online e que visitantes encontrem facilmente estabelecimentos, produtos e informações de contato.

Nesta etapa, o sistema está passando da fase de protótipo para uma aplicação completa, utilizando banco de dados real, autenticação de usuários e uma arquitetura preparada para crescimento.

---

## Stack

### Front-end

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React

### Back-end

- Prisma ORM
- PostgreSQL
- NextAuth.js (Auth.js v5)
- bcryptjs

---

## Como rodar

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/aparecidashop"
AUTH_SECRET="sua-chave"
AUTH_URL="http://localhost:3000"
```

Execute o banco (PostgreSQL) e sincronize o Prisma:

```bash
npx prisma db push
```

Popular o banco com dados iniciais:

```bash
npx prisma db seed
```

Executar o projeto:

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## Estrutura

```
app/
│
├── page.tsx                    → Página inicial
├── lojas/                      → Diretório de lojas
├── lojas/[storeId]/            → Página individual da loja
├── para-lojas/                 → Cadastro institucional
├── sobre/                      → Sobre o projeto
├── login/                      → Autenticação
└── cadastro/                   → Cadastro de usuários

components/
│
├── home/
├── layout/
├── lojas/
├── shared/
└── forms/

lib/
│
├── repositories/
│   ├── mock/
│   ├── prisma/
│   └── index.ts
│
└── utils.ts

prisma/
│
├── schema.prisma
├── seed.ts
└── migrations/

generated/
└── prisma/

types/

public/
```

---

## Arquitetura

O projeto utiliza o padrão **Repository Pattern**, separando a interface da camada de acesso aos dados.

```
Página

↓

Repository

↓

Prisma

↓

PostgreSQL
```

Essa arquitetura permite substituir facilmente a origem dos dados (Mock → PostgreSQL) sem alterar os componentes da interface.

---

## Banco de dados

O banco foi modelado utilizando Prisma ORM.

Principais entidades:

- Usuários
- Lojas
- Produtos
- Categorias
- Administradores de lojas
- Histórico de aprovação
- Favoritos
- Avaliações
- Auditoria
- Imagens de produtos

A modelagem foi planejada para permitir evolução futura sem necessidade de grandes alterações estruturais.

---

## Funcionalidades atuais

- Página inicial
- Busca de lojas
- Diretório de lojas
- Página individual de cada loja
- Listagem de produtos
- Cadastro de usuários
- Autenticação
- Banco PostgreSQL integrado
- Seed para popular o banco
- Arquitetura baseada em Repository Pattern

---

## Em desenvolvimento

- Painel do lojista
- Cadastro de lojas
- CRUD de produtos
- Upload de imagens
- Aprovação de lojas
- Painel administrativo
- Dashboard
- Sistema de avaliações
- Favoritos
- Estatísticas de acesso

---

## Identidade visual

A identidade visual foi desenvolvida pensando em transmitir confiança e modernidade ao comércio local.

### Paleta

- Verde-pinho (`#1F5C4A`)
- Marigold (`#E8A33D`)
- Branco-sálvia (`#F1F4EF`)

### Tipografia

- Bricolage Grotesque
- Inter
- IBM Plex Mono

---

## Próximos passos

- Finalizar autenticação completa
- Desenvolver painel do lojista
- Cadastro e gerenciamento de produtos
- Upload de imagens
- Painel administrativo
- Deploy do banco em ambiente de produção
- Integração com armazenamento de imagens
- Expansão para outras cidades

---

## Objetivo do projeto

Mais do que um simples catálogo de lojas, o AparecidaShop busca oferecer aos comerciantes locais uma presença digital profissional, permitindo que turistas encontrem produtos e estabelecimentos antes mesmo de chegar à cidade.

O projeto foi desenvolvido visando escalabilidade, permitindo futuramente incluir novas cidades, diferentes perfis de usuários e novas funcionalidades sem necessidade de reestruturação da arquitetura.

---

## Autor

**Renan Augusto Rangel**

Projeto desenvolvido como iniciativa de desenvolvimento Full Stack utilizando Next.js, Prisma e PostgreSQL.