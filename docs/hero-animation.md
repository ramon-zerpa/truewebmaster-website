# Hero: flujo satinado de True Webmaster

La petición del propietario y el briefing `C:\Users\raymo\Downloads\prompt-codex-hero-wow-truewebmaster.md` sustituyen la anterior dirección de ondas SVG. El cambio se limita al fondo del hero de Home EN/ES; conserva copy, logo, paleta, Outfit 700/DM Sans y narrativa.

## Arquitectura

`src/components/HeroFlow.astro` ocupa el fondo completo de `.hero` en `src/templates/Home.astro`, detrás del contenido y sin capturar clics. No hay framework hidratado, video, Three.js ni dependencias nuevas. El módulo de dibujo se importa después de idle; el contenido HTML y la composición estática están disponibles antes.

- `src/lib/hero-flow/shaders.ts`: WebGL 1, un triángulo de pantalla completa, ruido procedural en dos dominios deformados, pliegues anchos, crestas satinadas y sombras. Campo dirigido en movimiento continuo; el puntero produce una deformación local amortiguada, no seguimiento agresivo.
- `src/lib/hero-flow/renderer.ts`: selección de renderer, dibujo, resize, control, visibilidad y adaptación. Canvas 2D dibuja cintas rellenas con luz siguiendo su curva cuando WebGL falla, pierde contexto o el dispositivo indica presupuesto bajo. Si ambos renderers fallan, permanece el poster.
- `src/lib/hero-flow/config.ts`: parámetros compartidos de dirección artística y presupuestos.
- `public/images/hero-flow-poster.webp`: composición estática de cintas, para reduced motion, ausencia de JS y fallo completo. Generada mediante `scripts/prepare-hero-poster.mjs`; su fuente vectorial está en `docs/hero-flow-static.svg`.

La diferencia frente a las ondas anteriores es material: se deforma un campo completo y se calcula luz sobre sus pliegues; no se trasladan dos líneas SVG. El Canvas simplifica ese material a cintas para mantener continuidad de intención visual en equipos sin WebGL.

## Ajustes de dirección artística

Editar primero `warpStrength` (deformación), `highlightIntensity` (luz de los pliegues), `calmZoneStrength` (protección detrás del mensaje) y `speed` (ritmo). Luego ajustar `bandSoftness`, `contrast`, `opacity`, `blurAmount`, `animationScale`, `edgeDepth`, `pointerStrength`, `pointerRadius`, `grainAmount` y los cinco stops de `palette`. La paleta actual deriva de Night, Depth y Signal aprobados, con una luz fría desaturada. No hay cambio de hue automático.

El componente admite `config` como override parcial; la Home utiliza el preset compartido en ambos idiomas. Regenerar el poster al cambiar la paleta o la geometría. La textura granular y el dominio doble son propios de WebGL; Canvas simplifica el sombreado, y el poster no intenta reproducir cada frame de la GPU.

## Rendimiento y accesibilidad

- DPR máximo 1,25 y backbuffer máximo aproximado 720.000 píxeles (360.000 en Canvas), incluso en pantallas retina. El blur atmosférico también suaviza esa resolución reducida.
- Objetivo de dibujo: 30 fps desktop, 24 en puntero táctil, 18 en Canvas. Es un límite, no una garantía de rendimiento medido en todos los dispositivos.
- Adaptación ante pérdida sostenida de presupuesto de frames: reducir resolución/frecuencia, pasar de WebGL a Canvas o bajar Canvas a 12 fps. Sin lecturas síncronas de GPU en producción.
- Un buffer de geometría, uniformes cacheados y coordenadas/materiales preasignados en Canvas; sin asignaciones grandes por frame. El gradiente de lectura de Canvas es pequeño y acotado.
- Detener RAF al salir el hero de pantalla, ocultarse la pestaña, pausar manualmente o activar reduced motion. El tiempo se conserva para reanudar sin salto.
- Reduced motion desde el inicio evita cargar el renderer y muestra el poster; al activar la preferencia durante la sesión congela el frame. Sin JS hay atmósfera estática y contenido completo.
- Control de pausa EN/ES, teclado, foco visible y objetivo mínimo 44 px. Canvas es decorativo y está fuera del árbol accesible. El contraste y la información pertenecen al HTML.
- Error de importación, shader incompatible y pérdida de contexto tienen degradación segura. Resize y salida de página liberan recursos/listeners propios cuando corresponde.

Referencia técnica contrastada: [MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices) y [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

## Validación

`node scripts/hero-flow-check.mjs` comprueba WebGL EN desktop/ES móvil, movimiento efectivo mediante imágenes distintas, pausa/reanudación, presupuesto de píxeles, offscreen, reduced motion y recuperación de contexto. Fuerza fallos de WebGL y Canvas para comprobar ambas alternativas; verifica poster y control oculto sin JS/reduced motion. Incluye reglas automáticas de contraste, nombre del control y encabezados del hero. Usa respuestas originales del build mediante transporte Node para evitar la inyección externa del navegador documentada en el handoff.

`scripts/browser-check.mjs` conserva las pruebas generales responsive, menú y showcase. Los informes/capturas quedan en `artifacts/`, excluidos de Git. Estas pruebas funcionales no certifican LCP, CWV de campo ni rendimiento de hardware físico; la medición en un navegador limpio y dispositivos reales sigue siendo un requisito de release.
