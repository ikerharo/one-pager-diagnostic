import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { clientReference } from "@/data/discoveryData";

const ClientReference = () => {
  return (
    <section className="section-dark py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-6">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-center"
          >
            Caso de <span className="text-gradient-green">Referencia</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="mt-10 rounded-xl border border-border bg-card p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Quote className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{clientReference.companyName}</p>
                <p className="text-xs text-muted-foreground">{clientReference.industry}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground italic">
              {clientReference.quote}
            </p>

            <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient-green">{clientReference.metric}</p>
                <p className="text-xs text-muted-foreground">{clientReference.metricLabel}</p>
              </div>
              <div className="ml-auto text-right text-xs text-muted-foreground">
                <p className="font-medium">{clientReference.contactName}</p>
                <p>{clientReference.contactRole}</p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ClientReference;
