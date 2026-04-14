import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ContactInteractive from './components/ContactInteractive';

export const metadata: Metadata = {
  title: 'Contact - Atelier Studio',
  description: 'Get in touch with Atelier Studio to discuss your next creative project. We specialize in brand identity, web experiences, and digital products that combine strategic thinking with exceptional craft.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <ContactInteractive />
      </div>
    </main>
  );
}