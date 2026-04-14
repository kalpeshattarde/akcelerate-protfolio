import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function FounderPage() {
  return (
    <>
      <HeroPage label="Founder" title={<>Meet <span className="gradient-text">Kalpesh Attarde</span></>} description="Founder & CEO of AKcelerate — data scientist, AI strategist, and passionate advocate for data-driven business growth." />
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="glass-card p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
              <img src="/images/kalpesh-attarde.jpeg" alt="Kalpesh Attarde" className="w-32 h-32 rounded-2xl flex-shrink-0 object-cover" />
              <div>
                <h2 className="font-poppins font-bold text-2xl mb-2">Kalpesh Attarde</h2>
                <div className="text-accent font-medium mb-3">Founder & CEO, AKcelerate</div>
                <p className="text-muted-foreground text-sm leading-relaxed">With 8+ years in data science, machine learning, and business consulting, Kalpesh has helped 50+ businesses across 13 industries transform their operations using AI and data-driven strategies.</p>
              </div>
            </div>
          </RevealSection>
          <RevealGrid className="space-y-8" stagger={150}>
            {[
              { title: "Philosophy", content: "I believe AI should be accessible to every business, not just Fortune 500 companies. The real power of data science lies in solving specific, measurable business problems — not in building technology for technology's sake." },
              { title: "Expertise", content: "My expertise spans predictive analytics, machine learning, natural language processing, computer vision, and full-stack development. I've built solutions for manufacturing, fintech, healthcare, retail, and more." },
              { title: "Vision for AKcelerate", content: "AKcelerate exists to bridge the gap between AI potential and real-world impact. We measure success not by the complexity of our models, but by the growth we deliver for our clients. Every rupee invested with us should return measurable business value." },
            ].map((s, i) => (
              <div key={i} className="reveal-item glass-card p-7">
                <h3 className="font-poppins font-semibold text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>
      <CTASection title="Let's Connect" description="Reach out to discuss how we can accelerate your business growth." primaryCta={{ label: "Contact", to: "/contact" }} dark />
    </>
  );
}
