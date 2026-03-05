import {
  AlertTriangle,
  Eye,
  Calculator,
  Shield,
  Clock,
  DollarSign,
  Users,
  Truck,
  FileText,
  Zap,
  TrendingUp,
  Wallet,
  CreditCard,
  Receipt,
  Camera,
  Gauge,
  Package,
  type LucideIcon,
} from "lucide-react";

// Icon mapping — add more as needed
const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Eye,
  Calculator,
  Shield,
  Clock,
  DollarSign,
  Users,
  Truck,
  FileText,
  Zap,
  TrendingUp,
  Wallet,
  CreditCard,
  Receipt,
  Camera,
  Gauge,
  Package,
};

const defaultIcon = Eye;

// --- Types ---

export type TimelineOwner = "uvicuo" | "client" | "both";

export interface PastInteraction {
  date: string;
  title: string;
  participants: string[];
  topics: string[];
  owner: TimelineOwner;
}

export interface TimelineStep {
  week: string;
  title: string;
  description: string;
  owner: TimelineOwner;
}

export interface Finding {
  icon: LucideIcon;
  title: string;
  description: string;
  impact: "alto" | "medio" | "bajo";
  quote: string | null;
  quoteAuthor: string | null;
}

export interface UvicuoPositioning {
  headline: string;
  description: string;
  capabilities: { title: string; description: string }[];
}

export interface DealData {
  discoveryConfig: {
    clientName: string;
    meetingDate: string;
    subtitle: string;
    websiteUrl: string;
  };
  contactInfo: {
    name: string;
    role: string;
    email: string;
    phone: string;
    ctaText: string;
    ctaSubject: string;
  };
  findings: Finding[];
  quickWins: { before: string; after: string }[];
  exclusionNote: string | null;
  uvicuoPositioning: UvicuoPositioning | null;
  pastInteractions: PastInteraction[];
  timelineSteps: TimelineStep[];
  closingQuote: string | null;
  closingQuoteAuthor: string | null;
  trustedClients: { name: string; logoUrl: string }[];
}

// --- Process raw JSON into typed DealData ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function processDealContent(content: any): DealData {
  return {
    discoveryConfig: {
      clientName: content.config.clientName,
      meetingDate: content.config.meetingDate,
      subtitle: content.config.subtitle,
      websiteUrl: content.config.websiteUrl,
    },
    contactInfo: content.contact,
    findings: content.findings.map((f: any) => ({
      icon: iconMap[f.icon] || defaultIcon,
      title: f.title,
      description: f.description,
      impact: f.impact as "alto" | "medio" | "bajo",
      quote: f.quote,
      quoteAuthor: f.quoteAuthor,
    })),
    quickWins: content.quickWins,
    exclusionNote: content.exclusionNote ?? null,
    uvicuoPositioning: content.uvicuoPositioning ?? null,
    pastInteractions: (content.pastInteractions ?? []).map((i: any) => ({
      ...i,
      owner: i.owner as TimelineOwner,
    })),
    timelineSteps: content.timeline.map((s: any) => ({
      ...s,
      owner: s.owner as TimelineOwner,
    })),
    closingQuote: content.closingQuote ?? null,
    closingQuoteAuthor: content.closingQuoteAuthor ?? null,
    trustedClients: content.trustedClients ?? [],
  };
}
