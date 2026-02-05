import {notFound} from "next/navigation";
import {getPageBySlug} from "@/services/api";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSlider from "@/components/hero-slider";

export default async function DynamicPage({params}) {
  const {dynamic, locale} = await params

  const foundPage = await getPageBySlug(dynamic, locale)

  if (!foundPage) {
    return notFound()
  }

  const heroSlides = foundPage.custom_fields_data?.["hero"]?.banner ? [{
    image: foundPage?.custom_fields_data?.["hero"]?.banner,
    title: foundPage?.custom_fields_data?.["hero"]?.title,
    subtitle: foundPage?.custom_fields_data?.["hero"]?.subtitle,
    description: foundPage?.custom_fields_data?.["hero"]?.description,
    descriptionClasses: "text-2xl max-w-lg"
  }] : []

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header/>
      {heroSlides?.length > 0 && <HeroSlider slides={heroSlides} curveColor="#FFF"/>}
      {foundPage?.custom_fields_data?.conteudo?.content && <div className="prose w-full mx-auto !max-w-7xl px-4 py-8" dangerouslySetInnerHTML={{ __html: foundPage?.custom_fields_data?.conteudo?.content }}/>}
      <Footer/>
    </main>
  )
}
