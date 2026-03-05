import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useDeal } from "@/context/DealContext";

const SolutionSection = () => {
  const { uvicuoPositioning, discoveryConfig } = useDeal();

  if (!uvicuoPositioning) return null;

  return (
    <section className="border-t border-border py-16 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.span
            variants={itemVariants}
            className="text-xs font-bold uppercase tracking-wider text-primary"
          >
            A partir de lo que encontramos
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mt-1 text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Lo que <span className="text-primary">proponemos</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            {uvicuoPositioning.description}
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {uvicuoPositioning.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:shadow-md hover:shadow-primary/5"
              >
                <h3 className="text-sm font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-10 flex justify-center">
            <Button asChild size="lg" variant="outline" className="gap-2 group">
              <a href={discoveryConfig.websiteUrl} target="_blank" rel="noopener noreferrer">
                Conoce la plataforma
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SolutionSection;
