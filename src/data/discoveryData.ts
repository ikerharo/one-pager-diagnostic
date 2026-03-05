import { AlertTriangle, Eye, Calculator, Shield, Clock } from "lucide-react";

export const discoveryConfig = {
  clientName: "[NOMBRE DEL CLIENTE]",
  meetingDate: "[FECHA DE REUNIÓN]",
  websiteUrl: "https://uvicuo.com",
};

export const contactInfo = {
  name: "Iker Haro Escandón",
  role: "CEO Fundador",
  email: "iker@uvicuo.com",
  phone: "+52 55 1700 1612",
};

export const findings = [
  {
    icon: Eye,
    title: "Falta de visibilidad en tiempo real",
    description:
      "No existe una vista consolidada del gasto corporativo. Los reportes se generan manualmente cada cierre de mes, lo que retrasa la toma de decisiones.",
    impact: "alto" as const,
  },
  {
    icon: Calculator,
    title: "Procesos manuales de conciliación",
    description:
      "El equipo de finanzas invierte más de 40 horas mensuales en conciliar gastos entre tarjetas, facturas y el ERP.",
    impact: "alto" as const,
  },
  {
    icon: Shield,
    title: "Controles de gasto limitados",
    description:
      "No existen límites dinámicos ni aprobaciones previas al gasto. Los excesos se detectan después del hecho.",
    impact: "medio" as const,
  },
  {
    icon: AlertTriangle,
    title: "Riesgo de fraude y duplicados",
    description:
      "Sin validación automática, se han detectado pagos duplicados y gastos no autorizados que pasan desapercibidos.",
    impact: "alto" as const,
  },
  {
    icon: Clock,
    title: "Tiempos de cierre extendidos",
    description:
      "El cierre contable toma entre 5 y 7 días adicionales debido a la recopilación manual de comprobantes.",
    impact: "medio" as const,
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

export type TimelineOwner = "uvicuo" | "client" | "both";

export interface TimelineStep {
  week: string;
  title: string;
  description: string;
  owner: TimelineOwner;
}

export const timelineSteps: TimelineStep[] = [
  {
    week: "Semana 1",
    title: "Deep-dive técnico",
    description: "Sesión de 60 min para revisar flujo actual de gastos e integración con ERP.",
    owner: "both",
  },
  {
    week: "Semana 2",
    title: "Propuesta personalizada",
    description: "Uvicuo entrega plan de implementación, pricing y cronograma detallado.",
    owner: "uvicuo",
  },
  {
    week: "Semana 3",
    title: "Validación interna",
    description: "El equipo del cliente revisa la propuesta y alinea stakeholders clave.",
    owner: "client",
  },
  {
    week: "Semana 4",
    title: "Kick-off del proyecto",
    description: "Inicio de onboarding, configuración de la plataforma y primeras integraciones.",
    owner: "both",
  },
];

export const nextSteps = {
  description:
    "Como siguiente paso, sugerimos agendar una sesión de deep-dive técnico de 60 minutos donde revisaremos en detalle el flujo actual de gastos, la integración con su ERP y un plan de implementación personalizado.",
};

export const trustedClients = [
  { name: "Paquetexpress", logoUrl: "/logos/paquetexpress.png" },
  { name: "99 Minutos", logoUrl: "/logos/99minutos.png" },
  { name: "Bimbo", logoUrl: "/logos/bimbo.png" },
  { name: "Express Sinaloa 8W", logoUrl: "/logos/express8w.png" },
];
