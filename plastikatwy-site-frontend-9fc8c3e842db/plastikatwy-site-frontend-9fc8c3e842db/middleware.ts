import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Configuração do middleware de internacionalização
export default createMiddleware({
  // Lista de locales suportados
  locales: ['pt-BR', 'en', 'es'],

  // Locale padrão
  defaultLocale: 'pt-BR',

  // Estratégia de prefixo de locale
  // 'as-needed' - Não adiciona o locale padrão na URL
  localePrefix: 'as-needed',

  // Mapeamento de rotas para internacionalização
  pathnames: routing.pathnames,

  // Desativa a detecção automática de locale para forçar o uso das rotas definidas
  localeDetection: false
});

// Configuração do middleware
export const config = {
  // Define quais caminhos devem passar pelo middleware
  // Ignora rotas de API, arquivos estáticos e pastas do Next.js
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/', '/(pt-BR|en|es)/:path*'
  ]
};
