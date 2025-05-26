import ProjectClientPage from './page.client'
import {
  getContentBySlug,
  getStaticParams,
  EnhancedItem,
  Locale,
  USE_CASES,
} from '@/lib/content/service'
import { Metadata } from 'next'
import {
  WithContext,
  WebPage,
  Article,
  ImageObject,
  Organization,
  Person,
} from 'schema-dts'
import { notFound } from 'next/navigation'

function generateJsonLd(
  lang: Locale,
  slug: string,
  data: EnhancedItem<typeof USE_CASES>,
): Array<WithContext<WebPage> | WithContext<Article>> {
  const base = process.env.NEXT_PUBLIC_SITE_URL!
  const url = `${base}/${lang}/projects/${slug}`
  const title = data.meta.title
  const description = data.meta.description
  const imageUrl = `${base}${data.coverImage}`

  const webPage: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    description,
  }

  const article: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: 'Florian Sahbi',
      url: `${base}/${lang}/about`,
    } as Person,
    publisher: {
      '@type': 'Organization',
      name: data.client,
      logo: {
        '@type': 'ImageObject',
        url: `${base}/logo.png`,
      },
    } as Organization & { logo: ImageObject },
    datePublished: `${data.year}-06-15T00:00:00Z`,
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return [webPage, article]
}

export function generateStaticParams(): Array<{ lang: Locale; slug: string }> {
  return getStaticParams(USE_CASES)
}

export function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string }
}): Metadata {
  const { lang, slug } = params
  const content = getContentBySlug(lang, USE_CASES, slug)
  return (content?.meta ?? {}) as Metadata
}

export default function ProjectPage({
  params,
}: {
  params: { lang: Locale; slug: string }
}) {
  const { lang, slug } = params
  const data = getContentBySlug(lang, USE_CASES, slug)
  if (!data) notFound()

  const list = getStaticParams(USE_CASES)
    .filter((p) => p.lang === lang)
    .map((p) => {
      const item = getContentBySlug(lang, USE_CASES, p.slug)
      return { slug: p.slug, client: item?.client ?? p.slug }
    })

  const idx = list.findIndex((item) => item.slug === slug)
  const prev = list[(idx - 1 + list.length) % list.length]
  const next = list[(idx + 1) % list.length]

  const jsonLd = generateJsonLd(lang, slug, data)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectClientPage
        {...data}
        lang={lang}
        prevSlug={prev.slug}
        prevTitle={prev.client}
        nextSlug={next.slug}
        nextTitle={next.client}
      />
    </>
  )
}
