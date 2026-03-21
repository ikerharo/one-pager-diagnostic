import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Mail,
  Phone,
  CalendarCheck,
  CheckCircle2,
  Users,
  Clock,
  Gift,
  ArrowRight,
  Sparkles,
  Target,
  FileSearch,
  BarChart3,
  GitCompare,
  Lightbulb,
} from "lucide-react";
import diagnosticRegistry from "@/data/diagnostics";
import { processDiagnosticContent, type DiagnosticData } from "@/data/diagnosticData";
import { DiagnosticProvider, useDiagnostic } from "@/context/DiagnosticContext";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollProgress from "@/components/discovery/ScrollProgress";
import TrustedBySection from "@/components/discovery/TrustedBySection";
import NotFound from "./NotFound";
import heroVideo from "@/assets/hero-loop.mp4";

/* ── Hero ─────────────────────────────────────────── */
const DiagnosticHero = () => {
  const { config } = useDiagnostic();
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 80) setShowHint(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section-dark relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-40">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--uvicuo-dark))]/60 via-[hsl(var(--uvicuo-dark))]/80 to-[hsl(var(--uvicuo-dark))]" />
      </div>
      <div
        className="absolute inset-0 z-[1] opacity-20 animate-dot-grid pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green) / 0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="mb-6">
              <a href={config.websiteUrl} target="_blank" rel="noopener noreferrer">
                <img src="/uvicuo-wordmark.png" alt="Uvicuo" className="mx-auto h-7 opacity-50 transition-opacity hover:opacity-90" />
              </a>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20 font-medium px-3 py-1 text-xs">
                <Target className="h-3 w-3 mr-1" />
                Diagnóstico de Eficiencia Operativa
              </Badge>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl font-bold tracking-tight md:text-7xl text-white drop-shadow-lg animate-glow-pulse">
              {config.clientName}
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-5 text-base md:text-lg max-w-xl mx-auto" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
              {config.subtitle}
            </motion.p>
          </AnimatedSection>
        </div>
      </div>
      {showHint && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Desliza</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>
      )}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
};

/* ── Why They Qualify ─────────────────────────────── */
const WhyQualifySection = () => {
  const { whyQualify } = useDiagnostic();
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Exclusivo</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            {whyQualify.headline}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-2xl">
            {whyQualify.description}
          </motion.p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whyQualify.reasons.map((reason, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{reason}</span>
              </motion.div>
            ))}
          </div>

          <motion.blockquote variants={itemVariants} className="mt-8 border-l-4 border-primary/40 pl-5 py-2">
            <p className="text-sm italic text-muted-foreground leading-relaxed">{whyQualify.closingLine}</p>
          </motion.blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── What Is It + Stats ──────────────────────────── */
