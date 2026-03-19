import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Layers,
  Clock,
  Receipt,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowDown,
  Shield,
  TrendingUp,
  Users,
  CalendarCheck,
  Mail,
  Phone,
  ChevronDown,
  Fuel,
  Building2,
  ListChecks,
} from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollProgress from "@/components/discovery/ScrollProgress";
import heroVideo from "@/assets/hero-loop.mp4";
import { useEffect, useState } from "react";

/* ─── Static data for this deep dive ─── */

const findings = [
  {
    icon: Fuel,
    title: "Separación manual de gasolina y diésel",
    description:
      "El proveedor actual factura todo en una sola línea. El equipo contable tiene que separar manualmente qué corresponde a gasolina y qué a diésel para asignar cuentas contables distintas en SAP. Esto consume tiempo cada semana y es propenso a errores.",
    impact: "alto" as const,
  },
  {
    icon: Layers,
    title: "Bitácora manual para asignar centros de costo",
    description:
      "Movilidad y Transporte mantiene una bitácora para cruzar cada tarjeta con el empleado, su departamento y centro de costo. Cuando alguien cambia de departamento o hay un error, Contabilidad tiene que devolver la información para corrección — retrabajo que retrasa el cierre.",
    impact: "alto" as const,
  },
  {
    icon: Clock,
    title: "Cierre contable atrasado",
    description:
      "El proveedor corta los lunes. Movilidad tarda 2-3 días en armar la relación tarjeta-empleado-departamento. Contabilidad recibe la info a mitad de semana. Si hay errores, el ir y venir puede empujar el cierre contable varios días. En cierre de mes, esto se vuelve crítico.",
    impact: "alto" as const,
  },
  {
    icon: Receipt,
    title: "Reembolsos manuales para gastos fuera de combustible",
    description:
      "Para casetas, alimentos, hospedaje y otros gastos, los empleados tienen que entrar a un portal, escanear facturas y subirlas una por una. El proceso es lento, se les olvida, y depende de que cada persona lo haga correctamente.",
    impact: "medio" as const,
  },
];

const comparisonRows = [
  {
    concept: "Tipo de combustible",
    before: "Separación manual gasolina vs diésel",
    after: "Clasificación automática desde la factura de cada carga",
  },
  {
    concept: "Centro de costo",
    before: "Bitácora manual, errores frecuentes",
    after: "Configurado una vez por empleado. Asignación automática a cada gasto",
  },
  {
    concept: "Póliza contable",
    before: "Armada manualmente cada semana para SAP",
    after: "Generada automáticamente en tiempo real: cuenta contable, centro de costo, departamento, IVA, IEPS, tasa — todo desglosado",
  },
  {
    concept: "Facturación",
    before: "1 factura global semanal sin detalle por empleado",
    after: "Factura individual por gasto, recuperada automáticamente. Cada una ya clasificada y asignada",
  },
  {
    concept: "Cierre contable",
    before: "3-5 días de proceso entre Movilidad y Contabilidad",
    after: "La póliza está lista cuando llegas al corte. Cero retrabajo",
  },
  {
    concept: "Comprobación de gastos",
    before: "Portal de reembolsos + escaneo manual de facturas",
    after: "WhatsApp: el empleado sube foto del ticket, Uvicuo recupera la factura automáticamente",
  },
  {
    concept: "Deducibilidad",
    before: "Depende de que cada empleado pida y suba su factura",
    after: "Uvicuo recupera facturas automáticamente. 100% facturado = 100% deducible",
  },
];

const polizaFields = [
  "Centro de costo + código",
  "Departamento + código",
  "Categoría de gasto (gasolina, diésel, caseta, alimentos, etc.)",
  "Código de categoría para SAP",
  "Tipo de línea: gasto base / IVA acreditable / IEPS / no deducible",
  "Tasa de IVA",
  "Monto base, IVA, IEPS desglosado",
  "UUID de la factura",
  "RFC del emisor",
  "Fecha de factura",
  "Litros cargados y tipo de combustible",
  "Precio por litro",
];

