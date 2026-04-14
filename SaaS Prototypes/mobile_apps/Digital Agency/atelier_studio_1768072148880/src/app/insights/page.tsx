import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import InsightsInteractive from './components/InsightsInteractive';

export const metadata: Metadata = {
  title: 'Insights - Atelier Studio',
  description: 'Explore our thoughts on craft, culture, and digital innovation. Deep-dive articles on creative philosophy, industry commentary, and cultural connections that shape exceptional digital experiences.',
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <InsightsInteractive />
    </main>
  );
}