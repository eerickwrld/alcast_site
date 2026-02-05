import type React from "react"
import type { Metadata } from "next"
import {getTranslations} from "next-intl/server";
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {PageResponse} from "@/services/types";
import {getProductBySlug} from "@/services/api";

export async function generateMetadata({params}) {
  const {locale, slug} = await params;
  let pageData: PageResponse = {};

  try {
    pageData = await getProductBySlug(slug, locale);
  } catch (error) {
    console.error('Erro ao buscar dados do produto:', error);
  }

  if (!pageData) {
    return {
      title: "Produto não encontrado",
      description: "",
    }
  }

  return {
    title: getContentByLanguage(pageData?.name, locale),
    description: getContentByLanguage(pageData?.banner_description, locale),
  };
}

export default function PageLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
