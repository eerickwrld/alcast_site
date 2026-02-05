import Header from "@/components/header"
import Footer from "@/components/footer"
import { LocalizedLink as Link } from "@/components/Link"

interface NotFoundProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export default function NotFound({
  title = "Artigo não encontrado",
  description = "O artigo que você está procurando não foi encontrado.",
  buttonText = "Voltar para o blog",
  buttonLink = "/blog"
}: NotFoundProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="container px-4 py-16 text-center md:px-6">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">{title}</h1>
        <p className="mb-8 text-gray-600">{description}</p>
        <Link
          href={buttonLink}
          className="px-6 py-2 text-white bg-blue-600 rounded-md transition hover:bg-blue-700"
        >
          {buttonText}
        </Link>
      </div>
      <Footer />
    </main>
  )
}
