"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, SkipForward, RotateCcw, Smartphone, Wifi, WifiOff } from "lucide-react"

// Simple remote control page - NO redirects, NO automatic navigation
// Uses BroadcastChannel for same-origin communication only

const CHANNEL_NAME = "pipeline-presentation-sync"

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

interface SimState {
  slideIndex: number
  hasSimulation: boolean
  isPlaying: boolean
  canStep: boolean
  canReset: boolean
}

export default function RemotePage() {
  const [state, setState] = useState<SimState>({
    slideIndex: 0,
    hasSimulation: false,
    isPlaying: false,
    canStep: true,
    canReset: false,
  })
  const [connected, setConnected] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const mountedRef = useRef(true)

  // Initialize BroadcastChannel once on mount
  useEffect(() => {
    mountedRef.current = true

    // Check if BroadcastChannel is supported
    if (typeof BroadcastChannel === "undefined") {
      return
    }

    try {
      channelRef.current = new BroadcastChannel(CHANNEL_NAME)

      channelRef.current.onmessage = (event) => {
        if (!mountedRef.current) return
        
        const data = event.data
        if (data && data.type === "state") {
          setState({
            slideIndex: data.slideIndex ?? 0,
            hasSimulation: data.hasSimulation ?? false,
            isPlaying: data.isPlaying ?? false,
            canStep: data.canStep ?? true,
            canReset: data.canReset ?? false,
          })
          setConnected(true)
        }
      }
    } catch {
      // BroadcastChannel not supported or error
    }

    return () => {
      mountedRef.current = false
      if (channelRef.current) {
        try {
          channelRef.current.close()
        } catch {
          // Ignore close errors
        }
        channelRef.current = null
      }
    }
  }, [])

  // Send action to presentation
  const sendAction = (action: string) => {
    if (!channelRef.current) return
    
    try {
      channelRef.current.postMessage({ type: "action", action })
      setFeedback(action)
      setTimeout(() => setFeedback(null), 200)
    } catch {
      // Ignore send errors
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex flex-col select-none">
      {/* Header */}
      <header className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-indigo-400" />
            <h1 className="text-lg font-bold text-white">Control Remoto</h1>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            connected 
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          }`}>
            {connected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {connected ? "Sincronizado" : "Esperando..."}
          </div>
        </div>
      </header>

      {/* Current slide */}
      <div className="p-5 border-b border-white/10 bg-white/5">
        <div className="text-center">
          <div className="text-slate-400 text-sm mb-1">Diapositiva</div>
          <div className="text-3xl font-bold text-white mb-1">
            {state.slideIndex + 1} / 8
          </div>
          <div className="text-indigo-400 text-sm font-medium">
            {SLIDE_NAMES[state.slideIndex] || "---"}
          </div>
        </div>
      </div>

      {/* Main controls */}
      <div className="flex-1 p-5 flex flex-col gap-5 overflow-auto">
        {/* Navigation buttons */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <div className="text-slate-400 text-xs uppercase tracking-wider mb-4 text-center font-semibold">
            Navegacion
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => sendAction("prev")}
              disabled={state.slideIndex === 0}
              className={`h-28 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 font-semibold ${
                feedback === "prev"
                  ? "bg-indigo-500 text-white scale-95"
                  : "bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-12 h-12" />
              <span className="text-sm">Anterior</span>
            </button>
            <button
              onClick={() => sendAction("next")}
              disabled={state.slideIndex === 7}
              className={`h-28 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 font-semibold ${
                feedback === "next"
                  ? "bg-indigo-500 text-white scale-95"
                  : "bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-12 h-12" />
              <span className="text-sm">Siguiente</span>
            </button>
          </div>
        </div>

        {/* Simulation controls - only visible when slide has simulation */}
        {state.hasSimulation && (
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-4 text-center font-semibold">
              Simulacion
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => sendAction(state.isPlaying ? "pause" : "play")}
                className={`h-20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 font-semibold ${
                  state.isPlaying 
                    ? "bg-amber-500 text-white" 
                    : "bg-emerald-500 text-white"
                }`}
              >
                {state.isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                <span className="text-xs">{state.isPlaying ? "Pausar" : "Iniciar"}</span>
              </button>
              <button
                onClick={() => sendAction("step")}
                disabled={state.isPlaying || !state.canStep}
                className="h-20 rounded-xl flex flex-col items-center justify-center gap-2 bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-semibold"
              >
                <SkipForward className="w-8 h-8" />
                <span className="text-xs">Paso</span>
              </button>
              <button
                onClick={() => sendAction("reset")}
                className="h-20 rounded-xl flex flex-col items-center justify-center gap-2 bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95 font-semibold"
              >
                <RotateCcw className="w-8 h-8" />
                <span className="text-xs">Reiniciar</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick slide selector */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="text-slate-400 text-xs uppercase tracking-wider mb-3 text-center font-semibold">
            Ir a Diapositiva
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <button
                key={num}
                onClick={() => {
                  const diff = (num - 1) - state.slideIndex
                  if (diff !== 0) {
                    const action = diff > 0 ? "next" : "prev"
                    const count = Math.abs(diff)
                    for (let i = 0; i < count; i++) {
                      setTimeout(() => sendAction(action), i * 150)
                    }
                  }
                }}
                className={`py-3 rounded-lg text-sm font-bold transition-all active:scale-95 ${
                  state.slideIndex === num - 1
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 border-t border-white/10 text-center">
        <p className="text-slate-500 text-xs">
          Los Ingenieros - Arquitectura del Computador
        </p>
      </footer>
    </div>
  )
}
