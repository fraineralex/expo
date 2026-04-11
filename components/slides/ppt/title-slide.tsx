"use client"

import { Cpu, HardDrive, MonitorSpeaker, Network } from "lucide-react"

export default function TitleSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full grid grid-cols-2 gap-12 items-center">
        {/* Left - Text Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              Arquitectura y<br />
              <span className="text-primary">Organización Física</span><br />
              del Computador
            </h1>
            <div className="h-1 w-32 bg-primary rounded-full" />
          </div>
          
          <div className="pt-6">
            <p className="text-xl text-muted-foreground font-medium">Presentado por:</p>
            <h2 className="text-3xl font-semibold text-foreground mt-2">Los Ingenieros</h2>
          </div>
          
          <div className="flex gap-4 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Cpu className="h-5 w-5 text-primary" />
              <span className="text-sm">CPU</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <HardDrive className="h-5 w-5 text-primary" />
              <span className="text-sm">RAM</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MonitorSpeaker className="h-5 w-5 text-primary" />
              <span className="text-sm">E/S</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Network className="h-5 w-5 text-primary" />
              <span className="text-sm">BUSES</span>
            </div>
          </div>
        </div>

        {/* Right - Image Placeholder */}
        <div className="aspect-square bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center space-y-3 text-muted-foreground/50">
            <div className="w-20 h-20 mx-auto rounded-xl bg-muted/50 flex items-center justify-center">
              <Cpu className="h-10 w-10" />
            </div>
            <p className="text-sm font-medium">Imagen de portada</p>
          </div>
        </div>
      </div>
    </div>
  )
}
