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
  Download,
  FileSpreadsheet,
} from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

      {/* ═══ REPORTES UVICUO ═══ */}
      <section className="py-16 md:py-20 overflow-hidden bg-background border-t border-border">
        <div className="container mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Reportes reales</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
              Así se ven los reportes de <span className="text-primary">Uvicuo</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-muted-foreground max-w-2xl">
              Datos reales de febrero 2026. Descarga los CSV y ábrelos en Excel para explorar a detalle.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              <Tabs defaultValue="poliza" className="w-full">
                <TabsList className="w-full max-w-md bg-muted/60">
                  <TabsTrigger value="poliza" className="flex-1 gap-1.5 text-xs sm:text-sm">
                    <FileText className="h-3.5 w-3.5" />
                    Póliza Contable
                  </TabsTrigger>
                  <TabsTrigger value="facturas" className="flex-1 gap-1.5 text-xs sm:text-sm">
                    <Receipt className="h-3.5 w-3.5" />
                    Facturas Validadas
                  </TabsTrigger>
                </TabsList>

                {/* ── Póliza Contable ── */}
                <TabsContent value="poliza" className="mt-6 space-y-4">
                  <div className="rounded-xl border border-border bg-card p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                      <div>
                        <h4 className="text-base font-bold text-foreground">Póliza contable — Febrero 2026</h4>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-xl">
                          Cada gasto ya viene desglosado por <strong className="text-foreground">centro de costo</strong>, <strong className="text-foreground">departamento</strong>, <strong className="text-foreground">tipo de línea</strong> (gasto base, IVA acreditable, IEPS, ISH) y con el <strong className="text-foreground">UUID de la factura</strong>. Listo para cargar a SAP sin tocar nada.
                        </p>
                      </div>
                      <Button asChild variant="outline" size="sm" className="gap-2 shrink-0">
                        <a href="/reports/poliza_contable_feb2026.csv" download>
                          <Download className="h-3.5 w-3.5" />
                          Descargar CSV
                        </a>
                      </Button>
                    </div>

                    {/* Preview table */}
                    <div className="relative rounded-lg border border-border overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] sm:text-xs">
                          <thead>
                            <tr className="bg-muted/50 border-b border-border">
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Fecha</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Categoría</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Descripción</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Tipo Línea</th>
                              <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap">Monto</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Empleado</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Depto</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">CC</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { fecha: "28-02", cat: "Combustible", desc: "SERV ALAMEDA TOLUCA", tipo: "GASTO_BASE", monto: "$1,214.50", emp: "Raul Estrada", depto: "Logistica", cc: "MEX_1" },
                              { fecha: "28-02", cat: "Combustible", desc: "SERV ALAMEDA TOLUCA", tipo: "IVA_ACREDITABLE", monto: "$194.32", emp: "Raul Estrada", depto: "Logistica", cc: "MEX_1" },
                              { fecha: "26-02", cat: "Alimentos", desc: "WM EXPRESS STA FE", tipo: "GASTO_BASE", monto: "$306.03", emp: "Raul Estrada", depto: "Logistica", cc: "MEX_1" },
                              { fecha: "24-02", cat: "Alojamiento", desc: "HAUSUITES SANTA FE", tipo: "GASTO_BASE", monto: "$3,159.31", emp: "Diego Galico", depto: "Dirección", cc: "BAR_1" },
                              { fecha: "24-02", cat: "Alojamiento", desc: "HAUSUITES SANTA FE", tipo: "ISH", monto: "$110.58", emp: "Diego Galico", depto: "Dirección", cc: "BAR_1" },
                              { fecha: "24-02", cat: "Alojamiento", desc: "HAUSUITES SANTA FE", tipo: "IVA_ACREDITABLE", monto: "$505.49", emp: "Diego Galico", depto: "Dirección", cc: "BAR_1" },
                            ].map((row, i) => (
                              <tr key={i} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                                <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.fecha}</td>
                                <td className="px-3 py-2 text-foreground whitespace-nowrap">{row.cat}</td>
                                <td className="px-3 py-2 text-muted-foreground whitespace-nowrap max-w-[160px] truncate">{row.desc}</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${
                                    row.tipo === "GASTO_BASE" ? "bg-primary/10 text-primary ring-primary/20" :
                                    row.tipo === "IVA_ACREDITABLE" ? "bg-blue-500/10 text-blue-600 ring-blue-500/20" :
                                    row.tipo === "ISH" ? "bg-amber-500/10 text-amber-600 ring-amber-500/20" :
                                    "bg-muted text-muted-foreground ring-border"
                                  }`}>
                                    {row.tipo}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-right font-mono text-foreground whitespace-nowrap">{row.monto}</td>
                                <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.emp}</td>
                                <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.depto}</td>
                                <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.cc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Fade overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                    </div>
                    <p className="mt-3 text-[11px] text-muted-foreground/60 text-center">
                      Mostrando 6 de 71 registros · El CSV completo incluye UUID, RFC, tasa de IVA, código de flujo y más
                    </p>
                  </div>

                  {/* Key highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Tipos de línea", value: "Gasto base · IVA · IEPS · ISH", desc: "Cada impuesto en su propia fila" },
                      { label: "Centros de costo", value: "MEX_1 · BAR_1 · LOG-1", desc: "Asignados automáticamente" },
                      { label: "Categorías", value: "Combustible · Alimentos · Hotel", desc: "Con código SAP incluido" },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg border border-border bg-muted/20 p-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{item.label}</span>
                        <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* ── Facturas Validadas ── */}
                <TabsContent value="facturas" className="mt-6 space-y-4">
                  <div className="rounded-xl border border-border bg-card p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                      <div>
                        <h4 className="text-base font-bold text-foreground">Reporte de facturas — Febrero 2026</h4>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-xl">
                          Cada factura validada contra el SAT, con desglose de <strong className="text-foreground">IVA</strong>, <strong className="text-foreground">IEPS</strong>, <strong className="text-foreground">ISH</strong>, y para combustible: <strong className="text-foreground">litros</strong>, <strong className="text-foreground">tipo de gasolina</strong> y <strong className="text-foreground">precio por litro</strong>. Sin intervención manual.
                        </p>
                      </div>
                      <Button asChild variant="outline" size="sm" className="gap-2 shrink-0">
                        <a href="/reports/reporte_facturas_feb2026.csv" download>
                          <Download className="h-3.5 w-3.5" />
                          Descargar CSV
                        </a>
                      </Button>
                    </div>

                    {/* Preview table */}
                    <div className="relative rounded-lg border border-border overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] sm:text-xs">
                          <thead>
                            <tr className="bg-muted/50 border-b border-border">
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Fecha</th>
                              <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap">Total</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Subida por</th>
                              <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap">Base Real</th>
                              <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap">IVA</th>
                              <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap">IEPS</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Litros</th>
                              <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap">Tipo</th>
                              <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap">$/litro</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { fecha: "28/02", total: "$1,450.00", subida: "Raul Estrada", base: "$1,214.50", iva: "$194.32", ieps: "-", litros: "57.11", tipo: "Premium", precio: "$25.39" },
                              { fecha: "25/02", total: "$700.00", subida: "Uvicuo", base: "$587.00", iva: "$93.92", ieps: "-", litros: "26.27", tipo: "Premium", precio: "$26.65" },
                              { fecha: "22/02", total: "$1,360.16", subida: "Uvicuo", base: "$1,140.00", iva: "$182.40", ieps: "-", litros: "52.33", tipo: "Premium", precio: "$25.99" },
                              { fecha: "26/02", total: "$3,775.38", subida: "Diego Galico", base: "$3,159.31", iva: "$505.49", ieps: "-", litros: "-", tipo: "-", precio: "-" },
                              { fecha: "21/02", total: "$289.51", subida: "Uvicuo", base: "$397.70", iva: "$15.87", ieps: "$9.93", litros: "-", tipo: "-", precio: "-" },
                              { fecha: "12/02", total: "$1,988.72", subida: "Uvicuo", base: "$1,663.78", iva: "$266.20", ieps: "-", litros: "81.41", tipo: "Premium", precio: "$24.43" },
                            ].map((row, i) => (
                              <tr key={i} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                                <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.fecha}</td>
                                <td className="px-3 py-2 text-right font-mono font-medium text-foreground whitespace-nowrap">{row.total}</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${
                                    row.subida === "Uvicuo" ? "bg-primary/10 text-primary ring-primary/20" : "bg-muted text-muted-foreground ring-border"
                                  }`}>
                                    {row.subida}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-right font-mono text-muted-foreground whitespace-nowrap">{row.base}</td>
                                <td className="px-3 py-2 text-right font-mono text-muted-foreground whitespace-nowrap">{row.iva}</td>
                                <td className="px-3 py-2 text-right font-mono text-muted-foreground whitespace-nowrap">{row.ieps}</td>
                                <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.litros}</td>
                                <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.tipo}</td>
                                <td className="px-3 py-2 text-right font-mono text-muted-foreground whitespace-nowrap">{row.precio}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                    </div>
                    <p className="mt-3 text-[11px] text-muted-foreground/60 text-center">
                      Mostrando 6 de 33 facturas · El CSV incluye folio fiscal (UUID), RFC emisor, método y forma de pago, uso del CFDI
                    </p>
                  </div>

                  {/* Key highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Recuperación automática", value: "Uvicuo sube el 60%+", desc: "Sin que el empleado haga nada" },
                      { label: "Desglose fiscal completo", value: "IVA · IEPS · ISH · ISR", desc: "Cada impuesto separado por factura" },
                      { label: "Detalle de combustible", value: "Litros · Tipo · Precio/L", desc: "Segregación gasolina vs diésel" },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg border border-border bg-muted/20 p-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{item.label}</span>
                        <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
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
