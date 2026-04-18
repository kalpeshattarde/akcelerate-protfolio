import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

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

function FormComponent({ fields, buttonLabel, dark = false }: { fields: FormField[]; buttonLabel: string; dark?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
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
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`glass-card p-10 text-center ${dark ? "!bg-white/5 !border-white/10" : ""}`}>
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
        <h3 className={`font-poppins font-bold text-2xl mb-2 ${dark ? "text-white" : ""}`}>Thank You!</h3>
        <p className={dark ? "text-white/70" : "text-muted-foreground"}>We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`glass-card p-8 space-y-5 ${dark ? "!bg-white/5 !border-white/10" : ""}`}>
      {fields.map(f => (
        <div key={f.name}>
          <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-foreground"}`}>
            {f.label} {f.required && <span className="text-destructive">*</span>}
          </label>
          <input
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            maxLength={255}
            autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "off"}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className={`w-full px-4 py-3 rounded-xl text-sm transition-all border focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              dark ? "bg-white/5 border-white/10 text-white placeholder:text-white/40" : "bg-background border-border text-foreground placeholder:text-muted-foreground"
            } ${errors[f.name] ? "!border-destructive" : ""}`}
          />
          {errors[f.name] && <p className="text-destructive text-xs mt-1">{errors[f.name]}</p>}
        </div>
      ))}
      <div>
        <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/80" : "text-foreground"}`}>Message</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your project..."
          className={`w-full px-4 py-3 rounded-xl text-sm transition-all border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none ${
            dark ? "bg-white/5 border-white/10 text-white placeholder:text-white/40" : "bg-background border-border text-foreground placeholder:text-muted-foreground"
          }`}
        />
      </div>
      <button type="submit" className="btn-primary w-full justify-center">
        <Send className="w-4 h-4" /> {buttonLabel}
      </button>
    </form>
  );
}

export function ContactForm() {
  return <FormComponent fields={contactFields} buttonLabel="Send Message" />;
}

export function AuditForm() {
  return <FormComponent fields={auditFields} buttonLabel="Request Free Audit" dark />;
}
