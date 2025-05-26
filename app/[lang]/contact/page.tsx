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

export function generateMetadata({
  params,
}: {
  params: { lang: Locale }
}): Metadata {
  const { lang } = params
  const content = getContentBySlug(lang, CONTACT)
  return (content?.meta ?? {}) as Metadata
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
