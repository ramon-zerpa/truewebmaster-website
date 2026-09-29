# Cinco etapas: secuencia activa del hero

Implementa la petición del propietario y `prompt-codex-hero-cards-truewebmaster.md`: un único sistema que transmite la atención desde la etapa 1 hasta la 5. El fondo satinado existente se conserva. Solo cambia el journey del hero EN/ES; los journeys de secciones e interiores siguen estáticos.

## Estructura y lógica

- `src/components/HeroJourney.astro`: lista ordenada, contenido desde `src/lib/content.ts`, controles reales por etapa, indicador de handoff, spotlight y estilos scoped. `Journey.astro` selecciona este componente exclusivamente cuando recibe `hero`.
- `src/lib/hero-journey/controller.ts`: estado único del grupo, índice activo, temporizador, hover, foco, pausa manual, visibilidad y movimiento reducido. Sin dependencias ni framework hidratado.
- `src/lib/hero-journey/config.ts`: preset compartido entre idiomas, editable sin tocar el contenido.

Cada etapa permanece visible; seleccionar una mueve el énfasis, no cambia ni oculta información. El autoplay recorre 1→2→3→4→5→1. Hover pausa y el foco de teclado tiene prioridad si ambos existen. Al terminar la interacción se espera antes de continuar desde la etapa elegida. En táctil, tap selecciona una etapa y cede de nuevo al autoplay; la activación de teclado mantiene el foco y pausa.

El estado activo usa Depth, texto claro y borde definido; Signal viaja sobre el indicador compartido y aporta una luz localizada. La luz mantiene el contraste durante las transiciones, evitando el cruce entre letras oscuras y fondos oscuros. El indicador es horizontal en desktop y vertical en móvil. Micro-tilt máximo por eje aproximadamente ±0,325° y escala 1,006 solo en puntero fino/hover: no flips, bounce, desplazamientos grandes ni parallax de scroll.

## Control y accesibilidad

“Pause sequence / Pausar secuencia” detiene solo las etapas. La pausa del fondo también detiene la secuencia para suspender todo el hero; mientras esté activa, el control de secuencia está deshabilitado. La pausa propia se conserva al reanudar el fondo. Hover/foco dejan de avanzar automáticamente; Escape/Tab usan las acciones nativas de los controles.

Las cinco acciones son botones con nombres EN/ES y `aria-pressed`, dentro de una lista de cinco pasos con encabezados. Foco visible y objetivos que abarcan la card completa. Sin live region repetitiva: el autoplay no genera anuncios cada pocos segundos. Spotlight no es la única señal: también cambian superficie, borde e indicador.

Reduced motion desactiva autoplay, pulso, tilt y desplazamiento animado. El preset `manual` permite destacar una etapa con teclado/puntero sin transición; `static` conserva la selección inicial. Ninguna opción permite ignorar la preferencia del usuario. Sin JS, siguen las cinco etapas originales con el énfasis estático de la tercera y los controles de animación ocultos.

La secuencia no usa RAF continuo: un temporizador que se cancela al pausar, salir el grupo de pantalla, ocultarse la pestaña o abandonar la página. El puntero solo modifica la card interactuada; los efectos tienen una amplitud pequeña. Conexión local mediante `hero-motion-change` con el renderer existente; no hay servicios externos.

## Ajustes iniciales

Editar primero `autoplayMs` (3200 ms), `handoffDelayMs` (500 ms), `transitionMs` (650 ms) y `resumeDelayMs` (2200 ms). Luego `activeContrast`, `siblingOpacity`, `glowIntensity`, `borderEmphasis`, `activeScale`, `pulseMs`, `spotlightIntensity`, `tiltDegrees` y `reducedMotionBehavior`. Mantener los valores visuales próximos al preset y revalidar contraste al aumentarlos.

## Pruebas

`node scripts/hero-journey-check.mjs`: ciclo completo, hover sostenido, prioridad y permanencia del foco, reanudación, pausa propia y conjunta, offscreen, selección táctil, modo reducido manual, cinco etapas sin JS y reglas automatizadas de contraste/nombres/encabezados. Capturas e informe en `artifacts/`, excluidos de Git. Usa respuestas originales mediante transporte Node por la interferencia del navegador ya documentada; no es una medición de rendimiento de red ni una certificación WCAG completa.
