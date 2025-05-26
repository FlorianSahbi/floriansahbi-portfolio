'use client'

import Link from 'next/link'
import Particles from './components/particles'
import type { EnhancedItem } from '@/lib/content/service'
import { HOME } from '@/lib/content/service'

type HomeClientProps = Pick<
  EnhancedItem<typeof HOME>,
  | 'navigation'
  | 'title'
  | 'seoTitle'
  | 'subtitle'
  | 'footerNoteLabel'
  | 'footerNoteCtaLabel'
  | 'footerNoteLink'
>

export default function HomeClient({
  navigation,
  title,
  seoTitle,
  subtitle,
  footerNoteLabel,
  footerNoteCtaLabel,
  footerNoteLink,
}: HomeClientProps) {
  const AnimatedSeparator = () => (
    <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
  )

  return (
    <div className="relative flex h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden overscroll-none bg-gradient-to-tl from-black via-zinc-600/20 to-black md:h-screen">
      <nav className="animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-zinc-500 duration-500 hover:text-zinc-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatedSeparator />

      <h1 className="sr-only">{seoTitle}</h1>

      <h2 className="md:my16 text-edge-outline my-6 animate-title cursor-default whitespace-nowrap bg-white bg-clip-text px-4 font-display text-5xl text-transparent duration-1000 sm:text-7xl md:text-9xl">
        {title}
      </h2>

      <AnimatedSeparator />

      <h3 className="max-w-sm animate-fade-in px-4 text-center text-sm text-zinc-500 sm:max-w-md md:max-w-lg">
        {subtitle}
      </h3>

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={150}
      />

      <p className="absolute bottom-6 w-full animate-fade-pop px-4 text-center text-xs text-zinc-500 opacity-0">
        <span className="flex justify-center">
          <span className="italic">Pssst…</span>{' '}
          {footerNoteLabel.replace(/^Pssst…\s*/, '')}
        </span>
        <a
          href={footerNoteLink}
          className="underline underline-offset-4 hover:cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          {footerNoteCtaLabel} →
        </a>
      </p>
    </div>
  )
}
