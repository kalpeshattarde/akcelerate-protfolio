import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Moon, Sun, Layers, Activity, Radio, Monitor, BarChart3, LayoutDashboard, Cloud, Settings, Wrench, CheckSquare, Truck, Zap } from "lucide-react";

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

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function RequestDemoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("ak-theme") || "light");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("ak-theme", theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const activeLinkStyle = { color: "#2563EB", fontWeight: 600 };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/97 backdrop-blur-[16px] border-b border-border py-[0.875rem] shadow-[0_4px_24px_rgba(15,23,42,0.08)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}
            >
              <LogoMark />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight text-foreground">
              AK<span className="gradient-text">celerate</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="nav-link" style={location.pathname === "/" ? activeLinkStyle : undefined}>Home</Link>

            <div className="nav-dropdown relative">
              <Link to="/solutions" className="nav-link flex items-center gap-1" style={location.pathname.startsWith("/solutions") ? activeLinkStyle : undefined}>
                Solutions <ChevronDown className="w-3 h-3" />
              </Link>
              <div className="nav-dropdown-menu min-w-[320px]">
                <div className="space-y-0.5">
                  <Link to="/solutions" className="nav-dropdown-item">
                    <div className="nav-dropdown-icon"><LayoutDashboard className="w-4 h-4" /></div>
                    <div>
                      <div className="nav-dropdown-title">All Solutions</div>
                      <div className="nav-dropdown-desc">Overview of all 8 areas</div>
                    </div>
                  </Link>
                  <div className="nav-dropdown-divider" />
                  {solutionLinks.map((s) => (
                    <Link key={s.to} to={s.to} className="nav-dropdown-item">
                      <div className="nav-dropdown-icon"><s.icon className="w-4 h-4" /></div>
                      <div>
                        <div className="nav-dropdown-title">{s.title}</div>
                        <div className="nav-dropdown-desc">{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav-dropdown relative">
              <Link to="/services" className="nav-link flex items-center gap-1" style={location.pathname.startsWith("/services") ? activeLinkStyle : undefined}>
                Services <ChevronDown className="w-3 h-3" />
              </Link>
              <div className="nav-dropdown-menu min-w-[270px]">
                <div className="space-y-0.5">
                  <Link to="/services" className="nav-dropdown-item">
                    <div className="nav-dropdown-icon"><Settings className="w-4 h-4" /></div>
                    <div>
                      <div className="nav-dropdown-title">All Services</div>
                      <div className="nav-dropdown-desc">Implementation & consulting</div>
                    </div>
                  </Link>
                  <div className="nav-dropdown-divider" />
                  {serviceLinks.map((s) => (
                    <Link key={s.to} to={s.to} className="nav-dropdown-item">
                      <div className="nav-dropdown-icon"><s.icon className="w-4 h-4" /></div>
                      <div>
                        <div className="nav-dropdown-title">{s.title}</div>
                        <div className="nav-dropdown-desc">{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/industries" className="nav-link" style={location.pathname === "/industries" ? activeLinkStyle : undefined}>Industries</Link>
            <Link to="/case-studies" className="nav-link" style={location.pathname === "/case-studies" ? activeLinkStyle : undefined}>Case Studies</Link>
            <Link to="/insights" className="nav-link" style={location.pathname.startsWith("/insights") || location.pathname.startsWith("/blog") ? activeLinkStyle : undefined}>Insights</Link>
            <Link to="/about" className="nav-link" style={location.pathname === "/about" ? activeLinkStyle : undefined}>About</Link>
            <Link to="/contact" className="nav-link" style={location.pathname === "/contact" ? activeLinkStyle : undefined}>Contact</Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-border bg-background/80 flex items-center justify-center text-muted-foreground transition-all hover:border-primary/20 hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-[17px] h-[17px]" /> : <Moon className="w-[17px] h-[17px]" />}
            </button>
            <Link to="/contact" className="btn-primary text-sm px-7">
              <RequestDemoIcon /> Request Demo
            </Link>
          </div>

          <button onClick={() => setMobileOpen((o) => !o)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground" aria-label="Open menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu open lg:hidden">
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
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block py-2.5 px-4 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-border mt-3">
              <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-border bg-background/80 flex items-center justify-center text-muted-foreground transition-all hover:border-primary/20 hover:text-primary" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link to="/contact" className="btn-primary text-sm flex-1 justify-center">
                <RequestDemoIcon /> Request Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
