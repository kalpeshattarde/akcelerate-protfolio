import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Mail, Phone } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Preloader from "./Preloader";
import { trackPageView } from "@/lib/analytics";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Preloader />
      <div className="min-h-screen flex flex-col">
        {/* Scroll progress bar */}
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
        />

        <Navbar />
        <main className="flex-1 relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />

        {/* Floating contact buttons */}
        <div className="fixed right-5 bottom-24 z-40 flex flex-col gap-3">
          <a
            href="mailto:akceleratehq@gmail.com"
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}
            aria-label="Email us"
          >
            <Mail className="w-5 h-5 text-primary-foreground" />
          </a>
          <a
            href="tel:+918208555380"
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #06B6D4, #22D3EE)" }}
            aria-label="Call us"
          >
            <Phone className="w-5 h-5 text-primary-foreground" />
          </a>
          <a
            href="https://wa.me/918208555380"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            aria-label="WhatsApp us"
          >
            <WhatsAppIcon className="w-5 h-5 text-primary-foreground" />
          </a>
        </div>

        {/* Back to top */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ background: "var(--gradient-primary)" }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-primary-foreground" />
          </button>
        )}
      </div>
    </>
  );
}
