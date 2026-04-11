import { useState } from "react";
import type { FAQItem } from "@/data/faq";

export default function FAQAccordion({ items, title }: { items: FAQItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl">{title}</h2>
          </div>
        )}
        <div>
          {items.map((item, i) => (
            <div key={i} className={`border-b transition-colors ${open === i ? "border-primary/20" : ""}`} style={{ borderColor: open === i ? undefined : "hsl(var(--border))" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="font-poppins font-medium pr-4 group-hover:text-primary transition-colors" style={{ color: open === i ? "#2563EB" : "hsl(var(--ak-navy))" }}>{item.question}</span>
                <span className={`w-[26px] h-[26px] rounded-full flex items-center justify-center flex-shrink-0 text-lg font-light transition-all duration-300 ${open === i ? "rotate-45" : ""}`}
                  style={{ background: open === i ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", color: "#2563EB" }}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-[max-height,padding] duration-[400ms] ease-in-out ${open === i ? "max-h-[300px] pb-5" : "max-h-0"}`}>
                <p className="text-[0.9375rem] leading-[1.7] text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
