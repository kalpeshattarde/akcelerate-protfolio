import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import WorkPortfolioInteractive from './components/WorkPortfolioInteractive';

export const metadata: Metadata = {
  title: 'Work Portfolio - Atelier Studio',
  description: 'Explore our curated collection of transformative digital experiences. Each project represents a unique collaboration where strategic thinking meets exceptional craft across luxury fashion, fintech, wellness, and cultural innovation.',
};

export default function WorkPortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <WorkPortfolioInteractive />
    </main>
  );
}