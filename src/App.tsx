import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import DealPage from "./pages/DealPage";
import DiagnosticPitchPage from "./pages/DiagnosticPitchPage";
import AccountingDeepDivePage from "./pages/AccountingDeepDivePage";
import RouteExamplePage from "./pages/RouteExamplePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/directorio" element={<Index />} />
          <Route path="/bodesa/contable" element={<AccountingDeepDivePage />} />
          <Route path="/ejemplo/ruta-optimizada" element={<RouteExamplePage />} />
          <Route path="/diagnostico/:slug" element={<DiagnosticPitchPage />} />
          <Route path="/:slug" element={<DealPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
