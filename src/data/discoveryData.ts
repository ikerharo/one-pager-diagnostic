import { AlertTriangle, Eye, Calculator, Shield, Clock } from "lucide-react";

export const discoveryConfig = {
  clientName: "[NOMBRE DEL CLIENTE]",
  meetingDate: "[FECHA DE REUNIÓN]",
  presenterName: "Javier Fernández",
  presenterRole: "Account Executive",
  presenterEmail: "javier@uvicuo.com",
};

export const findings = [
  {
    icon: Eye,
    title: "Falta de visibilidad en tiempo real",
    description:
      "No existe una vista consolidada del gasto corporativo. Los reportes se generan manualmente cada cierre de mes, lo que retrasa la toma de decisiones.",
  },
  {
    icon: Calculator,
    title: "Procesos manuales de conciliación",
    description:
      "El equipo de finanzas invierte más de 40 horas mensuales en conciliar gastos entre tarjetas, facturas y el ERP.",
  },
  {
    icon: Shield,
    title: "Controles de gasto limitados",
    description:
      "No existen límites dinámicos ni aprobaciones previas al gasto. Los excesos se detectan después del hecho.",
  },
  {
    icon: AlertTriangle,
    title: "Riesgo de fraude y duplicados",
    description:
      "Sin validación automática, se han detectado pagos duplicados y gastos no autorizados que pasan desapercibidos.",
  },
  {
    icon: Clock,
    title: "Tiempos de cierre extendidos",
    description:
      "El cierre contable toma entre 5 y 7 días adicionales debido a la recopilación manual de comprobantes.",
  },
];

export type Severity = "Alta" | "Media" | "Baja";

export interface Concern {
  title: string;
  severity: Severity;
  detail: string;
}

export const concerns: Concern[] = [
  {
    title: "Visibilidad del gasto en tiempo real",
    severity: "Alta",
    detail: "Decisiones de negocio se toman sin datos actualizados de gasto.",
  },
  {
    title: "Conciliación manual excesiva",
    severity: "Alta",
    detail: "Alto costo operativo y riesgo de errores humanos.",
  },
  {
    title: "Ausencia de controles preventivos",
    severity: "Media",
    detail: "Solo se detectan desvíos después de que ocurren.",
  },
  {
    title: "Tiempos de cierre contable",
    severity: "Media",
    detail: "Impacto en reportes financieros y cumplimiento.",
  },
  {
    title: "Gestión de comprobantes físicos",
    severity: "Baja",
    detail: "Riesgo de extravío y dificultad para auditorías.",
  },
];

export const quickWins = [
  {
    before: "Conciliación manual de 40+ horas/mes",
    after: "Conciliación automática en minutos con matching inteligente",
  },
  {
    before: "Reportes de gasto generados al cierre de mes",
    after: "Dashboard en tiempo real con alertas de desvío",
  },
  {
    before: "Aprobaciones por email sin trazabilidad",
    after: "Flujos de aprobación digitales con políticas configurables",
  },
];

export const clientReference = {
  companyName: "[EMPRESA REFERENCIA]",
  industry: "Retail / Servicios Financieros",
  quote:
    "\"Con Uvicuo redujimos el tiempo de conciliación de 5 días a 4 horas y ganamos visibilidad total sobre el gasto corporativo.\"",
  contactName: "[NOMBRE CONTACTO]",
  contactRole: "CFO",
  metric: "40%",
  metricLabel: "reducción en tiempo de conciliación",
};

export const nextSteps = {
  cta: "Agendar deep-dive técnico",
  description:
    "En una sesión de 60 minutos revisaremos en detalle tu flujo actual, integración con tu ERP y un plan de implementación personalizado.",
  contactEmail: "javier@uvicuo.com",
  contactPhone: "+52 55 1234 5678",
};
