import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const FinancialImpactSection = () => {
  const { financialImpact } = useDeal();
  if (!financialImpact) return null;

  return (
    <section className="section-dark py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            Impacto Financiero
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {financialImpact.headline}
          </motion.h2>

          {/* Savings breakdown */}
          <div className="mt-10 space-y-3">
            {financialImpact.items.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium">{item.concept}</p>
                  {item.detail && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                  )}
                </div>
                <span className="text-lg font-bold text-primary whitespace-nowrap">
                  {item.monthlySaving}
                  <span className="text-xs font-normal text-muted-foreground ml-1">/mes</span>
                </span>
              </motion.div>
            ))}
          </div>

          {/* Totals */}
          <motion.div
            variants={itemVariants}
            className="mt-6 rounded-xl border-2 border-primary/30 bg-primary/[0.08] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Ahorro estimado total</span>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <span className="block text-2xl font-extrabold text-primary">
                  {financialImpact.totalMonthly}
                </span>
                <span className="text-xs text-muted-foreground">mensual</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-extrabold text-primary">
                  {financialImpact.totalAnnual}
                </span>
                <span className="text-xs text-muted-foreground">anual</span>
              </div>
            </div>
          </motion.div>

          {financialImpact.note && (
            <motion.p
              variants={itemVariants}
              className="mt-4 text-xs text-muted-foreground/70 italic"
            >
              {financialImpact.note}
            </motion.p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinancialImpactSection;
