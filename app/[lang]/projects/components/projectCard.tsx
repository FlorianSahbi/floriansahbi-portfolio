'use client'

import Link from 'next/link'
import Card from '../../components/card'
import clsx from 'clsx'
import Badge from '../../components/badge'
import type { EnhancedItem } from '@/lib/content/service'
import { USE_CASES } from '@/lib/content/service'
import { useParams } from 'next/navigation'

type UseCaseItem = EnhancedItem<typeof USE_CASES>

export interface ProjectCardProps
  extends Omit<UseCaseItem, 'navigation' | 'socials' | 'meta' | 'body'> {
  href: string
  active?: boolean
  variant?: 'default' | 'featured'
}

export default function ProjectCard({
  active = false,
  tags = [],
  href,
  slug,
  title,
  teaser,
  description,
  variant = 'default',
}: ProjectCardProps) {
  const { lang } = useParams()
  const isFeatured = variant === 'featured'
  const isFr = lang === 'fr'

  return (
    <Card active={active} key={slug}>
      <Link href={href}>
        <article
          className={clsx('p-4 md:p-8', isFeatured && 'relative h-full w-full')}
        >
          <h2
            className={clsx(
              'z-20 font-display duration-1000 group-hover:text-white',
              isFeatured
                ? 'mt-4 text-3xl font-bold text-zinc-100 sm:text-4xl'
                : 'text-xl font-medium text-zinc-200 lg:text-3xl',
            )}
          >
            {title}
          </h2>

          <p
            className={clsx(
              'mt-4 duration-1000 group-hover:text-zinc-300',
              isFeatured ? 'leading-8 text-zinc-400' : 'text-sm text-zinc-400',
            )}
          >
            {isFeatured ? description : teaser}
          </p>

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 overflow-hidden">
              {tags.map((tag, idx) => (
                <Badge key={idx} hoverable={false} variant="tag" label={tag} />
              ))}
            </div>
          )}

          <div
            className={clsx(
              'text-sm text-zinc-200 hover:text-zinc-50',
              isFeatured
                ? 'absolute bottom-4 hidden md:bottom-8 lg:block'
                : 'z-20 mt-4',
            )}
          >
            <p className="flex gap-2">
              {isFr ? 'Explorer le projet' : 'Read more'}
              <span aria-hidden="true">→</span>
            </p>
          </div>
        </article>
      </Link>
    </Card>
  )
}
