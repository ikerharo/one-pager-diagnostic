

## Sección ligera de solución + CTA a uvicuo.com

Tienes razón: los problemas están muy bien planteados, pero el "cómo" queda implícito. Agregar una página completa sobre Uvicuo rompería el ritmo del one-pager (que es sobre el cliente, no sobre ti). La mejor opción es un enfoque híbrido:

### Propuesta

Añadir una sección compacta **"Cómo lo resolvemos"** entre Quick Wins y Siguientes Pasos. No es una página de producto — son 3-4 pilares cortos (icono + título + una línea) que conectan los hallazgos con capacidades concretas de Uvicuo. Al final, un CTA elegante tipo "Conoce la plataforma →" que lleva a uvicuo.com.

Esto cierra el gap: Problemas → Quick Wins → **Así funciona** → Pasos siguientes.

### Estructura de la sección

```text
┌─────────────────────────────────────────┐
│  Cómo lo resolvemos                     │
│                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐│
│  │ 🔄   │  │ 📊   │  │ 🛡️   │  │ ⚡   ││
│  │Auto- │  │Visi- │  │Con-  │  │Inte- ││
│  │mati- │  │bili- │  │trol  │  │gra-  ││
│  │zación│  │dad   │  │      │  │ción  ││
│  │      │  │      │  │      │  │      ││
│  │1 línea│  │1 línea│  │1 línea│  │1 línea││
│  └──────┘  └──────┘  └──────┘  └──────┘│
│                                         │
│        [ Conoce la plataforma → ]       │
└─────────────────────────────────────────┘
```

### Implementación

| Archivo | Cambio |
|---|---|
| `src/data/discoveryData.ts` | Añadir array `solutionPillars` con 4 items (icono, título, descripción corta) y `ctaUrl` |
| `src/components/discovery/SolutionSection.tsx` | Nuevo componente: grid 2x2 (mobile) / 4 cols (desktop) con pilares + CTA button |
| `src/pages/Index.tsx` | Insertar `SolutionSection` entre Quick Wins y Next Steps, con la misma animación de lámina |

Los pilares se gestionan desde `discoveryData.ts` como todo lo demás, para mantener consistencia.

