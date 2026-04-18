import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/**
 * Visible breadcrumb trail. Mirrors the BreadcrumbList JSON-LD emitted by SEOHead.
 * Pass the same array (minus "Home" — added automatically) used in SEOHead's `breadcrumbs` prop.
 */
export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Strip a leading "Home" entry if the parent already included it
  const trail = items[0]?.name === "Home" ? items.slice(1) : items;
  return (
    <nav
      aria-label="Breadcrumb"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li className="flex items-center">
          <Link
            to="/"
            className="inline-flex items-center hover:text-accent transition-colors"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              {last || !c.path ? (
                <span className="text-foreground font-medium line-clamp-1" aria-current={last ? "page" : undefined}>
                  {c.name}
                </span>
              ) : (
                <Link to={c.path} className="hover:text-accent transition-colors">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
