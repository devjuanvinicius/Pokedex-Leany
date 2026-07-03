# Pokédex

Aplicação web de Pokédex construída em React, consumindo a [PokéAPI](https://pokeapi.co).
Permite listar, buscar, filtrar, favoritar, comparar e explorar detalhes e a
cadeia evolutiva dos Pokémon.

**Deploy:** https://pokedex-leany.vercel.app/

## Funcionalidades

- **Listagem** com nome, número, sprite e tipos, e botão **"Carregar mais"**.
- **Detalhes** em rota dedicada (`/pokemon/:id`): sprite, tipos, descrição,
  peso, altura, categoria, habilidade, gênero, **fraquezas** e **cadeia de
  evolução** clicável (com níveis).
- **Favoritar/desfavoritar** (estado global) com **página de favoritos** e
  gesto de _swipe-to-delete_.
- **Busca por nome** e **filtro por tipo** (bottom sheet), além de ordenação.
- **Comparação** de dois Pokémon (`/comparar`) com estatísticas base lado a lado.
- **Persistência** de favoritos e preferências (tipo/ordem) via `localStorage`.
- **Responsivo** (mobile e desktop) e UI da listagem fiel ao Figma.

## Stack

| Camada          | Tecnologia                         |
| --------------- | ---------------------------------- |
| Build/Framework | Vite + React 18 + TypeScript       |
| Estado global   | Zustand (com middleware `persist`) |
| Data fetching   | TanStack Query (React Query)       |
| Roteamento      | TanStack Router (rotas type-safe)  |
| Estilização     | Tailwind CSS v4                    |
| Testes          | Vitest + React Testing Library     |
| Qualidade       | ESLint + Prettier                  |

## Rodando localmente

Pré-requisitos: **Node 18+** e npm.

```bash
git clone https://github.com/devjuanvinicius/Pokedex-Leany.git
cd Pokedex-Leany
npm install
npm run dev      # inicia em http://localhost:5173
```

Scripts:

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção (checa tipos com tsc)
npm run preview  # pré-visualiza o build
npm run lint     # ESLint
npm run test     # Vitest
```

## Observações técnicas

### Tipagem forte (TypeScript)

- **Sem `any`.** As respostas da PokeAPI têm interfaces dedicadas em
  [`src/types/pokeapi.ts`](src/types/pokeapi.ts), refletindo apenas os campos
  usados. Os campos em `snake_case` são propositais (espelham o JSON da API).
- **Generics** no cliente HTTP (`fetchFromPokeApi<T>`) e nas queries
  (`useQuery<T>`), garantindo dados tipados ponta a ponta.
- **Rotas type-safe** com TanStack Router: parâmetros e `Link`/`params` são
  verificados em tempo de compilação.
- Tipos utilitários e uniões literais (ex.: `SortOrder`, `GenderRatio`) para
  modelar estados de forma explícita.

### Arquitetura

- **TanStack Query** cuida de cache, deduplicação e estados de carregamento das
  requisições — dados da API não são duplicados no estado global.
- **Zustand + `persist`** guarda apenas estado do cliente que precisa sobreviver
  ao reload: favoritos e preferências de listagem.
- **Busca/filtro/ordenação** operam sobre a lista completa de nomes (uma única
  requisição em `useAllPokemon`), com paginação feita no cliente. O detalhe de
  cada card é buscado sob demanda e cacheado.
- **Fraquezas** são calculadas a partir das relações de dano dos tipos do
  Pokémon (`computeWeaknesses`), combinando os multiplicadores de cada tipo.

### PokéAPI e português

A PokéAPI registra o idioma `pt-br`, mas **não** possui dados traduzidos para ele
(nem nomes de tipo, nem descrições). Por isso:

- Os **nomes dos tipos** e dos **status** são traduzidos por um mapa estático em
  [`src/lib/pokemon.ts`](src/lib/pokemon.ts).
- A **descrição** e a **categoria** do Pokémon são exibidas em **inglês** (único
  idioma disponível para esses campos na API).

## Testes

Testes unitários das funções de domínio (formatação, tradução, cálculo de
fraquezas, cadeia de evolução), da store de favoritos e de interação de
componente (favoritar). Rode com `npm run test`.

## Deploy

Projeto pronto para deploy na **Vercel** (SPA). O arquivo
[`vercel.json`](vercel.json) redireciona todas as rotas para `index.html`, para
que as rotas do cliente funcionem em _refresh_/acesso direto.
