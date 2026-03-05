import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { nextSteps, discoveryConfig } from "@/data/discoveryData";

const NextStepsSection = () => {
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-6">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Siguientes <span className="text-primary">Pasos</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-muted-foreground leading-relaxed"
          >
            {nextSteps.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>{nextSteps.contactEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>{nextSteps.contactPhone}</span>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-xs text-muted-foreground/60"
          >
            {discoveryConfig.presenterName} · {discoveryConfig.presenterRole}
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NextStepsSection;
