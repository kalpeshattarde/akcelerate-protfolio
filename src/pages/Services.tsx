import { HeroPage } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { ServiceCard } from "@/components/Cards";
import { services } from "@/data/services";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AKcelerate Services",
      description: "Deep-tech AI/ML implementation services.",
      url: "https://akcelerate.lovable.app/services",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://akcelerate.lovable.app/services/${s.slug}`,
        name: s.title,
      })),
    },
  ];
  return (
    <>
      <SEOHead
        title="Services"
        description="Deep-tech AI/ML implementation services including predictive maintenance, quality analytics, and supply chain optimization."
        path="/services"
        jsonLd={jsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
      />
      <HeroPage
        label="Services"
        title={<>Deep-Tech <span className="gradient-text">Implementation Services</span></>}
        description="End-to-end AI, analytics, and digital solutions delivered by domain experts with proven track records."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Capabilities" title={<>Our <span className="gradient-text">Service Areas</span></>} description="Specialized services designed for industrial and enterprise applications." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 gap-6" stagger={120}>
            {services.map(s => (
              <div key={s.slug} className="reveal-item">
                <ServiceCard slug={s.slug} title={s.title} description={s.description} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Technology" title={<>Our <span className="gradient-text">Tech Coverage</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
            {techCategories.map((c, i) => (
              <div key={i} className="reveal-item glass-card p-6">
                <h3 className="font-poppins font-semibold mb-4">{c.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {c.items.map(t => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Delivery" title={<>Our <span className="gradient-text">Delivery Lifecycle</span></>} description="A structured, transparent delivery process from kickoff to production." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
            {lifecycle.map(l => (
              <div key={l.num} className="reveal-item glass-card p-6 flex items-start gap-4">
                <div className="process-number flex-shrink-0">{l.num}</div>
                <div>
                  <h3 className="font-poppins font-semibold mb-1">{l.title}</h3>
                  <p className="text-muted-foreground text-sm">{l.desc}</p>
                </div>
              </div>
            ))}
          </RevealGrid>
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
