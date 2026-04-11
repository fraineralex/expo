"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronRight, Settings, Zap, Cpu, Fan, MemoryStick, MonitorSpeaker, Music, CircuitBoard, Disc, HardDrive, Box, Server } from "lucide-react"

// Component data with descriptions
const computerComponents = [
  {
    id: "gabinete",
    name: "Gabinete",
    icon: Box,
    color: "cyan",
    description: "Estructura que alberga y protege los componentes internos del computador.",
    details: "El gabinete proporciona soporte fisico, ventilacion y organizacion de cables para todos los componentes."
  },
  {
    id: "fuente",
    name: "Fuente de Poder",
    icon: Zap,
    color: "amber",
    description: "Suministra energia electrica a todos los componentes del sistema.",
    details: "Convierte la corriente alterna (AC) en corriente directa (DC) con diferentes voltajes segun las necesidades."
  },
  {
    id: "procesador",
    name: "Procesador",
    icon: Cpu,
    color: "blue",
    description: "Unidad central que ejecuta instrucciones y procesa datos.",
    details: "El CPU es el 'cerebro' del computador, realizando calculos y tomando decisiones logicas."
  },
  {
    id: "cooler",
    name: "CPU Cooler",
    icon: Fan,
    color: "teal",
    description: "Sistema de enfriamiento para mantener la temperatura adecuada del procesador.",
    details: "Puede ser de aire (disipador + ventilador) o liquido, esencial para el rendimiento optimo."
  },
  {
    id: "memoria",
    name: "Memoria RAM",
    icon: MemoryStick,
    color: "purple",
    description: "Almacena datos e instrucciones temporalmente para acceso rapido.",
    details: "Memoria volatil de alta velocidad que el CPU usa para operaciones en tiempo real."
  },
  {
    id: "gpu",
    name: "Tarjeta de Graficos",
    icon: MonitorSpeaker,
    color: "pink",
    description: "Procesa y genera imagenes para la pantalla.",
    details: "La GPU maneja renderizado 3D, video y tareas de computo paralelo intensivo."
  },
  {
    id: "audio",
    name: "Tarjeta de Audio",
    icon: Music,
    color: "orange",
    description: "Gestiona la entrada y salida de sonido del sistema.",
    details: "Procesa senales de audio digital y analogico para altavoces y microfonos."
  },
  {
    id: "motherboard",
    name: "Tarjeta Madre",
    icon: CircuitBoard,
    color: "emerald",
    description: "Placa base que conecta todos los componentes del sistema.",
    details: "Contiene el chipset, slots de expansion, puertos y circuitos de comunicacion."
  },
  {
    id: "optico",
    name: "Unidades Opticas",
    icon: Disc,
    color: "sky",
    description: "Dispositivos para leer y grabar discos (CD/DVD/Blu-ray).",
    details: "Utilizan laser para leer y escribir datos en medios opticos."
  },
  {
    id: "disco",
    name: "Disco Duro",
    icon: HardDrive,
    color: "rose",
    description: "Almacenamiento permanente de datos y programas.",
    details: "Puede ser HDD (mecanico) o SSD (estado solido) con diferentes velocidades."
  }
]

const relatedTopics = [
  { id: "definicion", label: "Definicion general", icon: Settings },
  { id: "unidades", label: "Unidades operativas", icon: Server },
  { id: "senales", label: "Senales de control", icon: Zap },
  { id: "rendimiento", label: "Rendimiento y costo", icon: Cpu },
  { id: "funcionamiento", label: "Como funciona", icon: CircuitBoard }
]

const comparisonData = [
  { aspect: "Enfoque", arquitectura: 'El "Que"', organizacion: 'El "Como"' },
  { aspect: "Vision", arquitectura: "Logica / Abstracta", organizacion: "Fisica / Hardware" },
  { aspect: "Ejemplo", arquitectura: "Set de instrucciones", organizacion: "Circuitos y senales" },
  { aspect: "Estabilidad", arquitectura: "Estable a largo plazo", organizacion: "Evoluciona rapido" },
  { aspect: "Analogia", arquitectura: "El Plano", organizacion: "La Construccion" }
]

