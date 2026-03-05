import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { concerns, type Severity } from "@/data/discoveryData";

const severityStyles: Record<Severity, string> = {
  Alta: "bg-destructive/10 text-destructive border-destructive/20",
  Media: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Baja: "bg-muted text-muted-foreground border-border",
};

const ConcernsSection = () => {
  return (
    <section className="section-dark py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl"
          >
            Concerns <span className="text-gradient-green">Prioritarios</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            Ordenados por nivel de impacto en la operación.
          </motion.p>

          <div className="mt-10 space-y-3">
            {concerns.map((concern, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-sm">{concern.title}</h3>
                    <Badge
                      variant="outline"
                      className={severityStyles[concern.severity]}
                    >
                      {concern.severity}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {concern.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ConcernsSection;
