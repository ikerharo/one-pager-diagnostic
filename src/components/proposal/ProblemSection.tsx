import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, Eye, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "./AnimatedSection";
import FloatingParticles from "./FloatingParticles";

const problems = [
  {
    icon: Eye,
    title: "Falta de Visibilidad",
    description: "Sin visibilidad en tiempo real del gasto corporativo. Decisiones basadas en datos incompletos o desactualizados.",
    stat: "[X]% de gastos sin categorizar",
    quote: '"No sabemos en qué se gasta hasta fin de mes."',
  },
  {
    icon: Clock,
    title: "Procesos Manuales",
    description: "Conciliación manual que consume tiempo del equipo financiero y genera errores operativos.",
    stat: "[X] horas/mes en conciliación",
    quote: '"El equipo pasa días cuadrando gastos en Excel."',
  },
  {
    icon: AlertTriangle,
    title: "Sin Controles de Gasto",
    description: "Ausencia de políticas automatizadas y límites de gasto que resultan en sobrecostos.",
    stat: "$[X] MXN/mes sin controles",
    quote: '"Cualquiera puede gastar sin aprobación previa."',
  },
  {
    icon: DollarSign,
    title: "Costos Ocultos",
    description: "Comisiones bancarias, tipo de cambio desfavorable y falta de aprovechamiento de economías de escala.",
    stat: "$[X] MXN/año en comisiones",
    quote: '"No sabíamos cuánto pagábamos en comisiones."',
  },
];

const ProblemSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <FloatingParticles />
      
      {/* Scan line effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container relative">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-widest text-primary">Diagnóstico</motion.p>
          <motion.h2 variants={itemVariants} className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">El Problema</motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-muted-foreground">
            Los retos que enfrentan empresas como [CLIENTE] en la gestión de gastos en ruta.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="mt-12 grid gap-6 md:grid-cols-2" delay={0.2}>
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px -4px hsl(101 82% 43% / 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <problem.icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                  <p className="font-display text-xl font-bold text-primary">{problem.stat}</p>
                  <p className="text-xs italic text-muted-foreground">{problem.quote}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatedSection>

        <AnimatedSection className="mt-10 text-center" delay={0.5}>
          <motion.div variants={itemVariants}>
            <Link
              to="/problema"
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

export default ProblemSection;
