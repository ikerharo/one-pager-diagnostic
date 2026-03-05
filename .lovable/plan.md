

## Plan: Discovery One-Pager — Rebuild completo

### Resumen

Eliminar toda la propuesta comercial actual y reconstruir el proyecto como un template de one-pager post-discovery. Estilo light con acentos verdes Uvicuo. Tres secciones de contenido: Hallazgos clave, Quick Wins y Siguientes pasos (texto simple).

### Estructura de la página

```text
┌──────────────────────────────────┐
│  Header: Logo + cliente + fecha  │  ← fondo blanco, tipografía limpia
├──────────────────────────────────┤
│  Hallazgos Clave (3-5 cards)     │  ← grid con iconos, fondo light
├──────────────────────────────────┤
│  Quick Wins (antes → después)    │  ← tarjetas comparativas
├──────────────────────────────────┤
│  Siguientes Pasos (texto)        │  ← párrafo con pasos sugeridos
├──────────────────────────────────┤
│  Footer mínimo: © Uvicuo         │
└──────────────────────────────────┘
```

### Estilo visual

- **Fondo principal**: blanco/gris claro (`bg-white`, `bg-gray-50`)
- **Acentos**: verde Uvicuo (`text-primary`, bordes `border-primary/20`)
- **Tipografía**: Space Grotesk para headings, Inter para body (ya configurados)
- **Animaciones**: scroll suaves con `AnimatedSection` (reutilizado)
- **Sin dark mode completo**: solo acentos y detalles

### Archivos a eliminar

Todos los componentes y páginas de la propuesta comercial:
- `src/pages/ProblemaPage.tsx`, `SolucionPage.tsx`, `ImpactoPage.tsx`, `ApendicePage.tsx`
- `src/components/proposal/*` (todos)
- `src/data/annexes.ts`
- `src/hooks/useProposal.ts`
- `src/components/discovery/ConcernsSection.tsx`, `ClientReference.tsx` (no se usarán)
- `supabase/functions/send-proposal-email/index.ts`

### Archivos a crear/reescribir

| Acción | Archivo | Descripción |
|--------|---------|-------------|
| Reescribir | `src/data/discoveryData.ts` | Solo: config, findings, quickWins, nextSteps |
| Reescribir | `src/pages/Index.tsx` | Página única con las 3 secciones + header + footer |
| Reescribir | `src/App.tsx` | Solo ruta `/` → Index, eliminar rutas de propuesta |
| Reescribir | `src/components/discovery/DiscoveryHeader.tsx` | Versión light: logo + cliente + fecha sobre fondo claro |
| Reescribir | `src/components/discovery/FindingsSection.tsx` | Cards con fondo blanco, bordes sutiles, acentos verdes |
| Reescribir | `src/components/discovery/QuickWinsSection.tsx` | Estilo light para las comparaciones |
| Reescribir | `src/components/discovery/NextStepsSection.tsx` | Párrafo simple con pasos sugeridos, sin botón |
| Conservar | `src/components/proposal/AnimatedSection.tsx` | Se reutiliza para animaciones de scroll |
| Actualizar | `src/index.css` | Ajustar para tema light predominante |

### Datos placeholder (discoveryData.ts)

Se simplifica eliminando `concerns` y `clientReference`. Se mantienen:
- `discoveryConfig`: nombre cliente, fecha, presentador
- `findings`: 3-5 hallazgos con icono + título + descripción
- `quickWins`: 2-3 mejoras antes/después
- `nextSteps`: texto de siguientes pasos (sin CTA/botón)

### Lo que NO cambia

- Configuración de Tailwind, fuentes, colores base
- Componentes UI de shadcn (`button.tsx`, `badge.tsx`, etc.)
- Integración con backend (se mantiene disponible pero no se usa activamente)
- `AnimatedSection.tsx` y sus variants de animación

