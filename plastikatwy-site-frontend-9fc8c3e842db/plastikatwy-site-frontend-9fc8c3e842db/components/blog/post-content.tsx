import {twMerge} from "tailwind-merge";

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface PostContentProps {
  content: string;
  tags?: Tag[];
}

export default function PostContent({content, tags}: PostContentProps) {
  return (
    <div
      className={twMerge(
        "prose !max-w-full text-foreground",
        "prose-img:inline prose-img:rounded-lg",
      )}
      dangerouslySetInnerHTML={{__html: content}}
    />
  )
}
