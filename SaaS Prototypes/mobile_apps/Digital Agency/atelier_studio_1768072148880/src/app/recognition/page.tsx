import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import RecognitionInteractive from './components/RecognitionInteractive';

export const metadata: Metadata = {
  title: 'Recognition & Awards - Atelier Studio',
  description: 'Explore our industry recognition, awards, press features, and speaking engagements that establish Atelier Studio as an award-winning creative agency setting new standards in digital craft.',
};

export default function RecognitionPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <RecognitionInteractive />
    </main>
  );
}