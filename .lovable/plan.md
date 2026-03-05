

## Efecto de "card stack" con scroll pegajoso + Solución basada en reunión

### 1. Efecto de scroll tipo láminas apiladas

Entiendo perfectamente: cada sección ocupa la pantalla completa, se queda "pegada" mientras scrolleas, y la siguiente sección sube y la tapa — como una baraja de cartas que se van apilando. Esto se logra con `position: sticky` + `top: 0` en cada sección.

**Enfoque técnico:**
- Cada sección principal se envuelve en un contenedor con `position: sticky; top: 0` y `min-height: 100vh`
- Cada sección tiene `bg-background` (o su propio fondo) para que tape la anterior al subir
- Se asigna un `z-index` incremental para que cada sección quede visualmente encima de la anterior
- El header ya no necesita sticky porque es la primera "carta" del stack
- Footer y TrustedBySection quedan fuera del efecto sticky (son el cierre natural)

```text
Scroll ↓
┌────────────┐
│   Header   │ ← sticky, z-10, se queda atrás
├────────────┤
│  Hallazgos │ ← sticky, z-20, sube y tapa header
├────────────┤
│ Quick Wins │ ← sticky, z-30, sube y tapa hallazgos
├────────────┤
│  Solución  │ ← sticky, z-40
├────────────┤
│   Pasos    │ ← sticky, z-50
├────────────┤
│  Logos/Ftr │ ← normal flow, cierra la página
└────────────┘
```

### 2. "Cómo lo resolvemos" basado en la reunión

Actualizar `solutionPillars` en `discoveryData.ts` para que el contenido refleje que son conclusiones de la reunión, no una descripción genérica de producto. Cambiar el título a algo como "Lo que proponemos a partir de lo que encontramos" y los pilares a puntos específicos derivados del discovery.

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/Index.tsx` | Envolver cada sección en un div con `sticky top-0 min-h-screen z-[N]` + fondo sólido. Quitar los `motion.div` wrapper actuales (la animación interna de cada sección ya existe) |
| `src/components/discovery/DiscoveryHeader.tsx` | Añadir `min-h-screen` + `sticky top-0` al section |
| `src/components/discovery/FindingsSection.tsx` | Añadir `min-h-screen flex items-center` para centrar verticalmente |
| `src/components/discovery/QuickWinsSection.tsx` | Igual: `min-h-screen flex items-center` |
| `src/components/discovery/SolutionSection.tsx` | Igual + actualizar título/subtítulo para reflejar contexto de reunión |
| `src/components/discovery/NextStepsSection.tsx` | `min-h-screen flex items-center` (puede ser más alto por el contenido dual) |
| `src/data/discoveryData.ts` | Actualizar textos de `solutionPillars` para que sean propuestas derivadas de hallazgos |

