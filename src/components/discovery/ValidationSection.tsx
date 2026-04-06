import { motion } from "framer-motion";
import { CircleDot } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const ValidationSection = () => {
  const { validationQuestions } = useDeal();

  if (!validationQuestions || validationQuestions.length === 0) return null;

  return (
    <section className="py-12 md:py-16 overflow-hidden bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            Siguiente paso
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground max-w-2xl"
          >
            Completar el análisis con datos de Elola
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-3 text-sm text-muted-foreground max-w-xl leading-relaxed"
          >
            Los hallazgos en efectivo están basados en datos reales. Las oportunidades en combustible y peajes son estimaciones que necesitan datos de Elola para convertirse en un business case concreto.
          </motion.p>

          <div className="mt-8 space-y-3">
            {validationQuestions.map((question, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 mt-0.5">
                  <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed pt-0.5">{question}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ValidationSection;
