import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AboutInteractive from './components/AboutInteractive';

export const metadata: Metadata = {
  title: 'About - Atelier Studio',
  description: 'Discover our philosophy, creative process, and studio culture. We believe exceptional digital experiences emerge from the intersection of strategic thinking, artistic vision, and technical mastery.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <AboutInteractive />
      </div>
    </main>
  );
}