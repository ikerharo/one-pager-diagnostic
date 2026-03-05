import Navbar from "@/components/proposal/Navbar";
import Footer from "@/components/proposal/Footer";
import { AlertTriangle, Eye, Clock, DollarSign, ArrowRight } from "lucide-react";

const challenges = [
  {
    icon: Eye,
    title: "Falta de Visibilidad",
    details: [
      "Sin reportes en tiempo real del gasto por departamento, proyecto o categoría.",
      "Dependencia de cierres mensuales para conocer el estado financiero.",
      "Imposibilidad de detectar anomalías o desviaciones a tiempo.",
    ],
    quote: '"No sabemos en qué se gasta hasta fin de mes." — [Cargo], [CLIENTE]',
    impact: "Impacto estimado: $[X] MXN/año en decisiones tardías",
  },
  {
    icon: Clock,
    title: "Procesos Manuales",
    details: [
      "Conciliación manual de gastos que consume [X] horas mensuales del equipo financiero.",
      "Recopilación de comprobantes por email, WhatsApp y papel.",
      "Procesos de aprobación informales y sin trazabilidad.",
    ],
    quote: '"El equipo pasa días cuadrando gastos en Excel." — [Cargo], [CLIENTE]',
    impact: "Impacto estimado: [X] FTEs dedicados a tareas manuales",
  },
  {
    icon: AlertTriangle,
    title: "Sin Controles de Gasto",
    details: [
      "Ausencia de políticas automatizadas de gasto por categoría o monto.",
      "Tarjetas corporativas compartidas sin responsabilidad individual.",
      "Sin flujos de aprobación previos al gasto.",
    ],
    quote: '"Cualquiera puede gastar sin aprobación previa." — [Cargo], [CLIENTE]',
    impact: "Impacto estimado: [X]% de gastos fuera de política",
  },
  {
    icon: DollarSign,
    title: "Costos Ocultos",
    details: [
      "Comisiones bancarias no negociadas ni monitoreadas.",
      "Tipo de cambio desfavorable en compras internacionales.",
      "Sin aprovechamiento de descuentos por volumen o pronto pago.",
    ],
    quote: '"No sabíamos cuánto pagábamos en comisiones." — [Cargo], [CLIENTE]',
    impact: "Impacto estimado: $[X] MXN/año en costos evitables",
  },
];

const processSteps = [
  { label: "Solicitud de gasto", status: "manual" },
  { label: "Aprobación", status: "manual" },
  { label: "Ejecución del pago", status: "manual" },
  { label: "Recopilación de comprobantes", status: "manual" },
  { label: "Conciliación", status: "manual" },
  { label: "Reporte", status: "manual" },
];

const ProblemaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Análisis Detallado</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">El Problema</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Diagnóstico completo de los retos en la gestión de gastos corporativos de [CLIENTE].
            </p>
          </div>

          {/* Challenges */}
          <div className="mx-auto mt-16 max-w-3xl space-y-8">
            {challenges.map((challenge, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <challenge.icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">{challenge.title}</h2>
                </div>
                <ul className="mt-4 space-y-2">
                  {challenge.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-4 border-l-2 border-primary/40 pl-4 text-sm italic text-muted-foreground">
                  {challenge.quote}
                </blockquote>
                <p className="mt-3 text-sm font-semibold text-primary">{challenge.impact}</p>
              </div>
            ))}
          </div>

          {/* Process Mapping */}
          <div className="mx-auto mt-20 max-w-3xl">
            <h2 className="font-display text-2xl font-bold">Mapeo de Proceso Actual</h2>
            <p className="mt-2 text-muted-foreground">
              Flujo actual de gestión de gastos — todos los pasos son manuales.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {processSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-center">
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="text-[10px] uppercase tracking-wider text-destructive">Manual</p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProblemaPage;
