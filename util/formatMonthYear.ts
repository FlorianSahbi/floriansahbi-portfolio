// utils/formatMonthYear.ts

/**
 * Formats a date (string, timestamp, or Date object) as month and year
 * according to the specified locale (or the default environment locale).
 *
 * @param date - The date to format (ISO string, timestamp, or Date)
 * @param locale - A BCP 47 locale string (e.g. "fr-FR", "en-US"), or undefined for default
 * @returns A formatted string like "March 2025" or "2025"
 */
export function formatMonthYear(
  date: string | number | Date,
  locale?: string,
): string {
  const d = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
  }).format(d)
}
