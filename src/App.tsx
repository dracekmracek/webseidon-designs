import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Cookies from "./pages/Cookies";
import { ErrorBoundary } from "react-error-boundary";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { CookieConsentInitializer } from "@/lib/examples/cookie-consent-usage";

// Lazy loading pro NotFound stránku
const LazyNotFound = lazy(() => import("./pages/NotFound"));

// Konfigurace QueryClientu
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minut
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Fallback komponenta pro ErrorBoundary
const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <h2 className="text-2xl font-bold mb-4">Něco se pokazilo</h2>
    <p className="text-red-500 mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Zkusit znovu
    </button>
  </div>
);

// Prázdný a neblokující LoadingFallback (žádné tmavé pozadí)
const LoadingFallback: React.FC = () => null;

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <CookieConsentInitializer />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* Právní stránky */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/cookies" element={<Cookies />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<LazyNotFound />} />
              </Routes>
            </Suspense>
            <CookieConsent />
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
