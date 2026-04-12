"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw,
  Wifi,
  WifiOff,
  Monitor
} from "lucide-react"

interface PresentationState {
  currentSlide: number
  totalSlides: number
  hasSimulation: boolean
  isPlaying: boolean
}

const SLIDE_NAMES = [
  "Portada",
  "Medicion de Rendimiento",
  "Procesador Monociclo",
  "Pipeline 5 Etapas",
  "Comparacion y Speedup",
  "Limitaciones Pipeline",
  "Gracias",
  "QR Code"
]

const SLIDES_WITH_SIMULATION = [2, 3] // Christopher and Enmanuel slides

export default function RemoteControlPage() {
  const [state, setState] = useState<PresentationState>({
    currentSlide: 0,
    totalSlides: 8,
    hasSimulation: false,
    isPlaying: false,
  })
  const [isConnected, setIsConnected] = useState(false)
  const [lastPing, setLastPing] = useState<number>(Date.now())
  const [isSending, setIsSending] = useState(false)

  // Fetch current state from presentation
  const fetchState = useCallback(async () => {
    try {
      const res = await fetch("/api/presentation/state")
      if (res.ok) {
        const data = await res.json()
        if (data.state) {
          setState(data.state)
          setIsConnected(Date.now() - (data.state.timestamp || 0) < 10000)
          setLastPing(Date.now())
        }
      }
    } catch {
      setIsConnected(false)
    }
  }, [])

  // Poll for state updates
  useEffect(() => {
    fetchState()
    const interval = setInterval(fetchState, 2000)
    return () => clearInterval(interval)
  }, [fetchState])

  // Send command to presentation
  const sendCommand = async (action: string, slideIndex?: number) => {
    if (isSending) return
    setIsSending(true)
    
    try {
      await fetch("/api/presentation/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, slideIndex }),
      })
      
      // Optimistic update
      if (action === "next" && state.currentSlide < state.totalSlides - 1) {
        setState(s => ({ ...s, currentSlide: s.currentSlide + 1 }))
      } else if (action === "prev" && state.currentSlide > 0) {
        setState(s => ({ ...s, currentSlide: s.currentSlide - 1 }))
      } else if (action === "goto" && slideIndex !== undefined) {
        setState(s => ({ ...s, currentSlide: slideIndex }))
      } else if (action === "play") {
        setState(s => ({ ...s, isPlaying: true }))
      } else if (action === "pause") {
        setState(s => ({ ...s, isPlaying: false }))
      }
    } catch (error) {
      console.error("Error sending command:", error)
    } finally {
      setTimeout(() => setIsSending(false), 300)
    }
  }

  const hasSimulation = SLIDES_WITH_SIMULATION.includes(state.currentSlide)

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold">Control Remoto</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${isConnected ? "text-emerald-400" : "text-red-400"}`}>
          {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          <span>{isConnected ? "Conectado" : "Sin conexion"}</span>
        </div>
      </header>

      {/* Current Slide Info */}
      <div className="bg-slate-800/50 px-4 py-4 text-center border-b border-slate-700">
        <div className="text-slate-400 text-sm mb-1">Diapositiva Actual</div>
        <div className="text-2xl font-bold text-white">
          {state.currentSlide + 1} <span className="text-slate-500">/ {state.totalSlides}</span>
        </div>
        <div className="text-indigo-400 mt-1">{SLIDE_NAMES[state.currentSlide] || "Slide"}</div>
      </div>

      {/* Main Controls */}
      <div className="flex-1 flex flex-col justify-center p-6 gap-6">
        {/* Navigation - Big Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => sendCommand("prev")}
            disabled={state.currentSlide === 0 || isSending}
            className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded-2xl p-8 flex flex-col items-center gap-3 transition-all active:scale-95"
          >
            <ChevronLeft className="w-12 h-12" />
            <span className="text-lg font-medium">Anterior</span>
          </button>
          
          <button
            onClick={() => sendCommand("next")}
            disabled={state.currentSlide === state.totalSlides - 1 || isSending}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-2xl p-8 flex flex-col items-center gap-3 transition-all active:scale-95"
          >
            <ChevronRight className="w-12 h-12" />
            <span className="text-lg font-medium">Siguiente</span>
          </button>
        </div>

        {/* Simulation Controls - Only show on simulation slides */}
        {hasSimulation && (
          <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div className="text-center text-slate-400 text-sm mb-3">Controles de Simulacion</div>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => sendCommand(state.isPlaying ? "pause" : "play")}
                className={`${state.isPlaying ? "bg-amber-600 hover:bg-amber-500" : "bg-emerald-600 hover:bg-emerald-500"} rounded-xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95`}
              >
                {state.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                <span className="text-xs">{state.isPlaying ? "Pausar" : "Iniciar"}</span>
              </button>
              
              <button
                onClick={() => sendCommand("step")}
                className="bg-slate-700 hover:bg-slate-600 rounded-xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95"
              >
                <SkipForward className="w-6 h-6" />
                <span className="text-xs">Paso</span>
              </button>
              
              <button
                onClick={() => sendCommand("reset")}
                className="bg-slate-700 hover:bg-slate-600 rounded-xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95 col-span-2"
              >
                <RotateCcw className="w-6 h-6" />
                <span className="text-xs">Reiniciar</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Jump */}
      <div className="bg-slate-800 border-t border-slate-700 p-4">
        <div className="text-slate-400 text-xs mb-2 text-center">Ir a diapositiva</div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {SLIDE_NAMES.map((name, index) => (
            <button
              key={index}
              onClick={() => sendCommand("goto", index)}
              className={`shrink-0 px-3 py-2 rounded-lg text-sm transition-all ${
                state.currentSlide === index 
                  ? "bg-indigo-600 text-white" 
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
