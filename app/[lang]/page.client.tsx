"use client"

import Link from "next/link"
import Particles from "./components/particles"
import type { EnhancedItem } from "@/lib/content/service"
import { HOME } from "@/lib/content/service"

type HomeClientProps = Pick<
  EnhancedItem<typeof HOME>,
  |
  "navigation"
  | "title"
  | "seoTitle"
  | "subtitle"
  | "footerNoteLabel"
  | "footerNoteCtaLabel"
  | "footerNoteLink"
>;

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
    <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
  )

  return (
    <div className="flex flex-col items-center justify-center w-screen h-[100dvh] md:h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black relative overscroll-none">
      <nav className="animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatedSeparator />

      <h1 className="sr-only">{seoTitle}</h1>

      <h2 className="px-4 my-6 md:my16 text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display text-5xl sm:text-7xl md:text-9xl whitespace-nowrap bg-clip-text">
        {title}
      </h2>

      <AnimatedSeparator />

      <h3 className="text-sm text-zinc-500 text-center animate-fade-in max-w-sm sm:max-w-md md:max-w-lg px-4">
        {subtitle}
      </h3>

      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={150} />

      <p className="absolute bottom-6 w-full text-center text-xs text-zinc-500 px-4 opacity-0 animate-fade-pop">
        <span className="flex justify-center">
          <span className="italic">Pssst…</span> {footerNoteLabel.replace(/^Pssst…\s*/, "")}
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
