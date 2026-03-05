import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProblemaPage from "./pages/ProblemaPage";
import SolucionPage from "./pages/SolucionPage";
import ImpactoPage from "./pages/ImpactoPage";
import ApendicePage from "./pages/ApendicePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/problema" element={<ProblemaPage />} />
          <Route path="/solucion" element={<SolucionPage />} />
          <Route path="/impacto" element={<ImpactoPage />} />
          <Route path="/apendice" element={<ApendicePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
