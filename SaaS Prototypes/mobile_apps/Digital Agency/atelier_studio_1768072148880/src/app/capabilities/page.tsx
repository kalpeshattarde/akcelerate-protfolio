import type { Metadata } from 'next';
import CapabilitiesInteractive from './components/CapabilitiesInteractive';

export const metadata: Metadata = {
  title: 'Capabilities - Atelier Studio',
  description: 'Explore our artistic disciplines and service offerings that blend digital innovation with timeless craftsmanship, positioning creative excellence as strategic advantage.',
};

export default function CapabilitiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <CapabilitiesInteractive />
    </main>
  );
}