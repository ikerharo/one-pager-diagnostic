import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const TrustedBySection = () => {
  const { trustedClients } = useDeal();
  if (!trustedClients || trustedClients.length === 0) return null;

  // Duplicate list for seamless infinite scroll
  const doubled = [...trustedClients, ...trustedClients];

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground/60"
          >
            Empresas que ya confían en nosotros
          </motion.p>
        </AnimatedSection>
      </div>

      {/* Infinite marquee */}
      <div className="relative mt-8">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-marquee">
          {doubled.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-8 md:px-12 flex items-center"
            >
              <img
                src={client.logoUrl}
                alt={client.name}
                className="h-10 md:h-12 w-auto max-w-[140px] md:max-w-[160px] object-contain grayscale opacity-30 transition-all duration-500 hover:grayscale-0 hover:opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
