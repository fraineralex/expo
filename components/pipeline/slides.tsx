"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { 
  Cpu, 
  Clock, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Timer,
  Activity,
  ChevronRight,
  Gauge
} from "lucide-react"

/* ─────────────────────────────────────────────
   SHARED PRESENTER FOOTER
───────────────────────────────────────────── */
function Presenter({ name }: { name: string }) {
  return (
    <div className="absolute bottom-4 right-6 text-slate-400 text-sm font-semibold tracking-wide">
      {name}
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

  // Pipeline animation
  const stages = ["IF", "ID", "EX", "MEM", "WB"]
  const pipelineColors = ["#22d3ee", "#a78bfa", "#f472b6", "#fb923c", "#4ade80"]

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a1a] relative overflow-hidden">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated pipeline stages at top */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-3">
        {stages.map((stage, i) => {
          const isActive = (tick + i) % 8 < 5
          return (
            <div
              key={stage}
              className="flex items-center gap-3"
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 border-2"
                style={{
                  backgroundColor: isActive ? `${pipelineColors[i]}30` : "transparent",
                  borderColor: pipelineColors[i],
                  boxShadow: isActive ? `0 0 25px ${pipelineColors[i]}60` : "none",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
              >
                {stage}
              </div>
              {i < stages.length - 1 && (
                <ChevronRight 
                  className="w-5 h-5 transition-all duration-300"
                  style={{ color: pipelineColors[i], opacity: isActive ? 1 : 0.3 }}
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="max-w-5xl w-full px-16 space-y-8 z-10">
        <div className="space-y-4">
          <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            Arquitectura del Computador · Proyecto Final
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight">
            Comparador de Rendimiento:
            <br />
            <span className="text-cyan-400">Procesador Monociclo</span>
            <br />
            vs <span className="text-purple-400">Pipeline de 5 Etapas</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
        </div>

        <div className="flex gap-3 flex-wrap mt-8">
          {members.map((m, i) => (
            <span
              key={m}
              className="text-xs font-mono text-slate-300 border border-slate-700 px-3 py-1.5 rounded-full bg-slate-800/50 transition-all duration-300 hover:border-cyan-400/50"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="text-slate-500 text-sm font-mono mt-4">Los Ingenieros</div>
      </div>

      {/* Floating formulas */}
      <div className="absolute bottom-24 right-16 text-right space-y-2 opacity-40">
        <div className="font-mono text-cyan-400 text-sm">
          T_CPU = I × CPI × T_ciclo
        </div>
        <div className="font-mono text-purple-400 text-sm">
          Speedup = T_mono / T_pipe
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 1: ALGENIS - Medición de Rendimiento
   Calculadora interactiva de tiempo de CPU
───────────────────────────────────────────── */
export function AlgenisSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [instructions, setInstructions] = useState(1000)
  const [cpi, setCpi] = useState(1)
  const [frequency, setFrequency] = useState(1000) // MHz
  
  const cycleTime = 1 / frequency // microseconds
  const cpuTime = (instructions * cpi) / frequency // microseconds
  const totalCycles = instructions * cpi

  return (
    <div className="w-full h-full bg-[#0a0a1a] flex flex-col p-8 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header */}
      <div className="mb-6 z-10">
        <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">Seccion 01</div>
        <h2 className="text-4xl font-bold text-white">Como se Mide el Rendimiento de un Procesador</h2>
        <div className="h-0.5 w-24 bg-cyan-400 mt-2" />
      </div>

      <div className="flex gap-6 flex-1 min-h-0 z-10">
        {/* Left: Concepts */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
            <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Tiempo de Ejecucion
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              El tiempo que tarda un programa en completarse. Es la metrica mas directa del rendimiento.
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
            <h3 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              CPI (Cycles Per Instruction)
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ciclos promedio necesarios para ejecutar una instruccion. Monociclo: CPI = 1 pero ciclo largo.
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
            <h3 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              Frecuencia del Reloj
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ciclos por segundo (Hz). Mayor frecuencia = ciclos mas cortos = potencialmente mas rapido.
            </p>
          </div>

          {/* Formula box */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 rounded-xl p-5 border border-cyan-500/30 mt-auto">
            <div className="text-white font-semibold mb-3">Formula del Tiempo de CPU:</div>
            <div className="bg-slate-900/80 rounded-lg p-4 font-mono text-center">
              <div className="text-cyan-400 text-lg">
                T<sub>CPU</sub> = I × CPI × T<sub>ciclo</sub>
              </div>
              <div className="text-slate-400 text-sm mt-2">
                T<sub>CPU</sub> = (I × CPI) / f
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Calculator */}
        <div className="flex-1 bg-slate-800/40 rounded-xl p-6 border border-cyan-500/30">
          <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            Calculadora de Tiempo de CPU
          </h3>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Instructions slider */}
            <div className="space-y-3">
              <label className="text-slate-400 text-sm font-medium">Numero de Instrucciones (I)</label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={instructions}
                onChange={(e) => setInstructions(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="text-cyan-400 font-mono text-2xl font-bold">{instructions.toLocaleString()}</div>
            </div>

            {/* CPI slider */}
            <div className="space-y-3">
              <label className="text-slate-400 text-sm font-medium">CPI (Ciclos por Instruccion)</label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={cpi}
                onChange={(e) => setCpi(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
              <div className="text-purple-400 font-mono text-2xl font-bold">{cpi.toFixed(1)}</div>
            </div>

            {/* Frequency slider */}
            <div className="space-y-3">
              <label className="text-slate-400 text-sm font-medium">Frecuencia (MHz)</label>
              <input
                type="range"
                min="100"
                max="4000"
                step="100"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="text-emerald-400 font-mono text-2xl font-bold">{frequency} MHz</div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/60 rounded-xl p-5 text-center border border-slate-700">
              <div className="text-slate-400 text-sm mb-2">Tiempo de Ciclo</div>
              <div className="text-white font-mono text-xl font-bold">
                {(cycleTime * 1000).toFixed(3)} ns
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-5 text-center border border-slate-700">
              <div className="text-slate-400 text-sm mb-2">Total de Ciclos</div>
              <div className="text-white font-mono text-xl font-bold">
                {totalCycles.toLocaleString()}
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl p-5 text-center border border-cyan-500/50">
              <div className="text-cyan-400 text-sm mb-2 font-semibold">Tiempo de CPU</div>
              <div className="text-white font-mono text-2xl font-bold">
                {cpuTime >= 1000 ? `${(cpuTime / 1000).toFixed(2)} ms` : `${cpuTime.toFixed(2)} μs`}
              </div>
            </div>
          </div>

          {/* Live calculation display */}
          <div className="mt-6 bg-slate-900/80 rounded-lg p-4 font-mono text-sm">
            <div className="text-slate-400">
              T<sub>CPU</sub> = ({instructions.toLocaleString()} × {cpi.toFixed(1)}) / {frequency} MHz
            </div>
            <div className="text-cyan-400 mt-1">
              T<sub>CPU</sub> = {totalCycles.toLocaleString()} / {frequency}×10⁶ = <span className="text-white font-bold">{cpuTime.toFixed(4)} μs</span>
            </div>
          </div>
        </div>
      </div>

      <Presenter name="Algenis De los Santos Lopez" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 2: CHRISTOPHER - Procesador Monociclo
   Simulación de ejecución monociclo
───────────────────────────────────────────── */
const MONOCYCLE_INSTRUCTIONS = [
  { name: "ADD R1, R2, R3", type: "R", cycles: 1 },
  { name: "LOAD R4, 0(R1)", type: "I", cycles: 1 },
  { name: "SUB R5, R4, R2", type: "R", cycles: 1 },
  { name: "STORE R5, 4(R1)", type: "I", cycles: 1 },
  { name: "AND R6, R3, R5", type: "R", cycles: 1 },
  { name: "OR R7, R6, R1", type: "R", cycles: 1 },
]

export function ChristopherSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [currentCycle, setCurrentCycle] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [cycleTime] = useState(800) // ns per cycle (monocycle is slow)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalCycles = MONOCYCLE_INSTRUCTIONS.length
  const totalTime = totalCycles * cycleTime

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
    }, 1200)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPrintMode, isRunning, totalCycles])

  return (
    <div className="w-full h-full bg-[#0a0a1a] flex flex-col p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,146,60,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.4) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-6 z-10">
        <div className="text-orange-400 font-mono text-xs tracking-widest uppercase mb-1">Seccion 02</div>
        <h2 className="text-4xl font-bold text-white">Simulacion del Procesador Monociclo</h2>
        <div className="h-0.5 w-24 bg-orange-400 mt-2" />
      </div>

      <div className="flex gap-6 flex-1 min-h-0 z-10">
        {/* Left: Explanation */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="bg-slate-800/60 rounded-xl p-5 border border-orange-500/30">
            <h3 className="text-orange-400 font-semibold mb-3">Caracteristicas del Monociclo</h3>
            <ul className="text-slate-300 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                <span>Cada instruccion se completa en <strong className="text-orange-400">un solo ciclo</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                <span>CPI = 1 (una instruccion por ciclo)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                <span>El ciclo debe ser tan largo como la instruccion mas lenta</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                <span>Desperdicio de tiempo en instrucciones rapidas</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl p-5 border border-orange-500/30">
            <div className="text-white font-semibold mb-2">Tiempo de Ciclo Monociclo:</div>
            <div className="bg-slate-900/80 rounded-lg p-3 font-mono text-center">
              <div className="text-orange-400 text-lg">
                T<sub>ciclo</sub> = {cycleTime} ns
              </div>
              <div className="text-slate-400 text-xs mt-1">
                (determinado por LOAD, la mas lenta)
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700 mt-auto">
            <div className="text-white font-semibold mb-3">Estadisticas:</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                <div className="text-slate-400 text-xs">Ciclos</div>
                <div className="text-orange-400 font-mono text-xl font-bold">{currentCycle}/{totalCycles}</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                <div className="text-slate-400 text-xs">Tiempo Total</div>
                <div className="text-white font-mono text-xl font-bold">{currentCycle * cycleTime} ns</div>
              </div>
            </div>
            {currentCycle === totalCycles && (
              <div className="mt-3 text-center text-emerald-400 text-sm font-semibold">
                Tiempo Final: {totalTime} ns
              </div>
            )}
          </div>
        </div>

        {/* Right: Timeline Simulation */}
        <div className="flex-1 bg-slate-800/40 rounded-xl p-6 border border-orange-500/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-400" />
              Linea de Tiempo - Ejecucion Secuencial
            </h3>
            <div className="flex gap-2">
              {!isRunning ? (
                <button
                  onClick={startSimulation}
                  disabled={currentCycle >= totalCycles}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-400 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Iniciar
                </button>
              ) : (
                <button
                  onClick={pauseSimulation}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold rounded-lg transition-all flex items-center gap-2"
                >
                  <Pause className="w-4 h-4" />
                  Pausar
                </button>
              )}
              <button
                onClick={stepForward}
                disabled={isRunning || currentCycle >= totalCycles}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                Paso
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="space-y-3">
            {/* Cycle header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-40 text-slate-400 text-sm font-medium">Instruccion</div>
              <div className="flex-1 flex">
                {Array.from({ length: totalCycles }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center text-xs font-mono text-slate-500"
                  >
                    C{i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            {MONOCYCLE_INSTRUCTIONS.map((instr, idx) => {
              const isExecuting = currentCycle === idx + 1
              const isCompleted = currentCycle > idx
              
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-40 font-mono text-sm truncate transition-all duration-300 ${
                    isExecuting ? "text-orange-400 font-bold" : isCompleted ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {instr.name}
                  </div>
                  <div className="flex-1 flex gap-1">
                    {Array.from({ length: totalCycles }).map((_, cycleIdx) => {
                      const isThisCycle = cycleIdx === idx
                      const isCurrent = currentCycle === cycleIdx + 1 && isThisCycle
                      const isDone = currentCycle > cycleIdx && isThisCycle

                      return (
                        <div
                          key={cycleIdx}
                          className={`flex-1 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                            isThisCycle 
                              ? isCurrent 
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/50 scale-105"
                                : isDone
                                  ? "bg-orange-600/60 text-white"
                                  : "bg-orange-900/30 border border-orange-500/30 text-orange-400/50"
                              : "bg-slate-800/30"
                          }`}
                        >
                          {isThisCycle && (isDone || isCurrent) && (
                            <span className="flex items-center gap-1">
                              {isCurrent ? "Exec" : <CheckCircle2 className="w-4 h-4" />}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Time scale */}
          <div className="mt-6 flex items-center gap-2">
            <div className="w-40 text-slate-400 text-sm">Tiempo (ns)</div>
            <div className="flex-1 flex">
              {Array.from({ length: totalCycles }).map((_, i) => (
                <div key={i} className="flex-1 text-center text-xs font-mono text-slate-600">
                  {(i + 1) * cycleTime}
                </div>
              ))}
            </div>
          </div>

          {/* Key insight */}
          <div className="mt-6 bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <div className="text-orange-400 font-semibold mb-1">Observacion Clave:</div>
            <p className="text-slate-300 text-sm">
              En monociclo, cada instruccion ocupa todo el ciclo ({cycleTime}ns), aunque instrucciones como ADD 
              solo necesitarian ~200ns. Esto causa <strong className="text-orange-400">desperdicio de tiempo</strong>.
            </p>
          </div>
        </div>
      </div>

      <Presenter name="Christopher Enrique Marrero Liriano" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 3: ENMANUEL - Pipeline de 5 Etapas
   Simulación de pipeline con tabla animada
───────────────────────────────────────────── */
const PIPELINE_STAGES = ["IF", "ID", "EX", "MEM", "WB"]
const STAGE_COLORS = {
  IF: "#22d3ee",
  ID: "#a78bfa", 
  EX: "#f472b6",
  MEM: "#fb923c",
  WB: "#4ade80",
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
  const totalCycles = numInstructions + PIPELINE_STAGES.length - 1 // Pipeline fill + drain
  const cycleTimePipeline = 200 // ns per stage (much faster!)

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
    }, 800)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPrintMode, isRunning, totalCycles])

  // Calculate which stage each instruction is in for current cycle
  const getInstructionStage = (instrIdx: number, cycle: number): string | null => {
    const stageIdx = cycle - instrIdx - 1
    if (stageIdx >= 0 && stageIdx < PIPELINE_STAGES.length) {
      return PIPELINE_STAGES[stageIdx]
    }
    return null
  }

  return (
    <div className="w-full h-full bg-[#0a0a1a] flex flex-col p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.4) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-6 z-10">
        <div className="text-purple-400 font-mono text-xs tracking-widest uppercase mb-1">Seccion 03</div>
        <h2 className="text-4xl font-bold text-white">Simulacion del Pipeline de 5 Etapas</h2>
        <div className="h-0.5 w-24 bg-purple-400 mt-2" />
      </div>

      <div className="flex gap-6 flex-1 min-h-0 z-10">
        {/* Left: Explanation */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="bg-slate-800/60 rounded-xl p-5 border border-purple-500/30">
            <h3 className="text-purple-400 font-semibold mb-3">Etapas del Pipeline</h3>
            <div className="space-y-2">
              {PIPELINE_STAGES.map((stage) => (
                <div key={stage} className="flex items-center gap-3">
                  <div
                    className="w-10 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: STAGE_COLORS[stage as keyof typeof STAGE_COLORS] }}
                  >
                    {stage}
                  </div>
                  <span className="text-slate-300 text-sm">
                    {stage === "IF" && "Instruction Fetch"}
                    {stage === "ID" && "Instruction Decode"}
                    {stage === "EX" && "Execute"}
                    {stage === "MEM" && "Memory Access"}
                    {stage === "WB" && "Write Back"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-5 border border-purple-500/30">
            <div className="text-white font-semibold mb-2">Tiempo de Ciclo Pipeline:</div>
            <div className="bg-slate-900/80 rounded-lg p-3 font-mono text-center">
              <div className="text-purple-400 text-lg">
                T<sub>ciclo</sub> = {cycleTimePipeline} ns
              </div>
              <div className="text-slate-400 text-xs mt-1">
                (solo la etapa mas lenta)
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700 mt-auto">
            <div className="text-white font-semibold mb-3">Estadisticas:</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                <div className="text-slate-400 text-xs">Ciclos</div>
                <div className="text-purple-400 font-mono text-xl font-bold">{currentCycle}/{totalCycles}</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                <div className="text-slate-400 text-xs">Tiempo Total</div>
                <div className="text-white font-mono text-xl font-bold">{currentCycle * cycleTimePipeline} ns</div>
              </div>
            </div>
            {currentCycle === totalCycles && (
              <div className="mt-3 text-center text-emerald-400 text-sm font-semibold">
                Tiempo Final: {totalCycles * cycleTimePipeline} ns
              </div>
            )}
          </div>
        </div>

        {/* Right: Pipeline Table */}
        <div className="flex-1 bg-slate-800/40 rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              Tabla de Pipeline - Ejecucion Paralela
            </h3>
            <div className="flex gap-2">
              {!isRunning ? (
                <button
                  onClick={startSimulation}
                  disabled={currentCycle >= totalCycles}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-400 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Iniciar
                </button>
              ) : (
                <button
                  onClick={pauseSimulation}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold rounded-lg transition-all flex items-center gap-2"
                >
                  <Pause className="w-4 h-4" />
                  Pausar
                </button>
              )}
              <button
                onClick={stepForward}
                disabled={isRunning || currentCycle >= totalCycles}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                Paso
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Pipeline table */}
          <div className="overflow-x-auto">
            <div className="space-y-2">
              {/* Cycle header */}
              <div className="flex items-center gap-1">
                <div className="w-36 text-slate-400 text-sm font-medium shrink-0">Instruccion</div>
                {Array.from({ length: totalCycles }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-12 h-8 flex items-center justify-center text-xs font-mono shrink-0 rounded transition-all duration-300 ${
                      i + 1 === currentCycle ? "bg-purple-500/30 text-purple-300" : "text-slate-600"
                    }`}
                  >
                    C{i + 1}
                  </div>
                ))}
              </div>

              {/* Instructions */}
              {PIPELINE_INSTRUCTIONS.map((instr, instrIdx) => (
                <div key={instrIdx} className="flex items-center gap-1">
                  <div className="w-36 font-mono text-sm text-slate-400 truncate shrink-0">
                    {instr}
                  </div>
                  {Array.from({ length: totalCycles }).map((_, cycleIdx) => {
                    const stage = getInstructionStage(instrIdx, cycleIdx + 1)
                    const isCurrentCycle = cycleIdx + 1 === currentCycle
                    const isPast = cycleIdx + 1 < currentCycle

                    if (!stage) {
                      return (
                        <div
                          key={cycleIdx}
                          className="w-12 h-10 bg-slate-800/20 rounded shrink-0"
                        />
                      )
                    }

                    const color = STAGE_COLORS[stage as keyof typeof STAGE_COLORS]
                    const isActive = isCurrentCycle || isPast

                    return (
                      <div
                        key={cycleIdx}
                        className={`w-12 h-10 rounded flex items-center justify-center text-xs font-bold text-white shrink-0 transition-all duration-300`}
                        style={{
                          backgroundColor: isActive ? color : `${color}30`,
                          boxShadow: isCurrentCycle ? `0 0 15px ${color}80` : "none",
                          transform: isCurrentCycle ? "scale(1.1)" : "scale(1)",
                          opacity: isActive ? 1 : 0.4,
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
          <div className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="text-purple-400 font-semibold mb-1">Observacion Clave:</div>
            <p className="text-slate-300 text-sm">
              Multiples instrucciones se ejecutan <strong className="text-purple-400">simultaneamente</strong> en diferentes etapas.
              Aunque cada instruccion toma 5 ciclos, el <strong className="text-emerald-400">throughput</strong> es de 1 instruccion por ciclo en regimen estacionario.
            </p>
          </div>
        </div>
      </div>

      <Presenter name="Enmanuel Santos Diaz" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 4: FRAINER - Comparación y Speedup
   Comparación lado a lado + Ley de Amdahl
───────────────────────────────────────────── */
export function FrainerSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [numInstructions, setNumInstructions] = useState(6)
  const [parallelPortion, setParallelPortion] = useState(0.7)
  const [numProcessors, setNumProcessors] = useState(4)

  // Monocycle calculations
  const monocycleCycleTime = 800 // ns
  const monocycleTime = numInstructions * monocycleCycleTime

  // Pipeline calculations
  const pipelineCycleTime = 200 // ns
  const pipelineStages = 5
  const pipelineTotalCycles = numInstructions + pipelineStages - 1
  const pipelineTime = pipelineTotalCycles * pipelineCycleTime

  // Speedup calculation
  const speedup = monocycleTime / pipelineTime

  // Amdahl's Law
  const amdahlSpeedup = 1 / ((1 - parallelPortion) + (parallelPortion / numProcessors))

  return (
    <div className="w-full h-full bg-[#0a0a1a] flex flex-col p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-4 z-10">
        <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">Seccion 04</div>
        <h2 className="text-4xl font-bold text-white">Comparacion Directa y Calculo de Speedup</h2>
        <div className="h-0.5 w-24 bg-cyan-400 mt-2" />
      </div>

      <div className="flex gap-4 flex-1 min-h-0 z-10">
        {/* Left: Comparison */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Instruction slider */}
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-300 text-sm">Numero de Instrucciones:</span>
              <span className="text-cyan-400 font-mono text-xl font-bold">{numInstructions}</span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              value={numInstructions}
              onChange={(e) => setNumInstructions(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {/* Monocycle */}
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl p-5 border border-orange-500/30 flex flex-col">
              <h3 className="text-orange-400 font-bold text-lg mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Monociclo
              </h3>
              <div className="space-y-3 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ciclos totales:</span>
                  <span className="text-white font-mono">{numInstructions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tiempo/ciclo:</span>
                  <span className="text-white font-mono">{monocycleCycleTime} ns</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">CPI:</span>
                  <span className="text-white font-mono">1</span>
                </div>
                <div className="h-px bg-slate-700 my-2" />
                <div className="flex justify-between">
                  <span className="text-orange-400 font-semibold">Tiempo Total:</span>
                  <span className="text-orange-400 font-mono text-xl font-bold">{monocycleTime} ns</span>
                </div>
              </div>

              {/* Visual bar */}
              <div className="mt-3">
                <div className="h-6 bg-orange-500/80 rounded-lg flex items-center justify-center text-white text-xs font-bold relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600" />
                  <span className="relative">{monocycleTime} ns</span>
                </div>
              </div>
            </div>

            {/* Pipeline */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-5 border border-purple-500/30 flex flex-col">
              <h3 className="text-purple-400 font-bold text-lg mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Pipeline
              </h3>
              <div className="space-y-3 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ciclos totales:</span>
                  <span className="text-white font-mono">{pipelineTotalCycles}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tiempo/ciclo:</span>
                  <span className="text-white font-mono">{pipelineCycleTime} ns</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Throughput:</span>
                  <span className="text-white font-mono">~1 instr/ciclo</span>
                </div>
                <div className="h-px bg-slate-700 my-2" />
                <div className="flex justify-between">
                  <span className="text-purple-400 font-semibold">Tiempo Total:</span>
                  <span className="text-purple-400 font-mono text-xl font-bold">{pipelineTime} ns</span>
                </div>
              </div>

              {/* Visual bar */}
              <div className="mt-3">
                <div 
                  className="h-6 bg-purple-500/80 rounded-lg flex items-center justify-center text-white text-xs font-bold relative overflow-hidden"
                  style={{ width: `${(pipelineTime / monocycleTime) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                  <span className="relative">{pipelineTime} ns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Speedup result */}
          <div className="bg-gradient-to-r from-cyan-900/40 to-emerald-900/40 rounded-xl p-5 border border-emerald-500/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-400 text-sm mb-1">Formula de Speedup:</div>
                <div className="font-mono text-cyan-400">
                  Speedup = T<sub>mono</sub> / T<sub>pipe</sub> = {monocycleTime} / {pipelineTime}
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-sm mb-1">Resultado:</div>
                <div className="text-4xl font-bold text-emerald-400">{speedup.toFixed(2)}x</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Amdahl's Law */}
        <div className="w-96 bg-slate-800/40 rounded-xl p-5 border border-cyan-500/30 flex flex-col">
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Ley de Amdahl
          </h3>

          <div className="bg-slate-900/80 rounded-lg p-4 font-mono text-center mb-4">
            <div className="text-cyan-400 text-lg">
              S(N) = 1 / ((1-P) + P/N)
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">P (Parte Paralelizable):</span>
                <span className="text-cyan-400 font-mono">{(parallelPortion * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.99"
                step="0.01"
                value={parallelPortion}
                onChange={(e) => setParallelPortion(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">N (Numero de Procesadores):</span>
                <span className="text-purple-400 font-mono">{numProcessors}</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={numProcessors}
                onChange={(e) => setNumProcessors(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Amdahl calculation */}
            <div className="bg-slate-900/60 rounded-lg p-4 mt-4">
              <div className="text-slate-400 text-xs mb-2">Calculo:</div>
              <div className="font-mono text-sm text-slate-300 space-y-1">
                <div>S({numProcessors}) = 1 / ((1-{parallelPortion.toFixed(2)}) + {parallelPortion.toFixed(2)}/{numProcessors})</div>
                <div>S({numProcessors}) = 1 / ({(1-parallelPortion).toFixed(2)} + {(parallelPortion/numProcessors).toFixed(3)})</div>
                <div>S({numProcessors}) = 1 / {((1-parallelPortion) + parallelPortion/numProcessors).toFixed(3)}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-4 border border-cyan-500/50 text-center">
              <div className="text-slate-400 text-sm mb-1">Speedup Maximo (Amdahl):</div>
              <div className="text-3xl font-bold text-cyan-400">{amdahlSpeedup.toFixed(2)}x</div>
            </div>
          </div>

          {/* Example callout */}
          <div className="mt-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
            <div className="text-yellow-400 text-xs font-semibold mb-1">Ejemplo con P=70%, N=4:</div>
            <div className="text-slate-300 text-xs">
              S(4) = 1 / (0.30 + 0.175) = <strong className="text-yellow-400">2.11x</strong>
            </div>
          </div>
        </div>
      </div>

      <Presenter name="Frainer Alexander Encarnacion Valenzuela" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 5: OLIVER - Limitaciones del Pipeline
   Data hazards y stalls
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

  const idealCycles = HAZARD_INSTRUCTIONS.length + 4 // Normal pipeline
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
    }, 600)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPrintMode, isRunning, showHazards, actualCycles, idealCycles])

  return (
    <div className="w-full h-full bg-[#0a0a1a] flex flex-col p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.4) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mb-4 z-10">
        <div className="text-red-400 font-mono text-xs tracking-widest uppercase mb-1">Seccion 05</div>
        <h2 className="text-4xl font-bold text-white">Limitaciones Reales del Pipeline</h2>
        <div className="h-0.5 w-24 bg-red-400 mt-2" />
      </div>

      <div className="flex gap-4 flex-1 min-h-0 z-10">
        {/* Left: Explanation */}
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-slate-800/60 rounded-xl p-5 border border-red-500/30">
            <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Data Hazards (RAW)
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              Ocurren cuando una instruccion necesita un dato que aun no ha sido calculado por una instruccion anterior.
            </p>
            <div className="bg-slate-900/80 rounded-lg p-3 font-mono text-sm">
              <div className="text-slate-400">ADD <span className="text-red-400">R1</span>, R2, R3</div>
              <div className="text-slate-400">SUB R4, <span className="text-red-400">R1</span>, R5  <span className="text-yellow-400">← espera R1</span></div>
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-semibold mb-3">Stalls (Burbujas)</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              El pipeline debe <strong className="text-yellow-400">detenerse</strong> hasta que el dato este disponible. Cada stall agrega ciclos extra.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-yellow-500/30 border-2 border-dashed border-yellow-500 flex items-center justify-center text-yellow-400 text-xs font-bold">
                NOP
              </div>
              <span className="text-slate-400 text-xs">= Burbuja insertada</span>
            </div>
          </div>

          {/* Toggle */}
          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold">Mostrar Hazards:</span>
              <button
                onClick={toggleHazards}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  showHazards 
                    ? "bg-red-500 text-white" 
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {showHazards ? "ON" : "OFF"}
              </button>
            </div>
            <p className="text-slate-400 text-xs">
              Activa para ver como los hazards afectan el rendimiento del pipeline.
            </p>
          </div>

          {/* Stats comparison */}
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-5 border border-slate-700 mt-auto">
            <div className="text-white font-semibold mb-3">Comparacion de Rendimiento:</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Pipeline Ideal:</span>
                <span className="text-emerald-400 font-mono">{idealCycles} ciclos ({idealTime}ns)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Pipeline c/Hazards:</span>
                <span className="text-red-400 font-mono">{actualCycles} ciclos ({actualTime}ns)</span>
              </div>
              <div className="h-px bg-slate-700" />
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Speedup Ideal:</span>
                <span className="text-emerald-400 font-bold">{idealSpeedup.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Speedup Real:</span>
                <span className="text-red-400 font-bold">{actualSpeedup.toFixed(2)}x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Pipeline visualization */}
        <div className="flex-1 bg-slate-800/40 rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6 text-red-400" />
              Pipeline {showHazards ? "con Hazards" : "Ideal"}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={startSimulation}
                disabled={isRunning || currentCycle >= (showHazards ? actualCycles : idealCycles)}
                className="px-4 py-2 bg-red-500 hover:bg-red-400 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Simular
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Instructions with hazard indicators */}
          <div className="space-y-3 mb-6">
            {HAZARD_INSTRUCTIONS.map((instr, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-44 font-mono text-sm px-3 py-2 rounded-lg ${
                  instr.hasHazard && showHazards 
                    ? "bg-red-900/30 border border-red-500/50 text-red-300" 
                    : "bg-slate-800/60 text-slate-300"
                }`}>
                  {instr.name}
                </div>
                {instr.hasHazard && showHazards && (
                  <div className="flex items-center gap-2 text-yellow-400 text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Depende de {instr.dependsOn} → +{stallsPerHazard} stalls</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual timeline */}
          <div className="bg-slate-900/60 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-3">Linea de Tiempo:</div>
            <div className="flex gap-1 items-center flex-wrap">
              {Array.from({ length: showHazards ? actualCycles : idealCycles }).map((_, i) => {
                const isStall = showHazards && (i === 3 || i === 4 || i === 7 || i === 8 || i === 11 || i === 12)
                const isActive = i < currentCycle
                
                return (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isStall 
                        ? isActive
                          ? "bg-yellow-500/60 text-yellow-200 border-2 border-dashed border-yellow-400"
                          : "bg-yellow-900/30 border-2 border-dashed border-yellow-600/50 text-yellow-600"
                        : isActive
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-700 text-slate-500"
                    }`}
                  >
                    {isStall ? "NOP" : `C${i + 1}`}
                  </div>
                )
              })}
            </div>
            <div className="mt-3 flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500" />
                <span className="text-slate-400">Ciclo productivo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-500/60 border-2 border-dashed border-yellow-400" />
                <span className="text-slate-400">Stall (burbuja)</span>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="mt-4 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="text-red-400 font-semibold mb-1">Conclusion:</div>
            <p className="text-slate-300 text-sm">
              El speedup <strong className="text-emerald-400">teorico</strong> de ~4x se reduce a <strong className="text-red-400">{actualSpeedup.toFixed(2)}x</strong> debido 
              a los data hazards. Tecnicas como <strong className="text-cyan-400">forwarding</strong> y <strong className="text-cyan-400">branch prediction</strong> ayudan a mitigar estos problemas.
            </p>
          </div>
        </div>
      </div>

      <Presenter name="Oliver Abreu Mateo" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   CONCLUSION SLIDE
───────────────────────────────────────────── */
export function ConclusionSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [tick, setTick] = useState(0)
  
  useEffect(() => {
    if (isPrintMode) return
    const id = setInterval(() => setTick((t) => t + 1), 100)
    return () => clearInterval(id)
  }, [isPrintMode])

  const conclusions = [
    {
      icon: Clock,
      title: "Tiempo de CPU",
      desc: "T = I × CPI × T_ciclo",
      color: "#22d3ee",
    },
    {
      icon: Zap,
      title: "Pipeline Mejora el Throughput",
      desc: "Multiples instrucciones en paralelo",
      color: "#a78bfa",
    },
    {
      icon: TrendingUp,
      title: "Speedup = T_mono / T_pipe",
      desc: "Mejora de 2-4x en casos ideales",
      color: "#4ade80",
    },
    {
      icon: AlertTriangle,
      title: "Hazards Limitan el Speedup",
      desc: "El rendimiento real es menor al teorico",
      color: "#f97316",
    },
  ]

  return (
    <div className="w-full h-full bg-[#0a0a1a] flex flex-col items-center justify-center p-12 relative overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: `translateY(${tick * 0.5 % 40}px)`,
        }}
      />

      <div className="text-center mb-10 z-10">
        <h2 className="text-5xl font-bold text-white mb-4">Conclusiones</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto" />
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-4xl z-10">
        {conclusions.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="bg-slate-800/60 rounded-xl p-6 border border-slate-700 transition-all duration-500 hover:scale-105"
              style={{
                borderColor: `${item.color}40`,
                boxShadow: `0 0 20px ${item.color}10`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-10 text-center z-10">
        <div className="text-slate-500 font-mono text-sm mb-4">Proyecto Final - Arquitectura del Computador</div>
        <div className="flex gap-3 justify-center flex-wrap">
          {[
            "Algenis De los Santos",
            "Christopher Marrero",
            "Enmanuel Santos",
            "Frainer Encarnacion",
            "Oliver Abreu",
          ].map((name) => (
            <span
              key={name}
              className="text-xs font-mono text-slate-400 border border-slate-700 px-3 py-1 rounded-full bg-slate-800/50"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="text-slate-600 text-sm mt-4 font-mono">Los Ingenieros</div>
      </div>
    </div>
  )
}
