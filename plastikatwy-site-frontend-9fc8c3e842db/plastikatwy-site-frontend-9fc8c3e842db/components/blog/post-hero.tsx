import Image from "next/image"
import HeroSlider from "@/components/hero-slider";

interface PostHeroProps {
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

export default function PostHero({imageUrl, category, date, description, title}: PostHeroProps) {
  return (
    <HeroSlider
      showCTA={false}
      emblaOptions={{
        watchDrag: false
      }}
      slides={[
        {
          id: 1,
          image: imageUrl || "/placeholder.svg",
          title,
          description,
          subtitle: (
            <div className="mb-2">
              <span className="text-lg text-white font-medium">{category}</span>
              {category && date && <span className="text-lg text-white mx-2">•</span>}
              <span className="text-lg text-white">{date}</span>
            </div>
          ),
          descriptionClasses: "text-xl max-w-lg"
        }
      ]}
      curveColor="#f9fafb"
    />
  )
}
