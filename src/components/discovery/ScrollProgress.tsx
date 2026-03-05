import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(pct);
      setIsAtEnd(pct > 0.95);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToNext = useCallback(() => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-muted/30">
        <motion.div
          className="h-full bg-primary origin-left"
          style={{ scaleX: progress }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Mobile floating "next" button */}
      <AnimatePresence>
        {!isAtEnd && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToNext}
            className="fixed bottom-6 right-6 z-[60] md:hidden flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2.5 shadow-lg text-xs font-medium"
            aria-label="Siguiente sección"
          >
            Siguiente
            <ChevronDown size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
