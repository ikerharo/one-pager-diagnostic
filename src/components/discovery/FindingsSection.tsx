import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FileText, MapPin } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const impactLabel = {
  alto: "Impacto alto",
  medio: "Impacto medio",
  bajo: "Impacto bajo",
} as const;

const impactColor = {
  alto: "text-destructive",
  medio: "text-amber-600",
  bajo: "text-primary",
} as const;

const FindingsSection = () => {
  const { findings, quickWins, exclusionNote } = useDeal();
  const { slug } = useParams<{ slug: string }>();
  const showDeepDiveLink = slug === "bodesa";
  const isArmstrong = slug === "armstrong";

  return (
    <section className="py-12 md:py-16 overflow-hidden bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            Lo que encontramos
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground max-w-2xl"
          >
            Oportunidades identificadas en la operación
          </motion.h2>

          <div className="mt-12 space-y-0">
            {findings.map((finding, i) => {
              const recommendation = quickWins[i]?.after;
              const isLast = i === findings.length - 1;

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`relative ${!isLast ? "pb-10 mb-0" : ""}`}
                >
                  {/* Vertical connector line */}
                  {!isLast && (
                    <div className="absolute left-[15px] top-[36px] bottom-0 w-px bg-border" />
                  )}

                  <div className="flex gap-5">
                    {/* Number circle */}
                    <div className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-border bg-card">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 -mt-0.5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-base font-bold text-foreground leading-snug">
                          {finding.title}
                        </h3>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider ${impactColor[finding.impact]}`}>
                          {impactLabel[finding.impact]}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {finding.description}
                      </p>

                      {finding.quote && (
                        <blockquote className="mt-3 border-l-2 border-primary/20 pl-4">
                          <p className="text-sm italic text-muted-foreground/70 leading-relaxed">
                            "{finding.quote}"
                          </p>
                          {finding.quoteAuthor && (
                            <p className="mt-1 text-xs text-muted-foreground/50">
                              — {finding.quoteAuthor}
                            </p>
                          )}
                        </blockquote>
                      )}

                      {recommendation && (
                        <div className="mt-3 rounded-lg bg-primary/[0.05] border border-primary/10 px-4 py-3">
                          <p className="text-sm leading-relaxed text-foreground/80">
                            <span className="font-semibold text-primary text-xs uppercase tracking-wider mr-2">
                              Propuesta:
                            </span>
                            {recommendation}
                          </p>
                        </div>
                      )}

                      {/* Example map dropdown for Armstrong finding #1 */}
                      {isArmstrong && i === 0 && (
                        <div className="mt-3">
                          <button
                            onClick={() => setExampleOpen(!exampleOpen)}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                          >
                            <MapPin className="h-3.5 w-3.5" />
                            Ver ejemplo: Guadalajara → Querétaro
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${exampleOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence>
                            {exampleOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 rounded-xl border border-border bg-card overflow-hidden">
                                  <img
                                    src="/images/ruta-ejemplo-armstrong.png"
                                    alt="Ejemplo de ruta optimizada Guadalajara a Querétaro mostrando ahorro de 8.34% en combustible"
                                    className="w-full"
                                  />
                                  <div className="px-4 py-3 border-t border-border">
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                      <span className="font-semibold text-foreground">Ejemplo real:</span>{" "}
                                      En la ruta Guadalajara → Querétaro, la estación base (Kopla/Mobil) cobra $29.99/L.
                                      Con red abierta, hay 12 opciones sin desvío — la mejor a $27.49/L,{" "}
                                      <span className="font-semibold text-primary">un ahorro del 8.34%</span>.
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Extra quickWins beyond findings count */}
          {quickWins.length > findings.length && (
            <div className="mt-8 space-y-3">
              <motion.p
                variants={itemVariants}
                className="text-xs font-semibold uppercase tracking-wider text-primary mb-4"
              >
                Oportunidades adicionales
              </motion.p>
              {quickWins.slice(findings.length).map((win, i) => (
                <motion.div
                  key={`extra-${i}`}
                  variants={itemVariants}
                  className="rounded-lg bg-primary/[0.05] border border-primary/10 px-4 py-3"
                >
                  <p className="text-sm text-muted-foreground mb-1">{win.before}</p>
                  <p className="text-sm text-foreground/80">
                    <span className="font-semibold text-primary text-xs uppercase tracking-wider mr-2">
                      Propuesta:
                    </span>
                    {win.after}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {exclusionNote && (
            <motion.p
              variants={itemVariants}
              className="mt-8 text-xs text-muted-foreground/70 italic max-w-2xl"
            >
              {exclusionNote}
            </motion.p>
          )}

          {showDeepDiveLink && (
            <motion.div variants={itemVariants} className="mt-8 flex justify-center">
              <Link
                to="/bodesa/contable"
                className="group inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/[0.04] px-5 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
              >
                <FileText className="h-4 w-4" />
                Ver diagnóstico contable completo
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FindingsSection;
