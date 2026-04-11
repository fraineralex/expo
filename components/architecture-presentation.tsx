"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// PPT Slides
import TitleSlide from "./slides/ppt/title-slide"
import IntroSlide from "./slides/ppt/intro-slide"
import ArquitecturaVsOrganizacionSlide from "./slides/ppt/arquitectura-vs-organizacion-slide"
import ArquitecturaComponentesSlide from "./slides/ppt/arquitectura-componentes-slide"
import OrganizacionSlide from "./slides/ppt/organizacion-slide"
import TiposArquitecturasSlide from "./slides/ppt/tipos-arquitecturas-slide"

// Simulation Slides
import VonNeumannSlide from "./slides/von-neumann-slide"
import HarvardSlide from "./slides/harvard-slide"
import ModifiedHarvardSlide from "./slides/modified-harvard-slide"
import ParallelSlide from "./slides/parallel-slide"
import ParallelSimulationSlide from "./slides/parallel-simulation-slide"
import ComparisonSlide from "./slides/comparison-slide"

// More PPT Slides
import CicloInstruccionSlide from "./slides/ppt/ciclo-instruccion-slide"
import AplicacionesSlide from "./slides/ppt/aplicaciones-slide"
import ConclusionSlide from "./slides/ppt/conclusion-slide"

const slides = [
  // PPT Part 1 (1-6)
  { id: "title", title: "Arquitectura y Organización Física del Computador", component: TitleSlide },
  { id: "intro", title: "Introducción y Conceptos Fundamentales", component: IntroSlide },
  { id: "arq-vs-org", title: "Arquitectura vs Organización", component: ArquitecturaVsOrganizacionSlide },
  { id: "componentes", title: "Arquitectura del Computador", component: ArquitecturaComponentesSlide },
  { id: "organizacion", title: "Organización del Computador", component: OrganizacionSlide },
  { id: "tipos", title: "Tipos de Arquitecturas", component: TiposArquitecturasSlide },
  
  // Simulations (7-12)
  { id: "von-neumann", title: "Simulación: Von Neumann", component: VonNeumannSlide },
  { id: "harvard", title: "Simulación: Harvard", component: HarvardSlide },
  { id: "modified-harvard", title: "Simulación: Harvard Modificada", component: ModifiedHarvardSlide },
  { id: "parallel", title: "Simulación: SIMD vs MIMD", component: ParallelSlide },
  { id: "parallel-sim", title: "Simulación Paralela en Vivo", component: ParallelSimulationSlide },
  { id: "comparison", title: "Comparación de Rendimiento", component: ComparisonSlide },
  
  // PPT Part 2 (13-15)
  { id: "ciclo", title: "Ciclo de Instrucción", component: CicloInstruccionSlide },
  { id: "aplicaciones", title: "Aplicaciones", component: AplicacionesSlide },
  { id: "conclusion", title: "Conclusión", component: ConclusionSlide },
]

export default function ArchitecturePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))
  }, [])

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(0, prev - 1))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        goToNextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNextSlide, goToPrevSlide])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card">
        <div className="px-4 py-2 flex items-center justify-between">
          <h1 className="text-sm font-semibold text-foreground">Arquitectura del Computador - Los Ingenieros</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">{currentSlide + 1}</span>
            <span>/</span>
            <span className="font-mono">{slides.length}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 px-4 py-2">
        <div className="shrink-0 mb-2">
          <h2 className="text-xl font-bold text-foreground mb-1">{slides[currentSlide].title}</h2>
          <div className="flex gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary" : "bg-muted"
                }`}
                aria-label={`Ir al slide ${index + 1}: ${slide.title}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
          <CurrentSlideComponent />
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="shrink-0 border-t border-border bg-card">
        <div className="px-4 py-2 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevSlide}
            disabled={currentSlide === 0}
            className="gap-1 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="text-xs text-muted-foreground hidden md:block">{slides[currentSlide].title}</div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextSlide}
            disabled={currentSlide === slides.length - 1}
            className="gap-1 bg-transparent"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
