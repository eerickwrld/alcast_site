"use client"

import TimelineDot from "./timeline-dot"

interface TimelineProps {
  years: string[]
  hoveredYear: string | null
  onMouseEnter: (year: string) => void
  onMouseLeave: () => void
}

export default function Timeline({ years, hoveredYear, onMouseEnter, onMouseLeave }: TimelineProps) {
  return (
    <div className="relative my-4">
      <div className="pb-4">
        <div className="relative h-[2px] w-full bg-gray-300">
          <div className="flex w-full">
            {years.map((year) => (
              <div key={year} className="w-1/4 flex justify-center">
                <TimelineDot
                  year={year}
                  isHovered={hoveredYear === year}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
