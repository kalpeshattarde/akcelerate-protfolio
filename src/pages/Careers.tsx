import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { SectionHeader } from "@/components/SectionHeader";
import { MapPin, Briefcase, Zap, Heart, TrendingUp } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const perks = [
  { icon: Zap, title: "High Impact", desc: "Your work directly reduces downtime and waste at real factories across India." },
  { icon: Heart, title: "Great Culture", desc: "Remote-first, outcome-driven culture. We trust you to do great work." },
  { icon: TrendingUp, title: "Rapid Growth", desc: "Early-stage startup. Your skills will grow as fast as the company." },
];

const jobs = [
  { title: "Senior ML Engineer", desc: "Build and deploy predictive models on real-time IoT sensor data from industrial equipment.", location: "Remote / Mumbai", type: "Full-time" },
  { title: "Data Scientist — Manufacturing", desc: "Analyze production data, identify patterns, and build analytics models for OEE, quality, and energy optimization.", location: "Remote / Mumbai", type: "Full-time" },
  { title: "Implementation Consultant", desc: "Onboard manufacturing clients, configure dashboards, and drive adoption of the AKcelerate platform.", location: "Mumbai", type: "Full-time" },
  { title: "Enterprise Sales Manager", desc: "Sell AKcelerate's AI platform to manufacturing leaders across automotive, FMCG, pharma, and process industries.", location: "Mumbai", type: "Full-time" },
  { title: "Frontend Engineer (React / TypeScript)", desc: "Build real-time dashboards and analytics UIs for the AKcelerate manufacturing intelligence platform.", location: "Remote", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <>
      <HeroPage label="Careers" title={<>Build the Future of <span className="gradient-text">Indian Manufacturing</span></>} description="We're a small team with a big mission — using AI to transform how India's factories run. Join us and do the most meaningful work of your career." />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid md:grid-cols-3 gap-6 mb-16" stagger={100}>
            {perks.map((p, i) => (
              <div key={i} className="reveal-item glass-card p-7 text-center">
                <div className="feature-icon mx-auto"><p.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </RevealGrid>

          <RevealSection>
            <SectionHeader label="Open Roles" title={<>Current <span className="gradient-text">Openings</span></>} />
          </RevealSection>
          <div className="space-y-4 max-w-4xl mx-auto">
            {jobs.map((j, i) => (
              <div key={i} className="glass-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-poppins font-semibold text-lg">{j.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{j.desc}</p>
                    <div className="flex gap-4 mt-3">
                      <span className="text-xs flex items-center gap-1 text-muted-foreground"><MapPin className="w-3 h-3" />{j.location}</span>
                      <span className="text-xs flex items-center gap-1 text-muted-foreground"><Briefcase className="w-3 h-3" />{j.type}</span>
                    </div>
                  </div>
                  <a href="mailto:akceleratehq@gmail.com" className="btn-primary text-sm">Apply Now</a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-muted-foreground text-sm">Don't see a fit? Send us your resume — we hire for talent, not just roles.</p>
        </div>
      </section>

      <CTASection title="Why Builders Choose Us" description="A fast-moving AI-first company that values ownership, learning, and real-world impact." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
