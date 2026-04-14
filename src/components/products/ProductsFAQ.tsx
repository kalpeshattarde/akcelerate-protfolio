import { RevealSection } from "@/hooks/useScrollReveal";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is this better than ChatGPT or Claude for building SaaS?",
    a: "Yes — because we're not generating code on the fly. Our prototypes are pre-built, tested, and production-ready. ChatGPT and Claude generate code that requires hours of debugging, prompt engineering, and often produces spaghetti architecture. We give you the finished product. You just customize and launch.",
  },
  {
    q: "Can I resell these prototypes as my own SaaS?",
    a: "Absolutely. Every prototype comes with a full commercial license. Add your branding, customize features, deploy it, and sell subscriptions under your own brand. We don't appear anywhere in your product. It's 100% yours.",
  },
  {
    q: "Do I need coding skills to use these?",
    a: "Basic HTML/CSS knowledge helps for customization, but it's not required. Each prototype comes with clear documentation. You can also hire a freelancer to customize it — it's much cheaper than building from scratch since the architecture is already done.",
  },
  {
    q: "How fast can I launch after purchasing?",
    a: "Most founders launch within 1–2 days. Download the prototype, add your branding and content, deploy to Vercel or Netlify (both free), and you're live. Compare that to 4–12 weeks of building with AI tools.",
  },
  {
    q: "What tech stack are the prototypes built with?",
    a: "React, TypeScript, Tailwind CSS, and modern frameworks — the same stack used by top SaaS companies. Clean, maintainable code with proper component architecture, responsive design, and dark mode support.",
  },
  {
    q: "How is this different from SaaS boilerplates?",
    a: "Boilerplates give you a blank starting point with auth and database setup. Our prototypes are fully designed, feature-complete applications. You're not starting from a template — you're starting from a finished product.",
  },
  {
    q: "What if I need custom features or backend development?",
    a: "We offer custom SaaS development services. Need a backend, database integration, payments, or custom functionality? Our engineering team can build it for you at a fraction of traditional development costs.",
  },
  {
    q: "Can I cancel the All-Access subscription anytime?",
    a: "Yes, cancel anytime. You keep access to everything you've already downloaded. No lock-in, no penalties, no hidden fees. We earn your business every month.",
  },
];

export default function ProductsFAQ() {
  return (
    <section className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </div>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border border-border rounded-xl">
                <AccordionTrigger className="text-left font-poppins font-semibold text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </RevealSection>
    </section>
  );
}
