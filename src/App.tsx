import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import JobRiskAnalyzer from "./pages/JobRiskAnalyzer";
import SkillGapChecker from "./pages/SkillGapChecker";
import AIExposure from "./pages/AIExposure";
import CareerPlanner from "./pages/CareerPlanner";
import DataExport from "./pages/DataExport";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/job-risk" element={<JobRiskAnalyzer />} />
            <Route path="/skill-gap" element={<SkillGapChecker />} />
            <Route path="/ai-exposure" element={<AIExposure />} />
            <Route path="/career-plan" element={<CareerPlanner />} />
            <Route path="/export" element={<DataExport />} />
            <Route path="/premium" element={<Premium />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
