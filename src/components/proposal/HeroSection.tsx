import { motion } from "framer-motion";

// Minimal top-down vehicle (heading downward = cab at bottom)
const Vehicle = ({ size = 1, opacity = 0.7 }: { size?: number; opacity?: number }) => (
  <g opacity={opacity} transform={`scale(${size})`}>
    <rect x="-2.5" y="-6" width="5" height="12" rx="2.5" fill="hsl(var(--uvicuo-green))" />
    {/* Windshield at top (front of car going down) */}
    <rect x="-1.5" y="-5" width="3" height="2.5" rx="1" fill="hsl(var(--uvicuo-dark))" opacity="0.4" />
  </g>
);

// Paths: scattered origins → converge at y=480 (subtitle height area) → single line down
const convergenceY = 480;
const paths = [
  `M100 -30 Q130 100 180 200 Q250 320 380 400 Q480 450 600 ${convergenceY}`,
  `M320 -30 Q300 80 340 180 Q400 300 500 400 Q560 440 600 ${convergenceY}`,
  `M600 -30 L600 ${convergenceY}`,
  `M880 -30 Q900 80 860 180 Q800 300 700 400 Q640 440 600 ${convergenceY}`,
  `M1100 -30 Q1070 100 1020 200 Q950 320 820 400 Q720 450 600 ${convergenceY}`,
];
const unifiedPath = `M600 ${convergenceY} L600 820`;

const HeroSection = () => {
  return (
    <section className="section-dark relative flex min-h-[calc(100vh-6.5rem)] items-center justify-center overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[350px] h-[200px] rounded-full blur-[90px]"
          style={{ top: "55%", background: "hsl(var(--uvicuo-green) / 0.07)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <filter id="vGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="unifiedRoad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--uvicuo-green))" stopOpacity="0.25" />
              <stop offset="100%" stopColor="hsl(var(--uvicuo-green))" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Chaotic lanes converging */}
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="hsl(var(--uvicuo-green))"
              strokeWidth={i === 2 ? 1.2 : 0.8}
              strokeOpacity={0.12 + (i === 2 ? 0.08 : 0)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: i * 0.12 }}
            />
          ))}

          {/* Unified road below convergence */}
          <motion.path
            d={unifiedPath}
            stroke="url(#unifiedRoad)"
            strokeWidth="36"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.8 }}
          />
          <motion.path
            d={unifiedPath}
            stroke="hsl(var(--uvicuo-green))"
            strokeWidth="1"
            strokeDasharray="8 6"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 2.2 }}
          />

          {/* Convergence pulse */}
          <motion.circle cx="600" cy={convergenceY} r="4" fill="hsl(var(--uvicuo-green))"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.8, 0.5], scale: [0, 1.3, 1] }}
            transition={{ duration: 1, delay: 2 }}
          />
          <motion.circle cx="600" cy={convergenceY} r="10" stroke="hsl(var(--uvicuo-green))" strokeWidth="0.8" fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.8, 2.2] }}
            transition={{ duration: 3, delay: 2.5, repeat: Infinity }}
          />

          {/* Vehicles on chaotic paths (moving down toward convergence) */}
          {[0, 2, 4].map((pIdx, i) => (
            <motion.g
              key={`v-${i}`}
              filter="url(#vGlow)"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "95%", opacity: 1 }}
              transition={{
                offsetDistance: { duration: 4 + i * 0.5, ease: "easeInOut", delay: 1 + i * 2, repeat: Infinity, repeatDelay: 4 + i * 2 },
                opacity: { duration: 0.6, delay: 1 + i * 2 },
              }}
              style={{ offsetPath: `path("${paths[pIdx]}")`, offsetRotate: "auto" }}
            >
              <Vehicle size={pIdx === 2 ? 1 : 0.75} opacity={pIdx === 2 ? 0.7 : 0.4} />
            </motion.g>
          ))}

          {/* Single vehicle on unified road */}
          <motion.g
            filter="url(#vGlow)"
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{ offsetDistance: "90%", opacity: 1 }}
            transition={{
              offsetDistance: { duration: 3, ease: "easeInOut", delay: 3.5, repeat: Infinity, repeatDelay: 5 },
              opacity: { duration: 0.5, delay: 3.5 },
            }}
            style={{ offsetPath: `path("${unifiedPath}")`, offsetRotate: "auto" }}
          >
            <Vehicle size={1.1} opacity={0.8} />
          </motion.g>

          {/* Subtle flowing particles */}
          {[0, 3].map((pIdx, i) => (
            <motion.circle key={`p-${i}`} r="1.2" fill="hsl(var(--uvicuo-green))" opacity={0.2}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity, delay: i * 2.5 }}
              style={{ offsetPath: `path("${paths[pIdx]}")` }}
            />
          ))}
        </svg>

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--uvicuo-green) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--uvicuo-green) / 0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
      </div>

      <div className="container relative z-10 text-center">
        <motion.div
          className="mx-auto max-w-3xl space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-block rounded-full border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[hsl(var(--uvicuo-dark-muted))]">
            Propuesta Comercial
          </div>

          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            <span className="text-gradient-green">[CLIENTE]</span>
          </h1>

          <p className="text-lg text-[hsl(var(--uvicuo-dark-muted))] md:text-xl">
            El camino hacia la centralización de tus gastos en ruta
          </p>

          <motion.div
            className="mx-auto h-px w-24"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--uvicuo-green)), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          />

          <div className="space-y-1 text-sm text-[hsl(var(--uvicuo-dark-muted))]">
            <p className="font-medium text-white">[Nombre del Presentador]</p>
            <p>[Cargo] · [email@uvicuo.com]</p>
            <p className="mt-3 text-xs uppercase tracking-wider">[Fecha de la Propuesta]</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
