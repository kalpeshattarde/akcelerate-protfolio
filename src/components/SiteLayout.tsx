import { ReactNode, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageSkeleton from "./PageSkeleton";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [showTop, setShowTop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setShowSkeleton(true);
      setIsTransitioning(true);
      window.scrollTo(0, 0);
      // Show skeleton briefly, then fade in real content
      const skeletonTimer = setTimeout(() => setShowSkeleton(false), 250);
      const fadeTimer = setTimeout(() => setIsTransitioning(false), 300);
      prevPathname.current = pathname;
      return () => {
        clearTimeout(skeletonTimer);
        clearTimeout(fadeTimer);
      };
    }
  }, [pathname]);

  // ... keep existing code

      <main className="flex-1 relative">
        {showSkeleton && (
          <div className="absolute inset-0 z-10">
            <PageSkeleton />
          </div>
        )}
        <div
          className={`transition-all duration-500 ease-out ${
            isTransitioning ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          {children}
        </div>
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
