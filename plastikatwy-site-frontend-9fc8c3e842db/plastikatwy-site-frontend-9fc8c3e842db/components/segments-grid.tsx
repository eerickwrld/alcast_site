import { LocalizedLink as Link } from "@/components/Link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getSegmentsWithLimit } from "@/services/api"
import { Segment } from "@/services/types"
import {getTranslations} from "next-intl/server";
import {getContentByLanguage} from "@/helpers/getContentByLanguage";

interface SegmentItemProps {
  segment: Segment;
  lang: string;
}

function SegmentItem({ segment, lang }: SegmentItemProps) {
  const name = getContentByLanguage(segment.name, lang);
  
  return (
    <div
      className="block w-full max-w-[300px] overflow-hidden rounded-lg bg-white shadow-md"
    >
      <div className="h-[200px] relative">
        <Image
          src={segment.image || "/placeholder.svg"}
          alt={name}
          className="object-cover"
          fill
        />
      </div>
      <div className="p-4 text-center bg-white">
        <h3 className="text-gray-800">{name}</h3>
      </div>
    </div>
  )
}

interface SegmentsGridProps {
  locale: string;
}

export default async function SegmentsGrid({ locale }: SegmentsGridProps) {
  let segments: Segment[] = [];
  const t = await getTranslations({locale, namespace: 'common'});

  try {
    segments = await getSegmentsWithLimit(4);
  } catch (error) {
    console.error('Erro ao carregar segmentos:', error);
    // Dados fallback para caso a API falhe
    segments = [];
  }

  // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  if (!segments || segments.length === 0) {
    return (
      <section className="relative bg-[#1A408A] lg:py-32 py-16 text-white overflow-hidden">
        <div className="container relative z-10 px-4 mx-auto md:px-6">
          <h2 className="mb-4 text-3xl text-center">{t("loading")}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#1A408A] lg:py-32 py-16 text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/segment-background.png"
          alt=""
          className="object-cover w-full h-full opacity-10"
          aria-hidden="true"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto md:px-6">
        <h2 className="mb-4 text-3xl text-center">{t("aluminumCta")}</h2>

        <div className="flex flex-wrap gap-6 justify-center mb-10">
          {segments?.map((segment) => (
            <SegmentItem key={segment.id} segment={segment} lang={locale} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" asChild className="bg-transparent border border-white text-white hover:bg-white hover:text-[#1A408A]">
            <Link locale={locale} href="/orcamento">{t("quote")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
