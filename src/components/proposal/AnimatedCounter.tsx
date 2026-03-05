import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

/**
 * Displays text as-is but with a typewriter-style reveal when scrolled into view.
 * Characters appear one-by-one with a slight stagger.
 */
const AnimatedCounter = ({ value, className = "" }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const chars = value.length;
    let frame = 0;
    const speed = Math.max(30, 400 / chars); // ms per char
    const interval = setInterval(() => {
      frame++;
      setRevealed(frame);
      if (frame >= chars) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {value.split("").map((char, i) => (
        <span
          key={i}
          style={{
            opacity: i < revealed ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        >
          {char}
        </span>
      ))}
    </motion.span>
  );
};

export default AnimatedCounter;
