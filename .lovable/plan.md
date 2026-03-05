

## Indicadores de navegación: barra de progreso + scroll hint + botón "siguiente"

### Problema
Un usuario no técnico puede no saber que debe hacer scroll, especialmente en mobile donde el efecto de card-stack es menos intuitivo.

### Solución: 3 elementos ligeros

**1. Scroll hint animado en el Header**
- Una flecha/chevron animada (bounce) en la parte inferior del hero que indica "desliza hacia abajo"
- Desaparece después del primer scroll (con `IntersectionObserver` o escuchando `scroll`)

**2. Barra de progreso fija (top)**
- Una barra delgada (3-4px) fija en la parte superior de la pantalla (`fixed top-0 z-[60]`)
- Se llena proporcionalmente al scroll de la página (0% arriba, 100% al final)
- Color `primary` (verde Uvicuo), con fondo semi-transparente
- Sutil, no distrae, pero da contexto de "dónde estoy"

**3. Botón flotante "Siguiente sección" (mobile)**
- Un botón pequeño fijo en la esquina inferior derecha (`fixed bottom-6 right-6`)
- Icono de chevron-down con texto opcional "Siguiente"
- Al hacer click, hace `scrollBy` suave una pantalla completa (o usa IDs de sección)
- Se oculta en la última sección
- Solo visible en mobile (`md:hidden`) para no ensuciar desktop

### Archivos

| Archivo | Cambio |
|---|---|
| `src/components/discovery/ScrollProgress.tsx` | **Nuevo**: barra de progreso fija + botón flotante "siguiente" |
| `src/components/discovery/DiscoveryHeader.tsx` | Añadir chevron animado al fondo del hero |
| `src/pages/Index.tsx` | Importar `ScrollProgress`, añadir `id` a cada sección sticky para navegación por anclas |

