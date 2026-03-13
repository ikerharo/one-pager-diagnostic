import { motion } from "framer-motion";
import { Fuel, Ban, Landmark } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";

const cards = [
  {
    icon: Fuel,
    pct: "3–4%",
    text: "Eliminación del sobreprecio de red cerrada. Cargas en cualquier estación con tarjeta Mastercard de red abierta al mejor precio disponible.",
  },
  {
    icon: Ban,
    pct: "1–2%",
    text: "Sin comisiones del proveedor de combustible. Cero comisión sobre consumo, cero cargos por dispersión, cero costos ocultos.",
  },
  {
    icon: Landmark,
    pct: "~1%",
    text: "Recuperación del costo de prepago. Línea de crédito en lugar de prefondeo — el capital de Bodesa trabaja en la operación, no estacionado en un monedero.",
  },
];

const FuelImpactSection = () => (
  <section className="border-t border-border bg-background py-16 md:py-24">
    <div className="container mx-auto max-w-5xl px-6">
      <AnimatedSection>
        <motion.p
          variants={itemVariants}
          className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
        >
          Impacto directo en combustible
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground"
        >
          5–7% de ahorro directo
          <br />
          <span className="text-primary">sobre el gasto de combustible</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl"
        >
          Más controles impulsados por inteligencia artificial y la solución a
          sus retos fiscales.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-extrabold text-foreground">
                    {c.pct}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default FuelImpactSection;
