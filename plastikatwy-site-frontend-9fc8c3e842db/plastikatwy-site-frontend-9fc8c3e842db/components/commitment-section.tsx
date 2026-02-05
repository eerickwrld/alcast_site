import { LocalizedLink as Link } from "@/components/Link"
import {ArrowUpRight} from "lucide-react"
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {twMerge} from "tailwind-merge";
import {useLocale} from "next-intl";
import {LocalizedLink} from "@/components/Link"

export function LinkItem({isExternal, content, url, language, className}: {isExternal: boolean, language: string, url: string, content: string, className?: string}) {
  return (
    <LocalizedLink
      target={isExternal ? "_blank" : "_self"}
      href={url}
      className={twMerge("flex items-center space-x-2", className)}
    >
      {getContentByLanguage(content, language)}
      {isExternal && <ArrowUpRight className="h-4 w-4"/>}
    </LocalizedLink>
  )
}
export default function CommitmentSection({data}) {
  const {locale} = useLocale()

  return (
    <section className="relative bg-[#1A408A] py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1557px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Text content */}
          <div className="p-8 w-full bg-white rounded-3xl lg:w-1/2 lg:p-12">
            <h2 className="text-3xl font-bold text-[#1A408A] mb-6">{data?.title}</h2>

            {data?.description && <div className="prose text-gray-800" dangerouslySetInnerHTML={{__html: data?.description}}/>}

            {/*<div className="space-y-4">*/}
            {/*  {data?.links?.map(({custom_fields_data}, index) => (*/}
            {/*    <LinkItem*/}
            {/*      language={language}*/}
            {/*      key={index}*/}
            {/*      url={custom_fields_data.link_url || ""}*/}
            {/*      isExternal*/}
            {/*      content={custom_fields_data.link_text}*/}
            {/*      className="text-[#1A408A] hover:text-[#15346e]"*/}
            {/*    />*/}
            {/*  ))}*/}
            {/*</div>*/}
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden w-full h-full rounded-3xl">
              <img
                src={data?.image || ""}
                alt="Trabalhador da Alcast com equipamento de segurança sorrindo em ambiente industrial"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
