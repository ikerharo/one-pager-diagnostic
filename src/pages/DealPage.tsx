import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dealRegistry from "@/data/deals";
import { processDealContent, type DealData } from "@/data/discoveryData";
import { DealProvider } from "@/context/DealContext";
import DiscoveryHeader from "@/components/discovery/DiscoveryHeader";
import ExecutiveSummarySection from "@/components/discovery/ExecutiveSummarySection";
import FindingsSection from "@/components/discovery/FindingsSection";
import BenefitsDashboardSection from "@/components/discovery/BenefitsDashboardSection";
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
        <DiscoveryHeader />
        <ExecutiveSummarySection />
        <FindingsSection />
        <BenefitsDashboardSection />
        <UvicuoSection />
        <NextStepsSection />
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
