import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import MembershipInteractive from './components/MembershipInteractive';

export const metadata: Metadata = {
  title: 'Membership - FitCore Elite',
  description: 'Choose your elite fitness membership tier with transparent pricing, comprehensive benefits, and flexible options. From Foundation to Champion levels, find the perfect fit for your performance goals.',
};

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-background pt-16 lg:pt-20">
      <Header />
      <MembershipInteractive />
    </main>
  );
}