# Alcast - Website

Site institucional da Alcast desenvolvido com Next.js 15 e TypeScript.

## Requisitos

- Node.js 18+ 
- Yarn 1.22+

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com as configurações necessárias.

## Variáveis de Ambiente

- `NEXT_PUBLIC_API_URL`: URL da API backend (padrão: https://api.alcast.com.br)

## Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Build

Gere a versão de produção:

```bash
yarn build
```

Inicie o servidor de produção:

```bash
yarn start
```

## Tecnologias

- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript
- **UI**: HeroUI + TailwindCSS
- **Formulários**: React Hook Form + Yup
- **Internacionalização**: next-intl (pt-BR, en, es)
- **API**: React Query (@tanstack/react-query)
- **Datas**: Moment.js

## Estrutura do Projeto

- `/app` - Páginas e rotas do Next.js
- `/components` - Componentes React reutilizáveis
- `/services` - Serviços de API
- `/messages` - Arquivos de tradução (pt-BR, en, es)
- `/public` - Arquivos estáticos
- `/contexts` - Contextos React
- `/hooks` - Hooks personalizados
- `/lib` - Utilitários e configurações

## Deploy

O projeto está configurado para deploy automático via Vercel através do `bitbucket-pipelines.yml`.
