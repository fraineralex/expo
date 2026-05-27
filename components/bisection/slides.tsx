"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Search, Globe, MessageCircle, ShoppingCart, User, ChevronRight, Play, RotateCcw, Check, Pause, Zap, AlertTriangle, XCircle, ArrowRight } from "lucide-react"

/* ─────────────────────────────────────────────
   SLIDE 1 — PORTADA
───────────────────────────────────────────── */
export function CoverSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [dataPoints, setDataPoints] = useState<number[]>([])
  const [highlightedRange, setHighlightedRange] = useState<[number, number]>([0, 100])
  const [foundIndex, setFoundIndex] = useState<number | null>(null)

  useEffect(() => {
    const points = Array.from({ length: 64 }, (_, i) => i)
    setDataPoints(points)

    if (isPrintMode) return

    let step = 0
    const interval = setInterval(() => {
      step++
      const range = Math.floor(64 / Math.pow(2, step))
      
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

  const members = ["Frainer", "Enmanuel", "Christopher", "Elmer"]

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-indigo-100/40 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full px-16 flex items-center gap-16 z-10">
        <div className="flex-1 space-y-8">
          <div className="space-y-1">
            <div className="text-blue-600 font-medium text-sm tracking-wide uppercase">
              Universidad Iberoamericana (UNIBE)
            </div>
            <div className="text-slate-500 text-sm">
              Metodos Matematicos &middot; Prof. Nehomar Lezama
            </div>
          </div>

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

          <div className="flex gap-3 pt-4 flex-wrap">
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

        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
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
  const sortedArray = Array.from({ length: 64 }, (_, i) => i * 2 + 1)
  const target = 89
  
  const targetRoot = 1.41421356
  const f = (x: number) => x * x - 2
  
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [message, setMessage] = useState("Presiona 'Iniciar' para comenzar")
  
  const [bisectionA, setBisectionA] = useState(1)
  const [bisectionB, setBisectionB] = useState(2)
  const [bisectionMid, setBisectionMid] = useState(1.5)
  const [bisectionFound, setBisectionFound] = useState(false)
  
  const [searchLow, setSearchLow] = useState(0)
  const [searchHigh, setSearchHigh] = useState(63)
  const [searchMid, setSearchMid] = useState(31)
  const [binaryFound, setBinaryFound] = useState(false)

  const startSimulation = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
    setStep(0)
    setBisectionA(1)
    setBisectionB(2)
    setBisectionMid(1.5)
    setBisectionFound(false)
    setSearchLow(0)
    setSearchHigh(63)
    setSearchMid(31)
    setBinaryFound(false)
    setMessage("Iniciando busqueda simultanea...")
  }, [])

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p)
  }, [])

  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setIsPaused(false)
    setStep(0)
    setBisectionA(1)
    setBisectionB(2)
    setBisectionMid(1.5)
    setBisectionFound(false)
    setSearchLow(0)
    setSearchHigh(63)
    setSearchMid(31)
    setBinaryFound(false)
    setMessage("Presiona 'Iniciar' para comenzar")
  }, [])

  useEffect(() => {
    if (!isRunning || isPaused || isPrintMode) return
    if (bisectionFound && binaryFound) {
      setIsRunning(false)
      setMessage("Ambas busquedas completadas! Mismo principio: dividir a la mitad.")
      return
    }

    const interval = setInterval(() => {
      setStep((s) => s + 1)
      
      if (!bisectionFound) {
        const mid = (bisectionA + bisectionB) / 2
        const fMid = f(mid)
        setBisectionMid(mid)
        
        if (Math.abs(mid - targetRoot) < 0.00001) {
          setBisectionFound(true)
          setMessage(`Biseccion: Raiz encontrada! √2 = ${mid.toFixed(8)}`)
        } else if (fMid < 0) {
          setBisectionA(mid)
        } else {
          setBisectionB(mid)
        }
      }

      if (!binaryFound) {
        const mid = Math.floor((searchLow + searchHigh) / 2)
        const value = sortedArray[mid]
        setSearchMid(mid)
        
        if (value === target) {
          setBinaryFound(true)
          setMessage(`Binary Search: Elemento ${target} encontrado en indice ${mid}!`)
        } else if (value < target) {
          setSearchLow(mid + 1)
        } else {
          setSearchHigh(mid - 1)
        }
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [isRunning, isPaused, isPrintMode, bisectionFound, binaryFound, bisectionA, bisectionB, searchLow, searchHigh, sortedArray])

  const graphPoints = []
  for (let x = 1; x <= 2; x += 0.02) {
    graphPoints.push({ x, y: f(x) })
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden p-6">
      <div className="text-center mb-3">
        <h2 className="text-3xl font-bold text-slate-900 mb-1">
          Biseccion <span className="text-blue-500">=</span> Binary Search
        </h2>
        <p className="text-slate-600 text-sm">
          Ambos dividen el espacio de busqueda a la mitad en cada iteracion
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3 text-center">
        <span className={`font-medium ${bisectionFound && binaryFound ? "text-green-600" : "text-blue-700"}`}>
          {message}
        </span>
        <span className="ml-4 text-slate-500">Iteracion: {step}</span>
        {isPaused && <span className="ml-4 text-orange-500 font-medium">PAUSADO</span>}
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">f</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Metodo de Biseccion</h3>
              <p className="text-xs text-slate-500">f(x) = x² - 2, buscando √2</p>
            </div>
            {bisectionFound && <Check className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          <div className="flex-1 relative bg-slate-50 rounded-xl overflow-hidden mb-2">
            <svg viewBox="0 0 200 140" className="w-full h-full">
              <line x1="20" y1="70" x2="190" y2="70" stroke="#e2e8f0" strokeWidth="1" />
              <line x1="20" y1="20" x2="20" y2="120" stroke="#e2e8f0" strokeWidth="1" />
              
              <text x="15" y="73" fontSize="8" fill="#94a3b8" textAnchor="end">0</text>
              <text x="15" y="25" fontSize="8" fill="#94a3b8" textAnchor="end">2</text>
              <text x="15" y="115" fontSize="8" fill="#94a3b8" textAnchor="end">-1</text>
              <text x="20" y="130" fontSize="8" fill="#94a3b8">1.0</text>
              <text x="105" y="130" fontSize="8" fill="#94a3b8">1.5</text>
              <text x="185" y="130" fontSize="8" fill="#94a3b8">2.0</text>
              
              <path
                d={graphPoints.map((p, i) => {
                  const px = 20 + (p.x - 1) * 170
                  const py = 70 - p.y * 25
                  return i === 0 ? `M ${px} ${py}` : `L ${px} ${py}`
                }).join(' ')}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
              />
              
              <rect
                x={20 + (bisectionA - 1) * 170}
                y="20"
                width={(bisectionB - bisectionA) * 170}
                height="100"
                fill="rgba(139, 92, 246, 0.1)"
                className="transition-all duration-500"
              />
              
              <circle
                cx={20 + (bisectionA - 1) * 170}
                cy={70 - f(bisectionA) * 25}
                r="4"
                fill="#ef4444"
                className="transition-all duration-500"
              />
              <text
                x={20 + (bisectionA - 1) * 170}
                y={70 - f(bisectionA) * 25 - 8}
                fontSize="8"
                fill="#ef4444"
                textAnchor="middle"
              >
                a
              </text>
              
              <circle
                cx={20 + (bisectionB - 1) * 170}
                cy={70 - f(bisectionB) * 25}
                r="4"
                fill="#3b82f6"
                className="transition-all duration-500"
              />
              <text
                x={20 + (bisectionB - 1) * 170}
                y={70 - f(bisectionB) * 25 - 8}
                fontSize="8"
                fill="#3b82f6"
                textAnchor="middle"
              >
                b
              </text>
              
              <circle
                cx={20 + (bisectionMid - 1) * 170}
                cy={70 - f(bisectionMid) * 25}
                r="6"
                fill={bisectionFound ? "#22c55e" : "#8b5cf6"}
                className="transition-all duration-500"
              />
              <line
                x1={20 + (bisectionMid - 1) * 170}
                y1={70 - f(bisectionMid) * 25}
                x2={20 + (bisectionMid - 1) * 170}
                y2="70"
                stroke={bisectionFound ? "#22c55e" : "#8b5cf6"}
                strokeWidth="1"
                strokeDasharray="2"
                className="transition-all duration-500"
              />
              <text
                x={20 + (bisectionMid - 1) * 170}
                y={Math.min(70 - f(bisectionMid) * 25 + 15, 85)}
                fontSize="8"
                fill={bisectionFound ? "#22c55e" : "#8b5cf6"}
                textAnchor="middle"
                fontWeight="bold"
              >
                mid
              </text>
              
              <circle cx={20 + (targetRoot - 1) * 170} cy="70" r="3" fill="#22c55e" opacity="0.5" />
            </svg>
          </div>

          <div className="bg-purple-50 rounded-lg p-2">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div>
                <div className="text-slate-500">a</div>
                <div className="font-mono font-bold text-red-600">{bisectionA.toFixed(6)}</div>
              </div>
              <div>
                <div className="text-slate-500">mid</div>
                <div className={`font-mono font-bold ${bisectionFound ? "text-green-600" : "text-purple-700"}`}>
                  {bisectionMid.toFixed(6)}
                </div>
              </div>
              <div>
                <div className="text-slate-500">b</div>
                <div className="font-mono font-bold text-blue-600">{bisectionB.toFixed(6)}</div>
              </div>
              <div>
                <div className="text-slate-500">f(mid)</div>
                <div className={`font-mono font-bold ${f(bisectionMid) < 0 ? "text-red-500" : "text-green-500"}`}>
                  {f(bisectionMid).toFixed(6)}
                </div>
              </div>
            </div>
            <div className="mt-1 text-center text-xs text-slate-600">
              Meta: √2 = 1.41421356...
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 py-8">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">=</span>
          </div>
          <div className="text-xs text-slate-500 text-center">
            Misma<br/>logica
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Binary Search</h3>
              <p className="text-xs text-slate-500">Buscando valor {target} en {sortedArray.length} elementos</p>
            </div>
            {binaryFound && <Check className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          <div className="bg-blue-50 rounded-lg p-2 mb-2">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
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
              <div>
                <div className="text-slate-500">arr[mid]</div>
                <div className={`font-mono font-bold ${sortedArray[searchMid] === target ? "text-green-600" : "text-orange-500"}`}>
                  {sortedArray[searchMid]}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="flex gap-0.5 flex-wrap justify-center p-2">
              {sortedArray.map((val, i) => {
                const isInRange = i >= searchLow && i <= searchHigh
                const isMid = i === searchMid
                const isTarget = binaryFound && i === searchMid
                
                return (
                  <div
                    key={i}
                    className={`w-7 h-8 rounded text-xs flex items-center justify-center font-mono transition-all duration-500 ${
                      isTarget
                        ? "bg-green-500 text-white scale-125 shadow-lg"
                        : isMid
                        ? "bg-blue-500 text-white scale-110"
                        : isInRange
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-300"
                    }`}
                  >
                    {val}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-2 text-center text-sm">
            {binaryFound ? (
              <span className="text-green-600 font-medium">arr[{searchMid}] = {sortedArray[searchMid]} = {target} ENCONTRADO!</span>
            ) : sortedArray[searchMid] < target ? (
              <span className="text-blue-600">arr[{searchMid}] = {sortedArray[searchMid]} {"<"} {target} → buscar DERECHA</span>
            ) : (
              <span className="text-blue-600">arr[{searchMid}] = {sortedArray[searchMid]} {">"} {target} → buscar IZQUIERDA</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-3">
        <button
          onClick={startSimulation}
          disabled={isRunning && !isPaused}
          className="px-6 py-2.5 bg-blue-500 text-white rounded-full font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          Iniciar
        </button>
        <button
          onClick={togglePause}
          disabled={!isRunning || (bisectionFound && binaryFound)}
          className={`px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-colors disabled:opacity-50 ${
            isPaused ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
          }`}
        >
          <Pause className="w-4 h-4" />
          {isPaused ? "Continuar" : "Pausar"}
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
   SLIDE 3 — FRAINER: INSTAGRAM SEARCH
───────────────────────────────────────────── */
const generateUsers = () => {
  const prefixes = [
    "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap",
    "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp",
    "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp",
    "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp",
    "ea", "eb", "ec", "ed", "ee", "ef", "eg", "eh", "ei", "ej", "ek", "el", "em", "en", "eo", "ep",
    "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr",
    "fra", "fraa", "frab", "frac", "frad", "frae", "fraf", "frag", "frah", "frai", "fraib", "fraic", "fraid", "fraie", "fraif",
    "fraig", "fraih", "fraii", "fraij", "fraik", "frail", "fraim", "frain", "fraine", "frainer", "frainera", "fraineralex",
    "frainerb", "frainerc", "frainerd", "frainere", "frainerf", "frainerg", "frainerh", "fraineri", "frainerj",
    "fraio", "fraip", "fraiq", "frair", "frais", "frait", "fraiu", "fraiv", "fraiw", "fraix", "fraiy", "fraiz",
    "fraj", "frak", "fral", "fram", "fran", "frao", "frap", "fraq", "frar", "fras", "frat", "frau", "frav", "fraw", "frax", "fray", "fraz",
    "frb", "frc", "frd", "fre", "frf", "frg", "frh", "fri", "frj", "frk", "frl", "frm", "frn", "fro", "frp", "frq", "frr", "frs", "frt", "fru", "frv", "frw", "frx", "fry", "frz",
    "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
    "ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gi", "gj",
    "ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj",
    "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij",
    "ja", "jb", "jc", "jd", "je", "jf", "jg", "jh", "ji", "jj",
    "ka", "kb", "kc", "kd", "ke", "kf", "kg", "kh", "ki", "kj",
    "la", "lb", "lc", "ld", "le", "lf", "lg", "lh", "li", "lj",
    "ma", "mb", "mc", "md", "me", "mf", "mg", "mh", "mi", "mj",
    "na", "nb", "nc", "nd", "ne", "nf", "ng", "nh", "ni", "nj",
    "oa", "ob", "oc", "od", "oe", "of", "og", "oh", "oi", "oj",
    "pa", "pb", "pc", "pd", "pe", "pf", "pg", "ph", "pi", "pj",
    "qa", "qb", "qc", "qd", "qe", "qf", "qg", "qh", "qi", "qj",
    "ra", "rb", "rc", "rd", "re", "rf", "rg", "rh", "ri", "rj",
    "sa", "sb", "sc", "sd", "se", "sf", "sg", "sh", "si", "sj",
    "ta", "tb", "tc", "td", "te", "tf", "tg", "th", "ti", "tj",
    "ua", "ub", "uc", "ud", "ue", "uf", "ug", "uh", "ui", "uj",
    "va", "vb", "vc", "vd", "ve", "vf", "vg", "vh", "vi", "vj",
    "wa", "wb", "wc", "wd", "we", "wf", "wg", "wh", "wi", "wj",
    "xa", "xb", "xc", "xd", "xe", "xf", "xg", "xh", "xi", "xj",
    "ya", "yb", "yc", "yd", "ye", "yf", "yg", "yh", "yi", "yj",
    "za", "zb", "zc", "zd", "ze", "zf", "zg", "zh", "zi", "zj"
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
  const [isPaused, setIsPaused] = useState(false)
  const [iterations, setIterations] = useState(0)
  const [message, setMessage] = useState("Presiona 'Buscar' para encontrar @fraineralex_user")
  const [currentLetter, setCurrentLetter] = useState("")
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const startSearch = useCallback(() => {
    setIsSearching(true)
    setIsPaused(false)
    setCurrentRange([0, instagramUsers.length - 1])
    setMidIndex(Math.floor(instagramUsers.length / 2))
    setFound(false)
    setIterations(0)
    setMessage("Iniciando busqueda binaria...")
    setCurrentLetter("")
  }, [])

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p)
  }, [])

  const resetSearch = useCallback(() => {
    setIsSearching(false)
    setIsPaused(false)
    setCurrentRange([0, instagramUsers.length - 1])
    setMidIndex(Math.floor(instagramUsers.length / 2))
    setFound(false)
    setIterations(0)
    setMessage("Presiona 'Buscar' para encontrar @fraineralex_user")
    setCurrentLetter("")
  }, [])

  useEffect(() => {
    const midElement = itemRefs.current.get(midIndex)
    if (midElement) {
      midElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [midIndex])

  useEffect(() => {
    if (!isSearching || found || isPaused || isPrintMode) return

    const timeout = setTimeout(() => {
      setCurrentRange(([low, high]) => {
        const mid = Math.floor((low + high) / 2)
        setMidIndex(mid)
        setIterations((i) => i + 1)

        const currentUser = instagramUsers[mid]
        
        let diffPos = 0
        for (let i = 0; i < Math.min(currentUser.length, targetUser.length); i++) {
          if (currentUser[i] !== targetUser[i]) break
          diffPos = i + 1
        }
        setCurrentLetter(targetUser.substring(0, diffPos))
        
        if (currentUser === targetUser) {
          setFound(true)
          setIsSearching(false)
          setMessage(`ENCONTRADO! @fraineralex_user en posicion ${mid}`)
          return [mid, mid]
        }

        if (currentUser < targetUser) {
          setMessage(`"${currentUser.substring(0, 12)}..." < "${targetUser.substring(0, 12)}..." → DERECHA`)
          return [mid + 1, high]
        } else {
          setMessage(`"${currentUser.substring(0, 12)}..." > "${targetUser.substring(0, 12)}..." → IZQUIERDA`)
          return [low, mid - 1]
        }
      })
    }, 2500)

    return () => clearTimeout(timeout)
  }, [isSearching, found, isPaused, currentRange, isPrintMode])

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-50 via-white to-pink-50 relative overflow-hidden p-4">
      <div className="flex-1 flex flex-col mr-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Busqueda de Usuario</h3>
            <p className="text-sm text-slate-500">Frainer &middot; Instagram</p>
          </div>
        </div>

        <div className={`rounded-xl p-3 mb-3 text-sm font-medium ${found ? "bg-green-50 border border-green-200 text-green-700" : "bg-pink-50 border border-pink-200 text-pink-700"}`}>
          {message}
          {isPaused && <span className="ml-2 text-orange-500">| PAUSADO</span>}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="font-mono text-pink-600 font-bold">@fraineralex_user</span>
            </div>
            <div className="text-xs text-slate-500">
              {instagramUsers.length} usuarios totales
            </div>
          </div>
          {currentLetter && (
            <div className="text-sm text-slate-600">
              Prefijo encontrado: <span className="font-mono font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{currentLetter}</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Rango: [{currentRange[0]} - {currentRange[1]}]</span>
            <span className="font-bold text-pink-600">{currentRange[1] - currentRange[0] + 1} restantes</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-700"
              style={{
                left: `${(currentRange[0] / instagramUsers.length) * 100}%`,
                width: `${((currentRange[1] - currentRange[0] + 1) / instagramUsers.length) * 100}%`
              }}
            />
            <div 
              className={`absolute top-0 bottom-0 w-1 transition-all duration-700 ${found ? "bg-green-500" : "bg-yellow-400"}`}
              style={{ left: `${(midIndex / instagramUsers.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-y-auto">
          <div className="p-2">
            {instagramUsers.map((user, i) => {
              const isInRange = i >= currentRange[0] && i <= currentRange[1]
              const isMid = i === midIndex && isSearching
              const isFound = found && user === targetUser

              return (
                <div
                  key={user}
                  ref={(el) => {
                    if (el) itemRefs.current.set(i, el)
                  }}
                  className={`flex items-center gap-3 p-2.5 rounded-xl mb-1 transition-all duration-500 ${
                    isFound
                      ? "bg-green-100 border-2 border-green-500 scale-[1.02]"
                      : isMid
                      ? "bg-pink-100 border-2 border-pink-500 scale-[1.02]"
                      : isInRange
                      ? "bg-slate-50"
                      : "opacity-20 bg-slate-100"
                  }`}
                >
                  <div className="text-xs text-slate-400 w-10 font-mono">[{i}]</div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    isFound ? "bg-green-500" : isMid ? "bg-pink-500" : "bg-gradient-to-br from-purple-400 to-pink-400"
                  }`}>
                    {user[0].toUpperCase()}
                  </div>
                  <div className="flex-1 font-mono text-sm text-slate-900">@{user}</div>
                  {isFound && <Check className="w-5 h-5 text-green-500" />}
                  {isMid && !isFound && (
                    <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full animate-pulse">
                      MID
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-72 flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-3">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Estadisticas</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-pink-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-pink-600">{iterations}</div>
              <div className="text-xs text-slate-500">Iteraciones</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-700">
                {instagramUsers.length - (currentRange[1] - currentRange[0] + 1)}
              </div>
              <div className="text-xs text-slate-500">Descartados</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentRange[1] - currentRange[0] + 1}
              </div>
              <div className="text-xs text-slate-500">Restantes</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.ceil(Math.log2(instagramUsers.length))}
              </div>
              <div className="text-xs text-slate-500">Max iter.</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-3 flex-1">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Comparacion actual</h4>
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500 mb-1">mid[{midIndex}]</div>
            <div className="font-mono text-sm text-slate-900 truncate">
              @{instagramUsers[midIndex]}
            </div>
          </div>
          <div className="text-center my-2 text-slate-400">vs</div>
          <div className="bg-pink-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500 mb-1">Objetivo</div>
            <div className="font-mono text-sm text-pink-600 font-bold truncate">
              @{targetUser}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={startSearch}
            disabled={isSearching && !isPaused}
            className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Buscar
          </button>
          <button
            onClick={togglePause}
            disabled={!isSearching || found}
            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${
              isPaused ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-900"
            }`}
          >
            <Pause className="w-4 h-4" />
            {isPaused ? "Continuar" : "Pausar"}
          </button>
          <button
            onClick={resetSearch}
            className="w-full py-2.5 bg-slate-200 text-slate-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 4 — ELMER: AMAZON PRODUCT FILTER
───────────────────────────────────────────── */
const generateProducts = () => {
  const names = [
    "Cable USB-C", "Funda Silicona", "Cargador 5W", "Auriculares Eco", "Mouse Pad S",
    "Hub USB 2.0", "Webcam 480p", "Soporte Mini", "Lampara USB", "Teclado Basic",
    "Mouse Basico", "Soporte Cel", "Microfono Eco", "Audifonos Eco", "SSD 128GB",
    "RAM 4GB", "Cooler Mini", "Fuente 300W", "Ventilador S", "Cable HDMI 1m",
    "Router N300", "HDD 250GB", "SD Card 16GB", "Pendrive 8GB", "Adaptador VGA",
    "Tablet Stand", "Ring Light S", "Tripode Mini", "Gimbal Basic", "Mic Lavalier",
    "Webcam 720p", "Monitor 19", "Teclado Mem", "Mouse Ergo", "Headset Basic",
    "SSD 256GB", "RAM 8GB", "Fuente 450W", "Cooler RGB", "Cable HDMI 2m",
    "Router AC750", "HDD 500GB", "SD Card 32GB", "Pendrive 32GB", "Hub USB 3.0",
    "Webcam 1080p", "Monitor 22", "Teclado RGB", "Mouse Gaming", "Headset 7.1",
    "SSD 512GB", "RAM 16GB", "Fuente 550W", "AIO Cooler", "Dock Station",
    "Monitor 24 FHD", "Teclado Mech", "Mouse Pro", "Headset Pro", "SSD 1TB",
    "RAM 32GB", "Fuente 650W", "RTX 3050", "Monitor 27 QHD", "Laptop i3",
    "Laptop i5", "Laptop i7", "Laptop Gaming", "iMac 24", "Mac Mini",
    "MacBook Air", "MacBook Pro", "PC Gaming", "Workstation", "Server Mini"
  ]
  return names.map((name, i) => ({
    id: i + 1,
    name,
    price: 15 + i * 8 + Math.round(Math.random() * 5)
  })).sort((a, b) => a.price - b.price)
}

const products = generateProducts()
const targetPrice = 280

export function AmazonFilterSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [searchLow, setSearchLow] = useState(0)
  const [searchHigh, setSearchHigh] = useState(products.length - 1)
  const [midIndex, setMidIndex] = useState(Math.floor(products.length / 2))
  const [isFiltering, setIsFiltering] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [iterations, setIterations] = useState(0)
  const [found, setFound] = useState(false)
  const [message, setMessage] = useState(`Presiona 'Buscar' para encontrar producto cerca de $${targetPrice}`)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const startFilter = useCallback(() => {
    setIsFiltering(true)
    setIsPaused(false)
    setSearchLow(0)
    setSearchHigh(products.length - 1)
    setMidIndex(Math.floor(products.length / 2))
    setIterations(0)
    setFound(false)
    setMessage("Iniciando busqueda binaria por precio...")
  }, [])

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p)
  }, [])

  const resetFilter = useCallback(() => {
    setIsFiltering(false)
    setIsPaused(false)
    setSearchLow(0)
    setSearchHigh(products.length - 1)
    setMidIndex(Math.floor(products.length / 2))
    setIterations(0)
    setFound(false)
    setMessage(`Presiona 'Buscar' para encontrar producto cerca de $${targetPrice}`)
  }, [])

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const itemHeight = 72
      const containerHeight = container.clientHeight
      const scrollTo = midIndex * itemHeight - containerHeight / 2 + itemHeight / 2
      container.scrollTo({ top: Math.max(0, scrollTo), behavior: 'smooth' })
    }
  }, [midIndex])

  useEffect(() => {
    if (!isFiltering || found || isPaused || isPrintMode) return

    const timeout = setTimeout(() => {
      const mid = Math.floor((searchLow + searchHigh) / 2)
      setMidIndex(mid)
      setIterations((i) => i + 1)

      const currentPrice = products[mid].price
      
      if (Math.abs(currentPrice - targetPrice) <= 15) {
        setFound(true)
        setIsFiltering(false)
        setMessage(`ENCONTRADO! "${products[mid].name}" a $${currentPrice}`)
        return
      }

      if (currentPrice < targetPrice) {
        setMessage(`$${currentPrice} < $${targetPrice} → buscar precios MAYORES`)
        setSearchLow(mid + 1)
      } else {
        setMessage(`$${currentPrice} > $${targetPrice} → buscar precios MENORES`)
        setSearchHigh(mid - 1)
      }
    }, 2500)

    return () => clearTimeout(timeout)
  }, [isFiltering, found, isPaused, searchLow, searchHigh, isPrintMode])

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-50 via-white to-orange-50 relative overflow-hidden p-4">
      <div className="flex-1 flex flex-col mr-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Busqueda por Precio</h3>
            <p className="text-sm text-slate-500">Elmer &middot; Amazon</p>
          </div>
        </div>

        <div className={`rounded-xl p-3 mb-3 text-sm font-medium ${found ? "bg-green-50 border border-green-200 text-green-700" : "bg-orange-50 border border-orange-200 text-orange-700"}`}>
          {message}
          {isPaused && <span className="ml-2 text-orange-500">| PAUSADO</span>}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Buscando precio cercano a:</span>
            <span className="font-bold text-2xl text-orange-600">${targetPrice}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">{products.length} productos ordenados por precio</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Rango: [{searchLow} - {searchHigh}]</span>
            <span className="font-bold text-orange-600">{searchHigh - searchLow + 1} restantes</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full transition-all duration-700"
              style={{
                left: `${(searchLow / products.length) * 100}%`,
                width: `${((searchHigh - searchLow + 1) / products.length) * 100}%`
              }}
            />
            <div 
              className={`absolute top-0 bottom-0 w-1 transition-all duration-700 ${found ? "bg-green-500" : "bg-red-500"}`}
              style={{ left: `${(midIndex / products.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-400">
            <span>${products[0]?.price}</span>
            <span className="text-red-500 font-medium">Meta: ${targetPrice}</span>
            <span>${products[products.length - 1]?.price}</span>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-y-auto"
        >
          <div className="p-2">
            {products.map((product, i) => {
              const isInRange = i >= searchLow && i <= searchHigh
              const isMid = i === midIndex && isFiltering
              const isMatch = found && i === midIndex

              return (
                <div
                  key={product.id}
                  className={`flex items-center gap-3 p-3 rounded-xl mb-1 transition-all duration-500 ${
                    isMatch
                      ? "bg-green-100 border-2 border-green-500 scale-[1.02]"
                      : isMid
                      ? "bg-orange-100 border-2 border-orange-500 scale-[1.02]"
                      : isInRange
                      ? "bg-slate-50"
                      : "opacity-20 bg-slate-100"
                  }`}
                >
                  <div className="text-xs text-slate-400 w-8 font-mono">[{i}]</div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                    isMatch ? "bg-green-500" : isMid ? "bg-orange-500" : "bg-gradient-to-br from-orange-300 to-yellow-300"
                  }`}>
                    ${product.price}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{product.name}</div>
                    <div className="text-xs text-slate-500">Precio: ${product.price}</div>
                  </div>
                  {isMatch && <Check className="w-5 h-5 text-green-500" />}
                  {isMid && !found && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full animate-pulse">
                      MID
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-72 flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-3">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Estadisticas</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">{iterations}</div>
              <div className="text-xs text-slate-500">Iteraciones</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-700">
                {products.length - (searchHigh - searchLow + 1)}
              </div>
              <div className="text-xs text-slate-500">Descartados</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-600">
                ${products[midIndex]?.price}
              </div>
              <div className="text-xs text-slate-500">Precio actual</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.ceil(Math.log2(products.length))}
              </div>
              <div className="text-xs text-slate-500">Max iter.</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-3 flex-1">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Comparacion actual</h4>
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500 mb-1">mid[{midIndex}]</div>
            <div className="text-lg font-bold text-slate-900">{products[midIndex]?.name}</div>
            <div className="text-2xl font-bold text-orange-600">${products[midIndex]?.price}</div>
          </div>
          <div className="text-center my-2 text-slate-400">vs</div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500 mb-1">Precio Objetivo</div>
            <div className="text-2xl font-bold text-orange-600">${targetPrice}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={startFilter}
            disabled={isFiltering && !isPaused}
            className="w-full py-2.5 bg-gradient-to-r from-orange-400 to-yellow-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Buscar
          </button>
          <button
            onClick={togglePause}
            disabled={!isFiltering || found}
            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${
              isPaused ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-900"
            }`}
          >
            <Pause className="w-4 h-4" />
            {isPaused ? "Continuar" : "Pausar"}
          </button>
          <button
            onClick={resetFilter}
            className="w-full py-2.5 bg-slate-200 text-slate-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 5 — CHRISTOPHER: WHATSAPP MESSAGE SEARCH
───────────────────────────────────────────── */
const generateMessages = () => {
  const texts = [
    "Feliz ano nuevo!", "Como estas?", "Reunion manana", "OK perfecto",
    "Gracias por la info", "Te llamo luego", "Proyecto aprobado!", "Necesito ayuda",
    "Excelente trabajo", "Confirmo asistencia", "Enviame el archivo", "Recibido",
    "Nos vemos el lunes", "Entregue el informe", "Tengo una duda", "Listo!",
    "Importante: revisar", "Actualice los datos", "Nueva version disponible", "Corregido",
    "Presentacion lista", "Feedback positivo", "Tarea completada", "Recordatorio",
    "Metodo de biseccion", "Practica manana", "Nota del examen", "Aprobamos!",
    "Ultimo dia", "Felices vacaciones", "Nuevo proyecto", "Deadline extendido",
    "Revision completa", "Bug encontrado", "Fix aplicado", "Testing listo",
    "Deploy exitoso", "Cliente satisfecho", "Proxima reunion", "Agenda actualizada",
    "Documentacion lista", "API funcionando", "Frontend completo", "Backend listo",
    "Base de datos ok", "Servidor estable", "Metricas buenas", "Performance ok",
    "Security audit", "Code review done"
  ]
  
  return texts.map((text, i) => {
    const month = Math.floor(i / 5) + 1
    const day = (i % 28) + 1
    return {
      id: i + 1,
      date: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      text,
      sender: i % 2 === 0 ? "other" : "me"
    }
  }).sort((a, b) => a.date.localeCompare(b.date))
}

const messages = generateMessages()
const targetDate = "2024-06-15"

export function WhatsAppSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [searchLow, setSearchLow] = useState(0)
  const [searchHigh, setSearchHigh] = useState(messages.length - 1)
  const [midIndex, setMidIndex] = useState(Math.floor(messages.length / 2))
  const [found, setFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [iterations, setIterations] = useState(0)
  const [statusMessage, setStatusMessage] = useState(`Presiona 'Buscar' para encontrar mensaje del ${targetDate}`)
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const startSearch = useCallback(() => {
    setIsSearching(true)
    setIsPaused(false)
    setSearchLow(0)
    setSearchHigh(messages.length - 1)
    setMidIndex(Math.floor(messages.length / 2))
    setFound(false)
    setIterations(0)
    setStatusMessage("Iniciando busqueda binaria por fecha...")
  }, [])

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p)
  }, [])

  const resetSearch = useCallback(() => {
    setIsSearching(false)
    setIsPaused(false)
    setSearchLow(0)
    setSearchHigh(messages.length - 1)
    setMidIndex(Math.floor(messages.length / 2))
    setFound(false)
    setIterations(0)
    setStatusMessage(`Presiona 'Buscar' para encontrar mensaje del ${targetDate}`)
  }, [])

  useEffect(() => {
    const midElement = itemRefs.current.get(midIndex)
    if (midElement) {
      midElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [midIndex])

  useEffect(() => {
    if (!isSearching || found || isPaused || isPrintMode) return

    const timeout = setTimeout(() => {
      const mid = Math.floor((searchLow + searchHigh) / 2)
      setMidIndex(mid)
      setIterations((i) => i + 1)

      const currentMsg = messages[mid]
      
      if (currentMsg.date === targetDate) {
        setFound(true)
        setIsSearching(false)
        setStatusMessage(`ENCONTRADO! "${currentMsg.text}" del ${currentMsg.date}`)
        return
      }

      if (currentMsg.date < targetDate) {
        setStatusMessage(`${currentMsg.date} < ${targetDate} → buscar fechas POSTERIORES`)
        setSearchLow(mid + 1)
      } else {
        setStatusMessage(`${currentMsg.date} > ${targetDate} → buscar fechas ANTERIORES`)
        setSearchHigh(mid - 1)
      }
    }, 2500)

    return () => clearTimeout(timeout)
  }, [isSearching, found, isPaused, searchLow, searchHigh, isPrintMode])

  return (
    <div className="w-full h-full flex bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden p-4">
      <div className="flex-1 flex flex-col mr-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Busqueda de Mensajes por Fecha</h3>
            <p className="text-sm text-slate-500">Ejemplo Adicional &middot; WhatsApp</p>
          </div>
        </div>

        <div className={`rounded-xl p-3 mb-3 text-sm font-medium ${found ? "bg-green-50 border border-green-200 text-green-700" : "bg-emerald-50 border border-emerald-200 text-emerald-700"}`}>
          {statusMessage}
          {isPaused && <span className="ml-2 text-orange-500">| PAUSADO</span>}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Buscando mensaje del:</span>
            <span className="font-bold text-lg text-green-600 font-mono">{targetDate}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">{messages.length} mensajes ordenados por fecha</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Rango: [{searchLow} - {searchHigh}]</span>
            <span className="font-bold text-green-600">{searchHigh - searchLow + 1} restantes</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-700"
              style={{
                left: `${(searchLow / messages.length) * 100}%`,
                width: `${((searchHigh - searchLow + 1) / messages.length) * 100}%`
              }}
            />
            <div 
              className={`absolute top-0 bottom-0 w-1 transition-all duration-700 ${found ? "bg-green-600" : "bg-blue-500"}`}
              style={{ left: `${(midIndex / messages.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 bg-[#e5ddd5] rounded-2xl shadow-lg overflow-y-auto">
          <div className="p-3 space-y-2">
            {messages.map((msg, i) => {
              const isInRange = i >= searchLow && i <= searchHigh
              const isMid = i === midIndex && isSearching
              const isFound = found && msg.date === targetDate

              return (
                <div
                  key={msg.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(i, el)
                  }}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl transition-all duration-500 ${
                      msg.sender === "me"
                        ? "bg-green-100 rounded-br-none"
                        : "bg-white rounded-bl-none"
                    } ${
                      isFound
                        ? "ring-4 ring-green-500 scale-105"
                        : isMid
                        ? "ring-4 ring-blue-500 scale-[1.02]"
                        : !isInRange
                        ? "opacity-25"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-400 font-mono">[{i}]</span>
                      {isMid && !found && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                          MID
                        </span>
                      )}
                      {isFound && <Check className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="text-sm text-slate-800">{msg.text}</div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">{msg.date}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-72 flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-3">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Estadisticas</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{iterations}</div>
              <div className="text-xs text-slate-500">Iteraciones</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-700">
                {messages.length - (searchHigh - searchLow + 1)}
              </div>
              <div className="text-xs text-slate-500">Descartados</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {searchHigh - searchLow + 1}
              </div>
              <div className="text-xs text-slate-500">Restantes</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {Math.ceil(Math.log2(messages.length))}
              </div>
              <div className="text-xs text-slate-500">Max iter.</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-3 flex-1">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Comparacion actual</h4>
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500 mb-1">mid[{midIndex}]</div>
            <div className="text-sm text-slate-700 mb-1">{messages[midIndex]?.text}</div>
            <div className="text-lg font-bold text-slate-900 font-mono">{messages[midIndex]?.date}</div>
          </div>
          <div className="text-center my-2 text-slate-400">vs</div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500 mb-1">Fecha Objetivo</div>
            <div className="text-lg font-bold text-green-600 font-mono">{targetDate}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={startSearch}
            disabled={isSearching && !isPaused}
            className="w-full py-2.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Buscar
          </button>
          <button
            onClick={togglePause}
            disabled={!isSearching || found}
            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${
              isPaused ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-900"
            }`}
          >
            <Pause className="w-4 h-4" />
            {isPaused ? "Continuar" : "Pausar"}
          </button>
          <button
            onClick={resetSearch}
            className="w-full py-2.5 bg-slate-200 text-slate-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 6 — CHRISTOPHER: VENTAJAS DEL METODO
───────────────────────────────────────────── */
export function AdvantagesSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [demoStep, setDemoStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const startDemo = (demo: string) => {
    setActiveDemo(demo)
    setDemoStep(0)
    setIsRunning(true)
  }

  useEffect(() => {
    if (!isRunning || isPrintMode) return

    const interval = setInterval(() => {
      setDemoStep(s => {
        if (s >= 12) {
          setIsRunning(false)
          return s
        }
        return s + 1
      })
    }, 600)

    return () => clearInterval(interval)
  }, [isRunning, isPrintMode])

  const advantages = [
    {
      id: "simple",
      icon: <Check className="w-6 h-6" />,
      title: "Simple de implementar",
      description: "Solo requiere comparar el punto medio y decidir en que mitad continuar. Pocas lineas de codigo.",
      color: "green"
    },
    {
      id: "guaranteed",
      icon: <Zap className="w-6 h-6" />,
      title: "Convergencia garantizada",
      description: "Si existe una raiz en el intervalo y la funcion es continua, el metodo SIEMPRE la encontrara.",
      color: "blue"
    },
    {
      id: "logarithmic",
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Complejidad O(log n)",
      description: "Reduce el espacio de busqueda a la mitad en cada iteracion. 1 millon de elementos = ~20 pasos.",
      color: "purple"
    },
    {
      id: "robust",
      icon: <Globe className="w-6 h-6" />,
      title: "Robusto y estable",
      description: "No necesita derivadas ni calculos complejos. Funciona con cualquier funcion continua.",
      color: "indigo"
    }
  ]

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden p-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-1">
          Ventajas del Metodo de <span className="text-green-500">Biseccion</span>
        </h2>
        <p className="text-slate-600 text-sm">
          Christopher &middot; Por que este metodo es tan util
        </p>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="flex-1 space-y-3 overflow-auto">
          {advantages.map((a) => (
            <div
              key={a.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-4 transition-all cursor-pointer hover:shadow-md ${
                activeDemo === a.id ? "border-green-400 bg-green-50" : "border-slate-200"
              }`}
              onClick={() => startDemo(a.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                  a.color === "green" ? "bg-green-500" :
                  a.color === "blue" ? "bg-blue-500" :
                  a.color === "purple" ? "bg-purple-500" :
                  "bg-indigo-500"
                }`}>
                  {a.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{a.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{a.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-96 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Demostracion Interactiva</h4>
          
          {activeDemo === "simple" ? (
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-slate-600 mb-3">
                Implementacion en pseudocodigo
              </div>
              
              <div className="flex-1 flex flex-col justify-center font-mono text-xs bg-slate-900 text-green-400 rounded-lg p-3 overflow-auto">
                {demoStep >= 1 && <div className={`transition-opacity ${demoStep >= 1 ? "opacity-100" : "opacity-0"}`}>
                  <span className="text-purple-400">function</span> biseccion(a, b, f):
                </div>}
                {demoStep >= 2 && <div className="ml-4">
                  <span className="text-purple-400">while</span> (b - a) &gt; precision:
                </div>}
                {demoStep >= 3 && <div className="ml-8">
                  mid = (a + b) / 2
                </div>}
                {demoStep >= 4 && <div className="ml-8">
                  <span className="text-purple-400">if</span> f(mid) == 0:
                </div>}
                {demoStep >= 5 && <div className="ml-12">
                  <span className="text-yellow-400">return</span> mid
                </div>}
                {demoStep >= 6 && <div className="ml-8">
                  <span className="text-purple-400">if</span> f(a) * f(mid) &lt; 0:
                </div>}
                {demoStep >= 7 && <div className="ml-12">
                  b = mid
                </div>}
                {demoStep >= 8 && <div className="ml-8">
                  <span className="text-purple-400">else</span>:
                </div>}
                {demoStep >= 9 && <div className="ml-12">
                  a = mid
                </div>}
                {demoStep >= 10 && <div className="ml-4">
                  <span className="text-yellow-400">return</span> mid
                </div>}
                {demoStep >= 11 && <div className="mt-3 text-green-300 border-t border-slate-700 pt-2">
                  // Solo 10 lineas de codigo!
                </div>}
              </div>
            </div>
          ) : activeDemo === "guaranteed" ? (
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-slate-600 mb-3">
                Teorema del Valor Intermedio: Si f es continua y f(a)*f(b) &lt; 0, existe raiz
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <svg viewBox="0 0 200 120" className="w-full h-32 mb-3">
                  {/* Axes */}
                  <line x1="20" y1="60" x2="180" y2="60" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="20" y1="10" x2="20" y2="110" stroke="#94a3b8" strokeWidth="1" />
                  <text x="185" y="63" fontSize="8" fill="#94a3b8">x</text>
                  <text x="12" y="15" fontSize="8" fill="#94a3b8">y</text>
                  
                  {/* Continuous curve crossing zero */}
                  <path 
                    d="M 30 90 Q 60 100 100 60 Q 140 20 170 30" 
                    stroke="#22c55e" 
                    strokeWidth="2.5" 
                    fill="none"
                    className={demoStep >= 1 ? "opacity-100" : "opacity-30"}
                  />
                  
                  {/* Point a */}
                  {demoStep >= 2 && (
                    <>
                      <circle cx="30" cy="90" r="4" fill="#ef4444" />
                      <text x="25" y="105" fontSize="8" fill="#ef4444">a</text>
                      <text x="35" y="95" fontSize="7" fill="#ef4444">f(a)&lt;0</text>
                    </>
                  )}
                  
                  {/* Point b */}
                  {demoStep >= 3 && (
                    <>
                      <circle cx="170" cy="30" r="4" fill="#3b82f6" />
                      <text x="165" y="25" fontSize="8" fill="#3b82f6">b</text>
                      <text x="145" y="28" fontSize="7" fill="#3b82f6">f(b)&gt;0</text>
                    </>
                  )}
                  
                  {/* Root point */}
                  {demoStep >= 5 && (
                    <>
                      <circle cx="100" cy="60" r="5" fill="#22c55e" className="animate-pulse" />
                      <text x="95" y="75" fontSize="8" fill="#22c55e">raiz</text>
                    </>
                  )}
                  
                  {/* Interval narrowing */}
                  {demoStep >= 6 && (
                    <line x1="30" y1="108" x2="170" y2="108" stroke="#f97316" strokeWidth="3" strokeDasharray="none" />
                  )}
                  {demoStep >= 7 && (
                    <line x1="65" y1="108" x2="135" y2="108" stroke="#22c55e" strokeWidth="3" />
                  )}
                  {demoStep >= 8 && (
                    <line x1="82" y1="108" x2="118" y2="108" stroke="#3b82f6" strokeWidth="3" />
                  )}
                </svg>
                
                <div className="text-xs space-y-1 bg-green-50 rounded p-2">
                  {demoStep >= 1 && <div className="text-slate-600">Paso 1: Funcion continua en [a, b]</div>}
                  {demoStep >= 2 && <div className="text-slate-600">Paso 2: f(a) = -3 (negativo, debajo del eje)</div>}
                  {demoStep >= 3 && <div className="text-slate-600">Paso 3: f(b) = +2 (positivo, arriba del eje)</div>}
                  {demoStep >= 4 && <div className="text-slate-600">Paso 4: f(a) * f(b) &lt; 0, hay cambio de signo</div>}
                  {demoStep >= 5 && <div className="text-green-600 font-medium">Por TVI, DEBE existir al menos una raiz!</div>}
                  {demoStep >= 8 && <div className="text-blue-600 font-medium">Cada iteracion reduce el intervalo a la mitad</div>}
                </div>
              </div>
            </div>
          ) : activeDemo === "logarithmic" ? (
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-slate-600 mb-3">
                Comparacion: Busqueda lineal O(n) vs Biseccion O(log n)
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-4">
                  {/* Linear search */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Busqueda Lineal</span>
                      <span className="font-mono">{Math.min(demoStep * 100, 1000)} de 1000 elementos</span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(demoStep * 10, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-red-600 mt-1">
                      {demoStep >= 10 ? "1000 pasos para encontrar el elemento" : `${Math.min(demoStep * 100, 1000)} pasos...`}
                    </div>
                  </div>
                  
                  {/* Binary search */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Biseccion / Binary Search</span>
                      <span className="font-mono">{Math.min(demoStep, 10)} de 10 pasos</span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                        style={{ width: `${Math.min(demoStep * 10, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {demoStep >= 10 ? "Solo 10 pasos! (log2(1000) ≈ 10)" : `${Math.min(demoStep, 10)} pasos...`}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 rounded p-2 text-xs space-y-1">
                  {demoStep >= 3 && <div className="text-slate-600">1,000 elementos = 10 iteraciones</div>}
                  {demoStep >= 5 && <div className="text-slate-600">1,000,000 elementos = 20 iteraciones</div>}
                  {demoStep >= 7 && <div className="text-slate-600">1,000,000,000 elementos = 30 iteraciones</div>}
                  {demoStep >= 10 && <div className="text-blue-600 font-medium">100x mas rapido que busqueda lineal!</div>}
                </div>
              </div>
            </div>
          ) : activeDemo === "robust" ? (
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-slate-600 mb-3">
                No requiere derivadas ni calculos complejos
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-4">
                {/* Newton needs derivative */}
                <div className={`bg-orange-50 rounded-lg p-3 transition-all ${demoStep >= 1 ? "opacity-100" : "opacity-30"}`}>
                  <div className="text-xs font-semibold text-orange-800 mb-1">Newton-Raphson necesita:</div>
                  <div className="font-mono text-xs text-orange-600">
                    {demoStep >= 2 && <div>f(x) = funcion original</div>}
                    {demoStep >= 3 && <div>f&apos;(x) = derivada de f</div>}
                    {demoStep >= 4 && <div>x_n+1 = x_n - f(x_n)/f&apos;(x_n)</div>}
                  </div>
                  {demoStep >= 5 && <div className="text-xs text-orange-700 mt-2">Puede fallar si f&apos;(x) = 0</div>}
                </div>
                
                {/* Bisection is simple */}
                <div className={`bg-green-50 rounded-lg p-3 transition-all ${demoStep >= 6 ? "opacity-100" : "opacity-30"}`}>
                  <div className="text-xs font-semibold text-green-800 mb-1">Biseccion solo necesita:</div>
                  <div className="font-mono text-xs text-green-600">
                    {demoStep >= 7 && <div>f(x) = funcion original</div>}
                    {demoStep >= 8 && <div>Evaluar f(a), f(b), f(mid)</div>}
                    {demoStep >= 9 && <div>Comparar signos</div>}
                  </div>
                  {demoStep >= 10 && <div className="text-xs text-green-700 mt-2">Siempre funciona si f es continua!</div>}
                </div>
                
                {demoStep >= 11 && (
                  <div className="bg-blue-100 rounded-lg p-2 text-xs text-blue-800 text-center font-medium">
                    Biseccion es el metodo mas confiable para empezar
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Haz clic en una ventaja para ver la demostracion
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 7 — VENTAJAS DEL METODO DE BISECCION
───────────────────────────────────────────── */
export function StrengthsSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [activeStrength, setActiveStrength] = useState<string | null>(null)
  
  const strengths = [
    {
      id: "guaranteed",
      icon: <Check className="w-6 h-6" />,
      title: "Convergencia garantizada",
      description: "Si existe una raiz en el intervalo [a, b] y la funcion es continua con signos opuestos en los extremos, el metodo SIEMPRE encontrara la raiz.",
      color: "green",
      detail: "A diferencia de otros metodos que pueden diverger o fallar, la biseccion nunca falla si se cumplen las condiciones iniciales."
    },
    {
      id: "simple",
      icon: <Zap className="w-6 h-6" />,
      title: "Simplicidad de implementacion",
      description: "El algoritmo es muy facil de entender y programar. Solo requiere comparaciones y divisiones por 2.",
      color: "blue",
      detail: "No requiere calcular derivadas ni operaciones complejas, lo que reduce errores de programacion."
    },
    {
      id: "robust",
      icon: <Globe className="w-6 h-6" />,
      title: "Robusto y estable",
      description: "No es sensible a la forma de la funcion ni a valores iniciales problematicos. Funciona bien con funciones dificiles.",
      color: "purple",
      detail: "Metodos como Newton-Raphson pueden fallar con derivadas cercanas a cero, pero la biseccion sigue funcionando."
    },
    {
      id: "predictable",
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Error predecible",
      description: "El error maximo en cada iteracion es conocido: (b-a)/2^n. Podemos calcular exactamente cuantas iteraciones necesitamos.",
      color: "orange",
      detail: "Esto permite planificar el tiempo de ejecucion y garantizar la precision deseada."
    }
  ]

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-green-50 relative overflow-hidden p-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-1">
          Ventajas del Metodo de <span className="text-green-500">Biseccion</span>
        </h2>
        <p className="text-slate-600 text-sm">
          Por que el metodo sigue siendo util a pesar de su simplicidad
        </p>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Lista de ventajas */}
        <div className="flex-1 grid grid-cols-2 gap-4 overflow-auto">
          {strengths.map((s) => (
            <div
              key={s.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-4 transition-all cursor-pointer hover:shadow-md ${
                activeStrength === s.id ? "border-green-400 bg-green-50" : "border-slate-200"
              }`}
              onClick={() => setActiveStrength(activeStrength === s.id ? null : s.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0 ${
                  s.color === "green" ? "bg-green-500" :
                  s.color === "blue" ? "bg-blue-500" :
                  s.color === "purple" ? "bg-purple-500" :
                  "bg-orange-500"
                }`}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm">{s.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{s.description}</p>
                  {activeStrength === s.id && (
                    <div className="mt-2 p-2 bg-green-100 rounded-lg">
                      <p className="text-xs text-green-800">{s.detail}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de comparacion visual */}
        <div className="w-80 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col">
          <h3 className="font-semibold text-slate-900 mb-3 text-center">Comparacion de Metodos</h3>
          
          <div className="flex-1 space-y-4">
            {/* Convergencia */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Garantia de convergencia</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-20 text-slate-500">Biseccion</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }} />
                </div>
                <span className="text-xs text-green-600 font-medium">100%</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-20 text-slate-500">Newton</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "60%" }} />
                </div>
                <span className="text-xs text-yellow-600 font-medium">60%</span>
              </div>
            </div>

            {/* Simplicidad */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Simplicidad</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-20 text-slate-500">Biseccion</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "95%" }} />
                </div>
                <span className="text-xs text-green-600 font-medium">95%</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-20 text-slate-500">Newton</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "40%" }} />
                </div>
                <span className="text-xs text-orange-600 font-medium">40%</span>
              </div>
            </div>

            {/* Robustez */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Robustez</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-20 text-slate-500">Biseccion</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }} />
                </div>
                <span className="text-xs text-green-600 font-medium">90%</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-20 text-slate-500">Newton</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "50%" }} />
                </div>
                <span className="text-xs text-red-600 font-medium">50%</span>
              </div>
            </div>

            {/* Velocidad (donde Newton gana) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Velocidad</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-20 text-slate-500">Biseccion</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "50%" }} />
                </div>
                <span className="text-xs text-yellow-600 font-medium">50%</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-20 text-slate-500">Newton</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }} />
                </div>
                <span className="text-xs text-green-600 font-medium">90%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-800 text-center">
              La biseccion es ideal cuando se prioriza la <strong>confiabilidad</strong> sobre la velocidad
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
  
  /* ─────────────────────────────────────────────
  SLIDE 8 — ENMANUEL: DEBILIDADES DEL METODO
  ───────────────────────────────────────────── */
export function WeaknessesSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [demoStep, setDemoStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const unsortedArray = [23, 8, 45, 12, 67, 3, 89, 34, 56, 21, 78, 5, 90, 17, 42]
  const sortedArrayDemo = [...unsortedArray].sort((a, b) => a - b)
  const targetValue = 34

  const startDemo = (demo: string) => {
    setActiveDemo(demo)
    setDemoStep(0)
    setIsRunning(true)
  }

  useEffect(() => {
    if (!isRunning || isPrintMode) return

    const interval = setInterval(() => {
      setDemoStep(s => {
        if (s >= 10) {
          setIsRunning(false)
          return s
        }
        return s + 1
      })
    }, 800)

    return () => clearInterval(interval)
  }, [isRunning, isPrintMode])

  const weaknesses = [
    {
      id: "sorted",
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Requiere datos ordenados",
      description: "Si aplicamos binary search en una lista desordenada, podemos recorrer infinitamente o saltarnos el elemento correcto.",
      color: "red"
    },
    {
      id: "continuous",
      icon: <XCircle className="w-6 h-6" />,
      title: "Funcion continua requerida",
      description: "El metodo de biseccion matematico requiere que f(a) y f(b) tengan signos opuestos y que la funcion sea continua en el intervalo.",
      color: "orange"
    },
    {
      id: "convergence",
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Convergencia lineal",
      description: "Solo reduce el error a la mitad en cada iteracion. Metodos como Newton-Raphson convergen mas rapido (cuadraticamente).",
      color: "yellow"
    },
    {
      id: "single",
      icon: <Search className="w-6 h-6" />,
      title: "Solo encuentra una raiz",
      description: "Si la funcion tiene multiples raices en el intervalo, solo encontrara una de ellas.",
      color: "blue"
    }
  ]

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-red-50 relative overflow-hidden p-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-1">
          Debilidades del Metodo de <span className="text-red-500">Biseccion</span>
        </h2>
        <p className="text-slate-600 text-sm">
          Enmanuel &middot; Limitaciones y alternativas mas efectivas
        </p>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="flex-1 space-y-3 overflow-auto">
          {weaknesses.map((w) => (
            <div
              key={w.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-4 transition-all cursor-pointer hover:shadow-md ${
                activeDemo === w.id ? "border-red-400 bg-red-50" : "border-slate-200"
              }`}
              onClick={() => startDemo(w.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                  w.color === "red" ? "bg-red-500" :
                  w.color === "orange" ? "bg-orange-500" :
                  w.color === "yellow" ? "bg-yellow-500" :
                  "bg-blue-500"
                }`}>
                  {w.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{w.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{w.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-96 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex flex-col">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Demostracion Interactiva</h4>
          
          {activeDemo === "sorted" ? (
            <div className="flex-1 flex flex-col overflow-auto">
              <div className="text-xs text-slate-600 mb-3">
                Buscando <span className="font-bold text-red-600">{targetValue}</span> en lista desordenada
              </div>
              
              <div className="mb-4">
                <div className="text-xs text-slate-500 mb-2">Lista DESORDENADA - Binary Search falla:</div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {unsortedArray.map((val, i) => {
                    // Simulate 3+ iterations on unsorted array
                    const iteration1Mid = Math.floor(unsortedArray.length / 2) // index 7 = 34
                    const iteration2Low = iteration1Mid + 1 // 34 > target? no, 34 == target but we compare wrongly
                    const iteration2Mid = Math.floor((iteration2Low + unsortedArray.length - 1) / 2)
                    const iteration3Mid = Math.floor((0 + iteration1Mid - 1) / 2)
                    
                    const isMid1 = demoStep >= 1 && demoStep < 3 && i === iteration1Mid
                    const isMid2 = demoStep >= 3 && demoStep < 5 && i === iteration2Mid
                    const isMid3 = demoStep >= 5 && demoStep < 7 && i === iteration3Mid
                    const isEliminated1 = demoStep >= 3 && i < iteration1Mid
                    const isEliminated2 = demoStep >= 5 && i > iteration2Mid
                    const isTarget = val === targetValue
                    const missedTarget = demoStep >= 7 && isTarget
                    
                    return (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded text-xs flex items-center justify-center font-mono transition-all ${
                          isMid1 || isMid2 || isMid3 ? "bg-red-500 text-white scale-110 ring-2 ring-red-300" :
                          missedTarget ? "bg-yellow-400 text-yellow-900 animate-pulse" :
                          isEliminated1 || isEliminated2 ? "bg-slate-200 text-slate-400 opacity-40" :
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {val}
                      </div>
                    )
                  })}
                </div>
                <div className="text-xs space-y-1 bg-slate-50 rounded p-2">
                  {demoStep >= 1 && <div className="text-slate-600">Iter 1: mid[7]={unsortedArray[7]}. {unsortedArray[7]} &gt; {targetValue}? Si, buscar izquierda</div>}
                  {demoStep >= 3 && <div className="text-slate-600">Iter 2: mid[3]={unsortedArray[3]}. {unsortedArray[3]} &gt; {targetValue}? No, buscar derecha</div>}
                  {demoStep >= 5 && <div className="text-slate-600">Iter 3: mid[5]={unsortedArray[5]}. {unsortedArray[5]} &gt; {targetValue}? No, buscar derecha</div>}
                  {demoStep >= 7 && <div className="text-red-600 font-medium">Error! El {targetValue} estaba en posicion 7 pero lo descartamos!</div>}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-2">Lista ORDENADA - Binary Search funciona:</div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {sortedArrayDemo.map((val, i) => {
                    const isTarget = val === targetValue
                    const targetIndex = sortedArrayDemo.indexOf(targetValue)
                    const mid1 = Math.floor(sortedArrayDemo.length / 2)
                    const mid2 = Math.floor((mid1 + 1 + sortedArrayDemo.length - 1) / 2)
                    const mid3 = Math.floor((mid1 + 1 + mid2 - 1) / 2)
                    
                    const isMid1 = demoStep >= 1 && demoStep < 3 && i === mid1
                    const isMid2 = demoStep >= 3 && demoStep < 5 && i === mid2
                    const isMid3 = demoStep >= 5 && demoStep < 7 && i === mid3
                    const foundVal = demoStep >= 8 && isTarget
                    
                    return (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded text-xs flex items-center justify-center font-mono transition-all ${
                          foundVal ? "bg-green-500 text-white scale-110 ring-2 ring-green-300" :
                          isMid1 || isMid2 || isMid3 ? "bg-blue-500 text-white scale-105" :
                          "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {val}
                      </div>
                    )
                  })}
                </div>
                {demoStep >= 8 && (
                  <div className="text-xs text-green-600 font-medium bg-green-50 rounded p-2">
                    Encontrado {targetValue} correctamente en 3 iteraciones!
                  </div>
                )}
              </div>
            </div>
          ) : activeDemo === "continuous" ? (
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-slate-600 mb-3">
                La biseccion requiere que f(a) y f(b) tengan signos opuestos
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                {/* Graph showing discontinuous function */}
                <svg viewBox="0 0 200 120" className="w-full h-32 mb-3">
                  {/* Axes */}
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="20" y1="10" x2="20" y2="100" stroke="#94a3b8" strokeWidth="1" />
                  
                  {/* Discontinuous function - two separate parts */}
                  <path 
                    d="M 30 80 Q 60 60 80 70" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    fill="none"
                    className={demoStep >= 1 ? "opacity-100" : "opacity-30"}
                  />
                  <circle cx="80" cy="70" r="3" fill="white" stroke="#ef4444" strokeWidth="2" 
                    className={demoStep >= 2 ? "opacity-100" : "opacity-0"} />
                  
                  <circle cx="100" cy="40" r="3" fill="#ef4444" 
                    className={demoStep >= 3 ? "opacity-100" : "opacity-0"} />
                  <path 
                    d="M 100 40 Q 130 30 170 50" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    fill="none"
                    className={demoStep >= 4 ? "opacity-100" : "opacity-30"}
                  />
                  
                  {/* Zero line */}
                  <line x1="20" y1="60" x2="180" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                  <text x="185" y="63" fontSize="8" fill="#94a3b8">y=0</text>
                  
                  {/* Discontinuity indicator */}
                  {demoStep >= 5 && (
                    <>
                      <line x1="90" y1="40" x2="90" y2="70" stroke="#f97316" strokeWidth="2" strokeDasharray="3" />
                      <text x="75" y="90" fontSize="7" fill="#f97316">Discontinuidad!</text>
                    </>
                  )}
                </svg>
                
                <div className="text-xs space-y-1 bg-orange-50 rounded p-2">
                  {demoStep >= 1 && <div className="text-slate-600">Paso 1: f(a) = -2 (negativo)</div>}
                  {demoStep >= 2 && <div className="text-slate-600">Paso 2: Funcion se acerca a x=2...</div>}
                  {demoStep >= 3 && <div className="text-slate-600">Paso 3: Salto! La funcion no es continua</div>}
                  {demoStep >= 4 && <div className="text-slate-600">Paso 4: f(b) = 1 (positivo)</div>}
                  {demoStep >= 5 && <div className="text-orange-600 font-medium">Hay cambio de signo pero NO hay raiz real en el intervalo!</div>}
                  {demoStep >= 6 && <div className="text-red-600 font-medium">La biseccion fallaria buscando una raiz que no existe</div>}
                </div>
              </div>
            </div>
          ) : activeDemo === "convergence" ? (
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-slate-600 mb-3">
                Comparacion de velocidad de convergencia
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-4 w-full">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Biseccion (lineal)</span>
                      <span>{Math.min(demoStep, 10)} iteraciones</span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${Math.min(demoStep * 10, 100)}%` }}
                      >
                        {demoStep >= 3 && <span className="text-white text-xs font-mono">{(50 / Math.pow(2, Math.min(demoStep, 10))).toFixed(4)}</span>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Newton-Raphson (cuadratico)</span>
                      <span>{Math.min(Math.ceil(demoStep / 2.5), 4)} iteraciones</span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                        style={{ width: `${Math.min(demoStep * 25, 100)}%` }}
                      >
                        {demoStep >= 2 && <span className="text-white text-xs font-mono">{(50 / Math.pow(4, Math.min(demoStep, 4))).toFixed(6)}</span>}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-yellow-50 rounded p-2 text-xs space-y-1">
                  {demoStep >= 2 && <div className="text-slate-600">Biseccion: error se reduce a la mitad cada iteracion</div>}
                  {demoStep >= 4 && <div className="text-slate-600">Newton: error se eleva al cuadrado (converge mucho mas rapido)</div>}
                  {demoStep >= 6 && <div className="text-green-600 font-medium">Newton alcanza precision en ~4 iteraciones vs ~10 de Biseccion</div>}
                </div>
              </div>
            </div>
          ) : activeDemo === "single" ? (
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-slate-600 mb-3">
                f(x) = x(x-2)(x+2) tiene 3 raices: -2, 0, 2
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                {/* Graph showing function with 3 roots */}
                <svg viewBox="0 0 200 100" className="w-full h-28 mb-3">
                  {/* Axes */}
                  <line x1="20" y1="50" x2="180" y2="50" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="100" y1="10" x2="100" y2="90" stroke="#94a3b8" strokeWidth="1" />
                  
                  {/* Function curve with 3 zeros */}
                  <path 
                    d="M 30 70 Q 50 90 60 50 Q 70 10 100 50 Q 130 90 140 50 Q 150 10 170 30" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    fill="none"
                  />
                  
                  {/* Root markers */}
                  <circle cx="60" cy="50" r="4" fill={demoStep >= 1 ? "#22c55e" : "#94a3b8"} className="transition-all" />
                  <text x="55" y="65" fontSize="8" fill={demoStep >= 1 ? "#22c55e" : "#94a3b8"}>-2</text>
                  
                  <circle cx="100" cy="50" r="4" fill={demoStep >= 3 ? "#f97316" : "#94a3b8"} className="transition-all" />
                  <text x="97" y="65" fontSize="8" fill={demoStep >= 3 ? "#f97316" : "#94a3b8"}>0</text>
                  
                  <circle cx="140" cy="50" r="4" fill={demoStep >= 5 ? "#f97316" : "#94a3b8"} className="transition-all" />
                  <text x="137" y="65" fontSize="8" fill={demoStep >= 5 ? "#f97316" : "#94a3b8"}>2</text>
                  
                  {/* Interval brackets */}
                  {demoStep >= 2 && (
                    <>
                      <line x1="30" y1="85" x2="170" y2="85" stroke="#ef4444" strokeWidth="2" />
                      <line x1="30" y1="80" x2="30" y2="90" stroke="#ef4444" strokeWidth="2" />
                      <line x1="170" y1="80" x2="170" y2="90" stroke="#ef4444" strokeWidth="2" />
                      <text x="85" y="95" fontSize="7" fill="#ef4444">Intervalo [-3, 3]</text>
                    </>
                  )}
                </svg>
                
                <div className="text-xs space-y-1 bg-blue-50 rounded p-2">
                  {demoStep >= 1 && <div className="text-slate-600">La funcion tiene 3 raices: x = -2, x = 0, x = 2</div>}
                  {demoStep >= 2 && <div className="text-slate-600">Aplicamos biseccion en [-3, 3]...</div>}
                  {demoStep >= 3 && <div className="text-slate-600">f(-3) = -15, f(3) = 15, hay cambio de signo</div>}
                  {demoStep >= 4 && <div className="text-slate-600">Biseccion converge hacia UNA raiz (probablemente x=0)</div>}
                  {demoStep >= 5 && <div className="text-orange-600 font-medium">Las raices x=-2 y x=2 fueron ignoradas!</div>}
                  {demoStep >= 6 && <div className="text-blue-600 font-medium">Solucion: Dividir el intervalo y aplicar biseccion multiples veces</div>}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Haz clic en una debilidad para ver la demostracion
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Metodos mas efectivos:</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-sm font-bold text-slate-900">Newton-Raphson</div>
            <div className="text-xs text-slate-500">Convergencia cuadratica</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-sm font-bold text-slate-900">Secante</div>
            <div className="text-xs text-slate-500">No requiere derivada</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-sm font-bold text-slate-900">Regula Falsi</div>
            <div className="text-xs text-slate-500">Combina lo mejor</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SLIDE 7 — CONCLUSION
───────────────────────────────────────────── */
export function ConclusionSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [dataSize, setDataSize] = useState(1024)

  useEffect(() => {
    if (isPrintMode) return

    const interval = setInterval(() => {
      let current = 1024
      
      const reduceInterval = setInterval(() => {
        current = Math.floor(current / 2)
        setDataSize(current)
        
        if (current <= 1) {
          clearInterval(reduceInterval)
          setTimeout(() => {
            setDataSize(1024)
          }, 2000)
        }
      }, 400)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPrintMode])

  const blocks = Math.min(dataSize, 64)
  const members = ["Frainer", "Enmanuel", "Christopher", "Elmer"]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden p-12">
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl" />

      <div className="text-center z-10 max-w-4xl">
        <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Dividir un problema en mitades permite
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            encontrar soluciones eficientemente
          </span>
        </h2>

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

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 max-w-2xl mx-auto">
          <p className="text-lg text-slate-700 leading-relaxed">
            El Metodo de Biseccion no solo pertenece a las matematicas;
            <br />
            <span className="font-semibold text-slate-900">
              tambien es uno de los principios fundamentales detras de muchos algoritmos modernos.
            </span>
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          {members.map((name) => (
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
