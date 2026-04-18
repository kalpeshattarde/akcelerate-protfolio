import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "products-catalog", label: "Browse" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function ProductsSubNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      // Show after user scrolls past ~80% of the viewport (i.e. past the hero)
      setVisible(window.scrollY > window.innerHeight * 0.6);

      // Active section detection
      const offsets = SECTIONS.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Number.POSITIVE_INFINITY };
        return { id: s.id, top: el.getBoundingClientRect().top };
      });
      // Active = the last section whose top is above 120px from viewport top
      const above = offsets.filter(o => o.top <= 120);
      const current = above.length ? above[above.length - 1].id : SECTIONS[0].id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96; // offset for navbar
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <nav
      aria-label="Products page sections"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-30 hidden md:block animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <ul className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-card/90 backdrop-blur border border-border shadow-lg">
        {SECTIONS.map(s => (
          <li key={s.id}>
            <button
              onClick={() => scrollTo(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                active === s.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
