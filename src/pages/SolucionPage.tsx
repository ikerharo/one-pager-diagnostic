import Navbar from "@/components/proposal/Navbar";
import Footer from "@/components/proposal/Footer";
import { CreditCard, Shield, BarChart3, Zap, Headphones, Globe } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Tarjetas Corporativas Inteligentes",
    description: "Tarjetas virtuales y físicas con controles granulares por usuario, categoría y monto.",
    details: [
      "Tarjetas virtuales ilimitadas con límites personalizados",
      "Bloqueo/desbloqueo en tiempo real",
      "Políticas de gasto por categoría de comercio",
      "Comprobantes digitales automáticos",
    ],
  },
  {
    icon: BarChart3,
    title: "Dashboard en Tiempo Real",
    description: "Visibilidad completa del gasto corporativo con reportes automáticos y alertas.",
    details: [
      "Dashboard ejecutivo con KPIs de gasto",
      "Reportes por departamento, proyecto y categoría",
      "Alertas de desviación y anomalías",
      "Exportación contable automática",
    ],
  },
  {
    icon: Zap,
    title: "Automatización de Procesos",
    description: "Flujos de aprobación digitales y conciliación automática.",
    details: [
      "Flujos de aprobación multi-nivel configurables",
      "Conciliación automática con el ERP/contabilidad",
      "Captura inteligente de comprobantes",
      "Integración con WhatsApp para solicitudes",
    ],
  },
  {
    icon: Shield,
    title: "Control y Cumplimiento",
    description: "Políticas de gasto automatizadas y auditoría completa.",
    details: [
      "Políticas de gasto configurables por rol",
      "Trazabilidad completa de cada transacción",
      "Prevención de fraude con IA",
      "Cumplimiento fiscal automático (CFDI)",
    ],
  },
  {
    icon: Globe,
    title: "Infraestructura y Seguridad",
    description: "Tecnología de nivel empresarial respaldada por los mejores proveedores.",
    details: [
      "Infraestructura en AWS con redundancia",
      "Procesamiento vía Mastercard",
      "Cifrado de datos end-to-end",
      "Certificación PCI DSS",
    ],
  },
  {
    icon: Headphones,
    title: "Soporte Dedicado",
    description: "Acompañamiento personalizado para una implementación exitosa.",
    details: [
      "Customer Success Manager dedicado",
      "Soporte técnico por chat, email y teléfono",
      "SLA de respuesta: [X] horas",
      "Capacitación continua del equipo",
    ],
  },
];

const SolucionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">En Detalle</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">La Solución</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Funcionalidades y capacidades de la plataforma Uvicuo para [CLIENTE].
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl grid gap-8 md:grid-cols-2">
            {features.map((feature, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                <ul className="mt-4 space-y-2">
                  {feature.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SolucionPage;
