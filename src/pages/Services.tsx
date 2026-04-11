import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { ServiceCard } from "@/components/Cards";
import { services } from "@/data/services";

const techCategories = [
  { name: "AI & Machine Learning", items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Hugging Face"] },
  { name: "Cloud & Infrastructure", items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"] },
  { name: "Data & Analytics", items: ["Power BI", "Tableau", "Apache Kafka", "Snowflake", "dbt", "Airflow"] },
  { name: "Development", items: ["React", "Node.js", "TypeScript", "PostgreSQL", "GraphQL", "REST APIs"] },
];

const lifecycle = [
  { num: 1, title: "Discovery & Audit", desc: "Assess your current systems, data, and pain points." },
  { num: 2, title: "Strategy & Roadmap", desc: "Design a phased implementation plan with clear milestones." },
  { num: 3, title: "Development & Integration", desc: "Build and integrate solutions into your existing stack." },
  { num: 4, title: "Testing & QA", desc: "Rigorous testing across all scenarios and edge cases." },
  { num: 5, title: "Deployment & Training", desc: "Zero-downtime deployment with comprehensive team training." },
  { num: 6, title: "Monitoring & Support", desc: "Ongoing monitoring, optimization, and priority support." },
];

export default function ServicesPage() {
  return (
    <>
      <HeroPage
        label="Services"
        title={<>Deep-Tech <span className="gradient-text">Implementation Services</span></>}
        description="End-to-end AI, analytics, and digital solutions delivered by domain experts with proven track records."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Capabilities" title={<>Our <span className="gradient-text">Service Areas</span></>} description="Specialized services designed for industrial and enterprise applications." />
          <div className="grid md:grid-cols-2 gap-6">
            {services.map(s => (
              <ServiceCard key={s.slug} slug={s.slug} title={s.title} description={s.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Technology" title={<>Our <span className="gradient-text">Tech Coverage</span></>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((c, i) => (
              <div key={i} className="glass-card p-6">
                <h3 className="font-poppins font-semibold mb-4">{c.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {c.items.map(t => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Delivery" title={<>Our <span className="gradient-text">Delivery Lifecycle</span></>} description="A structured, transparent delivery process from kickoff to production." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifecycle.map(l => (
              <div key={l.num} className="glass-card p-6 flex items-start gap-4">
                <div className="process-number flex-shrink-0">{l.num}</div>
                <div>
                  <h3 className="font-poppins font-semibold mb-1">{l.title}</h3>
                  <p className="text-muted-foreground text-sm">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's Build Something Great"
        description="Tell us about your project and we'll design the perfect engagement model."
        primaryCta={{ label: "Get Started", to: "/contact" }}
        secondaryCta={{ label: "View Pricing", to: "/pricing" }}
        dark
      />
    </>
  );
}
