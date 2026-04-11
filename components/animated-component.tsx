"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface AnimatedComponentProps {
  type: "cpu" | "memory" | "gpu" | "cache"
  label: string
  active?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function AnimatedComponent({ type, label, active, size = "md", className }: AnimatedComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>()
  const timeRef = useRef(0)

  const sizeMap = {
    sm: { width: 120, height: 90 },
    md: { width: 160, height: 120 },
    lg: { width: 200, height: 150 },
  }

  const dimensions = sizeMap[size]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const animate = () => {
      if (!canvas || !ctx) return

      timeRef.current += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      if (type === "cpu") {
        // Draw CPU with animated circuits
        const coreSize = 30
        const spacing = 10

        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            const x = centerX - coreSize - spacing / 2 + i * (coreSize + spacing)
            const y = centerY - coreSize - spacing / 2 + j * (coreSize + spacing)

            // Core box
            ctx.strokeStyle = active ? "#3b82f6" : "#64748b"
            ctx.lineWidth = 2
            ctx.strokeRect(x, y, coreSize, coreSize)

            if (active) {
              // Pulsing fill
              const pulse = Math.sin(timeRef.current * 3 + i + j) * 0.5 + 0.5
              ctx.fillStyle = `rgba(59, 130, 246, ${pulse * 0.3})`
              ctx.fillRect(x, y, coreSize, coreSize)

              // Circuit lines
              ctx.strokeStyle = `rgba(59, 130, 246, ${pulse})`
              ctx.lineWidth = 1
              for (let k = 0; k < 3; k++) {
                ctx.beginPath()
                ctx.moveTo(x + 5, y + 10 + k * 10)
                ctx.lineTo(x + coreSize - 5, y + 10 + k * 10)
                ctx.stroke()
              }
            }
          }
        }

        // Connection lines between cores
        if (active) {
          ctx.strokeStyle = "rgba(59, 130, 246, 0.5)"
          ctx.lineWidth = 1
          ctx.setLineDash([2, 2])
          ctx.beginPath()
          ctx.moveTo(centerX, centerY - spacing / 2 - coreSize)
          ctx.lineTo(centerX, centerY + spacing / 2 + coreSize)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(centerX - spacing / 2 - coreSize, centerY)
          ctx.lineTo(centerX + spacing / 2 + coreSize, centerY)
          ctx.stroke()
          ctx.setLineDash([])
        }
      } else if (type === "memory") {
        // Draw memory banks with data flow
        const bankWidth = 40
        const bankHeight = 60
        const bankCount = 2
        const spacing = 15

        for (let i = 0; i < bankCount; i++) {
          const x = centerX - (bankWidth * bankCount + spacing * (bankCount - 1)) / 2 + i * (bankWidth + spacing)
          const y = centerY - bankHeight / 2

          // Memory bank
          ctx.strokeStyle = active ? "#8b5cf6" : "#64748b"
          ctx.lineWidth = 2
          ctx.strokeRect(x, y, bankWidth, bankHeight)

          if (active) {
            // Data cells
            const cellHeight = 8
            const cellCount = 6
            for (let j = 0; j < cellCount; j++) {
              const cellY = y + 5 + j * (cellHeight + 2)
              const flow = Math.sin(timeRef.current * 4 - j * 0.5 + i) * 0.5 + 0.5
              ctx.fillStyle = `rgba(139, 92, 246, ${flow * 0.6})`
              ctx.fillRect(x + 5, cellY, bankWidth - 10, cellHeight)
            }
          }
        }
      } else if (type === "gpu") {
        // Draw GPU with many parallel processing units
        const unitSize = 12
        const cols = 6
        const rows = 5
        const spacing = 4

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const x = centerX - (cols * (unitSize + spacing) - spacing) / 2 + j * (unitSize + spacing)
            const y = centerY - (rows * (unitSize + spacing) - spacing) / 2 + i * (unitSize + spacing)

            ctx.strokeStyle = active ? "#10b981" : "#64748b"
            ctx.lineWidth = 1
            ctx.strokeRect(x, y, unitSize, unitSize)

            if (active) {
              const pulse = Math.sin(timeRef.current * 5 + i * 0.3 + j * 0.2) * 0.5 + 0.5
              ctx.fillStyle = `rgba(16, 185, 129, ${pulse * 0.5})`
              ctx.fillRect(x, y, unitSize, unitSize)
            }
          }
        }
      } else if (type === "cache") {
        // Draw cache with fast access patterns
        const layers = 3
        const baseSize = 50

        for (let i = 0; i < layers; i++) {
          const size = baseSize - i * 12
          const x = centerX - size / 2
          const y = centerY - size / 2

          ctx.strokeStyle = active ? "#f59e0b" : "#64748b"
          ctx.lineWidth = 2
          ctx.strokeRect(x, y, size, size)

          if (active) {
            const pulse = Math.sin(timeRef.current * 6 - i) * 0.5 + 0.5
            ctx.fillStyle = `rgba(245, 158, 11, ${pulse * 0.2})`
            ctx.fillRect(x, y, size, size)

            // Access lines
            ctx.strokeStyle = `rgba(245, 158, 11, ${pulse * 0.8})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x, centerY)
            ctx.lineTo(x + size, centerY)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(centerX, y)
            ctx.lineTo(centerX, y + size)
            ctx.stroke()
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [type, active, dimensions.width, dimensions.height])

  return (
    <div className={cn("relative flex flex-col items-center gap-2", className)}>
      <canvas
        ref={canvasRef}
        className={cn(
          "rounded-lg border-2 transition-all duration-300",
          active ? "border-primary shadow-lg shadow-primary/20" : "border-border",
        )}
      />
      <div className="text-xs font-semibold text-center">{label}</div>
    </div>
  )
}
