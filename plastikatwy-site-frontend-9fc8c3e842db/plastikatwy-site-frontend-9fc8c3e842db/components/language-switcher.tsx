"use client";

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { twMerge } from 'tailwind-merge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface Language {
  locale: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  {
    locale: 'pt-BR',
    name: 'Português',
    flag: '🇧🇷'
  },
  {
    locale: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  {
    locale: 'es',
    name: 'Español',
    flag: '🇪🇸'
  }
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

export default function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);

  // Atualizar idioma atual quando o componente carregar
  useEffect(() => {
    const lang = languages.find(lang => lang.locale === locale);
    setCurrentLanguage(lang || languages[0]);
  }, [locale]);

  // Função para alterar o idioma
  const switchLanguage = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  // Se o idioma atual ainda não foi carregado
  if (!currentLanguage) return null;

  // Versão minimalista (apenas ícones)
  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={twMerge("px-2", className)}>
            <span className="text-lg">{currentLanguage.flag}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.locale}
              onClick={() => switchLanguage(lang.locale)}
              className={twMerge(
                "cursor-pointer",
                locale === lang.locale ? "font-bold" : ""
              )}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Versão completa (texto + ícones)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={twMerge("flex items-center gap-1", className)}
        >
          <span className="text-lg mr-1">{currentLanguage.flag}</span>
          {currentLanguage.name}
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.locale}
            onClick={() => switchLanguage(lang.locale)}
            className={twMerge(
              "cursor-pointer flex items-center gap-2",
              locale === lang.locale ? "font-bold" : ""
            )}
          >
            <span className="text-lg">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
