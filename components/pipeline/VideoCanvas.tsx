"use client"

import { useEffect, useRef, useCallback } from "react"

interface VideoCanvasProps {
  /** Target frames-per-second — the canvas only paints a new frame this often */
  fps: number
  /**
   * 0..1  Quality level fed to the canvas renderer.
   * 1 = full-res sharp scene.
   * Low values shrink the internal render buffer so the canvas looks blocky
   * when it is stretched back to full display size.
   */
  quality: number
  /** Whether the animation should be running */
  running: boolean
  /** Accent colour for HUD elements */
  accentColor: string
  /** Label shown in the top-right badge */
  label: string
  /** Colour of the badge */
  badgeColor: string
  /** Callback fires every time a new frame is actually drawn */
  onFrame?: (frameIndex: number) => void
}

// ─── Scene constants ──────────────────────────────────────────────────────────
const SCENE_W = 320
const SCENE_H = 180

// Palette
const SKY_TOP    = { r: 10,  g: 15,  b: 40  }
const SKY_BOT    = { r: 30,  g: 55,  b: 110 }
const ROAD_COLOR = "#1a1a2e"
const LANE_COLOR = "rgba(255,255,180,0.25)"
const STAR_COUNT = 60

// Pre-generate deterministic star positions
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: ((i * 137.508) % SCENE_W),
  y: ((i * 97.13)   % (SCENE_H * 0.55)),
  r: (i % 3 === 0) ? 1.2 : 0.7,
}))

// Buildings definition — pre-built so it never re-computes
const BUILDINGS = [
  { x: 10,  w: 22, h: 80,  color: "#1e2a4a", floors: 8,  windowColor: "#fbbf24" },
  { x: 35,  w: 18, h: 110, color: "#162036", floors: 11, windowColor: "#60a5fa" },
  { x: 57,  w: 30, h: 70,  color: "#1e3a5f", floors: 7,  windowColor: "#fbbf24" },
  { x: 90,  w: 20, h: 130, color: "#0f1729", floors: 13, windowColor: "#818cf8" },
  { x: 115, w: 25, h: 90,  color: "#1e2a4a", floors: 9,  windowColor: "#fbbf24" },
  { x: 145, w: 35, h: 60,  color: "#172040", floors: 6,  windowColor: "#60a5fa" },
  { x: 185, w: 18, h: 120, color: "#0d1830", floors: 12, windowColor: "#a78bfa" },
  { x: 207, w: 28, h: 85,  color: "#1a2540", floors: 8,  windowColor: "#fbbf24" },
  { x: 240, w: 22, h: 100, color: "#162036", floors: 10, windowColor: "#60a5fa" },
  { x: 267, w: 30, h: 75,  color: "#1e3050", floors: 7,  windowColor: "#fbbf24" },
  { x: 300, w: 20, h: 115, color: "#0f1729", floors: 11, windowColor: "#818cf8" },
]

// Cars — each has a lane (0=far, 1=mid, 2=near) and direction (1=right, -1=left)
const CAR_DEFS = [
  { lane: 0, dir:  1, speed: 1.4, color: "#ef4444", lightColor: "#fca5a5", startX: 20  },
  { lane: 0, dir:  1, speed: 1.1, color: "#3b82f6", lightColor: "#93c5fd", startX: 180 },
  { lane: 1, dir: -1, speed: 1.6, color: "#f59e0b", lightColor: "#fde68a", startX: 260 },
  { lane: 1, dir: -1, speed: 1.2, color: "#10b981", lightColor: "#6ee7b7", startX: 80  },
  { lane: 2, dir:  1, speed: 2.0, color: "#8b5cf6", lightColor: "#c4b5fd", startX: 140 },
  { lane: 2, dir: -1, speed: 1.5, color: "#f43f5e", lightColor: "#fda4af", startX: 300 },
]

// Lane Y positions and car sizes (near lanes are larger — perspective)
const LANE_CONFIG = [
  { y: SCENE_H * 0.71, carH: 7,  carW: 20 },
  { y: SCENE_H * 0.78, carH: 9,  carW: 26 },
  { y: SCENE_H * 0.86, carH: 12, carW: 34 },
]

