import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({locale: requestLocale, pathname}) => {
  // Typically corresponds to the `[locale]` segment
  const locale = hasLocale(routing.locales, requestLocale)
    ? requestLocale
    : routing.defaultLocale;

  // Carrega as mensagens padrão (comuns a todas as páginas)
  const baseMessages = (await import(`../messages/${locale}/index.json`)).default;
  
  // Determina qual namespace adicional carregar com base no pathname
  let pageSpecificMessages = {};
  
  try {
    if (pathname?.includes('/blog')) {
      // Tenta carregar mensagens específicas do blog, se disponíveis
      pageSpecificMessages = (await import(`../messages/${locale}/blog.json`)).default;
    }
    // Adicione outros caminhos específicos aqui
  } catch (error) {
    // Silenciosamente ignora se o arquivo específico não existir
    console.log('Aviso: Mensagens específicas não encontradas');
  }

  return {
    locale,
    // Mescla as mensagens base com as específicas da página
    messages: {
      ...baseMessages,
      ...pageSpecificMessages
    },
    // Use o formato de data padrão do idioma
    timeZone: 'America/Sao_Paulo',
    now: new Date(),
  };
});
