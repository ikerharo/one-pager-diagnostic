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
import content from "./content.json";

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

// --- Exported data (consumed by components) ---

export const discoveryConfig = {
  clientName: content.config.clientName,
  meetingDate: content.config.meetingDate,
  subtitle: content.config.subtitle,
  websiteUrl: content.config.websiteUrl,
};

export const contactInfo = content.contact;

export const findings = content.findings.map((f) => ({
  icon: iconMap[f.icon] || defaultIcon,
  title: f.title,
  description: f.description,
  impact: f.impact as "alto" | "medio" | "bajo",
  quote: f.quote,
  quoteAuthor: f.quoteAuthor,
}));

export const quickWins = content.quickWins;

export const exclusionNote = content.exclusionNote;

export const uvicuoPositioning = content.uvicuoPositioning;

export type TimelineOwner = "uvicuo" | "client" | "both";

export interface PastInteraction {
  date: string;
  title: string;
  participants: string[];
  topics: string[];
  owner: TimelineOwner;
}

export const pastInteractions: PastInteraction[] = content.pastInteractions.map((i) => ({
  ...i,
  owner: i.owner as TimelineOwner,
}));

export interface TimelineStep {
  week: string;
  title: string;
  description: string;
  owner: TimelineOwner;
}

export const timelineSteps: TimelineStep[] = content.timeline.map((s) => ({
  ...s,
  owner: s.owner as TimelineOwner,
}));

export const nextSteps = {
  description: "",
};

export const closingQuote = content.closingQuote;
export const closingQuoteAuthor = content.closingQuoteAuthor;

export const trustedClients = content.trustedClients;
