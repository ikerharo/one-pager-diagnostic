import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection, { itemVariants, scaleIn } from "./AnimatedSection";
import AnimatedCounter from "./AnimatedCounter";

const donutData = [
  { name: "Comisiones bancarias", value: 35, color: "hsl(101, 82%, 43%)" },
  { name: "Automatización", value: 25, color: "hsl(101, 60%, 55%)" },
  { name: "Gastos fuera de política", value: 22, color: "hsl(160, 50%, 45%)" },
  { name: "Tipo de cambio", value: 18, color: "hsl(180, 40%, 50%)" },
];

const quantifiedSavings = [
  { label: "Reducción en comisiones bancarias", value: "$[X] MXN" },
  { label: "Ahorro por automatización de procesos", value: "$[X] MXN" },
  { label: "Reducción de gastos fuera de política", value: "$[X] MXN" },
  { label: "Optimización de tipo de cambio", value: "$[X] MXN" },
];

const qualitativeValue = [
  "Visibilidad en tiempo real del gasto",
  "Mejor control y cumplimiento de políticas",
  "Reducción de riesgo de fraude",
  "Mejora en satisfacción del equipo",
  "Datos para negociación con proveedores",
];

const ImpactSection = () => {
  const circuitRef = useRef<SVGSVGElement>(null);
  const circuitInView = useInView(circuitRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-16 md:py-24">
      <div className="container">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-widest text-primary">Caso de Negocio</motion.p>
          <motion.h2 variants={itemVariants} className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">Impacto Financiero</motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-muted-foreground">El retorno de inversión proyectado para [CLIENTE].</motion.p>
        </AnimatedSection>

        {/* Metrics — dark panel with animated circuit pattern */}
        <AnimatedSection className="section-dark relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl p-8" delay={0.2}>
          {/* Animated circuit lines */}
          <svg
            ref={circuitRef}
            className="absolute inset-0 h-full w-full opacity-[0.06]"
            viewBox="0 0 800 200"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <g className={circuitInView ? "animate-circuit-draw" : ""} style={{ strokeDasharray: circuitInView ? 1200 : 0 }}>
              <line x1="0" y1="100" x2="200" y2="100" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
              <line x1="200" y1="100" x2="220" y2="60" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
              <line x1="220" y1="60" x2="400" y2="60" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
              <line x1="400" y1="60" x2="420" y2="100" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
              <line x1="420" y1="100" x2="580" y2="100" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
              <line x1="580" y1="100" x2="600" y2="140" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
              <line x1="600" y1="140" x2="800" y2="140" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
            </g>
            <circle cx="200" cy="100" r="3" fill="hsl(var(--uvicuo-green))" opacity={circuitInView ? 1 : 0} style={{ transition: "opacity 0.5s 1s" }} />
            <circle cx="400" cy="60" r="3" fill="hsl(var(--uvicuo-green))" opacity={circuitInView ? 1 : 0} style={{ transition: "opacity 0.5s 1.5s" }} />
            <circle cx="580" cy="100" r="3" fill="hsl(var(--uvicuo-green))" opacity={circuitInView ? 1 : 0} style={{ transition: "opacity 0.5s 2s" }} />
          </svg>

          <div className="relative grid gap-6 md:grid-cols-3">
            {[
              { label: "Ahorro Anual Estimado", value: "$[X] MXN", sub: "Primer año" },
              { label: "Payback", value: "[X] meses", sub: "Recuperación de inversión" },
              { label: "ROI", value: "[X]%", sub: "Retorno sobre inversión" },
            ].map((metric, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--uvicuo-dark-muted))]">{metric.label}</p>
                <AnimatedCounter value={metric.value} className="mt-3 block font-display text-4xl font-bold text-gradient-green md:text-5xl" />
                <p className="mt-2 text-sm text-[hsl(var(--uvicuo-dark-muted))]">{metric.sub}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Donut Chart */}
        <AnimatedSection delay={0.3}>
          <motion.div variants={scaleIn} className="mx-auto mt-12 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-center font-display text-lg font-semibold text-foreground">Distribución de Ahorros</h3>
            <div className="mt-4 flex flex-col items-center gap-6 md:flex-row">
              <div className="h-52 w-52 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                      isAnimationActive={true}
                      animationBegin={200}
                      animationDuration={1200}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, ""]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {donutData.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="ml-auto font-display text-sm font-semibold text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="mt-12 grid gap-8 md:grid-cols-2" delay={0.4}>
          <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-foreground">Ahorros Cuantificados</h3>
            <div className="mt-4 space-y-3">
              {quantifiedSavings.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border/50 pb-3">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-display font-semibold text-primary">{item.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-semibold text-foreground">Total Anual</span>
                <span className="font-display text-lg font-bold text-primary">$[X] MXN</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-foreground">Valor Agregado No Cuantificado</h3>
            <div className="mt-4 space-y-3">
              {qualitativeValue.map((item, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-border/50 pb-3">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="mt-10 text-center" delay={0.5}>
          <motion.div variants={itemVariants}>
            <Link
              to="/impacto"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:text-primary hover:shadow-md"
            >
              Ver Business Case completo
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ImpactSection;
