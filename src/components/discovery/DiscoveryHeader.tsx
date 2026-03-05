import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { discoveryConfig } from "@/data/discoveryData";
import heroVideo from "@/assets/hero-loop.mp4";

const DiscoveryHeader = () => {
  return (
    <section className="section-dark relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Full-bleed video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--uvicuo-dark))]/60 via-[hsl(var(--uvicuo-dark))]/80 to-[hsl(var(--uvicuo-dark))]" />
      </div>

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-20 animate-dot-grid pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green) / 0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="mb-6">
              <a href={discoveryConfig.websiteUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src="/uvicuo-wordmark.png"
                  alt="Uvicuo"
                  className="mx-auto h-7 opacity-50 transition-opacity hover:opacity-90"
                />
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20 font-medium px-3 py-1 text-xs">
                Discovery Summary · {discoveryConfig.meetingDate}
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold tracking-tight md:text-7xl text-white drop-shadow-lg animate-glow-pulse"
            >
              {discoveryConfig.clientName}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-base md:text-lg max-w-xl mx-auto"
              style={{ color: "hsl(var(--uvicuo-dark-muted))" }}
            >
              Resumen de hallazgos y plan de acción tras la reunión exploratoria
            </motion.p>
          </AnimatedSection>
        </div>
      </div>

      {/* Accent gradient line */}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
};

export default DiscoveryHeader;
