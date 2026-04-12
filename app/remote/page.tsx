"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, SkipForward, RotateCcw, Smartphone, Wifi, WifiOff } from "lucide-react"

const CHANNEL_NAME = "pipeline-presentation-sync"

interface SimulationState {
  slideIndex: number
  hasSimulation: boolean
  isPlaying: boolean
  canStep: boolean
  canReset: boolean
}

const SLIDE_NAMES = [
  "Titulo",
  "Algenis - Rendimiento",
  "Christopher - Monociclo",
  "Enmanuel - Pipeline",
  "Frainer - Speedup",
  "Oliver - Limitaciones",
  "Gracias",
  "QR Control",
]

export default function RemoteControlPage() {
  const [state, setState] = useState<SimulationState>({
    slideIndex: 0,
    hasSimulation: false,
    isPlaying: false,
    canStep: true,
    canReset: false,
  })
  const [isConnected, setIsConnected] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  // Listen for state updates from the presentation
  useEffect(() => {
    if (typeof window === "undefined") return

    const channel = new BroadcastChannel(CHANNEL_NAME)
    
    channel.onmessage = (e) => {
      if (e.data.type === "state") {
        setState({
          slideIndex: e.data.slideIndex,
          hasSimulation: e.data.hasSimulation,
          isPlaying: e.data.isPlaying,
          canStep: e.data.canStep,
          canReset: e.data.canReset,
        })
        setIsConnected(true)
      }
    }

    // Request current state
    channel.postMessage({ type: "request_state" })

    // Check connection periodically
    const interval = setInterval(() => {
      channel.postMessage({ type: "ping" })
    }, 2000)

    return () => {
      clearInterval(interval)
      channel.close()
    }
  }, [])

  const sendAction = useCallback((action: string) => {
    if (typeof window === "undefined") return
    const channel = new BroadcastChannel(CHANNEL_NAME)
    channel.postMessage({ type: "action", action })
    channel.close()
    
    setLastAction(action)
    setTimeout(() => setLastAction(null), 300)
  }, [])

  const handlePrev = () => sendAction("prev")
  const handleNext = () => sendAction("next")
  const handlePlay = () => sendAction(state.isPlaying ? "pause" : "play")
  const handleStep = () => sendAction("step")
  const handleReset = () => sendAction("reset")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-indigo-400" />
            <h1 className="text-lg font-bold text-white">Control Remoto</h1>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            isConnected 
              ? "bg-emerald-500/20 text-emerald-400" 
              : "bg-red-500/20 text-red-400"
          }`}>
            {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isConnected ? "Conectado" : "Sin conexion"}
          </div>
        </div>
      </header>

      {/* Current slide indicator */}
      <div className="p-4 border-b border-slate-700">
        <div className="text-center">
          <div className="text-slate-400 text-sm mb-1">Diapositiva Actual</div>
          <div className="text-2xl font-bold text-white">
            {state.slideIndex + 1} / 8
          </div>
          <div className="text-indigo-400 text-sm mt-1">
            {SLIDE_NAMES[state.slideIndex] || "..."}
          </div>
        </div>
      </div>

      {/* Main controls */}
      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Navigation */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <div className="text-slate-400 text-sm mb-4 text-center font-medium">Navegacion</div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handlePrev}
              disabled={state.slideIndex === 0}
              className={`h-24 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                lastAction === "prev" 
                  ? "bg-indigo-500 text-white" 
                  : "bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-10 h-10" />
              <span className="text-sm font-semibold">Anterior</span>
            </button>
            <button
              onClick={handleNext}
              disabled={state.slideIndex === 7}
              className={`h-24 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                lastAction === "next" 
                  ? "bg-indigo-500 text-white" 
                  : "bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-10 h-10" />
              <span className="text-sm font-semibold">Siguiente</span>
            </button>
          </div>
        </div>

        {/* Simulation controls - only show when slide has simulation */}
        {state.hasSimulation && (
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-4 text-center font-medium">Controles de Simulacion</div>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handlePlay}
                className={`h-20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                  state.isPlaying 
                    ? "bg-amber-500 text-white" 
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
              >
                {state.isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                <span className="text-xs font-semibold">{state.isPlaying ? "Pausar" : "Iniciar"}</span>
              </button>
              <button
                onClick={handleStep}
                disabled={state.isPlaying || !state.canStep}
                className="h-20 rounded-xl flex flex-col items-center justify-center gap-2 bg-slate-700 text-white hover:bg-slate-600 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <SkipForward className="w-8 h-8" />
                <span className="text-xs font-semibold">Paso</span>
              </button>
              <button
                onClick={handleReset}
                className="h-20 rounded-xl flex flex-col items-center justify-center gap-2 bg-slate-700 text-white hover:bg-slate-600 transition-all active:scale-95"
              >
                <RotateCcw className="w-8 h-8" />
                <span className="text-xs font-semibold">Reiniciar</span>
              </button>
            </div>
          </div>
        )}

        {/* Slide quick jump */}
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-3 text-center font-medium">Saltar a Diapositiva</div>
          <div className="grid grid-cols-4 gap-2">
            {SLIDE_NAMES.map((name, idx) => (
              <button
                key={idx}
                onClick={() => {
                  // Navigate to specific slide
                  const diff = idx - state.slideIndex
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) {
                      setTimeout(() => sendAction("next"), i * 100)
                    }
                  } else if (diff < 0) {
                    for (let i = 0; i < Math.abs(diff); i++) {
                      setTimeout(() => sendAction("prev"), i * 100)
                    }
                  }
                }}
                className={`p-2 rounded-lg text-xs font-medium transition-all ${
                  state.slideIndex === idx
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 border-t border-slate-700 text-center">
        <p className="text-slate-500 text-xs">
          Los Ingenieros - Arquitectura del Computador
        </p>
      </footer>
    </div>
  )
}
