import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Layers, BookOpen, Briefcase } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export interface RelatedLink {
  to: string;
  title: string;
  description?: string;
  meta?: string;
}

const KIND_ICON = {
  service: Briefcase,
  solution: Layers,
  blog: BookOpen,
  generic: Sparkles,
} as const;

interface Props {
  label?: string;
  title: string;
  items: RelatedLink[];
  kind?: keyof typeof KIND_ICON;
  alt?: boolean;
}

/**
 * Reusable cross-page backlink block.
 * Renders a 3-column grid of internal links with a heading.
 */
export default function RelatedLinks({ label, title, items, kind = "generic", alt = false }: Props) {
  if (!items || items.length === 0) return null;
  const Icon = KIND_ICON[kind];

  return (
    <section className={`py-16 lg:py-20 ${alt ? "section-alt" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-10">
            {label && (
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-accent font-semibold mb-3">
                <Icon className="w-3.5 h-3.5" /> {label}
              </span>
            )}
            <h2 className="font-poppins font-bold text-2xl md:text-3xl">{title}</h2>
          </div>
        </RevealSection>
        <RevealGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={80}>
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="reveal-item group glass-card p-6 rounded-2xl hover:border-primary/30 transition-all hover:-translate-y-0.5"
            >
              {item.meta && (
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-accent mb-2">
                  {item.meta}
                </span>
              )}
              <h3 className="font-poppins font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}
