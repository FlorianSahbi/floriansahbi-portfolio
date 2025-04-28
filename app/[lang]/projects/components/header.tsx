
"use client"

import type { EnhancedItem } from "@/lib/content/service"
import { USE_CASES } from "@/lib/content/service"

type HeaderProps = Pick<EnhancedItem<typeof USE_CASES>, 'title' | 'description'>;

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-800 to-black">
      <div className="mx-auto max-w-2xl py-24 sm:py-32 px-6 lg:px-8 text-center flex flex-col items-center text-zinc-300">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display mb-6">
          {title}
        </h1>
        <p className="text-lg leading-8">{description}</p>
      </div>
    </header>
  )
}
