"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import {
  Usb,
  Cable,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Smartphone,
  HardDrive,
  Printer,
  Mouse,
  Keyboard,
  ChevronRight,
  ArrowRight,
  ArrowLeftRight,
  Layers,
  Network,
  Activity,
  Gauge,
  Info,
  Check,
  X,
  Battery,
  BatteryCharging,
  PlugZap,
  Server,
} from "lucide-react"

// ============================================
// SLIDE 1: TITLE - BUSES Y PUERTOS DE COMUNICACION
// ============================================
export function USBTitleSlideContent() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Animated USB connection lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="usb-line absolute"
            style={{
              width: "2px",
              height: Math.random() * 200 + 100 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `linear-gradient(180deg, transparent, ${
                Math.random() > 0.5 ? "#06b6d4" : "#f59e0b"
              }, transparent)`,
              animation: `usb-flow ${Math.random() * 4 + 3}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.4,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `rgba(6, 182, 212, ${Math.random() * 0.5 + 0.2})`,
              animation: `particle-float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-8">
        {/* USB Logo animation */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400/50 flex items-center justify-center usb-pulse-ring">
              <Usb className="h-12 w-12 text-cyan-400" />
            </div>
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 gradient-animate">
              BUSES Y PUERTOS
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 mt-2">
              DE COMUNICACION
            </span>
            <span className="block text-white/80 text-3xl md:text-4xl font-light mt-4 tracking-wide">
              Universal Serial Bus (USB)
            </span>
          </h1>
        </div>

        {/* Floating device icons */}
        <div className="flex justify-center gap-6 mt-10">
          {[
            { icon: Monitor, label: "Host", color: "cyan" },
            { icon: Cable, label: "Hub", color: "teal" },
            { icon: HardDrive, label: "Storage", color: "amber" },
            { icon: Smartphone, label: "Mobile", color: "emerald" },
          ].map(({ icon: Icon, label, color }, i) => (
            <div key={label} className="floating-icon" style={{ animationDelay: `${i * 0.3}s` }}>
              <div
                className="p-4 rounded-2xl backdrop-blur-xl border transition-transform duration-300 hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05))`,
                  borderColor: `rgba(6, 182, 212, 0.3)`,
                }}
              >
                <Icon className="h-7 w-7 text-cyan-400" />
                <span className="block text-xs mt-2 text-white/60 font-mono">{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Team name */}
        <div className="mt-14">
          <p className="text-lg text-white/40 font-light">Presentado por</p>
          <h2 className="text-3xl font-bold text-white mt-2">
            <span className="neon-text text-cyan-400">Los Ingenieros</span>
          </h2>
        </div>
      </div>

      <style jsx>{`
        @keyframes usb-flow {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes particle-float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
          }
        }
        .floating-icon {
          animation: icon-float 4s ease-in-out infinite;
        }
        .floating-icon:nth-child(2) {
          animation-delay: -1s;
        }
        .floating-icon:nth-child(3) {
          animation-delay: -2s;
        }
        .floating-icon:nth-child(4) {
          animation-delay: -3s;
        }
        @keyframes icon-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .usb-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
        @keyframes pulse-ring {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4);
          }
          50% {
            box-shadow: 0 0 30px 10px rgba(6, 182, 212, 0.1);
          }
        }
      `}</style>
    </div>
  )
}

// ============================================
// SLIDE 2: INTRODUCCION AL USB - Christopher Marrero
// ============================================
export function USBIntroSlideContent() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(-1)
  const [plugAnimState, setPlugAnimState] = useState<"idle" | "connecting" | "connected">("idle")

  const features = [
    {
      title: "Plug and Play",
      desc: "Conecta y usa sin necesidad de reiniciar el sistema ni instalar controladores manualmente.",
      icon: PlugZap,
      stat: "0s",
      statLabel: "Config. manual",
    },
    {
      title: "Conexion Universal",
      desc: "Un solo estandar para conectar teclados, ratones, memorias, impresoras, smartphones y mas.",
      icon: Cable,
      stat: "127",
      statLabel: "Dispositivos max",
    },
    {
      title: "Reemplazo Legacy",
      desc: "USB reemplazo los puertos serial (RS-232), paralelo (LPT) y PS/2, simplificando el hardware.",
      icon: ArrowRight,
      stat: "1",
      statLabel: "Puerto unico",
    },
    {
      title: "Alimentacion USB",
      desc: "Provee energia a dispositivos conectados, eliminando la necesidad de fuentes externas para muchos perifericos.",
      icon: Zap,
      stat: "240W",
      statLabel: "USB-C PD max",
    },
  ]

  const timeline = [
    { year: "1996", event: "USB 1.0", speed: "1.5 Mbps", detail: "Lanzamiento inicial. Low Speed para teclados y ratones.", color: "#6b7280" },
    { year: "1998", event: "USB 1.1", speed: "12 Mbps", detail: "Correccion de errores. Full Speed para audio e impresoras.", color: "#9ca3af" },
    { year: "2000", event: "USB 2.0", speed: "480 Mbps", detail: "Hi-Speed. Revoluciono el almacenamiento portatil y camaras.", color: "#06b6d4" },
    { year: "2008", event: "USB 3.0", speed: "5 Gbps", detail: "SuperSpeed. Conector azul distintivo. Transferencia 10x mas rapida.", color: "#14b8a6" },
    { year: "2014", event: "USB-C", speed: "10 Gbps", detail: "Conector reversible universal. Soporte para video y carga rapida.", color: "#f59e0b" },
    { year: "2019", event: "USB4", speed: "40 Gbps", detail: "Basado en Thunderbolt 3. Tunelizacion de protocolos multiples.", color: "#10b981" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [features.length])

  const handlePlugClick = () => {
    if (plugAnimState !== "idle") return
    setPlugAnimState("connecting")
    setTimeout(() => setPlugAnimState("connected"), 800)
    setTimeout(() => setPlugAnimState("idle"), 3000)
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-3">
        <span className="text-cyan-400 font-mono text-sm tracking-widest">01 // INTRODUCCION AL USB</span>
        <h2 className="text-3xl font-bold text-white mt-1">Universal Serial Bus</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Christopher Marrero - 25-1437</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {/* Origin card with interactive plug animation */}
          <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20 relative overflow-hidden">
            <h3 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2 text-sm">
              <Info className="h-4 w-4" />
              Origen del USB
            </h3>
            <p className="text-gray-300 text-xs leading-relaxed mb-3">
              Creado en <span className="text-cyan-400 font-bold">1996</span> por un consorcio liderado por Intel, Compaq, Microsoft y NEC
              para estandarizar la conexion de perifericos.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {["Intel", "Compaq", "Microsoft", "NEC", "IBM", "DEC", "Nortel"].map((company) => (
                <span
                  key={company}
                  className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono"
                >
                  {company}
                </span>
              ))}
            </div>

            {/* Interactive Plug & Play Sim */}
            <div
              className="relative h-14 bg-black/40 rounded-lg border border-white/5 cursor-pointer group flex items-center overflow-hidden"
              onClick={handlePlugClick}
            >
              {/* USB Port */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-7 border-2 border-gray-500 rounded-sm bg-gray-900 flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-gray-600 rounded-sm" />
                  <div className="w-1 h-3 bg-gray-600 rounded-sm" />
                </div>
                {plugAnimState === "connected" && (
                  <div className="absolute inset-0 rounded-sm border-2 border-cyan-400/60 animate-pulse" />
                )}
              </div>

              {/* USB Plug */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center transition-all duration-700 ease-out"
                style={{
                  left: plugAnimState === "idle" ? "8px" : plugAnimState === "connecting" ? "calc(100% - 80px)" : "calc(100% - 72px)",
                }}
              >
                <div className="w-8 h-5 bg-gray-400 rounded-sm border border-gray-300 flex items-center justify-center">
                  <Usb className="h-3 w-3 text-gray-700" />
                </div>
                <div className="w-3 h-3 bg-gray-500 rounded-r-sm" />
              </div>

              {/* Status text */}
              <div className="absolute left-3 bottom-1 text-[9px] font-mono text-gray-500">
                {plugAnimState === "idle" && "Clic para conectar"}
                {plugAnimState === "connecting" && "Conectando..."}
                {plugAnimState === "connected" && (
                  <span className="text-cyan-400 flex items-center gap-1">
                    <Check className="h-2.5 w-2.5" /> Dispositivo detectado - Plug & Play
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex-1">
            <h3 className="text-amber-400 font-semibold mb-3 text-sm">Evolucion del USB</h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-gray-600 via-cyan-600 to-emerald-500 opacity-40" />

              <div className="space-y-2">
                {timeline.map(({ year, event, speed, detail, color }, i) => (
                  <div
                    key={year}
                    className={`flex items-start gap-3 cursor-pointer group rounded-lg p-1.5 transition-all duration-300 ${
                      activeTimelineIdx === i ? "bg-white/5" : "hover:bg-white/[0.03]"
                    }`}
                    onClick={() => setActiveTimelineIdx(activeTimelineIdx === i ? -1 : i)}
                  >
                    <div className="relative z-10 flex flex-col items-center pt-0.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
                        style={{
                          borderColor: color,
                          background: activeTimelineIdx === i ? color : "transparent",
                          boxShadow: activeTimelineIdx === i ? `0 0 8px ${color}60` : "none",
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold" style={{ color }}>{year}</span>
                        <span className="text-xs font-semibold text-white/80">{event}</span>
                        <span className="text-[10px] font-mono text-gray-500 ml-auto">{speed}</span>
                      </div>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: activeTimelineIdx === i ? "50px" : "0px", opacity: activeTimelineIdx === i ? 1 : 0 }}
                      >
                        <p className="text-[10px] text-gray-400 leading-relaxed mt-1">{detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* Feature Cards - Interactive Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {features.map(({ title, desc, icon: Icon, stat, statLabel }, i) => (
              <div
                key={title}
                onClick={() => setActiveFeature(i)}
                className={`bg-white/5 rounded-xl p-3.5 border cursor-pointer transition-all duration-300 group ${
                  i === activeFeature
                    ? "border-cyan-500/40 bg-cyan-500/5 scale-[1.02] shadow-lg shadow-cyan-500/5"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`p-1.5 rounded-lg transition-colors duration-300 ${
                      i === activeFeature ? "bg-cyan-500/20" : "bg-white/5"
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-colors duration-300 ${i === activeFeature ? "text-cyan-400" : "text-gray-400"}`} />
                  </div>
                  <h4 className={`text-xs font-semibold transition-colors duration-300 ${i === activeFeature ? "text-white" : "text-gray-400"}`}>
                    {title}
                  </h4>
                </div>
                <div className="mb-2">
                  <span className={`text-xl font-black font-mono transition-colors duration-300 ${i === activeFeature ? "text-cyan-400" : "text-gray-600"}`}>
                    {stat}
                  </span>
                  <span className="block text-[9px] text-gray-500 font-mono">{statLabel}</span>
                </div>
                <p
                  className="text-[10px] text-gray-500 leading-relaxed overflow-hidden transition-all duration-300"
                  style={{ maxHeight: i === activeFeature ? "80px" : "0px", opacity: i === activeFeature ? 1 : 0 }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Devices with animated connection status */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex-1">
            <h3 className="text-teal-400 font-semibold mb-2 text-sm">Dispositivos Comunes</h3>
            <div className="space-y-1.5">
              {[
                { icon: Keyboard, label: "Teclado", type: "HID", speed: "Low Speed" },
                { icon: Mouse, label: "Raton", type: "HID", speed: "Low Speed" },
                { icon: HardDrive, label: "Almacenamiento", type: "Mass Storage", speed: "Hi-Speed" },
                { icon: Printer, label: "Impresora", type: "Printer Class", speed: "Full Speed" },
                { icon: Smartphone, label: "Smartphone", type: "MTP/PTP", speed: "SuperSpeed" },
                { icon: Usb, label: "Memoria Flash", type: "Mass Storage", speed: "SuperSpeed" },
              ].map(({ icon: Icon, label, type, speed }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-2 rounded-lg bg-black/30 border border-white/5 group hover:border-teal-500/20 transition-all duration-200"
                >
                  <div className="p-1.5 rounded-md bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors">
                    <Icon className="h-3.5 w-3.5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-gray-200 font-medium">{label}</span>
                    <span className="block text-[9px] text-gray-500 font-mono">{type}</span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-600 px-1.5 py-0.5 rounded bg-white/5">{speed}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 3: ARQUITECTURA BASICA DEL USB - Christopher Marrero
// ============================================
export function USBArchitectureSlideContent() {
  const [activeElement, setActiveElement] = useState<"host" | "hub" | "device" | null>(null)
  const [packets, setPackets] = useState<Array<{ id: number; path: number; progress: number }>>([])
  const [packetCounter, setPacketCounter] = useState(0)
  const [autoSend, setAutoSend] = useState(false)
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Define paths for packets: each path is a list of waypoints {x,y}
  const paths = [
    [{ x: 95, y: 120 }, { x: 200, y: 70 }, { x: 335, y: 45 }],    // host -> hub1 -> teclado
    [{ x: 95, y: 120 }, { x: 200, y: 70 }, { x: 335, y: 95 }],    // host -> hub1 -> webcam
    [{ x: 95, y: 120 }, { x: 200, y: 190 }, { x: 335, y: 155 }],  // host -> hub2 -> disco
    [{ x: 95, y: 120 }, { x: 200, y: 190 }, { x: 335, y: 205 }],  // host -> hub2 -> impresora
    [{ x: 95, y: 120 }, { x: 200, y: 190 }, { x: 335, y: 255 }],  // host -> hub2 -> memoria
  ]

  const sendSinglePacket = useCallback(() => {
    setPacketCounter((c) => {
      const id = c + 1
      const path = Math.floor(Math.random() * paths.length)
      setPackets((prev) => [...prev, { id, path, progress: 0 }])
      return id
    })
  }, [paths.length])

  useEffect(() => {
    const frame = setInterval(() => {
      setPackets((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + 0.02 }))
          .filter((p) => p.progress <= 1)
      )
    }, 30)
    return () => clearInterval(frame)
  }, [])

  useEffect(() => {
    if (autoSend) {
      animRef.current = setInterval(() => sendSinglePacket(), 700)
    } else {
      if (animRef.current) clearInterval(animRef.current)
    }
    return () => { if (animRef.current) clearInterval(animRef.current) }
  }, [autoSend, sendSinglePacket])

  const getPacketPosition = (pathIdx: number, progress: number) => {
    const waypoints = paths[pathIdx]
    const totalSegments = waypoints.length - 1
    const segProgress = progress * totalSegments
    const segIdx = Math.min(Math.floor(segProgress), totalSegments - 1)
    const t = segProgress - segIdx
    const from = waypoints[segIdx]
    const to = waypoints[segIdx + 1]
    return {
      x: from.x + (to.x - from.x) * t,
      y: from.y + (to.y - from.y) * t,
    }
  }

  const elements = {
    host: {
      title: "Host (Controlador)",
      desc: "Computador que controla toda la comunicacion USB. Solo hay un host por bus.",
      details: [
        "Inicia todas las transferencias",
        "Gestiona ancho de banda",
        "Detecta conexion/desconexion",
        "Asigna direcciones (0-127)",
      ],
      color: "#06b6d4",
      icon: Monitor,
    },
    hub: {
      title: "Hub (Concentrador)",
      desc: "Expande la cantidad de puertos USB disponibles mediante topologia en arbol.",
      details: [
        "Maximo 5 niveles en cascada",
        "Hub raiz integrado en el host",
        "Puede ser auto o bus-powered",
        "Detecta dispositivos nuevos",
      ],
      color: "#14b8a6",
      icon: Network,
    },
    device: {
      title: "Dispositivo (Periferico)",
      desc: "Cualquier periferico conectado al bus con endpoints para comunicacion.",
      details: [
        "Endpoint 0 para control",
        "Hasta 32 endpoints por dispositivo",
        "Clase define el protocolo",
        "Cada uno tiene direccion unica",
      ],
      color: "#f59e0b",
      icon: Usb,
    },
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-3">
        <span className="text-cyan-400 font-mono text-sm tracking-widest">02 // ARQUITECTURA</span>
        <h2 className="text-3xl font-bold text-white mt-1">Arquitectura Basica del USB</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Christopher Marrero - 25-1437</p>
      </div>

      <div className="flex-1 grid grid-cols-5 gap-4">
        {/* LEFT - Description Panel (now richer) */}
        <div className="col-span-2 flex flex-col gap-3">
          {/* Topology Overview Card */}
          <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
              <Network className="h-4 w-4" />
              Topologia en Estrella Escalonada
            </h3>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              El USB utiliza una topologia de <span className="text-cyan-400 font-semibold">estrella escalonada</span> (tiered star). 
              El host raiz se conecta a hubs que distribuyen la conexion a multiples dispositivos formando un arbol jerarquico de 
              hasta <span className="text-amber-400 font-semibold">7 niveles</span> de profundidad.
            </p>
          </div>

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
              <span className="text-lg font-black font-mono text-cyan-400">127</span>
              <span className="block text-[9px] text-gray-500 font-mono">Dispositivos max</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
              <span className="text-lg font-black font-mono text-teal-400">5m</span>
              <span className="block text-[9px] text-gray-500 font-mono">Cable max/segmento</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
              <span className="text-lg font-black font-mono text-amber-400">7</span>
              <span className="block text-[9px] text-gray-500 font-mono">Niveles (tiers)</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
              <span className="text-lg font-black font-mono text-emerald-400">1</span>
              <span className="block text-[9px] text-gray-500 font-mono">Host controlador</span>
            </div>
          </div>

          {/* Interactive element details */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex-1 flex flex-col">
            <h4 className="text-xs font-semibold text-gray-400 mb-2">Elementos del Sistema</h4>
            <div className="space-y-1.5 flex-1">
              {(Object.entries(elements) as [keyof typeof elements, (typeof elements)[keyof typeof elements]][]).map(([key, el]) => {
                const isActive = activeElement === key
                const ElIcon = el.icon
                return (
                  <div
                    key={key}
                    onClick={() => setActiveElement(isActive ? null : key)}
                    className={`rounded-lg p-2.5 border cursor-pointer transition-all duration-300 ${
                      isActive ? "bg-white/5 border-white/15" : "bg-black/20 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: el.color, boxShadow: isActive ? `0 0 8px ${el.color}50` : "none" }} />
                      <ElIcon className="h-3.5 w-3.5" style={{ color: el.color }} />
                      <span className={`text-xs font-semibold ${isActive ? "text-white" : "text-gray-400"}`}>{el.title}</span>
                      <ChevronRight
                        className={`h-3 w-3 ml-auto transition-transform duration-200 ${isActive ? "rotate-90 text-gray-300" : "text-gray-600"}`}
                      />
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isActive ? "120px" : "0px", opacity: isActive ? 1 : 0 }}
                    >
                      <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">{el.desc}</p>
                      <div className="mt-2 space-y-1">
                        {el.details.map((d) => (
                          <div key={d} className="flex items-center gap-1.5">
                            <Check className="h-2.5 w-2.5 flex-shrink-0" style={{ color: el.color }} />
                            <span className="text-[9px] text-gray-500">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT - Interactive Topology Diagram */}
        <div className="col-span-3 relative bg-white/5 rounded-xl border border-white/10 p-4 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-400">Diagrama Interactivo</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoSend(!autoSend)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1.5 transition-all ${
                  autoSend
                    ? "bg-cyan-500/30 border border-cyan-500/50 text-cyan-300"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-gray-300"
                }`}
              >
                {autoSend ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
                {autoSend ? "Pausar" : "Auto"}
              </button>
              <button
                onClick={sendSinglePacket}
                className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-semibold hover:bg-cyan-500/30 transition-colors flex items-center gap-1.5"
              >
                <Zap className="h-2.5 w-2.5" /> Enviar
              </button>
            </div>
          </div>

          <svg viewBox="0 0 440 290" className="w-full flex-1">
            <defs>
              <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-teal" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Connection lines - Host to Hubs */}
            <path d="M 130 120 C 165 120, 165 70, 200 70" stroke="url(#line-grad-1)" strokeWidth="2" fill="none" />
            <path d="M 130 120 C 165 120, 165 190, 200 190" stroke="url(#line-grad-1)" strokeWidth="2" fill="none" />

            {/* Hub1 to devices */}
            <path d="M 260 70 C 295 70, 295 45, 330 45" stroke="url(#line-grad-2)" strokeWidth="1.5" fill="none" />
            <path d="M 260 70 C 295 70, 295 95, 330 95" stroke="url(#line-grad-2)" strokeWidth="1.5" fill="none" />

            {/* Hub2 to devices */}
            <path d="M 260 190 C 295 190, 295 155, 330 155" stroke="url(#line-grad-2)" strokeWidth="1.5" fill="none" />
            <path d="M 260 190 C 295 190, 295 205, 330 205" stroke="url(#line-grad-2)" strokeWidth="1.5" fill="none" />
            <path d="M 260 190 C 295 190, 295 255, 330 255" stroke="url(#line-grad-2)" strokeWidth="1.5" fill="none" />

            {/* Animated packets */}
            {packets.map((pkt) => {
              const pos = getPacketPosition(pkt.path, pkt.progress)
              return (
                <g key={pkt.id}>
                  <circle cx={pos.x} cy={pos.y} r="4" fill="#06b6d4" filter="url(#glow-cyan)" opacity={0.9}>
                    <animate attributeName="r" values="3;5;3" dur="0.6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={pos.x} cy={pos.y} r="8" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3">
                    <animate attributeName="r" values="6;12;6" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                </g>
              )
            })}

            {/* HOST */}
            <g onClick={() => setActiveElement("host")} className="cursor-pointer">
              <rect x="35" y="85" width="120" height="70" rx="10"
                fill={activeElement === "host" ? "#06b6d415" : "#0d1117"}
                stroke="#06b6d4"
                strokeWidth={activeElement === "host" ? 2.5 : 1.5}
              />
              {activeElement === "host" && (
                <rect x="35" y="85" width="120" height="70" rx="10" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </rect>
              )}
              <foreignObject x="35" y="85" width="120" height="70">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Monitor style={{ width: 18, height: 18, color: "#06b6d4" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#06b6d4", marginTop: 4 }}>HOST</span>
                  <span style={{ fontSize: 7, color: "#94a3b8" }}>Controlador</span>
                </div>
              </foreignObject>
            </g>

            {/* HUB 1 */}
            <g onClick={() => setActiveElement("hub")} className="cursor-pointer">
              <rect x="190" y="42" width="80" height="56" rx="8"
                fill={activeElement === "hub" ? "#14b8a615" : "#0d1117"}
                stroke="#14b8a6"
                strokeWidth={activeElement === "hub" ? 2.5 : 1.5}
              />
              <foreignObject x="190" y="42" width="80" height="56">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Network style={{ width: 14, height: 14, color: "#14b8a6" }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#14b8a6", marginTop: 2 }}>HUB 1</span>
                  <span style={{ fontSize: 7, color: "#94a3b8" }}>4 puertos</span>
                </div>
              </foreignObject>
            </g>

            {/* HUB 2 */}
            <g onClick={() => setActiveElement("hub")} className="cursor-pointer">
              <rect x="190" y="162" width="80" height="56" rx="8"
                fill={activeElement === "hub" ? "#14b8a615" : "#0d1117"}
                stroke="#14b8a6"
                strokeWidth={activeElement === "hub" ? 2.5 : 1.5}
              />
              <foreignObject x="190" y="162" width="80" height="56">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Network style={{ width: 14, height: 14, color: "#14b8a6" }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#14b8a6", marginTop: 2 }}>HUB 2</span>
                  <span style={{ fontSize: 7, color: "#94a3b8" }}>4 puertos</span>
                </div>
              </foreignObject>
            </g>

            {/* Devices */}
            {[
              { x: 325, y: 25, label: "Teclado", icon: "kbd", addr: "Addr: 2" },
              { x: 325, y: 75, label: "Webcam", icon: "cam", addr: "Addr: 3" },
              { x: 325, y: 135, label: "Disco SSD", icon: "hdd", addr: "Addr: 4" },
              { x: 325, y: 185, label: "Impresora", icon: "prt", addr: "Addr: 5" },
              { x: 325, y: 235, label: "Memoria", icon: "usb", addr: "Addr: 6" },
            ].map(({ x, y, label, addr }) => (
              <g key={label} onClick={() => setActiveElement("device")} className="cursor-pointer">
                <rect x={x} y={y} width="100" height="40" rx="6"
                  fill={activeElement === "device" ? "#f59e0b15" : "#0d1117"}
                  stroke="#f59e0b"
                  strokeWidth={activeElement === "device" ? 2 : 1}
                />
                <text x={x + 50} y={y + 18} textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">{label}</text>
                <text x={x + 50} y={y + 32} textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">{addr}</text>
              </g>
            ))}

            {/* Layer labels */}
            <text x="95" y="170" textAnchor="middle" fill="#06b6d4" fontSize="7" opacity="0.5" fontFamily="monospace">Tier 0</text>
            <text x="230" y="235" textAnchor="middle" fill="#14b8a6" fontSize="7" opacity="0.5" fontFamily="monospace">Tier 1</text>
            <text x="375" y="280" textAnchor="middle" fill="#f59e0b" fontSize="7" opacity="0.5" fontFamily="monospace">Tier 2</text>
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-1">
            {[
              { color: "#06b6d4", label: "Host" },
              { color: "#14b8a6", label: "Hub" },
              { color: "#f59e0b", label: "Device" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span className="text-[9px] text-gray-500 font-mono">{label}</span>
              </div>
            ))}
            <span className="text-[9px] text-gray-600 ml-2">
              Paquetes: {packets.length} activos
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 4: BUS DE COMUNICACION - CORRECCIÓN (solo esta función)
// ============================================
export function USBBusConceptSlideContent() {
  const [isRunning, setIsRunning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [packets, setPackets] = useState<
    Array<{
      id: number;
      lane: number;
      x: number;
      speed: number;
      color: string;
      size: number;
    }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenId = useRef(0);
  const lastTimestamp = useRef<number | null>(null);

  const busLanes = [
    { id: 0, label: "Bus de Datos", color: "#06b6d4", y: 80, speed: 180 },
    { id: 1, label: "Bus de Direcciones", color: "#14b8a6", y: 160, speed: 140 },
    { id: 2, label: "Bus de Control", color: "#f59e0b", y: 240, speed: 110 },
    { id: 3, label: "Bus Multiplexado", color: "#10b981", y: 320, speed: 160 },
  ];

  const resetSimulation = () => {
    setPackets([]);
    setProgress(0);
    lastTimestamp.current = null;
  };

  useEffect(() => {
    if (!isRunning) {
      lastTimestamp.current = null; // Reset timestamp para que no salte al reanudar
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimestamp.current) lastTimestamp.current = timestamp;
      const dt = (timestamp - lastTimestamp.current) / 1000;
      lastTimestamp.current = timestamp;

      setPackets((prev) =>
        prev
          .map((p) => ({ ...p, x: p.x + p.speed * dt }))
          .filter((p) => p.x < 95) // Desaparecen al llegar al controlador (95%)
      );

      if (Math.random() < 0.1) {
        const laneIndex = Math.floor(Math.random() * busLanes.length);
        const lane = busLanes[laneIndex];
        setPackets((prev) => [...prev, {
          id: tokenId.current++,
          lane: laneIndex,
          x: -5,
          speed: lane.speed + (Math.random() * 40 - 20),
          color: lane.color,
          size: 6 + Math.random() * 4,
        }]);
      }

      setProgress((p) => (p < 100 ? p + dt * 5 : 0));
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isRunning]);

  return (
    <div className="h-full flex flex-col p-8 bg-[#020617] text-white font-sans">
      <div className="mb-8 text-center">
        <span className="text-cyan-400 font-mono text-sm tracking-widest">03 // SISTEMA DE BUSES</span>
        <h2 className="text-3xl font-bold text-white mt-1">Visualización de flujo de datos en tiempo real</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Enmanuel Santos Diaz - 25-1544</p>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6">
        <div className="col-span-9 bg-slate-900/40 rounded-3xl border border-white/5 relative overflow-hidden p-6 shadow-inner" ref={containerRef}>
          
          {/* Iconos de Entrada/Salida */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-30">
            <Monitor className="text-cyan-500 w-10 h-10" />
          </div>

          <svg viewBox="0 0 1000 420" className="w-full h-full">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Carriles */}
            {busLanes.map((lane) => (
              <g key={lane.id}>
                <rect x="80" y={lane.y - 20} width="720" height="40" rx="20" fill="rgba(255,255,255,0.02)" />
                <text x="100" y={lane.y - 8} fill={lane.color} fontSize="11" fontWeight="700" fontFamily="monospace" opacity="0.6">
                  {lane.label.toUpperCase()}
                </text>
                <line x1="80" y1={lane.y} x2="800" y2={lane.y} stroke={lane.color} strokeWidth="1" opacity="0.1" />
              </g>
            ))}

            {/* Paquetes */}
            {packets.map((p) => (
              <circle
                key={p.id}
                cx={80 + (p.x / 100) * 720}
                cy={busLanes[p.lane].y}
                r={p.size}
                fill={p.color}
                filter="url(#glow)"
                opacity={p.x < 0 ? 0 : 1}
              />
            ))}

            {/* CONTROLADOR HOST USB (Posicionado más al centro) */}
            <g transform="translate(820, 40)">
              <rect x="0" y="0" width="120" height="320" rx="20" fill="#0b1220" stroke="#06b6d4" strokeWidth="2" filter="url(#glow)" />
              <rect x="10" y="10" width="100" height="300" rx="12" fill="rgba(6, 182, 212, 0.05)" />
              <text x="60" y="150" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="900" fontFamily="sans-serif">HOST USB</text>
              <text x="60" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">CONTROLADOR</text>
              <Activity className="text-cyan-500/30" x="45" y="190" width="30" height="30" />
            </g>
          </svg>
        </div>

        {/* Panel Lateral */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-slate-900/60 rounded-3xl border border-white/10 p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4">Estado del Bus</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Actividad</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-1 h-4 bg-cyan-500 ${isRunning ? 'animate-pulse' : ''}`} style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Sincronía</span>
                  <Check className="text-emerald-500 w-4 h-4" />
                </div>
                <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
                  {busLanes.map((lane) => (
                    <div key={lane.id} className="flex justify-between items-center text-[10px] font-mono">
                      <span style={{ color: lane.color }}>{lane.label}</span>
                      <span>{packets.filter(p => p.lane === lane.id).length} PKTS</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-[10px] font-mono mb-2">
                <span className="text-slate-500">TRANSFERENCIA</span>
                <span className="text-cyan-400">{Math.floor(progress)}%</span>
              </div>
              <div className="h-8 w-full bg-black rounded-xl border border-white/10 p-1 relative overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-lg transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button onClick={() => setIsRunning(!isRunning)} className={`w-full py-3 rounded-xl border font-bold text-xs transition-all ${isRunning ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-cyan-500 border-cyan-400 text-black hover:bg-cyan-400'}`}>
                {isRunning ? "PAUSAR SISTEMA" : "REANUDAR FLUJO"}
              </button>
              <button onClick={resetSimulation} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white transition-all">
                REINICIAR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-cyan-500/5 rounded-3xl border border-cyan-500/10">
        <p className="text-sm text-slate-400 leading-relaxed">
          <strong className="text-cyan-400">Teoría:</strong> El bus no es un solo cable, sino un conjunto de líneas (carriles) que trabajan en paralelo. Mientras el <span className="text-white">Bus de Datos</span> mueve la información, el de <span className="text-white">Direcciones</span> gestiona el destino y el de <span className="text-white">Control</span> asegura que todo llegue a tiempo.
        </p>
      </div>
    </div>
  );
}
// ============================================
// SLIDE 5: DEFINICION FISICA Y LOGICA - Enmanuel Santos
// ============================================
import React, { useEffect, useRef, useState } from "react";

/**
 * USBPhysicalLogicalSlideContent - VERSIÓN COMPLETA CORREGIDA
 * - Recupera: Host Controller animado, Osciloscopio, Log detallado y Galería.
 * - Corrige: Desbordamiento mediante scroll interno y layout flex-grid.
 * - Mantiene: Animaciones automáticas y narración pin-a-pin.
 */

type PinInfo = {
  id: number;
  label: string;
  x: number;
  y: number;
  color: string;
  desc: string;
};

type Packet = {
  id: number;
  label: string;
  progress: number;
  lane: number;
  color: string;
};

const USB_C_PINS: PinInfo[] = [
  { id: 1, label: "GND", x: 12, y: 10, color: "#ef4444", desc: "Tierra. Referencia de voltaje del sistema." },
  { id: 2, label: "TX1+", x: 32, y: 10, color: "#3b82f6", desc: "TX1+: transmisión SuperSpeed +." },
  { id: 3, label: "TX1-", x: 52, y: 10, color: "#3b82f6", desc: "TX1-: transmisión SuperSpeed -." },
  { id: 4, label: "VBUS", x: 72, y: 10, color: "#ef4444", desc: "VBUS +5V: alimentación del dispositivo." },
  { id: 5, label: "CC1", x: 92, y: 10, color: "#f59e0b", desc: "CC1: canal de configuración/negociación." },
  { id: 6, label: "D-", x: 112, y: 10, color: "#10b981", desc: "D-: línea diferencial USB2.0 -" },
  { id: 7, label: "D+", x: 132, y: 10, color: "#10b981", desc: "D+: línea diferencial USB2.0 +" },
  { id: 8, label: "SBU1", x: 152, y: 10, color: "#f59e0b", desc: "SBU1: canal secundario (alt. modes)." },
  { id: 9, label: "RX2-", x: 172, y: 10, color: "#3b82f6", desc: "RX2-: recepción SuperSpeed -" },
  { id: 10, label: "RX2+", x: 192, y: 10, color: "#3b82f6", desc: "RX2+: recepción SuperSpeed +" },
  { id: 11, label: "GND", x: 212, y: 10, color: "#ef4444", desc: "GND (fila superior)." },
  { id: 12, label: "VBUS", x: 232, y: 10, color: "#ef4444", desc: "VBUS (fila superior)." },
  { id: 13, label: "VBUS", x: 232, y: 44, color: "#ef4444", desc: "VBUS (fila inferior)." },
  { id: 14, label: "RX1+", x: 212, y: 44, color: "#3b82f6", desc: "RX1+: recepción SuperSpeed (inf)." },
  { id: 15, label: "RX1-", x: 192, y: 44, color: "#3b82f6", desc: "RX1-: recepción SuperSpeed (inf)." },
  { id: 16, label: "SBU2", x: 172, y: 44, color: "#f59e0b", desc: "SBU2: canal secundario 2." },
  { id: 17, label: "D+", x: 152, y: 44, color: "#10b981", desc: "D+ (fila inferior)." },
  { id: 18, label: "D-", x: 132, y: 44, color: "#10b981", desc: "D- (fila inferior)." },
  { id: 19, label: "CC2", x: 112, y: 44, color: "#f59e0b", desc: "CC2: canal de configuración secundario." },
  { id: 20, label: "VBUS", x: 92, y: 44, color: "#ef4444", desc: "VBUS (fila inferior central)." },
  { id: 21, label: "TX2-", x: 72, y: 44, color: "#3b82f6", desc: "TX2-: transmisión SuperSpeed (inf)." },
  { id: 22, label: "TX2+", x: 52, y: 44, color: "#3b82f6", desc: "TX2+: transmisión SuperSpeed (inf)." },
  { id: 23, label: "GND", x: 32, y: 44, color: "#ef4444", desc: "GND (fila inferior izquierda)." },
  { id: 24, label: "GND", x: 12, y: 44, color: "#ef4444", desc: "GND (fila inferior extremo)." },
];

const USB_A_PINS: PinInfo[] = [
  { id: 1, label: "VBUS", x: 24, y: 22, color: "#ef4444", desc: "VBUS +5V: alimentación en USB‑A." },
  { id: 2, label: "D-", x: 66, y: 22, color: "#10b981", desc: "D-: línea diferencial de datos." },
  { id: 3, label: "D+", x: 108, y: 22, color: "#10b981", desc: "D+: línea diferencial de datos." },
  { id: 4, label: "GND", x: 150, y: 22, color: "#64748b", desc: "GND: referencia de tierra." },
];

export function USBPhysicalLogicalSlideContent(): JSX.Element {
  const [view, setView] = useState<"physical" | "logical">("physical");
  const [cProgress, setCProgress] = useState<Record<number, number>>({});
  const [aProgress, setAProgress] = useState<Record<number, number>>({});
  const [activeCPin, setActiveCPin] = useState<number | null>(null);
  const [activeAPin, setActiveAPin] = useState<number | null>(null);
  const [narrationText, setNarrationText] = useState<string>("");
  const [timelineIdx, setTimelineIdx] = useState(0);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [totalPackets, setTotalPackets] = useState(0);
  const nextPacketId = useRef(0);

  // Animación de entrada de pines
  useEffect(() => {
    if (view !== "physical") return;
    const startTs = performance.now();
    const step = (ts: number) => {
      const elapsed = ts - startTs;
      const newC: Record<number, number> = {};
      USB_C_PINS.forEach((pin, idx) => {
        newC[pin.id] = Math.max(0, Math.min(1, (elapsed - idx * 100) / 400));
      });
      setCProgress(newC);
      const newA: Record<number, number> = {};
      USB_A_PINS.forEach((pin, idx) => {
        newA[pin.id] = Math.max(0, Math.min(1, (elapsed - (800 + idx * 120)) / 400));
      });
      setAProgress(newA);
      requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [view]);

  // Narración automática pin-a-pin
  useEffect(() => {
    if (view !== "physical") return;
    const combined = [...USB_C_PINS, ...USB_A_PINS];
    const interval = setInterval(() => {
      setTimelineIdx((prev) => {
        const next = (prev + 1) % combined.length;
        const pin = combined[next];
        const isC = next < USB_C_PINS.length;
        setActiveCPin(isC ? pin.id : null);
        setActiveAPin(!isC ? pin.id : null);
        setNarrationText(`${pin.label}: ${pin.desc}`);
        setLogLines(prevLog => [`[PIN] ${pin.label} activo`, ...prevLog].slice(0, 15));
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [view]);

  // Paquetes lógicos
  useEffect(() => {
    if (view !== "logical") return;
    const step = () => {
      setPackets(prev => {
        const moved = prev.map(p => ({ ...p, progress: p.progress + 0.008 })).filter(p => p.progress < 1);
        if (Math.random() < 0.04) {
          const types = [{l:"SETUP", c:"#f59e0b"}, {l:"DATA", c:"#3b82f6"}, {l:"ACK", c:"#10b981"}];
          const t = types[Math.floor(Math.random()*3)];
          moved.push({ id: nextPacketId.current++, label: t.l, progress: 0, lane: Math.floor(Math.random() * 4), color: t.c });
          setTotalPackets(n => n + 1);
        }
        return moved;
      });
      requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [view]);

  const timelinePercent = (timelineIdx / (USB_C_PINS.length + USB_A_PINS.length - 1)) * 100;

  // Mini Osciloscopio
  const Oscilloscope = () => {
    const [phase, setPhase] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setPhase(p => p + 0.2), 50);
      return () => clearInterval(id);
    }, []);
    return (
      <div className="flex items-end h-8 gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-1 bg-cyan-500/60 rounded-full" style={{ height: `${Math.sin(phase + i * 0.5) * 50 + 50}%` }} />
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col p-4 text-white overflow-hidden" style={{ background: "#06131a", maxHeight: "100vh" }}>
      {/* Header */}
      <div className="text-center mb-2">
        <span className="text-teal-300 font-mono text-[10px] tracking-widest uppercase">04 // Definición Física y Lógica</span>
        <h2 className="text-2xl font-bold mt-1">Estructura del Bus USB</h2>
        <p className="text-[10px] text-gray-500 font-mono">Enmanuel Santos - 25-1544</p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-4">
        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
          <button onClick={() => setView("physical")} className={`px-6 py-1.5 rounded-md text-xs font-bold transition-all ${view === "physical" ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50" : "text-gray-500"}`}>VISTA FÍSICA</button>
          <button onClick={() => setView("logical")} className={`px-6 py-1.5 rounded-md text-xs font-bold transition-all ${view === "logical" ? "bg-amber-500/30 text-amber-300 border border-amber-500/50" : "text-gray-500"}`}>VISTA LÓGICA</button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
        {view === "physical" ? (
          <>
            {/* Columna Izquierda: Resumen y Log */}
            <div className="w-1/4 flex flex-col gap-4 min-h-0">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-[10px] text-cyan-300 font-bold mb-3 uppercase tracking-tighter">Cómo funciona</h4>
                <ul className="text-[11px] text-gray-300 space-y-2">
                  <li><span className="text-cyan-500">1.</span> Host alimenta VBUS.</li>
                  <li><span className="text-cyan-500">2.</span> D+/D- datos USB 2.0.</li>
                  <li><span className="text-cyan-500">3.</span> TX/RX SuperSpeed.</li>
                  <li><span className="text-cyan-500">4.</span> CC1/CC2 negociación.</li>
                </ul>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col min-h-0">
                <h4 className="text-[10px] text-gray-400 font-bold mb-2 uppercase">Event Log</h4>
                <div className="flex-1 overflow-y-auto font-mono text-[10px] text-cyan-200/60 space-y-1 pr-2 custom-scrollbar">
                  {logLines.map((line, i) => <div key={i} className="border-b border-white/5 pb-1">{line}</div>)}
                </div>
              </div>
            </div>

            {/* Centro: USB-C y Narración Principal */}
            <div className="w-2/4 flex flex-col gap-4 min-h-0">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col items-center justify-center relative">
                <div className="absolute top-4 left-4 text-[10px] text-cyan-300 font-bold uppercase">USB-C Connector</div>
                <svg viewBox="0 0 260 100" className="w-full h-32 mt-4">
                  <rect x="0" y="10" width="260" height="80" rx="14" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                  {USB_C_PINS.map(pin => (
                    <g key={pin.id}>
                      <rect x={pin.x - 6} y={pin.y - 6} width={12} height={14} rx={2} 
                        fill={activeCPin === pin.id ? "#fff" : pin.color} 
                        opacity={cProgress[pin.id] || 0}
                        className={activeCPin === pin.id ? "animate-pulse" : ""}
                      />
                      {activeCPin === pin.id && (
                        <circle cx={pin.x} cy={pin.y} r="15" fill={pin.color} opacity="0.2" className="animate-ping" />
                      )}
                    </g>
                  ))}
                </svg>
              </div>
              <div className="bg-cyan-500/10 rounded-xl p-5 border border-cyan-500/20 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">Narración en tiempo real</span>
                  <Oscilloscope />
                </div>
                <div className="text-base font-semibold text-white h-12 flex items-center leading-tight">{narrationText || "Iniciando secuencia..."}</div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-700" style={{ width: `${timelinePercent}%` }} />
                </div>
              </div>
            </div>

            {/* Derecha: USB-A y Pin Map */}
            <div className="w-1/4 flex flex-col gap-4 min-h-0">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-[10px] text-sky-300 font-bold mb-3 uppercase">USB-A Classic</h3>
                <svg viewBox="0 0 180 60" className="w-full h-16">
                  <rect x="0" y="10" width="180" height="40" rx="6" fill="#0f172a" stroke="#1e293b" />
                  {USB_A_PINS.map(pin => (
                    <rect key={pin.id} x={pin.x - 16} y={pin.y - 6} width={32} height={12} rx={2} 
                      fill={activeAPin === pin.id ? "#fff" : pin.color}
                      opacity={aProgress[pin.id] || 0}
                    />
                  ))}
                </svg>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col min-h-0">
                <h4 className="text-[10px] text-amber-300 font-bold mb-3 uppercase">Pin Map (Exploded)</h4>
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                  {USB_C_PINS.map(p => (
                    <div key={p.id} className={`flex justify-between items-center text-[10px] p-1.5 rounded transition-colors ${activeCPin === p.id ? "bg-white/10 border border-white/10" : "opacity-60"}`}>
                      <span className="font-mono">{p.label}</span>
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Vista Lógica Completa */
          <div className="w-full flex gap-4 min-h-0">
            <div className="flex-1 bg-white/5 rounded-xl p-8 border border-white/10 relative overflow-hidden flex flex-col">
              <div className="flex justify-between mb-12 px-12">
                <div className="text-cyan-400 font-bold border border-cyan-400/30 px-6 py-2 rounded-xl bg-cyan-400/5 shadow-[0_0_15px_rgba(34,211,238,0.1)]">HOST</div>
                <div className="text-amber-400 font-bold border border-amber-400/30 px-6 py-2 rounded-xl bg-amber-400/5 shadow-[0_0_15px_rgba(251,191,36,0.1)]">DEVICE</div>
              </div>
              <div className="flex-1 flex flex-col justify-around">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="h-12 border-b border-white/5 relative flex items-center">
                    <span className="text-[10px] text-gray-500 font-mono">PIPE_{i}</span>
                    {packets.filter(p => p.lane === i).map(p => (
                      <div key={p.id} className="absolute px-4 py-1.5 rounded-lg text-[11px] font-black shadow-2xl transition-all"
                        style={{ left: `${p.progress * 100}%`, background: p.color, color: "#000", transform: "translateX(-50%) translateY(-2px)" }}>
                        {p.label}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* Host Controller Visual */}
              <div className="mt-8 bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-6">
                <div className="w-20 h-12 bg-cyan-500/20 rounded-lg border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold text-cyan-300">HOST CTRL</div>
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500/40 animate-[marquee_2s_linear_infinite]" style={{ width: '50%', backgroundSize: '20px 100%' }} />
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center text-[8px]">CPU</div>
                  <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center text-[8px]">RAM</div>
                </div>
              </div>
            </div>
            <div className="w-1/4 flex flex-col gap-4">
              <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/20">
                <h4 className="text-xs text-amber-300 font-bold mb-3 uppercase">Control Transfer</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">Simulación de enumeración: El Host envía paquetes <span className="text-amber-500">SETUP</span> para configurar el dispositivo.</p>
              </div>
              <div className="flex-1 bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-center">
                <h4 className="text-[10px] text-gray-500 font-bold mb-4 uppercase">Live Statistics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-mono text-emerald-400 font-bold">480 <span className="text-xs">Mbps</span></div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest">High Speed Mode</div>
                  </div>
                  <div>
                    <div className="text-xl font-mono text-cyan-400">{totalPackets}</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest">Packets Processed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        @keyframes marquee { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}</style>
    </div>
  );
}

// ============================================
// SLIDE 6: USB SERIAL TRANSFER SIMULATION - Frainer
// ============================================
export function USBSerialSimSlideContent() {
  const [isRunning, setIsRunning] = useState(false)
  const [bits, setBits] = useState<number[]>([])
  const [currentBit, setCurrentBit] = useState(0)
  const [decodedByte, setDecodedByte] = useState("")
  const [mode, setMode] = useState<"serial" | "parallel">("serial")

  const sampleData = [0, 1, 0, 0, 1, 0, 0, 0] // 'H' in ASCII
  const sampleDataChar = "H"

  const reset = () => {
    setIsRunning(false)
    setBits([])
    setCurrentBit(0)
    setDecodedByte("")
  }

  useEffect(() => {
    if (!isRunning) return
    if (currentBit >= sampleData.length) {
      setDecodedByte(sampleDataChar)
      setIsRunning(false)
      return
    }

    const speed = mode === "serial" ? 400 : 150
    const timer = setTimeout(() => {
      setBits((prev) => [...prev, sampleData[currentBit]])
      setCurrentBit((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [isRunning, currentBit, mode])

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-3">
        <span className="text-amber-400 font-mono text-sm tracking-widest">05 // USB COMO BUS SERIAL</span>
        <h2 className="text-3xl font-bold text-white mt-2">Transmision Serial USB</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Frainer Encarnacion - 25-1775</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Left - Simulation */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-5 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-cyan-400 font-semibold text-sm">Simulador de Transmision</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    reset()
                    setMode("serial")
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${mode === "serial" ? "bg-cyan-500/30 text-cyan-400 border border-cyan-500/50" : "bg-white/5 text-gray-400"}`}
                >
                  Serial
                </button>
                <button
                  onClick={() => {
                    reset()
                    setMode("parallel")
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${mode === "parallel" ? "bg-amber-500/30 text-amber-400 border border-amber-500/50" : "bg-white/5 text-gray-400"}`}
                >
                  Paralelo
                </button>
              </div>
            </div>

            {/* Bit visualization */}
            <div className="relative mb-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-gray-500 font-mono min-w-[60px]">Enviando:</span>
                <div className="flex gap-1">
                  {sampleData.map((bit, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded flex items-center justify-center font-mono text-sm font-bold transition-all ${
                        i < currentBit
                          ? "bg-cyan-500/30 text-cyan-400 border border-cyan-500/50"
                          : i === currentBit && isRunning
                            ? "bg-amber-500/30 text-amber-400 border border-amber-500/50 scale-110"
                            : "bg-white/5 text-gray-500 border border-white/10"
                      }`}
                    >
                      {bit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Transmission line animation */}
              <div className="h-12 bg-black/30 rounded-lg border border-white/5 relative overflow-hidden my-3">
                <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                  {mode === "serial" ? (
                    <div className="flex items-center w-full px-4">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/30 border border-cyan-500" />
                      <div className="flex-1 h-0.5 bg-cyan-500/30 relative">
                        {bits.map((bit, i) => (
                          <div
                            key={i}
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono font-bold"
                            style={{
                              left: `${((bits.length - 1 - i) / 8) * 100}%`,
                              background: bit ? "#06b6d444" : "#f59e0b44",
                              color: bit ? "#06b6d4" : "#f59e0b",
                              border: `1px solid ${bit ? "#06b6d4" : "#f59e0b"}`,
                            }}
                          >
                            {bit}
                          </div>
                        ))}
                      </div>
                      <div className="w-4 h-4 rounded-full bg-amber-500/30 border border-amber-500" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full gap-0.5">
                      {sampleData.map((bit, i) => (
                        <div key={i} className="w-full h-1 flex items-center px-4">
                          <div className={`h-full flex-1 ${i < currentBit ? "bg-amber-400/60" : "bg-white/10"} rounded-full transition-all`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Received */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 font-mono min-w-[60px]">Recibido:</span>
                <div className="flex gap-1">
                  {bits.map((bit, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded flex items-center justify-center font-mono text-sm font-bold bg-teal-500/30 text-teal-400 border border-teal-500/50"
                    >
                      {bit}
                    </div>
                  ))}
                </div>
                {decodedByte && (
                  <div className="ml-2 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-mono font-bold text-lg">
                    = &quot;{decodedByte}&quot;
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  reset()
                  setIsRunning(true)
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm"
              >
                <Play className="h-4 w-4" /> Transmitir
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

        {/* Right - Explanation */}
        <div className="space-y-3">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="text-cyan-400 font-semibold text-sm mb-2 flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Par Diferencial (D+ y D-)
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              USB utiliza un par de lineas diferenciales (D+ y D-) para enviar senales electricas complementarias, lo
              que mejora la inmunidad al ruido.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="text-amber-400 font-semibold text-sm mb-2 flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Mayor Eficiencia a Altas Frecuencias
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              El diseno serial permite operar a frecuencias muy elevadas sin requerir un gran numero de conductores
              fisicos.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="text-teal-400 font-semibold text-sm mb-2 flex items-center gap-2">
              <Cable className="h-4 w-4" />
              Reduccion de Lineas Fisicas
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              A diferencia de buses paralelos que requieren multiples conductores, USB necesita solo un par de lineas de
              datos, reduciendo costo y complejidad.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="text-emerald-400 font-semibold text-sm mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Menor Skew
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              En buses paralelos, las diferencias de tiempo entre lineas causan errores. La comunicacion serial de USB
              elimina este problema.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 7: EVOLUCION DEL ANCHO DE BANDA - Frainer
// ============================================
export function USBBandwidthSlideContent() {
  const [selectedVersion, setSelectedVersion] = useState(0)
  const [animateBar, setAnimateBar] = useState(false)

  useEffect(() => {
    setAnimateBar(false)
    const t = setTimeout(() => setAnimateBar(true), 100)
    return () => clearTimeout(t)
  }, [selectedVersion])

  const versions = [
    { name: "USB 1.0", speed: "1.5 Mbps", speedNum: 1.5, year: "1996", tier: "Low Speed", color: "#64748b", barW: 1 },
    { name: "USB 1.1", speed: "12 Mbps", speedNum: 12, year: "1998", tier: "Full Speed", color: "#94a3b8", barW: 2 },
    { name: "USB 2.0", speed: "480 Mbps", speedNum: 480, year: "2000", tier: "High Speed", color: "#06b6d4", barW: 12 },
    { name: "USB 3.0", speed: "5 Gbps", speedNum: 5000, year: "2008", tier: "SuperSpeed", color: "#14b8a6", barW: 40 },
    { name: "USB 3.1", speed: "10 Gbps", speedNum: 10000, year: "2013", tier: "SuperSpeed+", color: "#10b981", barW: 60 },
    { name: "USB 3.2", speed: "20 Gbps", speedNum: 20000, year: "2017", tier: "SuperSpeed 20G", color: "#059669", barW: 80 },
    { name: "USB4", speed: "40 Gbps", speedNum: 40000, year: "2019", tier: "USB4", color: "#f59e0b", barW: 100 },
  ]

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-3">
        <span className="text-amber-400 font-mono text-sm tracking-widest">06 // EVOLUCION</span>
        <h2 className="text-3xl font-bold text-white mt-2">Evolucion del Ancho de Banda</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Frainer Encarnacion - 25-1775</p>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-4">
        {/* Left - Version list */}
        <div className="space-y-2">
          {versions.map((v, i) => (
            <button
              key={v.name}
              onClick={() => setSelectedVersion(i)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                selectedVersion === i
                  ? "bg-white/10 border-white/20 scale-[1.02]"
                  : "bg-white/5 border-white/5 hover:border-white/15"
              }`}
            >
              <div className="w-2 h-8 rounded-full" style={{ background: v.color }} />
              <div>
                <div className="text-sm font-bold text-white">{v.name}</div>
                <div className="text-xs text-gray-400">{v.speed} - {v.year}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Center - Bar chart */}
        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Comparacion de Velocidad</h3>
          <div className="space-y-3 h-[85%] flex flex-col justify-center">
            {versions.map((v, i) => (
              <div key={v.name} className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-400 min-w-[50px]">{v.name}</span>
                <div className="flex-1 h-5 bg-black/30 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: animateBar ? `${v.barW}%` : "0%",
                      background: v.color,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono min-w-[55px] text-right" style={{ color: v.color }}>
                  {v.speed}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Detail */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full" style={{ background: versions[selectedVersion].color }} />
              <h3 className="text-xl font-bold text-white">{versions[selectedVersion].name}</h3>
            </div>
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Velocidad</div>
                  <div className="text-lg font-mono font-bold" style={{ color: versions[selectedVersion].color }}>
                    {versions[selectedVersion].speed}
                  </div>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-xs text-gray-400">Ano</div>
                  <div className="text-lg font-mono font-bold text-white">{versions[selectedVersion].year}</div>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-xs text-gray-400">Clasificacion</div>
                <div className="text-sm font-semibold" style={{ color: versions[selectedVersion].color }}>
                  {versions[selectedVersion].tier}
                </div>
              </div>

              {/* Practical example */}
              <div className="bg-black/30 rounded-lg p-3 flex-1">
                <div className="text-xs text-gray-400 mb-2">Tiempo para transferir 1GB</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {versions[selectedVersion].speedNum < 100
                    ? `${Math.round((8000 / versions[selectedVersion].speedNum) * 10) / 10} min`
                    : versions[selectedVersion].speedNum < 1000
                      ? `${Math.round(8000 / versions[selectedVersion].speedNum)} seg`
                      : `${(8000 / versions[selectedVersion].speedNum).toFixed(1)} seg`}
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
// SLIDE 8: ANCHO DE BANDA VS TAMANO FISICO - Frainer
// ============================================
export function USBBandwidthVsSizeSlideContent() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <span className="text-amber-400 font-mono text-sm tracking-widest">07 // ANCHO DE BANDA VS TAMANO</span>
        <h2 className="text-3xl font-bold text-white mt-2">Ancho de Banda vs Tamano Fisico</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Frainer Encarnacion - 25-1775</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Bandwidth */}
        <div className="bg-white/5 rounded-xl p-6 border border-cyan-500/20 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Gauge className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Ancho de Banda</h3>
              <p className="text-xs text-gray-400">Bits por segundo (bps)</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Se mide en bps y representa la cantidad maxima de informacion que puede circular por el bus en un segundo.
            Es un valor <span className="text-cyan-400">logico</span>, determinado por el protocolo y la senal
            electrica.
          </p>
          <div className="space-y-3 flex-1">
            <div className="bg-black/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">USB 2.0</span>
                <span className="text-xs font-mono text-cyan-400">480 Mbps</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full mt-2">
                <div className="h-full bg-cyan-500/60 rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">USB 3.0</span>
                <span className="text-xs font-mono text-teal-400">5 Gbps</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full mt-2">
                <div className="h-full bg-teal-500/60 rounded-full" style={{ width: "50%" }} />
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">USB4</span>
                <span className="text-xs font-mono text-amber-400">40 Gbps</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full mt-2">
                <div className="h-full bg-amber-500/60 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Physical size */}
        <div className="bg-white/5 rounded-xl p-6 border border-amber-500/20 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Cable className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Tamano Fisico del Bus</h3>
              <p className="text-xs text-gray-400">Conductores y componentes</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Hace referencia a los conductores y componentes electricos del cable. Es una medida{" "}
            <span className="text-amber-400">fisica</span>, determinada por el diseno del hardware y los conectores.
          </p>
          <div className="space-y-3 flex-1">
            {[
              { label: "USB 2.0", wires: 4, desc: "VBUS, D+, D-, GND" },
              { label: "USB 3.0", wires: 9, desc: "+2 pares TX/RX, GND drain" },
              { label: "USB-C", wires: 24, desc: "Full duplex, alt modes, PD" },
            ].map(({ label, wires, desc }) => (
              <div key={label} className="bg-black/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className="text-xs font-mono text-amber-400">{wires} pines</span>
                </div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(wires)].map((_, i) => (
                    <div key={i} className="h-3 flex-1 rounded-sm bg-amber-500/40" />
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-amber-300">
              La version del estandar, el controlador, el dispositivo y la calidad del cable influyen en el rendimiento
              final.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 9: TOPOLOGIA Y LIMITES - Oliver Abreu
// ============================================
export function USBTopologySlideContent() {
  const [devices, setDevices] = useState(1)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    setShowWarning(devices > 100)
  }, [devices])

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <span className="text-teal-400 font-mono text-sm tracking-widest">08 // TOPOLOGIA Y LIMITES</span>
        <h2 className="text-3xl font-bold text-white mt-2">Limite de Dispositivos y Topologia</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Oliver Abreu Mateo - 25-1619</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Left - Topology info */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-5 border border-cyan-500/20">
            <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <Network className="h-4 w-4" />
              Topologia en Arbol Jerarquico
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { icon: Check, text: "Host (raiz) controla todo el bus", color: "#06b6d4" },
                { icon: Check, text: "Maximo 127 dispositivos por controlador", color: "#14b8a6" },
                { icon: Check, text: "Maximo 7 niveles jerarquicos", color: "#10b981" },
                { icon: Check, text: "Hasta 5 hubs en cascada", color: "#f59e0b" },
                { icon: Info, text: "Ancho de banda y energia compartidos", color: "#f59e0b" },
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-black/20">
                  <Icon className="h-4 w-4 flex-shrink-0" style={{ color }} />
                  <span className="text-gray-300 text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device counter simulator */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-teal-400 font-semibold mb-3 text-sm">Simulador de Dispositivos Conectados</h3>
            <div className="flex items-center gap-4 mb-3">
              <input
                type="range"
                min="1"
                max="127"
                value={devices}
                onChange={(e) => setDevices(parseInt(e.target.value))}
                className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-2xl font-mono font-bold text-white min-w-[50px] text-right">{devices}</span>
            </div>
            <div className="h-3 bg-black/30 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(devices / 127) * 100}%`,
                  background: devices > 100 ? "#ef4444" : devices > 60 ? "#f59e0b" : "#06b6d4",
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>0</span>
              <span>127 max</span>
            </div>
            {showWarning && (
              <div className="mt-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                Cuidado: Muchos dispositivos pueden afectar estabilidad y ancho de banda.
              </div>
            )}
          </div>
        </div>

        {/* Right - Hubs */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-5 border border-amber-500/20">
            <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Hubs: Alimentados vs Sin Alimentacion
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Battery className="h-4 w-4 text-gray-400" />
                  <h4 className="text-sm font-semibold text-white">Bus-powered</h4>
                </div>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>Energia del puerto USB</li>
                  <li>Energia limitada</li>
                  <li>Ideal para bajo consumo</li>
                </ul>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <BatteryCharging className="h-4 w-4 text-amber-400" />
                  <h4 className="text-sm font-semibold text-white">Self-powered</h4>
                </div>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>Fuente externa</li>
                  <li>Mayor energia</li>
                  <li>Ideal para alto consumo</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Power delivery */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Power Delivery
            </h3>
            <div className="space-y-2">
              {[
                { label: "USB 2.0", power: "2.5W", volts: "5V / 500mA", width: 10 },
                { label: "USB 3.0", power: "4.5W", volts: "5V / 900mA", width: 20 },
                { label: "BC 1.2", power: "7.5W", volts: "5V / 1.5A", width: 30 },
                { label: "USB PD", power: "240W", volts: "5-48V / 5A", width: 100 },
              ].map(({ label, power, volts, width }) => (
                <div key={label} className="bg-black/30 rounded-lg p-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-emerald-400 font-mono">{power}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500/60 rounded-full" style={{ width: `${width}%` }} />
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{volts}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 10: PROTOCOLOS DE TRANSFERENCIA - Algenis
// USB-IF Compliance Flow Emulator
// ============================================
export function USBProtocolsSlideContent() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [phaseProgress, setPhaseProgress] = useState(0)
  const [specLines, setSpecLines] = useState<Array<{ id: number; text: string; status: "loading" | "validated" | "updated" }>>([])
  const [logEntries, setLogEntries] = useState<Array<{ id: number; text: string; type: "info" | "success" | "warn" | "process" }>>([])
  const [dataPackets, setDataPackets] = useState<Array<{ id: number; x: number; active: boolean }>>([])
  const [cycleCount, setCycleCount] = useState(0)
  const specLineCounter = useRef(0)
  const logCounter = useRef(0)
  const packetCounter = useRef(0)

  const phases = [
    { name: "SPEC RELEASE", label: "Especificacion", color: "#06b6d4", icon: "DOC" },
    { name: "DESIGN", label: "Diseno del Dispositivo", color: "#8b5cf6", icon: "PCB" },
    { name: "COMPLIANCE", label: "Compliance Testing", color: "#f59e0b", icon: "TST" },
    { name: "CERTIFIED", label: "Certificacion USB-IF", color: "#10b981", icon: "OK" },
  ]

  const specDocs = [
    "USB 2.0 Specification Rev 2.0 .......... 650 pages",
    "USB 3.2 Specification Rev 1.1 .......... 432 pages",
    "USB4 v2.0 Specification ................ 598 pages",
    "USB Type-C Cable Spec Rev 2.2 ......... 312 pages",
    "USB Power Delivery Rev 3.1 ............ 876 pages",
    "USB Battery Charging Spec v1.2 ........ 78 pages",
    "USB HID Usage Tables v1.4 ............. 288 pages",
    "USB Mass Storage Class Spec ........... 156 pages",
    "USB Audio Device Class Spec 3.0 ....... 210 pages",
    "USB Video Class Spec 1.5 .............. 344 pages",
    "USB Billboard Device Class v1.2 ....... 92 pages",
    "xHCI Host Controller Spec Rev 1.2 ..... 670 pages",
  ]

  const complianceTests = [
    { test: "Signal Integrity - Eye Diagram", result: "PASS", margin: "92%" },
    { test: "Electrical Compliance - Vbus", result: "PASS", margin: "88%" },
    { test: "Protocol Layer - Enumeration", result: "PASS", margin: "100%" },
    { test: "Interoperability - Hub Cascade", result: "WARN", margin: "76%" },
    { test: "Power Delivery Negotiation", result: "PASS", margin: "95%" },
    { test: "Hot Plug / Unplug Stress", result: "PASS", margin: "84%" },
    { test: "Suspend / Resume Timing", result: "PASS", margin: "91%" },
    { test: "USB Type-C CC Logic", result: "PASS", margin: "97%" },
  ]

  // Main animation loop
  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhaseProgress((prev) => {
        if (prev >= 100) {
          setCurrentPhase((p) => {
            const next = (p + 1) % 4
            if (next === 0) setCycleCount((c) => c + 1)
            return next
          })
          return 0
        }
        return prev + 0.8
      })
    }, 50)
    return () => clearInterval(phaseInterval)
  }, [])

  // Spec document loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      const docText = specDocs[Math.floor(Math.random() * specDocs.length)]
      const newLine = {
        id: specLineCounter.current++,
        text: docText,
        status: "loading" as const,
      }
      setSpecLines((prev) => [...prev.slice(-6), newLine])
      setTimeout(() => {
        setSpecLines((prev) =>
          prev.map((l) =>
            l.id === newLine.id
              ? { ...l, status: Math.random() > 0.3 ? "validated" : "updated" }
              : l
          )
        )
      }, 800)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  // Log entries
  useEffect(() => {
    const logs = [
      { text: "USB-IF Compliance Suite v4.2.1 initialized", type: "info" as const },
      { text: "Loading USB 3.2 Gen2x2 test vectors...", type: "process" as const },
      { text: "Signal integrity check: Eye diagram OPEN", type: "success" as const },
      { text: "Vbus voltage within 4.75V - 5.25V range", type: "success" as const },
      { text: "Enumeration sequence completed in 42ms", type: "success" as const },
      { text: "Hot-plug stress test iteration #" + (cycleCount * 100 + Math.floor(Math.random() * 100)), type: "info" as const },
      { text: "Power negotiation: 20V @ 5A (100W) agreed", type: "success" as const },
      { text: "Hub cascade depth: 5 (max reached)", type: "warn" as const },
      { text: "Type-C CC pin logic validated", type: "success" as const },
      { text: "Generating compliance report...", type: "process" as const },
      { text: "TID assigned: USB-IF #" + (40000 + Math.floor(Math.random() * 9999)), type: "success" as const },
      { text: "Certification mark authorized for product", type: "success" as const },
    ]
    const interval = setInterval(() => {
      const log = logs[Math.floor(Math.random() * logs.length)]
      setLogEntries((prev) => [...prev.slice(-5), { ...log, id: logCounter.current++ }])
    }, 1500)
    return () => clearInterval(interval)
  }, [cycleCount])

  // Data packet animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPackets((prev) => {
        const updated = prev
          .map((p) => ({ ...p, x: p.x + 3 }))
          .filter((p) => p.x < 110)
        if (Math.random() > 0.4) {
          updated.push({ id: packetCounter.current++, x: -5, active: true })
        }
        return updated
      })
    }, 60)
    return () => clearInterval(interval)
  }, [])

  const activePhase = phases[currentPhase]

  return (
    <div className="h-full flex flex-col p-4 relative overflow-hidden">
      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: activePhase.color,
              opacity: 0.2 + Math.random() * 0.3,
              animation: `float-particle ${8 + Math.random() * 12}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-3 relative z-10">
        <span className="text-teal-400 font-mono text-sm tracking-widest">09 // PROTOCOLOS</span>
        <h2 className="text-3xl font-bold text-white mt-1">Protocolos de Transferencia</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Algenis De los Santos Lopez - 25-1739</p>
      </div>

      {/* Pipeline Progress Bar */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-1">
          {phases.map((phase, i) => {
            const isActive = i === currentPhase
            const isDone = i < currentPhase
            return (
              <div key={phase.name} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2 w-full">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black font-mono border-2 transition-all duration-500 flex-shrink-0"
                    style={{
                      borderColor: isActive || isDone ? phase.color : "rgba(255,255,255,0.1)",
                      background: isDone ? phase.color + "30" : isActive ? phase.color + "15" : "transparent",
                      color: isActive || isDone ? phase.color : "rgba(255,255,255,0.3)",
                      boxShadow: isActive ? `0 0 15px ${phase.color}30` : "none",
                    }}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : phase.icon}
                  </div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-100"
                      style={{
                        width: isDone ? "100%" : isActive ? `${phaseProgress}%` : "0%",
                        background: `linear-gradient(90deg, ${phase.color}90, ${phase.color})`,
                        boxShadow: isActive ? `0 0 8px ${phase.color}60` : "none",
                      }}
                    />
                  </div>
                </div>
                <span
                  className="text-[9px] font-mono tracking-wider transition-colors duration-300"
                  style={{ color: isActive ? phase.color : isDone ? phase.color + "80" : "rgba(255,255,255,0.2)" }}
                >
                  {phase.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-3 gap-3 relative z-10 min-h-0">
        {/* Left Panel - Spec Documents */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="bg-white/[0.03] rounded-xl p-4 border border-cyan-500/20 flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-cyan-400 font-semibold text-xs flex items-center gap-2">
                <Server className="h-3.5 w-3.5" />
                USB-IF Spec Repository
              </h3>
              <span className="text-[9px] font-mono text-cyan-400/60 px-1.5 py-0.5 rounded bg-cyan-500/10">LIVE</span>
            </div>
            <div className="flex-1 space-y-1 overflow-hidden">
              {specLines.map((line) => (
                <div
                  key={line.id}
                  className="flex items-center gap-2 p-1.5 rounded bg-black/30 transition-all duration-500"
                  style={{ opacity: line.status === "loading" ? 0.5 : 1 }}
                >
                  {line.status === "loading" && (
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                  )}
                  {line.status === "validated" && (
                    <Check className="h-2.5 w-2.5 text-emerald-400 flex-shrink-0" />
                  )}
                  {line.status === "updated" && (
                    <Activity className="h-2.5 w-2.5 text-amber-400 flex-shrink-0" />
                  )}
                  <span className="text-[9px] font-mono text-gray-400 truncate">{line.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Phase Detail */}
          <div
            className="rounded-xl p-4 border transition-all duration-700"
            style={{
              background: activePhase.color + "08",
              borderColor: activePhase.color + "30",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: activePhase.color }}
              />
              <span className="text-[10px] font-mono font-bold" style={{ color: activePhase.color }}>
                FASE ACTIVA
              </span>
            </div>
            <h4 className="text-white font-bold text-sm mb-1">{activePhase.label}</h4>
            <p className="text-gray-400 text-[10px] leading-relaxed">
              {currentPhase === 0 && "Descargando y parseando especificaciones USB-IF. Validando compatibilidad con revisiones activas."}
              {currentPhase === 1 && "Generando esquematico del controlador USB. Verificando pinout Type-C y logica CC/VCONN."}
              {currentPhase === 2 && "Ejecutando suite de compliance USB-IF. Analizando eye diagrams y timing de senales."}
              {currentPhase === 3 && "Test ID asignado. Logo USB certificado. Dispositivo aprobado para distribucion comercial."}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-black/30 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{ width: `${phaseProgress}%`, background: activePhase.color }}
                />
              </div>
              <span className="text-[9px] font-mono" style={{ color: activePhase.color }}>
                {Math.floor(phaseProgress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Center Panel - Compliance Testing Visual */}
        <div className="flex flex-col gap-3 min-h-0">
          {/* Data Flow Visualization */}
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10 relative overflow-hidden" style={{ height: "120px" }}>
            <h3 className="text-gray-400 font-semibold text-[10px] mb-2 font-mono">DATA FLOW - USB PROTOCOL ANALYZER</h3>
            <svg className="w-full" style={{ height: "70px" }} viewBox="0 0 100 30" preserveAspectRatio="none">
              {/* Bus lines */}
              <line x1="0" y1="8" x2="100" y2="8" stroke="rgba(6,182,212,0.15)" strokeWidth="0.3" />
              <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(245,158,11,0.15)" strokeWidth="0.3" />
              <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(16,185,129,0.15)" strokeWidth="0.3" />
              {/* Animated packets */}
              {dataPackets.map((pkt) => {
                const lane = pkt.id % 3
                const y = lane === 0 ? 8 : lane === 1 ? 15 : 22
                const colors = ["#06b6d4", "#f59e0b", "#10b981"]
                return (
                  <g key={pkt.id}>
                    <rect
                      x={pkt.x}
                      y={y - 2}
                      width={4}
                      height={4}
                      rx={0.5}
                      fill={colors[lane]}
                      opacity={0.8}
                    />
                    <rect
                      x={pkt.x}
                      y={y - 2}
                      width={4}
                      height={4}
                      rx={0.5}
                      fill={colors[lane]}
                      opacity={0.3}
                      filter="url(#pktGlow)"
                    />
                  </g>
                )
              })}
              <defs>
                <filter id="pktGlow">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
              </defs>
            </svg>
            <div className="absolute bottom-2 right-3 flex items-center gap-3">
              {["D+/D-", "VBUS", "CC"].map((label, i) => (
                <div key={label} className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: ["#06b6d4", "#f59e0b", "#10b981"][i] }} />
                  <span className="text-[8px] font-mono text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Test Results */}
          <div className="bg-white/[0.03] rounded-xl p-4 border border-amber-500/20 flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-amber-400 font-semibold text-xs flex items-center gap-2">
                <Activity className="h-3.5 w-3.5" />
                Compliance Tests
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-emerald-400">7 PASS</span>
                <span className="text-[9px] font-mono text-amber-400">1 WARN</span>
              </div>
            </div>
            <div className="flex-1 space-y-1 overflow-hidden">
              {complianceTests.map((t, i) => {
                const isHighlighted = Math.floor((phaseProgress / 100) * complianceTests.length) === i && currentPhase === 2
                return (
                  <div
                    key={t.test}
                    className="flex items-center gap-2 p-1.5 rounded transition-all duration-300"
                    style={{
                      background: isHighlighted ? "rgba(245,158,11,0.1)" : "rgba(0,0,0,0.2)",
                      borderLeft: isHighlighted ? "2px solid #f59e0b" : "2px solid transparent",
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: t.result === "PASS" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)",
                      }}
                    >
                      {t.result === "PASS" ? (
                        <Check className="h-2.5 w-2.5 text-emerald-400" />
                      ) : (
                        <Info className="h-2.5 w-2.5 text-amber-400" />
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-gray-300 flex-1 truncate">{t.test}</span>
                    <div className="w-12 h-1 rounded-full bg-white/5 overflow-hidden flex-shrink-0">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: t.margin,
                          background: t.result === "PASS" ? "#10b981" : "#f59e0b",
                        }}
                      />
                    </div>
                    <span
                      className="text-[8px] font-mono font-bold flex-shrink-0"
                      style={{ color: t.result === "PASS" ? "#10b981" : "#f59e0b" }}
                    >
                      {t.margin}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Terminal & Certification */}
        <div className="flex flex-col gap-3 min-h-0">
          {/* Terminal Log */}
          <div className="bg-black/60 rounded-xl p-4 border border-white/10 flex-1 flex flex-col min-h-0 overflow-hidden font-mono">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[9px] text-gray-500">usb-if-compliance-suite</span>
            </div>
            <div className="flex-1 space-y-1 overflow-hidden">
              {logEntries.map((entry) => (
                <div key={entry.id} className="flex items-start gap-1.5 text-[9px] leading-relaxed animate-fadeIn">
                  <span className="text-gray-600 flex-shrink-0">{">"}</span>
                  <span
                    style={{
                      color:
                        entry.type === "success"
                          ? "#10b981"
                          : entry.type === "warn"
                            ? "#f59e0b"
                            : entry.type === "process"
                              ? "#8b5cf6"
                              : "#6b7280",
                    }}
                  >
                    {entry.text}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1 text-gray-600">
                <span>{">"}</span>
                <span className="inline-block w-1.5 h-3 bg-cyan-400/80 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Certification Badge */}
          <div
            className="rounded-xl p-4 border transition-all duration-700 text-center"
            style={{
              background: currentPhase === 3 ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.02)",
              borderColor: currentPhase === 3 ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.05)",
              boxShadow: currentPhase === 3 ? "0 0 30px rgba(16,185,129,0.1)" : "none",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-700"
                style={{
                  borderColor: currentPhase === 3 ? "#10b981" : "rgba(255,255,255,0.1)",
                  boxShadow: currentPhase === 3 ? "0 0 20px rgba(16,185,129,0.3)" : "none",
                }}
              >
                <Usb
                  className="h-6 w-6 transition-colors duration-700"
                  style={{ color: currentPhase === 3 ? "#10b981" : "rgba(255,255,255,0.2)" }}
                />
              </div>
              <div>
                <span
                  className="text-[10px] font-mono font-bold block transition-colors duration-700"
                  style={{ color: currentPhase === 3 ? "#10b981" : "rgba(255,255,255,0.2)" }}
                >
                  USB CERTIFIED
                </span>
                <span className="text-[8px] text-gray-500 font-mono">
                  Ciclo #{cycleCount + 1} | Fase: {phases[currentPhase].name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

// ============================================
// SLIDE 11: ENUMERACION USB - Algenis
// ============================================
export function USBEnumerationSlideContent() {
  const [activeStep, setActiveStep] = useState(0)
  const [logEntries, setLogEntries] = useState<Array<{ id: number; text: string; type: "cmd" | "ok" | "info" | "data" }>>([])
  const [addressCounter, setAddressCounter] = useState(5)
  const [cycleCount, setCycleCount] = useState(0)
  const [deviceInfo, setDeviceInfo] = useState({ vid: "0x046D", pid: "0xC077", cls: "HID", ep: "EP1 IN" })
  const logCounter = useRef(0)
  const logContainerRef = useRef<HTMLDivElement>(null)

  const steps = [
    { label: "Device Conectado", desc: "Un dispositivo USB ha sido conectado fisicamente al puerto. El hub detecta un cambio en la linea D+ o D-.", icon: "PLUG" },
    { label: "Host Reset", desc: "El host envia un reset al puerto para poner el dispositivo en estado por defecto (direccion 0).", icon: "RST" },
    { label: "GET_DESCRIPTOR (Device)", desc: "El host solicita el descriptor del dispositivo (VID, PID, clase, version USB, tamano max de paquete).", icon: "GET" },
    { label: "Device Responde", desc: "El dispositivo responde con su Device Descriptor de 18 bytes. El host ahora sabe que tipo de dispositivo es.", icon: "RES" },
    { label: "SET_ADDRESS", desc: `El host asigna una direccion unica al dispositivo en el bus. Ya no usa direccion 0.`, icon: "ADR" },
    { label: "GET_DESCRIPTOR (Config)", desc: "El host solicita los descriptores de configuracion, interfaces y endpoints disponibles.", icon: "CFG" },
    { label: "SET_CONFIGURATION", desc: "El host selecciona una configuracion y habilita las interfaces y endpoints del dispositivo.", icon: "SET" },
    { label: "Driver Cargado", desc: "El sistema operativo busca un driver que coincida con la clase o VID/PID del dispositivo.", icon: "DRV" },
    { label: "Transferencia Normal", desc: "El dispositivo esta completamente configurado. Comienza la transferencia de datos normal entre host y device.", icon: "DAT" },
  ]

  const vidPidPool = [
    { vid: "0x046D", pid: "0xC077", cls: "HID", ep: "EP1 IN", driver: "HID Mouse" },
    { vid: "0x8087", pid: "0x0A2B", cls: "Wireless", ep: "EP2 IN/OUT", driver: "Bluetooth" },
    { vid: "0x0781", pid: "0x5583", cls: "Mass Storage", ep: "EP1 BULK", driver: "UMS" },
    { vid: "0x1B1C", pid: "0x1B20", cls: "HID", ep: "EP3 IN", driver: "HID Keyboard" },
    { vid: "0x046D", pid: "0x0825", cls: "Video", ep: "EP2 ISO", driver: "UVC Webcam" },
    { vid: "0x0BDA", pid: "0x8153", cls: "CDC/ECM", ep: "EP1 BULK", driver: "USB Ethernet" },
  ]

  // Main step advancing loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length
        if (next === 0) {
          // New cycle: change address and device
          setAddressCounter((a) => a + 1)
          setCycleCount((c) => {
            const newC = c + 1
            const dev = vidPidPool[newC % vidPidPool.length]
            setDeviceInfo(dev)
            return newC
          })
        }
        return next
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Log generation based on step
  useEffect(() => {
    const addr = addressCounter
    const dev = deviceInfo
    const stepLogs: Record<number, Array<{ text: string; type: "cmd" | "ok" | "info" | "data" }>> = {
      0: [{ text: "Port status change detected: CONNECT", type: "info" }],
      1: [{ text: "USB_REQ: Port Reset (50ms)", type: "cmd" }, { text: "Device now at Address 0", type: "ok" }],
      2: [{ text: `GET_DESCRIPTOR (Device) -> addr 0, len 18`, type: "cmd" }],
      3: [{ text: `Device Descriptor: VID=${dev.vid} PID=${dev.pid} Class=${dev.cls}`, type: "data" }],
      4: [{ text: `SET_ADDRESS -> ${addr}`, type: "cmd" }, { text: `Device responding at address ${addr}`, type: "ok" }],
      5: [{ text: `GET_DESCRIPTOR (Config) -> addr ${addr}`, type: "cmd" }, { text: `Config: 1 Interface, Endpoint: ${dev.ep}`, type: "data" }],
      6: [{ text: `SET_CONFIGURATION -> 1`, type: "cmd" }, { text: `Interfaces & endpoints enabled`, type: "ok" }],
      7: [{ text: `Matching driver for ${dev.cls} (${dev.vid}:${dev.pid})`, type: "info" }, { text: `Driver loaded: ${dev.driver}`, type: "ok" }],
      8: [{ text: `[${dev.ep}] Data transfer active @ addr ${addr}`, type: "data" }],
    }

    const entries = stepLogs[activeStep] || []
    entries.forEach((entry, i) => {
      setTimeout(() => {
        setLogEntries((prev) => [...prev.slice(-12), { ...entry, id: logCounter.current++ }])
      }, i * 400)
    })
  }, [activeStep, addressCounter, deviceInfo])

  // Auto-scroll log
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logEntries])

  const activeColor = "#06b6d4"

  return (
    <div className="h-full flex flex-col p-4 relative overflow-hidden">
      {/* Ambient grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(6,182,212,0.03) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      {/* Header */}
      <div className="text-center mb-3 relative z-10">
        <span className="text-teal-400 font-mono text-sm tracking-widest">10 // ENUMERACION USB</span>
        <h2 className="text-3xl font-bold text-white mt-1">Proceso de Enumeracion USB</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Algenis De los Santos Lopez - 25-1739</p>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-3 relative z-10 min-h-0">

        {/* Left: Step Pipeline (5 cols) */}
        <div className="col-span-5 bg-white/[0.03] rounded-xl p-4 border border-cyan-500/15 flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-cyan-400 font-semibold text-xs flex items-center gap-2">
              <Layers className="h-3.5 w-3.5" />
              Pipeline de Enumeracion
            </h3>
            <span className="text-[9px] font-mono text-cyan-400/50 px-1.5 py-0.5 rounded bg-cyan-500/10">CICLO #{cycleCount + 1}</span>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto pr-1">
            {steps.map((step, i) => {
              const isActive = i === activeStep
              const isDone = i < activeStep
              return (
                <div
                  key={step.label}
                  className="flex items-center gap-2.5 p-2 rounded-lg transition-all duration-500 relative"
                  style={{
                    background: isActive ? "rgba(6,182,212,0.12)" : isDone ? "rgba(16,185,129,0.05)" : "rgba(0,0,0,0.15)",
                    borderLeft: isActive ? "3px solid #06b6d4" : isDone ? "3px solid rgba(16,185,129,0.4)" : "3px solid transparent",
                  }}
                >
                  {/* Step number/icon */}
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-black font-mono flex-shrink-0 transition-all duration-500"
                    style={{
                      background: isActive ? "rgba(6,182,212,0.25)" : isDone ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
                      color: isActive ? "#06b6d4" : isDone ? "#10b981" : "rgba(255,255,255,0.25)",
                      border: `1px solid ${isActive ? "rgba(6,182,212,0.5)" : isDone ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.05)"}`,
                      boxShadow: isActive ? "0 0 12px rgba(6,182,212,0.2)" : "none",
                    }}
                  >
                    {isDone ? <Check className="h-3 w-3" /> : step.icon}
                  </div>
                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[10px] font-semibold block truncate transition-colors duration-300"
                      style={{ color: isActive ? "#06b6d4" : isDone ? "#10b981" : "rgba(255,255,255,0.35)" }}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <span className="text-[8px] text-gray-500 font-mono">Paso {i + 1} de {steps.length}</span>
                    )}
                  </div>
                  {/* Pulse indicator */}
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 animate-pulse" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right side: 7 cols */}
        <div className="col-span-7 flex flex-col gap-3 min-h-0">

          {/* What's happening panel */}
          <div
            className="rounded-xl p-4 border transition-all duration-700 relative overflow-hidden"
            style={{
              background: "rgba(6,182,212,0.05)",
              borderColor: "rgba(6,182,212,0.25)",
            }}
          >
            {/* Animated scan line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px] opacity-40"
              style={{
                background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
                animation: "scan-line 2.5s ease-in-out infinite",
              }}
            />
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider">QUE ESTA PASANDO?</span>
            </div>
            <h4 className="text-white font-bold text-sm mb-1">{steps[activeStep].label}</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">{steps[activeStep].desc}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-black/30 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-cyan-500"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-cyan-400/70">{activeStep + 1}/{steps.length}</span>
            </div>
          </div>

          {/* Middle row: Device Info + Visual */}
          <div className="grid grid-cols-2 gap-3">
            {/* Device Info Card */}
            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
              <h3 className="text-gray-400 font-semibold text-[10px] mb-3 font-mono flex items-center gap-2">
                <Usb className="h-3 w-3" />
                DEVICE INFO
              </h3>
              <div className="space-y-2">
                {[
                  { label: "VID", value: deviceInfo.vid },
                  { label: "PID", value: deviceInfo.pid },
                  { label: "Class", value: deviceInfo.cls },
                  { label: "Endpoint", value: deviceInfo.ep },
                  { label: "Address", value: `${addressCounter}` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gray-500">{item.label}</span>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-all duration-500"
                      style={{
                        color: "#06b6d4",
                        background: "rgba(6,182,212,0.1)",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host <-> Device Visual */}
            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="flex items-center gap-3 w-full">
                {/* Host */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <Monitor className="h-6 w-6 text-cyan-400" />
                  </div>
                  <span className="text-[8px] font-mono text-cyan-400">HOST</span>
                </div>
                {/* Animated connection line */}
                <div className="flex-1 relative h-8 flex items-center">
                  <div className="w-full h-[2px] bg-white/10 rounded-full relative overflow-hidden">
                    <div
                      className="absolute top-0 h-full w-6 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
                        animation: activeStep < 5 ? "packet-right 1.2s ease-in-out infinite" : "packet-left 1.2s ease-in-out infinite",
                      }}
                    />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[7px] font-mono text-gray-600 bg-[#0a1820] px-1">
                      {activeStep <= 2 || activeStep === 5 ? "SETUP" : activeStep === 3 ? "DATA" : activeStep === 8 ? "DATA" : "CMD"}
                    </span>
                  </div>
                </div>
                {/* Device */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-lg border flex items-center justify-center transition-all duration-500"
                    style={{
                      background: activeStep >= 7 ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                      borderColor: activeStep >= 7 ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)",
                    }}
                  >
                    <Usb
                      className="h-6 w-6 transition-colors duration-500"
                      style={{ color: activeStep >= 7 ? "#10b981" : "#f59e0b" }}
                    />
                  </div>
                  <span className="text-[8px] font-mono" style={{ color: activeStep >= 7 ? "#10b981" : "#f59e0b" }}>
                    DEV:{addressCounter}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Log */}
          <div className="bg-black/60 rounded-xl p-3 border border-white/10 flex-1 flex flex-col min-h-0 overflow-hidden font-mono">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[9px] text-gray-500">usb-enumeration-monitor</span>
              <span className="ml-auto text-[8px] text-gray-600 font-mono">addr: {addressCounter}</span>
            </div>
            <div ref={logContainerRef} className="flex-1 space-y-0.5 overflow-y-auto pr-1 scroll-smooth">
              {logEntries.map((entry) => (
                <div key={entry.id} className="flex items-start gap-1.5 text-[9px] leading-relaxed" style={{ animation: "log-entry 0.3s ease-out" }}>
                  <span className="text-gray-600 flex-shrink-0 select-none">{">"}</span>
                  <span
                    style={{
                      color:
                        entry.type === "ok"
                          ? "#10b981"
                          : entry.type === "cmd"
                            ? "#06b6d4"
                            : entry.type === "data"
                              ? "#f59e0b"
                              : "#6b7280",
                    }}
                  >
                    {entry.text}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1 text-gray-600">
                <span>{">"}</span>
                <span className="inline-block w-1.5 h-3 bg-cyan-400/80 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-line {
          0% { transform: translateY(0); }
          100% { transform: translateY(80px); }
        }
        @keyframes packet-right {
          0% { left: -10%; }
          100% { left: 100%; }
        }
        @keyframes packet-left {
          0% { left: 100%; }
          100% { left: -10%; }
        }
        @keyframes log-entry {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ============================================
// SLIDE 12: LIMITES PRACTICOS - Oliver Abreu
// ============================================
export function USBPracticalLimitsSlideContent() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <span className="text-amber-400 font-mono text-sm tracking-widest">11 // LIMITES PRACTICOS</span>
        <h2 className="text-3xl font-bold text-white mt-2">Consideraciones Reales y Limites</h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Oliver Abreu Mateo - 25-1619</p>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-4">
        {/* QoS */}
        <div className="bg-white/5 rounded-xl p-5 border border-cyan-500/20 flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3">
            <Activity className="h-5 w-5 text-cyan-400" />
          </div>
          <h3 className="text-cyan-400 font-semibold mb-2">Ancho de Banda Compartido</h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            El ancho de banda es compartido entre todos los dispositivos del bus (QoS). Mas dispositivos conectados
            significa menos ancho de banda disponible para cada uno.
          </p>
          <div className="mt-auto space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">1 dispositivo</span>
              <span className="text-cyan-400 font-mono">480 Mbps</span>
            </div>
            <div className="h-2 bg-black/30 rounded-full">
              <div className="h-full bg-cyan-500/60 rounded-full" style={{ width: "100%" }} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">5 dispositivos</span>
              <span className="text-cyan-400 font-mono">~96 Mbps c/u</span>
            </div>
            <div className="h-2 bg-black/30 rounded-full">
              <div className="h-full bg-cyan-500/40 rounded-full" style={{ width: "20%" }} />
            </div>
          </div>
        </div>

        {/* Energy */}
        <div className="bg-white/5 rounded-xl p-5 border border-amber-500/20 flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
            <Zap className="h-5 w-5 text-amber-400" />
          </div>
          <h3 className="text-amber-400 font-semibold mb-2">Distribucion de Energia</h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            La energia se distribuye entre los dispositivos conectados. Muchos dispositivos sin alimentacion externa
            pueden causar inestabilidad.
          </p>
          <div className="mt-auto space-y-2">
            {["Disco Externo", "Teclado", "Mouse", "Webcam"].map((device, i) => (
              <div key={device} className="flex items-center gap-2 text-xs">
                <span className="text-gray-400 min-w-[80px]">{device}</span>
                <div className="flex-1 h-2 bg-black/30 rounded-full">
                  <div
                    className="h-full bg-amber-500/60 rounded-full"
                    style={{ width: `${[80, 10, 5, 40][i]}%` }}
                  />
                </div>
                <span className="text-amber-400 font-mono min-w-[40px]">{["2W", "0.25W", "0.1W", "1W"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best practices */}
        <div className="bg-white/5 rounded-xl p-5 border border-emerald-500/20 flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-3">
            <Check className="h-5 w-5 text-emerald-400" />
          </div>
          <h3 className="text-emerald-400 font-semibold mb-2">Usar Hub Alimentado Cuando:</h3>
          <div className="space-y-2 flex-1">
            {[
              "Se conectan discos duros externos",
              "Se usan multiples dispositivos de alto consumo",
              "Se requiere estabilidad electrica",
              "Se cargan smartphones u otros dispositivos",
              "Se necesita mas de 500mA por dispositivo",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-black/20">
                <ChevronRight className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-xs">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SLIDE 13: CONCLUSION - Gracias
// ============================================
export function USBConclusionSlideContent() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: "2px",
              height: Math.random() * 300 + 100 + "px",
              left: Math.random() * 100 + "%",
              top: "0",
              background: `linear-gradient(180deg, transparent, ${Math.random() > 0.5 ? "#06b6d4" : "#f59e0b"}, transparent)`,
              animation: `usb-flow ${Math.random() * 5 + 4}s linear infinite`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-cyan-400/50 flex items-center justify-center">
            <Usb className="h-10 w-10 text-cyan-400" />
          </div>
        </div>

        <h2 className="text-5xl font-black text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400 gradient-animate">
            Gracias por su Atencion
          </span>
        </h2>

        {/* Team members */}
        <div className="grid grid-cols-5 gap-4 mt-8 max-w-3xl mx-auto">
          {[
            { name: "Christopher Marrero", id: "25-1437" },
            { name: "Enmanuel Santos", id: "25-1544" },
            { name: "Frainer Encarnacion", id: "25-1775" },
            { name: "Oliver Abreu Mateo", id: "25-1619" },
            { name: "Algenis De los Santos", id: "25-1739" },
          ].map(({ name, id }) => (
            <div key={name} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm font-semibold text-white">{name}</p>
              {id && <p className="text-xs text-gray-500 font-mono">{id}</p>}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white">
            <span className="neon-text text-cyan-400">Los Ingenieros</span>
          </h3>
        </div>
      </div>

      <style jsx>{`
        @keyframes usb-flow {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
