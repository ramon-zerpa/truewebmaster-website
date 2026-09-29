# H1: entrada editorial por líneas

Alcance: exclusivamente el H1 de Home EN/ES, según `prompt-codex-h1-hero-truewebmaster.md`. Texto, saltos responsive, tipografía, layout, CTA, fondo y cards se conservan. No hay modificaciones en ninguno de los dos sistemas de animación aprobados.

## Archivos

- `src/templates/Home.astro`: sustituye solo el marcado del H1 por `HeroHeadline`, con los mismos dos textos localizados.
- `src/components/HeroHeadline.astro`: H1 semántico, texto original y guardia de entrada previa al primer pintado. Sus estilos afectan únicamente a ese encabezado.
- `src/lib/hero-headline/reveal.ts`: mide las líneas reales con Range después de `document.fonts.ready`; crea máscaras visuales temporales y anima con Web Animations API. No separa letras ni cambia los nodos originales.
- `src/lib/hero-headline/config.ts`: parámetros de dirección artística.
- `scripts/hero-headline-check.mjs`: prueba focalizada, sin controlar el renderer ni las cards.

## Movimiento y estado

Una entrada por carga: máscara editorial ascendente, recorrido de 14 px, blur inicial de 1,4 px y stagger de 70 ms. Easing suave, sin rebote, escala ni rotación. La duración de cada línea es 650 ms; el total depende de las líneas reales del idioma y viewport. Después desaparecen máscaras, animaciones y `will-change`; el título vuelve a ser el texto original, nítido y seleccionable.

El H1 reserva siempre su geometría mediante el contenido original. Las máscaras son absolutas y no participan del layout. Si se redimensiona durante la entrada, se restaura inmediatamente el H1 original, sin reejecutar ni forzar líneas antiguas. Un watchdog de 1500 ms muestra el texto si la preparación tarda demasiado: no deja un H1 invisible esperando fuentes o un módulo fallido. Errores de creación de animación también restauran el texto.

## Accesibilidad

Un único H1 conserva su contenido íntegro. Las copias visuales tienen `aria-hidden=true`; el texto original nunca recibe `display:none`, `visibility:hidden` ni `aria-hidden`. La opacidad temporal no elimina su nombre accesible. El lector de pantalla recibe el titular completo, sin fragmentos ni anuncios de animación.

Reduced motion por defecto muestra el H1 completo inmediatamente, sin máscara, viaje ni blur. Si la preferencia cambia durante la entrada, se cancelan las capas temporales. La alternativa configurable `fade` solo aplica 160 ms de opacidad, sin movimiento espacial. Sin JS, el texto original aparece normalmente. La entrada no añade escuchadores ni eventos a los otros dos sistemas del hero.

## Parámetros iniciales

Empezar por `durationMs`, `lineStaggerMs`, `blurPx` y `travelPx`. Después `easing`, `delayMs` y `startOpacity`. `reducedMotion` admite `instant` o `fade`; `lateStartLimitMs` limita la preparación y debe mantenerse corto. No aumentar el blur o el recorrido para convertir esta entrada fina en otro efecto dominante.

## Evidencia

Astro check/build y verificador de 23 rutas pasan. La prueba focalizada verifica EN desktop y ES móvil: nombre accesible único, copy exacto, líneas visuales equivalentes, geometría estable, eliminación de máscaras al terminar y ausencia de overflow/errores. Reduced motion y ausencia de JS conservan el titular completo y visible. Capturas e informe en `artifacts/`, excluidos de Git; transporte de respuestas originales para evitar la interferencia externa del navegador documentada previamente.
