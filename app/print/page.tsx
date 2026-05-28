"use client"

import { useRef } from "react"
import { Printer, ArrowLeft, FileDown } from "lucide-react"
import {
  CoverSlide,
  BisectionVsBinarySlide,
  InstagramSearchSlide,
  AmazonFilterSlide,
  WhatsAppSlide,
  StrengthsSlide,
  WeaknessesSlide,
  ConclusionSlide,
} from "@/components/bisection/slides"

export default function PrintPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleBack = () => {
    window.location.href = "/"
  }

  // All slides in order
  const slides = [
    { id: 1, title: "Portada", component: CoverSlide },
    { id: 2, title: "Biseccion vs Binary Search", component: BisectionVsBinarySlide },
    { id: 3, title: "Instagram Search", component: InstagramSearchSlide },
    { id: 4, title: "Amazon Filter", component: AmazonFilterSlide },
    { id: 5, title: "WhatsApp", component: WhatsAppSlide },
    { id: 6, title: "Ventajas del Metodo", component: StrengthsSlide },
    { id: 7, title: "Debilidades del Metodo", component: WeaknessesSlide },
    { id: 8, title: "Conclusion", component: ConclusionSlide },
  ]

  return (
    <>
      {/* Control bar - hidden when printing */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Volver a la presentacion</span>
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">Metodo de Biseccion</h1>
              <p className="text-sm text-slate-500">{slides.length} diapositivas | Formato 16:9</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">
              <kbd className="px-2 py-0.5 bg-white rounded border border-slate-300 text-xs font-mono">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-0.5 bg-white rounded border border-slate-300 text-xs font-mono">P</kbd>
              <span className="ml-1">para imprimir</span>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <Printer className="w-5 h-5" />
              <span className="font-medium">Exportar a PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slides container */}
      <div ref={containerRef} className="print-container">
        <div className="slides-wrapper">
          {slides.map((slide, index) => {
            const SlideComponent = slide.component
            return (
              <div key={slide.id} className="slide-page">
                {/* Slide number indicator - hidden when printing */}
                <div className="slide-indicator print:hidden">
                  <span className="slide-number">{index + 1}</span>
                  <span className="slide-title">{slide.title}</span>
                </div>
                
                {/* Slide content wrapper - maintains 16:9 aspect ratio */}
                <div className="slide-frame">
                  <div className="slide-content">
                    <SlideComponent isPrintMode={true} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Print instructions - hidden when printing */}
        <div className="print:hidden max-w-4xl mx-auto px-8 pb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-sm">
            <h3 className="font-bold text-blue-900 text-lg mb-4 flex items-center gap-3">
              <FileDown className="w-6 h-6" />
              Instrucciones para exportar a PDF
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">1</div>
                  <p className="text-sm text-blue-800">Haz clic en <strong>&quot;Exportar a PDF&quot;</strong> o presiona <strong>Ctrl + P</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">2</div>
                  <p className="text-sm text-blue-800">Selecciona <strong>&quot;Guardar como PDF&quot;</strong> como destino</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">3</div>
                  <p className="text-sm text-blue-800">Configura el papel en <strong>Horizontal / Landscape</strong></p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">4</div>
                  <p className="text-sm text-blue-800">Activa <strong>&quot;Graficos de fondo&quot;</strong> en Mas opciones</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">5</div>
                  <p className="text-sm text-blue-800">Desactiva <strong>&quot;Encabezados y pies de pagina&quot;</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">6</div>
                  <p className="text-sm text-blue-800">Haz clic en <strong>&quot;Guardar&quot;</strong></p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/60 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-700 text-center">
                <strong>Tip:</strong> Para mejor calidad, usa margenes &quot;Ninguno&quot; o &quot;Minimo&quot; en la configuracion de impresion.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* =============================================
           SCREEN STYLES (Preview mode)
        ============================================= */
        
        .print-container {
          padding-top: 80px;
          background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
          min-height: 100vh;
        }

        .slides-wrapper {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .slide-page {
          position: relative;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .slide-indicator {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(4px);
          padding: 6px 12px;
          border-radius: 20px;
        }

        .slide-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: white;
          color: #1e293b;
          font-size: 12px;
          font-weight: 700;
          border-radius: 50%;
        }

        .slide-title {
          color: white;
          font-size: 12px;
          font-weight: 500;
        }

        .slide-frame {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 aspect ratio */
        }

        .slide-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .slide-content > div {
          width: 100%;
          height: 100%;
        }

        /* =============================================
           PRINT STYLES (PDF Export)
        ============================================= */
        
        @page {
          size: 297mm 167mm; /* 16:9 landscape ratio */
          margin: 0;
        }

        @media print {
          /* Reset everything */
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          html {
            background: white !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: visible !important;
          }

          /* Hide non-print elements */
          .print\\:hidden {
            display: none !important;
          }

          /* Container adjustments */
          .print-container {
            padding: 0 !important;
            background: white !important;
            min-height: auto !important;
          }

          .slides-wrapper {
            padding: 0 !important;
            gap: 0 !important;
            max-width: none !important;
            margin: 0 !important;
            display: block !important;
          }

          /* Each slide = one page */
          .slide-page {
            page-break-after: always;
            page-break-inside: avoid;
            break-after: page;
            break-inside: avoid;
            
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            
            border-radius: 0 !important;
            box-shadow: none !important;
            background: white !important;
            
            position: relative !important;
            overflow: hidden !important;
            display: block !important;
          }

          .slide-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          /* Frame takes full page */
          .slide-frame {
            position: relative !important;
            width: 100vw !important;
            height: 100vh !important;
            padding-top: 0 !important;
          }

          /* Content fills frame */
          .slide-content {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
          }

          .slide-content > div {
            width: 100% !important;
            height: 100% !important;
          }

          /* Preserve backgrounds and colors */
          div, section, article, aside, header, footer, main, nav, span, p, h1, h2, h3, h4, h5, h6 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Ensure gradients print */
          [class*="bg-gradient"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Hide animations and transitions */
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
