"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import VideoCanvas from "@/components/pipeline/VideoCanvas"
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
   REAL-TIME CPU SIMULATOR with animation
───────────────────────────────────────────── */
type SimulationState = 'idle' | 'running' | 'paused' | 'completed'

export function AlgenisSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  // Parameters
  const [instructions, setInstructions] = useState(1000)
  const [cpi, setCpi] = useState(1)
  const [frequency, setFrequency] = useState(1000)

  // Simulation state
  const [simState, setSimState] = useState<SimulationState>('idle')
  const [currentInstruction, setCurrentInstruction] = useState(0)
  const [currentCycle, setCurrentCycle] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [cycleInInstruction, setCycleInInstruction] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calculated values
  const cycleTime = 1 / frequency // microseconds per cycle
  const totalCycles = Math.round(instructions * cpi)
  const finalCpuTime = (instructions * cpi) / frequency // microseconds

  // Progress percentage
  const progress = totalCycles > 0 ? (currentCycle / totalCycles) * 100 : 0

  // Cycles per instruction (rounded for simulation)
  const cyclesPerInst = Math.round(cpi)

  // Speed multiplier for visualization (processes multiple cycles per tick)
  const getSimSpeed = () => {
    if (totalCycles <= 100) return 1
    if (totalCycles <= 1000) return 10
    if (totalCycles <= 10000) return 100
    return 500
  }

  // Start simulation
  const startSimulation = useCallback(() => {
    if (simState === 'completed') {
      // Reset first if completed
      setCurrentInstruction(0)
      setCurrentCycle(0)
      setElapsedTime(0)
      setCycleInInstruction(0)
    }
    setSimState('running')
  }, [simState])

  // Pause simulation
  const pauseSimulation = useCallback(() => {
    setSimState('paused')
  }, [])

  // Reset simulation
  const resetSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setSimState('idle')
    setCurrentInstruction(0)
    setCurrentCycle(0)
    setElapsedTime(0)
    setCycleInInstruction(0)
  }, [])

  // Step forward one cycle
  const stepForward = useCallback(() => {
    if (currentCycle >= totalCycles) {
      setSimState('completed')
      return
    }

    const newCycle = currentCycle + 1
    setCurrentCycle(newCycle)
    setElapsedTime(newCycle * cycleTime)

    const newCycleInInst = cycleInInstruction + 1
    if (newCycleInInst >= cyclesPerInst) {
      setCurrentInstruction(prev => prev + 1)
      setCycleInInstruction(0)
    } else {
      setCycleInInstruction(newCycleInInst)
    }

    if (newCycle >= totalCycles) {
      setSimState('completed')
    } else if (simState === 'idle') {
      setSimState('paused')
    }
  }, [currentCycle, totalCycles, cycleTime, cycleInInstruction, cyclesPerInst, simState])

  // Simulation loop
  useEffect(() => {
    if (simState === 'running') {
      const speed = getSimSpeed()
      intervalRef.current = setInterval(() => {
        setCurrentCycle(prev => {
          const newCycle = Math.min(prev + speed, totalCycles)
          setElapsedTime(newCycle * cycleTime)

          // Calculate current instruction
          const instNum = Math.floor(newCycle / cyclesPerInst)
          setCurrentInstruction(Math.min(instNum, instructions))
          setCycleInInstruction(newCycle % cyclesPerInst)

          if (newCycle >= totalCycles) {
            setSimState('completed')
            if (intervalRef.current) clearInterval(intervalRef.current)
          }
          return newCycle
        })
      }, 16) // ~60fps
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [simState, totalCycles, cycleTime, cyclesPerInst, instructions])

  // Reset when parameters change
  useEffect(() => {
    resetSimulation()
  }, [instructions, cpi, frequency])

  // Analysis messages based on parameters
  const getAnalysis = () => {
    const analyses: { type: 'info' | 'warning' | 'success'; message: string }[] = []

    // Instructions analysis
    if (instructions >= 5000) {
      analyses.push({ type: 'warning', message: `Alto numero de instrucciones (${instructions.toLocaleString()}): incrementa linealmente el tiempo de CPU.` })
    } else if (instructions <= 500) {
      analyses.push({ type: 'success', message: `Pocas instrucciones (${instructions}): ejecucion rapida, ideal para tareas simples.` })
    } else {
      analyses.push({ type: 'info', message: `${instructions.toLocaleString()} instrucciones: carga de trabajo moderada.` })
    }

    // CPI analysis
    if (cpi >= 3) {
      analyses.push({ type: 'warning', message: `CPI alto (${cpi.toFixed(1)}): instrucciones complejas que requieren multiples ciclos.` })
    } else if (cpi <= 1.5) {
      analyses.push({ type: 'success', message: `CPI bajo (${cpi.toFixed(1)}): procesador eficiente o instrucciones simples.` })
    } else {
      analyses.push({ type: 'info', message: `CPI de ${cpi.toFixed(1)}: balance tipico entre simplicidad y complejidad.` })
    }

    // Frequency analysis
    if (frequency >= 3000) {
      analyses.push({ type: 'success', message: `Alta frecuencia (${frequency} MHz): ciclos muy cortos, mayor rendimiento.` })
    } else if (frequency <= 500) {
      analyses.push({ type: 'warning', message: `Baja frecuencia (${frequency} MHz): ciclos largos, menor rendimiento.` })
    } else {
      analyses.push({ type: 'info', message: `Frecuencia de ${frequency} MHz: rango tipico de procesadores modernos.` })
    }

    return analyses
  }

  const analyses = getAnalysis()

  // Status text and color
  const getStatusInfo = () => {
    switch (simState) {
      case 'idle': return { text: 'Listo para iniciar', color: 'text-slate-500', bg: 'bg-slate-100' }
      case 'running': return { text: 'Ejecutando...', color: 'text-teal-600', bg: 'bg-teal-100' }
      case 'paused': return { text: 'Pausado', color: 'text-amber-600', bg: 'bg-amber-100' }
      case 'completed': return { text: 'Completado', color: 'text-emerald-600', bg: 'bg-emerald-100' }
    }
  }
  const statusInfo = getStatusInfo()

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex flex-col relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ===== HEADER SECTION ===== */}
      <div className="px-6 pt-4 pb-2 z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 bg-teal-500 rounded-full" />
              Seccion 01
            </div>
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              Como se Mide el Rendimiento de un Procesador
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full" />
          </div>
          {/* Presenter badge */}
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-slate-500 text-xs font-medium block">Presentador</span>
            <span className="text-slate-800 text-sm font-semibold">Algenis De los Santos Lopez</span>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex gap-4 flex-1 min-h-0 px-6 pb-3 z-10">

        {/* ===== LEFT PANEL: Theory + Analysis ===== */}
        <div className="w-[280px] flex flex-col gap-2">
          {/* Theory cards - compact */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
            <h3 className="text-teal-600 font-semibold mb-1.5 flex items-center gap-2 text-xs">
              <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center">
                <Timer className="w-3.5 h-3.5 text-teal-500" />
              </div>
              Tiempo de Ejecucion
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed pl-8">
              El tiempo que tarda un programa en completarse. Es la metrica mas directa del rendimiento.
            </p>
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
            <h3 className="text-purple-600 font-semibold mb-1.5 flex items-center gap-2 text-xs">
              <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-purple-500" />
              </div>
              CPI (Cycles Per Instruction)
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed pl-8">
              Ciclos promedio necesarios para ejecutar una instruccion. Monociclo: CPI = 1 pero ciclo largo.
            </p>
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
            <h3 className="text-emerald-600 font-semibold mb-1.5 flex items-center gap-2 text-xs">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Gauge className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              Frecuencia del Reloj
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed pl-8">
              Ciclos por segundo (Hz). Mayor frecuencia = ciclos mas cortos = potencialmente mas rapido.
            </p>
          </div>

          {/* Formula box */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-3 border-2 border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-teal-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-slate-800 font-semibold text-xs">Formula del Tiempo de CPU</span>
            </div>
            <div className="bg-white rounded-lg p-2 font-mono text-center border border-teal-100">
              <div className="text-teal-700 text-sm font-bold">
                T<sub>CPU</sub> = I × CPI × T<sub>ciclo</sub>
              </div>
              <div className="text-slate-500 text-xs mt-1 border-t border-slate-100 pt-1">
                T<sub>CPU</sub> = (I × CPI) / f
              </div>
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-slate-800 font-semibold text-xs">Analisis de Rendimiento</span>
            </div>
            <div className="space-y-1.5 flex-1 overflow-auto">
              {analyses.map((analysis, idx) => (
                <div
                  key={idx}
                  className={`text-xs p-2 rounded-lg flex items-start gap-2 ${analysis.type === 'success' ? 'bg-emerald-50 text-emerald-700' :
                      analysis.type === 'warning' ? 'bg-amber-50 text-amber-700' :
                        'bg-slate-50 text-slate-600'
                    }`}
                >
                  {analysis.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
                  {analysis.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
                  {analysis.type === 'info' && <Activity className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
                  <span className="leading-tight">{analysis.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== RIGHT PANEL: Simulator ===== */}
        <div className="flex-1 bg-white rounded-2xl border-2 border-teal-200 shadow-lg flex flex-col overflow-hidden">

          {/* Simulator Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white text-base font-bold">Simulador de Tiempo de CPU</h3>
                <p className="text-teal-100 text-xs">Visualiza el procesamiento de instrucciones en tiempo real</p>
              </div>
            </div>
            {/* Status Badge */}
            <div className={`${statusInfo.bg} ${statusInfo.color} px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2`}>
              {simState === 'running' && <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />}
              {simState === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {statusInfo.text}
            </div>
          </div>

          {/* Simulator Body */}
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-auto">

            {/* ===== CONTROL BUTTONS ===== */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={simState === 'running' ? pauseSimulation : startSimulation}
                disabled={simState === 'completed' && currentCycle >= totalCycles}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${simState === 'running'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-teal-500 hover:bg-teal-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
              >
                {simState === 'running' ? (
                  <><Pause className="w-4 h-4" /> Pausar</>
                ) : (
                  <><Play className="w-4 h-4" /> {simState === 'completed' ? 'Reiniciar' : 'Iniciar'}</>
                )}
              </button>
              <button
                onClick={stepForward}
                disabled={simState === 'running' || currentCycle >= totalCycles}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SkipForward className="w-4 h-4" /> Paso
              </button>
              <button
                onClick={resetSimulation}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Reiniciar
              </button>
            </div>

            {/* ===== PROGRESS BAR ===== */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Progreso de Ejecucion</span>
                <span className="text-teal-600 font-mono text-sm font-bold">{progress.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-100 relative"
                  style={{ width: `${progress}%` }}
                >
                  {simState === 'running' && (
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-slate-500">
                <span>Instruccion {currentInstruction.toLocaleString()} de {instructions.toLocaleString()}</span>
                <span>Ciclo {currentCycle.toLocaleString()} de {totalCycles.toLocaleString()}</span>
              </div>
            </div>

            {/* ===== CONTROLS ROW ===== */}
            <div className="grid grid-cols-3 gap-3">
              {/* Instructions Control */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <label className="text-slate-600 text-xs font-semibold uppercase tracking-wide block mb-2">
                  Instrucciones (I)
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={instructions}
                  onChange={(e) => setInstructions(Number(e.target.value))}
                  disabled={simState === 'running'}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500 mb-2 disabled:opacity-50"
                />
                <div className="text-center">
                  <span className="text-teal-600 font-mono text-xl font-bold">{instructions.toLocaleString()}</span>
                </div>
              </div>

              {/* CPI Control */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <label className="text-slate-600 text-xs font-semibold uppercase tracking-wide block mb-2">
                  CPI (Ciclos/Inst)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={cpi}
                  onChange={(e) => setCpi(Number(e.target.value))}
                  disabled={simState === 'running'}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500 mb-2 disabled:opacity-50"
                />
                <div className="text-center">
                  <span className="text-purple-600 font-mono text-xl font-bold">{cpi.toFixed(1)}</span>
                </div>
              </div>

              {/* Frequency Control */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <label className="text-slate-600 text-xs font-semibold uppercase tracking-wide block mb-2">
                  Frecuencia (MHz)
                </label>
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="100"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  disabled={simState === 'running'}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-2 disabled:opacity-50"
                />
                <div className="text-center">
                  <span className="text-emerald-600 font-mono text-xl font-bold">{frequency}</span>
                </div>
              </div>
            </div>

            {/* ===== LIVE METRICS ===== */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Ciclo Actual</div>
                <div className="text-slate-800 font-mono text-lg font-bold">
                  {currentCycle.toLocaleString()}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Tiempo de Ciclo</div>
                <div className="text-slate-800 font-mono text-lg font-bold">
                  {(cycleTime * 1000).toFixed(2)} <span className="text-xs text-slate-400">ns</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200">
                <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Total Ciclos</div>
                <div className="text-slate-800 font-mono text-lg font-bold">
                  {totalCycles.toLocaleString()}
                </div>
              </div>
              {/* Highlighted CPU Time */}
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl p-3 text-center shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-teal-100 text-xs font-semibold uppercase tracking-wide mb-1">Tiempo CPU</div>
                  <div className="text-white font-mono text-lg font-bold">
                    {simState === 'idle'
                      ? (finalCpuTime >= 1000 ? `${(finalCpuTime / 1000).toFixed(2)} ms` : `${finalCpuTime.toFixed(2)} μs`)
                      : (elapsedTime >= 1000 ? `${(elapsedTime / 1000).toFixed(2)} ms` : `${elapsedTime.toFixed(2)} μs`)
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* ===== STEP-BY-STEP FORMULA ===== */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-md bg-teal-100 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-teal-600" />
                </div>
                <span className="text-slate-700 text-xs font-semibold">Calculo en Tiempo Real</span>
              </div>
              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                <div className="bg-white rounded-lg p-2 border border-slate-100">
                  <div className="text-slate-400 text-xs mb-0.5">Formula</div>
                  <div className="text-slate-700">T = (I × CPI) / f</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-slate-100">
                  <div className="text-slate-400 text-xs mb-0.5">Valores</div>
                  <div className="text-teal-600">
                    ({instructions.toLocaleString()} × {cpi.toFixed(1)}) / {frequency}M
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-slate-100">
                  <div className="text-slate-400 text-xs mb-0.5">Ciclos Totales</div>
                  <div className="text-purple-600">{totalCycles.toLocaleString()} ciclos</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-2 border border-teal-200">
                  <div className="text-teal-600 text-xs mb-0.5">Resultado</div>
                  <div className="text-teal-700 font-bold">
                    {finalCpuTime >= 1000 ? `${(finalCpuTime / 1000).toFixed(4)} ms` : `${finalCpuTime.toFixed(4)} μs`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlideNavigation slideNumber={2} totalSlides={8} />
    </div>
  )
}

/* ─────────────────────��─────────��─────────�������───
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
                  <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isExecuting ? "bg-orange-50 ring-2 ring-orange-400" :
                      isCompleted ? "bg-slate-50" : "bg-white border border-slate-100"
                    }`}>
                    {/* Instruction name */}
                    <div className="w-16 shrink-0 text-center">
                      <div className={`font-mono text-lg font-bold ${isExecuting ? "text-orange-600" : isCompleted ? "text-slate-600" : "text-slate-300"
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
          <div className={`rounded-xl p-3 text-center transition-all duration-300 ${currentCycle === totalInstructions
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
  const [speed, setSpeed] = useState(800)
  const [hoveredStation, setHoveredStation] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Pipeline configuration
  const PLATE_COLORS = ["#0d9488", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#2563eb"]
  const PLATE_NAMES = ["Taco", "Burger", "Pizza", "Sushi", "Pasta", "Wrap"]
  const totalCycles = 10
  const cycleTimePipeline = 200

  // Kitchen stations configuration
  const KITCHEN_STATIONS = [
    { stage: "IF", name: "Recepcion", desc: "Aqui el CPU esta en etapa IF: el mesero recibe la orden, equivalente a buscar la instruccion en memoria.", icon: "tablet", color: "#8b5cf6" },
    { stage: "ID", name: "Preparacion", desc: "Aqui el CPU esta en etapa ID: el chef identifica ingredientes, equivalente a decodificar la instruccion.", icon: "knife", color: "#ec4899" },
    { stage: "EX", name: "Cocina", desc: "Aqui el CPU esta en etapa EX: se cocina el plato, equivalente a ejecutar la operacion matematica.", icon: "fire", color: "#f97316" },
    { stage: "MEM", name: "Almacen", desc: "Aqui el CPU esta en etapa MEM: se accede al almacen de salsas, equivalente a acceder a memoria.", icon: "fridge", color: "#06b6d4" },
    { stage: "WB", name: "Despacho", desc: "Aqui el CPU esta en etapa WB: se entrega el plato al cliente, equivalente a escribir el resultado.", icon: "bell", color: "#22c55e" },
  ]

  // Calculate completed instructions and throughput
  const completedInstructions = Math.max(0, currentCycle - PIPELINE_STAGES.length + 1)
  const throughput = currentCycle > 0 ? (completedInstructions / currentCycle).toFixed(2) : "0.00"
  const efficiency = currentCycle >= 5 ? Math.min(100, Math.round((completedInstructions / currentCycle) * 100)) : Math.round((currentCycle / 5) * 100)

  // Get active plates at each station
  const getPlatesAtStation = (stationIdx: number) => {
    const plates: { instrIdx: number; name: string; color: string }[] = []
    PIPELINE_INSTRUCTIONS.forEach((_, instrIdx) => {
      const stageIdx = currentCycle - instrIdx - 1
      if (stageIdx === stationIdx) {
        plates.push({ instrIdx, name: PLATE_NAMES[instrIdx], color: PLATE_COLORS[instrIdx] })
      }
    })
    return plates
  }

  // Detect hazards
  const hasDataHazard = currentCycle >= 2 && currentCycle <= 4

  const startSimulation = useCallback(() => {
    if (currentCycle >= totalCycles) setCurrentCycle(0)
    setIsRunning(true)
  }, [currentCycle])

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
  }, [currentCycle])

  const stepBackward = useCallback(() => {
    if (currentCycle > 0) setCurrentCycle((c) => c - 1)
  }, [currentCycle])

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
    }, speed)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPrintMode, isRunning, speed])

  const getInstructionStage = (instrIdx: number, cycle: number): string | null => {
    const stageIdx = cycle - instrIdx - 1
    if (stageIdx >= 0 && stageIdx < PIPELINE_STAGES.length) return PIPELINE_STAGES[stageIdx]
    return null
  }

  // SVG Components for stations
  const TabletIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 40 50" className="w-8 h-10">
      <rect x="5" y="2" width="30" height="46" rx="3" fill={active ? "#8b5cf6" : "#94a3b8"} opacity={active ? 1 : 0.4} />
      <rect x="8" y="6" width="24" height="32" rx="1" fill={active ? "#c4b5fd" : "#cbd5e1"} />
      <circle cx="20" cy="44" r="2" fill={active ? "#ede9fe" : "#e2e8f0"} />
      {active && (
        <>
          <rect x="10" y="10" width="20" height="3" fill="#8b5cf6" opacity="0.8" className="animate-pulse" />
          <rect x="10" y="16" width="15" height="2" fill="#a78bfa" opacity="0.6" />
          <rect x="10" y="20" width="18" height="2" fill="#a78bfa" opacity="0.6" />
        </>
      )}
    </svg>
  )

  const KnifeIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 50 40" className="w-10 h-8">
      <rect x="5" y="25" width="40" height="12" rx="2" fill={active ? "#fbbf24" : "#94a3b8"} opacity={active ? 1 : 0.4} />
      <path d="M10 25 L10 10 Q25 5 40 10 L40 25 Z" fill={active ? "#ec4899" : "#94a3b8"} opacity={active ? 1 : 0.4} />
      {active && (
        <g className="animate-[chop_0.3s_ease-in-out_infinite]">
          <line x1="15" y1="8" x2="15" y2="3" stroke="#fbbf24" strokeWidth="2" />
          <line x1="25" y1="5" x2="25" y2="0" stroke="#fbbf24" strokeWidth="2" />
          <line x1="35" y1="8" x2="35" y2="3" stroke="#fbbf24" strokeWidth="2" />
        </g>
      )}
    </svg>
  )

  const FireIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 50 50" className="w-10 h-10">
      <rect x="5" y="35" width="40" height="12" rx="2" fill={active ? "#374151" : "#94a3b8"} opacity={active ? 1 : 0.4} />
      <ellipse cx="25" cy="38" rx="15" ry="3" fill={active ? "#1f2937" : "#64748b"} />
      {active && (
        <>
          <path d="M15 35 Q12 25 18 20 Q15 28 20 30 Q18 22 25 15 Q22 25 28 28 Q25 20 32 18 Q28 28 35 30 Q32 22 38 25 Q35 30 35 35" 
            fill="#f97316" className="animate-[flame_0.5s_ease-in-out_infinite]" />
          <path d="M20 35 Q18 28 22 24 Q20 30 28 28 Q25 32 30 35" 
            fill="#fbbf24" className="animate-[flame_0.4s_ease-in-out_infinite]" style={{ animationDelay: "0.1s" }} />
          <circle cx="18" cy="32" r="1" fill="#fef3c7" className="animate-ping" style={{ animationDuration: "1s" }} />
          <circle cx="32" cy="30" r="1" fill="#fef3c7" className="animate-ping" style={{ animationDuration: "0.8s", animationDelay: "0.2s" }} />
        </>
      )}
    </svg>
  )

  const FridgeIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 40 55" className="w-8 h-11">
      <rect x="5" y="2" width="30" height="50" rx="3" fill={active ? "#06b6d4" : "#94a3b8"} opacity={active ? 1 : 0.4} />
      <rect x="8" y="5" width="24" height="18" rx="1" fill={active ? "#0891b2" : "#64748b"} />
      <rect x="8" y="26" width="24" height="23" rx="1" fill={active ? "#0891b2" : "#64748b"} />
      <rect x="28" y="12" width="3" height="6" rx="1" fill={active ? "#cffafe" : "#cbd5e1"} />
      <rect x="28" y="35" width="3" height="8" rx="1" fill={active ? "#cffafe" : "#cbd5e1"} />
      {active && (
        <>
          <rect x="10" y="8" width="8" height="4" rx="1" fill="#67e8f9" className="animate-pulse" />
          <rect x="10" y="30" width="10" height="6" rx="1" fill="#67e8f9" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
          <circle cx="15" cy="40" r="3" fill="#a5f3fc" opacity="0.6" className="animate-ping" style={{ animationDuration: "2s" }} />
        </>
      )}
    </svg>
  )

  const BellIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 50 45" className="w-10 h-9">
      <ellipse cx="25" cy="40" rx="20" ry="4" fill={active ? "#374151" : "#94a3b8"} opacity={active ? 1 : 0.4} />
      <path d="M10 40 Q10 15 25 10 Q40 15 40 40" fill={active ? "#fbbf24" : "#94a3b8"} opacity={active ? 1 : 0.4} />
      <circle cx="25" cy="8" r="4" fill={active ? "#fbbf24" : "#94a3b8"} opacity={active ? 1 : 0.4} />
      {active && (
        <>
          <ellipse cx="25" cy="25" rx="10" ry="8" fill="#fef3c7" opacity="0.3" className="animate-pulse" />
          <circle cx="42" cy="15" r="2" fill="#22c55e" className="animate-ping" />
          <text x="38" y="12" fontSize="8" fill="#22c55e" fontWeight="bold" className="animate-bounce">!</text>
        </>
      )}
    </svg>
  )

  const StationIcon = ({ type, active }: { type: string; active: boolean }) => {
    switch (type) {
      case "tablet": return <TabletIcon active={active} />
      case "knife": return <KnifeIcon active={active} />
      case "fire": return <FireIcon active={active} />
      case "fridge": return <FridgeIcon active={active} />
      case "bell": return <BellIcon active={active} />
      default: return null
    }
  }

  // Chef SVG component
  const ChefAvatar = ({ active, confused }: { active: boolean; confused?: boolean }) => (
    <svg viewBox="0 0 30 35" className={`w-6 h-7 ${active ? "animate-[work_0.5s_ease-in-out_infinite]" : ""}`}>
      {/* Chef hat */}
      <ellipse cx="15" cy="8" rx="10" ry="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="8" y="6" width="14" height="8" fill="white" />
      {/* Face */}
      <circle cx="15" cy="18" r="7" fill="#fcd9b6" />
      {/* Eyes */}
      {confused ? (
        <>
          <text x="11" y="18" fontSize="5" fill="#374151">?</text>
          <text x="17" y="18" fontSize="5" fill="#374151">?</text>
        </>
      ) : (
        <>
          <circle cx="12" cy="17" r="1.5" fill="#374151" />
          <circle cx="18" cy="17" r="1.5" fill="#374151" />
        </>
      )}
      {/* Smile/expression */}
      {active && !confused && (
        <path d="M12 21 Q15 24 18 21" stroke="#374151" strokeWidth="1" fill="none" />
      )}
      {confused && (
        <path d="M12 22 Q15 20 18 22" stroke="#374151" strokeWidth="1" fill="none" />
      )}
      {/* Body */}
      <rect x="10" y="25" width="10" height="8" rx="2" fill="white" stroke="#e2e8f0" strokeWidth="1" />
    </svg>
  )

  // Plate component
  const Plate = ({ name, color, exiting }: { name: string; color: string; exiting?: boolean }) => (
    <div 
      className={`absolute flex flex-col items-center transition-all duration-500 ${exiting ? "animate-[fadeOut_0.5s_ease-out_forwards]" : "animate-[slideIn_0.3s_ease-out]"}`}
      style={{ bottom: "100%", left: "50%", transform: "translateX(-50%)" }}
    >
      {/* Speech bubble with instruction name */}
      <div 
        className="px-2 py-0.5 rounded-full text-white text-xs font-bold mb-1 shadow-lg"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
      {/* Plate */}
      <div className="relative">
        <svg viewBox="0 0 40 20" className="w-10 h-5">
          <ellipse cx="20" cy="15" rx="18" ry="5" fill="#d1d5db" />
          <ellipse cx="20" cy="12" rx="16" ry="8" fill="#f3f4f6" />
          <ellipse cx="20" cy="10" rx="12" ry="5" fill={color} opacity="0.3" />
        </svg>
      </div>
    </div>
  )

  return (
    <div className={`w-full h-full flex flex-col p-4 relative overflow-hidden transition-all duration-500 ${hasDataHazard ? "bg-red-50" : "bg-gradient-to-br from-purple-50 via-white to-pink-50"}`}>
      <Presenter name="Enmanuel Santos Diaz" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Header */}
      <div className="mb-2 z-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-purple-600 font-mono text-xs tracking-widest uppercase font-semibold">Seccion 03</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Pipeline de 5 Etapas: La Cocina Industrial</h2>
        <div className="h-1 w-40 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mt-1 rounded-full" />
      </div>

      {/* Main content */}
      <div className="flex gap-3 flex-1 min-h-0 z-10">
        {/* Left sidebar - HUD Panel */}
        <div className="w-48 flex flex-col gap-2">
          {/* Restaurant HUD */}
          <div className="bg-white rounded-xl p-3 border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-slate-800 font-bold text-xs">Panel de Control</span>
            </div>
            
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-100">
                <div className="text-slate-500 text-xs">Pedidos Completados</div>
                <div className="text-2xl font-black text-purple-600 font-mono">{completedInstructions}</div>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-2 border border-teal-100">
                <div className="text-slate-500 text-xs">Eficiencia Cocina</div>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold text-teal-600 font-mono">{efficiency}%</div>
                  <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-2 border border-orange-100">
                <div className="text-slate-500 text-xs">Throughput</div>
                <div className="text-xl font-bold text-orange-600 font-mono">{throughput} <span className="text-xs text-slate-400">platos/ciclo</span></div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                <div className="text-slate-500 text-xs">Ciclo Actual</div>
                <div className="text-3xl font-black text-slate-800 font-mono">{currentCycle}<span className="text-sm text-slate-400">/{totalCycles}</span></div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl p-3 border-2 border-purple-200 shadow-lg">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {!isRunning ? (
                <button onClick={startSimulation} className="flex-1 px-2 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg flex items-center justify-center gap-1 text-xs transition-all">
                  <Play className="w-3 h-3" /> Play
                </button>
              ) : (
                <button onClick={pauseSimulation} className="flex-1 px-2 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg flex items-center justify-center gap-1 text-xs transition-all">
                  <Pause className="w-3 h-3" /> Pausa
                </button>
              )}
              <button onClick={resetSimulation} className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-all">
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-1">
              <button onClick={stepBackward} disabled={isRunning || currentCycle <= 0} className="flex-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-lg text-xs transition-all">
                <ChevronLeft className="w-3 h-3 mx-auto" />
              </button>
              <button onClick={stepForward} disabled={isRunning || currentCycle >= totalCycles} className="flex-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-lg text-xs transition-all">
                <ChevronRight className="w-3 h-3 mx-auto" />
              </button>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Velocidad</span>
                <span>{speed}ms</span>
              </div>
              <input
                type="range"
                min="300"
                max="1500"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>

          {/* Visual Sound Labels */}
          <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 mb-1">Estado de la Cocina</div>
            {currentCycle === 0 ? (
              <div className="text-sm font-bold text-slate-400">Esperando ordenes...</div>
            ) : currentCycle >= 5 ? (
              <div className="text-sm font-bold text-green-600 animate-pulse">Plato sale!</div>
            ) : (
              <div className="text-sm font-bold text-orange-500">Oido cocina!</div>
            )}
          </div>
        </div>

        {/* Main Kitchen Visualization */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Kitchen Floor */}
          <div className={`flex-1 bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-2 ${hasDataHazard ? "border-red-300 shadow-red-200" : "border-amber-200"} shadow-lg p-4 relative overflow-hidden transition-all duration-500`}>
            
            {/* Hazard Alert Overlay */}
            {hasDataHazard && (
              <div className="absolute inset-0 bg-red-500/10 pointer-events-none z-20 animate-pulse" style={{ animationDuration: "1s" }} />
            )}

            {/* Kitchen Title */}
            <div className="absolute top-2 left-3 flex items-center gap-2">
              <div className="px-3 py-1 bg-white rounded-full shadow-md border border-amber-200">
                <span className="text-amber-700 font-bold text-xs">COCINA PIPELINE - 5 ESTACIONES</span>
              </div>
              {hasDataHazard && (
                <div className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold animate-bounce flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> ALERTA HAZARD
                </div>
              )}
            </div>

            {/* Conveyor Belt */}
            <div className="absolute bottom-16 left-8 right-8 h-4 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 rounded-full shadow-inner overflow-hidden">
              {/* Metallic reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent h-1/2" />
              {/* Moving belt texture */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, #64748b 0px, #64748b 10px, transparent 10px, transparent 20px)",
                  animation: isRunning ? "conveyorBelt 1s linear infinite" : "none"
                }}
              />
            </div>

            {/* Kitchen Stations */}
            <div className="flex justify-between items-end h-full pt-8 pb-20 px-4 relative">
              {KITCHEN_STATIONS.map((station, idx) => {
                const plates = getPlatesAtStation(idx)
                const isActive = plates.length > 0
                const isConfused = hasDataHazard && (idx === 1 || idx === 2) // ID and EX stages affected by hazard
                
                return (
                  <div 
                    key={station.stage} 
                    className="flex flex-col items-center relative group"
                    onMouseEnter={() => setHoveredStation(station.stage)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    {/* Tooltip */}
                    {hoveredStation === station.stage && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-30 pointer-events-none">
                        <div className="font-bold text-amber-400 mb-1">{station.name} ({station.stage})</div>
                        <p className="leading-relaxed">{station.desc}</p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
                      </div>
                    )}

                    {/* Plates on this station */}
                    {plates.map((plate, pIdx) => (
                      <Plate key={pIdx} name={plate.name} color={plate.color} />
                    ))}

                    {/* Chef Avatar */}
                    <div className="mb-1">
                      <ChefAvatar active={isActive} confused={isConfused} />
                    </div>

                    {/* Station */}
                    <div 
                      className={`relative p-3 rounded-xl border-2 transition-all duration-500 cursor-pointer ${
                        isActive 
                          ? "scale-110 shadow-xl" 
                          : "opacity-60 scale-95"
                      } ${isConfused ? "border-red-400 bg-red-50" : ""}`}
                      style={{
                        backgroundColor: isActive && !isConfused ? `${station.color}15` : isConfused ? undefined : "white",
                        borderColor: isConfused ? undefined : isActive ? station.color : "#e2e8f0",
                        boxShadow: isActive && !isConfused ? `0 8px 30px ${station.color}30` : undefined
                      }}
                    >
                      {/* Particle effects */}
                      {isActive && station.stage === "EX" && !isConfused && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i}
                              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                              style={{ 
                                left: `${(i - 2) * 8}px`, 
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: "0.8s"
                              }}
                            />
                          ))}
                        </div>
                      )}
                      {isActive && station.stage === "MEM" && !isConfused && (
                        <div className="absolute inset-0 rounded-xl bg-cyan-400/20 animate-pulse" style={{ animationDuration: "0.5s" }} />
                      )}
                      {isActive && station.stage === "WB" && !isConfused && (
                        <div className="absolute inset-0 rounded-xl bg-green-400/30 animate-pulse" />
                      )}

                      <StationIcon type={station.icon} active={isActive} />
                    </div>

                    {/* Station Label */}
                    <div className="mt-2 text-center">
                      <div 
                        className={`text-xs font-bold transition-colors duration-300 ${isConfused ? "text-red-600" : isActive ? "text-slate-800" : "text-slate-400"}`}
                        style={{ color: isActive && !isConfused ? station.color : undefined }}
                      >
                        {station.stage}
                      </div>
                      <div className={`text-xs transition-colors duration-300 ${isActive ? "text-slate-600" : "text-slate-400"}`}>
                        {station.name}
                      </div>
                    </div>

                    {/* Stage color indicator */}
                    <div 
                      className={`mt-1 w-full h-1 rounded-full transition-all duration-300 ${isActive ? "opacity-100" : "opacity-30"}`}
                      style={{ backgroundColor: station.color }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Gantt Chart - Compact */}
          <div className="bg-white rounded-xl p-3 border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span className="text-slate-800 font-bold text-xs">Diagrama de Gantt - Ejecucion Paralela</span>
            </div>
            <div className="overflow-x-auto">
              <div className="space-y-1">
                {/* Header */}
                <div className="flex items-center gap-0.5">
                  <div className="w-24 text-slate-400 text-xs shrink-0">Instruccion</div>
                  {Array.from({ length: totalCycles }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-5 flex items-center justify-center text-xs font-mono shrink-0 rounded transition-all ${
                        i + 1 === currentCycle 
                          ? "bg-purple-500 text-white font-bold scale-110" 
                          : i + 1 < currentCycle 
                            ? "text-purple-400 bg-purple-50" 
                            : "text-slate-300 bg-slate-50"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                {/* Instructions */}
                {PIPELINE_INSTRUCTIONS.map((instr, instrIdx) => (
                  <div key={instrIdx} className="flex items-center gap-0.5">
                    <div 
                      className="w-24 font-mono text-xs truncate shrink-0 px-1 py-0.5 rounded border"
                      style={{ 
                        borderColor: PLATE_COLORS[instrIdx],
                        backgroundColor: `${PLATE_COLORS[instrIdx]}10`
                      }}
                    >
                      {instr.split(" ")[0]}
                    </div>
                    {Array.from({ length: totalCycles }).map((_, cycleIdx) => {
                      const stage = getInstructionStage(instrIdx, cycleIdx + 1)
                      const isActive = cycleIdx + 1 <= currentCycle
                      if (!stage) return <div key={cycleIdx} className="w-8 h-5 bg-slate-50 rounded shrink-0" />
                      const stageColor = STAGE_COLORS[stage as keyof typeof STAGE_COLORS]
                      return (
                        <div 
                          key={cycleIdx} 
                          className="w-8 h-5 rounded flex items-center justify-center text-xs font-bold text-white shrink-0 transition-all"
                          style={{
                            backgroundColor: isActive ? stageColor : `${stageColor}30`,
                            opacity: isActive ? 1 : 0.3,
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
          </div>

          {/* Hazard Info Panel */}
          {hasDataHazard && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-2 border-2 border-red-200 shadow-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <div className="flex-1">
                  <span className="text-red-700 font-bold text-xs">Data Hazard RAW: </span>
                  <span className="text-red-600 text-xs">LOAD R4 seguido de SUB R5, R4, R2. El chef de preparacion espera ingredientes que aun no estan listos.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes conveyorBelt {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }
        @keyframes work {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes chop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes flame {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.1); }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fadeOut {
          0% { opacity: 1; transform: translateX(-50%) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) scale(0.8) translateY(-10px); }
        }
      `}</style>

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
  { id: "compress", name: "Comprimir Imagen", icon: Image, monoInstructions: 100, pipeInstructions: 100, description: "Compresion JPEG 1920x1080", visualType: "image" as const, monoDuration: 7200, pipeDuration: 1800 },
  { id: "copy", name: "Copiar Archivo", icon: FileText, monoInstructions: 80, pipeInstructions: 80, description: "Duplicar archivo de 10MB", visualType: "file" as const, monoDuration: 5600, pipeDuration: 1400 },
  { id: "query", name: "Consulta DB", icon: Database, monoInstructions: 60, pipeInstructions: 60, description: "SELECT con JOIN complejo", visualType: "database" as const, monoDuration: 4800, pipeDuration: 1600 },
  { id: "email", name: "Procesar Emails", icon: Mail, monoInstructions: 90, pipeInstructions: 90, description: "Filtrar 100 correos spam", visualType: "email" as const, monoDuration: 9000, pipeDuration: 1800 },
  { id: "video", name: "Renderizar Video", icon: Video, monoInstructions: 120, pipeInstructions: 120, description: "Transcoding 4K 30fps", visualType: "video" as const, monoDuration: 12000, pipeDuration: 2400 },
  { id: "zip", name: "Crear ZIP", icon: Archive, monoInstructions: 100, pipeInstructions: 100, description: "Comprimir 50 archivos", visualType: "archive" as const, monoDuration: 6400, pipeDuration: 1600 },
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
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === tab.id ? "bg-teal-500 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
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
                                    <div key={i} className={`rounded transition-all duration-200 ${processed ? "bg-transparent" : "bg-slate-300/60"
                                      }`} />
                                  )
                                })}
                              </div>
                            )}
                            {/* Status label */}
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-sm font-bold ${rwMonoProgress === 0 ? "bg-blue-500 text-white" :
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
                                {[0, 1, 2].map(i => (
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
                            <FileText className={`w-16 h-16 transition-all ${rwMonoProgress >= 100 ? "text-emerald-500" :
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
                              <Database className={`w-16 h-16 mx-auto mb-2 ${rwMonoProgress >= 100 ? "text-emerald-500" : "text-orange-500"
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
                              <div key={i} className={`flex-1 h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${rwMonoStage === i ? "bg-orange-500 text-white scale-105" :
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

                      {/* VIDEO RENDERING MONO — real canvas animation at 6 fps = visibly choppy + pixelated */}
                      {selectedTask.visualType === "video" && (() => {
                        const MONO_FPS = 6
                        const TOTAL_FRAMES = 30
                        // quality 0.13 → internal buffer is ~42×23 px, stretched to full size = very blocky
                        const MONO_QUALITY = 0.13
                        const renderedFrames = Math.floor((rwMonoProgress / 100) * TOTAL_FRAMES)
                        return (
                          <div className="absolute inset-0 p-2 flex flex-col gap-1.5">
                            {/* Canvas preview */}
                            <div className="flex-1 relative rounded-lg overflow-hidden border-2 border-orange-500 bg-black">
                              <VideoCanvas
                                fps={MONO_FPS}
                                quality={MONO_QUALITY}
                                running={rwIsRunning && selectedTask.visualType === "video"}
                                accentColor="#f97316"
                                label={rwMonoProgress === 0 ? "EN ESPERA" : rwMonoProgress >= 100 ? "LISTO" : "RENDERIZANDO"}
                                badgeColor={rwMonoProgress >= 100 ? "#ea580c" : "#dc2626"}
                              />
                              {/* HUD overlaid on top of canvas */}
                              <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                  <div className="bg-black/80 text-orange-400 font-mono text-sm font-bold px-2 py-0.5 rounded leading-tight">
                                    {MONO_FPS} fps
                                  </div>
                                  <div className="bg-black/80 text-orange-300 font-mono text-xs px-2 py-0.5 rounded leading-tight">
                                    {renderedFrames}/{TOTAL_FRAMES} frames
                                  </div>
                                  <div className="bg-black/80 text-red-400 font-mono text-xs px-2 py-0.5 rounded leading-tight">
                                    calidad: {Math.round(MONO_QUALITY * 100)}%
                                  </div>
                                </div>
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${rwMonoProgress === 0 ? "bg-slate-700 text-slate-300" :
                                    rwMonoProgress >= 100 ? "bg-orange-600 text-white" :
                                      "bg-red-600 text-white"
                                  }`}>
                                  {rwMonoProgress === 0 ? "EN ESPERA" :
                                    rwMonoProgress >= 100 ? "BAJA CALIDAD" : "RENDERIZANDO"}
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/80 text-red-400 text-xs font-mono font-bold px-2 py-0.5 rounded">
                                  BAJA CALIDAD — 1 frame/ciclo
                                </div>
                              </div>
                            </div>
                            {/* Frame strip */}
                            <div className="flex gap-0.5 h-6">
                              {[...Array(TOTAL_FRAMES)].map((_, i) => {
                                const done = i < renderedFrames
                                const active = i === renderedFrames && rwIsRunning
                                return (
                                  <div key={i} className={`flex-1 rounded-sm border transition-all ${active ? "border-orange-500 bg-orange-400" :
                                      done ? "border-orange-300 bg-orange-200" :
                                        "border-slate-200 bg-slate-100"
                                    }`} />
                                )
                              })}
                            </div>
                            {/* Stage bar */}
                            <div className="flex gap-1">
                              {["Decode", "Transf.", "Encode", "Buffer", "Write"].map((s, i) => (
                                <div key={i} className={`flex-1 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all ${rwMonoStage === i ? "bg-orange-500 text-white" :
                                    rwMonoStage > i ? "bg-emerald-500 text-white" :
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
                                  <FileText key={i} className={`w-6 h-6 transition-all ${isCompressed ? "text-slate-300 scale-75" : "text-blue-500"
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
                              <Archive className={`w-16 h-16 ${rwMonoProgress >= 100 ? "text-emerald-500" : "text-orange-500"
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
                                    <div key={i} className={`rounded transition-all duration-100 ${processed ? "bg-transparent" : "bg-slate-300/60"
                                      }`} />
                                  )
                                })}
                              </div>
                            )}
                            {/* Status - shows parallel processing */}
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-sm font-bold ${rwPipeProgress === 0 ? "bg-blue-500 text-white" :
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
                              {[0, 1, 2, 3, 4].map(i => (
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
                            <FileText className={`w-14 h-14 transition-all ${rwPipeProgress >= 100 ? "text-emerald-500" :
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
                              <Database className={`w-14 h-14 mx-auto mb-1 ${rwPipeProgress >= 100 ? "text-emerald-500" : "text-purple-500"
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
                                <div key={i} className={`flex-1 h-10 rounded flex flex-col items-center justify-center text-xs font-bold transition-all ${isActive ? "bg-purple-500 text-white animate-pulse" :
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
                                {[0, 1, 2, 3, 4].map(i => (
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

                      {/* VIDEO RENDERING PIPELINE — real canvas at 30 fps = smooth + sharp */}
                      {selectedTask.visualType === "video" && (() => {
                        const PIPE_FPS = 30
                        const TOTAL_FRAMES = 30
                        // quality 1.0 → internal buffer matches display = pixel-perfect
                        const PIPE_QUALITY = 1.0
                        const renderedFrames = Math.floor((rwPipeProgress / 100) * TOTAL_FRAMES)
                        const activeFrameBase = Math.max(0, renderedFrames - 4)
                        const stageColors = ["bg-purple-500", "bg-purple-400", "bg-purple-300", "bg-purple-200", "bg-purple-100"]
                        return (
                          <div className="absolute inset-0 p-2 flex flex-col gap-1.5">
                            {/* Canvas preview */}
                            <div className="flex-1 relative rounded-lg overflow-hidden border-2 border-purple-500 bg-black">
                              <VideoCanvas
                                fps={PIPE_FPS}
                                quality={PIPE_QUALITY}
                                running={rwIsRunning && selectedTask.visualType === "video"}
                                accentColor="#a855f7"
                                label={rwPipeProgress === 0 ? "EN ESPERA" : rwPipeProgress >= 100 ? "LISTO" : "RENDERIZANDO"}
                                badgeColor={rwPipeProgress >= 100 ? "#16a34a" : "#7c3aed"}
                              />
                              {/* HUD overlaid on top */}
                              <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                  <div className="bg-black/80 text-purple-300 font-mono text-sm font-bold px-2 py-0.5 rounded leading-tight">
                                    {PIPE_FPS} fps
                                  </div>
                                  <div className="bg-black/80 text-purple-200 font-mono text-xs px-2 py-0.5 rounded leading-tight">
                                    {renderedFrames}/{TOTAL_FRAMES} frames
                                  </div>
                                  <div className="bg-black/80 text-emerald-400 font-mono text-xs px-2 py-0.5 rounded leading-tight">
                                    calidad: {Math.round(PIPE_QUALITY * 100)}%
                                  </div>
                                </div>
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${rwPipeProgress === 0 ? "bg-slate-700 text-slate-300" :
                                    rwPipeProgress >= 100 ? "bg-emerald-600 text-white" :
                                      "bg-purple-600 text-white"
                                  }`}>
                                  {rwPipeProgress === 0 ? "EN ESPERA" :
                                    rwPipeProgress >= 100 ? "ALTA CALIDAD" : "RENDERIZANDO"}
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/80 text-emerald-400 text-xs font-mono font-bold px-2 py-0.5 rounded">
                                  ALTA CALIDAD — 5 frames/ciclo
                                </div>
                              </div>
                            </div>
                            {/* Frame strip — 5 in-flight simultaneously */}
                            <div className="flex gap-0.5 h-6">
                              {[...Array(TOTAL_FRAMES)].map((_, i) => {
                                const done = i < activeFrameBase
                                const inFlight = i >= activeFrameBase && i < activeFrameBase + 5 && rwIsRunning
                                const si = i - activeFrameBase
                                return (
                                  <div key={i} className={`flex-1 rounded-sm border transition-all ${inFlight ? `border-purple-500 ${stageColors[si] ?? "bg-purple-100"}` :
                                      done ? "border-emerald-400 bg-emerald-200" :
                                        "border-slate-200 bg-slate-100"
                                    }`} />
                                )
                              })}
                            </div>
                            {/* 5 stage bars — all lit simultaneously while running */}
                            <div className="flex gap-1">
                              {["Decode", "Transf.", "Encode", "Buffer", "Write"].map((s, i) => (
                                <div key={i} className={`flex-1 h-6 rounded flex flex-col items-center justify-center text-[10px] font-bold transition-all ${rwIsRunning ? "bg-purple-500 text-white animate-pulse" :
                                    rwPipeProgress >= 100 ? "bg-emerald-500 text-white" :
                                      "bg-slate-200 text-slate-500"
                                  }`} style={{ animationDelay: `${i * 80}ms` }}>
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
                              {[0, 1, 2, 3, 4].map(i => (
                                <FileText key={i} className={`w-7 h-7 ${rwIsRunning ? "text-purple-500 animate-pulse" : "text-slate-400"
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
              <div className={`mt-3 rounded-xl p-3 shadow-lg transition-all ${rwMonoFinished && rwPipeFinished ? "bg-gradient-to-r from-teal-500 to-emerald-500" :
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
                      <span className="text-orange-600 font-mono text-xl font-bold">{(calcMonoTime / 1000).toFixed(1)}us</span>
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
                      <span className="text-purple-600 font-mono text-xl font-bold">{(calcPipeTime / 1000).toFixed(1)}us</span>
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
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${scenario === "normal"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              Normal
            </button>
            <button
              onClick={() => changeScenario("data")}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${scenario === "data"
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              Riesgo de Datos
            </button>
            <button
              onClick={() => changeScenario("control")}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${scenario === "control"
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
                  <code className={`font-mono text-sm w-44 px-3 py-3 rounded-lg transition-all ${state.status === "flush"
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
                        className={`w-20 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${isFlushed
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
  const [hasRestrictedOrigin, setHasRestrictedOrigin] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const baseUrl = window.location.origin
    const url = `${baseUrl}/remote`
    setRemoteUrl(url)
    setHasRestrictedOrigin(baseUrl.includes("vusercontent.net"))

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

      {hasRestrictedOrigin ? (
        <div className="z-10 max-w-xl text-center">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-amber-700">Acceso restringido</span>
            </div>
            <p className="text-amber-800 text-sm mb-4">
              El control remoto no funcionara desde esta URL porque requiere autenticacion para acceder al sitio.
            </p>
            <div className="bg-white rounded-xl p-4 border border-amber-200">
              <p className="text-slate-700 text-sm font-medium mb-2">Para usar el control remoto:</p>
              <ol className="text-left text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span>Abre la version publica del proyecto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span>Verifica que la presentacion principal este abierta en esa misma URL</span>
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
                <img src={qrDataUrl} alt="QR para control remoto" className="w-48 h-48" />
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
