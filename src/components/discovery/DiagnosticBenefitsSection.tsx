import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { TrendingUp } from "lucide-react";

const formatMXN = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

const DiagnosticBenefitsSection = () => {
  const { benefitsDashboard } = useDiagnostic();
  if (!benefitsDashboard) return null;

  const {
    headline,
    subtitle,
    spendBreakdown,
    spendTotal,
    savingsCategories,
    qualitativeBenefits,
    totalSavings,
    totalMonthly,
    totalAnnual,
    totalPercent,
    note,
    footnotes,
  } = benefitsDashboard;

  return (
    <section className="section-dark py-16 md:py-20 overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Impacto estimado
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-white max-w-2xl"
          >
            {headline ?? "Ahorros esperados por categoría"}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={itemVariants}
              className="mt-3 text-sm leading-relaxed max-w-2xl"
              style={{ color: "hsl(var(--uvicuo-dark-muted))" }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* KPI hero band */}
          {(totalSavings || totalAnnual || totalPercent) && (
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-2xl border-2 border-primary/30 bg-primary/[0.08] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                  Ahorro anual proyectado
                </p>
                <p className="text-3xl md:text-4xl font-extrabold text-primary font-mono leading-none">
                  {totalSavings ?? totalAnnual}
                </p>
                {totalMonthly && (
                  <p className="mt-2 text-xs text-white/60">
                    Equivalente a <span className="font-semibold text-white/90">{totalMonthly}</span> mensuales
                  </p>
                )}
              </div>
              {totalPercent && (
                <div className="md:text-right md:border-l md:border-primary/20 md:pl-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    Sobre gasto operativo
                  </p>
                  <p className="text-3xl md:text-4xl font-extrabold text-white font-mono leading-none">
                    {totalPercent}
                  </p>
                  {spendTotal && (
                    <p className="mt-2 text-xs text-white/60">
                      Base: <span className="font-semibold text-white/90">{spendTotal}</span>
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Donut chart */}
          {spendBreakdown && spendBreakdown.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-6 rounded-xl border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">
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
                          backgroundColor: "hsl(220 18% 12%)",
                          border: "1px solid hsl(220 12% 32%)",
                          borderRadius: "8px",
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-3 w-full">
                  {spendBreakdown.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-[hsl(0,0%,85%)] flex-1">{item.category}</span>
                      <span className="text-sm font-semibold text-white">
                        {formatMXN(item.amount)} MXN
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Savings cards with sub-breakdown */}
          {savingsCategories.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {savingsCategories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="rounded-xl border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] p-5 transition-all duration-300 hover:border-primary/30"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${cat.color || "hsl(101,82%,43%)"}20` }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: cat.color || "hsl(101,82%,43%)" }}
                        />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                        {cat.category}
                      </span>
                    </div>
                    <span className="block text-2xl font-extrabold text-primary">
                      {cat.estimatedSaving}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">
                      {cat.calculation}
                    </p>

                    {cat.breakdown && cat.breakdown.length > 0 && (
                      <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3">
                        {cat.breakdown.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-center justify-between gap-2 text-[11px]"
                          >
                            <span className="text-white/55 truncate">{b.label}</span>
                            <span className="flex items-baseline gap-1.5 shrink-0">
                              {b.pct && (
                                <span className="text-white/40 font-mono text-[10px]">
                                  {b.pct}
                                </span>
                              )}
                              <span className="text-white/85 font-semibold font-mono">
                                {b.amount}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {note && (
            <motion.p
              variants={itemVariants}
              className="mt-4 text-xs italic text-white/50"
            >
              {note}
            </motion.p>
          )}

          {footnotes && footnotes.length > 0 && (
            <motion.ul variants={itemVariants} className="mt-2 space-y-1">
              {footnotes.map((f, i) => (
                <li key={i} className="text-[11px] text-white/40 leading-relaxed">
                  · {f}
                </li>
              ))}
            </motion.ul>
          )}

          {/* Qualitative benefits */}
          {qualitativeBenefits.length > 0 && (
            <>
              <motion.div variants={itemVariants} className="mt-12 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  Beneficios cualitativos adicionales
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualitativeBenefits.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex items-start gap-3 rounded-xl border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] p-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{benefit.title}</h4>
                        <p className="mt-0.5 text-xs leading-relaxed text-white/60">
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

export default DiagnosticBenefitsSection;
