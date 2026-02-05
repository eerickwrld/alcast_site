import {CalendarIcon, User2Icon, ClockIcon} from "lucide-react"
import {format} from "date-fns"
import {ptBR} from "date-fns/locale"

interface PostMetaProps {
  publishedAt: string;
  author?: string;
  readingTime?: string;
}

export default function PostMeta({publishedAt, author, readingTime}: PostMetaProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-8 text-sm text-gray-600">
      {publishedAt && (
        <div className="flex items-center">
          <CalendarIcon className="mr-1 w-4 h-4"/>
          <time dateTime={publishedAt || ""}>
            {format(new Date(publishedAt || ""), "d 'de' MMMM 'de' yyyy", {locale: ptBR})}
          </time>
        </div>
      )}

      {author && (
        <div className="flex items-center">
          <User2Icon className="mr-1 w-4 h-4"/>
          <span>{author}</span>
        </div>
      )}

      {readingTime && (
        <div className="flex items-center">
          <ClockIcon className="mr-1 w-4 h-4"/>
          <span>{readingTime} min de leitura</span>
        </div>
      )}
    </div>
  )
}
