"use client";

import Image from "next/image"
import {ArrowRight} from "lucide-react"
import {BlogPost} from "@/services/types"
import {twMerge} from "tailwind-merge"
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {useLanguage} from "@/contexts/language-context";
import {useEffect, useState} from "react";
import {useFormatter} from "next-intl";
import {Link} from "@/i18n/navigation";

interface BlogCardProps {
  post: BlogPost
  variant?: "default" | "featured" | "horizontal" | "small"
}

export default function BlogCard({post, variant = "default"}: BlogCardProps) {
  const [postData, setPostData] = useState(post)

  const {language} = useLanguage()
  const isFeatured = variant === "featured";
  const isSmall = variant === "small";
  const format = useFormatter()

  useEffect(() => {
    setPostData(state => ({
      ...state,
      title: getContentByLanguage(post.title, language),
      excerpt: getContentByLanguage(post.excerpt, language),
      featured_image: post.media?.[0]?.original_url,
      // published_at: moment(post.published_at).locale(language).format("LLL"),
      published_at: format.dateTime(new Date(post.published_at), {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    }))
  }, [post, language]);

  const category = post.tags?.length > 0 ? getContentByLanguage(post.tags?.[0]?.name, language) : ''

  return (
    <article
      className={twMerge(
        "group overflow-hidden bg-white transition-all duration-300 hover:bg-gray-100 border border-gray-100 rounded-2xl",
        isFeatured ? "flex h-full flex-col" : ""
      )}
    >
      <Link
        href={`/blog/${postData.slug}`}
        className="block relative"
      >
        <Image
          src={postData.featured_image || "/placeholder.svg"}
          alt={postData.title}
          width={800}
          height={450}
          className={twMerge(
            "w-full object-cover",
            isFeatured ? "h-64" : "h-52"
          )}
        />
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-sm text-primary font-medium">{category}</span>
          {category && postData?.published_at && <span className="text-sm text-gray-500 mx-2">•</span>}
          <span className="text-sm text-gray-500">{postData?.published_at}</span>
        </div>

        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col gap-3">
            <h3 className={twMerge(
              "font-semibold text-primary",
              isFeatured ? "text-2xl" : "text-xl"
            )}>
              <Link href={`/blog/${postData?.slug}`} className="hover:text-primary/80 transition-colors">
                {getContentByLanguage(postData?.title, language)}
              </Link>
            </h3>
          </div>

          <Link
            href={`/blog/${postData?.slug}`}
            className="flex items-center text-primary hover:text-primary/80 font-medium transition-all group-hover:translate-x-2 duration-300 w-fit"
            aria-label={`Leia mais sobre ${postData?.title}`}
          >
            <ArrowRight width={32} height={32}/>
          </Link>
        </div>

        {isFeatured && postData?.content && (
          <div className="prose prose-sm mt-2 lg:line-clamp-[10] line-clamp-3" dangerouslySetInnerHTML={{__html: getContentByLanguage(postData.content, language)}} />
        )}
      </div>
    </article>
  );
}
