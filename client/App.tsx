import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-context";
import Index from "./pages/Index";
import ReportIssue from "./pages/ReportIssue";
import TrackReports from "./pages/TrackReports";
import AdminDashboard from "./pages/AdminDashboard";
import CivicRewards from "./pages/CivicRewards";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Safety from "./pages/Safety";
import Reviews from "./pages/Reviews";
import OfflineNotice from "@/components/OfflineNotice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="civic-connect-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/track" element={<TrackReports />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/rewards" element={<CivicRewards />} />
            <Route path="/community" element={<Community />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