const WhatIsItSection = () => {
  const { whatIsIt } = useDiagnostic();
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            {whatIsIt.headline}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-2xl">
            {whatIsIt.description}
          </motion.p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {whatIsIt.stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="rounded-xl border border-primary/20 bg-primary/[0.04] p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <span className="text-3xl md:text-4xl font-bold text-primary font-mono">{stat.value}</span>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Tracks (What We Map) ────────────────────────── */
const TracksSection = () => {
  const { tracks } = useDiagnostic();
  return (
    <section className="border-t border-border py-16 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Qué vamos a <span className="text-primary">mapear</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
            Analizamos el flujo completo en 3 tracks especializados.
          </motion.p>

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

/* ── Deliverables ────────────────────────────────── */
const deliverableIcons = [FileSearch, Target, BarChart3, GitCompare, Lightbulb];

const DeliverablesSection = () => {
  const { deliverables } = useDiagnostic();
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Qué van a <span className="text-primary">recibir</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
            5 entregables concretos al finalizar el diagnóstico.
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

/* ── Sessions + Timeline ─────────────────────────── */
const SessionsSection = () => {
  const { sessions, timeline } = useDiagnostic();
  return (
    <section className="border-t border-border py-16 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <CalendarCheck className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Proceso</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Cómo <span className="text-primary">funciona</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
            4 sesiones de escucha — nosotros preguntamos, ustedes nos cuentan cómo opera su negocio.
          </motion.p>

          <div className="mt-8 space-y-3">
            {sessions.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">Sesión {i + 1}</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    <Clock className="h-3 w-3" /> {s.duration}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-foreground">{s.title}</h3>
                <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{s.who}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.covers}</p>
              </motion.div>
            ))}
          </div>

          {/* Mini timeline */}
          <div className="mt-12">
            <motion.h3 variants={itemVariants} className="text-lg font-bold text-foreground mb-6">
              De inicio a entregable: <span className="text-primary">2–3 semanas</span>
            </motion.h3>
            <div className="relative">
              <motion.div
                className="absolute left-[19px] top-0 bottom-0 w-[2px] hidden sm:block"
                style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.2), transparent)" }}
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <div className="space-y-4">
                {timeline.map((t, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex gap-4 sm:gap-6">
                    <div className="hidden sm:flex flex-col items-center pt-1">
                      <div className="relative h-[10px] w-[10px] flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping-slow" />
                        <div className="absolute inset-0 rounded-full bg-primary ring-4 ring-primary/10" />
                      </div>
                    </div>
                    <div className="flex-1 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                      <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">{t.week}</span>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Why Free ────────────────────────────────────── */
const WhyFreeSection = () => {
  const { whyFree } = useDiagnostic();
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <Gift className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Sin costo</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Por qué lo hacemos <span className="text-primary">sin costo</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-2xl whitespace-pre-line">
            {whyFree}
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Uvicuo Capabilities ─────────────────────────── */
const UvicuoCapabilitiesSection = () => {
  const { uvicuoCapabilities } = useDiagnostic();
  return (
    <section className="border-t border-border py-16 md:py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-1">
            <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-6" />
            <motion.span variants={itemVariants} className="text-xs font-semibold uppercase tracking-wider text-primary">
              Sobre Uvicuo
            </motion.span>
          </div>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
            Quién es <span className="text-primary">Uvicuo</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-2xl">
            Fintech especializada en gestión de gastos operativos para flotas. Centralizamos el control de combustible, casetas, viáticos y efectivo — desde la tarjeta hasta la póliza contable.
          </motion.p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {uvicuoCapabilities.map((cap, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{cap}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── CTA Section ─────────────────────────────────── */
const CtaSection = () => {
  const { contact } = useDiagnostic();
  return (
    <section className="section-dark py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-center text-white">
            Siguiente <span className="text-primary">paso</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-3 text-center text-sm max-w-lg mx-auto" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
            El siguiente paso es coordinar la primera sesión de discovery con su equipo.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 rounded-xl border border-[hsl(var(--uvicuo-dark-border))] bg-[hsl(var(--uvicuo-dark-card))] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-white">{contact.name}</p>
              <p className="text-xs" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>{contact.role}</p>
              <div className="mt-3 flex flex-col gap-1.5 text-sm" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span>{contact.phone}</span>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="gap-2 shrink-0">
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.ctaSubject)}`}>
                <CalendarCheck className="h-4 w-4" />
                {contact.ctaText}
              </a>
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ── Page Shell ──────────────────────────────────── */
const DiagnosticPitchContent = () => {
  const { trustedClients } = useDiagnostic();
  return (
  <div className="min-h-screen bg-background">
    <ScrollProgress />
    <DiagnosticHero />
    <WhyQualifySection />
    <WhatIsItSection />
    <TracksSection />
    <DeliverablesSection />
    <SessionsSection />
    <WhyFreeSection />
    <UvicuoCapabilitiesSection />
    <TrustedBySection clients={trustedClients} />
    <CtaSection />
    <footer className="border-t border-border py-10 bg-background">
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
