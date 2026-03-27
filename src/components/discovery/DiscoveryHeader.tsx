import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDeal } from "@/context/DealContext";
import heroVideo from "@/assets/hero-loop.mp4";
import { ChevronDown, ShieldCheck } from "lucide-react";

const DiscoveryHeader = () => {
  const { discoveryConfig, preparedFor } = useDeal();
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setShowHint(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              {discoveryConfig.subtitle}
            </motion.p>

            {preparedFor && (
              <motion.div variants={itemVariants} className="mt-8">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                  {preparedFor.label}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {preparedFor.recipients.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] px-4 py-2 text-center"
                    >
                      <span className="block text-sm font-medium text-white">{r.name}</span>
                      <span className="block text-[10px] text-muted-foreground">{r.role}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {discoveryConfig.ndaUrl && (
              <motion.div variants={itemVariants} className="mt-8">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                >
                  <a href={discoveryConfig.ndaUrl} target="_blank" rel="noopener noreferrer">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Firmar NDA
                  </a>
                </Button>
              </motion.div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll hint */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Desliza</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>
      )}

      {/* Accent gradient line */}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
};

export default DiscoveryHeader;
