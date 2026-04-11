import { ReactNode, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [showTop, setShowTop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setIsTransitioning(true);
      window.scrollTo(0, 0);
      // Allow the fade-in to start after a brief moment
      const timer = setTimeout(() => setIsTransitioning(false), 50);
      prevPathname.current = pathname;
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className={`flex-1 transition-all duration-500 ease-out ${
          isTransitioning ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
        }`}
      >
        {children}
      </main>
      <Footer />
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1"
          style={{ background: "var(--gradient-primary)" }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-primary-foreground" />
        </button>
      )}
    </div>
  );
}
