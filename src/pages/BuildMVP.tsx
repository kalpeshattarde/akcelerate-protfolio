import { CheckCircle2, Rocket } from "lucide-react";
import LandingTemplate from "@/components/LandingTemplate";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import heroImage from "@/assets/hero-build-mvp.jpg";

const timeline = [
  { week: "Week 1", title: "Discovery + Design", desc: "Scope lock, user journeys, wireframes, branding, clickable prototype." },
  { week: "Week 2", title: "Full-Stack Build", desc: "Auth, database, payments, core features, admin dashboard, AI integrations." },
  { week: "Week 3", title: "QA + Launch", desc: "End-to-end testing, performance tuning, security pass, deploy, handover." },
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
      {
        "@type": "Question",
        name: "Is 21 days really enough?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — for a focused MVP with auth, database, payments, core features, and a landing page. We've delivered 25+ of these.",
        },
      },
      {
        "@type": "Question",
        name: "What if I need changes after launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Two weeks of post-launch support is included; ongoing iteration is available on retainer.",
        },
      },
      {
        "@type": "Question",
        name: "Do I own the code?",
        acceptedAnswer: { "@type": "Answer", text: "100%. Full source code handover, no lock-in, no licensing fees." },
      },
    ],
  },
];

function TimelineShowcase() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <SectionHeader
            label="The Build Timeline"
            title={<>How We Ship in <span className="gradient-text">3 Weeks</span></>}
            description="A focused, weekly cadence with daily progress updates."
          />
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
  );
}

export default function BuildMVP() {
  return (
    <LandingTemplate
      seo={{
        title: "21-Day MVP Build System · From Idea to Live App",
        description:
          "We ship full-stack AI MVPs in 21 days. Auth, payments, admin, and a landing page — production-ready, source-code-yours, launch-ready.",
        path: "/build-mvp",
        jsonLd,
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Build MVP", path: "/build-mvp" },
        ],
      }}
      hero={{
        label: "21-Day MVP Build System",
        title: (
          <>
            From Idea to <span className="gradient-text">Live AI MVP</span> in 21 Days
          </>
        ),
        description:
          "A predictable, fixed-timeline build system for founders. Full-stack web app, payments, auth, landing page — all yours on day 21.",
      }}
      heroImage={{ src: heroImage, alt: "Rocket launching from a laptop representing a 21-day MVP launch" }}
      showcase={<TimelineShowcase />}
      problem={{
        title: (
          <>
            Why Founders <span className="gradient-text">Stay Stuck</span>
          </>
        ),
        description: "The friction the 21-Day system removes.",
        icon: CheckCircle2,
        items: [
          "Idea stuck in slides for months",
          "Dev agencies quote 6 months and $50k+",
          "Freelancers ghost halfway through",
          "Tech co-founder hunt is killing momentum",
        ],
      }}
      approach={{
        title: "Our Approach",
        items: [
          "Lock scope to one killer feature loop",
          "Weekly demo cadence — no surprises",
          "Modern stack: React, Supabase, Stripe, AI",
          "Launch-day deploy + analytics wired in",
        ],
      }}
      deliverables={{
        title: "What You Get on Day 21",
        items: [
          "Production-ready full-stack app",
          "Auth (Supabase) + payments (Stripe/Razorpay)",
          "Landing page + analytics + admin panel",
          "Source code + deployment pipeline",
          "Two weeks post-launch support",
        ],
        ctaLabel: "Start My 21-Day MVP",
        ctaTo: "/contact?intent=mvp",
      }}
      finalCta={{
        title: "Your MVP. Live in 21 days.",
        description: "Lock a slot, share your idea, and ship a real product before the month ends.",
        primaryLabel: "Start My MVP",
        primaryTo: "/contact?intent=mvp",
        secondaryLabel: "See Past Builds",
        secondaryTo: "/completed-projects",
      }}
    />
  );
}
