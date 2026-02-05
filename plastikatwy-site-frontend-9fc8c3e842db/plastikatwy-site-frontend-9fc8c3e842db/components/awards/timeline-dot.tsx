"use client"

interface TimelineDotProps {
  year: string
  isHovered: boolean
  onMouseEnter: (year: string) => void
  onMouseLeave: () => void
}

export default function TimelineDot({ year, isHovered, onMouseEnter, onMouseLeave }: TimelineDotProps) {
  const getOpacityClass = () => {
    if (isHovered === null) return "opacity-100 transition-opacity duration-300"
    return isHovered ? "opacity-100" : "opacity-40"
  }

  return (
    <div
      className={`relative flex flex-col items-center cursor-pointer ${getOpacityClass()} transition-all duration-300`}
      onMouseEnter={() => onMouseEnter(year)}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`-mt-[4px] h-[10px] w-[10px] rounded-full ${
          isHovered ? "bg-[#1A408A] scale-125" : "bg-gray-400"
        } transition-all duration-300`}
      ></div>
      <span className="mt-4 text-sm font-medium text-[#1A408A]">{year}</span>
    </div>
  )
}
