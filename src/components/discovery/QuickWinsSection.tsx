import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { quickWins } from "@/data/discoveryData";

const QuickWinsSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Quick Wins con <span className="text-primary">Uvicuo</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            Mejoras inmediatas que podemos implementar en las primeras semanas.
          </motion.p>

          <div className="mt-10 space-y-4">
            {quickWins.map((win, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center"
              >
                <div className="flex-1 rounded-lg bg-destructive/5 px-4 py-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-destructive/70">
                    Antes
                  </span>
                  <p className="mt-1 text-sm text-foreground">{win.before}</p>
                </div>

                <ArrowRight className="mx-auto h-5 w-5 shrink-0 text-primary sm:mx-0" />

                <div className="flex-1 rounded-lg bg-primary/5 px-4 py-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    Con Uvicuo
                  </span>
                  <p className="mt-1 text-sm text-foreground">{win.after}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default QuickWinsSection;
