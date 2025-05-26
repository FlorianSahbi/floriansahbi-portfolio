import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

interface BigCtaProps {
  href: string
  className?: string
  children: React.ReactNode
  prefetch?: boolean
  color?: 'primary' | 'secondary' | 'outline' | 'ghost'
  variant?: 'default' | 'condensed'
}

export default function BigCta({
  href,
  className,
  children,
  prefetch = false,
  color = 'primary',
  variant = 'default',
}: BigCtaProps) {
  const baseStyle =
    'group inline-flex items-center rounded-full overflow-hidden shadow-lg border transition-colors duration-300'

  const colorVariants = {
    primary: {
      border: 'border-emerald-900',
      background: 'bg-green-900 hover:bg-emerald-900/30',
    },
    secondary: {
      border: 'border-blue-800',
      background: 'bg-blue-900 hover:bg-blue-800/30',
    },
    outline: {
      border: 'border-gray-500',
      background: 'bg-transparent hover:bg-gray-300/20',
    },
    ghost: {
      border: 'border-white/10',
      background: 'bg-transparent hover:bg-white/5',
    },
  }

  const variantStyles = {
    default: 'px-4 py-2 text-base',
    condensed: 'px-3 py-1 text-sm',
  }

  return (
    <Link
      target="_blank"
      prefetch={prefetch}
      href={href}
      className={clsx(baseStyle, colorVariants[color].border, className)}
    >
      <span
        className={clsx(
          'inline-flex items-center gap-2 text-white transition-colors duration-300',
          colorVariants[color].background,
          variantStyles[variant],
        )}
      >
        {children}
        <ArrowRight
          size={14}
          className="text-white transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
