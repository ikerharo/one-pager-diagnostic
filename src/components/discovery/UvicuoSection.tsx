import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const UvicuoSection = () => {
  const { uvicuoPositioning, additionalCapabilities } = useDeal();
  if (!uvicuoPositioning) return null;

  // Merge core capabilities with additional capabilities
  const allCapabilities = [
    ...uvicuoPositioning.capabilities,
    ...(additionalCapabilities || []).map((cap) => ({
      title: cap.title,
      description: cap.description,
    })),
  ];

  return (
    <section className="section-dark py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-1">
            <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-6" />
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-wider text-primary"
            >
              Sobre Uvicuo
            </motion.span>
          </div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            {uvicuoPositioning.headline}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-2xl"
          >
            {uvicuoPositioning.description}
          </motion.p>

          {allCapabilities.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allCapabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <h3 className="font-semibold text-sm text-foreground">{cap.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {cap.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          <motion.p
            variants={itemVariants}
            className="mt-6 text-xs text-muted-foreground/70 text-center"
          >
            Todas las categorías están incluidas en la misma suscripción. Sin costo adicional por módulo.
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default UvicuoSection;
