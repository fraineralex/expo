"use client"

import { BookOpen, Cpu, Cog, Zap } from "lucide-react"

export default function IntroSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full grid grid-cols-2 gap-12 items-center">
        {/* Left - Text Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-foreground">
              Introducción y Conceptos Fundamentales
            </h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start p-4 rounded-xl bg-card border border-border">
              <div className="p-2 rounded-lg bg-primary/10">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">La arquitectura del computador</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Define qué puede hacer una computadora.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 rounded-xl bg-card border border-border">
              <div className="p-2 rounded-lg bg-primary/10">
                <Cog className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">La organización física</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Explica cómo se construye internamente para lograrlo.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 rounded-xl bg-card border border-border">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Trabajo conjunto</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Ambos conceptos trabajan juntos para ejecutar programas de forma eficiente.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-sm text-muted-foreground">
            Christopher E. Marrero L. - 25-1437
          </div>
        </div>

        {/* Right - Image Placeholder */}
        <div className="aspect-[4/3] bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center space-y-3 text-muted-foreground/50">
            <div className="w-20 h-20 mx-auto rounded-xl bg-muted/50 flex items-center justify-center">
              <BookOpen className="h-10 w-10" />
            </div>
            <p className="text-sm font-medium">Imagen ilustrativa</p>
          </div>
        </div>
      </div>
    </div>
  )
}
