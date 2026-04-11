"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play, RotateCcw } from "lucide-react"
import AnimatedComponent from "../animated-component"
import ParticleSystem from "../particle-system"

export default function ParallelSimulationSlide() {
  const [isPlaying, setIsPlaying] = useState(true)

  // Von Neumann state
  const [vnStep, setVnStep] = useState(0)
  // Harvard state
  const [harvardStep, setHarvardStep] = useState(0)
  // Modified Harvard state
  const [mhStep, setMhStep] = useState(0)
  // SIMD state
  const [simdActive, setSimdActive] = useState([false, false, false, false])

  useEffect(() => {
    if (!isPlaying) return

    const vnTimer = setInterval(() => {
      setVnStep((prev) => (prev + 1) % 5)
    }, 1500)

    const harvardTimer = setInterval(() => {
      setHarvardStep((prev) => (prev + 1) % 4)
    }, 1200)

    const mhTimer = setInterval(() => {
      setMhStep((prev) => (prev + 1) % 4)
    }, 1300)

    const simdTimer = setInterval(() => {
      setSimdActive((prev) => {
        const next = [...prev]
        const activeIndex = prev.findIndex((v) => v)
        if (activeIndex === -1) {
          next[0] = true
        } else {
          next[activeIndex] = false
          next[(activeIndex + 1) % 4] = true
        }
        return next
      })
    }, 800)

    return () => {
      clearInterval(vnTimer)
      clearInterval(harvardTimer)
      clearInterval(mhTimer)
      clearInterval(simdTimer)
    }
  }, [isPlaying])

  const handleReset = () => {
    setVnStep(0)
    setHarvardStep(0)
    setMhStep(0)
    setSimdActive([false, false, false, false])
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Grid of 4 simulations */}
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {/* Von Neumann */}
        <div className="border border-border rounded-lg p-2 bg-card flex flex-col">
          <h3 className="text-xs font-bold text-center text-foreground mb-1">Von Neumann</h3>
          <div className="relative flex-1 min-h-0 flex items-center justify-center">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <AnimatedComponent type="cpu" label="CPU" active={vnStep === 1 || vnStep === 3} size="sm" />
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <AnimatedComponent
                type="memory"
                label="Mem"
                active={vnStep === 0 || vnStep === 2 || vnStep === 4}
                size="sm"
              />
            </div>
            <div className="absolute inset-0">
              <ParticleSystem
                fromX={vnStep === 4 ? 50 : 150}
                fromY={80}
                toX={vnStep === 4 ? 150 : 50}
                toY={80}
                color="#3b82f6"
                active={vnStep === 0 || vnStep === 2 || vnStep === 4}
                particleCount={15}
                speed={2}
              />
            </div>
          </div>
        </div>

        {/* Harvard */}
        <div className="border border-border rounded-lg p-2 bg-card flex flex-col">
          <h3 className="text-xs font-bold text-center text-foreground mb-1">Harvard</h3>
          <div className="relative flex-1 min-h-0 flex items-center justify-center">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <AnimatedComponent type="cpu" label="CPU" active={harvardStep === 1 || harvardStep === 2} size="sm" />
            </div>
            <div className="absolute right-2 top-[30%] -translate-y-1/2">
              <AnimatedComponent type="cache" label="I" active={harvardStep === 0} size="sm" />
            </div>
            <div className="absolute right-2 top-[70%] -translate-y-1/2">
              <AnimatedComponent
                type="memory"
                label="D"
                active={harvardStep === 0 || harvardStep === 3}
                size="sm"
              />
            </div>
            <div className="absolute inset-0">
              <ParticleSystem
                fromX={150}
                fromY={50}
                toX={50}
                toY={80}
                color="#3b82f6"
                active={harvardStep === 0}
                particleCount={12}
                speed={2.5}
              />
              <ParticleSystem
                fromX={harvardStep === 3 ? 50 : 150}
                fromY={harvardStep === 3 ? 80 : 110}
                toX={harvardStep === 3 ? 150 : 50}
                toY={harvardStep === 3 ? 110 : 80}
                color="#8b5cf6"
                active={harvardStep === 0 || harvardStep === 3}
                particleCount={12}
                speed={2.5}
              />
            </div>
          </div>
        </div>

        {/* Modified Harvard */}
        <div className="border border-border rounded-lg p-2 bg-card flex flex-col">
          <h3 className="text-xs font-bold text-center text-foreground mb-1">Harvard Modificada</h3>
          <div className="relative flex-1 min-h-0 flex items-center justify-center">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <AnimatedComponent type="cpu" label="CPU" active={mhStep === 1 || mhStep === 2} size="sm" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-[35%] -translate-y-1/2">
              <AnimatedComponent type="cache" label="$" active={mhStep === 0} size="sm" />
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <AnimatedComponent type="memory" label="Mem" active={mhStep === 3} size="sm" />
            </div>
            <div className="absolute inset-0">
              <ParticleSystem
                fromX={85}
                fromY={55}
                toX={50}
                toY={80}
                color="#f59e0b"
                active={mhStep === 0}
                particleCount={12}
                speed={2.2}
              />
              <ParticleSystem
                fromX={100}
                fromY={65}
                toX={150}
                toY={80}
                color="#f59e0b"
                active={mhStep === 3}
                particleCount={12}
                speed={2}
              />
            </div>
          </div>
        </div>

        {/* SIMD */}
        <div className="border border-border rounded-lg p-2 bg-card flex flex-col">
          <h3 className="text-xs font-bold text-center text-foreground mb-1">SIMD</h3>
          <div className="relative flex-1 min-h-0 flex flex-col items-center justify-center gap-2">
            <AnimatedComponent type="gpu" label="CU" active={isPlaying} size="sm" />
            <div className="grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded border transition-all ${
                    simdActive[i] ? "border-accent bg-accent/20 shadow-lg shadow-accent/30" : "border-border bg-muted"
                  }`}
                />
              ))}
            </div>
            <div className="text-[8px] text-muted-foreground">Unidades Paralelas</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center mt-2 shrink-0">
        <Button size="sm" onClick={() => setIsPlaying(!isPlaying)} className="gap-1">
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {isPlaying ? "Pausar" : "Play"}
        </Button>
        <Button size="sm" onClick={handleReset} variant="outline" className="gap-1 bg-transparent">
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
