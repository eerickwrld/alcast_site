import Header from "@/components/header"
import ProdutosHero from "@/components/produtos-hero"
import ProductGridShowcase from "@/components/product-grid-showcase"
import ProductQualityCta from "@/components/product-quality-cta"
import Footer from "@/components/footer";
import ProductGrid from "@/components/product-grid";
import {PageResponse} from "@/services/types";
import {getPageBySlug} from "@/services/api";
import {localePagePathname} from "@/helpers/localePagePathname";

export default async function Produtos({params}) {
  const promisedParams = await params
  const locale = promisedParams.locale

  let pageData: PageResponse;
  try {
    pageData = await getPageBySlug(localePagePathname("/produtos", locale), locale);
  } catch (error) {
    console.error('Erro ao buscar dados da página home:', error);
  }

  const heroSlides = [
    {
      id: 1,
      title: pageData?.custom_fields_data?.["secao-hero"]?.title,
      description: pageData?.custom_fields_data?.["secao-hero"]?.description,
      subtitle: pageData?.custom_fields_data?.["secao-hero"]?.subtitle,
      image: pageData?.custom_fields_data?.["secao-hero"]?.image,
      bgPosition: "center center",
    }
  ]

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <ProdutosHero heroSlides={heroSlides} />
      <ProductGrid removeTitle />
      <ProductQualityCta data={pageData?.custom_fields_data?.['secao-hero-footer']} />
      <Footer />
    </main>
  )
}
