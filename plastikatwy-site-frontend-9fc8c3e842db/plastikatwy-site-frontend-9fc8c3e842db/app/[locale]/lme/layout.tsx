import type React from "react"
import type {Metadata} from "next"
import {getTranslations} from "next-intl/server";

export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'lme'});

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default function PageLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return <>{children}</>
}