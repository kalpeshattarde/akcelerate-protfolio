import { useRef, useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

const contactFields: FormField[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
  { name: "email", label: "Work Email", type: "email", placeholder: "john@company.com", required: true },
  { name: "company", label: "Company", type: "text", placeholder: "Your Company", required: false },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+91-XXXXXXXXXX", required: false },
];

const auditFields: FormField[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
  { name: "email", label: "Work Email", type: "email", placeholder: "you@company.com", required: true },
  { name: "company", label: "Company Name", type: "text", placeholder: "Company name", required: true },
  { name: "industry", label: "Industry", type: "text", placeholder: "e.g. Manufacturing, Fintech", required: true },
  { name: "employees", label: "Company Size", type: "text", placeholder: "e.g. 50-200", required: false },
];

function FormComponent({
  fields,
  buttonLabel,
  source,
  defaults = {},
  defaultMessage = "",
}: {
  fields: FormField[];
  buttonLabel: string;
  source: "contact" | "audit";
  defaults?: Record<string, string>;
  defaultMessage?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mountedAt = useRef<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Anti-bot: honeypot — real users never fill this hidden field
    if ((data.get("website")?.toString() ?? "").trim() !== "") {
      setSubmitted(true);
      return;
    }
    // Anti-bot: time-trap — bots submit instantly
    if (Date.now() - mountedAt.current < 1500) {
      setSubmitted(true);
      return;
    }

    const newErrors: Record<string, string> = {};
    fields.forEach(f => {
      const value = data.get(f.name)?.toString().trim() ?? "";
      if (f.required && !value) {
        newErrors[f.name] = `${f.label} is required`;
        return;
      }
      if (value.length > 255) {
        newErrors[f.name] = `${f.label} must be under 255 characters`;
        return;
      }
      if (f.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[f.name] = "Please enter a valid email";
      }
      if (f.type === "tel" && value && !/^[+\d\s()-]{6,20}$/.test(value)) {
        newErrors[f.name] = "Please enter a valid phone number";
      }
    });

    const message = data.get("message")?.toString().trim() ?? "";
    if (message.length > 2000) {
      newErrors.message = "Message must be under 2000 characters";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Persist locally as a fallback until the `leads` table is created.
    // Once the migration in the chat is applied, this can be replaced with
    // supabase.from("leads").insert({ source, ... }).
    try {
      const payload = {
        source,
        submitted_at: new Date().toISOString(),
        name: data.get("name")?.toString().trim() ?? "",
        email: data.get("email")?.toString().trim() ?? "",
        company: data.get("company")?.toString().trim() || null,
        phone: data.get("phone")?.toString().trim() || null,
        industry: data.get("industry")?.toString().trim() || null,
        employees: data.get("employees")?.toString().trim() || null,
        message: message || null,
      };
      const existing = JSON.parse(localStorage.getItem("akcelerate_pending_leads") ?? "[]");
      existing.push(payload);
      localStorage.setItem("akcelerate_pending_leads", JSON.stringify(existing.slice(-50)));
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
        <h3 className="font-poppins font-bold text-2xl mb-2 text-foreground">Thank You!</h3>
        <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card p-8 space-y-5">
      {/* Honeypot — hidden from users + assistive tech */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {fields.map(f => (
        <div key={f.name}>
          <label htmlFor={`${source}-${f.name}`} className="block text-sm font-medium mb-1.5 text-foreground">
            {f.label} {f.required && <span className="text-destructive">*</span>}
          </label>
          <input
            id={`${source}-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            defaultValue={defaults[f.name] ?? ""}
            maxLength={255}
            autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "off"}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `${source}-${f.name}-error` : undefined}
            className={`w-full px-4 py-3 rounded-xl text-sm transition-all border bg-background border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 hover:border-primary/30 ${
              errors[f.name] ? "!border-destructive" : ""
            }`}
          />
          {errors[f.name] && <p id={`${source}-${f.name}-error`} className="text-destructive text-xs mt-1">{errors[f.name]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor={`${source}-message`} className="block text-sm font-medium mb-1.5 text-foreground">Message</label>
        <textarea
          id={`${source}-message`}
          name="message"
          rows={4}
          maxLength={2000}
          defaultValue={defaultMessage}
          placeholder="Tell us about your project..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${source}-message-error` : undefined}
          className="w-full px-4 py-3 rounded-xl text-sm transition-all border bg-background border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 hover:border-primary/30 resize-none"
        />
        {errors.message && <p id={`${source}-message-error`} className="text-destructive text-xs mt-1">{errors.message}</p>}
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> {buttonLabel}</>}
      </button>
    </form>
  );
}

export function ContactForm({ defaults, defaultMessage }: { defaults?: Record<string, string>; defaultMessage?: string } = {}) {
  return <FormComponent fields={contactFields} buttonLabel="Send Message" source="contact" defaults={defaults} defaultMessage={defaultMessage} />;
}

export function AuditForm() {
  return <FormComponent fields={auditFields} buttonLabel="Request Free Audit" source="audit" />;
}
