"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Card } from "@/components/ui/card"
import AnimatedComponent from "../animated-component"
import ParticleSystem from "../particle-system"

const steps = [
  { name: "Cache Access", cacheActive: true },
  { name: "Decode", cacheActive: false },
  { name: "Execute", cacheActive: false },
  { name: "Unified Memory Sync", memoryActive: true },
]

export default function ModifiedHarvardSlide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 1500)

    return () => clearInterval(timer)
  }, [isPlaying])

  const handleReset = () => {
    setCurrentStep(0)
  }

  return (
    <div className="w-full max-w-4xl h-full flex flex-col">
      <Card className="p-4 bg-card flex-1 flex flex-col">
        <div className="relative flex-1 min-h-0 flex items-center justify-center">
          {/* CPU */}
          <div className="absolute left-20 top-1/2 -translate-y-1/2">
            <AnimatedComponent type="cpu" label="CPU" active={currentStep === 1 || currentStep === 2} size="md" />
          </div>

          {/* Internal Split Caches */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[30%] -translate-y-1/2">
            <AnimatedComponent type="cache" label="I-Cache (Internal)" active={currentStep === 0} size="sm" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-[70%] -translate-y-1/2">
            <AnimatedComponent type="cache" label="D-Cache (Internal)" active={currentStep === 0} size="sm" />
          </div>

          {/* Unified External Memory */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2">
            <AnimatedComponent type="memory" label="Unified Memory" active={currentStep === 3} size="md" />
          </div>

          {/* Particle Systems */}
          <div className="absolute inset-0">
            {/* CPU to Caches */}
            <ParticleSystem
              fromX={180}
              fromY={225}
              toX={240}
              toY={135}
              color="#3b82f6"
              active={currentStep === 0}
              particleCount={25}
              speed={2.5}
            />
            <ParticleSystem
              fromX={180}
              fromY={225}
              toX={240}
              toY={315}
              color="#8b5cf6"
              active={currentStep === 0}
              particleCount={25}
              speed={2.5}
            />
            {/* Caches to Memory sync */}
            <ParticleSystem
              fromX={300}
              fromY={180}
              toX={360}
              toY={225}
              color="#f59e0b"
              active={currentStep === 3}
              particleCount={30}
              speed={2}
            />
          </div>
        </div>

        {/* Bottom section */}
        <div className="shrink-0 mt-2 space-y-2">
          {/* Hybrid Explanation */}
          <div className="p-2 bg-secondary rounded-lg border border-border">
            <p className="text-xs text-secondary-foreground">
              Híbrido: Harvard interno (cachés divididas) + Von Neumann externo (memoria unificada)
            </p>
          </div>

          {/* Step Indicator & Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="p-2 bg-secondary rounded-lg flex-1">
              <div className="text-xs text-secondary-foreground">
                Paso {currentStep + 1}/{steps.length}: <span className="font-semibold text-foreground">{steps[currentStep].name}</span>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <Button size="sm" onClick={() => setIsPlaying(!isPlaying)} className="gap-1">
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {isPlaying ? "Pausar" : "Play"}
              </Button>
              <Button size="sm" onClick={handleReset} variant="outline" className="gap-1 bg-transparent">
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
