
Sí, perfectamente puedo ayudarte. Necesito el transcript + un poco de contexto estructurado. La idea es replicar para **Gap (PepsiCo)** los dos artefactos que ya existen para Armstrong:

1. **Diagnóstico (pitch consultivo)** → `/diagnostico/gap` (basado en `src/data/diagnostics/armstrong.json`)
2. **Deal one-pager (análisis preliminar)** → `/gap` (basado en `src/data/deals/armstrong.json`)

## Lo que necesito de ti

Idealmente lo mandas todo en un solo mensaje. Mientras más tengas, mejor el output — pero con lo mínimo ya puedo arrancar.

### A) El transcript completo
Pégalo crudo, no necesitas limpiarlo. Yo extraigo los quotes textuales, los dolores y el lenguaje específico que usaron ellos (eso es lo que hace que el documento se sienta hecho a la medida y no genérico).

### B) Datos de la cuenta (lo más importante)
Lo mínimo para que el modelo financiero tenga sustento:

- **Nombre legal exacto** y a quién va dirigido (nombre + rol de los asistentes)
- **Tamaño de flota** (unidades) y **tipo de operación** (last mile, primario, distribución, etc.)
- **Gasto mensual aproximado** por categoría — aunque sea rango: combustible, viáticos, peajes, mantenimiento
- **Proveedores actuales** (Edenred, Efectivale, Ticket Empresarial, IAVE, Samsara, etc.)
- **Telemetría** — ¿usan Samsara, Geotab, otro, o nada?

### C) Contexto cualitativo (si lo tienes)
- 2-3 dolores que mencionaron explícitamente
- Quién toma la decisión y quién es el sponsor interno
- Qué tan urgente es para ellos / qué los movió a tomar la llamada
- Si hay competencia en la mesa o un proceso formal

### D) Lo que NO necesitas mandar
- Cifras exactas si no las tienes — yo uso rangos conservadores y los marco como "por confirmar en diagnóstico" (igual que en Armstrong)
- Logos, copy de marketing, branding — eso ya está en el sistema
- Quick wins / próximos pasos — eso lo armo yo a partir del transcript

## Cómo lo voy a procesar

1. Leo el transcript y extraigo: quotes textuales, dolores priorizados por intensidad, lenguaje específico del cliente
2. Adapto los rangos de Armstrong a la escala de Gap (combustible, peajes, viáticos)
3. Genero los 2 JSON: `src/data/diagnostics/gap.json` y `src/data/deals/gap.json`
4. Los registro en `src/data/diagnostics/index.ts` y `src/data/deals/index.ts`
5. Marco con honestidad lo que es supuesto vs. lo que viene del transcript (PepsiCo es cuenta sensible — mejor pecar de conservador)

## Una nota importante

Gap es operación PepsiCo. Eso tiene implicaciones:
- El proceso de compras puede ser largo y formal (no es decisión solo del contacto)
- Probablemente ya tienen contratos marco con Edenred / Ticket / IAVE a nivel corporativo
- El sponsor interno necesita un business case que sobreviva a Procurement

Si tienes contexto sobre **gobernanza de compras** y **autonomía de Gap vs. corporativo PepsiCo**, mándalo. Eso cambia mucho el tono del pitch (consultivo vs. transaccional) y el timeline propuesto.

## Mi recomendación

Mándame en un mensaje:
1. El transcript
2. Los datos básicos de la sección B (aunque sea con rangos)
3. Cualquier contexto de C que tengas en la cabeza

Con eso arranco. Si después de leer el transcript tengo dudas puntuales, te las hago antes de generar los archivos — no quiero inventarme nada que después se caiga en la siguiente llamada.
