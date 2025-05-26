'use client'

import { useMemo } from 'react'
import Separator from '../components/separator'
import ProjectCard from './components/projectCard'
import Navigation from '../components/navigation'
import type { EnhancedItem, NavigationItem } from '@/lib/content/service'
import { USE_CASES, PROJECT } from '@/lib/content/service'

type UseCaseItem = EnhancedItem<typeof USE_CASES>
type UseCaseWithHref = UseCaseItem & { href: string }

type ProjectItem = EnhancedItem<typeof PROJECT>

interface ProjectsClientPageProps {
  navigation: NavigationItem[]
  edito?: ProjectItem
  featured?: UseCaseWithHref[]
  projects?: UseCaseWithHref[]
}

export default function ProjectsClientPage({
  navigation,
  edito,
  featured = [],
  projects = [],
}: ProjectsClientPageProps) {
  const [firstFeatured, remainingFeatured] = useMemo(() => {
    if (featured.length > 0) {
      const [first, ...rest] = featured
      return [first, rest]
    }
    return [null, [] as UseCaseWithHref[]]
  }, [featured])

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 pb-16">
      <Navigation data={navigation} />

      <div className="space-y-8 px-6 pt-20 md:pt-24 lg:px-8 lg:pt-32">
        {edito && (
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              {edito.title}
            </h2>

            <p className="mt-4 text-zinc-400">{edito.description}</p>
          </div>
        )}

        <Separator />

        <section aria-label="Featured projects">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {firstFeatured && (
              <ProjectCard
                key={firstFeatured.slug}
                active
                variant="featured"
                {...firstFeatured}
              />
            )}

            <div className="flex flex-col gap-8 lg:gap-4 lg:border-t-0">
              {remainingFeatured.map((project) => (
                <ProjectCard key={project.slug} active {...project} />
              ))}
            </div>
          </div>
        </section>

        <Separator />

        <section aria-label="All projects">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
