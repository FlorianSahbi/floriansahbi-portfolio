'use client'

import Link from 'next/link'
import { Mdx } from '@/app/[lang]/components/mdx'
import './mdx.css'
import type { EnhancedItem, USE_CASES } from '@/lib/content/service'
import Header from '../components/header'
import Navigation from '../../components/navigation'

type ProjectClientPageProps = EnhancedItem<typeof USE_CASES> & {
  lang: string
  prevSlug: string
  prevTitle: string
  nextSlug: string
  nextTitle: string
}

export default function ProjectClientPage({
  body,
  navigation,
  title,
  description,
  lang,
  prevSlug,
  prevTitle,
  nextSlug,
  nextTitle,
}: ProjectClientPageProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="relative z-20">
        <Header title={title} description={description} />
        <Navigation data={navigation} withObserver />
      </div>

      <Link
        href={`/${lang}/projects/${prevSlug}`}
        className="group fixed inset-y-0 left-0 z-10 hidden w-1/5 opacity-0 transition-opacity duration-300 hover:opacity-60 md:w-1/5 lg:block"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <span className="absolute left-4 top-1/2 -translate-x-full -translate-y-1/2 whitespace-nowrap font-medium text-white transition-transform duration-300 group-hover:translate-x-0">
          {prevTitle}
        </span>
      </Link>

      <Link
        href={`/${lang}/projects/${nextSlug}`}
        className="group fixed inset-y-0 right-0 z-10 hidden w-1/5 opacity-0 transition-opacity duration-300 hover:opacity-60 md:w-1/5 lg:block"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full whitespace-nowrap font-medium text-white transition-transform duration-300 group-hover:translate-x-0">
          {nextTitle}
        </span>
      </Link>

      <article className="prose prose-zinc prose-quoteless relative z-10 mx-auto px-4 py-12">
        <Mdx code={body.code} />
      </article>
    </div>
  )
}
