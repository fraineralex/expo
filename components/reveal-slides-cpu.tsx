"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Cpu, Zap, Play, Pause, RotateCcw, Monitor, Gamepad2, Briefcase, TrendingUp, ChevronRight, Settings, Layers, Clock, Activity, BarChart3, Gauge, Server, Smartphone, Laptop } from "lucide-react"

// ============================================
// SLIDE 1: TITLE - ARQUITECTURA Y CLASIFICACION DE LOS PROCESADORES MODERNOS
// ============================================
export function TitleSlideContent() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `rgba(${Math.random() > 0.5 ? '34, 211, 238' : '168, 85, 247'}, ${Math.random() * 0.5 + 0.2})`,
              animation: `particle-float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 gradient-animate">
              ARQUITECTURA Y
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mt-2">
              CLASIFICACION DE LOS
            </span>
            <span className="block text-white/90 text-4xl md:text-5xl font-light mt-4">
              PROCESADORES MODERNOS
            </span>
          </h1>
        </div>

        {/* Floating CPU icons */}
        <div className="flex justify-center gap-8 mt-12">
          {[
            { label: "Intel", color: "cyan" },
            { label: "AMD", color: "red" },
            { label: "Apple", color: "gray" },
            { label: "ARM", color: "green" },
          ].map(({ label, color }, i) => (
            <div
              key={label}
              className="floating-icon"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className={`
                p-4 rounded-2xl backdrop-blur-xl
                bg-gradient-to-br from-${color}-500/20 to-${color}-600/10
                border border-${color}-500/30
                shadow-lg shadow-${color}-500/20
                hover:scale-110 transition-transform duration-300
              `}>
                <Cpu className={`h-8 w-8 text-${color}-400`} />
                <span className="block text-xs mt-2 text-white/70 font-mono">{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Team name */}
        <div className="mt-16">
          <p className="text-lg text-white/50 font-light">Presentado por</p>
          <h2 className="text-3xl font-bold text-white mt-2">
            <span className="neon-text text-cyan-400">Los Ingenieros</span>
          </h2>
        </div>
      </div>

      <style jsx>{`
        @keyframes particle-float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        .floating-icon {
          animation: icon-float 4s ease-in-out infinite;
        }
        .floating-icon:nth-child(2) { animation-delay: -1s; }
        .floating-icon:nth-child(3) { animation-delay: -2s; }
        .floating-icon:nth-child(4) { animation-delay: -3s; }
        @keyframes icon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  )
}

