"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {usePathname, useRouter} from "@/i18n/navigation";
import {useLocale} from "next-intl";
import EnFlag from '@/public/en-flag.svg'
import EsFlag from '@/public/es-flag.svg'
import BrFlag from '@/public/br-flag.svg'

// Define available languages
export type Language = 'pt-BR' | 'en' | 'es';

// Define language interface
export interface LanguageOption {
  code: Language;
  name: string;
  flag: React.ReactNode;
}

// Available languages configuration
export const availableLanguages: LanguageOption[] = [
  {
    code: 'pt-BR',
    name: 'Português',
    flag: <img src={BrFlag.src} width={20} height={20} alt={"EN FLAG"} />
  },
  {
    code: 'en',
    name: 'English',
    flag: <img src={EnFlag.src} width={20} height={20} alt={"EN FLAG"} />
  },
  {
    code: 'es',
    name: 'Español',
    flag: <img src={EsFlag.src} width={20} height={20} alt={"EN FLAG"} />
  }
];

// Context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  getLanguageOption: (code: Language) => LanguageOption;
  availableLanguages: LanguageOption[];
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-BR',
  setLanguage: () => {},
  getLanguageOption: () => availableLanguages[0],
  availableLanguages: availableLanguages
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Obtém o idioma atual da URL usando next-intl
  const currentLocale = useLocale() as Language;
  const [language, setLanguageState] = useState<Language>(currentLocale);
  const router = useRouter();
  const pathname = usePathname();

  // Sincroniza o estado com o locale da URL sempre que mudar
  useEffect(() => {
    if (currentLocale !== language) {
      setLanguageState(currentLocale);
    }
  }, [currentLocale, language]);

  // Função para atualizar o idioma - principalmente para manter a compatibilidade
  // com o resto do código que usa este contexto
  const setLanguage = (newLanguage: Language) => {
    if (newLanguage !== language) {
      setLanguageState(newLanguage);

      // const newPath = pathname?.replace(/^\/[a-z]{2}/, `/${newLanguage}`);
      // router.replace(newPath, {scroll: false});
      // A navegação é feita no componente que chama setLanguage
      // Não é necessário fazer navegação aqui
    }
  };

  // Função auxiliar para obter opções do idioma pelo código
  const getLanguageOption = (code: Language): LanguageOption => {
    return availableLanguages.find(lang => lang.code === code) || availableLanguages[0];
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      getLanguageOption,
      availableLanguages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
