"use client"

import {Suspense, useState, useEffect} from "react"
import {useParams} from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PostHero from "@/components/blog/post-hero"
import PostContent from "@/components/blog/post-content"
import RelatedPosts from "@/components/blog/related-posts"
import {getBlogPostBySlug, getRecentBlogPosts} from "@/services/api"
import {getBlogPostBySlugPlaceholder, getRecentBlogPostsPlaceholder} from "@/lib/placeholder-data"
import {useLanguage} from "@/contexts/language-context"
import {Skeleton} from "@/components/ui/skeleton"
import {getContentByLanguage} from "@/helpers/getContentByLanguage"
import AuthorCard from "@/components/blog/author-card"
import NotFound from "@/components/blog/not-found"
import CommentsSection from "@/components/blog/comments-section"
import moment from "@/lib/moment"
import {useFormatter} from "next-intl";

export default function BlogPostPage() {
  // Estados para armazenar dados
  const format = useFormatter()
  const [post, setPost] = useState<any>(null)
  const [postData, setPostData] = useState<any>({
    title: '',
    description: '',
    content: '',
    tags: [],
    category: '',
    formattedDate: '',
    author: {name: 'Equipe Alcast'},
    featuredImage: '/images/blog-hero.png'
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Obter parâmetros da URL
  const params = useParams()
  const slug = params?.slug as string

  // Obter o idioma atual do contexto
  const {language} = useLanguage()

  // Buscar dados do post
  useEffect(() => {
    async function loadPostData() {
      if (!slug) return

      setIsLoading(true)
      setError(false)

      try {
        // Carregar o post pelo slug
        const postData = await getBlogPostBySlug(slug)
        setPost(postData)

      } catch (err) {
        console.error('Erro ao carregar post:', err)
        setError(true)

        try {
          const placeholderPost = getBlogPostBySlugPlaceholder(slug)
          setPost(placeholderPost)
          setError(false)
        } catch (fallbackErr) {
          setError(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadPostData()
  }, [slug])

  // Processar dados do post quando post ou idioma mudar
  useEffect(() => {
    if (!post) return

    const title = getContentByLanguage(post.title, language)
    const description = getContentByLanguage(post.description, language)
    const content = getContentByLanguage(post.content, language)
    const category = post.tags?.[0]?.name ? getContentByLanguage(post.tags[0].name, language) : ''
    // const formattedDate = moment(post.published_at).locale(language).format("LLL")
    const formattedDate = format.dateTime(new Date(post.published_at), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    const featuredImage = post.media?.[0]?.original_url || "/images/blog-hero.png"

    const processedTags = post.tags?.map((tag: any) => ({
      id: tag.id,
      name: getContentByLanguage(tag.name, language),
      slug: getContentByLanguage(tag.slug, language)
    })) || []

    setPostData({
      title,
      description,
      content,
      category,
      formattedDate,
      tags: processedTags,
      author: post?.author || {name: 'Equipe Alcast'},
      featuredImage
    })

    // Atualizar o título da página
    document.title = `${title} - Blog Alcast`
  }, [post, language])

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Header/>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-8"/>
          <Skeleton className="h-8 w-64 mb-4"/>
          <Skeleton className="h-12 w-full mb-4"/>
          <Skeleton className="h-6 w-48 mb-8"/>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full"/>
            <Skeleton className="h-4 w-full"/>
            <Skeleton className="h-4 w-3/4"/>
          </div>
        </div>
        <Footer/>
      </main>
    )
  }

  if (error || !post) {
    return <NotFound/>
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header/>

      <article className="pb-12">
        <Suspense fallback={<Skeleton className="h-64 w-full"/>}>
          <PostHero
            imageUrl={postData.featuredImage}
            title={postData.title}
            description={postData.description}
            category={postData.category}
            date={postData.formattedDate}
          />
        </Suspense>

        <div className="!max-w-7xl w-full mx-auto px-4 py-8">
          <Suspense fallback={<Skeleton className="h-64 w-full"/>}>
            <PostContent
              content={postData.content}
              tags={postData.tags}
            />
          </Suspense>

          <AuthorCard
            author={{
              id: 1,
              name: postData.author.name,
              avatar: postData.author.avatar,
              role: postData.author.role,
              bio: postData.author.description,
            }}
          />
          
          <CommentsSection postId={post.id} />
        </div>
      </article>

      <RelatedPosts
        category={postData?.tags[0]}
      />

      <Footer/>
    </main>
  )
}
