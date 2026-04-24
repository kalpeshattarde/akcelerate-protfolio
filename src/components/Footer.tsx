import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { blogPosts } from "@/data/blog";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 dark:bg-background text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: Brand + Contact */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-border">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-5">
              <img src="/images/logo-full-light.svg" alt="AKcelerate" className="h-9 dark:hidden" />
              <img src="/images/logo-full-dark.svg" alt="AKcelerate" className="h-9 hidden dark:block" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4 max-w-md">
              Premium AI, Data, Automation and Business Consulting firm — delivering digital transformation across 13+ industries.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
              Mumbai, India
            </div>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/akceleratehq/", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com/akcelerateHQ", label: "Twitter / X" },
                { icon: Instagram, href: "https://www.instagram.com/akceleratehq/", label: "Instagram" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`AKcelerate on ${s.label}`} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center transition-colors hover:text-accent">
                  <s.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-5 text-sm tracking-wide">Company</h4>
            <div className="space-y-2.5">
              {[
                { to: "/about", label: "About" },
                { to: "/founder", label: "Founder" },
                { to: "/careers", label: "Careers" },
                { to: "/case-studies", label: "Case Studies" },
                { to: "/completed-projects", label: "Completed Projects" },
                { to: "/contact", label: "Contact" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm text-muted-foreground hover:text-accent transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-5 text-sm tracking-wide">Get in Touch</h4>
            <div className="space-y-4">
              <a href="mailto:akceleratehq@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors break-all">
                <Mail className="w-4 h-4 flex-shrink-0 text-accent" /> akceleratehq@gmail.com
              </a>
              <a href="tel:+918208555380" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0 text-accent" /> +91 8208555380
              </a>
              <Link to="/free-audit" className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors">
                Book a Free Audit →
              </Link>
            </div>
          </div>
        </div>

        {/* Mega menu: deep links by category */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12 pb-12 border-b border-border">

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4 text-sm tracking-wide">Solutions</h4>
            <div className="space-y-2">
              {solutions.slice(0, 8).map(s => (
                <Link key={s.slug} to={`/solutions/${s.slug}`} className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  {s.shortTitle || s.title}
                </Link>
              ))}
              <Link to="/solutions" className="block text-sm font-medium text-primary hover:text-accent transition-colors pt-1">All Solutions →</Link>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4 text-sm tracking-wide">Industries</h4>
            <div className="space-y-2">
              {industries.slice(0, 8).map(i => (
                <Link key={i.slug} to={`/industries/${i.slug}`} className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  {i.name}
                </Link>
              ))}
              <Link to="/industries" className="block text-sm font-medium text-primary hover:text-accent transition-colors pt-1">All Industries →</Link>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4 text-sm tracking-wide">Insights</h4>
            <div className="space-y-2">
              {blogPosts.slice(0, 6).map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="block text-sm text-muted-foreground hover:text-accent transition-colors line-clamp-1">
                  {p.title}
                </Link>
              ))}
              <Link to="/blog" className="block text-sm font-medium text-primary hover:text-accent transition-colors pt-1">All Articles →</Link>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4 text-sm tracking-wide">Studio</h4>
            <div className="space-y-2">
              {[
                { to: "/ai-agents", label: "AI Agents" },
                { to: "/automations", label: "Automations" },
                { to: "/build-mvp", label: "21-Day MVP" },
                { to: "/solutions/mlops", label: "Custom AI" },
                { to: "/pricing", label: "Pricing" },
                { to: "/products", label: "SaaS Prototypes" },
                { to: "/resources", label: "Resources" },
                { to: "/gallery", label: "Gallery" },
                { to: "/free-audit", label: "Free Audit" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm text-muted-foreground hover:text-accent transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AKcelerate. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/sign-in" className="text-sm text-muted-foreground hover:text-accent transition-colors">Sign In</Link>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-accent transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
