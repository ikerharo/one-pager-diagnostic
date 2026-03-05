import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/proposal/Navbar";
import HeroSection from "@/components/proposal/HeroSection";
import ProblemSection from "@/components/proposal/ProblemSection";
import SolutionSection from "@/components/proposal/SolutionSection";
import ImpactSection from "@/components/proposal/ImpactSection";
import ProposalSection from "@/components/proposal/ProposalSection";
import AcceptanceSection from "@/components/proposal/AcceptanceSection";
import Footer from "@/components/proposal/Footer";

const steps = [
  { id: "inicio", label: "Inicio", component: HeroSection },
  { id: "problema", label: "Problema", component: ProblemSection },
  { id: "solucion", label: "Solución", component: SolutionSection },
  { id: "impacto", label: "Impacto", component: ImpactSection },
  { id: "propuesta", label: "Propuesta", component: ProposalSection },
  
  { id: "aceptacion", label: "Aceptación", component: AcceptanceSection },
];

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const idx = steps.findIndex((s) => s.id === stepParam);
      if (idx !== -1) {
        setDirection(idx > currentStep ? 1 : -1);
        setCurrentStep(idx);
      }
      setSearchParams({}, { replace: true });
    }
  }, [searchParams]);

  const goTo = (index: number) => {
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
  };

  const next = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const CurrentComponent = steps[currentStep].component;
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Progress bar + step indicators */}
      <div className="fixed top-16 left-0 right-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="h-0.5 w-full bg-secondary">
          <motion.div
            className="h-full bg-primary"
            initial={false}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        <div className="container flex items-center justify-center gap-0.5 py-2 md:gap-2">
          {steps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => goTo(i)}
              className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium transition-all md:px-3 ${
                i === currentStep
                  ? "bg-accent text-primary"
                  : i < currentStep
                  ? "text-primary/60 hover:text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === currentStep
                    ? "bg-primary text-primary-foreground"
                    : i < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span className="hidden lg:inline">{step.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 pt-[6.5rem] pb-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>

        {isLast && <Footer />}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="container flex items-center justify-between py-3">
          <Button
            variant="ghost"
            onClick={prev}
            disabled={isFirst}
            className="gap-2 text-muted-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {steps.length}
          </span>

          {isLast ? (
            <Button onClick={() => {
              const el = document.getElementById("aceptacion");
              el?.scrollIntoView({ behavior: "smooth" });
            }} className="gap-2">
              Aceptar Propuesta
            </Button>
          ) : (
            <Button onClick={next} className="gap-2">
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
