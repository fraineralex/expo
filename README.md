# Los Ingenieros - PROYECTO FINAL

Presentacion interactiva de Los Ingenieros para Arquitectura del Computador.

## Participantes

- Algenis De los Santos Lopez
  Slides: `2`
  Trabajo realizado: medicion de rendimiento del procesador y explicacion de la formula `T = (I x CPI) / f`.
- Christopher Enrique Marrero Liriano
  Slides: `3`
  Trabajo realizado: simulacion del procesador monociclo y analisis del tiempo util frente al tiempo desperdiciado.
- Enmanuel Santos Diaz
  Slides: `4`
  Trabajo realizado: explicacion del pipeline de 5 etapas (`IF`, `ID`, `EX`, `MEM`, `WB`) con la analogia de cocina industrial.
- Frainer Encarnacion
  Slides: `5`
  Trabajo realizado: comparacion directa entre monociclo y pipeline, speedup y ejemplos del mundo real.
- Oliver Abreu Mateo
  Slides: `6`
  Trabajo realizado: limitaciones reales del pipeline, incluyendo riesgos de datos, control y estructura.

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
