import { ChevronRight } from "lucide-react"
import { LocalizedLink as Link } from "@/components/Link"

interface BreadcrumbProps {
  category?: {
    name: string;
    slug: string;
  };
  postTitle: string;
}

export default function Breadcrumb({ category, postTitle }: BreadcrumbProps) {
  return (
    <nav className="flex items-center py-4 text-sm">
      <Link href="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />
      <Link href="/blog" className="text-blue-600 hover:underline">
        Blog
      </Link>
      {category && (
        <>
          <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />
          <Link 
            href={`/blog/categoria/${category.slug}`} 
            className="text-blue-600 hover:underline"
          >
            {category.name}
          </Link>
        </>
      )}
      <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />
      <span className="text-gray-700 font-medium truncate max-w-[150px]">{postTitle}</span>
    </nav>
  )
}
