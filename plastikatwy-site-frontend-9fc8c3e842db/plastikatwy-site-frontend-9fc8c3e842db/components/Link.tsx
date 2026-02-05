"use client"

import {usePathname} from 'next/navigation';
import NextLink from 'next/link';
import {useLocale} from 'next-intl';
import {routing} from '@/i18n/routing';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  locale?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export function LocalizedLink({
  href,
  children,
  locale: propLocale,
  className = '',
  ...rest
}: LinkProps) {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const locale = propLocale || currentLocale;

  const cleanHref = href
    ? href
      ?.replace(/^http:\/\/159\.89\.230\.73:3000\/([a-z-]{2,5})?/, (_, locale) => locale ? `/${locale}` : "")
    : ""

  // Se for um link externo, retorna um link normal
  // if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')) {
  //   return (
  //     <a href={href} className={className} {...rest}>
  //       {children}
  //     </a>
  //   );
  // }

  // Encontra a chave de rota correspondente
  const getLocalizedPath = (path: string) => {
    // Se for a rota raiz, retorna com o locale
    if (path === '/') return `/${locale === 'pt-BR' ? '' : locale}`;

    // Encontra a chave de rota correspondente
    const routeKey = Object.keys(routing.pathnames).find((key) => {
      const pathValue = routing.pathnames[key as keyof typeof routing.pathnames];

      if (typeof pathValue === 'string') {
        return pathValue === path;
      } else if (pathValue) {
        return Object.values(pathValue).includes(path);
      }

      return false;
    });

    // Se encontrou uma rota correspondente, retorna a versão localizada
    if (routeKey) {
      const localizedPath = routing.pathnames[routeKey as keyof typeof routing.pathnames];

      if (typeof localizedPath === 'string') {
        return `${locale === 'pt-BR' ? '' : `${locale}`}${localizedPath}`;
      } else if (localizedPath) {
        const path = localizedPath[locale as keyof typeof localizedPath] || routeKey;
        return `${locale === 'pt-BR' ? '' : `${locale}`}${path}`;
      }
    }

    // Se não encontrou, mantém o caminho original
    return path
  };

  const path = getLocalizedPath(cleanHref);

  const isActive = pathname === path ||
                  (pathname?.startsWith(path) && path !== '/') ||
                  (path === `/${locale}` && pathname === '/');

  return (
    <NextLink
      href={`${typeof window !== "undefined" ? window?.location?.origin + path : path}`}
      className={`${className} ${isActive ? 'active' : ''}`}
      locale={locale}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
