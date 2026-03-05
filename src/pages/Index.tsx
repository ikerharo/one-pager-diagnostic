import DiscoveryHeader from "@/components/discovery/DiscoveryHeader";
import FindingsSection from "@/components/discovery/FindingsSection";
import QuickWinsSection from "@/components/discovery/QuickWinsSection";
import NextStepsSection from "@/components/discovery/NextStepsSection";
import TrustedBySection from "@/components/discovery/TrustedBySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscoveryHeader />
      <FindingsSection />
      <QuickWinsSection />
      <NextStepsSection />
      <TrustedBySection />

      <footer className="border-t border-border py-6">
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

export default Index;
