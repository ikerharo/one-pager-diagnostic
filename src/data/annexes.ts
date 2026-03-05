export type AnnexGroup = {
  id: string;
  label: string;
  description: string;
  icon: string; // lucide icon name
};

export const annexGroups: AnnexGroup[] = [
  {
    id: "inversion",
    label: "Inversión Inicial",
    description: "Costos de entrada, beneficios y periodo de prueba",
    icon: "DollarSign",
  },
  {
    id: "comercial",
    label: "Condiciones Comerciales",
    description: "Precios por usuario, línea de crédito y programa de cashback",
    icon: "FileText",
  },
  {
    id: "servicio",
    label: "Soporte y Servicio",
    description: "Niveles de servicio, infraestructura y seguridad",
    icon: "Headphones",
  },
];

export const annexSections = [
  {
    id: "beneficios",
    group: "inversion",
    title: "Beneficios Clave para el Cliente",
    content: [
      {
        subtitle: "Barrera de entrada baja",
        text: "El Setup Fee se divide en dos pagos (75% al kickoff, 25% al finalizar la implementación), y se reembolsa como crédito en la plataforma durante los primeros 12 meses de operación.",
      },
      {
        subtitle: "Costos predecibles",
        text: "Precio fijo por usuario activo al mes, sin cargos ocultos ni comisiones por transacción. Sabes exactamente cuánto pagarás cada mes.",
      },
      {
        subtitle: "Liquidez inmediata",
        text: "Línea de crédito pre-aprobada por usuario desde el día 1. No necesitas desembolsar capital propio para gastos operativos.",
      },
      {
        subtitle: "Incentivos por buen comportamiento",
        text: "El programa de Puntos Uvicuo (cashback) recompensa el pago puntual con tasas de hasta +0.30% sobre el monto gastado.",
      },
    ],
  },
  {
    id: "precios",
    group: "inversion",
    title: "Cómo Funcionan Nuestros Precios",
    content: [
      {
        subtitle: "Setup Fee",
        text: "Pago único de implementación dividido en dos partes: 75% al inicio del proyecto (kickoff) y 25% al completar la implementación. Este monto se reembolsa como crédito en la plataforma durante los primeros 12 meses.",
      },
      {
        subtitle: "Precio por usuario",
        text: "Tarifa mensual fija por usuario activo que varía según el volumen de usuarios contratados. A mayor volumen, menor precio unitario.",
      },
      {
        subtitle: "Línea de financiamiento",
        text: "Crédito pre-aprobado por usuario que se activa desde el primer día. El monto depende del tier contratado y está sujeto a aprobación crediticia.",
      },
    ],
  },
  {
    id: "prueba",
    group: "inversion",
    title: "Periodo de Prueba",
    content: [
      {
        subtitle: "2 meses sin costo de suscripción",
        text: "Durante el periodo de prueba no se cobra la tarifa por usuario. Solo aplica el Setup Fee ya acordado.",
      },
      {
        subtitle: "¿Qué incluye?",
        list: [
          "Tarjetas virtuales ilimitadas",
          "Tarjetas físicas Mastercard para todo el equipo",
          "Onboarding Manager dedicado",
          "Capacitación para el equipo",
          "Acceso completo al dashboard y reportes",
          "Soporte prioritario durante la implementación vía WhatsApp",
        ],
      },
    ],
  },
  {
    id: "precio-usuario",
    group: "comercial",
    title: "Precio por Usuario",
    table: {
      headers: ["Usuarios activos (fin de prueba)", "Precio/Usuario/Mes"],
      rows: [
        ["20 – 49", "$18 USD"],
        ["50 – 99", "$16 USD"],
        ["100 – 199", "$14 USD"],
        ["200 – 499", "$13 USD"],
        ["500 – 999", "$11 USD"],
        ["1,000+", "$10 USD"],
      ],
    },
    notes: [
      "El tier se fija por 12 meses a partir del inicio de operación.",
      "Si el número de usuarios crece y cambia de tier, se aplica el nuevo precio a partir del siguiente ciclo anual.",
      "Un \"usuario activo\" es cualquier usuario dado de alta en la plataforma, similar a un asiento de SaaS.",
    ],
  },
  {
    id: "credito",
    group: "comercial",
    title: "Línea de Crédito",
    table: {
      headers: ["Tier", "Crédito/Usuario"],
      rows: [
        ["Tier 1", "$50 USD"],
        ["Tier 2", "$75 USD"],
        ["Tier 3", "$100 USD"],
        ["Tier 4", "$150 USD"],
        ["Tier 5", "$175 USD"],
      ],
    },
    example: "Ejemplo: Una empresa con 140 usuarios en Tier 2 tendría una línea de crédito total de 140 × $75 = $10,500 USD disponibles.",
    notes: [
      "Sujeto a aprobación crediticia.",
      "La línea se puede incrementar con historial de buen comportamiento de pago.",
    ],
  },
  {
    id: "cashback",
    group: "comercial",
    title: "Cashback — Puntos Uvicuo",
    table: {
      headers: ["Días de Pago", "Tasa"],
      rows: [
        ["0 días (mismo día)", "+0.30%"],
        ["1 – 3 días", "+0.20%"],
        ["4 – 7 días", "+0.10%"],
        ["8 – 10 días", "0.00%"],
        ["11 – 15 días", "-0.10%"],
        ["16 – 20 días", "-0.18%"],
        ["21 – 30 días", "-0.27%"],
      ],
    },
    example: "Ejemplo: Si tu gasto mensual es de $100,000 MXN y pagas el mismo día, recibes $300 MXN en Puntos Uvicuo que puedes usar como crédito en la plataforma.",
    notes: [
      "Los puntos se acumulan mensualmente y se aplican como crédito en la siguiente factura.",
      "Las tasas negativas representan un cargo adicional por pago tardío.",
      "Los puntos no son canjeables por dinero en efectivo.",
    ],
  },
  {
    id: "soporte",
    group: "servicio",
    title: "Soporte y Niveles de Servicio",
    content: [
      {
        subtitle: "Equipo dedicado",
        text: "Cada cliente cuenta con un Account Manager dedicado y acceso a un equipo de soporte técnico especializado.",
      },
      {
        subtitle: "Canales de soporte",
        list: [
          "WhatsApp: Lunes a Viernes, 8:00 AM – 8:00 PM",
          "Email: 24/7 con respuesta en menos de 4 horas hábiles",
          "Account Manager: Contacto directo para temas estratégicos",
        ],
      },
      {
        subtitle: "SLAs",
        list: [
          "Uptime garantizado: 99.5%",
          "Tiempo de respuesta inicial: < 4 horas hábiles",
          "Resolución de incidentes críticos: < 24 horas",
        ],
      },
    ],
  },
  {
    id: "infraestructura",
    group: "servicio",
    title: "Infraestructura y Seguridad",
    content: [
      {
        subtitle: "Tecnología",
        list: [
          "Infraestructura en AWS con redundancia multi-región",
          "Procesamiento de pagos vía Mastercard",
          "Notificaciones en tiempo real por WhatsApp",
          "API RESTful para integraciones personalizadas",
        ],
      },
      {
        subtitle: "Seguridad",
        list: [
          "Cifrado end-to-end en todas las comunicaciones",
          "Certificación PCI DSS",
          "Autenticación multifactor (MFA)",
          "Auditorías de seguridad periódicas",
          "Datos alojados en territorio con respaldo global",
        ],
      },
    ],
  },
];

