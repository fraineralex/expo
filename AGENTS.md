# AGENTS.md - Instrucciones para Modificar la Presentacion

## Estructura del Proyecto

Este proyecto contiene dos versiones de la presentacion:

1. **Version Dinamica (Principal)**: `/components/websim/slides.tsx` y `/components/websim-presentation.tsx`
   - Contiene animaciones interactivas
   - Se visualiza en la pagina principal `/`
   - Es la version que se presenta en vivo

2. **Version Estatica (Para PDF)**: `/app/print/page.tsx`
   - Version simplificada sin animaciones
   - Optimizada para exportar a PDF
   - Se accede via `/print` o presionando `Ctrl+P` en la presentacion principal
   - El nombre del PDF sera: `Los_Ingenieros_Asignacion04_Uso de los simuladores de Memoria.pdf`

## IMPORTANTE: Sincronizacion de Contenido

Cuando modifiques el contenido de la presentacion dinamica, **DEBES** tambien actualizar la version estatica para mantener la coherencia. Esto incluye:

- Cambios en el texto o explicaciones
- Adicion o eliminacion de slides
- Cambios en los participantes o sus temas
- Modificaciones en los ejemplos o diagramas
- Cualquier correccion de informacion

### Pasos para Modificar:

1. **Primero** modifica la version dinamica en `/components/websim/slides.tsx`
2. **Luego** actualiza la version estatica en `/app/print/page.tsx` con los mismos cambios de contenido
3. Asegurate de mantener:
   - Los mismos titulos y subtitulos
   - La misma informacion y datos
   - Los nombres de los presentadores correctos
   - El numero total de slides actualizado (ej: "X / 13")

## Estructura de Slides por Participante

Cada participante tiene **2-3 slides** asignadas:

| Participante | Tema | Slides |
|--------------|------|--------|
| Algenis De los Santos | Tema 1: Introduccion al Simulador WebSim | 2-3 |
| Oliver Abreu | Tema 2: Procesos CPU-bound vs I/O-bound | 4-5 |
| Enmanuel Santos | Tema 3: Algoritmo FCFS | 6-7 |
| Frainer Encarnacion | Tema 4: Algoritmo Round Robin | 8-10 |
| Christopher Marrero | Tema 5: Analisis de Rendimiento | 11-12 |

Slide 1: Titulo
Slide 13: Conclusion/Agradecimiento

## Estilo y Formato

### Version Dinamica
- Usa animaciones con `useState` y `useEffect`
- Incluye simulaciones interactivas
- Colores principales: cyan (#22d3ee), slate backgrounds (#0a0a1a, #0f172a)

### Version Estatica
- Sin animaciones ni estados
- Contenido estatico pero visualmente similar
- Debe incluir:
  - Clase CSS `.slide-header` para los encabezados
  - Clase `.presenter-name` para el nombre del presentador
  - Clase `.slide-number` para el numero de slide

## Exportar a PDF

1. Desde la presentacion principal, presionar `Ctrl+P`
2. Se abrira la version estatica en una nueva pestana
3. Se activara automaticamente el dialogo de impresion del navegador
4. Seleccionar "Guardar como PDF"
5. Asegurarse de:
   - Orientacion: Horizontal (Landscape)
   - Margenes: Ninguno
   - Activar "Graficos de fondo" para mantener los colores oscuros

## Notas Adicionales

- El grupo se llama: **Los Ingenieros**
- La asignatura es: **Arquitectura del Computador**
- Todos los textos deben estar en espanol
- Evitar tildes en el codigo para prevenir problemas de encoding en PDF
