import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import deliverableMapeo from "@/assets/deliverable-mapeo.png";
import deliverableBusinessCase from "@/assets/deliverable-business-case.png";
import {
  ChevronDown,
  Mail,
  Phone,
  CalendarCheck,
  CheckCircle2,
  Users,
  Clock,
  ArrowRight,
  Target,
  FileSearch,
  BarChart3,
  GitCompare,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Briefcase,
  Eye,
  MessageCircle,
} from "lucide-react";
import diagnosticRegistry from "@/data/diagnostics";
import { processDiagnosticContent, type DiagnosticData } from "@/data/diagnosticData";
import { DiagnosticProvider, useDiagnostic } from "@/context/DiagnosticContext";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollProgress from "@/components/discovery/ScrollProgress";
import TrustedBySection from "@/components/discovery/TrustedBySection";
import DiagnosticBenefitsSection from "@/components/discovery/DiagnosticBenefitsSection";
import NotFound from "./NotFound";
import heroVideo from "@/assets/hero-loop.mp4";

/* ── Hero — Thesis + hard numbers immediately ──── */
const DiagnosticHero = () => {
  const { config, contact, patterns } = useDiagnostic();
  const { slug } = useParams<{ slug: string }>();
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 80) setShowHint(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section-dark relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-30">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--uvicuo-dark))]/70 via-[hsl(var(--uvicuo-dark))]/85 to-[hsl(var(--uvicuo-dark))]" />
      </div>
      <div
        className="absolute inset-0 z-[1] opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green) / 0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-6">
          <AnimatedSection>
            {/* Top bar: logo + badge */}
            <div className="flex flex-col items-center mb-10">
              <motion.div variants={itemVariants}>
                <a href={config.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <img src="/uvicuo-wordmark.png" alt="Uvicuo" className="mx-auto h-6 opacity-40 transition-opacity hover:opacity-80" />
                </a>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-4">
                <Badge className="bg-white/5 text-white/70 border-white/10 hover:bg-white/10 font-medium px-4 py-1.5 text-xs tracking-wider uppercase">
                  {config.subtitle}
                </Badge>
              </motion.div>
            </div>

            {/* Provocative thesis */}
            <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight md:text-6xl text-white leading-tight text-center max-w-4xl mx-auto">
              {config.heroQuestion}
            </motion.h1>

            {/* Prepared for */}
            {config.preparedFor && config.preparedFor.recipients.length > 0 && (
              <motion.div variants={itemVariants} className="mt-8 flex justify-center">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm px-8 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(var(--uvicuo-dark-muted) / 0.6)" }}>
                    {config.preparedFor.label}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {config.preparedFor.recipients.map((r, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {i > 0 && <span className="hidden sm:block h-4 w-[1px] bg-white/10" />}
                        <div className="text-left">
                          <p className="text-sm font-semibold text-white">{r.name}</p>
                          <p className="text-[11px]" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>{r.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* THE MONEY — Hard numbers right in the hero */}
            <div
              className={`mt-14 grid grid-cols-2 gap-3 md:gap-4 mx-auto ${
                patterns.items.length === 3
                  ? "md:grid-cols-3 max-w-3xl"
                  : patterns.items.length === 2
                  ? "md:grid-cols-2 max-w-xl"
                  : "md:grid-cols-4 max-w-5xl"
              }`}
            >
              {patterns.items.map((p, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 text-center transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]"
                >
                  <span className="text-2xl md:text-3xl font-bold text-primary font-mono block">{p.stat}</span>
                  <p className="mt-2 text-xs leading-snug text-white/60">{p.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.p variants={itemVariants} className="mt-6 text-center text-xs max-w-2xl mx-auto" style={{ color: "hsl(var(--uvicuo-dark-muted) / 0.6)" }}>
              {patterns.description}
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="gap-2 text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/20">
                <a href="https://wa.me/+525517001612" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {contact.ctaText}
                </a>
              </Button>
              {config.ndaUrl && (
                <Button asChild variant="outline" size="lg" className="gap-2 text-base px-8 py-6 rounded-xl border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                  <a href={config.ndaUrl} target="_blank" rel="noopener noreferrer">
                    <ShieldCheck className="h-5 w-5" />
                    Firmar NDA
                  </a>
                </Button>
              )}
              {slug && (
                <Button asChild variant="outline" size="lg" className="gap-2 text-base px-8 py-6 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <a href={`/${slug}`}>
                    <FileSearch className="h-5 w-5" />
                    Ver one-pager
                  </a>
                </Button>
              )}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>

      {showHint && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>Desliza</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>
      )}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
};

/* ── Why They Qualify — Exclusive, editorial block ── */
const WhyQualifySection = () => {
  const { whyQualify } = useDiagnostic();
  return (
    <section className="border-t border-border bg-background py-16 md:py-20 relative overflow-hidden">
      {/* Subtle decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />
      <div className="container mx-auto max-w-3xl px-6 md:px-12">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{whyQualify.headline}</span>
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed text-foreground/90 font-light">
            {whyQualify.description}
          </motion.p>
          {whyQualify.reasons.length > 0 && (
            <motion.ul variants={itemVariants} className="mt-8 space-y-3">
              {whyQualify.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </motion.ul>
          )}
          <motion.p variants={itemVariants} className="mt-8 text-sm italic text-muted-foreground/70 border-l-2 border-primary/30 pl-4">
            {whyQualify.closingLine}
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Track Record Bar — Social proof immediately ── */
const OutcomeStatsBar = () => {
  const { outcomeStats } = useDiagnostic();
  return (
    <section className="border-t border-border bg-background py-10 md:py-12">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p variants={itemVariants} className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-8">
            {outcomeStats.headline}
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {outcomeStats.items.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-foreground font-mono tracking-tight">{stat.value}</span>
                <p className="mt-1 text-xs text-muted-foreground leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Pattern Deep-Dive — Expand on the numbers ── */
const PatternsDeepDive = () => {
  const { patterns } = useDiagnostic();
  return (
    <section className="section-dark py-16 md:py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Detrás de los números</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-white">
            {patterns.headline}
          </motion.h2>

          <div className="mt-10 space-y-4">
            {patterns.items.map((p, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-xl border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] p-6 md:p-8 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <span className="text-4xl md:text-5xl font-bold text-primary font-mono shrink-0">{p.stat}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{p.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
                      {p.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Deliverables — What they get ────────────── */
const deliverableIcons = [FileSearch, AlertTriangle, BarChart3, GitCompare, Lightbulb];

const DeliverablesSection = () => {
  const { deliverables } = useDiagnostic();
  return (
    <section className="border-t border-border bg-background py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Entregables</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Qué van a <span className="text-primary">recibir</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
            5 entregables concretos — suyos para siempre, avancen o no con nosotros.
          </motion.p>

          <div className="mt-10 space-y-3">
            {deliverables.map((d, i) => {
              const Icon = deliverableIcons[i] || FileSearch;
              return (
                <motion.div key={i} variants={itemVariants} className="group flex items-start gap-5 rounded-xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground">{d.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                  </div>
                  <span className="text-3xl font-black font-mono text-muted-foreground/10 shrink-0 leading-none">{d.number}</span>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Deliverable Preview — "Peek behind the curtain" ── */
const deliverablePreviews = [
  {
    title: "Mapeo de Procesos",
    subtitle: "AS-IS → TO-BE",
    description: "Cada proceso operativo documentado: pain points, ecosistema de plataformas, flujos de información y puntos de fricción. Todo mapeado visualmente.",
    image: deliverableMapeo,
  },
  {
    title: "Business Case",
    subtitle: "Cuantificación financiera",
    description: "Supuestos documentados, proyección de ahorros mes a mes, análisis de escenarios y ROI. Los números que necesitan para tomar una decisión informada.",
    image: deliverableBusinessCase,
  },
];

const DeliverablePreviewSection = () => {
  return (
    <section className="section-dark py-16 md:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <Eye className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Vista previa del entregable</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-white">
            Este nivel de detalle, con <span className="text-primary">sus datos</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-3 text-sm leading-relaxed max-w-2xl" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
            Estos son ejemplos reales de los entregables que recibirán — adaptados a la operación y estructura contable de su empresa.
          </motion.p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliverablePreviews.map((preview, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group rounded-2xl border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Screenshot with perspective effect */}
                <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent p-4 pb-0">
                  <div
                    className="rounded-t-lg overflow-hidden shadow-2xl shadow-black/40 transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{
                      transform: "perspective(1200px) rotateX(2deg)",
                      transformOrigin: "bottom center",
                    }}
                  >
                    <img
                      src={preview.image}
                      alt={preview.title}
                      className="w-full h-auto"
                    />
                  </div>
                  {/* Fade overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[hsl(var(--uvicuo-dark-card))] to-transparent" />
                </div>

                {/* Text content */}
                <div className="p-6 pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {preview.subtitle}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-white">{preview.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
                    {preview.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="mt-8 text-center text-xs" style={{ color: "hsl(var(--uvicuo-dark-muted) / 0.5)" }}>
            Los ejemplos mostrados corresponden a diagnósticos anteriores. Su estudio será personalizado con datos de su operación.
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── How It Works — Compact methodology + timeline ── */
const HowItWorksSection = () => {
  const { whatIsIt, methodology, timeline } = useDiagnostic();
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">El proceso</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            {whatIsIt.headline}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-2xl">
            {whatIsIt.description}
          </motion.p>

          {/* Key stats inline */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {whatIsIt.stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4 text-center">
                <span className="text-2xl md:text-3xl font-bold text-primary font-mono">{stat.value}</span>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Methodology steps — compact */}
          <div className="mt-12 relative">
            <motion.div
              className="absolute left-[19px] top-0 bottom-0 w-[2px] hidden sm:block"
              style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.2), transparent)" }}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <div className="space-y-3">
              {methodology.map((m, i) => (
                <motion.div key={i} variants={itemVariants} className="flex gap-4 sm:gap-6">
                  <div className="hidden sm:flex flex-col items-center pt-4">
                    <div className="relative h-[10px] w-[10px] flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-primary ring-4 ring-primary/10" />
                    </div>
                  </div>
                  <div className="flex-1 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">{m.phase}</span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        <Clock className="h-3 w-3" /> {m.duration}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">{m.title}</h3>
                    <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">{m.who}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.covers}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compact timeline */}
          <div className="mt-12 rounded-xl border border-primary/20 bg-primary/[0.03] p-6 md:p-8">
            <motion.h3 variants={itemVariants} className="text-lg font-bold text-foreground mb-4">
              De inicio a entregable: <span className="text-primary">2–3 semanas</span>
            </motion.h3>
            <div className="flex flex-col sm:flex-row gap-4">
              {timeline.map((t, i) => (
                <motion.div key={i} variants={itemVariants} className="flex-1 flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold shrink-0">{i + 1}</div>
                  <div>
                    <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">{t.week}</span>
                    <p className="mt-0.5 text-sm text-muted-foreground">{t.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Scope — What we map (tracks) ────────────── */
const TracksSection = () => {
  const { tracks } = useDiagnostic();
  return (
    <section className="border-t border-border py-16 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Alcance</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Qué vamos a <span className="text-primary">mapear</span>
          </motion.h2>

          <div className="mt-10 space-y-4">
            {tracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <motion.div key={i} variants={itemVariants} className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">Track {i + 1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{track.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{track.subtitle}</p>
                        <ul className="mt-4 space-y-2">
                          {track.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="text-4xl font-black font-mono text-muted-foreground/10 shrink-0 leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Uvicuo Strategic Positioning ─────────────── */
const UvicuoPositioningSection = () => {
  const { uvicuoPositioning } = useDiagnostic();
  return (
    <section className="section-dark py-16 md:py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-1">
            <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-6" />
            <motion.span variants={itemVariants} className="text-xs font-semibold uppercase tracking-wider text-primary">
              Quién respalda el diagnóstico
            </motion.span>
          </div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-white">
            {uvicuoPositioning.tagline}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-3 text-sm leading-relaxed max-w-2xl" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
            {uvicuoPositioning.description}
          </motion.p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uvicuoPositioning.differentiators.map((d, i) => (
              <motion.div key={i} variants={itemVariants} className="rounded-xl border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary mb-3">
                  {d.category}
                </span>
                <h3 className="font-semibold text-sm text-white">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
                  {d.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            {uvicuoPositioning.proofPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-white/80">{point}</span>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Findings — Account-specific evidence ───── */
const FindingsSection = () => {
  const { findings, config } = useDiagnostic();
  if (!findings || findings.length === 0) return null;

  const impactLabel = { alto: "Impacto alto", medio: "Impacto medio", bajo: "Impacto bajo" } as const;
  const impactColor = { alto: "text-destructive", medio: "text-amber-600", bajo: "text-primary" } as const;

  return (
    <section className="border-t border-border bg-background py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <FileSearch className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Lo que ya sabemos</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Lo que escuchamos en {config.clientName}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Cinco puntos concretos detectados en sesión. Son el punto de partida del diagnóstico — no la conclusión.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {findings.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm text-foreground leading-snug">{f.title}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${impactColor[f.impact]}`}>
                          {impactLabel[f.impact]}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Quick Wins — Hoy vs Con Uvicuo ──────────── */
const QuickWinsSection = () => {
  const { quickWins } = useDiagnostic();
  if (!quickWins || quickWins.length === 0) return null;

  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <GitCompare className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">El cambio</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Hoy <span className="text-muted-foreground">→</span> Con <span className="text-primary">Uvicuo</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Sin prometer cifras todavía. Así se ven los procesos antes y después del diagnóstico.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 rounded-xl border border-border overflow-hidden bg-card">
            <div className="grid grid-cols-2 bg-muted/60 border-b border-border">
              <div className="px-6 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Hoy</span>
              </div>
              <div className="px-6 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Con Uvicuo</span>
              </div>
            </div>
            {quickWins.map((win, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 ${i < quickWins.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="px-6 py-5 border-r border-border">
                  <p className="text-sm leading-relaxed text-muted-foreground">{win.before}</p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm leading-relaxed text-foreground">{win.after}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Guarantee — Risk reversal as closer ──────── */
const GuaranteeSection = () => {
  const { guarantee, exclusionNote } = useDiagnostic();
  return (
    <section className="border-t border-border bg-background py-14 md:py-16">
      <div className="container mx-auto max-w-3xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-8 md:p-10 text-center">
            <div className="flex justify-center mb-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <ShieldCheck className="h-7 w-7" />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{guarantee.headline}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto">
              {guarantee.text}
            </p>
            <p className="mt-4 text-xs italic text-muted-foreground/60">
              {guarantee.footnote}
            </p>
          </motion.div>
          {exclusionNote && (
            <motion.div
              variants={itemVariants}
              className="mt-4 rounded-xl border border-border bg-muted/40 px-5 py-3 text-center"
            >
              <p className="text-xs text-muted-foreground/80 italic">{exclusionNote}</p>
            </motion.div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Final CTA — Dark, commanding ────────────── */
const CtaSection = () => {
  const { contact, config } = useDiagnostic();
  return (
    <section className="section-dark py-16 md:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        <AnimatedSection>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight md:text-4xl text-center text-white leading-tight">
            El siguiente paso es <span className="text-primary">una conversación</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-center text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
            Coordinamos la primera sesión de discovery con su equipo de {config.clientName}. Son 60 minutos que pueden cambiar cómo ven su operación.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 rounded-2xl border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
              <div>
                <p className="text-base font-bold text-white">{contact.name}</p>
                <p className="text-sm mt-0.5" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>{contact.role}</p>
                <div className="mt-4 flex flex-col gap-2 text-sm" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{contact.email}</span>
                  </a>
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Button asChild size="lg" className="gap-2 text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/20">
                  <a href="https://wa.me/+525517001612" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    {contact.ctaText}
                  </a>
                </Button>
                {config.ndaUrl && (
                  <Button asChild variant="outline" size="lg" className="gap-2 text-base px-8 py-6 rounded-xl border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                    <a href={config.ndaUrl} target="_blank" rel="noopener noreferrer">
                      <ShieldCheck className="h-5 w-5" />
                      Firmar NDA
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Page Shell — New order ──────────────────── */
const DiagnosticPitchContent = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      {/* 1. Hero: thesis + what is it */}
      <DiagnosticHero />
      {/* 1b. Account-specific findings (opt-in via JSON) */}
      <FindingsSection />
      {/* 1c. Hoy → Con Uvicuo (opt-in via JSON) */}
      <QuickWinsSection />
      {/* 1d. Cuantificación de ahorros (opt-in via JSON) */}
      <DiagnosticBenefitsSection />
      {/* 2. What they'll receive */}
      <DeliverablesSection />
      {/* 2b. Preview of actual deliverables */}
      <DeliverablePreviewSection />
      {/* 3. The process — methodology + timeline */}
      <HowItWorksSection />
      {/* 4. Scope — what we map */}
      <TracksSection />
      {/* 5. Guarantee */}
      <GuaranteeSection />
      {/* 6. CTA */}
      <CtaSection />
      <footer className="section-dark py-10">
        <div className="container mx-auto flex items-center justify-center gap-3 px-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-5 opacity-60" />
          <span className="inline-block h-1 w-1 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Uvicuo · Confidencial</span>
        </div>
      </footer>
    </div>
  );
};

const DiagnosticPitchPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<DiagnosticData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug || !diagnosticRegistry[slug]) {
      setNotFound(true);
      return;
    }
    diagnosticRegistry[slug]().then((mod) => {
      setData(processDiagnosticContent(mod.default));
    });
  }, [slug]);

  if (notFound) return <NotFound />;
  if (!data) return null;

  return (
    <DiagnosticProvider data={data}>
      <DiagnosticPitchContent />
    </DiagnosticProvider>
  );
};

export default DiagnosticPitchPage;
