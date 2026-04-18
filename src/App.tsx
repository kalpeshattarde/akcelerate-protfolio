import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "@/components/SiteLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageSkeleton from "@/components/PageSkeleton";

import ProtectedRoute from "@/components/ProtectedRoute";


// Lazy-loaded pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Solutions = lazy(() => import("./pages/Solutions"));
const SolutionDetail = lazy(() => import("./pages/SolutionDetail"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CompletedProjects = lazy(() => import("./pages/CompletedProjects"));
const Industries = lazy(() => import("./pages/Industries"));
const Insights = lazy(() => import("./pages/Insights"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Founder = lazy(() => import("./pages/Founder"));
const FreeAudit = lazy(() => import("./pages/FreeAudit"));
const Resources = lazy(() => import("./pages/Resources"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Careers = lazy(() => import("./pages/Careers"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Products = lazy(() => import("./pages/products/Products"));
const ProductDetail = lazy(() => import("./pages/products/ProductDetail"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const MyPurchases = lazy(() => import("./pages/MyPurchases"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Guide = lazy(() => import("./pages/Guide"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <SiteLayout>
              
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/solutions/:slug" element={<SolutionDetail />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/completed-projects" element={<CompletedProjects />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogArticle />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/founder" element={<Founder />} />
                  <Route path="/free-audit" element={<FreeAudit />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/sign-in/*" element={<SignIn />} />
                  <Route path="/sign-up/*" element={<SignUp />} />
                  <Route path="/my-purchases" element={<ProtectedRoute><MyPurchases /></ProtectedRoute>} />
                  <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                  <Route path="/guide" element={<Guide />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </SiteLayout>
            
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
