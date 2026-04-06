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
  ctaLabel?: string;
  ctaLink?: string;
}

export interface FindingTableData {
  headers: string[];
  rows: string[][];
  highlightRows?: number[];
  tableFooter?: string;
}

export interface Finding {
  icon: LucideIcon;
  title: string;
  description: string;
  impact: "alto" | "medio" | "bajo";
  quote: string | null;
  quoteAuthor: string | null;
  tableData?: FindingTableData;
}

export interface OpportunityStat {
  value: string;
  label: string;
}

export interface Opportunity {
  title: string;
  description: string;
  stats: OpportunityStat[];
  quote: string | null;
  quoteAuthor: string | null;
  status: string;
  detailLink?: string;
}

export interface DataBackupLink {
  label: string;
  url: string;
  icon: string;
}

export interface DataBackup {
  title: string;
  subtitle: string;
  links: DataBackupLink[];
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
  color?: string;
}

export interface SpendBreakdownItem {
  category: string;
  amount: number;
  color: string;
}

export interface QualitativeBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BenefitsDashboard {
  spendBreakdown?: SpendBreakdownItem[];
  spendTotal?: string;
  savingsCategories: SavingsCategory[];
  qualitativeBenefits: QualitativeBenefit[];
  totalSavings?: string;
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
    ndaUrl?: string;
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
  opportunities: Opportunity[];
  validationQuestions: string[];
  dataBackup: DataBackup | null;
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
      ndaUrl: content.config.ndaUrl,
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
      tableData: f.tableData ? {
        headers: f.tableData.headers,
        rows: f.tableData.rows,
        highlightRows: f.tableData.highlightRows ?? undefined,
        tableFooter: f.tableData.tableFooter ?? undefined,
      } : undefined,
    })),
    financialImpact,
    benefitsDashboard: content.benefitsDashboard
      ? {
          spendBreakdown: content.benefitsDashboard.spendBreakdown ?? undefined,
          spendTotal: content.benefitsDashboard.spendTotal ?? undefined,
          totalSavings: content.benefitsDashboard.totalSavings ?? undefined,
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
    opportunities: (content.opportunities ?? []).map((o: any) => ({
      title: o.title,
      description: o.description,
      stats: o.stats ?? [],
      quote: o.quote ?? null,
      quoteAuthor: o.quoteAuthor ?? null,
      status: o.status ?? "",
      detailLink: o.detailLink ?? undefined,
    })),
    dataBackup: content.dataBackup ?? null,
    validationQuestions: content.validationQuestions ?? [],
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
    consolidatedAnalysis: content.consolidatedAnalysis ?? null,
    additionalValue: content.additionalValue ?? null,
  };
}
