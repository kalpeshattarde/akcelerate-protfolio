import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, Compass, Mail, X } from "lucide-react";

/**
 * First-visit onboarding tour. Shows a friendly multi-step intro
 * once per browser (localStorage flag). Skippable.
 */

const STEPS = [
  {
    icon: Sparkles,
    title: "Welcome to AKcelerate",
    body: "We help businesses grow with AI, data science, and digital solutions. Here's a quick 30-second tour.",
  },
  {
    icon: Compass,
    title: "Explore Solutions",
    body: "Browse 8 solution areas — from AI/ML to cloud, automation, and analytics.",
    cta: { label: "See Solutions", to: "/solutions" },
  },
  {
    icon: ShoppingBag,
    title: "Browse Products",
    body: "Ready-to-use SaaS templates and prototypes you can buy and deploy.",
    cta: { label: "View Products", to: "/products" },
  },
  {
    icon: Mail,
    title: "Talk to Us",
    body: "Need a custom solution? Book a free consultation and we'll respond within 24 hrs.",
    cta: { label: "Contact Us", to: "/contact" },
  },
];

const STORAGE_KEY = "ak-onboarded-v1";

export default function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else close();
  };

  const Current = STEPS[step];
  const Icon = Current.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-background/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute inset-x-0 top-0 h-32 opacity-60 pointer-events-none"
              style={{ background: "radial-gradient(60% 100% at 50% 0%, hsl(var(--primary) / 0.25), transparent)" }}
            />
            <button
              onClick={close}
              className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close tour"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative p-7 pt-9">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))" }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-poppins font-bold text-xl mb-2 text-foreground">{Current.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{Current.body}</p>

                {Current.cta && (
                  <Link
                    to={Current.cta.to}
                    onClick={close}
                    className="btn-primary text-sm mb-4"
                  >
                    {Current.cta.label}
                  </Link>
                )}
              </motion.div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5 mb-5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === step ? 24 : 8,
                      background: i === step ? "hsl(var(--primary))" : "hsl(var(--border))",
                    }}
                    aria-label={`Step ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={close}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skip tour
                </button>
                <button
                  onClick={next}
                  className="btn-primary text-sm py-2 px-5"
                >
                  {step < STEPS.length - 1 ? "Next" : "Get started"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
