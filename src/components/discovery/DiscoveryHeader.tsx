import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { discoveryConfig } from "@/data/discoveryData";
import heroVideo from "@/assets/hero-loop.mp4";

const DiscoveryHeader = () => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Background loop video */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-12 pb-16 md:pb-20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="mb-8">
              <a href={discoveryConfig.websiteUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src="/uvicuo-wordmark.png"
                  alt="Uvicuo"
                  className="mx-auto h-8 opacity-70 transition-opacity hover:opacity-100"
                />
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Badge className="mb-5 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20 font-medium px-3 py-1">
                Discovery Summary
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight md:text-6xl text-foreground"
            >
              {discoveryConfig.clientName}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-muted-foreground text-base md:text-lg"
            >
              Hallazgos de reunión exploratoria · {discoveryConfig.meetingDate}
            </motion.p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default DiscoveryHeader;
