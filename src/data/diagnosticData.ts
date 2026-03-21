import {
  Truck,
  Calculator,
  Gauge,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Truck, Calculator, Gauge };

export interface DiagnosticData {
  config: {
    clientName: string;
    heroQuestion: string;
    subtitle: string;
    websiteUrl: string;
    preparedFor?: {
      label: string;
      recipients: { name: string; role: string }[];
    };
  };
  contact: { name: string; role: string; email: string; phone: string; ctaText: string; ctaSubject: string };
  guarantee: { headline: string; text: string; footnote: string };
  whyQualify: { headline: string; description: string; reasons: string[]; closingLine: string };
  patterns: {
    headline: string;
    description: string;
    items: { stat: string; label: string; detail: string }[];
  };
  outcomeStats: { headline: string; items: { value: string; label: string }[] };
  whatIsIt: { headline: string; description: string; stats: { value: string; label: string }[] };
  tracks: { title: string; subtitle: string; icon: LucideIcon; items: string[] }[];
  deliverables: { number: string; title: string; description: string }[];
  methodology: { phase: string; title: string; who: string; duration: string; covers: string }[];
  timeline: { week: string; description: string }[];
  uvicuoCapabilities: string[];
  trustedClients: { name: string; logoUrl: string }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function processDiagnosticContent(raw: any): DiagnosticData {
  return {
    ...raw,
    tracks: raw.tracks.map((t: any) => ({
      ...t,
      icon: iconMap[t.icon] || Gauge,
    })),
  };
}
