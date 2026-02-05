import {routing} from "@/i18n/routing";

export function localePagePathname(slug: keyof typeof routing.pathnames, locale: keyof typeof routing.locales) {
  return routing?.pathnames?.[slug]?.[locale]?.replace("/", "");
}