const caseStudyMetrics = [
  { value: "80%+", label: "Reducción en horas de conciliación" },
  { value: "Mismo día", label: "Cierre contable al corte" },
  { value: "98%", label: "Gastos facturados automáticamente" },
  { value: "0", label: "Errores de centro de costo" },
];

const noChangeItems = [
  "Siguen usando SAP como siempre",
  "El flujo de aprobaciones sigue igual",
  "Los centros de costo, departamentos y cuentas contables son los mismos",
];

const contactInfo = {
  name: "Iker Haro Escandon",
  role: "CEO Fundador",
  email: "iker@uvicuo.com",
  phone: "+52 55 1700 1612",
  ctaText: "Agendar prueba",
  ctaSubject: "Diagnóstico Contable Uvicuo x Bodesa — Tarjeta de prueba",
};

const impactBorderColors = {
  alto: "border-l-destructive",
  medio: "border-l-amber-500",
  bajo: "border-l-primary",
};

const impactBgColors = {
  alto: "bg-destructive/10",
  medio: "bg-amber-500/10",
  bajo: "bg-primary/10",
};

const impactTextColors = {
  alto: "text-destructive",
  medio: "text-amber-600",
  bajo: "text-primary",
};

/* ─── Component ─── */

const AccountingDeepDivePage = () => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setShowHint(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />

      {/* ═══ HERO ═══ */}
      <section className="section-dark relative overflow-hidden min-h-[85vh] flex flex-col justify-center">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-30">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--uvicuo-dark))]/60 via-[hsl(var(--uvicuo-dark))]/80 to-[hsl(var(--uvicuo-dark))]" />
        </div>

        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--uvicuo-green) / 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <div className="relative z-10 py-20 md:py-28">
          <div className="container mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <motion.div variants={itemVariants} className="mb-6">
                <Link to="/bodesa" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al diagnóstico general
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <a href="https://uvicuo.com" target="_blank" rel="noopener noreferrer">
                  <img src="/uvicuo-wordmark.png" alt="Uvicuo" className="mx-auto h-7 opacity-50 transition-opacity hover:opacity-90" />
                </a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20 font-medium px-3 py-1 text-xs">
                  Deep Dive Contable · Marzo 2026
                </Badge>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight md:text-6xl text-white drop-shadow-lg">
                De <span className="text-gradient-green">5 días de cierre</span> a cero retrabajo
              </motion.h1>

              <motion.p variants={itemVariants} className="mt-5 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "hsl(var(--uvicuo-dark-muted))" }}>
                Análisis detallado del flujo contable de Bodesa tras sesiones con los equipos de Movilidad y Transporte (13 mar) y Contabilidad (18 mar).
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

      {/* ═══ HALLAZGOS CONTABLES ═══ */}
      <section className="py-16 md:py-20 overflow-hidden bg-background">
        <div className="container mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Diagnóstico</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
              Hallazgos <span className="text-primary">Contables</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
              Puntos de fricción identificados en el flujo contable de gastos operativos.
            </motion.p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {findings.map((finding, i) => {
                const Icon = finding.icon;
                const borderColor = impactBorderColors[finding.impact];
                const bgColor = impactBgColors[finding.impact];
                const textColor = impactTextColors[finding.impact];
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`group relative rounded-xl border border-border bg-card border-l-4 ${borderColor} p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColor} ${textColor} ring-1 ring-current/10 shrink-0`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground">{finding.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{finding.description}</p>
                      </div>
                      <span className="text-3xl font-black font-mono text-muted-foreground/10 shrink-0 leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ TABLA COMPARATIVA ═══ */}
      <section className="py-16 md:py-20 overflow-hidden bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
              Hoy <span className="text-muted-foreground/50">vs</span> Con <span className="text-primary">Uvicuo</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
              Comparativa punto por punto del flujo contable.
            </motion.p>

            {/* Desktop table */}
            <motion.div variants={itemVariants} className="mt-10 hidden md:block rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-5 py-4 text-left font-semibold text-foreground w-[180px]">Concepto</th>
                    <th className="px-5 py-4 text-left font-semibold text-destructive/80 bg-destructive/[0.04]">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="h-3.5 w-3.5" />
                        Hoy
                      </div>
                    </th>
                    <th className="px-5 py-4 text-left font-semibold text-primary bg-primary/[0.04]">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Con Uvicuo
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0 transition-colors hover:bg-muted/20">
                      <td className="px-5 py-4 font-medium text-foreground">{row.concept}</td>
                      <td className="px-5 py-4 text-muted-foreground bg-destructive/[0.02]">{row.before}</td>
                      <td className="px-5 py-4 text-foreground bg-primary/[0.02]">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Mobile cards */}
            <div className="mt-10 md:hidden space-y-4">
              {comparisonRows.map((row, i) => (
                <motion.div key={i} variants={itemVariants} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">{row.concept}</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="px-4 py-3 bg-destructive/[0.04]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <XCircle className="h-3 w-3 text-destructive" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-destructive">Hoy</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{row.before}</p>
                    </div>
                    <div className="flex justify-center py-1.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
                        <ArrowDown className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-primary/[0.04]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">Con Uvicuo</span>
                      </div>
                      <p className="text-sm text-foreground">{row.after}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ VOLUMEN DE FACTURAS (callout) ═══ */}
      <section className="py-12 md:py-16 overflow-hidden bg-background border-t border-border">
        <div className="container mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="rounded-xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20 shrink-0">
                  <ListChecks className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Sobre el volumen de facturas</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Con el proveedor actual, Contabilidad recibe <strong className="text-foreground">1 factura global semanal</strong>. Con Uvicuo, va a recibir una factura por cada carga de combustible, cada caseta, cada gasto.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground font-medium">
                    La diferencia: cada una de esas facturas ya viene procesada, validada contra el SAT, clasificada por tipo de combustible, asignada al centro de costo correcto, y reflejada en la póliza contable lista para SAP.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary font-semibold italic">
                    Hoy reciben 1 factura y tardan días en procesarla. Con Uvicuo reciben muchas facturas y no procesan ninguna.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ IEPS ═══ */}
      <section className="py-12 md:py-16 overflow-hidden bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground ring-1 ring-accent-foreground/10 shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Estímulo fiscal del IEPS</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Los proveedores de red cerrada gozan de la adenda fiscal que les permite facturar con el desglose de IEPS. Uvicuo también entrega el desglose completo del IEPS por carga, directo de la factura de cada gasolinera.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground font-medium">
                    La diferencia: con Uvicuo no hay dependencia de un solo proveedor de red cerrada. Cargas en cualquier gasolinera del país, y el desglose fiscal llega automáticamente.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ PÓLIZA CONTABLE ═══ */}
      <section className="py-16 md:py-20 overflow-hidden bg-background border-t border-border">
        <div className="container mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Export contable</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
              La póliza contable de <span className="text-primary">Uvicuo</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
              Así se ve el export contable que genera Uvicuo, listo para cargar a SAP.
            </motion.p>

            {/* Placeholder for screenshot */}
            <motion.div variants={itemVariants} className="mt-8 rounded-xl border-2 border-dashed border-primary/20 bg-primary/[0.02] p-8 md:p-12 text-center">
              <FileText className="h-12 w-12 text-primary/30 mx-auto mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                Vista previa de la póliza contable
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Screenshot / archivo descargable — próximamente
              </p>
            </motion.div>

            {/* Fields list */}
            <motion.div variants={itemVariants} className="mt-6 rounded-xl border border-border bg-card p-5 md:p-6">
              <h4 className="text-sm font-bold text-foreground mb-3">Campos incluidos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {polizaFields.map((field, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{field}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground/70 italic">
                Se configura una sola vez con el equipo contable. Después, cada gasto se clasifica y desglosa automáticamente.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ CASO DE ÉXITO ═══ */}
      <section className="py-16 md:py-20 overflow-hidden section-dark border-t border-border">
        <div className="container mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Caso de éxito</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl">
              Distribuidora nacional con <span className="text-primary">SAP</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
              +400 unidades, operación en 6 estados, SAP como ERP.
            </motion.p>

            {/* Metrics */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {caseStudyMetrics.map((metric, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
                >
                  <span className="block text-2xl md:text-3xl font-black text-primary">{metric.value}</span>
                  <span className="block mt-1 text-xs text-muted-foreground leading-tight">{metric.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Before/After */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <XCircle className="h-3.5 w-3.5 text-destructive" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-destructive">Antes de Uvicuo</span>
                </div>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive/60 mt-1 shrink-0">•</span>
                    Cierre contable de combustible tardaba 4-5 días hábiles después del corte
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive/60 mt-1 shrink-0">•</span>
                    2 personas dedicadas a conciliar facturas, cruzar bitácoras y armar pólizas manualmente
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive/60 mt-1 shrink-0">•</span>
                    ~15% de gastos sin factura recuperada (no deducibles)
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive/60 mt-1 shrink-0">•</span>
                    Errores frecuentes en asignación de centros de costo
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="rounded-xl border border-primary/20 bg-card p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">Después de Uvicuo</span>
                </div>
                <ul className="space-y-2">
                  <li className="text-sm text-white/90 flex items-start gap-2">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    Cierre contable el mismo día del corte — la póliza ya está lista
                  </li>
                  <li className="text-sm text-white/90 flex items-start gap-2">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    Las 2 personas se dedican a análisis, no a captura
                  </li>
                  <li className="text-sm text-white/90 flex items-start gap-2">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    98% de gastos facturados automáticamente
                  </li>
                  <li className="text-sm text-white/90 flex items-start gap-2">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    Cero errores de centro de costo
                  </li>
                </ul>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ LO QUE NO CAMBIA ═══ */}
      <section className="py-12 md:py-16 overflow-hidden bg-background border-t border-border">
        <div className="container mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <motion.h2 variants={itemVariants} className="text-xl font-bold tracking-tight md:text-2xl text-foreground">
              Lo que <span className="text-muted-foreground/50">no</span> cambia
            </motion.h2>

            <div className="mt-6 space-y-3">
              {noChangeItems.map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.p variants={itemVariants} className="mt-6 text-sm font-medium text-foreground">
              Lo que sí cambia: <span className="text-primary">quién hace el trabajo</span>. Ya no es manual. Es Uvicuo.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ CTA / SIGUIENTE PASO ═══ */}
      <section className="py-16 md:py-20 overflow-hidden bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
              <CalendarCheck className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Siguiente paso</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
              Verlo funcionando con <span className="text-primary">datos propios</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
              Vamos a preparar una tarjeta de prueba para que el equipo haga gastos reales y vea cómo se refleja todo: el gasto en tiempo real, la factura recuperada, la póliza contable lista para SAP.
            </motion.p>
            <motion.p variants={itemVariants} className="mt-2 text-sm text-muted-foreground/70 italic">
              Sin compromisos. Solo para verlo funcionando con datos propios.
            </motion.p>

            {/* Contact CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-10 rounded-xl border border-primary/20 bg-card p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{contactInfo.name}</p>
                <p className="text-xs text-muted-foreground">{contactInfo.role}</p>
                <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>{contactInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>{contactInfo.phone}</span>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="gap-2 shrink-0">
                <a href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(contactInfo.ctaSubject)}`}>
                  <CalendarCheck className="h-4 w-4" />
                  {contactInfo.ctaText}
                </a>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-background">
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

export default AccountingDeepDivePage;
