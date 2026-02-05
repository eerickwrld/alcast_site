"use client"

import Image from "next/image"

interface AwardItemProps {
  year: string
  image: string
  editions: Array<{
    year: string
    position: string
  }>
  position: "top" | "bottom"
  isHovered: boolean
  onMouseEnter: (year: string) => void
  onMouseLeave: () => void
}

export default function AwardItem({
  year,
  image,
  editions,
  position,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: AwardItemProps) {
  const getOpacityClass = () => {
    if (isHovered === null) return "opacity-100 transition-opacity duration-300"
    return isHovered ? "opacity-100 scale-[1.02] shadow-md" : "opacity-40"
  }

  return (
    <div
      className={`flex w-full max-w-[300px] flex-col items-center ${getOpacityClass()} transition-all duration-300`}
      onMouseEnter={() => onMouseEnter(year)}
      onMouseLeave={onMouseLeave}
    >
      {position === "top" && <div className="h-8 w-[2px] bg-gray-300"></div>}
      <div
        className={`${position === "top" ? "mt-4" : "mb-4"} flex w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all duration-300`}
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Award image */}
          <div className="mb-4 md:mb-0 md:w-2/5">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Prêmio ${year}`}
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
                  <th className="pb-2 text-center font-medium text-[#1A408A] border-b border-gray-200">Posição</th>
                </tr>
              </thead>
              <tbody>
                {editions.map((edition) => (
                  <tr key={edition.year}>
                    <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">{edition.year}</td>
                    <td className="py-2 text-center text-[#1A408A] border-b border-gray-100">{edition.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {position === "bottom" && <div className="h-8 w-[2px] bg-gray-300"></div>}
    </div>
  )
}
