import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { discoveryConfig } from "@/data/discoveryData";

const DiscoveryHeader = () => {
  const hasVideo = discoveryConfig.heroVideoUrl && discoveryConfig.heroVideoUrl.length > 0;

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("vimeo.com/")) {
      const id = url.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-muted/40 py-20 md:py-28">
      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="mb-8">
            <img
              src="/uvicuo-wordmark.png"
              alt="Uvicuo"
              className="mx-auto h-8 opacity-70"
            />
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

          {hasVideo && (
            <motion.div
              variants={itemVariants}
              className="mt-10 mx-auto max-w-3xl overflow-hidden rounded-xl border border-border shadow-lg shadow-primary/5"
            >
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={getEmbedUrl(discoveryConfig.heroVideoUrl)}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video de presentación"
                />
              </div>
            </motion.div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DiscoveryHeader;
