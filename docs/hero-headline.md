# H1 del hero: estado actual

El 29/09/2026 el propietario rechazó la animación de entrada del H1 y solicitó retirarla. Home EN/ES usa un H1 semántico estático en `src/templates/Home.astro`, con Outfit 700 y saltos responsive.

Posteriormente aprobó este nuevo copy EN: “Your next customer is already looking. Make sure your business is ready to respond.” El salto explícito separa las frases; ES: “Tu próximo cliente ya está buscando. Asegúrate de que tu negocio esté listo para responder.” El párrafo también fue sustituido por el texto nuevo del propietario y su equivalente ES. El tamaño del H1 desde 768 px se ajusta por idioma para conservar dos líneas; móvil mantiene lectura natural sin forzar ancho. Verificado a 768, 1024 y 1440 px en dos líneas EN/ES, y a 320/390 px sin overflow.

Se retiraron `HeroHeadline.astro`, su configuración, el módulo de reveal y su prueba específica. No quedan máscaras, blur, temporizadores de entrada ni JavaScript del H1. El título está visible desde el HTML inicial, también sin JavaScript y con movimiento reducido.

## Última corrección: segunda frase dominante

El propietario sustituyó la composición anterior de dos líneas totales: la primera frase conserva su tamaño menor y la segunda usa `.hero-headline-emphasis`, más grande y dividida en dos líneas desde 768 px. EN: “Make sure your business” / “is ready to respond.” ES: “Asegúrate de que tu negocio” / “esté listo para responder.” Es un único H1 estático, sin duplicar contenido ni añadir JavaScript. En móvil la frase se ajusta al ancho, manteniendo mayor tamaño y evitando overflow. Se verificaron 320, 390, 768, 1024 y 1440 px en EN/ES.

El fondo satinado y la secuencia de cinco cards continúan. Los dos controles de pausa del hero se retiraron por la misma solicitud; se conservan las suspensiones automáticas y la preferencia de movimiento reducido. Ver `hero-animation.md` y `hero-cards.md`.
