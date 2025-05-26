'use client'

import { WorksSection } from '@/.contentlayer/generated/types'
import { formatMonthYear } from '@/util/formatMonthYear'

interface SectionProps extends WorksSection {}

export default function Section({ title, experiences }: SectionProps) {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <section aria-labelledby={sectionId}>
      <h3 id={sectionId} className="mb-4 text-4xl font-extrabold">
        {title}
      </h3>

      <div className="flex flex-col gap-7">
        {(experiences || []).map(
          (
            {
              title: roleTitle,
              localisation,
              start,
              end,
              description,
              details,
            },
            idx,
          ) => {
            const hasDates = Boolean(start && end)
            const formattedDates = hasDates
              ? `${formatMonthYear(start)} – ${formatMonthYear(end)}`
              : null

            return (
              <article key={`${roleTitle}-${idx}`} className="space-y-2">
                <header className="flex items-baseline justify-between">
                  {localisation && (
                    <p className="text-xl font-extrabold">{localisation}</p>
                  )}
                  {hasDates && (
                    <time
                      dateTime={`${start} to ${end}`}
                      className="whitespace-nowrap text-base text-zinc-500"
                    >
                      {formattedDates}
                    </time>
                  )}
                </header>

                {roleTitle && (
                  <div className="text-sm text-emerald-600">{roleTitle}</div>
                )}

                {description && <p className="mb-3">{description}</p>}

                {details && details.length > 0 && (
                  <ul className="list-disc space-y-3 pl-5 marker:text-emerald-600">
                    {details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
              </article>
            )
          },
        )}
      </div>
    </section>
  )
}
