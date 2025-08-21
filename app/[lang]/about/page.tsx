import { Metadata } from 'next'
import AboutClientPage from './page.client'
import {
  ABOUT,
  getContentBySlug,
  getStaticParams,
  Locale,
  EnhancedItem,
} from '@/lib/content/service'
import { notFound } from 'next/navigation'
import { Person, WithContext } from 'schema-dts'
import { buildAlternates, absoluteUrl } from '@/lib/seo/alternates'

function generateJsonLd(lang: Locale): WithContext<Person> {
  const isFr = lang === 'fr'

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Florian Sahbi',
    url: `https://floriansahbi.dev/${lang}/about`,
    image: 'https://floriansahbi.dev/about.jpeg',
    jobTitle: isFr
      ? 'Conception & développement Fullstack JavaScript – Florian Sahbi'
      : 'Remote JavaScript / Next.js Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'floriansahbi.dev',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Normandie',
      addressCountry: 'FR',
    },
    sameAs: [
      `https://floriansahbi.dev/${lang}/about`,
      `https://floriansahbi.com/${lang}/about`,
      'https://www.linkedin.com/in/floriansahbi/',
      'https://github.com/FlorianSahbi',
    ],
  }
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const { lang } = params
  const content = getContentBySlug(lang, 'about')
  if (!content?.meta) return {}

  const pathname = `/${lang}/about`
  const base = 'https://floriansahbi.dev'

  return {
    ...(content.meta as Metadata),
    metadataBase: new URL(base),
    alternates: buildAlternates(lang, pathname),
    openGraph: {
      ...(content.meta.openGraph ?? {}),
      url: absoluteUrl(pathname),
    },
  }
}

export async function generateStaticParams() {
  return getStaticParams(ABOUT)
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  const data = (await getContentBySlug(lang, ABOUT)) as
    | EnhancedItem<typeof ABOUT>
    | undefined

  if (!data) {
    notFound()
  }

  const jsonLd = generateJsonLd(lang)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClientPage {...data} />
    </>
  )
}
