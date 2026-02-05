import Image from "next/image"
import SegmentItem from "./segment-item"

interface SegmentCardProps {
  title: string
  image: string
}

interface SegmentCategoryProps {
  title: string
  backgroundColor: string
  segments: SegmentCardProps[]
}

export default function SegmentCategory({ title, backgroundColor, segments }: SegmentCategoryProps) {
  return (
    <section className={`py-12 ${backgroundColor}`}>
      <div className="container mx-auto px-4 z-0 md:px-6 relative">
        {/* Decorative diagonal lines */}
        <div className="absolute select-none -z-[1] right-0 top-0 h-full w-full overflow-hidden">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            className="absolute right-0 top-0 h-full w-full opacity-10"
          >
            <line x1="800" y1="0" x2="1200" y2="600" stroke="white" strokeWidth="2" />
            <line x1="600" y1="0" x2="1000" y2="600" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Category title */}
        <h2 className="mb-8 text-2xl font-bold text-white">{title}</h2>

        {/* Grid of segment cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {segments.map((app, index) => (
            <SegmentItem
              key={index}
              title={app.title}
              image={app.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
