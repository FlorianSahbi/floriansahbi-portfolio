"use client";

import { WorksSection } from "@/.contentlayer/generated/types";
import { formatMonthYear } from "@/util/formatMonthYear";

interface SectionProps extends WorksSection {}

export default function Section({ title, experiences }: SectionProps) {
  const sectionId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section aria-labelledby={sectionId}>
      <h3
        id={sectionId}
        className="text-4xl font-extrabold mb-4"
      >
        {title}
      </h3>

      <div className="flex flex-col gap-7">
        {(experiences || []).map(
          ({ title: roleTitle, localisation, start, end, description, details }, idx) => {
            const hasDates = Boolean(start && end);
            const formattedDates = hasDates
              ? `${formatMonthYear(start)} – ${formatMonthYear(end)}`
              : null;

            return (
              <article key={`${roleTitle}-${idx}`} className="space-y-2">
                <header className="flex justify-between items-baseline">
                  {localisation && (
                    <p className="text-xl font-extrabold">{localisation}</p>
                  )}
                  {hasDates && (
                    <time
                      dateTime={`${start} to ${end}`}
                      className="text-base text-zinc-500 whitespace-nowrap"
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
                  <ul className="list-disc marker:text-emerald-600 pl-5 space-y-3">
                    {details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
              </article>
            );
          }
        )}
      </div>
    </section>
  );
}
