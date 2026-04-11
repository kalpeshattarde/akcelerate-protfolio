import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { completedProjects } from "@/data/industries";
import { Link } from "react-router-dom";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function CompletedProjectsPage() {
  return (
    <>
      <HeroPage label="Portfolio" title={<>Our <span className="gradient-text">Completed Projects</span></>} description="A showcase of real-world analytics, AI, and digital transformation projects delivered for manufacturing clients across India." />
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealGrid className="grid md:grid-cols-2 gap-6" stagger={100}>
          {completedProjects.map((p, i) => (
            <div key={i} className="reveal-item glass-card p-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/10">{p.type}</span>
              </div>
              <h3 className="font-poppins font-semibold text-lg mb-1">{p.title}</h3>
              <p className="text-xs text-accent mb-4">{p.industry}</p>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-foreground mb-1">Challenge</div>
                  <p className="text-muted-foreground text-sm">{p.challenge}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground mb-1">Solution</div>
                  <p className="text-muted-foreground text-sm">{p.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </RevealGrid>
      </div></section>
      <CTASection title="Ready to Transform Your Manufacturing Operations?" description="Schedule a consultation with our analytics experts. We'll assess your current setup and show you exactly what's possible." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
