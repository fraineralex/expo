"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { AlertTriangle, ArrowRight, CheckCircle2, Cpu, Gauge, Layers, QrCode, Zap } from "lucide-react"

const members = [
  "Algenis De los Santos Lopez",
  "Christopher Enrique Marrero Liriano",
  "Enmanuel Santos Diaz",
  "Frainer Encarnacion",
  "Oliver Abreu Mateo",
]

const participantWork = [
  {
    name: "Algenis De los Santos Lopez",
    topic: "Medicion de rendimiento",
    detail: "Explica la formula T = (I x CPI) / f y como la frecuencia, el CPI y la cantidad de instrucciones afectan el tiempo total.",
  },
  {
    name: "Christopher Enrique Marrero Liriano",
    topic: "Procesador monociclo",
    detail: "Muestra que todas las instrucciones esperan el ciclo de la mas lenta, generando tiempo util y tiempo desperdiciado.",
  },
  {
    name: "Enmanuel Santos Diaz",
    topic: "Pipeline de 5 etapas",
    detail: "Presenta IF, ID, EX, MEM y WB con la analogia de cocina industrial para explicar el trabajo simultaneo.",
  },
  {
    name: "Frainer Encarnacion",
    topic: "Comparacion y speedup",
    detail: "Compara monociclo y pipeline con ejemplos del mundo real, throughput y el calculo del speedup.",
  },
  {
    name: "Oliver Abreu Mateo",
    topic: "Limitaciones del pipeline",
    detail: "Describe riesgos de datos, control y estructura, junto con stalls, flush y tecnicas de mitigacion.",
  },
]

const pipelineStages = [
  { id: "IF", name: "Fetch", text: "Busca la instruccion en memoria." },
  { id: "ID", name: "Decode", text: "Interpreta la instruccion y lee registros." },
  { id: "EX", name: "Execute", text: "Realiza la operacion aritmetica o logica." },
  { id: "MEM", name: "Memory", text: "Accede a memoria cuando la instruccion lo necesita." },
  { id: "WB", name: "Write Back", text: "Escribe el resultado final." },
]

const stageColors = ["#0d9488", "#7c3aed", "#db2777", "#ea580c", "#16a34a"]

const monocycleRows = [
  { instruction: "ADD", useful: 200, wasted: 600 },
  { instruction: "LOAD", useful: 800, wasted: 0 },
  { instruction: "SUB", useful: 200, wasted: 600 },
  { instruction: "STORE", useful: 700, wasted: 100 },
  { instruction: "AND", useful: 150, wasted: 650 },
  { instruction: "OR", useful: 150, wasted: 650 },
]

function Slide({
  number,
  title,
  eyebrow,
  presenter,
  children,
}: {
  number: string
  title: string
  eyebrow: string
  presenter?: string
  children: ReactNode
}) {
  return (
    <section className="print-slide">
      <div className="slide-top">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
        </div>
        {presenter ? <div className="presenter">{presenter}</div> : null}
      </div>
      <div className="slide-body">{children}</div>
      <div className="slide-number">{number}</div>
    </section>
  )
}

