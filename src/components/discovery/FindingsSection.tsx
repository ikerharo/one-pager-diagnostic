import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const impactLabel = {
  alto: "Alto",
  medio: "Medio",
  bajo: "Bajo",
} as const;

const impactDot = {
  alto: "bg-destructive",
  medio: "bg-amber-500",
  bajo: "bg-primary",
} as const;

const FindingsSection = () => {
  const { findings, quickWins, exclusionNote } = useDeal();
  const { slug } = useParams<{ slug: string }>();
  const showDeepDiveLink = slug === "bodesa";

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-background">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            Diagnóstico
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Lo que encontramos
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl text-sm"
          >
            Cada hallazgo conecta con un impacto medible y una propuesta concreta.
          </motion.p>

          {/* Integrated findings */}
          <div className="mt-10 space-y-4">
            {findings.map((finding, i) => {
              const recommendation = quickWins[i]?.after;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card overflow-hidden transition-colors hover:bg-muted/20"
                >
                  {/* Top row: finding + impact */}
                  <div className="px-6 pt-5 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-sm text-foreground leading-snug flex-1">
                        {finding.title}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                        <span className={`inline-block h-2 w-2 rounded-full ${impactDot[finding.impact]}`} />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {impactLabel[finding.impact]}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {finding.description}
                    </p>

                    {/* Quote as evidence */}
                    {finding.quote && (
                      <blockquote className="mt-3 border-l-2 border-primary/20 pl-3">
                        <p className="text-xs italic text-muted-foreground/70 leading-relaxed">
                          "{finding.quote}"
                        </p>
                        {finding.quoteAuthor && (
                          <p className="mt-1 text-[10px] text-muted-foreground/50">
                            — {finding.quoteAuthor}
                          </p>
                        )}
                      </blockquote>
                    )}
                  </div>

                  {/* Recommendation strip */}
                  {recommendation && (
                    <div className="border-t border-border bg-primary/[0.04] px-6 py-3.5">
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary shrink-0 mt-0.5">
                          Propuesta →
                        </span>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Extra quickWins that don't map to a finding */}
          {quickWins.length > findings.length && (
            <div className="mt-4 space-y-4">
              {quickWins.slice(findings.length).map((win, i) => (
                <motion.div
                  key={`extra-${i}`}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <div className="px-6 py-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {win.before}
                    </p>
                  </div>
                  <div className="border-t border-border bg-primary/[0.04] px-6 py-3.5">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary shrink-0 mt-0.5">
                        Propuesta →
                      </span>
                      <p className="text-sm leading-relaxed text-foreground/80">
                        {win.after}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {exclusionNote && (
            <motion.p
              variants={itemVariants}
              className="mt-6 text-xs text-muted-foreground/70 italic max-w-2xl"
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
