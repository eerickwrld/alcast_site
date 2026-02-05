"use client"

import { useState } from "react"
import AwardItem from "./award-item"
import Timeline from "./timeline"

interface AwardData {
  year: string
  image: string
  position: "top" | "bottom"
  editions: Array<{
    year: string
    position: string
  }>
}

export default function Awards() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null)

  const awards: AwardData[] = [
    {
      year: "2017",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhlN3K6djvtqVq2WfO1iI1fzpoz4sZ.png",
      position: "bottom",
      editions: [
        { year: "2017", position: "417" },
        { year: "2016", position: "426" },
        { year: "2012", position: "475" },
      ],
    },
    {
      year: "2019",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhlN3K6djvtqVq2WfO1iI1fzpoz4sZ.png",
      position: "top",
      editions: [
        { year: "2019", position: "67" },
        { year: "2018", position: "68" },
        { year: "2012", position: "173" },
      ],
    },
    {
      year: "2020",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhlN3K6djvtqVq2WfO1iI1fzpoz4sZ.png",
      position: "bottom",
      editions: [
        { year: "2020", position: "52" },
        { year: "2019", position: "67" },
        { year: "2018", position: "68" },
      ],
    },
    {
      year: "2021",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhlN3K6djvtqVq2WfO1iI1fzpoz4sZ.png",
      position: "top",
      editions: [
        { year: "2021", position: "45" },
        { year: "2020", position: "52" },
        { year: "2019", position: "67" },
      ],
    },
  ]

  const handleMouseEnter = (year: string) => {
    setHoveredYear(year)
  }

  const handleMouseLeave = () => {
    setHoveredYear(null)
  }

  const years = awards.map((award) => award.year)
  const topAwards = awards.filter((award) => award.position === "top")
  const bottomAwards = awards.filter((award) => award.position === "bottom")

  return null

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-[1557px]">
        <h2 className="mb-12 text-2xl font-bold text-[#1A408A]">Prêmios</h2>

        {/* Top row awards */}
        <div className="mb-8 grid grid-cols-4 gap-8">
          {topAwards.map((award, index) => (
            <div
              key={award.year}
              className={`col-span-1 flex flex-col items-center ${index === 0 ? "lg:col-start-2" : "lg:col-start-4"}`}
            >
              <AwardItem
                year={award.year}
                image={award.image}
                editions={award.editions}
                position="bottom"
                isHovered={hoveredYear === award.year}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          ))}
        </div>

        {/* Timeline */}
        <Timeline
          years={years}
          hoveredYear={hoveredYear}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Bottom row awards */}
        <div className="mt-8 grid grid-cols-4 gap-8">
          {bottomAwards.map((award, index) => (
            <div
              key={award.year}
              className={`col-span-1 flex flex-col items-center ${index === 0 ? "lg:col-start-1" : "lg:col-start-3"}`}
            >
              <AwardItem
                year={award.year}
                image={award.image}
                editions={award.editions}
                position="top"
                isHovered={hoveredYear === award.year}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
