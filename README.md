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

### Vista General

- Ejecuta `npm install` para instalar las dependencias del proyecto.
- Ejecuta `npm run dev` para iniciar el servidor de desarrollo.
- Abre `http://localhost:3000` para ver la presentación interactiva principal.
- Usa los botones `Anterior` y `Siguiente`, las flechas del teclado o el control remoto para moverte entre slides.
- Abre `http://localhost:3000/remote` si quieres controlar la presentación desde otro dispositivo.
- Abre `http://localhost:3000/print` si necesitas la versión estática para explicación o exportación a PDF.
- Ejecuta `npm run build` para validar que el proyecto compila correctamente.

### Slide 1: Portada

- Muestra el título general del proyecto y el nombre del grupo `Los Ingenieros`.
- Sirve como introducción visual al tema de monociclo vs pipeline.
- Presenta los nombres de los integrantes del equipo.
- Muestra visualmente las etapas `IF`, `ID`, `EX`, `MEM` y `WB`.
- No tiene configuración manual ni simulación ejecutable.
- Solo debes usarlo como slide de apertura y contexto general del proyecto.

### Slide 2: Medición de Rendimiento

- Explica cómo se mide el rendimiento de un procesador usando la fórmula `T = (I x CPI) / f`.
- Muestra teoría sobre tiempo de ejecución, CPI y frecuencia del reloj.
- Incluye un panel de análisis automático que interpreta los valores seleccionados.
- Tiene una barra de progreso que representa el avance de la ejecución simulada.
- Muestra métricas en vivo como ciclo actual, tiempo de ciclo, ciclos totales y tiempo de CPU.
- Permite ver el cálculo detallado del resultado en tiempo real.

### Cómo ejecutar la simulación del Slide 2

- Pulsa `Iniciar` para comenzar la simulación.
- Pulsa `Pausar` para detener temporalmente la ejecución.
- Pulsa `Paso` para avanzar manualmente un ciclo por vez.
- Pulsa `Reiniciar` para volver al estado inicial.
- Mientras la simulación está corriendo, los controles deslizantes quedan bloqueados.

### Cómo configurar el Slide 2

- Ajusta `Instrucciones (I)` con el control deslizante para cambiar la carga de trabajo.
- Ajusta `CPI` entre `1` y `5` en pasos de `0.5`.
- Ajusta `Frecuencia (MHz)` entre `100` y `4000`.
- Un número mayor de instrucciones aumenta el tiempo total de CPU.
- Un CPI mayor representa instrucciones más costosas en ciclos.
- Una frecuencia mayor reduce el tiempo de ciclo y mejora el tiempo final.

### Slide 3: Procesador Monociclo

- Muestra una simulación visual del comportamiento de un procesador monociclo.
- Usa instrucciones como `ADD`, `LOAD`, `SUB`, `STORE`, `AND` y `OR`.
- Enseña que todas las instrucciones dependen del tiempo del ciclo más largo.
- Distingue gráficamente entre tiempo útil y tiempo desperdiciado.
- Incluye una línea de tiempo por instrucción y un resumen estadístico lateral.
- Presenta el resultado final con el porcentaje total de desperdicio al completar la simulación.

### Cómo ejecutar la simulación del Slide 3

- Pulsa `Simular` para iniciar la ejecución automática.
- Pulsa `Pausar` para detener el avance.
- Pulsa `Paso` para avanzar instrucción por instrucción.
- Pulsa `Reiniciar` para volver al ciclo `0`.
- Observa cómo se ilumina la instrucción activa y cómo se acumulan tiempo útil y desperdicio.

### Cómo interpretar el Slide 3

- La barra verde representa tiempo útil.
- La barra roja representa tiempo desperdiciado.
- `LOAD` fija el ciclo global del monociclo en el ejemplo mostrado.
- Las instrucciones más cortas esperan a que termine el ciclo completo.
- El panel lateral muestra el tiempo ejecutado, útil y desperdiciado.
- El resultado final resume la ineficiencia acumulada del modelo monociclo.

### Slide 4: Pipeline de 5 Etapas

- Presenta una analogía de cocina industrial para explicar el pipeline.
- Relaciona cada estación de la cocina con `IF`, `ID`, `EX`, `MEM` y `WB`.
- Muestra varias instrucciones avanzando simultáneamente por diferentes etapas.
- Incluye un diagrama de Gantt para visualizar paralelismo por ciclo.
- Muestra métricas como pedidos completados, eficiencia, throughput y ciclo actual.
- Señala automáticamente un `data hazard` en ciertos ciclos del ejemplo.

### Cómo ejecutar la simulación del Slide 4

- Pulsa `Play` para iniciar el movimiento del pipeline.
- Pulsa `Pausa` para detener la simulación.
- Usa la flecha izquierda para retroceder un ciclo.
- Usa la flecha derecha para avanzar un ciclo.
- Pulsa el botón de reinicio para volver al ciclo inicial.
- Puedes pasar el cursor sobre cada estación para ver su explicación.

### Cómo configurar el Slide 4

- Ajusta `Velocidad` entre `300 ms` y `1500 ms` por ciclo.
- Una velocidad menor hace que la simulación avance más rápido.
- Una velocidad mayor hace que cada ciclo tarde más en mostrarse.
- Observa el indicador de `Throughput` para ver cuántos platos por ciclo se completan.
- Observa la alerta de `Hazard` para identificar conflictos entre instrucciones.
- Usa el diagrama de Gantt para explicar cómo se superponen las etapas.

### Slide 5: Comparación Directa y Speedup

