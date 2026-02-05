"use client"

import Image from "next/image"
import { twMerge } from "tailwind-merge"

export type MissionCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
  className?: string
  imageClassName?: string
  contentClassName?: string
}

export default function MissionCard({
  title,
  description,
  imageSrc,
  imageAlt,
  className,
  imageClassName,
  contentClassName
}: MissionCardProps) {
  return (
    <div className={twMerge(
      "flex flex-col rounded-lg overflow-hidden max-w-[400px] shadow-lg group",
      className
    )}>
      {/* Image section */}
      <div className={twMerge("h-[180px] relative overflow-hidden", imageClassName)}>
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content section */}
      <div className={twMerge(
        "bg-white p-4 flex flex-col items-center text-center flex-grow",
        contentClassName
      )}>
        <h3 className="text-xl text-center text-gray-800 mb-2">{title}</h3>
        <p className="text-center text-sm text-gray-700">
          {description}
        </p>
      </div>
    </div>
  )
}
