import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SuccessStoriesInteractive from './components/SuccessStoriesInteractive';

export const metadata: Metadata = {
  title: 'Success Stories - FitCore Elite',
  description: 'Discover inspiring transformation journeys and real results from FitCore Elite members. View before/after photos, metrics, and detailed success stories.',
};

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 lg:pt-20">
        <SuccessStoriesInteractive />
      </div>
    </main>
  );
}