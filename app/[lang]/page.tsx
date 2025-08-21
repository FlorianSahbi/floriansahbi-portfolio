import { Metadata } from 'next'
import { getContentBySlug, getStaticParams } from '@/lib/content/service'
import HomeClient from './page.client'
import { notFound } from 'next/navigation'
import { WithContext, Person } from 'schema-dts'
import { HOME, Locale } from '@/lib/content/contentMap'
import { absoluteUrl, buildAlternates } from '@/lib/seo/alternates'

function generateJsonLd(lang: Locale): WithContext<Person> {
  const isFr = lang === 'fr'
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Florian Sahbi',
    url: `https://floriansahbi.dev/${lang}`,
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

export function generateStaticParams(): Array<{ lang: Locale }> {
  return getStaticParams(HOME).map(({ lang }) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const { lang } = params
  const content = getContentBySlug(lang, HOME)
  if (!content?.meta) return {}

  const pathname = `/${lang}`

  return {
    ...(content.meta as Metadata),
    metadataBase: new URL('https://floriansahbi.dev'),
    alternates: buildAlternates(lang, pathname),
    openGraph: {
      ...(content.meta.openGraph ?? {}),
      url: absoluteUrl(pathname),
    },
  }
}

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const data = getContentBySlug(lang, HOME)
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

      <HomeClient {...data} />
    </>
  )
}
