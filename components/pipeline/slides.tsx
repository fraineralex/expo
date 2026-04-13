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
  QrCode
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
    <div className="absolute bottom-5 right-6 z-20 flex items-center gap-3">
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
    "Frainer Alexander Encarnacion Valenzuela",
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

/* ─────────────────────────────────────────────
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
───────────────────────────────────────────── */
export function FrainerSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [numInstructions, setNumInstructions] = useState(6)
  const [parallelPortion, setParallelPortion] = useState(0.7)
  const [numProcessors, setNumProcessors] = useState(4)

  const monocycleCycleTime = 800
  const monocycleTime = numInstructions * monocycleCycleTime

  const pipelineCycleTime = 200
  const pipelineStages = 5
  const pipelineTotalCycles = numInstructions + pipelineStages - 1
  const pipelineTime = pipelineTotalCycles * pipelineCycleTime

  const speedup = monocycleTime / pipelineTime
  const amdahlSpeedup = 1 / ((1 - parallelPortion) + (parallelPortion / numProcessors))

  return (
    <div className="w-full h-full bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex flex-col p-6 relative overflow-hidden">
      <Presenter name="Frainer Alexander Encarnacion Valenzuela" />
      
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(13,148,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.08) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="mb-4 z-10">
        <div className="text-teal-600 font-mono text-xs tracking-widest uppercase mb-2 font-semibold">Seccion 04</div>
        <h2 className="text-3xl font-bold text-slate-800">Comparacion Directa y Calculo de Speedup</h2>
        <div className="h-1 w-24 bg-teal-500 mt-2 rounded-full" />
      </div>

      <div className="flex gap-4 flex-1 min-h-0 z-10">
        <div className="flex-1 flex flex-col gap-4">
          {/* Instruction slider */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-600 text-sm font-medium">Numero de Instrucciones:</span>
              <span className="text-teal-600 font-mono text-2xl font-bold">{numInstructions}</span>
            </div>
            <input type="range" min="3" max="20" value={numInstructions} onChange={(e) => setNumInstructions(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
          </div>

          {/* Side by side */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border-2 border-orange-200 flex flex-col">
              <h3 className="text-orange-600 font-bold text-lg mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Monociclo
              </h3>
              <div className="space-y-2 flex-1 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Ciclos:</span><span className="font-mono font-bold">{numInstructions}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">T/ciclo:</span><span className="font-mono font-bold">{monocycleCycleTime}ns</span></div>
                <div className="h-px bg-orange-200 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-orange-700 font-semibold">Total:</span>
                  <span className="text-orange-600 font-mono text-xl font-bold">{monocycleTime}ns</span>
                </div>
              </div>
              <div className="mt-3 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                {monocycleTime}ns
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200 flex flex-col">
              <h3 className="text-purple-600 font-bold text-lg mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Pipeline
              </h3>
              <div className="space-y-2 flex-1 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Ciclos:</span><span className="font-mono font-bold">{pipelineTotalCycles}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">T/ciclo:</span><span className="font-mono font-bold">{pipelineCycleTime}ns</span></div>
                <div className="h-px bg-purple-200 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-purple-700 font-semibold">Total:</span>
                  <span className="text-purple-600 font-mono text-xl font-bold">{pipelineTime}ns</span>
                </div>
              </div>
              <div className="mt-3 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md"
                style={{ width: `${Math.max(30, (pipelineTime / monocycleTime) * 100)}%` }}>
                {pipelineTime}ns
              </div>
            </div>
          </div>

          {/* Speedup */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-teal-100 text-sm mb-1">Formula de Speedup:</div>
                <div className="font-mono text-white text-lg">Speedup = {monocycleTime} / {pipelineTime}</div>
              </div>
              <div className="text-right">
                <div className="text-teal-100 text-sm mb-1">Resultado:</div>
                <div className="text-5xl font-bold text-white">{speedup.toFixed(2)}x</div>
              </div>
            </div>
          </div>
        </div>

        {/* Amdahl */}
        <div className="w-72 bg-white rounded-xl p-5 border-2 border-teal-200 shadow-md flex flex-col">
          <h3 className="text-slate-800 text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" /> Ley de Amdahl
          </h3>
          <div className="bg-teal-50 rounded-lg p-4 font-mono text-center mb-4 border border-teal-200">
            <div className="text-teal-700 font-bold">S(N) = 1 / ((1-P) + P/N)</div>
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-500 text-sm">P (Paralelo):</span>
                <span className="text-teal-600 font-mono font-bold">{(parallelPortion * 100).toFixed(0)}%</span>
              </div>
              <input type="range" min="0.1" max="0.99" step="0.01" value={parallelPortion}
                onChange={(e) => setParallelPortion(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-teal-500" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-500 text-sm">N (Procesadores):</span>
                <span className="text-purple-600 font-mono font-bold">{numProcessors}</span>
              </div>
              <input type="range" min="1" max="16" step="1" value={numProcessors}
                onChange={(e) => setNumProcessors(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-purple-500" />
            </div>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-4 text-center shadow-md mt-auto">
              <div className="text-teal-100 text-sm mb-1">Speedup Maximo:</div>
              <div className="text-4xl font-bold text-white">{amdahlSpeedup.toFixed(2)}x</div>
            </div>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={5} totalSlides={8} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 5: OLIVER - Limitaciones del Pipeline
   Interactive Simulator with 3 Scenarios
  ───────────────────────────────────────────── */

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

      <div className="flex gap-4 flex-1 min-h-0 z-10">
        {/* Left side: Pipeline Visualization */}
        <div className="flex-1 bg-white rounded-xl p-4 border-2 border-red-200 shadow-md flex flex-col">
          {/* Scenario Tabs */}
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => changeScenario("normal")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                scenario === "normal" 
                  ? "bg-emerald-500 text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Normal
            </button>
            <button 
              onClick={() => changeScenario("data")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                scenario === "data" 
                  ? "bg-amber-500 text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Riesgo de Datos
            </button>
            <button 
              onClick={() => changeScenario("control")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                scenario === "control" 
                  ? "bg-red-500 text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Riesgo de Control
            </button>
          </div>

          {/* Pipeline Stages Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-32" />
            {PIPELINE_STAGES.map((stage) => (
              <div 
                key={stage}
                className="w-14 h-10 rounded-lg flex items-center justify-center font-bold text-sm text-white shadow-md"
                style={{ backgroundColor: STAGE_COLORS[stage as keyof typeof STAGE_COLORS] }}
              >
                {stage}
              </div>
            ))}
          </div>

          {/* Instructions with Pipeline State */}
          <div className="space-y-2 flex-1">
            {config.instructions.map((instr, idx) => {
              const state = getPipelineState(idx, cycle)
              return (
                <div key={idx} className="flex items-center gap-2">
                  <code className={`font-mono text-xs w-32 px-2 py-2 rounded-lg transition-all ${
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
                        className={`w-14 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
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
              <div className="flex items-center gap-2 animate-pulse">
                <div className="w-32 px-2 py-2 rounded-lg bg-amber-200 text-amber-700 font-mono text-xs font-bold text-center">
                  BURBUJA
                </div>
                <div className="w-14 h-10 rounded-lg bg-amber-300 border-2 border-dashed border-amber-500 flex items-center justify-center text-xs font-bold text-amber-700">
                  NOP
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm">Ciclo:</span>
              <span className="font-mono text-lg font-bold text-slate-800">{cycle}</span>
              <span className="text-slate-400 text-sm">/ {config.maxCycles}</span>
            </div>
            <div className="flex gap-2">
              {!isRunning ? (
                <button 
                  onClick={startSimulation} 
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-all"
                >
                  <Play className="w-4 h-4" /> Simular
                </button>
              ) : (
                <button 
                  onClick={() => setIsRunning(false)} 
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-all"
                >
                  <Pause className="w-4 h-4" /> Pausar
                </button>
              )}
              <button 
                onClick={resetSimulation}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-2 border border-slate-200 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Explanation Panel */}
        <div className="w-72 flex flex-col gap-3">
          {/* Current Scenario Info */}
          <div className={`bg-gradient-to-br ${config.bgGradient} rounded-xl p-4 border ${config.borderColor} shadow-sm`}>
            <h3 className="text-slate-800 font-bold text-sm mb-2 flex items-center gap-2">
              {scenario === "normal" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {scenario === "data" && <AlertTriangle className="w-4 h-4 text-amber-600" />}
              {scenario === "control" && <AlertTriangle className="w-4 h-4 text-red-600" />}
              {config.title}
            </h3>
            <p className={`text-sm font-medium ${config.messageColor}`}>
              {config.message}
            </p>
          </div>

          {/* Types of Hazards */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <h4 className="text-slate-700 font-semibold text-sm mb-3">Tipos de Riesgos</h4>
            <div className="space-y-2">
              <div className={`p-2 rounded-lg transition-all ${scenario === "data" ? "bg-amber-50 border border-amber-200" : "bg-slate-50"}`}>
                <div className="text-xs font-semibold text-amber-700">Datos (RAW)</div>
                <div className="text-xs text-slate-500">Dependencia entre instrucciones</div>
              </div>
              <div className={`p-2 rounded-lg transition-all ${scenario === "control" ? "bg-red-50 border border-red-200" : "bg-slate-50"}`}>
                <div className="text-xs font-semibold text-red-700">Control</div>
                <div className="text-xs text-slate-500">Saltos condicionales</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <div className="text-xs font-semibold text-purple-700">Estructural</div>
                <div className="text-xs text-slate-500">Recursos compartidos</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <h4 className="text-slate-700 font-semibold text-sm mb-3">Leyenda</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-emerald-500" />
                <span className="text-slate-600">Etapa activa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-amber-300 border-2 border-dashed border-amber-500" />
                <span className="text-slate-600">Stall / Burbuja</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-red-200 border-2 border-dashed border-red-400 flex items-center justify-center text-red-500 font-bold text-xs">X</div>
                <span className="text-slate-600">Flush (descartado)</span>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-slate-800 rounded-xl p-4 shadow-sm mt-auto">
            <h4 className="text-slate-300 font-semibold text-xs mb-2">Impacto en Rendimiento</h4>
            <div className="text-white text-sm">
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
    "Frainer Alexander Encarnacion Valenzuela",
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
