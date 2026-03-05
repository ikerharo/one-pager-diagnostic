import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { trustedClients } from "@/data/discoveryData";

const TrustedBySection = () => {
  if (!trustedClients || trustedClients.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground/60"
          >
            Empresas que ya confían en nosotros
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {trustedClients.map((client, i) => (
              <div
                key={i}
                className="grayscale opacity-40 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="h-8 w-auto max-w-[120px] object-contain"
                  onError={(e) => {
                    // Show name as fallback if logo fails to load
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "block";
                  }}
                />
                <span className="hidden text-sm font-medium text-muted-foreground">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TrustedBySection;
