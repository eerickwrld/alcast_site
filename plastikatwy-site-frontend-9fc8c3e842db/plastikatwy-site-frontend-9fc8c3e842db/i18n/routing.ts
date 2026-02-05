import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Lista de todos os idiomas suportados
  locales: ['pt-BR', 'en', 'es'],

  // Idioma padrão
  defaultLocale: 'pt-BR',

  // Estratégia de prefixo de locale
  localePrefix: 'as-needed',

  // Mapeamento de rotas para internacionalização
  pathnames: {
    // Sobre Nós
    '/sobre-nos': {
      'pt-BR': '/sobre-nos',
      'en': '/about-us',
      'es': '/quienes-somos'
    },

    // Contato
    '/contato': {
      'pt-BR': '/contato',
      'en': '/contact',
      'es': '/contacto'
    },

    // Blog
    '/blog': {
      'pt-BR': '/blog',
      'en': '/blog',
      'es': '/blog'
    },

    // ESG
    '/esg': {
      'pt-BR': '/esg',
      'en': '/esg',
      'es': '/esg'
    },

    // LME
    '/lme': {
      'pt-BR': '/lme',
      'en': '/lme',
      'es': '/lme'
    },

    // Orçamento
    '/orcamento': {
      'pt-BR': '/orcamento',
      'en': '/quotation',
      'es': '/presupuesto'
    },

    // Produtos
    '/produtos': {
      'pt-BR': '/produtos',
      'en': '/products',
      'es': '/productos'
    },

    // Produtos
    '/produtos/[slug]': {
      'pt-BR': '/produtos/[slug]',
      'en': '/products/[slug]',
      'es': '/productos/[slug]'
    },

    // Segmentos
    '/segmentos': {
      'pt-BR': '/segmentos',
      'en': '/segments',
      'es': '/segmentos'
    }
  }
});
