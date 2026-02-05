import { BlogPost } from "@/services/types"
import BlogCard from "./blog-card"
import BlogPreview from "@/components/blog-preview";

interface RelatedPostsProps {
  category: string;
}

export default function RelatedPosts({ category }: RelatedPostsProps) {
  if (!category) return null

  return (
    <BlogPreview category={category?.slug} />
  )
}
