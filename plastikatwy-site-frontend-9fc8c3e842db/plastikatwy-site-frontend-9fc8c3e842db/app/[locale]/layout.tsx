import type React from "react"
import "../globals.css"
import {HeroUIProvider} from "@heroui/react";
import {NextIntlClientProvider} from "next-intl";
import {LanguageProvider} from "@/contexts/language-context";
import {ConfigProvider} from "@/contexts/config-context";
import {notFound} from "next/navigation";
import {getConfig, getMenuBySlug} from "@/services/api";
import {ConfigData} from "@/services/types";

export const metadata = {
  title: "Alcast Laminados de Alumínio",
  description: "Soluções em alumínio transformado para um mundo de possibilidades.",
  icon: "/favicon.ico"
}

// Define os locales suportados
const locales = ['pt-BR', 'en', 'es'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function RootLayout({
                                           children,
                                           params
                                         }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const pageParams = await params

  // Valida se o locale é suportado
  if (!locales.includes(pageParams?.locale as any)) notFound();

  // Carrega as mensagens para o locale atual
  let messages;
  try {
    messages = (await import(`../../messages/${pageParams?.locale}/index.json`)).default;
  } catch (error) {
    notFound();
  }

  // Busca as configurações da API
  let configData: ConfigData | null = null;

  try {
    configData = await getConfig();
    let principalMenu = await getMenuBySlug('menu-principal', pageParams?.locale);
    let navigationMenu = await getMenuBySlug('menu-navegacao', pageParams?.locale);
    let servicesMenu = await getMenuBySlug('menu-servicos', pageParams?.locale);

    configData = {
      ...(configData || []),
      menus: {
        principal: {
          ...(principalMenu || [])
        },
        navigation: {
          ...(navigationMenu || [])
        },
        services: {
          ...(servicesMenu || [])
        },
      }
    }
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
  }

  return (
    <html lang={pageParams?.locale} suppressHydrationWarning>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
    </head>
    <body className="font-manrope">
    <NextIntlClientProvider locale={pageParams?.locale} messages={messages}>
      <LanguageProvider>
        <ConfigProvider initialConfig={configData}>
          <HeroUIProvider>
            {children}
          </HeroUIProvider>
        </ConfigProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  )
}
