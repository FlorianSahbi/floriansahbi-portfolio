export type Locale = 'fr' | 'en'

export function buildAlternates(lang: Locale, pathname: string) {
  const base = 'https://floriansahbi.dev'
  const isFr = lang === 'fr'

  const frUrl = pathname.startsWith('/fr')
    ? `${base}${pathname}`
    : `${base}${pathname.replace('/en', '/fr')}`

  const enUrl = pathname.startsWith('/en')
    ? `${base}${pathname}`
    : `${base}${pathname.replace('/fr', '/en')}`

  return {
    canonical: isFr ? frUrl : enUrl,
    languages: {
      fr: frUrl,
      en: enUrl,
      'x-default': enUrl,
    },
  } as const
}

export function absoluteUrl(pathname: string) {
  return `https://floriansahbi.dev${pathname}`
}
