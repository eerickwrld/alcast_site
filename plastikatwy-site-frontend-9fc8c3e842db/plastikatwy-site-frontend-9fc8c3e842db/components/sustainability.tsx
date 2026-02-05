import Image from "next/image"
import {ChevronRight} from "lucide-react"
import {Button} from "@heroui/react"
import {LocalizedLink} from "@/components/Link";

interface SustainabilityProps {
  locale: string;
  data?: {
    title: string;
    description: string;
    text_button: string;
    link_button: string;
    image: string;
  }
}

export default function Sustainability({data, locale}: SustainabilityProps) {
  const title = data?.title || ""
  const description = data?.description || ""
  const buttonText = data?.text_button || ""
  const buttonLink = data?.link_button || ""
  const imageSrc = data?.image || ""

  return (
    <section className="relative bg-white">
      <div className="h-[400px] w-full md:h-[500px]">
        <Image
          src={imageSrc || ""}
          alt="Projeto de sustentabilidade"
          fill
          className="object-cover"
        />

        <div className="flex absolute inset-0 items-center">
          <div className="container px-4 md:px-6">
            <div className="p-6 max-w-md bg-white rounded-lg md:p-8">
              <h2 className="mb-3 text-xl font-bold text-[#1A408A] md:text-2xl">
                {title}
              </h2>
              <p className="mb-4 text-sm text-gray-700 md:text-base">
                {description}
              </p>
              <LocalizedLink
                href={"/orcamento"}
                locale={locale}
              >
                <Button
                  color="primary"
                  endContent={<ChevronRight className="ml-1 w-4 h-4"/>}
                >
                  {buttonText}
                </Button>
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
