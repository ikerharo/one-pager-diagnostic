import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Info, ChevronDown, Lightbulb } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";
import { cn } from "@/lib/utils";

const impactColor: Record<string, string> = {
  alto: "text-red-400",
  medio: "text-yellow-400",
  bajo: "text-emerald-400",
};

const OpportunitiesSection = () => {
  const { opportunities } = useDeal();
  const [expandedStats, setExpandedStats] = useState<Record<string, boolean>>({});

  if (!opportunities || opportunities.length === 0) return null;

  const toggleStat = (key: string) =>
    setExpandedStats((prev) => ({ ...prev, [key]: !prev[key] }));

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
                  <div className="space-y-3 mb-5">
                    {opp.stats.map((stat, j) => {
                      const key = `${i}-${j}`;
                      const isExpanded = expandedStats[key];
                      const hasDetail = !!(stat as any).detail;

                      return (
                        <div key={j}>
                          <button
                            type="button"
                            onClick={() => hasDetail && toggleStat(key)}
                            className={cn(
                              "w-full rounded-lg border px-4 py-3 text-left transition-colors",
                              hasDetail
                                ? "cursor-pointer hover:border-primary/30 hover:bg-primary/[0.06]"
                                : "cursor-default",
                              isExpanded
                                ? "border-primary/30 bg-primary/[0.06]"
                                : "border-primary/10 bg-primary/[0.04]"
                            )}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="text-xl font-bold text-primary shrink-0">
                                  {stat.value}
                                </span>
                                <span className="text-sm text-foreground">
                                  {stat.label}
                                </span>
                                {(stat as any).impact && (
                                  <span
                                    className={cn(
                                      "text-[10px] font-semibold uppercase tracking-wider shrink-0",
                                      impactColor[(stat as any).impact] || "text-muted-foreground"
                                    )}
                                  >
                                    {(stat as any).impact}
                                  </span>
                                )}
                              </div>
                              {hasDetail && (
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200",
                                    isExpanded && "rotate-180"
                                  )}
                                />
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && hasDetail && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pt-3 pb-1 space-y-3">
                                  <p className="text-sm leading-relaxed text-foreground/90">
                                    {(stat as any).detail}
                                  </p>
                                  {(stat as any).proposal && (
                                    <div className="flex items-start gap-2 rounded-lg bg-primary/[0.06] border border-primary/15 px-4 py-3">
                                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                      <div className="text-sm text-foreground leading-relaxed">
                                        <p>
                                          <span className="font-semibold text-primary">Propuesta: </span>
                                          {(stat as any).proposal}
                                        </p>
                                        {(stat as any).analysisLink && (
                                          <a
                                            href={(stat as any).analysisLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                                          >
                                            Ver análisis de ruta →
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}

                {opp.quote && (
                  <blockquote className="mb-4 border-l-2 border-primary/20 pl-4">
                    <p className="text-sm italic text-foreground leading-relaxed">
                      "{opp.quote}"
                    </p>
                    {opp.quoteAuthor && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        — {opp.quoteAuthor}
                      </p>
                    )}
                  </blockquote>
                )}

                {opp.status && (
                  <div className="flex items-start gap-2 rounded-lg bg-muted/50 border border-border px-4 py-2.5">
                    <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground/90 leading-relaxed">{opp.status}</p>
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
