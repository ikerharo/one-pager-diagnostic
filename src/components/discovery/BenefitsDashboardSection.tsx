import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const BenefitsDashboardSection = () => {
  const { benefitsDashboard } = useDeal();
  if (!benefitsDashboard) return null;

  const { savingsCategories, qualitativeBenefits, totalMonthly, totalAnnual, note } =
    benefitsDashboard;

  return (
    <section className="section-dark py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            Impacto Estimado
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl"
          >
            Beneficios cuantificados y operativos
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm text-muted-foreground max-w-2xl"
          >
            Estimaciones conservadoras basadas en los datos compartidos y benchmarks de la industria.
          </motion.p>

          {/* Savings categories */}
          {savingsCategories.length > 0 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {savingsCategories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {cat.category}
                      </span>
                    </div>
                    <span className="block text-2xl font-extrabold text-primary">
                      {cat.estimatedSaving}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
                      {cat.calculation}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Totals bar */}
          {(totalMonthly || totalAnnual) && (
            <motion.div
              variants={itemVariants}
              className="mt-5 rounded-xl border-2 border-primary/30 bg-primary/[0.08] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <span className="text-sm font-semibold">Ahorro estimado total</span>
              <div className="flex gap-6">
                {totalMonthly && (
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-primary">
                      {totalMonthly}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      mensual
                    </span>
                  </div>
                )}
                {totalAnnual && (
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-primary">
                      {totalAnnual}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      anual
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {note && (
            <motion.p
              variants={itemVariants}
              className="mt-3 text-xs text-muted-foreground/60 italic"
            >
              {note}
            </motion.p>
          )}

          {/* Qualitative benefits */}
          {qualitativeBenefits.length > 0 && (
            <>
              <motion.div variants={itemVariants} className="mt-12 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Beneficios adicionales
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualitativeBenefits.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">{benefit.title}</h4>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BenefitsDashboardSection;
