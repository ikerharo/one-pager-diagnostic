

## Plan: Mejorar diseño del One-Pager + Video hero + Logos de clientes

### Mejoras de diseño

**Header (DiscoveryHeader.tsx)**
- Hacer el hero mas impactante: fondo con gradiente sutil (blanco a gris claro) con un patrón geométrico sutil o un efecto de puntos/grid usando CSS
- Agregar un campo `heroVideoUrl` opcional en `discoveryData.ts` -- si existe, se muestra un video embebido (iframe de YouTube/Vimeo o `<video>`) centrado debajo del título, con aspect ratio 16:9 y bordes redondeados con sombra
- Mejorar la jerarquía tipográfica: título del cliente mas grande, badge con mejor contraste

**FindingsSection.tsx**
- Agregar un número/índice a cada card (01, 02, 03...) para dar sensación de orden y priorización
- Hover con borde verde sutil animado
- Iconos con fondo mas prominente

**QuickWinsSection.tsx**
- Cambiar la flecha por una transición visual mas elegante (linea con gradiente verde)
- Agregar un check mark o indicador de "resuelto" en el lado "Con Uvicuo"

**NextStepsSection.tsx**
- Mejorar con un card contenedor con borde verde sutil, separandolo visualmente del resto

**Nueva seccion: TrustedBySection.tsx**
- Fila de logos de empresas que confian en Uvicuo, en escala de grises con hover a color
- Datos en `discoveryData.ts`: array de `trustedClients` con `name` y `logoUrl`
- Texto introductorio: "Empresas que ya confian en nosotros"
- Se ubica entre NextSteps y el footer

### Cambios en datos (discoveryData.ts)

```typescript
// Agregar:
heroVideoUrl: "[URL_VIDEO_OPCIONAL]", // en discoveryConfig

trustedClients: [
  { name: "Empresa 1", logoUrl: "/logos/client-1.png" },
  { name: "Empresa 2", logoUrl: "/logos/client-2.png" },
  // ...placeholder logos
]
```

### Archivos a modificar/crear

| Accion | Archivo |
|--------|---------|
| Mejorar | `src/components/discovery/DiscoveryHeader.tsx` -- gradiente, video embed |
| Mejorar | `src/components/discovery/FindingsSection.tsx` -- numeros, hover mejorado |
| Mejorar | `src/components/discovery/QuickWinsSection.tsx` -- transicion visual |
| Mejorar | `src/components/discovery/NextStepsSection.tsx` -- card contenedor |
| Crear | `src/components/discovery/TrustedBySection.tsx` -- logos de clientes |
| Editar | `src/data/discoveryData.ts` -- heroVideoUrl + trustedClients |
| Editar | `src/pages/Index.tsx` -- agregar TrustedBySection |

Sin cambios de base de datos.

