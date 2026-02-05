"use client"

import {useEffect, useState, Suspense} from "react"
import {useParams, useSearchParams} from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogHero from "@/components/blog/blog-hero"
import BlogCard from "@/components/blog/blog-card"
import CategoriesList from "@/components/blog/categories-list"
import Pagination from "@/components/blog/pagination"
import {getBlogPosts, getBlogCategories} from "@/services/api"
import {getContentByLanguage} from "@/helpers/getContentByLanguage"
import {useLanguage} from "@/contexts/language-context"
import {Skeleton} from "@/components/ui/skeleton"
import {BlogCategory} from "@/services/types"
import {useTranslations} from "next-intl";

export default function CategoryPage() {
  // Estados para armazenar dados
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [currentCategory, setCurrentCategory] = useState<BlogCategory | null>(null)
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 9,
    total: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Obter parâmetros da URL
  const params = useParams()
  const searchParams = useSearchParams()
  const categorySlug = params?.slug as string
  const currentPage = searchParams?.get('page') ? parseInt(searchParams.get('page')!) : 1

  // Obter o idioma atual do contexto
  const {language} = useLanguage()
  const t = useTranslations("common")

  // Buscar categorias
  useEffect(() => {
    async function loadCategories() {
      try {
        const apiCategories = await getBlogCategories()
        
        if (apiCategories && apiCategories.length > 0) {
          setCategories(apiCategories)
          
          // Encontrar a categoria atual
          const foundCategory = apiCategories.find(cat => 
            getContentByLanguage(cat.slug, language) === categorySlug
          )
          
          if (foundCategory) {
            setCurrentCategory(foundCategory)
          }
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error)
      }
    }

    loadCategories()
  }, [categorySlug, language])

  // Buscar posts da categoria
  useEffect(() => {
    async function loadCategoryPosts() {
      setIsLoading(true)
      setError(false)

      try {
        const blogData = await getBlogPosts(currentPage, 9, categorySlug)
        setPosts(blogData.posts || [])
        setPagination(blogData.pagination || {
          current_page: 1,
          last_page: 1,
          per_page: 9,
          total: 0
        })
      } catch (err) {
        console.error("Erro ao carregar posts da categoria:", err)
        setError(true)
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCategoryPosts()
  }, [categorySlug, currentPage])

  // Atualizar título da página quando a categoria mudar
  useEffect(() => {
    if (currentCategory) {
      const categoryName = getContentByLanguage(currentCategory.name, language)
      document.title = `${categoryName} - Blog Alcast`
    } else {
      document.title = "Categoria - Blog Alcast"
    }
  }, [currentCategory, language])

  // Renderizar esqueletos durante carregamento
  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header/>
        <Skeleton className="h-64 w-full"/>
        <div className="container px-4 md:px-6 mx-auto py-12">
          <Skeleton className="h-10 w-full max-w-md mb-8"/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-lg"/>
            ))}
          </div>
        </div>
        <Footer/>
      </main>
    )
  }

  // Verificar se há posts
  const hasPosts = posts.length > 0

  const categoryName = currentCategory ? getContentByLanguage(currentCategory.name, language) : "Categoria"
  const categoryDescription = t("articleByCategory")

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header/>

      <BlogHero
        title={`${t("category")}: ${categoryName}`}
        subtitle={categoryDescription}
      />

      <section className="py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <CategoriesList
            categories={categories}
            activeCategory={categorySlug}
          />

          {/* Grid de posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasPosts && posts.map((post) => (
              <BlogCard key={post.id} post={post}/>
            ))}

            {/* Mensagem se não houver posts */}
            {!hasPosts && !isLoading && (
              <div className="text-center py-16 col-span-full">
                <h3 className="text-xl font-semibold mb-2">{t("notFoundArticles")}</h3>
                <p className="text-gray-600">
                  {t("notFoundArticlesDescription")}
                </p>
              </div>
            )}

            {/* Mensagem de erro */}
            {/*{error && (*/}
            {/*  <div className="text-center py-16 col-span-full">*/}
            {/*    <h3 className="text-xl font-semibold mb-2 text-red-600">Erro ao carregar artigos</h3>*/}
            {/*    <p className="text-gray-600">*/}
            {/*      Ocorreu um erro ao carregar os artigos desta categoria. Tente novamente mais tarde.*/}
            {/*    </p>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>

          {/* Paginação */}
          {hasPosts && pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.last_page}
              basePath={`/blog/categoria/${categorySlug}`}
            />
          )}
        </div>
      </section>

      <Footer/>
    </main>
  )
}
