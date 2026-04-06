import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dealRegistry from "@/data/deals";
import { processDealContent, type DealData } from "@/data/discoveryData";
import { DealProvider } from "@/context/DealContext";
import DiscoveryHeader from "@/components/discovery/DiscoveryHeader";
import ExecutiveSummarySection from "@/components/discovery/ExecutiveSummarySection";
import FindingsSection from "@/components/discovery/FindingsSection";
import ConsolidatedAnalysisSection from "@/components/discovery/ConsolidatedAnalysisSection";
import DataBackupSection from "@/components/discovery/DataBackupSection";
import OpportunitiesSection from "@/components/discovery/OpportunitiesSection";
import BenefitsDashboardSection from "@/components/discovery/BenefitsDashboardSection";
import AdditionalValueSection from "@/components/discovery/AdditionalValueSection";
import ValidationSection from "@/components/discovery/ValidationSection";
import UvicuoSection from "@/components/discovery/UvicuoSection";
import NextStepsSection from "@/components/discovery/NextStepsSection";
import TrustedBySection from "@/components/discovery/TrustedBySection";
import ScrollProgress from "@/components/discovery/ScrollProgress";
import NotFound from "./NotFound";

const DealPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [deal, setDeal] = useState<DealData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug || !dealRegistry[slug]) {
      setNotFound(true);
      return;
    }
    dealRegistry[slug]().then((mod) => {
      setDeal(processDealContent(mod.default));
    });
  }, [slug]);

  if (notFound) return <NotFound />;
  if (!deal) return null;

  return (
    <DealProvider data={deal}>
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        {/* 1. Hero */}
        <DiscoveryHeader />
        {/* 2. Resumen ejecutivo */}
        <ExecutiveSummarySection />
        {/* 3. Hallazgos */}
        <FindingsSection />
        {/* 4. Análisis consolidado — Efectivo */}
        <ConsolidatedAnalysisSection />
        {/* 5. Datos de respaldo */}
        <DataBackupSection />
        {/* 6. Oportunidades (Combustible + Peajes) */}
        <OpportunitiesSection />
        {/* 7. Impacto estimado (donut + savings + total) + 8. Valor adicional + 9. Beneficios adicionales */}
        <BenefitsDashboardSection />
        <AdditionalValueSection />
        {/* 10. Siguiente paso */}
        <ValidationSection />
        {/* 11-12. Interacciones + Plan */}
        <UvicuoSection />
        <NextStepsSection />
        {/* 13. Logos + footer */}
        <TrustedBySection clients={deal.trustedClients} />

        <footer className="section-dark border-t border-border py-10">
          <div className="container mx-auto flex items-center justify-center gap-3 px-6">
            <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-5 opacity-60" />
            <span className="inline-block h-1 w-1 rounded-full bg-primary/50" />
            <span className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Uvicuo · Confidencial
            </span>
          </div>
        </footer>
      </div>
    </DealProvider>
  );
};

export default DealPage;