// ─── Draw helpers ─────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function drawScene(ctx: CanvasRenderingContext2D, t: number) {
  const W = SCENE_W
  const H = SCENE_H

  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65)
  sky.addColorStop(0, `rgb(${SKY_TOP.r},${SKY_TOP.g},${SKY_TOP.b})`)
  sky.addColorStop(1, `rgb(${SKY_BOT.r},${SKY_BOT.g},${SKY_BOT.b})`)
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  // Stars — twinkle by varying opacity with time
  STARS.forEach((s, i) => {
    const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.8 + i * 0.7))
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${twinkle})`
    ctx.fill()
  })

  // Moon
  const moonX = 260 + Math.sin(t * 0.05) * 8
  const moonY = 18 + Math.cos(t * 0.05) * 4
  ctx.beginPath()
  ctx.arc(moonX, moonY, 10, 0, Math.PI * 2)
  ctx.fillStyle = "#fef3c7"
  ctx.fill()
  // Moon glow
  const moonGlow = ctx.createRadialGradient(moonX, moonY, 8, moonX, moonY, 28)
  moonGlow.addColorStop(0, "rgba(254,243,199,0.25)")
  moonGlow.addColorStop(1, "rgba(254,243,199,0)")
  ctx.fillStyle = moonGlow
  ctx.beginPath()
  ctx.arc(moonX, moonY, 28, 0, Math.PI * 2)
  ctx.fill()

  // Buildings
  BUILDINGS.forEach(b => {
    const baseY = H * 0.67
    const bx = b.x
    const by = baseY - b.h
    ctx.fillStyle = b.color
    ctx.fillRect(bx, by, b.w, b.h)

    // Windows — flicker slightly
    const cols = Math.floor(b.w / 6)
    const rows = b.floors
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = bx + 2 + c * 6
        const wy = by + 3 + r * (b.h / rows) * 0.85
        const lit = Math.sin(t * 0.3 + r * 1.7 + c * 2.3 + b.x) > 0.1
        ctx.fillStyle = lit ? b.windowColor : "rgba(0,0,0,0.5)"
        ctx.fillRect(wx, wy, 3, 3)
      }
    }
  })

  // Road
  ctx.fillStyle = ROAD_COLOR
  ctx.fillRect(0, H * 0.66, W, H * 0.34)

  // Lane markings
  ctx.strokeStyle = LANE_COLOR
  ctx.lineWidth = 1
  ctx.setLineDash([10, 8])
  ctx.lineDashOffset = -(t * 60) % 18
  ;[0.72, 0.81].forEach(yFrac => {
    ctx.beginPath()
    ctx.moveTo(0, H * yFrac)
    ctx.lineTo(W, H * yFrac)
    ctx.stroke()
  })
  ctx.setLineDash([])

  // Road reflections from city lights
  const refGrad = ctx.createLinearGradient(0, H * 0.66, 0, H)
  refGrad.addColorStop(0, "rgba(60,80,160,0.18)")
  refGrad.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = refGrad
  ctx.fillRect(0, H * 0.66, W, H * 0.34)

  // Cars
  CAR_DEFS.forEach((car, ci) => {
    const lane = LANE_CONFIG[car.lane]
    const carX = ((car.startX + car.dir * car.speed * t * 60) % (W + car.startX + lane.carW) + W + lane.carW) % (W + lane.carW) - lane.carW
    const cx = car.dir === 1 ? carX : W - carX
    const cy = lane.y
    const cw = lane.carW
    const ch = lane.carH

    // Car body
    ctx.fillStyle = car.color
    ctx.beginPath()
    ctx.roundRect(cx, cy - ch, cw, ch, 2)
    ctx.fill()

    // Headlights / tail lights
    const lightX = car.dir === 1 ? cx + cw - 1 : cx
    ctx.fillStyle = car.lightColor
    ctx.beginPath()
    ctx.arc(lightX, cy - ch * 0.4, 1.5, 0, Math.PI * 2)
    ctx.fill()

    // Light trail on road
    const trailDir = car.dir === 1 ? -1 : 1
    const trailGrad = ctx.createLinearGradient(lightX, 0, lightX + trailDir * 35, 0)
    trailGrad.addColorStop(0, car.lightColor.replace(")", ",0.4)").replace("rgb", "rgba"))
    trailGrad.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = trailGrad
    ctx.fillRect(lightX, cy - 1, trailDir * 35, 2)
  })

  // Vignette
  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9)
  vig.addColorStop(0, "rgba(0,0,0,0)")
  vig.addColorStop(1, "rgba(0,0,0,0.55)")
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function VideoCanvas({
  fps,
  quality,
  running,
  accentColor,
  label,
  badgeColor,
  onFrame,
}: VideoCanvasProps) {
  const displayRef = useRef<HTMLCanvasElement>(null)
  const offscreenRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef       = useRef<number>(0)
  const lastDrawRef  = useRef<number>(0)
  const frameIdxRef  = useRef<number>(0)
  const timeRef      = useRef<number>(0)

  // Clamp quality so the off-screen canvas is always at least 4×4 px
  const internalW = Math.max(4, Math.round(SCENE_W * quality))
  const internalH = Math.max(4, Math.round(SCENE_H * quality))

  const draw = useCallback((now: number) => {
    rafRef.current = requestAnimationFrame(draw)

    const minInterval = 1000 / fps
    const delta = now - lastDrawRef.current
    if (delta < minInterval) return      // throttle to target fps

    lastDrawRef.current = now - (delta % minInterval)  // drift correction
    timeRef.current += delta / 1000

    // Draw to off-screen buffer at internal (possibly low) resolution
    const off = offscreenRef.current
    if (!off) return
    const offCtx = off.getContext("2d")
    if (!offCtx) return
    offCtx.clearRect(0, 0, internalW, internalH)
    offCtx.save()
    offCtx.scale(internalW / SCENE_W, internalH / SCENE_H)
    drawScene(offCtx, timeRef.current)
    offCtx.restore()

    // Blit to display canvas — stretched with pixelated rendering when quality is low
    const disp = displayRef.current
    if (!disp) return
    const dispCtx = disp.getContext("2d")
    if (!dispCtx) return
    // @ts-ignore — non-standard but widely supported
    dispCtx.imageSmoothingEnabled = quality > 0.45
    dispCtx.clearRect(0, 0, SCENE_W, SCENE_H)
    dispCtx.drawImage(off, 0, 0, internalW, internalH, 0, 0, SCENE_W, SCENE_H)

    frameIdxRef.current++
    onFrame?.(frameIdxRef.current)
  }, [fps, quality, internalW, internalH, onFrame])

  // Start / stop the animation loop
  useEffect(() => {
    // (Re)create off-screen canvas at the correct internal resolution
    const off = document.createElement("canvas")
    off.width  = internalW
    off.height = internalH
    offscreenRef.current = off

    if (!running) {
      // Draw one static frame so the canvas is not blank
      const disp = displayRef.current
      if (disp) {
        const ctx = disp.getContext("2d")
        if (ctx) {
          ctx.save()
          ctx.scale(SCENE_W / SCENE_W, SCENE_H / SCENE_H)
          // Draw at low quality even when paused so the state is visually clear
          const offCtx = off.getContext("2d")
          if (offCtx) {
            offCtx.save()
            offCtx.scale(internalW / SCENE_W, internalH / SCENE_H)
            drawScene(offCtx, timeRef.current)
            offCtx.restore()
            // @ts-ignore
            ctx.imageSmoothingEnabled = quality > 0.45
            ctx.drawImage(off, 0, 0, internalW, internalH, 0, 0, SCENE_W, SCENE_H)
          }
          ctx.restore()
        }
      }
      return
    }

    lastDrawRef.current = performance.now()
    rafRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafRef.current) }
  }, [running, draw, internalW, internalH, quality])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={displayRef}
        width={SCENE_W}
        height={SCENE_H}
        className="w-full h-full rounded-lg"
        style={{
          imageRendering: quality < 0.45 ? "pixelated" : "auto",
          display: "block",
        }}
      />
    </div>
  )
}
