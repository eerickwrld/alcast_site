import Header from "@/components/header"
import Footer from "@/components/footer"
import SegmentCategory from "@/components/segment-category"
import HeroSlider from "@/components/hero-slider"
import {Segment} from "@/services/types";
import {getPageBySlug, getSegments} from "@/services/api";
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {BudgetCta} from "@/components/BudgetCta";
import {localePagePathname} from "@/helpers/localePagePathname";

export default async function Segmentos({params}) {
  const lang = (await params).locale
  let segments: Segment[] = [];
  let pageData = {}

  try {
    segments = await getSegments();
    pageData = await getPageBySlug(localePagePathname("/segmentos", lang), lang);
  } catch (error) {
    console.error('Erro ao carregar segmentos:', error);
    // Dados fallback para caso a API falhe
    segments = [];
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header/>

      {/* Hero Section */}
      <HeroSlider
        slides={[
          {
            id: 1,
            title: pageData?.custom_fields_data?.["secao-hero"]?.title,
            description: pageData?.custom_fields_data?.["secao-hero"]?.description,
            subtitle: pageData?.custom_fields_data?.["secao-hero"]?.subtitle,
            image: pageData?.custom_fields_data?.["secao-hero"]?.image,
            // imageMobile: "/images/fabrica-hero-mobile.png",
            bgPosition: "center center",
          }
        ]}
        showCTA={false}
      />

      {segments?.map((segment) => (
        <SegmentCategory
          key={segment.id}
          title={getContentByLanguage(segment.name, lang)}
          backgroundColor="bg-[#1A408A]"
          segments={segment.image_api?.map((image) => ({
            title: getContentByLanguage(segment.name, lang),
            image: image,
          }))}
        />
      ))}

      {/*<SegmentCategory title="Transporte" backgroundColor="bg-[#1A408A]" segments={transportation} />*/}
      {/*<SegmentCategory title="Construção civil" backgroundColor="bg-[#1A408A]" segments={civilConstruction} />*/}
      {/*<SegmentCategory title="Indústria elétrica" backgroundColor="bg-[#1A408A]" segments={electricalIndustry} />*/}
      {/*<SegmentCategory title="Bens de consumo duráveis" backgroundColor="bg-[#1A408A]" segments={consumerGoods} />*/}

      <BudgetCta primaryBackground />

      <Footer/>
    </main>
  )
}
