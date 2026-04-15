import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <SEOHead title="Page Not Found" description="The page you're looking for doesn't exist." />
      <section className="min-h-screen flex items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
      <div className="text-center px-4">
        <div className="stat-number text-8xl mb-4">404</div>
        <h1 className="font-poppins font-bold text-3xl mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary"><Home className="w-4 h-4" /> Back to Home</Link>
          <Link to="/solutions" className="btn-secondary"><ArrowLeft className="w-4 h-4" /> View Solutions</Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
