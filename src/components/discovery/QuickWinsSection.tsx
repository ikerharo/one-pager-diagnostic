import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const QuickWinsSection = () => {
  const { quickWins, exclusionNote } = useDeal();
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-background">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            Propuesta
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Situación actual vs propuesta
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl text-sm"
          >
            Comparativa directa entre cómo opera hoy y cómo podría operar.
          </motion.p>

          {/* Clean table */}
          <motion.div
            variants={itemVariants}
            className="mt-10 rounded-xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-2 bg-muted/50 border-b border-border">
              <div className="px-6 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Hoy
                </span>
              </div>
              <div className="px-6 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Con Uvicuo
                </span>
              </div>
            </div>

            {/* Rows */}
            {quickWins.map((win, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`grid grid-cols-2 ${
                  i < quickWins.length - 1 ? "border-b border-border" : ""
                } bg-card transition-colors hover:bg-muted/30`}
              >
                <div className="px-6 py-5 border-r border-border">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {win.before}
                  </p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm leading-relaxed text-foreground">
                    {win.after}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {exclusionNote && (
            <motion.p
              variants={itemVariants}
              className="mt-6 text-xs text-muted-foreground/70 italic max-w-2xl"
            >
              {exclusionNote}
            </motion.p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default QuickWinsSection;
