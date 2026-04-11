import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/data/faq";

export default function FAQAccordion({ items, title }: { items: FAQItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl">{title}</h2>
          </div>
        )}
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-poppins font-medium text-foreground pr-4">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 pb-5 px-5" : "max-h-0"}`}>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
