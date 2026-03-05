

## Mejoras: Hallazgos Clave + Quick Wins

### 1. Hallazgos Clave -- suavizar la tarjeta hero

El problema: la tarjeta hero usa `section-dark` (fondo oscuro completo) mientras las demás son claras. El contraste es demasiado agresivo.

**Solución**: Quitar `section-dark` del hero y usar en su lugar el mismo estilo de tarjeta que las demás, pero más grande y con más presencia. Mantener el borde izquierdo grueso y el icono grande, pero sobre fondo `bg-card` como las demás. La diferenciación viene del tamaño (ocupa todo el ancho), padding más generoso, título más grande y el número "01" prominente -- no del color de fondo.

### 2. Quick Wins -- rediseño más impactante

El problema actual: las tarjetas de antes/después se sienten planas y repetitivas. El chevron entre ambos lados es pequeño y no transmite transformación.

**Solución**: Rediseñar como tarjetas con dos columnas más diferenciadas visualmente:
- **Lado "Antes"**: fondo ligeramente rojo/destructive con un icono de `X` o tachado, texto con estilo que sugiera "problema"
- **Lado "Con Uvicuo"**: fondo ligeramente verde/primary con icono de check, texto que sugiera "solución"
- **Flecha central** más prominente: un círculo con flecha que actúe como separador visual claro
- Añadir un **número de orden** sutil (01, 02, 03) para dar estructura
- En mobile: apilar verticalmente con una flecha hacia abajo en lugar de gradient line

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/discovery/FindingsSection.tsx` | Quitar `section-dark` del hero, usar `bg-card` con border + padding más grande |
| `src/components/discovery/QuickWinsSection.tsx` | Rediseño de tarjetas antes/después con mejor contraste visual y flecha central prominente |

