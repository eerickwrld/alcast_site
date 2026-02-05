import HeroSlider from "@/components/hero-slider"

export default function ProdutosHero({ heroSlides }) {
  return (
    <HeroSlider 
      slides={heroSlides}
      showCTA={false}
    />
  )
}
