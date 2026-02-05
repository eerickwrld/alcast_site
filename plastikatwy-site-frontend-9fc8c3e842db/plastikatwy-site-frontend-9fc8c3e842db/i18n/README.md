# Documentação de Internacionalização (i18n) - Alcast

Este documento explica como funciona a internacionalização no projeto Alcast usando o next-intl.

## Estrutura de Arquivos

```
/alcast
  ├── i18n/
  │   ├── navigation.ts    # Wrappers para a navegação com suporte a idiomas
  │   ├── request.ts       # Configuração para carregamento das mensagens
  │   └── routing.ts       # Configuração de rotas e idiomas suportados
  ├── messages/
  │   ├── pt-BR/           # Mensagens em português
  │   │   └── index.json
  │   ├── en/              # Mensagens em inglês
  │   │   └── index.json
  │   └── es/              # Mensagens em espanhol
  │       └── index.json
  ├── app/
  │   └── [locale]/        # Estrutura de páginas com segmento dinâmico para idiomas
  └── components/
      └── language-switcher.tsx  # Componente de troca de idioma
```

## Idiomas Suportados

O site atualmente suporta três idiomas:
- Português (Brasil) - `pt-BR` (padrão)
- Inglês - `en`
- Espanhol - `es`

## Como Funciona

1. **Middleware**: O sistema utiliza um middleware que detecta o idioma através da URL (`/pt-BR/`, `/en/`, `/es/`). O idioma padrão é português (pt-BR).

2. **Roteamento**: As rotas são definidas com um segmento dinâmico `[locale]` que captura o idioma atual da URL.

3. **Carregamento de mensagens**: As mensagens são carregadas dinamicamente com base no locale atual a partir dos arquivos JSON na pasta `/messages/`.

4. **Troca de idioma**: O componente `LanguageSwitcher` permite que os usuários troquem o idioma do site, atualizando a URL e mantendo o caminho atual.

## Como Usar

### Para adicionar traduções

1. Adicione suas chaves de tradução aos arquivos JSON na pasta `/messages/` para todos os idiomas suportados:
   - `/messages/pt-BR/index.json` (português)
   - `/messages/en/index.json` (inglês)
   - `/messages/es/index.json` (espanhol)

### Para usar traduções em componentes React

Use o hook `useTranslations` para acessar as mensagens:

```tsx
import { useTranslations } from 'next-intl';

export default function MeuComponente() {
  const t = useTranslations('namespace');
  
  return <h1>{t('chave')}</h1>;
}
```

### Para usar traduções em componentes Server

Use a função `getTranslations` do servidor:

```tsx
import { getTranslations } from 'next-intl/server';

export default async function MinhaPaginaServidor() {
  const t = await getTranslations('namespace');
  
  return <h1>{t('chave')}</h1>;
}
```

### Para criar links que preservam o idioma

Use o componente `Link` do next-intl ao invés do Link padrão do Next.js:

```tsx
import { Link } from '@/i18n/navigation';

export default function MeuComponente() {
  return (
    <Link href="/sobre">Ir para Sobre</Link>
  );
}
```

## Adicionando um novo idioma

Para adicionar suporte a um novo idioma:

1. Adicione o novo código de idioma ao array `locales` em `i18n/routing.ts`
2. Crie uma pasta para o idioma em `/messages/` (por exemplo, `/messages/fr/` para francês)
3. Adicione um arquivo `index.json` com todas as traduções necessárias
4. Adicione o idioma ao componente `LanguageSwitcher`

## Dicas e Boas Práticas

1. Sempre organize as traduções em namespaces lógicos (como 'common', 'blog', 'navigation', etc.)
2. Mantenha as mesmas chaves em todos os arquivos de idioma para evitar erros
3. Para textos longos, considere usar markdown ou HTML nos arquivos de tradução
4. Use variáveis nas traduções quando necessário: `t('greeting', { name: 'João' })`
