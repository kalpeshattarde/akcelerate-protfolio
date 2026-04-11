import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3, Users, Globe, CheckCircle } from "lucide-react";
import { HeroPrimary } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";
import FAQAccordion from "@/components/FAQAccordion";
import { SolutionCard } from "@/components/Cards";
import { solutions } from "@/data/solutions";
import { generalFAQ } from "@/data/faq";
import { industries } from "@/data/industries";

const heroStats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "13+", label: "Industries Served" },
  { value: "315%", label: "Avg. Client ROI" },
  { value: "92%", label: "Client Retention" },
];

const processSteps = [
  { num: 1, title: "Discovery", desc: "Deep-dive into your business goals, data landscape, and pain points." },
  { num: 2, title: "Strategy & Design", desc: "Build a clear roadmap with milestones and success metrics." },
  { num: 3, title: "Build & Integrate", desc: "Agile development with seamless integration into existing systems." },
  { num: 4, title: "Deploy & Go Live", desc: "Rigorous QA, team training, and zero-disruption deployment." },
  { num: 5, title: "Monitor & Scale", desc: "Ongoing monitoring, model retraining, and continuous improvements." },
];

const benefits = [
  { icon: TrendingUp, title: "Transform Raw Data into Insights", desc: "Unify disparate business data streams into a single intelligent analytics layer.", metric: "10x", metricLabel: "faster insights" },
  { icon: Shield, title: "Enterprise-Grade Security", desc: "SOC 2 compliant infrastructure with end-to-end encryption and RBAC.", metric: "100%", metricLabel: "compliance" },
  { icon: Zap, title: "Accelerate Time to Market", desc: "Go from concept to production in weeks, not months.", metric: "3x", metricLabel: "faster delivery" },
  { icon: BarChart3, title: "Measurable Business Impact", desc: "Every engagement starts with clear KPIs tied to revenue and cost.", metric: "315%", metricLabel: "average ROI" },
  { icon: Users, title: "Dedicated Expert Teams", desc: "Cross-functional teams of data scientists, engineers, and strategists.", metric: "50+", metricLabel: "experts" },
  { icon: Globe, title: "Global Delivery, Local Expertise", desc: "Serve clients worldwide with deep understanding of local markets.", metric: "13+", metricLabel: "industries" },
];

const techStack = ["Python", "TensorFlow", "PyTorch", "React", "Node.js", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Power BI", "Tableau", "Snowflake", "Apache Kafka", "MLflow", "PostgreSQL"];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <HeroPrimary
        badge="🚀 AI-Powered Growth Partner"
        title={<>Increase Revenue & Profit with <span className="gradient-text">AI, Data Science & Digital Solutions</span></>}
        description="AKcelerate helps businesses turn raw data into measurable results. From predictive analytics to full-stack digital solutions — we deliver growth you can see in the numbers."
        primaryCta={{ label: "Book a Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Explore Solutions", to: "/solutions" }}
      >
        {/* Dashboard Mockup */}
        <div className="dashboard-mockup animate-float">
          <div className="p-2.5 flex items-center gap-1.5" style={{ background: "hsl(220 43% 8%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-white/40 text-[10px] ml-2 font-mono">analytics-dashboard.app</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Revenue Impact", value: "+₹2.4Cr", color: "from-primary to-accent" },
                { label: "Cost Savings", value: "45%", color: "from-accent to-emerald-400" },
                { label: "ROI", value: "315%", color: "from-violet-500 to-primary" },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-white/50 text-[10px] mb-1">{s.label}</div>
                  <div className={`text-lg font-bold font-poppins bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
                </div>
              ))}
            </div>
            {/* Mini chart */}
            <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-white/50 text-[10px] mb-3">Revenue Growth Forecast</div>
              <div className="flex items-end gap-1.5 h-20">
                {[30, 45, 35, 55, 48, 65, 58, 72, 68, 80, 75, 92].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(180deg, hsl(217 91% 60%), hsl(187 92% 43% / 0.5))`, opacity: 0.6 + (i / 24) }} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-[10px] font-medium">LIVE TRACKING</span>
              <span className="text-white/30 text-[10px] ml-auto">Updated 2s ago</span>
            </div>
          </div>
        </div>
      </HeroPrimary>

      {/* Trust Stats */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsRow stats={heroStats} />
        </div>
      </section>

      {/* How We Transform Businesses */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Process"
            title={<>How We <span className="gradient-text">Transform Businesses</span></>}
            description="A proven 5-step engagement model — from discovery to measurable impact — delivered in weeks, not months."
          />
          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="process-number mx-auto mb-4">{s.num}</div>
                <h3 className="font-poppins font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
            {[
              { val: "2–4", label: "Weeks to first working prototype" },
              { val: "40–60%", label: "Reduction in manual operational time" },
              { val: "315%", label: "Average 3-year client ROI delivered" },
              { val: "92%", label: "Client retention & repeat engagement" },
            ].map((s, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <div className="stat-number mb-1">{s.val}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Businesses Choose AKcelerate */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Core Benefits"
            title={<>Why Businesses Choose <span className="gradient-text">AKcelerate</span></>}
            description="Measurable results delivered across 13+ industries — from startups and SMBs to large enterprises worldwide."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card p-7">
                <div className="feature-icon"><b.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{b.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="stat-number text-2xl">{b.metric}</span>
                  <span className="text-muted-foreground text-xs">{b.metricLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Solution Areas */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Solution Areas"
            title={<>8 Ways We Drive <span className="gradient-text">Business Growth</span></>}
            description="Comprehensive solutions across AI, automation, analytics, cloud, and digital transformation."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map(s => (
              <SolutionCard key={s.slug} slug={s.slug} title={s.shortTitle} description={s.description} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Industries"
            title={<>Trusted Across <span className="gradient-text">13+ Industries</span></>}
            description="Deep domain expertise across manufacturing, finance, healthcare, retail, and more."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.slice(0, 8).map((ind, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="font-poppins font-semibold mb-1">{ind.name}</div>
                <p className="text-muted-foreground text-xs">{ind.description.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Technology"
            title={<>Enterprise-Grade <span className="gradient-text">Tech Stack</span></>}
            description="We use the best tools for each project — chosen for performance, not vendor loyalty."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t) => (
              <span key={t} className="px-5 py-2.5 rounded-full text-sm font-medium glass-card">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Results"
            title={<>Real Impact, <span className="gradient-text">Real Numbers</span></>}
            description="See how we've delivered measurable growth for businesses across industries."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Manufacturing AI", metric: "85%", label: "Downtime Reduction", desc: "Predictive maintenance for a 5-plant network" },
              { title: "E-commerce Growth", metric: "35%", label: "Revenue Increase", desc: "Personalization engine + demand forecasting" },
              { title: "Fintech Analytics", metric: "99.7%", label: "Detection Accuracy", desc: "Real-time fraud detection processing 10M+ daily" },
            ].map((c, i) => (
              <div key={i} className="glass-card p-7">
                <div className="stat-number text-3xl mb-1">{c.metric}</div>
                <div className="text-accent text-sm font-medium mb-3">{c.label}</div>
                <h3 className="font-poppins font-semibold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/case-studies" className="btn-secondary">View All Case Studies <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={generalFAQ} title="Frequently Asked Questions" />

      {/* CTA */}
      <CTASection
        title="Ready to Accelerate Your Growth?"
        description="Book a free audit and discover how AI, data science, and digital solutions can transform your business."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
