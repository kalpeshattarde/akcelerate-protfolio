import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import PricingHero from './components/PricingHero';
import PricingInteractive from './components/PricingInteractive';

export const metadata: Metadata = {
  title: 'Pricing - EduZen Academy',
  description: 'Choose a mindful learning plan that honors your time and goals. Transparent pricing with flexible options for individuals and organizations. 30-day money-back guarantee.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <PricingHero />
        <PricingInteractive />
        
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-headline text-3xl lg:text-4xl font-semibold text-foreground mb-6">
              Still Have Questions?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              Our team is here to help you find the perfect learning solution. Schedule a free consultation or reach out to our support team for personalized guidance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:support@eduzen.academy"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-cta font-semibold text-sm hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5"
              >
                Contact Support
              </a>
              <a
                href="/community"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-card text-foreground border border-border rounded-lg font-cta font-semibold text-sm hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
              >
                Join Community
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="18" fill="#6B8E6B" opacity="0.1" />
                  <path
                    d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 10C25.514 10 30 14.486 30 20C30 25.514 25.514 30 20 30C14.486 30 10 25.514 10 20C10 14.486 14.486 10 20 10Z"
                    fill="#6B8E6B"
                  />
                  <circle cx="20" cy="20" r="3" fill="#D4A574" />
                </svg>
                <div>
                  <div className="font-headline text-lg font-semibold text-foreground">
                    EduZen Academy
                  </div>
                  <div className="font-body text-xs text-muted-foreground">
                    Mindful Learning
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <a href="/homepage" className="hover:text-primary transition-colors duration-300">
                  Home
                </a>
                <a href="/course-catalog" className="hover:text-primary transition-colors duration-300">
                  Courses
                </a>
                <a href="/community" className="hover:text-primary transition-colors duration-300">
                  Community
                </a>
                <a href="/student-dashboard" className="hover:text-primary transition-colors duration-300">
                  Dashboard
                </a>
              </div>
              
              <div className="font-body text-sm text-muted-foreground">
                © {new Date().getFullYear()} EduZen Academy. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}