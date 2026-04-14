import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Student Dashboard - EduZen Academy',
  description: 'Your personal learning sanctuary with progress tracking, achievements, reflection spaces, and mindful course management at EduZen Academy.',
};

export default function StudentDashboardPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <DashboardInteractive />
      </main>
    </>
  );
}