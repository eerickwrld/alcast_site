"use client"

import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { QualityItem } from "@/services/types"
import {useEffect, useState} from "react";

export function FeatureCard({ feature }: { feature: any }) {
  const [image, setImage] = useState<string | null>(null);

  // useEffect(() => {
  //   fetch(feature.image, {
  //     method: "GET",
  //     headers: {
  //       "ngrok-skip-browser-warning": "true", // Example: to bypass ngrok warning
  //     },
  //   })
  //     .then((response) => response.blob())
  //     .then((imageBlob) => {
  //       setImage(URL.createObjectURL(imageBlob));
  //     })
  //     .catch((error) => console.error("Error fetching image:", error));
  // }, [feature.image]);

  return (
    <div key={feature.title} className="flex group flex-col rounded-lg max-w-[300px] overflow-hidden shadow-lg">
      {/* Image section */}
      <div className="h-[180px] overflow-hidden relative">
        <Image
          src={feature.image || null}
          alt={feature.title}
          fill
          className="object-cover transition-all group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content section */}
      <div className="flex flex-col flex-grow items-center p-4 text-center bg-white">
        <div className="mb-4">
          <img src={feature.icon} alt={feature.title} />
        </div>
        <h3 className="text-xl text-center text-gray-800">{feature.title}</h3>
      </div>
    </div>
  )
}

export function CurvedItem({ backgroundColor = "#F9FAFB", curve = "convex", position = "bottom" }: {
  backgroundColor?: string,
  curve?: "concave" | "convex",
  position?: "top" | "bottom"
}) {
  if (curve === "concave") {
    return (
      <div className={twMerge(
        "absolute left-0 right-0 h-16 md:h-24 z-20",
        position === "top" && "top-0",
        position === "bottom" && "bottom-0",
      )}>
        <svg
          className="w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill={backgroundColor}
            fillOpacity="1"
            d="M0,240L1440,240L1440,320L0,320Z M0,240C360,180,1080,180,1440,240"
          ></path>
        </svg>
      </div>
    )
  }

  if (curve === "convex") {
    return (
      <div className="absolute right-0 -bottom-px left-0 h-16 md:h-24">
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill={backgroundColor}
            fillOpacity="1"
            d="M0,96L80,106.7C160,117,320,139,480,149.3C640,160,800,160,960,138.7C1120,117,1280,75,1360,53.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    )
  }

  return null
}

export default function FeatureCards({ qualities = [] }: { qualities?: QualityItem[] }) {
  // Se tiver dados da API, transformar para o formato esperado
  const features = qualities.length > 0 
    ? qualities.map(({custom_fields_data}, index) => ({
        image: custom_fields_data.image,
        icon: custom_fields_data.icon,
        title: custom_fields_data.title
      }))
    : []

  return (
    <section className="w-full bg-white">
      <div className="relative pt-16 pb-32 w-full bg-light-blue">

        <CurvedItem backgroundColor="#1A408A" curve="concave" />

        {/* Decorative vector */}
        <div className="overflow-hidden absolute top-0 right-0 w-full h-full">
          <img src="/images/a-letter.svg" alt="" className="absolute top-0 right-0 w-auto h-full" aria-hidden="true" />
        </div>

        {/* Content container */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1557px]">
          <div className="flex flex-wrap gap-8 justify-center">
            {features.map((feature, index) => <FeatureCard key={index} feature={feature} />)}
          </div>
        </div>
      </div>
    </section>
  )
}