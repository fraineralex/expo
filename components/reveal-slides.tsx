"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { Cpu, HardDrive, MonitorSpeaker, Network, Cog, Zap, BookOpen, Server, Database, ArrowRight, Play, Pause, RotateCcw } from "lucide-react"

// ============================================
// TITLE SLIDE
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
        {/* Glitchy title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 gradient-animate">
              ARQUITECTURA
            </span>
            <span className="block text-white/90 text-4xl md:text-5xl font-light mt-2">
              del
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mt-2">
              COMPUTADOR
            </span>
          </h1>
        </div>

        {/* Floating icons */}
        <div className="flex justify-center gap-8 mt-12">
          {[
            { Icon: Cpu, label: "CPU", color: "cyan" },
            { Icon: HardDrive, label: "RAM", color: "purple" },
            { Icon: MonitorSpeaker, label: "E/S", color: "pink" },
            { Icon: Network, label: "BUS", color: "blue" },
          ].map(({ Icon, label, color }, i) => (
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
                <Icon className={`h-8 w-8 text-${color}-400`} />
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
// INTRO SLIDE
// ============================================
export function IntroSlideContent() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="space-y-6">
          <div className="inline-block">
            <span className="text-cyan-400 font-mono text-sm tracking-widest">01 // INTRODUCCION</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white leading-tight">
            Conceptos
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Fundamentales
            </span>
          </h2>

          <p className="text-xl text-gray-400 leading-relaxed">
            Comprender la arquitectura y organizacion del computador es esencial 
            para disenar sistemas eficientes y optimizados.
          </p>

          <div className="text-sm text-gray-500 font-mono mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
            Presenta: Christopher E. Marrero L. - 25-1437
          </div>
        </div>

        {/* Right - 3D Cards */}
        <div className="space-y-4 perspective-1000">
          {[
            { icon: Cpu, title: "Arquitectura", desc: "Define QUE puede hacer", color: "cyan" },
            { icon: Cog, title: "Organizacion", desc: "Explica COMO funciona", color: "purple" },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={title}
              className={`
                fragment fade-left
                transform hover:translate-x-4 transition-all duration-500
                hover:rotate-1
              `}
              style={{ 
                transformStyle: 'preserve-3d',
                transitionDelay: `${i * 100}ms`
              }}
            >
              <div className={`
                flex items-center gap-4 p-5 rounded-2xl
                bg-gradient-to-r from-${color}-500/10 to-transparent
                border-l-4 border-${color}-500
                backdrop-blur-sm
                hover:shadow-xl hover:shadow-${color}-500/10
              `}>
                <div className={`p-3 rounded-xl bg-${color}-500/20`}>
                  <Icon className={`h-6 w-6 text-${color}-400`} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{title}</h3>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// ARQUITECTURA VS ORGANIZACION - SIMULADOR INTERACTIVO
// ============================================
export function ArqVsOrgSlideContent() {
  const [cpuActive, setCpuActive] = useState(true)
  const [motherboardActive, setMotherboardActive] = useState(true)
  const [ram1Active, setRam1Active] = useState(true)
  const [ram2Active, setRam2Active] = useState(true)

  // Calcular estado del sistema
  const getSystemStatus = () => {
    if (!cpuActive || !motherboardActive) {
      return { status: "critical", message: "Sistema NO funcional", color: "text-red-500", bg: "bg-red-500/10" }
    }
    if (!ram1Active && !ram2Active) {
      return { status: "critical", message: "Sistema NO funcional - Sin memoria", color: "text-red-500", bg: "bg-red-500/10" }
    }
    if (!ram1Active || !ram2Active) {
      return { status: "warning", message: "Sistema funcional - Rendimiento reducido", color: "text-amber-500", bg: "bg-amber-500/10" }
    }
    return { status: "ok", message: "Sistema funcionando al 100%", color: "text-emerald-500", bg: "bg-emerald-500/10" }
  }

  const systemStatus = getSystemStatus()

  return (
    <div className="h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Titulo */}
      <div className="text-center mb-4">
        <span className="text-purple-400 font-mono text-sm tracking-widest">02 // SIMULADOR INTERACTIVO</span>
        <h2 className="text-3xl font-bold mt-2">
          <span className="text-cyan-400">Arquitectura</span>
          <span className="text-white/50 mx-3">vs</span>
          <span className="text-purple-400">Organizacion</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">Analogia: Computador y Cuerpo Humano</p>
      </div>

      {/* Simulador Visual */}
      <div className="flex-1 w-full max-w-5xl grid grid-cols-2 gap-8 items-center px-4">
        
        {/* Lado Izquierdo - Gabinete de PC */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Gabinete de PC</h3>
          <div className="relative w-52 h-72 border-4 border-zinc-600 rounded-lg bg-zinc-800/80 p-3">
            {/* Ventilador superior */}
            <div className="absolute top-2 right-2 w-6 h-6 border-2 border-zinc-500 rounded-full flex items-center justify-center">
              <div className={`w-3 h-3 border border-zinc-400 rounded-full ${motherboardActive ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }} />
            </div>
            
            {/* CPU */}
            <div 
              className={`absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-md flex items-center justify-center transition-all duration-500 ${
                cpuActive 
                  ? "bg-cyan-500 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50" 
                  : "bg-zinc-700 border-2 border-dashed border-zinc-500 opacity-30"
              }`}
            >
              <span className="text-xs font-bold text-white">CPU</span>
            </div>

            {/* Placa Madre */}
            <div 
              className={`absolute top-24 left-1/2 -translate-x-1/2 w-40 h-20 rounded flex items-center justify-center transition-all duration-500 ${
                motherboardActive 
                  ? "bg-emerald-600 border-2 border-emerald-400 shadow-lg shadow-emerald-500/50" 
                  : "bg-zinc-700 border-2 border-dashed border-zinc-500 opacity-30"
              }`}
            >
              <span className="text-xs font-bold text-white text-center">Placa Madre</span>
            </div>

            {/* RAM 1 */}
            <div 
              className={`absolute bottom-8 left-5 w-6 h-16 rounded flex items-center justify-center transition-all duration-500 ${
                ram1Active 
                  ? "bg-purple-500 border-2 border-purple-400 shadow-lg shadow-purple-500/50" 
                  : "bg-zinc-700 border-2 border-dashed border-zinc-500 opacity-30"
              }`}
            >
              <span className="text-[8px] font-bold text-white" style={{ writingMode: 'vertical-rl' }}>RAM 1</span>
            </div>

            {/* RAM 2 */}
            <div 
              className={`absolute bottom-8 right-5 w-6 h-16 rounded flex items-center justify-center transition-all duration-500 ${
                ram2Active 
                  ? "bg-purple-500 border-2 border-purple-400 shadow-lg shadow-purple-500/50" 
                  : "bg-zinc-700 border-2 border-dashed border-zinc-500 opacity-30"
              }`}
            >
              <span className="text-[8px] font-bold text-white" style={{ writingMode: 'vertical-rl' }}>RAM 2</span>
            </div>

            {/* Conexiones */}
            {motherboardActive && cpuActive && (
              <div className="absolute top-[88px] left-1/2 -translate-x-1/2 w-1 h-2 bg-emerald-400 animate-pulse" />
            )}
          </div>
        </div>

        {/* Lado Derecho - Cuerpo Humano */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Cuerpo Humano</h3>
          <div className="relative w-52 h-72">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              {/* Cabeza */}
              <ellipse cx="100" cy="35" rx="30" ry="35" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />
              {/* Cuello */}
              <rect x="90" y="65" width="20" height="20" fill="#d4a574" />
              {/* Torso */}
              <path d="M60 85 L140 85 L150 200 L50 200 Z" fill="#e8d4c4" stroke="#c9b8a8" strokeWidth="2" />
              {/* Brazos */}
              <path d="M60 85 L30 160 L40 165 L65 100" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />
              <path d="M140 85 L170 160 L160 165 L135 100" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />
              {/* Piernas */}
              <path d="M70 200 L60 270 L80 270 L85 200" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />
              <path d="M130 200 L140 270 L120 270 L115 200" fill="#d4a574" stroke="#b8956a" strokeWidth="2" />

              {/* Cerebro */}
              {cpuActive ? (
                <g className="animate-pulse">
                  <ellipse cx="100" cy="30" rx="20" ry="18" fill="#f472b6" stroke="#ec4899" strokeWidth="2" />
                  <path d="M85 25 Q90 20 100 22 Q110 20 115 25" stroke="#ec4899" strokeWidth="1" fill="none" />
                  <text x="100" y="34" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">Cerebro</text>
                </g>
              ) : (
                <ellipse cx="100" cy="30" rx="20" ry="18" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
              )}

              {/* Corazon */}
              {motherboardActive ? (
                <g className="animate-pulse">
                  <path d="M100 110 C85 95 70 105 70 120 C70 140 100 155 100 155 C100 155 130 140 130 120 C130 105 115 95 100 110" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
                  <text x="100" y="130" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">Corazon</text>
                </g>
              ) : (
                <path d="M100 110 C85 95 70 105 70 120 C70 140 100 155 100 155 C100 155 130 140 130 120 C130 105 115 95 100 110" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
              )}

              {/* Rinon Izquierdo */}
              {ram1Active ? (
                <g>
                  <ellipse cx="75" cy="175" rx="12" ry="18" fill="#a855f7" stroke="#9333ea" strokeWidth="2" />
                  <text x="75" y="175" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">Rinon</text>
                  <text x="75" y="182" textAnchor="middle" fontSize="5" fill="white">Izq.</text>
                </g>
              ) : (
                <ellipse cx="75" cy="175" rx="12" ry="18" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
              )}

              {/* Rinon Derecho */}
              {ram2Active ? (
                <g>
                  <ellipse cx="125" cy="175" rx="12" ry="18" fill="#a855f7" stroke="#9333ea" strokeWidth="2" />
                  <text x="125" y="175" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">Rinon</text>
                  <text x="125" y="182" textAnchor="middle" fontSize="5" fill="white">Der.</text>
                </g>
              ) : (
                <ellipse cx="125" cy="175" rx="12" ry="18" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4" opacity="0.3" />
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Estado del Sistema */}
      <div className={`flex items-center gap-2 mb-3 px-4 py-2 rounded-lg ${systemStatus.bg}`}>
        {systemStatus.status === "ok" && <Zap className="h-5 w-5 text-emerald-500" />}
        {systemStatus.status === "warning" && <Zap className="h-5 w-5 text-amber-500" />}
        {systemStatus.status === "critical" && <Zap className="h-5 w-5 text-red-500" />}
        <span className={`font-semibold ${systemStatus.color}`}>{systemStatus.message}</span>
      </div>

      {/* Controles */}
      <div className="w-full max-w-3xl px-4">
        <div className="grid grid-cols-4 gap-4 p-3 bg-white/5 rounded-xl border border-white/10">
          {/* CPU / Cerebro */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-[10px] font-medium text-white">CPU</span>
            </div>
            <button
              onClick={() => setCpuActive(!cpuActive)}
              className={`w-12 h-6 rounded-full transition-all duration-300 ${cpuActive ? 'bg-cyan-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${cpuActive ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-pink-500" />
              <span className="text-[10px] font-medium text-white">Cerebro</span>
            </div>
          </div>

          {/* Placa Madre / Corazon */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-medium text-white">Placa Madre</span>
            </div>
            <button
              onClick={() => setMotherboardActive(!motherboardActive)}
              className={`w-12 h-6 rounded-full transition-all duration-300 ${motherboardActive ? 'bg-emerald-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${motherboardActive ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[10px] font-medium text-white">Corazon</span>
            </div>
          </div>

          {/* RAM 1 / Rinon Izq */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] font-medium text-white">RAM 1</span>
            </div>
            <button
              onClick={() => setRam1Active(!ram1Active)}
              className={`w-12 h-6 rounded-full transition-all duration-300 ${ram1Active ? 'bg-purple-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${ram1Active ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] font-medium text-white">Rinon Izq.</span>
            </div>
          </div>

          {/* RAM 2 / Rinon Der */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] font-medium text-white">RAM 2</span>
            </div>
            <button
              onClick={() => setRam2Active(!ram2Active)}
              className={`w-12 h-6 rounded-full transition-all duration-300 ${ram2Active ? 'bg-purple-500' : 'bg-zinc-700'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${ram2Active ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] font-medium text-white">Rinon Der.</span>
            </div>
          </div>
        </div>

        <div className="text-[15px] text-gray-500 mt-1 text-center font-mono">
          Christopher E. Marrero L. - 25-1437
        </div>
      </div>
    </div>
  )
}

// ============================================
// COMPONENTES SLIDE
// ============================================
export function ComponentesSlideContent() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <span className="text-cyan-400 font-mono text-sm tracking-widest">03 // COMPONENTES</span>
          <h2 className="text-4xl font-bold text-white mt-4">Arquitectura del Computador</h2>
          <div className="text-sm text-gray-500 font-mono mt-2">
            Presenta: Oliver Abreu Mateo - 25-1619
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {[
            { icon: Cpu, label: "CPU", desc: "Procesamiento central", color: "cyan", delay: 0 },
            { icon: HardDrive, label: "Memoria", desc: "Almacenamiento de datos", color: "purple", delay: 1 },
            { icon: MonitorSpeaker, label: "E/S", desc: "Entrada y salida", color: "pink", delay: 2 },
            { icon: Network, label: "Buses", desc: "Interconexion", color: "blue", delay: 3 },
          ].map(({ icon: Icon, label, desc, color, delay }) => (
            <div
              key={label}
              className="fragment fade-up"
            >
              <div className="perspective-card">
                <div className={`
                  relative p-6 rounded-2xl h-full
                  bg-gradient-to-b from-${color}-500/10 to-transparent
                  border border-${color}-500/30
                  hover:border-${color}-500/60
                  transition-all duration-500
                  group
                `}>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-${color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl`}></div>
                  
                  <div className="relative">
                    <div className={`
                      w-16 h-16 mx-auto mb-4 rounded-2xl
                      bg-${color}-500/20
                      flex items-center justify-center
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon className={`h-8 w-8 text-${color}-400`} />
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">{label}</h3>
                    <p className="text-sm text-gray-400 text-center mt-2">{desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connection line animation */}
        <div className="mt-8 fragment fade-up">
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-full max-w-2xl rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-4 font-mono text-sm">// Interconectados mediante buses de sistema</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}


// ============================================
// ORGANIZACION SLIDE - INTERACTIVE SIMULATOR
// ============================================

/* ---------- CSS Animations (injected once) ---------- */
const orgStyles = `
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 8px #7c3aed; }
  50% { box-shadow: 0 0 20px #a78bfa; }
}
@keyframes ripple {
  0% { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
}
@keyframes waveform {
  0%, 100% { height: 10px; }
  50% { height: 30px; }
}
.buttonPulse {
  animation: pulseGlow 1.5s infinite;
}
.waveformBar {
  width: 6px;
  background: #34d399;
  margin: 0 2px;
  animation: waveform 1.2s ease-in-out infinite;
}
.waveformBar:nth-child(2) { animation-delay: 0.2s; }
.waveformBar:nth-child(3) { animation-delay: 0.4s; }
.waveformBar:nth-child(4) { animation-delay: 0.6s; }
.waveformBar:nth-child(5) { animation-delay: 0.8s; }
`;

/* ---------- RippleButton Component ---------- */
function RippleButton({ children, onClick, style }: { children: React.ReactNode; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; style: React.CSSProperties }) {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; size: number; key: number }>>([]);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };
    setRipples((old) => [...old, newRipple]);
    setTimeout(() => {
      setRipples((old) => old.filter((r) => r.key !== newRipple.key));
    }, 600);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.key}
          style={{
            position: "absolute",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.4)",
            width: r.size,
            height: r.size,
            top: r.y,
            left: r.x,
            pointerEvents: "none",
            animation: "ripple 0.6s linear",
          }}
        />
      ))}
    </button>
  );
}

/* ---------- AnimatedButton Component ---------- */
function AnimatedButton({ onClick, children, style }: { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; children: React.ReactNode; style: React.CSSProperties }) {
  const [pulsing, setPulsing] = React.useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPulsing(true);
    onClick(e);
    setTimeout(() => setPulsing(false), 1500);
  };
  return (
    <button
      onClick={handleClick}
      style={style}
      className={pulsing ? "buttonPulse" : ""}
    >
      {children}
    </button>
  );
}

/* ---------- Helpers y estilos ---------- */
function smallBtn(styleOverride?: React.CSSProperties) {
  return {
    padding: "10px 16px",
    borderRadius: 12,
    background: styleOverride?.background || "linear-gradient(90deg,#06b6d4,#7c3aed)",
    color: styleOverride?.color || "#00121a",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(12,45,60,0.45)",
    transition: "transform .12s ease, box-shadow .12s ease",
    ...(styleOverride || {})
  } as React.CSSProperties;
}
function tabBtn(active: boolean) {
  return {
    padding: "10px 18px",
    borderRadius: 999,
    background: active ? "linear-gradient(90deg,#06b6d4,#7c3aed)" : "rgba(0,0,0,0.25)",
    color: active ? "#00121a" : "#dbeafe",
    border: "none",
    cursor: "pointer",
    fontWeight: 800,
    boxShadow: active ? "0 8px 28px rgba(124,58,237,0.35)" : "none",
  } as React.CSSProperties;
}
const benchRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 10px",
  background: "rgba(255,255,255,0.03)",
  borderRadius: 6
};

/* ---------- Tipos y utilidades de la simulación ---------- */
type Instr =
  | { type: "ADD"; rd: number; rs: number; rt: number }
  | { type: "SUB"; rd: number; rs: number; rt: number }
  | { type: "LOAD"; rd: number; addr: number }
  | { type: "STORE"; rs: number; addr: number }
  | { type: "BRANCH"; rs: number; rt: number; offset: number }
  | { type: "NOP" };
const makeNOP = (): Instr => ({ type: "NOP" });

type CacheLine = { addr: number | null; data: number; lastUsed: number };
function makeCache(entries = 4): CacheLine[] {
  return Array.from({ length: entries }).map(() => ({ addr: null, data: 0, lastUsed: 0 }));
}

/* ---------- OrganizacionSlideContent (completo - refactorizado) ---------- */
export function OrganizacionSlideContent() {
  const topics = [
    "Definición",
    "Unidades operativas",
    "¿Cómo se conectan?",
    "Señales de control y Memoria",
    "Rendimiento y costo",
    'El "Cómo" funciona dentro'
  ] as const;

  // Inject CSS animations once
  useEffect(() => {
    const styleId = 'org-slide-styles';
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement("style");
      styleTag.id = styleId;
      styleTag.textContent = orgStyles;
      document.head.appendChild(styleTag);
    }
  }, []);

  // UI + params - ALL state at top level
  const [selectedTopic, setSelectedTopic] = useState<typeof topics[number]>("Definición");
  const [cores, setCores] = useState<number>(4);
  const [frequency, setFrequency] = useState<number>(3.0);
  const [cacheMB, setCacheMB] = useState<number>(16);
  const [busWidth, setBusWidth] = useState<number>(64);
  const [multiplexed, setMultiplexed] = useState<boolean>(false);

  // DefinicionView state (moved to top level)
  const [defHighlight, setDefHighlight] = useState<'cpu'|'mem'|'io'|null>(null);

  // UnitsView state (moved to top level)
  const templates: Instr[] = useMemo(() => [
    { type: "ADD", rd: 5, rs: 1, rt: 2 },
    { type: "SUB", rd: 6, rs: 3, rt: 1 },
    { type: "LOAD", rd: 2, addr: 20 },
    { type: "STORE", rs: 2, addr: 21 },
    { type: "BRANCH", rs: 1, rt: 2, offset: -2 }
  ], []);
  const [selectedInstr, setSelectedInstr] = useState<Instr>(templates[0]);
  const [microStep, setMicroStep] = useState<number>(0);
  const [microLog, setMicroLog] = useState<string[]>([]);

  // Program state
  const [pc, setPc] = useState<number>(0);
  const [registers, setRegisters] = useState<number[]>(() => Array.from({ length: 8 }).map((_, i) => i * 2));
  const [memory, setMemory] = useState<number[]>(() => Array.from({ length: 256 }).map((_, i) => i * 5));
  const [l1Lines] = useState<number>(4);
  const [cache, setCache] = useState<CacheLine[]>(() => makeCache(4));
  const cacheTimeRef = useRef<number>(0);

  const [busPackets, setBusPackets] = useState<Array<{ id: number; type: 'read' | 'write'; progress: number; sizeBits: number }>>([]);
  const busNextId = useRef(1);

  useEffect(() => {
    setCache(makeCache(l1Lines));
    cacheTimeRef.current = 0;
  }, [l1Lines]);

  const accessMemory = useRef((addr: number, writeValue?: number) => {
    cacheTimeRef.current += 1;
    const tNow = cacheTimeRef.current;
    const lineIndex = cache.findIndex(line => line.addr === addr);
    if (lineIndex >= 0) {
      setCache(prev => {
        const copy = prev.slice();
        copy[lineIndex] = {
          ...copy[lineIndex],
          lastUsed: tNow,
          data: (writeValue !== undefined ? writeValue : copy[lineIndex].data)
        };
        return copy;
      });
      return { latency: 1, value: writeValue === undefined ? cache[lineIndex].data : undefined, hit: true };
    } else {
      let evictIndex = 0;
      let minUsed = Number.POSITIVE_INFINITY;
      cache.forEach((line, idx) => {
        if ((line.lastUsed ?? 0) < minUsed) {
          minUsed = line.lastUsed ?? 0;
          evictIndex = idx;
        }
      });
      const fetched = memory[addr] ?? 0;
      setCache(prev => {
        const copy = prev.slice();
        copy[evictIndex] = { addr, data: writeValue === undefined ? fetched : writeValue, lastUsed: tNow };
        return copy;
      });
      return { latency: 8, value: writeValue === undefined ? fetched : undefined, hit: false };
    }
  }).current;

  const readReg = (i: number) => registers[i] ?? 0;
  const writeReg = (i: number, v: number) => setRegisters(prev => { const c = prev.slice(); c[i] = v; return c; });

  // Bus animation
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    function frame(now: number) {
      const dt = now - last; last = now;
      setBusPackets(prev => prev.map(p => ({ 
        ...p, 
        progress: p.progress + 0.00032 * (busWidth / 64) * (multiplexed ? 0.6 : 1) * dt 
      })).filter(p => p.progress < 1.02));
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [busWidth, multiplexed]);

  function sendBusPacket(type: 'read' | 'write') {
    const id = busNextId.current++;
    setBusPackets(prev => prev.concat([{ id, type, progress: 0, sizeBits: busWidth }]));
  }

  // UnitsView functions
  function runMicroStep() {
    const steps = ["IF: Fetch", "ID: Decode & read regs", "EX: ALU", "MEM: Access", "WB: Writeback"];
    if (microStep < steps.length) {
      setMicroLog(prev => prev.concat([steps[microStep]]));
      setMicroStep(s => s + 1);
      return;
    }
    const instr = selectedInstr;
    if (instr.type === "ADD") {
      const val = readReg(instr.rs) + readReg(instr.rt);
      writeReg(instr.rd, val);
      setMicroLog(prev => prev.concat([`R${instr.rd} = ${val}`]));
    } else if (instr.type === "SUB") {
      const val = readReg(instr.rs) - readReg(instr.rt);
      writeReg(instr.rd, val);
      setMicroLog(prev => prev.concat([`R${instr.rd} = ${val}`]));
    } else if (instr.type === "LOAD") {
      const acc = accessMemory(instr.addr);
      setMicroLog(prev => prev.concat([`LOAD [${instr.addr}] lat ${acc.latency}c (hit:${acc.hit}) -> R${instr.rd}`]));
      writeReg(instr.rd, memory[instr.addr]);
    } else if (instr.type === "STORE") {
      accessMemory(instr.addr, readReg(instr.rs));
      setMemory(m => { const c = m.slice(); c[instr.addr] = readReg(instr.rs); return c; });
      setMicroLog(prev => prev.concat([`STORE R${instr.rs} -> [${instr.addr}]`]));
    } else if (instr.type === "BRANCH") {
      if (readReg(instr.rs) === readReg(instr.rt)) {
        setPc(p => p + instr.offset);
        setMicroLog(prev => prev.concat([`Branch taken -> PC += ${instr.offset}`]));
      } else setMicroLog(prev => prev.concat([`Branch not taken`]));
    }
    setMicroStep(0);
  }

  function resetMicro() {
    setMicroStep(0);
    setMicroLog([]);
  }

  // Performance calculations
  const perfAndCost = useMemo(() => {
    const performance = cores * frequency * (cacheMB / 16) * (busWidth / 64);
    const cost = 200 + (cores * 50) + (frequency * 100) + (cacheMB * 5);
    const power = 15 + (cores * 8) + (frequency * 15);
    return {
      performance: Math.round(performance * 100),
      cost: Math.round(cost),
      power: Math.round(power),
      benches: {
        web: Math.min(100, Math.round(performance * 10)),
        gaming: Math.min(100, Math.round(performance * 9)),
        video: Math.min(100, Math.round(performance * 8))
      }
    };
  }, [cores, frequency, cacheMB, busWidth]);

  /* ---------- RENDER VIEWS (simple functions, not components) ---------- */

  const renderDefinicionView = () => (
    <div style={{ color: "#e6eef8" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700 }}>Definicion - Arquitectura vs Organizacion</h3>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 2, background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <svg viewBox="0 0 900 300" style={{ width: "100%", height: 260 }}>
            {["CPU", "Memoria", "I/O"].map((label, i) => {
              const colors = ['#06b6d4', '#34d399', '#fb923c'];
              const key = label === 'CPU' ? 'cpu' : label === 'Memoria' ? 'mem' : 'io';
              const isActive = defHighlight === key;
              return (
                <g
                  key={label}
                  onClick={() => setDefHighlight(key as 'cpu'|'mem'|'io')}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={60 + i * 290}
                    y="40"
                    width="200"
                    height="120"
                    rx="10"
                    fill={isActive ? `${colors[i]}22` : "#071024"}
                    stroke={isActive ? colors[i] : "#123042"}
                    strokeWidth={isActive ? 3 : 1}
                  />
                  <text
                    x={160 + i * 290}
                    y="110"
                    textAnchor="middle"
                    fill={isActive ? colors[i] : "#9fb8c8"}
                    fontWeight="700"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
            <rect x="60" y="190" width="760" height="40" rx="8" fill="#061726" stroke="#164e63" />
            <text x="440" y="215" textAnchor="middle" fill="#06b6d4" fontWeight="700">
              Buses: Datos / Direcciones / Control
            </text>
          </svg>
        </div>

        <aside style={{ width: 320, background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Explicacion</div>
          <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.5 }}>
            Arquitectura = <strong>"que hace el sistema"</strong>.<br/>
            Organizacion = <strong>"como esta construido para lograrlo"</strong>.
          </p>
          {defHighlight && (
            <div style={{ marginTop: 12, padding: 8, background: "rgba(255,255,255,0.05)", borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: defHighlight === 'cpu' ? '#06b6d4' : defHighlight === 'mem' ? '#34d399' : '#fb923c' }}>
                {defHighlight === 'cpu' ? 'CPU' : defHighlight === 'mem' ? 'Memoria' : 'I/O'} seleccionado
              </div>
            </div>
          )}
          <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setSelectedTopic("Unidades operativas")} style={smallBtn()}>
              Ver Unidades
            </button>
            <button onClick={() => setSelectedTopic("Señales de control y Memoria")} style={smallBtn({ background: "linear-gradient(90deg,#34d399,#06b6d4)" })}>
              Ver Memoria
            </button>
          </div>
        </aside>
      </div>
    </div>
  );

  const renderHowTheyConnectView = () => (
    <div style={{ color: "#e6eef8" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700 }}>Como se conectan? - Buses dinamicos</h3>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <svg viewBox="0 0 800 240" style={{ width: "100%", height: 240 }}>
            <rect x="72" y="40" width="120" height="80" rx="8" fill="#071026" stroke="#06b6d4" strokeWidth={2} />
            <text x="132" y="90" textAnchor="middle" fill="#9ca3af" fontWeight="700">CPU</text>
            <rect x="340" y="40" width="120" height="80" rx="8" fill="#071026" stroke="#34d399" strokeWidth={2} />
            <text x="400" y="90" textAnchor="middle" fill="#9ca3af" fontWeight="700">Memoria</text>
            <rect x="600" y="40" width="120" height="80" rx="8" fill="#071026" stroke="#fb7185" strokeWidth={2} />
            <text x="660" y="90" textAnchor="middle" fill="#9ca3af" fontWeight="700">I/O</text>
            <line x1="200" y1="140" x2="340" y2="140" stroke="#06b6d4" strokeWidth={6} />
            <line x1="460" y1="140" x2="600" y2="140" stroke="#06b6d4" strokeWidth={6} />
            {busPackets.map(p => {
              const x = 200 + p.progress * 400;
              const color = p.type === 'read' ? '#60a5fa' : '#fb7185';
              return (
                <g key={p.id}>
                  <rect x={x - 12} y={128} width={24} height={24} rx={6} fill={color} />
                  <text x={x} y={120} textAnchor="middle" fontSize={10} fill="#e6f3ff">{p.sizeBits}b</text>
                </g>
              );
            })}
          </svg>
          <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => sendBusPacket('read')} style={smallBtn({ background: "linear-gradient(90deg,#06b6d4,#18b2d2)" })}>
              Enviar lectura
            </button>
            <button onClick={() => sendBusPacket('write')} style={smallBtn({ background: "linear-gradient(90deg,#fb7185,#ff9aa2)" })}>
              Enviar escritura
            </button>
            <div style={{ marginLeft: "auto", color: "#cbd5e1" }}>En transito: <strong>{busPackets.length}</strong></div>
          </div>
        </div>

        <aside style={{ width: 300, background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Controles</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "#9ca3af" }}>Ancho de bus: <strong>{busWidth}</strong> bits</label>
            <input 
              type="range" 
              min={8} 
              max={256} 
              value={busWidth} 
              onChange={(e) => setBusWidth(Number(e.target.value))} 
              style={{ width: "100%", accentColor: "#06b6d4" }} 
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "#9ca3af" }}>Multiplexado</label>
            <div style={{ marginTop: 8 }}>
              <button
                onClick={() => setMultiplexed(m => !m)}
                style={smallBtn({
                  background: multiplexed ? "linear-gradient(90deg,#34d399,#06b6d4)" : "rgba(255,255,255,0.1)",
                  color: multiplexed ? "#00121a" : "#e6eef8",
                })}
              >
                {multiplexed ? "ON" : "OFF"}
              </button>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 12 }}>
            Curiosidad: multiplexar reduce lineas fisicas a costa de logica y latencia.
          </p>
        </aside>
      </div>
    </div>
  );

  const renderUnitsView = () => (
    <div style={{ color: "#e6eef8" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700 }}>Unidades operativas - Datapath interactivo</h3>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 2, background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <svg viewBox="0 0 900 320" style={{ width: "100%", height: 260 }}>
            <rect x="40" y="40" width="160" height="220" rx="8" fill="#071124" stroke="#0ea5e9" strokeWidth={2} />
            <text x="120" y="64" textAnchor="middle" fill="#9ca3af" fontWeight="700">RegFile R0..R7</text>
            <rect x="260" y="120" width="120" height="80" rx="8" fill="#071124" stroke="#7c3aed" strokeWidth={2} />
            <text x="320" y="160" textAnchor="middle" fill="#d1b3ff" fontWeight="700">ALU</text>
            <rect x="420" y="40" width="160" height="80" rx="8" fill="#071124" stroke="#06b6d4" strokeWidth={2} />
            <text x="500" y="80" textAnchor="middle" fill="#9feaf7" fontWeight="700">Control</text>
            <rect x="620" y="120" width="140" height="140" rx="8" fill="#071124" stroke="#34d399" strokeWidth={2} />
            <text x="690" y="160" textAnchor="middle" fill="#d1fae5" fontWeight="700">Memoria</text>
            <line x1="200" y1="140" x2="260" y2="160" stroke="#06b6d4" strokeWidth={3} />
            <line x1="380" y1="160" x2="620" y2="160" stroke="#06b6d4" strokeWidth={3} />
          </svg>

          <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
            <select 
              value={JSON.stringify(selectedInstr)} 
              onChange={(e) => {
                const idx = templates.findIndex(it => JSON.stringify(it) === e.target.value);
                if (idx >= 0) setSelectedInstr(templates[idx]);
              }} 
              style={{ padding: 10, background: "#071323", color: "#e6eef8", borderRadius: 12, flexGrow: 1, border: "1px solid #203040" }}
            >
              {templates.map((t, i) => <option key={i} value={JSON.stringify(t)}>{t.type + (t.type === 'LOAD' || t.type === 'STORE' ? ` ${('addr' in t) ? t.addr : ''}` : '')}</option>)}
            </select>

            <button onClick={runMicroStep} style={smallBtn()}>Step micro-op</button>
            <button 
              onClick={resetMicro} 
              style={{ padding: "8px 12px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "#e6eef8", border: "none", cursor: "pointer", fontWeight: 700 }}
            >
              Reset
            </button>
          </div>

          <div style={{ marginTop: 18, padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)" }}>
            <div style={{ fontWeight: 700 }}>Registros</div>
            <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
              {registers.map((v, i) => (
                <div 
                  key={i} 
                  style={{ width: 84, background: "rgba(3, 19, 29, 0.6)", padding: 10, borderRadius: 12, textAlign: "center" }}
                >
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>R{i}</div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside style={{ width: 320, background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Micro-log</div>
          <div style={{ maxHeight: 220, overflow: "auto", background: "rgba(0,0,0,0.18)", padding: 12, borderRadius: 10, fontFamily: "monospace" }}>
            {microLog.length === 0 ? (
              <div style={{ color: "#9ca3af" }}>Aqui apareceran los pasos del microcodigo...</div>
            ) : (
              microLog.slice().reverse().map((l, i) => (
                <div key={i} style={{ color: "#e6eef8", fontSize: 13, padding: 6 }}>{l}</div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );

  const renderSignalsView = () => (
    <div style={{ color: "#e6eef8" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700 }}>Senales de control y Memoria</h3>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 2, background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <p style={{ color: "#cbd5e1", marginBottom: 12 }}>Visualizacion simplificada de senales (waveform animado).</p>
          <div style={{ height: 180, background: "#081526", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="waveformBar" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <button onClick={() => sendBusPacket('read')} style={smallBtn()}>Simular lectura</button>
            <button onClick={() => sendBusPacket('write')} style={smallBtn({ background: "linear-gradient(90deg,#fb7185,#ff9aa2)" })}>
              Simular escritura
            </button>
          </div>
        </div>
        <aside style={{ width: 320, background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Bus Activity</div>
          <div style={{ background: "rgba(0,0,0,0.2)", padding: 12, borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>Paquetes en transito:</span>
              <strong style={{ color: "#06b6d4" }}>{busPackets.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>Ancho de bus:</span>
              <strong style={{ color: "#34d399" }}>{busWidth} bits</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#9ca3af", fontSize: 12 }}>Multiplexado:</span>
              <strong style={{ color: multiplexed ? "#34d399" : "#fb7185" }}>{multiplexed ? "ON" : "OFF"}</strong>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "#6b7280", marginTop: 12 }}>
            Las senales de control coordinan el flujo de datos entre CPU, memoria y dispositivos I/O.
          </p>
        </aside>
      </div>
    </div>
  );

  const renderRendimientoView = () => (
    <div style={{ color: "#e6eef8" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700 }}>Rendimiento y costo</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div style={{ background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <h4 style={{ marginTop: 0, fontWeight: 700 }}>Configuracion</h4>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "#9ca3af" }}>Cores: <strong>{cores}</strong></label>
            <input type="range" min={1} max={16} value={cores} onChange={e => setCores(Number(e.target.value))} style={{ width: "100%", accentColor: "#06b6d4" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "#9ca3af" }}>Frecuencia: <strong>{frequency} GHz</strong></label>
            <input type="range" min={1} max={5} step={0.1} value={frequency} onChange={e => setFrequency(Number(e.target.value))} style={{ width: "100%", accentColor: "#06b6d4" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "#9ca3af" }}>Cache L3: <strong>{cacheMB} MB</strong></label>
            <input type="range" min={2} max={64} value={cacheMB} onChange={e => setCacheMB(Number(e.target.value))} style={{ width: "100%", accentColor: "#06b6d4" }} />
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8 }}>
          <div style={{ ...benchRow, marginBottom: 10 }}>
            <span>Rendimiento</span>
            <strong style={{ color: "#06b6d4" }}>{perfAndCost.performance} pts</strong>
          </div>
          <div style={{ ...benchRow, marginBottom: 10 }}>
            <span>Costo</span>
            <strong style={{ color: "#34d399" }}>${perfAndCost.cost}</strong>
          </div>
          <div style={{ ...benchRow, marginBottom: 10 }}>
            <span>Consumo</span>
            <strong style={{ color: "#fb923c" }}>{perfAndCost.power} W</strong>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{"🌐"}</div>
              <div style={{ fontSize: 12 }}>Web: {perfAndCost.benches.web}%</div>
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{"🎮"}</div>
              <div style={{ fontSize: 12 }}>Gaming: {perfAndCost.benches.gaming}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComoFuncionaView = () => (
    <div style={{ color: "#e6eef8" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700 }}>El Como funciona dentro</h3>
      <p style={{ color: "#cbd5e1", marginBottom: 16 }}>
        Resumen interactivo con enlaces a las otras vistas. Usa los botones para navegar por ejemplos.
      </p>
      <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button onClick={() => setSelectedTopic("Definición")} style={smallBtn()}>
          Definicion
        </button>
        <button onClick={() => setSelectedTopic("Unidades operativas")} style={smallBtn({ background: "linear-gradient(90deg,#7c3aed,#06b6d4)" })}>
          Unidades
        </button>
        <button onClick={() => setSelectedTopic("Señales de control y Memoria")} style={smallBtn({ background: "linear-gradient(90deg,#34d399,#06b6d4)" })}>
          Senales
        </button>
      </div>
      <div style={{ marginTop: 24, padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 12 }}>
        <h4 style={{ margin: 0, fontWeight: 700, marginBottom: 12 }}>Resumen de la Organizacion</h4>
        <ul style={{ margin: 0, paddingLeft: 20, color: "#cbd5e1", lineHeight: 1.8 }}>
          <li><strong>Definicion:</strong> Explica que es arquitectura vs organizacion</li>
          <li><strong>Unidades operativas:</strong> Simula el datapath y las micro-operaciones</li>
          <li><strong>Conexiones:</strong> Visualiza los buses dinamicos del sistema</li>
          <li><strong>Senales:</strong> Muestra el flujo de senales de control</li>
          <li><strong>Rendimiento:</strong> Calcula costo/rendimiento segun configuracion</li>
        </ul>
      </div>
    </div>
  );

  /* ---------- Render principal ---------- */
  return (
    <div style={{ width: "100%", height: "100%", padding: 16, boxSizing: "border-box", fontFamily: "Inter, system-ui, sans-serif" }}>
      <header style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ color: "#a78bfa", fontSize: 12, fontWeight: 700 }}>05 // ORGANIZACION</div>
          <h2 style={{ margin: 0, color: "white" }}>Organizacion del Computador</h2>
          <div style={{ color: "#9ca3af", fontSize: 12 }}>Presenta: Enmanuel Santos Diaz - 25-1544</div>
        </div>
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {topics.map(t => (
            <button key={t} onClick={() => setSelectedTopic(t)} style={tabBtn(selectedTopic === t)}>{t}</button>
          ))}
        </nav>
      </header>

      <main style={{ height: "calc(100% - 100px)", overflow: "auto" }}>
        {selectedTopic === "Definición" && renderDefinicionView()}
        {selectedTopic === "Unidades operativas" && renderUnitsView()}
        {selectedTopic === "¿Cómo se conectan?" && renderHowTheyConnectView()}
        {selectedTopic === "Señales de control y Memoria" && renderSignalsView()}
        {selectedTopic === "Rendimiento y costo" && renderRendimientoView()}
        {selectedTopic === 'El "Cómo" funciona dentro' && renderComoFuncionaView()}
      </main>
    </div>
  );
}

export default OrganizacionSlideContent;




// ============================================
// TIPOS DE ARQUITECTURAS SLIDE
// ============================================
export function TiposArquitecturasSlideContent() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-6xl text-center">
        <span className="text-cyan-400 font-mono text-sm tracking-widest">05 // CLASIFICACION</span>
        <h2 className="text-5xl font-bold text-white mt-4 mb-4">
          Tipos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Arquitecturas</span>
        </h2>
        <div className="text-sm text-gray-500 font-mono mb-8">
          Presenta: Frainer Encarnación - 25-1775
        </div>

        <div className="grid grid-cols-4 gap-6">
          {[
            { name: "Von Neumann", year: "1945", icon: "📦", color: "cyan", desc: "Memoria unificada" },
            { name: "Harvard", year: "1950s", icon: "🔀", color: "purple", desc: "Memorias separadas" },
            { name: "Harvard Mod.", year: "1980s", icon: "⚡", color: "green", desc: "Cache unificado" },
            { name: "Paralelas", year: "2000s", icon: "🔲", color: "orange", desc: "SIMD / MIMD" },
          ].map(({ name, year, icon, color, desc }, i) => (
            <div
              key={name}
              className="fragment fade-up"
            >
              <div className={`
                relative p-6 rounded-3xl
                bg-gradient-to-b from-${color}-500/20 to-${color}-500/5
                border border-${color}-500/30
                hover:border-${color}-500/60
                transition-all duration-500
                group cursor-pointer
                floating-card
              `}
              style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className={`text-xl font-bold text-${color}-400`}>{name}</h3>
                <p className="text-xs text-gray-500 font-mono mt-1">{year}</p>
                <p className="text-sm text-gray-400 mt-3">{desc}</p>
                
                {/* Hover arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className={`h-5 w-5 text-${color}-400`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// TIMELINE SLIDE
// ============================================
export function TimelineSlideContent() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <span className="text-purple-400 font-mono text-sm tracking-widest">06 // EVOLUCION</span>
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">Evolucion de Arquitecturas</h2>
          <div className="text-sm text-gray-500 font-mono">
            Presenta: Frainer Encarnación - 25-1775
          </div>
        </div>
        
        <div className="timeline-container">
          {[
            { year: "1945", name: "Von Neumann", color: "cyan", desc: "Primera arquitectura de programa almacenado" },
            { year: "1950s", name: "Harvard", color: "purple", desc: "Separacion de memoria de instrucciones y datos" },
            { year: "1980s", name: "Harvard Modificada", color: "green", desc: "Cache unificado con buses separados" },
            { year: "2000s+", name: "Paralelas (SIMD/MIMD)", color: "orange", desc: "Procesamiento masivamente paralelo" },
          ].map(({ year, name, color, desc }, i) => (
            <div key={name} className="fragment fade-right timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-card p-4 rounded-xl">
                <span className={`text-${color}-400 font-mono text-sm`}>{year}</span>
                <h4 className="text-white font-bold text-lg">{name}</h4>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// VON NEUMANN SIMULATION SLIDE
// ============================================
export function VonNeumannSlideContent() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const steps = [
    { name: "Buscar Instruccion", from: "memory", to: "cpu" },
    { name: "Decodificar", from: null, to: null },
    { name: "Buscar Datos", from: "memory", to: "cpu" },
    { name: "Ejecutar", from: null, to: null },
    { name: "Escribir Resultado", from: "cpu", to: "memory" },
  ]

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setStep(s => (s + 1) % steps.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [isPlaying, steps.length])

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <span className="text-cyan-400 font-mono text-sm tracking-widest">07 // SIMULACION</span>
          <h2 className="text-4xl font-bold text-white mt-2">Arquitectura Von Neumann</h2>
          <div className="text-sm text-gray-500 font-mono mt-2">
            Presenta: Frainer Encarnacion
          </div>
        </div>

        {/* Simulation area */}
        <div className="relative h-64 rounded-3xl bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/20 overflow-hidden">
          {/* CPU */}
          <div className={`
            absolute left-16 top-1/2 -translate-y-1/2
            w-32 h-32 rounded-2xl
            bg-gradient-to-br from-cyan-500/30 to-cyan-600/10
            border-2 ${step === 1 || step === 3 ? 'border-cyan-400 shadow-lg shadow-cyan-500/50' : 'border-cyan-500/30'}
            flex items-center justify-center
            transition-all duration-300
          `}>
            <div className="text-center">
              <Cpu className="h-10 w-10 text-cyan-400 mx-auto" />
              <span className="text-xs text-cyan-400 font-mono mt-2 block">CPU</span>
            </div>
          </div>

          {/* Memory */}
          <div className={`
            absolute right-16 top-1/2 -translate-y-1/2
            w-32 h-32 rounded-2xl
            bg-gradient-to-br from-purple-500/30 to-purple-600/10
            border-2 ${step === 0 || step === 2 || step === 4 ? 'border-purple-400 shadow-lg shadow-purple-500/50' : 'border-purple-500/30'}
            flex items-center justify-center
            transition-all duration-300
          `}>
            <div className="text-center">
              <Database className="h-10 w-10 text-purple-400 mx-auto" />
              <span className="text-xs text-purple-400 font-mono mt-2 block">MEMORIA</span>
            </div>
          </div>

          {/* Bus with animated particles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32">
            <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 relative overflow-hidden">
              {(step === 0 || step === 2) && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-bus-right"></div>
              )}
              {step === 4 && (
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cyan-400 to-transparent animate-bus-left"></div>
              )}
            </div>
            <span className="text-[10px] text-gray-500 font-mono text-center block mt-2">BUS COMPARTIDO</span>
          </div>

          {/* Bottleneck warning */}
          {step === 2 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50">
              <span className="text-xs text-red-400 font-mono">⚠ Cuello de Botella Von Neumann</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6 px-4">
          <div className="glass-card px-4 py-2 rounded-xl">
            <span className="text-sm text-gray-400">Paso {step + 1}/{steps.length}: </span>
            <span className="text-white font-semibold">{steps[step].name}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 transition-colors flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pausar' : 'Iniciar'}
            </button>
            <button
              onClick={() => setStep(0)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bus-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bus-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-bus-right {
          animation: bus-right 0.8s ease-in-out;
        }
        .animate-bus-left {
          animation: bus-left 0.8s ease-in-out;
        }
      `}</style>
    </div>
  )
}

// ============================================
// HARVARD SIMULATION SLIDE
// ============================================
export function HarvardSlideContent() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setStep(s => (s + 1) % 4)
    }, 1200)
    return () => clearInterval(timer)
  }, [isPlaying])

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <span className="text-purple-400 font-mono text-sm tracking-widest">08 // SIMULACION</span>
          <h2 className="text-4xl font-bold text-white mt-2">Arquitectura Harvard</h2>
          <div className="text-sm text-gray-500 font-mono mt-2">
            Presenta: Frainer Encarnacion
          </div>
        </div>

        <div className="relative h-72 rounded-3xl bg-gradient-to-b from-purple-500/5 to-transparent border border-purple-500/20 overflow-hidden">
          {/* CPU in center */}
          <div className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-28 h-28 rounded-2xl
            bg-gradient-to-br from-cyan-500/30 to-cyan-600/10
            border-2 ${step === 1 ? 'border-cyan-400 shadow-lg shadow-cyan-500/50' : 'border-cyan-500/30'}
            flex items-center justify-center
            transition-all duration-300 z-10
          `}>
            <div className="text-center">
              <Cpu className="h-8 w-8 text-cyan-400 mx-auto" />
              <span className="text-[10px] text-cyan-400 font-mono mt-1 block">CPU</span>
            </div>
          </div>

          {/* Instruction Memory - Top */}
          <div className={`
            absolute top-4 left-1/2 -translate-x-1/2
            w-36 h-16 rounded-xl
            bg-gradient-to-br from-blue-500/30 to-blue-600/10
            border-2 ${step === 0 ? 'border-blue-400 shadow-lg shadow-blue-500/50' : 'border-blue-500/30'}
            flex items-center justify-center
            transition-all duration-300
          `}>
            <div className="text-center">
              <span className="text-xs text-blue-400 font-mono">MEM. INSTRUCCIONES</span>
            </div>
          </div>

          {/* Data Memory - Bottom */}
          <div className={`
            absolute bottom-4 left-1/2 -translate-x-1/2
            w-36 h-16 rounded-xl
            bg-gradient-to-br from-purple-500/30 to-purple-600/10
            border-2 ${step === 2 || step === 3 ? 'border-purple-400 shadow-lg shadow-purple-500/50' : 'border-purple-500/30'}
            flex items-center justify-center
            transition-all duration-300
          `}>
            <div className="text-center">
              <span className="text-xs text-purple-400 font-mono">MEM. DATOS</span>
            </div>
          </div>

          {/* Instruction Bus */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-12">
            <div className="w-full h-full rounded-full bg-blue-500/30 relative overflow-hidden">
              {step === 0 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-bus-down"></div>
              )}
            </div>
          </div>

          {/* Data Bus */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-1 h-12">
            <div className="w-full h-full rounded-full bg-purple-500/30 relative overflow-hidden">
              {step === 2 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-bus-up"></div>
              )}
              {step === 3 && (
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-400 to-transparent animate-bus-down"></div>
              )}
            </div>
          </div>

          {/* Performance indicator */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/50">
            <span className="text-xs text-green-400 font-mono">✓ Sin Cuello de Botella</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 px-4">
          <div className="glass-card px-4 py-2 rounded-xl">
            <span className="text-sm text-gray-400">Acceso paralelo a instrucciones y datos</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bus-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes bus-up {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        .animate-bus-down {
          animation: bus-down 0.6s ease-in-out;
        }
        .animate-bus-up {
          animation: bus-up 0.6s ease-in-out;
        }
      `}</style>
    </div>
  )
}

// ============================================
// MODIFIED HARVARD SLIDE
// ============================================
export function ModifiedHarvardSlideContent() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <span className="text-green-400 font-mono text-sm tracking-widest">09 // SIMULACION</span>
          <h2 className="text-4xl font-bold text-white mt-2">Harvard Modificada</h2>
          <div className="text-sm text-gray-500 font-mono mt-2">
            Presenta: Frainer Encarnacion
          </div>
        </div>

        <div className="relative h-72 rounded-3xl bg-gradient-to-b from-green-500/5 to-transparent border border-green-500/20 p-8">
          <div className="grid grid-cols-3 gap-4 h-full items-center">
            {/* CPU with L1 caches */}
            <div className="col-span-1">
              <div className="glass-card p-4 rounded-2xl border border-cyan-500/30">
                <div className="text-center mb-4">
                  <Cpu className="h-8 w-8 text-cyan-400 mx-auto" />
                  <span className="text-xs text-cyan-400 font-mono">CPU</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-center">
                    <span className="text-[10px] text-blue-400 font-mono">L1-I</span>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-center">
                    <span className="text-[10px] text-purple-400 font-mono">L1-D</span>
                  </div>
                </div>
              </div>
            </div>

            {/* L2 Unified Cache */}
            <div className="col-span-1 flex items-center justify-center">
              <div className="glass-card p-6 rounded-2xl border border-green-500/30 animate-pulse-subtle">
                <div className="text-center">
                  <span className="text-lg text-green-400 font-mono font-bold">L2</span>
                  <p className="text-[10px] text-gray-400 mt-1">Cache Unificado</p>
                </div>
              </div>
            </div>

            {/* Main Memory */}
            <div className="col-span-1">
              <div className="glass-card p-4 rounded-2xl border border-gray-500/30">
                <div className="text-center">
                  <Server className="h-8 w-8 text-gray-400 mx-auto" />
                  <span className="text-xs text-gray-400 font-mono">MEMORIA PRINCIPAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connection arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(156, 163, 175)" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="glass-card p-3 rounded-xl text-center">
            <span className="text-xs text-blue-400">Caches L1 separados</span>
          </div>
          <div className="glass-card p-3 rounded-xl text-center">
            <span className="text-xs text-green-400">Cache L2 unificado</span>
          </div>
          <div className="glass-card p-3 rounded-xl text-center">
            <span className="text-xs text-gray-400">Lo mejor de ambos mundos</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        @keyframes pulse-subtle {
          0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.2); }
          50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.4); }
        }
      `}</style>
    </div>
  )
}

// ============================================
// PARALLEL ARCHITECTURES SLIDE
// ============================================
export function ParallelSlideContent() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl text-center">
        <span className="text-orange-400 font-mono text-sm tracking-widest">10 // PARALELO</span>
        <h2 className="text-5xl font-bold text-white mt-4 mb-4">
          Arquitecturas <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Paralelas</span>
        </h2>
        <div className="text-sm text-gray-500 font-mono mb-8">
          Presenta: Frainer Encarnacion
        </div>
        <p className="text-gray-400 text-lg mb-12">
          Procesamiento simultaneo para maxima eficiencia
        </p>

        <div className="flex justify-center gap-8">
          {/* SIMD Visual */}
          <div className="fragment zoom-in">
            <div className="glass-card p-8 rounded-3xl border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">SIMD</h3>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono text-sm">
                  SUMAR
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs animate-simd"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      D{i}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Una Instruccion, Multiples Datos</p>
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center">
            <span className="text-4xl font-bold text-white/30">VS</span>
          </div>

          {/* MIMD Visual */}
          <div className="fragment zoom-in">
            <div className="glass-card p-8 rounded-3xl border border-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-400 mb-6">MIMD</h3>
              <div className="grid grid-cols-2 gap-4">
                {['SUMAR', 'MULT', 'RESTAR', 'DIVIDIR'].map((op, i) => (
                  <div key={op} className="space-y-2">
                    <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-400 font-mono text-xs animate-mimd" style={{ animationDelay: `${i * 0.2}s` }}>
                      {op}
                    </div>
                    <div className="w-full h-8 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-[10px]">
                      D{i + 1}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">Multiples Instrucciones, Multiples Datos</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-simd {
          animation: simd-pulse 1.5s ease-in-out infinite;
        }
        .animate-mimd {
          animation: mimd-pulse 1.2s ease-in-out infinite;
        }
        @keyframes simd-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes mimd-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}

// ============================================
// SIMD vs MIMD DETAIL SLIDE
// ============================================
export function SIMDvsMIMDSlideContent() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <span className="text-cyan-400 font-mono text-sm tracking-widest">11 // COMPARACION</span>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            SIMD vs MIMD en Detalle
          </h2>
          <div className="text-sm text-gray-500 font-mono">
            Presenta: Frainer Encarnacion
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="fragment zoom-in">
            <div className="morph-card simd-card p-8 rounded-3xl">
              <h4 className="text-2xl font-bold text-cyan-400 mb-4">SIMD</h4>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="simd-unit w-12 h-12 rounded-lg bg-cyan-500/30 border border-cyan-500 flex items-center justify-center text-cyan-400 font-mono">
                    +
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mb-4">Una instruccion, multiples datos</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Ideal para graficos y multimedia</li>
                <li>• GPUs modernas</li>
                <li>• Procesamiento de senales</li>
              </ul>
            </div>
          </div>
          <div className="fragment zoom-in">
            <div className="morph-card mimd-card p-8 rounded-3xl">
              <h4 className="text-2xl font-bold text-purple-400 mb-4">MIMD</h4>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {['+','-','*','/'].map((op, i) => (
                  <div key={i} className="mimd-unit w-12 h-12 rounded-lg bg-purple-500/30 border border-purple-500 flex items-center justify-center text-purple-400 font-mono">
                    {op}
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mb-4">Multiples instrucciones, multiples datos</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Servidores y clusters</li>
                <li>• Supercomputadoras</li>
                <li>• Procesamiento distribuido</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// CICLO DE INSTRUCCION
// ============================================
export function CicloInstruccionSlideContent() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <span className="text-cyan-400 font-mono text-sm tracking-widest">12 // CICLO</span>
          <h2 className="text-4xl font-bold text-white mt-2">Ciclo de Instruccion</h2>
          <div className="text-sm text-gray-500 font-mono mt-2">
            Presenta: Frainer Encarnación - 25-1775
          </div>
        </div>

        {/* Cycle visualization */}
        <div className="relative h-64 flex items-center justify-center">
          <div className="cycle-container">
            {[
              { name: "Buscar", color: "cyan", angle: 0 },
              { name: "Decodificar", color: "blue", angle: 72 },
              { name: "Ejecutar", color: "purple", angle: 144 },
              { name: "Memoria", color: "pink", angle: 216 },
              { name: "Escribir", color: "green", angle: 288 },
            ].map(({ name, color, angle }, i) => (
              <div
                key={name}
                className={`cycle-item fragment fade-up`}
                style={{
                  transform: `rotate(${angle}deg) translateY(-100px) rotate(-${angle}deg)`,
                }}
              >
                <div className={`
                  px-4 py-3 rounded-xl
                  bg-${color}-500/20 border border-${color}-500/50
                  text-${color}-400 font-mono text-sm
                  hover:scale-110 transition-transform cursor-pointer
                `}>
                  {name}
                </div>
              </div>
            ))}
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                <Cpu className="h-8 w-8 text-white/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Steps explanation */}
        <div className="grid grid-cols-5 gap-2 mt-8">
          {[
            { step: "1", name: "Fetch", desc: "Buscar" },
            { step: "2", name: "Decode", desc: "Decodificar" },
            { step: "3", name: "Execute", desc: "Ejecutar" },
            { step: "4", name: "Memory", desc: "Acceder" },
            { step: "5", name: "Writeback", desc: "Escribir" },
          ].map(({ step, name, desc }) => (
            <div key={step} className="text-center">
              <div className="w-8 h-8 mx-auto rounded-full bg-white/10 flex items-center justify-center text-white/70 font-mono text-sm mb-2">
                {step}
              </div>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cycle-container {
          position: relative;
          width: 250px;
          height: 250px;
        }
        .cycle-item {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -20px;
          margin-left: -40px;
        }
      `}</style>
    </div>
  )
}

