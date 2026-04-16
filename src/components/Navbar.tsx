import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Menu, X, ChevronDown, Moon, Sun, Activity, Layers, Radio, Monitor, BarChart3, LayoutDashboard, Cloud, Settings, Wrench, CheckSquare, Truck, Zap, Users, Factory, FileText, Lightbulb, LogIn, Search, ShoppingBag, Heart, BookOpen } from "lucide-react";
import SearchModal from "./SearchModal";

const solutionLinks = [
  { to: "/solutions/business-automation", title: "Business Automation", desc: "RPA, workflows & sales pipelines", icon: Layers },
  { to: "/solutions/ai-ml", title: "AI / ML Solutions", desc: "ML models, NLP & generative AI", icon: Activity },
  { to: "/solutions/business-consulting", title: "Business Consulting", desc: "AI strategy & digital transformation", icon: Radio },
  { to: "/solutions/saas-dev", title: "Website & SaaS Dev", desc: "Custom apps, MVPs & dashboards", icon: Monitor },
  { to: "/solutions/automated-analytics", title: "Automated Analytics", desc: "Real-time reporting & KPI tracking", icon: BarChart3 },
  { to: "/solutions/data-visualization", title: "Data Visualization", desc: "Power BI, Tableau & BI dashboards", icon: LayoutDashboard },
  { to: "/solutions/cloud-devops", title: "Cloud & DevOps", desc: "AWS, Azure, GCP & CI/CD pipelines", icon: Cloud },
  { to: "/solutions/mlops", title: "MLOps", desc: "Model deployment, monitoring & MLflow", icon: Settings },
];

const serviceLinks = [
  { to: "/services/predictive-maintenance", title: "Predictive Maintenance", desc: "AI-driven equipment health", icon: Wrench },
  { to: "/services/quality-analytics", title: "Quality Analytics", desc: "Defect detection & QC AI", icon: CheckSquare },
  { to: "/services/supply-chain-analytics", title: "Supply Chain Analytics", desc: "End-to-end supply intelligence", icon: Truck },
  { to: "/services/energy-management", title: "Energy Management", desc: "AI-optimised energy usage", icon: Zap },
];

const aboutLinks = [
  { to: "/about", title: "About AKcelerate", desc: "Our story, team & mission", icon: Users },
  { to: "/founder", title: "Founder", desc: "Meet the founder", icon: Users },
  { to: "/industries", title: "Industries", desc: "Sectors we specialise in", icon: Factory },
  { to: "/case-studies", title: "Case Studies", desc: "Real-world results & ROI", icon: FileText },
  { to: "/insights", title: "Insights", desc: "Guides & thought leadership", icon: Lightbulb },
  { to: "/blog", title: "Blog", desc: "Latest articles & news", icon: FileText },
];

