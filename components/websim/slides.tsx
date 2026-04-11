"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Activity, Zap, Clock, TrendingUp, BarChart3, Cpu, HardDrive, ArrowRight, RefreshCw, Monitor, Globe, Code, Chrome, Music, Gamepad2, Terminal, Server, Users, ArrowDown, RotateCw } from "lucide-react"

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
export function WebSimTitleSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (isPrintMode) return
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [isPrintMode])

  const members = [
    "Algenis De los Santos",
    "Oliver Abreu",
    "Enmanuel Santos",
    "Frainer Encarnación",
    "Christopher Marrero",
  ]

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a1a] relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated CPU cores */}
      <div className="absolute top-12 right-16 grid grid-cols-4 gap-2 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-sm border border-cyan-400 transition-all duration-300"
            style={{
              backgroundColor:
                (tick + i) % 5 === 0 ? "rgba(34,211,238,0.6)" : "transparent",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl w-full px-16 space-y-10 z-10">
        <div className="space-y-3">
          <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            Arquitectura del Computador &nbsp;·&nbsp; Exposición
          </div>
          <h1 className="text-7xl font-bold text-white leading-tight">
            WebSim <span className="text-cyan-400">&amp;</span>
            <br />
            Procesos
            <br />
            <span className="text-cyan-400">CPU-bound</span>
          </h1>
          <div className="h-1 w-24 bg-cyan-400 rounded-full" />
        </div>

        <div className="flex gap-4 flex-wrap">
          {members.map((m) => (
            <span
              key={m}
              className="text-xs font-mono text-slate-300 border border-slate-700 px-3 py-1 rounded-full bg-slate-800/50"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="text-slate-500 text-sm font-mono">Los Ingenieros</div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TEMA 1 — Intro WebSim (Algenis De los Santos)
   Minimalist interactive process state simulation
───────────────────────────────────────────── */
const STATES = ["Nuevo", "Ready", "Ejecutando", "Esperando", "Terminado"] as const
type ProcessState = (typeof STATES)[number]

const STATE_COLOR: Record<ProcessState, string> = {
  Nuevo: "#64748b",
  Ready: "#3b82f6",
  Ejecutando: "#22c55e",
  Esperando: "#f59e0b",
  Terminado: "#a855f7",
}

const STATE_GLOW: Record<ProcessState, string> = {
  Nuevo: "0 0 20px rgba(100, 116, 139, 0.5)",
  Ready: "0 0 20px rgba(59, 130, 246, 0.6)",
  Ejecutando: "0 0 25px rgba(34, 197, 94, 0.7)",
  Esperando: "0 0 20px rgba(245, 158, 11, 0.6)",
  Terminado: "0 0 20px rgba(168, 85, 247, 0.6)",
}

interface SimProcess {
  id: string
  name: string
  state: ProcessState
  step: number
}

const PROCESS_SEQUENCE: ProcessState[] = ["Nuevo", "Ready", "Ejecutando", "Esperando", "Ready", "Ejecutando", "Terminado"]

export function WebSimIntroSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [isRunning, setIsRunning] = useState(false)
  const [processes, setProcesses] = useState<SimProcess[]>([
    { id: "P1", name: "Proceso A", state: "Nuevo", step: 0 },
    { id: "P2", name: "Proceso B", state: "Nuevo", step: 0 },
  ])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startSimulation = useCallback(() => {
    setIsRunning(true)
  }, [])

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setProcesses([
      { id: "P1", name: "Proceso A", state: "Nuevo", step: 0 },
      { id: "P2", name: "Proceso B", state: "Nuevo", step: 0 },
    ])
  }, [])

  useEffect(() => {
    if (isPrintMode || !isRunning) return

    intervalRef.current = setInterval(() => {
      setProcesses((prev) => {
        const updated = prev.map((p, idx) => {
          // Stagger P2 behind P1 by 2 steps
          const effectiveStep = idx === 1 ? Math.max(0, p.step) : p.step
          if (effectiveStep >= PROCESS_SEQUENCE.length - 1) {
            return { ...p, state: "Terminado" as ProcessState }
          }
          const nextStep = p.step + 1
          const nextState = PROCESS_SEQUENCE[Math.min(nextStep, PROCESS_SEQUENCE.length - 1)]
          return { ...p, step: nextStep, state: nextState }
        })

        // Check if all processes are done
        const allDone = updated.every((p) => p.state === "Terminado")
        if (allDone && intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setIsRunning(false)
        }

        return updated
      })
    }, 1200)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPrintMode, isRunning])

  // Stagger P2 start
  useEffect(() => {
    if (!isRunning) return
    const timeout = setTimeout(() => {
      setProcesses((prev) => prev.map((p, idx) => (idx === 1 ? { ...p, step: 0 } : p)))
    }, 1800)
    return () => clearTimeout(timeout)
  }, [isRunning])

  const allDone = processes.every((p) => p.state === "Terminado")

  return (
    <div className="w-full h-full bg-[#0a0a1a] flex flex-col items-center justify-center p-12 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <div className="text-center mb-10 z-10">
        <h2 className="text-5xl font-bold text-white mb-3">Introduccion al Simulador WebSim</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Visualiza como el sistema operativo organiza procesos en la CPU.
        </p>
      </div>

      {/* Main simulation area */}
      <div className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center gap-8 z-10">
        {/* State flow diagram */}
        <div className="flex items-center gap-3">
          {STATES.map((state, i) => {
            const isActive = processes.some((p) => p.state === state)
            return (
              <div key={state} className="flex items-center gap-3">
                <div
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-500"
                  style={{
                    backgroundColor: STATE_COLOR[state],
                    boxShadow: isActive ? STATE_GLOW[state] : "none",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {state}
                </div>
                {i < STATES.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                )}
              </div>
            )
          })}
        </div>

        {/* Process cards */}
        <div className="flex gap-6 mt-4">
          {processes.map((p) => (
            <div
              key={p.id}
              className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 w-56 transition-all duration-500"
              style={{
                borderColor: STATE_COLOR[p.state],
                boxShadow: isRunning || p.state !== "Nuevo" ? `0 0 30px ${STATE_COLOR[p.state]}30` : "none",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-mono font-bold text-lg">{p.id}</span>
                <div
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: STATE_COLOR[p.state],
                    boxShadow: `0 0 10px ${STATE_COLOR[p.state]}`,
                  }}
                />
              </div>
              <div className="text-slate-400 text-sm mb-3">{p.name}</div>
              <div
                className="px-4 py-2 rounded-lg text-center text-sm font-semibold text-white transition-all duration-500"
                style={{ backgroundColor: STATE_COLOR[p.state] }}
              >
                {p.state}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
            style={{
              boxShadow: !isRunning ? "0 0 20px rgba(34, 211, 238, 0.4)" : "none",
            }}
          >
            <Activity className="w-5 h-5" />
            Iniciar simulacion
          </button>
          <button
            onClick={resetSimulation}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>

        {/* Status message */}
        {allDone && !isRunning && processes[0].step > 0 && (
          <div className="text-emerald-400 text-sm font-medium animate-pulse">
            Simulacion completada
          </div>
        )}
      </div>

      {/* Key points - minimal */}
      <div className="absolute bottom-20 left-12 right-12 flex justify-center gap-12 text-slate-500 text-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Estados de un proceso en tiempo real
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Ready Queue y CPU Scheduler
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Cambio de contexto visual
        </div>
      </div>

      <Presenter name="Algenis De los Santos" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   TEMA 2 — CPU-bound vs I/O-bound (Oliver Abreu)
   Advanced: live CPU usage bars + burst chart
───────────────────────────────────────────── */
export function CPUBoundSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (isPrintMode) return
    const id = setInterval(() => setTick((t) => t + 1), 600)
    return () => clearInterval(id)
  }, [isPrintMode])

  const cpuBoundUsage = 85 + Math.sin(tick * 0.3) * 10
  const ioBoundUsage = 20 + Math.sin(tick * 1.8) * 15

  const burstPattern = [
    { type: "cpu", label: "CPU", w: 8 },
    { type: "cpu", label: "CPU", w: 8 },
    { type: "cpu", label: "CPU", w: 8 },
    { type: "cpu", label: "CPU", w: 8 },
    { type: "cpu", label: "CPU", w: 8 },
    { type: "io", label: "I/O", w: 2 },
  ]

  const ioBurstPattern = [
    { type: "cpu", label: "CPU", w: 2 },
    { type: "io", label: "I/O", w: 4 },
    { type: "cpu", label: "CPU", w: 2 },
    { type: "io", label: "I/O", w: 4 },
    { type: "cpu", label: "CPU", w: 2 },
    { type: "io", label: "I/O", w: 4 },
  ]

  const timelineIdx = tick % 6

  return (
    <div className="w-full h-full bg-[#0f1729] flex flex-col p-10 relative">
      <div className="mb-6">
        <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">Tema 02</div>
        <h2 className="text-4xl font-bold text-white">Procesos CPU-bound vs I/O-bound</h2>
        <div className="h-0.5 w-20 bg-cyan-400 mt-2" />
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* CPU-bound panel */}
        <div className="flex-1 bg-slate-800/60 rounded-xl p-6 border border-red-500/30 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-bold text-lg">CPU-bound</span>
          </div>
          <p className="text-slate-400 text-sm">
            Procesos que dominan la CPU con ráfagas largas y continuas. Poca espera por I/O.
          </p>

          {/* Live usage meter */}
          <div className="bg-slate-900 rounded-lg p-4">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>CPU Usage</span>
              <span className="text-red-400 font-bold">{cpuBoundUsage.toFixed(0)}%</span>
            </div>
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${cpuBoundUsage}%` }}
              />
            </div>
          </div>

          {/* Burst timeline */}
          <div>
            <div className="text-xs text-slate-400 mb-2 font-medium">Patrón de ráfagas:</div>
            <div className="flex gap-1 items-end h-10">
              {burstPattern.map((seg, i) => (
                <div
                  key={i}
                  className="rounded-sm flex items-center justify-center text-white font-bold transition-all duration-300"
                  style={{
                    width: `${seg.w * 12}px`,
                    height: i === timelineIdx ? "40px" : "28px",
                    backgroundColor:
                      seg.type === "cpu"
                        ? i === timelineIdx
                          ? "#ef4444"
                          : "#7f1d1d"
                        : "#334155",
                    fontSize: "9px",
                  }}
                >
                  {seg.label}
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Mayoría CPU → pocos slots I/O
            </div>
          </div>

          <div className="mt-auto text-xs text-slate-500 bg-slate-900/60 rounded-lg p-3">
            <div className="font-medium text-red-300 mb-1">Ejemplos reales:</div>
            Compresión de video · Renderizado 3D · Minería de criptomonedas · Simulaciones científicas
          </div>
        </div>

        {/* I/O-bound panel */}
        <div className="flex-1 bg-slate-800/60 rounded-xl p-6 border border-blue-500/30 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-bold text-lg">I/O-bound</span>
          </div>
          <p className="text-slate-400 text-sm">
            Procesos que pasan la mayor parte de su tiempo esperando operaciones de entrada/salida.
          </p>

          {/* Live usage meter */}
          <div className="bg-slate-900 rounded-lg p-4">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>CPU Usage</span>
              <span className="text-blue-400 font-bold">{ioBoundUsage.toFixed(0)}%</span>
            </div>
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${ioBoundUsage}%` }}
              />
            </div>
          </div>

          {/* Burst timeline */}
          <div>
            <div className="text-xs text-slate-400 mb-2 font-medium">Patrón de ráfagas:</div>
            <div className="flex gap-1 items-end h-10">
              {ioBurstPattern.map((seg, i) => (
                <div
                  key={i}
                  className="rounded-sm flex items-center justify-center text-white font-bold transition-all duration-300"
                  style={{
                    width: `${seg.w * 12}px`,
                    height: i === timelineIdx ? "40px" : "28px",
                    backgroundColor:
                      seg.type === "cpu"
                        ? i === timelineIdx
                          ? "#3b82f6"
                          : "#1e3a5f"
                        : i === timelineIdx
                        ? "#f59e0b"
                        : "#44403c",
                    fontSize: "9px",
                  }}
                >
                  {seg.label}
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              CPU corto → espera I/O larga → CPU corto…
            </div>
          </div>

          <div className="mt-auto text-xs text-slate-500 bg-slate-900/60 rounded-lg p-3">
            <div className="font-medium text-blue-300 mb-1">Ejemplos reales:</div>
            Servidores web · Bases de datos · Reproductores de video · Editores de texto
          </div>
        </div>

        {/* Center comparison */}
        <div className="w-52 flex flex-col gap-3">
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <div className="text-white font-semibold text-sm mb-3">Impacto en el planificador</div>
            {[
              { label: "Tiempo en CPU", cpu: 90, io: 20 },
              { label: "Cambios de ctx.", cpu: 15, io: 85 },
              { label: "Uso de I/O", cpu: 10, io: 90 },
              { label: "Prioridad SO", cpu: 40, io: 70 },
            ].map((row) => (
              <div key={row.label} className="mb-3">
                <div className="text-xs text-slate-400 mb-1">{row.label}</div>
                <div className="flex gap-1 items-center">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${row.cpu * 0.9}px` }}
                  />
                </div>
                <div className="flex gap-1 items-center mt-0.5">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${row.io * 0.9}px` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-3 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> CPU-b
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> I/O-b
              </span>
            </div>
          </div>

          <div className="bg-amber-900/30 rounded-xl p-4 border border-amber-700/40 text-xs text-amber-200 leading-relaxed">
            Los procesos CPU-bound son el principal desafio para algoritmos como FCFS porque monopolizan la CPU.
          </div>
        </div>
      </div>

      <Presenter name="Oliver Abreu" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   TEMA 3 — FCFS (Enmanuel Santos)
   Advanced: Gantt chart animation + wait time
───────────────────────────────────────────── */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AlertTriangle, Smartphone, Globe, MessageSquare, Facebook, Music, Gamepad2, Code2, Thermometer, Zap, Play, MousePointer2, WifiOff, Clock } from "lucide-react";

// ─── CONFIGURACIÓN DE APPS REALISTAS ────────────────
const APPS = [
  { id: "FB",  name: "Facebook",  task: "Renderizando Videos 4K", burst: 120, color: "#1877F2", icon: <Facebook size={18}/>, heat: 1.2 },
  { id: "SP",  name: "Spotify",   task: "Sincronizando Audio",    burst: 60,  color: "#1DB954", icon: <Music size={18}/>,    heat: 0.4 },
  { id: "ST",  name: "Steam",     task: "Descomprimiendo Juego",  burst: 140, color: "#c7d5e0", icon: <Gamepad2 size={18}/>, heat: 1.8 },
  { id: "WA",  name: "WhatsApp",  task: "Enviando Mensaje",       burst: 30,  color: "#25D366", icon: <MessageSquare size={18}/>, heat: 0.2 },
  { id: "CH",  name: "Chrome",    task: "Cargando 20 pestañas",   burst: 90,  color: "#EA4335", icon: <Globe size={18}/>,    heat: 1.1 },
  { id: "VS",  name: "VS Code",   task: "Compilando Proyecto C++", burst: 150, color: "#007ACC", icon: <Code2 size={18}/>,    heat: 2.5 },
];

const TOTAL_TIME = APPS.reduce((s, a) => s + a.burst, 0);
const TICK_MS = 40; 

const WAIT_TIMES = (() => {
  let acc = 0;
  return APPS.map((a) => { const w = acc; acc += a.burst; return { ...a, wait: w, finish: acc }; });
})();

const NOTES = [
  {
    atTick: 1, emoji: "🎬", title: "Inicio: El Orden de Llegada",
    text: "Facebook llegó primero y toma el control total. Aunque WhatsApp solo necesita 30ms, FCFS lo obliga a esperar a que Facebook termine de renderizar sus videos.",
    color: "#1877F2"
  },
  {
    atTick: 120, emoji: "🌡️", title: "Alerta de Calor: Steam",
    text: "Steam entra a la CPU. Al ser una tarea pesada de descompresión, notarás como la temperatura empieza a subir rápidamente. Las demás apps siguen 'congeladas' en la cola.",
    color: "#f59e0b"
  },
  {
    atTick: 350, emoji: "🐌", title: "El Efecto Convoy en acción",
    text: "WhatsApp y Chrome llevan cientos de milisegundos esperando. El usuario intenta hacer clic, pero el sistema no procesa la entrada porque la CPU está ocupada con Steam.",
    color: "#ef4444"
  },
  {
    atTick: 440, emoji: "🔥", title: "Punto Crítico: VS Code",
    text: "VS Code inicia una compilación pesada. Aquí es donde la CPU alcanza su punto máximo (98°C). El sistema está al borde del colapso térmico mientras Instagram espera al final.",
    color: "#007ACC"
  },
];

function FCFSSimulation() {
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(45);

  const pausedRef = useRef(false);
  const noteActiveRef = useRef(false);
  const timerRef = useRef(null);
  const prevActiveRef = useRef(null);

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  const scheduleNext = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      if (pausedRef.current || noteActiveRef.current) return;
      setTick((t) => {
        if (t >= TOTAL_TIME) { setCompleted([]); setCurrentTemp(45); return 0; }
        return t + 1;
      });
    }, TICK_MS);
  }, []);

  useEffect(() => {
    let active = null;
    let elapsed = 0;
    for (const a of APPS) {
      if (tick >= elapsed && tick < elapsed + a.burst) { active = a; break; }
      elapsed += a.burst;
    }
    if (active) {
      setCurrentTemp(prev => {
        const targetTemp = 40 + (active.heat * 22); 
        if (prev < targetTemp) return Math.min(98, prev + 0.4);
        return Math.max(45, prev - 0.2);
      });
    }
  }, [tick]);

  useEffect(() => {
    const note = NOTES.find((n) => n.atTick === tick);
    if (note && !pausedRef.current) {
      noteActiveRef.current = true;
      setActiveNote(note);
    } else {
      scheduleNext();
    }
    return clearTimer;
  }, [tick, scheduleNext]);

  const closeNote = () => {
    noteActiveRef.current = false;
    setActiveNote(null);
    scheduleNext();
  };

  let elapsed = 0, activeApp = null, progress = 0;
  const queue = [];
  for (let i = 0; i < APPS.length; i++) {
    const a = APPS[i];
    if (tick < elapsed) { queue.push(a); }
    else if (tick < elapsed + a.burst) {
      activeApp = a;
      progress = ((tick - elapsed) / a.burst) * 100;
      for (let j = i + 1; j < APPS.length; j++) queue.push(APPS[j]);
    }
    elapsed += a.burst;
  }

  useEffect(() => {
    if (activeApp?.id !== prevActiveRef.current && prevActiveRef.current) {
      const done = APPS.find(a => a.id === prevActiveRef.current);
      if (done) setCompleted(prev => prev.includes(done.id) ? prev : [...prev, done.id]);
    }
    prevActiveRef.current = activeApp?.id ?? null;
  }, [activeApp]);

  const frustration = Math.min(100, (queue.length / (APPS.length - 1)) * 100 + (currentTemp > 80 ? 20 : 0));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>

      {/* ══ MODAL DE NOTA ══ */}
      {activeNote && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 200, borderRadius: 16,
          background: "rgba(2, 8, 23, 0.96)", backdropFilter: "blur(15px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "fadeIn 0.3s ease",
        }}>
          <div style={{
            maxWidth: 500, padding: "40px", textAlign: "center",
            border: `2px solid ${activeNote.color}`, borderRadius: 24,
            background: "#0f172a", boxShadow: `0 0 100px ${activeNote.color}33`,
            animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}>
            <div style={{ fontSize: 70, marginBottom: 20 }}>{activeNote.emoji}</div>
            <h3 style={{ color: activeNote.color, margin: "0 0 15px 0", fontSize: 28, fontWeight: 800 }}>{activeNote.title}</h3>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#cbd5e1", marginBottom: 30 }}>{activeNote.text}</p>
            <button onClick={closeNote} style={{ background: activeNote.color, color: "#fff", border: "none", padding: "14px 35px", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, margin: "0 auto" }}>
              <Play size={20} fill="currentColor" /> ENTENDIDO, CONTINUAR
            </button>
          </div>
        </div>
      )}

      {/* ── MÉTRICAS SUPERIORES ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Apps en espera", value: queue.length, unit: "apps", color: queue.length > 3 ? "#ef4444" : "#22c55e", icon: "📱" },
          { label: "Temperatura CPU", value: Math.round(currentTemp), unit: "°C", color: currentTemp > 90 ? "#ff0000" : currentTemp > 75 ? "#f59e0b" : "#22c55e", icon: "🌡️" },
          { label: "Carga de Trabajo", value: activeApp ? Math.round(activeApp.heat * 40) : 0, unit: "%", color: "#38bdf8", icon: "⚡" },
          { label: "Frustración", value: Math.round(frustration), unit: "%", color: frustration > 70 ? "#ef4444" : "#f59e0b", icon: "😤" },
        ].map((m, i) => (
          <div key={i} style={{ background: "#1e293b", padding: "16px", borderRadius: 14, border: `1px solid ${m.color}44`, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{m.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>{m.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: m.color }}>{m.value}<span style={{ fontSize: 14, fontWeight: 400, color: "#64748b", marginLeft: 3 }}>{m.unit}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* ── COLA Y CPU ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16 }}>
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: 16, border: "1px solid #334155" }}>
          <h4 style={{ margin: "0 0 15px 0", fontSize: 13, color: "#94a3b8", textTransform: "uppercase" }}>📱 Estado de la Cola</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {APPS.map((app) => {
              const isWaiting = queue.some(q => q.id === app.id);
              const isDone = completed.includes(app.id);
              return (
                <div key={app.id} style={{ background: isWaiting ? `${app.color}15` : isDone ? "#0f172a" : "#0f172a55", border: `1px solid ${isWaiting ? app.color : isDone ? "#22c55e44" : "#334155"}`, padding: "12px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10, opacity: isWaiting || activeApp?.id === app.id ? 1 : 0.4 }}>
                  <div style={{ color: app.color }}>{app.icon}</div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{app.name}</div><div style={{ fontSize: 10, color: isWaiting ? "#f59e0b" : isDone ? "#22c55e" : "#64748b" }}>{isWaiting ? "ESPERANDO..." : isDone ? "COMPLETADO" : "EN COLA"}</div></div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: currentTemp > 90 ? "#450a0a" : "#1e293b", padding: "20px", borderRadius: 16, border: `2px solid ${currentTemp > 90 ? "#ef4444" : "#334155"}`, transition: "background 0.5s" }}>
          <h4 style={{ margin: "0 0 15px 0", fontSize: 13, color: "#94a3b8", textTransform: "uppercase" }}>⚙️ Núcleo del Procesador</h4>
          {activeApp ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 60, height: 60, background: `${activeApp.color}22`, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: activeApp.color, border: `2px solid ${activeApp.color}`, animation: "pulse 1s infinite" }}>{activeApp.icon}</div>
              <h2 style={{ margin: "0 0 5px 0", fontSize: 22 }}>{activeApp.name}</h2>
              <div style={{ height: 10, background: "#0f172a", borderRadius: 5, overflow: "hidden", marginBottom: 8 }}><div style={{ width: `${progress}%`, height: "100%", background: activeApp.color, transition: "width 0.1s linear" }} /></div>
              <span style={{ fontSize: 12, fontWeight: 700, color: activeApp.color }}>{Math.round(progress)}% PROCESADO</span>
            </div>
          ) : <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", border: "2px dashed #334155", borderRadius: 12 }}>IDLE</div>}
        </div>
      </div>

      {/* ── NUEVA SECCIÓN: EXPERIENCIA DEL USUARIO (FRONTEND) ── */}
      <div style={{ background: "#0f172a", padding: "20px", borderRadius: 16, border: "1px solid #334155", flex: 1, display: "flex", flexDirection: "column", gap: 15 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ margin: 0, fontSize: 13, color: "#38bdf8", textTransform: "uppercase", letterSpacing: 1.5 }}>🖥️ Vista del Usuario (Lo que tú ves)</h4>
          <div style={{ display: "flex", gap: 15, fontSize: 12 }}>
            <span style={{ color: frustration > 50 ? "#ef4444" : "#22c55e", display: "flex", alignItems: "center", gap: 5 }}>
              {frustration > 50 ? <WifiOff size={14}/> : <Zap size={14}/>} {frustration > 50 ? "SISTEMA LAGUEADO" : "SISTEMA FLUIDO"}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15, flex: 1 }}>
          {/* Simulación de Mouse */}
          <div style={{ background: "#1e293b", borderRadius: 12, padding: "15px", position: "relative", overflow: "hidden", border: "1px solid #334155" }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>MOVIMIENTO DEL MOUSE</div>
            <div style={{ height: "80%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MousePointer2 
                size={32} 
                style={{ 
                  color: frustration > 60 ? "#ef4444" : "#38bdf8",
                  transform: frustration > 60 ? "none" : `translate(${Math.sin(tick/5)*30}px, ${Math.cos(tick/5)*20}px)`,
                  transition: frustration > 60 ? "none" : "transform 0.1s linear",
                  opacity: frustration > 80 ? 0.3 : 1
                }} 
              />
              {frustration > 60 && <div style={{ position: "absolute", color: "#ef4444", fontWeight: 800, fontSize: 10 }}>CONGELADO</div>}
            </div>
          </div>

          {/* Simulación de Video/Streaming */}
          <div style={{ background: "#1e293b", borderRadius: 12, padding: "15px", border: "1px solid #334155", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>REPRODUCCIÓN DE VIDEO</div>
            <div style={{ flex: 1, background: "#000", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              {activeApp?.id === "FB" || activeApp?.id === "ST" || activeApp?.id === "VS" ? (
                <div style={{ animation: "spin 2s linear infinite", color: "#fff" }}><Clock size={30}/></div>
              ) : (
                <div style={{ color: "#22c55e", fontSize: 10 }}>▶ REPRODUCIENDO</div>
              )}
              {(activeApp?.id === "ST" || activeApp?.id === "VS") && (
                <div style={{ position: "absolute", bottom: 5, width: "80%", height: 4, background: "#334155", borderRadius: 2 }}>
                  <div style={{ width: "30%", height: "100%", background: "#ef4444" }} />
                </div>
              )}
            </div>
          </div>

          {/* Simulación de Escritura/Chat */}
          <div style={{ background: "#1e293b", borderRadius: 12, padding: "15px", border: "1px solid #334155" }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>ENTRADA DE TECLADO</div>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: frustration > 50 ? "#475569" : "#fff" }}>
              {tick % 10 < 5 ? "Escribiendo..." : "Escribiendo"}
              <div style={{ marginTop: 10, height: 20, background: "#0f172a", borderRadius: 4, padding: "0 5px", display: "flex", alignItems: "center" }}>
                {frustration > 50 ? "¡LAG!" : "Hola, ¿cómo estás?"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTROLES ── */}
      <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
        <button onClick={() => { pausedRef.current = !paused; setPaused(!paused); if(!pausedRef.current) scheduleNext(); }} style={{ padding: "12px 30px", borderRadius: 12, border: "none", background: paused ? "#22c55e" : "#f97316", color: "#fff", cursor: "pointer", fontWeight: 800, fontSize: 15 }}>
          {paused ? "▶ REANUDAR" : "⏸ PAUSAR SIMULACIÓN"}
        </button>
        <div style={{ flex: 1, background: "#0f172a", padding: "10px 20px", borderRadius: 12, border: "1px solid #334155", display: "flex", alignItems: "center", gap: 12 }}>
          <AlertTriangle size={20} color="#f59e0b" />
          <span style={{ fontSize: 13, color: "#cbd5e1" }}>
            <strong>Efecto Convoy:</strong> El usuario siente el "lag" porque la CPU está ocupada con tareas largas, ignorando sus clics.
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export function FCFSSlide() {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", background: "#0a1120", color: "#fff", display: "flex", flexDirection: "column", padding: "30px 50px", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#38bdf8", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>Tema 03</div>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800 }}>¿Por qué se "laguea" mi PC? — Simulación FCFS</h1>
        <div style={{ width: 120, height: 4, borderRadius: 10, marginTop: 12, background: "linear-gradient(90deg,#38bdf8,#818cf8)" }} />
      </div>
      <FCFSSimulation />
      <div style={{ marginTop: 15, display: "flex", justifyContent: "space-between", opacity: 0.4, fontSize: 14 }}>
        <span>Enmanuel Santos — Los Ingenieros</span>
        <span>6 / 13</span>
      </div>
    </div>
  );
}
/* ─────────────────────────────────────────────
   TEMA 4 — Round Robin (Frainer Encarnación)
   8 internal sections with stepper navigation
───────────────────────────────────────────── */
const RR_PROCESSES_BASE = [
  { id: "P1", burst: 12, color: "#ef4444", remaining: 12 },
  { id: "P2", burst: 9, color: "#f97316", remaining: 9 },
  { id: "P3", burst: 6, color: "#22c55e", remaining: 6 },
  { id: "P4", burst: 10, color: "#3b82f6", remaining: 10 },
]

// Section 1: General Concept
function RRSection1() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1000)
    return () => clearInterval(id)
  }, [])

  const queueItems = ["P1", "P2", "P3", "P4"]
  const inCPU = queueItems[step % queueItems.length]
  const inQueue = queueItems.filter((p) => p !== inCPU)

  return (
    <div className="flex gap-6 flex-1 min-h-0">
      <div className="w-56 flex flex-col gap-3 text-sm">
        {[
          { label: "Preemptivo", desc: "El SO puede interrumpir un proceso antes de que termine.", color: "border-cyan-500" },
          { label: "Time Quantum", desc: "Intervalo de tiempo máximo que un proceso puede usar la CPU.", color: "border-blue-500" },
          { label: "Ready Queue", desc: "Cola circular donde los procesos esperan su turno.", color: "border-violet-500" },
        ].map((item) => (
          <div key={item.label} className={`bg-slate-800/60 rounded-xl p-3 border-l-4 ${item.color} border-t border-r border-b border-slate-700`}>
            <div className="text-white font-semibold text-xs">{item.label}</div>
            <div className="text-slate-400 text-xs mt-1">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="text-slate-300 text-sm font-semibold">Flujo de Round Robin</div>

        <div className="flex items-center gap-8">
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-slate-400 text-xs mb-3 font-mono">Ready Queue</div>
            <div className="flex flex-col gap-2">
              {inQueue.map((p) => {
                const proc = RR_PROCESSES_BASE.find((pp) => pp.id === p)!
                return (
                  <div
                    key={p}
                    className="w-12 h-8 rounded flex items-center justify-center text-white text-sm font-bold transition-all duration-500"
                    style={{ backgroundColor: proc.color + "99" }}
                  >
                    {p}
                  </div>
                )
              })}
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-cyan-400" />

          <div className="bg-slate-900 rounded-2xl p-6 border-2 border-cyan-400 text-center min-w-[120px]">
            <div className="text-cyan-400 text-xs font-mono mb-2">CPU</div>
            {(() => {
              const proc = RR_PROCESSES_BASE.find((pp) => pp.id === inCPU)!
              return (
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold mx-auto animate-pulse"
                  style={{ backgroundColor: proc.color }}
                >
                  {inCPU}
                </div>
              )
            })()}
            <div className="text-xs text-slate-400 mt-2">Quantum activo</div>
          </div>

          <ArrowRight className="w-6 h-6 text-cyan-400 rotate-180" />

          <div className="text-slate-400 text-xs text-center max-w-[80px]">
            Al expirar, vuelve a la
            <br />
            <span className="text-cyan-400 font-semibold">Ready Queue</span>
          </div>
        </div>

        <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700">
          <div className="text-xs text-slate-400 mb-2 font-mono">Timeline visual:</div>
          <div className="flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => {
              const proc = RR_PROCESSES_BASE[i % RR_PROCESSES_BASE.length]
              return (
                <div
                  key={i}
                  className="flex-1 h-8 rounded text-center text-xs font-bold text-white flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: proc.color,
                    opacity: i <= step ? 1 : 0.25,
                    transform: i === step ? "scaleY(1.2)" : "scaleY(1)",
                  }}
                >
                  {proc.id}
                </div>
              )
            })}
          </div>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="flex-1 text-center text-xs text-slate-600 font-mono">
                {i * 4}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Section 2: Basic Simulation
function RRSection2() {
  const [tick, setTick] = useState(0)
  const [paused, setPaused] = useState(false)
  const quantum = 4
  const totalTicks = RR_PROCESSES_BASE.reduce((s, p) => s + p.burst, 0)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setTick((t) => (t + 1) % (totalTicks + 1)), 250)
    return () => clearInterval(id)
  }, [paused, totalTicks])

  const schedule: { id: string; color: string }[] = []
  const remaining = RR_PROCESSES_BASE.map((p) => ({ ...p }))
  let done = false
  while (!done) {
    done = true
    for (const p of remaining) {
      if (p.remaining <= 0) continue
      done = false
      const run = Math.min(p.remaining, quantum)
      for (let i = 0; i < run; i++) schedule.push({ id: p.id, color: p.color })
      p.remaining -= run
    }
  }

  const currentSlot = tick % schedule.length

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="text-slate-300 text-sm">
        4 procesos CPU-bound compiten con <span className="text-cyan-400 font-mono">Time Quantum = {quantum}</span>. Cada bloque = 1 unidad.
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-slate-900 rounded-xl p-4 border-2 border-cyan-400 flex items-center gap-3 min-w-[160px]">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-xs text-slate-400">Ejecutando</div>
            <div
              className="text-2xl font-bold"
              style={{ color: schedule[currentSlot]?.color }}
            >
              {schedule[currentSlot]?.id ?? "---"}
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          t = {tick} / {schedule.length}
        </div>
        <button
          onClick={() => setPaused(!paused)}
          className="px-3 py-1.5 rounded-lg bg-slate-700 text-white text-xs hover:bg-slate-600"
        >
          {paused ? "Reanudar" : "Pausar"}
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 flex-1">
        <div className="text-xs text-slate-400 mb-3 font-mono">Diagrama de Gantt — Round Robin (Q={quantum})</div>
        <div className="flex gap-0.5 flex-wrap">
          {schedule.map((slot, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-sm flex items-center justify-center text-white font-bold transition-all"
              style={{
                fontSize: "10px",
                backgroundColor: slot.color,
                opacity: i <= tick ? 1 : 0.15,
                transform: i === currentSlot ? "scale(1.2)" : "scale(1)",
                boxShadow: i === currentSlot ? `0 0 8px ${slot.color}` : "none",
              }}
            >
              {slot.id}
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {RR_PROCESSES_BASE.map((p) => {
            const done = schedule.slice(0, tick + 1).filter((s) => s.id === p.id).length
            const pct = Math.min(100, (done / p.burst) * 100)
            return (
              <div key={p.id} className="flex items-center gap-2">
                <span className="text-xs font-mono w-6 text-slate-400">{p.id}</span>
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{ width: `${pct}%`, backgroundColor: p.color }}
                  />
                </div>
                <span className="text-xs text-slate-500 font-mono w-10">{done}/{p.burst}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Section 3: Time Quantum - Intuitive interactive explanation
function RRSection3() {
  const [quantum, setQuantum] = useState(4)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  const apps = [
    { id: "Chrome", icon: Chrome, color: "#4285f4", burst: 8 },
    { id: "VS Code", icon: Code, color: "#007acc", burst: 6 },
    { id: "Spotify", icon: Music, color: "#1db954", burst: 5 },
    { id: "Game", icon: Gamepad2, color: "#ff6b6b", burst: 7 },
  ]

  // Build schedule based on quantum
  const buildSchedule = (q: number) => {
    const schedule: { id: string; color: string; icon: any }[] = []
    const remaining = apps.map((a) => ({ ...a, left: a.burst }))
    let iterations = 0
    while (remaining.some((r) => r.left > 0) && iterations < 100) {
      for (const app of remaining) {
        if (app.left <= 0) continue
        const run = Math.min(app.left, q)
        for (let i = 0; i < run; i++) {
          schedule.push({ id: app.id, color: app.color, icon: app.icon })
        }
        app.left -= run
      }
      iterations++
    }
    return schedule
  }

  const schedule = buildSchedule(quantum)
  const contextSwitches = schedule.reduce((count, slot, i) => {
    if (i > 0 && slot.id !== schedule[i - 1].id) return count + 1
    return count
  }, 0)

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setCurrentStep((s) => (s + 1) % schedule.length)
    }, 300)
    return () => clearInterval(id)
  }, [isPlaying, schedule.length])

  const currentApp = schedule[currentStep]

  return (
    <div className="flex gap-6 flex-1 min-h-0">
      {/* Left: Quantum Control */}
      <div className="w-72 flex flex-col gap-4">
        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
          <div className="text-white font-semibold text-sm mb-4">
            Ajusta el Time Quantum
          </div>
          
          {/* Visual quantum representation */}
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-6 rounded-sm transition-all duration-200"
                  style={{
                    backgroundColor: i < quantum ? "#22d3ee" : "#1e293b",
                  }}
                />
              ))}
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-cyan-400">{quantum}</span>
              <span className="text-slate-400 text-sm ml-2">unidades</span>
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={20}
            value={quantum}
            onChange={(e) => setQuantum(Number(e.target.value))}
            className="w-full accent-cyan-400 h-3"
          />
          
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>Muy pequeño</span>
            <span>Muy grande</span>
          </div>
        </div>

        {/* Impact visualization */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 flex-1">
          <div className="text-slate-300 text-xs font-semibold mb-3">Impacto del Quantum</div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Context Switches</span>
                <span className="text-amber-400 font-bold">{contextSwitches}</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (contextSwitches / 30) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Tiempo de respuesta</span>
                <span className="text-green-400 font-bold">{quantum <= 4 ? "Bajo" : quantum <= 10 ? "Medio" : "Alto"}</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, quantum * 5)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Overhead del SO</span>
                <span className="text-red-400 font-bold">{quantum <= 3 ? "Alto" : quantum <= 8 ? "Medio" : "Bajo"}</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(10, 100 - quantum * 4)}%` }}
                />
              </div>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-lg text-xs ${
            quantum <= 2 ? "bg-red-900/30 border border-red-700/40 text-red-200" :
            quantum >= 15 ? "bg-amber-900/30 border border-amber-700/40 text-amber-200" :
            "bg-green-900/30 border border-green-700/40 text-green-200"
          }`}>
            {quantum <= 2 && "Quantum muy pequeño: demasiados cambios de contexto, el SO pasa más tiempo cambiando que ejecutando"}
            {quantum > 2 && quantum < 15 && "Quantum balanceado: buen equilibrio entre respuesta y eficiencia"}
            {quantum >= 15 && "Quantum muy grande: se comporta casi como FCFS, los procesos esperan mucho"}
          </div>
        </div>
      </div>

      {/* Right: Live visualization */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Current execution */}
        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-slate-300 text-sm font-semibold">Aplicación en CPU</div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1 rounded bg-slate-700 text-white text-xs hover:bg-slate-600"
            >
              {isPlaying ? "Pausar" : "Reanudar"}
            </button>
          </div>
          
          <div className="flex items-center gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
              style={{ backgroundColor: currentApp?.color }}
            >
              {currentApp && <currentApp.icon className="w-10 h-10 text-white" />}
            </div>
            <div>
              <div className="text-white text-2xl font-bold">{currentApp?.id}</div>
              <div className="text-slate-400 text-sm mt-1">
                Quantum restante: <span className="text-cyan-400 font-mono">{quantum - (currentStep % quantum)}</span>
              </div>
            </div>
            <div className="ml-auto flex gap-1">
              {Array.from({ length: quantum }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-8 rounded-sm transition-all"
                  style={{
                    backgroundColor: i < (quantum - (currentStep % quantum)) ? currentApp?.color : "#1e293b",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 flex-1">
          <div className="text-xs text-slate-400 mb-3 font-mono">Timeline de ejecución (Q={quantum})</div>
          <div className="flex gap-0.5 flex-wrap max-h-24 overflow-hidden">
            {schedule.slice(0, 60).map((slot, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-sm flex items-center justify-center transition-all"
                style={{
                  backgroundColor: slot.color,
                  opacity: i <= currentStep ? 1 : 0.2,
                  transform: i === currentStep ? "scale(1.3)" : "scale(1)",
                  boxShadow: i === currentStep ? `0 0 8px ${slot.color}` : "none",
                }}
              >
                <slot.icon className="w-3 h-3 text-white" />
              </div>
            ))}
          </div>

          {/* App progress */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {apps.map((app) => {
              const done = schedule.slice(0, currentStep + 1).filter((s) => s.id === app.id).length
              const pct = Math.min(100, (done / app.burst) * 100)
              return (
                <div key={app.id} className="flex items-center gap-2 bg-slate-800/60 rounded-lg p-2">
                  <app.icon className="w-4 h-4" style={{ color: app.color }} />
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: app.color }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-mono w-8">{done}/{app.burst}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Section 4: Context Switching - More intuitive visualization
function RRSection4() {
  const [phase, setPhase] = useState<"running" | "saving" | "loading" | "ready">("running")
  const [activeProc, setActiveProc] = useState(0)
  const [pcbData, setPcbData] = useState({ pc: "0x7F00", sp: "0xFFE0", regs: "A=5, B=3", state: "Running" })
  
  const procs = [
    { id: "Chrome", icon: Chrome, color: "#4285f4" },
    { id: "VS Code", icon: Code, color: "#007acc" },
    { id: "Spotify", icon: Music, color: "#1db954" },
  ]

  const pcbSnapshots = [
    { pc: "0x7F00", sp: "0xFFE0", regs: "A=5, B=3", state: "Running" },
    { pc: "0x3A20", sp: "0xFFA8", regs: "A=12, B=8", state: "Running" },
    { pc: "0x5C40", sp: "0xFFD0", regs: "A=2, B=1", state: "Running" },
  ]

  useEffect(() => {
    const cycle = async () => {
      // Running phase
      setPhase("running")
      await new Promise((r) => setTimeout(r, 1500))
      
      // Saving phase
      setPhase("saving")
      await new Promise((r) => setTimeout(r, 1200))
      
      // Loading phase
      const nextProc = (activeProc + 1) % procs.length
      setPhase("loading")
      setPcbData(pcbSnapshots[nextProc])
      await new Promise((r) => setTimeout(r, 1200))
      
      // Switch to next
      setActiveProc(nextProc)
      setPhase("ready")
      await new Promise((r) => setTimeout(r, 300))
    }
    
    const id = setInterval(cycle, 4200)
    return () => clearInterval(id)
  }, [activeProc])

  const current = procs[activeProc]
  const next = procs[(activeProc + 1) % procs.length]

  return (
    <div className="flex gap-6 flex-1 min-h-0">
      {/* Main visualization */}
      <div className="flex-1 flex flex-col gap-4">
        {/* CPU and Process */}
        <div className="bg-slate-800/60 rounded-2xl p-6 border-2 transition-all duration-500"
          style={{ 
            borderColor: phase === "saving" ? "#f59e0b" : phase === "loading" ? "#22c55e" : "#22d3ee"
          }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <span className="text-white font-semibold">CPU Core</span>
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-bold transition-all"
              style={{
                backgroundColor: 
                  phase === "running" ? "#065f46" :
                  phase === "saving" ? "#92400e" :
                  phase === "loading" ? "#166534" : "#065f46",
                color: 
                  phase === "running" ? "#6ee7b7" :
                  phase === "saving" ? "#fde68a" :
                  phase === "loading" ? "#86efac" : "#6ee7b7",
              }}
            >
              {phase === "running" ? "EJECUTANDO" :
               phase === "saving" ? "GUARDANDO ESTADO" :
               phase === "loading" ? "CARGANDO ESTADO" : "LISTO"}
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Current process */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-500"
                style={{
                  backgroundColor: current.color,
                  opacity: phase === "saving" ? 0.5 : 1,
                  transform: phase === "saving" ? "scale(0.9)" : "scale(1)",
                }}
              >
                <current.icon className="w-12 h-12 text-white" />
              </div>
              <span className="text-white font-semibold">{current.id}</span>
            </div>

            {/* Arrow animation */}
            {(phase === "saving" || phase === "loading") && (
              <div className="flex flex-col items-center gap-2">
                <RotateCw 
                  className="w-8 h-8 animate-spin" 
                  style={{ color: phase === "saving" ? "#f59e0b" : "#22c55e" }}
                />
                <span className="text-xs text-slate-400">
                  {phase === "saving" ? "Guardando..." : "Cargando..."}
                </span>
              </div>
            )}

            {/* PCB visualization */}
            <div className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-700">
              <div className="text-slate-400 text-xs font-mono mb-3">Process Control Block (PCB)</div>
              <div className="space-y-2">
                {[
                  { label: "Program Counter", value: pcbData.pc, key: "pc" },
                  { label: "Stack Pointer", value: pcbData.sp, key: "sp" },
                  { label: "Registros", value: pcbData.regs, key: "regs" },
                  { label: "Estado", value: pcbData.state, key: "state" },
                ].map((item) => (
                  <div 
                    key={item.key}
                    className="flex justify-between items-center p-2 rounded transition-all duration-300"
                    style={{
                      backgroundColor: 
                        (phase === "saving" || phase === "loading") ? 
                        (phase === "saving" ? "#92400e33" : "#16653433") : 
                        "transparent",
                    }}
                  >
                    <span className="text-slate-500 text-xs">{item.label}</span>
                    <span 
                      className="font-mono text-sm transition-all"
                      style={{ 
                        color: (phase === "saving" || phase === "loading") ? 
                               (phase === "saving" ? "#fbbf24" : "#4ade80") : 
                               "#e2e8f0" 
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next process preview */}
            {phase === "loading" && (
              <div className="flex flex-col items-center gap-2 animate-pulse">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: next.color }}
                >
                  <next.icon className="w-10 h-10 text-white" />
                </div>
                <span className="text-slate-400 text-sm">{next.id}</span>
                <ArrowRight className="w-4 h-4 text-green-400" />
              </div>
            )}
          </div>
        </div>

        {/* Ready Queue */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
          <div className="text-slate-400 text-xs font-mono mb-3">Ready Queue</div>
          <div className="flex gap-3">
            {procs.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-500"
                style={{
                  backgroundColor: i === activeProc ? p.color : p.color + "33",
                  border: i === activeProc ? `2px solid ${p.color}` : "2px solid transparent",
                  transform: i === activeProc ? "scale(1.05)" : "scale(1)",
                }}
              >
                <p.icon className="w-5 h-5 text-white" />
                <span className="text-white font-semibold text-sm">{p.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Step by step explanation */}
      <div className="w-64 flex flex-col gap-3">
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 flex-1">
          <div className="text-white font-semibold text-sm mb-4">Pasos del Context Switch</div>
          {[
            { step: 1, text: "Timer interrupt: el quantum expiró", active: phase === "running" },
            { step: 2, text: "El SO guarda PC, SP y registros en el PCB del proceso actual", active: phase === "saving" },
            { step: 3, text: "El scheduler selecciona el siguiente proceso de la Ready Queue", active: phase === "saving" },
            { step: 4, text: "El SO restaura el estado del nuevo proceso desde su PCB", active: phase === "loading" },
            { step: 5, text: "El nuevo proceso continúa desde donde se detuvo", active: phase === "ready" },
          ].map((s) => (
            <div 
              key={s.step} 
              className="flex gap-3 mb-3 transition-all duration-300"
              style={{ opacity: s.active ? 1 : 0.4 }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  backgroundColor: s.active ? "#22d3ee" : "#334155",
                  color: s.active ? "#0a0a1a" : "#94a3b8",
                }}
              >
                {s.step}
              </div>
              <span className="text-slate-300 text-xs leading-relaxed">{s.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-900/30 rounded-xl p-3 border border-amber-700/40">
          <div className="text-amber-300 font-semibold text-xs mb-1">Costo del Context Switch</div>
          <p className="text-xs text-slate-400">
            Cada cambio de contexto toma tiempo de CPU. Por eso un quantum muy pequeño reduce la eficiencia del sistema.
          </p>
        </div>
      </div>
    </div>
  )
}

// Section 5: Fairness comparison
function RRSection5() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 400)
    return () => clearInterval(id)
  }, [])

  const fcfsTimeline = [
    { id: "P1", color: "#ef4444", len: 6 },
    { id: "P1", color: "#ef4444", len: 6 },
    { id: "P2", color: "#f97316", len: 4 },
    { id: "P3", color: "#22c55e", len: 9 },
    { id: "P4", color: "#3b82f6", len: 5 },
  ]

  const rrTimeline = [
    { id: "P1", color: "#ef4444" },
    { id: "P2", color: "#f97316" },
    { id: "P3", color: "#22c55e" },
    { id: "P4", color: "#3b82f6" },
    { id: "P1", color: "#ef4444" },
    { id: "P2", color: "#f97316" },
    { id: "P3", color: "#22c55e" },
    { id: "P4", color: "#3b82f6" },
    { id: "P1", color: "#ef4444" },
    { id: "P3", color: "#22c55e" },
    { id: "P4", color: "#3b82f6" },
    { id: "P3", color: "#22c55e" },
  ]

  const fcfsFlat: { id: string; color: string }[] = []
  for (const seg of fcfsTimeline) {
    for (let i = 0; i < seg.len; i++) fcfsFlat.push({ id: seg.id, color: seg.color })
  }

  const fcfsCursor = tick % (fcfsFlat.length + 2)
  const rrCursor = tick % (rrTimeline.length + 2)

  const fcfsWait = { P1: 0, P2: 12, P3: 16, P4: 25 }
  const rrWait = { P1: 3, P2: 4, P3: 4, P4: 4 }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* FCFS */}
        <div className="bg-slate-900 rounded-xl p-4 border border-red-500/30 flex flex-col gap-3">
          <div className="text-red-300 font-semibold text-sm">FCFS</div>
          <div className="text-xs text-slate-400">Un proceso monopoliza hasta que termina</div>
          <div className="flex gap-0.5 flex-wrap">
            {fcfsFlat.map((slot, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-sm flex items-center justify-center text-white font-bold"
                style={{
                  fontSize: "8px",
                  backgroundColor: slot.color,
                  opacity: i < fcfsCursor ? 1 : 0.15,
                  transform: i === fcfsCursor - 1 ? "scale(1.3)" : "scale(1)",
                }}
              >
                {slot.id}
              </div>
            ))}
          </div>
          <div className="space-y-1 mt-auto">
            <div className="text-xs text-slate-400 font-mono mb-1">Wait times:</div>
            {Object.entries(fcfsWait).map(([id, w]) => {
              const proc = RR_PROCESSES_BASE.find((p) => p.id === id)!
              return (
                <div key={id} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 w-6">{id}</span>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(w / 30) * 100}%`, backgroundColor: proc.color }}
                    />
                  </div>
                  <span className="text-xs font-mono text-red-400 w-5">{w}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* RR */}
        <div className="bg-slate-900 rounded-xl p-4 border border-green-500/30 flex flex-col gap-3">
          <div className="text-green-300 font-semibold text-sm">Round Robin (Q=4)</div>
          <div className="text-xs text-slate-400">Todos los procesos avanzan juntos</div>
          <div className="flex gap-0.5 flex-wrap">
            {rrTimeline.map((slot, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-sm flex items-center justify-center text-white font-bold"
                style={{
                  fontSize: "8px",
                  backgroundColor: slot.color,
                  opacity: i < rrCursor ? 1 : 0.15,
                  transform: i === rrCursor - 1 ? "scale(1.3)" : "scale(1)",
                }}
              >
                {slot.id}
              </div>
            ))}
          </div>
          <div className="space-y-1 mt-auto">
            <div className="text-xs text-slate-400 font-mono mb-1">Wait times:</div>
            {Object.entries(rrWait).map(([id, w]) => {
              const proc = RR_PROCESSES_BASE.find((p) => p.id === id)!
              return (
                <div key={id} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 w-6">{id}</span>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(w / 30) * 100}%`, backgroundColor: proc.color }}
                    />
                  </div>
                  <span className="text-xs font-mono text-green-400 w-5">{w}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 grid grid-cols-3 gap-4 text-center text-sm">
        {[
          { label: "Avg Wait FCFS", value: "13.3", color: "text-red-400" },
          { label: "Avg Wait RR", value: "3.75", color: "text-green-400" },
          { label: "Mejora", value: "72%", color: "text-cyan-400" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Section 6: Multiple Applications Simulation
function RRSection6() {
  const [tick, setTick] = useState(0)
  const [quantum, setQuantum] = useState(4)

  const apps = [
    { id: "Chrome", icon: Chrome, color: "#4285f4", burst: 10 },
    { id: "VS Code", icon: Code, color: "#007acc", burst: 8 },
    { id: "Spotify", icon: Music, color: "#1db954", burst: 6 },
    { id: "Game", icon: Gamepad2, color: "#ff6b6b", burst: 12 },
    { id: "Terminal", icon: Terminal, color: "#2d2d2d", burst: 5 },
  ]

  // Build schedule
  const buildSchedule = (q: number) => {
    const schedule: { id: string; color: string; icon: any }[] = []
    const remaining = apps.map((a) => ({ ...a, left: a.burst }))
    let iterations = 0
    while (remaining.some((r) => r.left > 0) && iterations < 200) {
      for (const app of remaining) {
        if (app.left <= 0) continue
        const run = Math.min(app.left, q)
        for (let i = 0; i < run; i++) {
          schedule.push({ id: app.id, color: app.color, icon: app.icon })
        }
        app.left -= run
      }
      iterations++
    }
    return schedule
  }

  const schedule = buildSchedule(quantum)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % schedule.length), 200)
    return () => clearInterval(id)
  }, [schedule.length])

  const currentApp = schedule[tick]
  const queueApps = apps.filter((a) => a.id !== currentApp?.id)

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="text-slate-300 text-sm">
        <Monitor className="w-4 h-4 inline mr-2" />
        Simulación: Múltiples aplicaciones en tu computadora
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Desktop visualization */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700 flex-1">
            <div className="text-slate-400 text-xs mb-4">
              El usuario piensa que todas las apps corren al mismo tiempo, pero...
            </div>

            {/* Apps grid */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: currentApp?.id === app.id ? app.color + "33" : "transparent",
                    border: currentApp?.id === app.id ? `2px solid ${app.color}` : "2px solid transparent",
                    transform: currentApp?.id === app.id ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: app.color }}
                  >
                    <app.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-slate-300">{app.id}</span>
                  {currentApp?.id === app.id && (
                    <span className="text-xs text-cyan-400 font-mono animate-pulse">Activo</span>
                  )}
                </div>
              ))}
            </div>

            {/* CPU Timeline */}
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-2 font-mono">
                CPU Timeline (Q={quantum}) — La realidad:
              </div>
              <div className="flex gap-0.5 flex-wrap max-h-16 overflow-hidden">
                {schedule.slice(0, 50).map((slot, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-sm flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: slot.color,
                      opacity: i <= tick ? 1 : 0.15,
                      transform: i === tick ? "scale(1.3)" : "scale(1)",
                    }}
                  >
                    <slot.icon className="w-2.5 h-2.5 text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quantum slider */}
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="text-slate-400 text-xs">Time Quantum:</div>
              <input
                type="range"
                min={1}
                max={10}
                value={quantum}
                onChange={(e) => setQuantum(Number(e.target.value))}
                className="flex-1 accent-cyan-400"
              />
              <span className="text-cyan-400 font-mono font-bold">{quantum}</span>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="w-56 flex flex-col gap-3">
          <div className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-700/40 flex-1">
            <div className="text-cyan-300 font-semibold text-sm mb-3">La ilusión de multitarea</div>
            <div className="text-xs text-slate-300 space-y-2">
              <p>Aunque parece que Chrome, VS Code y Spotify funcionan al mismo tiempo...</p>
              <p className="text-cyan-400 font-semibold">La CPU solo puede ejecutar UNA instrucción a la vez.</p>
              <p>Round Robin cambia entre aplicaciones tan rápido que no lo notamos.</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
            <div className="text-white text-xs font-semibold mb-2">Estadísticas</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Apps activas</span>
                <span className="text-cyan-400 font-bold">{apps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cambios/seg</span>
                <span className="text-amber-400 font-bold">~{Math.floor(1000 / (quantum * 50))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Section 7: Web Server Simulation
function RRSection7() {
  const [tick, setTick] = useState(0)

  const requests = [
    { id: "User A", color: "#ef4444", burst: 6 },
    { id: "User B", color: "#f97316", burst: 4 },
    { id: "User C", color: "#22c55e", burst: 8 },
    { id: "User D", color: "#3b82f6", burst: 5 },
  ]

  const quantum = 2

  // Build schedule
  const schedule: { id: string; color: string }[] = []
  const remaining = requests.map((r) => ({ ...r, left: r.burst }))
  while (remaining.some((r) => r.left > 0)) {
    for (const req of remaining) {
      if (req.left <= 0) continue
      const run = Math.min(req.left, quantum)
      for (let i = 0; i < run; i++) {
        schedule.push({ id: req.id, color: req.color })
      }
      req.left -= run
    }
  }

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % schedule.length), 300)
    return () => clearInterval(id)
  }, [schedule.length])

  const currentReq = schedule[tick]
  const inQueue = requests.filter((r) => r.id !== currentReq?.id)

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="text-slate-300 text-sm">
        <Globe className="w-4 h-4 inline mr-2" />
        Simulación: Servidor web atendiendo múltiples solicitudes
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Server visualization */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
            <div className="flex items-center gap-8">
              {/* Incoming requests */}
              <div className="flex flex-col gap-2">
                <div className="text-slate-400 text-xs font-mono mb-2">Solicitudes entrantes</div>
                {inQueue.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ backgroundColor: req.color + "33", border: `1px solid ${req.color}55` }}
                  >
                    <Users className="w-4 h-4" style={{ color: req.color }} />
                    <span className="text-white text-sm">{req.id}</span>
                  </div>
                ))}
              </div>

              <ArrowRight className="w-6 h-6 text-slate-500" />

              {/* Ready Queue */}
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                <div className="text-slate-400 text-xs font-mono mb-3">Ready Queue</div>
                <div className="flex gap-2">
                  {requests.map((req, i) => (
                    <div
                      key={req.id}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all"
                      style={{
                        backgroundColor: req.color,
                        opacity: req.id === currentReq?.id ? 0.3 : 1,
                      }}
                    >
                      {req.id.split(" ")[1]}
                    </div>
                  ))}
                </div>
              </div>

              <ArrowRight className="w-6 h-6 text-cyan-400" />

              {/* Server CPU */}
              <div className="bg-slate-900 rounded-2xl p-6 border-2 border-cyan-400">
                <Server className="w-8 h-8 text-cyan-400 mb-2 mx-auto" />
                <div className="text-xs text-slate-400 mb-2 text-center">Procesando</div>
                {currentReq && (
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold mx-auto animate-pulse"
                    style={{ backgroundColor: currentReq.color }}
                  >
                    {currentReq.id.split(" ")[1]}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 flex-1">
            <div className="text-xs text-slate-400 mb-3 font-mono">
              Timeline de procesamiento (Q={quantum})
            </div>
            <div className="flex gap-0.5 flex-wrap">
              {schedule.map((slot, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-sm flex items-center justify-center text-white font-bold transition-all"
                  style={{
                    fontSize: "10px",
                    backgroundColor: slot.color,
                    opacity: i <= tick ? 1 : 0.15,
                    transform: i === tick ? "scale(1.2)" : "scale(1)",
                  }}
                >
                  {slot.id.split(" ")[1]}
                </div>
              ))}
            </div>

            {/* Progress per request */}
            <div className="mt-4 space-y-2">
              {requests.map((req) => {
                const done = schedule.slice(0, tick + 1).filter((s) => s.id === req.id).length
                const pct = Math.min(100, (done / req.burst) * 100)
                return (
                  <div key={req.id} className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-16">{req.id}</span>
                    <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: req.color }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 font-mono w-10">
                      {pct === 100 ? "Done" : `${done}/${req.burst}`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="w-56 flex flex-col gap-3">
          <div className="bg-green-900/30 rounded-xl p-4 border border-green-700/40 flex-1">
            <div className="text-green-300 font-semibold text-sm mb-3">Ventaja de Round Robin</div>
            <div className="text-xs text-slate-300 space-y-2">
              <p>Ningún usuario monopoliza el servidor.</p>
              <p>Todos reciben respuestas parciales rápidamente.</p>
              <p className="text-green-400 font-semibold">
                Mejor experiencia para todos los usuarios.
              </p>
            </div>
          </div>

          <div className="bg-red-900/30 rounded-xl p-4 border border-red-700/40">
            <div className="text-red-300 font-semibold text-xs mb-2">Sin Round Robin (FCFS)</div>
            <p className="text-xs text-slate-400">
              User C (8 unidades) bloquearía a todos los demás hasta terminar. User D esperaría 18 unidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Section 8: JavaScript Event Loop Connection
function RRSection8() {
  const [tick, setTick] = useState(0)

  const tasks = [
    { id: "HTTP Req", color: "#3b82f6", icon: Globe },
    { id: "Timer", color: "#f59e0b", icon: Clock },
    { id: "UI Update", color: "#22c55e", icon: Monitor },
    { id: "Promise", color: "#a855f7", icon: Zap },
  ]

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % tasks.length), 800)
    return () => clearInterval(id)
  }, [])

  const currentTask = tasks[tick]
  const queueTasks = [...tasks.slice(tick + 1), ...tasks.slice(0, tick)]

  return (
    <div className="flex gap-6 flex-1 min-h-0">
      {/* Event Loop visualization */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
          <div className="text-slate-300 text-sm font-semibold mb-4">
            <Code className="w-4 h-4 inline mr-2" />
            JavaScript Event Loop
          </div>

          <div className="flex items-center justify-center gap-6">
            {/* Task Queue */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
              <div className="text-slate-400 text-xs font-mono mb-3">Task Queue</div>
              <div className="flex flex-col gap-2">
                {queueTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ backgroundColor: task.color + "33" }}
                  >
                    <task.icon className="w-4 h-4" style={{ color: task.color }} />
                    <span className="text-white text-xs">{task.id}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="w-6 h-6 text-amber-400" />
              <div className="text-xs text-amber-400 font-mono">Event Loop</div>
              <RotateCw className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: "2s" }} />
            </div>

            {/* Call Stack / Execution */}
            <div className="bg-slate-900 rounded-2xl p-6 border-2 border-amber-400">
              <div className="text-amber-400 text-xs font-mono mb-3 text-center">Ejecutando</div>
              <div
                className="w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-500"
                style={{ backgroundColor: currentTask.color }}
              >
                <currentTask.icon className="w-8 h-8 text-white" />
                <span className="text-white text-xs font-bold">{currentTask.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline comparison */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 flex-1">
          <div className="text-xs text-slate-400 mb-3 font-mono">
            Similitud con Round Robin:
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/60 rounded-lg p-3">
              <div className="text-cyan-400 font-semibold text-xs mb-2">Round Robin (SO)</div>
              <div className="flex gap-1">
                {["P1", "P2", "P3", "P4", "P1", "P2"].map((p, i) => (
                  <div
                    key={i}
                    className="flex-1 h-6 rounded text-xs text-white font-bold flex items-center justify-center"
                    style={{
                      backgroundColor: 
                        p === "P1" ? "#ef4444" :
                        p === "P2" ? "#f97316" :
                        p === "P3" ? "#22c55e" : "#3b82f6",
                      opacity: i <= tick ? 1 : 0.3,
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-2">Procesos rotan en la CPU</div>
            </div>

            <div className="bg-slate-800/60 rounded-lg p-3">
              <div className="text-amber-400 font-semibold text-xs mb-2">Event Loop (JS)</div>
              <div className="flex gap-1">
                {tasks.concat(tasks.slice(0, 2)).map((task, i) => (
                  <div
                    key={i}
                    className="flex-1 h-6 rounded flex items-center justify-center"
                    style={{
                      backgroundColor: task.color,
                      opacity: i <= tick ? 1 : 0.3,
                    }}
                  >
                    <task.icon className="w-3 h-3 text-white" />
                  </div>
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-2">Tareas rotan en el Event Loop</div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-64 flex flex-col gap-3">
        <div className="bg-amber-900/30 rounded-xl p-4 border border-amber-700/40 flex-1">
          <div className="text-amber-300 font-semibold text-sm mb-3">Conexión conceptual</div>
          <div className="text-xs text-slate-300 space-y-3">
            <p>
              Aunque JavaScript es <span className="text-amber-400 font-semibold">single-threaded</span>, 
              puede manejar muchas tareas simultáneamente.
            </p>
            <p>
              El <span className="text-amber-400 font-semibold">Event Loop</span> procesa tareas 
              en secuencia, similar a cómo Round Robin distribuye tiempo de CPU.
            </p>
            <p>
              Ninguna tarea bloquea a las demás por mucho tiempo, permitiendo 
              una experiencia de usuario fluida.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
          <div className="text-white text-xs font-semibold mb-2">Analogía</div>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Ready Queue</span>
              <span className="text-amber-400">≈ Task Queue</span>
            </div>
            <div className="flex justify-between">
              <span>CPU</span>
              <span className="text-amber-400">≈ Call Stack</span>
            </div>
            <div className="flex justify-between">
              <span>Scheduler</span>
              <span className="text-amber-400">≈ Event Loop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Round Robin Slide with all sections
export function RoundRobinSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [section, setSection] = useState(0)

  const sections = [
    { title: "Idea General", short: "Concepto" },
    { title: "Simulación Básica", short: "Simulación" },
    { title: "Time Quantum", short: "Quantum" },
    { title: "Context Switch", short: "Ctx Switch" },
    { title: "Fairness", short: "Fairness" },
    { title: "Apps en PC", short: "Apps PC" },
    { title: "Web Server", short: "Server" },
    { title: "Event Loop", short: "JS Loop" },
  ]

  return (
    <div className="w-full h-full bg-[#0f1729] flex flex-col p-8 relative">
      <div className="mb-3">
        <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">Tema 04</div>
        <h2 className="text-3xl font-bold text-white">Round Robin con Procesos CPU-bound</h2>
        <div className="h-0.5 w-20 bg-cyan-400 mt-2" />
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 mb-3 flex-wrap">
        {sections.map((s, i) => (
          <button
            key={i}
            onClick={() => setSection(i)}
            className="px-2 py-1 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: section === i ? "#22d3ee22" : "transparent",
              color: section === i ? "#22d3ee" : "#64748b",
              border: section === i ? "1px solid #22d3ee55" : "1px solid #1e293b",
            }}
          >
            <span className="text-slate-500 mr-1">{String(i + 1).padStart(2, "0")}</span>
            {s.short}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="text-slate-400 text-xs font-mono mb-2">{sections[section].title}</div>
        {section === 0 && <RRSection1 />}
        {section === 1 && <RRSection2 />}
        {section === 2 && <RRSection3 />}
        {section === 3 && <RRSection4 />}
        {section === 4 && <RRSection5 />}
        {section === 5 && <RRSection6 />}
        {section === 6 && <RRSection7 />}
        {section === 7 && <RRSection8 />}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between mt-2">
        <button
          disabled={section === 0}
          onClick={() => setSection((s) => s - 1)}
          className="px-4 py-1.5 rounded-lg bg-slate-700 text-white text-xs disabled:opacity-30 hover:bg-slate-600"
        >
          Anterior
        </button>
        <div className="flex gap-1">
          {sections.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all cursor-pointer"
              style={{ backgroundColor: section === i ? "#22d3ee" : "#334155" }}
              onClick={() => setSection(i)}
            />
          ))}
        </div>
        <button
          disabled={section === sections.length - 1}
          onClick={() => setSection((s) => s + 1)}
          className="px-4 py-1.5 rounded-lg bg-cyan-700 text-white text-xs disabled:opacity-30 hover:bg-cyan-600"
        >
          Siguiente
        </button>
      </div>

      <Presenter name="Frainer Encarnación" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   TEMA 5 — Performance Analysis (Christopher Marrero)
   Advanced: live simulation with metrics dashboard
───────────────────────────────────────────── */
const PERF_PROCESSES = [
  { id: "P1", burst: 10, color: "#ef4444" },
  { id: "P2", burst: 6, color: "#f97316" },
  { id: "P3", burst: 14, color: "#22c55e" },
  { id: "P4", burst: 8, color: "#3b82f6" },
  { id: "P5", burst: 5, color: "#a855f7" },
]

function buildFCFSStats() {
  let t = 0
  return PERF_PROCESSES.map((p) => {
    const start = t
    const wait = start
    const turnaround = start + p.burst
    t += p.burst
    return { ...p, wait, turnaround }
  })
}

function buildRRStats(q: number) {
  const remaining = PERF_PROCESSES.map((p) => ({ ...p, remaining: p.burst, firstRun: -1 }))
  let t = 0
  const finishTime: Record<string, number> = {}
  while (remaining.some((p) => p.remaining > 0)) {
    for (const p of remaining) {
      if (p.remaining <= 0) continue
      if (p.firstRun === -1) p.firstRun = t
      const run = Math.min(p.remaining, q)
      t += run
      p.remaining -= run
      if (p.remaining === 0) finishTime[p.id] = t
    }
  }
  return PERF_PROCESSES.map((p) => {
    const proc = remaining.find((r) => r.id === p.id)!
    const turnaround = finishTime[p.id]
    const wait = turnaround - p.burst
    const response = proc.firstRun
    return { ...p, wait, turnaround, response }
  })
}

export function PerformanceAnalysisSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [quantum, setQuantum] = useState(4)
  const [activeMetric, setActiveMetric] = useState<"wait" | "turnaround" | "response">("wait")

  const fcfsStats = buildFCFSStats()
  const rrStats = buildRRStats(quantum)

  const fcfsAvgWait = fcfsStats.reduce((s, p) => s + p.wait, 0) / fcfsStats.length
  const rrAvgWait = rrStats.reduce((s, p) => s + p.wait, 0) / rrStats.length
  const fcfsAvgTA = fcfsStats.reduce((s, p) => s + p.turnaround, 0) / fcfsStats.length
  const rrAvgTA = rrStats.reduce((s, p) => s + p.turnaround, 0) / rrStats.length

  const maxVal = Math.max(
    ...fcfsStats.map((p) => activeMetric === "wait" ? p.wait : p.turnaround),
    ...rrStats.map((p) => activeMetric === "wait" ? p.wait : p.turnaround)
  )

  return (
    <div className="w-full h-full bg-[#0f1729] flex flex-col p-10 relative">
      <div className="mb-4">
        <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">Tema 05</div>
        <h2 className="text-4xl font-bold text-white">Análisis de Rendimiento del Sistema</h2>
        <div className="h-0.5 w-20 bg-cyan-400 mt-2" />
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        {/* Controls + summary */}
        <div className="w-52 flex flex-col gap-3">
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <div className="text-white text-xs font-semibold mb-2">Time Quantum (RR)</div>
            <input
              type="range"
              min={1}
              max={15}
              value={quantum}
              onChange={(e) => setQuantum(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <div className="text-cyan-400 font-mono text-center font-bold">{quantum}</div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <div className="text-white text-xs font-semibold mb-3">Métrica a mostrar</div>
            {(["wait", "turnaround", "response"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMetric(m)}
                className="w-full text-left px-2 py-1.5 rounded text-xs mb-1 transition-all"
                style={{
                  backgroundColor: activeMetric === m ? "#22d3ee22" : "transparent",
                  color: activeMetric === m ? "#22d3ee" : "#64748b",
                  border: activeMetric === m ? "1px solid #22d3ee55" : "1px solid transparent",
                }}
              >
                {m === "wait" ? "Waiting Time" : m === "turnaround" ? "Turnaround Time" : "Response Time"}
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 text-xs space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">FCFS Avg Wait</span>
              <span className="text-red-400 font-bold">{fcfsAvgWait.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">RR Avg Wait</span>
              <span className="text-green-400 font-bold">{rrAvgWait.toFixed(1)}</span>
            </div>
            <div className="h-px bg-slate-700" />
            <div className="flex justify-between">
              <span className="text-slate-400">Mejora</span>
              <span className="text-cyan-400 font-bold">
                {(((fcfsAvgWait - rrAvgWait) / fcfsAvgWait) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">FCFS Avg TA</span>
              <span className="text-red-400 font-bold">{fcfsAvgTA.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">RR Avg TA</span>
              <span className="text-green-400 font-bold">{rrAvgTA.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Bar chart comparison */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 flex-1">
            <div className="text-slate-300 text-xs font-semibold mb-4">
              Comparación por proceso —{" "}
              {activeMetric === "wait" ? "Waiting Time" : activeMetric === "turnaround" ? "Turnaround Time" : "Response Time"}
            </div>
            <div className="flex gap-4 h-full pb-8">
              {PERF_PROCESSES.map((proc, i) => {
                const fcfsVal = activeMetric === "wait" ? fcfsStats[i].wait : fcfsStats[i].turnaround
                const rrVal = activeMetric === "wait" ? rrStats[i].wait : rrStats[i].turnaround
                const fcfsPct = maxVal > 0 ? (fcfsVal / maxVal) * 100 : 0
                const rrPct = maxVal > 0 ? (rrVal / maxVal) * 100 : 0

                return (
                  <div key={proc.id} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex-1 w-full flex items-end gap-1">
                      {/* FCFS bar */}
                      <div className="flex-1 flex flex-col items-center justify-end h-full">
                        <div className="text-xs text-red-400 font-mono mb-1">{fcfsVal}</div>
                        <div
                          className="w-full rounded-t transition-all duration-500"
                          style={{
                            height: `${fcfsPct}%`,
                            minHeight: 4,
                            backgroundColor: "#ef444466",
                            border: "1px solid #ef4444",
                          }}
                        />
                      </div>
                      {/* RR bar */}
                      <div className="flex-1 flex flex-col items-center justify-end h-full">
                        <div className="text-xs text-green-400 font-mono mb-1">{rrVal}</div>
                        <div
                          className="w-full rounded-t transition-all duration-500"
                          style={{
                            height: `${rrPct}%`,
                            minHeight: 4,
                            backgroundColor: proc.color + "66",
                            border: `1px solid ${proc.color}`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 font-bold">{proc.id}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CPU Utilization */}
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <div className="text-slate-300 text-xs font-semibold mb-3">CPU Utilization & Throughput</div>
            <div className="grid grid-cols-4 gap-3 text-center text-xs">
              {[
                { label: "CPU Utilization (FCFS)", value: "100%", color: "text-slate-300" },
                { label: "CPU Utilization (RR)", value: "100%", color: "text-slate-300" },
                { label: "Throughput (FCFS)", value: `${(5 / (PERF_PROCESSES.reduce((s, p) => s + p.burst, 0) / 5)).toFixed(2)}`, color: "text-red-400" },
                { label: "Throughput (RR)", value: `${(5 / (rrAvgTA)).toFixed(2)}`, color: "text-green-400" },
              ].map((s) => (
                <div key={s.label} className="bg-slate-900/60 rounded-lg p-2">
                  <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/50 border border-red-500 inline-block" /> FCFS</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-cyan-500/50 border border-cyan-500 inline-block" /> Round Robin (Q={quantum})</span>
          </div>
        </div>
      </div>

      <Presenter name="Christopher Marrero" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   CONCLUSION SLIDE
───────────────────────────────────────────── */
export function WebSimConclusionSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const members = [
    "Algenis De los Santos",
    "Oliver Abreu",
    "Enmanuel Santos",
    "Frainer Encarnación",
    "Christopher Marrero",
  ]

  return (
    <div className="w-full h-full bg-[#0a0a1a] flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl w-full px-16 space-y-10 z-10 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white">Muchas gracias por su atención</h1>
          <div className="h-1 w-32 bg-cyan-400 rounded-full mx-auto" />
        </div>

        <div className="space-y-6">
          <div className="text-cyan-400 text-2xl font-bold font-mono">Los Ingenieros</div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            {members.map((m) => (
              <span
                key={m}
                className="text-sm font-mono text-slate-300 border border-slate-700 px-4 py-2 rounded-full bg-slate-800/50"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <div className="text-slate-500 text-sm font-mono">
            Arquitectura del Computador
          </div>
        </div>
      </div>
    </div>
  )
}
