import { motion } from "framer-motion";
import { ArrowRight, Fuel, Shield, Clock, Receipt, ChevronRight } from "lucide-react";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stats = [
  { icon: Fuel, value: "7%", label: "Ahorro en combustible", sub: "Ahorro promedio estimado con Uvicuo" },
  { icon: Shield, value: "68%", label: "Prevención de fraude", sub: "Con controles de IA y GPS" },
  { icon: Clock, value: "75%", label: "Ahorro en tiempo administrativo", sub: "Trabajo manual mensual" },
  { icon: Receipt, value: "95%", label: "Aumento en deducibilidad", sub: "En combustible, viáticos y más" },
];

const features = [
  {
    title: "Ponle un alto al uso indebido de fondos",
    description: "Políticas de gasto poderosas, comprobación en tiempo real y visibilidad sobre cada peso.",
  },
  {
    title: "Ahorra hasta el 7% en combustible",
    description: "Te llevamos a las mejores estaciones, al mejor precio. Cobertura total y control de rendimiento.",
  },
  {
    title: "Todos tus gastos, una tarjeta Mastercard",
    description: "Centraliza, controla y automatiza cada gasto con una sola tarjeta, incluso el efectivo.",
  },
  {
    title: "Integra tus sistemas actuales",
    description: "Tecnología que se conecta a tus sistemas actuales para potenciar al máximo tu operación.",
  },
];

const logos = [
  { name: "Paquetexpress", src: "/logos/paquetexpress.png" },
  { name: "99 Minutos", src: "/logos/99minutos.png" },
  { name: "Bimbo", src: "/logos/bimbo.jpg" },
  { name: "Express 8W", src: "/logos/express8w.png" },
  { name: "Sanimex", src: "/logos/sanimex.webp" },
  { name: "Fulem", src: "/logos/fulem.png" },
  { name: "Maeda", src: "/logos/maeda.png" },
  { name: "SAC", src: "/logos/sac-2.png" },
  { name: "Tractotermos", src: "/logos/tractotermos.png" },
  { name: "Dolphy", src: "/logos/dolphy.png" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="https://uvicuo.com" target="_blank" rel="noopener noreferrer">
            <img src="/uvicuo-wordmark.png" alt="Uvicuo" className="h-6" />
          </a>
          <a
            href="https://uvicuo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
          >
            Agendar Demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="section-dark relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Subtle green glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-[1.08]"
            >
              Centraliza y automatiza{" "}
              <span className="text-gradient-green">
                tus gastos operativos con IA
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ color: "hsl(var(--uvicuo-dark-muted))" }}
            >
              Controla combustible, peajes, viáticos y efectivo todo en un solo lugar.
              Ahorra en promedio 10% optimizando desde la presupuestación hasta el cierre contable.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://uvicuo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] glow-green"
              >
                Agendar Demo
                <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Logos ── */}
      <section className="border-b border-border py-10 bg-muted/30">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground mb-8">
            Empresas que confían en Uvicuo
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-12 items-center">
              {[...logos, ...logos].map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.name}
                  className="h-10 md:h-12 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem statement ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight"
          >
            Tu tarjeta de combustible actual te está costando{" "}
            <span className="text-gradient-green">demasiado.</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="mt-5 text-lg text-muted-foreground leading-relaxed"
          >
            Comisiones altas, mal uso de fondos, poca comprobación y procesos lentos…
            Si eso te suena familiar, Uvicuo es para ti.
          </motion.p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 md:py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
                <a
                  href="https://uvicuo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Descubrir más <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-dark py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center mb-14"
          >
            Resultados que impactan tu operación
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-display text-4xl md:text-5xl font-bold text-gradient-green">
                  {stat.value}
                </p>
                <p className="mt-2 font-semibold text-sm">{stat.label}</p>
                <p className="mt-1 text-xs" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight"
          >
            ¿Listo para retomar el{" "}
            <span className="text-gradient-green">control?</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="mt-4 text-lg text-muted-foreground"
          >
            Agenda una demo y descubre cuánto podrías ahorrar con Uvicuo.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="mt-8"
          >
            <a
              href="https://uvicuo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] glow-green"
            >
              Agendar Demo
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 bg-muted/20">
        <div className="container mx-auto flex items-center justify-center gap-3 px-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-5 opacity-60" />
          <span className="inline-block h-1 w-1 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Uvicuo
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
