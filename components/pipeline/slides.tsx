"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { 
  Cpu, 
  Clock, 
  Zap, 
  TrendingUp, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle,
  CheckCircle2,
  Timer,
  Activity,
  ChevronRight,
  ChevronLeft,
  Gauge,
  SkipForward,
  QrCode,
  Image,
  FileText,
  Database,
  Mail,
  Video,
  Archive,
  Circle,
  Settings2,
  BarChart3,
  Layers,
  Music,
  Search,
  Download,
  Send,
  Camera,
  MessageSquare,
  ShoppingCart,
  Heart
} from "lucide-react"
import QRCode from "qrcode"

/* ─────────────────────────────────────────────
   PIPELINE PRESENTATION SLIDES
   Los Ingenieros - Arquitectura del Computador
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   SHARED PRESENTER BADGE (TOP RIGHT)
───────────────────────────────────────────── */
function Presenter({ name }: { name: string }) {
  return (
    <div className="absolute top-5 right-6 z-20">
      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm">
        <span className="text-slate-700 text-sm font-medium">{name}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SHARED NAVIGATION COMPONENT
───────────────────────────────────────────── */
function SlideNavigation({ slideNumber, totalSlides }: { slideNumber: number; totalSlides: number }) {
  const goToPrev = () => {
    if (typeof window !== "undefined" && (window as unknown as { Reveal?: { prev: () => void } }).Reveal) {
      (window as unknown as { Reveal: { prev: () => void } }).Reveal.prev()
    }
  }

  const goToNext = () => {
    if (typeof window !== "undefined" && (window as unknown as { Reveal?: { next: () => void } }).Reveal) {
      (window as unknown as { Reveal: { next: () => void } }).Reveal.next()
    }
  }

  return (
  <div className="mt-auto pt-2 flex justify-end items-center gap-3">
  <span className="text-slate-500 text-sm font-mono">{slideNumber}/{totalSlides}</span>
      <button
        onClick={goToPrev}
        disabled={slideNumber === 1}
        className="px-3 py-2 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all border border-slate-200 shadow-sm text-sm font-medium text-slate-700"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>
      <button
        onClick={goToNext}
        disabled={slideNumber === totalSlides}
        className="px-3 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all shadow-sm text-sm font-medium text-white"
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TITLE SLIDE
───────────────────────────────────────────── */
export function TitleSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [tick, setTick] = useState(0)
  
  useEffect(() => {
    if (isPrintMode) return
    const id = setInterval(() => setTick((t) => t + 1), 150)
    return () => clearInterval(id)
  }, [isPrintMode])

  const members = [
    "Algenis De los Santos Lopez",
    "Christopher Enrique Marrero Liriano",
    "Enmanuel Santos Diaz",
    "Frainer Encarnacion",
    "Oliver Abreu Mateo",
  ]

  const stages = ["IF", "ID", "EX", "MEM", "WB"]
  const pipelineColors = ["#0d9488", "#7c3aed", "#db2777", "#ea580c", "#16a34a"]

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(13,148,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated pipeline stages at top */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-4">
        {stages.map((stage, i) => {
          const isActive = (tick + i) % 8 < 5
          return (
            <div key={stage} className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 border-2 shadow-lg"
                style={{
                  backgroundColor: isActive ? pipelineColors[i] : "white",
                  borderColor: pipelineColors[i],
                  color: isActive ? "white" : pipelineColors[i],
                  boxShadow: isActive ? `0 8px 30px ${pipelineColors[i]}40` : "0 4px 15px rgba(0,0,0,0.1)",
                  transform: isActive ? "scale(1.08) translateY(-4px)" : "scale(1)",
                }}
              >
                {stage}
              </div>
              {i < stages.length - 1 && (
                <ChevronRight 
                  className="w-6 h-6 transition-all duration-300"
                  style={{ color: pipelineColors[i], opacity: isActive ? 1 : 0.4 }}
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="max-w-5xl w-full px-16 space-y-8 z-10">
        <div className="space-y-5">
          <div className="text-teal-600 font-mono text-sm tracking-widest uppercase font-semibold">
            Arquitectura del Computador - Proyecto Final
          </div>
          <h1 className="text-5xl font-bold text-slate-800 leading-tight">
            Comparador de Rendimiento:
            <br />
            <span className="text-teal-600">Procesador Monociclo</span>
            <br />
            vs <span className="text-purple-600">Pipeline de 5 Etapas</span>
          </h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full" />
        </div>

        <div className="flex gap-3 flex-wrap mt-10">
          {members.map((m) => (
            <span
              key={m}
              className="text-sm font-medium text-slate-600 border border-slate-300 px-4 py-2 rounded-full bg-white/80 shadow-sm hover:border-teal-400 hover:text-teal-700 transition-all"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="text-slate-400 text-sm font-semibold mt-6 tracking-wide">Los Ingenieros</div>
      </div>

      {/* Floating formulas */}
      <div className="absolute bottom-28 right-20 text-right space-y-3 opacity-60">
        <div className="font-mono text-teal-600 text-sm bg-white/80 px-4 py-2 rounded-lg shadow-sm">
          T_CPU = I × CPI × T_ciclo
        </div>
        <div className="font-mono text-purple-600 text-sm bg-white/80 px-4 py-2 rounded-lg shadow-sm">
          Speedup = T_mono / T_pipe
        </div>
      </div>

      <SlideNavigation slideNumber={1} totalSlides={8} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 1: ALGENIS - Medición de Rendimiento
───────────────────────────────────────────── */
export function AlgenisSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [instructions, setInstructions] = useState(1000)
  const [cpi, setCpi] = useState(1)
  const [frequency, setFrequency] = useState(1000)
  
  const cycleTime = 1 / frequency
  const cpuTime = (instructions * cpi) / frequency
  const totalCycles = instructions * cpi

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex flex-col p-8 relative overflow-hidden">
      <Presenter name="Algenis De los Santos Lopez" />
      
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-6 z-10">
        <div className="text-teal-600 font-mono text-xs tracking-widest uppercase mb-2 font-semibold">Seccion 01</div>
        <h2 className="text-4xl font-bold text-slate-800">Como se Mide el Rendimiento de un Procesador</h2>
        <div className="h-1 w-24 bg-teal-500 mt-3 rounded-full" />
      </div>

      <div className="flex gap-6 flex-1 min-h-0 z-10">
        {/* Left: Concepts */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-teal-600 font-semibold mb-3 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Tiempo de Ejecucion
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              El tiempo que tarda un programa en completarse. Es la metrica mas directa del rendimiento.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-purple-600 font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              CPI (Cycles Per Instruction)
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ciclos promedio necesarios para ejecutar una instruccion. Monociclo: CPI = 1 pero ciclo largo.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-emerald-600 font-semibold mb-3 flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              Frecuencia del Reloj
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ciclos por segundo (Hz). Mayor frecuencia = ciclos mas cortos = potencialmente mas rapido.
            </p>
          </div>

          {/* Formula box */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border-2 border-teal-200 mt-auto">
            <div className="text-slate-800 font-semibold mb-3">Formula del Tiempo de CPU:</div>
            <div className="bg-white rounded-lg p-4 font-mono text-center border border-teal-100">
              <div className="text-teal-700 text-lg font-bold">
                T<sub>CPU</sub> = I × CPI × T<sub>ciclo</sub>
              </div>
              <div className="text-slate-500 text-sm mt-2">
                T<sub>CPU</sub> = (I × CPI) / f
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Calculator */}
        <div className="flex-1 bg-white rounded-xl p-6 border border-teal-200 shadow-md">
          <h3 className="text-slate-800 text-xl font-bold mb-6 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-teal-600" />
            Calculadora de Tiempo de CPU
          </h3>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="space-y-3">
              <label className="text-slate-500 text-sm font-medium">Numero de Instrucciones (I)</label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={instructions}
                onChange={(e) => setInstructions(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="text-teal-600 font-mono text-2xl font-bold">{instructions.toLocaleString()}</div>
            </div>

            <div className="space-y-3">
              <label className="text-slate-500 text-sm font-medium">CPI (Ciclos por Instruccion)</label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={cpi}
                onChange={(e) => setCpi(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="text-purple-600 font-mono text-2xl font-bold">{cpi.toFixed(1)}</div>
            </div>

            <div className="space-y-3">
              <label className="text-slate-500 text-sm font-medium">Frecuencia (MHz)</label>
              <input
                type="range"
                min="100"
                max="4000"
                step="100"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="text-emerald-600 font-mono text-2xl font-bold">{frequency} MHz</div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-5 text-center border border-slate-200">
              <div className="text-slate-500 text-sm mb-2">Tiempo de Ciclo</div>
              <div className="text-slate-800 font-mono text-xl font-bold">
                {(cycleTime * 1000).toFixed(3)} ns
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 text-center border border-slate-200">
              <div className="text-slate-500 text-sm mb-2">Total de Ciclos</div>
              <div className="text-slate-800 font-mono text-xl font-bold">
                {totalCycles.toLocaleString()}
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl p-5 text-center shadow-lg">
              <div className="text-teal-100 text-sm mb-2 font-semibold">Tiempo de CPU</div>
              <div className="text-white font-mono text-2xl font-bold">
                {cpuTime >= 1000 ? `${(cpuTime / 1000).toFixed(2)} ms` : `${cpuTime.toFixed(2)} μs`}
              </div>
            </div>
          </div>

          {/* Live calculation display */}
          <div className="mt-6 bg-slate-50 rounded-lg p-4 font-mono text-sm border border-slate-200">
            <div className="text-slate-500">
              T<sub>CPU</sub> = ({instructions.toLocaleString()} × {cpi.toFixed(1)}) / {frequency} MHz
            </div>
            <div className="text-teal-600 mt-1">
              T<sub>CPU</sub> = {totalCycles.toLocaleString()} / {frequency}×10⁶ = <span className="text-slate-800 font-bold">{cpuTime.toFixed(4)} μs</span>
            </div>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={2} totalSlides={8} />
    </div>
  )
}

/* ───────────────────────────────��─────────������───
   SLIDE 2: CHRISTOPHER - Procesador Monociclo
   REDESIGNED: Cleaner, more visual, less text
───────────────────────────────────────────── */
const MONOCYCLE_INSTRUCTIONS = [
  { name: "ADD", realTime: 200 },
  { name: "LOAD", realTime: 800 },
  { name: "SUB", realTime: 200 },
  { name: "STORE", realTime: 700 },
  { name: "AND", realTime: 150 },
  { name: "OR", realTime: 150 },
]

const MONOCYCLE_CYCLE_TIME = 800

export function ChristopherSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [currentCycle, setCurrentCycle] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalInstructions = MONOCYCLE_INSTRUCTIONS.length
  const totalTime = totalInstructions * MONOCYCLE_CYCLE_TIME
  const executedTime = currentCycle * MONOCYCLE_CYCLE_TIME
  const usefulTime = MONOCYCLE_INSTRUCTIONS.slice(0, currentCycle).reduce((acc, i) => acc + i.realTime, 0)
  const wastedTime = executedTime - usefulTime
  const wastedPercent = executedTime > 0 ? ((wastedTime / executedTime) * 100).toFixed(0) : "0"
  const totalWasted = MONOCYCLE_INSTRUCTIONS.reduce((acc, i) => acc + (MONOCYCLE_CYCLE_TIME - i.realTime), 0)

  const startSimulation = useCallback(() => {
    if (currentCycle >= totalInstructions) {
      setCurrentCycle(0)
    }
    setIsRunning(true)
  }, [currentCycle, totalInstructions])

  const pauseSimulation = useCallback(() => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setCurrentCycle(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const stepForward = useCallback(() => {
    if (currentCycle < totalInstructions) {
      setCurrentCycle((c) => c + 1)
    }
  }, [currentCycle, totalInstructions])

  // Expose simulation actions for remote control
  useEffect(() => {
    window.triggerSimulationAction = (action: string) => {
      switch (action) {
        case "play": startSimulation(); break
        case "pause": pauseSimulation(); break
        case "step": stepForward(); break
        case "reset": resetSimulation(); break
      }
    }
    return () => { window.triggerSimulationAction = undefined }
  }, [startSimulation, pauseSimulation, stepForward, resetSimulation])
  
  useEffect(() => {
    if (isPrintMode || !isRunning) return

    intervalRef.current = setInterval(() => {
      setCurrentCycle((c) => {
        if (c >= totalInstructions) {
          setIsRunning(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
          return c
        }
        return c + 1
      })
    }, 1200)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPrintMode, isRunning, totalInstructions])

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col p-6 relative overflow-hidden">
      <Presenter name="Christopher Enrique Marrero Liriano" />
      
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(234,88,12,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-4 z-10">
        <div className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-2 font-semibold">Seccion 02</div>
        <h2 className="text-3xl font-bold text-slate-800">Simulacion del Procesador Monociclo</h2>
        <div className="h-1 w-24 bg-orange-500 mt-2 rounded-full" />
      </div>

      <div className="flex gap-5 flex-1 min-h-0 z-10">
        {/* Main simulation area - large and centered */}
        <div className="flex-1 bg-white rounded-xl p-5 border-2 border-orange-200 shadow-md flex flex-col">
          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-slate-800 font-bold">Linea de Tiempo</span>
              <span className="text-slate-400 text-sm">Ciclo = {MONOCYCLE_CYCLE_TIME}ns (definido por LOAD)</span>
            </div>
            <div className="flex gap-2">
              {!isRunning ? (
                <button
                  onClick={startSimulation}
                  disabled={currentCycle >= totalInstructions && !isRunning}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" />
                  Simular
                </button>
              ) : (
                <button
                  onClick={pauseSimulation}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm"
                >
                  <Pause className="w-4 h-4" />
                  Pausar
                </button>
              )}
              <button
                onClick={stepForward}
                disabled={isRunning || currentCycle >= totalInstructions}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-300 text-slate-700 font-semibold rounded-lg transition-all flex items-center gap-2 border border-slate-200"
              >
                <SkipForward className="w-4 h-4" />
                Paso
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all flex items-center gap-2 border border-slate-200"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
            </div>
          </div>

          {/* Visual Timeline - REDESIGNED to avoid overlapping labels */}
          <div className="flex-1 overflow-auto">
            <div className="space-y-3">
              {MONOCYCLE_INSTRUCTIONS.map((instr, idx) => {
                const isExecuting = currentCycle === idx + 1
                const isCompleted = currentCycle > idx
                const wastedForThis = MONOCYCLE_CYCLE_TIME - instr.realTime
                const usedPercent = (instr.realTime / MONOCYCLE_CYCLE_TIME) * 100
                
                return (
                  <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    isExecuting ? "bg-orange-50 ring-2 ring-orange-400" : 
                    isCompleted ? "bg-slate-50" : "bg-white border border-slate-100"
                  }`}>
                    {/* Instruction name */}
                    <div className="w-16 shrink-0 text-center">
                      <div className={`font-mono text-lg font-bold ${
                        isExecuting ? "text-orange-600" : isCompleted ? "text-slate-600" : "text-slate-300"
                      }`}>
                        {instr.name}
                      </div>
                    </div>

                    {/* Visual bar */}
                    <div className="flex-1 h-12 rounded-lg overflow-hidden bg-slate-100 relative">
                      {(isCompleted || isExecuting) && (
                        <>
                          {/* Useful time - green */}
                          <div 
                            className="absolute left-0 top-0 h-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${usedPercent}%` }}
                          />
                          {/* Wasted time - red with stripes */}
                          <div 
                            className="absolute top-0 h-full bg-red-400 transition-all duration-500"
                            style={{ 
                              left: `${usedPercent}%`,
                              width: `${100 - usedPercent}%`,
                              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 8px)'
                            }}
                          />
                        </>
                      )}
                    </div>

                    {/* Labels OUTSIDE the bar to avoid overlap */}
                    <div className="w-32 shrink-0 flex items-center gap-2 text-xs">
                      {(isCompleted || isExecuting) ? (
                        <>
                          <div className="flex items-center gap-1">
                            <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
                            <span className="font-mono font-bold text-emerald-700">{instr.realTime}ns</span>
                          </div>
                          {wastedForThis > 0 && (
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-sm bg-red-400"></div>
                              <span className="font-mono font-bold text-red-600">+{wastedForThis}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-slate-300 font-mono">---</span>
                      )}
                    </div>

                    {/* Status */}
                    <div className="w-6 shrink-0">
                      {isExecuting && (
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      )}
                      {isCompleted && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-5 h-4 bg-emerald-500 rounded"></div>
              <span className="text-slate-600 text-sm">Tiempo util</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-4 bg-red-400 rounded" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)'
              }}></div>
              <span className="text-slate-600 text-sm">Tiempo desperdiciado</span>
            </div>
          </div>
        </div>

        {/* Side panel - compact stats with proper spacing for navigation */}
        <div className="w-64 flex flex-col gap-2">
          {/* Formula - more compact */}
          <div className="bg-white rounded-xl p-3 border-2 border-orange-200 shadow-sm">
            <div className="bg-orange-50 rounded-lg p-2 font-mono text-center border border-orange-100">
              <span className="text-orange-700 font-bold text-sm">T = N × T<sub>ciclo</sub></span>
            </div>
            <div className="mt-1 text-xs text-slate-500 text-center">
              {totalInstructions} × {MONOCYCLE_CYCLE_TIME}ns = <span className="font-bold text-orange-600">{totalTime}ns</span>
            </div>
          </div>

          {/* Live Stats - reduced height */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Ciclo</span>
                <span className="font-mono font-bold text-orange-600">{currentCycle}/{totalInstructions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Tiempo</span>
                <span className="font-mono font-bold text-slate-800">{executedTime}ns</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-500 text-xs">Util</span>
                <span className="font-mono font-bold text-emerald-600">{usefulTime}ns</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-400 text-xs">Desperdicio</span>
                <span className="font-mono font-bold text-red-500">{wastedTime}ns</span>
              </div>
            </div>
          </div>

          {/* Final result - always visible area, content conditional */}
          <div className={`rounded-xl p-3 text-center transition-all duration-300 ${
            currentCycle === totalInstructions 
              ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg" 
              : "bg-slate-100 border border-slate-200"
          }`}>
            {currentCycle === totalInstructions ? (
              <>
                <div className="text-orange-100 text-xs mb-1">Resultado Final</div>
                <div className="text-xl font-bold">{totalTime}ns</div>
                <div className="text-sm opacity-90">
                  <span className="font-bold">{((totalWasted / totalTime) * 100).toFixed(0)}%</span> desperdiciado
                </div>
              </>
            ) : (
              <div className="text-slate-400 text-sm py-2">
                Ejecuta la simulacion para ver el resultado
              </div>
            )}
          </div>

          {/* Spacer to push content away from navigation */}
          <div className="flex-1 min-h-8"></div>
        </div>
      </div>

      <SlideNavigation slideNumber={3} totalSlides={8} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 3: ENMANUEL - Pipeline de 5 Etapas
──────────────────────��────────────────────── */
const PIPELINE_STAGES = ["IF", "ID", "EX", "MEM", "WB"]
const STAGE_COLORS = {
  IF: "#0d9488",
  ID: "#7c3aed", 
  EX: "#db2777",
  MEM: "#ea580c",
  WB: "#16a34a",
}
const STAGE_NAMES = {
  IF: "Fetch",
  ID: "Decode", 
  EX: "Execute",
  MEM: "Memory",
  WB: "Write",
}

const PIPELINE_INSTRUCTIONS = [
  "ADD R1, R2, R3",
  "LOAD R4, 0(R1)",
  "SUB R5, R4, R2",
  "STORE R5, 4(R1)",
  "AND R6, R3, R5",
  "OR R7, R6, R1",
]

export function EnmanuelSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [currentCycle, setCurrentCycle] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const numInstructions = PIPELINE_INSTRUCTIONS.length
  const totalCycles = numInstructions + PIPELINE_STAGES.length - 1
  const cycleTimePipeline = 200

  const startSimulation = useCallback(() => {
    if (currentCycle >= totalCycles) setCurrentCycle(0)
    setIsRunning(true)
  }, [currentCycle, totalCycles])

  const pauseSimulation = useCallback(() => {
    setIsRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setCurrentCycle(0)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const stepForward = useCallback(() => {
    if (currentCycle < totalCycles) setCurrentCycle((c) => c + 1)
  }, [currentCycle, totalCycles])

  // Expose simulation actions for remote control
  useEffect(() => {
    window.triggerSimulationAction = (action: string) => {
      switch (action) {
        case "play": startSimulation(); break
        case "pause": pauseSimulation(); break
        case "step": stepForward(); break
        case "reset": resetSimulation(); break
      }
    }
    return () => { window.triggerSimulationAction = undefined }
  }, [startSimulation, pauseSimulation, stepForward, resetSimulation])

  useEffect(() => {
    if (isPrintMode || !isRunning) return
    intervalRef.current = setInterval(() => {
      setCurrentCycle((c) => {
        if (c >= totalCycles) {
          setIsRunning(false)
          return c
        }
        return c + 1
      })
    }, 600)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPrintMode, isRunning, totalCycles])

  const getInstructionStage = (instrIdx: number, cycle: number): string | null => {
    const stageIdx = cycle - instrIdx - 1
    if (stageIdx >= 0 && stageIdx < PIPELINE_STAGES.length) return PIPELINE_STAGES[stageIdx]
    return null
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col p-6 relative overflow-hidden">
      <Presenter name="Enmanuel Santos Diaz" />
      
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-4 z-10">
        <div className="text-purple-600 font-mono text-xs tracking-widest uppercase mb-2 font-semibold">Seccion 03</div>
        <h2 className="text-3xl font-bold text-slate-800">Simulacion del Pipeline de 5 Etapas</h2>
        <div className="h-1 w-24 bg-purple-500 mt-2 rounded-full" />
      </div>

      <div className="flex gap-5 flex-1 min-h-0 z-10">
        {/* Left: Stage legend */}
        <div className="w-56 flex flex-col gap-3">
          <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-sm">
            <h3 className="text-purple-600 font-bold text-sm mb-3">Etapas</h3>
            <div className="space-y-2">
              {PIPELINE_STAGES.map((stage) => (
                <div key={stage} className="flex items-center gap-3">
                  <div
                    className="w-10 h-6 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{ backgroundColor: STAGE_COLORS[stage as keyof typeof STAGE_COLORS] }}
                  >
                    {stage}
                  </div>
                  <span className="text-slate-600 text-sm">
                    {STAGE_NAMES[stage as keyof typeof STAGE_NAMES]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
            <div className="text-xs text-slate-500 mb-2">Tiempo de Ciclo</div>
            <div className="text-center">
              <span className="text-purple-700 font-mono text-2xl font-bold">{cycleTimePipeline}ns</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm mt-auto">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
                <div className="text-slate-500 text-xs">Ciclo</div>
                <div className="text-purple-600 font-mono font-bold text-lg">{currentCycle}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                <div className="text-slate-500 text-xs">Tiempo</div>
                <div className="text-slate-800 font-mono font-bold text-lg">{currentCycle * cycleTimePipeline}ns</div>
              </div>
            </div>
            {currentCycle === totalCycles && (
              <div className="mt-3 text-center p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <span className="text-white text-sm font-bold">Total: {totalCycles * cycleTimePipeline}ns</span>
              </div>
            )}
          </div>
        </div>

        {/* Pipeline Table */}
        <div className="flex-1 bg-white rounded-xl p-5 border-2 border-purple-200 shadow-md flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              <span className="text-slate-800 font-bold">Ejecucion Paralela</span>
            </div>
            <div className="flex gap-2">
              {!isRunning ? (
                <button onClick={startSimulation} className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg flex items-center gap-2 shadow-sm">
                  <Play className="w-4 h-4" /> Iniciar
                </button>
              ) : (
                <button onClick={pauseSimulation} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg flex items-center gap-2 shadow-sm">
                  <Pause className="w-4 h-4" /> Pausar
                </button>
              )}
              <button onClick={stepForward} disabled={isRunning || currentCycle >= totalCycles} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-semibold rounded-lg flex items-center gap-2 border border-slate-200">
                <SkipForward className="w-4 h-4" /> Paso
              </button>
              <button onClick={resetSimulation} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-2 border border-slate-200">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <div className="space-y-2">
              <div className="flex items-center gap-1 sticky top-0 bg-white pb-2">
                <div className="w-32 text-slate-400 text-xs font-medium shrink-0">Instruccion</div>
                {Array.from({ length: totalCycles }).map((_, i) => (
                  <div key={i} className={`w-10 h-6 flex items-center justify-center text-xs font-mono shrink-0 rounded transition-all ${
                    i + 1 === currentCycle ? "bg-purple-500 text-white font-bold" : i + 1 < currentCycle ? "text-purple-400 bg-purple-50" : "text-slate-300 bg-slate-50"
                  }`}>
                    C{i + 1}
                  </div>
                ))}
              </div>

              {PIPELINE_INSTRUCTIONS.map((instr, instrIdx) => (
                <div key={instrIdx} className="flex items-center gap-1">
                  <div className="w-32 font-mono text-xs text-slate-600 truncate shrink-0">{instr}</div>
                  {Array.from({ length: totalCycles }).map((_, cycleIdx) => {
                    const stage = getInstructionStage(instrIdx, cycleIdx + 1)
                    const isActive = cycleIdx + 1 <= currentCycle
                    if (!stage) return <div key={cycleIdx} className="w-10 h-8 bg-slate-50 rounded shrink-0" />
                    const color = STAGE_COLORS[stage as keyof typeof STAGE_COLORS]
                    return (
                      <div key={cycleIdx} className="w-10 h-8 rounded flex items-center justify-center text-xs font-bold text-white shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? color : `${color}30`,
                          boxShadow: cycleIdx + 1 === currentCycle ? `0 0 10px ${color}80` : "none",
                          transform: cycleIdx + 1 === currentCycle ? "scale(1.1)" : "scale(1)",
                        }}>
                        {stage}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-xl p-3">
            <p className="text-slate-700 text-sm text-center">
              <strong className="text-purple-600">5 instrucciones</strong> ejecutandose en paralelo = Throughput ~1 instruccion/ciclo
            </p>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={4} totalSlides={8} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 4: FRAINER - Comparación y Speedup
   Advanced Multi-Tab Simulation Dashboard
───────────────────────────────────────────── */

type SimulationTab = "realworld" | "balls" | "throughput" | "calculator"

  // Real-world task scenarios - each task has unique durations for realistic variety
  // monoDuration/pipeDuration are the simulated wall-clock times in ms
  const REAL_WORLD_TASKS = [
  { id: "compress", name: "Comprimir Imagen", icon: Image, monoInstructions: 100, pipeInstructions: 100, description: "Compresion JPEG 1920x1080", visualType: "image" as const,   monoDuration: 7200, pipeDuration: 1800 },
  { id: "copy",     name: "Copiar Archivo",   icon: FileText, monoInstructions: 80, pipeInstructions: 80,  description: "Duplicar archivo de 10MB",   visualType: "file" as const,     monoDuration: 5600, pipeDuration: 1400 },
  { id: "query",    name: "Consulta DB",       icon: Database, monoInstructions: 60, pipeInstructions: 60,  description: "SELECT con JOIN complejo",   visualType: "database" as const, monoDuration: 4800, pipeDuration: 1600 },
  { id: "email",    name: "Procesar Emails",   icon: Mail,     monoInstructions: 90, pipeInstructions: 90,  description: "Filtrar 100 correos spam",   visualType: "email" as const,    monoDuration: 9000, pipeDuration: 1800 },
  { id: "video",    name: "Renderizar Video",  icon: Video,    monoInstructions: 120, pipeInstructions: 120, description: "Transcoding 4K 30fps",      visualType: "video" as const,    monoDuration: 12000, pipeDuration: 2400 },
  { id: "zip",      name: "Crear ZIP",         icon: Archive,  monoInstructions: 100, pipeInstructions: 100, description: "Comprimir 50 archivos",     visualType: "archive" as const,  monoDuration: 6400, pipeDuration: 1600 },
  ]

// Throughput tasks with friendly icons
const THROUGHPUT_TASKS = [
  { id: 1, name: "Spotify", icon: Music, color: "#1DB954" },
  { id: 2, name: "Google", icon: Search, color: "#4285F4" },
  { id: 3, name: "WhatsApp", icon: MessageSquare, color: "#25D366" },
  { id: 4, name: "Instagram", icon: Camera, color: "#E4405F" },
  { id: 5, name: "Netflix", icon: Video, color: "#E50914" },
  { id: 6, name: "Amazon", icon: ShoppingCart, color: "#FF9900" },
  { id: 7, name: "TikTok", icon: Heart, color: "#000000" },
  { id: 8, name: "Gmail", icon: Mail, color: "#EA4335" },
]

export function FrainerSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [activeTab, setActiveTab] = useState<SimulationTab>("realworld")
  
  // Real-world simulation state
  const [selectedTask, setSelectedTask] = useState(REAL_WORLD_TASKS[0])
  const [rwIsRunning, setRwIsRunning] = useState(false)
  const [rwMonoProgress, setRwMonoProgress] = useState(0)
  const [rwPipeProgress, setRwPipeProgress] = useState(0)
  const [rwMonoFinished, setRwMonoFinished] = useState(false)
  const [rwPipeFinished, setRwPipeFinished] = useState(false)
  const [rwMonoFinalTime, setRwMonoFinalTime] = useState(0)
  const [rwPipeFinalTime, setRwPipeFinalTime] = useState(0)
  const [rwElapsedMs, setRwElapsedMs] = useState(0)
  const rwIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const rwElapsedRef = useRef(0) // Ref to track elapsed time for capture
  
  // Ball simulation state - spread positions initially
  const [ballSpeed, setBallSpeed] = useState(0.5)
  const [ballPipelineStages, setBallPipelineStages] = useState(5)
  const [ballIsRunning, setBallIsRunning] = useState(false)
  const [monoPosition, setMonoPosition] = useState(0)
  const [pipePositions, setPipePositions] = useState<number[]>([0, 20, 40, 60, 80])
  const [pipeCompleted, setPipeCompleted] = useState(0)
  const [monoCompleted, setMonoCompleted] = useState(0)
  const ballIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Throughput simulation state
  const [tpIsRunning, setTpIsRunning] = useState(false)
  const [tpCycle, setTpCycle] = useState(0)
  const [tpMonoQueue, setTpMonoQueue] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8])
  const [tpPipeQueue, setTpPipeQueue] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8])
  const [tpMonoCompleted, setTpMonoCompleted] = useState(0)
  const [tpPipeCompleted, setTpPipeCompleted] = useState(0)
  const [tpPipelineState, setTpPipelineState] = useState<(number | null)[]>([null, null, null, null, null])
  const [tpMonoProcessing, setTpMonoProcessing] = useState<number | null>(null)
  const [tpMonoCycleCount, setTpMonoCycleCount] = useState(0)
  const [tpFinished, setTpFinished] = useState(false)
  const [tpPipeFinishCycle, setTpPipeFinishCycle] = useState(0)
  const [tpMonoFinishCycle, setTpMonoFinishCycle] = useState(0)
  const tpIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Real-world stage tracking
  const [rwMonoStage, setRwMonoStage] = useState(0)
  const [rwPipeStages, setRwPipeStages] = useState([0, 0, 0, 0, 0])
  
  // Calculator state
  const [calcInstructions, setCalcInstructions] = useState(10)
  const [calcParallel, setCalcParallel] = useState(0.8)
  const [calcProcessors, setCalcProcessors] = useState(5)

  const MONO_CYCLE_TIME = 800
  const PIPE_CYCLE_TIME = 200

  // Refs to track progress internally so the interval never needs to recreate
  const rwMonoProgressRef = useRef(0)
  const rwPipeProgressRef = useRef(0)
  const rwPipeFinishedRef = useRef(false)
  const rwMonoFinishedRef = useRef(false)

  // Real-world simulation effect - uses per-task durations, never recreates mid-run
  useEffect(() => {
    if (!rwIsRunning || isPrintMode) return

    // Per-task durations from the selected task definition
    const monoDuration = selectedTask.monoDuration
    const pipeDuration = selectedTask.pipeDuration

    const stepTime = 40
    const pipeStep = (100 / pipeDuration) * stepTime
    const monoStep = (100 / monoDuration) * stepTime

    // Reset internal refs when starting fresh
    rwMonoProgressRef.current = 0
    rwPipeProgressRef.current = 0
    rwPipeFinishedRef.current = false
    rwMonoFinishedRef.current = false

    rwIntervalRef.current = setInterval(() => {
      rwElapsedRef.current += stepTime
      setRwElapsedMs(rwElapsedRef.current)

      // --- Pipeline progress ---
      if (!rwPipeFinishedRef.current) {
        const nextPipe = Math.min(100, rwPipeProgressRef.current + pipeStep)
        rwPipeProgressRef.current = nextPipe
        setRwPipeProgress(nextPipe)
        if (nextPipe >= 100) {
          rwPipeFinishedRef.current = true
          setRwPipeFinalTime(rwElapsedRef.current)
          setRwPipeFinished(true)
        }
      }

      // --- Mono progress ---
      if (!rwMonoFinishedRef.current) {
        const nextMono = Math.min(100, rwMonoProgressRef.current + monoStep)
        rwMonoProgressRef.current = nextMono
        setRwMonoProgress(nextMono)
        // Stage based on progress
        setRwMonoStage(Math.min(4, Math.floor(nextMono / 20)))
        if (nextMono >= 100) {
          rwMonoFinishedRef.current = true
          setRwMonoFinalTime(rwElapsedRef.current)
          setRwMonoFinished(true)
        }
      }

      // Stop interval once both done
      if (rwPipeFinishedRef.current && rwMonoFinishedRef.current) {
        if (rwIntervalRef.current) clearInterval(rwIntervalRef.current)
        setRwIsRunning(false)
      }
    }, stepTime)

    return () => { if (rwIntervalRef.current) clearInterval(rwIntervalRef.current) }
  // Only re-run when the user explicitly starts the simulation or changes task
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rwIsRunning, isPrintMode, selectedTask])

  // Stop when both complete
  useEffect(() => {
    if (rwMonoFinished && rwPipeFinished) {
      setRwIsRunning(false)
      if (rwIntervalRef.current) clearInterval(rwIntervalRef.current)
    }
  }, [rwMonoFinished, rwPipeFinished])

  // Ball simulation effect
  useEffect(() => {
    if (!ballIsRunning || isPrintMode) return
    
    const moveStep = 2 * ballSpeed
    
    ballIntervalRef.current = setInterval(() => {
      setMonoPosition(p => {
        if (p >= 100) { setMonoCompleted(c => c + 1); return 0 }
        return p + moveStep / ballPipelineStages
      })
      
      setPipePositions(positions => {
        const newPositions = [...positions]
        let completed = 0
        for (let i = newPositions.length - 1; i >= 0; i--) {
          newPositions[i] += moveStep
          if (newPositions[i] >= 100) { newPositions[i] = 0; completed++ }
        }
        if (completed > 0) setPipeCompleted(c => c + completed)
        return newPositions
      })
    }, 50)
    
    return () => { if (ballIntervalRef.current) clearInterval(ballIntervalRef.current) }
  }, [ballIsRunning, ballSpeed, ballPipelineStages, isPrintMode])

  // Throughput simulation effect - stops when both complete all tasks
  useEffect(() => {
    if (!tpIsRunning || isPrintMode || tpFinished) return
    
    tpIntervalRef.current = setInterval(() => {
      // Check if simulation should stop
      const monoAllDone = tpMonoCompleted >= 8 && tpMonoProcessing === null
      const pipeAllDone = tpPipeCompleted >= 8 && tpPipelineState.every(s => s === null)
      
      // Track when each completes
      if (tpPipeCompleted >= 8 && tpPipeFinishCycle === 0) {
        setTpPipeFinishCycle(tpCycle)
      }
      if (tpMonoCompleted >= 8 && tpMonoFinishCycle === 0) {
        setTpMonoFinishCycle(tpCycle)
      }
      
      if (monoAllDone && pipeAllDone) {
        setTpFinished(true)
        setTpIsRunning(false)
        return
      }
      
      setTpCycle(c => c + 1)
      
      // Monocycle: takes 5 cycles per instruction
      setTpMonoCycleCount(count => {
        const newCount = count + 1
        if (newCount >= 5) {
          if (tpMonoProcessing !== null) {
            setTpMonoCompleted(c => c + 1)
          }
          setTpMonoQueue(queue => {
            if (queue.length > 0) {
              setTpMonoProcessing(queue[0])
              return queue.slice(1)
            }
            setTpMonoProcessing(null)
            return queue
          })
          return 0
        }
        return newCount
      })
      
      // Pipeline: advances every cycle
      setTpPipelineState(state => {
        const newState = [...state]
        if (newState[4] !== null) setTpPipeCompleted(c => c + 1)
        for (let i = 4; i > 0; i--) newState[i] = newState[i - 1]
        setTpPipeQueue(queue => {
          if (queue.length > 0) { newState[0] = queue[0]; return queue.slice(1) }
          newState[0] = null
          return queue
        })
        return newState
      })
    }, 500)
    
    return () => { if (tpIntervalRef.current) clearInterval(tpIntervalRef.current) }
  }, [tpIsRunning, tpMonoProcessing, tpMonoCompleted, tpPipeCompleted, tpPipelineState, tpFinished, isPrintMode])

  // Start monocycle processing
  useEffect(() => {
    if (tpIsRunning && tpMonoProcessing === null && tpMonoQueue.length > 0) {
      setTpMonoProcessing(tpMonoQueue[0])
      setTpMonoQueue(q => q.slice(1))
    }
  }, [tpIsRunning, tpMonoProcessing, tpMonoQueue])

  const resetRealWorld = () => {
    if (rwIntervalRef.current) clearInterval(rwIntervalRef.current)
    setRwIsRunning(false)
    setRwMonoProgress(0)
    setRwPipeProgress(0)
    setRwMonoFinished(false)
    setRwPipeFinished(false)
    setRwMonoFinalTime(0)
    setRwPipeFinalTime(0)
    setRwElapsedMs(0)
    setRwMonoStage(0)
    setRwPipeStages([0, 0, 0, 0, 0])
    rwElapsedRef.current = 0
    rwMonoProgressRef.current = 0
    rwPipeProgressRef.current = 0
    rwPipeFinishedRef.current = false
    rwMonoFinishedRef.current = false
  }

  const resetBalls = () => {
    setBallIsRunning(false)
    setMonoPosition(0)
    // Spread balls evenly across the track initially
    const spread = 100 / ballPipelineStages
    setPipePositions(Array.from({ length: ballPipelineStages }, (_, i) => i * spread))
    setPipeCompleted(0)
    setMonoCompleted(0)
    if (ballIntervalRef.current) clearInterval(ballIntervalRef.current)
  }

  const resetThroughput = () => {
    setTpIsRunning(false)
    setTpCycle(0)
    setTpMonoQueue([1, 2, 3, 4, 5, 6, 7, 8])
    setTpPipeQueue([1, 2, 3, 4, 5, 6, 7, 8])
    setTpMonoCompleted(0)
    setTpPipeCompleted(0)
    setTpPipelineState([null, null, null, null, null])
    setTpMonoProcessing(null)
    setTpMonoCycleCount(0)
    setTpFinished(false)
    setTpPipeFinishCycle(0)
    setTpMonoFinishCycle(0)
    if (tpIntervalRef.current) clearInterval(tpIntervalRef.current)
  }

  const monoTotalTime = selectedTask.monoInstructions * MONO_CYCLE_TIME
  const pipeTotalCycles = selectedTask.pipeInstructions + 4
  const pipeTotalTime = pipeTotalCycles * PIPE_CYCLE_TIME
  const realWorldSpeedup = monoTotalTime / pipeTotalTime

  const calcMonoTime = calcInstructions * MONO_CYCLE_TIME
  const calcPipeCycles = calcInstructions + 4
  const calcPipeTime = calcPipeCycles * PIPE_CYCLE_TIME
  const calcSpeedup = calcMonoTime / calcPipeTime
  const amdahlSpeedup = 1 / ((1 - calcParallel) + (calcParallel / calcProcessors))

  const tabConfig = [
    { id: "realworld" as const, name: "Mundo Real", icon: Cpu },
    { id: "balls" as const, name: "Carreras", icon: Circle },
    { id: "throughput" as const, name: "Throughput", icon: Layers },
    { id: "calculator" as const, name: "Calculadora", icon: Settings2 },
  ]

  return (
    <div className="w-full h-full bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex flex-col p-5 relative overflow-hidden">
      <Presenter name="Frainer Encarnacion" />
      
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(13,148,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.08) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="mb-3 z-10">
        <div className="text-teal-600 font-mono text-xs tracking-widest uppercase mb-1 font-semibold">Seccion 04</div>
        <h2 className="text-2xl font-bold text-slate-800">Comparacion Directa: Monociclo vs Pipeline</h2>
        <div className="h-1 w-24 bg-teal-500 mt-1 rounded-full" />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-3 z-10">
        {tabConfig.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
              activeTab === tab.id ? "bg-teal-500 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}>
            <tab.icon className="w-4 h-4" />{tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0 z-10">
        {/* REAL WORLD TAB */}
        {activeTab === "realworld" && (
          <div className="h-full flex gap-3">
            {/* Task Selector */}
            <div className="w-48 bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-slate-800 font-bold text-sm mb-2">Tarea</h3>
              <div className="flex-1 flex flex-col gap-1.5 overflow-auto">
                {REAL_WORLD_TASKS.map(task => {
                  const TaskIcon = task.icon
                  return (
                    <button key={task.id} onClick={() => { setSelectedTask(task); resetRealWorld(); }}
                      className={`p-2 rounded-lg text-left transition-all ${selectedTask.id === task.id ? "bg-teal-100 border-2 border-teal-400" : "bg-slate-50 border border-slate-200 hover:border-teal-300"}`}>
                      <div className="flex items-center gap-2">
                        <TaskIcon className={`w-4 h-4 ${selectedTask.id === task.id ? "text-teal-600" : "text-slate-500"}`} />
                        <span className={`font-medium text-xs ${selectedTask.id === task.id ? "text-teal-700" : "text-slate-700"}`}>{task.name}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Main Simulation Area */}
            <div className="flex-1 bg-white rounded-xl p-4 border-2 border-teal-200 shadow-md flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-slate-800 font-bold text-base flex items-center gap-2">
                    <selectedTask.icon className="w-4 h-4 text-teal-600" />{selectedTask.name}
                    <span className="text-slate-400 text-xs font-normal">- {selectedTask.description}</span>
                  </h3>
                </div>
                <div className="flex gap-2">
                  {!rwIsRunning && !rwMonoFinished ? (
                    <button onClick={() => { resetRealWorld(); setTimeout(() => setRwIsRunning(true), 100); }}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center gap-1.5 text-sm">
                      <Play className="w-3.5 h-3.5" />Ejecutar
                    </button>
                  ) : rwIsRunning ? (
                    <button onClick={() => setRwIsRunning(false)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all flex items-center gap-1.5 text-sm">
                      <Pause className="w-3.5 h-3.5" />Pausar
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 font-semibold rounded-lg flex items-center gap-1.5 text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />Completado
                    </div>
                  )}
                  <button onClick={resetRealWorld} className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Side by side processors with DETAILED visual representation */}
              <div className="flex-1 grid grid-cols-2 gap-3">
                {/* Monocycle Side */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-2 border-2 border-orange-200 flex flex-col">
                  <h4 className="text-orange-600 font-bold text-xs mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />Monociclo
                    <span className="ml-auto bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded font-mono">
                      Etapa {rwMonoStage + 1}/5: {["Fetch", "Decode", "Execute", "Memory", "Write"][rwMonoStage]}
                    </span>
                    {rwMonoFinished && <span className="bg-orange-200 text-orange-700 text-[10px] px-1.5 py-0.5 rounded-full">Listo</span>}
                  </h4>
                  
                  {/* Detailed Visual Simulation */}
                  <div className="flex-1 flex flex-col gap-1 min-h-0">
                    <div className="flex-1 relative bg-white rounded-lg border border-orange-200 overflow-hidden">
                      {/* IMAGE COMPRESSION - Single view that transitions */}
                      {selectedTask.visualType === "image" && (
                        <div className="absolute inset-0 p-2 flex flex-col">
                          <div className="flex-1 relative rounded-lg overflow-hidden border-2 border-orange-200">
                            {/* Original image - visible before compression starts */}
                            <img 
                              src="/images/sample-landscape.jpg" 
                              alt="Original landscape"
                              className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                              style={{ 
                                filter: rwMonoProgress > 0 ? `blur(${Math.max(0, 8 - rwMonoProgress * 0.08)}px)` : 'none',
                                opacity: rwMonoProgress > 0 ? 0.3 + (rwMonoProgress * 0.007) : 1
                              }}
                            />
                            {/* Pixelation overlay during compression */}
                            {rwMonoProgress > 0 && rwMonoProgress < 100 && (
                              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0.5 p-1">
                                {[...Array(24)].map((_, i) => {
                                  const processed = i < Math.floor(rwMonoProgress * 0.24)
                                  return (
                                    <div key={i} className={`rounded transition-all duration-200 ${
                                      processed ? "bg-transparent" : "bg-slate-300/60"
                                    }`} />
                                  )
                                })}
                              </div>
                            )}
                            {/* Status label */}
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-sm font-bold ${
                              rwMonoProgress === 0 ? "bg-blue-500 text-white" :
                              rwMonoProgress >= 100 ? "bg-emerald-500 text-white" :
                              "bg-orange-500 text-white animate-pulse"
                            }`}>
                              {rwMonoProgress === 0 ? "ORIGINAL 4K" : 
                               rwMonoProgress >= 100 ? "COMPRIMIDO" : 
                               `Comprimiendo ${rwMonoProgress.toFixed(0)}%`}
                            </div>
                            {/* File size indicator */}
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-mono">
                              {rwMonoProgress === 0 ? "12.4 MB" : 
                               `${(12.4 - rwMonoProgress * 0.1).toFixed(1)} MB`}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* FILE COPY - Large visual with progress */}
                      {selectedTask.visualType === "file" && (
                        <div className="absolute inset-0 p-2 flex items-center justify-center gap-4">
                          {/* Source file */}
                          <div className="flex flex-col items-center">
                            <FileText className={`w-16 h-16 transition-all ${rwMonoProgress > 0 ? "text-slate-300" : "text-blue-500"}`} />
                            <span className="text-sm font-bold text-slate-700 mt-1">Origen</span>
                            <span className="text-xs text-slate-500">10 MB</span>
                          </div>
                          
                          {/* Transfer animation */}
                          <div className="flex-1 max-w-[120px] flex flex-col items-center gap-2">
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-500 transition-all rounded-full" 
                                style={{ width: `${rwMonoProgress}%` }} />
                            </div>
                            <div className="text-lg font-bold text-orange-600">
                              {rwMonoProgress.toFixed(0)}%
                            </div>
                            {rwIsRunning && (
                              <div className="flex gap-1">
                                {[0,1,2].map(i => (
                                  <div key={i} className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" 
                                    style={{ animationDelay: `${i * 150}ms` }} />
                                ))}
                              </div>
                            )}
                            <span className="text-xs text-slate-500">
                              {(rwMonoProgress * 0.1).toFixed(1)} MB copiados
                            </span>
                          </div>
                          
                          {/* Destination file */}
                          <div className="flex flex-col items-center">
                            <FileText className={`w-16 h-16 transition-all ${
                              rwMonoProgress >= 100 ? "text-emerald-500" : 
                              rwMonoProgress > 0 ? "text-orange-400" : "text-slate-300"
                            }`} />
                            <span className="text-sm font-bold text-slate-700 mt-1">Destino</span>
                            <span className="text-xs text-slate-500">
                              {rwMonoProgress >= 100 ? "10 MB" : "---"}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* DATABASE QUERY - Large stage indicators */}
                      {selectedTask.visualType === "database" && (
                        <div className="absolute inset-0 p-2 flex flex-col gap-2">
                          {/* Current stage - BIG */}
                          <div className="flex-1 flex items-center justify-center">
                            <div className={`text-center transition-all ${rwIsRunning ? "animate-pulse" : ""}`}>
                              <Database className={`w-16 h-16 mx-auto mb-2 ${
                                rwMonoProgress >= 100 ? "text-emerald-500" : "text-orange-500"
                              }`} />
                              <div className="text-xl font-bold text-slate-800">
                                {["Analizando SQL", "Planificando", "Escaneando", "Filtrando", "Retornando"][rwMonoStage]}
                              </div>
                              <div className="text-sm text-slate-500 mt-1">
                                {rwMonoStage === 0 && "Parseando consulta..."}
                                {rwMonoStage === 1 && "Optimizando ruta..."}
                                {rwMonoStage === 2 && "Leyendo 1000 filas..."}
                                {rwMonoStage === 3 && "Aplicando WHERE..."}
                                {rwMonoStage === 4 && "10 resultados listos"}
                              </div>
                            </div>
                          </div>
                          {/* Stage progress bar */}
                          <div className="flex gap-1">
                            {["Parse", "Plan", "Scan", "Filter", "Return"].map((stage, i) => (
                              <div key={i} className={`flex-1 h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                                rwMonoStage === i ? "bg-orange-500 text-white scale-105" : 
                                rwMonoStage > i ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                              }`}>
                                {stage}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* EMAIL PROCESSING - Large counters */}
                      {selectedTask.visualType === "email" && (
                        <div className="absolute inset-0 p-2 flex flex-col">
                          {/* Main processing view */}
                          <div className="flex-1 flex items-center justify-center gap-6">
                            {/* Current email being processed */}
                            <div className={`flex flex-col items-center ${rwIsRunning ? "animate-pulse" : ""}`}>
                              <Mail className="w-14 h-14 text-orange-500" />
                              <span className="text-sm font-bold text-orange-600 mt-1">Procesando</span>
                              <span className="text-xs text-slate-500">1 email a la vez</span>
                            </div>
                            
                            {/* Results */}
                            <div className="flex gap-4">
                              <div className="bg-emerald-100 rounded-xl p-3 text-center min-w-[80px]">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                                <div className="text-2xl font-bold text-emerald-600 mt-1">
                                  {Math.floor(rwMonoProgress * 0.66)}
                                </div>
                                <div className="text-xs text-emerald-600">Legitimos</div>
                              </div>
                              <div className="bg-red-100 rounded-xl p-3 text-center min-w-[80px]">
                                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto" />
                                <div className="text-2xl font-bold text-red-600 mt-1">
                                  {Math.floor(rwMonoProgress * 0.34)}
                                </div>
                                <div className="text-xs text-red-600">Spam</div>
                              </div>
                            </div>
                          </div>
                          {/* Progress */}
                          <div className="text-center text-sm text-slate-600">
                            <span className="font-bold">{Math.floor(rwMonoProgress)}</span> de 100 correos procesados
                          </div>
                        </div>
                      )}
                      
                      {/* VIDEO RENDERING MONO - 1 frame at a time = low fps = blurry/blocky output */}
                      {selectedTask.visualType === "video" && (() => {
                        // Monociclo: renders 1 frame per full pipeline cycle → ~6 fps total
                        // Each frame must wait for all 5 stages to complete before starting next
                        const MONO_FPS = 6
                        const TOTAL_FRAMES = 30
                        const renderedFrames = Math.floor((rwMonoProgress / 100) * TOTAL_FRAMES)
                        // Quality simulation: pixelation & blur start heavy and reduce slowly
                        // because the encoder has to skip detail to keep up with slow throughput
                        const qualityRatio = rwMonoProgress / 100  // 0 → 1
                        const pixelBlockSize = Math.round(20 - qualityRatio * 14)   // 20px → 6px
                        const blurPx = parseFloat((3.5 - qualityRatio * 3.5).toFixed(1))  // 3.5 → 0
                        const saturation = 0.4 + qualityRatio * 0.6                  // washed out → vivid
                        return (
                          <div className="absolute inset-0 p-2 flex flex-col gap-1.5">
                            {/* Main preview — intentionally degraded */}
                            <div className="flex-1 relative rounded-lg overflow-hidden border-2 border-orange-400 bg-black">
                              <img
                                src="/images/video-frame.jpg"
                                alt="Video frame monociclo"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                  filter: `blur(${blurPx}px) saturate(${saturation}) brightness(0.85)`,
                                  imageRendering: pixelBlockSize > 10 ? "pixelated" : "auto",
                                  // Scale up then back to force pixel-grid effect
                                  transform: `scale(${1 + pixelBlockSize * 0.01})`,
                                  transformOrigin: "center",
                                  opacity: rwMonoProgress === 0 ? 0.2 : 1,
                                  transition: "filter 0.3s, transform 0.3s",
                                }}
                              />
                              {/* Horizontal scan-line artifact — heavy at start */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  backgroundImage: `repeating-linear-gradient(
                                    0deg,
                                    rgba(0,0,0,${Math.max(0, 0.5 - qualityRatio * 0.5)}) 0px,
                                    transparent ${Math.max(1, pixelBlockSize / 4)}px,
                                    transparent ${Math.max(2, pixelBlockSize / 2)}px
                                  )`,
                                }}
                              />
                              {/* Active rendering sweep line */}
                              {rwIsRunning && (
                                <div
                                  className="absolute left-0 right-0 h-0.5 bg-orange-400/80"
                                  style={{ top: `${(renderedFrames / TOTAL_FRAMES) * 100}%` }}
                                />
                              )}
                              {/* HUD top-left: fps + frame counter */}
                              <div className="absolute top-2 left-2 flex flex-col gap-1">
                                <div className="bg-black/75 text-orange-400 font-mono text-sm font-bold px-2 py-0.5 rounded">
                                  {MONO_FPS} fps — {renderedFrames}/{TOTAL_FRAMES} frames
                                </div>
                                <div className="bg-black/75 text-orange-300 font-mono text-xs px-2 py-0.5 rounded">
                                  Bloque: {pixelBlockSize}px  Blur: {blurPx}px
                                </div>
                              </div>
                              {/* HUD top-right: quality badge */}
                              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${
                                rwMonoProgress === 0   ? "bg-slate-700 text-slate-400" :
                                rwMonoProgress >= 100  ? "bg-orange-600 text-white"   :
                                                          "bg-red-600 text-white animate-pulse"
                              }`}>
                                {rwMonoProgress === 0 ? "EN ESPERA" :
                                 rwMonoProgress >= 100 ? "BAJA CALIDAD" : "RENDERIZANDO"}
                              </div>
                              {/* HUD bottom: quality warning */}
                              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                                <div className="bg-black/75 text-red-400 text-xs font-mono font-bold px-2 py-0.5 rounded">
                                  CALIDAD BAJA — 1 frame/ciclo
                                </div>
                                <div className="bg-black/75 text-slate-300 text-xs font-mono px-2 py-0.5 rounded">
                                  {Math.round(qualityRatio * 100)}% calidad
                                </div>
                              </div>
                            </div>
                            {/* Frame strip — shows which frames are done */}
                            <div className="flex gap-0.5 h-7">
                              {[...Array(TOTAL_FRAMES)].map((_, i) => {
                                const done   = i < renderedFrames
                                const active = i === renderedFrames && rwIsRunning
                                return (
                                  <div
                                    key={i}
                                    className={`flex-1 rounded-sm border transition-all ${
                                      active ? "border-orange-500 bg-orange-400" :
                                      done   ? "border-orange-300 bg-orange-200" :
                                               "border-slate-200 bg-slate-100"
                                    }`}
                                  />
                                )
                              })}
                            </div>
                            {/* Stage bar */}
                            <div className="flex gap-1">
                              {["Decode", "Transf.", "Encode", "Buffer", "Write"].map((s, i) => (
                                <div key={i} className={`flex-1 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                                  rwMonoStage === i ? "bg-orange-500 text-white" :
                                  rwMonoStage > i   ? "bg-emerald-500 text-white" :
                                                       "bg-slate-200 text-slate-500"
                                }`}>{s}</div>
                              ))}
                            </div>
                          </div>
                        )
                      })()}
                      
                      {/* ZIP ARCHIVE - Large progress view */}
                      {selectedTask.visualType === "archive" && (
                        <div className="absolute inset-0 p-2 flex items-center justify-center gap-6">
                          {/* Files being compressed */}
                          <div className="flex flex-col items-center">
                            <div className="grid grid-cols-3 gap-1">
                              {[...Array(9)].map((_, i) => {
                                const isCompressed = i < Math.floor(rwMonoProgress / 11)
                                return (
                                  <FileText key={i} className={`w-6 h-6 transition-all ${
                                    isCompressed ? "text-slate-300 scale-75" : "text-blue-500"
                                  }`} />
                                )
                              })}
                            </div>
                            <span className="text-sm font-bold text-slate-700 mt-2">
                              {50 - Math.floor(rwMonoProgress / 2)} archivos
                            </span>
                          </div>
                          
                          {/* Arrow */}
                          <div className="text-3xl text-orange-500">{"->"}</div>
                          
                          {/* ZIP result */}
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <Archive className={`w-16 h-16 ${
                                rwMonoProgress >= 100 ? "text-emerald-500" : "text-orange-500"
                              }`} />
                              {rwIsRunning && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-bold text-slate-700 mt-2">archivo.zip</span>
                            <span className="text-lg font-bold text-orange-600">
                              {Math.floor(rwMonoProgress / 2)}/50
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress bar with stage indicator */}
                  <div className="relative h-6 bg-orange-100 rounded-lg overflow-hidden mt-1">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-75"
                      style={{ width: `${rwMonoProgress}%` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold" style={{ color: rwMonoProgress > 50 ? "white" : "#ea580c" }}>{rwMonoProgress.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline Side */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-2 border-2 border-purple-200 flex flex-col">
                  <h4 className="text-purple-600 font-bold text-xs mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />Pipeline (5 etapas paralelas)
                    <span className="ml-auto bg-purple-100 text-purple-600 text-[10px] px-1.5 py-0.5 rounded font-mono">
                      {rwPipeStages.filter(s => s > 0).length} activas
                    </span>
                    {rwPipeFinished && <span className="bg-purple-200 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full">Listo</span>}
                  </h4>
                  
                  {/* Detailed Visual Simulation - Pipeline processes multiple stages simultaneously */}
                  <div className="flex-1 flex flex-col gap-1 min-h-0">
                    <div className="flex-1 relative bg-white rounded-lg border border-purple-200 overflow-hidden">
                      {/* IMAGE COMPRESSION - Pipeline: faster with parallel processing */}
                      {selectedTask.visualType === "image" && (
                        <div className="absolute inset-0 p-2 flex flex-col">
                          <div className="flex-1 relative rounded-lg overflow-hidden border-2 border-purple-200">
                            <img 
                              src="/images/sample-landscape.jpg" 
                              alt="Landscape being compressed"
                              className="absolute inset-0 w-full h-full object-cover transition-all duration-150"
                              style={{ 
                                filter: rwPipeProgress > 0 ? `blur(${Math.max(0, 8 - rwPipeProgress * 0.08)}px)` : 'none',
                                opacity: rwPipeProgress > 0 ? 0.3 + (rwPipeProgress * 0.007) : 1
                              }}
                            />
                            {/* Multiple parallel compression blocks */}
                            {rwPipeProgress > 0 && rwPipeProgress < 100 && (
                              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0.5 p-1">
                                {[...Array(24)].map((_, i) => {
                                  const processed = i < Math.floor(rwPipeProgress * 0.24)
                                  return (
                                    <div key={i} className={`rounded transition-all duration-100 ${
                                      processed ? "bg-transparent" : "bg-slate-300/60"
                                    }`} />
                                  )
                                })}
                              </div>
                            )}
                            {/* Status - shows parallel processing */}
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-sm font-bold ${
                              rwPipeProgress === 0 ? "bg-blue-500 text-white" :
                              rwPipeProgress >= 100 ? "bg-emerald-500 text-white" :
                              "bg-purple-500 text-white animate-pulse"
                            }`}>
                              {rwPipeProgress === 0 ? "ORIGINAL 4K" : 
                               rwPipeProgress >= 100 ? "COMPRIMIDO" : 
                               `5 bloques paralelos ${rwPipeProgress.toFixed(0)}%`}
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-mono">
                              {rwPipeProgress === 0 ? "12.4 MB" : 
                               `${(12.4 - rwPipeProgress * 0.1).toFixed(1)} MB`}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* FILE COPY - Pipeline: 5 parallel transfers */}
                      {selectedTask.visualType === "file" && (
                        <div className="absolute inset-0 p-2 flex items-center justify-center gap-3">
                          <div className="flex flex-col items-center">
                            <FileText className={`w-14 h-14 transition-all ${rwPipeProgress > 0 ? "text-slate-300" : "text-blue-500"}`} />
                            <span className="text-sm font-bold text-slate-700 mt-1">Origen</span>
                          </div>
                          
                          {/* 5 parallel transfers */}
                          <div className="flex-1 max-w-[140px] flex flex-col items-center gap-1">
                            <div className="text-xs font-bold text-purple-600">5 Canales Paralelos</div>
                            <div className="w-full space-y-1">
                              {[0,1,2,3,4].map(i => (
                                <div key={i} className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                  <div className={`h-full bg-purple-500 transition-all rounded-full ${rwIsRunning ? "animate-pulse" : ""}`}
                                    style={{ width: `${Math.min(100, rwPipeProgress + i * 5)}%`, animationDelay: `${i * 100}ms` }} />
                                </div>
                              ))}
                            </div>
                            <div className="text-lg font-bold text-purple-600">{rwPipeProgress.toFixed(0)}%</div>
                            <span className="text-xs text-slate-500">{(rwPipeProgress * 0.1).toFixed(1)} MB</span>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <FileText className={`w-14 h-14 transition-all ${
                              rwPipeProgress >= 100 ? "text-emerald-500" : 
                              rwPipeProgress > 0 ? "text-purple-400" : "text-slate-300"
                            }`} />
                            <span className="text-sm font-bold text-slate-700 mt-1">Destino</span>
                          </div>
                        </div>
                      )}
                      
                      {/* DATABASE QUERY - All 5 stages active */}
                      {selectedTask.visualType === "database" && (
                        <div className="absolute inset-0 p-2 flex flex-col gap-2">
                          <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                              <Database className={`w-14 h-14 mx-auto mb-1 ${
                                rwPipeProgress >= 100 ? "text-emerald-500" : "text-purple-500"
                              }`} />
                              <div className="text-lg font-bold text-slate-800">
                                5 Etapas Simultaneas
                              </div>
                              <div className="text-sm text-purple-600">
                                Todas las etapas trabajan en paralelo
                              </div>
                            </div>
                          </div>
                          {/* All stages active simultaneously */}
                          <div className="flex gap-1">
                            {["Parse", "Plan", "Scan", "Filter", "Return"].map((stage, i) => {
                              const stageProgress = Math.max(0, Math.min(100, rwPipeProgress + (4 - i) * 20))
                              const isActive = stageProgress > 0 && stageProgress < 100
                              const isDone = stageProgress >= 100
                              return (
                                <div key={i} className={`flex-1 h-10 rounded flex flex-col items-center justify-center text-xs font-bold transition-all ${
                                  isActive ? "bg-purple-500 text-white animate-pulse" : 
                                  isDone ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                                }`}>
                                  <span>{stage}</span>
                                  {isActive && <div className="w-3/4 h-1 bg-white/30 rounded mt-0.5"><div className="h-full bg-white rounded" style={{ width: `${stageProgress}%` }} /></div>}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* EMAIL PROCESSING - 5 emails at once */}
                      {selectedTask.visualType === "email" && (
                        <div className="absolute inset-0 p-2 flex flex-col">
                          <div className="flex-1 flex items-center justify-center gap-4">
                            {/* 5 emails processing simultaneously */}
                            <div className="flex flex-col items-center">
                              <div className="flex gap-1">
                                {[0,1,2,3,4].map(i => (
                                  <Mail key={i} className={`w-8 h-8 ${rwIsRunning ? "text-purple-500 animate-pulse" : "text-purple-400"}`} 
                                    style={{ animationDelay: `${i * 100}ms` }} />
                                ))}
                              </div>
                              <span className="text-sm font-bold text-purple-600 mt-1">5 en paralelo</span>
                            </div>
                            
                            <div className="flex gap-3">
                              <div className="bg-emerald-100 rounded-xl p-2 text-center min-w-[70px]">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                                <div className="text-xl font-bold text-emerald-600">{Math.floor(rwPipeProgress * 0.66)}</div>
                                <div className="text-xs text-emerald-600">OK</div>
                              </div>
                              <div className="bg-red-100 rounded-xl p-2 text-center min-w-[70px]">
                                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto" />
                                <div className="text-xl font-bold text-red-600">{Math.floor(rwPipeProgress * 0.34)}</div>
                                <div className="text-xs text-red-600">Spam</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center text-sm text-slate-600">
                            <span className="font-bold">{Math.floor(rwPipeProgress)}</span>/100 procesados
                          </div>
                        </div>
                      )}
                      
                      {/* VIDEO RENDERING PIPELINE - 5 stages in parallel = ~5x fps = crisp output */}
                      {selectedTask.visualType === "video" && (() => {
                        // Pipeline: 5 frames in different stages simultaneously → ~30 fps
                        const PIPE_FPS = 30
                        const TOTAL_FRAMES = 30
                        const renderedFrames = Math.floor((rwPipeProgress / 100) * TOTAL_FRAMES)
                        // Quality simulation: pipeline finishes fast → full detail from the start
                        const qualityRatio = Math.min(1, rwPipeProgress / 30)  // reaches full quality quickly
                        const blurPx = parseFloat((1.2 - qualityRatio * 1.2).toFixed(1))
                        const saturation = 0.7 + qualityRatio * 0.3
                        // Which frames are in which pipeline stage right now
                        const activeFrameBase = Math.max(0, renderedFrames - 4)
                        return (
                          <div className="absolute inset-0 p-2 flex flex-col gap-1.5">
                            {/* Main preview — high quality, sharp from early on */}
                            <div className="flex-1 relative rounded-lg overflow-hidden border-2 border-purple-400 bg-black">
                              <img
                                src="/images/video-frame.jpg"
                                alt="Video frame pipeline"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                  filter: `blur(${blurPx}px) saturate(${saturation}) brightness(0.97)`,
                                  imageRendering: "auto",
                                  opacity: rwPipeProgress === 0 ? 0.2 : 1,
                                  transition: "filter 0.15s",
                                }}
                              />
                              {/* 5 parallel rendering strips — show all stages active at once */}
                              {rwIsRunning && (
                                <div className="absolute inset-0 flex flex-col">
                                  {[0,1,2,3,4].map(i => {
                                    const stripTop = ((activeFrameBase + i) / TOTAL_FRAMES) * 100
                                    return (
                                      <div
                                        key={i}
                                        className="absolute left-0 right-0 h-px"
                                        style={{
                                          top: `${Math.min(98, stripTop)}%`,
                                          backgroundColor: ["#a855f7","#8b5cf6","#7c3aed","#6d28d9","#5b21b6"][i],
                                          opacity: 0.8,
                                          boxShadow: `0 0 4px ${["#a855f7","#8b5cf6","#7c3aed","#6d28d9","#5b21b6"][i]}`,
                                        }}
                                      />
                                    )
                                  })}
                                </div>
                              )}
                              {/* HUD top-left: fps + frame counter */}
                              <div className="absolute top-2 left-2 flex flex-col gap-1">
                                <div className="bg-black/75 text-purple-300 font-mono text-sm font-bold px-2 py-0.5 rounded">
                                  {PIPE_FPS} fps — {renderedFrames}/{TOTAL_FRAMES} frames
                                </div>
                                <div className="bg-black/75 text-purple-200 font-mono text-xs px-2 py-0.5 rounded">
                                  5 etapas en paralelo
                                </div>
                              </div>
                              {/* HUD top-right: quality badge */}
                              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${
                                rwPipeProgress === 0   ? "bg-slate-700 text-slate-400" :
                                rwPipeProgress >= 100  ? "bg-emerald-600 text-white"  :
                                                          "bg-purple-600 text-white animate-pulse"
                              }`}>
                                {rwPipeProgress === 0 ? "EN ESPERA" :
                                 rwPipeProgress >= 100 ? "ALTA CALIDAD" : "RENDERIZANDO"}
                              </div>
                              {/* HUD bottom: quality badge */}
                              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                                <div className="bg-black/75 text-emerald-400 text-xs font-mono font-bold px-2 py-0.5 rounded">
                                  ALTA CALIDAD — 5 frames/ciclo
                                </div>
                                <div className="bg-black/75 text-slate-300 text-xs font-mono px-2 py-0.5 rounded">
                                  {Math.min(100, Math.round(qualityRatio * 100))}% calidad
                                </div>
                              </div>
                            </div>
                            {/* Frame strip — 5 frames highlighted as "in flight" simultaneously */}
                            <div className="flex gap-0.5 h-7">
                              {[...Array(TOTAL_FRAMES)].map((_, i) => {
                                const done      = i < activeFrameBase
                                const inFlight  = i >= activeFrameBase && i < activeFrameBase + 5 && rwIsRunning
                                const stageIdx  = i - activeFrameBase
                                const stageColors = ["bg-purple-500","bg-purple-400","bg-purple-300","bg-purple-200","bg-purple-100"]
                                return (
                                  <div
                                    key={i}
                                    className={`flex-1 rounded-sm border transition-all ${
                                      inFlight ? `border-purple-500 ${stageColors[stageIdx] ?? "bg-purple-100"}` :
                                      done     ? "border-emerald-400 bg-emerald-200" :
                                                 "border-slate-200 bg-slate-100"
                                    }`}
                                  />
                                )
                              })}
                            </div>
                            {/* 5 stage bars — all active simultaneously */}
                            <div className="flex gap-1">
                              {["Decode", "Transf.", "Encode", "Buffer", "Write"].map((s, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 h-6 rounded flex flex-col items-center justify-center text-[10px] font-bold transition-all ${
                                    rwIsRunning ? "bg-purple-500 text-white animate-pulse" :
                                    rwPipeProgress >= 100 ? "bg-emerald-500 text-white" :
                                    "bg-slate-200 text-slate-500"
                                  }`}
                                  style={{ animationDelay: `${i * 80}ms` }}
                                >
                                  {s}
                                  {rwIsRunning && (
                                    <span className="text-purple-200 text-[8px]">F{Math.max(1, activeFrameBase + i + 1)}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })()}
                      
                      {/* ZIP ARCHIVE - 5 files at once */}
                      {selectedTask.visualType === "archive" && (
                        <div className="absolute inset-0 p-2 flex items-center justify-center gap-4">
                          {/* 5 files compressing */}
                          <div className="flex flex-col items-center">
                            <div className="flex gap-1">
                              {[0,1,2,3,4].map(i => (
                                <FileText key={i} className={`w-7 h-7 ${
                                  rwIsRunning ? "text-purple-500 animate-pulse" : "text-slate-400"
                                }`} style={{ animationDelay: `${i * 80}ms` }} />
                              ))}
                            </div>
                            <span className="text-sm font-bold text-slate-700 mt-1">
                              {50 - Math.floor(rwPipeProgress / 2)} restantes
                            </span>
                          </div>
                          
                          <div className="text-2xl text-purple-500">{"->"}</div>
                          
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <Archive className={`w-14 h-14 ${rwPipeProgress >= 100 ? "text-emerald-500" : "text-purple-500"}`} />
                              {rwIsRunning && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                              )}
                            </div>
                            <span className="text-lg font-bold text-purple-600">{Math.floor(rwPipeProgress / 2)}/50</span>
                            <span className="text-xs text-purple-500">5 archivos/ciclo</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress bar with stage indicator */}
                  <div className="relative h-6 bg-purple-100 rounded-lg overflow-hidden mt-1">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-75"
                      style={{ width: `${rwPipeProgress}%` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold" style={{ color: rwPipeProgress > 50 ? "white" : "#9333ea" }}>{rwPipeProgress.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results - LIVE stats during simulation, final stats when done */}
              <div className={`mt-3 rounded-xl p-3 shadow-lg transition-all ${
                rwMonoFinished && rwPipeFinished ? "bg-gradient-to-r from-teal-500 to-emerald-500" : 
                rwIsRunning ? "bg-gradient-to-r from-slate-600 to-slate-700" : "bg-slate-200"
              }`}>
                <div className="flex items-center justify-between">
                  {rwMonoFinished && rwPipeFinished ? (
                    <>
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-teal-100 text-xs mb-0.5">Tiempo Monociclo</div>
                          <div className="font-mono text-white text-base font-bold">{(rwMonoFinalTime / 1000).toFixed(2)}s</div>
                        </div>
                        <div>
                          <div className="text-teal-100 text-xs mb-0.5">Tiempo Pipeline</div>
                          <div className="font-mono text-white text-base font-bold">{(rwPipeFinalTime / 1000).toFixed(2)}s</div>
                        </div>
                        <div>
                          <div className="text-teal-100 text-xs mb-0.5">Ahorro</div>
                          <div className="font-mono text-white text-base font-bold">{((rwMonoFinalTime - rwPipeFinalTime) / 1000).toFixed(2)}s ({(((rwMonoFinalTime - rwPipeFinalTime) / rwMonoFinalTime) * 100).toFixed(0)}%)</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-teal-100 text-xs mb-0.5">Speedup Real</div>
                        <div className="text-4xl font-bold text-white">{(rwMonoFinalTime / rwPipeFinalTime).toFixed(2)}x</div>
                      </div>
                    </>
                  ) : rwIsRunning || rwPipeFinished || rwMonoFinished ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-slate-300 text-xs mb-0.5">Tiempo Transcurrido</div>
                          <div className="font-mono text-white text-lg font-bold">{(rwElapsedMs / 1000).toFixed(2)}s</div>
                        </div>
                        <div className={`px-3 py-1 rounded ${rwMonoFinished ? "bg-emerald-500" : "bg-orange-500 animate-pulse"}`}>
                          <div className="text-white/80 text-xs">Monociclo</div>
                          <div className="font-mono text-white font-bold">
                            {rwMonoFinished ? `${(rwMonoFinalTime / 1000).toFixed(2)}s` : `${rwMonoProgress.toFixed(0)}%`}
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded ${rwPipeFinished ? "bg-emerald-500" : "bg-purple-500 animate-pulse"}`}>
                          <div className="text-white/80 text-xs">Pipeline</div>
                          <div className="font-mono text-white font-bold">
                            {rwPipeFinished ? `${(rwPipeFinalTime / 1000).toFixed(2)}s` : `${rwPipeProgress.toFixed(0)}%`}
                          </div>
                        </div>
                        {rwPipeFinished && !rwMonoFinished && (
                          <div className="bg-purple-600 px-3 py-1 rounded">
                            <div className="text-purple-200 text-xs">Pipeline termino</div>
                            <div className="font-mono text-white font-bold">{((rwElapsedMs - rwPipeFinalTime) / 1000).toFixed(2)}s antes</div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
  <div className="text-slate-300 text-xs mb-0.5">Speedup en Vivo</div>
  <div className="text-3xl font-bold text-white">
  {(selectedTask.monoDuration / selectedTask.pipeDuration).toFixed(2)}x
  </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full py-2">
                      <span className="text-slate-500 text-sm font-medium">Ejecuta la simulacion para ver los resultados en tiempo real...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BALL RACE TAB */}
        {activeTab === "balls" && (
          <div className="h-full bg-white rounded-xl p-4 border-2 border-teal-200 shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 text-sm font-medium">Velocidad:</span>
                  <input type="range" min="0.5" max="3" step="0.1" value={ballSpeed} onChange={(e) => setBallSpeed(Number(e.target.value))}
                    className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  <span className="font-mono text-teal-600 font-bold text-sm w-8">{ballSpeed.toFixed(1)}x</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 text-sm font-medium">Etapas:</span>
                  <input type="range" min="3" max="7" step="1" value={ballPipelineStages} onChange={(e) => { setBallPipelineStages(Number(e.target.value)); resetBalls(); }}
                    className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                  <span className="font-mono text-purple-600 font-bold text-sm">{ballPipelineStages}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {!ballIsRunning ? (
                  <button onClick={() => setBallIsRunning(true)}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center gap-1.5 text-sm">
                    <Play className="w-3.5 h-3.5" />Iniciar
                  </button>
                ) : (
                  <button onClick={() => setBallIsRunning(false)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all flex items-center gap-1.5 text-sm">
                    <Pause className="w-3.5 h-3.5" />Pausar
                  </button>
                )}
                <button onClick={resetBalls} className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-center">
              {/* Monocycle Track */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-600 font-bold text-sm">Monociclo</span>
                    <span className="text-slate-400 text-xs">(procesa 1 instruccion completa antes de la siguiente)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-100 rounded-lg px-3 py-1">
                    <span className="text-orange-600 text-xs">Completadas:</span>
                    <span className="font-mono text-xl font-bold text-orange-600">{monoCompleted}</span>
                  </div>
                </div>
                <div className="relative h-14 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-2 border-orange-200 overflow-hidden">
                  <div className="absolute inset-0 flex">{[...Array(10)].map((_, i) => <div key={i} className="flex-1 border-r border-orange-200/50" />)}</div>
                  <div className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-lg flex items-center justify-center transition-all duration-75"
                    style={{ left: `calc(${Math.max(5, Math.min(95, monoPosition))}% - 22px)` }}>
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-600 via-emerald-400 to-emerald-600" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-700 text-xs font-bold">META</div>
                </div>
              </div>

              {/* Pipeline Track */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="text-purple-600 font-bold text-sm">Pipeline ({ballPipelineStages} etapas)</span>
                    <span className="text-slate-400 text-xs">({ballPipelineStages} instrucciones en diferentes fases)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-100 rounded-lg px-3 py-1">
                    <span className="text-purple-600 text-xs">Completadas:</span>
                    <span className="font-mono text-xl font-bold text-purple-600">{pipeCompleted}</span>
                  </div>
                </div>
                <div className="relative h-14 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-200 overflow-hidden">
                  <div className="absolute inset-0 flex">{[...Array(10)].map((_, i) => <div key={i} className="flex-1 border-r border-purple-200/50" />)}</div>
                  {pipePositions.slice(0, ballPipelineStages).map((pos, i) => {
                    const stageNames = ["IF", "ID", "EX", "MEM", "WB", "S6", "S7"]
                    const stageColors = ["#7c3aed", "#db2777", "#ea580c", "#16a34a", "#0d9488", "#3b82f6", "#6366f1"]
                    return (
                      <div key={i} className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-all duration-75 border-2 border-white"
                        style={{ left: `calc(${Math.max(5, Math.min(95, pos))}% - 18px)`, backgroundColor: stageColors[i % stageColors.length] }}>
                        <span className="text-white font-bold text-xs">{stageNames[i]}</span>
                      </div>
                    )
                  })}
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-600 via-emerald-400 to-emerald-600" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-700 text-xs font-bold">META</div>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <p className="text-slate-600 text-sm">
                  <strong className="text-teal-600">Explicacion:</strong> El monociclo debe completar toda la instruccion antes de empezar otra. 
                  El pipeline tiene {ballPipelineStages} instrucciones moviendose simultaneamente en diferentes etapas, 
                  por eso termina aproximadamente <strong className="text-purple-600">{ballPipelineStages}x</strong> mas rapido.
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-2 border border-teal-200 text-center">
                <div className="text-teal-600 text-xs mb-0.5 font-medium">Ventaja Pipeline</div>
                <div className="font-mono text-2xl font-bold text-teal-600">{monoCompleted > 0 ? ((pipeCompleted / monoCompleted)).toFixed(1) : ballPipelineStages.toFixed(1)}x</div>
                <div className="text-teal-500 text-[10px]">mas rapido</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-2 border border-orange-200 text-center">
                <div className="text-orange-600 text-xs mb-0.5 font-medium">Monociclo</div>
                <div className="font-mono text-2xl font-bold text-orange-600">{monoCompleted}</div>
                <div className="text-orange-400 text-[10px]">completadas</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-2 border border-purple-200 text-center">
                <div className="text-purple-600 text-xs mb-0.5 font-medium">Pipeline</div>
                <div className="font-mono text-2xl font-bold text-purple-600">{pipeCompleted}</div>
                <div className="text-purple-400 text-[10px]">completadas</div>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-2 border border-slate-200 text-center">
                <div className="text-slate-600 text-xs mb-0.5 font-medium">Diferencia</div>
                <div className="font-mono text-2xl font-bold text-emerald-600">+{pipeCompleted - monoCompleted}</div>
                <div className="text-slate-400 text-[10px]">a favor de pipeline</div>
              </div>
            </div>
          </div>
        )}

        {/* THROUGHPUT TAB */}
        {activeTab === "throughput" && (
          <div className="h-full bg-white rounded-xl p-4 border-2 border-teal-200 shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-slate-800 font-bold text-base">Simulacion de Throughput: Apps del Telefono</h3>
                <p className="text-slate-500 text-xs">Imagina que cada app necesita cargarse. El pipeline carga varias a la vez.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5">
                  <span className="text-slate-500 text-xs">Ciclo:</span>
                  <span className="font-mono text-lg font-bold text-slate-800">{tpCycle}</span>
                </div>
                <div className="flex gap-2">
                  {!tpIsRunning && !tpFinished ? (
                    <button onClick={() => setTpIsRunning(true)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center gap-1.5 text-sm">
                      <Play className="w-3.5 h-3.5" />Simular
                    </button>
                  ) : tpIsRunning ? (
                    <button onClick={() => setTpIsRunning(false)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all flex items-center gap-1.5 text-sm">
                      <Pause className="w-3.5 h-3.5" />Pausar
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 font-semibold rounded-lg flex items-center gap-1.5 text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />Listo
                    </div>
                  )}
                  <button onClick={resetThroughput} className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              {/* Monocycle */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 border-2 border-orange-200 flex flex-col">
                <h4 className="text-orange-600 font-bold text-sm mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />Monociclo - Una app a la vez
                </h4>
                <div className="flex-1 flex flex-col">
                  {/* Waiting apps */}
                  <div className="mb-2">
                    <div className="text-slate-500 text-xs mb-1.5">Apps esperando:</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {tpMonoQueue.map(id => {
                        const task = THROUGHPUT_TASKS.find(t => t.id === id)!
                        const TaskIcon = task.icon
                        return (
                          <div key={id} className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: task.color + "20" }}>
                            <TaskIcon className="w-4 h-4" style={{ color: task.color }} />
                          </div>
                        )
                      })}
                      {tpMonoQueue.length === 0 && <span className="text-slate-400 text-xs italic">Cola vacia</span>}
                    </div>
                  </div>
                  
                  {/* Processing */}
                  <div className="bg-white rounded-lg p-3 border border-orange-200 flex-1 flex flex-col justify-center">
                    <div className="text-slate-500 text-xs mb-2">Cargando ahora:</div>
                    <div className="flex items-center justify-center gap-3">
                      {tpMonoProcessing !== null ? (
                        <>
                          {(() => {
                            const task = THROUGHPUT_TASKS.find(t => t.id === tpMonoProcessing)!
                            const TaskIcon = task.icon
                            return (
                              <div className="flex flex-col items-center gap-1">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg animate-pulse" style={{ backgroundColor: task.color }}>
                                  <TaskIcon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xs font-medium" style={{ color: task.color }}>{task.name}</span>
                              </div>
                            )
                          })()}
                          <div className="flex flex-col items-center">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-2 h-6 rounded-sm transition-all ${i < tpMonoCycleCount + 1 ? "bg-orange-500" : "bg-orange-200"}`} />
                              ))}
                            </div>
                            <span className="text-orange-600 text-xs mt-1">{tpMonoCycleCount + 1}/5</span>
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400 text-sm">{tpFinished ? "Completado" : "Esperando..."}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Completed */}
                  <div className="mt-2 bg-orange-100 rounded-lg p-2">
                    <div className="text-orange-600 text-xs mb-1">Apps cargadas:</div>
                    <div className="flex gap-1.5 flex-wrap min-h-[32px]">
                      {[...Array(tpMonoCompleted)].map((_, i) => {
                        const task = THROUGHPUT_TASKS[i]
                        const TaskIcon = task.icon
                        return (
                          <div key={i} className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: task.color }}>
                            <TaskIcon className="w-3.5 h-3.5 text-white" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pipeline */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border-2 border-purple-200 flex flex-col">
                <h4 className="text-purple-600 font-bold text-sm mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />Pipeline - 5 apps simultaneas
                </h4>
                <div className="flex-1 flex flex-col">
                  {/* Waiting apps */}
                  <div className="mb-2">
                    <div className="text-slate-500 text-xs mb-1.5">Apps esperando:</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {tpPipeQueue.map(id => {
                        const task = THROUGHPUT_TASKS.find(t => t.id === id)!
                        const TaskIcon = task.icon
                        return (
                          <div key={id} className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: task.color + "20" }}>
                            <TaskIcon className="w-4 h-4" style={{ color: task.color }} />
                          </div>
                        )
                      })}
                      {tpPipeQueue.length === 0 && <span className="text-slate-400 text-xs italic">Cola vacia</span>}
                    </div>
                  </div>
                  
                  {/* Pipeline stages */}
                  <div className="bg-white rounded-lg p-3 border border-purple-200 flex-1">
                    <div className="text-slate-500 text-xs mb-2">Pipeline (5 etapas en paralelo):</div>
                    <div className="flex gap-1.5 justify-between">
                      {["Fetch", "Decode", "Exec", "Mem", "Write"].map((stage, idx) => {
                        const stageColors = ["#0d9488", "#7c3aed", "#db2777", "#ea580c", "#16a34a"]
                        const taskId = tpPipelineState[idx]
                        const task = taskId ? THROUGHPUT_TASKS.find(t => t.id === taskId) : null
                        return (
                          <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full h-6 rounded flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: stageColors[idx] }}>{stage}</div>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${task ? "shadow-md scale-105" : "bg-slate-100"}`}
                              style={task ? { backgroundColor: task.color } : {}}>
                              {task ? <task.icon className="w-4 h-4 text-white" /> : <span className="text-slate-300 text-xs">-</span>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Completed */}
                  <div className="mt-2 bg-purple-100 rounded-lg p-2">
                    <div className="text-purple-600 text-xs mb-1">Apps cargadas:</div>
                    <div className="flex gap-1.5 flex-wrap min-h-[32px]">
                      {[...Array(tpPipeCompleted)].map((_, i) => {
                        const task = THROUGHPUT_TASKS[i]
                        const TaskIcon = task.icon
                        return (
                          <div key={i} className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: task.color }}>
                            <TaskIcon className="w-3.5 h-3.5 text-white" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results - Enhanced with comparison table */}
            {tpFinished ? (
              <div className="mt-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-3 shadow-lg">
                <div className="grid grid-cols-3 gap-3">
                  {/* Monocycle Results */}
                  <div className="bg-white/20 rounded-lg p-2 text-center">
                    <div className="text-white/70 text-xs mb-0.5 flex items-center justify-center gap-1"><Clock className="w-3 h-3" />Monociclo</div>
                    <div className="text-white font-bold text-xl">{tpMonoFinishCycle || 40} ciclos</div>
                    <div className="text-white/60 text-xs">8 apps en 40 ciclos</div>
                    <div className="text-orange-200 font-mono text-sm mt-1">Throughput: {(8 / (tpMonoFinishCycle || 40)).toFixed(2)} apps/ciclo</div>
                  </div>
                  {/* Pipeline Results */}
                  <div className="bg-white/20 rounded-lg p-2 text-center">
                    <div className="text-white/70 text-xs mb-0.5 flex items-center justify-center gap-1"><Zap className="w-3 h-3" />Pipeline</div>
                    <div className="text-white font-bold text-xl">{tpPipeFinishCycle || 12} ciclos</div>
                    <div className="text-white/60 text-xs">8 apps en ~12 ciclos</div>
                    <div className="text-purple-200 font-mono text-sm mt-1">Throughput: {(8 / (tpPipeFinishCycle || 12)).toFixed(2)} apps/ciclo</div>
                  </div>
                  {/* Comparison */}
                  <div className="bg-white/30 rounded-lg p-2 text-center">
                    <div className="text-white/70 text-xs mb-0.5">Speedup Final</div>
                    <div className="text-white font-bold text-3xl">{((tpMonoFinishCycle || 40) / (tpPipeFinishCycle || 12)).toFixed(1)}x</div>
                    <div className="text-emerald-200 text-xs mt-1">Pipeline fue {((tpMonoFinishCycle || 40) / (tpPipeFinishCycle || 12)).toFixed(1)}x mas rapido</div>
                    <div className="text-white/60 text-xs">Ahorro: {(tpMonoFinishCycle || 40) - (tpPipeFinishCycle || 12)} ciclos</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-xl p-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-white/70 text-xs">Ciclo Actual</div>
                      <div className="font-mono text-white text-lg font-bold">{tpCycle}</div>
                    </div>
                    <div>
                      <div className="text-white/70 text-xs">Monociclo</div>
                      <div className="font-mono text-lg font-bold text-orange-200">{tpMonoCompleted}/8 apps</div>
                    </div>
                    <div>
                      <div className="text-white/70 text-xs">Pipeline</div>
                      <div className="font-mono text-lg font-bold text-purple-200">{tpPipeCompleted}/8 apps</div>
                    </div>
                    {tpPipeFinishCycle > 0 && (
                      <div className="bg-purple-500/30 rounded px-2 py-1">
                        <div className="text-white/70 text-xs">Pipeline termino en</div>
                        <div className="font-mono text-purple-200 font-bold">{tpPipeFinishCycle} ciclos</div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-white/70 text-xs">Ventaja Actual</div>
                    <div className="text-3xl font-bold text-white">
                      {tpPipeCompleted > tpMonoCompleted ? `${(tpPipeCompleted / Math.max(1, tpMonoCompleted)).toFixed(1)}x` : "-"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CALCULATOR TAB */}
        {activeTab === "calculator" && (
          <div className="h-full flex gap-4">
            <div className="flex-1 bg-white rounded-xl p-5 border-2 border-teal-200 shadow-md flex flex-col">
              <h3 className="text-slate-800 font-bold text-lg mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-teal-600" />Calculadora de Speedup</h3>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-600 text-sm font-medium">Numero de Instrucciones:</span>
                  <span className="text-teal-600 font-mono text-3xl font-bold">{calcInstructions}</span>
                </div>
                <input type="range" min="5" max="100" value={calcInstructions} onChange={(e) => setCalcInstructions(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200 flex flex-col">
                  <h4 className="text-orange-600 font-bold mb-3 flex items-center gap-2"><Clock className="w-5 h-5" /> Monociclo</h4>
                  <div className="space-y-2 flex-1 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Ciclos:</span><span className="font-mono font-bold">{calcInstructions}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">T/ciclo:</span><span className="font-mono font-bold">{MONO_CYCLE_TIME}ns</span></div>
                    <div className="h-px bg-orange-200 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-orange-700 font-semibold">Total:</span>
                      <span className="text-orange-600 font-mono text-xl font-bold">{(calcMonoTime/1000).toFixed(1)}us</span>
                    </div>
                  </div>
                  <div className="mt-3 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-white font-bold shadow-md">{calcMonoTime}ns</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200 flex flex-col">
                  <h4 className="text-purple-600 font-bold mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Pipeline</h4>
                  <div className="space-y-2 flex-1 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Ciclos:</span><span className="font-mono font-bold">{calcPipeCycles}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">T/ciclo:</span><span className="font-mono font-bold">{PIPE_CYCLE_TIME}ns</span></div>
                    <div className="h-px bg-purple-200 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-purple-700 font-semibold">Total:</span>
                      <span className="text-purple-600 font-mono text-xl font-bold">{(calcPipeTime/1000).toFixed(1)}us</span>
                    </div>
                  </div>
                  <div className="mt-3 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold shadow-md"
                    style={{ width: `${Math.max(30, (calcPipeTime / calcMonoTime) * 100)}%` }}>{calcPipeTime}ns</div>
                </div>
              </div>

              <div className="mt-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div><div className="text-teal-100 text-sm mb-1">Formula: Speedup = T_mono / T_pipe</div><div className="font-mono text-white text-lg">{calcMonoTime}ns / {calcPipeTime}ns</div></div>
                  <div className="text-right"><div className="text-teal-100 text-sm mb-1">Resultado:</div><div className="text-5xl font-bold text-white">{calcSpeedup.toFixed(2)}x</div></div>
                </div>
              </div>
            </div>

            <div className="w-80 bg-white rounded-xl p-5 border-2 border-teal-200 shadow-md flex flex-col">
              <h3 className="text-slate-800 text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-teal-600" /> Ley de Amdahl</h3>
              <div className="bg-teal-50 rounded-lg p-4 font-mono text-center mb-4 border border-teal-200"><div className="text-teal-700 font-bold text-lg">S(N) = 1 / ((1-P) + P/N)</div></div>
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex justify-between mb-2"><span className="text-slate-500 text-sm">P (Porcion Paralela):</span><span className="text-teal-600 font-mono font-bold">{(calcParallel * 100).toFixed(0)}%</span></div>
                  <input type="range" min="0.1" max="0.99" step="0.01" value={calcParallel} onChange={(e) => setCalcParallel(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-teal-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-2"><span className="text-slate-500 text-sm">N (Procesadores):</span><span className="text-purple-600 font-mono font-bold">{calcProcessors}</span></div>
                  <input type="range" min="1" max="16" step="1" value={calcProcessors} onChange={(e) => setCalcProcessors(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-purple-500" />
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-slate-500 text-xs mb-2">Distribucion de Trabajo:</div>
                  <div className="flex h-6 rounded overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold" style={{ width: `${calcParallel * 100}%` }}>Paralelo</div>
                    <div className="bg-gradient-to-r from-slate-400 to-slate-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: `${(1 - calcParallel) * 100}%` }}>Serial</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-4 text-center shadow-md mt-auto">
                  <div className="text-teal-100 text-sm mb-1">Speedup Maximo Teorico:</div>
                  <div className="text-5xl font-bold text-white">{amdahlSpeedup.toFixed(2)}x</div>
                  <div className="text-teal-100 text-xs mt-2">Limite: {(1 / (1 - calcParallel)).toFixed(1)}x (con infinitos procesadores)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SlideNavigation slideNumber={5} totalSlides={8} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 5: OLIVER - Limitaciones del Pipeline
   Interactive Simulator with 3 Scenarios
  ─��─────────────────────────────────────────── */

type PipelineScenario = "normal" | "data" | "control"

export function OliverSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [scenario, setScenario] = useState<PipelineScenario>("normal")
  const [cycle, setCycle] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Scenario configurations
  const scenarioConfig = {
    normal: {
      title: "Pipeline Normal",
      instructions: ["ADD R1, R2, R3", "SUB R4, R5, R6", "AND R7, R8, R9", "OR R10, R11, R12"],
      maxCycles: 8,
      message: "Sin conflictos, el pipeline mejora el rendimiento.",
      messageColor: "text-emerald-600",
      bgGradient: "from-emerald-100 to-teal-100",
      borderColor: "border-emerald-200"
    },
    data: {
      title: "Riesgo de Datos (RAW)",
      instructions: ["ADD R1, R2, R3", "SUB R4, R1, R5"],
      maxCycles: 10,
      message: "Una dependencia de datos reduce el rendimiento.",
      messageColor: "text-amber-600",
      bgGradient: "from-amber-100 to-orange-100", 
      borderColor: "border-amber-200"
    },
    control: {
      title: "Riesgo de Control",
      instructions: ["BEQ R1, R2, LABEL", "ADD R3, R4, R5", "SUB R6, R7, R8"],
      maxCycles: 8,
      message: "Los saltos pueden vaciar el pipeline y desperdiciar ciclos.",
      messageColor: "text-red-600",
      bgGradient: "from-red-100 to-rose-100",
      borderColor: "border-red-200"
    }
  }

  const config = scenarioConfig[scenario]

  // Pipeline state for each instruction at each cycle
  const getPipelineState = (instrIndex: number, currentCycle: number): { stage: string | null; status: "active" | "stall" | "flush" | "done" | "waiting" } => {
    if (scenario === "normal") {
      const startCycle = instrIndex
      const stageIndex = currentCycle - startCycle
      if (stageIndex < 0) return { stage: null, status: "waiting" }
      if (stageIndex >= 5) return { stage: null, status: "done" }
      return { stage: PIPELINE_STAGES[stageIndex], status: "active" }
    }
    
    if (scenario === "data") {
      if (instrIndex === 0) {
        // First instruction flows normally
        const stageIndex = currentCycle
        if (stageIndex >= 5) return { stage: null, status: "done" }
        return { stage: PIPELINE_STAGES[stageIndex], status: "active" }
      } else {
        // Second instruction has 2 stall cycles after ID stage
        if (currentCycle < 1) return { stage: null, status: "waiting" }
        if (currentCycle === 1) return { stage: "IF", status: "active" }
        if (currentCycle === 2) return { stage: "ID", status: "active" }
        if (currentCycle === 3 || currentCycle === 4) return { stage: "ID", status: "stall" }
        const adjustedCycle = currentCycle - 2 // 2 stall cycles
        const stageIndex = adjustedCycle
        if (stageIndex >= 5) return { stage: null, status: "done" }
        return { stage: PIPELINE_STAGES[stageIndex], status: "active" }
      }
    }
    
    if (scenario === "control") {
      if (instrIndex === 0) {
        // Branch instruction
        const stageIndex = currentCycle
        if (stageIndex >= 5) return { stage: null, status: "done" }
        return { stage: PIPELINE_STAGES[stageIndex], status: "active" }
      } else {
        // Instructions after branch - get flushed at cycle 3
        const startCycle = instrIndex
        const stageIndex = currentCycle - startCycle
        if (stageIndex < 0) return { stage: null, status: "waiting" }
        if (currentCycle >= 3) return { stage: null, status: "flush" }
        if (stageIndex >= 5) return { stage: null, status: "done" }
        return { stage: PIPELINE_STAGES[stageIndex], status: "active" }
      }
    }
    
    return { stage: null, status: "waiting" }
  }

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setCycle(0)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const startSimulation = useCallback(() => {
    if (cycle >= config.maxCycles) setCycle(0)
    setIsRunning(true)
  }, [cycle, config.maxCycles])

  const changeScenario = (newScenario: PipelineScenario) => {
    setScenario(newScenario)
    resetSimulation()
  }

  useEffect(() => {
    if (isPrintMode || !isRunning) return
    intervalRef.current = setInterval(() => {
      setCycle((c) => {
        if (c >= config.maxCycles) { 
          setIsRunning(false)
          return c 
        }
        return c + 1
      })
    }, 700)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPrintMode, isRunning, config.maxCycles])

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-50 via-white to-orange-50 flex flex-col p-5 relative overflow-hidden">
      <Presenter name="Oliver Abreu Mateo" />
      
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(239,68,68,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.08) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="mb-3 z-10">
        <div className="text-red-600 font-mono text-xs tracking-widest uppercase mb-1 font-semibold">Seccion 05</div>
        <h2 className="text-2xl font-bold text-slate-800">Limitaciones Reales del Pipeline</h2>
        <div className="h-1 w-24 bg-red-500 mt-2 rounded-full" />
      </div>

      <div className="flex gap-3 flex-1 min-h-0 z-10">
        {/* Left side: Pipeline Visualization */}
        <div className="flex-1 bg-white rounded-xl p-5 border-2 border-red-200 shadow-md flex flex-col min-w-0">
          {/* Scenario Tabs */}
          <div className="flex gap-2 mb-3">
            <button 
              onClick={() => changeScenario("normal")}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                scenario === "normal" 
                  ? "bg-emerald-500 text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Normal
            </button>
            <button 
              onClick={() => changeScenario("data")}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                scenario === "data" 
                  ? "bg-amber-500 text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Riesgo de Datos
            </button>
            <button 
              onClick={() => changeScenario("control")}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                scenario === "control" 
                  ? "bg-red-500 text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Riesgo de Control
            </button>
          </div>

          {/* Pipeline Stages Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-44" />
            {PIPELINE_STAGES.map((stage) => (
              <div 
                key={stage}
                className="w-20 h-12 rounded-lg flex items-center justify-center font-bold text-base text-white shadow-md"
                style={{ backgroundColor: STAGE_COLORS[stage as keyof typeof STAGE_COLORS] }}
              >
                {stage}
              </div>
            ))}
          </div>

          {/* Instructions with Pipeline State */}
          <div className="flex-1 flex flex-col justify-center gap-3">
            {config.instructions.map((instr, idx) => {
              const state = getPipelineState(idx, cycle)
              return (
                <div key={idx} className="flex items-center gap-3">
                  <code className={`font-mono text-sm w-44 px-3 py-3 rounded-lg transition-all ${
                    state.status === "flush" 
                      ? "bg-red-100 text-red-400 line-through" 
                      : state.status === "stall"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                  }`}>
                    {instr}
                  </code>
                  {PIPELINE_STAGES.map((stage) => {
                    const isCurrentStage = state.stage === stage
                    const isStall = state.status === "stall" && stage === "ID"
                    const isFlushed = state.status === "flush"
                    
                    return (
                      <div 
                        key={stage}
                        className={`w-20 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          isFlushed 
                            ? "bg-red-200 border-2 border-dashed border-red-400"
                            : isStall
                              ? "bg-amber-300 border-2 border-dashed border-amber-500 animate-pulse"
                              : isCurrentStage 
                                ? "text-white shadow-lg scale-105" 
                                : "bg-slate-100 border border-slate-200"
                        }`}
                        style={{
                          backgroundColor: isCurrentStage && !isStall && !isFlushed 
                            ? STAGE_COLORS[stage as keyof typeof STAGE_COLORS] 
                            : undefined
                        }}
                      >
                        {isFlushed ? "X" : isStall ? "STALL" : isCurrentStage ? stage : ""}
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {/* Bubble/NOP indicator for data hazard */}
            {scenario === "data" && (cycle === 3 || cycle === 4) && (
              <div className="flex items-center gap-3 animate-pulse">
                <div className="w-44 px-3 py-3 rounded-lg bg-amber-200 text-amber-700 font-mono text-sm font-bold text-center">
                  BURBUJA
                </div>
                <div className="w-20 h-12 rounded-lg bg-amber-300 border-2 border-dashed border-amber-500 flex items-center justify-center text-sm font-bold text-amber-700">
                  NOP
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm">Ciclo:</span>
              <span className="font-mono text-xl font-bold text-slate-800">{cycle}</span>
              <span className="text-slate-400 text-sm">/ {config.maxCycles}</span>
            </div>
            <div className="flex gap-2">
              {!isRunning ? (
                <button 
                  onClick={startSimulation} 
                  className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-all"
                >
                  <Play className="w-4 h-4" /> Simular
                </button>
              ) : (
                <button 
                  onClick={() => setIsRunning(false)} 
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-all"
                >
                  <Pause className="w-4 h-4" /> Pausar
                </button>
              )}
              <button 
                onClick={resetSimulation}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-2 border border-slate-200 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Explanation Panel */}
        <div className="w-56 flex flex-col gap-2 shrink-0">
          {/* Current Scenario Info */}
          <div className={`bg-gradient-to-br ${config.bgGradient} rounded-xl p-3 border ${config.borderColor} shadow-sm`}>
            <h3 className="text-slate-800 font-bold text-xs mb-1 flex items-center gap-1.5">
              {scenario === "normal" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              {scenario === "data" && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
              {scenario === "control" && <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
              {config.title}
            </h3>
            <p className={`text-xs font-medium ${config.messageColor}`}>
              {config.message}
            </p>
          </div>

          {/* Types of Hazards */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
            <h4 className="text-slate-700 font-semibold text-xs mb-2">Tipos de Riesgos</h4>
            <div className="space-y-1.5">
              <div className={`p-1.5 rounded-lg transition-all ${scenario === "data" ? "bg-amber-50 border border-amber-200" : "bg-slate-50"}`}>
                <div className="text-xs font-semibold text-amber-700">Datos (RAW)</div>
                <div className="text-[10px] text-slate-500">Dependencia entre instrucciones</div>
              </div>
              <div className={`p-1.5 rounded-lg transition-all ${scenario === "control" ? "bg-red-50 border border-red-200" : "bg-slate-50"}`}>
                <div className="text-xs font-semibold text-red-700">Control</div>
                <div className="text-[10px] text-slate-500">Saltos condicionales</div>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-50">
                <div className="text-xs font-semibold text-purple-700">Estructural</div>
                <div className="text-[10px] text-slate-500">Recursos compartidos</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
            <h4 className="text-slate-700 font-semibold text-xs mb-2">Leyenda</h4>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500" />
                <span className="text-slate-600">Etapa activa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-300 border-2 border-dashed border-amber-500" />
                <span className="text-slate-600">Stall / Burbuja</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-200 border-2 border-dashed border-red-400 flex items-center justify-center text-red-500 font-bold text-[8px]">X</div>
                <span className="text-slate-600">Flush (descartado)</span>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-slate-800 rounded-xl p-3 shadow-sm mt-auto">
            <h4 className="text-slate-300 font-semibold text-[10px] mb-1">Impacto en Rendimiento</h4>
            <div className="text-white text-xs">
              {scenario === "normal" && "Maximo throughput: 1 instruccion por ciclo"}
              {scenario === "data" && "Stalls reducen el CPI efectivo"}
              {scenario === "control" && "Flush desperdicia ciclos de trabajo"}
            </div>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={6} totalSlides={8} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   GRACIAS SLIDE (replaces Conclusiones)
───────────────────────────────────────────── */
export function GraciasSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const members = [
    "Algenis De los Santos Lopez",
    "Christopher Enrique Marrero Liriano",
    "Enmanuel Santos Diaz",
    "Frainer Encarnacion",
    "Oliver Abreu Mateo",
  ]

  const stages = ["IF", "ID", "EX", "MEM", "WB"]
  const pipelineColors = ["#0d9488", "#7c3aed", "#db2777", "#ea580c", "#16a34a"]

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-teal-50 flex flex-col items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "linear-gradient(rgba(13,148,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.08) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Animated pipeline */}
      <div className="flex gap-3 mb-10">
        {stages.map((stage, i) => (
          <div key={stage} className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse"
            style={{ backgroundColor: pipelineColors[i], animationDelay: `${i * 0.2}s` }}>
            {stage}
          </div>
        ))}
      </div>

      <h1 className="text-6xl font-bold text-slate-800 mb-4 z-10">Gracias</h1>
      <p className="text-2xl text-slate-500 mb-10 z-10">por su atencion</p>

      <div className="flex gap-3 flex-wrap justify-center mb-10 z-10">
        {members.map((m) => (
          <span key={m} className="text-sm font-medium text-slate-600 border border-slate-300 px-4 py-2 rounded-full bg-white/80 shadow-sm">
            {m}
          </span>
        ))}
      </div>

      <div className="text-slate-400 text-sm font-semibold tracking-wide z-10">
        Los Ingenieros - Arquitectura del Computador
      </div>

      <SlideNavigation slideNumber={7} totalSlides={8} />
    </div>
  )
}

/* ──────��──────────────────────────────────────
   QR SLIDE - Remote Control
───────────────────────────────────────────── */
export function QRSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [remoteUrl, setRemoteUrl] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const baseUrl = window.location.origin
    const url = `${baseUrl}/remote`
    setRemoteUrl(url)
    // Check if we're in v0 preview (vusercontent.net) which requires auth
    setIsPreview(baseUrl.includes("vusercontent.net") || baseUrl.includes("localhost"))
    
    QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: { dark: "#1e293b", light: "#ffffff" }
    }).then(setQrDataUrl).catch(console.error)
  }, [])

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="flex items-center gap-3 mb-4 z-10">
        <div className="p-3 bg-indigo-100 rounded-xl">
          <QrCode className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Control Remoto</h2>
      </div>

      {isPreview ? (
        <div className="z-10 max-w-xl text-center">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-amber-700">Modo Preview</span>
            </div>
            <p className="text-amber-800 text-sm mb-4">
              El control remoto no funcionara desde el preview porque requiere autenticacion de v0.
            </p>
            <div className="bg-white rounded-xl p-4 border border-amber-200">
              <p className="text-slate-700 text-sm font-medium mb-2">Para usar el control remoto:</p>
              <ol className="text-left text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span>Haz clic en <strong>&quot;Publish&quot;</strong> en la esquina superior derecha</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span>Espera que se despliegue en Vercel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span>Abre la URL publica y escanea el QR</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="opacity-50">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 inline-block">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR (solo funciona despues de publicar)" className="w-48 h-48" />
              ) : (
                <div className="w-48 h-48 bg-slate-100 rounded-xl animate-pulse" />
              )}
            </div>
            <p className="text-slate-400 text-xs mt-2 font-mono">{remoteUrl}</p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-slate-600 mb-4 text-center z-10 max-w-md">
            Escanea el codigo QR para controlar la presentacion desde tu celular
          </p>

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 z-10">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR para control remoto" className="w-64 h-64" />
            ) : (
              <div className="w-64 h-64 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center">
                <span className="text-slate-400">Generando...</span>
              </div>
            )}
          </div>

          <p className="text-slate-500 text-sm mt-4 font-mono z-10 bg-slate-100 px-4 py-2 rounded-lg">{remoteUrl}</p>

          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200 z-10 max-w-lg">
            <p className="text-slate-600 text-sm text-center">
              <span className="font-semibold text-indigo-600">Desde tu celular podras:</span> Navegar entre diapositivas, 
              iniciar/pausar simulaciones, y controlar la presentacion en tiempo real.
            </p>
          </div>
        </>
      )}

      <SlideNavigation slideNumber={8} totalSlides={8} />
    </div>
  )
}