// Hexagon component
function HexagonBlock({ 
  component, 
  isSelected, 
  onClick,
  index
}: { 
  component: typeof computerComponents[0]
  isSelected: boolean
  onClick: () => void
  index: number
}) {
  const Icon = component.icon
  const colorMap: Record<string, { bg: string, border: string, glow: string, text: string }> = {
    cyan: { bg: "bg-cyan-500/20", border: "border-cyan-400", glow: "shadow-cyan-500/50", text: "text-cyan-400" },
    amber: { bg: "bg-amber-500/20", border: "border-amber-400", glow: "shadow-amber-500/50", text: "text-amber-400" },
    blue: { bg: "bg-blue-500/20", border: "border-blue-400", glow: "shadow-blue-500/50", text: "text-blue-400" },
    teal: { bg: "bg-teal-500/20", border: "border-teal-400", glow: "shadow-teal-500/50", text: "text-teal-400" },
    purple: { bg: "bg-purple-500/20", border: "border-purple-400", glow: "shadow-purple-500/50", text: "text-purple-400" },
    pink: { bg: "bg-pink-500/20", border: "border-pink-400", glow: "shadow-pink-500/50", text: "text-pink-400" },
    orange: { bg: "bg-orange-500/20", border: "border-orange-400", glow: "shadow-orange-500/50", text: "text-orange-400" },
    emerald: { bg: "bg-emerald-500/20", border: "border-emerald-400", glow: "shadow-emerald-500/50", text: "text-emerald-400" },
    sky: { bg: "bg-sky-500/20", border: "border-sky-400", glow: "shadow-sky-500/50", text: "text-sky-400" },
    rose: { bg: "bg-rose-500/20", border: "border-rose-400", glow: "shadow-rose-500/50", text: "text-rose-400" }
  }
  
  const colors = colorMap[component.color] || colorMap.cyan

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center justify-center
        w-20 h-20 transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
        ${isSelected ? 'scale-110 z-10' : 'hover:scale-105'}
      `}
      style={{
        animationDelay: `${index * 50}ms`
      }}
      aria-pressed={isSelected}
      tabIndex={0}
    >
      {/* Hexagon shape */}
      <div 
        className={`
          absolute inset-0 transition-all duration-300
          ${isSelected ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}` : 'bg-white/5 border-white/20 hover:bg-white/10'}
        `}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          border: `2px solid ${isSelected ? '' : 'rgba(255,255,255,0.2)'}`,
        }}
      >
        <div 
          className={`absolute inset-[2px] ${isSelected ? colors.bg : 'bg-zinc-900/80'} backdrop-blur-sm`}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
      </div>
      
      {/* Icon and label */}
      <div className="relative z-10 flex flex-col items-center gap-1">
        <Icon className={`h-5 w-5 transition-colors duration-300 ${isSelected ? colors.text : 'text-white/70 group-hover:text-white'}`} />
        <span className={`text-[8px] font-medium text-center leading-tight transition-colors duration-300 ${isSelected ? colors.text : 'text-white/60 group-hover:text-white/80'}`}>
          {component.name.split(' ').slice(0, 2).join(' ')}
        </span>
      </div>
      
      {/* Glow effect when selected */}
      {isSelected && (
        <div 
          className={`absolute inset-0 animate-pulse opacity-30 ${colors.bg}`}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            filter: "blur(8px)"
          }}
        />
      )}
    </button>
  )
}

