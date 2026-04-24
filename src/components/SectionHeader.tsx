import { ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: ReactNode;
  description?: string;
  className?: string;
}

export function SectionHeader({ label, title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="font-poppins font-bold text-3xl lg:text-4xl mb-4 text-foreground">{title}</h2>
      {description && <p className="max-w-2xl mx-auto text-muted-foreground">{description}</p>}
    </div>
  );
}
