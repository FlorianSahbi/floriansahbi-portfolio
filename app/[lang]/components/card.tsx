"use client"

import type { ReactNode, MouseEvent } from 'react'
import { motion, useMotionTemplate, useSpring } from 'framer-motion'

interface CardProps {
  active?: boolean
  children: ReactNode
}

export default function Card({ active, children }: CardProps) {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 })

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { left, top } = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - left)
    mouseY.set(event.clientY - top)
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`

  const style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div
      onMouseMove={onMouseMove}
      className={`overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 ${
        active ? 'hover:border-emerald-600/50' : 'hover:border-zinc-400/50'
      } ${active ? 'border-emerald-800' : 'border-zinc-600'}`}
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
          style={style}
        />

        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>
      {children}
    </div>
  )
}
