import { useEffect, useMemo, useRef, useState } from "react";
import { Send, CheckCircle, Loader2, Wand2, Paperclip, X } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

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

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
  "application/zip",
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
    .max(2000),
  timeline: z.string().trim().min(1, "Pick a timeline").max(40),
  budget: z.string().trim().min(1, "Pick a budget range").max(40),
});

type BriefFields = z.infer<typeof briefSchema>;

interface CustomizationBriefProps {
  productName: string;
  productId?: string;
}

interface AttachmentMeta {
  url: string;
  name: string;
  size: number;
  type: string;
}

export default function CustomizationBrief({ productName, productId }: CustomizationBriefProps) {
  const storageKey = useMemo(
    () => `akcelerate_brief_draft:${productId ?? productName ?? "default"}`,
    [productId, productName]
  );

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<BriefFields>({
    name: "",
    email: "",
    company: "",
    industry: "",
    workflows: "",
    timeline: "",
    budget: "",
  });
  const [attachment, setAttachment] = useState<AttachmentMeta | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef<number>(Date.now());

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        setValues((v) => ({ ...v, ...parsed.values }));
        if (parsed.attachment) setAttachment(parsed.attachment);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Persist draft as user types
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, attachment, savedAt: Date.now() })
      );
    } catch {
      /* ignore quota */
    }
  }, [values, attachment, storageKey]);

  const setField = <K extends keyof BriefFields>(k: K, v: BriefFields[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_BYTES) {
      toast.error("File too large (max 10 MB).");
      e.target.value = "";
      return;
    }
    if (file.type && !ALLOWED_TYPES.includes(file.type)) {
      toast.error("File type not supported.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
      const path = `briefs/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("brief-attachments")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("brief-attachments").getPublicUrl(path);
      const meta: AttachmentMeta = {
        url: pub.publicUrl,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
      };
      setAttachment(meta);
      trackEvent("customization_brief_attachment", {
        product: productName,
        productId,
        name: meta.name,
        size: meta.size,
        type: meta.type,
      });
      toast.success("File attached");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeAttachment = () => setAttachment(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if ((fd.get("website")?.toString() ?? "").trim() !== "") {
      setSubmitted(true);
      return;
    }
    if (Date.now() - mountedAt.current < 1500) {
      setSubmitted(true);
      return;
    }

    const parsed = briefSchema.safeParse(values);
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
        ...parsed.data,
        company: parsed.data.company || null,
        product_name: productName,
        product_id: productId ?? null,
        attachment_url: attachment?.url ?? null,
        attachment_name: attachment?.name ?? null,
        attachment_size: attachment?.size ?? null,
        attachment_type: attachment?.type ?? null,
        source: "customization_brief",
      };

      const { error } = await supabase.functions.invoke("submit-brief", {
        body: payload,
      });
      if (error) throw error;

      trackEvent("customization_brief_submit", {
        product: productName,
        productId,
        industry: parsed.data.industry,
        timeline: parsed.data.timeline,
        budget: parsed.data.budget,
        attachment: attachment
          ? { name: attachment.name, size: attachment.size, type: attachment.type }
          : null,
      });

      // Clear draft on success
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please try again or email us directly.");
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
          We'll review your customization brief for{" "}
          <span className="font-medium text-foreground">{productName}</span> and respond
          within 24 hours.
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
        <span className="ml-auto text-[11px] text-muted-foreground">Auto-saved</span>
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
          <input
            id="brief-name"
            name="name"
            type="text"
            maxLength={100}
            placeholder="John Doe"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={inputCls("name")}
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="brief-email" className="block text-sm font-medium mb-1.5 text-foreground">
            Work Email <span className="text-destructive">*</span>
          </label>
          <input
            id="brief-email"
            name="email"
            type="email"
            maxLength={255}
            placeholder="you@company.com"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className={inputCls("email")}
          />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="brief-company" className="block text-sm font-medium mb-1.5 text-foreground">Company</label>
        <input
          id="brief-company"
          name="company"
          type="text"
          maxLength={120}
          placeholder="Your company"
          value={values.company ?? ""}
          onChange={(e) => setField("company", e.target.value)}
          className={inputCls("company")}
        />
      </div>

      <div>
        <label htmlFor="brief-industry" className="block text-sm font-medium mb-1.5 text-foreground">
          Industry <span className="text-destructive">*</span>
        </label>
        <select
          id="brief-industry"
          name="industry"
          value={values.industry}
          onChange={(e) => setField("industry", e.target.value)}
          className={inputCls("industry")}
        >
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
          maxLength={2000}
          placeholder="e.g. multi-tenant onboarding, Stripe billing, role-based dashboards, SMS notifications…"
          value={values.workflows}
          onChange={(e) => setField("workflows", e.target.value)}
          className={`${inputCls("workflows")} resize-none`}
        />
        {errors.workflows && <p className="text-destructive text-xs mt-1">{errors.workflows}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="brief-timeline" className="block text-sm font-medium mb-1.5 text-foreground">
            Timeline <span className="text-destructive">*</span>
          </label>
          <select
            id="brief-timeline"
            name="timeline"
            value={values.timeline}
            onChange={(e) => setField("timeline", e.target.value)}
            className={inputCls("timeline")}
          >
            <option value="" disabled>Select…</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.timeline && <p className="text-destructive text-xs mt-1">{errors.timeline}</p>}
        </div>
        <div>
          <label htmlFor="brief-budget" className="block text-sm font-medium mb-1.5 text-foreground">
            Budget range <span className="text-destructive">*</span>
          </label>
          <select
            id="brief-budget"
            name="budget"
            value={values.budget}
            onChange={(e) => setField("budget", e.target.value)}
            className={inputCls("budget")}
          >
            <option value="" disabled>Select…</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.budget && <p className="text-destructive text-xs mt-1">{errors.budget}</p>}
        </div>
      </div>

      {/* Upload requirements */}
      <div>
        <label className="block text-sm font-medium mb-1.5 text-foreground">
          Upload requirements <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        {attachment ? (
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border bg-muted/40">
            <div className="flex items-center gap-2 min-w-0">
              <Paperclip className="w-4 h-4 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-sm text-foreground truncate">{attachment.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {(attachment.size / 1024).toFixed(1)} KB
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={removeAttachment}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
              title="Remove attachment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-border bg-background hover:bg-muted/40 text-sm text-muted-foreground cursor-pointer transition-colors ${
              uploading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
              </>
            ) : (
              <>
                <Paperclip className="w-4 h-4" />
                Attach PDF, doc, image, or zip (max 10 MB)
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={ALLOWED_TYPES.join(",")}
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      <button type="submit" disabled={submitting || uploading} className="btn-primary w-full justify-center disabled:opacity-60">
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Submit Brief</>}
      </button>
    </form>
  );
}
