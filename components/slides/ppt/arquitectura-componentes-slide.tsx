"use client"

import { Cpu, HardDrive, MonitorSpeaker, Network, Binary, GitBranch, Calculator, FileCode } from "lucide-react"

export default function ArquitecturaComponentesSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-5 gap-6 items-start">
        {/* Left - Main Content (3 cols) */}
        <div className="col-span-3 space-y-5">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              ARQUITECTURA DEL COMPUTADOR:
            </h2>
            <h3 className="text-xl font-medium text-primary">¿Para qué sirve? ¿Cómo se come?</h3>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          {/* Main Components */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Cpu className="h-5 w-5 text-blue-500" />
                </div>
                <h4 className="font-bold text-foreground">CPU</h4>
              </div>
              <p className="text-xs text-muted-foreground">(Cerebro/cocina) - ejecuta tareas</p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <HardDrive className="h-5 w-5 text-green-500" />
                </div>
                <h4 className="font-bold text-foreground">RAM</h4>
              </div>
              <p className="text-xs text-muted-foreground">(Almacén/despensa) - guarda lo necesario</p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <MonitorSpeaker className="h-5 w-5 text-purple-500" />
                </div>
                <h4 className="font-bold text-foreground">E/S</h4>
              </div>
              <p className="text-xs text-muted-foreground">(Puertas/ventanas) - entrada/salida de información</p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Network className="h-5 w-5 text-amber-500" />
                </div>
                <h4 className="font-bold text-foreground">BUSES</h4>
              </div>
              <p className="text-xs text-muted-foreground">(Pasillos/tuberías) - vías de comunicación</p>
            </div>
          </div>

          {/* ISA Section */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
            <h4 className="font-bold text-foreground flex items-center gap-2">
              <FileCode className="h-5 w-5 text-primary" />
              Conjunto de Instrucciones (ISA)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Binary className="h-4 w-4 text-primary shrink-0" />
                <span>Instrucciones de transferencia de datos</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <GitBranch className="h-4 w-4 text-primary shrink-0" />
                <span>Instrucciones de control y salto</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calculator className="h-4 w-4 text-primary shrink-0" />
                <span>Operaciones aritméticas y lógicas</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileCode className="h-4 w-4 text-primary shrink-0" />
                <span>Formato de las instrucciones y tipos de datos</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Oliver Abreu M. 25-1619
          </div>
        </div>

        {/* Right - Image Placeholder (2 cols) */}
        <div className="col-span-2 aspect-[3/4] bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center space-y-3 text-muted-foreground/50">
            <div className="grid grid-cols-2 gap-2 justify-center px-4">
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                <Cpu className="h-6 w-6" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                <HardDrive className="h-6 w-6" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                <MonitorSpeaker className="h-6 w-6" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                <Network className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm font-medium">Diagrama de componentes</p>
          </div>
        </div>
      </div>
    </div>
  )
}
