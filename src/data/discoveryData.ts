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
  Route,
  Utensils,
  Wrench,
  Banknote,
  Fuel,
  BarChart3,
  UserCheck,
  ShieldCheck,
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
  Route,
  Utensils,
  Wrench,
  Banknote,
  Fuel,
  BarChart3,
  UserCheck,
  ShieldCheck,
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

export interface ExecutiveSummary {
  thesis: string;
  impactItems: { value: string; label: string }[];
}

export interface PreparedFor {
  label: string;
  recipients: { name: string; role: string }[];
}

export interface FinancialImpactItem {
  concept: string;
  monthlySaving: string;
  detail: string;
}

export interface FinancialImpact {
  headline: string;
  items: FinancialImpactItem[];
  totalMonthly: string;
  totalAnnual: string;
  note?: string;
}

export interface AdditionalCapability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SavingsCategory {
  category: string;
  icon: LucideIcon;
  estimatedSaving: string;
  calculation: string;
}

export interface QualitativeBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BenefitsDashboard {
  savingsCategories: SavingsCategory[];
  qualitativeBenefits: QualitativeBenefit[];
  totalMonthly?: string;
  totalAnnual?: string;
  note?: string;
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
  executiveSummary: ExecutiveSummary | null;
  preparedFor: PreparedFor | null;
  findings: Finding[];
  financialImpact: FinancialImpact | null;
  benefitsDashboard: BenefitsDashboard | null;
  quickWins: { before: string; after: string }[];
  exclusionNote: string | null;
  uvicuoPositioning: UvicuoPositioning | null;
  additionalCapabilities: AdditionalCapability[];
  pastInteractions: PastInteraction[];
  timelineSteps: TimelineStep[];
  closingQuote: string | null;
  closingQuoteAuthor: string | null;
  trustedClients: { name: string; logoUrl: string }[];
}

// --- Process raw JSON into typed DealData ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function processDealContent(content: any): DealData {
  // Map financialImpact from either new format or legacy impactSummary
  let financialImpact: FinancialImpact | null = null;
  if (content.financialImpact) {
    financialImpact = content.financialImpact;
  } else if (content.impactSummary) {
    financialImpact = {
      headline: "Impacto financiero estimado",
      items: content.impactSummary.items.map((i: any) => ({
        concept: i.concept,
        monthlySaving: i.monthly,
        detail: "",
      })),
      totalMonthly: content.impactSummary.totalMonthly,
      totalAnnual: content.impactSummary.totalAnnual,
      note: content.impactSummary.note,
    };
  }

  return {
    discoveryConfig: {
      clientName: content.config.clientName,
      meetingDate: content.config.meetingDate,
      subtitle: content.config.subtitle,
      websiteUrl: content.config.websiteUrl,
    },
    contactInfo: content.contact,
    executiveSummary: content.executiveSummary ?? null,
    preparedFor: content.preparedFor ?? null,
    findings: content.findings.map((f: any) => ({
      icon: iconMap[f.icon] || defaultIcon,
      title: f.title,
      description: f.description,
      impact: f.impact as "alto" | "medio" | "bajo",
      quote: f.quote,
      quoteAuthor: f.quoteAuthor,
    })),
    financialImpact,
    benefitsDashboard: content.benefitsDashboard
      ? {
          savingsCategories: (content.benefitsDashboard.savingsCategories ?? []).map((s: any) => ({
            ...s,
            icon: iconMap[s.icon] || defaultIcon,
          })),
          qualitativeBenefits: (content.benefitsDashboard.qualitativeBenefits ?? []).map((b: any) => ({
            ...b,
            icon: iconMap[b.icon] || defaultIcon,
          })),
          totalMonthly: content.benefitsDashboard.totalMonthly,
          totalAnnual: content.benefitsDashboard.totalAnnual,
          note: content.benefitsDashboard.note,
        }
      : null,
    quickWins: content.quickWins ?? content.beforeAfter ?? [],
    exclusionNote: content.exclusionNote ?? null,
    uvicuoPositioning: content.uvicuoPositioning ?? null,
    additionalCapabilities: (content.additionalCapabilities ?? []).map((c: any) => ({
      icon: iconMap[c.icon] || defaultIcon,
      title: c.title,
      description: c.description,
    })),
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
