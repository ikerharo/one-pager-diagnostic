import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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
                className="flex flex-col gap-0 rounded-xl border border-border bg-card overflow-hidden sm:flex-row sm:items-stretch"
              >
                {/* Before */}
                <div className="flex-1 px-5 py-4 bg-destructive/[0.03]">
                  <span className="text-xs font-medium uppercase tracking-wider text-destructive/60">
                    Antes
                  </span>
                  <p className="mt-1 text-sm text-foreground">{win.before}</p>
                </div>

                {/* Gradient divider */}
                <div className="hidden sm:flex items-center px-0">
                  <div className="h-full w-[3px] bg-gradient-to-b from-destructive/20 via-primary/40 to-primary/60" />
                </div>
                <div className="flex sm:hidden justify-center py-0">
                  <div className="w-full h-[2px] bg-gradient-to-r from-destructive/20 via-primary/40 to-primary/60" />
                </div>

                {/* After */}
                <div className="flex-1 px-5 py-4 bg-primary/[0.03]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary">
                      Con Uvicuo
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  </div>
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
