import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import IndiqueGanhe from "./pages/IndiqueGanhe";
import InternetEmpresarial from "./pages/InternetEmpresarial";
import Termos from "./pages/Termos";
import Octorlink5GPage from "./pages/Octorlink5GPage";
import RastreadorVeicularPage from "./pages/RastreadorVeicularPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/indique-e-ganhe" element={<IndiqueGanhe />} />
            <Route path="/internet-empresarial" element={<InternetEmpresarial />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/octorlink-5g" element={<Octorlink5GPage />} />
            <Route path="/octorlink-tracker" element={<RastreadorVeicularPage />} />
            <Route path="/rastreador-veicular" element={<RastreadorVeicularPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
