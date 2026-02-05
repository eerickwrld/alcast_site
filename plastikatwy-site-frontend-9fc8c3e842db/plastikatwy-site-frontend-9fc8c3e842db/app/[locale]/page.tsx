import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import FeatureCards from "@/components/feature-cards"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"
import Stats from "@/components/stats"
import BlogPreview from "@/components/blog-preview"
import NewsletterForm from "@/components/newsletter-form"
import SegmentsGrid from "@/components/segments-grid"
import Certifications from "@/components/certifications"
import Sustainability from "@/components/sustainability"
import OrcamentoSection from "@/components/orcamento-section"
import { getPageBySlug } from "@/services/api"
import { PageResponse } from "@/services/types"

export async function generateMetadata({params}) {
  const {locale} = await params;
  const metadata = await getPageBySlug('home', locale);

  if (metadata?.meta_title) {
    return {
      title: metadata?.meta_title,
      description: metadata?.meta_description,
    };
  }

  return {}
}

export default async function Home({params}) {
  const promisedParams = await params
  const lang = promisedParams.locale

  let pageData: PageResponse;
  try {
    pageData = await getPageBySlug('home', lang);
  } catch (error) {
    console.error('Erro ao buscar dados da página home:', error);
  }

  const heroSlides = pageData?.custom_fields_data?.['secao-banner']?.banner?.length > 0 &&
    pageData?.custom_fields_data?.['secao-banner']?.banner?.map((banner, index) => ({
      id: index + 1,
      title: banner.custom_fields_data.title || "",
      subtitle: banner.custom_fields_data.subtitle || "",
      image: banner.custom_fields_data.image,
      imageMobile: index === 0 ? "/images/banner-home-mobile.png" : "",
      bgPosition: "center center",
      cta: banner.custom_fields_data.link ? {
        text: "Solicite um orçamento",
        url: banner.custom_fields_data.link
      } : {
        text: "",
        url: ""
      }
    })) || []

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header />
      <HeroSlider showCTA={false} slides={heroSlides} />
      <div className="w-full">
        <ProductGrid />
        <FeatureCards
          qualities={
            pageData?.custom_fields_data?.qualidade?.qualities ||
            pageData?.custom_fields_data?.quality
          }
        />
        <OrcamentoSection
          locale={lang}
          data={pageData?.custom_fields_data?.['secao-cta-orcamento']}
        />
        <Stats
          stats={pageData?.custom_fields_data?.stats}
        />
        <BlogPreview />
        <NewsletterForm />
        <SegmentsGrid locale={lang} />
        <Certifications
          title={pageData?.custom_fields_data?.['secao-certificacoes']?.title}
          images={pageData?.custom_fields_data?.['secao-certificacoes']?.certifications?.map(cert => cert.custom_fields_data.image)}
        />
        <Sustainability
          locale={lang}
          data={pageData?.custom_fields_data?.['secao-sustentabilidade']}
        />
      </div>
      <Footer />
    </main>
  )
}
