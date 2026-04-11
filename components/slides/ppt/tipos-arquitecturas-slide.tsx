"use client"

import { ArrowRight, Cpu, Layers, Combine, MonitorSmartphone } from "lucide-react"

export default function TiposArquitecturasSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-5 gap-6 items-start">
        {/* Left - Main Content (3 cols) */}
        <div className="col-span-3 space-y-5">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-foreground">
              Tipos de Arquitecturas
            </h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Von Neumann */}
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                </div>
                <h3 className="font-bold text-foreground">Modelo de Von Neumann</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Usa una sola vía para que la CPU acceda a datos e instrucciones, lo que lo hace simple pero puede causar lentitud.
              </p>
            </div>

            {/* Harvard */}
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Layers className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-bold text-foreground">Arquitectura Harvard</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Separa la memoria de datos y de instrucciones para trabajar más rápido y de forma más eficiente.
              </p>
            </div>

            {/* Hybrid */}
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Combine className="h-4 w-4 text-purple-500" />
                </div>
                <h3 className="font-bold text-foreground">Arquitectura Híbrida</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Combina ideas de Von Neumann y Harvard para lograr simplicidad y buen rendimiento al mismo tiempo.
              </p>
            </div>

            {/* Usage */}
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <MonitorSmartphone className="h-4 w-4 text-amber-500" />
                </div>
                <h3 className="font-bold text-foreground">Uso de Cada Arquitectura</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Von Neumann se usa en sistemas simples, Harvard en sistemas de alto rendimiento y la híbrida en la mayoría de computadoras modernas.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm text-center text-muted-foreground">
              <span className="font-semibold text-foreground">A continuación:</span> Simulaciones interactivas de cada arquitectura
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            Frainer Encarnación (25-1775)
          </div>
        </div>

        {/* Right - Image Placeholder (2 cols) */}
        <div className="col-span-2 aspect-[3/4] bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center space-y-3 text-muted-foreground/50">
            <div className="space-y-2">
              <div className="w-16 h-16 mx-auto rounded-xl bg-muted/50 flex items-center justify-center">
                <Cpu className="h-8 w-8" />
              </div>
              <div className="flex gap-2 justify-center">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Combine className="h-5 w-5" />
                </div>
              </div>
            </div>
            <p className="text-sm font-medium">Diagrama comparativo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
