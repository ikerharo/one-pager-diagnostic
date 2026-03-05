import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { discoveryConfig } from "@/data/discoveryData";

const DiscoveryHeader = () => {
  return (
    <section className="border-b border-border bg-background py-16 md:py-24">
      <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="mb-6">
            <img
              src="/uvicuo-wordmark.png"
              alt="Uvicuo"
              className="mx-auto h-8 opacity-80"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
              Discovery Summary
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight md:text-5xl text-foreground"
          >
            {discoveryConfig.clientName}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3 text-muted-foreground text-base md:text-lg"
          >
            Hallazgos de reunión exploratoria · {discoveryConfig.meetingDate}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <span>{discoveryConfig.presenterName}</span>
            <span className="text-primary/40">·</span>
            <span>{discoveryConfig.presenterRole}</span>
            <span className="text-primary/40">·</span>
            <span>{discoveryConfig.presenterEmail}</span>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DiscoveryHeader;
