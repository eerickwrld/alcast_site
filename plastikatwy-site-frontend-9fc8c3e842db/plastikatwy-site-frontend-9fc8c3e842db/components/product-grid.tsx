"use client"

import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react"
import { getProducts } from "@/services/api"
import { Product } from "@/services/types"
import { useParams } from "next/navigation"
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {useTranslations} from "next-intl";
import {LocalizedLink} from "@/components/Link";

type ProductItemProps = {
  product: Product
  locale: string
}

export function ProductItem({ product, locale }: ProductItemProps) {
  const pathLocalized = getContentByLanguage({
    "pt-BR": "produtos",
    "en": "products",
    "es": "productos",
  }, locale)

  const productUrl = `/${locale}/${pathLocalized}/${getContentByLanguage(product.slug, locale)}`

  return (
    <LocalizedLink
      locale={locale}
      href={productUrl}
      className={twMerge(
        "flex overflow-hidden flex-col justify-between w-full bg-white rounded-lg transition-all lg:max-w-[288px] group",
      )}
    >
      <div className="flex w-full lg:w-[288px] overflow-hidden relative h-[200px] items-center justify-center bg-white p-4">
        <Image
          src={getContentByLanguage(product.image, locale) || "/placeholder.svg"}
          alt={getContentByLanguage(product.name, locale) || ""}
          fill
          className={twMerge(
            "object-cover w-full h-full transition-all group-hover:scale-110",
          )}
        />
      </div>
      <div className="bg-[#F4F4F4] p-4 text-center">
        <h3 className="text-xl font-medium text-[#1A408A]">{getContentByLanguage(product.name, locale)}</h3>
      </div>
    </LocalizedLink>
  )
}

export default function ProductGrid({ removeTitle = false }) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const t = useTranslations("common")
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale || "pt-BR"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const language = locale === "pt-BR" ? "pt_BR" : locale
        const data = await getProducts(language)
        setProducts(data)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [locale])

  return (
    <section className="relative pt-16 pb-32 w-full bg-primary">
      <div className="flex flex-col justify-center items-center container w-full px-4 md:px-6">
        {!removeTitle && <h2 className="mb-8 text-3xl text-light-blue">{t("products")}</h2>}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-blue"></div>
          </div>
        ) : (
          <div className={twMerge(
            "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3",
          )}>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
