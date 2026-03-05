import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { nextSteps } from "@/data/discoveryData";

const NextStepsSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl"
          >
            Próximos <span className="text-gradient-green">Pasos</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground"
          >
            {nextSteps.description}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <Button size="lg" className="gap-2 hover-shimmer">
              {nextSteps.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <a
              href={`mailto:${nextSteps.contactEmail}`}
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              {nextSteps.contactEmail}
            </a>
            <a
              href={`tel:${nextSteps.contactPhone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              {nextSteps.contactPhone}
            </a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NextStepsSection;
