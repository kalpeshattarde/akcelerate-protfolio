import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Moon, Sun, Activity, Layers, Radio, Monitor, BarChart3, LayoutDashboard, Cloud, Settings, Wrench, CheckSquare, Truck, Zap, Users, Factory, FileText, Lightbulb } from "lucide-react";

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
  { to: "/industries", title: "Industries", desc: "Sectors we specialise in", icon: Factory },
  { to: "/case-studies", title: "Case Studies", desc: "Real-world results & ROI", icon: FileText },
  { to: "/insights", title: "Insights", desc: "Blog, guides & thought leadership", icon: Lightbulb },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("ak-theme") || "light");
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
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-glow" style={{ background: "var(--gradient-primary)" }}>
              <Activity className="w-[18px] h-[18px] text-primary-foreground" />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight text-foreground">
              AK<span className="gradient-text">celerate</span>
            </span>
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

            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === "/contact" ? "text-primary font-semibold" : "text-muted-foreground"}`}>Contact</Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-[17px] h-[17px] theme-toggle-icon" /> : <Moon className="w-[17px] h-[17px] theme-toggle-icon" />}
            </button>
            <Link to="/contact" className="btn-primary text-sm">
              <LayoutDashboard className="w-4 h-4" /> Request Demo
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/free-audit", label: "Free Audit" },
            ].map(l => (
              <Link key={l.to} to={l.to} className="block py-2.5 px-4 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all">{l.label}</Link>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-border mt-3">
              <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-muted transition-all duration-300 text-muted-foreground hover:scale-110 active:scale-95">
                {theme === "dark" ? <Sun className="w-5 h-5 theme-toggle-icon" /> : <Moon className="w-5 h-5 theme-toggle-icon" />}
              </button>
              <Link to="/contact" className="btn-primary text-sm flex-1 justify-center">Request Demo</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
