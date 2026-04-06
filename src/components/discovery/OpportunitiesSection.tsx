import { motion } from "framer-motion";
import { TrendingUp, Info } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const OpportunitiesSection = () => {
  const { opportunities } = useDeal();

  if (!opportunities || opportunities.length === 0) return null;

  return (
    <section className="section-dark py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            Oportunidades por explorar
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground max-w-2xl"
          >
            Áreas donde vemos potencial de ahorro
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm text-muted-foreground max-w-xl"
          >
            Estimaciones iniciales que requieren validación con datos de Elola.
          </motion.p>

          <div className="mt-10 space-y-8">
            {opportunities.map((opp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-snug pt-0.5">
                    {opp.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                  {opp.description}
                </p>

                {opp.stats.length > 0 && (
                  <div className={`grid gap-3 mb-5 ${opp.stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {opp.stats.map((stat, j) => (
                      <div
                        key={j}
                        className="rounded-lg border border-primary/10 bg-primary/[0.04] px-4 py-3 text-center"
                      >
                        <span className="block text-xl font-bold text-primary">{stat.value}</span>
                        <span className="block text-[11px] text-muted-foreground mt-0.5">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {opp.quote && (
                  <blockquote className="mb-4 border-l-2 border-primary/20 pl-4">
                    <p className="text-sm italic text-muted-foreground/70 leading-relaxed">
                      "{opp.quote}"
                    </p>
                    {opp.quoteAuthor && (
                      <p className="mt-1 text-xs text-muted-foreground/50">
                        — {opp.quoteAuthor}
                      </p>
                    )}
                  </blockquote>
                )}

                {opp.status && (
                  <div className="flex items-start gap-2 rounded-lg bg-muted/50 border border-border px-4 py-2.5">
                    <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">{opp.status}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
