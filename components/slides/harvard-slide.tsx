"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Card } from "@/components/ui/card"
import AnimatedComponent from "../animated-component"
import ParticleSystem from "../particle-system"

const steps = [
  { name: "Fetch Instruction & Data", instActive: true, dataActive: true },
  { name: "Decode", instActive: false, dataActive: false },
  { name: "Execute", instActive: false, dataActive: false },
  { name: "Write Back", instActive: false, dataActive: true },
]

export default function HarvardSlide() {
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

          {/* Instruction Memory */}
          <div className="absolute right-20 top-[25%] -translate-y-1/2">
            <AnimatedComponent type="cache" label="Instruction Memory" active={currentStep === 0} size="sm" />
          </div>

          {/* Data Memory */}
          <div className="absolute right-20 top-[75%] -translate-y-1/2">
            <AnimatedComponent
              type="memory"
              label="Data Memory"
              active={currentStep === 0 || currentStep === 3}
              size="sm"
            />
          </div>

          {/* Particle Systems */}
          <div className="absolute inset-0">
            {/* Instruction bus */}
            <ParticleSystem
              fromX={steps[currentStep].instActive ? 360 : 100}
              fromY={steps[currentStep].instActive ? 120 : 120}
              toX={steps[currentStep].instActive ? 100 : 360}
              toY={steps[currentStep].instActive ? 225 : 225}
              color="#3b82f6"
              active={steps[currentStep].instActive}
              particleCount={30}
              speed={3}
            />
            {/* Data bus */}
            <ParticleSystem
              fromX={currentStep === 3 ? 100 : 360}
              fromY={currentStep === 3 ? 225 : 330}
              toX={currentStep === 3 ? 360 : 100}
              toY={currentStep === 3 ? 330 : 225}
              color="#8b5cf6"
              active={steps[currentStep].dataActive}
              particleCount={30}
              speed={3}
            />
          </div>

          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-mono">
            Bus Instrucciones
          </div>
          <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-mono">
            Bus Datos
          </div>
        </div>

        {/* Bottom section */}
        <div className="shrink-0 mt-2 space-y-2">
          {/* Advantage Highlight */}
          {currentStep === 0 && (
            <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-xs text-accent-foreground font-medium">
                Ventaja: Instrucciones y datos se obtienen simultáneamente en buses separados
              </p>
            </div>
          )}

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
