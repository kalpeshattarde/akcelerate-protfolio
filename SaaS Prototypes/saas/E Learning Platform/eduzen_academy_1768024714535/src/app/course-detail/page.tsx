import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CourseDetailInteractive from './components/CourseDetailInteractive';

export const metadata: Metadata = {
  title: 'Mindful Leadership Course - EduZen Academy',
  description: 'Transform your leadership approach through mindfulness practices, emotional intelligence, and conscious decision-making. Learn to lead with presence and purpose in this comprehensive 8-week program.',
};

export default function CourseDetailPage() {
  return (
    <>
      <Header />
      <CourseDetailInteractive />
    </>
  );
}