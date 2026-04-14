import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CommunityHero from './components/CommunityHero';
import CommunityInteractive from './components/CommunityInteractive';

export const metadata: Metadata = {
  title: 'Community Garden - EduZen Academy',
  description: 'Join our mindful learning community. Connect with fellow learners, participate in thoughtful discussions, join study groups, and access curated resources in a supportive environment designed for growth and collaboration.',
};

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <CommunityHero />
        <CommunityInteractive />
      </div>
    </main>
  );
}