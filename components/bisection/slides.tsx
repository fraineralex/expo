"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Search, Database, Brain, Globe, Gamepad2, Server, Cpu, Zap, MessageCircle, ShoppingCart, User, ChevronRight, Play, RotateCcw, Check } from "lucide-react"

/* ─────────────────────────────────────────────
   SLIDE 1 — PORTADA
───────────────────────────────────────────── */
export function CoverSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [dataPoints, setDataPoints] = useState<number[]>([])
  const [highlightedRange, setHighlightedRange] = useState<[number, number]>([0, 100])
  const [foundIndex, setFoundIndex] = useState<number | null>(null)

  useEffect(() => {
    // Generate initial data points
    const points = Array.from({ length: 64 }, (_, i) => i)
    setDataPoints(points)

    if (isPrintMode) return

    let step = 0
    const interval = setInterval(() => {
      step++
      const [start, end] = [0, 64]
      const range = Math.floor(64 / Math.pow(2, step))
      const mid = Math.floor((start + end) / 2)
      
      if (range <= 1) {
        setFoundIndex(32)
        clearInterval(interval)
        setTimeout(() => {
          setHighlightedRange([0, 64])
          setFoundIndex(null)
          step = 0
        }, 2000)
        return
      }

      const newStart = step % 2 === 0 ? 0 : 64 - range
      setHighlightedRange([newStart, newStart + range])
    }, 800)

    return () => clearInterval(interval)
  }, [isPrintMode])

  const members = ["Frainer", "Enmanuel", "Christopher"]

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-indigo-100/40 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full px-16 flex items-center gap-16 z-10">
        {/* Left content */}
        <div className="flex-1 space-y-8">
          {/* University info */}
          <div className="space-y-1">
            <div className="text-blue-600 font-medium text-sm tracking-wide uppercase">
              Universidad Iberoamericana (UNIBE)
            </div>
            <div className="text-slate-500 text-sm">
              Metodos Matematicos &middot; Prof. Nehomar Lezama
            </div>
          </div>

          {/* Main title */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              El Metodo de la
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Biseccion
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Como las computadoras reducen problemas dividiendo el espacio de busqueda
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>

          {/* Team members */}
          <div className="flex gap-3 pt-4">
            {members.map((name) => (
              <div
                key={name}
                className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-slate-200 text-slate-700 font-medium text-sm hover:shadow-md transition-shadow"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Right visualization */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Data reduction visualization */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-4 font-medium">
                Reduccion del espacio de busqueda
              </div>
              <div className="grid grid-cols-8 gap-1.5">
                {dataPoints.map((point, i) => {
                  const isInRange = i >= highlightedRange[0] && i < highlightedRange[1]
                  const isFound = foundIndex === i
                  return (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-md transition-all duration-300 ${
                        isFound
                          ? "bg-green-500 scale-125 shadow-lg shadow-green-200"
                          : isInRange
                          ? "bg-blue-500 shadow-sm"
                          : "bg-slate-200"
                      }`}
                    />
                  )
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>64 elementos</span>
                <span className="text-blue-600 font-medium">
                  {highlightedRange[1] - highlightedRange[0]} activos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 2 — BISECCION VS BINARY SEARCH
───────────────────────────────────────────── */
export function BisectionVsBinarySlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  
  // Bisection state
  const [bisectionInterval, setBisectionInterval] = useState<[number, number]>([1, 5])
  const [bisectionMid, setBisectionMid] = useState(3)
  
  // Binary search state
  const sortedArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
  const target = 23
  const [searchRange, setSearchRange] = useState<[number, number]>([0, 9])
  const [searchMid, setSearchMid] = useState(4)
  const [found, setFound] = useState(false)

  const f = (x: number) => x * x - 6 // f(x) = x² - 6, root ≈ 2.449

  const startSimulation = useCallback(() => {
    setIsRunning(true)
    setStep(0)
    setBisectionInterval([1, 5])
    setBisectionMid(3)
    setSearchRange([0, 9])
    setSearchMid(4)
    setFound(false)
  }, [])

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setStep(0)
    setBisectionInterval([1, 5])
    setBisectionMid(3)
    setSearchRange([0, 9])
    setSearchMid(4)
    setFound(false)
  }, [])

  useEffect(() => {
    if (!isRunning || isPrintMode) return

    const interval = setInterval(() => {
      setStep((s) => {
        const newStep = s + 1
        
        // Bisection logic
        setBisectionInterval(([a, b]) => {
          const mid = (a + b) / 2
          setBisectionMid(mid)
          if (f(mid) < 0) return [mid, b]
          return [a, mid]
        })

        // Binary search logic
        setSearchRange(([low, high]) => {
          const mid = Math.floor((low + high) / 2)
          setSearchMid(mid)
          if (sortedArray[mid] === target) {
            setFound(true)
            setIsRunning(false)
            return [mid, mid]
          }
          if (sortedArray[mid] < target) return [mid + 1, high]
          return [low, mid - 1]
        })

        if (newStep >= 4) {
          setIsRunning(false)
          setFound(true)
        }

        return newStep
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [isRunning, isPrintMode])

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden p-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-3">
          Biseccion <span className="text-blue-500">=</span> Binary Search
        </h2>
        <p className="text-lg text-slate-600">
          El Metodo de Biseccion es la version matematica continua de Binary Search
        </p>
      </div>

      {/* Main content - two sides */}
      <div className="flex-1 flex gap-8">
        {/* Left side - Bisection */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">f</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Metodo de Biseccion</h3>
              <p className="text-xs text-slate-500">Funciones continuas</p>
            </div>
          </div>

          {/* Function visualization */}
          <div className="flex-1 relative bg-slate-50 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-2">f(x) = x² - 6 | Buscando raiz</div>
            
            {/* Simple interval visualization */}
            <div className="relative h-32 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 400 120">
                {/* Axis */}
                <line x1="40" y1="100" x2="360" y2="100" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="40" y1="10" x2="40" y2="100" stroke="#cbd5e1" strokeWidth="2" />
                
                {/* Curve approximation */}
                <path
                  d="M 40 80 Q 120 120 200 100 Q 280 80 360 20"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                />
                
                {/* Interval markers */}
                <line
                  x1={40 + (bisectionInterval[0] - 1) * 80}
                  y1="10"
                  x2={40 + (bisectionInterval[0] - 1) * 80}
                  y2="100"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                <line
                  x1={40 + (bisectionInterval[1] - 1) * 80}
                  y1="10"
                  x2={40 + (bisectionInterval[1] - 1) * 80}
                  y2="100"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                
                {/* Midpoint */}
                <circle
                  cx={40 + (bisectionMid - 1) * 80}
                  cy="100"
                  r="8"
                  fill="#3b82f6"
                  className="transition-all duration-500"
                />
                
                {/* Root indicator */}
                <circle cx="156" cy="100" r="4" fill="#22c55e" />
              </svg>
            </div>

            {/* Interval info */}
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-slate-600">a = {bisectionInterval[0].toFixed(2)}</span>
              <span className="font-semibold text-blue-600">m = {bisectionMid.toFixed(3)}</span>
              <span className="text-slate-600">b = {bisectionInterval[1].toFixed(2)}</span>
            </div>
          </div>

          {/* Properties */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="bg-purple-50 rounded-lg p-2 text-center">
              <div className="text-purple-600 font-medium">Divide</div>
              <div className="text-slate-600">Intervalos</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-2 text-center">
              <div className="text-purple-600 font-medium">Busca</div>
              <div className="text-slate-600">Raices</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-2 text-center">
              <div className="text-purple-600 font-medium">Usa</div>
              <div className="text-slate-600">Funciones</div>
            </div>
          </div>
        </div>

        {/* Center connector */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">=</span>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
          <div className="text-xs text-slate-500 text-center max-w-20">
            Misma logica
          </div>
        </div>

        {/* Right side - Binary Search */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Binary Search</h3>
              <p className="text-xs text-slate-500">Datos ordenados</p>
            </div>
          </div>

          {/* Array visualization */}
          <div className="flex-1 bg-slate-50 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-2">Array ordenado | Buscando: {target}</div>
            
            <div className="flex gap-1 justify-center mt-8">
              {sortedArray.map((val, i) => {
                const isInRange = i >= searchRange[0] && i <= searchRange[1]
                const isMid = i === searchMid
                const isTarget = found && val === target
                
                return (
                  <div
                    key={i}
                    className={`w-9 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                      isTarget
                        ? "bg-green-500 text-white scale-110 shadow-lg"
                        : isMid
                        ? "bg-blue-500 text-white scale-105 shadow-md"
                        : isInRange
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-200 text-slate-400 opacity-50"
                    }`}
                  >
                    {val}
                  </div>
                )
              })}
            </div>

            {/* Index markers */}
            <div className="flex gap-1 justify-center mt-2">
              {sortedArray.map((_, i) => (
                <div key={i} className="w-9 text-center text-xs text-slate-400">
                  {i}
                </div>
              ))}
            </div>

            {/* Range info */}
            <div className="mt-6 flex justify-between text-sm">
              <span className="text-slate-600">low = {searchRange[0]}</span>
              <span className="font-semibold text-blue-600">mid = {searchMid}</span>
              <span className="text-slate-600">high = {searchRange[1]}</span>
            </div>
          </div>

          {/* Properties */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-blue-600 font-medium">Divide</div>
              <div className="text-slate-600">Listas</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-blue-600 font-medium">Busca</div>
              <div className="text-slate-600">Elementos</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <div className="text-blue-600 font-medium">Usa</div>
              <div className="text-slate-600">Datos ordenados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="px-6 py-2.5 bg-blue-500 text-white rounded-full font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          Iniciar
        </button>
        <button
          onClick={resetSimulation}
          className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-full font-medium flex items-center gap-2 hover:bg-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </button>
      </div>

      {/* Step indicator */}
      <div className="absolute bottom-4 right-6 text-sm text-slate-500">
        Iteracion: {step}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 3 — FRAINER: INSTAGRAM SEARCH
───────────────────────────────────────────── */
const instagramUsers = [
  "alex_photo", "anna_travels", "bob_dev", "carlos_music", "diana_fit",
  "emma_cook", "felix_art", "frainer_dev", "gina_style", "henry_code",
  "iris_nature", "jake_sports", "karen_books", "leo_gaming", "maya_dance",
  "nick_tech"
].sort()

export function InstagramSearchSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [searchQuery] = useState("frainer_dev")
  const [currentRange, setCurrentRange] = useState<[number, number]>([0, instagramUsers.length - 1])
  const [midIndex, setMidIndex] = useState(Math.floor(instagramUsers.length / 2))
  const [found, setFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [iterations, setIterations] = useState(0)
  const [discarded, setDiscarded] = useState(0)

  const startSearch = useCallback(() => {
    setIsSearching(true)
    setCurrentRange([0, instagramUsers.length - 1])
    setMidIndex(Math.floor(instagramUsers.length / 2))
    setFound(false)
    setIterations(0)
    setDiscarded(0)
  }, [])

  const resetSearch = useCallback(() => {
    setIsSearching(false)
    setCurrentRange([0, instagramUsers.length - 1])
    setMidIndex(Math.floor(instagramUsers.length / 2))
    setFound(false)
    setIterations(0)
    setDiscarded(0)
  }, [])

  useEffect(() => {
    if (!isSearching || found || isPrintMode) return

    const timeout = setTimeout(() => {
      setCurrentRange(([low, high]) => {
        const mid = Math.floor((low + high) / 2)
        setMidIndex(mid)
        setIterations((i) => i + 1)

        const currentUser = instagramUsers[mid]
        
        if (currentUser === searchQuery) {
          setFound(true)
          setIsSearching(false)
          return [mid, mid]
        }

        if (currentUser < searchQuery) {
          setDiscarded((d) => d + (mid - low + 1))
          return [mid + 1, high]
        } else {
          setDiscarded((d) => d + (high - mid + 1))
          return [low, mid - 1]
        }
      })
    }, 1200)

    return () => clearTimeout(timeout)
  }, [isSearching, found, currentRange, isPrintMode, searchQuery])

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-50 via-white to-pink-50 relative overflow-hidden">
      {/* Left panel - Instagram-style interface */}
      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Busqueda de Usuario</h3>
            <p className="text-sm text-slate-500">Frainer &middot; Instagram</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-6">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <span className="text-slate-700 font-medium">{searchQuery}</span>
          </div>
        </div>

        {/* User list */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <span className="text-sm text-slate-500">{instagramUsers.length} usuarios ordenados alfabeticamente</span>
          </div>
          <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto">
            {instagramUsers.map((user, i) => {
              const isInRange = i >= currentRange[0] && i <= currentRange[1]
              const isMid = i === midIndex && isSearching
              const isFound = found && user === searchQuery

              return (
                <div
                  key={user}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                    isFound
                      ? "bg-green-100 border-2 border-green-500"
                      : isMid
                      ? "bg-pink-100 border-2 border-pink-500 scale-[1.02]"
                      : isInRange
                      ? "bg-slate-50"
                      : "opacity-30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                    isFound ? "bg-green-500" : isMid ? "bg-pink-500" : "bg-gradient-to-br from-purple-400 to-pink-400"
                  }`}>
                    {user[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">@{user}</div>
                    <div className="text-xs text-slate-500">Usuario verificado</div>
                  </div>
                  {isFound && <Check className="w-5 h-5 text-green-500" />}
                  {isMid && !isFound && (
                    <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                      Comparando
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right panel - Metrics */}
      <div className="w-80 bg-white border-l border-slate-200 p-6 flex flex-col">
        <h4 className="text-lg font-semibold text-slate-900 mb-6">Metricas de Busqueda</h4>

        <div className="space-y-4 flex-1">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-500">Iteraciones</div>
            <div className="text-3xl font-bold text-slate-900">{iterations}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-500">Usuarios descartados</div>
            <div className="text-3xl font-bold text-pink-500">{discarded}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-500">Rango actual</div>
            <div className="text-xl font-bold text-slate-900">
              [{currentRange[0]} - {currentRange[1]}]
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-500">Eficiencia</div>
            <div className="text-xl font-bold text-green-500">
              O(log n) = {Math.ceil(Math.log2(instagramUsers.length))} max
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Las plataformas sociales usan estructuras de busqueda optimizadas inspiradas en algoritmos de division sucesiva.
        </p>

        <div className="flex gap-2">
          <button
            onClick={startSearch}
            disabled={isSearching}
            className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Buscar
          </button>
          <button
            onClick={resetSearch}
            className="py-2.5 px-4 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 4 — ENMANUEL: AMAZON PRODUCT FILTER
───────────────────────────────────────────── */
const products = [
  { id: 1, name: "Audifonos Basicos", price: 25, img: "🎧" },
  { id: 2, name: "Mouse Inalambrico", price: 45, img: "🖱️" },
  { id: 3, name: "Teclado Mecanico", price: 75, img: "⌨️" },
  { id: 4, name: "Monitor 24 pulgadas", price: 89, img: "🖥️" },
  { id: 5, name: "Webcam HD", price: 95, img: "📷" },
  { id: 6, name: "Auriculares Gaming", price: 110, img: "🎮" },
  { id: 7, name: "SSD 500GB", price: 125, img: "💾" },
  { id: 8, name: "Tablet 10 pulgadas", price: 140, img: "📱" },
  { id: 9, name: "Smartwatch", price: 155, img: "⌚" },
  { id: 10, name: "Camara Digital", price: 180, img: "📸" },
  { id: 11, name: "Drone Mini", price: 220, img: "🚁" },
  { id: 12, name: "Laptop Gaming", price: 350, img: "💻" },
].sort((a, b) => a.price - b.price)

export function AmazonFilterSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const targetRange = { min: 100, max: 150 }
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400])
  const [isFiltering, setIsFiltering] = useState(false)
  const [iterations, setIterations] = useState(0)
  const [step, setStep] = useState(0)

  const startFilter = useCallback(() => {
    setIsFiltering(true)
    setPriceRange([0, 400])
    setIterations(0)
    setStep(0)
  }, [])

  const resetFilter = useCallback(() => {
    setIsFiltering(false)
    setPriceRange([0, 400])
    setIterations(0)
    setStep(0)
  }, [])

  useEffect(() => {
    if (!isFiltering || isPrintMode) return

    const timeout = setTimeout(() => {
      setStep((s) => {
        const newStep = s + 1
        setIterations(newStep)

        // Simulate bisection narrowing down to target range
        setPriceRange(([min, max]) => {
          const mid = (min + max) / 2
          
          if (newStep >= 4) {
            setIsFiltering(false)
            return [targetRange.min, targetRange.max]
          }

          if (mid < targetRange.min) {
            return [mid, max]
          } else if (mid > targetRange.max) {
            return [min, mid]
          }
          return [targetRange.min, targetRange.max]
        })

        return newStep
      })
    }, 1000)

    return () => clearTimeout(timeout)
  }, [isFiltering, step, isPrintMode])

  const visibleProducts = products.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  )

  const matchingProducts = products.filter(
    (p) => p.price >= targetRange.min && p.price <= targetRange.max
  )

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-50 via-white to-orange-50 relative overflow-hidden">
      {/* Left panel - E-commerce interface */}
      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Filtro de Productos</h3>
            <p className="text-sm text-slate-500">Enmanuel &middot; Amazon</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Rango de precio objetivo:</span>
            <span className="font-semibold text-orange-600">
              ${targetRange.min} - ${targetRange.max}
            </span>
          </div>
          <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all duration-500"
              style={{
                width: `${((priceRange[1] - priceRange[0]) / 400) * 100}%`,
                marginLeft: `${(priceRange[0] / 400) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-400">
            <span>${priceRange[0].toFixed(0)}</span>
            <span>${priceRange[1].toFixed(0)}</span>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 overflow-hidden">
          <div className="grid grid-cols-3 gap-3 max-h-[380px] overflow-y-auto">
            {products.map((product) => {
              const isVisible = product.price >= priceRange[0] && product.price <= priceRange[1]
              const isMatch = product.price >= targetRange.min && product.price <= targetRange.max

              return (
                <div
                  key={product.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                    !isVisible
                      ? "opacity-20 scale-95 border-transparent"
                      : isMatch && !isFiltering
                      ? "border-green-500 bg-green-50 scale-[1.02]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="text-3xl mb-2">{product.img}</div>
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {product.name}
                  </div>
                  <div className={`text-lg font-bold ${isMatch ? "text-green-600" : "text-orange-500"}`}>
                    ${product.price}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right panel - Metrics */}
      <div className="w-80 bg-white border-l border-slate-200 p-6 flex flex-col">
        <h4 className="text-lg font-semibold text-slate-900 mb-6">Metricas de Filtrado</h4>

        <div className="space-y-4 flex-1">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-500">Iteraciones</div>
            <div className="text-3xl font-bold text-slate-900">{iterations}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-500">Productos visibles</div>
            <div className="text-3xl font-bold text-orange-500">{visibleProducts.length}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-500">Productos descartados</div>
            <div className="text-3xl font-bold text-slate-400">
              {products.length - visibleProducts.length}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-sm text-slate-500">Coincidencias</div>
            <div className="text-3xl font-bold text-green-500">{matchingProducts.length}</div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Los sistemas de ecommerce reducen drasticamente el numero de elementos analizados usando divisiones sucesivas.
        </p>

        <div className="flex gap-2">
          <button
            onClick={startFilter}
            disabled={isFiltering}
            className="flex-1 py-2.5 bg-gradient-to-r from-orange-400 to-yellow-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Filtrar
          </button>
          <button
            onClick={resetFilter}
            className="py-2.5 px-4 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 5 — CHRISTOPHER: WHATSAPP + APPLICATIONS
───────────────────────────────────────────── */
const messages = [
  { id: 1, date: "2024-01-05", text: "Feliz ano nuevo!", sender: "other" },
  { id: 2, date: "2024-01-15", text: "Como va el proyecto?", sender: "me" },
  { id: 3, date: "2024-02-10", text: "Reunion manana a las 10", sender: "other" },
  { id: 4, date: "2024-02-28", text: "Entregamos el codigo", sender: "me" },
  { id: 5, date: "2024-03-15", text: "Excelente presentacion!", sender: "other" },
  { id: 6, date: "2024-04-01", text: "Nuevo semestre comienza", sender: "me" },
  { id: 7, date: "2024-04-20", text: "Proyecto de biseccion", sender: "other" },
  { id: 8, date: "2024-05-05", text: "Practicando el metodo", sender: "me" },
]

const applications = [
  { icon: Database, name: "Bases de Datos", desc: "Indices B-Tree" },
  { icon: Brain, name: "Inteligencia Artificial", desc: "Optimizacion" },
  { icon: Globe, name: "Motores de Busqueda", desc: "Indexacion web" },
  { icon: Cpu, name: "Machine Learning", desc: "Hiperparametros" },
  { icon: Gamepad2, name: "Videojuegos", desc: "Deteccion colisiones" },
  { icon: Server, name: "Sistemas Operativos", desc: "Gestion memoria" },
]

export function WhatsAppSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const targetDate = "2024-03-15"
  const [currentRange, setCurrentRange] = useState<[number, number]>([0, messages.length - 1])
  const [midIndex, setMidIndex] = useState(Math.floor(messages.length / 2))
  const [found, setFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [iterations, setIterations] = useState(0)

  const startSearch = useCallback(() => {
    setIsSearching(true)
    setCurrentRange([0, messages.length - 1])
    setMidIndex(Math.floor(messages.length / 2))
    setFound(false)
    setIterations(0)
  }, [])

  const resetSearch = useCallback(() => {
    setIsSearching(false)
    setCurrentRange([0, messages.length - 1])
    setMidIndex(Math.floor(messages.length / 2))
    setFound(false)
    setIterations(0)
  }, [])

  useEffect(() => {
    if (!isSearching || found || isPrintMode) return

    const timeout = setTimeout(() => {
      setCurrentRange(([low, high]) => {
        const mid = Math.floor((low + high) / 2)
        setMidIndex(mid)
        setIterations((i) => i + 1)

        const currentMsg = messages[mid]
        
        if (currentMsg.date === targetDate) {
          setFound(true)
          setIsSearching(false)
          return [mid, mid]
        }

        if (currentMsg.date < targetDate) {
          return [mid + 1, high]
        } else {
          return [low, mid - 1]
        }
      })
    }, 1200)

    return () => clearTimeout(timeout)
  }, [isSearching, found, currentRange, isPrintMode])

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Busqueda de Mensajes + Aplicaciones</h3>
          <p className="text-sm text-slate-500">Christopher &middot; WhatsApp</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        {/* Left - WhatsApp simulation */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
          <div className="bg-green-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium">Grupo Proyecto</div>
              <div className="text-xs text-white/70">Buscando: {targetDate}</div>
            </div>
          </div>

          <div className="flex-1 p-4 space-y-2 bg-[#e5ddd5] overflow-y-auto">
            {messages.map((msg, i) => {
              const isInRange = i >= currentRange[0] && i <= currentRange[1]
              const isMid = i === midIndex && isSearching
              const isFound = found && msg.date === targetDate

              return (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-xl transition-all duration-500 ${
                      msg.sender === "me"
                        ? "bg-green-100 rounded-br-none"
                        : "bg-white rounded-bl-none"
                    } ${
                      isFound
                        ? "ring-4 ring-green-500 scale-105"
                        : isMid
                        ? "ring-4 ring-blue-500 scale-[1.02]"
                        : !isInRange
                        ? "opacity-30"
                        : ""
                    }`}
                  >
                    <div className="text-sm text-slate-800">{msg.text}</div>
                    <div className="text-xs text-slate-500 mt-1">{msg.date}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <button
              onClick={startSearch}
              disabled={isSearching}
              className="flex-1 py-2 bg-green-500 text-white rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-600 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              Buscar mensaje
            </button>
            <button
              onClick={resetSearch}
              className="py-2 px-4 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right - Applications */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Aplicaciones Reales</h4>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {applications.map((app, i) => (
              <div
                key={app.name}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <app.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-medium text-slate-900 text-sm">{app.name}</div>
                <div className="text-xs text-slate-500">{app.desc}</div>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-500">{iterations}</div>
                <div className="text-xs text-slate-500">Iteraciones</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{messages.length - (currentRange[1] - currentRange[0] + 1)}</div>
                <div className="text-xs text-slate-500">Descartados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">O(log n)</div>
                <div className="text-xs text-slate-500">Complejidad</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center mt-4">
        La busqueda eficiente en grandes volumenes de datos usa estrategias similares a Binary Search
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 6 — CONCLUSION
───────────────────────────────────────────── */
export function ConclusionSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [dataSize, setDataSize] = useState(1024)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isPrintMode) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      let current = 1024
      
      const reduceInterval = setInterval(() => {
        current = Math.floor(current / 2)
        setDataSize(current)
        
        if (current <= 1) {
          clearInterval(reduceInterval)
          setTimeout(() => {
            setDataSize(1024)
            setIsAnimating(false)
          }, 2000)
        }
      }, 400)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPrintMode])

  const blocks = Math.min(dataSize, 64)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden p-12">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="text-center z-10 max-w-4xl">
        <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Dividir un problema en mitades permite
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            encontrar soluciones eficientemente
          </span>
        </h2>

        {/* Animated visualization */}
        <div className="my-12 flex justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200/50">
            <div className="flex items-center justify-center gap-1 flex-wrap max-w-md">
              {Array.from({ length: blocks }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-sm transition-all duration-300 ${
                    dataSize <= 1
                      ? "bg-green-500 scale-150"
                      : "bg-blue-500"
                  }`}
                  style={{
                    opacity: dataSize <= 1 ? 1 : 0.3 + (i / blocks) * 0.7,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <span className={`text-2xl font-bold ${dataSize <= 1 ? "text-green-500" : "text-blue-600"}`}>
                {dataSize <= 1 ? "Encontrado!" : `${dataSize} elementos`}
              </span>
            </div>
          </div>
        </div>

        {/* Connection visual */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-bold text-white">f</span>
            </div>
            <span className="text-sm text-slate-600">Matematicas</span>
          </div>
          <ChevronRight className="w-8 h-8 text-slate-300" />
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-slate-600">Algoritmos</span>
          </div>
          <ChevronRight className="w-8 h-8 text-slate-300" />
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-slate-600">Informatica Moderna</span>
          </div>
        </div>

        {/* Final message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 max-w-2xl mx-auto">
          <p className="text-lg text-slate-700 leading-relaxed">
            El Metodo de Biseccion no solo pertenece a las matematicas;
            <br />
            <span className="font-semibold text-slate-900">
              tambien es uno de los principios fundamentales detras de muchos algoritmos modernos.
            </span>
          </p>
        </div>

        {/* Team footer */}
        <div className="mt-12 flex justify-center gap-4">
          {["Frainer", "Enmanuel", "Christopher"].map((name) => (
            <span
              key={name}
              className="px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 text-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
