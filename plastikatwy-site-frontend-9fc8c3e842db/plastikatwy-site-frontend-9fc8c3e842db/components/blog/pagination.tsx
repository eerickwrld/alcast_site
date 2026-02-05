import { ChevronLeft, ChevronRight } from "lucide-react"
import { LocalizedLink as Link } from "@/components/Link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Não mostrar paginação se houver apenas 1 página
  if (totalPages <= 1) return null
  
  // Função para gerar o link da página
  const getPageUrl = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}${basePath.includes('?') ? '&' : '?'}page=${page}`
  }
  
  // Determinar quais páginas mostrar
  const pages = []
  
  // Sempre mostrar a primeira página
  pages.push(1)
  
  // Adicionar páginas entre início e fim
  let startPage = Math.max(2, currentPage - 1)
  let endPage = Math.min(totalPages - 1, currentPage + 1)
  
  // Se estamos próximos do início, mostrar mais páginas à frente
  if (currentPage <= 3) {
    endPage = Math.min(totalPages - 1, 4)
  }
  
  // Se estamos próximos do fim, mostrar mais páginas anteriores
  if (currentPage >= totalPages - 2) {
    startPage = Math.max(2, totalPages - 3)
  }
  
  // Adicionar elipses no início se necessário
  if (startPage > 2) {
    pages.push("...")
  }
  
  // Adicionar páginas do meio
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  // Adicionar elipses no fim se necessário
  if (endPage < totalPages - 1) {
    pages.push("...")
  }
  
  // Sempre mostrar a última página se houver mais de 1
  if (totalPages > 1) {
    pages.push(totalPages)
  }
  
  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      {/* Botão anterior */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center px-2 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Link>
      )}
      
      {/* Páginas */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-1.5 text-sm text-gray-500">
              ...
            </span>
          )
        }
        
        const isActive = page === currentPage
        
        return (
          <Link
            key={`page-${page}`}
            href={getPageUrl(Number(page))}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Link>
        )
      })}
      
      {/* Botão próximo */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center px-2 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      )}
    </nav>
  )
}
