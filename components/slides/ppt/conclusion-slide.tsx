"use client"

import { FileCode, Hammer, CheckCircle, Lightbulb } from "lucide-react"

export default function ConclusionSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">
            Conclusión
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Arquitectura = Plano */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <FileCode className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Arquitectura = El Plano</h3>
                <p className="text-sm text-muted-foreground">Diseño lógico</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Define qué puede hacer la máquina: sus instrucciones y reglas de funcionamiento.
            </p>
          </div>

          {/* Organización = Construcción */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Hammer className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Organización = La Construcción</h3>
                <p className="text-sm text-muted-foreground">Implementación física</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La forma en que ese plano se implementa físicamente, lo cual determina qué tan rápida, eficiente y costosa será en la práctica.
            </p>
          </div>
        </div>

        {/* Key Insight */}
        <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Por eso, no basta con tener un buen "plano" (una arquitectura potente) si la "construcción" (hardware e interconexiones) crea cuellos de botella.
            </p>
          </div>
        </div>

        {/* Final Statement */}
        <div className="p-6 rounded-xl bg-card border-2 border-primary space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 shrink-0">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <p className="text-foreground leading-relaxed">
              Comprender esta dualidad permite a los ingenieros <span className="font-semibold text-primary">mejorar el rendimiento</span>, <span className="font-semibold text-primary">reducir el consumo</span> y <span className="font-semibold text-primary">optimizar costos</span>, logrando que la tecnología evolucione cada año desde un smartphone hasta servidores y sistemas de IA.
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Algenis 25-1739
        </div>
      </div>
    </div>
  )
}
