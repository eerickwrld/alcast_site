"use client"

import { twMerge } from "tailwind-merge"
import { SearchIcon } from "lucide-react"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

interface BlogHeroProps {
  title?: string
  subtitle?: string
  showSearch?: boolean
  className?: string
}

export default function BlogHero({ 
  title = "Blog da Alcast", 
  subtitle = "Fique por dentro das novidades e tendências do setor de alumínio", 
  showSearch = true,
  className 
}: BlogHeroProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className={twMerge("py-16 text-white bg-primary", className)}>
      <div className="container px-4 mx-auto text-center md:px-6">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-lg text-blue-100 md:text-xl">
          {subtitle}
        </p>

        {/*{showSearch && (*/}
        {/*  <form onSubmit={handleSearch} className="flex mx-auto max-w-md">*/}
        {/*    <div className="relative flex-grow">*/}
        {/*      <input*/}
        {/*        type="text"*/}
        {/*        placeholder="Pesquisar artigos..."*/}
        {/*        value={searchQuery}*/}
        {/*        onChange={(e) => setSearchQuery(e.target.value)}*/}
        {/*        className="px-4 py-3 pr-10 w-full text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
        {/*      />*/}
        {/*      <button*/}
        {/*        type="submit"*/}
        {/*        className="flex absolute inset-y-0 right-0 items-center px-3 bg-blue-600 rounded-r-lg hover:bg-blue-700"*/}
        {/*      >*/}
        {/*        <SearchIcon className="w-5 h-5 text-white" />*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </form>*/}
        {/*)}*/}
      </div>
    </section>
  )
}
