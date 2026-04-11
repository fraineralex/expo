"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  life: number
  maxLife: number
}

interface ParticleSystemProps {
  fromX: number
  fromY: number
  toX: number
  toY: number
  color: string
  active: boolean
  particleCount?: number
  speed?: number
}

export default function ParticleSystem({
  fromX,
  fromY,
  toX,
  toY,
  color,
  active,
  particleCount = 30,
  speed = 2,
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to container
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: fromX,
          y: fromY,
          vx: 0,
          vy: 0,
          targetX: toX,
          targetY: toY,
          life: Math.random() * 100,
          maxLife: 100,
        })
      }
    }

    initParticles()

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (active) {
        particlesRef.current.forEach((particle) => {
          // Update particle
          const dx = particle.targetX - particle.x
          const dy = particle.targetY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 2) {
            particle.vx = (dx / distance) * speed
            particle.vy = (dy / distance) * speed
            particle.x += particle.vx
            particle.y += particle.vy
          } else {
            // Reset particle
            particle.x = fromX
            particle.y = fromY
            particle.life = 0
          }

          particle.life += 1

          // Draw particle
          const alpha = Math.min(1, particle.life / 20) * Math.min(1, (particle.maxLife - particle.life) / 20)
          const size = 2 + Math.sin(particle.life * 0.2) * 1

          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result
              ? {
                  r: Number.parseInt(result[1], 16),
                  g: Number.parseInt(result[2], 16),
                  b: Number.parseInt(result[3], 16),
                }
              : { r: 59, g: 130, b: 246 }
          }

          const rgb = hexToRgb(color)

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
          ctx.fill()

          // Draw glow
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 3)
          gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.6})`)
          gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`)
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateSize)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [fromX, fromY, toX, toY, color, active, particleCount, speed])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}
