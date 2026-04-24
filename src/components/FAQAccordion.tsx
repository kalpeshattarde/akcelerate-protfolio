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
                <span className={`font-poppins font-medium pr-4 transition-colors ${open === i ? "text-primary" : "text-foreground group-hover:text-primary"}`}>{item.question}</span>
                <span className={`w-[26px] h-[26px] rounded-full flex items-center justify-center flex-shrink-0 text-lg font-light transition-all duration-300 border border-primary/20 text-primary ${open === i ? "rotate-45 bg-primary/15" : "bg-primary/10"}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${open === i ? "max-h-96 pb-5" : "max-h-0"}`}>
                <p className="text-sm leading-[1.7] text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
