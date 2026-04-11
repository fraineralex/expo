"use client"

import { useEffect, useRef, useState } from "react"
import Reveal from "reveal.js"
import "reveal.js/dist/reveal.css"

// USB Presentation Slides
import {
  USBTitleSlideContent,
  USBIntroSlideContent,
  USBArchitectureSlideContent,
  USBBusConceptSlideContent,
  USBPhysicalLogicalSlideContent,
  USBSerialSimSlideContent,
  USBBandwidthSlideContent,
  USBBandwidthVsSizeSlideContent,
  USBTopologySlideContent,
  USBProtocolsSlideContent,
  USBEnumerationSlideContent,
  USBPracticalLimitsSlideContent,
  USBConclusionSlideContent,
} from "./reveal-slides-usb"

export default function RevealPresentation() {
  const deckRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<Reveal.Api | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!deckRef.current || revealRef.current) return

    const deck = new Reveal(deckRef.current, {
      hash: false,
      history: false,
      controls: true,
      progress: true,
      center: true,
      transition: "convex",
      backgroundTransition: "zoom",
      transitionSpeed: "slow",
      autoAnimateEasing: "cubic-bezier(0.76, 0, 0.24, 1)",
      autoAnimateDuration: 1.0,
      autoAnimateUnmatched: true,
      viewDistance: 4,
      width: "100%",
      height: "100%",
      margin: 0,
      minScale: 0.2,
      maxScale: 2.0,
      keyboard: true,
      overview: true,
      touch: true,
      loop: false,
      shuffle: false,
      autoSlide: 0,
      mouseWheel: false,
      hideInactiveCursor: true,
      hideCursorTime: 3000,
      autoPlayMedia: true,
      navigationMode: "linear",
      hashOneBasedIndex: false,
      fragments: true,
      fragmentInURL: false,
    })

    deck
      .initialize()
      .then(() => {
        revealRef.current = deck
        setIsReady(true)

        // Auto-show all fragments when entering a slide
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
  }, [])

  return (
    <div className="reveal-container h-screen w-screen overflow-hidden bg-[#061218]">
      <div className="reveal" ref={deckRef}>
        <div className="slides">
          {/* SLIDE 1: Title - Buses y Puertos de Comunicacion */}
          <section
            data-transition="zoom-in fade-out"
            data-background-gradient="radial-gradient(circle at 30% 30%, #0a2a3a 0%, #061218 70%)"
          >
            <USBTitleSlideContent />
          </section>

          {/* SLIDE 2: Introduccion al USB - Christopher Marrero */}
          <section
            data-transition="convex"
            data-background-gradient="linear-gradient(135deg, #061218 0%, #0a2030 100%)"
          >
            <USBIntroSlideContent />
          </section>

          {/* SLIDE 3: Arquitectura Basica del USB - Christopher Marrero */}
          <section
            data-transition="cube"
            data-background-gradient="linear-gradient(45deg, #061218 0%, #082028 100%)"
          >
            <USBArchitectureSlideContent />
          </section>

          {/* SLIDE 4: Bus de Comunicacion - Enmanuel Santos */}
          <section
            data-transition="convex-in concave-out"
            data-background="#061218"
          >
            <USBBusConceptSlideContent />
          </section>

          {/* SLIDE 5: Definicion Fisica y Logica - Enmanuel Santos */}
          <section
            data-transition="slide"
            data-background-gradient="radial-gradient(ellipse at bottom, #0a2a3a 0%, #061218 100%)"
          >
            <USBPhysicalLogicalSlideContent />
          </section>

          {/* SLIDE 6: USB Serial Simulation - Frainer */}
          <section
            data-transition="zoom"
            data-background-gradient="linear-gradient(180deg, #061218 0%, #0a2030 100%)"
          >
            <USBSerialSimSlideContent />
          </section>

          {/* SLIDE 7: Evolucion del Ancho de Banda - Frainer */}
          <section
            data-transition="slide"
            data-background="#061218"
          >
            <USBBandwidthSlideContent />
          </section>

          {/* SLIDE 8: Ancho de Banda vs Tamano Fisico - Frainer */}
          <section
            data-transition="convex"
            data-background-gradient="linear-gradient(135deg, #061218 0%, #0a2a30 100%)"
          >
            <USBBandwidthVsSizeSlideContent />
          </section>

          {/* SLIDE 9: Topologia y Limites - Oliver Abreu */}
          <section
            data-transition="cube"
            data-background-gradient="radial-gradient(circle at 70% 70%, #0a2a3a 0%, #061218 70%)"
          >
            <USBTopologySlideContent />
          </section>

          {/* SLIDE 10: Protocolos de Transferencia - Algenis */}
          <section
            data-transition="convex"
            data-background-gradient="linear-gradient(45deg, #061218 0%, #0a2028 100%)"
          >
            <USBProtocolsSlideContent />
          </section>

          {/* SLIDE 11: Enumeracion USB - Algenis */}
          <section
            data-transition="convex"
            data-background-gradient="linear-gradient(135deg, #061218 0%, #0a2030 100%)"
          >
            <USBEnumerationSlideContent />
          </section>

          {/* SLIDE 12: Limites Practicos - Oliver Abreu */}
          <section
            data-transition="slide"
            data-background-gradient="linear-gradient(180deg, #061218 0%, #0a2a30 100%)"
          >
            <USBPracticalLimitsSlideContent />
          </section>

          {/* SLIDE 13: Gracias */}
          <section
            data-transition="zoom"
            data-background-gradient="radial-gradient(ellipse at center, #0a2a3a 0%, #061218 70%)"
          >
            <USBConclusionSlideContent />
          </section>
        </div>
      </div>

      <style jsx global>{`
        .reveal-container {
          --r-background-color: #061218;
          --r-main-font: inherit;
          --r-main-font-size: 24px;
          --r-main-color: #fff;
          --r-heading-color: #fff;
          --r-link-color: #06b6d4;
        }

        .reveal .slides {
          text-align: left;
        }

        .reveal .slides section {
          height: 100%;
          padding: 40px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .floating-card {
          animation: float 6s ease-in-out infinite;
        }

        .floating-card:nth-child(2) {
          animation-delay: -2s;
        }

        .floating-card:nth-child(3) {
          animation-delay: -4s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        .morph-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .morph-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.5);
        }

        /* Neon text effects */
        .neon-text {
          text-shadow: 0 0 5px currentColor, 0 0 10px currentColor,
            0 0 20px currentColor, 0 0 40px currentColor;
        }

        /* Reveal.js overrides for USB theme */
        .reveal .slides > section,
        .reveal .slides > section > section {
          padding: 20px 50px;
        }

        .reveal .progress {
          background: rgba(255, 255, 255, 0.1);
          height: 4px;
        }

        .reveal .progress span {
          background: linear-gradient(90deg, #06b6d4, #f59e0b);
        }

        .reveal .controls {
          color: #06b6d4;
        }

        .reveal .controls button {
          color: #06b6d4;
        }

        /* Hide up/down arrows since we're linear */
        .reveal .controls .navigate-up,
        .reveal .controls .navigate-down {
          display: none;
        }

        /* Animated gradient backgrounds */
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  )
}
