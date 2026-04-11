import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { completedProjects } from "@/data/industries";

export default function CompletedProjectsPage() {
  return (
    <>
      <HeroPage label="Portfolio" title={<>Completed <span className="gradient-text">Projects</span></>} description="A selection of projects we've delivered across industries and solution areas." />
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedProjects.map((p, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/10">{p.industry}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/5 text-accent border border-accent/10">{p.type}</span>
              </div>
              <h3 className="font-poppins font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.description}</p>
            </div>
          ))}
        </div>
      </div></section>
      <CTASection title="Start Your Project" description="Let's discuss your next big project." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
