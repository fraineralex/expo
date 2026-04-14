# Los Ingenieros - PROYECTO FINAL

Presentacion interactiva hecha en React por el grupo Los Ingenieros para la asignatura Arquitectura del Computador.

## Participantes

### **Algenis De los Santos Lopez**

- Slides: `2`
- Archivo principal: `components/pipeline/slides.tsx:232`
- Archivo impreso: `app/print/page.tsx:381`
- Explicó la medición de rendimiento del procesador.
- Presentó la fórmula `T = (I x CPI) / f`.
- Explicó el significado de `I` como cantidad de instrucciones.
- Explicó el significado de `CPI` como ciclos por instrucción.
- Explicó el papel de la frecuencia en el tiempo total de ejecución.
- Relacionó los cambios de instrucciones, CPI y frecuencia con el rendimiento final.

### **Christopher Enrique Marrero Liriano**

- Slides: `3`
- Archivo principal: `components/pipeline/slides.tsx:756`
- Archivo impreso: `app/print/page.tsx:428`
- Presentó la simulación del procesador monociclo.
- Explicó cómo funciona un procesador que completa una instrucción por ciclo.
- Mostró que el ciclo queda condicionado por la instrucción más lenta.
- Explicó la diferencia entre tiempo útil y tiempo desperdiciado.
- Analizó el impacto de instrucciones como `LOAD`, `STORE`, `ADD` y `SUB`.
- Mostró por qué el monociclo es simple, pero menos eficiente en aprovechamiento del hardware.

### **Enmanuel Santos Diaz**

- Slides: `4`
- Archivo principal: `components/pipeline/slides.tsx:1082`
- Archivo impreso: `app/print/page.tsx:473`
- Presentó el pipeline de 5 etapas.
- Explicó cada etapa: `IF`, `ID`, `EX`, `MEM` y `WB`.
- Usó la analogía de cocina industrial para facilitar la comprensión.
- Explicó cómo varias instrucciones pueden avanzar al mismo tiempo.
- Mostró la idea de llenado inicial del pipeline.
- Explicó por qué el pipeline mejora el throughput del procesador.

### **Frainer Encarnacion**

- Slides: `5`
- Archivo principal: `components/pipeline/slides.tsx:1718`
- Archivo impreso: `app/print/page.tsx:507`
- Presentó la comparación directa entre monociclo y pipeline.
- Explicó el concepto de speedup.
- Mostró cómo calcular la mejora de rendimiento entre ambas arquitecturas.
- Presentó ejemplos del mundo real para comparar ambos enfoques.
- Explicó el concepto de throughput en el pipeline.
- Relacionó la mejora del pipeline con tareas prácticas como imagen, video y procesamiento de datos.

### **Oliver Abreu Mateo**

- Slides: `6`
- Archivo principal: `components/pipeline/slides.tsx:3193`
- Archivo impreso: `app/print/page.tsx:548`
- Presentó las limitaciones reales del pipeline.
- Explicó los riesgos de datos.
- Explicó los riesgos de control.
- Explicó los riesgos estructurales.
- Describió conceptos como stalls, burbujas y flush.
- Explicó cómo estos problemas afectan el rendimiento real del pipeline.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

Descarga Node.js desde: [https://nodejs.org/](https://nodejs.org/)

## Como Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador para ver la presentacion principal.

## Manual De Usuario

1. Ejecuta `npm install` para instalar las dependencias del proyecto.
2. Ejecuta `npm run dev` para iniciar el servidor de desarrollo.
3. Abre `http://localhost:3000` para ver la presentacion interactiva principal.
4. Usa las flechas, botones o el control remoto para avanzar y retroceder entre slides.
5. En `http://localhost:3000/remote` puedes controlar la presentacion desde otro dispositivo.
6. En `http://localhost:3000/print` puedes abrir la version estatica orientada a impresion y exportacion a PDF.
7. Para generar una version lista para produccion, ejecuta `npm run build`.

## Rutas principales

- `/` presentacion interactiva
- `/remote` control remoto desde celular
- `/print` version estatica para exportar a PDF

## Verificacion

```bash
npm run build
```
