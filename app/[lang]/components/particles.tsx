'use client'

import React, { useRef, useEffect } from 'react'
import { useMousePosition } from '@/util/mouse'

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

export default function Particles({
  className = '',
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const circlesRef = useRef<Circle[]>([])
  const mousePosition = useMousePosition()
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      contextRef.current = canvas.getContext('2d')
    }
    initCanvas()
    animate()
    window.addEventListener('resize', initCanvas)
    return () => window.removeEventListener('resize', initCanvas)
  }, [])

  useEffect(() => {
    updateMouse()
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    initCanvas()
  }, [refresh])

  function initCanvas() {
    resizeCanvas()
    drawParticles()
  }

  function resizeCanvas() {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = contextRef.current
    if (!canvas || !container || !ctx) return

    circlesRef.current = []
    const w = container.offsetWidth
    const h = container.offsetHeight
    sizeRef.current = { w, h }
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)
  }

  function updateMouse() {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const { w, h } = sizeRef.current
    const x = mousePosition.x - rect.left - w / 2
    const y = mousePosition.y - rect.top - h / 2
    const inside = Math.abs(x) < w / 2 && Math.abs(y) < h / 2
    if (inside) {
      mouseRef.current.x = x
      mouseRef.current.y = y
    }
  }

  function createCircle(): Circle {
    const { w, h } = sizeRef.current
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      translateX: 0,
      translateY: 0,
      size: Math.random() * 2 + 0.1,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(2)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    }
  }

  function drawCircle(circle: Circle, update = false) {
    const ctx = contextRef.current
    if (!ctx) return
    ctx.save()
    ctx.translate(circle.translateX, circle.translateY)
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${circle.alpha})`
    ctx.fill()
    ctx.restore()

    if (!update) circlesRef.current.push(circle)
  }

  function clearCanvas() {
    const ctx = contextRef.current
    const { w, h } = sizeRef.current
    if (ctx) ctx.clearRect(0, 0, w, h)
  }

  function drawParticles() {
    clearCanvas()
    for (let i = 0; i < quantity; i++) {
      drawCircle(createCircle())
    }
  }

  function remap(
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number {
    return ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  }

  function animate() {
    clearCanvas()
    circlesRef.current.forEach((circle, idx) => {
      const { w, h } = sizeRef.current
      const edges = [
        circle.x + circle.translateX - circle.size,
        w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        h - circle.y - circle.translateY - circle.size,
      ]
      const closest = Math.min(...edges)
      const factor = Math.max(0, remap(closest, 0, 20, 0, 1))

      circle.alpha =
        factor > 1
          ? Math.min(circle.alpha + 0.02, circle.targetAlpha)
          : circle.targetAlpha * factor

      circle.x += circle.dx
      circle.y += circle.dy
      circle.translateX +=
        (mouseRef.current.x / (staticity / circle.magnetism) -
          circle.translateX) /
        ease
      circle.translateY +=
        (mouseRef.current.y / (staticity / circle.magnetism) -
          circle.translateY) /
        ease

      if (
        circle.x < -circle.size ||
        circle.x > w + circle.size ||
        circle.y < -circle.size ||
        circle.y > h + circle.size
      ) {
        circlesRef.current.splice(idx, 1)
        drawCircle(createCircle())
      } else {
        drawCircle(circle, true)
      }
    })
    requestAnimationFrame(animate)
  }

  return (
    <div className={className} ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
