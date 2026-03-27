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
  const { findings } = useDeal();
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
            Cada hallazgo conecta directamente con un impacto financiero u operativo medible.
          </motion.p>

          {/* Strategic table */}
          <motion.div
            variants={itemVariants}
            className="mt-10 rounded-xl border border-border overflow-hidden"
          >
            {/* Header row — desktop only */}
            <div className="hidden md:grid md:grid-cols-[1fr_100px_1fr] bg-muted/50 border-b border-border">
              <div className="px-6 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Hallazgo
                </span>
              </div>
              <div className="px-4 py-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Impacto
                </span>
              </div>
              <div className="px-6 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Evidencia
                </span>
              </div>
            </div>

            {/* Data rows */}
            {findings.map((finding, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`md:grid md:grid-cols-[1fr_100px_1fr] ${
                  i < findings.length - 1 ? "border-b border-border" : ""
                } bg-card transition-colors hover:bg-muted/30`}
              >
                {/* Hallazgo */}
                <div className="px-6 py-5">
                  <h3 className="font-semibold text-sm text-foreground leading-snug">
                    {finding.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {finding.description}
                  </p>
                </div>

                {/* Impacto */}
                <div className="px-6 md:px-4 py-2 md:py-5 flex md:justify-center md:items-start">
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-block h-2 w-2 rounded-full ${impactDot[finding.impact]}`} />
                    <span className="text-xs font-medium text-muted-foreground">
                      {impactLabel[finding.impact]}
                    </span>
                  </div>
                </div>

                {/* Evidencia */}
                <div className="px-6 py-2 md:py-5 pb-5 md:pb-5">
                  {finding.quote ? (
                    <div>
                      <p className="text-sm italic text-muted-foreground/80 leading-relaxed">
                        "{finding.quote}"
                      </p>
                      {finding.quoteAuthor && (
                        <p className="mt-1.5 text-xs text-muted-foreground/60">
                          — {finding.quoteAuthor}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground/50 italic">
                      Observación directa durante el análisis
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

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
