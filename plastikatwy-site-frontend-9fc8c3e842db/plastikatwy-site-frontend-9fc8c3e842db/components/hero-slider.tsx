"use client"

import { useState, useEffect, useRef, ReactNode, useCallback } from "react"
import {LocalizedLink as Link } from "@/components/Link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { CurvedItem } from "./feature-cards"
import useEmblaCarousel from "embla-carousel-react"
import { twMerge } from "tailwind-merge"

export type HeroSlide = {
  id: number
  title: string
  subtitle?: string
  description?: string
  descriptionClasses?: string
  image: string
  imageMobile?: string
  bgPosition?: string
  cta?: {
    text: string
    url: string
  }
}

type HeroSliderProps = {
  slides: HeroSlide[]
  showCTA?: boolean
  pageTitle?: string
  pageSubtitle?: string
  showCurvedItem?: boolean
  curveColor?: string
  emblaOptions?: Object
  interval?: number
  breadcrumb?: ReactNode
}

export default function HeroSlider({
  slides,
  showCTA = true,
  pageTitle,
  pageSubtitle,
  showCurvedItem = true,
  curveColor = "#1A408A",
  interval = 6000,
  emblaOptions = {},
  breadcrumb
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({})
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: slides?.length > 1,
    ...emblaOptions
  })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Configuração do slider quando o componente monta
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentSlide(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Pré-carregar todas as imagens
  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = slides.flatMap((slide) => {
        const promises = [
          new Promise<void>((resolve) => {
            const img = new window.Image()
            img.onload = () => {
              setImagesLoaded((prev) => ({ ...prev, [`${slide.id}-desktop`]: true }))
              resolve()
            }
            img.onerror = () => resolve() // Continua mesmo se uma imagem falhar
            img.src = slide.image
          })
        ]

        if (slide.imageMobile) {
          promises.push(
            new Promise<void>((resolve) => {
              const img = new window.Image()
              img.onload = () => {
                setImagesLoaded((prev) => ({ ...prev, [`${slide.id}-mobile`]: true }))
                resolve()
              }
              img.onerror = () => resolve() // Continua mesmo se uma imagem falhar
              img.src = slide.imageMobile
            })
          )
        }
        return promises
      })

      await Promise.all(loadPromises)
    }

    loadImages()
  }, [slides])

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, interval)
  }, [emblaApi, interval])

  useEffect(() => {
    startAutoSlide()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startAutoSlide])

  const goToSlide = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index)
      startAutoSlide()
    }
  }, [emblaApi, startAutoSlide])

  const goToPrevSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      startAutoSlide()
    }
  }, [emblaApi, startAutoSlide])

  const goToNextSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      startAutoSlide()
    }
  }, [emblaApi, startAutoSlide])

  return (
    <section className="overflow-hidden relative w-full">
      {/* Preload de imagens invisíveis */}
      <div className="hidden">
        {slides.flatMap((slide) =>
          [
            <img key={`preload-desktop-${slide.id}`} src={slide.image} alt="" aria-hidden="true" />,
            slide.imageMobile && <img key={`preload-mobile-${slide.id}`} src={slide.imageMobile} alt="" aria-hidden="true" />
          ].filter(Boolean)
        )}
      </div>

      <div className="h-[400px] w-full sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides?.map((slide, index) => slide?.cta?.url ? (
            <Link
              href={slide.cta?.url}
              key={index}
              className={twMerge(
                "relative flex-none w-full h-full transition-opacity",
                emblaApi && emblaApi.selectedScrollSnap() === index ? "opacity-100" : "opacity-100"
              )}
              aria-hidden={index !== currentSlide}
            >
              {/* Imagem de fundo responsiva */}
              <img
                src={slide.image}
                alt={slide.title}
                className="hidden object-cover absolute inset-0 w-full h-full md:block"
                style={{ objectPosition: slide.bgPosition || "center center" }}
              />
              <img
                src={slide.imageMobile || slide.image}
                alt={slide.title}
                className="block object-cover absolute inset-0 w-full h-full md:hidden"
                style={{ objectPosition: slide.bgPosition || "center center" }}
              />

              {slide.title && (
                <div
                  className="absolute inset-0 w-2/3 bg-gradient-to-r from-black/90 from-[10%] to-transparent to-[100%]"
                />
              )}

              {/* Content container */}
              <div className="relative z-10 mx-auto flex h-full max-w-[1557px] flex-col items-start justify-center px-4 text-white md:px-6 lg:px-8">
                {/* Breadcrumb if provided */}
                {breadcrumb && breadcrumb}

                {pageTitle ? (
                  <>
                    <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{pageTitle}</h1>
                    {pageSubtitle && (
                      <div className="max-w-lg">
                        <p className="text-lg md:text-xl">{pageSubtitle}</p>
                      </div>
                    )}
                    <div className="mt-4 w-24 h-1 bg-white" />
                  </>
                ) : (
                  <>
                    {!breadcrumb && slide.title && <span className="mb-2 text-sm font-light text-white/80 md:text-xl font-[Lato] italic">{slide.subtitle}</span>}
                    {slide.title && (
                      <h1 className="mb-6 max-w-4xl text-2xl font-bold leading-tight md:text-4xl lg:text-5xl font-[Lato] italic">
                        {slide.title}
                      </h1>
                    )}
                    {slide.description && <p className={twMerge("mb-6 max-w-2xl text-lg font-[Lato] italic", slide.descriptionClasses)}>{slide.description}</p>}
                    {slide.title && <div className="mt-4 w-24 h-1 bg-white" />}
                  </>
                )}
              </div>
            </Link>
          ) : (
            <div
              key={index}
              className={twMerge(
                "relative flex-none w-full h-full transition-opacity",
                emblaApi && emblaApi.selectedScrollSnap() === index ? "opacity-100" : "opacity-100"
              )}
              aria-hidden={index !== currentSlide}
            >
              {/* Imagem de fundo responsiva */}
              <img
                src={slide.image}
                alt={slide.title}
                className="hidden object-cover absolute inset-0 w-full h-full md:block"
                style={{ objectPosition: slide.bgPosition || "center center" }}
              />
              <img
                src={slide.imageMobile || slide.image}
                alt={slide.title}
                className="block object-cover absolute inset-0 w-full h-full md:hidden"
                style={{ objectPosition: slide.bgPosition || "center center" }}
              />

              {slide.title && (
                <div
                  className="absolute inset-0 w-2/3 bg-gradient-to-r from-black/90 from-[10%] to-transparent to-[100%]"
                />
              )}

              {/* Content container */}
              <div className="relative z-10 mx-auto flex h-full max-w-[1557px] flex-col items-start justify-center px-4 text-white md:px-6 lg:px-8">
                {/* Breadcrumb if provided */}
                {breadcrumb && breadcrumb}

                {pageTitle ? (
                  <>
                    <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{pageTitle}</h1>
                    {pageSubtitle && (
                      <div className="max-w-lg">
                        <p className="text-lg md:text-xl">{pageSubtitle}</p>
                      </div>
                    )}
                    <div className="mt-4 w-24 h-1 bg-white" />
                  </>
                ) : (
                  <>
                    {!breadcrumb && slide.title && <span className="mb-2 text-sm font-light text-white/80 md:text-xl font-[Lato] italic">{slide.subtitle}</span>}
                    {slide.title && (
                      <h1 className="mb-6 max-w-4xl text-2xl font-bold leading-tight md:text-4xl lg:text-5xl font-[Lato] italic">
                        {slide.title}
                      </h1>
                    )}
                    {slide.description && <p className={twMerge("mb-6 max-w-2xl text-lg font-[Lato] italic", slide.descriptionClasses)}>{slide.description}</p>}
                    {slide.title && <div className="mt-4 w-24 h-1 bg-white" />}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {showCurvedItem && <CurvedItem backgroundColor={curveColor} curve="convex" />}
      </div>

      {/* Navigation dots - only show if more than one slide */}
      {slides.length > 1 && (
        <>
          <div className="flex absolute right-0 left-0 bottom-4 z-20 justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 hover:scale-125 focus:scale-125 focus:outline-none ${index === currentSlide ? "bg-white" : "border border-white bg-transparent"}`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? "true" : "false"}
              />
            ))}
          </div>

          {/* Navigation arrows - only visible on larger screens */}
          <button
            onClick={goToPrevSlide}
            className="hidden absolute left-4 top-1/2 z-20 p-2 text-white rounded-full transition-colors -translate-y-1/2 bg-black/30 hover:bg-black/50 focus:outline-none md:block"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextSlide}
            className="hidden absolute right-4 top-1/2 z-20 p-2 text-white rounded-full transition-colors -translate-y-1/2 bg-black/30 hover:bg-black/50 focus:outline-none md:block"
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </section>
  )
}
