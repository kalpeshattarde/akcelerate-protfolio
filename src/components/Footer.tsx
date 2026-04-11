import { Link } from "react-router-dom";

function LogoMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer-gradient py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                <LogoMark />
              </div>
              <span className="font-poppins font-bold text-lg text-white">AK<span className="gradient-text">celerate</span></span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>
              data-driven growth company specializing in AI, machine learning, and digital solutions — delivering digital transformation across 13+ industries.
            </p>
            <div className="flex items-center gap-1 text-xs mb-4" style={{ color: "#6B7280" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Mumbai, India
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.linkedin.com/company/akceleratehq/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="flex items-center justify-center rounded-[8px] transition-all" style={{ width: 34, height: 34, background: "rgba(37,99,235,0.12)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#93C5FD"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://x.com/akcelerateHQ" target="_blank" rel="noopener noreferrer" title="X / Twitter" className="flex items-center justify-center rounded-[8px] transition-all" style={{ width: 34, height: 34, background: "rgba(255,255,255,0.08)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#94A3B8"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.633 5.902-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.instagram.com/akceleratehq/" target="_blank" rel="noopener noreferrer" title="Instagram" className="flex items-center justify-center rounded-[8px] transition-all" style={{ width: 34, height: 34, background: "rgba(217,70,239,0.1)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-sm text-white mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/careers" className="footer-link">Careers</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-sm text-white mb-4">Solutions</h4>
            <div className="space-y-2.5">
              <Link to="/solutions/business-automation" className="footer-link">Business Automation</Link>
              <Link to="/solutions/ai-ml" className="footer-link">AI / ML Solutions</Link>
              <Link to="/solutions/business-consulting" className="footer-link">Business Consulting</Link>
              <Link to="/solutions/saas-dev" className="footer-link">SaaS Development</Link>
              <Link to="/solutions/cloud-devops" className="footer-link">Cloud & DevOps</Link>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-sm text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <a href="mailto:akceleratehq@gmail.com" className="footer-link text-xs">akceleratehq@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <a href="tel:+918208555380" className="footer-link text-xs">+91 8208555380</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="text-xs" style={{ color: "#6B7280" }}>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm" style={{ color: "#6B7280" }}>© 2025 AKcelerate. All rights reserved.</p>
          <div className="flex gap-5 text-xs" style={{ color: "#6B7280" }}>
            <Link to="/privacy" className="transition-colors hover:text-slate-300">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
