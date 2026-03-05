import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, ArrowDown } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { quickWins } from "@/data/discoveryData";

const QuickWinsSection = () => {
  return (
    <section className="py-16 md:py-20 overflow-hidden">
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
                className="group relative rounded-xl border border-border bg-card overflow-hidden"
              >
                {/* Number badge */}
                <span className="absolute top-3 right-4 text-2xl font-black font-mono text-muted-foreground/10 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-stretch">
                  {/* Before */}
                  <div className="flex-1 px-5 py-4 bg-destructive/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <XCircle className="h-3.5 w-3.5 text-destructive" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-destructive">
                        Antes
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-foreground leading-relaxed">{win.before}</p>
                  </div>

                  {/* Arrow divider - desktop */}
                  <div className="hidden sm:flex items-center justify-center px-2">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/25 shadow-md shadow-primary/10">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow" />
                      <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Arrow divider - mobile */}
                  <div className="flex sm:hidden justify-center py-2">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/25 shadow-md shadow-primary/10">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow" />
                      <ArrowDown className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </div>

                  {/* After */}
                  <div className="flex-1 px-5 py-4 bg-primary/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Con Uvicuo
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-foreground leading-relaxed">{win.after}</p>
                  </div>
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
