

## Rediseño de Hallazgos Clave

El problema actual: las tarjetas son todas iguales visualmente -- misma estructura de lista vertical con icono + texto + badge. Es monótono y no genera impacto. La sección se siente como una lista de pendientes, no como hallazgos estratégicos.

### Propuesta: Layout tipo "dashboard de diagnóstico"

Cambiar de lista vertical uniforme a un **grid asimétrico** donde el hallazgo principal (#1, impacto alto) ocupa más espacio y los demás se distribuyen en un grid 2x2 debajo. Esto crea jerarquía visual y hace que la sección se sienta como un diagnóstico profesional, no una lista.

```text
┌─────────────────────────────────────┐
│  🔴 HALLAZGO PRINCIPAL (alto)       │
│  Título grande, descripción,        │
│  métrica destacada                  │
└─────────────────────────────────────┘
┌────────────────┐  ┌────────────────┐
│ 🔴 Hallazgo 2  │  │ 🟡 Hallazgo 3 │
│ (alto)         │  │ (medio)        │
└────────────────┘  └────────────────┘
┌────────────────┐  ┌────────────────┐
│ 🔴 Hallazgo 4  │  │ 🟡 Hallazgo 5 │
│ (alto)         │  │ (medio)        │
└────────────────┘  └────────────────┘
```

### Detalles de diseño

1. **Tarjeta hero** (primer hallazgo): fondo oscuro (`section-dark`), icono grande, título en `text-xl`, borde izquierdo grueso con color de impacto (rojo para alto). Se siente como el hallazgo estrella.

2. **Grid 2x2** para los demás: tarjetas más compactas con borde izquierdo de color según impacto (rojo/ámbar). Hover sutil con elevación.

3. **Borde lateral de color** en lugar de badge flotante: una barra vertical de 3-4px a la izquierda de cada tarjeta indica el nivel de impacto visualmente sin necesidad de leer texto.

4. **Número grande** en cada tarjeta (01, 02...) como detalle tipográfico sutil en la esquina.

5. En **mobile**: todo se apila verticalmente, la tarjeta hero mantiene su estilo diferenciado.

### Archivo a modificar

| Archivo | Cambio |
|---|---|
| `src/components/discovery/FindingsSection.tsx` | Rediseño completo del layout: tarjeta hero + grid 2x2, bordes de color por impacto |

Sin cambios en datos ni en otros archivos.

