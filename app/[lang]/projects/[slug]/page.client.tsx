"use client"

import Link from "next/link"
import { Mdx } from "@/app/[lang]/components/mdx"
import "./mdx.css"
import type { EnhancedItem, USE_CASES } from "@/lib/content/service"
import Header from "../components/header"
import Navigation from "../../components/navigation"

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
    <div className="bg-zinc-50 min-h-screen">

      <div className="relative z-20">
        <Header title={title} description={description} />
        <Navigation data={navigation} withObserver />
      </div>

      <Link
        href={`/${lang}/projects/${prevSlug}`}
        className="
          hidden lg:block
          md:w-1/5  
          group
          fixed inset-y-0 left-0 w-1/5
          z-10
          opacity-0 hover:opacity-60
          transition-opacity duration-300
        "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />
        <span
          className="
            absolute top-1/2 left-4
            -translate-y-1/2 -translate-x-full
            text-white font-medium
            whitespace-nowrap
            transition-transform duration-300
            group-hover:translate-x-0
          "
        >
          {prevTitle}
        </span>
      </Link>

      <Link
        href={`/${lang}/projects/${nextSlug}`}
        className="
          hidden lg:block
          md:w-1/5 
          group
          fixed inset-y-0 right-0 w-1/5
          z-10
          opacity-0 hover:opacity-60
          transition-opacity duration-300
        "
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent pointer-events-none" />
        <span
          className="
            absolute top-1/2 right-4
            -translate-y-1/2 translate-x-full
            text-white font-medium
            whitespace-nowrap
            transition-transform duration-300
            group-hover:translate-x-0
          "
        >
          {nextTitle}
        </span>
      </Link>

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless relative z-10">
        <Mdx code={body.code} />
      </article>
    </div>
  )
}
