"use client";

import {Suspense, useState, useEffect} from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog/blog-card"
import CategoriesList from "@/components/blog/categories-list"
import Pagination from "@/components/blog/pagination"
// Import da API de blog
import {fetchBlogPosts, processApiPost} from "@/services/blog-api"
import {getBlogCategories, getPageBySlug} from "@/services/api"
// Import placeholder como fallback
import {placeholderBlogCategories} from "@/lib/placeholder-data"
import {BlogResponse} from "@/services/types"
import HeroSlider from "@/components/hero-slider"
import {useLanguage} from "@/contexts/language-context";
import {useSearchParams} from 'next/navigation'
import {useTranslations} from "next-intl";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const currentPage = searchParams?.get('page') ? parseInt(searchParams?.get('page') as string) : 1
  const categorySlug = searchParams?.get('category')

  // Estados para armazenar dados do blog
  const [blogData, setBlogData] = useState<BlogResponse>({posts: []});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([])
  const [pageData, setPageData] = useState([])

  // Obter o idioma atual do contexto
  const {language} = useLanguage();
  const tc = useTranslations("common");

  // Buscar posts do blog quando a página carregar ou quando o idioma mudar
  useEffect(() => {
    async function loadBlogData() {
      setIsLoading(true);

      try {
        // Buscar posts do blog da API /blog
        const postsData = await fetchBlogPosts(currentPage, 9, categorySlug)
          .catch(error => {
            console.error('Erro ao carregar os posts do blog:', error);
            // Retornar um objeto BlogResponse vazio em caso de erro
            return {posts: []} as BlogResponse;
          });

        setBlogData(postsData);

        const blogPageData = await getPageBySlug('blog', language);

        setPageData(blogPageData);
      } catch (error) {
        console.error('Erro ao carregar os posts:', error);
      }

      setIsLoading(false);
    }

    loadBlogData();
  }, [currentPage, categorySlug]);

  // Buscar categorias do blog
  useEffect(() => {
    async function loadCategories() {
      try {
        const apiCategories = await getBlogCategories();

        if (apiCategories && apiCategories.length > 0) {
          setCategories(apiCategories);
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        // Manter categorias do placeholder em caso de erro
      }
    }

    loadCategories();
  }, []);

  // Verificar se temos posts
  const hasPosts = blogData.posts && blogData.posts.length > 0

  useEffect(() => {
    // Processar os posts para compatibilidade com o componente BlogCard
    const processedPosts = hasPosts ? blogData.posts.map(post => processApiPost(post, language)) : []

    setPosts(processedPosts)
  }, [blogData.posts, language]);

  // Se tivermos ao menos um post, destacar o primeiro
  const featuredPost = hasPosts ? posts[0] : null

  // Posts secundários para o lado direito (2 posts)
  const secondaryPosts = hasPosts ? posts.slice(1, 3) : []

  // Restante dos posts para exibição abaixo
  const remainingPosts = hasPosts ? posts.slice(3) : []

  const heroSlides = [
    {
      image: pageData?.custom_fields_data?.["secao-hero"]?.image,
      title: pageData?.custom_fields_data?.["secao-hero"]?.title,
      subtitle: pageData?.custom_fields_data?.["secao-hero"]?.subtitle,
      description: pageData?.custom_fields_data?.["secao-hero"]?.description,
      descriptionClasses: "text-2xl max-w-lg"
    }
  ]

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header/>

      <HeroSlider showCTA={false} slides={heroSlides} curveColor="#f9fafb"/>

      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <Suspense fallback={<div>{tc("loading")}</div>}>
            <CategoriesList categories={categories}/>
          </Suspense>

          {isLoading ? (
            <div className="py-16 text-center">
              <h3 className="text-xl font-medium text-gray-700">{tc("loading")}</h3>
            </div>
          ) : hasPosts ? (
            <div className="space-y-16">
              {/* Seção destacada - 1 card grande na esquerda e 2 menores na direita */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 mt-10">
                {/* Card principal na esquerda */}
                <div className="lg:col-span-7 row-span-2">
                  {featuredPost && (
                    <BlogCard post={featuredPost} variant="featured"/>
                  )}
                </div>

                {/* Dois cards menores empilhados na direita */}
                <div className="lg:col-span-5 space-y-6">
                  {secondaryPosts.map((post) => (
                    <BlogCard key={post.id} post={post} variant="default"/>
                  ))}
                </div>
              </div>

              {/* Seção para os posts remanescentes abaixo */}
              {remainingPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                  {remainingPosts.map((post) => (
                    <BlogCard key={post.id} post={post} variant="default"/>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Mensagem se não houver posts */
            <div className="py-16 text-center">
              <h3 className="text-xl font-medium text-gray-700">{tc("notFoundArticles")}</h3>
              <p className="mt-2 text-gray-500">{tc("notFoundArticlesDescription")}</p>
            </div>
          )}

          {/* Paginação */}
          {hasPosts && blogData.pagination && (
            <div className="mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={blogData.pagination?.last_page || 1}
                basePath="/blog"
              />
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </main>
  )
}
