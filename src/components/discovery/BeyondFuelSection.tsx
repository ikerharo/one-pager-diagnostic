import { motion } from "framer-motion";
import { Route, Utensils, Wrench, Banknote } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";

const categories = [
  {
    icon: Route,
    title: "Peajes y casetas",
    description:
      "Conciliación automática de cruces vs cobros. Detección y disputa de errores en tiempo real. Sin TAG dedicado — funciona con los que ya tienen.",
  },
  {
    icon: Utensils,
    title: "Viáticos",
    description:
      "Tarjeta con controles por categoría, monto y horario. Comprobación vía WhatsApp con IA. Eliminación de fondos fijos y efectivo.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description:
      "Registro de inspecciones con fotos validadas por IA. Vinculación automática de cada foto a la unidad, ruta y operador correcto.",
  },
  {
    icon: Banknote,
    title: "Efectivo de emergencia",
    description:
      "Fondo digital con autorización en tiempo real. Sin anticipos, sin reembolsos, sin caja chica.",
  },
];

const BeyondFuelSection = () => (
  <section className="border-t border-border bg-muted/20 py-16 md:py-20">
    <div className="container mx-auto max-w-5xl px-6">
      <AnimatedSection>
        <motion.p
          variants={itemVariants}
          className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
        >
          Más allá del combustible
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
        >
          Una plataforma, todas las categorías de gasto de flota
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-2xl"
        >
          Uvicuo no es un monedero de combustible. Es la plataforma que
          centraliza y controla TODO el gasto operativo de la flota.
        </motion.p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="font-semibold text-sm text-foreground">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xs text-muted-foreground/70 text-center"
        >
          Todas las categorías están incluidas en la misma suscripción. Sin
          costo adicional por módulo.
        </motion.p>
      </AnimatedSection>
    </div>
  </section>
);

export default BeyondFuelSection;
