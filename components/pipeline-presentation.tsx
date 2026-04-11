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
  ConclusionSlide,
} from "./pipeline/slides"

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
      controls: !isPrintMode,
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
      slideNumber: !isPrintMode,
      disableLayout: !isPrintMode,
      pdfMaxPagesPerSlide: 1,
      pdfSeparateFragments: false,
    })

    deck
      .initialize()
      .then(() => {
        revealRef.current = deck

        deck.on("slidechanged", (event: { currentSlide: HTMLElement }) => {
          const fragments = event.currentSlide.querySelectorAll(".fragment")
          let delay = 0
          fragments.forEach((fragment) => {
            setTimeout(() => {
              fragment.classList.add("visible")
            }, delay)
            delay += 400
          })
        })
      })
      .catch((error) => {
        console.error("Reveal.js initialization error:", error)
      })

    return () => {
      if (revealRef.current) {
        try {
          revealRef.current.destroy()
        } catch (e) {
          // Ignore destroy errors
        }
        revealRef.current = null
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

          {/* SLIDE 7: Conclusion */}
          <section data-transition="zoom">
            <ConclusionSlide isPrintMode={isPrintMode} />
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
          --r-background-color: #0a0a1a;
          --r-main-font: inherit;
          --r-main-font-size: 18px;
          --r-main-color: #f8fafc;
          --r-heading-color: #f8fafc;
          --r-link-color: #22d3ee;
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
          background: rgba(34, 211, 238, 0.15);
          height: 3px;
          z-index: 100;
        }

        .reveal .progress span {
          background: linear-gradient(90deg, #22d3ee, #a78bfa);
        }

        .reveal .controls {
          color: #22d3ee;
          z-index: 100;
        }

        .reveal .controls button {
          color: #22d3ee;
        }

        .reveal .controls .navigate-up,
        .reveal .controls .navigate-down {
          display: none;
        }

        .reveal .slide-number {
          background: rgba(10, 10, 26, 0.8);
          color: #64748b;
          font-family: monospace;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
        }

        @media print {
          html, body {
            width: 100% !important;
            height: 100% !important;
            overflow: visible !important;
            background: #0a0a1a !important;
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
            background: #0a0a1a !important;
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
