import { useRef, useState } from "react";
import { Send, CheckCircle, Loader2, Wand2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

const INDUSTRIES = [
  "SaaS / Tech",
  "E-commerce",
  "Fintech",
  "Healthcare",
  "Manufacturing",
  "Education",
  "Logistics",
  "Real Estate",
  "Media",
  "Other",
];

const TIMELINES = ["ASAP (2 weeks)", "1 month", "1–3 months", "3+ months", "Just exploring"];

const BUDGETS = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
];

const briefSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(120).optional(),
  industry: z.string().trim().min(1, "Pick an industry").max(60),
  workflows: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about the key workflows")
    .max(1000),
  timeline: z.string().trim().min(1, "Pick a timeline").max(40),
  budget: z.string().trim().min(1, "Pick a budget range").max(40),
});

interface CustomizationBriefProps {
  productName: string;
  productId?: string;
}

export default function CustomizationBrief({ productName, productId }: CustomizationBriefProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mountedAt = useRef<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot + time-trap
    if ((fd.get("website")?.toString() ?? "").trim() !== "") {
      setSubmitted(true);
      return;
    }
    if (Date.now() - mountedAt.current < 1500) {
      setSubmitted(true);
      return;
    }

    const raw = {
      name: fd.get("name")?.toString() ?? "",
      email: fd.get("email")?.toString() ?? "",
      company: fd.get("company")?.toString() ?? "",
      industry: fd.get("industry")?.toString() ?? "",
      workflows: fd.get("workflows")?.toString() ?? "",
      timeline: fd.get("timeline")?.toString() ?? "",
      budget: fd.get("budget")?.toString() ?? "",
    };

    const parsed = briefSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (k && !next[k]) next[k] = i.message;
      });
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const payload = {
        source: "customization_brief",
        product: productName,
        productId: productId ?? null,
        submitted_at: new Date().toISOString(),
        ...parsed.data,
      };
      const existing = JSON.parse(localStorage.getItem("akcelerate_pending_leads") ?? "[]");
      existing.push(payload);
      localStorage.setItem("akcelerate_pending_leads", JSON.stringify(existing.slice(-50)));
      trackEvent("customization_brief_submit", {
        product: productName,
        productId,
        industry: parsed.data.industry,
        timeline: parsed.data.timeline,
        budget: parsed.data.budget,
      });
      setSubmitted(true);
    } catch {
      toast.error("Could not submit. Please email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-10 text-center">
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
        <h3 className="font-poppins font-bold text-2xl mb-2">Brief received!</h3>
        <p className="text-muted-foreground">
          We'll review your customization brief for <span className="font-medium text-foreground">{productName}</span> and respond within 24 hours.
        </p>
      </div>
    );
  }

  const inputCls = (k: string) =>
    `w-full px-4 py-3 rounded-xl text-sm transition-all border bg-background border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 ${
      errors[k] ? "!border-destructive" : ""
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card p-8 space-y-5">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Wand2 className="w-5 h-5 text-primary" />
        <h3 className="font-poppins font-bold text-lg">Customization Brief</h3>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="brief-name" className="block text-sm font-medium mb-1.5 text-foreground">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input id="brief-name" name="name" type="text" maxLength={100} placeholder="John Doe" className={inputCls("name")} />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="brief-email" className="block text-sm font-medium mb-1.5 text-foreground">
            Work Email <span className="text-destructive">*</span>
          </label>
          <input id="brief-email" name="email" type="email" maxLength={255} placeholder="you@company.com" className={inputCls("email")} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="brief-company" className="block text-sm font-medium mb-1.5 text-foreground">Company</label>
        <input id="brief-company" name="company" type="text" maxLength={120} placeholder="Your company" className={inputCls("company")} />
      </div>

      <div>
        <label htmlFor="brief-industry" className="block text-sm font-medium mb-1.5 text-foreground">
          Industry <span className="text-destructive">*</span>
        </label>
        <select id="brief-industry" name="industry" defaultValue="" className={inputCls("industry")}>
          <option value="" disabled>Select your industry…</option>
          {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        {errors.industry && <p className="text-destructive text-xs mt-1">{errors.industry}</p>}
      </div>

      <div>
        <label htmlFor="brief-workflows" className="block text-sm font-medium mb-1.5 text-foreground">
          Key workflows to support <span className="text-destructive">*</span>
        </label>
        <textarea
          id="brief-workflows"
          name="workflows"
          rows={4}
          maxLength={1000}
          placeholder="e.g. multi-tenant onboarding, Stripe billing, role-based dashboards, SMS notifications…"
          className={`${inputCls("workflows")} resize-none`}
        />
        {errors.workflows && <p className="text-destructive text-xs mt-1">{errors.workflows}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="brief-timeline" className="block text-sm font-medium mb-1.5 text-foreground">
            Timeline <span className="text-destructive">*</span>
          </label>
          <select id="brief-timeline" name="timeline" defaultValue="" className={inputCls("timeline")}>
            <option value="" disabled>Select…</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.timeline && <p className="text-destructive text-xs mt-1">{errors.timeline}</p>}
        </div>
        <div>
          <label htmlFor="brief-budget" className="block text-sm font-medium mb-1.5 text-foreground">
            Budget range <span className="text-destructive">*</span>
          </label>
          <select id="brief-budget" name="budget" defaultValue="" className={inputCls("budget")}>
            <option value="" disabled>Select…</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.budget && <p className="text-destructive text-xs mt-1">{errors.budget}</p>}
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Submit Brief</>}
      </button>
    </form>
  );
}
