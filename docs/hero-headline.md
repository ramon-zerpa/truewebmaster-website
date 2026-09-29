# H1 del hero: estado actual

El 29/09/2026 el propietario rechazó la animación de entrada del H1 y solicitó retirarla. Home EN/ES vuelve al H1 semántico estático original en `src/templates/Home.astro`, con copy, saltos responsive, Outfit 700 y composición conservados.

Se retiraron `HeroHeadline.astro`, su configuración, el módulo de reveal y su prueba específica. No quedan máscaras, blur, temporizadores de entrada ni JavaScript del H1. El título está visible desde el HTML inicial, también sin JavaScript y con movimiento reducido.

El fondo satinado y la secuencia de cinco cards continúan. Los dos controles de pausa del hero se retiraron por la misma solicitud; se conservan las suspensiones automáticas y la preferencia de movimiento reducido. Ver `hero-animation.md` y `hero-cards.md`.
