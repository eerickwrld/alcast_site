"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface AuthorCardProps {
  author: {
    id: number;
    name: string;
    email?: string;
    bio?: string;
    avatar?: string;
    role?: string;
  };
  className?: string;
}

export default function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <div className={twMerge("py-6 my-8 border-t border-gray-200 border-b", className)}>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={`Foto de ${author.name}`}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#1A408A] leading-none">{author.name}</h3>
          {author.role && <p className="text-gray-600 mb-2">{author.role}</p>}
          {author.bio && (
            <p className="text-gray-700">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
