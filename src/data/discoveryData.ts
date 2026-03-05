import { AlertTriangle, Eye, Calculator, Shield, Clock } from "lucide-react";

export const discoveryConfig = {
  clientName: "[NOMBRE DEL CLIENTE]",
  meetingDate: "[FECHA DE REUNIÓN]",
  presenterName: "Javier Fernández",
  presenterRole: "Account Executive",
  presenterEmail: "javier@uvicuo.com",
  heroVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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

export const nextSteps = {
  description:
    "Como siguiente paso, sugerimos agendar una sesión de deep-dive técnico de 60 minutos donde revisaremos en detalle el flujo actual de gastos, la integración con su ERP y un plan de implementación personalizado.",
  contactEmail: "javier@uvicuo.com",
  contactPhone: "+52 55 1234 5678",
};

export const trustedClients = [
  { name: "Empresa 1", logoUrl: "/logos/client-1.png" },
  { name: "Empresa 2", logoUrl: "/logos/client-2.png" },
  { name: "Empresa 3", logoUrl: "/logos/client-3.png" },
  { name: "Empresa 4", logoUrl: "/logos/client-4.png" },
  { name: "Empresa 5", logoUrl: "/logos/client-5.png" },
  { name: "Empresa 6", logoUrl: "/logos/client-6.png" },
];
