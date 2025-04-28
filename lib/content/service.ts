import 'server-only'

import type { Navigation, Socials, Meta } from '../../.contentlayer/generated'
import { contentMap } from './contentMap'
import type { Locale, ContentType } from './contentMap'
import {
  PROJECT,
  PROJECTS,
  USE_CASES,
  ABOUT,
  HOME,
  GLOBALS,
  CONTACT,
} from './contentMap'
import { removeInternals, Clean } from './clean'
import { getFromCache, setToCache } from './cache'

export type { Locale, ContentType }
export {
  PROJECT,
  PROJECTS,
  USE_CASES,
  ABOUT,
  HOME,
  GLOBALS,
  CONTACT,
}

/**
 * A single navigation entry, cleaned and with an href
 */
export type NavigationItem = Clean<Navigation> & { href: string }

/**
 * Enhanced content item: core fields cleaned, plus navigation, socials, and optional meta
 */
export type EnhancedItem<T extends ContentType> = Clean<
  (typeof contentMap)[T][number]
> & {
  navigation: NavigationItem[]
  socials: Socials[]
  meta?: Clean<Meta>
}

/**
 * Retrieve all content items for a given locale and type.
 * Uses in-memory cache for performance.
 */
export function getAllContent<T extends ContentType>(
  locale: Locale,
  type: T
): EnhancedItem<T>[] {
  const key = `${locale}:${type}`
  const cached = getFromCache<EnhancedItem<T>>(key)
  if (cached) return cached

  const list = contentMap[type] || []
  const globalsList = contentMap[GLOBALS] || []
  const globals = globalsList.find((g) => g.lang === locale)
  if (!globals) return []

  const navigation: NavigationItem[] = globals.navigation.map((nav) => ({
    ...removeInternals(nav),
    href: `/${locale}${nav.href}`,
  }))

  const result = list
    .filter((i) => i.lang === locale)
    .map((item) => {
      const cleanItem = removeInternals(item) as Clean<typeof item>
      const cleanedMeta =
        'meta' in item && item.meta
          ? removeInternals(item.meta)
          : undefined

      return {
        ...cleanItem,
        navigation,
        socials: removeInternals(globals.socials),
        meta: cleanedMeta,
      } as EnhancedItem<T>
    })

  setToCache(key, result)
  return result
}

/**
 * Retrieve a single content item by slug (or by type if slug omitted).
 */
export function getContentBySlug<T extends ContentType>(
  locale: Locale,
  type: T,
  slug?: string
): EnhancedItem<T> | undefined {
  const all = getAllContent(locale, type)
  return all.find((i) => i.slug === (slug ?? type))
}

/**
 * Generate static params for Next.js App Router
 */
export function getStaticParams(
  type: ContentType
): Array<{ lang: Locale; slug: string }> {
  return (contentMap[type] || [])
    .filter((i) => Boolean(i.slug))
    .map((i) => ({ lang: i.lang as Locale, slug: i.slug }))
}
