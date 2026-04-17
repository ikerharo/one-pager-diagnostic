

## Recomendación: qué llevar de /gepp a /diagnostico/gepp

El diagnóstico ya tiene la estructura correcta (Hero → Entregables → Preview → Metodología → Tracks → Garantía → CTA). El one-pager `/gepp` tiene contenido específico de cuenta que **el diagnóstico hoy no muestra** y que sería decisivo para Tomás cuando lo comparta internamente con dueños operativos que **no estuvieron en la call**.

### Qué SÍ vale la pena migrar (3 piezas)

**1. Los 5 hallazgos específicos de GEPP — lo más importante**
Los `findings` del one-pager son la única evidencia en todo el material de que Uvicuo escuchó a Tomás. Sin esto, el diagnóstico se lee como una propuesta plantilla. Los dueños de transporte primario en Tlalnepantla, que no estuvieron en la call, necesitan ver: peajes sin conciliación, rezago Edenred ~2 días, sin visibilidad intra-red, múltiples dueños, IEPS como restricción.

→ **Nueva sección "Lo que ya sabemos de GEPP"** entre Hero y Entregables. Formato compacto: 5 cards, cada una con título + 1 párrafo + chip de impacto. Sin quotes textuales (paráfrasis, como ya están).

**2. Tabla "Hoy → Con Uvicuo" (quickWins)**
Es la pieza más visual del one-pager. Hace tangible el cambio sin prometer cifras. Los 3 quick wins (peajes, combustible, efectivo por validar) aterrizan exactamente lo que el diagnóstico va a entregar.

→ **Insertar después de la nueva sección de hallazgos**, antes de Entregables. Refuerza el "por qué este diagnóstico" antes del "qué reciben".

**3. La nota de exclusión sobre Edenred**
Hoy vive solo en `/gepp`. Es el seguro político más importante para Tomás: "no venimos a tocar tu licitación de Edenred". Sin esto, alguien en Procurement puede leer el diagnóstico como una amenaza al proceso en curso.

→ **Banner discreto** dentro de la sección de garantía (ya existe `guarantee.footnote`, podemos enriquecerlo con el texto de `exclusionNote` del one-pager, que es más explícito sobre la licitación).

### Qué NO llevar (y por qué)

- **Executive summary / thesis**: ya está cubierto por el hero del diagnóstico.
- **Validation questions (8 preguntas)**: contradice directamente el feedback anterior — "que parezca más light". Pedir 8 datos asusta. Mantenerlas solo en el one-pager interno o sacarlas en sesión 1.
- **Timeline detallado paso 1–4**: el diagnóstico ya tiene su propia metodología y timeline. Duplicar confunde.
- **uvicuoPositioning extendido**: el diagnóstico ya tiene su propia sección equivalente.
- **closingQuote de Tomás**: aunque sea paráfrasis, ponerla en un documento que Tomás va a circular puede sentirse incómodo. Mejor omitirla.
- **additionalCapabilities**: el diagnóstico ya tiene `tracks` que cubren lo mismo.

### Implementación técnica (cuando apruebes)

1. **Extender `DiagnosticData`** en `src/data/diagnosticData.ts`: agregar campos opcionales `findings?`, `quickWins?`, `exclusionNote?` (todos opcionales para no romper otros diagnósticos).
2. **Editar `src/data/diagnostics/gepp.json`**: copiar `findings`, `quickWins` y `exclusionNote` desde `src/data/deals/gepp.json`.
3. **Crear 2 secciones nuevas** en `DiagnosticPitchPage.tsx`:
   - `FindingsSection` (renderiza `findings` solo si existe) — entre Hero y Entregables.
   - `QuickWinsSection` (renderiza `quickWins` solo si existe) — después de Findings.
4. **Enriquecer `GuaranteeSection`** para que muestre `exclusionNote` cuando exista.
5. Ambas secciones son opt-in por JSON, así que ningún otro diagnóstico cambia.

### Resultado

El pitch del diagnóstico de GEPP pasa de "propuesta plantilla bien hecha" a "propuesta que demuestra que entendimos el negocio", sin perder el tono ligero ni inflar el documento. Mantiene el flujo narrativo actual y agrega exactamente las 3 piezas que un dueño operativo de Tlalnepantla — que no estuvo en la call — necesita ver para tomar la reunión en serio.