// Detail Panel component
function DetailPanel({ 
  component, 
  onClose 
}: { 
  component: typeof computerComponents[0] | null
  onClose: () => void 
}) {
  if (!component) return null
  
  const Icon = component.icon
  const colorMap: Record<string, { bg: string, border: string, text: string, accent: string }> = {
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", accent: "from-cyan-500/20" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", accent: "from-amber-500/20" },
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", accent: "from-blue-500/20" },
    teal: { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-400", accent: "from-teal-500/20" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", accent: "from-purple-500/20" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400", accent: "from-pink-500/20" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", accent: "from-orange-500/20" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", accent: "from-emerald-500/20" },
    sky: { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-400", accent: "from-sky-500/20" },
    rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", accent: "from-rose-500/20" }
  }
  
  const colors = colorMap[component.color] || colorMap.cyan

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl border ${colors.border} ${colors.bg}
        backdrop-blur-xl animate-in fade-in slide-in-from-right-4 duration-300
      `}
    >
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.accent} to-transparent`} />
      
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
              <Icon className={`h-5 w-5 ${colors.text}`} />
            </div>
            <h3 className={`text-lg font-bold ${colors.text}`}>{component.name}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
            aria-label="Cerrar panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Description */}
        <p className="text-white/90 text-sm mb-3 leading-relaxed">{component.description}</p>
        <p className="text-white/60 text-xs leading-relaxed">{component.details}</p>
        
        {/* Related Topics */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-xs text-white/40 mb-2">Temas relacionados:</p>
          <div className="flex flex-wrap gap-1">
            {relatedTopics.slice(0, 3).map((topic) => (
              <span 
                key={topic.id}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-white/60 text-[10px] hover:bg-white/10 hover:text-white/80 transition-colors cursor-pointer"
              >
                <topic.icon className="h-3 w-3" />
                {topic.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrganizacionSlide() {
  const [selectedComponent, setSelectedComponent] = useState<typeof computerComponents[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'components' | 'table'>('components')

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedComponent) return
    
    const currentIndex = computerComponents.findIndex(c => c.id === selectedComponent.id)
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % computerComponents.length
      setSelectedComponent(computerComponents[nextIndex])
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + computerComponents.length) % computerComponents.length
      setSelectedComponent(computerComponents[prevIndex])
    } else if (e.key === 'Escape') {
      setSelectedComponent(null)
    }
  }, [selectedComponent])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-gradient-to-br from-zinc-950 via-blue-950/30 to-purple-950/20 p-4">
      {/* Header */}
      <div className="text-center mb-3 flex-shrink-0">
        <span className="text-purple-400 font-mono text-xs tracking-widest">05 // ORGANIZACION</span>
        <h2 className="text-2xl font-bold mt-1">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Organizacion del Computador
          </span>
        </h2>
        <p className="text-xs text-white/50 mt-1">Haz clic en los componentes para explorar | Usa las flechas del teclado para navegar</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-2 mb-3 flex-shrink-0">
        <button
          onClick={() => setActiveTab('components')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            activeTab === 'components' 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
          }`}
        >
          Componentes
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            activeTab === 'table' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
          }`}
        >
          Arquitectura vs Organizacion
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-auto">
        {activeTab === 'components' ? (
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {/* Hexagonal Grid */}
            <div className="flex flex-col items-center justify-center">
              <div className="grid grid-cols-5 gap-1">
                {computerComponents.map((component, index) => (
                  <HexagonBlock
                    key={component.id}
                    component={component}
                    isSelected={selectedComponent?.id === component.id}
                    onClick={() => setSelectedComponent(
                      selectedComponent?.id === component.id ? null : component
                    )}
                    index={index}
                  />
                ))}
              </div>
              
              {/* Quick instruction */}
              {!selectedComponent && (
                <div className="mt-4 flex items-center gap-2 text-white/40 text-xs animate-pulse">
                  <ChevronRight className="h-4 w-4" />
                  <span>Selecciona un componente para ver detalles</span>
                </div>
              )}
            </div>

            {/* Detail Panel */}
            <div className="flex flex-col gap-3">
              {selectedComponent ? (
                <DetailPanel 
                  component={selectedComponent} 
                  onClose={() => setSelectedComponent(null)} 
                />
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                  <h4 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-cyan-400" />
                    El "Como" funciona dentro
                  </h4>
                  <div className="space-y-2">
                    {relatedTopics.map((topic) => (
                      <div 
                        key={topic.id}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <div className="p-1.5 rounded-md bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-colors">
                          <topic.icon className="h-3 w-3 text-cyan-400" />
                        </div>
                        <span className="text-xs text-white/70 group-hover:text-white/90 transition-colors">{topic.label}</span>
                        <ChevronRight className="h-3 w-3 text-white/30 ml-auto group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Attribution */}
              <div className="text-[10px] text-white/30 text-right">
                Enmanuel Santos Diaz 25-1544
              </div>
            </div>
          </div>
        ) : (
          /* Comparison Table */
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20">
                <div className="p-3 text-xs font-bold text-white/80 border-r border-white/10">Aspecto</div>
                <div className="p-3 text-xs font-bold text-center border-r border-white/10">
                  <span className="text-cyan-400">Arquitectura</span>
                  <span className="block text-[10px] text-white/50 font-normal">El "Que"</span>
                </div>
                <div className="p-3 text-xs font-bold text-center">
                  <span className="text-purple-400">Organizacion</span>
                  <span className="block text-[10px] text-white/50 font-normal">El "Como"</span>
                </div>
              </div>
              
              {/* Table Body */}
              {comparisonData.map((row, index) => (
                <div 
                  key={row.aspect}
                  className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'} hover:bg-white/10 transition-colors`}
                >
                  <div className="p-3 text-xs text-white/70 border-r border-white/10 font-medium">{row.aspect}</div>
                  <div className="p-3 text-xs text-cyan-300/80 text-center border-r border-white/10">{row.arquitectura}</div>
                  <div className="p-3 text-xs text-purple-300/80 text-center">{row.organizacion}</div>
                </div>
              ))}
            </div>
            
            {/* Visual analogy */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-lg">📐</span>
                  </div>
                  <span className="text-sm font-semibold text-cyan-400">El Plano</span>
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  La arquitectura define la estructura logica, como un plano arquitectonico que muestra que debe tener el edificio.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <span className="text-lg">🏗️</span>
                  </div>
                  <span className="text-sm font-semibold text-purple-400">La Construccion</span>
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  La organizacion es la implementacion fisica, como los materiales y tecnicas usadas para construir el edificio.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
