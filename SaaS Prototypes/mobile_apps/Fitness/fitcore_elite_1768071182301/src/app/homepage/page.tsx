import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'Homepage - FitCore Elite',
  description: 'Elite fitness performance laboratory featuring rotating athlete spotlights, real-time gym activity feeds, and personalized training entry points for serious fitness enthusiasts.',
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HomepageInteractive />
    </main>
  );
}