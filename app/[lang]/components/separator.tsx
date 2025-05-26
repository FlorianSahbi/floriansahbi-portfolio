interface SeparatorProps {
  half?: boolean
  align?: 'center' | 'left'
  className?: string
}

export default function Separator({
  half = false,
  align = 'center',
  className = '',
}: SeparatorProps) {
  const widthClass = half ? 'w-1/2' : 'w-full'
  const alignmentClass = align === 'center' ? 'mx-auto' : 'ml-0'

  return (
    <div
      className={`h-px bg-zinc-800 ${widthClass} ${alignmentClass} ${className}`}
    />
  )
}
