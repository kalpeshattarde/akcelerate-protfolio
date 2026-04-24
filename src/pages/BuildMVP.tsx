import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const timeline = [
  { week: "Week 1", title: "Discovery + Design", desc: "Scope lock, user journeys, wireframes, branding, clickable prototype." },
  { week: "Week 2", title: "Full-Stack Build", desc: "Auth, database, payments, core features, admin dashboard, AI integrations." },
  { week: "Week 3", title: "QA + Launch", desc: "End-to-end testing, performance tuning, security pass, deploy, handover." },
];

const deliverables = [
  "Production-ready full-stack app",
  "Auth (Clerk/Supabase) + payments (Stripe/Razorpay)",
  "Landing page + analytics + admin panel",
  "Source code + deployment pipeline",
  "Two weeks post-launch support",
];

const problems = [
  "Idea stuck in slides for months",
  "Dev agencies quote 6 months and $50k+",
  "Freelancers ghost halfway through",
  "Tech co-founder hunt is killing momentum",
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "21-Day MVP Build System",
    description: "From idea to live AI MVP in 21 days. Full-stack, payments, auth, launch-ready.",
    url: "https://akcelerate.lovable.app/build-mvp",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is 21 days really enough?", acceptedAnswer: { "@type": "Answer", text: "Yes — for a focused MVP with auth, database, payments, core features, and a landing page. We've delivered 25+ of these." } },
      { "@type": "Question", name: "What if I need changes after launch?", acceptedAnswer: { "@type": "Answer", text: "Two weeks of post-launch support is included; ongoing iteration is available on retainer." } },
      { "@type": "Question", name: "Do I own the code?", acceptedAnswer: { "@type": "Answer", text: "100%. Full source code handover, no lock-in, no licensing fees." } },
    ],
  },
];

export default function BuildMVP() {
  return (
    <>
      <SEOHead
        title="21-Day MVP Build System · From Idea to Live App"
        description="We ship full-stack AI MVPs in 21 days. Auth, payments, admin, and a landing page — production-ready, source-code-yours, launch-ready."
        path="/build-mvp"
        jsonLd={jsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Build MVP", path: "/build-mvp" }]}
      />
      <HeroPage
        label="21-Day MVP Build System"
        title={<>From Idea to <span className="gradient-text">Live AI MVP</span> in 21 Days</>}
        description="A predictable, fixed-timeline build system for founders. Full-stack web app, payments, auth, landing page — all yours on day 21."
      />

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="The Build Timeline" title={<>How We Ship in <span className="gradient-text">3 Weeks</span></>} description="A focused, weekly cadence with daily progress updates." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-3 gap-6" stagger={120}>
            {timeline.map((t) => (
              <div key={t.week} className="reveal-item glass-card p-7">
                <div className="feature-icon"><Rocket className="w-6 h-6 text-accent" /></div>
                <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">{t.week}</div>
                <h3 className="font-poppins font-semibold text-lg mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-24 lg:py-32 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="The Problem" title={<>Why Founders <span className="gradient-text">Stay Stuck</span></>} description="The friction the 21-Day system removes." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto" stagger={80}>
            {problems.map((p) => (
              <div key={p} className="reveal-item glass-card p-5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{p}</span>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <RevealSection>
            <h2 className="font-poppins font-bold text-3xl mb-6 text-center">What You Get on Day 21</h2>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />{d}
                </li>
              ))}
            </ul>
            <div className="text-center mt-10">
              <Link to="/contact?intent=mvp" className="btn-primary inline-flex">
                Start My 21-Day MVP <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <CTASection title="Your MVP. Live in 21 days." description="Lock a slot, share your idea, and ship a real product before the month ends." primaryCta={{ label: "Start My MVP", to: "/contact?intent=mvp" }} secondaryCta={{ label: "See Past Builds", to: "/completed-projects" }} dark />
    </>
  );
}
