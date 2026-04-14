import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import TeamInteractive from './components/TeamInteractive';
import CultureSection from './components/CultureSection';
import CareerCTA from './components/CareerCTA';

export const metadata: Metadata = {
  title: 'Team - Atelier Studio',
  description: 'Meet the creative minds behind Atelier Studio. Our collective of designers, strategists, and technologists brings diverse expertise and shared passion for exceptional digital craft.',
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-6">
            <p className="font-body text-sm text-primary uppercase tracking-wider">
              Our Collective
            </p>
            <h1 className="font-headline text-5xl lg:text-7xl text-foreground leading-tight">
              The minds behind<br />the craft
            </h1>
            <p className="font-body text-xl text-text-secondary leading-relaxed max-w-3xl">
              We are a diverse collective of creative thinkers, strategic minds, and technical craftspeople united by our passion for exceptional work. Each team member brings unique perspectives and expertise, contributing to a studio culture that values collaboration, innovation, and artistic integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <TeamInteractive />

      {/* Culture Section */}
      <CultureSection />

      {/* Career CTA */}
      <CareerCTA />

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-body text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} Atelier Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a
                href="/about"
                className="font-cta text-sm text-text-secondary hover:text-primary transition-colors duration-300"
              >
                About
              </a>
              <a
                href="/contact"
                className="font-cta text-sm text-text-secondary hover:text-primary transition-colors duration-300"
              >
                Contact
              </a>
              <a
                href="/insights"
                className="font-cta text-sm text-text-secondary hover:text-primary transition-colors duration-300"
              >
                Insights
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}