// ============================================
// SLIDE 2: EL PROCESADOR (CPU) - INTERACTIVE SIMULATION
// ============================================
export function CPUIntroSlideContent() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentInstruction, setCurrentInstruction] = useState(0)
  const [registers, setRegisters] = useState([0, 5, 3, 0, 0, 0, 0, 0])
  const [dataFlowing, setDataFlowing] = useState<string | null>(null)
  const [output, setOutput] = useState<string[]>([])
  
  const instructions = [
    { op: "LOAD", args: "R0, [10]", desc: "Cargar dato de memoria" },
    { op: "LOAD", args: "R1, [11]", desc: "Cargar segundo operando" },
    { op: "ADD", args: "R2, R0, R1", desc: "Sumar R0 + R1" },
    { op: "STORE", args: "R2, [12]", desc: "Guardar resultado" },
    { op: "PRINT", args: "R2", desc: "Mostrar resultado" },
  ]

  const memory = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 58, 0])

  useEffect(() => {
    if (!isRunning) return
    
    const timer = setInterval(() => {
      setCurrentInstruction(prev => {
        if (prev >= instructions.length) {
          setIsRunning(false)
          return 0
        }
        
        const instr = instructions[prev]
        setDataFlowing(instr.op)
        
        setTimeout(() => {
          setRegisters(regs => {
            const newRegs = [...regs]
            if (instr.op === "LOAD" && prev === 0) newRegs[0] = memory.current[10]
            if (instr.op === "LOAD" && prev === 1) newRegs[1] = memory.current[11]
            if (instr.op === "ADD") newRegs[2] = newRegs[0] + newRegs[1]
            if (instr.op === "STORE") memory.current[12] = newRegs[2]
            if (instr.op === "PRINT") {
              setOutput(o => [...o, `Resultado: ${newRegs[2]}`])
            }
            return newRegs
          })
          setDataFlowing(null)
        }, 400)
        
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, instructions.length])

  const reset = () => {
    setIsRunning(false)
    setCurrentInstruction(0)
    setRegisters([0, 5, 3, 0, 0, 0, 0, 0])
    setOutput([])
    memory.current = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 58, 0]
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <span className="text-cyan-400 font-mono text-sm tracking-widest">02 // EL PROCESADOR</span>
        <h2 className="text-3xl font-bold text-white mt-2">El Cerebro del Computador</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Oliver Abreu Mateo - 25-1619</p>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-4">
        {/* Left - Explanation */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Como un Director de Empresa
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              El procesador es como el director de una empresa: toma decisiones y organiza el trabajo. 
              Interpreta instrucciones, procesa datos y coordina todos los componentes.
            </p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-purple-400 font-semibold mb-2">Instrucciones</h3>
            <div className="space-y-1 font-mono text-xs">
              {instructions.map((instr, i) => (
                <div 
                  key={i}
                  className={`p-2 rounded transition-all ${
                    i === currentInstruction - 1 ? 'bg-cyan-500/30 border-l-2 border-cyan-400' :
                    i < currentInstruction ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  <span className="text-cyan-400">{instr.op}</span> {instr.args}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center - CPU Visualization */}
        <div className="relative">
          <svg viewBox="0 0 300 280" className="w-full h-full">
            {/* CPU Package */}
            <rect x="50" y="40" width="200" height="200" rx="10" 
              fill="#0a1628" stroke="#22d3ee" strokeWidth="2" />
            
            {/* CPU Die */}
            <rect x="80" y="70" width="140" height="140" rx="5" 
              fill="#1a1a3e" stroke="#a855f7" strokeWidth="1" />
            
            {/* ALU */}
            <rect x="100" y="90" width="60" height="40" rx="3" 
              fill={dataFlowing === "ADD" ? "#22d3ee33" : "#0f172a"} 
              stroke={dataFlowing === "ADD" ? "#22d3ee" : "#334155"} strokeWidth="1">
              <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
            </rect>
            <text x="130" y="115" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">ALU</text>
            
            {/* Control Unit */}
            <rect x="170" y="90" width="40" height="40" rx="3" 
              fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
            <text x="190" y="115" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="bold">CU</text>
            
            {/* Registers */}
            <g>
              <rect x="100" y="145" width="100" height="50" rx="3" 
                fill="#0f172a" stroke="#34d399" strokeWidth="1" />
              <text x="150" y="160" textAnchor="middle" fill="#34d399" fontSize="8">REGISTROS</text>
              <text x="150" y="185" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">
                R0:{registers[0]} R1:{registers[1]} R2:{registers[2]}
              </text>
            </g>

            {/* Data flow animation */}
            {dataFlowing && (
              <circle r="4" fill="#22d3ee">
                <animate attributeName="cx" values="150;150" dur="0.5s" />
                <animate attributeName="cy" values="200;120" dur="0.5s" />
              </circle>
            )}

            {/* Pins */}
            {[...Array(8)].map((_, i) => (
              <rect key={`pin-l-${i}`} x="40" y={60 + i * 22} width="15" height="8" fill="#fbbf24" rx="1" />
            ))}
            {[...Array(8)].map((_, i) => (
              <rect key={`pin-r-${i}`} x="245" y={60 + i * 22} width="15" height="8" fill="#fbbf24" rx="1" />
            ))}
          </svg>
        </div>

        {/* Right - Memory & Output */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-green-400 font-semibold mb-2">Memoria</h3>
            <div className="grid grid-cols-4 gap-1 font-mono text-xs">
              {memory.current.slice(10, 13).map((val, i) => (
                <div key={i} className="bg-black/30 p-2 rounded text-center">
                  <div className="text-gray-500">[{10 + i}]</div>
                  <div className="text-white">{val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/50 rounded-xl p-4 border border-white/10 h-32">
            <h3 className="text-gray-400 font-semibold mb-2 text-xs">Terminal</h3>
            <div className="font-mono text-xs text-green-400">
              {output.map((line, i) => (
                <div key={i}>&gt; {line}</div>
              ))}
              {isRunning && <span className="animate-pulse">_</span>}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? 'Pausar' : 'Ejecutar'}
            </button>
            <button
              onClick={reset}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 3: CONCEPTOS CLAVE DEL PROCESADOR - INTERACTIVE
// ============================================
export function CPUConceptsSlideContent() {
  const [activeTab, setActiveTab] = useState<'que' | 'como' | 'para'>('que')
  const [clockSpeed, setClockSpeed] = useState(3.0)
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse(true)
      setTimeout(() => setShowPulse(false), 100)
    }, 1000 / clockSpeed)
    return () => clearInterval(interval)
  }, [clockSpeed])

  const concepts = {
    que: {
      title: "Que e' un CPU?",
      content: "La Unidad Central de Procesamiento es el chip que ejecuta todas las instrucciones de los programas. Contiene la ALU (operaciones matematicas), la Unidad de Control (coordina todo) y los Registros (memoria ultra-rapida).",
      color: "cyan"
    },
    como: {
      title: "Como trabaja eso?",
      content: "El CPU trabaja en ciclos controlados por un reloj. Cada ciclo: 1) Fetch (buscar instruccion), 2) Decode (entenderla), 3) Execute (ejecutarla), 4) Writeback (guardar resultado). Esto pasa BILLONES de veces por segundo.",
      color: "purple"
    },
    para: {
      title: "Pa' que me sirve?",
      content: "Sin CPU no hay computadora. Determina que tan rapido puedes: abrir apps, jugar videojuegos, editar videos, compilar codigo. Un CPU mas potente = menos tiempo esperando.",
      color: "green"
    }
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <span className="text-purple-400 font-mono text-sm tracking-widest">03 // CONCEPTOS CLAVE</span>
        <h2 className="text-3xl font-bold text-white mt-2">Entendiendo el Procesador</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Oliver Abreu Mateo - 25-1619</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Left - Tabs and content */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['que', 'como', 'para'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? `bg-${concepts[tab].color}-500/30 border border-${concepts[tab].color}-500 text-${concepts[tab].color}-400`
                    : 'bg-white/5 border border-white/10 text-gray-400'
                }`}
              >
                {concepts[tab].title}
              </button>
            ))}
          </div>

          <div className={`bg-white/5 rounded-xl p-6 border border-${concepts[activeTab].color}-500/30`}>
            <h3 className={`text-xl font-bold text-${concepts[activeTab].color}-400 mb-4`}>
              {concepts[activeTab].title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {concepts[activeTab].content}
            </p>
          </div>
        </div>

        {/* Right - Clock Speed Simulator */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Simulador de Frecuencia de Reloj
          </h3>

          <div className="relative h-40 flex items-center justify-center mb-6">
            <div className={`w-32 h-32 rounded-full border-4 border-cyan-500 flex items-center justify-center transition-all ${
              showPulse ? 'scale-110 shadow-lg shadow-cyan-500/50' : 'scale-100'
            }`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{clockSpeed.toFixed(1)}</div>
                <div className="text-sm text-gray-400">GHz</div>
              </div>
            </div>
            
            {/* Pulse rings */}
            {showPulse && (
              <>
                <div className="absolute w-40 h-40 rounded-full border border-cyan-400/50 animate-ping" />
                <div className="absolute w-48 h-48 rounded-full border border-cyan-400/30 animate-ping" style={{ animationDelay: '0.1s' }} />
              </>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Frecuencia: {clockSpeed.toFixed(1)} GHz</label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={clockSpeed}
                onChange={(e) => setClockSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-gray-400">Ciclos/segundo</div>
                <div className="text-xl font-mono text-cyan-400">
                  {(clockSpeed * 1e9).toExponential(2)}
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-gray-400">Tiempo/ciclo</div>
                <div className="text-xl font-mono text-purple-400">
                  {(1 / clockSpeed).toFixed(2)} ns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 4: FAMILIAS PRINCIPALES - INTERACTIVE COMPARISON
// ============================================
export function CPUFamiliesSlideContent() {
  const [selectedFamily, setSelectedFamily] = useState<'intel' | 'amd' | 'apple'>('intel')
  const [selectedTier, setSelectedTier] = useState(0)

  const families = {
    intel: {
      name: "Intel Core",
      color: "#0071c5",
      tiers: [
        { name: "i3", level: "Basico", cores: "4", performance: 40, price: "$100-150", useCase: "Oficina, web, tareas ligeras" },
        { name: "i5", level: "Gama Media", cores: "6-10", performance: 65, price: "$200-300", useCase: "Gaming, productividad" },
        { name: "i7", level: "Alto Rendimiento", cores: "8-16", performance: 85, price: "$350-500", useCase: "Gaming intenso, creacion contenido" },
        { name: "i9", level: "Entusiasta", cores: "16-24", performance: 100, price: "$550-700", useCase: "Workstation, streaming" },
      ]
    },
    amd: {
      name: "AMD Ryzen",
      color: "#ed1c24",
      tiers: [
        { name: "Ryzen 3", level: "Basico", cores: "4", performance: 42, price: "$80-130", useCase: "Oficina, gaming basico" },
        { name: "Ryzen 5", level: "Gama Media", cores: "6", performance: 68, price: "$150-250", useCase: "Gaming, multitarea" },
        { name: "Ryzen 7", level: "Alto Rendimiento", cores: "8", performance: 88, price: "$300-400", useCase: "Gaming AAA, streaming" },
        { name: "Ryzen 9", level: "Entusiasta", cores: "12-16", performance: 98, price: "$450-600", useCase: "Produccion profesional" },
      ]
    },
    apple: {
      name: "Apple Silicon",
      color: "#555555",
      tiers: [
        { name: "M1", level: "Base", cores: "8", performance: 70, price: "Incluido", useCase: "MacBook Air, uso general" },
        { name: "M2/M3", level: "Mejorado", cores: "8-10", performance: 82, price: "Incluido", useCase: "Pro apps, desarrollo" },
        { name: "M3 Pro", level: "Profesional", cores: "12", performance: 92, price: "+$200", useCase: "Video 4K, desarrollo pesado" },
        { name: "M3 Max/Ultra", level: "Extremo", cores: "16-24", performance: 100, price: "+$400-1000", useCase: "3D, Machine Learning" },
      ]
    }
  }

  const current = families[selectedFamily]
  const currentTier = current.tiers[selectedTier]

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <span className="text-cyan-400 font-mono text-sm tracking-widest">04 // FAMILIAS DE PROCESADORES</span>
        <h2 className="text-3xl font-bold text-white mt-2">Principales Fabricantes</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Christopher Marrero - 25-1437</p>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Family selector */}
        <div className="flex justify-center gap-4 mb-6">
          {(Object.keys(families) as Array<keyof typeof families>).map((key) => (
            <button
              key={key}
              onClick={() => { setSelectedFamily(key); setSelectedTier(0); }}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                selectedFamily === key
                  ? 'bg-white text-black scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              style={selectedFamily === key ? { backgroundColor: families[key].color, color: 'white' } : {}}
            >
              {families[key].name}
            </button>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Tier selector */}
          <div className="space-y-3">
            {current.tiers.map((tier, i) => (
              <button
                key={tier.name}
                onClick={() => setSelectedTier(i)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedTier === i
                    ? 'bg-white/20 border-2'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
                style={selectedTier === i ? { borderColor: current.color } : {}}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-lg">{tier.name}</div>
                    <div className="text-sm text-gray-400">{tier.level}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{tier.cores} nucleos</div>
                    <div className="font-mono text-cyan-400">{tier.price}</div>
                  </div>
                </div>
                {/* Performance bar */}
                <div className="mt-3 h-2 bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${tier.performance}%`,
                      backgroundColor: current.color
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Details panel */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div 
              className="text-4xl font-black mb-4"
              style={{ color: current.color }}
            >
              {currentTier.name}
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm">Nivel</div>
                <div className="text-white font-semibold">{currentTier.level}</div>
              </div>
              
              <div>
                <div className="text-gray-400 text-sm">Nucleos</div>
                <div className="text-white font-semibold">{currentTier.cores}</div>
              </div>
              
              <div>
                <div className="text-gray-400 text-sm">Caso de Uso Ideal</div>
                <div className="text-white">{currentTier.useCase}</div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-2">Rendimiento Relativo</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-4 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${currentTier.performance}%`,
                        background: `linear-gradient(90deg, ${current.color}, ${current.color}88)`
                      }}
                    />
                  </div>
                  <span className="font-mono text-white">{currentTier.performance}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 5: SUFIJOS Y ARQUITECTURAS - INTERACTIVE
// ============================================
export function SuffixesSlideContent() {
  const [activeSection, setActiveSection] = useState<'suffixes' | 'arch'>('suffixes')

  const suffixes = [
    { suffix: "K", meaning: "Desbloqueado para overclock", example: "i9-14900K" },
    { suffix: "F", meaning: "Sin graficos integrados", example: "i5-13400F" },
    { suffix: "X", meaning: "Extreme - maximo rendimiento", example: "Ryzen 9 7950X" },
    { suffix: "X3D", meaning: "3D V-Cache - mas cache", example: "Ryzen 7 5800X3D" },
    { suffix: "G", meaning: "Con graficos integrados potentes", example: "Ryzen 5 5600G" },
    { suffix: "U", meaning: "Ultra bajo consumo (laptops)", example: "i7-1365U" },
    { suffix: "H", meaning: "Alto rendimiento movil", example: "i9-13980HX" },
    { suffix: "Pro/Max", meaning: "Version profesional mejorada", example: "M3 Pro" },
  ]

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <span className="text-green-400 font-mono text-sm tracking-widest">05 // NOMENCLATURA</span>
        <h2 className="text-3xl font-bold text-white mt-2">Sufijos en Arquitecturas</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Enmanuel Santos - 25-1544</p>
      </div>

      <div className="flex gap-4 mb-4 justify-center">
        <button
          onClick={() => setActiveSection('suffixes')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeSection === 'suffixes' ? 'bg-green-500 text-black' : 'bg-white/10 text-white'
          }`}
        >
          Sufijos
        </button>
        <button
          onClick={() => setActiveSection('arch')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeSection === 'arch' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white'
          }`}
        >
          Arquitecturas
        </button>
      </div>

      {activeSection === 'suffixes' ? (
        <div className="flex-1 grid grid-cols-4 gap-3">
          {suffixes.map((item, i) => (
            <div 
              key={item.suffix}
              className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-green-500/50 transition-all hover:scale-105"
            >
              <div className="text-3xl font-black text-green-400 mb-2">{item.suffix}</div>
              <div className="text-sm text-gray-300 mb-2">{item.meaning}</div>
              <div className="text-xs font-mono text-gray-500">{item.example}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-cyan-500/30">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">CISC</h3>
            <p className="text-gray-300 text-sm mb-4">
              Complex Instruction Set Computing. Instrucciones complejas que hacen mucho en un solo paso.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <ChevronRight className="h-4 w-4" /> Intel x86-64
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <ChevronRight className="h-4 w-4" /> AMD x86-64
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-purple-400 mb-4">RISC</h3>
            <p className="text-gray-300 text-sm mb-4">
              Reduced Instruction Set Computing. Instrucciones simples, rapidas y eficientes.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <ChevronRight className="h-4 w-4" /> ARM (Apple Silicon, Qualcomm)
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <ChevronRight className="h-4 w-4" /> RISC-V (Open Source)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================
// SLIDE 6: ELECCION DE CPU SEGUN USO - CPU BENCHMARK RACE SIMULATOR
// Inspired by bddicken/cpus - Shows real-time CPU comparison
// ============================================
export function CPUUsageSlideContent() {
  const [selectedUse, setSelectedUse] = useState<'basic' | 'gaming' | 'pro'>('basic')
  const [isSimulating, setIsSimulating] = useState(false)
  const [raceComplete, setRaceComplete] = useState(false)
  const [displayTaskIndex, setDisplayTaskIndex] = useState(0)
  
  // Use refs for animation state to avoid re-renders
  const progressRef = useRef<Record<string, { task: number, progress: number }>>({})
  const animationRef = useRef<number | null>(null)
  const [, forceUpdate] = useState(0)

  const useCases = {
    basic: {
      title: "Basico / Ofimatica",
      icon: Briefcase,
      color: "#22d3ee",
      tasks: [
        { name: "Abrir Chrome", icon: "C" },
        { name: "Cargar Gmail", icon: "G" },
        { name: "Editar documento", icon: "D" },
        { name: "Reproducir video", icon: "V" },
      ],
      cpus: [
        { name: "Intel Celeron", speed: 0.4, color: "#6b7280", cores: 2, freq: "2.0 GHz" },
        { name: "Intel Core i3-12100", speed: 1.0, color: "#0071c5", cores: 4, freq: "3.3 GHz" },
        { name: "AMD Ryzen 3 5300G", speed: 1.1, color: "#ed1c24", cores: 4, freq: "4.0 GHz" },
        { name: "Intel Core i5-13400", speed: 1.8, color: "#0071c5", cores: 10, freq: "4.6 GHz" },
      ]
    },
    gaming: {
      title: "Gaming",
      icon: Gamepad2,
      color: "#a855f7",
      tasks: [
        { name: "Cargar shaders", icon: "S" },
        { name: "Procesar IA", icon: "AI" },
        { name: "Calcular fisica", icon: "P" },
        { name: "Render frame 4K", icon: "R" },
      ],
      cpus: [
        { name: "Intel Core i5-12400", speed: 0.7, color: "#0071c5", cores: 6, freq: "4.4 GHz" },
        { name: "AMD Ryzen 5 7600X", speed: 1.0, color: "#ed1c24", cores: 6, freq: "5.3 GHz" },
        { name: "Intel Core i7-13700K", speed: 1.4, color: "#0071c5", cores: 16, freq: "5.4 GHz" },
        { name: "AMD Ryzen 7 7800X3D", speed: 1.8, color: "#ed1c24", cores: 8, freq: "5.0 GHz" },
      ]
    },
    pro: {
      title: "Profesional",
      icon: Monitor,
      color: "#f472b6",
      tasks: [
        { name: "Render 3D", icon: "3D" },
        { name: "Encoding H.265", icon: "E" },
        { name: "Compilar", icon: "CC" },
        { name: "Container", icon: "K" },
      ],
      cpus: [
        { name: "Intel Core i5-13600K", speed: 0.5, color: "#0071c5", cores: 14, freq: "5.1 GHz" },
        { name: "AMD Ryzen 7 7700X", speed: 0.8, color: "#ed1c24", cores: 8, freq: "5.4 GHz" },
        { name: "Intel Core i9-14900K", speed: 1.3, color: "#0071c5", cores: 24, freq: "6.0 GHz" },
        { name: "AMD Ryzen 9 7950X", speed: 1.6, color: "#ed1c24", cores: 16, freq: "5.7 GHz" },
      ]
    }
  }

  const current = useCases[selectedUse]
  
  // Store current config in ref to avoid stale closures in animation
  const currentRef = useRef(current)
  useEffect(() => { currentRef.current = current }, [current])

  const initProgress = useCallback(() => {
    const cfg = currentRef.current
    const initial: Record<string, { task: number, progress: number }> = {}
    cfg.cpus.forEach(cpu => {
      initial[cpu.name] = { task: 0, progress: 0 }
    })
    progressRef.current = initial
    setDisplayTaskIndex(0)
    setRaceComplete(false)
    setIsSimulating(false)
    forceUpdate(n => n + 1)
  }, [])

  useEffect(() => {
    initProgress()
  }, [selectedUse, initProgress])

  useEffect(() => {
    if (!isSimulating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    let lastTime = performance.now()
    let frameId: number | null = null
    
    const animate = (currentTime: number) => {
      const cfg = currentRef.current
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      let allComplete = true
      let maxTask = 0

      cfg.cpus.forEach(cpu => {
        const cpuData = progressRef.current[cpu.name]
        if (!cpuData) return
        
        if (cpuData.task < cfg.tasks.length) {
          allComplete = false
          const increment = (cpu.speed * deltaTime * 0.15) + (Math.random() * 0.5)
          cpuData.progress += increment

          if (cpuData.progress >= 100) {
            cpuData.task++
            cpuData.progress = 0
          }
        }
        
        maxTask = Math.max(maxTask, cpuData.task)
      })

      setDisplayTaskIndex(maxTask)
      forceUpdate(n => n + 1)

      if (allComplete) {
        setIsSimulating(false)
        setRaceComplete(true)
      } else {
        frameId = requestAnimationFrame(animate)
        animationRef.current = frameId
      }
    }

    frameId = requestAnimationFrame(animate)
    animationRef.current = frameId

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isSimulating])

  const startSimulation = useCallback(() => {
    // Reset progress with current config
    const cfg = currentRef.current
    const initial: Record<string, { task: number, progress: number }> = {}
    cfg.cpus.forEach(cpu => {
      initial[cpu.name] = { task: 0, progress: 0 }
    })
    progressRef.current = initial
    setDisplayTaskIndex(0)
    setRaceComplete(false)
    // Start simulation after state is set
    requestAnimationFrame(() => {
      setIsSimulating(true)
    })
  }, [])

  const getOverallProgress = (cpuName: string) => {
    const data = progressRef.current[cpuName]
    if (!data) return 0
    return ((data.task * 100) + data.progress) / current.tasks.length
  }

  const getRanking = () => {
    return [...current.cpus]
      .map(cpu => ({ ...cpu, progress: getOverallProgress(cpu.name) }))
      .sort((a, b) => b.progress - a.progress)
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-3">
        <span className="text-pink-400 font-mono text-sm tracking-widest">06 // BENCHMARK CPU</span>
        <h2 className="text-2xl font-bold text-white mt-1">Comparacion de CPUs por Uso</h2>
        <p className="text-sm text-gray-500 font-mono">Frainer Encarnacion - 25-1775</p>
      </div>

      {/* Use case tabs */}
      <div className="flex justify-center gap-3 mb-4">
        {(Object.keys(useCases) as Array<keyof typeof useCases>).map((key) => {
          const useCase = useCases[key]
          const Icon = useCase.icon
          return (
            <button
              key={key}
              onClick={() => { setSelectedUse(key); setIsSimulating(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                selectedUse === key
                  ? 'scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              style={selectedUse === key ? { backgroundColor: useCase.color, color: 'white' } : {}}
            >
              <Icon className="h-4 w-4" />
              {useCase.title}
            </button>
          )
        })}
      </div>

      {/* Task Progress Header */}
      <div className="flex justify-center gap-2 mb-4">
        {current.tasks.map((task, i) => (
          <div 
            key={task.name}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono transition-all ${
              i < displayTaskIndex ? 'bg-green-500/20 text-green-400' :
              i === displayTaskIndex && isSimulating ? 'bg-yellow-500/20 text-yellow-400 animate-pulse' :
              'bg-white/5 text-gray-500'
            }`}
          >
            <span className="font-bold">{task.icon}</span>
            <span className="hidden md:inline">{task.name}</span>
          </div>
        ))}
      </div>

      {/* CPU Race Track */}
      <div className="flex-1 bg-black/30 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            CPU Benchmark Race
          </h3>
          <div className="flex gap-2">
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
                isSimulating ? 'bg-gray-600 text-gray-400' : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isSimulating ? 'Ejecutando...' : 'Iniciar Carrera'}
            </button>
            <button
              onClick={initProgress}
              className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {getRanking().map((cpu, rank) => {
            const progress = getOverallProgress(cpu.name)
            const data = progressRef.current[cpu.name]
            const currentTask = data?.task || 0
            const isFinished = currentTask >= current.tasks.length

            return (
              <div key={cpu.name} className="relative">
                {/* CPU Info */}
                <div className="flex items-center gap-3 mb-1">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ 
                      backgroundColor: isFinished && rank === 0 ? '#fbbf24' : `${cpu.color}33`,
                      color: isFinished && rank === 0 ? '#000' : cpu.color
                    }}
                  >
                    {isFinished ? rank + 1 : '-'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold text-sm truncate">{cpu.name}</span>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{cpu.cores} nucleos</span>
                        <span>{cpu.freq}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="relative h-8 bg-black/50 rounded-lg overflow-hidden border border-white/10">
                  {/* Task markers */}
                  {current.tasks.map((_, i) => (
                    <div 
                      key={i}
                      className="absolute top-0 bottom-0 w-px bg-white/20"
                      style={{ left: `${((i + 1) / current.tasks.length) * 100}%` }}
                    />
                  ))}
                  
                  {/* Progress bar */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 flex items-center"
                    style={{ 
                      width: `${Math.min(progress, 100)}%`,
                      background: `linear-gradient(90deg, ${cpu.color}99, ${cpu.color})`
                    }}
                  >
                    {/* CPU chip indicator */}
                    <div 
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded bg-black border-2 flex items-center justify-center"
                      style={{ borderColor: cpu.color }}
                    >
                      <Cpu className="h-3 w-3" style={{ color: cpu.color }} />
                    </div>
                  </div>

                  {/* Current task label */}
                  {!isFinished && data && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/70 font-mono">
                      {current.tasks[currentTask]?.icon || ''} {Math.floor(data.progress)}%
                    </div>
                  )}

                  {isFinished && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-green-400 font-mono flex items-center gap-1">
                      <span>FINALIZADO</span>
                      {rank === 0 && <span className="text-yellow-400">T</span>}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary when complete */}
        {raceComplete && (
          <div className="mt-4 p-3 bg-white/5 rounded-lg border border-green-500/30">
            <div className="text-center">
              <span className="text-green-400 font-semibold">Carrera completada</span>
              <p className="text-sm text-gray-400 mt-1">
                El ganador para {current.title}: <span className="text-white font-bold">{getRanking()[0]?.name}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// SLIDE 7: CPU ARCHITECTURE COMPARISON - PlanetScale Inspired
// Shows internal architecture differences between CPU brands/families
// ============================================
export function CPUAnalysisSlideContent() {
  const [brand, setBrand] = useState<'intel' | 'amd' | 'apple'>('intel')
  const [family, setFamily] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [currentInstr, setCurrentInstr] = useState(-1)
  const [dataFlow, setDataFlow] = useState<{from: string, to: string, value: number} | null>(null)
  const [activeBadges, setActiveBadges] = useState<string[]>([])
  const [speed, setSpeed] = useState(1)
  const [, forceRender] = useState(0)
  
  // Use refs for mutable state to avoid re-render loops
  const pcRef = useRef(0)
  const registersRef = useRef([0, 0, 0, 0])
  const memoryRef = useRef([5, 3, 0, 0, 7, 2, 0, 0, 4, 8, 0, 0])
  const outputRef = useRef<string[]>([])
  const cycleCountRef = useRef(0)

  // CPU architectures with real differences
  const cpuData = useMemo(() => ({
    intel: {
      color: "#0071c5",
      families: [
        { 
          name: "Celeron", gen: "N-Series",
          cores: { p: 0, e: 2 }, // Only efficiency cores
          freq: "2.0 GHz", cache: { l2: "2MB", l3: "4MB" },
          cycleTime: 800, ipc: 0.8,
          arch: "monolithic", // Single die
          features: ["CISC", "x86-64", "In-Order"],
          badges: ["Bajo Consumo", "Basico"]
        },
        { 
          name: "Core i5", gen: "12th Gen",
          cores: { p: 6, e: 4 }, // P-cores + E-cores (hybrid)
          freq: "4.4 GHz", cache: { l2: "7.5MB", l3: "18MB" },
          cycleTime: 400, ipc: 1.3,
          arch: "hybrid", // P-cores + E-cores
          features: ["CISC", "x86-64", "Hybrid", "Thread Director"],
          badges: ["P+E Cores", "Turbo Boost"]
        },
        { 
          name: "Core i9", gen: "14th Gen",
          cores: { p: 8, e: 16 }, // More P and E cores
          freq: "6.0 GHz", cache: { l2: "20MB", l3: "36MB" },
          cycleTime: 150, ipc: 1.9,
          arch: "hybrid",
          features: ["CISC", "x86-64", "Hybrid", "Thread Director", "HyperThreading"],
          badges: ["24 Nucleos", "6GHz Turbo", "HT"]
        },
      ]
    },
    amd: {
      color: "#ed1c24",
      families: [
        { 
          name: "Ryzen 3", gen: "5000 Series",
          cores: { p: 4, e: 0 }, // All performance cores
          freq: "4.0 GHz", cache: { l2: "2MB", l3: "8MB" },
          cycleTime: 500, ipc: 1.1,
          arch: "monolithic",
          features: ["CISC", "x86-64", "Zen 3", "SMT"],
          badges: ["Zen 3", "7nm"]
        },
        { 
          name: "Ryzen 7", gen: "7000 Series",
          cores: { p: 8, e: 0 },
          freq: "5.4 GHz", cache: { l2: "8MB", l3: "32MB" },
          cycleTime: 250, ipc: 1.5,
          arch: "chiplet", // CCD + IOD design
          features: ["CISC", "x86-64", "Zen 4", "SMT", "Chiplet"],
          badges: ["Chiplet", "5nm", "DDR5"]
        },
        { 
          name: "Ryzen 9 7950X3D", gen: "3D V-Cache",
          cores: { p: 16, e: 0 },
          freq: "5.7 GHz", cache: { l2: "16MB", l3: "128MB" }, // Massive 3D V-Cache
          cycleTime: 180, ipc: 1.7,
          arch: "3d-vcache",
          features: ["CISC", "x86-64", "Zen 4", "3D V-Cache", "Chiplet"],
          badges: ["3D V-Cache", "128MB L3", "Gaming King"]
        },
      ]
    },
    apple: {
      color: "#a3a3a3",
      families: [
        { 
          name: "M1", gen: "1st Gen",
          cores: { p: 4, e: 4 }, // 4 performance + 4 efficiency
          freq: "3.2 GHz", cache: { l2: "12MB", l3: "N/A" },
          cycleTime: 350, ipc: 1.4,
          arch: "soc", // System on Chip
          features: ["RISC", "ARM64", "Unified Memory", "Neural Engine"],
          badges: ["ARM", "SoC", "5nm"]
        },
        { 
          name: "M3 Pro", gen: "3rd Gen",
          cores: { p: 6, e: 6 },
          freq: "4.0 GHz", cache: { l2: "24MB", l3: "N/A" },
          cycleTime: 220, ipc: 1.6,
          arch: "soc",
          features: ["RISC", "ARM64", "Unified Memory", "Neural Engine", "ProRes"],
          badges: ["3nm", "18GB Unified", "GPU 18-core"]
        },
        { 
          name: "M4 Ultra", gen: "4th Gen",
          cores: { p: 16, e: 16 },
          freq: "4.4 GHz", cache: { l2: "48MB", l3: "N/A" },
          cycleTime: 140, ipc: 2.0,
          arch: "soc-fused", // Two dies fused together
          features: ["RISC", "ARM64", "Unified Memory", "Neural Engine", "Ray Tracing"],
          badges: ["Die Fusion", "192GB Unified", "80-core GPU"]
        },
      ]
    }
  }), [])
  
  const currentBrand = cpuData[brand]
  const currentCPU = currentBrand.families[family]

  const instructions = useMemo(() => [
    { op: "LOAD", args: "$0, [0]", desc: "Cargar mem[0] en R0" },
    { op: "LOAD", args: "$1, [1]", desc: "Cargar mem[1] en R1" },
    { op: "ADD", args: "$2, $0, $1", desc: "R2 = R0 + R1" },
    { op: "STORE", args: "$2, [2]", desc: "Guardar R2 en mem[2]" },
    { op: "LOAD", args: "$0, [4]", desc: "Cargar mem[4] en R0" },
    { op: "LOAD", args: "$1, [5]", desc: "Cargar mem[5] en R1" },
    { op: "MUL", args: "$3, $0, $1", desc: "R3 = R0 * R1" },
    { op: "STORE", args: "$3, [6]", desc: "Guardar R3 en mem[6]" },
  ], [])

  // Benchmark metrics tracking
  const metricsRef = useRef({
    startTime: 0,
    loadOps: 0,
    storeOps: 0,
    aluOps: 0,
    cacheHits: 0,
    cacheMisses: 0,
  })

  const reset = useCallback(() => {
    setIsRunning(false)
    pcRef.current = 0
    registersRef.current = [0, 0, 0, 0]
    memoryRef.current = [5, 3, 0, 0, 7, 2, 0, 0, 4, 8, 0, 0]
    setCurrentInstr(-1)
    setDataFlow(null)
    outputRef.current = []
    cycleCountRef.current = 0
    setActiveBadges([])
    metricsRef.current = { startTime: 0, loadOps: 0, storeOps: 0, aluOps: 0, cacheHits: 0, cacheMisses: 0 }
    forceRender(n => n + 1)
  }, [])

  // Store refs for the timer-based execution
  const currentCPURef = useRef(currentCPU)
  const speedRef = useRef(speed)
  const isRunningRef = useRef(isRunning)
  
  useEffect(() => { currentCPURef.current = currentCPU }, [currentCPU])
  useEffect(() => { speedRef.current = speed }, [speed])
  useEffect(() => { isRunningRef.current = isRunning }, [isRunning])

  // Main execution loop using recursive setTimeout
  useEffect(() => {
    if (!isRunning) return
    
    // Initialize start time
    if (metricsRef.current.startTime === 0) {
      metricsRef.current.startTime = performance.now()
    }
    
    let cancelled = false
    const timeoutIds: number[] = []
    
    const scheduleStep = () => {
      if (cancelled || !isRunningRef.current) return
      
      const cpu = currentCPURef.current
      const spd = speedRef.current
      const metrics = metricsRef.current
      
      if (pcRef.current >= instructions.length) {
        // Generate detailed benchmark report
        const endTime = performance.now()
        const totalTime = ((endTime - metrics.startTime) / 1000).toFixed(2)
        const totalCycles = cycleCountRef.current
        const ipc = (instructions.length / totalCycles).toFixed(2)
        const mips = ((instructions.length / parseFloat(totalTime)) / 1000).toFixed(1)
        
        // Calculate estimated power and memory usage based on CPU
        const basePower = cpu.arch === 'soc' || cpu.arch === 'soc-fused' ? 15 : 
                         cpu.arch === 'chiplet' || cpu.arch === '3d-vcache' ? 95 : 65
        const powerUsage = (basePower * (1 + totalCycles * 0.001)).toFixed(1)
        
        const cacheSize = cpu.cache.l3 === 'N/A' ? cpu.cache.l2 : cpu.cache.l3
        const cacheHitRate = cpu.arch === '3d-vcache' ? 98 : 
                            cpu.arch === 'soc' || cpu.arch === 'soc-fused' ? 95 :
                            cpu.arch === 'chiplet' ? 92 : 85
        
        outputRef.current = [
          `=== BENCHMARK ${cpu.name} ===`,
          `Ciclos totales: ${totalCycles}`,
          `Tiempo: ${totalTime}s @ ${spd}x`,
          `IPC real: ${ipc} (teorico: ${cpu.ipc})`,
          `MIPS: ${mips}K ops/seg`,
          `---`,
          `LOAD ops: ${metrics.loadOps}`,
          `STORE ops: ${metrics.storeOps}`,
          `ALU ops: ${metrics.aluOps}`,
          `---`,
          `Cache L3: ${cacheSize}`,
          `Cache Hit Rate: ${cacheHitRate}%`,
          `Energia: ~${powerUsage}mJ`,
          `---`,
          cpu.arch === '3d-vcache' ? `V-Cache: ACTIVO` :
          cpu.arch === 'hybrid' ? `Thread Director: ON` :
          cpu.arch === 'soc' ? `Unified Mem: ACTIVO` :
          cpu.arch === 'chiplet' ? `Infinity Fabric: OK` : `Arquitectura: ${cpu.arch}`,
          `=== FIN ===`
        ]
        setIsRunning(false)
        setActiveBadges([])
        forceRender(n => n + 1)
        return
      }
      
      const instrIndex = pcRef.current
      const instr = instructions[instrIndex]
      setCurrentInstr(instrIndex)
      
      // Show architecture-specific badges
      const badges: string[] = []
      if (cpu.arch === 'hybrid') badges.push('Thread Director activo')
      if (cpu.arch === '3d-vcache') badges.push('V-Cache HIT')
      if (cpu.arch === 'chiplet') badges.push('Infinity Fabric')
      if (cpu.arch === 'soc' || cpu.arch === 'soc-fused') badges.push('Unified Memory')
      if (instr.op === 'MUL' && cpu.features.includes('Neural Engine')) badges.push('Neural Engine')
      setActiveBadges(badges)
      
      // Execute instruction after brief delay
      const execId = window.setTimeout(() => {
        if (cancelled) return
        const regs = registersRef.current
        const mem = memoryRef.current
        
        switch(instr.op) {
          case "LOAD": {
            metricsRef.current.loadOps++
            const regMatch = instr.args.match(/\$(\d)/)
            const memMatch = instr.args.match(/\[(\d+)\]/)
            if (regMatch && memMatch) {
              const regIdx = parseInt(regMatch[1])
              const memIdx = parseInt(memMatch[1])
              const value = mem[memIdx]
              setDataFlow({ from: `mem${memIdx}`, to: `reg${regIdx}`, value })
              // Log interesting info
              const latency = cpu.arch === '3d-vcache' ? 'L3 hit' : cpu.arch === 'soc' ? 'unified' : 'DDR5'
              outputRef.current = [...outputRef.current, `LOAD R${regIdx} <- [${memIdx}] = ${value} (${latency})`]
              const clearId = window.setTimeout(() => {
                if (!cancelled) {
                  registersRef.current[regIdx] = value
                  setDataFlow(null)
                  forceRender(n => n + 1)
                }
              }, cpu.cycleTime / spd / 2)
              timeoutIds.push(clearId)
            }
            break
          }
          case "ADD":
          case "MUL": {
            metricsRef.current.aluOps++
            const match = instr.args.match(/\$(\d), \$(\d), \$(\d)/)
            if (match) {
              const [, dest, src1, src2] = match.map(Number)
              const result = instr.op === "ADD" ? regs[src1] + regs[src2] : regs[src1] * regs[src2]
              setDataFlow({ from: 'alu', to: `reg${dest}`, value: result })
              // Log ALU operation with detail
              const unit = instr.op === "MUL" && cpu.features.includes('Neural Engine') ? 'NEU' : 'ALU'
              outputRef.current = [...outputRef.current, `${unit}: R${dest} = ${regs[src1]} ${instr.op === "ADD" ? '+' : '*'} ${regs[src2]} = ${result}`]
              const clearId = window.setTimeout(() => {
                if (!cancelled) {
                  registersRef.current[dest] = result
                  setDataFlow(null)
                  forceRender(n => n + 1)
                }
              }, cpu.cycleTime / spd / 2)
              timeoutIds.push(clearId)
            }
            break
          }
          case "STORE": {
            metricsRef.current.storeOps++
            const regMatch = instr.args.match(/\$(\d)/)
            const memMatch = instr.args.match(/\[(\d+)\]/)
            if (regMatch && memMatch) {
              const regIdx = parseInt(regMatch[1])
              const memIdx = parseInt(memMatch[1])
              const val = regs[regIdx]
              setDataFlow({ from: `reg${regIdx}`, to: `mem${memIdx}`, value: val })
              const clearId = window.setTimeout(() => {
                if (!cancelled) {
                  memoryRef.current[memIdx] = val
                  outputRef.current = [...outputRef.current, `STORE [${memIdx}] <- R${regIdx} = ${val} (writeback)`]
                  setDataFlow(null)
                  forceRender(n => n + 1)
                }
              }, cpu.cycleTime / spd / 2)
              timeoutIds.push(clearId)
            }
            break
          }
        }
        cycleCountRef.current += Math.ceil(1 / cpu.ipc)
        forceRender(n => n + 1)
      }, 50)
      timeoutIds.push(execId)
      
      pcRef.current++
      
      // Schedule next step
      const nextId = window.setTimeout(scheduleStep, cpu.cycleTime / spd)
      timeoutIds.push(nextId)
    }
    
    scheduleStep()
    
    return () => {
      cancelled = true
      timeoutIds.forEach(id => window.clearTimeout(id))
    }
  }, [isRunning, instructions])

  // Render CPU architecture diagram based on type
  const renderCPUDie = () => {
    const arch = currentCPU.arch
    const color = currentBrand.color
    
    if (arch === 'monolithic' || arch === 'hybrid') {
      // Intel-style: P-cores and E-cores
      return (
        <g>
          {/* P-Cores */}
          {currentCPU.cores.p > 0 && [...Array(Math.min(currentCPU.cores.p, 4))].map((_, i) => (
            <g key={`p-${i}`}>
              <rect x={65 + (i % 2) * 35} y={45 + Math.floor(i / 2) * 35} width="30" height="30" rx="3" 
                fill={isRunning ? `${color}44` : "#1a1a2e"} stroke={color} strokeWidth="1.5" />
              <text x={80 + (i % 2) * 35} y={65 + Math.floor(i / 2) * 35} textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">P{i}</text>
            </g>
          ))}
          {/* E-Cores (smaller) */}
          {currentCPU.cores.e > 0 && [...Array(Math.min(currentCPU.cores.e, 4))].map((_, i) => (
            <g key={`e-${i}`}>
              <rect x={145 + (i % 2) * 22} y={45 + Math.floor(i / 2) * 22} width="18" height="18" rx="2" 
                fill={isRunning ? "#4ade8044" : "#1a1a2e"} stroke="#4ade80" strokeWidth="1" />
              <text x={154 + (i % 2) * 22} y={57 + Math.floor(i / 2) * 22} textAnchor="middle" fill="#4ade80" fontSize="7">E{i}</text>
            </g>
          ))}
          {arch === 'hybrid' && (
            <text x="165" y="100" textAnchor="middle" fill="#fbbf24" fontSize="7">Thread Director</text>
          )}
        </g>
      )
    }
    
    if (arch === 'chiplet' || arch === '3d-vcache') {
      // AMD-style: CCDs + IOD
      return (
        <g>
          {/* CCD 0 */}
          <rect x="60" y="40" width="55" height="55" rx="3" fill={isRunning ? `${color}33` : "#1a1a2e"} stroke={color} strokeWidth="1.5" />
          <text x="87" y="55" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold">CCD 0</text>
          {[...Array(4)].map((_, i) => (
            <rect key={i} x={65 + (i % 2) * 22} y={60 + Math.floor(i / 2) * 15} width="18" height="12" rx="1" fill={color} opacity="0.6" />
          ))}
          {/* CCD 1 */}
          <rect x="125" y="40" width="55" height="55" rx="3" fill={isRunning ? `${color}33` : "#1a1a2e"} stroke={color} strokeWidth="1.5" />
          <text x="152" y="55" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold">CCD 1</text>
          {[...Array(4)].map((_, i) => (
            <rect key={i} x={130 + (i % 2) * 22} y={60 + Math.floor(i / 2) * 15} width="18" height="12" rx="1" fill={color} opacity="0.6" />
          ))}
          {/* IOD */}
          <rect x="80" y="105" width="80" height="25" rx="3" fill="#0f172a" stroke="#6b7280" strokeWidth="1" />
          <text x="120" y="120" textAnchor="middle" fill="#9ca3af" fontSize="8">I/O Die</text>
          {/* 3D V-Cache layer */}
          {arch === '3d-vcache' && (
            <g>
              <rect x="60" y="28" width="55" height="10" rx="2" fill="#22d3ee" opacity="0.7" />
              <text x="87" y="36" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold">3D V-Cache</text>
              <rect x="125" y="28" width="55" height="10" rx="2" fill="#22d3ee" opacity="0.7" />
              <text x="152" y="36" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold">3D V-Cache</text>
            </g>
          )}
          {/* Infinity Fabric */}
          <line x1="87" y1="95" x2="87" y2="105" stroke="#f97316" strokeWidth="2" strokeDasharray="2,2" />
          <line x1="152" y1="95" x2="152" y2="105" stroke="#f97316" strokeWidth="2" strokeDasharray="2,2" />
          <text x="120" y="102" textAnchor="middle" fill="#f97316" fontSize="6">Infinity Fabric</text>
        </g>
      )
    }
    
    if (arch === 'soc' || arch === 'soc-fused') {
      // Apple-style: SoC with integrated everything
      return (
        <g>
          {/* CPU Cluster */}
          <rect x="60" y="40" width="50" height="40" rx="3" fill={isRunning ? "#a855f733" : "#1a1a2e"} stroke="#a855f7" strokeWidth="1.5" />
          <text x="85" y="52" textAnchor="middle" fill="#a855f7" fontSize="7" fontWeight="bold">CPU</text>
          <text x="85" y="62" textAnchor="middle" fill="#a855f7" fontSize="6">{currentCPU.cores.p}P+{currentCPU.cores.e}E</text>
          {/* GPU */}
          <rect x="120" y="40" width="50" height="40" rx="3" fill={isRunning ? "#22d3ee33" : "#1a1a2e"} stroke="#22d3ee" strokeWidth="1.5" />
          <text x="145" y="55" textAnchor="middle" fill="#22d3ee" fontSize="7" fontWeight="bold">GPU</text>
          <text x="145" y="68" textAnchor="middle" fill="#22d3ee" fontSize="6">{arch === 'soc-fused' ? '80' : '18'}-core</text>
          {/* Neural Engine */}
          <rect x="60" y="90" width="40" height="25" rx="3" fill="#4ade8033" stroke="#4ade80" strokeWidth="1" />
          <text x="80" y="105" textAnchor="middle" fill="#4ade80" fontSize="6">Neural</text>
          {/* Media Engine */}
          <rect x="110" y="90" width="60" height="25" rx="3" fill="#f9731633" stroke="#f97316" strokeWidth="1" />
          <text x="140" y="105" textAnchor="middle" fill="#f97316" fontSize="6">Media Engine</text>
          {/* Unified Memory label */}
          <rect x="60" y="125" width="110" height="12" rx="2" fill="#fbbf2433" stroke="#fbbf24" strokeWidth="1" />
          <text x="115" y="134" textAnchor="middle" fill="#fbbf24" fontSize="7">Unified Memory</text>
          {arch === 'soc-fused' && (
            <text x="115" y="148" textAnchor="middle" fill="#9ca3af" fontSize="6">UltraFusion (2 dies)</text>
          )}
        </g>
      )
    }
    
    return null
  }

  return (
    <div className="h-full flex flex-col p-2">
      <div className="text-center mb-1">
        <span className="text-amber-400 font-mono text-xs tracking-widest">07 // ARQUITECTURA CPU</span>
        <h2 className="text-xl font-bold text-white">Diferencias Internas de Procesadores</h2>
        <p className="text-xs text-gray-500 font-mono">Frainer Encarnacion - 25-1775</p>
      </div>

      {/* Brand & Family Selectors */}
      <div className="flex gap-2 mb-2 justify-center items-center flex-wrap">
        <div className="flex gap-1">
          {(['intel', 'amd', 'apple'] as const).map((b) => (
            <button
              key={b}
              onClick={() => { setBrand(b); setFamily(0); reset(); }}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                brand === b ? 'text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              style={brand === b ? { backgroundColor: cpuData[b].color } : {}}
            >
              {b === 'intel' ? 'Intel' : b === 'amd' ? 'AMD' : 'Apple'}
            </button>
          ))}
        </div>
        <ChevronRight className="h-4 w-4 text-gray-600" />
        <div className="flex gap-1">
          {currentBrand.families.map((f, i) => (
            <button
              key={f.name}
              onClick={() => { setFamily(i); reset(); }}
              className={`px-2 py-1 rounded text-xs transition-all ${
                family === i ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Badges */}
      {activeBadges.length > 0 && (
        <div className="flex justify-center gap-2 mb-2">
          {activeBadges.map((badge) => (
            <span key={badge} className="px-2 py-0.5 rounded-full text-xs font-mono animate-pulse"
              style={{ backgroundColor: `${currentBrand.color}33`, color: currentBrand.color, border: `1px solid ${currentBrand.color}` }}>
              {badge}
            </span>
          ))}
        </div>
      )}

      <div className="flex-1 grid grid-cols-12 gap-2">
        {/* Left - CPU Die Visualization */}
        <div className="col-span-5">
          <div className="bg-[#1a1a2e] rounded-xl p-2 border border-white/10 h-full">
            <svg viewBox="0 0 240 180" className="w-full">
              {/* CPU Package */}
              <rect x="30" y="15" width="180" height="150" rx="6" fill="#2d4a3e" stroke="#3d5a4e" strokeWidth="2" />
              {/* Pins */}
              {[...Array(8)].map((_, i) => (
                <rect key={`pin-l-${i}`} x="15" y={25 + i * 17} width="20" height="5" rx="1" fill="#FBDA62" />
              ))}
              {[...Array(8)].map((_, i) => (
                <rect key={`pin-r-${i}`} x="205" y={25 + i * 17} width="20" height="5" rx="1" fill="#FBDA62" />
              ))}
              {/* CPU Die */}
              <rect x="45" y="25" width="150" height="130" rx="4" fill="#0a0a1a" stroke={currentBrand.color} strokeWidth="2" />
              {renderCPUDie()}
            </svg>
            {/* Features */}
            <div className="flex flex-wrap gap-1 mt-1 justify-center">
              {currentCPU.features.slice(0, 4).map((f) => (
                <span key={f} className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-gray-300">{f}</span>
              ))}
            </div>
            {/* Specs */}
            <div className="grid grid-cols-4 gap-1 mt-2 text-center">
              <div className="bg-black/30 rounded p-1">
                <div className="text-gray-500 text-[8px]">Nucleos</div>
                <div className="text-white text-[10px] font-mono">{currentCPU.cores.p + currentCPU.cores.e}</div>
              </div>
              <div className="bg-black/30 rounded p-1">
                <div className="text-gray-500 text-[8px]">Freq</div>
                <div className="text-white text-[10px] font-mono">{currentCPU.freq}</div>
              </div>
              <div className="bg-black/30 rounded p-1">
                <div className="text-gray-500 text-[8px]">L3</div>
                <div className="text-white text-[10px] font-mono">{currentCPU.cache.l3}</div>
              </div>
              <div className="bg-black/30 rounded p-1">
                <div className="text-gray-500 text-[8px]">IPC</div>
                <div className="text-white text-[10px] font-mono">{currentCPU.ipc}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - RAM, Instructions & Terminal */}
        <div className="col-span-7 flex flex-col gap-2">
          {/* RAM */}
          <div className="bg-[#2d4a3e] rounded-lg p-2 border border-[#3d5a4e]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#4ade80] font-semibold text-[10px]">
                {brand === 'apple' ? 'Unified Memory' : 'RAM (DDR5)'}
              </span>
            </div>
            <div className="grid grid-cols-12 gap-0.5">
              {memoryRef.current.map((val, i) => (
                <div key={i} className={`aspect-square rounded flex flex-col items-center justify-center text-[8px] transition-all ${
                  dataFlow?.from === `mem${i}` ? 'bg-[#4ade80] text-black scale-110' :
                  dataFlow?.to === `mem${i}` ? 'bg-[#f97316] text-black scale-110' : 'bg-[#1a2e23] text-white'
                }`}>
                  <span className="font-mono font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-[#1a1a2e] rounded-lg p-2 border border-white/10">
            <div className="grid grid-cols-4 gap-1">
              {instructions.map((instr, i) => (
                <div key={i} className={`px-1 py-0.5 rounded text-[9px] font-mono ${
                  currentInstr === i ? 'bg-green-500/30 text-green-400' : 'bg-black/30 text-gray-500'
                }`}>
                  {instr.op}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="flex-1 bg-[#1e1e2e] rounded-lg border border-white/10 overflow-hidden">
            <div className="flex items-center gap-1 px-2 py-1 bg-[#2a2a3e] border-b border-white/10">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-[10px] font-mono">{currentCPU.name} {currentCPU.gen}</span>
            </div>
            <div className="p-1.5 font-mono text-[10px] h-16 overflow-y-auto">
              {outputRef.current.map((line, i) => (
                <div key={i} className="text-[#4ade80]">{line}</div>
              ))}
              {isRunning && <span className="text-[#4ade80] animate-pulse">_</span>}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!isRunning) {
                  // Reset metrics when starting
                  metricsRef.current = { startTime: 0, loadOps: 0, storeOps: 0, aluOps: 0, cacheHits: 0, cacheMisses: 0 }
                  outputRef.current = []
                }
                setIsRunning(!isRunning)
              }}
              disabled={pcRef.current >= instructions.length}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg font-semibold text-xs transition-all"
              style={{ backgroundColor: currentBrand.color, color: 'white', opacity: pcRef.current >= instructions.length ? 0.5 : 1 }}
            >
              {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {isRunning ? 'Pausar' : 'Ejecutar'}
            </button>
            <button onClick={reset} className="p-1.5 rounded-lg bg-white/10 text-gray-400 hover:text-white">
              <RotateCcw className="h-3 w-3" />
            </button>
            <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-white/5 text-white text-xs rounded px-2 py-1 font-mono focus:outline-none">
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
            </select>
            <div className="bg-white/5 rounded px-2 py-1">
              <span className="text-white font-mono text-xs">{cycleCountRef.current} ciclos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 8: SEGMENTACION POR USO - INTERACTIVE MARKET VISUALIZATION
// ============================================
export function MarketSegmentSlideContent() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  const segments = [
    { 
      name: "Movil", 
      share: 60, 
      color: "#22d3ee", 
      icon: Smartphone,
      examples: ["Snapdragon 8 Gen 3", "Apple A17 Pro", "MediaTek Dimensity"],
      trend: "+15%"
    },
    { 
      name: "Desktop", 
      share: 25, 
      color: "#a855f7", 
      icon: Monitor,
      examples: ["Intel Core i9", "AMD Ryzen 9", "Apple M3"],
      trend: "+5%"
    },
    { 
      name: "Laptop", 
      share: 35, 
      color: "#f472b6", 
      icon: Laptop,
      examples: ["Intel U/H series", "AMD Mobile", "Apple M3 Pro"],
      trend: "+20%"
    },
    { 
      name: "Server", 
      share: 15, 
      color: "#34d399", 
      icon: Server,
      examples: ["Intel Xeon", "AMD EPYC", "AWS Graviton"],
      trend: "+25%"
    },
  ]

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <span className="text-emerald-400 font-mono text-sm tracking-widest">08 // TENDENCIAS 2026</span>
        <h2 className="text-3xl font-bold text-white mt-2">Segmentacion por Uso</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Algenis de los Santos Lopez</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Left - Visual representation */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-full h-full max-h-80">
            {segments.map((segment, i) => {
              const angle = (i / segments.length) * 360
              const x = 150 + 80 * Math.cos((angle - 90) * Math.PI / 180)
              const y = 150 + 80 * Math.sin((angle - 90) * Math.PI / 180)
              const isHovered = hoveredSegment === segment.name
              
              return (
                <g 
                  key={segment.name}
                  onMouseEnter={() => setHoveredSegment(segment.name)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 45 : 40}
                    fill={`${segment.color}33`}
                    stroke={segment.color}
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-all duration-300"
                  />
                  <text
                    x={x}
                    y={y - 5}
                    textAnchor="middle"
                    fill={segment.color}
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {segment.name}
                  </text>
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {segment.share}%
                  </text>
                </g>
              )
            })}
            
            {/* Center */}
            <circle cx="150" cy="150" r="30" fill="#1a1a3e" stroke="#ffffff20" strokeWidth="1" />
            <text x="150" y="155" textAnchor="middle" fill="white" fontSize="10">2026</text>
          </svg>
        </div>

        {/* Right - Details */}
        <div className="space-y-3">
          {segments.map((segment) => {
            const Icon = segment.icon
            const isHovered = hoveredSegment === segment.name
            
            return (
              <div
                key={segment.name}
                onMouseEnter={() => setHoveredSegment(segment.name)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`bg-white/5 rounded-xl p-4 border transition-all cursor-pointer ${
                  isHovered ? 'border-white/30 scale-102' : 'border-white/10'
                }`}
                style={isHovered ? { borderColor: segment.color } : {}}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${segment.color}33` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: segment.color }} />
                    </div>
                    <span className="font-semibold text-white">{segment.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-sm font-mono">{segment.trend}</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                </div>
                
                {isHovered && (
                  <div className="mt-2 text-xs text-gray-400">
                    {segment.examples.join(" • ")}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 9: CONCLUSION / GRACIAS
// ============================================
export function ConclusionSlideContent() {
  const [showThanks, setShowThanks] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowThanks(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const team = [
    { name: "Frainer Encarnación", id: "25-1775" },
    { name: "Oliver Abreu Mateo", id: "25-1619" },
    { name: "Christopher Marrero", id: "25-1437" },
    { name: "Enmanuel Santos", id: "25-1544" },
    { name: "Algenis de los Santos Lopez", id: "" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `rgba(${Math.random() > 0.5 ? '34, 211, 238' : '168, 85, 247'}, ${Math.random() * 0.3 + 0.1})`,
              animation: `float-up ${Math.random() * 10 + 5}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 transition-all duration-1000 ${showThanks ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h1 className="text-6xl md:text-8xl font-black mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            MUCHAS
          </span>
          <br />
          <span className="text-white">
            GRACIAS
          </span>
        </h1>

        <div className="text-xl text-gray-400 mb-12">
          Por su atencion
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <span className="text-white">{member.name}</span>
              {member.id && <span className="text-gray-500 ml-2">{member.id}</span>}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-lg text-cyan-400 font-bold">LOS INGENIEROS</p>
          <p className="text-sm text-gray-500 mt-2">Arquitectura Del Computador</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
