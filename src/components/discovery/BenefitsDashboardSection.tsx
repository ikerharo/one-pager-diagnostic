import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const formatMXN = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

const BenefitsDashboardSection = () => {
  const { benefitsDashboard } = useDeal();
  if (!benefitsDashboard) return null;

  const {
    spendBreakdown,
    spendTotal,
    savingsCategories,
    qualitativeBenefits,
    totalSavings,
    totalMonthly,
    totalAnnual,
    note,
  } = benefitsDashboard;

  return (
    <section className="section-dark py-12 md:py-16 overflow-hidden">
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
            className="text-2xl font-bold tracking-tight md:text-3xl text-white max-w-2xl"
          >
            Beneficios identificados en 3 líneas de servicio
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm text-muted-foreground max-w-2xl"
          >
            Estimaciones conservadoras. Se ajustan con datos confirmados de Elola.
          </motion.p>

          {/* Donut chart — only rendered when spendBreakdown exists */}
          {spendBreakdown && spendBreakdown.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-10 rounded-xl border border-border bg-card p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Gasto operativo analizado
              </p>
              {spendTotal && (
                <p className="text-2xl font-extrabold text-white mb-6">{spendTotal}</p>
              )}

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-[200px] h-[200px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spendBreakdown}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                        strokeWidth={0}
                      >
                        {spendBreakdown.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${formatMXN(value)} MXN`, ""]}
                        contentStyle={{
                          backgroundColor: "hsl(220 18% 18%)",
                          border: "1px solid hsl(220 12% 32%)",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-3">
                  {spendBreakdown.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-[hsl(0,0%,85%)] flex-1">{item.category}</span>
                      {item.badge && (
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                          item.badge === "Datos reales"
                            ? "border-primary/30 bg-primary/15 text-primary"
                            : "border-amber-500/30 bg-amber-500/15 text-amber-400"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-white">
                        {formatMXN(item.amount)} MXN
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Savings categories */}
          {savingsCategories.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {savingsCategories.map((cat: any, i: number) => {
                const Icon = cat.icon;
                const badgeText = cat.badge;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${cat.color || "hsl(101,82%,43%)"}20` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: cat.color || "hsl(101,82%,43%)" }} />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {cat.category}
                      </span>
                    </div>
                    <span className="block text-2xl font-extrabold text-primary">
                      {cat.estimatedSaving}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {cat.calculation}
                    </p>
                    {badgeText && (
                      <span className={`mt-3 inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                        badgeText.includes("datos reales") || badgeText.includes("Basado")
                          ? "border-primary/30 bg-primary/15 text-primary"
                          : "border-amber-500/30 bg-amber-500/15 text-amber-400"
                      }`}>
                        {badgeText}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Total savings highlight */}
          {totalSavings && (
            <motion.div
              variants={itemVariants}
              className="mt-5 rounded-xl border-2 border-primary/30 bg-primary/[0.08] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <span className="text-sm font-semibold text-white">Ahorro total estimado</span>
              <span className="text-xl font-extrabold text-primary">{totalSavings}</span>
            </motion.div>
          )}

          {/* Legacy totals (for other deals) */}
          {!totalSavings && (totalMonthly || totalAnnual) && (
            <motion.div
              variants={itemVariants}
              className="mt-5 rounded-xl border-2 border-primary/30 bg-primary/[0.08] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <span className="text-sm font-semibold text-white">Ahorro estimado total</span>
              <div className="flex gap-6">
                {totalMonthly && (
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-primary">{totalMonthly}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">mensual</span>
                  </div>
                )}
                {totalAnnual && (
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-primary">{totalAnnual}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">anual</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {note && (
            <motion.p
              variants={itemVariants}
              className="mt-3 text-xs text-muted-foreground italic"
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
                        <h4 className="text-sm font-semibold text-white">{benefit.title}</h4>
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
