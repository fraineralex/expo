"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Card } from "@/components/ui/card"
import AnimatedComponent from "../animated-component"
import ParticleSystem from "../particle-system"

const steps = [
  { name: "Fetch Instruction", from: "memory", to: "cpu", color: "#3b82f6" },
  { name: "Decode", from: null, to: null, color: "#3b82f6" },
  { name: "Fetch Data", from: "memory", to: "cpu", color: "#8b5cf6" },
  { name: "Execute", from: null, to: null, color: "#3b82f6" },
  { name: "Write Back", from: "cpu", to: "memory", color: "#10b981" },
]

export default function VonNeumannSlide() {
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
        {/* Architecture Diagram */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center">
          {/* CPU */}
          <div className="absolute left-20 top-1/2 -translate-y-1/2">
            <AnimatedComponent type="cpu" label="CPU" active={currentStep === 1 || currentStep === 3} size="md" />
          </div>

          {/* Shared Memory */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2">
            <AnimatedComponent
              type="memory"
              label="Shared Memory"
              active={currentStep === 0 || currentStep === 2 || currentStep === 4}
              size="md"
            />
          </div>

          {/* Bus connection */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
            <svg className="w-full h-full">
              <line
                x1="25%"
                y1="50%"
                x2="75%"
                y2="50%"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
              />
            </svg>
            <ParticleSystem
              fromX={steps[currentStep].from === "cpu" ? 100 : 300}
              fromY={200}
              toX={steps[currentStep].to === "cpu" ? 100 : 300}
              toY={200}
              color={steps[currentStep].color}
              active={steps[currentStep].from !== null}
              particleCount={40}
              speed={3}
            />
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono">
            Bus Compartido
          </div>
        </div>

        {/* Bottom section */}
        <div className="shrink-0 mt-2 space-y-2">
          {/* Bottleneck Warning */}
          {currentStep === 2 && (
            <div className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-xs text-destructive font-medium">
                Cuello de botella: CPU espera datos en el mismo bus de instrucciones
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
