# Movie Search

App de busca de filmes consumindo a [TMDB API](https://www.themoviedb.org/documentation/api), feito com React + Vite.

## Funcionalidades

- Lista os filmes populares ao abrir
- Busca por título
- Paginação com "Carregar mais"
- Modal com detalhes do filme (sinopse, nota, ano)

## Rodando localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e preencha com sua chave da TMDB API (crie uma gratuitamente em [themoviedb.org](https://www.themoviedb.org/settings/api)):

   ```bash
   cp .env.example .env
   ```

3. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a build de produção
- `npm run preview` — serve a build de produção localmente
- `npm run lint` — roda o ESLint

## Stack

- React + Vite
- CSS puro (sem Tailwind, sem bibliotecas de UI)
- Fetch API nativo
