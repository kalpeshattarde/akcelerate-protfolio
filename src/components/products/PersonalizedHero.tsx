import { Sparkles } from "lucide-react";
import { usePersonalization } from "@/hooks/usePersonalization";

export default function PersonalizedHero() {
  const { headline, subline } = usePersonalization();

  return (
    <section className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
        <Sparkles className="w-4 h-4" /> SaaS Marketplace
      </div>
      <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground mb-4">
        {headline}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {subline}
      </p>
    </section>
  );
}