export const faqs = [
  {
    question: "¿Qué pasa si no completo el segundo pago del Setup Fee?",
    answer: "El segundo pago (25%) se programa al finalizar la implementación. Si no se completa, el acceso a la plataforma se pausa hasta regularizar el pago. El primer pago no es reembolsable.",
  },
  {
    question: "¿Puedo cambiar mi tier a mitad del año?",
    answer: "El tier se fija por 12 meses. Si durante ese periodo creces en usuarios y cambias de tier, el nuevo precio se aplica a partir del siguiente ciclo anual. No es posible bajar de tier durante el periodo vigente, sólo bajo solicitud.",
  },
  {
    question: "¿Cómo funcionan los Puntos Uvicuo?",
    answer: "Los Puntos Uvicuo son un programa de cashback que recompensa el pago puntual. Mientras más rápido pagues, mayor es tu tasa de recompensa (hasta +0.30%). Los puntos se acumulan mensualmente y se aplican como crédito en tu siguiente factura. No aplican para retiros de efectivo.",
  },
  {
    question: "¿El reembolso del Setup Fee es devolución de dinero?",
    answer: "No. El reembolso del Setup Fee se otorga como crédito dentro de la plataforma Uvicuo, distribuido durante los primeros 12 meses de operación. No es una devolución en efectivo.",
  },
  {
    question: '¿Qué se considera un "usuario activo"?',
    answer: "Un usuario activo es cualquier usuario dado de alta en la plataforma, similar a un asiento de SaaS. No es necesario que tenga tarjetas asignadas ni transacciones realizadas.",
  },
  {
    question: "¿Puedo negociar una línea de crédito mayor?",
    answer: "Sí. La línea de crédito inicial se basa en el tier contratado, pero puede incrementarse con un historial positivo de pago y uso responsable. Tu Account Manager puede gestionar una revisión de línea en cualquier momento.",
  },
];
