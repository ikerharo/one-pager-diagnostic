

## Transiciones tipo "láminas" entre secciones

Entiendo perfectamente: quieres que cada sección se comporte como una diapositiva/lámina que entra en vista con un efecto de revelado mientras haces scroll, como si fueran paneles que se deslizan uno sobre otro.

### Enfoque técnico

Usar `framer-motion` con `whileInView` para que cada sección haga una transición de "slide-up + fade-in" al entrar en el viewport. Cada sección se sentirá como una lámina nueva que se revela al hacer scroll.

No usaré scroll-snap (forzar paradas) porque en un one-pager con contenido variable se siente rígido. En su lugar, cada sección tendrá una animación de entrada suave que da el mismo efecto visual sin forzar el scroll.

### Implementación

**`src/pages/Index.tsx`** -- Envolver cada sección en un componente `motion.div` con:
- `initial={{ opacity: 0, y: 60 }}` 
- `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true, margin: "-100px" }}`
- `transition={{ duration: 0.7, ease: "easeOut" }}`
- Cada sección con un `delay` incremental sutil para que se sientan secuenciales

Además, añadir un separador visual sutil entre secciones (una línea gradiente fina o un espacio con transición de fondo) para reforzar el efecto de "láminas apiladas".

**`src/components/discovery/FindingsSection.tsx`**, **`QuickWinsSection.tsx`**, **`NextStepsSection.tsx`**, **`TrustedBySection.tsx`** -- Añadir `overflow-hidden` a cada `<section>` para que el contenido no se desborde durante la animación de entrada.

| Archivo | Cambio |
|---|---|
| `src/pages/Index.tsx` | Envolver secciones en `motion.div` con animación slide-up + separadores entre láminas |
| `FindingsSection.tsx` | Añadir `overflow-hidden` al `<section>` |
| `QuickWinsSection.tsx` | Añadir `overflow-hidden` al `<section>` |
| `NextStepsSection.tsx` | Añadir `overflow-hidden` al `<section>` |
| `TrustedBySection.tsx` | Añadir `overflow-hidden` al `<section>` |

