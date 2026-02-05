import { Link } from "@heroui/react"
import HeroSlider from "@/components/hero-slider"

export function HeroSection() {
  return (
    <HeroSlider 
      slides={[
        {
          id: 1,
          title: "LME",
          description: "Acompanhe diariamente as cotações dos Metais na LME (London Metal Exchange) e do Dólar.",
          image: "/images/fabrica-3.png",
          imageMobile: "/images/fabrica-3-mobile.png",
          bgPosition: "center center",
        }
      ]}
      curveColor="white"
      showCTA={false}
    />
  )
} 