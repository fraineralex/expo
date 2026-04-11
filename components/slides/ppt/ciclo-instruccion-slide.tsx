"use client"

import { Search, Code, Play, Save, ArrowRight } from "lucide-react"

export default function CicloInstruccionSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">
            Ciclo de Instrucción
          </h2>
          <h3 className="text-xl text-primary font-medium">
            Fetch - Decode - Execute - Store
          </h3>
          <div className="h-1 w-24 bg-primary rounded-full mx-auto" />
        </div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          El computador trabaja repitiendo siempre este ciclo:
        </p>

        {/* Cycle Visualization */}
        <div className="flex items-center justify-center gap-4">
          {/* Fetch */}
          <div className="flex-1 max-w-[200px]">
            <div className="p-5 rounded-xl bg-card border-2 border-blue-500 space-y-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
                <Search className="h-7 w-7 text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">Fetch</h4>
                <p className="text-xs text-muted-foreground">(Buscar)</p>
              </div>
              <p className="text-sm text-muted-foreground">
                La CPU toma la siguiente instrucción desde la memoria.
              </p>
            </div>
          </div>

          <ArrowRight className="h-6 w-6 text-muted-foreground shrink-0" />

          {/* Decode */}
          <div className="flex-1 max-w-[200px]">
            <div className="p-5 rounded-xl bg-card border-2 border-amber-500 space-y-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center">
                <Code className="h-7 w-7 text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">Decode</h4>
                <p className="text-xs text-muted-foreground">(Decodificar)</p>
              </div>
              <p className="text-sm text-muted-foreground">
                La CPU interpreta qué debe hacer esa instrucción.
              </p>
            </div>
          </div>

          <ArrowRight className="h-6 w-6 text-muted-foreground shrink-0" />

          {/* Execute */}
          <div className="flex-1 max-w-[200px]">
            <div className="p-5 rounded-xl bg-card border-2 border-green-500 space-y-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                <Play className="h-7 w-7 text-green-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">Execute</h4>
                <p className="text-xs text-muted-foreground">(Ejecutar)</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Se realiza la operación (suma, resta, mover datos, comparar, etc.).
              </p>
            </div>
          </div>

          <ArrowRight className="h-6 w-6 text-muted-foreground shrink-0" />

          {/* Store */}
          <div className="flex-1 max-w-[200px]">
            <div className="p-5 rounded-xl bg-card border-2 border-purple-500 space-y-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center">
                <Save className="h-7 w-7 text-purple-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">Store</h4>
                <p className="text-xs text-muted-foreground">(Guardar)</p>
              </div>
              <p className="text-sm text-muted-foreground">
                El resultado se guarda en la memoria o en un registro.
              </p>
            </div>
          </div>
        </div>

        {/* Loop indicator */}
        <div className="flex justify-center">
          <div className="px-6 py-2 rounded-full bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              Este ciclo se repite continuamente mientras el computador está en funcionamiento
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Frainer Encarnación (25-1775)
        </div>
      </div>
    </div>
  )
}
