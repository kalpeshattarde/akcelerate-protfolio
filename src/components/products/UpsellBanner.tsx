import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function UpsellBanner() {
  return (
    <section className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 p-8 text-center">
      <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
      <h3 className="font-poppins text-2xl font-bold text-foreground mb-2">
        Get the Full Bundle & Save 60%
      </h3>
      <p className="text-muted-foreground mb-5 max-w-lg mx-auto">
        Access every product in the marketplace with a single purchase. Includes all future updates and new releases.
      </p>
      <Link to="/contact" className="btn-primary inline-flex gap-2">
        Get Bundle Deal <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
