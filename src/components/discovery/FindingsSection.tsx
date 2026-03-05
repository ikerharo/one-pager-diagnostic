import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { findings } from "@/data/discoveryData";

const impactStyles = {
  alto: "bg-destructive/10 text-destructive border-destructive/20",
  medio: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  bajo: "bg-primary/10 text-primary border-primary/20",
} as const;

const FindingsSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Hallazgos <span className="text-primary">Clave</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            Principales oportunidades identificadas durante la sesión de discovery.
          </motion.p>

          <div className="mt-10 space-y-3">
            {findings.map((finding, i) => {
              const Icon = finding.icon;
              const impact = impactStyles[finding.impact];
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10 shrink-0 mt-0.5">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-sm text-foreground">{finding.title}</h3>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${impact}`}>
                        {finding.impact}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {finding.description}
                    </p>
                  </div>

                  {/* Index */}
                  <span className="text-xs font-bold text-muted-foreground/20 font-mono shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
