"use client";

import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {Check} from "lucide-react"
import HeroSlider from "@/components/hero-slider"
import {useEffect, useState} from "react"
import {useLanguage} from "@/contexts/language-context"
import {getPageBySlug} from "@/services/api"
import {PageResponse} from "@/services/types"
import {Skeleton} from "@/components/ui/skeleton"
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {localePagePathname} from "@/helpers/localePagePathname";

export default function ESG() {
  const { language } = useLanguage();
  const [pageData, setPageData] = useState<PageResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const data = await getPageBySlug(localePagePathname("/esg", language), language);
        setPageData(data);
      } catch (err: any) {
        console.error('Error fetching ESG page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const apiEsgCards = pageData?.custom_fields_data?.['secao-ambiental']?.ambientes || [];
  const apiEsgPrograms = pageData?.custom_fields_data?.['secao-programa-5s']?.list || [];
  const apiProgramCards = pageData?.custom_fields_data?.['secao-programa-5s']?.program_cards || [];
  const heroData = pageData?.custom_fields_data?.['secao-hero'];
  const aboutEsgData = pageData?.custom_fields_data?.['secao-sobre-esg'];
  const certificatesData = pageData?.custom_fields_data?.['secao-certificacoes'];

  const heroSlides = heroData ? [
    {
      id: 1,
      subtitle: getContentByLanguage(heroData.subtitle, language),
      title: getContentByLanguage(heroData.title, language),
      description: getContentByLanguage(heroData.description, language),
      image: heroData.image,
      bgPosition: "top",
    }
  ] : [];

  if (loading) {
    return (
      <main className="flex flex-col min-h-screen bg-white">
        <Header/>
        <Skeleton className="w-full h-[400px]"/>
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="w-full h-[200px] mb-8"/>
          <Skeleton className="w-full h-[300px] mb-8"/>
          <Skeleton className="w-full h-[400px]"/>
        </div>
        <Footer/>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header/>

      {/* Hero Section */}
      <HeroSlider
        slides={heroSlides}
        curveColor="white"
        showCTA={false}
      />

      {/* About ESG Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto md:px-6 lg:px-24">
          <div className="flex flex-col gap-8 justify-between items-center md:flex-row">
            <div className="max-w-md md:w-2/3">
              <p className="mb-6 whitespace-pre-wrap text-gray-700">
                {getContentByLanguage(aboutEsgData?.description, language)}
              </p>
            </div>
            <div className="flex justify-center md:w-1/3">
              <Image
                src={aboutEsgData?.image || null}
                alt={"Letra A formada por folhas verdes"}
                width={250}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto md:px-6">
          <h2 className="text-2xl font-bold text-[#1A408A] mb-8">
            {getContentByLanguage(certificatesData?.title, language)}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certificatesData?.certificacoes.map(({custom_fields_data: cert}, index) => (
              <div key={index} className="flex flex-col items-center p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4 h-20">
                  <img
                    src={getContentByLanguage(cert.image, language)}
                    alt={getContentByLanguage(cert.title, language)}
                    className="object-contain w-auto h-full"
                  />
                </div>
                <h3 className="text-lg font-medium text-[#1A408A] mb-2 text-center">
                  {getContentByLanguage(cert.title, language)}
                </h3>
                <p className="text-sm text-center text-gray-600">
                  {getContentByLanguage(cert.description, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Energy Section */}
      {apiEsgCards.map(({custom_fields_data: card}, index) => (
        <section key={index} className="bg-[#1A408A] py-12 text-white">
          <div className="container px-4 mx-auto md:px-6">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8`}>
              <div className="self-center mx-auto md:w-1/4">
                <h2 className="mb-2 text-2xl font-bold">
                  {getContentByLanguage(card?.title, language)}
                </h2>
                <p className="mb-4">
                  {getContentByLanguage(card?.description, language)}
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={getContentByLanguage(card?.image, language)}
                    alt={getContentByLanguage(card?.title, language)}
                    width={600}
                    height={400}
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ESG Program Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto md:px-6">
          <h2 className="text-2xl font-bold text-[#1A408A] mb-8">
            {getContentByLanguage(pageData?.custom_fields_data?.['secao-programa-5s']?.title, language)}
          </h2>
          <p className="mb-6 text-gray-700">
            {getContentByLanguage(pageData?.custom_fields_data?.['secao-programa-5s']?.description, language)}
          </p>

          <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2">
            {apiEsgPrograms.map(({custom_fields_data: program}) => (
              <div key={program?.benefit} className="flex gap-3 items-start p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 rounded-full bg-[#1A408A] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <p className="text-gray-700">{getContentByLanguage(program?.benefit, language)}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {apiProgramCards.map(({custom_fields_data: program}, index) => (
              <div key={index} className="overflow-hidden rounded-lg border border-gray-200">
                <div className="h-[150px] relative">
                  <img
                    src={getContentByLanguage(program.image, language)}
                    alt={getContentByLanguage(program.title, language)}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-foreground">
                    {getContentByLanguage(program.title, language)}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {program?.is_developing && getContentByLanguage({
                      "pt-BR": "(em desenvolvimento e aplicação)",
                      "en": "(in development and application)"
                    }, language)}
                  </span>
                  <p className="mt-2 text-sm text-foreground">
                    {getContentByLanguage(program.description, language)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </main>
  )
}