- Compara monociclo y pipeline en escenarios prácticos.
- Tiene cuatro pestañas: `Mundo Real`, `Carreras`, `Throughput` y `Calculadora`.
- Permite demostrar el speedup de varias maneras.
- Incluye visualizaciones de tareas reales como compresión, copia, base de datos, correos, video y ZIP.
- Incluye simulaciones abstractas para explicar paralelismo y throughput.
- También incorpora una calculadora de speedup y una sección basada en la Ley de Amdahl.

### Cómo usar la pestaña Mundo Real

- Selecciona una tarea en el panel izquierdo.
- Pulsa `Ejecutar` para correr la comparación entre monociclo y pipeline.
- Pulsa `Pausar` para detener temporalmente la ejecución.
- Pulsa el botón de reinicio para volver al estado inicial.
- Observa el progreso de ambos modelos en paralelo.
- Al finalizar, revisa el tiempo de monociclo, el tiempo de pipeline, el ahorro y el `Speedup Real`.

### Cómo usar la pestaña Carreras

- Cambia la `Velocidad` con el control deslizante.
- Cambia el número de `Etapas` entre `3` y `7`.
- Pulsa `Iniciar` para comenzar la carrera.
- Pulsa `Pausar` para detener el movimiento.
- Pulsa el botón de reinicio para restablecer posiciones y contadores.
- Usa esta pestaña para explicar visualmente por qué más etapas permiten más trabajo simultáneo.

### Cómo usar la pestaña Throughput

- Pulsa `Simular` para iniciar la carga de aplicaciones.
- Pulsa `Pausar` para detener el avance.
- Pulsa el botón de reinicio para limpiar la cola y volver al estado inicial.
- Observa cómo el monociclo procesa una app a la vez.
- Observa cómo el pipeline procesa varias apps en diferentes etapas al mismo tiempo.
- Al finalizar, compara ciclos totales, throughput y speedup final.

### Cómo usar la pestaña Calculadora

- Ajusta `Número de Instrucciones` para comparar tiempos entre monociclo y pipeline.
- Observa cómo cambia el speedup calculado automáticamente.
- Ajusta `P (Porción Paralela)` para la Ley de Amdahl.
- Ajusta `N (Procesadores)` para ver el speedup máximo teórico.
- Interpreta el límite superior del speedup cuando la porción serial no puede paralelizarse.
- Usa esta pestaña para respaldar la explicación matemática del rendimiento.

### Slide 6: Limitaciones Reales del Pipeline

- Explica tres escenarios: `Normal`, `Riesgo de Datos` y `Riesgo de Control`.
- Muestra cómo cambian las instrucciones y las etapas según el escenario.
- Visualiza `stall`, `burbuja`, `flush` y ejecución normal.
- Incluye una leyenda de colores para interpretar el comportamiento del pipeline.
- Resume el impacto en rendimiento según el tipo de conflicto.
- Sirve para demostrar que el pipeline mejora el rendimiento, pero también introduce problemas reales.

### Cómo ejecutar la simulación del Slide 6

- Selecciona uno de los escenarios disponibles.
- Pulsa `Simular` para iniciar el avance por ciclos.
- Pulsa `Pausar` para detener la ejecución.
- Pulsa `Reset` para reiniciar el escenario actual.
- Cambiar de escenario también reinicia automáticamente la simulación.
- Observa las celdas activas, las burbujas y los `flush` en la tabla principal.

### Cómo interpretar el Slide 6

- En `Normal`, el pipeline avanza sin conflictos y maximiza el throughput.
- En `Riesgo de Datos`, aparecen `stall` y `burbuja` por dependencias entre instrucciones.
- En `Riesgo de Control`, las instrucciones posteriores a un salto pueden ser descartadas con `flush`.
- El panel derecho resume el tipo de riesgo seleccionado.
- La leyenda ayuda a distinguir etapa activa, stall y flush.
- El bloque final de impacto resume cómo cada riesgo afecta el rendimiento real.

### Slide 7: Gracias

- Muestra el cierre de la presentación.
- Presenta nuevamente a los integrantes del equipo.
- Reafirma la identidad del grupo `Los Ingenieros`.
- No contiene simulaciones ni parámetros configurables.
- Funciona como cierre formal de la exposición.
- Debe usarse como slide final de agradecimiento antes del control remoto.

### Slide 8: Control Remoto

- Muestra un código QR para controlar la presentación desde el celular.
- Genera dinámicamente la URL del control remoto.
- Si la URL está restringida, muestra instrucciones alternativas.
- Explica que desde el móvil se puede navegar entre diapositivas y controlar simulaciones.
- No tiene simulaciones de arquitectura, sino una utilidad de apoyo para la exposición.
- Debe usarse como slide de apoyo logístico para la presentación en vivo.

### Cómo usar el control remoto

- Abre la presentación principal en la pantalla donde vas a exponer.
- Abre `http://localhost:3000/remote` en tu celular o escanea el QR si la URL es accesible.
- Usa los botones `Anterior` y `Siguiente` para moverte entre slides.
- En los slides con simulación, usa los controles remotos para `play`, `pause`, `step` y `reset` cuando estén disponibles.
- Mantén ambos dispositivos en la misma URL base para que la sincronización funcione correctamente.
- Si aparece una advertencia de acceso restringido, usa una URL pública o la ruta directa accesible desde el otro dispositivo.

## Rutas principales

- `/` presentacion interactiva
- `/remote` control remoto desde celular
- `/print` version estatica para exportar a PDF

## Verificacion

```bash
npm run build
```
