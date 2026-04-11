"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function ArquitecturaVsOrganizacionSlide() {
  // Estado de los componentes
  const [cpuActive, setCpuActive] = useState(true)
  const [motherboardActive, setMotherboardActive] = useState(true)
  const [ram1Active, setRam1Active] = useState(true)
  const [ram2Active, setRam2Active] = useState(true)

  // Calcular estado del sistema
  const getSystemStatus = () => {
    if (!cpuActive || !motherboardActive) {
      return { status: "critical", message: "Sistema NO funcional", color: "text-red-500" }
    }
    if (!ram1Active && !ram2Active) {
      return { status: "critical", message: "Sistema NO funcional - Sin memoria", color: "text-red-500" }
    }
    if (!ram1Active || !ram2Active) {
      return { status: "warning", message: "Sistema funcional - Rendimiento reducido", color: "text-amber-500" }
    }
    return { status: "ok", message: "Sistema funcionando al 100%", color: "text-emerald-500" }
  }

  const systemStatus = getSystemStatus()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Título */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-foreground">
          Arquitectura vs Organización
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Analogía: Computador y Cuerpo Humano
        </p>
        <div className="h-1 w-24 bg-primary rounded-full mx-auto mt-2" />
      </div>

      {/* Simulador Visual */}
      <div className="flex-1 w-full max-w-5xl grid grid-cols-2 gap-6 items-center">
        
        {/* Lado Izquierdo - Gabinete de PC */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-foreground mb-3">Gabinete de PC</h3>
          <div className="relative w-48 h-64 border-4 border-zinc-600 rounded-lg bg-zinc-800 p-3">
            {/* Ventilador superior */}
            <div className="absolute top-2 right-2 w-6 h-6 border-2 border-zinc-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border border-zinc-400 rounded-full" />
            </div>
            
            {/* CPU */}
            <div 
              className={`absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-md flex items-center justify-center transition-all duration-500 ${
                cpuActive 
                  ? "bg-blue-500 border-2 border-blue-400 shadow-lg shadow-blue-500/50" 
                  : "bg-zinc-700 border-2 border-dashed border-zinc-500 opacity-30"
              }`}
            >
              <span className="text-xs font-bold text-white">CPU</span>
            </div>

            {/* Placa Madre */}
            <div 
              className={`absolute top-24 left-1/2 -translate-x-1/2 w-36 h-20 rounded flex items-center justify-center transition-all duration-500 ${
                motherboardActive 
                  ? "bg-emerald-600 border-2 border-emerald-400 shadow-lg shadow-emerald-500/50" 
                  : "bg-zinc-700 border-2 border-dashed border-zinc-500 opacity-30"
              }`}
            >
              <span className="text-xs font-bold text-white text-center">Placa Madre</span>
            </div>

            {/* RAM 1 (Izquierda) */}
            <div 
              className={`absolute bottom-6 left-4 w-6 h-16 rounded flex items-center justify-center transition-all duration-500 ${
                ram1Active 
                  ? "bg-purple-500 border-2 border-purple-400 shadow-lg shadow-purple-500/50" 
                  : "bg-zinc-700 border-2 border-dashed border-zinc-500 opacity-30"
              }`}
            >
              <span className="text-[8px] font-bold text-white writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>RAM 1</span>
            </div>

            {/* RAM 2 (Derecha) */}
            <div 
              className={`absolute bottom-6 right-4 w-6 h-16 rounded flex items-center justify-center transition-all duration-500 ${
                ram2Active 
                  ? "bg-purple-500 border-2 border-purple-400 shadow-lg shadow-purple-500/50" 
                  : "bg-zinc-700 border-2 border-dashed border-zinc-500 opacity-30"
              }`}
            >
              <span className="text-[8px] font-bold text-white" style={{ writingMode: 'vertical-rl' }}>RAM 2</span>
            </div>

            {/* Conexiones visuales */}
            {motherboardActive && (
              <>
                {cpuActive && (
                  <div className="absolute top-[88px] left-1/2 -translate-x-1/2 w-0.5 h-2 bg-emerald-400" />
                )}
                {ram1Active && (
                  <div className="absolute bottom-[88px] left-7 w-0.5 h-2 bg-emerald-400" />
                )}
                {ram2Active && (
                  <div className="absolute bottom-[88px] right-7 w-0.5 h-2 bg-emerald-400" />
                )}
              </>
            )}
          </div>
        </div>

        {/* Lado Derecho - Cuerpo Humano */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-foreground mb-3">Cuerpo Humano</h3>
          <div className="relative w-48 h-64">
            {/* Silueta del cuerpo */}
            <svg viewBox="0 0 200 280" className="w-full h-full">
              {/* Cabeza */}
              <ellipse cx="100" cy="35" rx="30" ry="35" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />
              
              {/* Cuello */}
              <rect x="90" y="65" width="20" height="20" fill="#d4a574" />
              
              {/* Torso */}
              <path 
                d="M60 85 L140 85 L150 200 L50 200 Z" 
                fill="#e8d4c4" 
                stroke="#c9b8a8" 
                strokeWidth="2"
              />
              
              {/* Brazos */}
              <path d="M60 85 L30 160 L40 165 L65 100" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />
              <path d="M140 85 L170 160 L160 165 L135 100" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />
              
              {/* Piernas */}
              <path d="M70 200 L60 270 L80 270 L85 200" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />
              <path d="M130 200 L140 270 L120 270 L115 200" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />

              {/* Cerebro (dentro de la cabeza) */}
              {cpuActive && (
                <g className="animate-pulse">
                  <ellipse cx="100" cy="30" rx="20" ry="18" fill="#f472b6" stroke="#ec4899" strokeWidth="2" />
                  <path d="M85 25 Q90 20 100 22 Q110 20 115 25" stroke="#ec4899" strokeWidth="1" fill="none" />
                  <path d="M85 32 Q90 35 100 33 Q110 35 115 32" stroke="#ec4899" strokeWidth="1" fill="none" />
                  <text x="100" y="34" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">Cerebro</text>
                </g>
              )}
              {!cpuActive && (
                <g opacity="0.3">
                  <ellipse cx="100" cy="30" rx="20" ry="18" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" />
                </g>
              )}

              {/* Corazón */}
              {motherboardActive && (
                <g className="animate-pulse">
                  <path 
                    d="M100 110 C85 95 70 105 70 120 C70 140 100 155 100 155 C100 155 130 140 130 120 C130 105 115 95 100 110" 
                    fill="#ef4444" 
                    stroke="#dc2626" 
                    strokeWidth="2"
                  />
                  <text x="100" y="130" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">Corazón</text>
                </g>
              )}
              {!motherboardActive && (
                <g opacity="0.3">
                  <path 
                    d="M100 110 C85 95 70 105 70 120 C70 140 100 155 100 155 C100 155 130 140 130 120 C130 105 115 95 100 110" 
                    fill="none" 
                    stroke="#666" 
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                </g>
              )}

              {/* Riñón Izquierdo */}
              {ram1Active && (
                <g>
                  <ellipse cx="75" cy="175" rx="12" ry="18" fill="#a855f7" stroke="#9333ea" strokeWidth="2" />
                  <text x="75" y="178" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Riñón</text>
                  <text x="75" y="186" textAnchor="middle" fontSize="5" fill="white">Izq.</text>
                </g>
              )}
              {!ram1Active && (
                <g opacity="0.3">
                  <ellipse cx="75" cy="175" rx="12" ry="18" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" />
                </g>
              )}

              {/* Riñón Derecho */}
              {ram2Active && (
                <g>
                  <ellipse cx="125" cy="175" rx="12" ry="18" fill="#a855f7" stroke="#9333ea" strokeWidth="2" />
                  <text x="125" y="178" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Riñón</text>
                  <text x="125" y="186" textAnchor="middle" fontSize="5" fill="white">Der.</text>
                </g>
              )}
              {!ram2Active && (
                <g opacity="0.3">
                  <ellipse cx="125" cy="175" rx="12" ry="18" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" />
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Estado del Sistema */}
      <div className={`flex items-center gap-2 mb-3 px-4 py-2 rounded-lg ${
        systemStatus.status === "ok" ? "bg-emerald-500/10" : 
        systemStatus.status === "warning" ? "bg-amber-500/10" : "bg-red-500/10"
      }`}>
        {systemStatus.status === "ok" && <CheckCircle className="h-5 w-5 text-emerald-500" />}
        {systemStatus.status === "warning" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
        {systemStatus.status === "critical" && <XCircle className="h-5 w-5 text-red-500" />}
        <span className={`font-semibold ${systemStatus.color}`}>{systemStatus.message}</span>
      </div>

      {/* Controles */}
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-4 gap-4 p-4 bg-card rounded-xl border border-border">
          {/* CPU / Cerebro */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-foreground">CPU</span>
            </div>
            <Switch 
              checked={cpuActive} 
              onCheckedChange={setCpuActive}
              className="data-[state=checked]:bg-blue-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-xs font-medium text-foreground">Cerebro</span>
            </div>
          </div>

          {/* Placa Madre / Corazón */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-foreground">Placa Madre</span>
            </div>
            <Switch 
              checked={motherboardActive} 
              onCheckedChange={setMotherboardActive}
              className="data-[state=checked]:bg-emerald-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs font-medium text-foreground">Corazón</span>
            </div>
          </div>

          {/* RAM 1 / Riñón Izq */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs font-medium text-foreground">RAM 1</span>
            </div>
            <Switch 
              checked={ram1Active} 
              onCheckedChange={setRam1Active}
              className="data-[state=checked]:bg-purple-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs font-medium text-foreground">Riñón Izq.</span>
            </div>
          </div>

          {/* RAM 2 / Riñón Der */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs font-medium text-foreground">RAM 2</span>
            </div>
            <Switch 
              checked={ram2Active} 
              onCheckedChange={setRam2Active}
              className="data-[state=checked]:bg-purple-500"
            />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs font-medium text-foreground">Riñón Der.</span>
            </div>
          </div>
        </div>

        {/* Explicación educativa */}
        <div className="mt-3 p-3 bg-muted/30 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            <strong className="text-foreground">Concepto clave:</strong> La <span className="text-blue-500 font-medium">ARQUITECTURA</span> no cambia (sigue siendo un computador / cuerpo humano), 
            pero la <span className="text-amber-500 font-medium">ORGANIZACIÓN</span> sí cambia al quitar componentes, afectando el rendimiento.
          </p>
        </div>

        <div className="text-xs text-muted-foreground mt-2 text-center">
          Enmanuel Santos Diaz 25-1544
        </div>
      </div>
    </div>
  )
}
