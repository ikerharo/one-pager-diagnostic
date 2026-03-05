import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { nextSteps, contactInfo } from "@/data/discoveryData";

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

          <motion.div
            variants={itemVariants}
            className="mt-6 rounded-xl border border-primary/20 bg-card p-6 md:p-8 shadow-sm"
          >
            <p className="text-muted-foreground leading-relaxed">
              {nextSteps.description}
            </p>

            <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{contactInfo.phone}</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground/60">
              {contactInfo.name} · {contactInfo.role}
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NextStepsSection;
