

## Hacer el diseño más tecnológico con efectos visuales

El one-pager ya tiene buena estructura. Para darle un feel más tech/premium sin sobrecargar, propongo añadir efectos sutiles que transmitan modernidad:

### Cambios propuestos

**1. Partículas / grid animado en el Hero** (`DiscoveryHeader.tsx`)
- Añadir un overlay de grid punteado sutil (CSS `radial-gradient` pattern) sobre el video, con una animación lenta de desplazamiento. Da un efecto "matrix/tech" sin depender de librerías pesadas.
- Añadir un glow animado detrás del título del cliente (sombra verde pulsante con keyframes).

**2. Líneas de conexión en Hallazgos** (`FindingsSection.tsx`)
- Añadir una línea vertical punteada sutil que conecte la tarjeta hero con el grid inferior, sugiriendo relación entre hallazgos.
- Hover más expresivo: las tarjetas hacen un leve `scale(1.02)` + un border glow verde tenue.

**3. Transición animada en Quick Wins** (`QuickWinsSection.tsx`)
- La flecha central pulsa suavemente (keyframe `pulse` en el círculo).
- Al hacer hover, la flecha se desplaza ligeramente hacia la derecha (`group-hover:translate-x-1`).

**4. Timeline con línea animada** (`NextStepsSection.tsx`)
- La línea vertical del timeline se anima con un `background-size` gradient que crece de arriba a abajo al entrar en viewport (via framer-motion).
- Los nodos del timeline tienen un ring animado tipo "ping" sutil.

**5. Footer tech touch** (`Index.tsx`)
- Añadir la misma línea gradiente verde (como la del hero) arriba del footer.

**6. Nuevos keyframes globales** (`src/index.css`)
- `dot-grid-scroll`: animación lenta del grid punteado.
- `glow-pulse`: pulsación sutil de sombra verde para el título.
- `ping-slow`: ping más lento para nodos del timeline.

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/index.css` | Añadir keyframes: `dot-grid-scroll`, `glow-pulse`, `ping-slow` |
| `src/components/discovery/DiscoveryHeader.tsx` | Overlay de grid punteado animado + glow en título |
| `src/components/discovery/FindingsSection.tsx` | Línea conectora punteada + hover glow |
| `src/components/discovery/QuickWinsSection.tsx` | Flecha pulsante + hover translate |
| `src/components/discovery/NextStepsSection.tsx` | Línea de timeline animada + ping en nodos |
| `src/pages/Index.tsx` | Línea gradiente sobre footer |

Todo con CSS puro y framer-motion (ya instalado). Sin librerías adicionales.

