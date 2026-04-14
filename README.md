# Los Ingenieros - PROYECTO_FINAL

Presentacion interactiva hecha en React por el grupo Los Ingenieros para la asignatura Arquitectura del Computador.

## Participantes

### **Algenis De los Santos Lopez**

- Slides: `2`
- Explico la medicion de rendimiento del procesador.
- Presento la formula `T = (I x CPI) / f`.
- Explico el significado de `I` como cantidad de instrucciones.
- Explico el significado de `CPI` como ciclos por instruccion.
- Explico el papel de la frecuencia en el tiempo total de ejecucion.
- Relaciono los cambios de instrucciones, CPI y frecuencia con el rendimiento final.

### **Christopher Enrique Marrero Liriano**

- Slides: `3`
- Presento la simulacion del procesador monociclo.
- Explico como funciona un procesador que completa una instruccion por ciclo.
- Mostro que el ciclo queda condicionado por la instruccion mas lenta.
- Explico la diferencia entre tiempo util y tiempo desperdiciado.
- Analizo el impacto de instrucciones como `LOAD`, `STORE`, `ADD` y `SUB`.
- Mostro por que el monociclo es simple, pero menos eficiente en aprovechamiento del hardware.

### **Enmanuel Santos Diaz**

- Slides: `4`
- Presento el pipeline de 5 etapas.
- Explico cada etapa: `IF`, `ID`, `EX`, `MEM` y `WB`.
- Uso la analogia de cocina industrial para facilitar la comprension.
- Explico como varias instrucciones pueden avanzar al mismo tiempo.
- Mostro la idea de llenado inicial del pipeline.
- Explico por que el pipeline mejora el throughput del procesador.

### **Frainer Encarnacion**

- Slides: `5`
- Presento la comparacion directa entre monociclo y pipeline.
- Explico el concepto de speedup.
- Mostro como calcular la mejora de rendimiento entre ambas arquitecturas.
- Presento ejemplos del mundo real para comparar ambos enfoques.
- Explico el concepto de throughput en el pipeline.
- Relaciono la mejora del pipeline con tareas practicas como imagen, video y procesamiento de datos.

### **Oliver Abreu Mateo**

- Slides: `6`
- Presento las limitaciones reales del pipeline.
- Explico los riesgos de datos.
- Explico los riesgos de control.
- Explico los riesgos estructurales.
- Describio conceptos como stalls, burbujas y flush.
- Explico como estos problemas afectan el rendimiento real del pipeline.

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