export default function PrintPage() {
  useEffect(() => {
    document.title = "Los_Ingenieros_PROYECT_FINAL"
    const timer = setTimeout(() => window.print(), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="print-presentation">
      <style jsx global>{`
        @page {
          size: landscape;
          margin: 0;
        }

        html, body {
          margin: 0;
          padding: 0;
          background: #06121b;
          color: #e2e8f0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .print-presentation {
          background: #06121b;
          color: #e2e8f0;
          font-family: Arial, Helvetica, sans-serif;
        }

        .print-slide {
          width: 100vw;
          height: 100vh;
          padding: 38px 48px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          page-break-after: always;
          background:
            radial-gradient(circle at top right, rgba(20, 184, 166, 0.18), transparent 30%),
            radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.16), transparent 28%),
            #06121b;
        }

        .print-slide:last-child {
          page-break-after: auto;
        }

        .slide-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 22px;
        }

        .eyebrow {
          color: #5eead4;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .slide-top h2 {
          margin: 0;
          color: #f8fafc;
          font-size: 34px;
          line-height: 1.1;
        }

        .presenter {
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(15, 23, 42, 0.8);
          color: #cbd5e1;
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 13px;
          white-space: nowrap;
        }

        .slide-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-height: 0;
        }

        .slide-number {
          position: absolute;
          bottom: 18px;
          right: 24px;
          color: #64748b;
          font-size: 12px;
          font-family: Consolas, monospace;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .card {
          background: rgba(15, 23, 42, 0.82);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 18px;
          padding: 18px;
        }

        .card h3,
        .card h4,
        .card p {
          margin-top: 0;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .metric {
          background: rgba(15, 23, 42, 0.82);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 16px;
          padding: 16px;
        }

        .metric-label {
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #f8fafc;
        }

        .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .badge {
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.82);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #cbd5e1;
          font-size: 13px;
        }

        .stage-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .stage-card {
          border-radius: 18px;
          padding: 16px 14px;
          color: white;
          min-height: 146px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stage-id {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .stage-name {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .stage-text {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.92);
        }

        .timeline-table {
          display: grid;
          grid-template-columns: 120px 1fr 110px;
          gap: 10px;
          align-items: center;
        }

        .bar {
          height: 18px;
          border-radius: 999px;
          overflow: hidden;
          background: #1e293b;
          display: flex;
        }

        .bar-useful {
          background: #22c55e;
        }

        .bar-wasted {
          background: repeating-linear-gradient(45deg, #ef4444, #ef4444 8px, #f87171 8px, #f87171 16px);
        }

        .list {
          margin: 0;
          padding-left: 18px;
          line-height: 1.7;
          color: #cbd5e1;
          font-size: 14px;
        }

        .formula-box {
          background: rgba(15, 23, 42, 0.88);
          border: 1px solid rgba(94, 234, 212, 0.3);
          color: #f8fafc;
          border-radius: 18px;
          padding: 22px;
          font-size: 28px;
          font-weight: 700;
          text-align: center;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .comparison-card {
          border-radius: 20px;
          padding: 20px;
          min-height: 260px;
        }

        .comparison-card h3 {
          margin: 0 0 10px;
          font-size: 24px;
        }

        .footer-note {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.6;
        }
      `}</style>

      <section className="print-slide" style={{ justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
          <Cpu size={52} color="#5eead4" />
          <ArrowRight size={34} color="#94a3b8" />
          <Layers size={52} color="#c084fc" />
          <ArrowRight size={34} color="#94a3b8" />
          <Gauge size={52} color="#fb7185" />
        </div>
        <div style={{ maxWidth: 1120 }}>
          <div className="eyebrow">Proyecto final impreso</div>
          <h1 style={{ margin: 0, fontSize: 58, lineHeight: 1.04, color: "#f8fafc" }}>Los_Ingenieros_PROYECT_FINAL</h1>
          <p style={{ fontSize: 23, lineHeight: 1.5, color: "#cbd5e1", marginTop: 22, marginBottom: 26 }}>
            Comparador de rendimiento entre un procesador monociclo y un procesador segmentado con pipeline de 5 etapas.
            Esta version impresa resume la explicacion conceptual de la presentacion real.
          </p>
        </div>
        <div className="badge-row" style={{ maxWidth: 1080 }}>
          {members.map((member) => (
            <span key={member} className="badge">{member}</span>
          ))}
        </div>
        <div className="slide-number">1 / 8</div>
      </section>

      <Slide number="2 / 8" eyebrow="Seccion 01" title="Medicion de rendimiento" presenter="Algenis De los Santos Lopez">
        <div className="formula-box">T = (I x CPI) / f</div>
        <div className="metric-grid">
          <div className="metric">
            <div className="metric-label">I</div>
            <div className="metric-value">Instrucciones</div>
          </div>
          <div className="metric">
            <div className="metric-label">CPI</div>
            <div className="metric-value">Ciclos por instruccion</div>
          </div>
          <div className="metric">
            <div className="metric-label">f</div>
            <div className="metric-value">Frecuencia</div>
          </div>
          <div className="metric">
            <div className="metric-label">Resultado</div>
            <div className="metric-value">Tiempo total</div>
          </div>
        </div>
        <div className="card-grid">
          <div className="card">
            <h3 style={{ color: "#5eead4", fontSize: 22 }}>Idea central</h3>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 15 }}>
              El rendimiento no depende de un solo dato. Si aumentan las instrucciones o el CPI, el tiempo sube.
              Si aumenta la frecuencia, el tiempo baja.
            </p>
            <ul className="list">
              <li>Mas instrucciones implican mas trabajo total.</li>
              <li>Un CPI alto significa que cada instruccion cuesta mas ciclos.</li>
              <li>Una frecuencia mayor reduce la duracion de cada ciclo.</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ color: "#c084fc", fontSize: 22 }}>Lectura del simulador</h3>
            <ul className="list">
              <li>El simulador permite variar instrucciones, CPI y frecuencia.</li>
              <li>Los cambios se reflejan en tiempo, ciclos totales y eficiencia.</li>
              <li>Sirve como base para comparar luego monociclo contra pipeline.</li>
            </ul>
            <p className="footer-note" style={{ marginTop: 18 }}>
              Ejemplo: si el mismo trabajo se completa con menos CPI o con ciclos mas cortos, el tiempo final mejora.
            </p>
          </div>
        </div>
      </Slide>

      <Slide number="3 / 8" eyebrow="Seccion 02" title="Procesador monociclo" presenter="Christopher Enrique Marrero Liriano">
        <div className="comparison-grid">
          <div className="card">
            <h3 style={{ color: "#fb923c", fontSize: 22 }}>Como funciona</h3>
            <ul className="list">
              <li>Toda instruccion debe terminar dentro de un unico ciclo.</li>
              <li>Ese ciclo se define por la instruccion mas lenta del conjunto.</li>
              <li>Las instrucciones cortas terminan antes, pero no pueden salir antes.</li>
            </ul>
            <p className="footer-note" style={{ marginTop: 16 }}>
              En el ejemplo de la presentacion real, `LOAD` fija el ciclo en 800 ns y arrastra a todas las demas.
            </p>
          </div>
          <div className="card">
            <h3 style={{ color: "#22c55e", fontSize: 22 }}>Linea de tiempo estatica</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              {monocycleRows.map((row) => (
                <div key={row.instruction} className="timeline-table">
                  <div style={{ color: "#f8fafc", fontFamily: "Consolas, monospace", fontWeight: 700 }}>{row.instruction}</div>
                  <div className="bar">
                    <div className="bar-useful" style={{ width: `${(row.useful / 800) * 100}%` }} />
                    <div className="bar-wasted" style={{ width: `${(row.wasted / 800) * 100}%` }} />
                  </div>
                  <div style={{ color: "#cbd5e1", fontSize: 13 }}>{row.useful} ns util</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card-grid">
          <div className="card">
            <h4 style={{ color: "#f8fafc", fontSize: 18 }}>Ventaja</h4>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 }}>
              La logica es simple y facil de entender: una instruccion entra, se completa y sale.
            </p>
          </div>
          <div className="card">
            <h4 style={{ color: "#f8fafc", fontSize: 18 }}>Desventaja</h4>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 }}>
              Mucho tiempo del ciclo queda vacio para instrucciones rapidas, por lo que el hardware no se aprovecha bien.
            </p>
          </div>
        </div>
      </Slide>

      <Slide number="4 / 8" eyebrow="Seccion 03" title="Pipeline de 5 etapas" presenter="Enmanuel Santos Diaz">
        <div className="stage-row">
          {pipelineStages.map((stage, index) => (
            <div key={stage.id} className="stage-card" style={{ background: stageColors[index] }}>
              <div>
                <div className="stage-id">{stage.id}</div>
                <div className="stage-name">{stage.name}</div>
              </div>
              <div className="stage-text">{stage.text}</div>
            </div>
          ))}
        </div>
        <div className="card-grid">
          <div className="card">
            <h3 style={{ color: "#c084fc", fontSize: 22 }}>Analogia de cocina</h3>
            <ul className="list">
              <li>`IF`: recepcion del pedido.</li>
              <li>`ID`: preparacion de ingredientes.</li>
              <li>`EX`: coccion o trabajo principal.</li>
              <li>`MEM`: acceso a recursos extra.</li>
              <li>`WB`: entrega del plato terminado.</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ color: "#5eead4", fontSize: 22 }}>Por que mejora</h3>
            <ul className="list">
              <li>Mientras una instruccion esta en `EX`, otra puede estar en `ID` y otra en `IF`.</li>
              <li>El pipeline no reduce siempre la latencia individual, pero si aumenta el trabajo completado por ciclo.</li>
              <li>Despues del llenado inicial, puede salir una instruccion por ciclo.</li>
            </ul>
          </div>
        </div>
      </Slide>

      <Slide number="5 / 8" eyebrow="Seccion 04" title="Comparacion directa y speedup" presenter="Frainer Encarnacion">
        <div className="comparison-grid">
          <div className="comparison-card" style={{ background: "linear-gradient(180deg, rgba(249,115,22,0.18), rgba(15,23,42,0.85))", border: "1px solid rgba(251,146,60,0.3)" }}>
            <h3 style={{ color: "#fdba74" }}>Monociclo</h3>
            <ul className="list">
              <li>1 instruccion ocupa 1 ciclo completo.</li>
              <li>Si una instruccion lenta domina, todas heredan ese tiempo.</li>
              <li>Buen modelo para introducir el concepto de ciclo de instruccion.</li>
            </ul>
            <div className="formula-box" style={{ marginTop: 18, fontSize: 22, padding: 16 }}>100 x 800 ns = 80,000 ns</div>
          </div>
          <div className="comparison-card" style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.18), rgba(15,23,42,0.85))", border: "1px solid rgba(192,132,252,0.3)" }}>
            <h3 style={{ color: "#d8b4fe" }}>Pipeline</h3>
            <ul className="list">
              <li>Se divide la tarea en 5 etapas mas cortas.</li>
              <li>El costo inicial es llenar el pipeline.</li>
              <li>Luego el throughput mejora porque varias instrucciones avanzan a la vez.</li>
            </ul>
            <div className="formula-box" style={{ marginTop: 18, fontSize: 22, padding: 16 }}>(100 + 4) x 200 ns = 20,800 ns</div>
          </div>
        </div>
        <div className="metric-grid">
          <div className="metric">
            <div className="metric-label">Speedup</div>
            <div className="metric-value">3.85x</div>
          </div>
          <div className="metric">
            <div className="metric-label">Throughput</div>
            <div className="metric-value">1 instr/ciclo</div>
          </div>
          <div className="metric">
            <div className="metric-label">Idea</div>
            <div className="metric-value">Mas trabajo paralelo</div>
          </div>
          <div className="metric">
            <div className="metric-label">Mundo real</div>
            <div className="metric-value">Imagen, video, DB</div>
          </div>
        </div>
      </Slide>

      <Slide number="6 / 8" eyebrow="Seccion 05" title="Limitaciones reales del pipeline" presenter="Oliver Abreu Mateo">
        <div className="card-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <AlertTriangle size={20} color="#f59e0b" />
              <h3 style={{ color: "#f59e0b", fontSize: 20, margin: 0 }}>Riesgo de datos</h3>
            </div>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 }}>
              Una instruccion necesita un resultado que todavia no ha sido escrito por la anterior.
            </p>
            <ul className="list">
              <li>Provoca stalls o burbujas.</li>
              <li>Ejemplo: `LOAD` seguido de `SUB` usando el mismo registro.</li>
            </ul>
          </div>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <AlertTriangle size={20} color="#ef4444" />
              <h3 style={{ color: "#ef4444", fontSize: 20, margin: 0 }}>Riesgo de control</h3>
            </div>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 }}>
              Los saltos cambian el flujo y pueden invalidar instrucciones que ya entraron al pipeline.
            </p>
            <ul className="list">
              <li>Provoca flush.</li>
              <li>Reduce el rendimiento efectivo.</li>
            </ul>
          </div>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <AlertTriangle size={20} color="#8b5cf6" />
              <h3 style={{ color: "#a78bfa", fontSize: 20, margin: 0 }}>Riesgo estructural</h3>
            </div>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 }}>
              Dos etapas compiten por el mismo recurso al mismo tiempo.
            </p>
            <ul className="list">
              <li>Ejemplo: memoria o unidad funcional compartida.</li>
              <li>Se evita duplicando recursos o reordenando el flujo.</li>
            </ul>
          </div>
        </div>
        <div className="card-grid">
          <div className="card">
            <h3 style={{ color: "#22c55e", fontSize: 22 }}>Tecnicas de mitigacion</h3>
            <ul className="list">
              <li>Forwarding para reenviar resultados sin esperar el write back completo.</li>
              <li>Stall controlado cuando no hay otra salida segura.</li>
              <li>Prediccion de saltos para reducir flush por ramas.</li>
            </ul>
          </div>
          <div className="card">
            <h3 style={{ color: "#5eead4", fontSize: 22 }}>Conclusion tecnica</h3>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 }}>
              El pipeline mejora mucho el rendimiento, pero no es gratis: necesita logica adicional para manejar conflictos y mantener el flujo estable.
            </p>
          </div>
        </div>
      </Slide>

      <Slide number="7 / 8" eyebrow="Cierre" title="Conclusiones y participantes">
        <div className="card-grid">
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <CheckCircle2 size={22} color="#22c55e" />
              <h3 style={{ color: "#22c55e", fontSize: 22, margin: 0 }}>Ideas clave</h3>
            </div>
            <ul className="list">
              <li>El monociclo es simple, pero desperdicia tiempo por depender de la instruccion mas lenta.</li>
              <li>El pipeline divide el trabajo y mejora el throughput despues del llenado.</li>
              <li>El speedup existe mientras los riesgos se mantengan controlados.</li>
              <li>La ganancia real depende de la carga, la frecuencia y los hazards.</li>
            </ul>
          </div>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Zap size={22} color="#5eead4" />
              <h3 style={{ color: "#5eead4", fontSize: 22, margin: 0 }}>Participacion del equipo</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {participantWork.map((person) => (
                <div key={person.name} style={{ borderBottom: "1px solid rgba(148,163,184,0.14)", paddingBottom: 10 }}>
                  <div style={{ color: "#f8fafc", fontWeight: 700, marginBottom: 4 }}>{person.name}</div>
                  <div style={{ color: "#c084fc", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{person.topic}</div>
                  <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.6 }}>{person.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      <Slide number="8 / 8" eyebrow="Apoyo" title="Presentacion real, control remoto y exportacion">
        <div className="card-grid">
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Layers size={22} color="#c084fc" />
              <h3 style={{ color: "#c084fc", fontSize: 22, margin: 0 }}>Rutas del proyecto</h3>
            </div>
            <ul className="list">
              <li>`/` presenta la version interactiva principal.</li>
              <li>`/remote` permite controlar la navegacion desde el celular.</li>
              <li>`/print` genera esta version estatica preparada para PDF.</li>
            </ul>
            <p className="footer-note" style={{ marginTop: 16 }}>
              La presentacion real mantiene simulaciones interactivas; la version impresa prioriza la explicacion conceptual.
            </p>
          </div>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <QrCode size={22} color="#5eead4" />
              <h3 style={{ color: "#5eead4", fontSize: 22, margin: 0 }}>Uso del control remoto</h3>
            </div>
            <ul className="list">
              <li>La ultima diapositiva de la presentacion real muestra el acceso remoto.</li>
              <li>Desde el movil se puede avanzar, retroceder y controlar simulaciones.</li>
              <li>El PDF conserva la estructura del cierre aunque no ejecuta interacciones.</li>
            </ul>
            <div className="formula-box" style={{ marginTop: 22, fontSize: 20, padding: 16 }}>
              Nombre del PDF: Los_Ingenieros_PROYECT_FINAL
            </div>
          </div>
        </div>
        <div className="badge-row">
          {["Portada", "Rendimiento", "Monociclo", "Pipeline", "Speedup", "Limitaciones", "Cierre", "Control remoto"].map((item) => (
            <span key={item} className="badge">{item}</span>
          ))}
        </div>
      </Slide>
    </div>
  )
}
