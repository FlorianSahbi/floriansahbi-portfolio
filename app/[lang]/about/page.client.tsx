'use client'

import Image from 'next/image'
import Section from './components/section'
import { Navigation as NavType, WorksSection } from '@/.contentlayer/generated'
import BigCta from '../components/bigCta'
import Badge from '../components/badge'
import Navigation from '../components/navigation'
import { Download, PhoneCall } from 'lucide-react'
import { useParams } from 'next/navigation'

import type { EnhancedItem, Locale } from '@/lib/content/service'
import { ABOUT } from '@/lib/content/service'
import Separator from '../components/separator'
import React from 'react'

type AboutPageProps = EnhancedItem<typeof ABOUT>

export default function AboutClientPage({
  buttonLabel,
  title,
  subTitle,
  seoTitle,
  socials,
  description,
  contactButtonLabel,
  useCaseButtonLabel,
  worksButtonLabel,
  worksCtaDescription,
  works,
  studies,
  travel,
  skills,
  hobbies,
  navigation,
}: AboutPageProps) {
  const { lang } = useParams() as { lang: Locale }

  const sections: WorksSection[] = [
    works,
    studies,
    travel,
    skills,
    hobbies,
  ].filter(Boolean) as WorksSection[]

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation data={navigation as NavType[]} />

      <main className="container mx-auto flex max-w-4xl flex-col gap-8 px-4 pb-16 pt-32 text-zinc-300 md:grid md:grid-cols-[30%_1fr]">
        <aside className="top-20 justify-items-center space-y-3 self-center md:sticky md:self-start">
          <div className="relative aspect-square w-40 overflow-hidden rounded-full border border-emerald-600">
            <Image
              src="/about.jpeg"
              alt="Portrait de Florian Sahbi"
              fill
              priority
              sizes="160px"
            />
          </div>

          <div className="flex items-center gap-1 text-zinc-200">
            <Badge
              hoverable={false}
              icon="map-pin"
              label={lang === `fr` ? `Normandie, France` : `Normandy, France`}
            />
          </div>

          <div className="flex gap-2">
            <Badge
              hoverable={false}
              label={lang == 'fr' ? `Français` : `French`}
            />
            <Badge
              hoverable={false}
              label={lang == 'fr' ? `Anglais` : `English`}
            />
          </div>
        </aside>

        <section aria-labelledby="about-heading" className="space-y-6">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="sr-only">{seoTitle}</h1>

            <h2
              id="about-heading"
              aria-hidden="true"
              className="text-center text-6xl font-extrabold md:text-left"
            >
              {title}
            </h2>

            <h2 className="text-center text-3xl font-light text-zinc-500 md:text-left">
              {subTitle}
            </h2>
          </div>

          <nav
            aria-label="Liens sociaux"
            className="flex flex-wrap justify-center gap-3 text-xs md:justify-start"
          >
            {socials
              .filter((s) => s.label !== 'Email')
              .map((s) => (
                <Badge
                  key={s.href}
                  href={s.href}
                  icon={s.label}
                  label={s.label}
                />
              ))}
          </nav>

          <p className="text-lg">{description}</p>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <BigCta prefetch={false} href="/florian_sahbi_cv.pdf">
              <Download size={18} />
              {buttonLabel}
            </BigCta>

            <BigCta href={`/${lang}/contact`} color="outline">
              <PhoneCall size={16} />
              {contactButtonLabel}
            </BigCta>
          </div>

          <Separator />

          <Section key={sections[0].title} {...sections[0]} />

          <Separator half />

          <p className="text-center text-sm italic text-zinc-400">
            <span className="not-italic">💡</span>
            {worksCtaDescription}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-4">
            <BigCta
              href={`/${lang}/projects/louise-damas`}
              variant="condensed"
              color="primary"
            >
              {useCaseButtonLabel}
            </BigCta>

            <BigCta
              href={`/${lang}/projects`}
              variant="condensed"
              color="outline"
            >
              {worksButtonLabel}
            </BigCta>
          </div>

          <Separator />

          {sections.slice(1).map((sec, idx) => (
            <React.Fragment key={idx}>
              <Section {...sec} />
              <Separator />
            </React.Fragment>
          ))}
        </section>
      </main>
    </div>
  )
}
