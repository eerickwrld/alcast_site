import type React from "react"
import type { Metadata } from "next"
import {getTranslations} from "next-intl/server";
import {getPageBySlug} from "@/services/api";
import {localePagePathname} from "@/helpers/localePagePathname";

export async function generateMetadata({params}) {
  const {locale} = await params;
  const metadata = await getPageBySlug(localePagePathname("/esg", locale), locale);

  if (metadata?.meta_title) {
    return {
      title: metadata?.meta_title,
      description: metadata?.meta_description,
    };
  }

  return {}
}

export default function PageLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
