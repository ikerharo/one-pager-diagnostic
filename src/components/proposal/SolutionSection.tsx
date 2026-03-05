import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection, { itemVariants, itemVariantsLeft, itemVariantsRight } from "./AnimatedSection";

const comparisons = [
  { before: "Conciliación manual en Excel", after: "Conciliación automática en tiempo real" },
  { before: "Sin visibilidad del gasto hasta cierre", after: "Dashboard con visibilidad 24/7" },
  { before: "Tarjetas corporativas sin controles", after: "Tarjetas virtuales con políticas y límites" },
  { before: "Aprobaciones por email o WhatsApp", after: "Flujos de aprobación digitales automatizados" },
  { before: "Reportes manuales de gastos", after: "Reportes automáticos y exportables" },
  { before: "Múltiples proveedores financieros", after: "Plataforma unificada de gestión de gastos" },
];

const SolutionSection = () => {
  return (
    <section className="relative py-16 md:py-24">
      {/* Subtle tech pattern — connecting dots with drift animation */}
      <svg className="absolute top-0 right-0 h-64 w-64 opacity-[0.04] animate-svg-drift" viewBox="0 0 200 200" fill="none">
        <circle cx="20" cy="20" r="2" fill="hsl(var(--uvicuo-green))" />
        <circle cx="60" cy="40" r="2" fill="hsl(var(--uvicuo-green))" />
        <circle cx="100" cy="20" r="2" fill="hsl(var(--uvicuo-green))" />
        <circle cx="140" cy="60" r="2" fill="hsl(var(--uvicuo-green))" />
        <circle cx="180" cy="30" r="2" fill="hsl(var(--uvicuo-green))" />
        <circle cx="40" cy="80" r="2" fill="hsl(var(--uvicuo-green))" />
        <circle cx="120" cy="100" r="2" fill="hsl(var(--uvicuo-green))" />
        <circle cx="160" cy="120" r="2" fill="hsl(var(--uvicuo-green))" />
        <line x1="20" y1="20" x2="60" y2="40" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
        <line x1="60" y1="40" x2="100" y2="20" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
        <line x1="100" y1="20" x2="140" y2="60" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
        <line x1="140" y1="60" x2="180" y2="30" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
        <line x1="40" y1="80" x2="120" y2="100" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
        <line x1="120" y1="100" x2="160" y2="120" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
        <line x1="60" y1="40" x2="40" y2="80" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
        <line x1="100" y1="20" x2="120" y2="100" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.5" />
      </svg>

      <div className="container relative">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-widest text-primary">Nuestra Propuesta</motion.p>
          <motion.h2 variants={itemVariants} className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">La Solución</motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-muted-foreground">
            Cómo Uvicuo transforma la gestión de gastos de [CLIENTE].
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="mx-auto mt-12 max-w-4xl rounded-xl border border-border bg-card p-6 shadow-sm md:p-8" delay={0.2}>
          <motion.div variants={itemVariants} className="grid grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-0">
            <div className="border-b border-border pb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Antes</div>
            <div />
            <div className="border-b border-border pb-3 text-xs font-semibold uppercase tracking-widest text-primary">Con Uvicuo</div>
          </motion.div>

          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              className="grid grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              transition={{ staggerChildren: 0.08, delayChildren: i * 0.06 }}
            >
              <motion.div variants={itemVariantsLeft} className="flex items-center border-b border-border/50 py-4 text-sm text-muted-foreground">{item.before}</motion.div>
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center border-b border-border/50 px-3 py-4"
              >
                <motion.div
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-accent"
                  whileInView={{ scale: [1, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                >
                  <ArrowRight className="h-3 w-3 text-primary" />
                </motion.div>
              </motion.div>
              <motion.div variants={itemVariantsRight} className="flex items-center border-b border-border/50 py-4 text-sm font-medium text-foreground">{item.after}</motion.div>
            </motion.div>
          ))}
        </AnimatedSection>

        <AnimatedSection className="mt-10 text-center" delay={0.5}>
          <motion.div variants={itemVariants}>
            <Link
              to="/solucion"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:text-primary hover:shadow-md"
            >
              Ver mapeo de procesos As-is / To-be
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SolutionSection;
