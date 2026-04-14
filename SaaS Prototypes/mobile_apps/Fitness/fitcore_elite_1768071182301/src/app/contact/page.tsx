import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ContactInteractive from './components/ContactInteractive';

export const metadata: Metadata = {
  title: 'Contact & Free Consultation - FitCore Elite',
  description: 'Connect with FitCore Elite trainers and book your free consultation. Multiple contact options, live chat support, and trial class booking available.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <ContactInteractive />
      </main>
    </>
  );
}