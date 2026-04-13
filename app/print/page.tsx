"use client"

import { useEffect } from "react"
import { Cpu, HardDrive, Clock, Users, Zap, RotateCcw, BarChart3, Server, Globe, Code, Monitor, Music, Gamepad2, Terminal, ArrowRight, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

// Static print-friendly presentation
export default function PrintPage() {
  useEffect(() => {
    // Set document title for PDF filename
    document.title = "Los_Ingenieros_Asignacion04_Uso de los simuladores de Memoria"
    
    // Auto-trigger print dialog after a short delay
    const timer = setTimeout(() => {
      window.print()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const members = [
    "Algenis De los Santos",
    "Oliver Abreu",
    "Enmanuel Santos",
    "Frainer Encarnacion",
    "Christopher Marrero",
  ]

  return (
    <div className="print-presentation">
      {/* Global print styles */}
      <style jsx global>{`
        @page {
          size: landscape;
          margin: 0;
        }

        html, body {
          margin: 0;
          padding: 0;
          background: #0a0a1a !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        .print-presentation {
          background: #0a0a1a;
          color: #f8fafc;
        }

        .print-slide {
          width: 100vw;
          height: 100vh;
          padding: 40px 56px;
          box-sizing: border-box;
          page-break-after: always;
          page-break-inside: avoid;
          display: flex;
          flex-direction: column;
          background: #0a0a1a !important;
          position: relative;
          overflow: hidden;
        }

        .print-slide:last-child {
          page-break-after: auto;
        }

        @media print {
          .print-slide {
            background: #0a0a1a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }

        .presenter-name {
          position: absolute;
          bottom: 20px;
          right: 40px;
          color: #64748b;
          font-size: 13px;
          font-weight: 500;
        }

        .slide-number {
          position: absolute;
          bottom: 20px;
          left: 40px;
          color: #475569;
          font-size: 11px;
          font-family: monospace;
        }

        .slide-header {
          margin-bottom: 24px;
        }

        .slide-header .topic-label {
          color: #22d3ee;
          font-size: 12px;
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .slide-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
        }

        .slide-header .divider {
          width: 60px;
          height: 3px;
          background: #22d3ee;
          margin-top: 10px;
          border-radius: 2px;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 1: TITLE
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 28 }}>
            <Cpu size={52} color="#22d3ee" />
            <Clock size={52} color="#22d3ee" />
            <BarChart3 size={52} color="#22d3ee" />
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 700, marginBottom: 12, color: "#f8fafc", lineHeight: 1.15 }}>
            Comparador de Rendimiento:
            <br />
            Procesador Monociclo
            <br />
            vs Procesador Segmentado (Pipeline de 5 Etapas)
          </h1>
        </div>
        <div style={{ marginTop: 40 }}>
          <p style={{ fontSize: 18, color: "#94a3b8", marginBottom: 6 }}>Arquitectura del Computador</p>
          <p style={{ fontSize: 26, color: "#f8fafc", fontWeight: 600, marginBottom: 24 }}>Grupo: Los Ingenieros</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {members.map((m) => (
              <span key={m} style={{ fontSize: 13, color: "#94a3b8", padding: "6px 14px", background: "#1e293b", borderRadius: 20, border: "1px solid #334155" }}>
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="slide-number">1 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 2: TEMA 1 - Introduccion al Simulador (Algenis) - Parte 1
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 01</div>
          <h2>Introduccion al Simulador WebSim</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Que es WebSim?</h3>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.7, marginBottom: 20 }}>
              WebSim es un simulador interactivo basado en web que permite visualizar como el sistema operativo 
              gestiona multiples procesos y asigna tiempo de CPU utilizando diferentes algoritmos de planificacion.
              Es una herramienta educativa que facilita la comprension de conceptos complejos de sistemas operativos.
            </p>
            
            <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Objetivos del Simulador</h3>
            <ul style={{ color: "#94a3b8", paddingLeft: 20, lineHeight: 2, fontSize: 15 }}>
              <li>Visualizar el ciclo de vida de los procesos</li>
              <li>Comprender los algoritmos de planificacion (FCFS, Round Robin)</li>
              <li>Analizar metricas de rendimiento en tiempo real</li>
              <li>Experimentar con diferentes configuraciones de quantum</li>
            </ul>
          </div>
          
          <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: "1px solid #1e293b" }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#f8fafc" }}>Componentes Principales</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { name: "Cola de Listos (Ready Queue)", desc: "Procesos esperando tiempo de CPU", color: "#3b82f6" },
                { name: "CPU (Procesador)", desc: "Ejecuta las instrucciones del proceso activo", color: "#22c55e" },
                { name: "Scheduler (Planificador)", desc: "Decide que proceso ejecutar", color: "#f59e0b" },
                { name: "Dispatcher", desc: "Realiza el cambio de contexto", color: "#a855f7" },
              ].map((item) => (
                <div key={item.name} style={{ display: "flex", gap: 12, padding: 12, background: "#1e293b", borderRadius: 8 }}>
                  <div style={{ width: 4, background: item.color, borderRadius: 2 }} />
                  <div>
                    <div style={{ fontWeight: 600, color: "#f8fafc", fontSize: 14 }}>{item.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Algenis De los Santos</div>
        <div className="slide-number">2 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 3: TEMA 1 - Estados de un Proceso (Algenis) - Parte 2
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 01</div>
          <h2>Estados de un Proceso</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 28, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Los 5 Estados Fundamentales</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { state: "Nuevo", color: "#6b7280", desc: "Proceso recien creado, aun no admitido al sistema" },
                { state: "Ready (Listo)", color: "#eab308", desc: "En memoria, esperando ser asignado a la CPU" },
                { state: "Ejecutando", color: "#22c55e", desc: "Actualmente usando el procesador" },
                { state: "Esperando (Bloqueado)", color: "#f97316", desc: "Esperando I/O o algun evento externo" },
                { state: "Terminado", color: "#64748b", desc: "Ejecucion completada, liberando recursos" },
              ].map((item) => (
                <div key={item.state} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 10, background: "#0f172a", borderRadius: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: item.color, marginTop: 3, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, color: "#f8fafc", fontSize: 14 }}>{item.state}</span>
                    <p style={{ color: "#94a3b8", fontSize: 13, margin: 0, marginTop: 2 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ background: "#0f172a", borderRadius: 12, padding: 24, border: "1px solid #1e293b" }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: "#f8fafc", textAlign: "center" }}>Diagrama de Transicion de Estados</h3>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ padding: "10px 28px", background: "#374151", borderRadius: 8, color: "#f8fafc", fontWeight: 500 }}>Nuevo</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ArrowRight size={16} color="#22d3ee" style={{ transform: "rotate(90deg)" }} />
                <span style={{ color: "#64748b", fontSize: 12 }}>admitir</span>
              </div>
              <div style={{ padding: "10px 28px", background: "#ca8a04", borderRadius: 8, color: "#f8fafc", fontWeight: 500 }}>Ready (Cola)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ArrowRight size={16} color="#22d3ee" style={{ transform: "rotate(90deg)" }} />
                <span style={{ color: "#64748b", fontSize: 12 }}>dispatch</span>
              </div>
              <div style={{ padding: "10px 28px", background: "#16a34a", borderRadius: 8, color: "#f8fafc", fontWeight: 500 }}>Ejecutando (CPU)</div>
              <div style={{ display: "flex", gap: 60, marginTop: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#f97316", fontSize: 12 }}>I/O request</span>
                  <ArrowRight size={16} color="#f97316" style={{ transform: "rotate(90deg)" }} />
                  <div style={{ padding: "8px 20px", background: "#c2410c", borderRadius: 8, color: "#f8fafc", fontWeight: 500, fontSize: 14 }}>Esperando</div>
                  <span style={{ color: "#64748b", fontSize: 11 }}>I/O complete {'->'} Ready</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>exit</span>
                  <ArrowRight size={16} color="#64748b" style={{ transform: "rotate(90deg)" }} />
                  <div style={{ padding: "8px 20px", background: "#475569", borderRadius: 8, color: "#f8fafc", fontWeight: 500, fontSize: 14 }}>Terminado</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#22d3ee", fontSize: 12 }}>timeout (quantum)</span>
                  <ArrowRight size={16} color="#22d3ee" style={{ transform: "rotate(90deg)" }} />
                  <span style={{ color: "#ca8a04", fontSize: 12 }}>{'->'} Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Algenis De los Santos</div>
        <div className="slide-number">3 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 4: TEMA 2 - CPU-bound vs I/O-bound (Oliver) - Parte 1
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 02</div>
          <h2>Procesos CPU-bound vs I/O-bound</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
          {/* CPU-bound */}
          <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: "2px solid #dc2626" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ padding: 10, background: "rgba(220,38,38,0.15)", borderRadius: 8 }}>
                <Cpu size={28} color="#dc2626" />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: "#dc2626", margin: 0 }}>CPU-bound</h3>
            </div>
            <p style={{ color: "#94a3b8", marginBottom: 14, lineHeight: 1.6, fontSize: 14 }}>
              Procesos que pasan la mayor parte del tiempo realizando calculos intensivos en el procesador.
              Necesitan mucho tiempo de CPU y realizan pocas operaciones de entrada/salida.
            </p>
            <h4 style={{ color: "#f8fafc", fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Caracteristicas:</h4>
            <ul style={{ color: "#94a3b8", paddingLeft: 18, lineHeight: 1.9, fontSize: 14, marginBottom: 14 }}>
              <li>Alto uso de CPU (85-95%)</li>
              <li>Minimas operaciones de I/O</li>
              <li>Rafagas de CPU largas y continuas</li>
              <li>Pocos cambios de contexto</li>
            </ul>
            <h4 style={{ color: "#f8fafc", fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Ejemplos:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Renderizado de video", "Calculos cientificos", "Compresion", "Machine Learning", "Criptografia"].map((ex) => (
                <span key={ex} style={{ fontSize: 12, padding: "4px 10px", background: "rgba(220,38,38,0.15)", color: "#fca5a5", borderRadius: 4 }}>{ex}</span>
              ))}
            </div>
          </div>
          
          {/* I/O-bound */}
          <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: "2px solid #22c55e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ padding: 10, background: "rgba(34,197,94,0.15)", borderRadius: 8 }}>
                <HardDrive size={28} color="#22c55e" />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: "#22c55e", margin: 0 }}>I/O-bound</h3>
            </div>
            <p style={{ color: "#94a3b8", marginBottom: 14, lineHeight: 1.6, fontSize: 14 }}>
              Procesos que pasan la mayor parte del tiempo esperando operaciones de entrada/salida.
              Usan poco la CPU y frecuentemente se bloquean esperando datos externos.
            </p>
            <h4 style={{ color: "#f8fafc", fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Caracteristicas:</h4>
            <ul style={{ color: "#94a3b8", paddingLeft: 18, lineHeight: 1.9, fontSize: 14, marginBottom: 14 }}>
              <li>Bajo uso de CPU (10-35%)</li>
              <li>Frecuentes operaciones de I/O</li>
              <li>Rafagas de CPU cortas</li>
              <li>Muchos cambios de contexto</li>
            </ul>
            <h4 style={{ color: "#f8fafc", fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Ejemplos:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Editores de texto", "Navegadores web", "Servidores de archivos", "Bases de datos", "Shells"].map((ex) => (
                <span key={ex} style={{ fontSize: 12, padding: "4px 10px", background: "rgba(34,197,94,0.15)", color: "#86efac", borderRadius: 4 }}>{ex}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Oliver Abreu</div>
        <div className="slide-number">4 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 5: TEMA 2 - Rafagas y Comparacion (Oliver) - Parte 2
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 02</div>
          <h2>Patron de Rafagas y Comparacion</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#f8fafc" }}>Patron de Rafagas (Burst Pattern)</h3>
            
            <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: "1px solid #1e293b", marginBottom: 16 }}>
              <h4 style={{ color: "#dc2626", fontSize: 15, marginBottom: 10 }}>CPU-bound: Rafagas largas</h4>
              <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} style={{ flex: 1, height: 28, background: "#dc2626", borderRadius: 3 }} />
                ))}
                <div style={{ width: 24, height: 28, background: "#22c55e", borderRadius: 3 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b" }}>
                <span>CPU</span>
                <span>I/O</span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 10 }}>
                El proceso usa la CPU por largos periodos antes de necesitar I/O.
              </p>
            </div>
            
            <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: "1px solid #1e293b" }}>
              <h4 style={{ color: "#22c55e", fontSize: 15, marginBottom: 10 }}>I/O-bound: Rafagas cortas</h4>
              <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                  <div key={i} style={{ flex: i % 2 === 0 ? 2 : 1, height: 28, background: i % 2 === 0 ? "#22c55e" : "#dc2626", borderRadius: 3 }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b" }}>
                <span>CPU</span>
                <span style={{ color: "#22c55e" }}>I/O frecuente</span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 10 }}>
                El proceso alterna rapidamente entre CPU e I/O.
              </p>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#f8fafc" }}>Tabla Comparativa</h3>
            <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: "1px solid #1e293b" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #334155" }}>
                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#94a3b8" }}>Caracteristica</th>
                    <th style={{ textAlign: "center", padding: "10px 8px", color: "#dc2626" }}>CPU-bound</th>
                    <th style={{ textAlign: "center", padding: "10px 8px", color: "#22c55e" }}>I/O-bound</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "Uso de CPU", cpu: "Alto (85-95%)", io: "Bajo (10-35%)" },
                    { metric: "Rafaga tipica", cpu: "50-500ms", io: "1-10ms" },
                    { metric: "Operaciones I/O", cpu: "Pocas", io: "Muchas" },
                    { metric: "Context switches", cpu: "Pocos", io: "Frecuentes" },
                    { metric: "Tiempo en Ready", cpu: "Corto", io: "Variable" },
                    { metric: "Tiempo en Wait", cpu: "Minimo", io: "Alto" },
                  ].map((row, i) => (
                    <tr key={row.metric} style={{ borderBottom: i < 5 ? "1px solid #1e293b" : "none" }}>
                      <td style={{ padding: "10px 8px", color: "#f8fafc" }}>{row.metric}</td>
                      <td style={{ textAlign: "center", padding: "10px 8px", color: "#fca5a5" }}>{row.cpu}</td>
                      <td style={{ textAlign: "center", padding: "10px 8px", color: "#86efac" }}>{row.io}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ marginTop: 16, padding: 14, background: "#1e293b", borderRadius: 8, border: "1px solid #334155" }}>
              <h4 style={{ color: "#22d3ee", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Importancia para el Planificador:</h4>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>
                El scheduler debe balancear procesos CPU-bound e I/O-bound para maximizar 
                la utilizacion de recursos. Los I/O-bound deberian tener prioridad para 
                mantener los dispositivos ocupados.
              </p>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Oliver Abreu</div>
        <div className="slide-number">5 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 6: TEMA 3 - FCFS Concepto (Enmanuel) - Parte 1
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 03</div>
          <h2>Algoritmo FCFS (First Come, First Served)</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Concepto</h3>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: 16, fontSize: 15 }}>
              FCFS (First Come, First Served) es el algoritmo de planificacion mas simple. 
              Los procesos se ejecutan en el orden exacto en que llegan a la cola de listos, 
              sin interrupciones hasta que terminan o se bloquean.
            </p>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #3b82f6", marginBottom: 16 }}>
              <h4 style={{ color: "#3b82f6", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>Caracteristicas Clave</h4>
              <ul style={{ color: "#94a3b8", paddingLeft: 18, lineHeight: 1.9, fontSize: 14 }}>
                <li><strong style={{ color: "#f8fafc" }}>No preventivo:</strong> Un proceso usa la CPU hasta terminar</li>
                <li><strong style={{ color: "#f8fafc" }}>Simple:</strong> Implementacion con cola FIFO</li>
                <li><strong style={{ color: "#f8fafc" }}>Justo:</strong> Respeta estrictamente el orden de llegada</li>
                <li><strong style={{ color: "#f8fafc" }}>Predecible:</strong> Sin interrupciones inesperadas</li>
              </ul>
            </div>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #f97316" }}>
              <h4 style={{ color: "#f97316", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>Desventajas</h4>
              <ul style={{ color: "#94a3b8", paddingLeft: 18, lineHeight: 1.9, fontSize: 14 }}>
                <li>Efecto Convoy: procesos cortos esperan a largos</li>
                <li>Tiempo de espera promedio alto</li>
                <li>No optimo para sistemas interactivos</li>
                <li>Sin consideracion de prioridades</li>
              </ul>
            </div>
          </div>
          
          <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: "1px solid #1e293b" }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#f8fafc" }}>Visualizacion de Cola FIFO</h3>
            
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>Llegada</div>
                <ArrowRight size={20} color="#22d3ee" />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { id: "P1", time: "0ms", color: "#3b82f6" },
                  { id: "P2", time: "1ms", color: "#22c55e" },
                  { id: "P3", time: "2ms", color: "#f97316" },
                  { id: "P4", time: "3ms", color: "#a855f7" },
                ].map((p) => (
                  <div key={p.id} style={{ textAlign: "center" }}>
                    <div style={{ width: 50, height: 50, background: p.color, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#fff", fontSize: 16 }}>
                      {p.id}
                    </div>
                    <span style={{ fontSize: 11, color: "#64748b" }}>{p.time}</span>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>CPU</div>
                <ArrowRight size={20} color="#22d3ee" />
              </div>
            </div>
            
            <div style={{ padding: 16, background: "#1e293b", borderRadius: 8, marginBottom: 16 }}>
              <h4 style={{ color: "#f8fafc", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Proceso de Ejecucion:</h4>
              <ol style={{ color: "#94a3b8", paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
                <li>P1 llega primero {'->'} se ejecuta inmediatamente</li>
                <li>P2, P3, P4 llegan y esperan en cola</li>
                <li>P1 termina {'->'} P2 toma la CPU</li>
                <li>Se repite hasta que todos terminen</li>
              </ol>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, background: "rgba(251,191,36,0.1)", borderRadius: 8, border: "1px solid #f59e0b" }}>
              <AlertTriangle size={18} color="#f59e0b" />
              <span style={{ color: "#fcd34d", fontSize: 13 }}>Si P1 tarda 100ms, P2/P3/P4 esperan todo ese tiempo</span>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Enmanuel Santos</div>
        <div className="slide-number">6 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 7: TEMA 3 - FCFS Ejemplo Practico (Enmanuel) - Parte 2
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 03</div>
          <h2>FCFS: Ejemplo Practico y Metricas</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Ejemplo de Ejecucion</h3>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #1e293b", marginBottom: 16 }}>
              <h4 style={{ color: "#94a3b8", fontSize: 13, marginBottom: 10 }}>Procesos (orden de llegada en t=0):</h4>
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                {[
                  { id: "P1", burst: 8, color: "#3b82f6" },
                  { id: "P2", burst: 4, color: "#22c55e" },
                  { id: "P3", burst: 2, color: "#f97316" },
                  { id: "P4", burst: 3, color: "#a855f7" },
                ].map((p) => (
                  <div key={p.id} style={{ textAlign: "center" }}>
                    <div style={{ width: 52, height: 52, background: p.color, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 16 }}>
                      {p.id}
                    </div>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>Burst: {p.burst}ms</span>
                  </div>
                ))}
              </div>
              
              <h4 style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}>Diagrama de Gantt:</h4>
              <div style={{ display: "flex", height: 44, marginBottom: 6, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: "47%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P1 (8ms)</div>
                <div style={{ width: "24%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P2 (4ms)</div>
                <div style={{ width: "12%", background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P3</div>
                <div style={{ width: "17%", background: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P4</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", paddingLeft: 4, paddingRight: 4 }}>
                <span>0</span><span>8</span><span>12</span><span>14</span><span>17</span>
              </div>
            </div>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #dc2626" }}>
              <h4 style={{ color: "#dc2626", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>Efecto Convoy (Convoy Effect)</h4>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
                P3 (2ms) y P4 (3ms) son procesos cortos pero deben esperar 8ms+4ms = 12ms 
                antes de ejecutarse. Este es el "convoy effect" donde procesos cortos 
                quedan atrapados detras de procesos largos.
              </p>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Calculo de Metricas</h3>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #1e293b" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #334155" }}>
                    <th style={{ textAlign: "left", padding: "8px 6px", color: "#94a3b8" }}>Proceso</th>
                    <th style={{ textAlign: "center", padding: "8px 6px", color: "#94a3b8" }}>Burst</th>
                    <th style={{ textAlign: "center", padding: "8px 6px", color: "#94a3b8" }}>T. Espera</th>
                    <th style={{ textAlign: "center", padding: "8px 6px", color: "#94a3b8" }}>T. Retorno</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "P1", burst: "8ms", wait: "0ms", turnaround: "8ms", color: "#3b82f6" },
                    { id: "P2", burst: "4ms", wait: "8ms", turnaround: "12ms", color: "#22c55e" },
                    { id: "P3", burst: "2ms", wait: "12ms", turnaround: "14ms", color: "#f97316" },
                    { id: "P4", burst: "3ms", wait: "14ms", turnaround: "17ms", color: "#a855f7" },
                  ].map((row, i) => (
                    <tr key={row.id} style={{ borderBottom: i < 3 ? "1px solid #1e293b" : "none" }}>
                      <td style={{ padding: "10px 6px", color: row.color, fontWeight: 600 }}>{row.id}</td>
                      <td style={{ textAlign: "center", padding: "10px 6px", color: "#f8fafc" }}>{row.burst}</td>
                      <td style={{ textAlign: "center", padding: "10px 6px", color: "#fca5a5" }}>{row.wait}</td>
                      <td style={{ textAlign: "center", padding: "10px 6px", color: "#86efac" }}>{row.turnaround}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div style={{ marginTop: 16, padding: 12, background: "#1e293b", borderRadius: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>T. Espera Promedio:</span>
                    <div style={{ color: "#22d3ee", fontWeight: 700, fontSize: 20 }}>8.5ms</div>
                    <span style={{ color: "#64748b", fontSize: 11 }}>(0+8+12+14)/4</span>
                  </div>
                  <div>
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>T. Retorno Promedio:</span>
                    <div style={{ color: "#22d3ee", fontWeight: 700, fontSize: 20 }}>12.75ms</div>
                    <span style={{ color: "#64748b", fontSize: 11 }}>(8+12+14+17)/4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Enmanuel Santos</div>
        <div className="slide-number">7 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 8: TEMA 4 - Round Robin Concepto (Frainer) - Parte 1
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 04</div>
          <h2>Algoritmo Round Robin</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Concepto</h3>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: 16, fontSize: 15 }}>
              Round Robin (RR) es un algoritmo de planificacion preventivo disenado para sistemas 
              de tiempo compartido. Asigna a cada proceso un quantum (tiempo maximo) de CPU, 
              y cuando este expira, el proceso vuelve al final de la cola.
            </p>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "2px solid #22d3ee", marginBottom: 16 }}>
              <h4 style={{ color: "#22d3ee", fontWeight: 600, marginBottom: 10, fontSize: 16 }}>Quantum (Time Slice)</h4>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
                Es el tiempo maximo que un proceso puede usar la CPU antes de ser interrumpido.
                La eleccion del quantum es critica para el rendimiento del sistema.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, background: "#1e293b", borderRadius: 6 }}>
                  <span style={{ color: "#f8fafc", fontSize: 13 }}>Quantum pequeno (1-5ms)</span>
                  <span style={{ color: "#f97316", fontSize: 12 }}>Mas cambios de contexto, mejor respuesta</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, background: "#1e293b", borderRadius: 6 }}>
                  <span style={{ color: "#f8fafc", fontSize: 13 }}>Quantum grande (50-100ms)</span>
                  <span style={{ color: "#22c55e", fontSize: 12 }}>Menos overhead, comporta como FCFS</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "#0f172a", borderRadius: 8, padding: 12, border: "1px solid #22c55e" }}>
                <h5 style={{ color: "#22c55e", fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Ventajas</h5>
                <ul style={{ color: "#94a3b8", fontSize: 12, paddingLeft: 14, lineHeight: 1.7 }}>
                  <li>Equitativo para todos</li>
                  <li>Buen tiempo de respuesta</li>
                  <li>Sin inanicion</li>
                  <li>Predecible</li>
                </ul>
              </div>
              <div style={{ background: "#0f172a", borderRadius: 8, padding: 12, border: "1px solid #dc2626" }}>
                <h5 style={{ color: "#dc2626", fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Desventajas</h5>
                <ul style={{ color: "#94a3b8", fontSize: 12, paddingLeft: 14, lineHeight: 1.7 }}>
                  <li>Overhead por cambios</li>
                  <li>Quantum critico</li>
                  <li>Mayor turnaround</li>
                  <li>Contexto costoso</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: "1px solid #1e293b" }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#f8fafc" }}>Funcionamiento Visual</h3>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#64748b", fontSize: 12 }}>Ready Queue:</span>
                <div style={{ display: "flex", gap: 6 }}>
                  {["P1", "P2", "P3", "P4"].map((p, i) => (
                    <div key={p} style={{ width: 36, height: 36, background: ["#3b82f6", "#22c55e", "#f97316", "#a855f7"][i], borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <ArrowRight size={16} color="#22d3ee" style={{ transform: "rotate(90deg)" }} />
                <span style={{ color: "#64748b", fontSize: 11 }}>dispatch</span>
              </div>
              
              <div style={{ padding: "16px 32px", background: "#16a34a", borderRadius: 10, border: "2px solid #22c55e" }}>
                <div style={{ textAlign: "center" }}>
                  <span style={{ color: "#bbf7d0", fontSize: 11 }}>CPU</span>
                  <div style={{ fontWeight: 700, fontSize: 20, color: "#fff" }}>P1</div>
                  <span style={{ color: "#bbf7d0", fontSize: 11 }}>Q=4ms</span>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: 40, marginTop: 8 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ color: "#f97316", fontSize: 11 }}>Quantum expira</span>
                  <ArrowRight size={14} color="#f97316" style={{ transform: "rotate(90deg)" }} />
                  <span style={{ color: "#64748b", fontSize: 10 }}>Vuelve a cola</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ color: "#22c55e", fontSize: 11 }}>Termina antes</span>
                  <ArrowRight size={14} color="#22c55e" style={{ transform: "rotate(90deg)" }} />
                  <span style={{ color: "#64748b", fontSize: 10 }}>Sale del sistema</span>
                </div>
              </div>
            </div>
            
            <div style={{ padding: 12, background: "#1e293b", borderRadius: 8 }}>
              <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6, textAlign: "center" }}>
                El proceso recibe exactamente Q milisegundos. Si no termina, 
                vuelve al final de la cola y el siguiente proceso toma la CPU.
              </p>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Frainer Encarnacion</div>
        <div className="slide-number">8 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 9: TEMA 4 - Round Robin Context Switching (Frainer) - Parte 2
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 04</div>
          <h2>Context Switching y Ejemplo Practico</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Context Switching (Cambio de Contexto)</h3>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
              Cuando el quantum expira, el sistema operativo debe guardar el estado del 
              proceso actual y cargar el estado del siguiente. Este proceso tiene un costo.
            </p>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #1e293b", marginBottom: 16 }}>
              <h4 style={{ color: "#f8fafc", fontWeight: 600, marginBottom: 12, fontSize: 14 }}>Pasos del Context Switch:</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { step: "1", text: "Guardar registros de CPU (PC, SP, flags)", color: "#f97316" },
                  { step: "2", text: "Guardar estado del proceso en PCB", color: "#f97316" },
                  { step: "3", text: "Seleccionar siguiente proceso (scheduler)", color: "#22d3ee" },
                  { step: "4", text: "Cargar PCB del nuevo proceso", color: "#22c55e" },
                  { step: "5", text: "Restaurar registros de CPU", color: "#22c55e" },
                  { step: "6", text: "Continuar ejecucion del nuevo proceso", color: "#22c55e" },
                ].map((item) => (
                  <div key={item.step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 24, height: 24, background: item.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 12 }}>
                      {item.step}
                    </div>
                    <span style={{ color: "#94a3b8", fontSize: 13 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ padding: 14, background: "rgba(251,191,36,0.1)", borderRadius: 8, border: "1px solid #f59e0b" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <AlertTriangle size={16} color="#f59e0b" />
                <span style={{ color: "#fcd34d", fontWeight: 600, fontSize: 14 }}>Costo del Context Switch</span>
              </div>
              <p style={{ color: "#fcd34d", fontSize: 12, lineHeight: 1.5 }}>
                Tipicamente 1-10 microsegundos. Con quantum muy pequeno, 
                el overhead puede consumir mas tiempo que el trabajo util.
              </p>
            </div>
          </div>
          
          <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, border: "1px solid #1e293b" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "#f8fafc" }}>Ejemplo: Quantum = 4ms</h3>
            
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {[
                { id: "P1", burst: 8, color: "#3b82f6" },
                { id: "P2", burst: 4, color: "#22c55e" },
                { id: "P3", burst: 6, color: "#f97316" },
              ].map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 28, height: 28, background: p.color, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>
                    {p.id}
                  </div>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{p.burst}ms</span>
                </div>
              ))}
            </div>
            
            <h5 style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>Diagrama de Gantt:</h5>
            <div style={{ display: "flex", height: 36, marginBottom: 6, borderRadius: 4, overflow: "hidden", fontSize: 12 }}>
              <div style={{ flex: 4, background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P1</div>
              <div style={{ flex: 4, background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P2</div>
              <div style={{ flex: 4, background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P3</div>
              <div style={{ flex: 4, background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P1</div>
              <div style={{ flex: 2, background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>P3</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#64748b", marginBottom: 16 }}>
              <span>0</span><span>4</span><span>8</span><span>12</span><span>16</span><span>18</span>
            </div>
            
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #334155" }}>
                  <th style={{ textAlign: "left", padding: "6px 4px", color: "#94a3b8" }}>Proceso</th>
                  <th style={{ textAlign: "center", padding: "6px 4px", color: "#94a3b8" }}>T. Espera</th>
                  <th style={{ textAlign: "center", padding: "6px 4px", color: "#94a3b8" }}>T. Retorno</th>
                  <th style={{ textAlign: "center", padding: "6px 4px", color: "#94a3b8" }}>T. Respuesta</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: "8px 4px", color: "#3b82f6", fontWeight: 600 }}>P1</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#f8fafc" }}>8ms</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#f8fafc" }}>16ms</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#22d3ee" }}>0ms</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #1e293b" }}>
                  <td style={{ padding: "8px 4px", color: "#22c55e", fontWeight: 600 }}>P2</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#f8fafc" }}>4ms</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#f8fafc" }}>8ms</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#22d3ee" }}>4ms</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 4px", color: "#f97316", fontWeight: 600 }}>P3</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#f8fafc" }}>10ms</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#f8fafc" }}>18ms</td>
                  <td style={{ textAlign: "center", padding: "8px 4px", color: "#22d3ee" }}>8ms</td>
                </tr>
              </tbody>
            </table>
            
            <div style={{ marginTop: 12, padding: 10, background: "#1e293b", borderRadius: 6, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center", fontSize: 11 }}>
              <div>
                <div style={{ color: "#94a3b8" }}>Espera Prom.</div>
                <div style={{ color: "#22d3ee", fontWeight: 700, fontSize: 14 }}>7.3ms</div>
              </div>
              <div>
                <div style={{ color: "#94a3b8" }}>Retorno Prom.</div>
                <div style={{ color: "#22d3ee", fontWeight: 700, fontSize: 14 }}>14ms</div>
              </div>
              <div>
                <div style={{ color: "#94a3b8" }}>Respuesta Prom.</div>
                <div style={{ color: "#22d3ee", fontWeight: 700, fontSize: 14 }}>4ms</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Frainer Encarnacion</div>
        <div className="slide-number">9 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 10: TEMA 4 - Fairness y Simulaciones (Frainer) - Parte 3
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 04</div>
          <h2>Fairness: FCFS vs Round Robin</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Comparacion de Equidad (Fairness)</h3>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #dc2626", marginBottom: 16 }}>
              <h4 style={{ color: "#dc2626", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>FCFS - Problema de Equidad</h4>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", height: 32, borderRadius: 4, overflow: "hidden", marginBottom: 4 }}>
                  <div style={{ width: "80%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 12 }}>P1 (80ms)</div>
                  <div style={{ width: "5%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 10 }}>P2</div>
                  <div style={{ width: "5%", background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 10 }}>P3</div>
                  <div style={{ width: "10%", background: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 12 }}>P4</div>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>
                P2 y P3 (procesos cortos) esperan 80ms por P1. 
                Tiempo de respuesta terrible para procesos interactivos.
              </p>
            </div>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #22c55e" }}>
              <h4 style={{ color: "#22c55e", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>Round Robin - Distribucion Equitativa</h4>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", height: 32, borderRadius: 4, overflow: "hidden", marginBottom: 4, fontSize: 10 }}>
                  {["P1", "P2", "P3", "P4", "P1", "P2", "P3", "P4", "P1", "P1"].map((p, i) => (
                    <div key={i} style={{ flex: 1, background: p === "P1" ? "#3b82f6" : p === "P2" ? "#22c55e" : p === "P3" ? "#f97316" : "#a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, borderRight: i < 9 ? "1px solid #0f172a" : "none" }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>
                Todos los procesos reciben tiempo de CPU regularmente.
                P2/P3 responden en los primeros 20ms en lugar de 80ms.
              </p>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Aplicaciones del Mundo Real</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, border: "1px solid #1e293b" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Monitor size={20} color="#3b82f6" />
                  <h4 style={{ color: "#f8fafc", fontWeight: 600, fontSize: 14, margin: 0 }}>Apps en una PC</h4>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>
                  Chrome, VS Code, Spotify, un juego... Round Robin permite que todas 
                  respondan aunque una este haciendo calculos pesados.
                </p>
              </div>
              
              <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, border: "1px solid #1e293b" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Server size={20} color="#22c55e" />
                  <h4 style={{ color: "#f8fafc", fontWeight: 600, fontSize: 14, margin: 0 }}>Servidor Web</h4>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>
                  Multiples usuarios haciendo requests. Round Robin garantiza que 
                  ningun usuario monopolice el servidor.
                </p>
              </div>
              
              <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, border: "1px solid #1e293b" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Code size={20} color="#f97316" />
                  <h4 style={{ color: "#f8fafc", fontWeight: 600, fontSize: 14, margin: 0 }}>JavaScript Event Loop</h4>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>
                  El Event Loop de JS es similar: Task Queue = Ready Queue, 
                  Call Stack = CPU, el loop procesa tareas en orden FIFO.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Frainer Encarnacion</div>
        <div className="slide-number">10 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 11: TEMA 5 - Metricas de Rendimiento (Christopher) - Parte 1
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 05</div>
          <h2>Analisis de Rendimiento: Metricas Clave</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#f8fafc" }}>Metricas de Evaluacion</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { 
                  name: "Tiempo de Espera (Waiting Time)", 
                  desc: "Tiempo total que un proceso pasa en la cola de listos esperando CPU",
                  formula: "T_espera = T_retorno - T_burst",
                  icon: Clock,
                  color: "#f97316"
                },
                { 
                  name: "Tiempo de Retorno (Turnaround Time)", 
                  desc: "Tiempo desde que el proceso llega hasta que termina completamente",
                  formula: "T_retorno = T_fin - T_llegada",
                  icon: RotateCcw,
                  color: "#22c55e"
                },
                { 
                  name: "Tiempo de Respuesta (Response Time)", 
                  desc: "Tiempo desde llegada hasta la primera ejecucion en CPU",
                  formula: "T_respuesta = T_primera_ejecucion - T_llegada",
                  icon: Zap,
                  color: "#22d3ee"
                },
                { 
                  name: "Throughput (Rendimiento)", 
                  desc: "Numero de procesos completados por unidad de tiempo",
                  formula: "Throughput = N_procesos / T_total",
                  icon: BarChart3,
                  color: "#a855f7"
                },
              ].map((metric) => (
                <div key={metric.name} style={{ display: "flex", gap: 12, padding: 12, background: "#0f172a", borderRadius: 8, border: `1px solid ${metric.color}30` }}>
                  <div style={{ padding: 8, background: `${metric.color}20`, borderRadius: 6, height: "fit-content" }}>
                    <metric.icon size={18} color={metric.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: "#f8fafc", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{metric.name}</h4>
                    <p style={{ color: "#94a3b8", fontSize: 11, lineHeight: 1.4, marginBottom: 4 }}>{metric.desc}</p>
                    <code style={{ color: metric.color, fontSize: 10, background: "#1e293b", padding: "2px 6px", borderRadius: 3 }}>{metric.formula}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#f8fafc" }}>Criterios de Optimizacion</h3>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #1e293b", marginBottom: 16 }}>
              <h4 style={{ color: "#f8fafc", fontWeight: 600, marginBottom: 12, fontSize: 14 }}>Objetivos del Planificador:</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { goal: "Maximizar utilizacion de CPU", good: "95%+", bad: "<70%" },
                  { goal: "Maximizar throughput", good: "Alto", bad: "Bajo" },
                  { goal: "Minimizar tiempo de espera", good: "<10ms", bad: ">100ms" },
                  { goal: "Minimizar tiempo de respuesta", good: "<5ms", bad: ">50ms" },
                  { goal: "Garantizar fairness", good: "Equitativo", bad: "Starvation" },
                ].map((item) => (
                  <div key={item.goal} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 8, background: "#1e293b", borderRadius: 6 }}>
                    <span style={{ color: "#f8fafc", fontSize: 12 }}>{item.goal}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "#22c55e", fontSize: 11 }}>{item.good}</span>
                      <span style={{ color: "#64748b", fontSize: 11 }}>/</span>
                      <span style={{ color: "#dc2626", fontSize: 11 }}>{item.bad}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ padding: 14, background: "rgba(34,211,238,0.1)", borderRadius: 8, border: "1px solid #22d3ee" }}>
              <h4 style={{ color: "#22d3ee", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Trade-offs Importantes</h4>
              <ul style={{ color: "#94a3b8", fontSize: 12, paddingLeft: 16, lineHeight: 1.7 }}>
                <li>Mejor respuesta = mas context switches = mas overhead</li>
                <li>Mejor throughput = menos cambios = peor respuesta</li>
                <li>No existe algoritmo perfecto para todos los casos</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Christopher Marrero</div>
        <div className="slide-number">11 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 12: TEMA 5 - Comparacion FCFS vs RR (Christopher) - Parte 2
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide">
        <div className="slide-header">
          <div className="topic-label">Tema 05</div>
          <h2>Comparacion Final: FCFS vs Round Robin</h2>
          <div className="divider" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, flex: 1 }}>
          <div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #1e293b", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Tabla Comparativa de Metricas</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #334155" }}>
                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#94a3b8" }}>Metrica</th>
                    <th style={{ textAlign: "center", padding: "10px 8px", color: "#3b82f6" }}>FCFS</th>
                    <th style={{ textAlign: "center", padding: "10px 8px", color: "#22c55e" }}>RR (Q=4ms)</th>
                    <th style={{ textAlign: "center", padding: "10px 8px", color: "#94a3b8" }}>Ganador</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "T. Espera Prom.", fcfs: "8.5ms", rr: "7.3ms", winner: "rr" },
                    { metric: "T. Retorno Prom.", fcfs: "12.75ms", rr: "14ms", winner: "fcfs" },
                    { metric: "T. Respuesta Prom.", fcfs: "8.5ms", rr: "4ms", winner: "rr" },
                    { metric: "Context Switches", fcfs: "3", rr: "5", winner: "fcfs" },
                    { metric: "Overhead", fcfs: "Bajo", rr: "Medio", winner: "fcfs" },
                    { metric: "Fairness", fcfs: "Pobre", rr: "Excelente", winner: "rr" },
                    { metric: "Complejidad", fcfs: "Simple", rr: "Media", winner: "fcfs" },
                  ].map((row, i) => (
                    <tr key={row.metric} style={{ borderBottom: i < 6 ? "1px solid #1e293b" : "none" }}>
                      <td style={{ padding: "10px 8px", color: "#f8fafc" }}>{row.metric}</td>
                      <td style={{ textAlign: "center", padding: "10px 8px", color: row.winner === "fcfs" ? "#3b82f6" : "#94a3b8" }}>{row.fcfs}</td>
                      <td style={{ textAlign: "center", padding: "10px 8px", color: row.winner === "rr" ? "#22c55e" : "#94a3b8" }}>{row.rr}</td>
                      <td style={{ textAlign: "center", padding: "10px 8px" }}>
                        {row.winner === "rr" ? (
                          <CheckCircle2 size={16} color="#22c55e" />
                        ) : (
                          <CheckCircle2 size={16} color="#3b82f6" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "#0f172a", borderRadius: 8, padding: 12, border: "1px solid #3b82f6" }}>
                <h4 style={{ color: "#3b82f6", fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Usar FCFS cuando:</h4>
                <ul style={{ color: "#94a3b8", fontSize: 11, paddingLeft: 14, lineHeight: 1.6 }}>
                  <li>Procesos batch sin interaccion</li>
                  <li>Simplicidad es prioridad</li>
                  <li>Procesos de duracion similar</li>
                </ul>
              </div>
              <div style={{ background: "#0f172a", borderRadius: 8, padding: 12, border: "1px solid #22c55e" }}>
                <h4 style={{ color: "#22c55e", fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Usar RR cuando:</h4>
                <ul style={{ color: "#94a3b8", fontSize: 11, paddingLeft: 14, lineHeight: 1.6 }}>
                  <li>Sistemas interactivos</li>
                  <li>Tiempo compartido</li>
                  <li>Fairness es critico</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: "#f8fafc" }}>Conclusion del Analisis</h3>
            
            <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: "1px solid #1e293b", marginBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ padding: 12, background: "#1e293b", borderRadius: 8 }}>
                  <h4 style={{ color: "#22d3ee", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>FCFS</h4>
                  <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>
                    Ideal para sistemas batch donde los procesos llegan, se ejecutan completamente, 
                    y no requieren interaccion. Simple pero puede causar convoy effect.
                  </p>
                </div>
                
                <div style={{ padding: 12, background: "#1e293b", borderRadius: 8 }}>
                  <h4 style={{ color: "#22d3ee", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Round Robin</h4>
                  <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>
                    Ideal para sistemas de tiempo compartido donde multiples usuarios 
                    necesitan respuesta rapida. La eleccion del quantum es critica.
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ padding: 14, background: "rgba(34,211,238,0.1)", borderRadius: 8, border: "1px solid #22d3ee" }}>
              <h4 style={{ color: "#22d3ee", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Sistemas Modernos</h4>
              <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>
                Los sistemas operativos modernos (Linux, Windows) usan algoritmos hibridos 
                como CFS (Completely Fair Scheduler) que combinan conceptos de Round Robin 
                con colas multinivel y prioridades dinamicas.
              </p>
            </div>
          </div>
        </div>
        
        <div className="presenter-name">Christopher Marrero</div>
        <div className="slide-number">12 / 13</div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 13: CONCLUSION / THANK YOU
      ═══════════════════════════════════════════════════════════════ */}
      <div className="print-slide" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div>
          <h1 style={{ fontSize: 52, fontWeight: 700, color: "#22d3ee", marginBottom: 24 }}>
            Muchas gracias por su atencion
          </h1>
          
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 18, color: "#94a3b8", marginBottom: 4 }}>Arquitectura del Computador</p>
            <h2 style={{ fontSize: 32, fontWeight: 600, color: "#f8fafc" }}>Grupo: Los Ingenieros</h2>
          </div>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
            {[
              { name: "Algenis De los Santos", icon: Users },
              { name: "Oliver Abreu", icon: Cpu },
              { name: "Enmanuel Santos", icon: Clock },
              { name: "Frainer Encarnacion", icon: RotateCcw },
              { name: "Christopher Marrero", icon: BarChart3 },
            ].map((member) => (
              <div key={member.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", background: "#0f172a", borderRadius: 10, border: "1px solid #1e293b" }}>
                <member.icon size={22} color="#22d3ee" />
                <span style={{ color: "#f8fafc", fontSize: 16, fontWeight: 500 }}>{member.name}</span>
              </div>
            ))}
          </div>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <Cpu size={36} color="#22d3ee" />
            <Clock size={36} color="#22d3ee" />
            <BarChart3 size={36} color="#22d3ee" />
          </div>
        </div>
        
        <div className="slide-number">13 / 13</div>
      </div>
    </div>
  )
}
