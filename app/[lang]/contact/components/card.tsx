'use client'

import React from 'react'
import Link from 'next/link'

import { Linkedin, Mail, Github, type LucideProps } from 'lucide-react'
import Card from '../../components/card'

interface ContactCardProps {
  href: string
  label: string
  handle?: string
}

const iconMap: Record<string, React.FC<LucideProps>> = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
}

export default function ContactCard({ href, handle, label }: ContactCardProps) {
  const key = label.toLowerCase()
  const Icon = iconMap[key] ?? Mail
  const isExternalHttp = href.startsWith('http')
  const isMailTo = href.startsWith('mailto:')

  const commonClasses =
    'p-4 relative flex flex-col items-center gap-4 duration-700 group ' +
    'md:gap-8 md:py-24 lg:pb-48 md:p-16'

  const content = (
    <>
      <span
        className="absolute h-2/3 w-px bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
        aria-hidden="true"
      />
      <span className="drop-shadow-orange relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-500 bg-zinc-900 text-sm text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white">
        <Icon size={22} />
      </span>
      <div className="z-10 flex flex-col items-center">
        <span className="font-display font-medium text-zinc-200 duration-150 group-hover:text-white lg:text-xl xl:text-3xl">
          {handle}
        </span>
        <span className="mt-4 text-center text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
          {label}
        </span>
      </div>
    </>
  )

  const wrapper = (inner: React.ReactNode) => (
    <Card active={false}>{inner}</Card>
  )

  if (isMailTo) {
    return wrapper(
      <a href={href} className={commonClasses}>
        {content}
      </a>,
    )
  }

  if (isExternalHttp) {
    return wrapper(
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {content}
      </a>,
    )
  }

  return wrapper(
    <Link href={href} className={commonClasses}>
      {content}
    </Link>,
  )
}
