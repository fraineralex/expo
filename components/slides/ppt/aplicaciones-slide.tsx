"use client"

import { Smartphone, Monitor, Cpu, Brain, Cloud } from "lucide-react"

export default function AplicacionesSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-6xl w-full space-y-5">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">
            Aplicaciones
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-5 gap-4">
          {/* Smartphones */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Smartphone className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-foreground text-sm">Smartphones</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">(ARM + SoC):</span> bajo consumo y más batería; integración en SoC mejora eficiencia en poco espacio.
            </p>
          </div>

          {/* PC Desktop */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Monitor className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-bold text-foreground text-sm">PC Escritorio</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">(x86):</span> alto rendimiento para tareas pesadas (edición, diseño, programación) con buena memoria y refrigeración.
            </p>
          </div>

          {/* Embedded/IoT */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Cpu className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-foreground text-sm">Embebidos/IoT</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">(Microcontroladores):</span> prioridad en costo, tamaño y confiabilidad; respuesta rápida en sensores y electrodomésticos.
            </p>
          </div>

          {/* AI */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Brain className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="font-bold text-foreground text-sm">IA</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">(GPU/TPU/NPU):</span> paralelismo masivo acelera entrenamiento e inferencia.
            </p>
          </div>

          {/* Servers/Cloud */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Cloud className="h-5 w-5 text-cyan-500" />
              </div>
              <h3 className="font-bold text-foreground text-sm">Servidores/Cloud</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Escalabilidad y disponibilidad con virtualización + red/almacenamiento de alta capacidad.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-center text-muted-foreground">
            Cada arquitectura se adapta a las <span className="font-semibold text-foreground">necesidades específicas</span> de su aplicación: 
            consumo energético, rendimiento, costo y espacio físico.
          </p>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Algenis 25-1739
        </div>
      </div>
    </div>
  )
}
