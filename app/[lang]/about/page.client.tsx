"use client"

import Image from "next/image"
import Section from "./components/section"
import {
  Navigation as NavType,
  WorksSection,
} from "@/.contentlayer/generated"
import BigCta from "../components/bigCta"
import Badge from "../components/badge"
import Navigation from "../components/navigation"
import { Download, PhoneCall } from "lucide-react"
import { useParams } from "next/navigation"

import type { EnhancedItem, Locale } from "@/lib/content/service"
import { ABOUT } from "@/lib/content/service"
import Separator from "../components/separator"
import React from "react"

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

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-4xl flex flex-col md:grid md:grid-cols-[30%_1fr] gap-8 text-zinc-300">
        <aside className="md:sticky top-20 self-center md:self-start space-y-3 justify-items-center">
          <div className="aspect-square w-40 border border-emerald-600 rounded-full overflow-hidden relative">
            <Image
              src="/about.jpeg"
              alt="Portrait de Florian Sahbi"
              fill
              priority
              sizes="160px"
            />
          </div>

          <div className="flex items-center gap-1 text-zinc-200">
            <Badge hoverable={false} icon="map-pin" label={lang === `fr` ? `Normandie, France` : `Normandy, France`} />
          </div>

          <div className="flex gap-2">
            <Badge hoverable={false} label={lang == 'fr' ? `Français` : `French`} />
            <Badge hoverable={false} label={lang == 'fr' ? `Anglais` : `English`} />
          </div>
        </aside>

        <section aria-labelledby="about-heading" className="space-y-6">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="sr-only">{seoTitle}</h1>

            <h2
              id="about-heading"
              aria-hidden="true"
              className="text-6xl font-extrabold text-center md:text-left"
            >
              {title}
            </h2>

            <h2 className="text-3xl font-light text-zinc-500 text-center md:text-left">
              {subTitle}
            </h2>
          </div>

          <nav
            aria-label="Liens sociaux"
            className="flex flex-wrap gap-3 justify-center md:justify-start text-xs"
          >
            {socials
              .filter((s) => s.label !== "Email")
              .map((s) => (
                <Badge key={s.href} href={s.href} icon={s.label} label={s.label} />
              ))}
          </nav>

          <p className="text-lg">{description}</p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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

          <p className="text-sm italic text-zinc-400 text-center">
            <span className="not-italic">💡</span>
            {worksCtaDescription}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-3">
            <BigCta href={`/${lang}/projects/louise-damas`} variant="condensed" color="primary">
              {useCaseButtonLabel}
            </BigCta>

            <BigCta href={`/${lang}/projects`} variant="condensed" color="outline">
              {worksButtonLabel}
            </BigCta>
          </div>

          <Separator />

          {sections.slice(1).map((sec, idx) => (
            <React.Fragment key={idx}>
              <Section  {...sec} />
              <Separator />
            </React.Fragment>
          ))}
        </section>
      </main>
    </div>
  )
}
