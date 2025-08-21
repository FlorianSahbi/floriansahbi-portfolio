import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllContent,
  getContentBySlug,
  getStaticParams,
  Locale,
  USE_CASES,
  PROJECT,
  PROJECTS,
  EnhancedItem,
  NavigationItem,
} from '@/lib/content/service'
import ProjectsClientPage from './page.client'
import { buildAlternates, absoluteUrl } from '@/lib/seo/alternates'

type UseCaseItem = EnhancedItem<typeof USE_CASES>
type UseCaseWithHref = UseCaseItem & { href: string }

export function generateStaticParams(): Array<{ lang: Locale }> {
  return getStaticParams(PROJECT).map(({ lang }) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const { lang } = params
  const page = getContentBySlug(lang, PROJECT) as
    | EnhancedItem<typeof PROJECT>
    | undefined

  if (!page?.meta) return {}

  const pathname = `/${lang}/projects`
  const base = 'https://floriansahbi.dev'

  return {
    ...(page.meta as Metadata),
    metadataBase: new URL(base),
    alternates: buildAlternates(lang, pathname),
    openGraph: {
      ...(page.meta.openGraph ?? {}),
      url: absoluteUrl(pathname),
    },
  }
}

export default function ProjectsPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const raw = getAllContent(lang, USE_CASES) as UseCaseItem[]
  if (!raw.length) notFound()

  const data: UseCaseWithHref[] = raw.map((item) => ({
    ...item,
    href: `/${lang}/${PROJECTS}/${item.slug}`,
  }))

  const featured = data.filter((i) => i.featured)
  const others = data.filter((i) => !i.featured)

  const edito = getContentBySlug(lang, PROJECT) as
    | EnhancedItem<typeof PROJECT>
    | undefined

  const globals = getContentBySlug(lang, 'globals' as const) as
    | {
        navigation: NavigationItem[]
      }
    | undefined
  const navigation = globals?.navigation ?? []

  const jsonLd = (() => {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://floriansahbi.dev'
    const isFr = lang === 'fr'
    const list = data.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'CreativeWork',
        name: i.title,
        url: `${siteUrl}${i.href}`,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: 'floriansahbi.dev',
          publisher: { '@type': 'Person', name: 'Florian Sahbi' },
        },
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/${lang}/projects`,
          url: `${siteUrl}/${lang}/projects`,
          name: isFr
            ? 'Projets – Florian Sahbi | Next.js & Headless E-commerce'
            : 'Projects – Florian Sahbi | Next.js & Headless E-commerce',
          description: isFr
            ? 'Découvrez une sélection ...'
            : 'Discover a curated ...',
          inLanguage: isFr ? 'fr-FR' : 'en-US',
          isPartOf: { '@id': `${siteUrl}/#website` },
          mainEntity: { '@id': `${siteUrl}/${lang}/projects#projectsList` },
        },
        {
          '@type': 'ItemList',
          '@id': `${siteUrl}/${lang}/projects#projectsList`,
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: list.length,
          itemListElement: list,
        },
      ],
    }
  })()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClientPage
        navigation={navigation}
        edito={edito}
        featured={featured}
        projects={others}
        {...edito}
      />
    </>
  )
}
