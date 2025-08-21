import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getStaticParams,
  CONTACT,
  Locale,
  getContentBySlug,
} from '@/lib/content/service'
import ContactClientPage from './page.client'
import { WithContext, ContactPage as ContactPageLD } from 'schema-dts'
import { buildAlternates, absoluteUrl } from '@/lib/seo/alternates'

function generateJsonLd(lang: Locale): WithContext<ContactPageLD> {
  const isFr = lang === 'fr'
  const pageUrl = `https://floriansahbi.dev/${lang}/contact`
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: pageUrl,
    mainEntity: {
      '@type': 'Organization',
      name: 'Florian Sahbi',
      url: 'https://floriansahbi.dev',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: isFr ? 'support technique' : 'technical support',
        email: 'florian.sahbi@gmail.com',
        availableLanguage: isFr
          ? ['Français', 'Anglais']
          : ['French', 'English'],
      },
    },
  }
}

export function generateStaticParams(): Array<{ lang: Locale }> {
  return getStaticParams(CONTACT)
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const { lang } = params
  const content = getContentBySlug(lang, CONTACT)
  if (!content?.meta) return {}

  const pathname = `/${lang}/contact`
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

export default function ContactPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const data = getContentBySlug(lang, CONTACT)
  if (!data) notFound()
  const jsonLd = generateJsonLd(lang)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ContactClientPage {...data} />
    </>
  )
}
