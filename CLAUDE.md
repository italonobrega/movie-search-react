# Movie Search — React

App de busca de filmes consumindo a TMDB API (The Movie Database).

## Stack
- React + Vite
- CSS puro (sem Tailwind, sem bibliotecas de UI)
- Fetch API nativo
- Chave da API via variável de ambiente (.env)

## Convenções

### Commits
Conventional Commits em inglês:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `style:` mudança visual
- `refactor:` reorganização sem mudar comportamento
- `docs:` documentação
- `chore:` configuração e manutenção

### Código
- Componentes funcionais com Hooks (sem class components)
- Um componente por arquivo, em `src/components/`
- Nome de componente em PascalCase, arquivo com mesmo nome
- Comentários em português

### O que evitar
- Não instalar bibliotecas sem eu pedir
- Não usar TypeScript neste projeto
- Não criar abstrações prematuras
- Nunca commitar a chave da API

## Contexto do aprendiz
Estou aprendendo React vindo de JavaScript puro. Explique o "porquê" das
decisões, não só o "como". Quando sugerir algo novo, compare com como
seria em JS vanilla.

Prefiro entender e escrever o código eu mesmo — me ajude a revisar,
explicar e depurar em vez de escrever tudo por mim.