"use client"

import {Facebook, Instagram, Linkedin} from "lucide-react"
import {useTranslations} from 'next-intl'
import {Link} from "@/i18n/navigation"
import FooterNewsletterForm from "@/components/footer-newsletter-form";
import {useConfig} from "@/contexts/config-context";
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {useLanguage} from "@/contexts/language-context";
import {LinkItem} from "@/components/commitment-section";

export function SocialLinks({links}) {
  return (
    <div className="flex space-x-4">
      {!!links && Object.entries(links).map(([key, value]) => {
        const Icon = {
          facebook: Facebook,
          linkedin: Linkedin,
          instagram: Instagram,
        }[key]

        return (
          <Link key={key} href={value || ""} className="text-[#1a408a]">
            <Icon className="w-6 h-6"/>
            <span className="sr-only uppercase">{key}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default function Footer() {
  // Usar traduções do next-intl
  const t = useTranslations('footer');
  const {config, isLoading, error} = useConfig()
  const { language } = useLanguage();

  return (
    <footer className="py-16 text-gray-700 bg-light-blue">
      <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Column 1 - Logo and Newsletter */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <div className="flex flex-col">
              <img
                src="/images/alcast-logo.svg"
                alt="Alcast Logo"
                className="h-auto w-[200px]"
                style={{maxWidth: "100%"}}
              />
            </div>
          </Link>

          <p className="text-sm">
            {t('tagline')}
          </p>

          <p className="text-sm">
            {t('copyright')}
          </p>

          {/*<div className="space-y-2">*/}
          {/*  <p className="text-sm font-medium">{t('newsletter.title')}</p>*/}
          {/*  <div className="flex flex-col space-y-2">*/}
          {/*    <input*/}
          {/*      type="email"*/}
          {/*      placeholder={t('newsletter.placeholder')}*/}
          {/*      className="px-3 py-2 text-sm rounded border border-gray-300"*/}
          {/*    />*/}
          {/*    <button className="rounded bg-[#1a408a] px-3 py-2 text-center text-sm text-white">*/}
          {/*      {t('newsletter.button')}*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <FooterNewsletterForm/>

          <SocialLinks links={config?.social_networks} />
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h3 className="mb-4 text-base font-medium text-[#1a408a]">{t('navigation.title')}</h3>
          <ul className="space-y-3 text-sm">
            {config?.menus?.navigation?.items?.map((item) => (
              <li key={item?.url}>
                <LinkItem
                  language={language}
                  url={item?.url}
                  isExternal={item?.is_external}
                  content={item?.text}
                  className="hover:text-[#1a408a]"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Services and Contact */}
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-base font-medium text-[#1a408a]">{t('services.title')}</h3>
            <ul className="space-y-3 text-sm">
              {config?.menus?.services?.items?.map((item) => (
                <li key={item?.url}>
                  <LinkItem
                    language={language}
                    url={item?.url}
                    isExternal={item?.is_external}
                    content={item?.text}
                    className="hover:text-[#1a408a]"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-medium">{config?.address?.country}</p>
            <p>{config?.address?.city}/{config?.address?.state}</p>
            <p className="flex items-center">
              <span className="inline-flex justify-center items-center mr-1 w-5 h-5 text-xs bg-gray-300 rounded-full">
                ☎
              </span>
              <span className="ml-1">{config?.contact_info?.phone}</span>
            </p>
            <p>
              {config?.address?.address}
            </p>
          </div>
        </div>

        {/* Column 4 - Policies */}
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-base font-medium text-[#1a408a]">{getContentByLanguage(config?.footer_info?.policy_quality?.title, language)}</h3>
            <p className="text-sm leading-relaxed">
              {getContentByLanguage(config?.footer_info?.policy_quality?.description, language)}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-medium text-[#1a408a]">{getContentByLanguage(config?.footer_info?.policy_environmental?.title, language)}</h3>
            <p className="text-sm leading-relaxed">
              {getContentByLanguage(config?.footer_info?.policy_environmental?.description, language)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
