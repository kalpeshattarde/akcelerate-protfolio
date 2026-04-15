import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-gradient text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-5">
              <img src="/images/logo-full-dark.svg" alt="AKcelerate" className="h-9" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 mb-4">
              Premium AI, Data, Automation and Business Consulting firm — delivering digital transformation across 13+ industries.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#06B6D4" }} />
              Mumbai, India
            </div>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/akceleratehq/" },
                { icon: Twitter, href: "https://x.com/akcelerateHQ" },
                { icon: Instagram, href: "https://www.instagram.com/akceleratehq/" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:text-cyan-400" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5 text-sm tracking-wide">Company</h4>
            <div className="space-y-2.5">
              {[
                { to: "/about", label: "About" },
                { to: "/founder", label: "Founder" },
                { to: "/careers", label: "Careers" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm text-slate-500 hover:text-cyan-400 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="lg:hidden xl:block">
            <h4 className="font-poppins font-semibold text-white mb-5 text-sm tracking-wide">Resources</h4>
            <div className="space-y-2.5">
              {[
                { to: "/pricing", label: "Pricing" },
                { to: "/products", label: "Products" },
                { to: "/resources", label: "Resources" },
                { to: "/gallery", label: "Gallery" },
                { to: "/case-studies", label: "Case Studies" },
                { to: "/completed-projects", label: "Completed Projects" },
                { to: "/free-audit", label: "Free Audit" },
                { to: "/wishlist", label: "Wishlist" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm text-slate-500 hover:text-cyan-400 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5 text-sm tracking-wide">Solutions</h4>
            <div className="space-y-2.5">
              {[
                { to: "/solutions/business-automation", label: "Business Automation" },
                { to: "/solutions/ai-ml", label: "AI / ML Solutions" },
                { to: "/solutions/business-consulting", label: "Business Consulting" },
                { to: "/solutions/saas-dev", label: "SaaS Development" },
                { to: "/solutions/cloud-devops", label: "Cloud & DevOps" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm text-slate-500 hover:text-cyan-400 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5 text-sm tracking-wide">Contact</h4>
            <div className="space-y-4">
              <a href="mailto:akceleratehq@gmail.com" className="flex items-center gap-3 text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#06B6D4" }} /> akceleratehq@gmail.com
              </a>
              <a href="tel:+918208555380" className="flex items-center gap-3 text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#06B6D4" }} /> +91 8208555380
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#06B6D4" }} /> Mumbai, India
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} AKcelerate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-slate-600 hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-slate-600 hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link to="/admin" className="text-sm text-slate-600 hover:text-cyan-400 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
