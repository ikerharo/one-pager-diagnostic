import DiscoveryHeader from "@/components/discovery/DiscoveryHeader";
import FindingsSection from "@/components/discovery/FindingsSection";
import QuickWinsSection from "@/components/discovery/QuickWinsSection";
import SolutionSection from "@/components/discovery/SolutionSection";
import NextStepsSection from "@/components/discovery/NextStepsSection";
import TrustedBySection from "@/components/discovery/TrustedBySection";
import ScrollProgress from "@/components/discovery/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />

      <DiscoveryHeader />
      <FindingsSection />
      <QuickWinsSection />
      <SolutionSection />
      <NextStepsSection />

      {/* Non-sticky closing sections */}
      <TrustedBySection />

      <footer className="border-t border-border py-10 bg-background">
        <div className="container mx-auto flex items-center justify-center gap-3 px-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-5 opacity-60" />
          <span className="inline-block h-1 w-1 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Uvicuo · Confidencial
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
