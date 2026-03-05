import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { findings } from "@/data/discoveryData";

const FindingsSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl"
          >
            Hallazgos <span className="text-gradient-green">Clave</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            Principales oportunidades identificadas durante la sesión de discovery.
          </motion.p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {findings.map((finding, i) => {
              const Icon = finding.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm">{finding.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {finding.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FindingsSection;
