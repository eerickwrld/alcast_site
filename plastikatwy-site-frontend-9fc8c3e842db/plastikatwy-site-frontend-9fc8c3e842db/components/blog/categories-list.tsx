"use client"

import {twMerge} from "tailwind-merge"
import {BlogCategory} from "@/services/types"
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {useLanguage} from "@/contexts/language-context";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

interface CategoriesListProps {
  categories: BlogCategory[]
  activeCategory?: string
  className?: string
}

export default function CategoriesList({categories, activeCategory, className}: CategoriesListProps) {
  const {language} = useLanguage()
  const t = useTranslations("common")


  return (
    <div className={twMerge("flex flex-wrap gap-2 mb-8", className)}>
      <Link
        href="/blog"
        className={twMerge(
          "px-4 py-2 text-sm font-medium rounded-full transition-colors",
          !activeCategory
            ? "text-white bg-primary hover:bg-opacity-75"
            : "text-gray-800 bg-gray-100 hover:bg-gray-200"
        )}
      >
        {t("all")}
      </Link>

      {categories?.map((category) => {
        return (
          <Link
            key={category.id}
            href={`/blog/categoria/${getContentByLanguage(category.slug, language)}`}
            className={twMerge(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors",
              String(activeCategory).toLowerCase() === String(getContentByLanguage(category.slug, "pt-BR")).toLowerCase()
                ? "bg-primary text-white hover:bg-opacity-75"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
          >
            {getContentByLanguage(category.name, language)}
            <span className="ml-1 text-xs">({category.posts_published_count})</span>
          </Link>
        )
      })}
    </div>
  )
}
