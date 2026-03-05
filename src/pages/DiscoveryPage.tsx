import DiscoveryHeader from "@/components/discovery/DiscoveryHeader";
import FindingsSection from "@/components/discovery/FindingsSection";
import ConcernsSection from "@/components/discovery/ConcernsSection";
import QuickWinsSection from "@/components/discovery/QuickWinsSection";
import ClientReference from "@/components/discovery/ClientReference";
import NextStepsSection from "@/components/discovery/NextStepsSection";

const DiscoveryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscoveryHeader />
      <FindingsSection />
      <ConcernsSection />
      <QuickWinsSection />
      <ClientReference />
      <NextStepsSection />

      {/* Minimal footer */}
      <footer className="section-dark border-t border-border py-6">
        <div className="container mx-auto flex items-center justify-center gap-3 px-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-5 opacity-60" />
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Uvicuo · Confidencial
          </span>
        </div>
      </footer>
    </div>
  );
};

export default DiscoveryPage;
