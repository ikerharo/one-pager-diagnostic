import { motion } from "framer-motion";
import DiscoveryHeader from "@/components/discovery/DiscoveryHeader";
import FindingsSection from "@/components/discovery/FindingsSection";
import QuickWinsSection from "@/components/discovery/QuickWinsSection";
import NextStepsSection from "@/components/discovery/NextStepsSection";
import TrustedBySection from "@/components/discovery/TrustedBySection";

const slideUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscoveryHeader />

      <motion.div {...slideUp}>
        <FindingsSection />
      </motion.div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div {...slideUp} transition={{ ...slideUp.transition, delay: 0.1 }}>
        <QuickWinsSection />
      </motion.div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div {...slideUp} transition={{ ...slideUp.transition, delay: 0.15 }}>
        <NextStepsSection />
      </motion.div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div {...slideUp} transition={{ ...slideUp.transition, delay: 0.2 }}>
        <TrustedBySection />
      </motion.div>

      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      <footer className="border-t border-border py-10">
        <div className="container mx-auto flex items-center justify-center gap-3 px-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-5 opacity-60" />
          <span className="inline-block h-1 w-1 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Uvicuo · Confidencial
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
