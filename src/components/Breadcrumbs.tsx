import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ROUTE_LABELS: Record<string, string> = {
  "": "Home",
  "about": "About",
  "founder": "Founder",
  "services": "Services",
  "solutions": "Solutions",
  "products": "Products",
  "pricing": "Pricing",
  "contact": "Contact",
  "blog": "Blog",
  "industries": "Industries",
  "insights": "Insights",
  "case-studies": "Case Studies",
  "completed-projects": "Completed Projects",
  "free-audit": "Free Audit",
  "resources": "Resources",
  "gallery": "Gallery",
  "careers": "Careers",
  "privacy": "Privacy Policy",
  "terms": "Terms of Service",
  "my-purchases": "My Purchases",
  "wishlist": "Wishlist",
  "guide": "Guide",
  "admin": "Admin",
  "sign-in": "Sign In",
  "sign-up": "Sign Up",
};

function toLabel(segment: string): string {
  return ROUTE_LABELS[segment] || segment.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: toLabel(seg),
    path: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-2">
      <motion.ol
        key={pathname}
        className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
      >
        <motion.li
          variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </motion.li>
        <AnimatePresence initial={false}>
          {crumbs.map((c) => (
            <motion.li
              key={c.path}
              className="flex items-center gap-1.5"
              variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronRight className="w-3 h-3" />
              {c.isLast ? (
                <span className="font-medium text-foreground">{c.label}</span>
              ) : (
                <Link to={c.path} className="hover:text-foreground transition-colors">{c.label}</Link>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ol>
    </nav>
  );
}
