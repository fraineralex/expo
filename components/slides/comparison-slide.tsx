"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const TASK_CYCLES = 100

export default function ComparisonSlide() {
  const [isRunning, setIsRunning] = useState(true)
  const [vonNeumannProgress, setVonNeumannProgress] = useState(0)
  const [harvardProgress, setHarvardProgress] = useState(0)
  const [modifiedHarvardProgress, setModifiedHarvardProgress] = useState(0)
  const [simdProgress, setSimdProgress] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setVonNeumannProgress((prev) => {
        if (prev >= TASK_CYCLES) return prev
        return prev + 1
      })

      setHarvardProgress((prev) => {
        if (prev >= TASK_CYCLES) return prev
        return prev + 1.5
      })

      setModifiedHarvardProgress((prev) => {
        if (prev >= TASK_CYCLES) return prev
        return prev + 1.3
      })

      setSimdProgress((prev) => {
        if (prev >= TASK_CYCLES) return prev
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isRunning])

  const handleReset = () => {
    setVonNeumannProgress(0)
    setHarvardProgress(0)
    setModifiedHarvardProgress(0)
    setSimdProgress(0)
    setIsRunning(true)
  }

  const allComplete =
    vonNeumannProgress >= TASK_CYCLES &&
    harvardProgress >= TASK_CYCLES &&
    modifiedHarvardProgress >= TASK_CYCLES &&
    simdProgress >= TASK_CYCLES

  useEffect(() => {
    if (allComplete) {
      setIsRunning(false)
    }
  }, [allComplete])

  return (
    <div className="w-full max-w-3xl h-full flex flex-col">
      <Card className="p-4 bg-card flex-1 flex flex-col">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-foreground">Comparación de Rendimiento en Tiempo Real</h3>
          <p className="text-xs text-muted-foreground">
            Ejecutando la misma tarea en todas las arquitecturas
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-4">
          {/* Von Neumann */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">Von Neumann</div>
                <div className="text-[10px] text-muted-foreground">Cuello de botella en bus compartido</div>
              </div>
              <div className="text-xl font-mono font-bold text-primary">
                {Math.min(100, Math.round((vonNeumannProgress / TASK_CYCLES) * 100))}%
              </div>
            </div>
            <Progress value={Math.min(100, (vonNeumannProgress / TASK_CYCLES) * 100)} className="h-2" />
          </div>

          {/* Modified Harvard */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">Harvard Modificada</div>
                <div className="text-[10px] text-muted-foreground">Enfoque híbrido</div>
              </div>
              <div className="text-xl font-mono font-bold text-primary">
                {Math.min(100, Math.round((modifiedHarvardProgress / TASK_CYCLES) * 100))}%
              </div>
            </div>
            <Progress value={Math.min(100, (modifiedHarvardProgress / TASK_CYCLES) * 100)} className="h-2" />
          </div>

          {/* Harvard */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">Harvard</div>
                <div className="text-[10px] text-muted-foreground">Buses separados</div>
              </div>
              <div className="text-xl font-mono font-bold text-primary">
                {Math.min(100, Math.round((harvardProgress / TASK_CYCLES) * 100))}%
              </div>
            </div>
            <Progress value={Math.min(100, (harvardProgress / TASK_CYCLES) * 100)} className="h-2" />
          </div>

          {/* SIMD */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">SIMD</div>
                <div className="text-[10px] text-muted-foreground">Procesamiento paralelo</div>
              </div>
              <div className="text-xl font-mono font-bold text-accent">
                {Math.min(100, Math.round((simdProgress / TASK_CYCLES) * 100))}%
              </div>
            </div>
            <Progress value={Math.min(100, (simdProgress / TASK_CYCLES) * 100)} className="h-2" />
          </div>
        </div>

        {allComplete && (
          <div className="mt-3 p-2 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-xs font-medium text-accent-foreground">
              Comparación completa. Las arquitecturas paralelas destacan en cargas de trabajo específicas.
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2 mt-3 shrink-0">
          <Button size="sm" onClick={() => setIsRunning(!isRunning)} disabled={allComplete} className="gap-1">
            {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isRunning ? "Pausar" : allComplete ? "Completado" : "Ejecutar"}
          </Button>
          <Button size="sm" onClick={handleReset} variant="outline" className="gap-1 bg-transparent">
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
