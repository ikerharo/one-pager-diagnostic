import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const ExecutiveSummarySection = () => {
  const { executiveSummary } = useDeal();
  if (!executiveSummary) return null;

  return (
    <section className="pt-16 md:pt-24 pb-6 md:pb-8 overflow-hidden bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-4"
          >
            Resumen Ejecutivo
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {executiveSummary.thesis}
          </motion.p>

          {executiveSummary.impactItems.length > 0 && (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
              {executiveSummary.impactItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card p-5 text-center"
                >
                  <span className="block text-2xl md:text-3xl font-extrabold text-primary">
                    {item.value}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground leading-tight">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ExecutiveSummarySection;
