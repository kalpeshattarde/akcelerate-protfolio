import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, FileText, Package, Newspaper, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { blogPosts } from "@/data/blog";

interface SearchResult {
  title: string;
  description: string;
  path: string;
  type: "page" | "product" | "blog";
}

const PAGES: SearchResult[] = [
  { title: "Home", description: "Main landing page", path: "/", type: "page" },
  { title: "Solutions", description: "All solution areas", path: "/solutions", type: "page" },
  { title: "Services", description: "Implementation & consulting", path: "/services", type: "page" },
  { title: "Industries", description: "Sectors we specialise in", path: "/industries", type: "page" },
  { title: "Pricing", description: "Plans & pricing", path: "/pricing", type: "page" },
  { title: "Products", description: "Mobile & SaaS products", path: "/products", type: "page" },
  { title: "About", description: "Our story & mission", path: "/about", type: "page" },
  { title: "Founder", description: "Meet the founder", path: "/founder", type: "page" },
  { title: "Contact", description: "Get in touch", path: "/contact", type: "page" },
  { title: "Blog", description: "Articles & news", path: "/blog", type: "page" },
  { title: "Case Studies", description: "Real-world results", path: "/case-studies", type: "page" },
  { title: "Completed Projects", description: "Project portfolio", path: "/completed-projects", type: "page" },
  { title: "Insights", description: "Guides & thought leadership", path: "/insights", type: "page" },
  { title: "Resources", description: "Downloads & resources", path: "/resources", type: "page" },
  { title: "Gallery", description: "Visual showcase", path: "/gallery", type: "page" },
  { title: "Careers", description: "Join our team", path: "/careers", type: "page" },
  { title: "Free Audit", description: "Get a free AI readiness audit", path: "/free-audit", type: "page" },
  { title: "Wishlist", description: "Your saved products", path: "/wishlist", type: "page" },
  { title: "Privacy Policy", description: "Privacy information", path: "/privacy", type: "page" },
  { title: "Terms of Service", description: "Terms & conditions", path: "/terms", type: "page" },
];

const allItems: SearchResult[] = [
  ...PAGES,
  ...PRODUCTS.map(p => ({
    title: p.name,
    description: p.shortDesc,
    path: `/products/${p.slug}`,
    type: "product" as const,
  })),
  ...blogPosts.map(b => ({
    title: b.title,
    description: b.description,
    path: `/blog/${b.slug}`,
    type: "blog" as const,
  })),
];

const typeIcon = { page: FileText, product: Package, blog: Newspaper };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems
      .filter(item => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
      .slice(0, 10);
  }, [query]);

  const go = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages, products, blog posts..."
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            onKeyDown={e => { if (e.key === "Enter" && results.length) go(results[0].path); }}
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-mono">ESC</kbd>
        </div>
        <div className="max-h-[360px] overflow-y-auto py-2">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No results found</p>
          ) : (
            results.map(r => {
              const Icon = typeIcon[r.type];
              return (
                <button
                  key={r.path}
                  onClick={() => go(r.path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/60 transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{r.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{r.description}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
