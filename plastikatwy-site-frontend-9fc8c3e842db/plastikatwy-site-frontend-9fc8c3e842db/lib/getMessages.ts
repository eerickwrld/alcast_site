import {getRequestConfig} from 'next-intl/server';

// Define um tipo para as mensagens para facilitar a importação
export type Messages = typeof import('../messages/pt-BR/index.json');

export default getRequestConfig(async ({locale}) => {
  // Carregamento dinâmico baseado no locale
  const messages = (await import(`../messages/${locale}/index.json`)).default as Messages;
  
  return {
    messages
  };
});
