import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection, { itemVariants, scaleIn } from "./AnimatedSection";

const phases = [
  { number: "01", title: "Onboarding", duration: "Semana 1", description: "Configuración de cuenta y personalización" },
  { number: "02", title: "Integración", duration: "Semana 2-3", description: "Conexión con sistemas existentes" },
  { number: "03", title: "Capacitación", duration: "Semana 3-4", description: "Entrenamiento al equipo" },
  { number: "04", title: "Go-Live", duration: "Semana 4", description: "Lanzamiento y soporte dedicado" },
];

const ProposalSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-widest text-primary">Inversión</motion.p>
          <motion.h2 variants={itemVariants} className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">La Propuesta</motion.h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <motion.div variants={scaleIn} className="mx-auto mt-12 max-w-2xl rounded-xl border border-primary/30 bg-card p-8 shadow-lg">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Setup</p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">$[X]</p>
                <p className="text-xs text-muted-foreground">MXN · pago único</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Por Usuario</p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">$[X]</p>
                <p className="text-xs text-muted-foreground">MXN / mes</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Usuarios Base</p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">[X]</p>
                <p className="text-xs text-muted-foreground">incluidos</p>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-accent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Ahorro neto anual proyectado</p>
                  <p className="text-xs text-muted-foreground">Después de descontar la inversión en Uvicuo</p>
                </div>
                <p className="font-display text-2xl font-bold text-primary">$[X] MXN</p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Timeline with animated connector */}
        <div className="mx-auto mt-16 max-w-4xl">
          <AnimatedSection>
            <motion.h3 variants={itemVariants} className="text-center font-display text-xl font-semibold text-foreground">Plan de Implementación</motion.h3>
          </AnimatedSection>
          
          <div className="relative mt-8">
            {/* Connector line with grow animation */}
            <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px md:block">
              <div
                className="mx-auto h-full max-w-[calc(100%-8rem)] animate-connector-grow"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--uvicuo-green) / 0.1), hsl(var(--uvicuo-green) / 0.4), hsl(var(--uvicuo-green) / 0.4), hsl(var(--uvicuo-green) / 0.1))"
                }}
              />
            </div>
            <AnimatedSection className="grid gap-4 md:grid-cols-4" delay={0.3}>
              {phases.map((phase, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="relative rounded-xl border border-border bg-card p-5 text-center shadow-sm"
                >
                  <div className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-primary animate-pulse-ring">
                    {phase.number}
                  </div>
                  <h4 className="mt-3 font-display font-semibold text-foreground">{phase.title}</h4>
                  <p className="mt-1 text-xs font-medium text-primary">{phase.duration}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{phase.description}</p>
                </motion.div>
              ))}
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection className="mt-8" delay={0.5}>
          <motion.p variants={itemVariants} className="text-center text-xs text-muted-foreground">
            * Propuesta válida por [X] días a partir de la fecha de presentación.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="mt-10 text-center" delay={0.6}>
          <motion.div variants={itemVariants}>
            <Link
              to="/apendice"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:text-primary hover:shadow-md"
            >
              Ver anexos: precios, crédito, soporte y más
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProposalSection;
