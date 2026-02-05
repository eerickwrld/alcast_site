"use client"

import {useState, useEffect, useRef} from "react"
import {Menu, X, ChevronDown} from "lucide-react"
import {useLanguage} from "@/contexts/language-context";
import {usePathname} from '@/i18n/navigation'
import {useRouter} from "next/navigation";
import {useConfig} from "@/contexts/config-context";
import {LocalizedLink} from "@/components/Link";
import {LinkItem} from "@/components/commitment-section";

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const {setLanguage, language, getLanguageOption, availableLanguages} = useLanguage()
  const {config, isLoading, error} = useConfig()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Close dropdowns when menu is toggled
    setIsProductsDropdownOpen(false)
    setIsLanguageDropdownOpen(false)
  }

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen)
    setIsLanguageDropdownOpen(false)
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
    setIsProductsDropdownOpen(false)
  }

  const changeLanguage = (lang: string) => {
    setLanguage(lang as any)
    setIsLanguageDropdownOpen(false)
    setIsMenuOpen(false) // Optional: close the menu after language selection

    router.replace(`/${lang}`)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  const currentLanguage = getLanguageOption(language);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1A408A] text-white font-manrope">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 max-w-[1557px]">
        {/* Logo - Fixed size with min-width to prevent resizing */}
        <LocalizedLink href="/" className="flex items-center flex-shrink-0">
          <div className="relative w-[129px] h-[46px] min-w-[129px]">
            <img
              src="/images/alcast-logo.svg"
              alt="Alcast Logo"
              className="w-full h-full object-contain"
              style={{
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
        </LocalizedLink>

        {/* Desktop Navigation with responsive font sizes */}
        <nav className="hidden items-center space-x-10 lg:flex">
          {config?.menus?.principal?.items?.map((item) => (
            <LinkItem
              key={item?.url}
              language={language}
              url={item?.url}
              isExternal={item?.is_external}
              content={item?.text}
              className="text-[16px] xl:text-[20px] hover:text-gray-300 whitespace-nowrap"
            />
          ))}
        </nav>

        {/* Language Selector - Desktop - Flag only on smaller screens */}
        <div className="relative hidden lg:block">
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center space-x-2 text-[16px] xl:text-[20px] font-[400] hover:text-gray-300"
          >
            <div className="flex gap-1 items-center">
                {currentLanguage.flag}
              <span className="hidden xl:inline">{currentLanguage.name}</span>
              <ChevronDown className="ml-1 h-5 w-5"/>
            </div>
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg">
              {availableLanguages.map((langOption) => (
                <button
                  key={langOption.code}
                  onClick={() => changeLanguage(langOption.code)}
                  className={`block w-full px-4 py-2 text-left text-[14px] xl:text-[16px] text-gray-800 hover:bg-gray-100 ${language === langOption.code ? "font-bold" : ""}`}
                >
                  <div className="flex gap-1 items-center">
                    {langOption.flag}
                    {langOption.name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="text-white lg:hidden">
          <Menu size={28}/>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
          <div
            ref={menuRef}
            className="absolute right-0 top-0 h-full w-[80%] max-w-sm transform bg-[#1A408A] shadow-xl transition-transform duration-300"
          >
            <div className="flex h-16 items-center justify-between border-b border-blue-800 px-6">
              <span className="text-lg font-medium">Menu</span>
              <button onClick={toggleMenu} className="text-white">
                <X size={24}/>
              </button>
            </div>
            <nav className="mt-4 px-6">
              <ul className="space-y-4">
                {/* <li>
                  <LnLink
                    href="/"
                    className="block py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Início
                  </LnLink>
                </li> */}
                <li>
                  <LnLink
                    href="/sobre-nos"
                    className="block py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Sobre nós
                  </LnLink>
                </li>
                <li>
                  <LnLink
                    href="/segmentos"
                    className="block py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Segmentos
                  </LnLink>
                </li>
                <li>
                  <button
                    onClick={toggleProductsDropdown}
                    className="flex w-full items-center justify-between py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                  >
                    <span>Produtos</span>
                    <ChevronDown className="h-5 w-5"/>
                  </button>
                  {isProductsDropdownOpen && (
                    <ul className="ml-4 mt-2 space-y-2 border-l border-blue-800 pl-4">
                      <li>
                        <LnLink
                          href="/produtos/bobinas"
                          className="block py-1 text-[16px] font-[400] text-white hover:text-gray-300"
                          onClick={toggleMenu}
                        >
                          Bobinas
                        </LnLink>
                      </li>
                      <li>
                        <LnLink
                          href="/produtos/chapas-lisas"
                          className="block py-1 text-[16px] font-[400] text-white hover:text-gray-300"
                          onClick={toggleMenu}
                        >
                          Chapas lisas
                        </LnLink>
                      </li>
                      <li>
                        <LnLink
                          href="/produtos/chapas-lavradas"
                          className="block py-1 text-[16px] font-[400] text-white hover:text-gray-300"
                          onClick={toggleMenu}
                        >
                          Chapas lavradas
                        </LnLink>
                      </li>
                      <li>
                        <LnLink
                          href="/produtos/discos-naturais"
                          className="block py-1 text-[16px] font-[400] text-white hover:text-gray-300"
                          onClick={toggleMenu}
                        >
                          Discos naturais
                        </LnLink>
                      </li>
                      <li>
                        <LnLink
                          href="/produtos/telhas"
                          className="block py-1 text-[16px] font-[400] text-white hover:text-gray-300"
                          onClick={toggleMenu}
                        >
                          Telhas
                        </LnLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <LnLink
                    href="/lme"
                    className="block py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    LME
                  </LnLink>
                </li>
                <li>
                  <LnLink
                    href="/esg"
                    className="block py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    ESG
                  </LnLink>
                </li>
                <li>
                  <LnLink
                    href="/blog"
                    className="block py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Blog
                  </LnLink>
                </li>
                <li>
                  <LnLink
                    href="/orcamento"
                    className="block py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Orçamento
                  </LnLink>
                </li>
                <li>
                  <LnLink
                    href="/contato"
                    className="block py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Contato
                  </LnLink>
                </li>
              </ul>

              {/* Language Selector - Mobile */}
              <div className="mt-6 border-t border-blue-800 pt-6">
                <button
                  onClick={toggleLanguageDropdown}
                  className="flex w-full items-center justify-between py-2 text-[18px] font-[400] text-white hover:text-gray-300"
                >
                  <div className="flex items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                    >
                      {currentLanguage.flag}

                    </svg>
                    {currentLanguage.name}
                  </div>
                  <ChevronDown className="h-5 w-5"/>
                </button>
                {isLanguageDropdownOpen && (
                  <div className="mt-2 space-y-2 border-l border-blue-800 pl-4">
                    {availableLanguages.map((langOption) => (
                      <button
                        key={langOption.code}
                        onClick={() => changeLanguage(langOption.code)}
                        className={`flex w-full items-center py-2 text-[16px] font-[400] text-white hover:text-gray-300 ${
                          language === langOption.code ? "font-bold" : ""
                        }`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-5 w-5"
                        >
                          {langOption.flag}
                        </svg>
                        {langOption.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