// ============================================
// APLICACIONES SLIDE (Algenis)
// ============================================
export function AplicacionesSlideContent() {
  const apps = [
    {
      title: "Smartphones (ARM + SoC)",
      desc: "Bajo consumo y más batería; integración en SoC mejora eficiencia en poco espacio.",
      example: "Ej: iPhone, Android, tablets",
      icon: "📱",
      color: "cyan",
      label: "Smartphones",
      angle: -60,
    },
    {
      title: "PC Escritorio (x86)",
      desc: "Alto rendimiento para edición, diseño y programación; buena memoria y refrigeración.",
      example: "Ej: Gaming, trabajo pesado",
      icon: "🖥️",
      color: "purple",
      label: "PC",
      angle: 0,
    },
    {
      title: "Embebidos / IoT",
      desc: "Costo y confiabilidad; respuesta rápida en sensores y electrodomésticos.",
      example: "Ej: sensores, domótica",
      icon: "📡",
      color: "green",
      label: "IoT",
      angle: 180,
    },
    {
      title: "IA (GPU/TPU/NPU)",
      desc: "Paralelismo masivo acelera entrenamiento e inferencia.",
      example: "Ej: ChatGPT, visión",
      icon: "🤖",
      color: "orange",
      label: "IA",
      angle: 60,
    },
    {
      title: "Servidores / Cloud",
      desc: "Escalabilidad y disponibilidad con virtualización + red/almacenamiento potente.",
      example: "Ej: AWS, Google Cloud",
      icon: "☁️",
      color: "red",
      label: "Cloud",
      angle: 120,
    },
  ]

  const colorStyles: Record<
    string,
    { bg: string; border: string; text: string; glow: string; ring: string }
  > = {
    cyan: {
      bg: "from-cyan-500/10 to-transparent",
      border: "border-cyan-500/20 hover:border-cyan-500/50",
      text: "text-cyan-300",
      glow: "shadow-[0_0_30px_rgba(34,211,238,0.18)]",
      ring: "ring-cyan-500/30",
    },
    purple: {
      bg: "from-purple-500/10 to-transparent",
      border: "border-purple-500/20 hover:border-purple-500/50",
      text: "text-purple-300",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.18)]",
      ring: "ring-purple-500/30",
    },
    green: {
      bg: "from-green-500/10 to-transparent",
      border: "border-green-500/20 hover:border-green-500/50",
      text: "text-green-300",
      glow: "shadow-[0_0_30px_rgba(34,197,94,0.18)]",
      ring: "ring-green-500/30",
    },
    orange: {
      bg: "from-orange-500/10 to-transparent",
      border: "border-orange-500/20 hover:border-orange-500/50",
      text: "text-orange-300",
      glow: "shadow-[0_0_30px_rgba(249,115,22,0.18)]",
      ring: "ring-orange-500/30",
    },
    red: {
      bg: "from-red-500/10 to-transparent",
      border: "border-red-500/20 hover:border-red-500/50",
      text: "text-red-300",
      glow: "shadow-[0_0_30px_rgba(239,68,68,0.18)]",
      ring: "ring-red-500/30",
    },
  }

  const [active, setActive] = useState(0)

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-pink-400 font-mono text-sm tracking-widest">
            13 // APLICACIONES
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">
            Aplicaciones del Mundo Real
          </h2>

          <div className="text-sm text-gray-500 font-mono mt-2">
            Presenta:Algenis De los Santos Lopez 25-1739
          </div>
        </div>

        {/* 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* ✅ Columna izquierda: tarjetas dinámicas */}
          <div className="grid grid-cols-1 gap-4">
            {apps.map((item, i) => {
              const styles = colorStyles[item.color]
              const isActive = i === active

              return (
                <div
                  key={item.title}
                  className={`fragment ${i % 2 === 0 ? "fade-right" : "fade-left"}`}
                >
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`
                      w-full text-left
                      flex items-center gap-6 p-5 rounded-2xl
                      bg-gradient-to-r ${styles.bg}
                      border ${styles.border}
                      transition-all duration-300 cursor-pointer
                      ${isActive ? `scale-[1.02] ring-1 ${styles.ring} ${styles.glow}` : "opacity-85 hover:opacity-100"}
                    `}
                  >
                    {/* Icono con “pulse” cuando está activo */}
                    <div className={`text-4xl ${isActive ? "animate-pulse" : ""}`}>
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${styles.text}`}>
                        {item.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-snug mt-1">
                        {item.desc}
                      </p>

                      {/* Extra: aparece solo cuando está activo */}
                      {isActive && (
                        <div className="mt-2 text-xs text-gray-300 font-mono">
                          ✅ {item.example}
                        </div>
                      )}
                    </div>

                    {/* Flecha animada */}
                    <span
                      className={`
                        text-xl ${styles.text}
                        transition-transform duration-300
                        ${isActive ? "translate-x-1" : "translate-x-0 opacity-50"}
                      `}
                    >
                      →
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          {/* ✅ Columna derecha: rueda interactiva */}
          <div className="flex items-center justify-center">
            <div className="relative w-[340px] h-[340px]">
              {/* Base rueda */}
              <div
                className="
                  absolute inset-0 rounded-full
                  bg-[conic-gradient(from_90deg,rgba(34,211,238,0.35),rgba(168,85,247,0.35),rgba(34,197,94,0.35),rgba(249,115,22,0.35),rgba(239,68,68,0.35))]
                  border border-white/10
                "
              />

              {/* Glow general */}
              <div className="absolute inset-0 rounded-full blur-2xl opacity-25 bg-white/10" />

              {/* Centro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[160px] h-[160px] rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-center px-3">
                  <p className="text-white font-bold text-sm leading-tight">
                    Aplicaciones
                    <span className="block text-gray-400 font-normal mt-1 text-xs">
                      Arquitectura & Organización
                    </span>

                    {/* ✅ Línea dinámica mostrando el activo */}
                    <span className="block mt-3 text-xs font-mono text-gray-300">
                      Activo:{" "}
                      <span className="text-white">{apps[active].label}</span>
                    </span>
                  </p>
                </div>
              </div>

              {/* Marcador activo sobre el anillo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[310px] h-[310px] relative"
                  style={{
                    transform: `rotate(${apps[active].angle}deg)`,
                    transition: "transform 400ms ease",
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                  </div>
                </div>
              </div>

              {/* Labels clickable alrededor */}
              {apps.map((a, idx) => {
                const isActive = idx === active
                const styles = colorStyles[a.color]

                // Posiciones fijas “bonitas”
                const positions: Record<number, string> = {
                  0: "top-6 left-1/2 -translate-x-1/2",
                  1: "right-2 top-1/2 -translate-y-1/2",
                  2: "left-2 top-1/2 -translate-y-1/2",
                  3: "bottom-20 right-8",
                  4: "bottom-6 left-1/2 -translate-x-1/2",
                }

                return (
                  <button
                    key={a.title}
                    onClick={() => setActive(idx)}
                    className={`
                      absolute ${positions[idx]}
                      text-sm font-mono flex items-center gap-2
                      px-3 py-1 rounded-full
                      border border-white/10
                      backdrop-blur-md
                      transition-all duration-300
                      ${isActive ? `scale-105 ${styles.glow} ${styles.text}` : "text-gray-400 hover:text-white hover:scale-105"}
                    `}
                  >
                    <span className={isActive ? "animate-pulse" : ""}>{a.icon}</span>
                    {a.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500 font-mono">
          Cada arquitectura se aplica según necesidad: eficiencia, rendimiento, paralelismo o escalabilidad.
        </div>
      </div>
    </div>
  )
}
// ============================================
// CONCLUSION SLIDE
// ============================================
export function ConclusionSlideContent() {
  return (
    <div className="h-full flex items-center justify-center text-center relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-8 max-w-3xl">
        <div className="fragment fade-up">
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 gradient-animate">
              Conclusion
            </span>
          </h2>
        </div>

        <div className="fragment fade-up">
          <p className="text-xl text-gray-300 leading-relaxed">
            La eleccion de la arquitectura depende del <span className="text-cyan-400 font-semibold">proposito</span> 
            {" "}y los <span className="text-purple-400 font-semibold">requisitos de rendimiento</span> del sistema.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-12 fragment fade-up">
          <div className="glass-card p-6 rounded-2xl floating-card">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-white font-bold">Proposito</h4>
            <p className="text-xs text-gray-400 mt-2">Define la arquitectura</p>
          </div>
          <div className="glass-card p-6 rounded-2xl floating-card" style={{ animationDelay: '-2s' }}>
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="text-white font-bold">Rendimiento</h4>
            <p className="text-xs text-gray-400 mt-2">Guia la organizacion</p>
          </div>
          <div className="glass-card p-6 rounded-2xl floating-card" style={{ animationDelay: '-4s' }}>
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="text-white font-bold">Evolucion</h4>
            <p className="text-xs text-gray-400 mt-2">Constante mejora</p>
          </div>
        </div>

        <div className="fragment zoom-in mt-12">
          <p className="text-2xl font-bold text-white">
            Gracias por su atencion
          </p>
          <p className="text-gray-500 font-mono text-sm mt-4">Los Ingenieros - 2026</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  )
}
