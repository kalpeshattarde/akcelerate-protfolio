import { Link } from "react-router-dom";
import { Activity, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <Activity className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="font-poppins font-bold text-xl text-white">AK<span className="gradient-text">celerate</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-background/60 mb-5">
              Helping businesses increase revenue and profit using AI, data science, and digital solutions. We turn data into measurable business results.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/akceleratehq/" },
                { icon: Twitter, href: "https://x.com/akcelerateHQ" },
                { icon: Instagram, href: "https://www.instagram.com/akceleratehq/" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5">Solutions</h4>
            <div className="space-y-2.5">
              {[
                { to: "/solutions/business-automation", label: "Business Automation" },
                { to: "/solutions/ai-ml", label: "AI / ML Solutions" },
                { to: "/solutions/business-consulting", label: "Business Consulting" },
                { to: "/solutions/saas-dev", label: "SaaS Development" },
                { to: "/solutions/automated-analytics", label: "Automated Analytics" },
                { to: "/solutions/data-visualization", label: "Data Visualization" },
                { to: "/solutions/cloud-devops", label: "Cloud & DevOps" },
                { to: "/solutions/mlops", label: "MLOps" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm hover:text-primary transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5">Company</h4>
            <div className="space-y-2.5">
              {[
                { to: "/about", label: "About Us" },
                { to: "/founder", label: "Founder" },
                { to: "/case-studies", label: "Case Studies" },
                { to: "/blog", label: "Blog" },
                { to: "/careers", label: "Careers" },
                { to: "/pricing", label: "Pricing" },
                { to: "/contact", label: "Contact" },
                { to: "/free-audit", label: "Free Audit" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm hover:text-primary transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5">Contact</h4>
            <div className="space-y-4">
              <a href="mailto:akceleratehq@gmail.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" /> akceleratehq@gmail.com
              </a>
              <a href="tel:+918208555380" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" /> +91-8208555380
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Mumbai, Maharashtra, India
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">© {new Date().getFullYear()} AKcelerate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-background/50 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-background/50 hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
