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
  SkipForward
} from "lucide-react"

/* ─────────────────────────────────────────────
   SHARED PRESENTER BADGE (TOP RIGHT)
───────────────────────────────────────────── */
function Presenter({ name }: { name: string }) {
  return (
    <div className="absolute top-5 right-6 z-20">
      <div className="bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-600/50">
        <span className="text-slate-200 text-sm font-medium">{name}</span>
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
        className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all border border-slate-300 shadow-sm"
      >
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </button>
      <button
        onClick={goToNext}
        disabled={slideNumber === totalSlides}
        className="w-10 h-10 rounded-lg bg-teal-500 hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm"
      >
        <ChevronRight className="w-5 h-5 text-white" />
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
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-teal-50 relative overflow-hidden">
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

      <SlideNavigation slideNumber={1} totalSlides={7} />
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
      
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header */}
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

      <SlideNavigation slideNumber={2} totalSlides={7} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 2: CHRISTOPHER - Procesador Monociclo
   REDESIGNED: Clearer, more pedagogical simulation
───────────────────────────────────────────── */
const MONOCYCLE_INSTRUCTIONS = [
  { name: "ADD", fullName: "ADD R1, R2, R3", type: "R", realTime: 200, description: "Suma registros" },
  { name: "LOAD", fullName: "LOAD R4, 0(R1)", type: "I", realTime: 800, description: "Carga de memoria (MAS LENTA)" },
  { name: "SUB", fullName: "SUB R5, R4, R2", type: "R", realTime: 200, description: "Resta registros" },
  { name: "STORE", fullName: "STORE R5, 4(R1)", type: "I", realTime: 700, description: "Guarda en memoria" },
  { name: "AND", fullName: "AND R6, R3, R5", type: "R", realTime: 200, description: "Operacion AND" },
  { name: "OR", fullName: "OR R7, R6, R1", type: "R", realTime: 200, description: "Operacion OR" },
]

const MONOCYCLE_CYCLE_TIME = 800 // Determined by slowest instruction (LOAD)

export function ChristopherSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [currentCycle, setCurrentCycle] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalInstructions = MONOCYCLE_INSTRUCTIONS.length
  const totalTime = totalInstructions * MONOCYCLE_CYCLE_TIME
  const wastedTime = MONOCYCLE_INSTRUCTIONS.reduce((acc, instr) => acc + (MONOCYCLE_CYCLE_TIME - instr.realTime), 0)

  const startSimulation = useCallback(() => {
    setIsRunning(true)
  }, [])

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
    }, 1500)

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
        {/* Left: Explanation Panel */}
        <div className="w-[340px] flex flex-col gap-3">
          {/* What is Monocycle */}
          <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-sm">
            <h3 className="text-orange-600 font-bold text-base mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              ¿Que es el Monociclo?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Un procesador donde <strong className="text-orange-600">cada instruccion se completa en exactamente un ciclo de reloj</strong>. 
              Simple de diseñar, pero con un problema importante...
            </p>
          </div>

          {/* The Problem */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
            <h3 className="text-red-600 font-bold text-base mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              El Problema Principal
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-3">
              El tiempo de ciclo debe ser igual al tiempo de la <strong className="text-red-600">instruccion MAS LENTA</strong> (LOAD = {MONOCYCLE_CYCLE_TIME}ns).
            </p>
            <div className="bg-white rounded-lg p-3 border border-red-100">
              <p className="text-slate-600 text-sm">
                Las instrucciones rapidas (ADD = 200ns) <strong className="text-red-600">desperdician {MONOCYCLE_CYCLE_TIME - 200}ns</strong> esperando que termine el ciclo.
              </p>
            </div>
          </div>

          {/* Formula */}
          <div className="bg-white rounded-xl p-4 border-2 border-orange-300">
            <div className="text-slate-800 font-bold text-sm mb-2">Formula del Tiempo Total:</div>
            <div className="bg-orange-50 rounded-lg p-3 font-mono text-center border border-orange-200">
              <div className="text-orange-700 text-lg font-bold">
                T<sub>total</sub> = N × T<sub>ciclo</sub>
              </div>
              <div className="text-slate-500 text-xs mt-2">
                T<sub>total</sub> = {totalInstructions} × {MONOCYCLE_CYCLE_TIME}ns = <span className="text-orange-600 font-bold">{totalTime}ns</span>
              </div>
            </div>
          </div>

          {/* Live Statistics */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm mt-auto">
            <div className="text-slate-800 font-bold text-sm mb-3">Estadisticas en Tiempo Real:</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100">
                <div className="text-slate-500 text-xs mb-1">Ciclo Actual</div>
                <div className="text-orange-600 font-mono text-2xl font-bold">{currentCycle}/{totalInstructions}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
                <div className="text-slate-500 text-xs mb-1">Tiempo Acumulado</div>
                <div className="text-slate-800 font-mono text-2xl font-bold">{currentCycle * MONOCYCLE_CYCLE_TIME}ns</div>
              </div>
            </div>
            {currentCycle === totalInstructions && (
              <div className="mt-3 p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-center">
                <div className="text-white text-sm font-bold">Tiempo Final: {totalTime}ns</div>
                <div className="text-orange-100 text-xs mt-1">Tiempo desperdiciado: {wastedTime}ns ({((wastedTime/totalTime)*100).toFixed(0)}%)</div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Simulation Panel */}
        <div className="flex-1 bg-white rounded-xl p-5 border-2 border-orange-200 shadow-md flex flex-col">
          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 text-lg font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Linea de Tiempo Secuencial
            </h3>
            <div className="flex gap-2">
              {!isRunning ? (
                <button
                  onClick={startSimulation}
                  disabled={currentCycle >= totalInstructions}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm"
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
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-700 font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <SkipForward className="w-4 h-4" />
                Paso
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
            </div>
          </div>

          {/* Visual Timeline with Wasted Time */}
          <div className="flex-1 overflow-auto">
            <div className="space-y-2">
              {/* Header with time markers */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-32 shrink-0" />
                <div className="flex-1 flex">
                  {MONOCYCLE_INSTRUCTIONS.map((_, i) => (
                    <div key={i} className="flex-1 text-center">
                      <div className="text-xs font-mono text-slate-400 mb-1">Ciclo {i + 1}</div>
                      <div className="text-xs font-mono text-slate-500">{(i + 1) * MONOCYCLE_CYCLE_TIME}ns</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions visualization */}
              {MONOCYCLE_INSTRUCTIONS.map((instr, idx) => {
                const isExecuting = currentCycle === idx + 1
                const isCompleted = currentCycle > idx
                const wastedForThis = MONOCYCLE_CYCLE_TIME - instr.realTime
                const usedPercent = (instr.realTime / MONOCYCLE_CYCLE_TIME) * 100
                
                return (
                  <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
                    isExecuting ? "bg-orange-100 border-2 border-orange-400" : 
                    isCompleted ? "bg-slate-50" : "bg-white"
                  }`}>
                    {/* Instruction name */}
                    <div className="w-32 shrink-0">
                      <div className={`font-mono text-sm font-bold ${
                        isExecuting ? "text-orange-600" : isCompleted ? "text-slate-500" : "text-slate-400"
                      }`}>
                        {instr.name}
                      </div>
                      <div className="text-xs text-slate-400">{instr.realTime}ns real</div>
                    </div>

                    {/* Timeline blocks */}
                    <div className="flex-1 flex gap-1">
                      {MONOCYCLE_INSTRUCTIONS.map((_, cycleIdx) => {
                        const isThisCycle = cycleIdx === idx
                        const isCurrent = currentCycle === cycleIdx + 1 && isThisCycle
                        const isDone = currentCycle > cycleIdx && isThisCycle

                        if (!isThisCycle) {
                          return (
                            <div key={cycleIdx} className="flex-1 h-14 rounded-lg bg-slate-100/50" />
                          )
                        }

                        return (
                          <div
                            key={cycleIdx}
                            className={`flex-1 h-14 rounded-lg overflow-hidden transition-all duration-500 ${
                              isCurrent 
                                ? "ring-2 ring-orange-500 ring-offset-2 shadow-lg" 
                                : isDone 
                                  ? "opacity-90" 
                                  : "opacity-50"
                            }`}
                          >
                            {/* Used time (green) */}
                            <div 
                              className={`h-full flex items-center relative ${
                                isCurrent || isDone ? "bg-emerald-500" : "bg-emerald-200"
                              }`}
                              style={{ width: `${usedPercent}%`, display: 'inline-flex' }}
                            >
                              {(isCurrent || isDone) && (
                                <span className="text-white text-xs font-bold pl-2 whitespace-nowrap">
                                  {instr.realTime}ns
                                </span>
                              )}
                            </div>
                            {/* Wasted time (red striped) */}
                            <div 
                              className={`h-full inline-flex items-center ${
                                isCurrent || isDone ? "bg-red-400" : "bg-red-200"
                              }`}
                              style={{ 
                                width: `${100 - usedPercent}%`,
                                backgroundImage: (isCurrent || isDone) ? 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)' : 'none'
                              }}
                            >
                              {wastedForThis > 0 && (isCurrent || isDone) && (
                                <span className="text-white text-xs font-bold pl-1 whitespace-nowrap">
                                  +{wastedForThis}ns
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Status indicator */}
                    <div className="w-20 shrink-0 text-right">
                      {isExecuting && (
                        <span className="text-orange-600 text-xs font-bold animate-pulse">Ejecutando...</span>
                      )}
                      {isCompleted && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 inline" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-emerald-500 rounded" />
                <span className="text-slate-600 text-xs">Tiempo util</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-red-400 rounded" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                }} />
                <span className="text-slate-600 text-xs">Tiempo desperdiciado</span>
              </div>
            </div>
          </div>

          {/* Key pedagogical message */}
          <div className="mt-4 bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-300 rounded-xl p-4">
            <div className="text-orange-700 font-bold text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Mensaje Clave para Entender:
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              En un procesador monociclo, cada instruccion se completa en <strong className="text-orange-600">un solo ciclo</strong>, 
              pero ese ciclo debe durar lo suficiente para que termine la instruccion mas lenta ({MONOCYCLE_CYCLE_TIME}ns para LOAD). 
              Por eso, las instrucciones rapidas como ADD (200ns) <strong className="text-red-600">desperdician {MONOCYCLE_CYCLE_TIME - 200}ns por ciclo</strong>.
            </p>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={3} totalSlides={7} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 3: ENMANUEL - Pipeline de 5 Etapas
───────────────────────────────────────────── */
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
    setIsRunning(true)
  }, [])

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
    if (currentCycle < totalCycles) {
      setCurrentCycle((c) => c + 1)
    }
  }, [currentCycle, totalCycles])

  useEffect(() => {
    if (isPrintMode || !isRunning) return

    intervalRef.current = setInterval(() => {
      setCurrentCycle((c) => {
        if (c >= totalCycles) {
          setIsRunning(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
          return c
        }
        return c + 1
      })
    }, 700)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPrintMode, isRunning, totalCycles])

  const getInstructionStage = (instrIdx: number, cycle: number): string | null => {
    const stageIdx = cycle - instrIdx - 1
    if (stageIdx >= 0 && stageIdx < PIPELINE_STAGES.length) {
      return PIPELINE_STAGES[stageIdx]
    }
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
        {/* Left: Explanation */}
        <div className="w-72 flex flex-col gap-3">
          <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-sm">
            <h3 className="text-purple-600 font-bold text-sm mb-3">Las 5 Etapas del Pipeline</h3>
            <div className="space-y-2">
              {PIPELINE_STAGES.map((stage) => (
                <div key={stage} className="flex items-center gap-3">
                  <div
                    className="w-12 h-7 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm"
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
            <div className="text-slate-800 font-bold text-sm mb-2">Tiempo de Ciclo Pipeline:</div>
            <div className="bg-white rounded-lg p-3 font-mono text-center border border-purple-100">
              <div className="text-purple-700 text-xl font-bold">
                T<sub>ciclo</sub> = {cycleTimePipeline} ns
              </div>
              <div className="text-slate-500 text-xs mt-1">
                Solo la etapa mas lenta
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm mt-auto">
            <div className="text-slate-800 font-bold text-sm mb-3">Estadisticas:</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 rounded-lg p-2 text-center border border-purple-100">
                <div className="text-slate-500 text-xs">Ciclos</div>
                <div className="text-purple-600 font-mono text-lg font-bold">{currentCycle}/{totalCycles}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-200">
                <div className="text-slate-500 text-xs">Tiempo</div>
                <div className="text-slate-800 font-mono text-lg font-bold">{currentCycle * cycleTimePipeline}ns</div>
              </div>
            </div>
            {currentCycle === totalCycles && (
              <div className="mt-3 text-center p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <span className="text-white text-sm font-bold">Final: {totalCycles * cycleTimePipeline} ns</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Pipeline Table */}
        <div className="flex-1 bg-white rounded-xl p-5 border-2 border-purple-200 shadow-md flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 text-lg font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              Tabla de Pipeline - Ejecucion Paralela
            </h3>
            <div className="flex gap-2">
              {!isRunning ? (
                <button
                  onClick={startSimulation}
                  disabled={currentCycle >= totalCycles}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" />
                  Iniciar
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
                disabled={isRunning || currentCycle >= totalCycles}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-700 font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <SkipForward className="w-4 h-4" />
                Paso
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Pipeline table */}
          <div className="flex-1 overflow-x-auto">
            <div className="space-y-2">
              {/* Cycle header */}
              <div className="flex items-center gap-1 sticky top-0 bg-white pb-2">
                <div className="w-32 text-slate-500 text-xs font-medium shrink-0">Instruccion</div>
                {Array.from({ length: totalCycles }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-11 h-7 flex items-center justify-center text-xs font-mono shrink-0 rounded transition-all duration-300 ${
                      i + 1 === currentCycle ? "bg-purple-500 text-white font-bold" : "text-slate-400 bg-slate-50"
                    }`}
                  >
                    C{i + 1}
                  </div>
                ))}
              </div>

              {/* Instructions */}
              {PIPELINE_INSTRUCTIONS.map((instr, instrIdx) => (
                <div key={instrIdx} className="flex items-center gap-1">
                  <div className="w-32 font-mono text-xs text-slate-600 truncate shrink-0">
                    {instr}
                  </div>
                  {Array.from({ length: totalCycles }).map((_, cycleIdx) => {
                    const stage = getInstructionStage(instrIdx, cycleIdx + 1)
                    const isCurrentCycle = cycleIdx + 1 === currentCycle
                    const isPast = cycleIdx + 1 < currentCycle

                    if (!stage) {
                      return (
                        <div key={cycleIdx} className="w-11 h-9 bg-slate-50 rounded shrink-0" />
                      )
                    }

                    const color = STAGE_COLORS[stage as keyof typeof STAGE_COLORS]
                    const isActive = isCurrentCycle || isPast

                    return (
                      <div
                        key={cycleIdx}
                        className="w-11 h-9 rounded flex items-center justify-center text-xs font-bold text-white shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? color : `${color}40`,
                          boxShadow: isCurrentCycle ? `0 0 12px ${color}80` : "none",
                          transform: isCurrentCycle ? "scale(1.1)" : "scale(1)",
                          opacity: isActive ? 1 : 0.5,
                        }}
                      >
                        {stage}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Key insight */}
          <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl p-4">
            <div className="text-purple-700 font-bold text-sm mb-1">Observacion Clave:</div>
            <p className="text-slate-700 text-sm">
              Multiples instrucciones se ejecutan <strong className="text-purple-600">simultaneamente</strong> en diferentes etapas.
              Aunque cada instruccion toma 5 ciclos, el <strong className="text-emerald-600">throughput</strong> es de ~1 instruccion por ciclo en regimen estacionario.
            </p>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={4} totalSlides={7} />
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
      
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(13,148,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-4 z-10">
        <div className="text-teal-600 font-mono text-xs tracking-widest uppercase mb-2 font-semibold">Seccion 04</div>
        <h2 className="text-3xl font-bold text-slate-800">Comparacion Directa y Calculo de Speedup</h2>
        <div className="h-1 w-24 bg-teal-500 mt-2 rounded-full" />
      </div>

      <div className="flex gap-4 flex-1 min-h-0 z-10">
        {/* Left: Comparison */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Instruction slider */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-600 text-sm font-medium">Numero de Instrucciones:</span>
              <span className="text-teal-600 font-mono text-2xl font-bold">{numInstructions}</span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              value={numInstructions}
              onChange={(e) => setNumInstructions(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {/* Monocycle */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border-2 border-orange-200 flex flex-col">
              <h3 className="text-orange-600 font-bold text-lg mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Monociclo
              </h3>
              <div className="space-y-2 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Ciclos totales:</span>
                  <span className="text-slate-800 font-mono font-bold">{numInstructions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tiempo/ciclo:</span>
                  <span className="text-slate-800 font-mono font-bold">{monocycleCycleTime} ns</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">CPI:</span>
                  <span className="text-slate-800 font-mono font-bold">1</span>
                </div>
                <div className="h-px bg-orange-200 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-orange-700 font-semibold">Tiempo Total:</span>
                  <span className="text-orange-600 font-mono text-xl font-bold">{monocycleTime} ns</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {monocycleTime} ns
                </div>
              </div>
            </div>

            {/* Pipeline */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200 flex flex-col">
              <h3 className="text-purple-600 font-bold text-lg mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Pipeline
              </h3>
              <div className="space-y-2 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Ciclos totales:</span>
                  <span className="text-slate-800 font-mono font-bold">{pipelineTotalCycles}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tiempo/ciclo:</span>
                  <span className="text-slate-800 font-mono font-bold">{pipelineCycleTime} ns</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Throughput:</span>
                  <span className="text-slate-800 font-mono font-bold">~1 instr/ciclo</span>
                </div>
                <div className="h-px bg-purple-200 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-purple-700 font-semibold">Tiempo Total:</span>
                  <span className="text-purple-600 font-mono text-xl font-bold">{pipelineTime} ns</span>
                </div>
              </div>
              <div className="mt-3">
                <div 
                  className="h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md"
                  style={{ width: `${Math.max(30, (pipelineTime / monocycleTime) * 100)}%` }}
                >
                  {pipelineTime} ns
                </div>
              </div>
            </div>
          </div>

          {/* Speedup result */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-teal-100 text-sm mb-1">Formula de Speedup:</div>
                <div className="font-mono text-white text-lg">
                  Speedup = T<sub>mono</sub> / T<sub>pipe</sub> = {monocycleTime} / {pipelineTime}
                </div>
              </div>
              <div className="text-right">
                <div className="text-teal-100 text-sm mb-1">Resultado:</div>
                <div className="text-5xl font-bold text-white">{speedup.toFixed(2)}x</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Amdahl's Law */}
        <div className="w-80 bg-white rounded-xl p-5 border-2 border-teal-200 shadow-md flex flex-col">
          <h3 className="text-slate-800 text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            Ley de Amdahl
          </h3>

          <div className="bg-teal-50 rounded-lg p-4 font-mono text-center mb-4 border border-teal-200">
            <div className="text-teal-700 text-lg font-bold">
              S(N) = 1 / ((1-P) + P/N)
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-500 text-sm">P (Parte Paralelizable):</span>
                <span className="text-teal-600 font-mono font-bold">{(parallelPortion * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.99"
                step="0.01"
                value={parallelPortion}
                onChange={(e) => setParallelPortion(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-500 text-sm">N (Procesadores):</span>
                <span className="text-purple-600 font-mono font-bold">{numProcessors}</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={numProcessors}
                onChange={(e) => setNumProcessors(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Amdahl calculation */}
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-slate-400 text-xs mb-2">Calculo paso a paso:</div>
              <div className="font-mono text-xs text-slate-600 space-y-1">
                <div>S({numProcessors}) = 1 / ((1-{parallelPortion.toFixed(2)}) + {parallelPortion.toFixed(2)}/{numProcessors})</div>
                <div>S({numProcessors}) = 1 / ({(1-parallelPortion).toFixed(2)} + {(parallelPortion/numProcessors).toFixed(3)})</div>
                <div>S({numProcessors}) = 1 / {((1-parallelPortion) + parallelPortion/numProcessors).toFixed(3)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-4 text-center shadow-md">
              <div className="text-teal-100 text-sm mb-1">Speedup Maximo (Amdahl):</div>
              <div className="text-4xl font-bold text-white">{amdahlSpeedup.toFixed(2)}x</div>
            </div>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={5} totalSlides={7} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 5: OLIVER - Limitaciones del Pipeline
───────────────────────────────────────────── */
const HAZARD_INSTRUCTIONS = [
  { name: "ADD R1, R2, R3", hasHazard: false },
  { name: "SUB R4, R1, R5", hasHazard: true, dependsOn: "R1" },
  { name: "AND R6, R4, R7", hasHazard: true, dependsOn: "R4" },
  { name: "OR R8, R6, R2", hasHazard: true, dependsOn: "R6" },
]

export function OliverSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [showHazards, setShowHazards] = useState(false)
  const [currentCycle, setCurrentCycle] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const idealCycles = HAZARD_INSTRUCTIONS.length + 4
  const stallsPerHazard = 2
  const numHazards = HAZARD_INSTRUCTIONS.filter(i => i.hasHazard).length
  const totalStalls = showHazards ? numHazards * stallsPerHazard : 0
  const actualCycles = idealCycles + totalStalls

  const pipelineCycleTime = 200

  const idealTime = idealCycles * pipelineCycleTime
  const actualTime = actualCycles * pipelineCycleTime
  const monocycleTime = HAZARD_INSTRUCTIONS.length * 800

  const idealSpeedup = monocycleTime / idealTime
  const actualSpeedup = monocycleTime / actualTime

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setCurrentCycle(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const toggleHazards = useCallback(() => {
    setShowHazards(h => !h)
    resetSimulation()
  }, [resetSimulation])

  const startSimulation = useCallback(() => {
    setIsRunning(true)
  }, [])

  useEffect(() => {
    if (isPrintMode || !isRunning) return

    intervalRef.current = setInterval(() => {
      setCurrentCycle((c) => {
        const maxCycles = showHazards ? actualCycles : idealCycles
        if (c >= maxCycles) {
          setIsRunning(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
          return c
        }
        return c + 1
      })
    }, 500)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPrintMode, isRunning, showHazards, actualCycles, idealCycles])

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-50 via-white to-orange-50 flex flex-col p-6 relative overflow-hidden">
      <Presenter name="Oliver Abreu Mateo" />
      
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(239,68,68,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-4 z-10">
        <div className="text-red-600 font-mono text-xs tracking-widest uppercase mb-2 font-semibold">Seccion 05</div>
        <h2 className="text-3xl font-bold text-slate-800">Limitaciones Reales del Pipeline</h2>
        <div className="h-1 w-24 bg-red-500 mt-2 rounded-full" />
      </div>

      <div className="flex gap-4 flex-1 min-h-0 z-10">
        {/* Left: Explanation */}
        <div className="w-72 flex flex-col gap-3">
          <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-sm">
            <h3 className="text-red-600 font-bold text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Data Hazards (RAW)
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Ocurren cuando una instruccion necesita un dato que aun no ha sido calculado.
            </p>
            <div className="bg-slate-50 rounded-lg p-2 font-mono text-xs border border-slate-200">
              <div className="text-slate-600">ADD <span className="text-red-500 font-bold">R1</span>, R2, R3</div>
              <div className="text-slate-600">SUB R4, <span className="text-red-500 font-bold">R1</span>, R5 <span className="text-amber-500">← espera</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-amber-200">
            <h3 className="text-amber-600 font-bold text-sm mb-2">Stalls (Burbujas)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              El pipeline debe <strong className="text-amber-600">detenerse</strong> hasta que el dato este disponible.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-8 h-6 rounded bg-amber-100 border-2 border-dashed border-amber-400 flex items-center justify-center text-amber-600 text-xs font-bold">
                NOP
              </div>
              <span className="text-slate-400 text-xs">= Burbuja</span>
            </div>
          </div>

          {/* Toggle */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-700 font-semibold text-sm">Mostrar Hazards:</span>
              <button
                onClick={toggleHazards}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  showHazards 
                    ? "bg-red-500 text-white shadow-md" 
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {showHazards ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Stats comparison */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm mt-auto">
            <div className="text-slate-800 font-bold text-sm mb-3">Comparacion:</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Pipeline Ideal:</span>
                <span className="text-emerald-600 font-mono font-bold">{idealCycles} ciclos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Con Hazards:</span>
                <span className="text-red-600 font-mono font-bold">{actualCycles} ciclos</span>
              </div>
              <div className="h-px bg-slate-200 my-1" />
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Speedup Ideal:</span>
                <span className="text-emerald-600 font-bold">{idealSpeedup.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Speedup Real:</span>
                <span className="text-red-600 font-bold">{actualSpeedup.toFixed(2)}x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Pipeline visualization */}
        <div className="flex-1 bg-white rounded-xl p-5 border-2 border-red-200 shadow-md flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              Pipeline {showHazards ? "con Hazards" : "Ideal"}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={startSimulation}
                disabled={isRunning || currentCycle >= (showHazards ? actualCycles : idealCycles)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4" />
                Simular
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Instructions with hazard indicators */}
          <div className="space-y-2 mb-4">
            {HAZARD_INSTRUCTIONS.map((instr, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-40 font-mono text-sm px-3 py-2 rounded-lg ${
                  instr.hasHazard && showHazards 
                    ? "bg-red-50 border-2 border-red-300 text-red-700" 
                    : "bg-slate-50 text-slate-600 border border-slate-200"
                }`}>
                  {instr.name}
                </div>
                {instr.hasHazard && showHazards && (
                  <div className="flex items-center gap-2 text-amber-600 text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Depende de {instr.dependsOn} → +{stallsPerHazard} stalls</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual timeline */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex-1">
            <div className="text-slate-500 text-sm mb-3 font-medium">Linea de Tiempo:</div>
            <div className="flex gap-1 items-center flex-wrap">
              {Array.from({ length: showHazards ? actualCycles : idealCycles }).map((_, i) => {
                const isStall = showHazards && (i === 3 || i === 4 || i === 7 || i === 8 || i === 11 || i === 12)
                const isActive = i < currentCycle
                
                return (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isStall 
                        ? isActive
                          ? "bg-amber-400 text-white border-2 border-dashed border-amber-600"
                          : "bg-amber-100 border-2 border-dashed border-amber-300 text-amber-400"
                        : isActive
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {isStall ? "NOP" : `C${i + 1}`}
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500" />
                <span className="text-slate-500">Ciclo productivo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-400 border-2 border-dashed border-amber-600" />
                <span className="text-slate-500">Stall (burbuja)</span>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="mt-4 bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 rounded-xl p-4">
            <div className="text-red-700 font-bold text-sm mb-1">Conclusion:</div>
            <p className="text-slate-700 text-sm">
              El speedup <strong className="text-emerald-600">teorico</strong> de ~{idealSpeedup.toFixed(1)}x se reduce a <strong className="text-red-600">{actualSpeedup.toFixed(2)}x</strong> debido a los data hazards. 
              Tecnicas como <strong className="text-teal-600">forwarding</strong> y <strong className="text-teal-600">branch prediction</strong> ayudan a mitigar estos problemas.
            </p>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={6} totalSlides={7} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   CONCLUSION SLIDE
───────────────────────────────────────────── */
export function ConclusionSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const conclusions = [
    {
      icon: Clock,
      title: "Tiempo de CPU",
      desc: "T = I × CPI × T_ciclo",
      color: "#0d9488",
    },
    {
      icon: Zap,
      title: "Pipeline Mejora el Throughput",
      desc: "Multiples instrucciones en paralelo",
      color: "#7c3aed",
    },
    {
      icon: TrendingUp,
      title: "Speedup = T_mono / T_pipe",
      desc: "Mejora de 2-4x en casos ideales",
      color: "#16a34a",
    },
    {
      icon: AlertTriangle,
      title: "Hazards Limitan el Speedup",
      desc: "El rendimiento real es menor al teorico",
      color: "#ea580c",
    },
  ]

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-teal-50 flex flex-col items-center justify-center p-12 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(13,148,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl w-full z-10 text-center">
        <div className="text-teal-600 font-mono text-xs tracking-widest uppercase mb-3 font-semibold">Resumen Final</div>
        <h2 className="text-4xl font-bold text-slate-800 mb-2">Conclusiones</h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mx-auto mb-10" />

        <div className="grid grid-cols-2 gap-6 mb-10">
          {conclusions.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ borderColor: `${item.color}40` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-slate-800 font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-3">El Pipeline: Mas Complejo, Pero Mas Eficiente</h3>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto">
            Aunque el procesador monociclo es mas simple de diseñar, el pipeline aprovecha mejor el hardware
            ejecutando multiples instrucciones simultaneamente, logrando un mayor throughput.
          </p>
        </div>

        <div className="mt-10 text-slate-400 text-sm font-semibold tracking-wide">
          Los Ingenieros - Proyecto Final Arquitectura del Computador
        </div>
      </div>

      <SlideNavigation slideNumber={7} totalSlides={7} />
    </div>
  )
}
