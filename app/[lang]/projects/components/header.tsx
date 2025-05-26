'use client'

import type { EnhancedItem } from '@/lib/content/service'
import { USE_CASES } from '@/lib/content/service'

type HeaderProps = Pick<EnhancedItem<typeof USE_CASES>, 'title' | 'description'>

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-800 to-black">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center text-zinc-300 sm:py-32 lg:px-8">
        <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {title}
        </h1>
        <p className="text-lg leading-8">{description}</p>
      </div>
    </header>
  )
}
