"use client"

import { useEffect, useRef, useState } from "react"
import Reveal from "reveal.js"
import "reveal.js/dist/reveal.css"

import {
  TitleSlide,
  AlgenisSlide,
  ChristopherSlide,
  EnmanuelSlide,
  FrainerSlide,
  OliverSlide,
  GraciasSlide,
  QRSlide,
} from "./pipeline/slides"

declare global {
  interface Window {
    Reveal?: Reveal.Api
  }
}

export default function PipelinePresentation() {
  const deckRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<Reveal.Api | null>(null)
  const [isPrintMode, setIsPrintMode] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const printMode = urlParams.has("print-pdf")
    setIsPrintMode(printMode)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault()
        window.open("/print", "_blank")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (!deckRef.current || revealRef.current) return

    const deck = new Reveal(deckRef.current, {
      hash: false,
      history: false,
      controls: false,
      progress: !isPrintMode,
      center: false,
      transition: isPrintMode ? "none" : "slide",
      backgroundTransition: isPrintMode ? "none" : "fade",
      transitionSpeed: "default",
      viewDistance: isPrintMode ? 99 : 4,
      width: isPrintMode ? 1920 : "100%",
      height: isPrintMode ? 1080 : "100%",
      margin: isPrintMode ? 0.04 : 0,
      minScale: isPrintMode ? 0.2 : 1,
      maxScale: isPrintMode ? 2.0 : 1,
      keyboard: true,
      overview: false,
      touch: !isPrintMode,
      loop: false,
      autoSlide: 0,
      mouseWheel: false,
      hideInactiveCursor: !isPrintMode,
      hideCursorTime: 3000,
      autoPlayMedia: false,
      navigationMode: "linear",
      fragments: false,
      slideNumber: false,
      disableLayout: !isPrintMode,
      pdfMaxPagesPerSlide: 1,
      pdfSeparateFragments: false,
    })

    deck
      .initialize()
      .then(() => {
        revealRef.current = deck
        window.Reveal = deck
      })
      .catch((error) => {
        console.error("Reveal.js initialization error:", error)
      })

    return () => {
      if (revealRef.current) {
        try {
          revealRef.current.destroy()
        } catch {
          // Ignore destroy errors
        }
        revealRef.current = null
        window.Reveal = undefined
      }
    }
  }, [isPrintMode])

  return (
    <div style={{ position: isPrintMode ? "relative" : "fixed", inset: isPrintMode ? undefined : 0, overflow: isPrintMode ? "visible" : "hidden" }}>
      <div className="reveal" ref={deckRef} style={{ width: "100%", height: isPrintMode ? "auto" : "100%" }}>
        <div className="slides">
          {/* SLIDE 1: Title */}
          <section data-transition="zoom-in fade-out">
            <TitleSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 2: Algenis - Medición de Rendimiento */}
          <section data-transition="slide">
            <AlgenisSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 3: Christopher - Procesador Monociclo */}
          <section data-transition="slide">
            <ChristopherSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 4: Enmanuel - Pipeline de 5 etapas */}
          <section data-transition="slide">
            <EnmanuelSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 5: Frainer - Comparación y Speedup */}
          <section data-transition="slide">
            <FrainerSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 6: Oliver - Limitaciones del Pipeline */}
          <section data-transition="slide">
            <OliverSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 7: Gracias */}
          <section data-transition="zoom">
            <GraciasSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 8: QR Control Remoto */}
          <section data-transition="slide">
            <QRSlide isPrintMode={isPrintMode} />
          </section>
        </div>
      </div>

      <style jsx global>{`
        html, body, #__next {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .reveal {
          --r-background-color: #f8fafc;
          --r-main-font: inherit;
          --r-main-font-size: 18px;
          --r-main-color: #1e293b;
          --r-heading-color: #0f172a;
          --r-link-color: #0d9488;
        }

        .reveal .slides {
          text-align: left;
        }

        .reveal .slides > section {
          width: 100vw !important;
          height: 100vh !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
          padding: 0 !important;
          top: 0 !important;
          left: 0 !important;
          transform: none !important;
          margin: 0 !important;
          box-sizing: border-box;
          overflow: hidden;
        }

        .reveal .slides > section > div {
          width: 100%;
          height: 100%;
        }

        .reveal .slides {
          width: 100vw !important;
          height: 100vh !important;
          top: 0 !important;
          left: 0 !important;
          transform: none !important;
        }

        .reveal .progress {
          background: rgba(13, 148, 136, 0.15);
          height: 4px;
          z-index: 100;
        }

        .reveal .progress span {
          background: linear-gradient(90deg, #0d9488, #7c3aed);
        }

        .reveal .controls {
          display: none;
        }

        .reveal .slide-number {
          display: none;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @media print {
          html, body {
            width: 100% !important;
            height: 100% !important;
            overflow: visible !important;
            background: #f8fafc !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .reveal {
            overflow: visible !important;
          }

          .reveal .slides {
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            position: static !important;
            transform: none !important;
          }

          .reveal .slides > section {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            width: 100% !important;
            height: 100vh !important;
            min-height: 100vh !important;
            max-height: 100vh !important;
            overflow: hidden !important;
            position: relative !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            transform: none !important;
            top: auto !important;
            left: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            background: #f8fafc !important;
          }

          .reveal .slides > section > div {
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
          }

          .reveal .controls,
          .reveal .progress,
          .reveal .slide-number,
          .reveal .pause-overlay,
          .reveal .backgrounds {
            display: none !important;
          }

          .reveal .slides section .fragment {
            opacity: 1 !important;
            visibility: visible !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  )
}