function ProfileDropdown() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const profileLinks = [
    { to: "/my-purchases", label: "My Purchases", icon: ShoppingBag },
    { to: "/wishlist", label: "Wishlist", icon: Heart },
    { to: "/guide", label: "Guide", icon: BookOpen },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
      >
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold uppercase">
          {user?.firstName?.[0] || user?.primaryEmailAddress?.emailAddress?.[0] || "U"}
        </div>
        <span className="hidden xl:inline max-w-[100px] truncate">{user?.firstName || "Profile"}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border bg-card shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <p className="text-sm font-semibold text-foreground truncate">{user?.fullName || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="p-2">
            {profileLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <l.icon className="w-4 h-4" /> {l.label}
              </Link>
            ))}
          </div>
          <div className="p-3 border-t border-border">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("ak-theme") || "light");
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("ak-theme", theme);
  }, [theme]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm py-3 scrolled-nav" : "bg-background/80 backdrop-blur-lg py-4 border-b border-border/50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/logo-full-light.svg" alt="AKcelerate" className="h-9 dark:hidden" />
            <img src="/images/logo-full-dark.svg" alt="AKcelerate" className="h-9 hidden dark:block" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === "/" ? "text-primary font-semibold" : "text-muted-foreground"}`}>Home</Link>

            {/* Solutions Dropdown */}
            <div className="nav-dropdown relative group">
              <Link to="/solutions" className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${location.pathname.startsWith("/solutions") ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                Solutions <ChevronDown className="w-3 h-3" />
              </Link>
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 min-w-[340px]">
                <div className="bg-popover border border-border rounded-2xl shadow-lg p-2 space-y-0.5">
                  <Link to="/solutions" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><LayoutDashboard className="w-4 h-4 text-primary" /></div>
                    <div><div className="text-sm font-medium text-foreground">All Solutions</div><div className="text-xs text-muted-foreground">Overview of all 8 areas</div></div>
                  </Link>
                  <div className="border-t border-border my-1" />
                  {solutionLinks.map(s => (
                    <Link key={s.to} to={s.to} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><s.icon className="w-4 h-4 text-primary" /></div>
                      <div><div className="text-sm font-medium text-foreground">{s.title}</div><div className="text-xs text-muted-foreground">{s.desc}</div></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="nav-dropdown relative group">
              <Link to="/services" className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${location.pathname.startsWith("/services") ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                Services <ChevronDown className="w-3 h-3" />
              </Link>
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 min-w-[300px]">
                <div className="bg-popover border border-border rounded-2xl shadow-lg p-2 space-y-0.5">
                  <Link to="/services" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Settings className="w-4 h-4 text-primary" /></div>
                    <div><div className="text-sm font-medium text-foreground">All Services</div><div className="text-xs text-muted-foreground">Implementation & consulting</div></div>
                  </Link>
                  <div className="border-t border-border my-1" />
                  {serviceLinks.map(s => (
                    <Link key={s.to} to={s.to} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><s.icon className="w-4 h-4 text-primary" /></div>
                      <div><div className="text-sm font-medium text-foreground">{s.title}</div><div className="text-xs text-muted-foreground">{s.desc}</div></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* About Dropdown */}
            <div className="nav-dropdown relative group">
              <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${location.pathname === "/about" || location.pathname === "/industries" || location.pathname === "/case-studies" || location.pathname.startsWith("/insights") || location.pathname.startsWith("/blog") ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                About <ChevronDown className="w-3 h-3" />
              </Link>
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 min-w-[300px]">
                <div className="bg-popover border border-border rounded-2xl shadow-lg p-2 space-y-0.5">
                  {aboutLinks.map(s => (
                    <Link key={s.to} to={s.to} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><s.icon className="w-4 h-4 text-primary" /></div>
                      <div><div className="text-sm font-medium text-foreground">{s.title}</div><div className="text-xs text-muted-foreground">{s.desc}</div></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/products" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.startsWith("/products") ? "text-primary font-semibold" : "text-muted-foreground"}`}>Products</Link>
            <Link to="/pricing" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === "/pricing" ? "text-primary font-semibold" : "text-muted-foreground"}`}>Pricing</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === "/contact" ? "text-primary font-semibold" : "text-muted-foreground"}`}>Contact</Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)} className="p-2.5 rounded-xl hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95" aria-label="Search">
              <Search className="w-[17px] h-[17px]" />
            </button>
            <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-[17px] h-[17px] theme-toggle-icon" /> : <Moon className="w-[17px] h-[17px] theme-toggle-icon" />}
            </button>
            <SignedOut>
              <Link to="/sign-in" className="btn-primary text-sm">
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <ProfileDropdown />
            </SignedIn>
          </div>

          <div className="flex items-center lg:hidden">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-muted-foreground hover:text-foreground">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {[
              { to: "/", label: "Home" },
              { to: "/solutions", label: "Solutions" },
              { to: "/services", label: "Services" },
              { to: "/industries", label: "Industries" },
              { to: "/case-studies", label: "Case Studies" },
              { to: "/insights", label: "Insights" },
              { to: "/blog", label: "Blog" },
              { to: "/pricing", label: "Pricing" },
              { to: "/products", label: "Products" },
              { to: "/about", label: "About" },
              { to: "/founder", label: "Founder" },
              { to: "/contact", label: "Contact" },
              { to: "/free-audit", label: "Free Audit" },
              { to: "/resources", label: "Resources" },
              { to: "/gallery", label: "Gallery" },
              { to: "/completed-projects", label: "Completed Projects" },
              { to: "/careers", label: "Careers" },
              { to: "/wishlist", label: "Wishlist" },
            ].map(l => (
              <Link key={l.to} to={l.to} className="block py-2.5 px-4 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all">{l.label}</Link>
            ))}
            <SignedIn>
              <div className="pt-3 border-t border-border mt-3 space-y-1">
                {[
                  { to: "/my-purchases", label: "My Purchases", icon: ShoppingBag },
                  { to: "/wishlist", label: "Wishlist", icon: Heart },
                  { to: "/guide", label: "Guide", icon: BookOpen },
                ].map(l => (
                  <Link key={l.to} to={l.to} className="flex items-center gap-2.5 py-2.5 px-4 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all text-sm">
                    <l.icon className="w-4 h-4" /> {l.label}
                  </Link>
                ))}
                <div className="flex items-center gap-3 pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>
            <div className="flex items-center gap-3 pt-3 border-t border-border mt-3">
              <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-muted transition-all duration-300 text-muted-foreground hover:scale-110 active:scale-95">
                {theme === "dark" ? <Sun className="w-5 h-5 theme-toggle-icon" /> : <Moon className="w-5 h-5 theme-toggle-icon" />}
              </button>
              <SignedOut>
                <Link to="/sign-in" className="btn-primary text-sm flex-1 justify-center">Sign In</Link>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </nav>
  );
}
