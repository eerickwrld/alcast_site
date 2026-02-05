import React, {Suspense} from "react"
import type { Metadata } from "next"
import {getTranslations} from "next-intl/server";
import {getBlogPostBySlug, getPageBySlug} from "@/services/api";
import {getBlogPostBySlugPlaceholder} from "@/lib/placeholder-data";
import {getContentByLanguage} from "@/helpers/getContentByLanguage";

export async function generateMetadata({params}) {
  const {locale, slug} = await params;
  const metadata = await getBlogPostBySlug(params.slug)

  const title = getContentByLanguage(metadata?.title, locale)
  const description = getContentByLanguage(metadata?.description, locale)

  if (title) {
    return {
      title,
      description,
    };
  }

  return {}
}

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}
