'use client'

import type { EnhancedItem } from '@/lib/content/service'
import { CONTACT } from '@/lib/content/service'
import Navigation from '../components/navigation'
import ContactCard from './components/card'

type ContactClientPageProps = EnhancedItem<typeof CONTACT>

export default function ContactClientPage({
  socials,
  navigation,
}: ContactClientPageProps) {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation data={navigation} />

      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto mt-32 grid w-full grid-cols-1 gap-8 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((social, i) => (
            <ContactCard key={i} {...social} />
          ))}
        </div>
      </div>
    </div>
  )
}
