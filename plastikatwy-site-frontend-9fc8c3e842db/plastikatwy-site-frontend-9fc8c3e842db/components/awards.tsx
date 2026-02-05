"use client"

import { useState } from "react"
import Image from "next/image"

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
      image: "/images/award-2019.png",
      position: "top",
      editions: [
        { year: "2019", position: "67" },
        { year: "2018", position: "68" },
        { year: "2012", position: "173" },
      ],
    },
    {
      year: "2020",
      image: "/images/award-2020.png",
      position: "bottom",
      editions: [
        { year: "2020", position: "52" },
        { year: "2019", position: "67" },
        { year: "2018", position: "68" },
      ],
    },
    {
      year: "2021",
      image: "/images/award-2021.png",
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

  const getOpacityClass = (year: string) => {
    if (!hoveredYear) return "opacity-100 transition-opacity duration-300"
    return year === hoveredYear ? "opacity-100" : "opacity-40"
  }

  return null

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-[1557px]">
        <h2 className="mb-12 text-2xl font-bold text-[#1A408A]">Prêmios</h2>

        {/* Top row awards */}
        <div className="mb-8 grid grid-cols-4 gap-8">
          <div className="col-span-1 hidden lg:block"></div>
          <div className="col-span-1 flex flex-col items-center">
            <div
              className={`flex w-full max-w-[300px] flex-col items-center ${getOpacityClass("2019")}`}
              onMouseEnter={() => handleMouseEnter("2019")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mb-4 flex w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all duration-300">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Award image */}
                  <div className="mb-4 md:mb-0 md:w-2/5">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhlN3K6djvtqVq2WfO1iI1fzpoz4sZ.png"
                      alt={`Prêmio 2019`}
                      width={200}
                      height={280}
                      className="h-auto w-full object-contain rounded-md"
                    />
                  </div>

                  {/* Award editions table */}
                  <div className="md:w-3/5">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">
                            Edição do ano
                          </th>
                          <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">
                            Posição
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {awards[1].editions.map((edition) => (
                          <tr key={edition.year}>
                            <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">{edition.year}</td>
                            <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">
                              {edition.position}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Connecting line to timeline */}
              <div className="h-8 w-[2px] bg-gray-300"></div>
            </div>
          </div>
          <div className="col-span-1 hidden lg:block"></div>
          <div className="col-span-1 flex flex-col items-center">
            <div
              className={`flex w-full max-w-[300px] flex-col items-center ${getOpacityClass("2021")}`}
              onMouseEnter={() => handleMouseEnter("2021")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mb-4 flex w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all duration-300">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Award image */}
                  <div className="mb-4 md:mb-0 md:w-2/5">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhlN3K6djvtqVq2WfO1iI1fzpoz4sZ.png"
                      alt={`Prêmio 2021`}
                      width={200}
                      height={280}
                      className="h-auto w-full object-contain rounded-md"
                    />
                  </div>

                  {/* Award editions table */}
                  <div className="md:w-3/5">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">
                            Edição do ano
                          </th>
                          <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">
                            Posição
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {awards[3].editions.map((edition) => (
                          <tr key={edition.year}>
                            <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">{edition.year}</td>
                            <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">
                              {edition.position}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Connecting line to timeline */}
              <div className="h-8 w-[2px] bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative my-4">
          {/* Timeline container */}
          <div className="pb-4">
            {/* Timeline line */}
            <div className="relative h-[2px] w-full bg-gray-300">
              {/* Timeline points */}
              <div className="flex w-full">
                <div className="w-1/4 flex justify-center">
                  <div
                    className={`relative flex flex-col items-center cursor-pointer ${getOpacityClass("2017")}`}
                    onMouseEnter={() => handleMouseEnter("2017")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`-mt-[4px] h-[10px] w-[10px] rounded-full ${
                        hoveredYear === "2017" ? "bg-[#1A408A]" : "bg-gray-400"
                      } transition-all duration-300`}
                    ></div>
                    <span className="mt-4 text-sm font-medium text-[#1A408A]">2017</span>
                  </div>
                </div>
                <div className="w-1/4 flex justify-center">
                  <div
                    className={`relative flex flex-col items-center cursor-pointer ${getOpacityClass("2019")}`}
                    onMouseEnter={() => handleMouseEnter("2019")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`-mt-[4px] h-[10px] w-[10px] rounded-full ${
                        hoveredYear === "2019" ? "bg-[#1A408A]" : "bg-gray-400"
                      } transition-all duration-300`}
                    ></div>
                    <span className="mt-4 text-sm font-medium text-[#1A408A]">2019</span>
                  </div>
                </div>
                <div className="w-1/4 flex justify-center">
                  <div
                    className={`relative flex flex-col items-center cursor-pointer ${getOpacityClass("2020")}`}
                    onMouseEnter={() => handleMouseEnter("2020")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`-mt-[4px] h-[10px] w-[10px] rounded-full ${
                        hoveredYear === "2020" ? "bg-[#1A408A]" : "bg-gray-400"
                      } transition-all duration-300`}
                    ></div>
                    <span className="mt-4 text-sm font-medium text-[#1A408A]">2020</span>
                  </div>
                </div>
                <div className="w-1/4 flex justify-center">
                  <div
                    className={`relative flex flex-col items-center cursor-pointer ${getOpacityClass("2021")}`}
                    onMouseEnter={() => handleMouseEnter("2021")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`-mt-[4px] h-[10px] w-[10px] rounded-full ${
                        hoveredYear === "2021" ? "bg-[#1A408A]" : "bg-gray-400"
                      } transition-all duration-300`}
                    ></div>
                    <span className="mt-4 text-sm font-medium text-[#1A408A]">2021</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row awards */}
        <div className="mt-8 grid grid-cols-4 gap-8">
          <div className="col-span-1 flex flex-col items-center">
            <div
              className={`flex w-full max-w-[300px] flex-col items-center ${getOpacityClass("2017")}`}
              onMouseEnter={() => handleMouseEnter("2017")}
              onMouseLeave={handleMouseLeave}
            >
              {/* Connecting line to timeline */}
              <div className="h-8 w-[2px] bg-gray-300"></div>
              <div className="mt-4 flex w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all duration-300">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Award image */}
                  <div className="mb-4 md:mb-0 md:w-2/5">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhlN3K6djvtqVq2WfO1iI1fzpoz4sZ.png"
                      alt={`Prêmio 2017`}
                      width={200}
                      height={280}
                      className="h-auto w-full object-contain rounded-md"
                    />
                  </div>

                  {/* Award editions table */}
                  <div className="md:w-3/5">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">
                            Edição do ano
                          </th>
                          <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">
                            Posição
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {awards[0].editions.map((edition) => (
                          <tr key={edition.year}>
                            <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">{edition.year}</td>
                            <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">
                              {edition.position}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden lg:block"></div>
          <div className="col-span-1 flex flex-col items-center">
            <div
              className={`flex w-full max-w-[300px] flex-col items-center ${getOpacityClass("2020")}`}
              onMouseEnter={() => handleMouseEnter("2020")}
              onMouseLeave={handleMouseLeave}
            >
              {/* Connecting line to timeline */}
              <div className="h-8 w-[2px] bg-gray-300"></div>
              <div className="mt-4 flex w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all duration-300">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Award image */}
                  <div className="mb-4 md:mb-0 md:w-2/5">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mhlN3K6djvtqVq2WfO1iI1fzpoz4sZ.png"
                      alt={`Prêmio 2020`}
                      width={200}
                      height={280}
                      className="h-auto w-full object-contain rounded-md"
                    />
                  </div>

                  {/* Award editions table */}
                  <div className="md:w-3/5">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">
                            Edição do ano
                          </th>
                          <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">
                            Posição
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {awards[2].editions.map((edition) => (
                          <tr key={edition.year}>
                            <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">{edition.year}</td>
                            <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">
                              {edition.position}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden lg:block"></div>
        </div>
      </div>
    </section>
  )
}
