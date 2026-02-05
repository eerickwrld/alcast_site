import React, {Suspense} from "react"
import type { Metadata } from "next"
import {getTranslations} from "next-intl/server";
import {getPageBySlug} from "@/services/api";

export async function generateMetadata({params}) {
  const {locale} = await params;
  const metadata = await getPageBySlug('blog', locale);

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
  return (
    <Suspense>
      {children}
    </Suspense>
  )
}
