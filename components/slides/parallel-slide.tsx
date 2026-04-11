"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Card } from "@/components/ui/card"
import AnimatedComponent from "../animated-component"

export default function ParallelSlide() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [simdStep, setSimdStep] = useState(0)
  const [mimdStep, setMimdStep] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setSimdStep((prev) => (prev + 1) % 4)
      setMimdStep((prev) => (prev + 1) % 4)
    }, 1500)

    return () => clearInterval(timer)
  }, [isPlaying])

  const handleReset = () => {
    setSimdStep(0)
    setMimdStep(0)
  }

  const simdData = ["A", "B", "C", "D"]
  const mimdInstructions = ["Add", "Mul", "Sub", "Div"]

  return (
    <div className="w-full max-w-5xl h-full flex flex-col">
      <div className="grid md:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* SIMD */}
        <Card className="p-4 bg-card flex flex-col">
          <h3 className="text-lg font-bold text-foreground">SIMD</h3>
          <p className="text-xs text-muted-foreground mb-3">Single Instruction, Multiple Data</p>

          <div className="flex-1 flex flex-col justify-center gap-3">
            {/* Single Instruction Unit */}
            <div className="flex justify-center">
              <AnimatedComponent type="cpu" label="ADD" active={isPlaying} size="sm" />
            </div>

            {/* Multiple Processing Units */}
            <div className="grid grid-cols-4 gap-2">
              {simdData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono text-xs transition-all ${
                      isPlaying && simdStep === index
                        ? "border-accent bg-accent text-accent-foreground shadow-lg"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {data}
                  </div>
                  <div className="text-[10px] text-muted-foreground">D{index + 1}</div>
                </div>
              ))}
            </div>

            <div className="p-2 bg-secondary rounded-lg text-xs text-secondary-foreground">
              Misma operación aplicada a todos los datos en paralelo
            </div>
          </div>
        </Card>

        {/* MIMD */}
        <Card className="p-4 bg-card flex flex-col">
          <h3 className="text-lg font-bold text-foreground">MIMD</h3>
          <p className="text-xs text-muted-foreground mb-3">Multiple Instruction, Multiple Data</p>

          <div className="flex-1 flex flex-col justify-center gap-3">
            {/* Multiple Processors */}
            <div className="grid grid-cols-2 gap-3">
              {mimdInstructions.map((instruction, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <AnimatedComponent
                    type="cpu"
                    label={`CPU${index + 1}`}
                    active={isPlaying && mimdStep === index}
                    size="sm"
                  />
                  <div className="text-[10px] text-muted-foreground">{instruction}</div>
                  <div
                    className={`w-8 h-8 rounded border-2 flex items-center justify-center font-mono text-[10px] transition-all ${
                      isPlaying && mimdStep === index
                        ? "border-primary bg-primary text-primary-foreground shadow-lg"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    D{index + 1}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2 bg-secondary rounded-lg text-xs text-secondary-foreground">
              Operaciones diferentes en datos diferentes, procesadores independientes
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center mt-3 shrink-0">
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
