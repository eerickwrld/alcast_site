import Image from "next/image"
import {Link} from "@/i18n/navigation";
import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import ApplicationsSection from "@/components/applications-section"
import Footer from "@/components/footer";
import {PageResponse} from "@/services/types";
import {getPageBySlug, getProductBySlug} from "@/services/api";
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {BudgetCta} from "@/components/BudgetCta";
import NotFound from "@/components/blog/not-found";

export default async function BobinasPage({ params }) {
  const {locale, slug} = await params;
  const lang = locale
  let pageData: PageResponse = {};

  try {
    pageData = await getProductBySlug(slug, locale);
  } catch (error) {
    console.error('Erro ao buscar dados do produto:', error);
  }

  const heroSlides = [
    {
      id: 1,
      image: getContentByLanguage(pageData?.banner, lang),
      title: getContentByLanguage(pageData?.name, lang),
      description: getContentByLanguage(pageData?.banner_description, lang),
      bgPosition: "center center",
    }
  ]

  if (!pageData?.name) {
    return <NotFound
      title="Produto não encontrado"
      description="O produto que você está procurando não foi encontrado."
      buttonText="Voltar para os produtos"
      buttonLink="/produtos"
    />
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <HeroSlider
        slides={heroSlides}
        curveColor="white"
        showCTA={false}
        breadcrumb={
          <div className="mb-4">
            <Link href="/" className="text-sm text-white/80 hover:text-white">
              Início
            </Link>{" "}
            &gt;{" "}
            <Link href="/produtos" className="text-sm text-white/80 hover:text-white">
              Produtos
            </Link>
          </div>
        }
      />

      {/* Product Specifications Section */}
      <section className="overflow-hidden relative py-16 bg-white">
        {/* Decorative background elements */}
        <div className="overflow-hidden absolute top-0 right-0 w-full h-full">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            className="absolute top-0 right-0 w-full h-full opacity-10"
          >
            <path d="M800,0 Q900,200 800,400 T1000,600 L1000,0 Z" fill="none" stroke="#1A408A" strokeWidth="2" />
          </svg>
        </div>

        <div className="container max-w-[1200px] relative z-10 px-4 mx-auto md:px-6">
          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Left column - Specifications */}
            <div className="lg:w-1/2">
              <div className="prose prose-sm text-foreground" dangerouslySetInnerHTML={{ __html: getContentByLanguage(pageData?.description, lang)}} />
            </div>

            {/* Right column - Product Image */}
            <div className="flex justify-center items-center lg:w-1/2">
              <Image
                src={getContentByLanguage(pageData?.image, lang)}
                alt="Bobina de alumínio"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <ApplicationsSection locale={locale} applications={pageData?.images_product_use} />

      {/* CTA Section */}
      <BudgetCta primaryBackground />

      <Footer />
    </main>
  )
}
