"use client"

import { useEffect, useRef, useState } from "react"
import Reveal from "reveal.js"
import "reveal.js/dist/reveal.css"

import {
  CoverSlide,
  BisectionVsBinarySlide,
  InstagramSearchSlide,
  AmazonFilterSlide,
  WhatsAppSlide,
  StrengthsSlide,
  WeaknessesSlide,
  ConclusionSlide,
} from "./bisection/slides"

export default function WebSimPresentation() {
  const deckRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<Reveal.Api | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isPrintMode, setIsPrintMode] = useState(false)

  // Check for print-pdf mode on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const printMode = urlParams.has("print-pdf")
    setIsPrintMode(printMode)

    // Keyboard shortcut: Ctrl+P to print directly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault()
        window.print()
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
        setIsReady(true)

        // Auto-show all fragments
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
          {/* SLIDE 1: Portada */}
          <section data-transition="zoom-in fade-out">
            <CoverSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 2: Biseccion vs Binary Search */}
          <section data-transition="slide">
            <BisectionVsBinarySlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 3: Frainer - Instagram Search */}
          <section data-transition="slide">
            <InstagramSearchSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 4: Enmanuel - Amazon Filter */}
          <section data-transition="slide">
            <AmazonFilterSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 5: Christopher - WhatsApp + Applications */}
          <section data-transition="slide">
            <WhatsAppSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 6: Ventajas del Metodo */}
          <section data-transition="slide">
            <StrengthsSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 7: Elmer - Desventajas */}
          <section data-transition="slide">
            <WeaknessesSlide isPrintMode={isPrintMode} />
          </section>

          {/* SLIDE 8: Conclusion */}
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
          --r-background-color: #f8fafc;
          --r-main-font: inherit;
          --r-main-font-size: 18px;
          --r-main-color: #1e293b;
          --r-heading-color: #0f172a;
          --r-link-color: #3b82f6;
        }

        .reveal .slides {
          text-align: left;
        }

        /* Make each section fill the full viewport */
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

        /* Override Reveal centering that creates the box */
        .reveal .slides {
          width: 100vw !important;
          height: 100vh !important;
          top: 0 !important;
          left: 0 !important;
          transform: none !important;
        }

        .reveal .progress {
          background: rgba(59, 130, 246, 0.15);
          height: 3px;
          z-index: 100;
        }

        .reveal .progress span {
          background: #3b82f6;
        }

        .reveal .controls {
          color: #3b82f6;
          z-index: 100;
        }

        .reveal .controls button {
          color: #3b82f6;
        }

        .reveal .controls .navigate-up,
        .reveal .controls .navigate-down {
          display: none;
        }

        /* Slide number */
        .reveal .slide-number {
          background: rgba(255, 255, 255, 0.9);
          color: #64748b;
          font-family: monospace;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* ============================================
           PRINT / PDF EXPORT STYLES
           ============================================ */
        
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }

          html, body, #__next {
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Hide export button and navigation */
          button[title="Exportar a PDF"],
          .reveal .controls,
          .reveal .progress,
          .reveal .slide-number,
          .reveal .pause-overlay,
          .reveal .backgrounds,
          .reveal .navigate-left,
          .reveal .navigate-right {
            display: none !important;
            visibility: hidden !important;
          }

          .reveal {
            overflow: visible !important;
            position: relative !important;
          }

          .reveal .slides {
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            position: relative !important;
            transform: none !important;
            top: 0 !important;
            left: 0 !important;
          }

          .reveal .slides > section {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            break-inside: avoid !important;
            width: 100vw !important;
            height: 100vh !important;
            min-height: 100vh !important;
            max-height: 100vh !important;
            overflow: hidden !important;
            position: relative !important;
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            transform: none !important;
            top: auto !important;
            left: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          .reveal .slides > section:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }

          .reveal .slides > section > div {
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
          }

          /* Make all fragments visible */
          .reveal .slides section .fragment {
            opacity: 1 !important;
            visibility: visible !important;
          }

          /* Preserve colors */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Force backgrounds to print */
          .bg-gradient-to-br,
          .bg-gradient-to-r,
          .bg-gradient-to-b,
          [class*="bg-"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  )
}
