import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";

/**
 * Founder card surfaced on the homepage to add human credibility.
 * Uses the existing founder photo at /images/kalpesh-attarde.jpeg
 * and links to /founder for the full story.
 */
export default function FounderCard() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 md:p-12 grid md:grid-cols-[200px_1fr] gap-8 items-center">
          <div className="relative mx-auto md:mx-0">
            <div
              className="w-40 h-40 md:w-44 md:h-44 rounded-2xl overflow-hidden ring-4 ring-primary/10"
              style={{ background: "var(--gradient-primary)" }}
            >
              <img
                src="/images/kalpesh-attarde.jpeg"
                alt="Kalpesh Attarde, Founder of AKcelerate"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-lg uppercase tracking-wider">
              Founder
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              From the founder
            </p>
            <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-3 text-foreground">
              "I built AKcelerate to ship the AI products I wished agencies would build for me."
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              I'm Kalpesh — engineer, ex-data-scientist, and founder of AKcelerate.
              I've shipped 25+ AI products across 13 industries. Every engagement starts
              with a free 60-minute audit so you know exactly what we'd build, how long
              it takes, and what it costs — before you spend a dollar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/founder" className="btn-primary">
                Read my story <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://www.linkedin.com/in/kalpeshattarde/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Linkedin className="w-4 h-4" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
