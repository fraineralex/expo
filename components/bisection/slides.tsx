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
                      className={`w-6 h-6 rounded-md transition-all duration-300 ${isFound
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
            Misma<br />logica
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
                    className={`w-7 h-8 rounded text-xs flex items-center justify-center font-mono transition-all duration-500 ${isTarget
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
          className={`px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-colors disabled:opacity-50 ${isPaused ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
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
                  className={`flex items-center gap-3 p-2.5 rounded-xl mb-1 transition-all duration-500 ${isFound
                    ? "bg-green-100 border-2 border-green-500 scale-[1.02]"
                    : isMid
                      ? "bg-pink-100 border-2 border-pink-500 scale-[1.02]"
                      : isInRange
                        ? "bg-slate-50"
                        : "opacity-20 bg-slate-100"
                    }`}
                >
                  <div className="text-xs text-slate-400 w-10 font-mono">[{i}]</div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium ${isFound ? "bg-green-500" : isMid ? "bg-pink-500" : "bg-gradient-to-br from-purple-400 to-pink-400"
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
            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${isPaused ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-900"
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
                  className={`flex items-center gap-3 p-3 rounded-xl mb-1 transition-all duration-500 ${isMatch
                    ? "bg-green-100 border-2 border-green-500 scale-[1.02]"
                    : isMid
                      ? "bg-orange-100 border-2 border-orange-500 scale-[1.02]"
                      : isInRange
                        ? "bg-slate-50"
                        : "opacity-20 bg-slate-100"
                    }`}
                >
                  <div className="text-xs text-slate-400 w-8 font-mono">[{i}]</div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${isMatch ? "bg-green-500" : isMid ? "bg-orange-500" : "bg-gradient-to-br from-orange-300 to-yellow-300"
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
            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${isPaused ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-900"
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
                    className={`max-w-[85%] p-3 rounded-xl transition-all duration-500 ${msg.sender === "me"
                      ? "bg-green-100 rounded-br-none"
                      : "bg-white rounded-bl-none"
                      } ${isFound
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
            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${isPaused ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-900"
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
              className={`bg-white rounded-xl shadow-sm border-2 p-4 transition-all cursor-pointer hover:shadow-md ${activeDemo === a.id ? "border-green-400 bg-green-50" : "border-slate-200"
                }`}
              onClick={() => startDemo(a.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${a.color === "green" ? "bg-green-500" :
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
  const [activeStrength, setActiveStrength] = useState<number>(0)

  // Demo states for each advantage
  const [convergenceStep, setConvergenceStep] = useState(0)
  const [codeHighlight, setCodeHighlight] = useState(0)
  const [contextDemo, setContextDemo] = useState(0)
  const [errorCalcN, setErrorCalcN] = useState(5)

  const strengths = [
    {
      title: "Resultado Confiable",
      description: "Si el intervalo inicial es correcto, el metodo reduce el rango paso a paso hasta acercarse a la solucion.",
      color: "bg-emerald-500",
      icon: "01"
    },
    {
      title: "Facil de Implementar",
      description: "Su logica es simple: dividir el intervalo, evaluar y repetir.",
      color: "bg-cyan-500",
      icon: "02"
    },
    {
      title: "Estable en la Ejecucion",
      description: "Funciona de forma estable en distintos tipos de problemas computacionales.",
      color: "bg-violet-500",
      icon: "03"
    },
    {
      title: "Precision Controlable",
      description: "Permite estimar el error y decidir cuantas iteraciones usar.",
      color: "bg-amber-500",
      icon: "04"
    }
  ]

  // Convergence demo - system limit search
  const convergenceSteps = [
    { a: 0, b: 100, m: 50, label: "Buscando limite del sistema...", found: false },
    { a: 50, b: 100, m: 75, label: "El punto critico esta arriba", found: false },
    { a: 50, b: 75, m: 62.5, label: "Reduciendo el rango", found: false },
    { a: 62.5, b: 75, m: 68.75, label: "Acercandose al limite", found: false },
    { a: 68.75, b: 75, m: 71.87, label: "Punto critico encontrado!", found: true },
  ]

  // Code demo
  const codeLines = [
    { code: "def biseccion(f, a, b, tol):", highlight: false },
    { code: "    while (b - a) > tol:", highlight: false },
    { code: "        m = (a + b) / 2", highlight: false },
    { code: "        if f(a) * f(m) < 0:", highlight: false },
    { code: "            b = m", highlight: false },
    { code: "        else:", highlight: false },
    { code: "            a = m", highlight: false },
    { code: "    return m", highlight: false },
  ]

  // Context demos - different applications
  const contexts = [
    {
      name: "Rendimiento",
      icon: "CPU",
      desc: "Encontrar carga maxima de un servidor",
      example: "Buscar cuando el CPU llega al 100%",
      color: "bg-blue-500"
    },
    {
      name: "Temperatura",
      icon: "TEMP",
      desc: "Detectar punto de sobrecalentamiento",
      example: "Buscar temperatura critica del sistema",
      color: "bg-red-500"
    },
    {
      name: "Costo",
      icon: "$",
      desc: "Optimizar gastos de infraestructura",
      example: "Buscar punto de equilibrio financiero",
      color: "bg-green-500"
    },
    {
      name: "Error",
      icon: "ERR",
      desc: "Encontrar tasa de error aceptable",
      example: "Buscar umbral de tolerancia",
      color: "bg-orange-500"
    },
  ]

  useEffect(() => {
    if (activeStrength === 0 && !isPrintMode) {
      const timer = setInterval(() => {
        setConvergenceStep(prev => (prev + 1) % convergenceSteps.length)
      }, 1800)
      return () => clearInterval(timer)
    }
    if (activeStrength === 1 && !isPrintMode) {
      const timer = setInterval(() => {
        setCodeHighlight(prev => (prev + 1) % codeLines.length)
      }, 1200)
      return () => clearInterval(timer)
    }
    if (activeStrength === 2 && !isPrintMode) {
      const timer = setInterval(() => {
        setContextDemo(prev => (prev + 1) % contexts.length)
      }, 2500)
      return () => clearInterval(timer)
    }
  }, [activeStrength, isPrintMode])

  const renderDemo = () => {
    switch (activeStrength) {
      case 0: // Resultado Confiable
        const step = convergenceSteps[convergenceStep]
        const targetPoint = 71.87
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                Buscando el limite del sistema
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-2">
              {/* Visual number line */}
              <div className="relative h-20 bg-slate-50 rounded-xl border border-slate-200 mx-2 mb-4">
                {/* Scale markers */}
                <div className="absolute bottom-2 left-0 w-full flex justify-between px-4 text-xs text-slate-400">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>

                {/* Target indicator */}
                <div
                  className="absolute top-3 h-8 w-1 bg-red-400 rounded"
                  style={{ left: `calc(${targetPoint}% - 2px)` }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-red-500 whitespace-nowrap font-medium">
                    Punto Critico
                  </div>
                </div>

                {/* Search interval */}
                <div
                  className="absolute top-5 h-4 bg-emerald-400/60 rounded transition-all duration-700"
                  style={{
                    left: `${step.a}%`,
                    width: `${step.b - step.a}%`
                  }}
                />

                {/* Midpoint marker */}
                <div
                  className={`absolute top-4 w-3 h-6 rounded transition-all duration-700 ${step.found ? "bg-emerald-600" : "bg-emerald-500"}`}
                  style={{ left: `calc(${step.m}% - 6px)` }}
                />
              </div>

              {/* Step info cards */}
              <div className="grid grid-cols-3 gap-2 mx-2 mb-3">
                <div className="bg-white rounded-lg p-2 border border-slate-200 text-center">
                  <div className="text-xs text-slate-500">Limite Inferior</div>
                  <div className="font-mono font-bold text-slate-800">{step.a}%</div>
                </div>
                <div className={`rounded-lg p-2 border text-center ${step.found ? "bg-emerald-50 border-emerald-300" : "bg-emerald-50/50 border-emerald-200"}`}>
                  <div className="text-xs text-emerald-600">Punto Medio</div>
                  <div className="font-mono font-bold text-emerald-700">{step.m}%</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-slate-200 text-center">
                  <div className="text-xs text-slate-500">Limite Superior</div>
                  <div className="font-mono font-bold text-slate-800">{step.b}%</div>
                </div>
              </div>

              {/* Status message */}
              <div className={`mx-2 p-2 rounded-lg text-center text-sm font-medium ${step.found
                ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                : "bg-slate-100 text-slate-600"
                }`}>
                {step.label}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-1.5 mt-2">
              {convergenceSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === convergenceStep ? "w-6 bg-emerald-500" : "w-1.5 bg-slate-300"
                    }`}
                />
              ))}
            </div>
          </div>
        )

      case 1: // Facil de Implementar
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                Pocas lineas de codigo
              </div>
            </div>

            <div className="flex-1 bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-hidden mx-2">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-500 text-xs ml-2">biseccion.py</span>
              </div>
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  className={`py-1 px-2 rounded transition-all duration-300 flex items-center gap-3 ${i === codeHighlight ? "bg-cyan-500/20" : ""
                    }`}
                >
                  <span className="text-slate-600 w-4 text-right text-xs">{i + 1}</span>
                  <span className={i === codeHighlight ? "text-cyan-300" : "text-slate-400"}>
                    {line.code}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 mx-2 p-3 bg-cyan-50 rounded-xl border border-cyan-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                  8
                </div>
                <div>
                  <p className="text-sm font-medium text-cyan-800">Solo 8 lineas</p>
                  <p className="text-xs text-cyan-600">Sin librerias externas, sin derivadas, sin complicaciones</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 2: // Estable en la Ejecucion
        const ctx = contexts[contextDemo]
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">
                Multiples aplicaciones en software
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-2">
              {/* Context card */}
              <div className={`p-5 rounded-2xl border-2 transition-all duration-500 ${ctx.color === "bg-blue-500" ? "bg-blue-50 border-blue-300" :
                ctx.color === "bg-red-500" ? "bg-red-50 border-red-300" :
                  ctx.color === "bg-green-500" ? "bg-green-50 border-green-300" :
                    "bg-orange-50 border-orange-300"
                }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 ${ctx.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                    {ctx.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">{ctx.name}</h4>
                    <p className="text-sm text-slate-600">{ctx.desc}</p>
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-3 border border-slate-200">
                  <p className="text-sm text-slate-700 text-center">{ctx.example}</p>
                </div>
              </div>

              {/* Context selector */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {contexts.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setContextDemo(i)}
                    className={`p-2 rounded-lg text-center transition-all ${i === contextDemo
                      ? `${c.color} text-white shadow-md`
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    <div className="text-xs font-medium">{c.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 mx-2 p-2 bg-violet-50 rounded-lg border border-violet-200 text-center">
              <p className="text-xs text-violet-700">
                El mismo algoritmo funciona para <strong>cualquier</strong> problema de busqueda
              </p>
            </div>
          </div>
        )

      case 3: // Precision Controlable
        const errorAfterN = (100 / Math.pow(2, errorCalcN)).toFixed(4)
        const precisionPercent = Math.min(100, (errorCalcN / 20) * 100)
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                Mas iteraciones = Mas precision
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-2">
              {/* Formula card */}
              <div className="bg-white rounded-xl p-4 border border-amber-200 text-center mb-4 shadow-sm">
                <p className="text-xs text-slate-500 mb-1">Formula del error maximo</p>
                <p className="text-xl font-mono font-bold text-amber-600">
                  Error ≤ (b - a) / 2<sup>n</sup>
                </p>
              </div>

              {/* Interactive calculator */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-700">Iteraciones (n):</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setErrorCalcN(Math.max(1, errorCalcN - 1))}
                      className="w-8 h-8 bg-amber-200 rounded-lg text-amber-700 font-bold hover:bg-amber-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-xl text-amber-600">{errorCalcN}</span>
                    <button
                      onClick={() => setErrorCalcN(Math.min(20, errorCalcN + 1))}
                      className="w-8 h-8 bg-amber-200 rounded-lg text-amber-700 font-bold hover:bg-amber-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Precision bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Precision</span>
                    <span>{precisionPercent.toFixed(0)}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-300"
                      style={{ width: `${precisionPercent}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 text-center border border-amber-200">
                  <p className="text-xs text-slate-500">Con intervalo inicial [0, 100]:</p>
                  <p className="text-2xl font-mono font-bold text-amber-600 mt-1">
                    Error ≤ {errorAfterN}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    El rango se divide en {Math.pow(2, errorCalcN).toLocaleString()} partes
                  </p>
                </div>
              </div>

              {/* Quick presets */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[5, 10, 15, 20].map(n => (
                  <button
                    key={n}
                    onClick={() => setErrorCalcN(n)}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${errorCalcN === n
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300"
                      }`}
                  >
                    n = {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden p-4">
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          Ventajas del Metodo de <span className="text-emerald-500">Biseccion</span>
        </h2>
        <p className="text-slate-500 text-xs">
          Selecciona cada ventaja para ver una demostracion interactiva
        </p>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left: Advantage cards */}
        <div className="w-60 flex flex-col gap-2">
          {strengths.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStrength(i)}
              className={`text-left p-3 rounded-xl transition-all duration-300 ${activeStrength === i
                ? "bg-white shadow-lg border-2 border-emerald-400 scale-[1.02]"
                : "bg-white/60 border border-slate-200 hover:bg-white hover:shadow-md"
                }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 ${s.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-sm leading-tight">{s.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{s.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Demo area */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 overflow-hidden">
          {renderDemo()}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
  SLIDE 8 — ENMANUEL: DESVENTAJAS DEL METODO
  Versión responsive: no usa anchos fijos grandes,
  mantiene todo dentro del cuadro y adapta textos/animaciones.
───────────────────────────────────────────── */
export function WeaknessesSlide({ isPrintMode = false }: { isPrintMode?: boolean }) {
  const [activeWeakness, setActiveWeakness] = useState(0)
  const [demoStep, setDemoStep] = useState(0)
  const [isRunning, setIsRunning] = useState(!isPrintMode)

  const weaknesses = [
    {
      id: "slow",
      number: "01",
      title: "Convergencia lenta",
      subtitle: "Cada iteración solo reduce el error a la mitad.",
      color: "rose",
      icon: <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />,
      phrase: "Es seguro, pero cuando se requiere mucha precisión puede necesitar demasiadas iteraciones."
    },
    {
      id: "sign",
      number: "02",
      title: "Exige cambio de signo",
      subtitle: "Debe cumplirse f(a) · f(b) < 0.",
      color: "amber",
      icon: <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />,
      phrase: "Si los extremos no tienen signos opuestos, el método no puede garantizar que exista una raíz."
    },
    {
      id: "continuity",
      number: "03",
      title: "No tolera discontinuidades",
      subtitle: "Un salto puede aparentar una raíz falsa.",
      color: "orange",
      icon: <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      phrase: "El cambio de signo solo funciona como garantía si la función es continua en todo el intervalo."
    },
    {
      id: "multiple",
      number: "04",
      title: "Puede ocultar otras raíces",
      subtitle: "Encuentra una solución dentro del intervalo, no todas.",
      color: "sky",
      icon: <Search className="w-4 h-4 sm:w-5 sm:h-5" />,
      phrase: "Si hay varias raíces, se deben separar intervalos y aplicar el método varias veces."
    }
  ]

  const styles = {
    rose: { bg: "bg-rose-500", soft: "bg-rose-50", text: "text-rose-600", border: "border-rose-300", line: "stroke-rose-500", fill: "fill-rose-500" },
    amber: { bg: "bg-amber-500", soft: "bg-amber-50", text: "text-amber-600", border: "border-amber-300", line: "stroke-amber-500", fill: "fill-amber-500" },
    orange: { bg: "bg-orange-500", soft: "bg-orange-50", text: "text-orange-600", border: "border-orange-300", line: "stroke-orange-500", fill: "fill-orange-500" },
    sky: { bg: "bg-sky-500", soft: "bg-sky-50", text: "text-sky-600", border: "border-sky-300", line: "stroke-sky-500", fill: "fill-sky-500" }
  }

  const active = weaknesses[activeWeakness]
  const activeStyle = styles[active.color as keyof typeof styles]

  useEffect(() => {
    if (!isRunning || isPrintMode) return

    const timer = setInterval(() => {
      setDemoStep((step) => (step + 1) % 9)
    }, 950)

    return () => clearInterval(timer)
  }, [isRunning, isPrintMode])

  const resetDemo = () => {
    setDemoStep(0)
    setIsRunning(!isPrintMode)
  }

  const selectWeakness = (index: number) => {
    setActiveWeakness(index)
    setDemoStep(0)
    setIsRunning(!isPrintMode)
  }

  const miniBars = [100, 50, 25, 12.5, 6.25, 3.13, 1.56, 0.78, 0.39]

  const renderDemo = () => {
    if (active.id === "slow") {
      const error = miniBars[demoStep]
      const newtonStep = Math.min(4, Math.ceil((demoStep + 1) / 2))
      return (
        <div className="h-full min-h-0 flex flex-col justify-center gap-3 sm:gap-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 sm:p-3 min-w-0">
              <p className="text-[10px] sm:text-xs text-slate-500">Bisección</p>
              <p className="text-lg sm:text-2xl font-bold text-slate-900 truncate">{demoStep + 1} pasos</p>
              <p className="text-[10px] sm:text-xs text-rose-600">error ≈ {error}%</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 sm:p-3 min-w-0">
              <p className="text-[10px] sm:text-xs text-slate-500">Newton-Raphson</p>
              <p className="text-lg sm:text-2xl font-bold text-slate-900 truncate">{newtonStep} pasos</p>
              <p className="text-[10px] sm:text-xs text-emerald-600">más rápido</p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div>
              <div className="flex justify-between text-[10px] sm:text-xs text-slate-500 mb-1">
                <span>Error por bisección</span>
                <span>{error}%</span>
              </div>
              <div className="h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full transition-all duration-700" style={{ width: `${Math.max(error, 4)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] sm:text-xs text-slate-500 mb-1">
                <span>Avance de Newton</span>
                <span>{Math.min(100, newtonStep * 25)}%</span>
              </div>
              <div className="h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, newtonStep * 25)}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-rose-50 border border-rose-200 p-2 sm:p-3 text-[11px] sm:text-sm text-rose-700 leading-relaxed">
            Para exponer: la bisección es confiable, pero su avance es moderado. Si la clase pide alta precisión, puede quedarse corta frente a métodos más rápidos.
          </div>
        </div>
      )
    }

    if (active.id === "sign") {
      const leftSign = demoStep < 4 ? "+" : "-"
      const rightSign = "+"
      const valid = leftSign !== rightSign
      return (
        <div className="h-full min-h-0 flex flex-col justify-center gap-3 overflow-hidden">
          <div className="relative w-full aspect-[16/9] max-h-[230px] rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
            <svg viewBox="0 0 320 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <line x1="28" y1="100" x2="292" y2="100" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="40" y1="25" x2="40" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              <path d={valid ? "M45 130 C95 125 120 112 160 100 C205 84 238 55 285 40" : "M45 62 C105 40 150 44 190 58 C230 72 258 64 285 48"} fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" className="transition-all duration-700" />
              <circle cx="70" cy={valid ? "124" : "55"} r="8" fill={valid ? "#ef4444" : "#22c55e"} />
              <circle cx="260" cy="50" r="8" fill="#22c55e" />
              <text x="62" y="160" fontSize="15" fill="#334155">a</text>
              <text x="252" y="160" fontSize="15" fill="#334155">b</text>
              <text x="55" y="35" fontSize="18" fontWeight="700" fill={valid ? "#ef4444" : "#22c55e"}>f(a) {leftSign}</text>
              <text x="218" y="35" fontSize="18" fontWeight="700" fill="#22c55e">f(b) {rightSign}</text>
              {valid && <circle cx="160" cy="100" r="7" fill="#f59e0b" className="animate-pulse" />}
            </svg>
          </div>

          <div className={`rounded-xl border p-2 sm:p-3 text-center ${valid ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
            <p className="text-xs sm:text-sm font-semibold">
              {valid ? "Sí hay cambio de signo: la raíz queda garantizada." : "No hay cambio de signo: el método no puede iniciar con garantía."}
            </p>
          </div>
        </div>
      )
    }

    if (active.id === "continuity") {
      return (
        <div className="h-full min-h-0 flex flex-col justify-center gap-3 overflow-hidden">
          <div className="relative w-full aspect-[16/9] max-h-[230px] rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
            <svg viewBox="0 0 320 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <line x1="28" y1="95" x2="292" y2="95" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="40" y1="25" x2="40" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M50 132 C88 120 111 112 132 118" fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
              <path d="M172 58 C210 42 250 48 286 65" fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
              <circle cx="132" cy="118" r="6" fill="white" stroke="#f97316" strokeWidth="4" />
              <circle cx="172" cy="58" r="6" fill="#f97316" />
              <line x1="152" y1="45" x2="152" y2="130" stroke="#ef4444" strokeWidth="3" strokeDasharray="7 6" className={demoStep >= 2 ? "opacity-100" : "opacity-30"} />
              <text x="112" y="154" fontSize="14" fontWeight="700" fill="#ef4444">salto</text>
              {demoStep >= 5 && <text x="58" y="35" fontSize="14" fontWeight="700" fill="#ef4444">cambia el signo, pero no cruza y=0</text>}
            </svg>
          </div>

          <div className="rounded-xl bg-orange-50 border border-orange-200 p-2 sm:p-3 text-[11px] sm:text-sm text-orange-700 leading-relaxed">
            Un salto puede engañar al método: parece que hay raíz porque cambia el signo, pero la gráfica nunca cruza el eje. Por eso se exige continuidad.
          </div>
        </div>
      )
    }

    return (
      <div className="h-full min-h-0 flex flex-col justify-center gap-3 overflow-hidden">
        <div className="relative w-full aspect-[16/9] max-h-[230px] rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
          <svg viewBox="0 0 320 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <line x1="28" y1="90" x2="292" y2="90" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="160" y1="25" x2="160" y2="150" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M35 130 C72 30 105 30 130 90 C146 128 174 128 190 90 C216 30 250 30 285 130" fill="none" stroke="#0ea5e9" strokeWidth="5" strokeLinecap="round" />
            {[90, 160, 230].map((x, index) => (
              <g key={x} className={demoStep >= index * 2 ? "opacity-100" : "opacity-25"}>
                <circle cx={x} cy="90" r="8" fill={index === 1 ? "#0ea5e9" : "#94a3b8"} />
                <text x={x - 9} y="118" fontSize="14" fontWeight="700" fill={index === 1 ? "#0ea5e9" : "#64748b"}>{index === 0 ? "r1" : index === 1 ? "r2" : "r3"}</text>
              </g>
            ))}
            <line x1="45" y1="155" x2="275" y2="155" stroke="#ef4444" strokeWidth="3" />
            <text x="103" y="172" fontSize="13" fill="#ef4444">un intervalo grande puede ocultar raíces</text>
          </svg>
        </div>

        <div className="rounded-xl bg-sky-50 border border-sky-200 p-2 sm:p-3 text-[11px] sm:text-sm text-sky-700 leading-relaxed">
          El método se queda con una raíz. Para encontrar todas, hay que dividir el dominio en intervalos pequeños y verificar cada cambio de signo.
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full min-h-0 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-2 sm:p-3 md:p-5 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-2 sm:mb-3 shrink-0">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300 text-[10px] sm:text-xs mb-1">
            <span className={`w-2 h-2 rounded-full ${activeStyle.bg}`} />
            Enmanuel · Análisis crítico
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight truncate sm:whitespace-normal">
            Desventajas del Método de <span className={activeStyle.text}>Bisección</span>
          </h2>
          <p className="hidden sm:block text-slate-400 text-xs md:text-sm mt-1">
            Una simulación compacta para explicar cuándo el método deja de ser conveniente.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setIsRunning((value) => !value)}
            className="px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden md:inline">{isRunning ? "Pausar" : "Reproducir"}</span>
          </button>
          <button
            onClick={resetDemo}
            className="px-3 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden md:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(210px,280px)_minmax(0,1fr)] gap-2 sm:gap-3 md:gap-4">
        <div className="min-h-0 overflow-auto pr-0 lg:pr-1 grid grid-cols-2 lg:grid-cols-1 gap-2 auto-rows-min">
          {weaknesses.map((weakness, index) => {
            const style = styles[weakness.color as keyof typeof styles]
            const selected = activeWeakness === index

            return (
              <button
                key={weakness.id}
                onClick={() => selectWeakness(index)}
                className={`w-full text-left rounded-xl sm:rounded-2xl p-2 sm:p-3 border transition-all duration-300 min-w-0 ${selected
                  ? `bg-white ${style.border} shadow-xl`
                  : "bg-white/8 border-white/10 hover:bg-white/12"
                  }`}
              >
                <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${selected ? `${style.bg} text-white` : "bg-white/10 text-slate-300"
                    }`}>
                    {weakness.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-[10px] sm:text-xs font-bold ${selected ? style.text : "text-slate-500"}`}>{weakness.number}</div>
                    <h3 className={`font-bold text-xs sm:text-sm leading-tight ${selected ? "text-slate-900" : "text-white"}`}>{weakness.title}</h3>
                    <p className={`hidden sm:block text-[10px] md:text-xs mt-1 leading-snug ${selected ? "text-slate-600" : "text-slate-400"}`}>{weakness.subtitle}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="min-h-0 bg-white rounded-2xl md:rounded-[28px] shadow-2xl border border-white/20 p-3 sm:p-4 md:p-5 flex flex-col overflow-hidden">
          <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3 shrink-0">
            <div className="min-w-0">
              <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${activeStyle.soft} ${activeStyle.text} text-[10px] sm:text-xs font-semibold mb-1`}>Simulación {active.number}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight">{active.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2">{active.phrase}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] sm:text-xs text-slate-400">Paso</p>
              <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${activeStyle.text}`}>{demoStep + 1}</p>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            {renderDemo()}
          </div>

          <div className="mt-2 sm:mt-3 flex items-center gap-1.5 shrink-0 overflow-hidden">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === demoStep ? `w-8 sm:w-10 ${activeStyle.bg}` : "w-2 bg-slate-200"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}






/* ────���────────────────────────────────────────
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
                  className={`w-4 h-4 rounded-sm transition-all duration-300 ${dataSize <= 1
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
