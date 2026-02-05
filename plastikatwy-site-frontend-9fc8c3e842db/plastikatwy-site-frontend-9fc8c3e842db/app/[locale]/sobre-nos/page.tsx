import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Units from "@/components/units"
import Awards from "@/components/awards"
import CommitmentSection from "@/components/commitment-section"
import FlexibilitySection from "@/components/flexibility-section"
import HeroSlider from "@/components/hero-slider"
import MissionCard from "@/components/mission-card"
import {Button} from "@/components/ui/button"
import {getPageBySlug} from "@/services/api"
import {PageResponse} from "@/services/types"
import {Link} from "@/i18n/navigation";
import CtaSection from "@/components/cta-section";
import {getTranslations} from "next-intl/server";
import {localePagePathname} from "@/helpers/localePagePathname";

export default async function AboutUs({params}) {
  const promisedParams = await params
  const lang = promisedParams.locale
  const t = await getTranslations({locale: lang, namespace: 'common'});

  // Busca os dados da página sobre-nos da API
  let pageData: PageResponse;
  try {
    pageData = await getPageBySlug(localePagePathname('/sobre-nos', lang), lang);
  } catch (error) {
    console.error('Erro ao buscar dados da página sobre-nos:', error);
    // Em caso de erro, continuamos com os valores estáticos
  }

  // Dados da seção hero
  const heroSection = pageData?.custom_fields_data?.['secao-hero'];
  const heroSlides = [{
    id: 1,
    title: heroSection?.title,
    subtitle: heroSection?.subtitle,
    image: heroSection?.image,
    imageMobile: heroSection?.image,
    bgPosition: "center center",
  }];

  // Dados da seção missão, visão e valores
  const missionSection = pageData?.custom_fields_data?.['secao-missao-visao-e-valores'];

  // Dados da seção hero-middle (texto com imagem)
  const heroMiddleSection = pageData?.custom_fields_data?.['secao-hero-middle'];

  // Dados da seção unidades
  const unitsSection = pageData?.custom_fields_data?.['secao-unidades'];
  const units = unitsSection?.units?.map(unit => ({
    image: unit.custom_fields_data.image,
    name: unit.custom_fields_data.name,
  })) || [];

  // Dados da seção segmentos
  const segmentsSection = pageData?.custom_fields_data?.['secao-segmentos'];

  // Dados da seção compromisso
  const commitmentSection = pageData?.custom_fields_data?.['secao-compromisso'];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header/>
      <HeroSlider
        slides={heroSlides}
        showCTA={false}
      />
      <section className="w-full bg-white">
        <div className="bg-[#1A408A] py-16 w-full relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1557px]">
            <div className="flex flex-wrap gap-8 justify-center">
              <MissionCard
                title={t("missao")}
                description={missionSection?.text_mission}
                imageSrc="/images/sobre-nos-1.png"
                imageAlt="Missão"
              />

              <MissionCard
                title={t("visao")}
                description={missionSection?.text_vision}
                imageSrc="/images/sobre-nos-2.png"
                imageAlt="Visão"
              />

              <MissionCard
                title={t("valores")}
                description={missionSection?.text_values}
                imageSrc="/images/sobre-nos-3.png"
                imageAlt="Valores"
              />
            </div>
          </div>
        </div>
      </section>
      <CtaSection data={heroMiddleSection}/>
      <Units locale={lang} image={unitsSection?.image} units={units}/>
      <Awards/>
      <CommitmentSection data={commitmentSection}/>
      <FlexibilitySection data={segmentsSection}/>
      <Footer/>
    </main>
  )
}
