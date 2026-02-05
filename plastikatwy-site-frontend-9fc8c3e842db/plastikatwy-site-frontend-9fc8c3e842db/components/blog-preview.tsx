"use client"

import Image from "next/image"
import { LocalizedLink as Link } from "@/components/Link"
import {ChevronRight} from "lucide-react"
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {fetchBlogPosts, processApiPost} from "@/services/blog-api";
import {BlogResponse} from "@/services/types";
import BlogCard from "@/components/blog/blog-card";

// export function BlogPost({post}) {
//   return (
//     <article key={post.id} className="overflow-hidden group">
//       <Link href={post.link || ""} className="block">
//         <Image
//           src={post.image || "/placeholder.svg"}
//           alt={post.title}
//           width={350}
//           height={200}
//           className="object-cover w-full h-48 rounded-lg transition-all group-hover:scale-105"
//         />
//       </Link>
//       <div className="p-4">
//         <span className="inline-block mb-1 text-xs font-medium text-gray-600">{post.category?.name}</span>
//         <h3 className="mb-2 line-clamp-2 max-w-[340px] text-lg text-primary font-medium">
//           <Link href={post.link || ""} className="group-hover:text-blue-700">
//             {post.title}
//           </Link>
//         </h3>
//         <Link href={post.link || ""} className="flex items-center text-sm font-medium text-gray-600 group-hover:underline">
//           Leia mais
//           <ChevronRight className="ml-1 w-4 h-4"/>
//         </Link>
//       </div>
//     </article>
//   )
// }

export default function BlogPreview({ category = "", limit = 3}) {
  const t = useTranslations("home")
  const tc = useTranslations("common")
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const language = useLocale();

  useEffect(() => {
    async function loadBlogData() {
      if (posts?.length > 0) return

      setIsLoading(true);

      try {
        // Buscar posts do blog da API /blog
        const postsData = await fetchBlogPosts(1, 3, category, limit)
          .catch(error => {
            console.error('Erro ao carregar os posts do blog:', error);
            // Retornar um objeto BlogResponse vazio em caso de erro
            return {posts: []} as BlogResponse;
          });

        const processedPosts = postsData?.posts?.length > 0 ? postsData?.posts?.map(post => processApiPost(post, language)) : []

        setPosts(processedPosts)
      } catch (error) {
        console.error('Erro ao carregar os posts:', error);
      }

      setIsLoading(false);
    }

    loadBlogData();
  }, [category, limit]);

  // const blogPosts = [
  //   {
  //     id: 1,
  //     title: "Como preservamos os recursos naturais durante a produção",
  //     category: "Meio ambiente",
  //     image: "/blog/latas-de-aluminio.png",
  //     link: "/blog/preservacao-recursos-naturais",
  //   },
  //   {
  //     id: 2,
  //     title: "Como a Alcast preserva o meio ambiente",
  //     category: "Reciclagem",
  //     image: "/blog/meio-ambiente.png",
  //     link: "/blog/alcast-preserva-meio-ambiente",
  //   },
  //   {
  //     id: 3,
  //     title: "A importância de reciclar latas de alumínio",
  //     category: "Reciclagem",
  //     image: "/blog/recursos-planeta.png",
  //     link: "/blog/importancia-reciclar-latas",
  //   },
  // ]


  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl text-[#1A408A]">{t("blog.title")}</h2>
          <Link href="/blog" className="flex items-center text-sm font-medium text-blue-600 hover:underline">
            {t("blog.buttonText")}
            <ChevronRight className="ml-1 w-4 h-4"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="py-16 text-center">
              <h3 className="text-xl font-medium text-gray-700">{tc("loading")}</h3>
            </div>
          ) : posts?.length > 0 ? posts?.map((post, index) => (
            <BlogCard key={post?.id || index} post={post} />
          )) : (
            <div className="py-16 text-center">
              <h3 className="text-xl font-medium text-gray-700">{tc("notFoundArticles")}</h3>
              <p className="mt-2 text-gray-500">{tc("notFoundArticlesDescription")}</p>
            </div>
          )
          }
        </div>
      </div>
    </section>
  )
}
