"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Search, Database, Brain, Globe, Gamepad2, Server, Cpu, Zap, MessageCircle, ShoppingCart, User, ChevronRight, Play, RotateCcw, Check, Pause, ArrowRight } from "lucide-react"

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
   SLIDE 2 — BISECCION VS BINARY SEARCH (MEJORADO)
───────────────────────────────────────────── */
export function BisectionVsBinarySlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  // Binary search config - 32 elements to have more iterations
  const sortedArray = Array.from({ length: 32 }, (_, i) => i * 3 + 1) // [1, 4, 7, 10, 13, ..., 94]
  const target = 64 // Target value to find
  const targetIndex = sortedArray.indexOf(target) // Should be index 21
  
  // Bisection config - finding sqrt(2) ≈ 1.41421356
  const targetRoot = 1.41421356 // Precision goal: 0.0001
  const f = (x: number) => x * x - 2 // f(x) = x² - 2, root = √2
  
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [message, setMessage] = useState("Presiona 'Iniciar' para comenzar la simulacion")
  
  // Bisection state
  const [bisectionA, setBisectionA] = useState(1)
  const [bisectionB, setBisectionB] = useState(2)
  const [bisectionMid, setBisectionMid] = useState(1.5)
  const [bisectionHistory, setBisectionHistory] = useState<{a: number, b: number, mid: number, fMid: number}[]>([])
  const [bisectionFound, setBisectionFound] = useState(false)
  
  // Binary search state
  const [searchLow, setSearchLow] = useState(0)
  const [searchHigh, setSearchHigh] = useState(31)
  const [searchMid, setSearchMid] = useState(15)
  const [binaryHistory, setBinaryHistory] = useState<{low: number, high: number, mid: number, value: number, comparison: string}[]>([])
  const [binaryFound, setBinaryFound] = useState(false)

  const startSimulation = useCallback(() => {
    setIsRunning(true)
    setStep(0)
    setBisectionA(1)
    setBisectionB(2)
    setBisectionMid(1.5)
    setBisectionHistory([])
    setBisectionFound(false)
    setSearchLow(0)
    setSearchHigh(31)
    setSearchMid(15)
    setBinaryHistory([])
    setBinaryFound(false)
    setMessage("Iniciando busqueda simultanea...")
  }, [])

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setStep(0)
    setBisectionA(1)
    setBisectionB(2)
    setBisectionMid(1.5)
    setBisectionHistory([])
    setBisectionFound(false)
    setSearchLow(0)
    setSearchHigh(31)
    setSearchMid(15)
    setBinaryHistory([])
    setBinaryFound(false)
    setMessage("Presiona 'Iniciar' para comenzar la simulacion")
  }, [])

  useEffect(() => {
    if (!isRunning || isPrintMode) return
    if (bisectionFound && binaryFound) {
      setIsRunning(false)
      setMessage("Ambas busquedas completadas! El mismo principio: dividir a la mitad.")
      return
    }

    const interval = setInterval(() => {
      setStep((s) => {
        const newStep = s + 1
        
        // Bisection logic
        if (!bisectionFound) {
          setBisectionA((prevA) => {
            setBisectionB((prevB) => {
              const mid = (prevA + prevB) / 2
              const fMid = f(mid)
              setBisectionMid(mid)
              
              setBisectionHistory((h) => [...h, { a: prevA, b: prevB, mid, fMid }])
              
              // Check precision
              if (Math.abs(mid - targetRoot) < 0.0001) {
                setBisectionFound(true)
                setMessage(`Biseccion: Raiz encontrada! √2 ≈ ${mid.toFixed(6)}`)
              }
              
              if (fMid < 0) {
                return prevB // keep b
              }
              return mid // new b = mid
            })
            
            const mid = (prevA + bisectionB) / 2
            if (f(mid) < 0) {
              return mid // new a = mid
            }
            return prevA // keep a
          })
        }

        // Binary search logic
        if (!binaryFound) {
          setSearchLow((prevLow) => {
            setSearchHigh((prevHigh) => {
              const mid = Math.floor((prevLow + prevHigh) / 2)
              const value = sortedArray[mid]
              setSearchMid(mid)
              
              let comparison = ""
              if (value === target) {
                comparison = `${value} = ${target} ENCONTRADO!`
                setBinaryFound(true)
                setMessage(`Binary Search: Elemento ${target} encontrado en indice ${mid}!`)
              } else if (value < target) {
                comparison = `${value} < ${target}, buscar derecha`
              } else {
                comparison = `${value} > ${target}, buscar izquierda`
              }
              
              setBinaryHistory((h) => [...h, { low: prevLow, high: prevHigh, mid, value, comparison }])
              
              if (value === target) {
                return mid
              }
              if (value < target) {
                return prevHigh // keep high
              }
              return mid - 1 // new high
            })
            
            const mid = Math.floor((prevLow + searchHigh) / 2)
            const value = sortedArray[mid]
            if (value === target) return mid
            if (value < target) return mid + 1
            return prevLow
          })
        }

        return newStep
      })
    }, 2000) // 2 seconds between iterations for clarity

    return () => clearInterval(interval)
  }, [isRunning, isPrintMode, bisectionFound, binaryFound, bisectionB, searchHigh, sortedArray])

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden p-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Biseccion <span className="text-blue-500">=</span> Binary Search
        </h2>
        <p className="text-slate-600">
          Ambos dividen el espacio de busqueda a la mitad en cada iteracion
        </p>
      </div>

      {/* Message bar */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-center">
        <span className={`font-medium ${bisectionFound && binaryFound ? "text-green-600" : "text-blue-700"}`}>
          {message}
        </span>
        <span className="ml-4 text-slate-500">Iteracion: {step}</span>
      </div>

      {/* Main content - two sides */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left side - Bisection */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">f</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Metodo de Biseccion</h3>
              <p className="text-xs text-slate-500">Buscando √2 (precision 0.0001)</p>
            </div>
            {bisectionFound && <Check className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          {/* Current state */}
          <div className="bg-purple-50 rounded-lg p-3 mb-3">
            <div className="text-xs text-purple-600 font-medium mb-2">Estado Actual:</div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="text-slate-500">a</div>
                <div className="font-mono font-bold text-purple-700">{bisectionA.toFixed(6)}</div>
              </div>
              <div>
                <div className="text-slate-500">mid</div>
                <div className={`font-mono font-bold ${bisectionFound ? "text-green-600" : "text-purple-700"}`}>
                  {bisectionMid.toFixed(6)}
                </div>
              </div>
              <div>
                <div className="text-slate-500">b</div>
                <div className="font-mono font-bold text-purple-700">{bisectionB.toFixed(6)}</div>
              </div>
            </div>
            <div className="mt-2 text-center text-xs text-slate-600">
              f(mid) = {f(bisectionMid).toFixed(6)} | Meta: √2 ≈ 1.414214
            </div>
          </div>

          {/* Interval visualization */}
          <div className="relative h-8 bg-slate-100 rounded-lg mb-3 overflow-hidden">
            <div 
              className="absolute top-0 bottom-0 bg-purple-200 transition-all duration-500"
              style={{
                left: `${((bisectionA - 1) / 1) * 100}%`,
                right: `${((2 - bisectionB) / 1) * 100}%`,
              }}
            />
            <div 
              className={`absolute top-0 bottom-0 w-1 transition-all duration-500 ${bisectionFound ? "bg-green-500" : "bg-purple-600"}`}
              style={{ left: `${((bisectionMid - 1) / 1) * 100}%` }}
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-between px-2 text-xs text-slate-500">
              <span>1.0</span>
              <span>1.5</span>
              <span>2.0</span>
            </div>
          </div>

          {/* History */}
          <div className="flex-1 overflow-y-auto">
            <div className="text-xs text-slate-500 mb-2">Historial de iteraciones:</div>
            <div className="space-y-1">
              {bisectionHistory.map((h, i) => (
                <div key={i} className="bg-slate-50 rounded p-2 text-xs font-mono">
                  <span className="text-purple-600">#{i + 1}</span>
                  {" ["}
                  <span className="text-blue-600">{h.a.toFixed(4)}</span>
                  {", "}
                  <span className="text-blue-600">{h.b.toFixed(4)}</span>
                  {"] → mid="}
                  <span className="font-bold">{h.mid.toFixed(4)}</span>
                  {" f(mid)="}
                  <span className={h.fMid < 0 ? "text-red-500" : "text-green-500"}>
                    {h.fMid.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center connector */}
        <div className="flex flex-col items-center justify-center gap-2 py-8">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">=</span>
          </div>
          <div className="text-xs text-slate-500 text-center max-w-16">
            Misma logica
          </div>
        </div>

        {/* Right side - Binary Search */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Binary Search</h3>
              <p className="text-xs text-slate-500">Buscando valor {target} en 32 elementos</p>
            </div>
            {binaryFound && <Check className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          {/* Current state */}
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <div className="text-xs text-blue-600 font-medium mb-2">Estado Actual:</div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="text-slate-500">low</div>
                <div className="font-mono font-bold text-blue-700">{searchLow}</div>
              </div>
              <div>
                <div className="text-slate-500">mid</div>
                <div className={`font-mono font-bold ${binaryFound ? "text-green-600" : "text-blue-700"}`}>
                  {searchMid}
                </div>
              </div>
              <div>
                <div className="text-slate-500">high</div>
                <div className="font-mono font-bold text-blue-700">{searchHigh}</div>
              </div>
            </div>
            <div className="mt-2 text-center text-xs text-slate-600">
              arr[mid] = {sortedArray[searchMid]} | Buscando: {target}
            </div>
          </div>

          {/* Array visualization */}
          <div className="mb-3">
            <div className="flex gap-0.5 justify-center flex-wrap">
              {sortedArray.map((val, i) => {
                const isInRange = i >= searchLow && i <= searchHigh
                const isMid = i === searchMid
                const isTarget = binaryFound && i === searchMid
                
                return (
                  <div
                    key={i}
                    className={`w-6 h-7 rounded text-xs flex items-center justify-center font-medium transition-all duration-500 ${
                      isTarget
                        ? "bg-green-500 text-white scale-110"
                        : isMid
                        ? "bg-blue-500 text-white scale-105"
                        : isInRange
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-300"
                    }`}
                    title={`Index: ${i}, Value: ${val}`}
                  >
                    {val}
                  </div>
                )
              })}
            </div>
          </div>

          {/* History */}
          <div className="flex-1 overflow-y-auto">
            <div className="text-xs text-slate-500 mb-2">Historial de iteraciones:</div>
            <div className="space-y-1">
              {binaryHistory.map((h, i) => (
                <div key={i} className="bg-slate-50 rounded p-2 text-xs font-mono">
                  <span className="text-blue-600">#{i + 1}</span>
                  {" ["}
                  <span className="text-blue-600">{h.low}</span>
                  {"-"}
                  <span className="text-blue-600">{h.high}</span>
                  {"] mid="}
                  <span className="font-bold">{h.mid}</span>
                  {" → "}
                  <span className={h.comparison.includes("ENCONTRADO") ? "text-green-600 font-bold" : "text-slate-600"}>
                    {h.comparison}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-4">
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
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 3 — FRAINER: INSTAGRAM SEARCH (MEJORADO)
   Busqueda de "fraineralex" letra por letra
───────────────────────────────────────────── */
// Generate 200 users alphabetically sorted for more iterations
const generateUsers = () => {
  const prefixes = [
    "aa", "ab", "ac", "ad", "ae", "af", "ag", "ba", "bb", "bc", "ca", "cb", "cc", 
    "da", "db", "dc", "ea", "eb", "ec", "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr",
    "fra", "fraa", "frab", "frac", "frad", "frae", "frai", "fraib", "fraic", "fraid", "fraie", "fraif", "fraig", "fraih", "fraii", "fraij", "fraik", "frail", "fraim", "frain", "fraine", "frainer", "frainera", "fraineralex",
    "frainerb", "frainerc", "frainerd", "frainere", "frainerf", "frainerg",
    "fras", "frat", "frau", "frav", "fraw", "frax", "fray", "fraz",
    "frb", "frc", "frd", "fre", "frf", "frg", "frh", "fri", "frj", "frk", "frl", "frm", "frn", "fro", "frp", "frq", "frr", "frs", "frt", "fru", "frv", "frw", "frx", "fry", "frz",
    "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
    "ga", "gb", "gc", "gd", "ge", "ha", "hb", "hc", "ia", "ib", "ic",
    "ja", "jb", "ka", "kb", "la", "lb", "ma", "mb", "na", "nb", "oa", "ob",
    "pa", "pb", "qa", "qb", "ra", "rb", "sa", "sb", "ta", "tb", "ua", "ub",
    "va", "vb", "wa", "wb", "xa", "xb", "ya", "yb", "za", "zb"
  ]
  return prefixes.map(p => `${p}_user`).sort()
}

const instagramUsers = generateUsers()
const targetUser = "fraineralex_user"

export function InstagramSearchSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [currentRange, setCurrentRange] = useState<[number, number]>([0, instagramUsers.length - 1])
  const [midIndex, setMidIndex] = useState(Math.floor(instagramUsers.length / 2))
  const [found, setFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [iterations, setIterations] = useState(0)
  const [message, setMessage] = useState("Presiona 'Buscar' para encontrar @fraineralex_user")
  const [searchHistory, setSearchHistory] = useState<{low: number, high: number, mid: number, user: string, comparison: string}[]>([])
  const [currentLetter, setCurrentLetter] = useState("")

  const startSearch = useCallback(() => {
    setIsSearching(true)
    setCurrentRange([0, instagramUsers.length - 1])
    setMidIndex(Math.floor(instagramUsers.length / 2))
    setFound(false)
    setIterations(0)
    setMessage("Iniciando busqueda binaria...")
    setSearchHistory([])
    setCurrentLetter("")
  }, [])

  const resetSearch = useCallback(() => {
    setIsSearching(false)
    setCurrentRange([0, instagramUsers.length - 1])
    setMidIndex(Math.floor(instagramUsers.length / 2))
    setFound(false)
    setIterations(0)
    setMessage("Presiona 'Buscar' para encontrar @fraineralex_user")
    setSearchHistory([])
    setCurrentLetter("")
  }, [])

  useEffect(() => {
    if (!isSearching || found || isPrintMode) return

    const timeout = setTimeout(() => {
      setCurrentRange(([low, high]) => {
        const mid = Math.floor((low + high) / 2)
        setMidIndex(mid)
        setIterations((i) => i + 1)

        const currentUser = instagramUsers[mid]
        
        // Find the differing character position for educational display
        let diffPos = 0
        for (let i = 0; i < Math.min(currentUser.length, targetUser.length); i++) {
          if (currentUser[i] !== targetUser[i]) {
            diffPos = i
            break
          }
          diffPos = i + 1
        }
        setCurrentLetter(targetUser.substring(0, diffPos + 1))
        
        let comparison = ""
        if (currentUser === targetUser) {
          comparison = "ENCONTRADO!"
          setFound(true)
          setIsSearching(false)
          setMessage(`Usuario @fraineralex encontrado en ${iterations + 1} iteraciones!`)
          setSearchHistory((h) => [...h, { low, high, mid, user: currentUser, comparison }])
          return [mid, mid]
        }

        if (currentUser < targetUser) {
          comparison = `"${currentUser}" < "${targetUser}" → buscar DERECHA`
          setMessage(`Comparando: "${currentUser}" es menor, descartamos izquierda`)
          setSearchHistory((h) => [...h, { low, high, mid, user: currentUser, comparison }])
          return [mid + 1, high]
        } else {
          comparison = `"${currentUser}" > "${targetUser}" → buscar IZQUIERDA`
          setMessage(`Comparando: "${currentUser}" es mayor, descartamos derecha`)
          setSearchHistory((h) => [...h, { low, high, mid, user: currentUser, comparison }])
          return [low, mid - 1]
        }
      })
    }, 1800)

    return () => clearTimeout(timeout)
  }, [isSearching, found, currentRange, isPrintMode, iterations])

  // Get visible subset of users around current mid
  const visibleStart = Math.max(0, midIndex - 8)
  const visibleEnd = Math.min(instagramUsers.length, midIndex + 8)
  const visibleUsers = instagramUsers.slice(visibleStart, visibleEnd)

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-50 via-white to-pink-50 relative overflow-hidden">
      {/* Left panel - Instagram-style interface */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Busqueda de Usuario: Binary Search</h3>
            <p className="text-sm text-slate-500">Frainer &middot; Instagram</p>
          </div>
        </div>

        {/* Message bar */}
        <div className={`rounded-xl p-3 mb-4 text-sm ${found ? "bg-green-50 border border-green-200 text-green-700" : "bg-pink-50 border border-pink-200 text-pink-700"}`}>
          {message}
        </div>

        {/* Search target */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <div>
              <span className="text-slate-500">Buscando: </span>
              <span className="font-mono font-bold text-pink-600">@fraineralex_user</span>
            </div>
          </div>
          {currentLetter && (
            <div className="mt-2 text-xs text-slate-500">
              Prefijo coincidente hasta ahora: <span className="font-mono font-bold text-green-600">{currentLetter}</span>
            </div>
          )}
        </div>

        {/* Current range visualization */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Rango actual: [{currentRange[0]} - {currentRange[1]}]</span>
            <span>{currentRange[1] - currentRange[0] + 1} usuarios restantes de {instagramUsers.length}</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-500"
              style={{
                marginLeft: `${(currentRange[0] / instagramUsers.length) * 100}%`,
                width: `${((currentRange[1] - currentRange[0] + 1) / instagramUsers.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* User list visualization */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-100 flex justify-between items-center">
            <span className="text-sm text-slate-500">Usuarios (mostrando alrededor del punto medio)</span>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">Total: {instagramUsers.length}</span>
          </div>
          <div className="flex-1 p-2 space-y-1 overflow-y-auto">
            {visibleUsers.map((user, i) => {
              const actualIndex = visibleStart + i
              const isInRange = actualIndex >= currentRange[0] && actualIndex <= currentRange[1]
              const isMid = actualIndex === midIndex && isSearching
              const isFound = found && user === targetUser

              return (
                <div
                  key={user}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500 ${
                    isFound
                      ? "bg-green-100 border-2 border-green-500 scale-[1.02]"
                      : isMid
                      ? "bg-pink-100 border-2 border-pink-500 scale-[1.02]"
                      : isInRange
                      ? "bg-slate-50"
                      : "opacity-30 bg-slate-100"
                  }`}
                >
                  <div className="text-xs text-slate-400 w-8">[{actualIndex}]</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    isFound ? "bg-green-500" : isMid ? "bg-pink-500" : "bg-gradient-to-br from-purple-400 to-pink-400"
                  }`}>
                    {user[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-sm text-slate-900">@{user}</div>
                  </div>
                  {isFound && <Check className="w-5 h-5 text-green-500" />}
                  {isMid && !isFound && (
                    <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full animate-pulse">
                      Comparando
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right panel - Metrics and History */}
      <div className="w-96 bg-white border-l border-slate-200 p-4 flex flex-col">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Proceso de Busqueda</h4>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-500">Iteraciones</div>
            <div className="text-2xl font-bold text-slate-900">{iterations}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-500">Descartados</div>
            <div className="text-2xl font-bold text-pink-500">
              {instagramUsers.length - (currentRange[1] - currentRange[0] + 1)}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-500">Restantes</div>
            <div className="text-2xl font-bold text-blue-500">
              {currentRange[1] - currentRange[0] + 1}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-500">Max iteraciones</div>
            <div className="text-2xl font-bold text-green-500">
              {Math.ceil(Math.log2(instagramUsers.length))}
            </div>
          </div>
        </div>

        {/* History log */}
        <div className="flex-1 bg-slate-50 rounded-xl p-3 overflow-hidden flex flex-col">
          <div className="text-xs text-slate-500 mb-2 font-medium">Historial de comparaciones:</div>
          <div className="flex-1 overflow-y-auto space-y-1.5">
            {searchHistory.map((h, i) => (
              <div key={i} className={`text-xs p-2 rounded-lg ${h.comparison.includes("ENCONTRADO") ? "bg-green-100" : "bg-white"}`}>
                <div className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">#{i + 1}</span>
                  <span className="text-slate-500">Rango [{h.low}-{h.high}]</span>
                </div>
                <div className="font-mono text-slate-700 mt-1">
                  mid[{h.mid}] = "{h.user}"
                </div>
                <div className={`mt-1 ${h.comparison.includes("ENCONTRADO") ? "text-green-600 font-bold" : "text-slate-600"}`}>
                  {h.comparison}
                </div>
              </div>
            ))}
            {searchHistory.length === 0 && (
              <div className="text-slate-400 text-center py-4">
                El historial aparecera aqui
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
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
   SLIDE 4 — ENMANUEL: AMAZON PRODUCT FILTER (MEJORADO)
   Mas productos y iteraciones visibles
───────────────────────────────────────────── */
// Generate 50 products with prices from $10 to $500
const generateProducts = () => {
  const names = [
    "Cable USB", "Funda Celular", "Cargador", "Auriculares", "Mouse Pad",
    "Hub USB", "Webcam Basica", "Soporte Laptop", "Lampara LED", "Teclado",
    "Mouse", "Monitor Stand", "Microfono", "Audifonos", "SSD 256GB",
    "Memoria RAM", "Cooler", "Fuente Poder", "Ventilador", "Cable HDMI",
    "Router WiFi", "Disco Duro", "Tarjeta SD", "Pendrive", "Adaptador",
    "Tablet Stand", "Ring Light", "Tripode", "Gimbal", "Estabilizador",
    "Webcam HD", "Monitor 22", "Teclado Gaming", "Mouse Gaming", "Headset",
    "SSD 512GB", "GPU Basica", "Procesador", "Motherboard", "Gabinete",
    "Monitor 27", "Laptop Basic", "Laptop Pro", "iMac Mini", "Gaming PC",
    "Workstation", "Server Mini", "NAS Storage", "Impresora", "Escaner"
  ]
  return names.map((name, i) => ({
    id: i + 1,
    name,
    price: Math.round(10 + (i * 10) + Math.random() * 5)
  })).sort((a, b) => a.price - b.price)
}

const products = generateProducts()

export function AmazonFilterSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const targetPrice = 175 // We want to find products around $175
  const [searchLow, setSearchLow] = useState(0)
  const [searchHigh, setSearchHigh] = useState(products.length - 1)
  const [midIndex, setMidIndex] = useState(Math.floor(products.length / 2))
  const [isFiltering, setIsFiltering] = useState(false)
  const [iterations, setIterations] = useState(0)
  const [found, setFound] = useState(false)
  const [message, setMessage] = useState(`Presiona 'Buscar' para encontrar productos cerca de $${targetPrice}`)
  const [searchHistory, setSearchHistory] = useState<{low: number, high: number, mid: number, price: number, comparison: string}[]>([])

  const startFilter = useCallback(() => {
    setIsFiltering(true)
    setSearchLow(0)
    setSearchHigh(products.length - 1)
    setMidIndex(Math.floor(products.length / 2))
    setIterations(0)
    setFound(false)
    setMessage("Iniciando busqueda binaria por precio...")
    setSearchHistory([])
  }, [])

  const resetFilter = useCallback(() => {
    setIsFiltering(false)
    setSearchLow(0)
    setSearchHigh(products.length - 1)
    setMidIndex(Math.floor(products.length / 2))
    setIterations(0)
    setFound(false)
    setMessage(`Presiona 'Buscar' para encontrar productos cerca de $${targetPrice}`)
    setSearchHistory([])
  }, [])

  useEffect(() => {
    if (!isFiltering || found || isPrintMode) return

    const timeout = setTimeout(() => {
      setSearchLow((prevLow) => {
        setSearchHigh((prevHigh) => {
          const mid = Math.floor((prevLow + prevHigh) / 2)
          setMidIndex(mid)
          setIterations((i) => i + 1)

          const currentPrice = products[mid].price
          let comparison = ""
          
          // Check if we're close enough (within $10)
          if (Math.abs(currentPrice - targetPrice) <= 10) {
            comparison = `$${currentPrice} ≈ $${targetPrice} ENCONTRADO!`
            setFound(true)
            setIsFiltering(false)
            setMessage(`Producto encontrado! "${products[mid].name}" a $${currentPrice}`)
            setSearchHistory((h) => [...h, { low: prevLow, high: prevHigh, mid, price: currentPrice, comparison }])
            return mid
          }

          if (currentPrice < targetPrice) {
            comparison = `$${currentPrice} < $${targetPrice} → buscar precios MAYORES`
            setMessage(`$${currentPrice} es menor que $${targetPrice}, descartamos precios bajos`)
            setSearchHistory((h) => [...h, { low: prevLow, high: prevHigh, mid, price: currentPrice, comparison }])
            return prevHigh
          } else {
            comparison = `$${currentPrice} > $${targetPrice} → buscar precios MENORES`
            setMessage(`$${currentPrice} es mayor que $${targetPrice}, descartamos precios altos`)
            setSearchHistory((h) => [...h, { low: prevLow, high: prevHigh, mid, price: currentPrice, comparison }])
            return mid - 1
          }
        })
        
        const mid = Math.floor((prevLow + searchHigh) / 2)
        const currentPrice = products[mid].price
        if (Math.abs(currentPrice - targetPrice) <= 10) return mid
        if (currentPrice < targetPrice) return mid + 1
        return prevLow
      })
    }, 1800)

    return () => clearTimeout(timeout)
  }, [isFiltering, found, searchLow, searchHigh, isPrintMode])

  // Visible products around mid
  const visibleStart = Math.max(0, midIndex - 6)
  const visibleEnd = Math.min(products.length, midIndex + 6)
  const visibleProducts = products.slice(visibleStart, visibleEnd)

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-50 via-white to-orange-50 relative overflow-hidden">
      {/* Left panel - E-commerce interface */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Busqueda de Producto por Precio</h3>
            <p className="text-sm text-slate-500">Enmanuel &middot; Amazon</p>
          </div>
        </div>

        {/* Message bar */}
        <div className={`rounded-xl p-3 mb-4 text-sm ${found ? "bg-green-50 border border-green-200 text-green-700" : "bg-orange-50 border border-orange-200 text-orange-700"}`}>
          {message}
        </div>

        {/* Search target */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Buscando precio cercano a:</span>
            <span className="font-bold text-2xl text-orange-600">${targetPrice}</span>
          </div>
        </div>

        {/* Price range visualization */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Rango: [{searchLow} - {searchHigh}]</span>
            <span>{searchHigh - searchLow + 1} productos restantes de {products.length}</span>
          </div>
          <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden">
            {/* Full range */}
            <div 
              className="absolute top-0 bottom-0 bg-orange-200 transition-all duration-500"
              style={{
                left: `${(searchLow / products.length) * 100}%`,
                width: `${((searchHigh - searchLow + 1) / products.length) * 100}%`
              }}
            />
            {/* Mid pointer */}
            <div 
              className={`absolute top-0 bottom-0 w-1.5 transition-all duration-500 ${found ? "bg-green-500" : "bg-orange-500"}`}
              style={{ left: `${(midIndex / products.length) * 100}%` }}
            />
            {/* Target position (approximate) */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-red-400"
              style={{ left: `${(products.findIndex(p => p.price >= targetPrice) / products.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-400">
            <span>${products[0]?.price}</span>
            <span className="text-red-500">Meta: ${targetPrice}</span>
            <span>${products[products.length - 1]?.price}</span>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 overflow-hidden">
          <div className="text-xs text-slate-500 mb-3">Productos alrededor del punto medio:</div>
          <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[300px]">
            {visibleProducts.map((product, i) => {
              const actualIndex = visibleStart + i
              const isInRange = actualIndex >= searchLow && actualIndex <= searchHigh
              const isMid = actualIndex === midIndex
              const isMatch = found && actualIndex === midIndex

              return (
                <div
                  key={product.id}
                  className={`p-3 rounded-xl border-2 transition-all duration-500 ${
                    !isInRange
                      ? "opacity-25 border-transparent bg-slate-50"
                      : isMatch
                      ? "border-green-500 bg-green-50 scale-[1.02]"
                      : isMid
                      ? "border-orange-500 bg-orange-50 scale-[1.02]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="text-xs text-slate-400 mb-1">[{actualIndex}]</div>
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {product.name}
                  </div>
                  <div className={`text-lg font-bold ${isMatch ? "text-green-600" : isMid ? "text-orange-600" : "text-slate-700"}`}>
                    ${product.price}
                  </div>
                  {isMid && !found && (
                    <div className="text-xs text-orange-600 mt-1 animate-pulse">Comparando...</div>
                  )}
                  {isMatch && (
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                      <Check className="w-3 h-3" /> Encontrado
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right panel - Metrics and History */}
      <div className="w-96 bg-white border-l border-slate-200 p-4 flex flex-col">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Proceso de Busqueda</h4>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-500">Iteraciones</div>
            <div className="text-2xl font-bold text-slate-900">{iterations}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-500">Descartados</div>
            <div className="text-2xl font-bold text-orange-500">
              {products.length - (searchHigh - searchLow + 1)}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-500">Precio actual</div>
            <div className="text-xl font-bold text-blue-500">
              ${products[midIndex]?.price}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-xs text-slate-500">Max iteraciones</div>
            <div className="text-2xl font-bold text-green-500">
              {Math.ceil(Math.log2(products.length))}
            </div>
          </div>
        </div>

        {/* History log */}
        <div className="flex-1 bg-slate-50 rounded-xl p-3 overflow-hidden flex flex-col">
          <div className="text-xs text-slate-500 mb-2 font-medium">Historial de comparaciones:</div>
          <div className="flex-1 overflow-y-auto space-y-1.5">
            {searchHistory.map((h, i) => (
              <div key={i} className={`text-xs p-2 rounded-lg ${h.comparison.includes("ENCONTRADO") ? "bg-green-100" : "bg-white"}`}>
                <div className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold">#{i + 1}</span>
                  <span className="text-slate-500">Rango [{h.low}-{h.high}]</span>
                </div>
                <div className="font-mono text-slate-700 mt-1">
                  mid[{h.mid}] = ${h.price}
                </div>
                <div className={`mt-1 ${h.comparison.includes("ENCONTRADO") ? "text-green-600 font-bold" : "text-slate-600"}`}>
                  {h.comparison}
                </div>
              </div>
            ))}
            {searchHistory.length === 0 && (
              <div className="text-slate-400 text-center py-4">
                El historial aparecera aqui
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={startFilter}
            disabled={isFiltering}
            className="flex-1 py-2.5 bg-gradient-to-r from-orange-400 to-yellow-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Buscar
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
   SLIDE 5 — CHRISTOPHER: WHATSAPP + APPLICATIONS (MEJORADO)
   Mas mensajes y iteraciones visibles
───────────────────────────────────────────── */
// Generate 30 messages across a year for more iterations
const generateMessages = () => {
  const texts = [
    "Feliz ano nuevo!", "Como estas?", "Reunion manana", "OK perfecto",
    "Gracias por la info", "Te llamo luego", "Proyecto aprobado!", "Necesito ayuda",
    "Excelente trabajo", "Confirmo asistencia", "Enviame el archivo", "Recibido",
    "Nos vemos el lunes", "Entregue el informe", "Tengo una duda", "Listo!",
    "Importante: revisar", "Actualice los datos", "Nueva version disponible", "Corregido",
    "Presentacion lista", "Feedback positivo", "Tarea completada", "Recordatorio",
    "Metodo de biseccion", "Practica manana", "Nota del examen", "Aprobamos!",
    "Ultimo dia", "Felices vacaciones"
  ]
  
  const messages = texts.map((text, i) => {
    const month = Math.floor(i / 3) + 1
    const day = (i % 28) + 1
    return {
      id: i + 1,
      date: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      text,
      sender: i % 2 === 0 ? "other" : "me"
    }
  }).sort((a, b) => a.date.localeCompare(b.date))
  
  return messages
}

const messages = generateMessages()
const targetDate = "2024-05-10" // Specific date to find

const applications = [
  { icon: Database, name: "Bases de Datos", desc: "Indices B-Tree" },
  { icon: Brain, name: "Inteligencia Artificial", desc: "Optimizacion" },
  { icon: Globe, name: "Motores de Busqueda", desc: "Indexacion web" },
  { icon: Cpu, name: "Machine Learning", desc: "Hiperparametros" },
  { icon: Gamepad2, name: "Videojuegos", desc: "Deteccion colisiones" },
  { icon: Server, name: "Sistemas Operativos", desc: "Gestion memoria" },
]

export function WhatsAppSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [searchLow, setSearchLow] = useState(0)
  const [searchHigh, setSearchHigh] = useState(messages.length - 1)
  const [midIndex, setMidIndex] = useState(Math.floor(messages.length / 2))
  const [found, setFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [iterations, setIterations] = useState(0)
  const [message, setMessage] = useState(`Presiona 'Buscar' para encontrar mensaje del ${targetDate}`)
  const [searchHistory, setSearchHistory] = useState<{low: number, high: number, mid: number, date: string, comparison: string}[]>([])

  const startSearch = useCallback(() => {
    setIsSearching(true)
    setSearchLow(0)
    setSearchHigh(messages.length - 1)
    setMidIndex(Math.floor(messages.length / 2))
    setFound(false)
    setIterations(0)
    setMessage("Iniciando busqueda binaria por fecha...")
    setSearchHistory([])
  }, [])

  const resetSearch = useCallback(() => {
    setIsSearching(false)
    setSearchLow(0)
    setSearchHigh(messages.length - 1)
    setMidIndex(Math.floor(messages.length / 2))
    setFound(false)
    setIterations(0)
    setMessage(`Presiona 'Buscar' para encontrar mensaje del ${targetDate}`)
    setSearchHistory([])
  }, [])

  useEffect(() => {
    if (!isSearching || found || isPrintMode) return

    const timeout = setTimeout(() => {
      setSearchLow((prevLow) => {
        setSearchHigh((prevHigh) => {
          const mid = Math.floor((prevLow + prevHigh) / 2)
          setMidIndex(mid)
          setIterations((i) => i + 1)

          const currentMsg = messages[mid]
          let comparison = ""
          
          if (currentMsg.date === targetDate) {
            comparison = `${currentMsg.date} = ${targetDate} ENCONTRADO!`
            setFound(true)
            setIsSearching(false)
            setMessage(`Mensaje encontrado: "${currentMsg.text}"`)
            setSearchHistory((h) => [...h, { low: prevLow, high: prevHigh, mid, date: currentMsg.date, comparison }])
            return mid
          }

          if (currentMsg.date < targetDate) {
            comparison = `${currentMsg.date} < ${targetDate} → buscar fechas POSTERIORES`
            setMessage(`${currentMsg.date} es anterior, descartamos mensajes viejos`)
            setSearchHistory((h) => [...h, { low: prevLow, high: prevHigh, mid, date: currentMsg.date, comparison }])
            return prevHigh
          } else {
            comparison = `${currentMsg.date} > ${targetDate} → buscar fechas ANTERIORES`
            setMessage(`${currentMsg.date} es posterior, descartamos mensajes nuevos`)
            setSearchHistory((h) => [...h, { low: prevLow, high: prevHigh, mid, date: currentMsg.date, comparison }])
            return mid - 1
          }
        })
        
        const mid = Math.floor((prevLow + searchHigh) / 2)
        const currentMsg = messages[mid]
        if (currentMsg.date === targetDate) return mid
        if (currentMsg.date < targetDate) return mid + 1
        return prevLow
      })
    }, 1800)

    return () => clearTimeout(timeout)
  }, [isSearching, found, searchLow, searchHigh, isPrintMode])

  // Visible messages around mid
  const visibleStart = Math.max(0, midIndex - 5)
  const visibleEnd = Math.min(messages.length, midIndex + 5)
  const visibleMessages = messages.slice(visibleStart, visibleEnd)

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Busqueda de Mensajes + Aplicaciones</h3>
          <p className="text-sm text-slate-500">Christopher &middot; WhatsApp</p>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left - WhatsApp simulation */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white p-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">Grupo Proyecto</div>
              <div className="text-xs text-white/70">Buscando: {targetDate}</div>
            </div>
            <div className="text-xs bg-white/20 px-2 py-1 rounded">
              {messages.length} msgs
            </div>
          </div>

          {/* Message bar */}
          <div className={`p-2 text-xs ${found ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
            {message}
          </div>

          {/* Range indicator */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Rango [{searchLow} - {searchHigh}]</span>
              <span>{searchHigh - searchLow + 1} restantes</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400 rounded-full transition-all duration-500"
                style={{
                  marginLeft: `${(searchLow / messages.length) * 100}%`,
                  width: `${((searchHigh - searchLow + 1) / messages.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 bg-[#e5ddd5] overflow-y-auto">
            {visibleMessages.map((msg, i) => {
              const actualIndex = visibleStart + i
              const isInRange = actualIndex >= searchLow && actualIndex <= searchHigh
              const isMid = actualIndex === midIndex && isSearching
              const isFound = found && msg.date === targetDate

              return (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 rounded-xl transition-all duration-500 ${
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
                    <div className="text-xs text-slate-400 mb-0.5">[{actualIndex}]</div>
                    <div className="text-sm text-slate-800">{msg.text}</div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      {msg.date}
                      {isMid && !found && <span className="text-blue-600 animate-pulse">Comparando</span>}
                      {isFound && <Check className="w-3 h-3 text-green-500" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Controls */}
          <div className="p-2 bg-white border-t border-slate-200 flex gap-2">
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

        {/* Middle - History */}
        <div className="w-72 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-green-500">{iterations}</div>
                <div className="text-xs text-slate-500">Iteraciones</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">{messages.length - (searchHigh - searchLow + 1)}</div>
                <div className="text-xs text-slate-500">Descartados</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-3 overflow-hidden flex flex-col">
            <div className="text-xs text-slate-500 mb-2 font-medium">Historial:</div>
            <div className="flex-1 overflow-y-auto space-y-1">
              {searchHistory.map((h, i) => (
                <div key={i} className={`text-xs p-2 rounded ${h.comparison.includes("ENCONTRADO") ? "bg-green-100" : "bg-slate-50"}`}>
                  <span className="text-green-600 font-bold">#{i + 1}</span>
                  {" mid["}
                  <span className="font-mono">{h.mid}</span>
                  {"] = "}
                  <span className="font-mono">{h.date}</span>
                  <div className={`text-xs mt-1 ${h.comparison.includes("ENCONTRADO") ? "text-green-600" : "text-slate-500"}`}>
                    {h.comparison.split("→")[1] || h.comparison}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Applications */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Aplicaciones del Binary Search</h4>
          <div className="grid grid-cols-2 gap-2 flex-1">
            {applications.map((app) => (
              <div
                key={app.name}
                className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <app.icon className="w-4 h-4 text-white" />
                </div>
                <div className="font-medium text-slate-900 text-sm">{app.name}</div>
                <div className="text-xs text-slate-500">{app.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
