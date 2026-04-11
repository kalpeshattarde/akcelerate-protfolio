import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { MapPin, Briefcase } from "lucide-react";
import { RevealGrid } from "@/hooks/useScrollReveal";

const jobs = [
  { title: "Senior Data Scientist", location: "Remote / Mumbai", type: "Full-time", desc: "Build production ML models for enterprise clients across industries." },
  { title: "Full-Stack Developer", location: "Remote / Mumbai", type: "Full-time", desc: "Develop scalable web applications and SaaS products using React and Node.js." },
  { title: "ML Engineer", location: "Remote", type: "Full-time", desc: "Deploy and monitor ML models in production environments." },
  { title: "Business Analyst", location: "Mumbai", type: "Full-time", desc: "Bridge the gap between business requirements and technical solutions." },
];

export default function CareersPage() {
  return (
    <>
      <HeroPage label="Careers" title={<>Join the <span className="gradient-text">AKcelerate Team</span></>} description="Help businesses grow with AI. We're looking for passionate builders and problem-solvers." />
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="space-y-4" stagger={100}>
            {jobs.map((j, i) => (
              <div key={i} className="reveal-item glass-card p-6">
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
          </RevealGrid>
        </div>
      </section>
      <CTASection title="Don't See Your Role?" description="We're always looking for exceptional talent. Send us your resume." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
