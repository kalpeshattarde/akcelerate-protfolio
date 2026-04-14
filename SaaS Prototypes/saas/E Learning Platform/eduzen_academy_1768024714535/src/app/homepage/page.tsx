import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import FeaturedCourses from './components/FeaturedCourses';
import PhilosophySection from './components/PhilosophySection';
import TestimonialSection from './components/TestimonialSection';
import TrustSection from './components/TrustSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'EduZen Academy - Mindful Learning Platform',
  description: 'Experience education designed for human flourishing. A premium e-learning sanctuary combining world-class courses with mindfulness principles for transformative learning.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <FeaturedCourses />
        <PhilosophySection />
        <TestimonialSection />
        <TrustSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}